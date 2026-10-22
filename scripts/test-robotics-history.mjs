import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

// Compile the actual shared modules in memory. No test double replaces the
// command controller or scope adapter; DOM and WebGL alone are stubbed below.
const asModule = source => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText).toString('base64')}`;
const coreUrl = asModule(readFileSync(new URL('../src/features/robotics-lab/history-core.ts', import.meta.url), 'utf8'));
const historyUrl = asModule(readFileSync(new URL('../src/features/robotics-lab/history.ts', import.meta.url), 'utf8').replaceAll("'./history-core'", JSON.stringify(coreUrl)));
const { OperationHistory, createHistoryScope } = await import(historyUrl);
let checks = 0;
const test = async (name, run) => { await run(); checks++; console.log(`PASS ${name}`); };
const tick = () => new Promise(resolve => setImmediate(resolve));

await test('50 commands undo and redo in exact order', async () => {
  const controller = new OperationHistory(50); let value = 0;
  const scope = createHistoryScope({ controller, capture: () => ({ value }), restore: state => { value = state.value; } });
  scope.reset();
  for (let i = 1; i <= 50; i++) scope.run(`step ${i}`, () => { value = i; });
  for (let i = 49; i >= 0; i--) { assert(await controller.undo()); assert.equal(value, i); }
  assert.equal(await controller.undo(), false);
  for (let i = 1; i <= 50; i++) { assert(await controller.redo()); assert.equal(value, i); }
  assert.equal(await controller.redo(), false); scope.dispose();
});

await test('capacity keeps the newest 50 commands and a new branch clears redo', async () => {
  const controller = new OperationHistory(50); let value = 0;
  const scope = createHistoryScope({ controller, capture: () => value, restore: state => { value = state; } });
  for (let i = 1; i <= 60; i++) scope.run(`step ${i}`, () => { value = i; });
  for (let i = 0; i < 50; i++) assert(await controller.undo());
  assert.equal(value, 10); assert.equal(await controller.undo(), false);
  assert(await controller.redo()); assert.equal(value, 11);
  scope.run('new branch', () => { value = 100; });
  assert.equal(controller.status.canRedo, false); assert.equal(await controller.redo(), false);
  assert(await controller.undo()); assert.equal(value, 11); scope.dispose();
});

await test('same-value captures do not enter the command stack', async () => {
  const controller = new OperationHistory(); let value = { q: .25, mode: 'step' };
  const scope = createHistoryScope({ controller, capture: () => structuredClone(value), restore: state => { value = structuredClone(state); } });
  scope.run('unchanged', () => { value = { q: .25, mode: 'step' }; });
  assert.equal(controller.status.canUndo, false);
  scope.run('changed', () => { value.q = .4; });
  scope.run('still unchanged', () => {}); assert.equal(controller.status.undoLabel, 'changed');
  assert(await controller.undo()); assert.deepEqual(value, { q: .25, mode: 'step' });
  assert.equal(await controller.undo(), false); scope.dispose();
});

await test('async actions stay busy with undo/redo disabled until completion, then commit once', async () => {
  const controller = new OperationHistory(); let value = 0, release;
  const statuses = []; controller.subscribe(status => statuses.push({ ...status }));
  const scope = createHistoryScope({ controller, capture: () => value, restore: state => { value = state; } });
  scope.run('first', () => { value = 1; });
  const completed = scope.run('async change', async () => { value = 2; await new Promise(resolve => { release = resolve; }); value = 3; return 'finished'; });
  assert(controller.busy); assert(!controller.status.canUndo); assert(!controller.status.canRedo);
  assert.equal(await controller.undo(), false); assert.equal(scope.run('blocked', () => { value = 99; }), undefined); assert.equal(value, 2);
  release(); assert.equal(await completed, 'finished'); assert(!controller.busy); assert.equal(value, 3);
  assert.equal(controller.status.undoLabel, 'async change');
  assert(await controller.undo()); assert.equal(value, 1);
  assert(await controller.redo()); assert.equal(value, 3);
  assert(statuses.some(status => status.busy && !status.canUndo && !status.canRedo)); scope.dispose();
});

await test('async rejection and synchronous throws roll back without history or unhandled rejections', async () => {
  const controller = new OperationHistory(); let value = 4;
  const unhandled = [], onUnhandled = reason => unhandled.push(reason);
  process.on('unhandledRejection', onUnhandled);
  const scope = createHistoryScope({ controller, capture: () => value, restore: async state => { await Promise.resolve(); value = state; } });
  try {
    assert.equal(await scope.run('rejected selection', async () => { value = 90; await Promise.resolve(); throw Error('expected rejection'); }), undefined);
    await tick(); assert.equal(value, 4); assert(!controller.busy); assert(!controller.status.canUndo); assert.equal(controller.status.action, 'error');
    assert.equal(scope.run('synchronous failure', () => { value = 99; throw Error('expected throw'); }), undefined);
    await tick(); assert.equal(value, 4); assert(!controller.busy); assert(!controller.status.canUndo); assert.deepEqual(unhandled, []);
  } finally { process.off('unhandledRejection', onUnhandled); scope.dispose(); }
});

await test('beforeRestore pauses all registered scopes before undo and redo', async () => {
  const controller = new OperationHistory(); let value = 0, playing = true, pauses = 0;
  const scope = createHistoryScope({ controller, beforeRestore: () => { playing = false; pauses++; }, capture: () => value, restore: state => { assert.equal(playing, false); value = state; } });
  scope.run('set value', () => { value = 1; });
  assert(await controller.undo()); assert.equal(pauses, 1); assert.equal(value, 0);
  playing = true; assert(await controller.redo()); assert.equal(pauses, 2); assert.equal(value, 1);
  scope.dispose(); playing = true;
  controller.record({ label: 'other scope', undo() {}, redo() {} });
  assert(await controller.undo()); assert(playing); assert.equal(pauses, 2);
});

await test('failed undo keeps the cursor and redo availability unchanged', async () => {
  const controller = new OperationHistory();
  controller.record({ label: 'failed restore', undo: async () => { throw Error('expected restore failure'); }, redo() {} });
  assert.equal(await controller.undo(), false); assert.equal(controller.status.undoLabel, 'failed restore');
  assert(controller.status.canUndo); assert(!controller.status.canRedo); assert.equal(controller.status.action, 'error'); assert(!controller.busy);
});

class FakeElement extends EventTarget {
  value = ''; textContent = ''; dataset = {}; style = {}; className = ''; children = []; _html = '';
  get innerHTML() { return this._html; }
  set innerHTML(value) { this._html = String(value); this.children = []; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this._html = ''; this.children = [...children]; }
  createTHead() { return { insertRow: () => ({ append() {} }) }; }
  createTBody() { return { insertRow: () => ({ insertCell: () => ({ textContent: '' }) }) }; }
  fire(type) { this.dispatchEvent(new Event(type)); }
}

await test('listen(input) renders every input but commits one command at change or blur', async () => {
  const controller = new OperationHistory(), range = new FakeElement(); let value = 0, renders = 0;
  const scope = createHistoryScope({ controller, capture: () => ({ value }), restore: state => { value = state.value; range.value = String(value); } });
  scope.reset(); scope.listen(range, 'input', 'audit time', () => { value = Number(range.value); renders++; });
  range.fire('pointerdown');
  for (const next of ['10', '30', '80']) { range.value = next; range.fire('input'); assert.equal(value, Number(next)); }
  assert.equal(renders, 3); assert(controller.status.canUndo); range.fire('change');
  assert(await controller.undo()); assert.equal(value, 0); assert.equal(await controller.undo(), false);
  assert(await controller.redo()); assert.equal(value, 80);
  range.fire('focusin'); range.value = '90'; range.fire('input'); range.fire('focusout');
  assert(await controller.undo()); assert.equal(value, 80); scope.dispose();
});

await test('select changes capture old DOM values through focus, pointer and no-focus fallback', async () => {
  const controller = new OperationHistory(), select = new FakeElement(); select.value = 'A'; let applied = 'A';
  const scope = createHistoryScope({ controller, capture: () => ({ selected: select.value, applied }), restore: state => { select.value = state.selected; applied = state.applied; } });
  scope.reset(); scope.listen(select, 'change', 'select case', () => { applied = select.value; });
  // Browser change events already expose the new DOM value. The adapter must
  // use the edit-start snapshot (or the last committed snapshot), not that value.
  for (const [start, next] of [['focusin', 'B'], ['pointerdown', 'C'], [null, 'D']]) {
    if (start) select.fire(start); select.value = next; select.fire('change');
    assert.equal(applied, next); assert(await controller.undo()); assert.equal(select.value, 'A'); assert.equal(applied, 'A');
    assert(await controller.redo()); assert.equal(select.value, next); assert.equal(applied, next);
    assert(await controller.undo());
  }
  scope.dispose();
});

await test('passive focus during playback does not create a command and edit start refreshes the frame',async()=>{
  const controller=new OperationHistory(),select=new FakeElement(),range=new FakeElement();let frame=0,value=0;
  const scope=createHistoryScope({controller,capture:()=>({frame,value}),restore:s=>{frame=s.frame;value=s.value;}});
  scope.reset();scope.listen(select,'change','select',()=>{});scope.listen(range,'input','seek',()=>{value=Number(range.value);});
  select.fire('focusin');frame=10;select.fire('focusout');assert(!controller.status.canUndo);
  range.fire('focusin');frame=20;range.fire('pointerdown');range.value='4';range.fire('input');range.fire('change');
  assert(await controller.undo());assert.equal(frame,20);assert.equal(value,0);scope.dispose();
});

await test('shortcut during a pending input or camera gesture undoes that edit rather than dropping it',async()=>{
  const controller=new OperationHistory(),range=new FakeElement();let value=0;
  const scope=createHistoryScope({controller,capture:()=>value,restore:s=>{value=s;}});scope.reset();
  scope.run('first',()=>{value=1;});scope.listen(range,'input','seek',()=>{value=Number(range.value);});
  range.fire('pointerdown');range.value='2';range.fire('input');assert(controller.status.canUndo);
  assert(await controller.undo());assert.equal(value,1);assert(await controller.redo());assert.equal(value,2);
  scope.begin('camera');value=3;assert(await controller.undo());assert.equal(value,2);
  assert(await controller.redo());assert.equal(value,3);scope.dispose();
});

await test('uncommitted text preview can be undone and an old control blur cannot cancel a new gesture',async()=>{
  const controller=new OperationHistory(),input=new FakeElement();input.value='A';let applied='A',camera=0;
  const scope=createHistoryScope({controller,capture:()=>({value:input.value,applied,camera}),restore:s=>{input.value=s.value;applied=s.applied;camera=s.camera;}});
  scope.reset();scope.listen(input,'change','edit',()=>{applied=input.value;});input.fire('focusin');input.value='B';input.fire('input');
  assert(controller.status.canUndo);assert(await controller.undo());assert.equal(input.value,'A');assert.equal(applied,'A');
  input.fire('focusin');scope.begin('camera');input.fire('focusout');camera=7;scope.commit('camera');
  assert(await controller.undo());assert.equal(camera,0);scope.dispose();
});

const oldDocument = globalThis.document, oldRequest = globalThis.requestAnimationFrame, oldCancel = globalThis.cancelAnimationFrame;
const oldScopeFactory = globalThis.__roboticsHistoryScope;
const frames = new Map(); let frameId = 0;
globalThis.document = { createElement: () => new FakeElement() };
globalThis.requestAnimationFrame = callback => { frames.set(++frameId, callback); return frameId; };
globalThis.cancelAnimationFrame = id => { frames.delete(id); };

async function panelHarness(kind) {
  const controller = new OperationHistory(50), scopes = [];
  globalThis.__roboticsHistoryScope = options => { const scope = createHistoryScope({ ...options, controller }); scopes.push({ options, scope }); return scope; };
  const base = new URL(`../src/features/robotics-lab/${kind}/`, import.meta.url);
  const source = readFileSync(new URL('panel.ts', base), 'utf8')
    .replace("from './engine'", `from '${new URL('engine.ts', base).href}'`)
    .replace(/import \{ createStudio \} from ['"]\.\.\/visuals\/studio['"];?/, 'const createStudio = () => null;')
    .replace(/import \{ createJointFixture \} from ['"]\.\.\/visuals\/joint-model['"];?/, 'const createJointFixture = () => { throw Error("Unexpected WebGL model in history test"); };')
    .replace(/import \{ createHistoryScope \} from ['"]\.\.\/history['"];?/, 'const createHistoryScope = globalThis.__roboticsHistoryScope;');
  const { mount } = await import(asModule(source));
  const values = { target: '.95', inertia: '.018', damping: '.075', torqueLimit: '.55', disturbance: '.22', scenario: 'step', kp: '3.2', ki: '5', kd: '.24' };
  const elements = new Map(), manual = ['healthy', 'arm', 'stop', 'clear', 'reset', 'timeout'].map(action => { const button = new FakeElement(); button.dataset.manual = action; button.textContent = action; return button; });
  const element = selector => {
    if (!elements.has(selector)) { const node = new FakeElement(), key = selector.match(/data-key="([^"]+)"/)?.[1]; node.value = values[key] ?? (selector === '[data-scenario]' ? 'estop' : '0'); elements.set(selector, node); }
    return elements.get(selector);
  };
  const host = { innerHTML: '', isConnected: true, querySelector: element, querySelectorAll: () => manual };
  mount(host, 'zh');
  return { controller, element, capture: () => scopes[0].options.capture(), manual: action => manual.find(button => button.dataset.manual === action).fire('click'), dispose: () => scopes.forEach(({ scope }) => scope.dispose()) };
}

try {
  await test('real control panel restores input edits, applied config, identification, charts and metrics', async () => {
    const panel = await panelHarness('control'), { controller, element } = panel;
    try {
      const initial = panel.capture(), initialChart = element('[data-chart]').innerHTML, initialMetrics = element('[data-metrics]').innerHTML;
      const target = element('[data-key="target"]'); target.fire('focusin'); target.value = '1.3'; target.fire('change');
      const scenario = element('[data-key="scenario"]'); scenario.fire('pointerdown'); scenario.value = 'sine'; scenario.fire('change');
      element('[data-run]').fire('click'); element('[data-identify]').fire('click');
      const changed = panel.capture(), changedChart = element('[data-chart]').innerHTML, changedMetrics = element('[data-metrics]').innerHTML;
      assert.equal(changed.appliedConfig.target, 1.3); assert.equal(changed.appliedConfig.scenario, 'sine'); assert(changed.identification.includes('辨识结果'));
      assert(await controller.undo()); assert.equal(element('[data-identification]').innerHTML, ''); assert.equal(panel.capture().appliedConfig.target, 1.3);
      assert(await controller.undo()); assert.deepEqual(panel.capture().appliedConfig, initial.appliedConfig); assert.equal(target.value, '1.3'); assert.equal(scenario.value, 'sine');
      assert(await controller.undo()); assert.equal(scenario.value, 'step'); assert.equal(target.value, '1.3');
      assert(await controller.undo()); assert.deepEqual(panel.capture(), initial); assert.equal(element('[data-chart]').innerHTML, initialChart); assert.equal(element('[data-metrics]').innerHTML, initialMetrics);
      for (let i = 0; i < 4; i++) assert(await controller.redo());
      assert.deepEqual(panel.capture(), changed); assert.equal(element('[data-chart]').innerHTML, changedChart); assert.equal(element('[data-metrics]').innerHTML, changedMetrics);
      element('[data-play]').fire('click'); assert.equal(frames.size, 1);
      assert(await controller.undo()); assert.equal(frames.size, 0); assert.equal(element('[data-play]').textContent, '播放');
      assert(await controller.redo()); assert.deepEqual(panel.capture(), changed);
      element('[data-play]').fire('click'); assert.equal(frames.size, 1);
      controller.record({ label: 'camera-only command', undo() {}, redo() {} });
      assert(await controller.undo()); assert.equal(frames.size, 0); assert.equal(element('[data-play]').textContent, '播放');
    } finally { panel.dispose(); frames.clear(); }
  });

  await test('real safety panel restores every manual latch step and selected/applied fault cases', async () => {
    const panel = await panelHarness('safety'), { controller, element } = panel;
    try {
      const states = [panel.capture()], manualStates = [element('[data-manual-state]').textContent];
      for (const action of ['healthy', 'arm', 'stop', 'clear', 'reset', 'arm', 'timeout', 'healthy', 'reset', 'arm']) {
        panel.manual(action); states.push(panel.capture()); manualStates.push(element('[data-manual-state]').textContent);
      }
      assert.equal(JSON.parse(manualStates[3]).state, 'FAULT'); assert.equal(JSON.parse(manualStates[4]).state, 'FAULT'); assert.equal(JSON.parse(manualStates[5]).state, 'DISARMED');
      for (let i = states.length - 2; i >= 0; i--) { assert(await controller.undo()); assert.deepEqual(panel.capture(), states[i]); assert.equal(element('[data-manual-state]').textContent, manualStates[i]); }
      for (let i = 1; i < states.length; i++) { assert(await controller.redo()); assert.deepEqual(panel.capture(), states[i]); assert.equal(element('[data-manual-state]').textContent, manualStates[i]); }
      const scenario = element('[data-scenario]'); scenario.fire('pointerdown'); scenario.value = 'timeout'; scenario.fire('change'); element('[data-run]').fire('click');
      assert.equal(panel.capture().appliedScenario, 'timeout');
      const time = element('[data-time]'); time.fire('pointerdown');
      for (const value of ['110', '125', '140']) { time.value = value; time.fire('input'); }
      assert.equal(controller.status.undoLabel, '调整审计时间'); time.fire('change');
      const audit = panel.capture(), auditSvg = element('[data-stage]').innerHTML, auditMetrics = element('[data-metrics]').innerHTML;
      assert.equal(audit.index, 140); assert(auditSvg.includes('FAULT'));
      assert(await controller.undo()); assert.equal(panel.capture().index, 0);
      assert(await controller.undo()); assert.equal(panel.capture().appliedScenario, 'estop'); assert.equal(scenario.value, 'timeout');
      assert(await controller.undo()); assert.equal(scenario.value, 'estop');
      for (let i = 0; i < 3; i++) assert(await controller.redo());
      assert.deepEqual(panel.capture(), audit); assert.equal(element('[data-stage]').innerHTML, auditSvg); assert.equal(element('[data-metrics]').innerHTML, auditMetrics); assert.equal(element('[data-manual-state]').textContent, manualStates.at(-1));
      element('[data-play]').fire('click'); assert.equal(frames.size, 1); assert(await controller.undo()); assert.equal(frames.size, 0); assert.equal(element('[data-play]').textContent, '播放事件');
    } finally { panel.dispose(); frames.clear(); }
  });
} finally {
  if (oldDocument === undefined) delete globalThis.document; else globalThis.document = oldDocument;
  if (oldRequest === undefined) delete globalThis.requestAnimationFrame; else globalThis.requestAnimationFrame = oldRequest;
  if (oldCancel === undefined) delete globalThis.cancelAnimationFrame; else globalThis.cancelAnimationFrame = oldCancel;
  if (oldScopeFactory === undefined) delete globalThis.__roboticsHistoryScope; else globalThis.__roboticsHistoryScope = oldScopeFactory;
}

console.log(`${checks} operation history tests passed (in-memory controller, actual panel adapters and no-WebGL DOM harness; browser layout and hardware are not implied).`);
