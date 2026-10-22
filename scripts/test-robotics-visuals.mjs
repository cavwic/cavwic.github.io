import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import * as THREE from 'three';

// Geometry/mapping tests only: no DOM, WebGL, physics solve, or screenshot claim.
// Load the actual TypeScript sources in memory; only the DOM-dependent studio
// is substituted. Bare imports (including three/addons) become resolved URLs so
// that the generated data: modules have the same installed dependency versions.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const modules = new Map();
const studios = [];
const studioKey = Symbol.for('cavwic.robotics.visual-regression.studios');
globalThis[studioKey] = studios;
const asModuleURL = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const studioStub = asModuleURL(`
  import { Group } from ${JSON.stringify(import.meta.resolve('three'))};
  export function createStudio(host, options) {
    if (host === null) return null;
    const studio = { content: new Group(), options, renders: 0, disposed: false,
      requestRender() { this.renders++; }, dispose() { this.disposed = true; } };
    globalThis[Symbol.for('cavwic.robotics.visual-regression.studios')].push(studio);
    return studio;
  }
`);

async function moduleURL(path) {
  const absolute = resolve(root, path);
  if (modules.has(absolute)) return modules.get(absolute);
  const loading = (async () => {
    const source = await readFile(absolute, 'utf8');
    let code = ts.transpileModule(source, { compilerOptions: {
      target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
    }, fileName: absolute }).outputText;
    const replacements = new Map();
    for (const match of code.matchAll(/\bfrom\s*(['"])([^'"]+)\1/g)) {
      const specifier = match[2];
      if (replacements.has(specifier)) continue;
      if (specifier.endsWith('/visuals/studio')) replacements.set(specifier, studioStub);
      else if (specifier.startsWith('.')) {
        const dependency = resolve(dirname(absolute), specifier);
        replacements.set(specifier, await moduleURL(extname(dependency) ? dependency : `${dependency}.ts`));
      } else replacements.set(specifier, import.meta.resolve(specifier));
    }
    code = code.replace(/\bfrom\s*(['"])([^'"]+)\1/g, (_, quote, specifier) => `from ${quote}${replacements.get(specifier)}${quote}`);
    return asModuleURL(code);
  })();
  modules.set(absolute, loading);
  return loading;
}
const loadTS = async path => import(await moduleURL(path));
const loadJSON = async path => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const close = (actual, expected, message = '', epsilon = 1e-7) => {
  assert(Number.isFinite(actual) && Number.isFinite(expected), `Non-finite comparison: ${message}`);
  assert(Math.abs(actual - expected) <= epsilon, `${message}: ${actual} != ${expected}`);
};
const vectorClose = (actual, expected, message = '', epsilon = 1e-7) => {
  assert.equal(actual.length, expected.length, `${message}: vector dimension`);
  expected.forEach((value, index) => close(actual[index], value, `${message}[${index}]`, epsilon));
};
const latestStudio = () => studios.at(-1);
function identities(object) {
  const entries = [];
  object.traverse(child => entries.push([child, child.geometry, child.geometry?.getAttribute('position')]));
  return entries;
}
function assertReused(object, before, label) {
  const after = identities(object);
  assert.equal(after.length, before.length, `${label}: object count changed`);
  after.forEach((entry, index) => entry.forEach((value, part) => assert.equal(value, before[index][part], `${label}: replaced object, geometry, or vertex buffer`)));
}
function finiteGeometry(object, label) {
  object.updateMatrixWorld(true);
  object.traverse(child => {
    assert(child.matrixWorld.elements.every(Number.isFinite), `${label}: non-finite transform`);
    const positions = child.geometry?.getAttribute('position');
    if (positions) assert(Array.from(positions.array).every(Number.isFinite), `${label}: non-finite vertex`);
  });
}
function dimensions(mesh) {
  mesh.geometry.computeBoundingBox();
  return mesh.geometry.boundingBox.getSize(new THREE.Vector3()).toArray();
}

// 01 / 03: signed single-axis motion and independent target orientation.
const { createJointFixture } = await loadTS('src/features/robotics-lab/visuals/joint-model.ts');
const fixture = createJointFixture(0x167d94);
const joint = fixture.root.getObjectByName('joint-output');
const reference = fixture.root.getObjectByName('joint-reference');
assert(joint && reference, 'Named measured/reference joint assemblies are required');
const jointObjects = identities(fixture.root);
for (const q of [-1.2, -.5, 0, .5, 1.2]) for (const target of [-.9, 0, .9]) {
  fixture.setPose(q, target, true, 0x227c89);
  close(joint.rotation.z, -q, 'measured joint rotation');
  close(reference.rotation.z, -target, 'independent target rotation');
  const endpoint = new THREE.Vector3(0, .205, 0).applyEuler(joint.rotation);
  close(endpoint.x, Math.sin(q) * .205, 'positive q leans right');
  close(endpoint.y, Math.cos(q) * .205, 'single-axis arm endpoint');
  finiteGeometry(fixture.root, 'joint fixture');
  assertReused(fixture.root, jointObjects, 'setPose');
}
fixture.setPose(-.4, .6, false, 0xa84b56);
assertReused(fixture.root, jointObjects, 'disabled setPose');
console.log('PASS: joint signed q / independent target, finite vertices, and setPose mesh reuse.');

// 04 / 08: use the actual MJCF dimensions and actual recorded poses/contacts.
const { createRecordedGraspScene, RECORDED_GRIPPER } = await loadTS('src/features/robotics-lab/grasp/scene.ts');
const xml = await readFile(resolve(root, 'public/robotics-lab/grasp/model.xml'), 'utf8');
function attribute(tag, name, attributeName) {
  const element = xml.match(new RegExp(`<${tag}\\b[^>]*\\bname="${name}"[^>]*>`))?.[0];
  assert(element, `Missing MJCF ${tag}: ${name}`);
  const value = element.match(new RegExp(`\\b${attributeName}="([^"]+)"`))?.[1];
  assert(value !== undefined, `Missing MJCF attribute: ${name}.${attributeName}`);
  return value;
}
const numbers = value => value.split(/\s+/).map(Number);
vectorClose(RECORDED_GRIPPER.padHalfSize, numbers(attribute('geom', 'left_pad', 'size')), 'MJCF pad');
vectorClose(RECORDED_GRIPPER.padHalfSize, numbers(attribute('geom', 'right_pad', 'size')), 'MJCF pad');
vectorClose(RECORDED_GRIPPER.bridgeHalfSize, numbers(attribute('geom', 'bridge', 'size')), 'MJCF bridge');
vectorClose(RECORDED_GRIPPER.bridgePosition, numbers(attribute('geom', 'bridge', 'pos')), 'MJCF bridge position');
close(RECORDED_GRIPPER.stageZ, numbers(attribute('body', 'stage', 'pos'))[2], 'MJCF stage');
close(-RECORDED_GRIPPER.jawOriginX, numbers(attribute('body', 'left', 'pos'))[0], 'MJCF left origin');
close(RECORDED_GRIPPER.jawOriginX, numbers(attribute('body', 'right', 'pos'))[0], 'MJCF right origin');
assert.equal(attribute('geom', 'bridge', 'contype'), '0');
assert.equal(attribute('geom', 'bridge', 'conaffinity'), '0');
let graspSamples = 0;
for (const kind of ['grasp', 'randomization']) {
  const results = await loadJSON(`public/robotics-lab/${kind}/results.json`);
  const capacity = Math.max(...results.trials.flatMap(trial => trial.frames.map(frame => frame.contactPositions.length)));
  const replay = createRecordedGraspScene({}, results.shapes, 'zh', capacity);
  assert(replay);
  assert.equal(createRecordedGraspScene(null, results.shapes, 'zh', capacity), null, 'Unavailable studio must allow SVG fallback');
  const studio = latestStudio(), content = studio.content;
  const world = content.getObjectByName('mujoco-z-up-recording');
  close(world.rotation.x, -Math.PI / 2, 'z-up conversion');
  const stage = content.getObjectByName('recorded-lift-stage');
  const bridge = content.getObjectByName('recorded-noncolliding-bridge');
  vectorClose(dimensions(bridge), RECORDED_GRIPPER.bridgeHalfSize.map(value => value * 2), 'bridge geometry');
  const left = content.getObjectByName('recorded-left-jaw'), right = content.getObjectByName('recorded-right-jaw');
  vectorClose(dimensions(left.getObjectByName('recorded-collision-pad')), RECORDED_GRIPPER.padHalfSize.map(value => value * 2), 'pad geometry');
  for (const [name, shape] of Object.entries(results.shapes)) {
    const mesh = content.getObjectByName(`recorded-object-${name}`).children.find(child => child.isMesh);
    const expected = shape.type === 'cylinder' ? [shape.size[0] * 2, shape.size[0] * 2, shape.size[1] * 2] : shape.size.map(value => value * 2);
    vectorClose(dimensions(mesh), expected, `${name} dimensions`);
  }
  const before = identities(content);
  for (const trial of results.trials) for (const frameIndex of [0, Math.floor(trial.frames.length / 2), trial.frames.length - 1]) {
    const frame = trial.frames[frameIndex];
    replay.update(frame, trial.shape);
    close(stage.position.z, RECORDED_GRIPPER.stageZ + frame.jaws[0], 'recorded lift');
    close(left.position.x, -RECORDED_GRIPPER.jawOriginX + frame.jaws[1], 'recorded left jaw');
    close(right.position.x, RECORDED_GRIPPER.jawOriginX - frame.jaws[2], 'recorded right jaw');
    const object = content.getObjectByName(`recorded-object-${trial.shape}`);
    vectorClose(object.position.toArray(), frame.object, 'recorded object position');
    vectorClose(object.quaternion.toArray(), [frame.quat[1], frame.quat[2], frame.quat[3], frame.quat[0]], 'wxyz -> xyzw');
    content.updateMatrixWorld(true);
    vectorClose(object.getWorldPosition(new THREE.Vector3()).toArray(), [frame.object[0], frame.object[2], -frame.object[1]], 'world coordinate conversion');
    const markers = content.getObjectByName('recorded-contact-positions').children;
    assert.equal(markers.filter(marker => marker.visible).length, frame.contactPositions.length, 'recorded contact count');
    frame.contactPositions.forEach((position, index) => vectorClose(markers[index].position.toArray(), position, 'recorded contact coordinate'));
    graspSamples++;
  }
  finiteGeometry(content, `${kind} replay`);
  assertReused(content, before, 'recorded replay update');
  replay.setAppearance(false);
  assert.equal(content.getObjectByName('illustrative-noncolliding-exterior').visible, false);
  assert.equal(left.getObjectByName('recorded-collision-pad').material.transparent, true);
  replay.setContacts(false); assert.equal(content.getObjectByName('recorded-contact-positions').visible, false);
  replay.setAppearance(true); replay.setContacts(true);
  assert.equal(content.getObjectByName('illustrative-noncolliding-exterior').visible, true);
  assert.equal(content.getObjectByName('recorded-contact-positions').visible, true);
  replay.dispose(); assert.equal(studio.disposed, true);
}
console.log(`PASS: MJCF bridge/pad/object dimensions; ${graspSamples} recorded poses, full quaternions, jaws and contacts; toggles and reuse.`);

// 05: the illustrative displacement stops at the 80 mm budget; failure colour
// must not look like an invented ongoing free-fall trajectory.
const { createTactileScene } = await loadTS('src/features/robotics-lab/tactile/scene.ts');
const tactile = createTactileScene({}, 'zh');
assert(tactile);
assert.equal(createTactileScene(null, 'zh'), null, 'Unavailable tactile studio');
const tactileStudio = latestStudio(), tactileRoot = tactileStudio.content;
const payloadGroup = tactileRoot.children.find(child => child.isGroup && child.children.some(part => part.isMesh));
assert(payloadGroup, 'Tactile payload assembly');
const payload = payloadGroup.children[0];
vectorClose(dimensions(payload), [.041, .17, .045], 'illustrative payload dimensions');
const tactileObjects = identities(tactileRoot);
for (const displacement of [-.02, 0, .04, .08, .081, .35]) {
  tactile.update(5, displacement, displacement > .02);
  vectorClose(payloadGroup.position.toArray(), [0, .267 - Math.max(0, Math.min(.08, displacement)), .008], '80 mm visual clipping');
  assert.equal(payload.material.color.getHex(), displacement > .08 ? 0xbf535c : 0x7f9daa, 'failure-budget colour');
  finiteGeometry(tactileRoot, 'tactile scene');
  assertReused(tactileRoot, tactileObjects, 'tactile update');
}
tactile.dispose(); assert.equal(tactileStudio.disposed, true);
console.log('PASS: tactile displacement clips to 80 mm without invented free fall; failure state and mesh reuse.');

// 07: all recorded paths remain a two-dimensional task. Scene height is a fixed
// display plane; the same display-only scale must apply to goal and success ring.
const { createImitationScene } = await loadTS('src/features/robotics-lab/imitation/scene.ts');
const imitation = createImitationScene({}, 'en');
assert(imitation);
assert.equal(createImitationScene(null, 'en'), null, 'Unavailable ACT studio');
const imitationStudio = latestStudio(), imitationRoot = imitationStudio.content;
const paths = imitationRoot.children.filter(child => child.isLine);
assert.equal(paths.length, 2, 'full and travelled trajectory lines');
const [fullPath, travelled] = paths;
const target = imitationRoot.children.find(child => child.isMesh && child.geometry.type === 'TorusGeometry');
const start = imitationRoot.children.find(child => child.isMesh && child.geometry.type === 'RingGeometry' && child.geometry.parameters.innerRadius === .006);
const current = imitationRoot.children.find(child => child.isMesh && child.geometry.type === 'RingGeometry' && child.geometry.parameters.innerRadius === .008);
const gantry = imitationRoot.children.find(child => child.isGroup && child.children.some(part => part.isGroup));
const carriage = gantry.children.find(child => child.isGroup);
const tip = carriage.children.find(child => child.geometry?.type === 'ConeGeometry');
assert(target && start && current && tip, '2D trajectory markers and XY presentation fixture');
const imitationObjects = identities(imitationRoot);
const imitationResults = await loadJSON('public/robotics-lab/imitation/results.json');
assert.equal(imitationResults.config.state_dimensions, 2);
assert.equal(imitationResults.config.action_dimensions, 2);
const scale = .38;
let trajectorySamples = 0;
for (const episode of imitationResults.cases) {
  assert(episode.path.every(point => point.length === 2), 'Recorded path must stay two-dimensional');
  const coordinatesBefore = JSON.stringify(episode.path);
  imitation.setEpisode(episode.path, episode.start, episode.goal, imitationResults.config.success_radius);
  assert.equal(fullPath.geometry.drawRange.count, episode.path.length, 'No recorded sample lost');
  const positions = fullPath.geometry.getAttribute('position');
  episode.path.forEach((point, index) => {
    vectorClose([positions.getX(index), positions.getY(index), positions.getZ(index)], [point[0] * scale, .115, -point[1] * scale], 'planar trajectory display');
    trajectorySamples++;
  });
  vectorClose(target.position.toArray(), [episode.goal[0] * scale, .116, -episode.goal[1] * scale], 'goal display');
  vectorClose(target.scale.toArray(), Array(3).fill(imitationResults.config.success_radius * scale), 'success radius uses same display scale');
  vectorClose(start.position.toArray(), [episode.start[0] * scale, .116, -episode.start[1] * scale], 'start display');
  for (const index of [0, Math.floor(episode.path.length / 2), episode.path.length - 1]) {
    imitation.update(index);
    const point = episode.path[index];
    vectorClose(current.position.toArray(), [point[0] * scale, .118, -point[1] * scale], 'current display point');
    imitationRoot.updateMatrixWorld(true);
    const nozzlePoint = new THREE.Vector3(0, .018, 0).applyMatrix4(tip.matrixWorld);
    vectorClose(nozzlePoint.toArray(), [point[0] * scale, .120, -point[1] * scale], 'nozzle offset compensation');
    assert.equal(travelled.geometry.drawRange.count, index + 1, 'travelled prefix');
  }
  assert.equal(JSON.stringify(episode.path), coordinatesBefore, 'Display must not alter recorded trajectory');
}
finiteGeometry(imitationRoot, 'ACT presentation');
assertReused(imitationRoot, imitationObjects, 'ACT episode / frame update');
imitation.dispose(); assert.equal(imitationStudio.disposed, true);
console.log(`PASS: ${imitationResults.cases.length} ACT episodes / ${trajectorySamples} 2D points, goal/radius scaling, fixed display plane and mesh reuse.`);

// 06: preserve negative/extreme values, acquisition order, duplicate timestamps,
// and joint-dimension gaps instead of silently sorting, clipping or connecting.
const { extent, episodeSamples, signalPath } = await loadTS('src/features/robotics-lab/data/plot.ts');
for (const values of [[-50, -2, 8, 80], [-1e12, 1e12], [-.003, -.003], [NaN, -8, Infinity, 2]]) {
  const range = extent(values);
  assert(range.every(Number.isFinite) && range[1] > range[0]);
  for (const value of values.filter(Number.isFinite)) assert(range[0] <= value && range[1] >= value, 'Extent clipped an actual value');
}
vectorClose(extent([], 2), [-1, 1], 'empty extent');
const sample = (time, position, episode = 'e') => ({ episodeId: episode, split: 'train', timestampMs: time,
  sensorTimestampMs: time, commandTimestampMs: time, positionRad: position, commandRad: [...position], currentA: .1, temperatureC: 28 });
const raw = [sample(20, [-9, 2]), { invalid: true }, sample(10, [-7, 3]), sample(10, [-5]), sample(30, [7, 8]), sample(40, [9, 10], 'other')];
const samples = episodeSamples(raw, 'e');
assert.deepEqual(samples.map(row => row.row), [0, 2, 3, 4], 'Keep source row identity');
assert.deepEqual(samples.map(row => row.frame.timestampMs), [20, 10, 10, 30], 'Do not sort, merge or drop timestamps');
const all = signalPath(samples, row => row.frame.positionRad[0], row => row.frame.timestampMs, value => value);
assert.equal(all, 'M20.000,-9.000 L10.000,-7.000 L10.000,-5.000 L30.000,7.000', 'Keep all samples in acquisition order');
const missing = signalPath(samples, row => row.frame.positionRad[1], row => row.frame.timestampMs, value => value);
assert.equal(missing.trim(), 'M20.000,2.000 L10.000,3.000  M30.000,8.000', 'Missing joint must break rather than interpolate the trace');
const nonfinite = signalPath(samples, row => samples.indexOf(row) === 1 ? NaN : samples.indexOf(row), (_, index) => index, value => value);
assert.equal(nonfinite.trim(), 'M0.000,0.000  M2.000,2.000 L3.000,3.000', 'Non-finite values break the trace');
console.log('PASS: data extent, negative/extreme values, all source samples, duplicate/reversed time and missing-joint breaks.');

delete globalThis[studioKey];
console.log('PASS: DOM-free visual geometry / recorded-data regression. This does not replace browser visual QA.');
