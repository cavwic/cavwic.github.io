import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { decodeHesaiDeepeningGroup } from './catalog-enrichment-hesai-deepening';
import data from './catalog-enrichment-kinco-deepened-data.json';

// Local reviewed payload; source snapshots and resume proof are under review/kinco-deepening.
export const kincoCatalogEnrichment: CatalogEnrichmentGroup = decodeHesaiDeepeningGroup(data);
