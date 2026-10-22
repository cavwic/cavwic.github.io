import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import type { Locale } from '../site';
import { getJeelingRecords } from './jeeling-records';
import { packCatalogPayload } from './catalog-payload';
import {getCompanyComponentRelations} from './supplier-relations';

type Record = ReturnType<typeof getJeelingRecords>[number];
const cache = new Map<Locale, ReturnType<typeof createCatalog>>();
const encoded = new Map<string, { body: string; etag: string }>();
const bucketCount = 256;
const keyFor = (record: Record) => record.profile?.slug || record.company;
export const detailBucket = (id: string) => {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i++) hash = Math.imul(hash ^ id.charCodeAt(i), 16777619);
  return `detail-${(hash >>> 0) % bucketCount}`;
};
const coverage = (record: Record) => {
  const total = record.parameters.length;
  const known = record.parameters.filter(row => row.status !== 'unknown').length;
  return { total, known, level: total && known / total >= .8 ? 'quantified' : known ? 'partial' : 'pending' };
};
const productSummary = (record: Record) => ({
  id: record.id, product: record.product, company: record.company, type: record.type,
  integration: record.integration, officialUrl: record.officialUrl, productPath: record.productPath,
  coverage: coverage(record),
  evidence: record.evidence ? { imageUrl: record.evidence.imageUrl, imageAlt: record.evidence.imageAlt, overview: record.evidence.overview?.slice(0, 1) } : undefined,
});
export function searchRecord(record: Record, numeric = true) {
  const { parameters, profile, evidence, financialDisclosure, ...base } = record;
  return {
    ...base,
    profile: { slug: profile.slug, legalName: profile.legalName, country: profile.country, headquarters: profile.headquarters,
      positioning: profile.positioning, valueChainRole: profile.valueChainRole, products: profile.products, fit: profile.fit },
    evidence: evidence ? { level: evidence.level } : undefined,
    coverage: coverage(record),
    // Search keeps every published label/value; detailed provenance travels only with the selected record.
    searchParameterText: numeric ? parameters.flatMap(row => [row.label, row.value]).join('\n') : '',
    parameters: numeric ? parameters.filter(row => row.normalized?.length).map(({ label, labelAliases, value, status, normalized }) => ({ label, labelAliases, value, status, normalized })) : [],
  };
}
function createCatalog(locale: Locale) {
  const records = getJeelingRecords(locale);
  const companies = new Map<string, Record[]>();
  const details = new Map<string, Record[]>();
  for (const record of records) {
    const company = keyFor(record);
    if (!companies.has(company)) companies.set(company, []);
    companies.get(company)!.push(record);
    const bucket = detailBucket(record.id);
    if (!details.has(bucket)) details.set(bucket, []);
    details.get(bucket)!.push(record);
  }
  const representatives = [...companies.values()].map(items => items.find(item => item.evidence) || items[0]);
  return { records, companies, details, representatives };
}
function catalog(locale: Locale) {
  if (!cache.has(locale)) cache.set(locale, createCatalog(locale));
  return cache.get(locale)!;
}
export function getJeelingParts(locale: Locale) {
  return ['companies', 'products', ...catalog(locale).details.keys(), ...[...catalog(locale).companies.keys()].map(key => `company-${key}`)];
}
export function getJeelingPart(locale: Locale, part: string): unknown {
  const { records, companies, details, representatives } = catalog(locale);
  if (part === 'companies') return {
    records: representatives.map(record => searchRecord(record, false)),
    counts: { companies: companies.size, products: records.length, models: records.filter(record => record.precision || record.evidence?.level === 'model').length },
  };
  if (part === 'products') return { records: records.map(record => searchRecord(record)) };
  if (details.has(part)) return { records: details.get(part) };
  if (part.startsWith('company-')) {
    const items = companies.get(part.slice(8));
    if (!items) return null;
    const representative = items.find(item => item.evidence) || items[0];
    const pool = items.map(item => item.evidence).filter(item => item !== undefined);
    const media = pool.find(item => item.imageUrl && item.companyTimeline?.length) || pool.find(item => item.imageUrl) || pool[0];
    const companyTimeline = [...new Map(pool.flatMap(item => item.companyTimeline || []).map(item => [`${item.date}:${item.title}`, item])).values()].sort((a, b) => a.date.localeCompare(b.date));
    return { record: { ...representative, parameters: [], coverage: coverage(representative),
      componentRelations:getCompanyComponentRelations(part.slice(8),locale),
      companyEvidence: { ...media, companyTimeline, investmentView: [...new Set(pool.flatMap(item => item.investmentView || []))] },
      // Preserve ordering variants with identical marketing names.
      companyProducts: items.map(productSummary),
    } };
  }
  return null;
}
export function getJeelingEncodedPart(locale: Locale, part: string) {
  const key = `${locale}/${part}`;
  if (!encoded.has(key)) {
    const data = getJeelingPart(locale, part);
    if (!data) return null;
    const body = JSON.stringify({ encoding: 'gzip-base64', body: gzipSync(JSON.stringify(packCatalogPayload(data))).toString('base64') });
    encoded.set(key, { body, etag: `"${createHash('sha256').update(body).digest('hex')}"` });
  }
  return encoded.get(key)!;
}
