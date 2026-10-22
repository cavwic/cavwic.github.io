"""Real CDR serialization / SQLite3 + MCAP roundtrip using SYNTHETIC messages.

Temporary bag creation is local test data, not ROS/DDS communication, hardware
measurement, or proof that an arbitrary user's bag/custom type is readable.
"""
from contextlib import redirect_stdout
from dataclasses import replace
import io
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

import numpy as np
from rosbags.highlevel import AnyReader
from rosbags.rosbag2 import StoragePlugin, Writer
from rosbags.typesys import Stores, get_typestore

from convert_rosbag import Options, convert, main, write_output


class TestSerializedRoundtrip(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='robotics-synthetic-bag-roundtrip-')
        self.folder = Path(self.temp.name)
        self.addCleanup(self.temp.cleanup)
        self.store = get_typestore(Stores.ROS2_JAZZY)
        self.options = Options('/feedback', 'rad', 'header', ('joint_1',),
                               command_topic='/command', command_unit='rad', command_time_source='receive',
                               current_topic='/current', current_unit='A',
                               temperature_topic='/temperature', temperature_unit='C')

    def make_bag(self, plugin):
        bag = self.folder / plugin.name.lower()
        float_type = 'std_msgs/msg/Float64'
        joint_type = 'sensor_msgs/msg/JointState'
        F = self.store.types[float_type]
        H = self.store.types['std_msgs/msg/Header']
        T = self.store.types['builtin_interfaces/msg/Time']
        J = self.store.types[joint_type]
        base = 1_700_000_000_000_000_000
        with Writer(bag, version=9, storage_plugin=plugin) as writer:
            connections = {topic: writer.add_connection(topic, kind, typestore=self.store)
                           for topic, kind in [('/command', float_type), ('/current', float_type),
                                               ('/temperature', float_type), ('/feedback', joint_type)]}
            for i in range(20):
                t = base + i * 20_000_000
                for topic, offset, value in [('/command', 0, .12 + .01 * i),
                                             ('/current', 1_000_000, .6),
                                             ('/temperature', 2_000_000, 35.)]:
                    writer.write(connections[topic], t + offset, self.store.serialize_cdr(F(value), float_type))
                sec, ns = divmod(t + 5_000_000, 1_000_000_000)
                joint = J(H(T(sec, ns), 'synthetic_test_only'), ['joint_1'],
                          np.array([.1 + .01 * i], dtype=np.float64),
                          np.array([.5], dtype=np.float64), np.array([], dtype=np.float64))
                writer.write(connections['/feedback'], t + 10_000_000,
                             self.store.serialize_cdr(joint, joint_type))
        return bag

    def read_convert(self, bag, options=None):
        options = options or self.options
        with AnyReader([bag], default_typestore=get_typestore(Stores.ROS2_JAZZY)) as reader:
            connections = [c for c in reader.connections if c.topic in options.topics()]
            self.assertEqual({c.topic for c in connections}, set(options.topics()))
            messages = ((c.topic, timestamp, reader.deserialize(raw, c.msgtype))
                        for c, timestamp, raw in reader.messages(connections=connections))
            return convert(messages, options, 'synthetic CDR serialization test, not hardware')

    def check_rows(self, dataset):
        self.assertEqual(len(dataset['frames']), 20)
        self.assertEqual(dataset['conversion']['missingOrInvalidCounts'], {})
        for i, row in enumerate(dataset['frames']):
            self.assertAlmostEqual(row['positionRad'][0], .1 + .01 * i)
            self.assertAlmostEqual(row['commandRad'][0], .12 + .01 * i)
            self.assertEqual(row['currentA'], .6)
            self.assertEqual(row['temperatureC'], 35.)
            self.assertEqual(row['timestampMs'], 10 + 20 * i)
            self.assertEqual(row['sensorTimestampMs'], 5 + 20 * i)
            self.assertEqual(row['commandTimestampMs'], 20 * i)

    def check_website_audit(self, dataset):
        node = shutil.which('node')
        if not node:
            self.skipTest('Node unavailable: cannot run actual website audit; Python roundtrip still passed')
        root = Path(__file__).resolve().parents[2]
        engine = (root / 'src/features/robotics-lab/data/engine.ts').as_uri()
        script = (f'import {{parseDataset,audit}} from {json.dumps(engine)};'
                  'let text=""; for await(const c of process.stdin) text+=c;'
                  'const report=audit(parseDataset(text));'
                  'process.stdout.write(JSON.stringify({rows:report.rows,validRows:report.validRows,codes:report.codes}));')
        result = subprocess.run([node, '--input-type=module', '-e', script],
                                input=json.dumps(dataset, allow_nan=False), text=True,
                                capture_output=True, timeout=20, check=True)
        report = json.loads(result.stdout)
        self.assertEqual(report, {'rows': 20, 'validRows': 20, 'codes': {}})

    def test_sqlite3_cdr_anyreader_json_website_audit(self):
        bag = self.make_bag(StoragePlugin.SQLITE3)
        dataset = self.read_convert(bag)
        self.check_rows(dataset)
        output = self.folder / 'sqlite-review.json'
        write_output(dataset, output, bag)
        saved = json.loads(output.read_text(encoding='utf-8'))
        self.assertEqual(saved['frames'], dataset['frames'])
        self.check_website_audit(saved)
        self.assertTrue(any(bag.glob('*.db3')))

    def test_mcap_cdr_anyreader_json_website_audit(self):
        bag = self.make_bag(StoragePlugin.MCAP)
        dataset = self.read_convert(bag)
        self.check_rows(dataset)
        self.check_website_audit(dataset)
        self.assertTrue(any(bag.glob('*.mcap')))

    def test_explicit_reception_time_source(self):
        bag = self.make_bag(StoragePlugin.SQLITE3)
        dataset = self.read_convert(bag, replace(self.options, sensor_time_source='receive'))
        for row in dataset['frames']:
            self.assertEqual(row['sensorTimestampMs'], row['timestampMs'])
            self.assertNotEqual(row['_source']['bagReceiveNs'], row['_source']['sensorHeaderNs'])
        self.assertIn('not network latency', dataset['provenance'])
        self.check_website_audit(dataset)

    def test_header_requested_but_float_command_has_no_header(self):
        bag = self.make_bag(StoragePlugin.MCAP)
        dataset = self.read_convert(bag, replace(self.options, command_time_source='header'))
        self.assertEqual(dataset['conversion']['missingOrInvalidCounts'], {'commandTimestampMs': 20})
        self.assertTrue(all(row['commandTimestampMs'] is None for row in dataset['frames']))
        self.assertTrue(all(row['commandRad'] is not None for row in dataset['frames']))
        # Missing timestamp should remain visible to the website schema checker.
        node = shutil.which('node')
        if not node:
            return
        engine = (Path(__file__).resolve().parents[2] / 'src/features/robotics-lab/data/engine.ts').as_uri()
        script = (f'import {{audit}} from {json.dumps(engine)};'
                  'let t=""; for await(const c of process.stdin)t+=c;'
                  'process.stdout.write(JSON.stringify(audit(JSON.parse(t)).codes));')
        result = subprocess.run([node, '--input-type=module', '-e', script], input=json.dumps(dataset),
                                text=True, capture_output=True, timeout=20, check=True)
        self.assertEqual(json.loads(result.stdout), {'SCHEMA': 20})

    def test_actual_cli_reader_path_and_output_protection(self):
        bag = self.make_bag(StoragePlugin.SQLITE3)
        output = self.folder / 'cli-review.json'
        args = ['--bag', str(bag), '--output', str(output),
                '--position-topic', '/feedback', '--position-unit', 'rad',
                '--sensor-time-source', 'header', '--joint-names', 'joint_1',
                '--command-topic', '/command', '--command-unit', 'rad', '--command-time-source', 'receive',
                '--current-topic', '/current', '--current-unit', 'A',
                '--temperature-topic', '/temperature', '--temperature-unit', 'C',
                '--split', 'test', '--duration-seconds', '2']
        with redirect_stdout(io.StringIO()) as stdout:
            main(args)
        self.assertEqual(json.loads(stdout.getvalue())['rows'], 20)
        self.check_rows(json.loads(output.read_text(encoding='utf-8')))
        self.assertRaises(ValueError, main, args)
        with redirect_stdout(io.StringIO()):
            main(args + ['--force'])
        self.assertTrue((bag / 'metadata.yaml').is_file())


if __name__ == '__main__':
    unittest.main(verbosity=2)
