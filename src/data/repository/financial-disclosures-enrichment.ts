import type { Locale } from '../site';
import type { FinancialDisclosure } from './index';

const l = (zh: string, en: string) => ({ zh, en });
const disclosures = [
  {
    slug: 'diligent-robotics', period: 'FY2025', date: '',
    title: l('Diligent Robotics 2025年度经审计报表（Serve附件99.1）', 'Diligent Robotics audited FY2025 accounts (Serve Exhibit99.1)'),
    url: 'https://www.sec.gov/Archives/edgar/data/1832483/000121390026043149/ea028305301ex99-1.htm',
    note: l('Diligent Robotics, Inc.独立年度US GAAP报表；与Serve收购后合并报表、未经审计备考数和Moxi单产品收入分开。2026年4月13日为审计报告日期，未据此推定SEC提交或公开日期。', 'Standalone Diligent Robotics, Inc. annual U.S. GAAP accounts, distinct from Serve post-acquisition consolidation, unaudited pro forma and Moxi-only revenue. April13,2026 is the audit-report date, not an inferred SEC filing or publication date.'),
  },
  {
    slug: 'diligent-robotics', period: '2026 Q2 acquirer notes', date: '',
    title: l('Serve 2026Q2 Form 10-Q中的Diligent收购附注', 'Diligent acquisition notes in Serve Q2-2026 Form10-Q'),
    url: 'https://www.sec.gov/Archives/edgar/data/1832483/000183248326000035/serv-20260630.htm',
    note: l('收购方未经审计合并季报。签约对价、交割对价、初步购买价分摊和持续服务报酬采用不同口径，不相加，也不记作Diligent融资或独立经营业绩。', 'Acquirer unaudited consolidated quarter. Agreement consideration, closing consideration, provisional allocation and continuing-service compensation have distinct bases; neither additive nor Diligent funding or standalone operating performance.'),
  },
  {
    slug: 'mentee-robotics', period: '2026 Q2 acquirer notes', date: '',
    title: l('Mobileye 2026Q2 Form 10-Q中的Mentee收购附注', 'Mentee acquisition notes in Mobileye Q2-2026 Form10-Q'),
    url: 'https://www.sec.gov/Archives/edgar/data/1910139/000110465926086264/mbly-20260627x10q.htm',
    note: l('截至2026年6月27日的收购方未经审计合并季报。9亿美元合同口径与6.37亿美元收购会计对价不同，持续服务条件奖励费用另列；不是Mentee独立财报、融资或当前估值。', 'Acquirer unaudited consolidated quarter endedJune27,2026. USD900million contractual terms differ from USD637million acquisition-accounting consideration; continuing-service compensation is separate, not Mentee standalone accounts, funding or current valuation.'),
  },
  {
    slug: 'ouster', period: 'FY2025 / FY2024', date: '2026-03-02',
    title: l('Ouster FY2025 Form 10-K及比较年度合并报表', 'Ouster FY2025 Form 10-K and comparative consolidated accounts'),
    url: 'https://www.sec.gov/Archives/edgar/data/1816581/000162828026013313/oust-20251231.htm',
    note: l('经审计的集团U.S. GAAP年度报表，与2026Q2披露分开。金额单位、每股及股数口径按各表保留；2026年收购属于期后事项，不是2025年产品收入，也不等于单一机器人或雷达型号业绩。', 'Audited group U.S. GAAP annual accounts, separate from Q2-2026 disclosures. Preserve each statement\'s monetary, per-share and share-count units; the 2026 acquisition is a subsequent event, not FY2025 product revenue or performance of an individual robot or lidar model.'),
  },
  {
    slug: 'ati-industrial-automation', period: 'FY2022 acquirer notes', date: '',
    title: l('Novanta FY2022年报中的ATI收购与或有对价附注', 'ATI acquisition and contingent-consideration notes in Novanta FY2022 annual report'),
    url: 'https://investors.novanta.com/files/doc_financials/2022/ar/novanta-2022-annual-report.pdf',
    note: l('收购方合并年报的ATI专属历史附注，不是ATI独立财报。购买价分摊、收购后并表期间贡献及或有对价结算分别保留；不作为融资轮、当前估值或ATI全年收入。未推定本报告的具体发布日期。', 'ATI-specific historical notes in the acquirer\'s consolidated annual report, not standalone ATI accounts. Purchase-price allocation, acquisition-period contribution and contingent-consideration settlement remain distinct; not a funding round, current valuation or full-year ATI revenue. No exact report-publication date is inferred.'),
  },
  {
    slug: 'mech-mind', period: '2026 H1', date: '',
    title: l('梅卡曼德2026年中期报告', 'Mech-Mind 2026 Interim Report'),
    url: 'https://ir-upload.realxen.net/iis/9615/uploads/iis/2026/12346004-0.PDF',
    note: l('截至2026年6月30日的集团半年报，采用IAS 34，未经审计并经过KPMG独立审阅。审阅报告日期2026年9月24日不被推定为发布日；集团或业务分类数据不能归为单个机器人或相机型号的收入。', 'Group report for the six months ended June 30, 2026 under IAS 34, unaudited with an independent KPMG review. The review date of September 24, 2026 is not inferred to be publication date; group or business-line data is not revenue for an individual robot or camera model.'),
  },
  {
    slug: 'beckhoff', period: '2025', date: '2026-04-30',
    title: l('倍福2025年度销售公告', 'Beckhoff 2025 sales announcement'),
    url: 'https://www.beckhoff.com/en-us/company/press/u-s-subsidiary-boosts-sales-by-10-1-to-record-133-5-million-in-revenue-2026-04.html',
    note: l('公司销售新闻披露，不是完整审计财报。12.4亿欧元为全球收入，美国子公司数字属于不同地区及货币口径，不能与集团相加，亦不能归为机器人产品收入。', 'Company sales release, not full audited accounts. EUR1.24bn is global revenue; U.S. subsidiary figures have separate regional/currency scope and are neither additive to the group nor robotics-product revenue.'),
  },
  {
    slug: 'syntouch', period: 'FY2018 / FY2017', date: '',
    title: l('SynTouch 2018年度报告（Form C-AR附件A）', 'SynTouch Annual Report 2018 (Exhibit A to Form C-AR)'),
    url: 'https://www.sec.gov/Archives/edgar/data/1728560/000172856019000002/FormC1.pdf',
    note: l('SynTouch Inc.与SynTouch LLC的历史合并报表，2018年度未经审计，不代表当前经营情况。封面日期为2019年4月30日，未将其推定为SEC接收或独立发布日期。', 'Historical consolidated SynTouch Inc. and LLC accounts, unaudited for FY2018, not evidence of current performance. The cover is dated April 30, 2019; this is not inferred to be the SEC acceptance or independent publication date.'),
  },
  {
    slug: 'ati-industrial-automation', period: '2021 acquisition announcement', date: '2021-07-19',
    title: l('Novanta收购ATI协议公告', 'Novanta agreement to acquire ATI'),
    url: 'https://investors.novanta.com/news/news-details/2021/Novanta-Announces-Agreement-to-Acquire-ATI/default.aspx',
    note: l('收购交易公告，不是ATI完整财报。1.72亿美元是前期现金对价，另有附条件或未量化对价；公告中的2021年全年收入为当时预期，不能记作已实现收入。', 'Acquisition announcement, not full ATI accounts. USD172 million was upfront cash with additional contingent or unquantified consideration; stated FY2021 revenue was an expectation, not realized revenue.'),
  },
  {
    slug: 'dobot', period: '2026 H1', date: '2026-08-24',
    title: l('越疆2026年上半年未经审计业绩公告', 'Dobot unaudited interim results for H1 2026'),
    url: 'https://software-1256299428.cos.na-siliconvalley.myqcloud.com/2026/relations/0824/INTERIM%20RESULTS%20ANNOUNCEMENT%20FOR%20THE%20SIX%20MONTHS%20ENDED%2030%20JUNE%202026.pdf',
    note: l('集团未经审计的中期业绩。调整后非GAAP亏损与会计亏损应分开比较；工业及具身智能业务收入不能直接归到某一机械臂型号。', 'Unaudited group interim results. Adjusted non-GAAP loss and accounting loss are distinct; industrial and embodied-AI revenue cannot be attributed directly to an individual arm model.'),
  },
  {
    slug: 'kuka', period: '2025', date: '',
    title: l('KUKA 2025年度报告', 'KUKA Annual Report 2025'),
    url: 'https://www.kuka.com/event/media?itemid=c0aab2d03ab84da6ab9cb4dd9b1a8850',
    note: l('KUKA集团合并年度报告，不是单一机器人产品线财报。已核对的官方报告列表仅标明报告年度，未标明具体公开日期，因此未推定发布日期。', 'KUKA consolidated annual report, not standalone accounts for one robot line. The reviewed official listing identifies the reporting year without a day-level publication date; no release date is inferred.'),
  },
  {
    slug: 'ubtech', period: '2025', date: '2026-04-14',
    title: l('优必选2025年年度报告', 'UBTECH Annual Report 2025'),
    url: 'https://owebsite-cdn.ubtrobot.com/resources/file/2026/04/15/795097683329093.pdf',
    note: l('集团年度报告，披露全尺寸具身人形机器人等业务类别收入，不等于单个Walker型号收入。五年摘要包含CASBE及未调整的2021年HKFRS口径，应阅读会计基础及分部附注后比较。', 'Group annual report with business-category revenue, including full-size embodied humanoids, not individual Walker-model revenue. The five-year summary includes CASBE and unadjusted 2021 HKFRS figures; review accounting bases and segment notes before comparisons.'),
  },
  {
    slug: 'tesla-optimus', period: '2026 Q2', date: '2026-07-22',
    title: l('Tesla 2026年第二季度Form 10-Q（集团）', 'Tesla Q2 2026 Form 10-Q (group)'),
    url: 'https://ir.tesla.com/_flysystem/s3/sec/000162828026049270/tsla-20260630-gen.pdf',
    note: l('Tesla集团合并报表，不是Optimus独立损益。集团收入、利润与产线建设计划不能归为机器人已实现业绩。', 'Tesla consolidated reporting, not standalone Optimus accounts. Group revenue, profit and production buildout plans are not realized robotics results.'),
  },
  {
    slug: 'mentee-robotics', period: '2026', date: '2026-04-24',
    title: l('Mobileye 2026年代理声明：Mentee收购交割', 'Mobileye 2026 Proxy: Mentee acquisition closing'),
    url: 'https://ir.mobileye.com/static-files/3eaf9f1c-7f9a-4e3d-9f88-2796560878ad',
    note: l('收购方披露文件，非Mentee独立定期财报。披露的收购对价不是融资轮或经营收入。', 'Acquirer disclosure, not standalone periodic Mentee accounts. Acquisition consideration is neither a financing round nor operating revenue.'),
  },
  {
    slug: 'hexagon-robotics', period: '2025 / 2026 plan', date: '2026-04-30',
    title: l('Hexagon 2026资本市场日：机器人业务成本与投入', 'Hexagon CMD 2026: robotics costs and investment'),
    url: 'https://hexagon.com/company/newsroom/press-releases/2026/hexagon-releases-new-targets-at-its-capital-markets-day-2026',
    note: l('集团资本市场日披露机器人业务成本及计划投入，不是机器人独立完整财报。成本不是收入，2026年投入计划不等于实际支出。', 'Group capital-markets disclosure of robotics costs and planned investment, not full standalone accounts. Costs are not revenue and planned 2026 investment is not realized expenditure.'),
  },
  {
    slug: 'engineered-arts', period: '2024', date: '2025-05-07',
    title: l('ENGINEERED ARTS LIMITED 2024年小企业报表', 'ENGINEERED ARTS LIMITED 2024 small-company accounts'),
    url: 'https://find-and-update.company-information.service.gov.uk/company/05265468/filing-history/MzQ2NTM3NzEwM2FkaXF6a2N4/document?download=0&format=pdf',
    note: l('英国法人05265468报表，不是美国母公司合并报表，未提交损益表。审计保留意见涉及期初及2023年末部分完工机器人存货估值；附注说明该保留不适用于2024年末存货。不能据留存损益推算收入或当期利润。', 'Accounts of UK entity 05265468, not the U.S. parent; no P&L filed. The qualified audit concerns opening/2023 closing partly finished robot inventory valuation; the note excludes 2024 closing inventory from that qualification. Revenue or current profit cannot be inferred from reserves.'),
  },
  {
    slug: 'orbbec', period: '2026 H1', date: '2026-08-22',
    title: l('2026年半年度报告（未经审计）', '2026 Interim Report (Unaudited)'),
    url: 'https://static.cninfo.com.cn/finalpage/2026-08-22/1225493290.PDF',
    note: l('集团2026年上半年合并报告，未经审计。集团财务数字不代表单个深度相机或机器人产品的收入。', 'Unaudited consolidated H1 2026 report. Group figures do not establish revenue for an individual depth camera or robotics product.'),
  },
  {
    slug: 'ouster', period: '2026 Q2', date: '2026-08-06',
    title: l('2026年第二季度业绩公告', 'Second Quarter 2026 Results'),
    url: 'https://investors.ouster.com/news-releases/news-release-details/ouster-announces-results-second-quarter-2026',
    note: l('公司季度合并业绩公告；GAAP与非GAAP数字应区分，不能归为某个雷达型号业绩。', 'Company quarterly consolidated results; distinguish GAAP and non-GAAP measures and do not attribute them to a single lidar model.'),
  },
  {
    slug: 'misumi', period: 'FY2025 (ended 2026-03-31)', date: '2026-04-30',
    title: l('MISUMI截至2026年3月31日财年合并财务业绩', 'MISUMI consolidated results for the year ended March 31, 2026'),
    url: 'https://www.misumi.co.jp/sites/default/files/2026-04/en_fr_25_4Q.pdf',
    note: l('MISUMI集团日本会计准则合并数据，不是机器人单独业务。英文版为简译，日文原文为准；预测不作为已实现业绩。', 'MISUMI consolidated Japanese-GAAP results, not robotics-only accounts. The abridged English translation defers to the Japanese original; forecasts are not actual results.'),
  },
  {
    slug: 'misumi', period: 'FY2026 Q1 (ended 2026-06-30)', date: '2026-07-31',
    title: l('MISUMI截至2026年6月30日三个月合并财务业绩', 'MISUMI consolidated results for the three months ended June 30, 2026'),
    url: 'https://www.misumi.co.jp/sites/default/files/2026-07/en_fr_26_1Q.pdf',
    note: l('集团季度数据，附件日文报表未经注册会计师或审计机构审阅。全年收入和营业利润预测不作为实际值。', 'Quarterly group data; the Japanese original attached statements were not reviewed by a CPA or audit firm. Full-year sales and operating-profit forecasts are not actuals.'),
  },
];

export function mergeFinancialDisclosure(slug: string, locale: Locale, existing?: FinancialDisclosure): FinancialDisclosure | undefined {
  const additions = disclosures.filter(item => item.slug === slug);
  if (!additions.length) return existing;
  const reports = additions.map(item => ({ period: item.period, title: item.title[locale], publishedAt: item.date, url: item.url, source: 'company' as const }));
  return {
    status: 'reports-available', checkedAt: '2026-09-06',
    note: [...new Set(additions.map(item => item.note[locale]))].join(' '),
    reports: [...new Map([...reports, ...(existing?.reports ?? [])].map(report => [report.url, report])).values()]
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
  };
}
