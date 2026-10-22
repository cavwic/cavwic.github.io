"""Read-only rosbag2 -> website Dataset v1 conversion; no ROS process required.

Requires optional 'rosbags' for actual bag reading. Verified with synthetic CDR
messages written to ROS2 SQLite3 and MCAP bags, then AnyReader -> conversion ->
website schema audit. This is not hardware-bag or live ROS/DDS validation.
"""
import argparse
from dataclasses import asdict, dataclass
import json
import math
from pathlib import Path
import sys


@dataclass(frozen=True)
class Options:
    position_topic: str
    position_unit: str
    sensor_time_source: str
    joint_names: tuple
    command_topic: str | None = None
    command_unit: str | None = None
    command_time_source: str | None = None
    current_topic: str | None = None
    current_unit: str | None = None
    temperature_topic: str | None = None
    temperature_unit: str | None = None
    position_field: str = 'position'
    command_field: str = 'data'
    current_field: str = 'data'
    temperature_field: str = 'data'
    max_join_age_ms: float = 50.0
    episode: str = 'episode-1'
    split: str = 'test'
    max_frames: int = 20000

    def validate(self):
        if not self.position_topic.startswith('/') or self.position_unit not in ('rad', 'deg'):
            raise ValueError('Explicit absolute position topic and rad/deg unit required')
        if self.sensor_time_source not in ('header', 'receive'):
            raise ValueError('Choose sensor timestamp source: header or receive')
        if not 1 <= len(self.joint_names) <= 32 or len(set(self.joint_names)) != len(self.joint_names):
            raise ValueError('Provide 1..32 unique joint names, in output order')
        for topic, unit, allowed in ((self.command_topic, self.command_unit, ('rad', 'deg')),
                                     (self.current_topic, self.current_unit, ('A', 'mA')),
                                     (self.temperature_topic, self.temperature_unit, ('C', 'K'))):
            if topic is not None and (not topic.startswith('/') or unit not in allowed):
                raise ValueError('Every selected topic requires an explicit supported unit')
            if topic is None and unit is not None:
                raise ValueError('Unit supplied without a topic')
        if self.command_topic and self.command_time_source not in ('header', 'receive'):
            raise ValueError('Choose command timestamp source: header or receive')
        if self.command_time_source and not self.command_topic:
            raise ValueError('Command timestamp source supplied without command topic')
        topics = self.topics()
        if len(set(topics)) != len(topics):
            raise ValueError('Use distinct topics for each selected signal')
        if not math.isfinite(self.max_join_age_ms) or self.max_join_age_ms < 0:
            raise ValueError('Join age must be a finite nonnegative duration')
        if not 1 <= self.max_frames <= 20000:
            raise ValueError('Website supports 1..20000 frames per file')
        if not self.episode or len(self.episode) > 200 or self.split not in ('train', 'validation', 'test'):
            raise ValueError('Valid episode and explicit split required')
        for name in (self.position_field, self.command_field, self.current_field, self.temperature_field):
            if not name or any(not item.isidentifier() or item.startswith('_') for item in name.split('.')):
                raise ValueError('Field paths must be public attribute paths; no expressions')

    def topics(self):
        return [v for v in (self.position_topic, self.command_topic, self.current_topic, self.temperature_topic) if v]


def number(value):
    try:
        v = float(value)
        return v if math.isfinite(v) and not isinstance(value, (bool, str)) else None
    except (ValueError, TypeError, OverflowError):
        return None


def field(message, path):
    result = message
    for key in path.split('.'):
        result = getattr(result, key, None)
        if result is None:
            return None
    return result


def header_ns(message):
    stamp = field(message, 'header.stamp')
    if stamp is None:
        return None
    sec, ns = getattr(stamp, 'sec', None), getattr(stamp, 'nanosec', None)
    if not isinstance(sec, int) or not isinstance(ns, int) or not 0 <= ns < 1_000_000_000:
        return None
    # A zero stamp is preserved, not reinterpreted as bag reception.
    return sec * 1_000_000_000 + ns


def vector(message, path, unit, joint_names):
    raw = field(message, path)
    if raw is None:
        return None
    if isinstance(raw, (int, float)):
        values = [number(raw)]
    else:
        try:
            values = [number(x) for x in raw]
        except TypeError:
            return None
    names = getattr(message, 'name', None) if path == 'position' else None
    if names is not None:
        names = list(names)
        if len(names) != len(values) or len(set(names)) != len(names) or any(j not in names for j in joint_names):
            return None
        values = [values[names.index(j)] for j in joint_names]
    if len(values) != len(joint_names) or any(x is None for x in values):
        return None
    factor = math.pi / 180 if unit == 'deg' else 1
    return [x * factor for x in values]


