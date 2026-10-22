import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import * as THREE from 'three';
import { fingerKinematics, forwardKinematics, jointLimits } from '../src/features/hand-retargeting/engine.ts';

// Pure frame/scene checks. No DOM, camera, browser or WebGL renderer is started.
const compile = source => ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const dataUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const helperUrl = dataUrl(compile(await readFile(new URL('../src/features/hand-retargeting/visual-frame.ts', import.meta.url), 'utf8')));
const { visualBoneFrame } = await import(helperUrl);
const engineUrl = new URL('../src/features/hand-retargeting/engine.ts', import.meta.url).href;
const sceneSource = compile(await readFile(new URL('../src/features/hand-retargeting/robot-visual.ts', import.meta.url), 'utf8'))
  .replace(/from ['"]three['"]/, `from '${import.meta.resolve('three')}'`)
  .replace(/from ['"]\.\/engine['"]/, `from '${engineUrl}'`)
  .replace(/from ['"]\.\/visual-frame['"]/, `from '${helperUrl}'`);
const { createRobotVisual } = await import(dataUrl(sceneSource));
const dot = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const mul = (a, s) => a.map(v => v * s);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = v => Math.hypot(...v);
const unit = v => mul(v, 1 / norm(v));
const mm = (a, b) => Array.from({ length: 9 }, (_, n) => {
  const r = Math.floor(n / 3), c = n % 3;
  return a[r * 3] * b[c] + a[r * 3 + 1] * b[3 + c] + a[r * 3 + 2] * b[6 + c];
});
const rx = a => [1, 0, 0, 0, Math.cos(a), -Math.sin(a), 0, Math.sin(a), Math.cos(a)];
const ry = a => [Math.cos(a), 0, Math.sin(a), 0, 1, 0, -Math.sin(a), 0, Math.cos(a)];
const rz = a => [Math.cos(a), -Math.sin(a), 0, Math.sin(a), Math.cos(a), 0, 0, 0, 1];
const start = [.012, .023, -.004];
const frameFor = rotation => {
  const direction = [rotation[1], rotation[4], rotation[7]];
  return visualBoneFrame(start, start.map((v, i) => v + direction[i] * .04), rotation);
};

// Collinear endpoints leave roll unobservable: full rotations must retain it.
const noRoll = frameFor(ry(0)), rolled = frameFor(ry(1.2));
assert.deepEqual(noRoll.tangent, rolled.tangent);
assert(dot(noRoll.front, rolled.front) < .4);
assert(Math.abs(rolled.front[0] - Math.sin(1.2)) < 1e-12);
const beyondNinety = frameFor(rx(1.8));
assert(beyondNinety.front[2] < 0, 'pads may face negative global Z without swapping front/back');
assert(dot(cross(beyondNinety.side, beyondNinety.tangent), beyondNinety.front) > .999999999);
const mixed = frameFor(mm(mm(rz(-.5), ry(.8)), rx(.4)));
assert(Math.abs(mixed.length - .04) < 1e-12);
assert(norm(sub(mixed.midpoint, start.map((v, i) => v + mixed.tangent[i] * .02))) < 1e-12);
assert.equal(visualBoneFrame(start, start, rx(0)), null);
assert.throws(() => visualBoneFrame(start, [NaN, 0, 0], rx(0)));
assert.throws(() => visualBoneFrame(start, [.04, 0, 0], rx(0)), /disagree/);
assert.throws(() => frameFor([1, 0, 0, 0, 1, 0, 0, 0, -1]), /proper rotation/);
const sparse = rx(0); delete sparse[3]; assert.throws(() => frameFor(sparse));

const visual = createRobotVisual();
const verifyScene = q => {
  const points = forwardKinematics(q);
  visual.update(points, q);
  for (let finger = 0; finger < 5; finger++) {
    const state = fingerKinematics(q, finger);
    assert.equal(state.rotations.length, 3);
    for (let segment = 0; segment < 3; segment++) {
      const expected = visualBoneFrame(state.points[segment], state.points[segment + 1], state.rotations[segment]);
      const bone = visual.group.getObjectByName(`Finger ${finger + 1} · phalange ${segment + 1}`);
      assert(bone);
      const front = new THREE.Vector3(0, 0, 1).applyQuaternion(bone.quaternion).toArray();
      const side = new THREE.Vector3(1, 0, 0).applyQuaternion(bone.quaternion).toArray();
      assert(dot(front, expected.front) > 1 - 1e-10, `pad frame mismatch ${finger}/${segment}`);
      assert(dot(side, expected.side) > 1 - 1e-10, `bearing frame mismatch ${finger}/${segment}`);
      const back = bone.children[1], pad = bone.children[2];
      assert(back.position.z < 0 && pad.position.z > 0, 'pad and back offsets stay on opposite local frame sides');
      assert(Math.abs(norm(sub(points[finger * 4 + segment + 2], points[finger * 4 + segment + 1])) - expected.length) < 1e-12);
    }
  }
};
verifyScene(Array(20).fill(0));
for (const fraction of [.05, .4, .9]) verifyScene(jointLimits.map((limit, i) => limit.min + (limit.max - limit.min) * (fraction + .025 * Math.sin(i))));
for (const cmc of [-.5, 0, .6, 1.3]) {
  const q = Array(20).fill(0); q[0] = cmc; q[1] = .45;
  verifyScene(q);
  // A tiny bend must not cause a discontinuous 180 degree housing flip.
  const straight = fingerKinematics(q, 0).rotations;
  q[2] = 1e-7; q[3] = 1e-7; verifyScene(q);
  const bent = fingerKinematics(q, 0).rotations;
  for (let s = 0; s < 3; s++) {
    const a = [straight[s][2], straight[s][5], straight[s][8]], b = [bent[s][2], bent[s][5], bent[s][8]];
    assert(dot(a, b) > .99999999, 'straight-to-bent transition preserves model axial roll');
  }
}
// Disabling command limits must not reintroduce the old global-Z hemisphere flip.
const unbounded = Array(20).fill(0); unbounded[1] = 1.8; unbounded[2] = .2; unbounded[3] = .2;
verifyScene(unbounded);
visual.dispose(); visual.dispose();
console.log('PASS: complete FK housing frames, straight-chain axial roll, negative-Z pads, continuity and DOM-free Three scene orientation.');
