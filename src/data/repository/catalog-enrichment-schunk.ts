import data from './catalog-enrichment-schunk-data.json';
import { deserializeCatalogData } from './catalog-storage.mjs';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';

export const schunkCatalogEnrichment = deserializeCatalogData(data) as CatalogEnrichmentGroup;
