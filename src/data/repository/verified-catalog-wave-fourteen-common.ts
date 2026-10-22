import type { Locale } from "../site";
import type { CompanyProfile } from "./catalog";
import type {
  FinderCategory,
  FinderExpansionRecord,
  FinderParameter,
  FinderSpecificationCoverage,
  FinderUseCase,
} from "./product-finder-demo";
import { withParameterIndex } from "./parameter-index";

export type Localized = { zh: string; en: string };

export type WaveFourteenCompanySlug =
  | "ubtech"
  | "agibot"
  | "zsibot"
  | "engineai"
  | "kepler"
  | "aheadform"
  | "hexagon-robotics"
  | "wandercraft"
  | "tesla-optimus"
  | "xpeng-robotics"
  | "mentee-robotics"
  | "engineered-arts"
  | "clone-robotics"
  | "anybotics"
  | "rainbow-robotics"
  | "diligent-robotics"
  | "collaborative-robotics"
  | "kawada-robotics"
  | "inspire-robots"
  | "dh-robotics";

export type SpecRow = {
  label: Localized;
  value: Localized;
  sourceUrl: string;
  sourceLabel: Localized;
  locator: Localized;
  conditions?: Localized;
};

export type WaveFourteenProductSeed = {
  id: string;
  companySlug: WaveFourteenCompanySlug;
  product: string;
  pageUrl: string;
  category: FinderCategory;
  primary: string;
  subclass: string;
  useCases: FinderUseCase[];
  type: Localized;
  integration: Localized;
  verification: Localized;
  rows: SpecRow[];
  overview: Localized[];
  applications: Localized[];
  coverage: FinderSpecificationCoverage;
  level?: "model" | "family" | "platform";
  specificationKind?: "parameters" | "capabilities";
  sourceLinks?: Array<{ label: Localized; url: string }>;
};

export type TimelineSeed = {
  date: string;
  title: Localized;
  detail: Localized;
  sourceUrl: string;
  kind: "founding" | "product" | "funding" | "business";
};

export type FundingSeed = {
  date: string;
  round: Localized;
  amount: string | Localized;
  investors: Localized;
  sourceUrl: string;
};

export type WaveFourteenCompanySeed = {
  legalName: string;
  country: Localized;
  headquarters: Localized;
  founded: string;
  officialUrl: string;
  aboutUrl: string;
  role: Localized;
  positioning: Localized;
  strengths: Localized[];
  products: string[];
  fit: Localized[];
  overview: Localized[];
  businessAreas: Localized[];
  customerGroups: Localized[];
  catalogScope: Localized;
  verificationFocus: Localized;
  presalesQuestions: Localized[];
  catalogTitle: Localized;
  timeline: TimelineSeed[];
  funding: FundingSeed[];
  investmentView: Localized[];
};

export const l = (zh: string, en: string): Localized => ({ zh, en });
export const t = (locale: Locale, value: Localized) => value[locale];

export const row = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  labelZh: string,
  labelEn: string,
  valueZh: string,
  valueEn = valueZh,
  conditions?: Localized,
): SpecRow => ({ sourceUrl, sourceLabel, locator, label: l(labelZh, labelEn), value: l(valueZh, valueEn), conditions });

export const rows = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  values: Array<[string, string, string, string?]>,
): SpecRow[] => values.map(([labelZh, labelEn, valueZh, valueEn]) => (
  row(sourceUrl, sourceLabel, locator, labelZh, labelEn, valueZh, valueEn ?? valueZh)
));

export const capabilityProduct = (
  id: string,
  companySlug: WaveFourteenCompanySlug,
  product: string,
  pageUrl: string,
  category: FinderCategory,
  primary: string,
  subclass: string,
  type: Localized,
  overview: Localized[],
  applications: Localized[],
  integration: Localized,
  verification: Localized,
  useCases: FinderUseCase[] = ["research", "integration"],
  sourceRows: SpecRow[] = [],
): WaveFourteenProductSeed => ({
  id,
  companySlug,
  product,
  pageUrl,
  category,
  primary,
  subclass,
  type,
  overview,
  applications,
  integration,
  verification,
  useCases,
  rows: sourceRows,
  coverage: sourceRows.length ? "official-partial" : "capability-only",
  level: "model",
  specificationKind: sourceRows.length ? "parameters" : "capabilities",
});

