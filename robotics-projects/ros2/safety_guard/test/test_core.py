"""ROS-independent unittest suite (also collected by pytest/colcon)."""
import math
import unittest

from safety_guard.core import Limits, SafetyKernel


def healthy(kernel, now=None):
    kernel.advance(kernel.now if now is None else now)
    kernel.command(.5)
    kernel.joint_state(.2)
    kernel.telemetry(.6, 35)
    kernel.emergency_stop(False)


class TestSafetyKernel(unittest.TestCase):
    def test_startup_inhibited(self):
        k = SafetyKernel()
        self.assertFalse(k.arm())
        self.assertFalse(k.snapshot()['enabled'])
        self.assertIn('MISSING_COMMAND', k.reasons())

    def test_healthy_arm(self):
        k = SafetyKernel()
        healthy(k)
        self.assertTrue(k.arm())
        self.assertEqual(k.snapshot()['target'], .5)

    def test_latch_and_explicit_reset_without_auto_arm(self):
        k = SafetyKernel()
        healthy(k)
        k.arm()
        k.emergency_stop(True)
        self.assertEqual(k.snapshot()['target'], .2)
        self.assertFalse(k.reset())
        k.emergency_stop(False)
        self.assertFalse(k.arm())
        self.assertTrue(k.reset())
        self.assertEqual(k.state, 'DISARMED')
        self.assertFalse(k.snapshot()['enabled'])
        self.assertTrue(k.arm())

    def test_timeout_boundary(self):
        k = SafetyKernel()
        healthy(k)
        k.arm()
        k.advance(.3)
        self.assertTrue(k.snapshot()['enabled'])
        k.advance(.3001)
        self.assertFalse(k.snapshot()['enabled'])
        self.assertIn('TIMEOUT_COMMAND', k.faults)
        self.assertFalse(k.reset())
        healthy(k, .31)
        self.assertTrue(k.reset())

    def test_each_sensor_has_own_watchdog(self):
        for missing in ('command', 'feedback', 'current', 'temperature', 'estop'):
            with self.subTest(channel=missing):
                k = SafetyKernel()
                healthy(k)
                k.arm()
                for i in range(1, 5):
                    k.advance(i * .1)
                    if missing != 'command':
                        k.command(.5)
                    if missing != 'feedback':
                        k.joint_state(.2)
                    if missing != 'current':
                        k.current_sample(.6)
                    if missing != 'temperature':
                        k.temperature_sample(35)
                    if missing != 'estop':
                        k.emergency_stop(False)
                self.assertIn('TIMEOUT_' + missing.upper(), k.faults)
                self.assertFalse(k.snapshot()['enabled'])

    def test_nonfinite_commands(self):
        for value in (math.nan, math.inf, -math.inf):
            k = SafetyKernel()
            healthy(k)
            k.arm()
            k.command(value)
            self.assertIn('NONFINITE_COMMAND', k.faults)
            self.assertEqual(k.snapshot()['target'], .2)
            self.assertFalse(k.reset())

    def test_limits_and_feedback(self):
        for method, value in (('command', 1.201), ('command', -1.201),
                              ('joint_state', math.nan), ('joint_state', 2)):
            k = SafetyKernel()
            healthy(k)
            k.arm()
            getattr(k, method)(value)
            self.assertEqual(k.state, 'FAULT')
            self.assertFalse(k.snapshot()['enabled'])

    def test_current_and_temperature_thresholds(self):
        for current, temperature in ((3, 35), (-3, 35), (.6, 70), (math.nan, 35),
                                     (.6, math.inf), (.6, -51)):
            k = SafetyKernel()
            healthy(k)
            k.arm()
            k.telemetry(current, temperature)
            self.assertFalse(k.snapshot()['enabled'])
            self.assertFalse(k.reset())

    def test_invalid_source_must_be_corrected(self):
        k = SafetyKernel()
        healthy(k)
        k.arm()
        k.command(math.nan)
        self.assertFalse(k.reset())
        k.command(.3)
        self.assertTrue(k.reset())
        self.assertFalse(k.snapshot()['enabled'])

    def test_clock_reversal_and_nonfinite(self):
        for value in (math.nan, math.inf, -.1):
            k = SafetyKernel()
            healthy(k, 1)
            k.arm()
            k.advance(value)
            self.assertIn('INVALID_CLOCK', k.faults)
            self.assertFalse(k.snapshot()['enabled'])

    def test_disarm_and_no_spontaneous_rearm(self):
        k = SafetyKernel()
        healthy(k)
        k.arm()
        k.disarm()
        healthy(k, .1)
        self.assertFalse(k.snapshot()['enabled'])
        self.assertEqual(k.state, 'DISARMED')

    def test_invalid_limits_rejected(self):
        for limits in (Limits(timeout=0), Limits(qMin=2), Limits(currentMax=-1),
                       Limits(temperatureMax=math.nan)):
            self.assertRaises(ValueError, SafetyKernel, limits)


if __name__ == '__main__':
    unittest.main()
