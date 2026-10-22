import type { FinderExpansionRecord } from './product-finder-demo';
import type { Locale } from '../site';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';

export const readyGripA2SourceState = {
  originalGroupId: 'work-b3adb098962524',
  companySlug: 'dh-robotics',
  status: 'source-limited',
  originalMemberIds: ['gap-8d4ca1964333d452', 'gap-90d0f4eaa07c670b'],
  candidateProductIds: [
    'dh-robotics-gripping-rgd-5-14-a2b6a9',
    'dh-robotics-gripping-rgd-35-14-a7c93c',
    'dh-robotics-gripping-rgd-35-30-e1e069',
  ],
  pendingManualUrl: 'https://en.dh-robotics.com/wp-content/uploads/2026/03/RGD-seriesShort-Manual_v2.1.pdf',
  receiptPath: 'review/ready-work-2026-10-19/GripA2/receipt.json',
} as const;

export const readyGripA2ProductPatches: Readonly<Record<string, never>> = {};

// The revision-matched manual body was inaccessible; no old-PDF values are promoted.
export function applyReadyGripA2Product(record: FinderExpansionRecord, _locale: Locale): FinderExpansionRecord {
  return record;
}

export const readyGripA2Profiles: CatalogEnrichmentGroup = {
  profiles: {},
  products: [],
  reviews: [],
};
