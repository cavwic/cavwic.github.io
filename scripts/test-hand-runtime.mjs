import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFile } from 'node:fs/promises';
const source=await readFile(new URL('../src/features/hand-retargeting/runtime.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
const {LandmarkFilter,StationaryVariation,TrackingQuality}=await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const points = Array.from({ length: 21 }, (_, i) => [i * .002, i * .004, 0]);
const moved = points.map(p => p.map(v => v + .01));
const filter = new LandmarkFilter();
assert.deepEqual(filter.update(points, 0, .03), points);
const halfway = filter.update(moved, 30, .03);
assert(Math.abs(halfway[0][0] - .01 * (1 - Math.exp(-1))) < 1e-12);
assert.deepEqual(filter.update(moved, 30, .03), halfway, 'duplicate input must not advance the EMA');
assert.deepEqual(filter.update(moved, 29, .03), halfway, 'out-of-order frame must not advance the EMA');
halfway[0][0] = 99;
assert.notEqual(filter.update(moved, 30, .03)[0][0], 99, 'returned arrays cannot mutate filter history');
assert.deepEqual(filter.update(moved, 1100, .03), moved, 'reacquisition reinitializes after a long gap');
filter.reset();
assert.deepEqual(filter.update(points, 0, 0), points);
assert.deepEqual(filter.update(moved, 30, 0), moved);
assert.throws(() => filter.update([], 40, .03));
assert.throws(() => filter.update(points, -1, .03));
assert.throws(() => filter.update(points, NaN, .03));
const sparse = structuredClone(points); delete sparse[4];
assert.throws(() => filter.update(sparse, 40, .03));
const sparseAxis = structuredClone(points); delete sparseAxis[4][1];
assert.throws(() => filter.update(sparseAxis, 40, .03));
const filterA = new LandmarkFilter(), filterB = new LandmarkFilter();
filterA.update(points, 0, .03); filterB.update(points, 0, .03);
filterA.update(moved, 30, .03);
assert(Math.abs(filterA.update(moved, 60, .03)[0][0] - filterB.update(moved, 60, .03)[0][0]) < 1e-12,
  'EMA response to a fixed target must depend on elapsed time, not rendering frequency');

const still = new StationaryVariation(); let variation;
for (let i = 0; i < 30; i++) variation = still.update(points, points, i * 33);
assert.equal(variation.stationary, true); assert(Math.abs(variation.rmsMm) < 1e-10);
const originalFrames = variation.frames;
variation = still.update(moved, moved, 29 * 33);
assert.equal(variation.frames, originalFrames); assert(Math.abs(variation.rmsMm) < 1e-10);
variation = still.update(moved, moved, 28 * 33);
assert.equal(variation.frames, originalFrames);
assert.equal(still.update(points, points, 2000).rmsMm, null, 'a sample gap starts a fresh stationary window');
assert.equal(still.update(sparse, points, 2033).frames, 0, 'invalid input invalidates the old stationary window');
for (let i = 0; i < 11; i++) variation = still.update(points, points, 3000 + i * 33);
assert.equal(variation.rmsMm, null);
for (let i = 0; i < 20; i++) variation = still.update(points, points, 3330);
assert.equal(variation.rmsMm, null, 'repeated timestamps cannot fill a short window');

still.reset();
for (let i = 0; i < 30; i++) {
  const moving = points.map(p => [p[0] + i * .002, p[1], p[2]]);
  variation = still.update(moving, moving, i * 33);
}
assert.equal(variation.rmsMm, null); assert.equal(variation.stationary, false);
still.reset();
for (let i = 0; i < 30; i++) {
  const bending = structuredClone(points); bending[6][2] += i * .002;
  variation = still.update(bending, points, i * 33);
}
assert.equal(variation.rmsMm, null, 'moving a proximal joint is not stationary even when tips are fixed');
still.reset();
for (let i = 0; i < 30; i++) {
  const spike = structuredClone(points); if (i === 14) spike[8][2] += .020;
  variation = still.update(spike, points, i * 33);
}
assert.equal(variation.rmsMm, null, 'an isolated 20 mm excursion cannot be hidden by a small window RMS/trend');
still.reset();
for (let i = 0; i < 30; i++) {
  const output = points.map(p => [p[0] + (i % 2 ? .001 : -.001), p[1], p[2]]);
  variation = still.update(points, output, i * 33);
}
assert.equal(variation.stationary, true);
assert(Math.abs(variation.rmsMm - 1) < 1e-10, 'five-tip output RMS of a balanced +/- 1 mm signal is 1 mm');

const tracking = new TrackingQuality();
assert.equal(tracking.lossPercent, null);
tracking.add(true, 0); tracking.add(false, 33); tracking.add(true, 66);
assert(Math.abs(tracking.lossPercent - 100 / 3) < 1e-12);
assert.equal(tracking.add(false, 66), false);
assert.equal(tracking.add(false, 50), false);
assert.equal(tracking.add(false, NaN), false);
assert.equal(tracking.add(false, -1), false);
assert.equal(tracking.processedFrames, 3); assert.equal(tracking.invalidFrames, 1);
assert.throws(() => tracking.add(undefined));
assert.equal(tracking.processedFrames, 3);
tracking.reset(); assert.equal(tracking.lossPercent, null);
tracking.add(false, 0);
for (let i = 1; i < 10; i++) tracking.add(true, i * 100);
assert.equal(tracking.lossPercent, 10, 'denominator is ten completed results, regardless of elapsed gaps or render ticks');
tracking.reset();
tracking.add(true); tracking.add(false); tracking.add(true);
assert(Math.abs(tracking.lossPercent - 100 / 3) < 1e-12, 'legacy callers without result timestamps remain supported');
console.log('PASS: EMA timing/ownership, repeated-frame rejection, complete-window stationary gating, output RMS and completed-result tracking denominator.');
