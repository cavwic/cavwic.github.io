import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import ts from "typescript";
import { emptyBrief, exampleBrief } from "../src/features/ai-delivery/model.ts";
const root = process.cwd();
const model = ts.transpileModule(await readFile("src/features/ai-delivery/model.ts", "utf8"), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
for (const [slug, mode] of [["enterprise-ai-delivery", "enterprise"], ["workflow-reliability", "workflow"], ["ai-coding-delivery", "coding"]]) {
  for (const locale of ["zh", "en"]) {
    const source = path.join(root, "skill-packs", slug, locale);
    const staging = path.join(root, "review", "generated-ai-skills", locale, slug);
    const output = path.join(root, "public", "skills", slug, locale);
    await cp(source, staging, { recursive: true });
    await mkdir(path.join(staging, "scripts"), { recursive: true });
    await writeFile(path.join(staging, "scripts", "brief-model.mjs"), model);
    await cp(path.join(root, "skill-packs/shared/validate-brief.mjs"), path.join(staging, "scripts/validate-brief.mjs"));
    await writeFile(path.join(staging, "scripts/skill.json"), JSON.stringify({ name: slug, mode, locale }, null, 2) + "\n");
    await writeFile(path.join(staging, "brief.example.json"), JSON.stringify(exampleBrief(mode, locale), null, 2) + "\n");
    await writeFile(path.join(staging, "brief.blank.json"), JSON.stringify(emptyBrief(mode, locale), null, 2) + "\n");
    await mkdir(output, { recursive: true });
    await cp(path.join(source, "SKILL.md"), path.join(output, "SKILL.md"));
    await cp(path.join(source, "references"), path.join(output, "references"), { recursive: true });
    await cp(path.join(staging, "brief.example.json"), path.join(output, "brief.example.json"));
    const zip = path.join(output, `${slug}.zip`);
    // Explicit absolute paths, passed as environment values rather than interpolated shell code.
    execFileSync("powershell.exe", ["-NoProfile", "-NonInteractive", "-WindowStyle", "Hidden", "-Command", "Compress-Archive -LiteralPath $env:AI_SKILL_SOURCE -DestinationPath $env:AI_SKILL_ZIP -Force"], { env: { ...process.env, AI_SKILL_SOURCE: staging, AI_SKILL_ZIP: zip }, windowsHide: true });
    console.log(`${locale}/${slug}: ready`);
  }
}
