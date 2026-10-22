import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import data from './catalog-enrichment-parallel-globalRobotics-data.json';

// The adjacent reproducible importer retains model identity, source revisions and exclusions.
export const globalRoboticsCatalogEnrichment: CatalogEnrichmentGroup = data as CatalogEnrichmentGroup;
