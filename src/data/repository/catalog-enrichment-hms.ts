import data from './catalog-enrichment-hms-data.json';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { deserializeCatalogData } from './catalog-storage.mjs';
export const hmsCatalogEnrichment = deserializeCatalogData(data) as CatalogEnrichmentGroup;
