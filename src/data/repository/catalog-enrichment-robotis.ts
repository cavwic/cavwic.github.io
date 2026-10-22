import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { decodeHesaiDeepeningGroup } from './catalog-enrichment-hesai-deepening';
import data from './catalog-enrichment-robotis-deepened-data.json';

// Local reviewed payload; source snapshots and resume proof are under review/robotis-deepening.
export const robotisCatalogEnrichment: CatalogEnrichmentGroup = decodeHesaiDeepeningGroup(data);
