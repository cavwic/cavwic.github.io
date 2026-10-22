import data from './catalog-enrichment-nidec-data.json';
import { nidecProfileAppend } from './catalog-enrichment-nidec-profile-20261018';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { deserializeCatalogData } from './catalog-storage.mjs';
export const nidecCatalogEnrichment = ('format' in data ? deserializeCatalogData(data) : data) as CatalogEnrichmentGroup;
const profile = nidecCatalogEnrichment.profiles['nidec-drive'];
nidecCatalogEnrichment.profiles['nidec-drive'] = {
  ...profile,
  founded: nidecProfileAppend.founded,
  overview: [...(profile.overview ?? []), ...(nidecProfileAppend.overview ?? [])],
  timeline: [...(profile.timeline ?? []), ...(nidecProfileAppend.timeline ?? [])],
};
