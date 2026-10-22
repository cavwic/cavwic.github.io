import type { Locale } from "../site";
import type { CompanyProfile } from "./catalog";
import type { FinderExpansionRecord } from "./product-finder-demo";
import { waveFourteenGroupACompanySeeds, waveFourteenGroupAProductSeeds } from "./verified-catalog-wave-fourteen-a";
import { waveFourteenGroupBCompanySeeds, waveFourteenGroupBProductSeeds } from "./verified-catalog-wave-fourteen-b";
import { waveFourteenGroupCCompanySeeds, waveFourteenGroupCProductSeeds } from "./verified-catalog-wave-fourteen-c";
import {
  applyWaveFourteenCompanyPatch,
  buildWaveFourteenRecords,
  type WaveFourteenCompanySeed,
  type WaveFourteenCompanySlug,
  type WaveFourteenProductSeed,
} from "./verified-catalog-wave-fourteen-common";
import { waveFourteenGroupDCompanySeeds, waveFourteenGroupDProductSeeds } from "./verified-catalog-wave-fourteen-d";

const companySeeds: Partial<Record<WaveFourteenCompanySlug, WaveFourteenCompanySeed>> = {
  ...waveFourteenGroupACompanySeeds,
  ...waveFourteenGroupBCompanySeeds,
  ...waveFourteenGroupCCompanySeeds,
  ...waveFourteenGroupDCompanySeeds,
};

const productSeeds: WaveFourteenProductSeed[] = [
  ...waveFourteenGroupAProductSeeds,
  ...waveFourteenGroupBProductSeeds,
  ...waveFourteenGroupCProductSeeds,
  ...waveFourteenGroupDProductSeeds,
];

export const waveFourteenCompanySlugs = [
  "ubtech",
  "agibot",
  "zsibot",
  "engineai",
  "kepler",
  "aheadform",
  "hexagon-robotics",
  "wandercraft",
  "tesla-optimus",
  "xpeng-robotics",
  "mentee-robotics",
  "engineered-arts",
  "clone-robotics",
  "anybotics",
  "rainbow-robotics",
  "diligent-robotics",
  "collaborative-robotics",
  "kawada-robotics",
  "inspire-robots",
  "dh-robotics",
] as const satisfies readonly WaveFourteenCompanySlug[];

export const isWaveFourteenCompanySlug = (slug: string): slug is WaveFourteenCompanySlug => (
  waveFourteenCompanySlugs.includes(slug as WaveFourteenCompanySlug)
);

export const applyVerifiedWaveFourteenCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => (
  applyWaveFourteenCompanyPatch(company, locale, companySeeds)
);

export const getVerifiedWaveFourteenProductRecords = (
  locale: Locale,
  companies: CompanyProfile[],
): FinderExpansionRecord[] => buildWaveFourteenRecords(locale, companies, companySeeds, productSeeds);

export const verifiedWaveFourteenProductCount = productSeeds.length;
