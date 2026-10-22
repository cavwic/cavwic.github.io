import type { TimelineSeed } from './verified-catalog-wave-fourteen-common';
const l = (zh: string, en: string) => ({ zh, en });
export const hesaiAbout = 'https://www.hesaitech.com/about-us/';
export const hesaiFaq = 'https://investor.hesaitech.com/resources/investor-faqs';
export const hesaiListing = 'https://www.hesaitech.com/hesai-successfully-listed-on-the-main-board-of-the-hong-kong-stock-exchange/';
export const hesaiInvestorClassification = { stage: 'listed', scale: 'undisclosed' };
export const hesaiHistory: TimelineSeed[] = [
  { date: '2014', kind: 'founding', title: l('三位联合创始人创立公司', 'Company founded by three co-founders'), detail: l('官网年表将公司创立列于2014年；此处保留年份，不补造具体日期或法人登记时间。', 'The official chronology places founding in 2014. No exact day or legal-incorporation date is inferred.'), sourceUrl: hesaiAbout },
  { date: '2016', kind: 'product', title: l('展示Pandar32激光雷达', 'Demonstrated Pandar32 lidar'), detail: l('官网年表记录首款激光雷达的展示，不据此推定同年量产、交付数量或当前仍在销售。', 'The company chronology records a lidar demonstration, not proof of same-year production, shipment volume or current availability.'), sourceUrl: hesaiAbout },
  { date: '2021', kind: 'funding', title: l('官网记录D轮融资', 'Series D in the company chronology'), detail: l('年表列出D轮融资3.74亿美元及小米、高瓴、美团、CPE等投资者。保留年度口径，不推定为单次交割金额、当前现金或估值。', 'The chronology reports USD374 million of Series D funding and investors including Xiaomi, Hillhouse, Meituan and CPE. This annual account does not establish a single-closing amount, current cash or valuation.'), sourceUrl: hesaiAbout },
  { date: '2023-02-09', kind: 'business', title: l('美国存托股份于纳斯达克上市', 'ADSs listed on Nasdaq'), detail: l('投资者FAQ列明美国存托股份于该日开始在纳斯达克全球精选市场交易，代码HSAI。上市不是某款雷达收入或技术性能的证明。', 'The investor FAQ dates trading of its ADSs on the Nasdaq Global Select Market under HSAI. Listing does not establish revenue or technical performance for an individual lidar.'), sourceUrl: hesaiFaq },
  { date: '2024', kind: 'product', title: l('年表记录ATX与OT128发布', 'Chronology records ATX and OT128 launches'), detail: l('官网将ATX和OT128发布列于2024年。型号参数仍以对应版本规格书为准，不把发布年份视为所有客户的交付时间。', 'The company assigns ATX and OT128 launches to 2024. Specifications remain version-specific; a launch year is not every customer delivery date.'), sourceUrl: hesaiAbout },
  { date: '2025-09-16', kind: 'business', title: l('香港联交所主板双重主要上市', 'Dual-primary listing on the HKEX Main Board'), detail: l('官网公告与投资者FAQ均列明该日完成香港主板上市，代码2525。公告融资额采用超额配售权行使前口径，不能与当前市值或可用现金混同。', 'The announcement and investor FAQ both date the HKEX Main Board listing under 2525 to this day. The announcement uses a pre-greenshoe fundraising basis, not current market value or available cash.'), sourceUrl: hesaiListing },
];
export const hesaiHistoryOverview = l(
  '公司官网将创立列于2014年，早期从激光检测业务转向激光雷达，并在后续年表记录Pandar、AT、XT、QT等产品推进。投资者FAQ确认美国存托股份于2023年2月9日在纳斯达克上市，2025年9月16日在香港联交所完成双重主要上市。判断：产品发布、证券融资与实际经营现金流应分别核对，不能用融资阶段替代单款产品的商业验证。',
  'The company dates its founding to 2014 and describes a progression from laser detection to lidar, followed by Pandar, AT, XT and QT developments. Its investor FAQ confirms Nasdaq ADS listing on February 9, 2023 and dual-primary HKEX listing on September 16, 2025. Assessment: distinguish product launches, securities financing and operating cash flow; a funding stage is not commercial validation of one product.'
);
