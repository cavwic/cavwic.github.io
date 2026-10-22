import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const base = new URL('../', import.meta.url);
const load = async (path) => JSON.parse(await readFile(new URL(path, base), 'utf8'));
const grasp = await load('public/robotics-lab/grasp/results.json');
const randomization = await load('public/robotics-lab/randomization/results.json');
const source = await readFile(new URL('robotics-projects/grasp/experiment.py', base));
const hash = createHash('sha256').update(source).digest('hex');
const xml = await readFile(new URL('public/robotics-lab/grasp/model.xml', base), 'utf8');
assert.match(xml, /<freejoint name="object_free"/);
assert.doesNotMatch(xml, /<equality|<weld|mocap=/);
assert.equal((xml.match(/<position /g) || []).length, 3);
assert.equal(grasp.trials.length, 108);
assert.equal(randomization.trials.length, 90);

let frames = 0;
for (const r of [grasp, randomization]) {
  assert.equal(r.engine, 'MuJoCo');
  assert.equal(r.schemaVersion, 1);
  assert.equal(r.sourceSha256, hash, 'Results must match the current experiment source');
  assert.equal(r.dt, .002);
  assert.equal(r.durationS, 3.8);
  assert.equal(Object.keys(r.shapes).length, 3);
  assert(r.trials.some(t => t.success), 'Need a successful recorded replay');
  assert(r.trials.some(t => !t.success), 'Need a failed recorded replay');
  for (const t of r.trials) {
    assert.equal(t.mjSteps, 1900);
    assert.equal(t.frames.length, 190);
    assert(t.frames.every((f, i) => i === 0 || f.t > t.frames[i-1].t));
    assert(t.finiteState);
    assert.equal(t.warningCount,0,'Numerical warnings invalidate the experiment');
    assert.equal(t.success, t.holdMinHeightM >= .105 && Math.abs(t.finalObjectPositionM[0]) < .06 && t.finiteState && t.warningCount===0);
    assert(t.peakNormalN >= 0 && t.actuatorAbsWorkJ >= 0);
    assert(t.frames.at(-1).t > 3.7);
    for (const f of t.frames) {
      assert([...f.object, ...f.quat, ...f.jaws, ...f.normal, ...f.actuatorForce].every(Number.isFinite));
      assert.equal(f.object.length, 3);
      assert.equal(f.quat.length, 4);
      assert.equal(f.jaws.length, 3);
      assert.equal(f.normal.length, 2);
      assert(f.contactPositions.length === f.contacts);
      assert(f.normal.every(x=>x>=0));
      assert(Math.abs(f.quat.reduce((a,x)=>a+x*x,0)-1)<.00001);
      frames++;
    }
    if (t.success) assert(t.frames.some(f=>f.normal[0]>.05 && f.normal[1]>.05), 'Successful grasp must have bilateral contact');
  }
  for (const s of r.summary) {
    const ts = r.trials.filter(t=>(!s.shape || t.shape===s.shape) && (!s.method || t.method===s.method) && (!s.domain || t.domain===s.domain));
    assert.equal(s.trials, ts.length);
    assert.equal(s.successes, ts.filter(t=>t.success).length);
    assert.equal(s.rate, s.successes/s.trials);
    assert(s.wilson95[0]>=0 && s.wilson95[1]<=1.000000001);
    assert(s.seedBlockBootstrap95[0]>=0 && s.seedBlockBootstrap95[1]<=1);
  }
  const raw = await load(`public/robotics-lab/${r.kind}/trials.json`);
  assert.equal(raw.length, r.trials.length);
  for (let i=0;i<raw.length;i++) {
    const {frames: _, ...expected} = r.trials[i];
    assert.deepEqual(raw[i], expected);
  }
}
for (const shape of Object.keys(grasp.shapes)) {
  for (let seed=100;seed<=111;seed++) {
    const ts=grasp.trials.filter(t=>t.shape===shape && t.seed===seed);
    assert.equal(ts.length,3);
    for(const t of ts) assert.deepEqual(t.condition,ts[0].condition, 'Grasp methods must use identical conditions');
  }
}
const training = await load('public/robotics-lab/randomization/training-trials.json');
assert.equal(training.length,216);
assert(training.every(t=>t.seed>=300 && t.seed<=303));
assert(randomization.trials.every(t=>t.seed>=800 && t.seed<=809));
for (const policy of randomization.policies) {
  const rows=randomization.search.filter(x=>x.domain===policy.domain);
  assert.equal(rows.length,6);
  rows.sort((a,b)=>b.successes-a.successes || a.candidate.forceTargetN-b.candidate.forceTargetN || a.candidate.liftTimeS-b.candidate.liftTimeS);
  assert.equal(policy.forceTargetN,rows[0].candidate.forceTargetN);
  assert.equal(policy.liftTimeS,rows[0].candidate.liftTimeS);
}
for (const shape of Object.keys(randomization.shapes)) for(let seed=800;seed<=809;seed++) {
  const ts=randomization.trials.filter(t=>t.shape===shape && t.seed===seed);
  assert.equal(ts.length,3);
  for(const t of ts) assert.deepEqual(t.condition,ts[0].condition,'Held-out conditions must be paired');
}
for(const p of randomization.pairedComparisons) {
  assert.equal(p.seedBlocks,10);
  const baseline=randomization.trials.filter(t=>t.domain==='nominal');
  const compared=randomization.trials.filter(t=>t.domain===p.domain);
  const differences=compared.map(t=>Number(t.success)-Number(baseline.find(b=>b.seed===t.seed && b.shape===t.shape).success));
  assert.equal(p.pairedWins,differences.filter(x=>x>0).length);
  assert.equal(p.pairedLosses,differences.filter(x=>x<0).length);
  assert(Math.abs(p.meanSuccessDifference-differences.reduce((a,x)=>a+x,0)/differences.length)<1e-12);
}
console.log(`PASS: ${grasp.trials.length} grasp + ${training.length} parameter-search + ${randomization.trials.length} held-out trials; ${frames} recorded physics frames.`);
console.log(JSON.stringify({grasp:grasp.summary,randomization:randomization.summary},null,2));
