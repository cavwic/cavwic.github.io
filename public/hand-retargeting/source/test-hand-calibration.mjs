import assert from 'node:assert/strict';
import {
  HandCalibrationSession, CalibrationError, applyCalibration, validateCalibrationProfile,
  importCalibrationProfile, exportCalibrationProfile,
} from '../src/features/hand-retargeting/calibration.ts';
import { modelKinematicsId, normalizeLandmarks } from '../src/features/hand-retargeting/engine.ts';

// These fixtures are explicitly synthetic and independent of engine finger FK.
// No result from this file establishes performance on a real camera or human hand.
const chains = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16], [17, 18, 19, 20]];
const bases = [[.043, .03, 0], [.03, .08, 0], [0, .087, 0], [-.024, .081, 0], [-.044, .068, 0]];
const lengths = [[.040, .030, .023], [.045, .027, .020], [.051, .030, .023], [.047, .029, .020], [.038, .024, .018]];
const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const mul = (a, s) => a.map(v => v * s);
const norm = v => Math.hypot(...v);
const unit = v => mul(v, 1 / norm(v));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const clone = v => structuredClone(v);

function finger(base, lens, bend, spread = 0) {
  const points = [[...base]];
  let p = [...base], theta = 0;
  lens.forEach((length, i) => {
    theta += bend[i];
    p = add(p, [-Math.sin(spread) * Math.cos(theta) * length, Math.cos(spread) * Math.cos(theta) * length, Math.sin(theta) * length]);
    points.push(p);
  });
  return points;
}
function reachFinger(base, lens, tip) {
  // Analytic two-link construction with collinear second/third segments.
  const delta = sub(tip, base), dist = norm(delta), direction = unit(delta);
  const remaining = lens[1] + lens[2];
  const along = (lens[0] ** 2 - remaining ** 2 + dist ** 2) / (2 * dist);
  const height = Math.sqrt(lens[0] ** 2 - along ** 2);
  const side = unit(cross(direction, [1, 0, 0]));
  const first = add(base, add(mul(direction, along), mul(side, height)));
  const second = add(first, mul(sub(tip, first), lens[1] / remaining));
  return [[...base], first, second, [...tip]];
}
function hand(phase) {
  const points = [[0, 0, 0]];
  for (let f = 0; f < 5; f++) {
    const bend = phase === 'fist' ? [.65, 1.3, 1.1] : [0, .02, .015];
    const chain = phase === 'pinch' && f < 2
      ? reachFinger(bases[f], lengths[f], [.030 + (f === 0 ? -.0015 : .0015), .105, .032])
      : finger(bases[f], lengths[f], bend, f === 0 ? -.65 : (2 - f) * .05);
    points.push(...chain);
  }
  return points;
}
function frame(phase, n, left = false, scale = 1) {
  // Small rigid motion supplies distinct frames without changing true bone lengths.
  const angle = .007 * Math.sin(n * .4), c = Math.cos(angle), s = Math.sin(angle);
  return hand(phase).map(([x, y, z]) => {
    const point = [(x * c - y * s) * scale + .0001 * n, (x * s + y * c) * scale - .00005 * n, z * scale + .02];
    return left ? [-point[0], point[1], point[2]] : point;
  });
}
const options = { name: 'Synthetic regression fixture', provenance: 'synthetic', createdAt: '2026-10-20T00:00:00.000Z' };
function capture({ left = false, count = 24, scale = 1, source = 'synthetic' } = {}) {
  const session = new HandCalibrationSession({ ...options, provenance: source });
  let time = 0;
  for (const phase of ['open', 'fist', 'pinch']) for (let n = 0; n < count; n++) {
    const result = session.addFrame(phase, frame(phase, n, left, scale), left ? 'Left' : 'Right', time += 33);
    assert(result.accepted, `${phase} frame ${n}: ${result.code} ${result.reason}`);
  }
  return session;
}
const throwsCode = (fn, code) => assert.throws(fn, e => e instanceof CalibrationError && e.code === code);

