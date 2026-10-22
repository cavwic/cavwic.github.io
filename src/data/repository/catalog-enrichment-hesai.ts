import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { decodeHesaiDeepeningGroup } from './catalog-enrichment-hesai-deepening';
import data from './catalog-enrichment-hesai-deepened-data.json';
import { hesaiAbout, hesaiFaq, hesaiListing, hesaiHistory, hesaiHistoryOverview } from './catalog-enrichment-hesai-history';

// Local reviewed payload; source snapshots and resume proof are under review/hesai-deepening.
const base = decodeHesaiDeepeningGroup(data);
const profile = base.profiles.hesai;
export const hesaiCatalogEnrichment: CatalogEnrichmentGroup = {
  ...base,
  profiles: { ...base.profiles, hesai: {
    ...profile,
    founded: '2014',
    headquarters: { zh: '中国上海', en: 'Shanghai, China' },
    overview: [...(profile.overview ?? []), hesaiHistoryOverview],
    timeline: [...(profile.timeline ?? []), ...hesaiHistory],
  } },
  reviews: base.reviews.map(review => ({
    ...review,
    catalogUrls: [...new Set([...review.catalogUrls, hesaiAbout, hesaiFaq, hesaiListing])],
    gaps: [...review.gaps, {
      item: 'Current company portfolio expansion',
      reason: 'Current corporate pages mention Kosmo spatial intelligence and robotic actuation modules. Exact product identities, specifications and release conditions require separate source reconciliation; corporate scope is not a new SKU. Historical chronology is not whole-company financial or catalog closure.',
      sourceUrl: hesaiAbout,
    }],
  })),
};
