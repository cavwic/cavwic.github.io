import type { Locale } from '../site';
import type { FinderExpansionRecord } from './product-finder-demo';
import { applyReadyIndustrialProduct } from './ready-work-20261019-Industrial';
import { applyReadyCnArmsProduct } from './ready-work-20261019-CnArms';
import { applyReadyGlobalProduct } from './ready-work-20261019-Global';
import { applyReadyGripAProduct } from './ready-work-20261019-GripA';
import { applyReadyGripBProduct } from './ready-work-20261019-GripB';
import { applyReadySensingProduct } from './ready-work-20261019-Sensing';
import { applyReadyIndustrial2Product } from './ready-work-20261019-Industrial2';
import { applyReadyVerifiedCorrections } from './ready-work-20261019-corrections';
import { applyReadyCnArms2Product } from './ready-work-20261019-CnArms2';

const enrichers = [applyReadyVerifiedCorrections, applyReadyIndustrialProduct, applyReadyIndustrial2Product, applyReadyCnArmsProduct, applyReadyCnArms2Product, applyReadyGlobalProduct, applyReadyGripAProduct, applyReadyGripBProduct, applyReadySensingProduct];
export const applyReadySourceWork = (record: FinderExpansionRecord, locale: Locale) => enrichers.reduce((value, apply) => apply(value, locale), record);
