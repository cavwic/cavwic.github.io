import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'dist');
const budget = 900 * 1024 ** 2;
let bytes = 0, files = 0, pages = 0;
const forbidden = /^(?:en\/)?(?:jeeling-data\/|products\/|repository\/(?:products|companies)\/)/;
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await visit(file); continue; }
    const relative = path.relative(root, file).replaceAll('\\', '/');
    assert.ok(!forbidden.test(relative), `Local-only catalog leaked into the public output: ${relative}`);
    bytes += (await stat(file)).size;
    files++;
    if (!relative.endsWith('.html')) continue;
    pages++;
    const html = await readFile(file, 'utf8');
    assert.ok(!/\b(?:href|src)=["']https?:\/\/(?:127\.0\.0\.1|localhost)(?::|\/)/i.test(html), `Local preview link in public HTML: ${relative}`);
  }
}
await visit(root);
for (const file of ['tools/robotics-lab/index.html', 'en/tools/robotics-lab/index.html']) {
  assert.ok((await stat(path.join(root, file))).size > 0, `Missing lab overview: ${file}`);
}
assert.ok(bytes <= budget, `Public output ${bytes} bytes exceeds the 900 MiB safety budget`);
console.log(JSON.stringify({ bytes, files, pages, budgetBytes: budget, remainingBudgetBytes: budget - bytes, status: 'passed' }, null, 2));
