import assert from "node:assert/strict";
import { test } from "node:test";
import { emptyBrief, exampleBrief, getLaunchBrief, inspectBrief, parseBrief, renderBrief } from "../src/features/ai-delivery/model.ts";
import { aiSkills } from "../src/data/ai-delivery.ts";

test("blank brief exposes missing contracts and does not claim execution", () => {
  const b = emptyBrief("enterprise", "zh");
  assert.equal(inspectBrief(b, "zh").filter(f => f.level === "blocker").length, 7);
  assert.match(renderBrief(b, "zh"), /未执行步骤/);
});
test("all bilingual design examples round-trip without form blockers", () => {
  for (const locale of ["zh", "en"]) for (const mode of ["enterprise", "workflow", "coding"]) {
    const b = exampleBrief(mode, locale);
    assert.deepEqual(parseBrief(JSON.parse(JSON.stringify(b))), b);
    assert.equal(inspectBrief(b, locale).filter(f => f.level === "blocker").length, 0);
    assert.match(renderBrief(b, locale, "prompt"), locale === "zh" ? /未调用模型/ : /no model calls/);
    if (locale === "en") for (const format of ["plan", "checks", "prompt"]) assert.doesNotMatch(renderBrief(b, locale, format), /[\u3400-\u9fff]/u);
  }
});
test("approval and validation order are independent gates", () => {
  const b = exampleBrief("workflow", "en");
  b.steps = [{ name: "draft", kind: "model", approval: false }, { name: "send", kind: "write", approval: false }, { name: "too late", kind: "check", approval: false }];
  const ids = inspectBrief(b, "en").map(f => f.id);
  assert.ok(ids.includes("approval-1"));
  assert.ok(ids.includes("write-before-check-1"));
  b.steps[1].approval = true;
  assert.ok(inspectBrief(b, "en").some(f => f.id === "write-before-check-1"));
});
test("a later model call cannot rely on an earlier validation", () => {
  const b = exampleBrief("enterprise", "en");
  b.steps.push({ name: "unchecked rewrite", kind: "model", approval: false });
  assert.ok(inspectBrief(b, "en").some(f => f.id === "unchecked-4"));
});
test("imports reject malformed, oversized and executable-shaped data", () => {
  const valid = exampleBrief("coding", "en");
  for (const invalid of [null, [], {}, { ...valid, version: 2 }, { ...valid, mode: "shell" }, { ...valid, sensitive: "false" }, { ...valid, steps: [{ name: "a", kind: "eval", approval: true }] }, { ...valid, steps: Array(31).fill(valid.steps[0]) }, { ...valid, objective: "a".repeat(12001) }]) assert.throws(() => parseBrief(invalid));
  const clean = parseBrief({ ...valid, execute: "rm -rf", __proto__: { malicious: true } });
  assert.equal(clean.execute, undefined);
  assert.equal(clean.malicious, undefined);
});
test("sensitive and external flags remain review items and survive export", () => {
  const b = { ...exampleBrief("enterprise", "zh"), sensitive: true, external: true };
  assert.ok(inspectBrief(b, "zh").some(f => f.id === "sensitive"));
  assert.ok(inspectBrief(b, "zh").some(f => f.id === "external"));
  assert.match(renderBrief(b, "zh"), /敏感资料: 是/);
});
test("each Skill launches its own mode and its own worked example", () => {
  const titles = new Set();
  for (const skill of aiSkills) {
    for (const locale of ["zh", "en"]) {
      const b = getLaunchBrief(`?mode=${skill.mode}&example=1`, locale);
      assert.equal(b.mode, skill.mode);
      assert.deepEqual(b, exampleBrief(skill.mode, locale));
      titles.add(b.title);
      assert.equal(getLaunchBrief(`?mode=${skill.mode}`, locale).title, "");
    }
  }
  assert.equal(titles.size, 6);
  assert.equal(getLaunchBrief("?mode=unknown&example=1", "zh").title, "");
});
test("Skill pages distinguish lifecycle, inputs, deliverables and examples", () => {
  for (const locale of ["zh", "en"]) {
    for (const key of ["phase", "question", "request", "boundary"]) assert.equal(new Set(aiSkills.map(s => s[key][locale])).size, 3);
    for (const key of ["inputs", "outputs", "sequence", "example"]) assert.equal(new Set(aiSkills.map(s => JSON.stringify(s[key][locale]))).size, 3);
  }
  assert.equal(new Set(aiSkills.map(s => s.article)).size, 3);
});