def scalar(message, path, unit):
    value = number(field(message, path))
    if value is None:
        return None
    return value / 1000 if unit == 'mA' else value - 273.15 if unit == 'K' else value


def convert(messages, options, source_label='unverified rosbag source'):
    """messages yields (topic, bag_receive_timestamp_ns, deserialized_message).

    Causal zero-order-hold joins only: no future data, no interpolation, no zero
    imputation. Anchor rows are position messages. Late/stale/missing signals
    remain null, intentionally causing website SCHEMA issues for review.
    """
    options.validate()
    latest = {}
    frames = []
    origin_ns = None
    previous_ns = None
    missing = {}
    for topic, stamp, message in messages:
        if topic not in options.topics():
            continue
        if not isinstance(stamp, int) or stamp < 0:
            raise ValueError('Bag reception timestamps must be nonnegative integer nanoseconds')
        if previous_ns is not None and stamp < previous_ns:
            raise ValueError('Bag iterator must be timestamp-ordered; input is never silently sorted')
        previous_ns = stamp
        if origin_ns is None:
            origin_ns = stamp
        latest[topic] = (stamp, message)
        if topic != options.position_topic:
            continue
        if len(frames) >= options.max_frames:
            raise ValueError('Frame limit exceeded; select a smaller bag/window rather than silently truncate')

        def sample(selected_topic):
            item = latest.get(selected_topic)
            return item if item and (stamp - item[0]) / 1e6 <= options.max_join_age_ms else None

        def relative_time(item, mode):
            if item is None:
                return None
            absolute = item[0] if mode == 'receive' else header_ns(item[1])
            return None if absolute is None else (absolute - origin_ns) / 1e6

        command = sample(options.command_topic)
        current = sample(options.current_topic)
        temperature = sample(options.temperature_topic)
        sensor = (stamp, message)
        row = {
            'episodeId': options.episode,
            'split': options.split,
            'timestampMs': (stamp - origin_ns) / 1e6,
            'sensorTimestampMs': relative_time(sensor, options.sensor_time_source),
            'commandTimestampMs': relative_time(command, options.command_time_source),
            'positionRad': vector(message, options.position_field, options.position_unit, options.joint_names),
            'commandRad': None if command is None else vector(command[1], options.command_field, options.command_unit, options.joint_names),
            'currentA': None if current is None else scalar(current[1], options.current_field, options.current_unit),
            'temperatureC': None if temperature is None else scalar(temperature[1], options.temperature_field, options.temperature_unit),
            '_source': {
                'bagReceiveNs': str(stamp),
                'sensorHeaderNs': None if header_ns(message) is None else str(header_ns(message)),
                'commandBagReceiveNs': None if command is None else str(command[0]),
                'commandHeaderNs': None if command is None or header_ns(command[1]) is None else str(header_ns(command[1])),
                'currentBagReceiveNs': None if current is None else str(current[0]),
                'temperatureBagReceiveNs': None if temperature is None else str(temperature[0]),
            },
        }
        for key in ('sensorTimestampMs', 'commandTimestampMs', 'positionRad', 'commandRad', 'currentA', 'temperatureC'):
            if row[key] is None:
                missing[key] = missing.get(key, 0) + 1
        frames.append(row)
    if not frames:
        raise ValueError('No position messages found for the selected topic')
    return {
        'version': 1,
        'provenance': 'Converted offline from rosbag2; not necessarily real hardware. '
                      + source_label + '. Bag/header timestamp offsets are not network latency.',
        'frames': frames,
        'conversion': {
            'options': asdict(options), 'originBagReceiveNs': str(origin_ns),
            'join': 'causal last received sample, maximum age applied; no future samples or interpolation',
            'missingOrInvalidCounts': missing,
            'missingPolicy': 'null; website schema audit must report missing fields, never imputed as zero',
            'timestampWarning': 'Reception vs header offsets include clock-domain and publisher timing differences; no synchronization established.',
            'verification': 'Converter tested with synthetic CDR SQLite3/MCAP serialization roundtrips; source provenance is caller-declared, not hardware or live ROS validation.',
        },
    }


