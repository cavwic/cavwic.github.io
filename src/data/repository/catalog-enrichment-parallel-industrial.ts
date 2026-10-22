import data from './catalog-enrichment-parallel-industrial-data.json';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { pulsHistory } from './catalog-enrichment-puls-history';
import { mergeFinancialDisclosure } from './financial-disclosures-enrichment';
import pulsDimension from './catalog-enrichment-puls-dimension-20261018-data.json';
import pulsRemaining from './catalog-enrichment-puls-remaining-20261018-data.json';
import sumitomoB from './catalog-enrichment-sumitomo-b-series-20261018-data.json';
import pulsPisa from './catalog-enrichment-puls-pisa-20261018-data.json';
import pulsPisaMore from './catalog-enrichment-puls-pisa-more-20261018-data.json';
import pulsPisaControls from './catalog-enrichment-puls-pisa-b-controls-20261018-data.json';
import pulsPisa11Remainder from './catalog-enrichment-puls-pisa11-remainder-20261018-data.json';
import pulsPisaMGuides from './catalog-enrichment-puls-pisa-m-guides-20261018-data.json';
import { sumitomoProfileAppend } from './catalog-enrichment-sumitomo-profile-20261018';

const extension = {
  products: [...pulsDimension.products, ...pulsRemaining.products, ...sumitomoB.products, ...pulsPisa.products, ...pulsPisaMore.products],
} as Pick<CatalogEnrichmentGroup, 'products'>;
const dimensionReview = pulsDimension.reviews[0];
const remainingReview = pulsRemaining.reviews[0];
const sumitomoBReview = sumitomoB.reviews[0];
const pisaReview = pulsPisa.reviews[0];
const pisaMoreReview = pulsPisaMore.reviews[0];
const pisaAdditions = pulsPisa.additions as Record<string, { rows: CatalogEnrichmentGroup['products'][number]['rows'] }>;
const pisaControlAdditions = pulsPisaControls.additions as Record<string, { rows: CatalogEnrichmentGroup['products'][number]['rows']; verification: CatalogEnrichmentGroup['products'][number]['verification'] }>;
const pisa11Additions = pulsPisa11Remainder.additions as typeof pisaControlAdditions;
const pisaMGuideAdditions = pulsPisaMGuides.additions as typeof pisaControlAdditions;
const catalog: CatalogEnrichmentGroup = {
  ...data as CatalogEnrichmentGroup,
  profiles: {...data.profiles} as CatalogEnrichmentGroup['profiles'],
  products: [...data.products as CatalogEnrichmentGroup['products'], ...extension.products].map(product => {
    const additions = [...(pisaAdditions[product.id]?.rows ?? []), ...(pisaControlAdditions[product.id]?.rows ?? []), ...(pisa11Additions[product.id]?.rows ?? []), ...(pisaMGuideAdditions[product.id]?.rows ?? [])];
    const verification = pisaMGuideAdditions[product.id]?.verification ?? pisa11Additions[product.id]?.verification ?? pisaControlAdditions[product.id]?.verification;
    return additions.length ? {...product, rows:[...product.rows, ...additions], ...(verification ? {verification} : {})} : product;
  }),
  reviews: (data.reviews as CatalogEnrichmentGroup['reviews']).map(review => review.slug === 'puls' ? {
    ...review,
    reviewedAt: dimensionReview.reviewedAt,
    catalogUrls: [...new Set([...review.catalogUrls, ...dimensionReview.catalogUrls, ...remainingReview.catalogUrls, ...pisaReview.catalogUrls, ...pisaMoreReview.catalogUrls])],
    reviewedProductUrls: [...new Set([...review.reviewedProductUrls, ...dimensionReview.reviewedProductUrls, ...remainingReview.reviewedProductUrls, ...pisaReview.reviewedProductUrls, ...pisaMoreReview.reviewedProductUrls])],
    scope: {zh: review.scope.zh + ' ' + dimensionReview.scope.zh + ' ' + remainingReview.scope.zh + ' ' + pisaReview.scope.zh + ' ' + pisaMoreReview.scope.zh + ' ' + pulsPisaControls.scope.zh + ' ' + pulsPisa11Remainder.scope.zh + ' ' + pulsPisaMGuides.scope.zh, en: review.scope.en + ' ' + dimensionReview.scope.en + ' ' + remainingReview.scope.en + ' ' + pisaReview.scope.en + ' ' + pisaMoreReview.scope.en + ' ' + pulsPisaControls.scope.en + ' ' + pulsPisa11Remainder.scope.en + ' ' + pulsPisaMGuides.scope.en},
    gaps: [...review.gaps.filter(gap => gap.item !== '[not transcribed] 其他供电系列'), ...dimensionReview.gaps.filter(gap => gap.item !== 'Remaining power catalog scope'), ...remainingReview.gaps.filter(gap => gap.item !== 'Remaining PULS public product scope'), ...pisaReview.gaps.filter(gap => gap.item !== 'PISA remaining family catalog'), ...pisaMoreReview.gaps.filter(gap => gap.item !== 'PISA-B/PISA11 remaining source sections'), ...pulsPisaControls.gaps.filter(gap => gap.item !== 'PISA remaining independent sources'), ...pulsPisa11Remainder.gaps.filter(gap => gap.item !== 'PISA independent documents and catalog scope'), ...pulsPisaMGuides.gaps],
  } : review.slug === 'sumitomo-drive' ? {
    ...review,
    reviewedAt: sumitomoBReview.reviewedAt,
    catalogUrls: [...new Set([...review.catalogUrls, ...sumitomoBReview.catalogUrls])],
    reviewedProductUrls: [...new Set([...review.reviewedProductUrls, ...sumitomoBReview.reviewedProductUrls])],
    scope: {zh: review.scope.zh + ' ' + sumitomoBReview.scope.zh, en: review.scope.en + ' ' + sumitomoBReview.scope.en},
    gaps: [...review.gaps, ...sumitomoBReview.gaps],
  } : review),
};
const misumiReports = mergeFinancialDisclosure('misumi', 'en')?.reports ?? [];
const financialHandoffIntegrated = [
  'https://www.misumi.co.jp/sites/default/files/2026-04/en_fr_25_4Q.pdf',
  'https://www.misumi.co.jp/sites/default/files/2026-07/en_fr_26_1Q.pdf',
].every(url => misumiReports.some(report => report.url === url));

export const industrialCatalogEnrichment: CatalogEnrichmentGroup = {
  ...catalog,
  reviews: catalog.reviews.map(review => review.slug === 'misumi' && financialHandoffIntegrated ? {
    ...review,
    gaps: review.gaps.filter(gap => gap.item !== '[verification pending] Financial handoff / 财报移交'),
  } : review),
};
const puls = industrialCatalogEnrichment.profiles.puls;
industrialCatalogEnrichment.profiles.puls = {...puls, timeline: [...pulsHistory, ...(puls.timeline ?? [])]};
const sumitomo = industrialCatalogEnrichment.profiles['sumitomo-drive'];
industrialCatalogEnrichment.profiles['sumitomo-drive'] = {
  ...sumitomo,
  overview: [...(sumitomo.overview ?? []), ...(sumitomoProfileAppend.overview ?? [])],
  timeline: [...(sumitomo.timeline ?? []), ...(sumitomoProfileAppend.timeline ?? [])],
  businessAreas: [...(sumitomo.businessAreas ?? []), ...(sumitomoProfileAppend.businessAreas ?? [])],
  customerGroups: [...(sumitomo.customerGroups ?? []), ...(sumitomoProfileAppend.customerGroups ?? [])],
};
