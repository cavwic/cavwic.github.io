import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => readFile(path.join(root, file), "utf8");
const listFiles = async (directory) => {
  const entries = await readdir(path.join(root, directory), { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory()
    ? listFiles(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]));
  return nested.flat();
};

const sourcesText = await read("src/data/sources.ts");
const catalogText = await read("src/data/catalog.ts");
const glossaryText = await read("src/data/glossary.ts");
const contentFiles = (await listFiles("src/content/library")).filter((file) => /\.mdx?$/.test(file));
const content = await Promise.all(contentFiles.map(async (file) => ({ file, text: await read(file) })));

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const ids = [...sourcesText.matchAll(/source\("([^"]+)"/g)].map((match) => match[1]);
const urls = [...sourcesText.matchAll(/source\("[^"]+",\s*"[^"]+",\s*"([^"]+)"/g)].map((match) => match[1]);
const jobCount = ids.filter((id) => id.startsWith("job-")).length;
const referenceCount = ids.filter((id) => id.startsWith("ref-")).length;

assert(ids.length >= 80, `来源不足：${ids.length}/80`);
assert(jobCount >= 30, `岗位样本不足：${jobCount}/30`);
assert(new Set(ids).size === ids.length, "来源 ID 存在重复");
assert(new Set(urls).size === urls.length, "来源 URL 存在重复");
assert((catalogText.match(/slug: "/g) ?? []).length >= 16, "公司档案或产品矩阵数量不足");
assert((glossaryText.match(/^  \["/gm) ?? []).length >= 120, "术语数量不足 120");

const countKind = (kind) => content.filter(({ text }) => text.includes(`kind: ${kind}`) && text.includes("locale: zh")).length;
assert(countKind("whitepaper") === 3, `白皮书数量应为 3，当前 ${countKind("whitepaper")}`);
assert(countKind("article") === 9, `技术文章数量应为 9，当前 ${countKind("article")}`);
assert(countKind("case-study") === 6, `案例数量应为 6，当前 ${countKind("case-study")}`);

const requiredFields = ["title:", "description:", "locale:", "kind:", "industry:", "evidence:", "publicationStatus:", "reviewedAt:", "sourceIds:"];
for (const item of content) {
  for (const field of requiredFields) assert(item.text.includes(field), `${item.file} 缺少 ${field}`);
  const references = item.text.match(/(?:job|ref)-\d{2}/g) ?? [];
  for (const id of references) assert(ids.includes(id), `${item.file} 引用了不存在的来源 ${id}`);
}

const routedFiles = (await listFiles("src")).filter((file) => /\.(astro|ts|md|mdx)$/.test(file));
const routedText = (await Promise.all(routedFiles.map(read))).join("\n");
const forbidden = [
  [/1[3-9]\d{9}/g, "手机号"],
  [/戴尔/g, "客户名称"],
  [/合同金额|项目金额|原始标书|内部截图|联系人姓名/g, "敏感业务描述"],
];
for (const [pattern, label] of forbidden) assert(!pattern.test(routedText), `路由内容检测到${label}`);

console.log(JSON.stringify({
  sources: ids.length,
  jobSources: jobCount,
  referenceSources: referenceCount,
  content: { whitepapers: countKind("whitepaper"), articles: countKind("article"), cases: countKind("case-study") },
  glossary: (glossaryText.match(/^  \["/gm) ?? []).length,
  status: failures.length ? "failed" : "passed",
}, null, 2));

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
