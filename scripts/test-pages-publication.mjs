import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getLatestPublications } from '../src/data/latest-publications.ts';
import { siteFeatures } from '../src/data/site-features.ts';
import { findPrivacyIssues } from './privacy-text-checks.mjs';

test('recent releases include localized AI and lab tools without duplicate links', () => {
  for (const locale of ['zh', 'en']) {
    const href = `${locale === 'zh' ? '' : '/en'}/tools/robotics-lab`;
    const old = Array.from({ length: 6 }, (_, index) => ({ title: `Article ${index}`, description: 'Existing published article', status: 'published', href: `/library/${index}` }));
    const pausedHref = `${locale === 'zh' ? '' : '/en'}/tools/ai-delivery-workbench`;
    const entries = getLatestPublications(locale, [{ ...old[0], href }, { ...old[0], href: pausedHref }, ...old]);
    assert.equal(entries.length, 4);
    assert.equal(entries[0].href, siteFeatures.aiDeliveryWorkbench ? pausedHref : `${locale === 'zh' ? '' : '/en'}/library/enterprise-ai-workflow-delivery`);
    if (!siteFeatures.aiDeliveryWorkbench) assert.equal(entries.some(entry => entry.href === pausedHref), false);
    assert.equal(entries[1].href, href);
    assert.equal(entries.filter(entry => entry.href === href).length, 1);
    assert.equal(entries[0].status, 'published');
    assert.match(entries[1].description, locale === 'zh' ? /不等于真机/ : /not hardware validation/);
  }
});

test('privacy checks catch contacts and specific business amounts', () => {
  assert.deepEqual(findPrivacyIssues('联系电话：13800000000'), ['手机号']);
  assert.deepEqual(findPrivacyIssues('联系电话：+8613800000000'), ['手机号']);
  assert.deepEqual(findPrivacyIssues('合同金额：人民币 120000'), ['敏感业务描述']);
  assert.deepEqual(findPrivacyIssues('项目金额约 20万元'), ['敏感业务描述']);
  assert.deepEqual(findPrivacyIssues('内部截图'), ['敏感业务描述']);
});

test('privacy checks distinguish numerical evidence and non-disclosure notes', () => {
  for (const text of [
    '0.8884411888543778',
    'https://www.sec.gov/Archives/edgar/data/1832483/000183248326000035/serv-20260630.htm',
    'sha256: 37cea336686b80eefafb3f171696484067f80e3e9c9a2f08a5fb68e2c296cfd8',
    '不用来推算客户数量、合同金额或产线收益。',
  ]) assert.deepEqual(findPrivacyIssues(text), []);
});