const session = capture(), profile = session.finish();
assert.equal(profile.version, 2);
assert.equal(profile.modelId, modelKinematicsId);
assert.equal(profile.provenance, 'synthetic');
assert.equal(profile.handedness, 'Right');
assert.deepEqual(profile.sampleCounts, { open: 24, fist: 24, pinch: 24 });
assert.equal(validateCalibrationProfile(profile).valid, true);
assert.deepEqual(importCalibrationProfile(exportCalibrationProfile(profile)), profile);
assert.deepEqual(capture().finish(), profile, 'fixed synthetic input/date must yield a reproducible profile');
for (const phase of ['open', 'fist', 'pinch']) assert(session.getPhaseStatus(phase).ready);

// A gesture label alone does not qualify a frame; each phase has actual geometry gates.
const shapeSession = new HandCalibrationSession(options);
for (const [phase, actual, code] of [['open', 'fist', 'POSE_NOT_OPEN'], ['fist', 'open', 'POSE_NOT_FIST'], ['pinch', 'open', 'POSE_NOT_PINCH']]) {
  const result = shapeSession.addFrame(phase, hand(actual), 'Right', 1000);
  assert.equal(result.accepted, false);
  assert.equal(result.code, code);
}
const nan = hand('open'); nan[3][0] = NaN;
assert.equal(shapeSession.addFrame('open', nan, 'Right', 1001).code, 'INVALID_LANDMARKS');
assert.equal(shapeSession.addFrame('open', Array.from({ length: 21 }, () => [0, 0, 0]), 'Right', 1002).code, 'DEGENERATE_PALM');
const sparsePoints = hand('open'); delete sparsePoints[4];
assert.equal(shapeSession.addFrame('open', sparsePoints, 'Right', 1002).code, 'INVALID_LANDMARKS');
assert.equal(shapeSession.addFrame('open', hand('open').map(p => mul(p, 1000)), 'Right', 1003).code, 'IMPLAUSIBLE_DIMENSIONS');
const invalidBone = hand('open'); invalidBone[6] = [...invalidBone[5]];
assert.equal(shapeSession.addFrame('open', invalidBone, 'Right', 1004).code, 'IMPLAUSIBLE_BONES');
const backwardOpen = hand('open');
for (const chain of chains.slice(1)) for (const i of chain.slice(1)) backwardOpen[i] = add(backwardOpen[chain[0]], mul(sub(backwardOpen[i], backwardOpen[chain[0]]), -1));
assert.equal(shapeSession.addFrame('open', backwardOpen, 'Right', 1005).code, 'POSE_NOT_OPEN');

const timing = new HandCalibrationSession(options);
assert(timing.addFrame('open', frame('open', 0), 'Right', 100).accepted);
assert.equal(timing.addFrame('open', frame('open', 1), 'Right', 100).code, 'DUPLICATE_TIMESTAMP');
assert.equal(timing.addFrame('open', frame('open', 2), 'Right', 99).code, 'DUPLICATE_TIMESTAMP');
assert.equal(timing.addFrame('open', frame('open', 2), 'Right', 104).code, 'FRAME_TOO_SOON');
assert.equal(timing.addFrame('open', frame('open', 2, true), 'Left', 133).code, 'HANDEDNESS_MISMATCH');
assert.equal(timing.getPhaseStatus('open').acceptedFrames, 1);
assert.equal(timing.addFrame('open', hand('open'), 'Right', Infinity).code, 'INVALID_TIMESTAMP');
throwsCode(() => timing.finish(), 'INSUFFICIENT_FRAMES');
throwsCode(() => new HandCalibrationSession({ ...options, minFramesPerPhase: 1 }), 'INVALID_FRAME_REQUIREMENT');
const insufficient = capture({ count: 19 });
throwsCode(() => insufficient.finish(), 'INSUFFICIENT_FRAMES');

const outliers = new HandCalibrationSession(options);
for (let n = 0; n < 6; n++) assert(outliers.addFrame('open', frame('open', n), 'Right', n * 33).accepted);
assert.equal(outliers.addFrame('open', frame('open', 6, false, 1.4), 'Right', 210).code, 'BONE_LENGTH_OUTLIER');
// A plausible early outlier bypasses the online warmup but is removed robustly at finish.
const robust = new HandCalibrationSession(options);
let robustTime = 0;
assert(robust.addFrame('open', frame('open', 0, false, 1.20), 'Right', robustTime += 33).accepted);
for (const phase of ['open', 'fist', 'pinch']) for (let n = 0; n < 24; n++)
  assert(robust.addFrame(phase, frame(phase, n), 'Right', robustTime += 33).accepted);
