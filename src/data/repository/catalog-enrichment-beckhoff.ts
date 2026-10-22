import data from './catalog-enrichment-beckhoff-data.json';
import portfolioData from './catalog-enrichment-beckhoff-portfolio-data.json';
import { deserializeCatalogData } from './catalog-storage.mjs';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { beckhoffHistory, beckhoffHistoryUrl, beckhoffResultsUrl } from './catalog-enrichment-beckhoff-history';
const base = data as CatalogEnrichmentGroup;
const portfolio = deserializeCatalogData(portfolioData) as CatalogEnrichmentGroup;
export const beckhoffCatalogEnrichment: CatalogEnrichmentGroup = {
  profiles: { beckhoff: { ...base.profiles.beckhoff, ...portfolio.profiles.beckhoff, ...beckhoffHistory } },
  products: [...base.products, ...portfolio.products],
  reviews: portfolio.reviews.map(review => ({
    ...review,
    reviewedAt: '2026-09-08',
    catalogUrls: [...new Set([...base.reviews[0].catalogUrls, ...review.catalogUrls, beckhoffHistoryUrl, beckhoffResultsUrl])],
    reviewedProductUrls: [...new Set([...base.reviews[0].reviewedProductUrls, ...review.reviewedProductUrls])],
  })),
};
