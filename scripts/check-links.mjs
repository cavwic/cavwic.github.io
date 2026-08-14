import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const items = await Promise.all(entries.map((entry) => entry.isDirectory()
    ? walk(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]));
  return items.flat();
}

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

const htmlFiles = (await walk(dist)).filter((file) => file.endsWith(".html"));
const failures = [];
let internalCount = 0;
let externalCount = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const hrefs = [...html.matchAll(/\bhref=["']([^"']+)["']/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("javascript:")) continue;
    if (/^https?:\/\//.test(href)) {
      externalCount += 1;
      try { new URL(href); } catch { failures.push(`${path.relative(root, file)}: invalid external URL ${href}`); }
      continue;
    }
    internalCount += 1;
    const pathname = decodeURIComponent(href.split(/[?#]/)[0]);
    if (!pathname.startsWith("/")) continue;
    const relative = pathname.replace(/^\//, "");
    const candidates = pathname === "/"
      ? [path.join(dist, "index.html")]
      : [path.join(dist, relative), path.join(dist, relative, "index.html"), path.join(dist, `${relative}.html`)];
    if (!(await Promise.all(candidates.map(exists))).some(Boolean)) {
      failures.push(`${path.relative(root, file)}: missing internal target ${href}`);
    }
  }
}

console.log(JSON.stringify({ pages: htmlFiles.length, internalLinks: internalCount, externalLinks: externalCount, status: failures.length ? "failed" : "passed" }, null, 2));
if (failures.length) {
  console.error(failures.slice(0, 50).map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}