const robustProfile = robust.finish();
assert.equal(robustProfile.sampleCounts.open, 24);
assert.equal(robustProfile.quality.rejectedFrames, 1);
assert(Math.abs(robustProfile.palmWidthM - profile.palmWidthM) < 1e-12);

// Fixed global scale must preserve camera-estimated size changes after calibration.
const raw = frame('pinch', 3), applied = applyCalibration(raw, 'Right', profile, 'synthetic');
const larger = applyCalibration(frame('pinch', 3, false, 1.08), 'Right', profile, 'synthetic');
assert(Math.abs(norm(larger.normalizedPalmPoints[9]) / norm(applied.normalizedPalmPoints[9]) - 1.08) < 1e-9);
assert.deepEqual(applied.pinchTargetVector, sub(applied.normalizedPalmPoints[4], applied.normalizedPalmPoints[8]));
assert(norm(sub(applied.pinchTargetVector, sub(applied.retargetPoints[4], applied.retargetPoints[8]))) > 1e-5,
  'cross-finger pinch target must not be recomputed after independent finger scaling');
chains.forEach((chain, f) => {
  const actual = [0, 1, 2].reduce((sum, i) => sum + norm(sub(applied.retargetPoints[chain[i + 1]], applied.retargetPoints[chain[i]])), 0);
  assert(Math.abs(actual - profile.targetFingerLengthsM[f]) < 1e-9);
  assert.deepEqual(applied.retargetPoints[chain[0]], applied.normalizedPalmPoints[chain[0]]);
});
throwsCode(() => applyCalibration(raw, 'Left', profile, 'synthetic'), 'HANDEDNESS_MISMATCH');
throwsCode(() => applyCalibration(raw, 'Right', profile, 'camera'), 'SOURCE_MISMATCH');
throwsCode(() => applyCalibration(raw, 'Right', profile), 'SOURCE_MISMATCH');
throwsCode(() => applyCalibration(frame('pinch', 0, false, 1.6), 'Right', profile, 'synthetic'), 'GEOMETRY_MISMATCH');
const leftProfile = capture({ left: true }).finish();
assert.equal(leftProfile.handedness, 'Left');
assert.equal(applyCalibration(frame('open', 0, true), 'Left', leftProfile, 'synthetic').retargetPoints.length, 21);
throwsCode(() => applyCalibration(raw, 'Right', leftProfile, 'synthetic'), 'HANDEDNESS_MISMATCH');

// Every serialized field is validated; NaN must never silently become JSON null.
const corruptions = [
  p => { p.version = 3; }, p => { p.modelId = 'other-thumb-chain'; }, p => { p.name = ''; }, p => { p.createdAt = 'yesterday'; },
  p => { p.provenance = 'real'; }, p => { p.handedness = 'right'; },
  p => { p.palmWidthM = NaN; }, p => { p.normalizationScale *= 2; }, p => { p.referencePalmWidthM = 0; },
  p => { p.fingerScales[2] = Infinity; }, p => { p.rawMedianFingerLengthsM[0] *= 1.1; },
  p => { delete p.fingerScales[1]; },
  p => { p.rawMedianBoneLengthsM.pop(); }, p => { p.targetFingerLengthsM[0] *= 1.1; },
  p => { p.openPose[2][0] = null; }, p => { p.closedPose = clone(p.openPose); }, p => { p.pinchPose = clone(p.openPose); },
  p => { p.openFingerCurlRad[1] = -1; }, p => { p.closedFingerCurlRad[2] += .1; }, p => { p.pinchGapM = .05; },
  p => { p.sampleCounts.pinch = 19; }, p => { p.sampleCounts.extra = 20; },
  p => { p.quality.palmWidthRelativeMad = NaN; }, p => { p.quality.boneLengthRelativeMad[0] = .2; },
  p => { p.quality.phaseSpanMs.open = -1; }, p => { p.quality.rejectedFrames = 1.5; },
  p => { p.quality.extra = 0; }, p => { p.extra = 'unvalidated'; },
];
for (const mutate of corruptions) {
  const invalid = clone(profile); mutate(invalid);
  assert.equal(validateCalibrationProfile(invalid).valid, false, String(mutate));
  throwsCode(() => exportCalibrationProfile(invalid), 'INVALID_PROFILE');
}
throwsCode(() => importCalibrationProfile('{'), 'INVALID_JSON');
throwsCode(() => importCalibrationProfile('{}'), 'INVALID_PROFILE');
assert.equal(importCalibrationProfile(exportCalibrationProfile(profile)).provenance, 'synthetic');
const importedProfile = capture({ source: 'imported' }).finish();
throwsCode(() => applyCalibration(raw, 'Right', importedProfile, 'camera'), 'SOURCE_MISMATCH');
assert.equal(applyCalibration(raw, 'Right', importedProfile, 'imported').retargetPoints.length, 21);

