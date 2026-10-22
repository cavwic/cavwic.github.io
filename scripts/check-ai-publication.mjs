import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { aiSkills } from '../src/data/ai-delivery.ts';

const root = path.resolve(process.argv[2] || 'dist');
let checkedLinks = 0;
async function checkDirectory(route, targets) {
  const html = await readFile(path.join(root, route.slice(1), 'index.html'), 'utf8');
  const links = new Set([...html.matchAll(/\bhref=["']([^"']+)["']/g)]
    .map((match) => match[1].replace(/\/$/, '')));
  for (const target of targets) {
    assert.ok(links.has(target), `${route} is missing published entry ${target}`);
    const detail = await readFile(path.join(root, target.slice(1), 'index.html'), 'utf8');
    assert.match(detail, /<h1\b/, `Missing detail page heading: ${target}`);
    checkedLinks++;
  }
}

for (const prefix of ['', '/en']) {
  await checkDirectory(`${prefix}/solutions`, [...new Set(aiSkills.map((skill) => `${prefix}/library/${skill.solution}`))]);
  await checkDirectory(`${prefix}/articles`, aiSkills.map((skill) => `${prefix}/library/${skill.article}`));
  await checkDirectory(`${prefix}/skills`, aiSkills.map((skill) => `${prefix}/skills/${skill.slug}`));
  await checkDirectory(`${prefix}/tools`, [`${prefix}/tools/ai-delivery-workbench`]);
}
console.log(JSON.stringify({ status: 'passed', locales: 2, directories: 8, checkedLinks }, null, 2));
