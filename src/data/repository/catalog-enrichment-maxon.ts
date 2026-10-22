import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import data from './catalog-enrichment-maxon-data.json';
import { deserializeCatalogData } from './catalog-storage.mjs';

// Exact public order codes and source-bounded configuration tables; see review/maxon/README.md.
export const maxonCatalogEnrichment = ('format' in data ? deserializeCatalogData(data) : data) as CatalogEnrichmentGroup;