def write_output(dataset, output, bag, force=False):
    output, bag = Path(output).resolve(), Path(bag).resolve()
    if output == bag or (bag.is_dir() and output.is_relative_to(bag)):
        raise ValueError('Output must be outside the source bag; bag files are read-only')
    if output.suffix.lower() != '.json':
        raise ValueError('Output must have .json extension')
    if not output.parent.is_dir():
        raise ValueError('Output parent directory must already exist')
    text = json.dumps(dataset, ensure_ascii=False, indent=2, allow_nan=False)
    if len(text.encode('utf-8')) > 8_000_000:
        raise ValueError('JSON exceeds the website 8 MB limit; select a smaller bag/window')
    # Exclusive create by default, so a prior result is never silently overwritten.
    with output.open('w' if force else 'x', encoding='utf-8', newline='\n') as stream:
        stream.write(text)


def parser():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--bag', type=Path, required=True, help='rosbag2 directory (SQLite3 or MCAP storage)')
    p.add_argument('--output', type=Path, required=True)
    p.add_argument('--force', action='store_true', help='explicitly overwrite output JSON, never source bag')
    p.add_argument('--position-topic', required=True)
    p.add_argument('--position-unit', choices=('rad', 'deg'), required=True)
    p.add_argument('--position-field', default='position')
    p.add_argument('--sensor-time-source', choices=('header', 'receive'), required=True)
    p.add_argument('--joint-names', nargs='+', required=True)
    for role, units in (('command', ('rad', 'deg')), ('current', ('A', 'mA')), ('temperature', ('C', 'K'))):
        p.add_argument('--' + role + '-topic')
        p.add_argument('--' + role + '-unit', choices=units)
        p.add_argument('--' + role + '-field', default='data')
    p.add_argument('--command-time-source', choices=('header', 'receive'))
    p.add_argument('--max-join-age-ms', type=float, default=50)
    p.add_argument('--episode', default='episode-1')
    p.add_argument('--split', choices=('train', 'validation', 'test'), required=True)
    p.add_argument('--start-seconds', type=float, default=0)
    p.add_argument('--duration-seconds', type=float, default=30)
    p.add_argument('--max-frames', type=int, default=20000)
    return p


def main(argv=None):
    args = parser().parse_args(argv)
    options = Options(**{k: tuple(v) if k == 'joint_names' else v for k, v in vars(args).items()
                         if k in Options.__dataclass_fields__})
    options.validate()
    bag, output = args.bag.resolve(), args.output.resolve()
    if not bag.is_dir() or not (bag / 'metadata.yaml').is_file():
        raise ValueError('Select the original rosbag2 directory containing metadata.yaml (including MCAP-storage bags)')
    if output == bag or output.is_relative_to(bag) or (output.exists() and not args.force):
        raise ValueError('Output exists or is inside source bag; use a separate new JSON path')
    if (not math.isfinite(args.start_seconds) or args.start_seconds < 0 or
            not math.isfinite(args.duration_seconds) or args.duration_seconds <= 0):
        raise ValueError('Start/duration must be finite, start >=0 and duration >0')
    try:
        from rosbags.highlevel import AnyReader
        from rosbags.typesys import Stores, get_typestore
    except ImportError as exc:
        raise RuntimeError('Optional rosbags dependency is missing. No installation was attempted; see README.') from exc
    with AnyReader([bag], default_typestore=get_typestore(Stores.ROS2_JAZZY)) as reader:
        connections = [c for c in reader.connections if c.topic in options.topics()]
        found = {c.topic for c in connections}
        if options.position_topic not in found:
            raise ValueError('Position topic absent from bag')
        missing_topics = set(options.topics()) - found
        if missing_topics:
            print('Selected topics absent; null fields will be preserved: ' + ', '.join(sorted(missing_topics)), file=sys.stderr)
        start = reader.start_time + int(args.start_seconds * 1e9)
        stop = start + int(args.duration_seconds * 1e9)
        messages = ((c.topic, stamp, reader.deserialize(raw, c.msgtype))
                    for c, stamp, raw in reader.messages(connections=connections, start=start, stop=stop))
        dataset = convert(messages, options, f'bag={bag.name}; window={args.start_seconds}..{args.start_seconds + args.duration_seconds}s')
    write_output(dataset, output, bag, args.force)
    print(json.dumps({'output': str(output), 'rows': len(dataset['frames']),
                      'missingOrInvalid': dataset['conversion']['missingOrInvalidCounts']}, ensure_ascii=False))


if __name__ == '__main__':
    try:
        main()
    except (ValueError, RuntimeError, FileExistsError, OSError) as exc:
        print('Conversion stopped: ' + str(exc), file=sys.stderr)
        raise SystemExit(2)
