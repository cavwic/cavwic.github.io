import type { CollectionEntry } from "astro:content";

export type ContentKind = "whitepaper" | "article" | "case-study";
export type EvidenceType = "真实经历" | "个人实践" | "公开资料研究" | "分析判断";
export type PublicationStatus = "draft" | "published";
export type IndustryId = "ai" | "robotics" | "dexterous-hands" | "cross-industry";

export type SourceRef = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  sourceType: "official" | "standard" | "paper" | "job" | "report" | "law";
  verifiedAt: string;
  note: string;
};

export type LibraryEntry = CollectionEntry<"library">;

export const isReviewBuild = import.meta.env.DEV || import.meta.env.MODE === "review";

export function isVisible(entry: LibraryEntry) {
  return isReviewBuild || entry.data.publicationStatus === "published";
}

export function toEntry(entry: LibraryEntry) {
  const slug = entry.id.replace(/\.mdx?$/, "").replace(/^en\//, "");
  return {
    title: entry.data.title,
    description: entry.data.description,
    status: entry.data.publicationStatus,
    date: entry.data.date.toISOString().slice(0, 7).replace("-", "."),
    href: entry.data.locale === "en" ? `/en/library/${slug}` : `/library/${slug}`,
  };
}

export const kindLabels = {
  zh: { whitepaper: "白皮书", article: "技术文章", "case-study": "案例分析" },
  en: { whitepaper: "White paper", article: "Technical article", "case-study": "Case study" },
} satisfies Record<"zh" | "en", Record<ContentKind, string>>;

export const industryLabels = {
  zh: { ai: "企业 AI", robotics: "具身机器人", "dexterous-hands": "灵巧手", "cross-industry": "跨行业" },
  en: { ai: "Enterprise AI", robotics: "Embodied robotics", "dexterous-hands": "Dexterous hands", "cross-industry": "Cross-industry" },
} satisfies Record<"zh" | "en", Record<IndustryId, string>>;

export const evidenceLabels = {
  zh: {
    "真实经历": "真实经历",
    "个人实践": "个人实践",
    "公开资料研究": "公开资料研究",
    "分析判断": "分析判断",
  },
  en: {
    "真实经历": "Professional experience",
    "个人实践": "Personal practice",
    "公开资料研究": "Public-source research",
    "分析判断": "Analysis",
  },
} satisfies Record<"zh" | "en", Record<EvidenceType, string>>;
