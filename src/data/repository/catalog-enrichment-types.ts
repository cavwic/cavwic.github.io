import type { WaveFourteenCompanySeed, WaveFourteenProductSeed } from './verified-catalog-wave-fourteen-common';

export type CatalogEnrichmentProduct = Omit<WaveFourteenProductSeed, 'companySlug' | 'rows'> & {
  companySlug: string;
  rows: Array<WaveFourteenProductSeed['rows'][number] & { excludeFromNumericIndex?: boolean }>;
  image?: { url: string; alt: { zh: string; en: string }; sourceUrl: string; credit: string };
};

export type CatalogCompanyReview = {
  slug: string;
  reviewedAt: string;
  catalogUrls: string[];
  reviewedProductUrls: string[];
  status: 'public-catalog-reviewed' | 'reviewed-partial' | 'source-blocked';
  scope: { zh: string; en: string };
  gaps: Array<{ item: string; reason: string; sourceUrl?: string }>;
};

export type CatalogEnrichmentGroup = {
  profiles: Record<string, Partial<WaveFourteenCompanySeed>>;
  products: CatalogEnrichmentProduct[];
  reviews: CatalogCompanyReview[];
};
