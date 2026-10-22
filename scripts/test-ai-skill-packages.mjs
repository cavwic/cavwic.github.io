import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
const root = process.cwd();
let checked = 0;
for (const slug of ["enterprise-ai-delivery", "workflow-reliability", "ai-coding-delivery"]) {
  for (const locale of ["zh", "en"]) {
    const staging = path.join(root, "review/generated-ai-skills", locale, slug);
    const output = path.join(root, "public/skills", slug, locale);
    assert.equal(await readFile(path.join(output, "SKILL.md"), "utf8"), await readFile(path.join(root, "skill-packs", slug, locale, "SKILL.md"), "utf8"));
    assert.equal(await readFile(path.join(output, "brief.example.json"), "utf8"), await readFile(path.join(staging, "brief.example.json"), "utf8"));
    assert.ok((await stat(path.join(output, `${slug}.zip`))).size > 1000);
    const validate = file => spawnSync(process.execPath, ["scripts/validate-brief.mjs", file, "--locale", locale], { cwd: staging, encoding: "utf8", windowsHide: true });
    const example = validate("brief.example.json");
    assert.equal(example.status, 0, example.stderr || String(example.error));
    assert.equal(JSON.parse(example.stdout).executionPerformed, false);
    assert.equal(JSON.parse(example.stdout).skill, slug);
    const other = slug === "workflow-reliability" ? "enterprise-ai-delivery" : "workflow-reliability";
    assert.equal(validate(path.join(root, "review/generated-ai-skills", locale, other, "brief.example.json")).status, 2);
    assert.ok((await readFile(path.join(output, "references/example.md"), "utf8")).length > 300);
    assert.equal(validate("brief.blank.json").status, 1);
    assert.equal(validate("not-a-file.json").status, 2);
    checked++;
  }
}
console.log(JSON.stringify({ packages: checked, exampleChecks: 6, blankChecks: 6, missingFileChecks: 6, wrongModeRejections: 6, passed: true }, null, 2));