// Independent anatomical direction fixture, not engine FK: a right hand rests
// palm-down, fingertips toward world +Y and thumb/index toward world -X.
// Therefore its palmar normal is world -Z. Curling into the palm must become
// canonical +Z. A mirrored left hand uses its true Left label, not a fake Right.
const worldPalmDown = (phase, n, left = false) => frame(phase, n).map(([x, y, z]) => [left ? x : -x, y, -z]);
const downRight = worldPalmDown('fist', 0), downLeft = worldPalmDown('fist', 0, true);
for (const i of [6, 7, 8]) assert(downRight[i][2] < downRight[0][2]);
const normalizedRight = normalizeLandmarks(downRight, 'Right');
const normalizedLeft = normalizeLandmarks(downLeft, 'Left');
for (const i of [6, 7, 8]) assert(normalizedRight.points[i][2] > 0, 'actual right palmar flexion is canonical +Z');
for (let i = 0; i < 21; i++) assert(norm(sub(normalizedRight.points[i], normalizedLeft.points[i])) < 1e-10);
const anatomicalSession = new HandCalibrationSession({ ...options, name: 'Synthetic independent palm-down fixture', handedness: 'Right' });
let anatomicalTime = 0;
for (const phase of ['open', 'fist', 'pinch']) for (let n = 0; n < 24; n++)
  assert(anatomicalSession.addFrame(phase, worldPalmDown(phase, n), 'Right', anatomicalTime += 33).accepted);
const anatomicalProfile = anatomicalSession.finish();
assert.equal(anatomicalProfile.provenance, 'synthetic');
for (const i of [6, 7, 8]) assert(applyCalibration(downRight, 'Right', anatomicalProfile, 'synthetic').normalizedPalmPoints[i][2] > 0);

// Old profiles are retained by their caller as raw JSON, never automatically
// upgraded to the new thumb chain merely because palm widths happen to match.
const legacy = clone(profile); legacy.version = 1; delete legacy.modelId;
const oldJson = JSON.stringify(legacy), oldSnapshot = oldJson;
throwsCode(() => importCalibrationProfile(oldJson), 'LEGACY_PROFILE');
throwsCode(() => applyCalibration(raw, 'Right', legacy, 'synthetic'), 'LEGACY_PROFILE');
throwsCode(() => exportCalibrationProfile(legacy), 'LEGACY_PROFILE');
assert.equal(oldJson, oldSnapshot);
assert.equal(validateCalibrationProfile(legacy).valid, false);
const otherModel = clone(profile); otherModel.modelId = 'same-lengths-different-thumb-chain';
throwsCode(() => importCalibrationProfile(JSON.stringify(otherModel)), 'MODEL_MISMATCH');
throwsCode(() => applyCalibration(raw, 'Right', otherModel, 'synthetic'), 'MODEL_MISMATCH');

console.log('Hand calibration: synthetic multi-frame geometry, phase gates, robust filtering, fixed-scale mapping, provenance and serialization checks passed.');
