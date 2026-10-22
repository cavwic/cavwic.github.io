import type { TimelineSeed } from './verified-catalog-wave-fourteen-common';

const l = (zh: string, en: string) => ({ zh, en });
export const mechInterim2026 = 'https://ir-upload.realxen.net/iis/9615/uploads/iis/2026/12346004-0.PDF';
export const mechFunding2021 = 'https://www.mech-mind.com/news/mech-mind-completes-series-c-funding-led-by-tech-giant-meituan.html';
// The interim report establishes listing. Cumulative funding has no stated upper bound.
export const mechInvestorClassification = { stage: 'listed', scale: 'undisclosed' };
export const mechHistory: TimelineSeed[] = [
  {
    date: '2021-05-19', kind: 'funding',
    title: l('公布美团领投的C轮融资', 'Announced Series C led by Meituan'),
    detail: l('美团领投，红杉中国与源码资本等原有投资者参与。公告称累计融资超过1亿美元，未把这一累计值列为本轮融资额；日期为公告日期。', 'Meituan led the round, with existing investors including Sequoia Capital China and Source Code Capital. The release reports cumulative funding above USD100 million, not the size of this round; the date is the announcement date.'),
    sourceUrl: mechFunding2021,
  },
  {
    date: '2025-08-25', kind: 'product',
    title: l('发布Mech-MSR测量检测软件升级', 'Announced a Mech-MSR inspection upgrade'),
    detail: l('增加二维检测、三维涂胶与装配检测，并支持相机和激光轮廓仪的多传感器配置。软件功能不等同于整套产线的检测精度保证。', 'The update adds 2D inspection and 3D glue-bead/assembly inspection, with multi-sensor camera/profiler setups. Software features are not a guarantee of complete-line inspection accuracy.'),
    sourceUrl: 'https://www.mech-mind.com/news/mech-msr-3d-measurement-and-inspection-software-newly-upgraded.html',
  },
  {
    date: '2026-08-12', kind: 'product',
    title: l('发布Mech-Eye ULTRA M-GL', 'Announced Mech-Eye ULTRA M-GL'),
    detail: l('相机面向薄壁件、透明物体与高速物流抓取。公告的成像能力需结合材料、曝光与实际工况理解，不代表任意物体均可达到同一效果。', 'The camera targets thin parts, transparent objects and high-speed logistics picking. Imaging claims depend on materials, exposure and operating conditions, not uniform performance on every object.'),
    sourceUrl: 'https://www.mech-mind.com/news/the-new-mech-eye-ultra-m-gl.html',
  },
  {
    date: '2026-09-01', kind: 'business',
    title: l('H股于香港联交所上市', 'H shares listed in Hong Kong'),
    detail: l('2026年中期报告释义列明上市日为9月1日，股份代码09615。上市主体为梅卡曼德（雄安）机器人科技股份有限公司，集团报表不能直接视为某款相机收入。', 'The 2026 interim report defines September 1 as the listing date, stock code 09615. The issuer is Mech-Mind Robotics Technologies Co., Ltd.; group accounts are not revenue for an individual camera.'),
    sourceUrl: mechInterim2026,
  },
  {
    date: '2026-10-10', kind: 'product',
    title: l('发布VISION 2026展会产品进展', 'Published VISION 2026 product developments'),
    detail: l('报道介绍InstaPick工作站应用，展示UHP-040-5M-GL，并预告Range XL-GL相机和LNX-7300-GL轮廓仪。10月10日为报道日期，展会为10月6日至8日；预告不视为已经量产交付。', 'The report covers an InstaPick application, UHP-040-5M-GL, and previews of Range XL-GL and LNX-7300-GL. October 10 is the report date; the exhibition ran October 6-8. A preview does not establish production delivery.'),
    sourceUrl: 'https://www.mech-mind.com/news/mech-mind-at-vision-2026.html',
  },
];
export const mechListedOverview = l(
  '2026年9月1日，公司H股在香港联交所上市，代码09615。公开中期报告覆盖截至2026年6月30日的集团六个月经营情况，采用IAS 34并经过独立审阅，但不是年度审计报告。研究时应区分公司整体经营、业务分类收入与单一产品表现，也不能把历史累计融资额视为当前现金余额。',
  'Its H shares listed in Hong Kong on September 1, 2026 under code 09615. The public interim report covers the group for the six months ended June 30, 2026 under IAS 34 and has an independent review, not an annual audit. Group performance, business-line revenue and individual products have different scopes; historical cumulative funding is not current cash.'
);
export const mechFinancialOverview = l(
  '2026年上半年未经审计的集团财务摘要以人民币百万元计：收入237.345，其中具身智能机器人引导216.282、AI检测与测量21.063；毛利154.209，毛利率65.0%；研发费用80.097，当期亏损100.327。非IFRS调整后亏损为52.490，其调整涉及赎回负债账面金额变动、股份支付及上市费用。判断：毛利水平与最终盈利是不同维度，应同时阅读费用、会计亏损及调整项，不能用调整后数字替代会计结果。来源为中期报告第4页。',
  'Unaudited H1 2026 group highlights, in RMB million: revenue 237.345, comprising embodied intelligent robotic guidance 216.282 and AI inspection/measurement 21.063; gross profit 154.209 and gross margin 65.0%; R&D expenses 80.097 and period loss 100.327. Non-IFRS adjusted loss is 52.490, adjusting for redemption-liability carrying-amount changes, share-based payments and listing expenses. Assessment: gross margin and final profitability are different measures. Read expenses, accounting loss and adjustments together; adjusted figures do not replace accounting results. Source: interim report printed page 4.'
);
