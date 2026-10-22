"""ROS adapter: wall-monotonic watchdog, explicit arm/reset, no automatic re-arm.

The driver MUST honor drive_enabled. This process is not a safety-rated PLC.
"""
import json
import math
import time

import rclpy
from rclpy.node import Node
from rclpy.clock import Clock
from rclpy.clock_type import ClockType
from rclpy.qos import QoSProfile, ReliabilityPolicy, DurabilityPolicy
from sensor_msgs.msg import JointState
from std_msgs.msg import Float64, Bool
from std_srvs.srv import Trigger
from diagnostic_msgs.msg import DiagnosticArray, DiagnosticStatus, KeyValue

from safety_guard.core import Limits, SafetyKernel


class GuardNode(Node):
    def __init__(self):
        super().__init__('safety_guard')
        for key, value in vars(Limits()).items():
            self.declare_parameter(key, value)
        self.declare_parameter('joint_name', 'joint_1')
        self.kernel = SafetyKernel(Limits(**{
            key: float(self.get_parameter(key).value) for key in vars(Limits())}))
        self.joint_name = str(self.get_parameter('joint_name').value)
        self.started = time.monotonic()
        # KEEP_LAST depth=1 / VOLATILE avoids storing old setpoint backlogs.
        qos = QoSProfile(depth=1, reliability=ReliabilityPolicy.RELIABLE,
                         durability=DurabilityPolicy.VOLATILE)
        self.enabled_pub = self.create_publisher(Bool, '~/drive_enabled', qos)
        self.command_pub = self.create_publisher(Float64, '~/safe_command', qos)
        self.diagnostic_pub = self.create_publisher(DiagnosticArray, '/diagnostics', 10)
        self.create_subscription(Float64, '~/command', self.on_command, qos)
        self.create_subscription(JointState, '~/feedback', self.on_feedback, qos)
        self.create_subscription(Float64, '~/current', self.on_current, qos)
        self.create_subscription(Float64, '~/temperature', self.on_temperature, qos)
        self.create_subscription(Bool, '~/estop', self.on_estop, qos)
        self.create_service(Trigger, '~/arm', self.on_arm)
        self.create_service(Trigger, '~/reset_fault', self.on_reset)
        self.create_service(Trigger, '~/disarm', self.on_disarm)
        self.steady_clock = Clock(clock_type=ClockType.STEADY_TIME)
        self.timer = self.create_timer(0.02, self.on_tick, clock=self.steady_clock)
        self.diagnostic_count = 0
        self.get_logger().warning('Software interlock only. Output starts inhibited; hardware e-stop still required.')
        self.publish_output()

    def now(self):
        return time.monotonic() - self.started

    def on_command(self, message):
        self.kernel.command(message.data, self.now())
        self.publish_output()

    def on_feedback(self, message):
        # Validate JointState layout; exact configured joint required. Empty velocity/effort allowed.
        n = len(message.name)
        valid = (n > 0 and len(message.position) == n and
                 len(message.velocity) in (0, n) and len(message.effort) in (0, n) and
                 message.name.count(self.joint_name) == 1 and
                 all(math.isfinite(v) for values in (message.position, message.velocity, message.effort) for v in values))
        q = message.position[message.name.index(self.joint_name)] if valid else float('nan')
        self.kernel.joint_state(q, self.now())
        self.publish_output()

    def on_current(self, message):
        self.kernel.current_sample(message.data, self.now())
        self.publish_output()

    def on_temperature(self, message):
        self.kernel.temperature_sample(message.data, self.now())
        self.publish_output()

    def on_estop(self, message):
        self.kernel.emergency_stop(message.data, self.now())
        self.publish_output()

    def on_arm(self, _request, response):
        response.success = self.kernel.arm(self.now())
        response.message = json.dumps(self.kernel.snapshot(), ensure_ascii=False)
        self.publish_output()
        return response

    def on_reset(self, _request, response):
        response.success = self.kernel.reset(self.now())
        response.message = json.dumps(self.kernel.snapshot(), ensure_ascii=False)
        self.publish_output()
        return response

    def on_disarm(self, _request, response):
        self.kernel.disarm(self.now())
        response.success = self.kernel.state != 'ARMED'
        response.message = self.kernel.state
        self.publish_output()
        return response

    def publish_output(self):
        snapshot = self.kernel.snapshot()
        enabled = Bool()
        enabled.data = snapshot['enabled']
        self.enabled_pub.publish(enabled)
        target = Float64()
        target.data = float(snapshot['target'])
        self.command_pub.publish(target)

    def on_tick(self):
        self.kernel.advance(self.now())
        self.publish_output()
        self.diagnostic_count += 1
        if self.diagnostic_count % 5:
            return
        snapshot = self.kernel.snapshot()
        status = DiagnosticStatus()
        status.name = self.get_fully_qualified_name()
        status.hardware_id = 'software_interlock_no_certification'
        status.level = (DiagnosticStatus.ERROR if snapshot['state'] == 'FAULT'
                        else DiagnosticStatus.OK if snapshot['enabled'] else DiagnosticStatus.WARN)
        status.message = snapshot['state'] + ': ' + ', '.join(snapshot['faults'] + snapshot['readiness'])
        status.values = [KeyValue(key=k, value=json.dumps(v)) for k, v in snapshot.items()]
        message = DiagnosticArray()
        message.header.stamp = self.get_clock().now().to_msg()
        message.status = [status]
        self.diagnostic_pub.publish(message)


def main(args=None):
    rclpy.init(args=args)
    node = GuardNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        # Best-effort only; a killed/frozen process cannot publish this stop.
        if rclpy.ok():
            node.kernel.disarm(node.now())
            node.publish_output()
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()


if __name__ == '__main__':
    main()
