import { readFile, stat } from "node:fs/promises";
import { parseBrief, inspectBrief } from "./brief-model.mjs";
const args = process.argv.slice(2);
const locale = args[args.indexOf("--locale") + 1] === "zh" ? "zh" : "en";
try {
  const file = args[0];
  if (!file || file.startsWith("--")) throw new Error("Usage: node scripts/validate-brief.mjs <brief.json> [--locale zh|en]");
  if ((await stat(file)).size > 1_000_000) throw new Error("File exceeds 1 MB");
  const brief = parseBrief(JSON.parse(await readFile(file, "utf8")));
  const skill = JSON.parse(await readFile(new URL("./skill.json", import.meta.url), "utf8"));
  if (brief.mode !== skill.mode) throw new Error(locale === "zh" ? `此 Skill 只接收 ${skill.mode} 模式任务，不能替代 ${brief.mode} 模式。` : `This Skill accepts ${skill.mode} tasks, not ${brief.mode} tasks.`);
  const findings = inspectBrief(brief, locale);
  console.log(JSON.stringify({ skill: skill.name, mode: skill.mode, formatValid: true, executionPerformed: false, findings, note: locale === "zh" ? "仅所属模式、格式及表单检查，不代表实际授权、实测通过或安全认证。" : "Task mode, format and form checks only; not authorization, test evidence or security certification." }, null, 2));
  process.exitCode = findings.some(f => f.level === "blocker") ? 1 : 0;
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 2;
}
