"""A ROS message-producing mock, never a real actuator.

Does not arm automatically. scenario parameter injects once at 5..6 seconds.
"""
import math
import time
import rclpy
from rclpy.node import Node
from rclpy.clock import Clock
from rclpy.clock_type import ClockType
from rclpy.qos import QoSProfile, ReliabilityPolicy, DurabilityPolicy
from sensor_msgs.msg import JointState
from std_msgs.msg import Float64, Bool


class MockJoint(Node):
    def __init__(self):
        super().__init__('mock_joint')
        self.declare_parameter('scenario', 'normal')
        self.scenario = str(self.get_parameter('scenario').value)
        if self.scenario not in ('normal', 'estop', 'timeout', 'overcurrent', 'overtemperature', 'nonfinite', 'limit', 'feedback'):
            raise ValueError('Unknown fault scenario')
        qos = QoSProfile(depth=1, reliability=ReliabilityPolicy.RELIABLE,
                         durability=DurabilityPolicy.VOLATILE)
        self.command_pub = self.create_publisher(Float64, '/safety_guard/command', qos)
        self.feedback_pub = self.create_publisher(JointState, '/safety_guard/feedback', qos)
        self.current_pub = self.create_publisher(Float64, '/safety_guard/current', qos)
        self.temperature_pub = self.create_publisher(Float64, '/safety_guard/temperature', qos)
        self.estop_pub = self.create_publisher(Bool, '/safety_guard/estop', qos)
        self.create_subscription(Float64, '/safety_guard/safe_command', self.on_target, qos)
        self.create_subscription(Bool, '/safety_guard/drive_enabled', self.on_enable, qos)
        self.q = self.target = 0.0
        self.enabled = False
        self.last_enable = -1.0
        self.last_target = -1.0
        self.started = time.monotonic()
        self.steady_clock = Clock(clock_type=ClockType.STEADY_TIME)
        self.timer = self.create_timer(0.02, self.tick, clock=self.steady_clock)

    def now(self):
        return time.monotonic() - self.started

    def on_target(self, message):
        if math.isfinite(message.data):
            self.target = message.data
            self.last_target = self.now()

    def on_enable(self, message):
        self.enabled = message.data
        self.last_enable = self.now()

    def tick(self):
        t = self.now()
        fault = 5 <= t < 6
        # Independent mock-side watchdog, still not hardware safety.
        if self.enabled and t - self.last_enable <= .1 and t - self.last_target <= .1:
            self.q += max(-.03, min(.03, self.target - self.q))
        reference = .7 * math.sin(1.5 * t)
        if not (fault and self.scenario == 'timeout'):
            command = Float64()
            command.data = float('nan') if fault and self.scenario == 'nonfinite' else 2.5 if fault and self.scenario == 'limit' else reference
            self.command_pub.publish(command)
        feedback = JointState()
        feedback.header.stamp = self.get_clock().now().to_msg()
        feedback.name = ['joint_1']
        feedback.position = [2.0 if fault and self.scenario == 'feedback' else self.q]
        self.feedback_pub.publish(feedback)
        current, temperature, estop = Float64(), Float64(), Bool()
        current.data = 4.2 if fault and self.scenario == 'overcurrent' else .6
        temperature.data = 85.0 if fault and self.scenario == 'overtemperature' else 35.0
        estop.data = fault and self.scenario == 'estop'
        self.current_pub.publish(current)
        self.temperature_pub.publish(temperature)
        self.estop_pub.publish(estop)


def main(args=None):
    rclpy.init(args=args)
    node = MockJoint()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()


if __name__ == '__main__':
    main()
