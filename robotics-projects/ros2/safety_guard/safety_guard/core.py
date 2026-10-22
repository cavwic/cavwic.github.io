"""Pure deterministic core; ROS-free, monotonic seconds, radians/A/deg C.

Semantics mirrored by src/features/robotics-lab/safety/engine.ts.
Software interlock only: cannot guarantee power removal or reaction on process hang.
"""
from dataclasses import dataclass, asdict
import math


@dataclass(frozen=True)
class Limits:
    qMin: float = -1.2
    qMax: float = 1.2
    currentMax: float = 3.0
    temperatureMax: float = 70.0
    timeout: float = 0.3


class SafetyKernel:
    def __init__(self, limits=None):
        self.limits = limits or Limits()
        p = self.limits
        if (not all(math.isfinite(v) for v in asdict(p).values()) or p.qMin >= p.qMax
                or p.currentMax <= 0 or p.temperatureMax <= -50 or p.timeout <= 0):
            raise ValueError('Invalid safety limits')
        self.state = 'DISARMED'
        self.now = 0.0
        self.target = self.feedback = self.current = 0.0
        self.temperature = 25.0
        self.estop = True
        self.faults = []
        self.events = []
        self.stamps = dict.fromkeys(('command', 'feedback', 'current', 'temperature', 'estop'))
        self.invalid = set()
        self._log('STARTUP', 'Output inhibited; fresh inputs and explicit arm required')

    def _log(self, event_type, detail):
        self.events.append({'t': self.now, 'type': event_type, 'detail': detail})
        self.events = self.events[-2000:]

    def _trip(self, code):
        if code not in self.faults:
            self.faults.append(code)
            self._log('FAULT', code)
        self.state = 'FAULT'

    def advance(self, now):
        if not math.isfinite(now) or now < self.now:
            self.invalid.add('clock')
            self._trip('INVALID_CLOCK')
            return
        self.invalid.discard('clock')
        self.now = now
        if self.state == 'ARMED':
            for channel, stamp in self.stamps.items():
                if stamp is None or now - stamp > self.limits.timeout + 1e-9:
                    self._trip('TIMEOUT_' + channel.upper())

    def command(self, q, now=None):
        self.advance(self.now if now is None else now)
        if not math.isfinite(q) or q < self.limits.qMin or q > self.limits.qMax:
            self.invalid.add('command')
            self._trip('NONFINITE_COMMAND' if not math.isfinite(q) else 'COMMAND_LIMIT')
            return
        self.invalid.discard('command')
        self.target, self.stamps['command'] = q, self.now

    def joint_state(self, q, now=None):
        self.advance(self.now if now is None else now)
        if not math.isfinite(q) or q < self.limits.qMin or q > self.limits.qMax:
            self.invalid.add('feedback')
            self._trip('NONFINITE_FEEDBACK' if not math.isfinite(q) else 'FEEDBACK_LIMIT')
            return
        self.invalid.discard('feedback')
        self.feedback, self.stamps['feedback'] = q, self.now

    def current_sample(self, current, now=None):
        self.advance(self.now if now is None else now)
        if not math.isfinite(current):
            self.invalid.add('current')
            self._trip('INVALID_CURRENT')
            return
        self.invalid.discard('current')
        self.current, self.stamps['current'] = current, self.now
        if abs(current) >= self.limits.currentMax:
            self._trip('OVERCURRENT')

    def temperature_sample(self, temperature, now=None):
        self.advance(self.now if now is None else now)
        if not math.isfinite(temperature) or temperature < -50:
            self.invalid.add('temperature')
            self._trip('INVALID_TEMPERATURE')
            return
        self.invalid.discard('temperature')
        self.temperature, self.stamps['temperature'] = temperature, self.now
        if temperature >= self.limits.temperatureMax:
            self._trip('OVERTEMPERATURE')

    def telemetry(self, current, temperature, now=None):
        self.current_sample(current, now)
        self.temperature_sample(temperature, now)

    def emergency_stop(self, active, now=None):
        self.advance(self.now if now is None else now)
        self.estop, self.stamps['estop'] = bool(active), self.now
        if active:
            self._trip('ESTOP')

    def reasons(self):
        result = []
        if self.estop:
            result.append('ESTOP_ACTIVE')
        if abs(self.current) >= self.limits.currentMax:
            result.append('CURRENT_HIGH')
        if self.temperature >= self.limits.temperatureMax:
            result.append('TEMPERATURE_HIGH')
        for channel, stamp in self.stamps.items():
            if stamp is None:
                result.append('MISSING_' + channel.upper())
            elif self.now - stamp > self.limits.timeout + 1e-9:
                result.append('STALE_' + channel.upper())
        for channel in sorted(self.invalid):
            result.append('INVALID_' + channel.upper())
        return result

    def arm(self, now=None):
        self.advance(self.now if now is None else now)
        reasons = self.reasons()
        if self.state != 'DISARMED' or self.faults or reasons:
            self._log('ARM_REJECTED', ', '.join(self.faults + reasons) or self.state)
            return False
        self.state = 'ARMED'
        self._log('ARMED', 'Explicit arm accepted')
        return True

    def reset(self, now=None):
        self.advance(self.now if now is None else now)
        reasons = self.reasons()
        if self.state != 'FAULT' or reasons:
            self._log('RESET_REJECTED', ', '.join(reasons) or 'No latched fault')
            return False
        self.faults = []
        self.state = 'DISARMED'
        self._log('RESET', 'Cleared latch; still inhibited until explicit arm')
        return True

    def disarm(self, now=None):
        self.advance(self.now if now is None else now)
        if self.state == 'ARMED':
            self.state = 'DISARMED'
            self._log('DISARMED', 'Operator disarm')

    def snapshot(self):
        reasons = self.reasons()
        enabled = self.state == 'ARMED' and not reasons
        return {'now': self.now, 'state': self.state, 'enabled': enabled,
                'target': self.target if enabled else self.feedback,
                'feedback': self.feedback, 'current': self.current,
                'temperature': self.temperature, 'estop': self.estop,
                'faults': list(self.faults), 'readiness': reasons,
                'ages': {k: None if t is None else self.now - t for k, t in self.stamps.items()}}
