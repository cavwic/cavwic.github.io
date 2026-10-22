import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { decodeHesaiDeepeningGroup } from './catalog-enrichment-hesai-deepening';
import data from './catalog-enrichment-leaderdrive-deepened-data.json';
import { leaderdriveProfileAppend } from './catalog-enrichment-leaderdrive-profile-20261018';

// Local reviewed payload; source snapshots and resume proof are under review/leaderdrive-deepening.
export const leaderdriveCatalogEnrichment: CatalogEnrichmentGroup = decodeHesaiDeepeningGroup(data);
const leaderdriveProfile = leaderdriveCatalogEnrichment.profiles.leaderdrive;
leaderdriveCatalogEnrichment.profiles.leaderdrive = {
  ...leaderdriveProfile,
  founded: leaderdriveProfileAppend.founded,
  overview: [...(leaderdriveProfile.overview || []), ...(leaderdriveProfileAppend.overview || [])],
  timeline: [...(leaderdriveProfile.timeline || []), ...(leaderdriveProfileAppend.timeline || [])],
};
