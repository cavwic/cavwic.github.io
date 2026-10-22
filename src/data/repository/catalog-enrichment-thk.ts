import data from './catalog-enrichment-thk-data.json';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { deserializeCatalogData } from './catalog-storage.mjs';
const catalog = deserializeCatalogData(data) as CatalogEnrichmentGroup;
export const thkCatalogEnrichment: CatalogEnrichmentGroup = {
  ...catalog,
  reviews: catalog.reviews.map(review => ({
    ...review,
    gaps: review.gaps.map(gap => gap.item === 'not transcribed: readable remaining KR/THK tables' ? {
      ...gap,
      reason: 'KR overhang tables on 14 pages and QZ context figures on 20 pages are reconciled. All 27 identified motor-wrap dimension/configuration tables were transcribed by 2026-09-14. On 2026-10-18, nine KR15/KR20 housing/flange drawings and eight KR20 sensor mounting configurations added 156 conditional callouts; 621 rows with reversed PDF text were visually corrected. Existing numeric-index inputs were preserved. Remaining drawing-only mounting/shaft/coupling callouts and catalog-wide ordering-code reconciliation are still partial. Summary tables were not blindly duplicated, and public scope beyond this KR catalog remains open.',
    } : gap),
  })),
};
