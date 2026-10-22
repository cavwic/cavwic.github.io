import data from './catalog-enrichment-harting-data.json';
import { deserializeCatalogData } from './catalog-storage.mjs';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
export const hartingCatalogEnrichment = deserializeCatalogData(data) as CatalogEnrichmentGroup;
