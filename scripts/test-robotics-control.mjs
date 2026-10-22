import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { defaults, simulate, integrate, identifyPlant, runCsv } from '../src/features/robotics-lab/control/engine.ts';
let checks = 0; const test = (name, fn) => { fn(); checks++; console.log(`PASS ${name}`); };
test('deterministic simulation and fixed duration', () => { const a = simulate(); assert.equal(a.samples.length, 4001); assert.deepEqual(a, simulate()); assert.equal(a.samples.at(-1).t, 8); });
test('torque saturation and joint limits', () => { const c = structuredClone(defaults); c.scenario = 'unreachable'; for (const r of ['baseline', 'clamping']) { const run = simulate(c, r); assert(run.samples.every(s => Math.abs(s.torque) <= c.plant.torqueLimit && s.q >= c.plant.qMin && s.q <= c.plant.qMax)); assert(run.metrics.limitSamples > 0); assert(run.metrics.steadyErrorDeg > 10); } });
test('anti-windup reduces default step overshoot', () => { const a = simulate(defaults, 'baseline'), b = simulate(defaults, 'clamping'); assert(b.metrics.overshootPct < a.metrics.overshootPct); assert(Math.max(...b.samples.map(s => Math.abs(s.integral))) < Math.max(...a.samples.map(s => Math.abs(s.integral)))); console.log(JSON.stringify({ baseline: a.metrics, clamping: b.metrics })); });
test('zero plant input remains at rest', () => { const c = structuredClone(defaults); c.target = 0; c.disturbance = 0; assert(simulate(c).samples.every(s => s.q === 0 && s.velocity === 0)); });
test('RK4 free acceleration agrees with analytic solution', () => { const p = { ...defaults.plant, damping: 0, friction: 0, gravity: 0, qMin: -3, qMax: 3 }; let q = 0, v = 0; for (let i = 0; i < 100; i++) [q, v] = integrate(q, v, .1, 0, .001, p); assert(Math.abs(q - .5 * (.1 / p.inertia) * .1 ** 2) < 1e-10); assert(Math.abs(v - .1 / p.inertia * .1) < 1e-10); });
test('integration step convergence', () => { const a = simulate(), b = simulate({ ...defaults, dt: .001 }); assert(Math.abs(a.samples.at(-1).q - b.samples.at(-1).q) < .003); });
test('synthetic parameter identification recovers known plant', () => { const id = identifyPlant(defaults.plant); for (const k of ['inertia', 'damping', 'friction', 'gravity']) assert(Math.abs(id[k] / defaults.plant[k] - 1) < .12, `${k}: ${id[k]}`); assert(id.torqueResidual < .02); assert.deepEqual(id, identifyPlant(defaults.plant)); console.log(JSON.stringify(id)); });
test('sine step metrics not falsely reported', () => { const r = simulate({ ...defaults, scenario: 'sine' }); assert.equal(r.metrics.overshootPct, null); assert.equal(r.metrics.settlingTime, null); });
test('invalid configurations reject', () => { for (const c of [{ ...defaults, dt: 0 }, { ...defaults, target: NaN }, { ...defaults, plant: { ...defaults.plant, inertia: -1 } }, { ...defaults, gains: { ...defaults.gains, kp: Infinity } }]) assert.throws(() => simulate(c)); });
test('CSV units and full sample count', () => { const r = simulate(); const csv = runCsv(r); assert(csv.startsWith('t_s,target_rad')); assert.equal(csv.split('\n').length, r.samples.length + 1); assert(!csv.includes('NaN')); });
// Minimal DOM/RAF harness: checks playback state transitions, not visual rendering.
const panelUrl = new URL('../src/features/robotics-lab/control/panel.ts', import.meta.url);
const engineUrl = new URL('../src/features/robotics-lab/control/engine.ts', import.meta.url).href;
// Renderer geometry has its own DOM-free and browser checks. This harness
// intentionally exercises the no-WebGL fallback and playback state machine.
const panelSource = readFileSync(panelUrl, 'utf8')
  .replace("from './engine'", `from '${engineUrl}'`)
  .replace(/import \{ createStudio \} from ['"]\.\.\/visuals\/studio['"];?/, 'const createStudio = () => null;')
  .replace(/import \{ createHistoryScope \} from ['"]\.\.\/history['"];?/, 'const createHistoryScope = () => ({run:(_label,action)=>action(),listen:(node,event,_label,action)=>node.addEventListener(event,action),reset:()=>{}});')
  .replace(/import \{ createJointFixture \} from ['"]\.\.\/visuals\/joint-model['"];?/, 'const createJointFixture = () => { throw Error("Unexpected model creation in fallback test"); };');
const panelJs = ts.transpileModule(panelSource, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { mount } = await import(`data:text/javascript;base64,${Buffer.from(panelJs).toString('base64')}`);
test('recalculate clears RAF state so first subsequent play click starts', () => {
  const values = { target: '.95', inertia: '.018', damping: '.075', torqueLimit: '.55', disturbance: '.22', scenario: 'step', kp: '3.2', ki: '5', kd: '.24' };
  const elements = new Map();
  const makeElement = () => ({ value: '', textContent: '', innerHTML: '', dataset: {}, style: {}, listeners: {}, append() {}, addEventListener(event, fn) { this.listeners[event] = fn; }, replaceChildren() {} });
  const element = selector => { if (!elements.has(selector)) { const key = selector.match(/data-key="([^"]+)"/)?.[1]; elements.set(selector, { ...makeElement(), value: values[key] ?? '' }); } return elements.get(selector); };
  const host = { innerHTML: '', isConnected: true, querySelector: element };
  const oldRequest = globalThis.requestAnimationFrame, oldCancel = globalThis.cancelAnimationFrame, oldDocument = globalThis.document;
  let id = 0; const queued = new Map();
  globalThis.requestAnimationFrame = callback => { queued.set(++id, callback); return id; };
  globalThis.cancelAnimationFrame = frame => { queued.delete(frame); };
  globalThis.document = { createElement: makeElement };
  try {
    mount(host, 'zh');
    element('[data-play]').listeners.click(); assert.equal(queued.size, 1); assert.equal(element('[data-play]').textContent, '暂停');
    element('[data-run]').listeners.click(); assert.equal(queued.size, 0); assert.equal(element('[data-play]').textContent, '播放');
    element('[data-play]').listeners.click(); assert.equal(queued.size, 1); assert.equal(element('[data-play]').textContent, '暂停');
    element('[data-play]').listeners.click(); assert.equal(queued.size, 0); assert.equal(element('[data-play]').textContent, '播放');
  } finally { globalThis.requestAnimationFrame = oldRequest; globalThis.cancelAnimationFrame = oldCancel; if(oldDocument===undefined)delete globalThis.document;else globalThis.document=oldDocument; }
});
console.log(`${checks} control tests passed (numerical model only; no hardware).`);
