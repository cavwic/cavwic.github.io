import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { decodeHesaiDeepeningGroup } from './catalog-enrichment-hesai-deepening';
import data from './catalog-enrichment-robosense-deepened-data.json';

// Local reviewed payload; source snapshots and resume proof are under review/robosense-deepening.
export const robosenseCatalogEnrichment: CatalogEnrichmentGroup = decodeHesaiDeepeningGroup(data);
