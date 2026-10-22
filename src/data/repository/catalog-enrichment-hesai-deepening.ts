import type { CatalogCompanyReview, CatalogEnrichmentGroup, CatalogEnrichmentProduct } from './catalog-enrichment-types';
import type { WaveFourteenCompanySeed } from './verified-catalog-wave-fourteen-common';
import { deserializeCatalogData } from './catalog-storage.mjs';

type Validator<T> = (value: unknown) => value is T;
type Fields<T> = { [K in keyof T]-?: Validator<T[K]> };
const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value);
const string: Validator<string> = (value): value is string => typeof value === 'string';
const boolean: Validator<boolean> = (value): value is boolean => typeof value === 'boolean';
const array = <T>(check: Validator<T>): Validator<T[]> => (value): value is T[] => Array.isArray(value) && value.every(check);
const optional = <T>(check: Validator<T>): Validator<T | undefined> => (value): value is T | undefined => value === undefined || check(value);
const choice = <T extends string>(...values: T[]): Validator<T> => (value): value is T => typeof value === 'string' && values.some(item => item === value);
const shape = <T>(fields: Fields<T>): Validator<T> => (value): value is T => {
  if (!isRecord(value)) return false;
  for (const key in fields) if (!fields[key](value[key])) return false;
  return true;
};
const partialShape = <T>(fields: Fields<T>): Validator<Partial<T>> => (value): value is Partial<T> => {
  if (!isRecord(value)) return false;
  for (const key in fields) if (value[key] !== undefined && !fields[key](value[key])) return false;
  return true;
};
const record = <T>(check: Validator<T>): Validator<Record<string, T>> => (value): value is Record<string, T> => isRecord(value) && Object.values(value).every(check);
const localized = shape<{ zh: string; en: string }>({ zh: string, en: string });
const localizedArray = array(localized);
const company = partialShape<WaveFourteenCompanySeed>({
  legalName: string, country: localized, headquarters: localized, founded: string,
  officialUrl: string, aboutUrl: string, role: localized, positioning: localized,
  strengths: localizedArray, products: array(string), fit: localizedArray, overview: localizedArray,
  businessAreas: localizedArray, customerGroups: localizedArray, catalogScope: localized,
  verificationFocus: localized, presalesQuestions: localizedArray, catalogTitle: localized,
  timeline: array(shape({ date: string, title: localized, detail: localized, sourceUrl: string, kind: choice('founding', 'product', 'funding', 'business') })),
  funding: array(shape({ date: string, round: localized, amount: (value): value is string | { zh: string; en: string } => string(value) || localized(value), investors: localized, sourceUrl: string })),
  investmentView: localizedArray,
});
const product = shape<CatalogEnrichmentProduct>({
  id: string, companySlug: string, product: string, pageUrl: string,
  category: choice('robot-platform', 'end-effector', 'perception', 'motion', 'model-software', 'enterprise-ai'),
  primary: string, subclass: string,
  useCases: array(choice('research', 'manufacturing', 'logistics', 'service', 'integration')),
  type: localized, integration: localized, verification: localized,
  rows: array(shape({ label: localized, value: localized, sourceUrl: string, sourceLabel: localized, locator: localized, conditions: optional(localized), excludeFromNumericIndex: optional(boolean) })),
  overview: localizedArray, applications: localizedArray,
  coverage: choice('official-complete', 'official-partial', 'family-summary', 'capability-only', 'source-blocked'),
  level: optional(choice('model', 'family', 'platform')),
  specificationKind: optional(choice('parameters', 'capabilities')),
  sourceLinks: optional(array(shape({ label: localized, url: string }))),
  image: optional(shape({ url: string, alt: localized, sourceUrl: string, credit: string })),
});
const review = shape<CatalogCompanyReview>({
  slug: string, reviewedAt: string, catalogUrls: array(string), reviewedProductUrls: array(string),
  status: choice('public-catalog-reviewed', 'reviewed-partial', 'source-blocked'), scope: localized,
  gaps: array(shape({ item: string, reason: string, sourceUrl: optional(string) })),
});

// The shared storage validates compression/integrity, not the decoded domain shape.
// Keep this boundary local to the six reviewed deepening payloads.
export function decodeHesaiDeepeningGroup(envelope: unknown): CatalogEnrichmentGroup {
  const value = deserializeCatalogData(envelope);
  if (!isRecord(value)) throw new Error('Invalid deepening catalog: expected group object');
  if (!record(company)(value.profiles)) throw new Error('Invalid deepening catalog: profiles');
  if (!array(product)(value.products)) throw new Error('Invalid deepening catalog: products');
  if (!array(review)(value.reviews)) throw new Error('Invalid deepening catalog: reviews');
  return { profiles: value.profiles, products: value.products, reviews: value.reviews };
}
