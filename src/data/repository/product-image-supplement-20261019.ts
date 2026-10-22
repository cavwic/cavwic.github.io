import type { Locale } from "../site";
import type { CompanyVisual } from "./company-profile-visuals";
import type { FinderExpansionRecord } from "./product-finder-demo";

type LocalizedText = { zh: string; en: string };
type ImageSupplement = {
  companySlug: string;
  product: string;
  imageUrl: string;
  imageAlt: LocalizedText;
  imageSourceUrl: string;
  imageCredit: string;
  qualifier: LocalizedText;
  width: number;
  height: number;
};

export const productImageSupplements20261019: Readonly<Record<string, ImageSupplement>> = {
  "ready-global-kuka-kmr-iisy-2": {
    companySlug: "kuka",
    product: "KMR iisy-2",
    imageUrl: "/images/repository/kuka/kmr-iisy-family.jpg",
    imageAlt: { zh: "KUKA官方KMR iisy系列产品图，仅代表图示配置", en: "Official KUKA KMR iisy family illustration; depicted configuration only" },
    imageSourceUrl: "https://www.kuka.com/en-us/products/amr-autonomous-mobile-robotics/mobile-robot-systems/kmr-iisy-autonomous-mobile-cobot",
    imageCredit: "KUKA",
    qualifier: {
      zh: "产品图片为KUKA当前KMR iisy系列页面的官方图示，不证明具体代际、11/15 kg机械臂选件、洁净室等级或当前交付配置。规格仍按本页逐项引用的KMR iisy-2资料与配置核对；未对原图生成或修改细节。",
      en: "Official illustration from KUKA's KMR iisy family page, not evidence of a specific generation, 11/15 kg arm option, cleanroom grade or current shipping configuration. Check KMR iisy-2 specifications against their individual sources and conditions; no image details were generated or edited.",
    },
    width: 767,
    height: 431,
  },
  "anybotics-anymal": {
    companySlug: "anybotics",
    product: "ANYmal",
    imageUrl: "/images/repository/anybotics/anymal.webp",
    imageAlt: {
      zh: "ANYbotics 官方 ANYmal 系列正面全身图，仅代表图示配置",
      en: "Official ANYbotics ANYmal family front view; depicted configuration only",
    },
    imageSourceUrl: "https://www.anybotics.com/webinars-on-demand/webinar-product-release-december2022/",
    imageCredit: "ANYbotics",
    qualifier: {
      zh: "产品图片：ANYmal 系列官方全身图，来源为 2022 产品更新材料；仅代表图示外观与配置，不证明全部代际、选配载荷或当前交付配置。图片不是附件、软件或独立巡检载荷的外观图。",
      en: "Product image: official ANYmal family full-body view from 2022 product-update material. It represents the depicted appearance and configuration, not every generation, optional payload or current delivery configuration. It is not an accessory, software or standalone inspection-payload image.",
    },
    width: 560,
    height: 800,
  },
  "anybotics-anymal-x": {
    companySlug: "anybotics",
    product: "ANYmal X",
    imageUrl: "/images/repository/anybotics/anymal-x.png",
    imageAlt: {
      zh: "ANYbotics 官方 ANYmal X 系列全身图，仅代表图示配置",
      en: "Official ANYbotics ANYmal X family full-body view; depicted configuration only",
    },
    imageSourceUrl: "https://www.anybotics.com/webinars-on-demand/webinar-on-demand-aker-bp-cognite-pioneering-offshore-inspections-with-anymal-x/",
    imageCredit: "ANYbotics",
    qualifier: {
      zh: "产品图片：官方 ANYmal X 系列图，限图示外观与配置，不确认具体硬件修订、当前交付外观、全部气体传感选件或认证范围。不得与非 X 的 ANYmal 混用；图中认证标志不替代当前具体配置证书。原图为 688 x 667 像素，未放大生成细节。",
      en: "Product image: official ANYmal X family view, limited to the depicted configuration. It does not establish a hardware revision, current delivery appearance, gas-sensor options or certification scope. Do not substitute it for non-X ANYmal; pictured certification marks do not replace current configuration-specific certificates. The original is 688 x 667 pixels, without generated upscaling.",
    },
    width: 688,
    height: 667,
  },
};

export const anyboticsCompanyVisualPatch = {
  src: productImageSupplements20261019["anybotics-anymal"].imageUrl,
  alt: {
    zh: "ANYbotics 的 ANYmal 系列官方正面全身图；图示配置，不代表全部产品",
    en: "Official front view of ANYbotics' ANYmal family; depicted configuration, not its entire portfolio",
  },
  sourceUrl: productImageSupplements20261019["anybotics-anymal"].imageSourceUrl,
  credit: "ANYbotics",
  qualifier: productImageSupplements20261019["anybotics-anymal"].qualifier,
  objectFit: "contain",
} satisfies CompanyVisual & {
  sourceUrl: string;
  credit: string;
  qualifier: LocalizedText;
  objectFit: "contain";
};

export function enrichProductImageSupplement20261019(
  record: FinderExpansionRecord,
  locale: Locale,
): FinderExpansionRecord {
  const patch = productImageSupplements20261019[record.id];
  const evidence = record.evidence;
  // Exact identities only; retain existing media and never invent missing evidence.
  if (!patch || record.profile.slug !== patch.companySlug || record.product !== patch.product
    || !evidence || evidence.imageUrl?.trim()) return record;

  const qualifier = patch.qualifier[locale];
  const disclosureBoundary = evidence.disclosureBoundary.includes(qualifier)
    ? evidence.disclosureBoundary
    : [evidence.disclosureBoundary, qualifier].filter(Boolean).join("\n\n");
  return {
    ...record,
    evidence: {
      ...evidence,
      imageUrl: patch.imageUrl,
      imageAlt: patch.imageAlt[locale],
      imageSourceUrl: patch.imageSourceUrl,
      imageCredit: patch.imageCredit,
      disclosureBoundary,
    },
  };
}