const finderProfile = (company: CompanyProfile): FinderExpansionRecord["profile"] => ({
  slug: company.slug,
  valueChainRole: company.valueChainRole ?? "",
  positioning: company.positioning,
  strengths: company.strengths ?? [],
  products: company.products,
  fit: company.fit ?? [],
  questions: company.presalesQuestions,
  sourceIds: company.sourceIds,
  reviewedAt: company.reviewedAt,
  legalName: company.legalName,
  country: company.country,
  headquarters: company.headquarters,
  founded: company.founded,
  officialUrl: company.officialUrl,
  overview: company.overview,
  businessAreas: company.businessAreas,
  customerGroups: company.customerGroups,
  milestones: company.milestones,
  catalogScope: company.catalogScope,
  catalogCoverage: company.catalogCoverage,
});

export const applyWaveFourteenCompanyPatch = <Slug extends string>(
  company: CompanyProfile,
  locale: Locale,
  companySeeds: Partial<Record<Slug, WaveFourteenCompanySeed>>,
): CompanyProfile => {
  const seed = companySeeds[company.slug as Slug];
  if (!seed) return company;
  return {
    ...company,
    legalName: seed.legalName,
    country: t(locale, seed.country),
    headquarters: t(locale, seed.headquarters),
    founded: seed.founded,
    officialUrl: seed.officialUrl,
    valueChainRole: t(locale, seed.role),
    positioning: t(locale, seed.positioning),
    strengths: seed.strengths.map((item) => t(locale, item)),
    products: seed.products,
    fit: seed.fit.map((item) => t(locale, item)),
    overview: seed.overview.map((item) => t(locale, item)),
    businessAreas: seed.businessAreas.map((item) => t(locale, item)),
    customerGroups: seed.customerGroups.map((item) => t(locale, item)),
    milestones: seed.timeline.map((item) => ({ date: item.date, event: t(locale, item.detail) })),
    catalogScope: t(locale, seed.catalogScope),
    catalogCoverage: "model-partial",
    verificationFocus: t(locale, seed.verificationFocus),
    presalesQuestions: seed.presalesQuestions.map((item) => t(locale, item)),
    reviewedAt: "2026-09-04",
  };
};

