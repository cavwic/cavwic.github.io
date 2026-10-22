import type { CatalogEnrichmentGroup, CatalogEnrichmentProduct } from './catalog-enrichment-types';
import { decodeHesaiDeepeningGroup } from './catalog-enrichment-hesai-deepening';
import data from './catalog-enrichment-mech-mind-deepened-data.json';
import { mechFunding2021, mechHistory, mechListedOverview, mechFinancialOverview } from './catalog-enrichment-mech-history';
import lnx7000 from './catalog-enrichment-mech-lnx7000-20261018-data.json';
import lnxAccessories from './catalog-enrichment-mech-lnx-accessories-20261018-data.json';

// Local reviewed payload; source snapshots and resume proof are under review/mech-mind-deepening.
const base = decodeHesaiDeepeningGroup(data);
const profile = base.profiles['mech-mind'];
const lnxAdditions = lnxAccessories.additions as Record<string, { rows: CatalogEnrichmentProduct['rows']; sourceLinks: NonNullable<CatalogEnrichmentProduct['sourceLinks']> }>;
export const mechMindCatalogEnrichment: CatalogEnrichmentGroup = {
  ...base,
  products: [...base.products, ...(lnx7000.products as CatalogEnrichmentProduct[]).map(product => {
    const addition = lnxAdditions[product.id];
    return addition ? { ...product, rows: [...product.rows, ...addition.rows], sourceLinks: [...(product.sourceLinks ?? []), ...addition.sourceLinks] } : product;
  }), ...lnxAccessories.products as CatalogEnrichmentProduct[]],
  profiles: {
    ...base.profiles,
    'mech-mind': {
      ...profile,
      overview: [...(profile.overview ?? []), mechListedOverview, mechFinancialOverview],
      timeline: [...(profile.timeline ?? []), ...mechHistory],
      funding: [...(profile.funding ?? []), {
        date: '2021-05-19',
        round: { zh: 'C轮（公告日期）', en: 'Series C (announcement date)' },
        amount: { zh: '本轮金额未在该公告单列；累计融资超过1亿美元', en: 'Round amount not separated in this release; cumulative funding exceeded USD100 million' },
        investors: { zh: '美团领投；红杉中国、源码资本等参与', en: 'Led by Meituan; Sequoia Capital China, Source Code Capital and others participated' },
        sourceUrl: mechFunding2021,
      }],
    },
  },
  reviews: base.reviews.map(review => ({
    ...review,
    catalogUrls: [...new Set([...review.catalogUrls, ...mechHistory.map(event => event.sourceUrl)])],
    gaps: [...review.gaps, {
      item: 'VISION 2026 preview reconciliation',
      reason: 'Range XL-GL and UHP-040-5M-GL exact manuals remain to reconcile. LNX-7000 six-model tables, eight power/I/O cables, eight Ethernet cables and two power/I/O extensions are captured from 2.6.1-pre documents; selected electrical, indicator, mounting and cooling manual fields are added, not proof of production availability. Drawings/circuits and source conflicts remain open: 5m straight-cable tolerance, extension PWR/POWER spelling and side-mount contact-face wording. Third-party power-supply tables are not duplicated as Mech-Mind products. Existing ULTRA M-GL focal variants are not duplicated.',
      sourceUrl: 'https://www.mech-mind.com/news/mech-mind-at-vision-2026.html',
    }],
  })),
};
