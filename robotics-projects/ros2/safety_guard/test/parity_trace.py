"""JSON stdin action trace for JS/Python parity, without ROS dependency."""
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from safety_guard.core import SafetyKernel  # noqa: E402


def main():
    aliases = {'jointState': 'joint_state', 'emergencyStop': 'emergency_stop',
               'currentSample': 'current_sample', 'temperatureSample': 'temperature_sample'}
    k = SafetyKernel()
    result = []
    for action in json.load(sys.stdin):
        method = aliases.get(action['method'], action['method'])
        args = [float('nan') if a == 'NaN' else a for a in action.get('args', [])]
        getattr(k, method)(*args)
        snapshot = k.snapshot()
        snapshot['readiness'].sort()
        result.append(snapshot)
    print(json.dumps(result, allow_nan=False))


if __name__ == '__main__':
    main()
