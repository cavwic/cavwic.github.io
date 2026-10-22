"""Stdlib mock tests only: no claim of rosbag/MCAP roundtrip verification."""
from dataclasses import replace
import json
import math
from pathlib import Path
from types import SimpleNamespace as M
import tempfile
import unittest

from convert_rosbag import Options, convert, write_output, vector, header_ns


def joint(values, stamp=1000000000, names=('joint_1',)):
    sec, ns = divmod(stamp, 1_000_000_000)
    return M(position=list(values), name=list(names), header=M(stamp=M(sec=sec, nanosec=ns)))


class TestConverter(unittest.TestCase):
    def setUp(self):
        self.options = Options('/feedback', 'rad', 'header', ('joint_1',),
                               command_topic='/command', command_unit='rad', command_time_source='receive',
                               current_topic='/current', current_unit='A',
                               temperature_topic='/temperature', temperature_unit='C')

    def messages(self):
        return [('/command', 1_000_000_000, M(data=.3)),
                ('/current', 1_001_000_000, M(data=.6)),
                ('/temperature', 1_002_000_000, M(data=35)),
                ('/feedback', 1_010_000_000, joint([.2], 1_005_000_000))]

    def test_full_row_matches_website_schema(self):
        data = convert(self.messages(), self.options)
        row = data['frames'][0]
        self.assertEqual(row['positionRad'], [.2])
        self.assertEqual(row['commandRad'], [.3])
        self.assertEqual(row['currentA'], .6)
        self.assertEqual(row['temperatureC'], 35)
        self.assertEqual(row['timestampMs'], 10)
        self.assertEqual(row['sensorTimestampMs'], 5)
        self.assertEqual(row['commandTimestampMs'], 0)
        self.assertEqual(row['_source']['bagReceiveNs'], '1010000000')
        self.assertEqual(data['conversion']['missingOrInvalidCounts'], {})

    def test_missing_signals_remain_null_not_zero(self):
        data = convert([self.messages()[-1]], replace(self.options, command_topic=None, command_unit=None,
                       command_time_source=None, current_topic=None, current_unit=None, temperature_topic=None, temperature_unit=None))
        row = data['frames'][0]
        self.assertIsNone(row['commandRad'])
        self.assertIsNone(row['currentA'])
        self.assertIsNone(row['temperatureC'])
        self.assertIn('commandRad', data['conversion']['missingOrInvalidCounts'])

    def test_stale_command_is_not_interpolated(self):
        messages = self.messages() + [('/feedback', 1_100_000_000, joint([.25], 1_095_000_000))]
        row = convert(messages, self.options)['frames'][-1]
        self.assertIsNone(row['commandRad'])
        self.assertIsNone(row['currentA'])

    def test_header_absence_never_falls_back_silently(self):
        opts = replace(self.options, sensor_time_source='header', position_field='data')
        row = convert([('/feedback', 10, M(data=.2))], opts)['frames'][0]
        self.assertIsNone(row['sensorTimestampMs'])
        self.assertEqual(row['positionRad'], [.2])

    def test_explicit_receive_time_is_supported_and_labeled(self):
        opts = replace(self.options, sensor_time_source='receive', position_field='data')
        row = convert([('/feedback', 10, M(data=.2))], opts)['frames'][0]
        self.assertEqual(row['sensorTimestampMs'], 0)
        self.assertIsNone(row['_source']['sensorHeaderNs'])

    def test_units_are_explicit_and_converted(self):
        opts = replace(self.options, position_unit='deg', command_unit='deg', current_unit='mA', temperature_unit='K')
        messages = [('/command', 0, M(data=90)), ('/current', 1, M(data=600)),
                    ('/temperature', 2, M(data=308.15)), ('/feedback', 3, joint([180], 0))]
        row = convert(messages, opts)['frames'][0]
        self.assertAlmostEqual(row['positionRad'][0], math.pi)
        self.assertAlmostEqual(row['commandRad'][0], math.pi / 2)
        self.assertAlmostEqual(row['currentA'], .6)
        self.assertAlmostEqual(row['temperatureC'], 35)

    def test_joint_names_reorder_and_missing_names_reject(self):
        message = joint([.1, .2], names=('a', 'b'))
        self.assertEqual(vector(message, 'position', 'rad', ('b', 'a')), [.2, .1])
        self.assertIsNone(vector(message, 'position', 'rad', ('missing',)))

    def test_nonfinite_input_becomes_null_json_is_standard(self):
        messages = self.messages()
        messages[0] = ('/command', 1_000_000_000, M(data=math.nan))
        data = convert(messages, self.options)
        self.assertIsNone(data['frames'][0]['commandRad'])
        json.dumps(data, allow_nan=False)

    def test_no_future_join_and_no_silent_sort(self):
        messages = [self.messages()[-1], ('/command', 1_020_000_000, M(data=.3))]
        self.assertIsNone(convert(messages, self.options)['frames'][0]['commandRad'])
        self.assertRaises(ValueError, convert, list(reversed(self.messages())), self.options)

    def test_bad_mapping_and_frame_limit_rejected(self):
        for options in (replace(self.options, current_unit=None), replace(self.options, command_topic='/feedback'),
                        replace(self.options, position_field='__class__'), replace(self.options, max_join_age_ms=math.nan)):
            self.assertRaises(ValueError, options.validate)
        self.assertRaises(ValueError, convert, self.messages() + [('/feedback', 1_020_000_000, joint([.2]))], replace(self.options, max_frames=1))

    def test_output_never_overwrites_source_or_existing_without_force(self):
        # Temporary test artifacts only; never touches user's bag files.
        with tempfile.TemporaryDirectory(prefix='robotics-converter-test-') as folder:
            base = Path(folder)
            bag = base / 'bag'
            bag.mkdir()
            output = base / 'out.json'
            data = convert(self.messages(), self.options)
            write_output(data, output, bag)
            self.assertRaises(FileExistsError, write_output, data, output, bag)
            self.assertRaises(ValueError, write_output, data, bag / 'bad.json', bag, True)
            write_output(data, output, bag, True)
            self.assertEqual(json.loads(output.read_text(encoding='utf-8'))['version'], 1)

    def test_zero_stamp_preserved_for_clock_audit(self):
        self.assertEqual(header_ns(joint([.1], 0)), 0)
        row = convert([('/feedback', 1_000_000_000, joint([.1], 0))], self.options)['frames'][0]
        self.assertEqual(row['sensorTimestampMs'], -1000)


if __name__ == '__main__':
    unittest.main()
