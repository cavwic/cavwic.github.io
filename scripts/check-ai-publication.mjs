import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { aiSkills } from '../src/data/ai-delivery.ts';
import { siteFeatures } from '../src/data/site-features.ts';
import { presalesPlatform, solutionsLabUrl, solutionsLabDownloadUrl } from '../src/data/site.ts';

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
  return html;
}

for (const prefix of ['', '/en']) {
  const locale = prefix ? 'en' : 'zh';
  await checkDirectory(`${prefix}/solutions`, [...new Set(aiSkills.map((skill) => `${prefix}/library/${skill.solution}`))]);
  await checkDirectory(`${prefix}/articles`, aiSkills.map((skill) => `${prefix}/library/${skill.article}`));
  await checkDirectory(`${prefix}/skills`, aiSkills.map((skill) => `${prefix}/skills/${skill.slug}`));
  const tools = await checkDirectory(`${prefix}/tools`, siteFeatures.aiDeliveryWorkbench ? [`${prefix}/tools/ai-delivery-workbench`] : []);
  const dialog = tools.match(/<dialog\b[^>]*data-tool-version-dialog[^>]*>[\s\S]*?<\/dialog>/)?.[0];
  assert.ok(dialog, `${prefix}/tools is missing the web/desktop version dialog`);
  assert.ok(dialog.includes(`href="${solutionsLabUrl}"`), 'The existing web app destination changed');
  assert.ok(dialog.includes(`href="${solutionsLabDownloadUrl}"`), 'The desktop download destination is missing');
  assert.ok(dialog.includes(presalesPlatform[locale].title), 'The version dialog has the old platform name');
  assert.ok(dialog.includes(presalesPlatform[locale].versionPicker.downloadDescription), 'The desktop capability summary is missing');
  const home = await readFile(path.join(root, prefix.slice(1), 'index.html'), 'utf8');
  assert.ok(home.includes(presalesPlatform[locale].title), 'Homepage is missing the renamed presales platform');
  assert.ok(!/解决方案项目工作台|Solution Project Workbench/.test(tools + home), 'Old platform name remains in published entries');
  if (!siteFeatures.aiDeliveryWorkbench) {
    const redirect = await readFile(path.join(root, prefix.slice(1), 'tools/ai-delivery-workbench/index.html'), 'utf8');
    assert.match(redirect, /<meta\b[^>]*http-equiv=["']refresh["']/i);
    assert.ok(redirect.includes(`url=${prefix}/tools`), 'Paused workbench must return to the localized tools page');
  }
}
if (!siteFeatures.aiDeliveryWorkbench) {
  for (const file of await readdir(root, { recursive: true })) {
    if (path.basename(file).startsWith('sitemap') && file.endsWith('.xml')) {
      const xml = await readFile(path.join(root, file), 'utf8');
      assert.ok(!xml.includes('/tools/ai-delivery-workbench'), `Paused workbench in ${file}`);
    }
    if (!file.endsWith('.html')) continue;
    const html = (await readFile(path.join(root, file), 'utf8')).replace(/<!--[\s\S]*?-->/g, '');
    assert.ok(!/<a\b[^>]*\bhref=["'][^"']*\/tools\/ai-delivery-workbench/i.test(html), `Paused workbench link in ${file}`);
    assert.ok(!/\sdata-ai-workbench(?:\s|=|>)/i.test(html), `Paused workbench UI rendered in ${file}`);
  }
}
console.log(JSON.stringify({ status: 'passed', locales: 2, directories: 8, checkedLinks, aiWorkbenchEnabled: siteFeatures.aiDeliveryWorkbench }, null, 2));