const toRecord = (
  locale: Locale,
  company: CompanyProfile,
  seed: Omit<WaveFourteenProductSeed, "companySlug"> & { companySlug: string },
  companySeed: WaveFourteenCompanySeed,
): FinderExpansionRecord => ({
  id: seed.id,
  matrixSlug: "",
  matrixTitle: t(locale, companySeed.catalogTitle),
  industry: company.industry,
  reviewedAt: "2026-09-04",
  product: seed.product,
  company: company.name,
  type: t(locale, seed.type),
  openness: locale === "zh" ? "厂商官方目录、产品页、手册或工程资料公开" : "Official catalog, product page, manual, or engineering material is public",
  integration: t(locale, seed.integration),
  verificationFocus: t(locale, seed.verification),
  sourceIds: company.sourceIds,
  officialUrl: seed.pageUrl,
  category: seed.category,
  useCases: seed.useCases,
  opennessLevel: "documented",
  parameters: withParameterIndex(seed.rows.map((item): FinderParameter => ({
    label: t(locale, item.label),
    value: t(locale, item.value),
    status: "manufacturer",
    sourceUrl: item.sourceUrl,
    sourceLabel: t(locale, item.sourceLabel),
    sourceLocator: t(locale, item.locator),
    conditions: item.conditions ? t(locale, item.conditions) : undefined,
  })), seed.pageUrl, locale === "zh" ? "厂商官方产品资料" : "Official manufacturer product material"),
  catalogPrimary: seed.primary,
  catalogSubclass: seed.subclass,
  catalogCoverage: "model-partial",
  catalogScope: locale === "zh"
    ? "当前公开型号逐项建档；代际、配置、选件和能力型资料不跨记录合并。"
    : "Current public models are recorded separately; generations, editions, options, and capability-only material are not merged across records.",
  profile: finderProfile(company),
  evidence: {
    level: seed.level ?? "model",
    specificationKind: seed.specificationKind ?? (seed.rows.length ? "parameters" : "capabilities"),
    specificationCoverage: seed.coverage,
    specificationCoverageNote: locale === "zh"
      ? seed.coverage === "official-complete"
        ? "已逐项转录当前引用官方规格区块中的全部可读字段；后续修订仍以来源页为准。"
        : seed.coverage === "capability-only"
          ? "官网当前只提供产品能力与用途说明，没有可逐字段转录的完整规格表。"
          : seed.coverage === "family-summary"
            ? "当前记录为系列范围，不能替代系列内具体型号数据表。"
            : "已收录当前官方页面中可明确归属的公开字段；未披露值不作推断。"
      : seed.coverage === "official-complete"
        ? "Every readable field in the currently cited official specification block has been transcribed; later revisions remain governed by the source page."
        : seed.coverage === "capability-only"
          ? "The current official page describes capabilities and applications without a complete field-by-field specification table."
          : seed.coverage === "family-summary"
            ? "This is a family-scope record and does not replace model-level datasheets."
            : "Public fields unambiguously attributable on the current official page are included; undisclosed values are not inferred.",
    overview: seed.overview.map((item) => t(locale, item)),
    applications: seed.applications.map((item) => t(locale, item)),
    disclosureBoundary: locale === "zh"
      ? "厂商值按来源与条件记录；峰值、挑战值、目标、选件、演示和连续额定工况不能互换。"
      : "Manufacturer values are recorded with source conditions; peaks, challenge values, targets, options, demonstrations, and continuous ratings are not interchangeable.",
    sourceLinks: [...new Map([
      { label: locale === "zh" ? `${seed.product} 官方资料` : `${seed.product} official material`, url: seed.pageUrl },
      ...(seed.sourceLinks ?? []).map((item) => ({ label: t(locale, item.label), url: item.url })),
      { label: locale === "zh" ? "公司官方介绍" : "Official company profile", url: companySeed.aboutUrl },
    ].map((item) => [item.url, item])).values()],
    companyTimeline: companySeed.timeline.map((item) => ({
      date: item.date,
      title: t(locale, item.title),
      detail: t(locale, item.detail),
      sourceUrl: item.sourceUrl,
      kind: item.kind,
    })),
    fundingRounds: companySeed.funding.map((item) => ({
      date: item.date,
      round: t(locale, item.round),
      amount: typeof item.amount === "string" ? item.amount : t(locale, item.amount),
      investors: t(locale, item.investors),
      sourceUrl: item.sourceUrl,
    })),
    investmentView: companySeed.investmentView.map((item) => t(locale, item)),
  },
});

export const buildWaveFourteenRecords = <Slug extends string>(
  locale: Locale,
  companies: CompanyProfile[],
  companySeeds: Partial<Record<Slug, WaveFourteenCompanySeed>>,
  productSeeds: Array<Omit<WaveFourteenProductSeed, "companySlug"> & { companySlug: Slug }>,
): FinderExpansionRecord[] => {
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  return productSeeds.map((seed) => {
    const company = companyBySlug.get(seed.companySlug);
    const companySeed = companySeeds[seed.companySlug];
    if (!company || !companySeed) throw new Error(`Wave-fourteen product company is missing: ${seed.companySlug}`);
    return toRecord(locale, company, seed, companySeed);
  });
};
