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
const frontmatterValue = (text, field) => text.match(new RegExp(`^${field}:\\s*(.+)$`, "m"))?.[1]?.trim();
const inlineList = (value = "") => value
  .replace(/^\[/, "")
  .replace(/\]$/, "")
  .split(",")
  .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
  .filter(Boolean);
const contentRecords = content.map((item) => ({
  ...item,
  locale: frontmatterValue(item.text, "locale"),
  slug: path.basename(item.file).replace(/\.mdx?$/, ""),
  body: item.text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, ""),
}));
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

const countKind = (kind, locale) => contentRecords.filter((item) => item.locale === locale && frontmatterValue(item.text, "kind") === kind).length;
for (const locale of ["zh", "en"]) {
  assert(countKind("whitepaper", locale) === 3, `${locale} 白皮书数量应为 3，当前 ${countKind("whitepaper", locale)}`);
  assert(countKind("article", locale) === 9, `${locale} 技术文章数量应为 9，当前 ${countKind("article", locale)}`);
  assert(countKind("case-study", locale) === 6, `${locale} 案例数量应为 6，当前 ${countKind("case-study", locale)}`);
}

const zhContent = contentRecords.filter((item) => item.locale === "zh");
const enContent = contentRecords.filter((item) => item.locale === "en");
assert(contentRecords.length === zhContent.length + enContent.length, "资料库中存在未识别的 locale");
assert(zhContent.length === enContent.length, `中英文资料数量不一致：zh ${zhContent.length} / en ${enContent.length}`);

const pairedFields = ["kind", "industry", "publicationStatus", "date", "reviewedAt"];
const pairedLists = ["evidence", "sourceIds"];
for (const zhItem of zhContent) {
  const enItem = enContent.find((item) => item.slug === zhItem.slug);
  assert(Boolean(enItem), `${zhItem.file} 缺少同名英文资料`);
  if (!enItem) continue;
  for (const field of pairedFields) {
    assert(
      frontmatterValue(zhItem.text, field) === frontmatterValue(enItem.text, field),
      `${zhItem.slug} 的中英文 ${field} 不一致`,
    );
  }
  for (const field of pairedLists) {
    const zhValues = inlineList(frontmatterValue(zhItem.text, field)).sort().join("|");
    const enValues = inlineList(frontmatterValue(enItem.text, field)).sort().join("|");
    assert(zhValues === enValues, `${zhItem.slug} 的中英文 ${field} 不一致`);
  }
  assert(frontmatterValue(zhItem.text, "alternatePath") === `/en/library/${zhItem.slug}`, `${zhItem.file} 的英文替代路径不准确`);
  assert(frontmatterValue(enItem.text, "alternatePath") === `/library/${zhItem.slug}`, `${enItem.file} 的中文替代路径不准确`);
}
for (const enItem of enContent) {
  assert(zhContent.some((item) => item.slug === enItem.slug), `${enItem.file} 缺少同名中文资料`);
  assert(!/[\u3400-\u9fff]/u.test(enItem.body), `${enItem.file} 英文正文中存在中文字符`);
}

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
  content: {
    zh: { whitepapers: countKind("whitepaper", "zh"), articles: countKind("article", "zh"), cases: countKind("case-study", "zh") },
    en: { whitepapers: countKind("whitepaper", "en"), articles: countKind("article", "en"), cases: countKind("case-study", "en") },
    translationPairs: zhContent.filter((item) => enContent.some((candidate) => candidate.slug === item.slug)).length,
  },
  glossary: (glossaryText.match(/^  \["/gm) ?? []).length,
  status: failures.length ? "failed" : "passed",
}, null, 2));

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
