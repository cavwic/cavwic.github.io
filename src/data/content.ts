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

export function toEntry(entry: LibraryEntry, locale: "zh" | "en" = "zh") {
  return {
    title: entry.data.title,
    description: entry.data.description,
    status: entry.data.publicationStatus,
    date: entry.data.date.toISOString().slice(0, 7).replace("-", "."),
    href: `/library/${entry.id.replace(/\.mdx?$/, "")}`,
    action: locale === "zh" ? "阅读全文" : "Read",
  };
}

export const kindLabels: Record<ContentKind, string> = {
  whitepaper: "白皮书",
  article: "技术文章",
  "case-study": "案例分析",
};

export const industryLabels: Record<IndustryId, string> = {
  ai: "企业 AI",
  robotics: "具身机器人",
  "dexterous-hands": "灵巧手",
  "cross-industry": "跨行业",
};
