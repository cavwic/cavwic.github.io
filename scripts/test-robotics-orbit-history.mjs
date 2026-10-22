import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

// Exercise the real studio, scope/controller and installed OrbitControls.
// Only the native DOM/WebGL rendering boundary is stubbed; no camera movement,
// gesture cancellation, or history implementation is replaced by test logic.
const compile = source => ts.transpileModule(source, { compilerOptions: {
  target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
} }).outputText;
const moduleURL = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const coreURL = moduleURL(compile(readFileSync(new URL('../src/features/robotics-lab/history-core.ts', import.meta.url), 'utf8')));
const historyURL = moduleURL(compile(readFileSync(new URL('../src/features/robotics-lab/history.ts', import.meta.url), 'utf8')).replaceAll("'./history-core'", JSON.stringify(coreURL)));
const { OperationHistory, createHistoryScope } = await import(historyURL);
const controller = new OperationHistory();
const testKey = Symbol.for('cavwic.robotics.orbit-history-test');
const scopeOptions = [];
const frames = new Map();
let nextFrame = 0;

class Element extends EventTarget {
  constructor(tagName, ownerDocument) {
    super(); this.tagName = tagName.toUpperCase(); this.ownerDocument = ownerDocument;
  }
  children = [];
  dataset = {};
  attributes = new Map();
  className = '';
  textContent = '';
  clientWidth = 800;
  clientHeight = 450;
  isConnected = true;
  style = { setProperty() {} };
  classList = { add() {} };
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = [...children]; }
  contains(child) { return this.children.includes(child) || this.children.some(node => node.contains(child)); }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  getRootNode() { return this.ownerDocument; }
  setPointerCapture() {}
  releasePointerCapture() {}
}
class Document extends EventTarget {
  documentElement = { dataset: { locale: 'en', theme: 'light' } };
  hidden = false;
  constructor() { super(); this.body = new Element('body', this); }
  createElement(tag) { return new Element(tag, this); }
}
const document = new Document();
const replacements = {
  document,
  window: { devicePixelRatio: 1 },
  requestAnimationFrame: callback => { const id = ++nextFrame; frames.set(id, callback); return id; },
  cancelAnimationFrame: id => { frames.delete(id); },
  ResizeObserver: class { observe() {} disconnect() {} },
  MutationObserver: class { observe() {} disconnect() {} },
};
const previous = new Map(Object.keys(replacements).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
for (const [key, value] of Object.entries(replacements)) Object.defineProperty(globalThis, key, { value, writable: true, configurable: true });
globalThis[testKey] = {
  canvas: undefined,
  createCanvas() { const canvas = document.createElement('canvas'); this.canvas = canvas; return canvas; },
  scopeFactory(options) { scopeOptions.push(options); return createHistoryScope({ ...options, controller }); },
};

const actualThree = import.meta.resolve('three');
const renderBoundary = moduleURL(`
  import { Texture } from ${JSON.stringify(actualThree)};
  export * from ${JSON.stringify(actualThree)};
  export class WebGLRenderer {
    constructor() { this.domElement=globalThis[Symbol.for('cavwic.robotics.orbit-history-test')].createCanvas(); this.shadowMap={}; }
    setPixelRatio() {} setSize() {} render() {} dispose() {}
  }
  export class PMREMGenerator {
    fromScene() { return {texture:new Texture(),dispose(){}}; }
    dispose() {}
  }
`);
let source = readFileSync(new URL('../src/features/robotics-lab/visuals/studio.ts', import.meta.url), 'utf8');
source = source.replace("import * as THREE from 'three';", `import * as THREE from ${JSON.stringify(renderBoundary)};`)
  .replace("import { createHistoryScope } from '../history';", "const createHistoryScope=globalThis[Symbol.for('cavwic.robotics.orbit-history-test')].scopeFactory;");
source = source.replace(/from\s*(['"])(three\/[^'"]+)\1/g, (_, quote, specifier) => `from ${quote}${import.meta.resolve(specifier)}${quote}`);
let studio;
try {
  const { createStudio } = await import(moduleURL(compile(source)));
  const host = document.createElement('div'); document.body.append(host);
  studio = createStudio(host, { locale: 'en', label: 'Orbit regression', span: .5, camera: [.5, .4, .6], target: [0, .12, 0] });
  assert(studio, 'Headless renderer boundary must allow the actual studio to initialize');
  assert.equal(scopeOptions.length, 1);
  const capture = scopeOptions[0].capture;
  const canvas = globalThis[testKey].canvas;
  const initial = capture();
  const positionDistance = (a, b) => Math.hypot(...a.position.map((value, index) => value - b.position[index]));
  const sameCamera = (a, b) => {
    assert(positionDistance(a, b) < 1e-8, 'Camera position changed');
    assert(Math.abs(a.zoom - b.zoom) < 1e-8, 'Camera zoom changed');
    for (let index = 0; index < 3; index++) assert(Math.abs(a.target[index] - b.target[index]) < 1e-8, 'Camera target changed');
    assert.equal(a.floor, b.floor); assert.deepEqual(a.selected, b.selected);
  };
  const pointer = (target, type, x, y = 100) => {
    const event = new Event(type);
    Object.assign(event, { pointerId: 1, pointerType: 'mouse', button: 0, clientX: x, clientY: y,
      ctrlKey: false, metaKey: false, shiftKey: false });
    target.dispatchEvent(event);
  };

  // A still-held drag is flushed to history before undo. The restore must also
  // cancel OrbitControls' internal pointer state, not only an application flag.
  pointer(canvas, 'pointerdown', 100);
  pointer(document, 'pointermove', 150, 120);
  const dragged = capture(); assert(positionDistance(initial, dragged) > 1e-4);
  assert(await controller.undo(), 'Undo must include the unfinished orbit gesture');
  sameCamera(capture(), initial);
  assert(controller.status.canRedo);
  pointer(document, 'pointermove', 190, 140);
  pointer(document, 'pointerup', 190, 140);
  sameCamera(capture(), initial);
  assert(controller.status.canRedo, 'Stale pointer motion must not create a branch');
  assert(!controller.status.canUndo, 'Stale pointer motion must not create a phantom command');
  console.log('PASS: mid-drag undo restores the camera and cancels stale pointer moves/up.');

  // A genuinely new pointer gesture must still work after reconnecting, record
  // exactly once, and replace the old redo branch.
  pointer(canvas, 'pointerdown', 200);
  pointer(document, 'pointermove', 225, 125);
  pointer(document, 'pointerup', 225, 125);
  const branched = capture(); assert(positionDistance(initial, branched) > 1e-4);
  assert(controller.status.canUndo); assert(!controller.status.canRedo);
  assert(await controller.undo()); sameCamera(capture(), initial);
  assert(!controller.status.canUndo, 'The new gesture must be one command, not several frames');
  assert(await controller.redo()); sameCamera(capture(), branched);
  console.log('PASS: a new gesture after cancellation records once, clears redo, and round-trips.');

  // A redo shortcut during another held drag must preserve the new draft as a
  // new branch, rather than reapplying an obsolete command over that movement.
  assert(await controller.undo()); sameCamera(capture(), initial);
  pointer(canvas, 'pointerdown', 250);
  pointer(document, 'pointermove', 290, 130);
  const draft = capture();
  assert.equal(await controller.redo(), false, 'A new live edit invalidates the old redo branch');
  pointer(document, 'pointerup', 290, 130);
  sameCamera(capture(), draft);
  assert(await controller.undo()); sameCamera(capture(), initial);
  assert(await controller.redo()); sameCamera(capture(), draft);
  console.log('PASS: redo during a new live gesture preserves the edit and invalidates the old branch.');
  console.log('PASS: actual studio + actual OrbitControls/history regression; no pixel or browser-layout claim.');
} finally {
  studio?.dispose();
  frames.clear();
  delete globalThis[testKey];
  for (const [key, descriptor] of previous) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else delete globalThis[key];
  }
}
