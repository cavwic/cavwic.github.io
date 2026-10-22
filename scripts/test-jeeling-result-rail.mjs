import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../src/components/RoboDict.astro', import.meta.url), 'utf8');
const helper = source.match(/const setResultRailOpen = \(open\) => \{([\s\S]*?)\n    \};/)[1];
const element = () => {
  const classes = new Set(), attributes = new Map();
  return {
    hidden: false, classes, attributes,
    classList: { toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); } },
    setAttribute(name, value) { attributes.set(name, value); },
  };
};
const setup = () => {
  const context = Object.fromEntries(['resultPane', 'resultRailPanel', 'resultRailToggle', 'resultRailCollapse', 'finderRoot', 'workspace'].map(name => [name, element()]));
  const setOpen = runInNewContext(`(open) => {${helper}}`, context);
  return { ...context, setOpen };
};

test('search results start open, with a collapse control and no duplicate tab stop', () => {
  const state = setup();
  state.setOpen(true);
  assert.equal(state.resultRailPanel.hidden, false);
  assert.equal(state.resultRailToggle.hidden, true);
  assert.equal(state.resultRailCollapse.attributes.get('aria-expanded'), 'true');
  assert.equal(state.finderRoot.classes.has('result-rail-open'), true);
  assert.equal(state.finderRoot.classes.has('result-rail-collapsed'), false);
});

test('collapse hides the whole panel and leaves a labelled reopen entry', () => {
  const state = setup();
  state.setOpen(true);
  state.setOpen(false);
  assert.equal(state.resultRailPanel.hidden, true);
  assert.equal(state.resultRailToggle.hidden, false);
  assert.equal(state.resultRailToggle.attributes.get('aria-expanded'), 'false');
  assert.equal(state.finderRoot.classes.has('result-rail-collapsed'), true);
  state.setOpen(true);
  assert.equal(state.resultRailPanel.hidden, false);
  assert.equal(state.finderRoot.classes.has('result-rail-collapsed'), false);
});

test('reset restores the initial page without reserving result-rail space', () => {
  const state = setup();
  state.workspace.hidden = true;
  state.setOpen(false);
  assert.equal(state.finderRoot.classes.size, 0);
});

test('mouse hover cannot reopen a collapsed rail; both languages expose labels', () => {
  assert.doesNotMatch(source, /\.result-pane:is\(:hover/);
  assert.doesNotMatch(source.match(/\.result-pane \{[^}]+\}/)[0], /pointer-events:\s*none/);
  assert.match(source, /collapseResults: "收起搜索结果"/);
  assert.match(source, /expandResults: "Expand search results"/);
  assert.match(source, /id="result-rail-collapse"[^>]+aria-controls="result-rail-panel"/);
});
