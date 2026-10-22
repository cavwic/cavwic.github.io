import data from './catalog-enrichment-boyd-data.json';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { deserializeCatalogData } from './catalog-storage.mjs';
export const boydCatalogEnrichment = ('format' in data ? deserializeCatalogData(data) : data) as CatalogEnrichmentGroup;
