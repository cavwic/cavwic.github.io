import type { Locale } from '../site';
import type { CompanyProfile } from './catalog';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { applyWaveFourteenCompanyPatch, buildWaveFourteenRecords, l, type WaveFourteenCompanySeed } from './verified-catalog-wave-fourteen-common';
import { normalizeFinderParameter } from './parameter-index';

function companySeed(company: CompanyProfile, group: CatalogEnrichmentGroup): WaveFourteenCompanySeed {
  const text = (value?: string) => l(value || '', value || '');
  const list = (values?: string[]) => (values || []).map(text);
  const patch = group.profiles[company.slug] || {};
  return {
    legalName: company.legalName || company.name,
    country: text(company.country), headquarters: text(company.headquarters), founded: company.founded || '',
    officialUrl: company.officialUrl || '', aboutUrl: company.officialUrl || '',
    role: text(company.valueChainRole), positioning: text(company.positioning),
    strengths: list(company.strengths), fit: list(company.fit),
    overview: list(company.overview), businessAreas: list(company.businessAreas), customerGroups: list(company.customerGroups),
    catalogScope: text(company.catalogScope), verificationFocus: text(company.verificationFocus),
    presalesQuestions: list(company.presalesQuestions), catalogTitle: l('官方产品资料', 'Official product material'),
    timeline: [], funding: [], investmentView: [],
    ...patch,
    products: patch.products || company.products,
  };
}

export function applyCatalogEnrichmentCompany(company: CompanyProfile, locale: Locale, group: CatalogEnrichmentGroup): CompanyProfile {
  if (!group.profiles[company.slug]) return company;
  const seed = companySeed(company, group);
  const patched = applyWaveFourteenCompanyPatch(company, locale, { [company.slug]: seed });
  return {
    ...patched,
    milestones: [...new Map([...(company.milestones || []), ...(patched.milestones || [])].map(event => [`${event.date}:${event.event}`, event])).values()].sort((a, b) => a.date.localeCompare(b.date)),
    reviewedAt: '2026-09-06',
  };
}

export function buildCatalogEnrichmentProducts(locale: Locale, companies: CompanyProfile[], group: CatalogEnrichmentGroup) {
  const seeds = Object.fromEntries(companies.filter(company => group.profiles[company.slug]).map(company => [company.slug, companySeed(company, group)]));
  const sourceById = new Map(group.products.map(product => [product.id, product]));
  if (sourceById.size !== group.products.length) throw new Error('Duplicate catalog-enrichment product ID');
  return buildWaveFourteenRecords(locale, companies, seeds, group.products).map(record => {
    const product = sourceById.get(record.id)!;
    return {
      ...record,
      reviewedAt: '2026-09-06',
      parameters: record.parameters.map((field, index) => {
        const source = product.rows[index];
        if (/^(?:not (?:published|disclosed|specified|stated)|TBD|coming soon|pending|(?:on request|upon request|not available|not applicable|n\/a)\s*$|[-—]+$)/i.test(source.value.en.trim())) {
          return { ...field, status: 'unknown' as const, normalized: [] };
        }
        if (source.excludeFromNumericIndex || /overload|absolute maximum|dielectric|withstand voltage|conflicting sources|source discrepancy|insulation voltage|insulation resistance/i.test(source.label.en)) {
          return { ...field, normalized: [] };
        }
        const value = source.value.en.replace(/(\d)\s*[-–~～]\s*(?=\d)/g, '$1 to ');
        return { ...field, labelAliases: [source.label.zh, source.label.en], normalized: normalizeFinderParameter({ ...field, label: source.label.en, value }).map(metric => ({ ...metric, sourceLabel: field.label })) };
      }),
      evidence: {
        ...record.evidence!,
        ...(product.image ? { imageUrl: product.image.url, imageAlt: product.image.alt[locale], imageSourceUrl: product.image.sourceUrl, imageCredit: product.image.credit } : {}),
      },
    };
  });
}
