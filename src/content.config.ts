import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const contentKinds = ["whitepaper", "article", "case-study"] as const;
const evidenceTypes = ["真实经历", "个人实践", "公开资料研究", "分析判断"] as const;
const publicationStatuses = ["draft", "published"] as const;
const industryIds = ["ai", "robotics", "dexterous-hands", "cross-industry"] as const;

const library = defineCollection({
  loader: glob({ base: "./src/content/library", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().min(4),
    description: z.string().min(20),
    locale: z.enum(["zh", "en"]),
    kind: z.enum(contentKinds),
    industry: z.enum(industryIds),
    evidence: z.array(z.enum(evidenceTypes)).min(1),
    publicationStatus: z.enum(publicationStatuses),
    date: z.coerce.date(),
    reviewedAt: z.coerce.date(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).min(1),
    sourceIds: z.array(z.string()).default([]),
    alternatePath: z.string().optional(),
  }),
});

export const collections = { library };
