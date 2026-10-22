import type { Locale } from "../site";
import { localizeSource } from "../source-localization";
import { sourcesById } from "../sources";
import { getCompanies, getMatrices } from "./catalog-localization";
import {
  getProductFinderExpansionRecords,
  type FinderCategory,
  type FinderExpansionRecord,
  type FinderUseCase,
} from "./product-finder-demo";
import { deepResearchCompanySlugs, getDeepProductRecords } from "./robodict-deep-research";
import { getPhaseOneProductRecords } from "./robodict-phase-one";
import { getPrecisionProductRecords } from "./robodict-precision";
import { withParameterIndex } from "./parameter-index";
import { applyReviewedParameterIndex } from "./parameter-index-review-20261019";
import { enrichProductImageSupplement20261019 } from "./product-image-supplement-20261019";
import {
  applyVerifiedCompanyPatch,
  applyVerifiedProductPatch,
  getVerifiedAdditionalProductRecords,
} from "./verified-catalog-wave-one";
import {
  applyRoboteraCompanyPatch,
  applyRoboteraProductPatch,
  getRoboteraAdditionalProductRecords,
} from "./verified-catalog-wave-two";
import {
  applyOnRobotCompanyPatch,
  getOnRobotProductRecords,
} from "./verified-catalog-wave-three";
import {
  applyRobotiqCompanyPatch,
  getRobotiqProductRecords,
} from "./verified-catalog-wave-four";
import {
  applyOusterCompanyPatch,
  getOusterProductRecords,
} from "./verified-catalog-wave-five";
import {
  applyVerifiedWaveSixCompanyPatch,
  getVerifiedWaveSixProductRecords,
  isWaveSixCompanySlug,
  waveSixCompanySlugs,
} from "./verified-catalog-wave-six";
import {
  applyVerifiedWaveSevenCompanyPatch,
  getVerifiedWaveSevenProductRecords,
  isWaveSevenCompanySlug,
  waveSevenCompanySlugs,
} from "./verified-catalog-wave-seven";
import {
  applyVerifiedWaveEightCompanyPatch,
  getVerifiedWaveEightProductRecords,
  isWaveEightCompanySlug,
  waveEightCompanySlugs,
} from "./verified-catalog-wave-eight";
import {
  applyVerifiedWaveNineCompanyPatch,
  getVerifiedWaveNineProductRecords,
  isWaveNineCompanySlug,
  waveNineCompanySlugs,
} from "./verified-catalog-wave-nine";
import {
  applyVerifiedWaveTenCompanyPatch,
  getVerifiedWaveTenProductRecords,
  isWaveTenCompanySlug,
  waveTenCompanySlugs,
} from "./verified-catalog-wave-ten";
import {
  applyVerifiedWaveElevenCompanyPatch,
  getVerifiedWaveElevenProductRecords,
  isWaveElevenCompanySlug,
  waveElevenCompanySlugs,
} from "./verified-catalog-wave-eleven";
import {
  applyVerifiedWaveTwelveCompanyPatch,
  getVerifiedWaveTwelveProductRecords,
  isWaveTwelveCompanySlug,
  waveTwelveCompanySlugs,
} from "./verified-catalog-wave-twelve";
import {
  applyVerifiedWaveThirteenCompanyPatch,
  getVerifiedWaveThirteenProductRecords,
  isWaveThirteenCompanySlug,
  waveThirteenCompanySlugs,
} from "./verified-catalog-wave-thirteen";
import {
  applyVerifiedWaveFourteenCompanyPatch,
  getVerifiedWaveFourteenProductRecords,
  isWaveFourteenCompanySlug,
  waveFourteenCompanySlugs,
} from "./verified-catalog-wave-fourteen";
import { applyVerifiedWaveFifteenCompanyPatch, getVerifiedWaveFifteenProductRecords } from "./verified-catalog-wave-fifteen";
import { applyCatalogEnrichment, getCatalogEnrichmentProducts, getCatalogCompanyTimeline, getCatalogCompanyFunding, getCatalogCompanyInvestmentView } from './catalog-enrichment';
import { applyReadySourceWork } from './ready-work-20261019';
import { mergeFinancialDisclosure } from './financial-disclosures-enrichment';

export type FinancialReport = {
  period: string;
  title: string;
  publishedAt: string;
  url: string;
  source: "company" | "exchange";
};

export type FinancialDisclosure = {
  status: "reports-available" | "no-periodic-reports-found" | "not-reviewed";
  checkedAt: string;
  note: string;
  reports: FinancialReport[];
};

const financialDisclosureBySlug: Record<string, Record<Locale, FinancialDisclosure>> = {
  harting: {
    zh: {status:'reports-available',checkedAt:'2026-09-06',note:'公司2024/25财年业绩新闻摘要，不是完整审计财报。财年截至2025年9月30日，集团销售额约11亿欧元；集团与区域收入不能归为机器人业务，也不代表估值。',reports:[{period:'2024/25',title:'2024/25财年集团业绩公告摘要',publishedAt:'2025-12-11',url:'https://www.harting.com/en-GB/news/harting-closes-financial-year-with-strong-growth',source:'company'}]},
    en: {status:'reports-available',checkedAt:'2026-09-06',note:'Company FY2024/25 results news summary, not full audited accounts. The year ended September 30, 2025 with approximately EUR1.1bn group sales. Group and regional revenue is neither robotics-segment revenue nor valuation.',reports:[{period:'2024/25',title:'Company summary of FY2024/25 group results',publishedAt:'2025-12-11',url:'https://www.harting.com/en-GB/news/harting-closes-financial-year-with-strong-growth',source:'company'}]},
  },
  thk: {
    zh: {status:'reports-available',checkedAt:'2026-09-06',note:'2026年上半年合并财务结果采用IFRS。收入、营业利润与税前利润为持续经营口径；净利润包括终止经营。汽车与运输业务于2026年6月1日完成转让，不能将出售收益当作机器人产品的经营收入。',reports:[{period:'2026 H1',title:'2026年上半年合并财务结果',publishedAt:'2026-08-05',url:'https://www.thk.com/jp/wordpress/wp-content/uploads/2026/08/260805_financial_result_en.pdf',source:'company'}]},
    en: {status:'reports-available',checkedAt:'2026-09-06',note:'H1 2026 consolidated results under IFRS. Revenue, operating income and pretax profit cover continuing operations; net profit includes discontinued operations. The automotive/transportation transfer completed on June 1, 2026; disposal gains are not robotics-product operating revenue.',reports:[{period:'2026 H1',title:'Consolidated financial results for the six months ended June 30, 2026',publishedAt:'2026-08-05',url:'https://www.thk.com/jp/wordpress/wp-content/uploads/2026/08/260805_financial_result_en.pdf',source:'company'}]},
  },
  'sumitomo-drive': {
    zh: {status:'reports-available',checkedAt:'2026-09-06',note:'住友重机械集团合并报告，非Fine Cyclo单独产品线财报。驱动业务属于集团业务组合；不得把集团销售额、利润或年度预测归到某一减速器系列。',reports:[{period:'2026 H1',title:'住友重机械2026年上半年合并财务结果',publishedAt:'2026-08-04',url:'https://www.shi.co.jp/english/info/2026/6kgpsq00000043eq-att/6kgpsq00000043f9.pdf',source:'company'}]},
    en: {status:'reports-available',checkedAt:'2026-09-06',note:'Sumitomo Heavy Industries consolidated report, not standalone Fine Cyclo product-line accounts. The drive business is part of the group portfolio; group sales, profit and forecasts must not be attributed to one reducer family.',reports:[{period:'2026 H1',title:'SHI consolidated financial results for the six months ended June 30, 2026',publishedAt:'2026-08-04',url:'https://www.shi.co.jp/english/info/2026/6kgpsq00000043eq-att/6kgpsq00000043f9.pdf',source:'company'}]},
  },
  'hms-networks': {
    zh: {status:'reports-available',checkedAt:'2026-09-06',note:'HMS集团2026年上半年中期报告，英文版为瑞典文原文译本。集团净销售额、EBITA和订单不等于单款通信产品或机器人业务收入。',reports:[{period:'2026 H1',title:'2026年1至6月中期报告',publishedAt:'2026-07-14',url:'https://hmsnetworks.blob.core.windows.net/nlw/docs/default-source/finance/quarterly-reports/financial-reports-(english)/hms-networks-q2-report-2026.pdf?sfvrsn=b1141d8e_4',source:'company'}]},
    en: {status:'reports-available',checkedAt:'2026-09-06',note:'HMS consolidated H1 2026 interim report; the English version translates the Swedish original. Group sales, EBITA and orders are not revenue for one communication item or robotics segment.',reports:[{period:'2026 H1',title:'Interim report January-June 2026',publishedAt:'2026-07-14',url:'https://hmsnetworks.blob.core.windows.net/nlw/docs/default-source/finance/quarterly-reports/financial-reports-(english)/hms-networks-q2-report-2026.pdf?sfvrsn=b1141d8e_4',source:'company'}]},
  },
  'boyd-thermal': {
    zh: {status:'reports-available',checkedAt:'2026-09-06',note:'收购方Eaton截至2026年6月30日的10-Q，包含Boyd Thermal收购及合并后贡献披露，不是Boyd独立完整财报。交易价格不等于收入；合并期间也不是完整年度。',reports:[{period:'2026 Q2',title:'Eaton 2026年二季度10-Q及Boyd Thermal收购披露',publishedAt:'2026-07-31',url:'https://www.sec.gov/Archives/edgar/data/1551182/000155118226000030/etn-20260630.htm',source:'company'}]},
    en: {status:'reports-available',checkedAt:'2026-09-06',note:'Acquirer Eaton June 30, 2026 Form 10-Q includes Boyd Thermal acquisition and post-acquisition contributions, not full standalone Boyd accounts. Purchase price is not revenue, and the consolidation period is not a full year.',reports:[{period:'2026 Q2',title:'Eaton Q2 2026 Form 10-Q and Boyd Thermal acquisition disclosure',publishedAt:'2026-07-31',url:'https://www.sec.gov/Archives/edgar/data/1551182/000155118226000030/etn-20260630.htm',source:'company'}]},
  },
  nabtesco: {
    zh: {status:'reports-available',checkedAt:'2026-09-06',note:'纳博特斯克集团2026年中期报告及2026年8月14日更正公告。合并数据不是精密减速器单一业务或型号的收入；英文版为译本，日文原文为准。',reports:[{period:'2026 H1',title:'2026年中期报告（公司英文版）',publishedAt:'2026-08-14',url:'https://www.nabtesco.com/cms/wp-content/uploads/Semiannual-Report2026E.pdf',source:'company'},{period:'2026 H1',title:'2026年二季度合并财务摘要更正公告',publishedAt:'2026-08-14',url:'https://www.nabtesco.com/cms/wp-content/uploads/Revision-of-Summary_of_Consolidated_Financial_Statements_for_FY2026_Q2_e.pdf',source:'company'}]},
    en: {status:'reports-available',checkedAt:'2026-09-06',note:'Nabtesco consolidated 2026 semiannual report and August 14 correction notice. Group results are not revenue for one precision-reducer business or model. English documents are translations; the Japanese originals govern.',reports:[{period:'2026 H1',title:'2026 Semiannual Report (company English translation)',publishedAt:'2026-08-14',url:'https://www.nabtesco.com/cms/wp-content/uploads/Semiannual-Report2026E.pdf',source:'company'},{period:'2026 H1',title:'Correction to FY2026 Q2 consolidated financial summary',publishedAt:'2026-08-14',url:'https://www.nabtesco.com/cms/wp-content/uploads/Revision-of-Summary_of_Consolidated_Financial_Statements_for_FY2026_Q2_e.pdf',source:'company'}]},
  },
  'nvidia-robotics': {
    zh: {status:'reports-available',checkedAt:'2026-09-06',note:'NVIDIA集团2026年度报告合订本，包含年度回顾、委托投票文件及Form 10-K；不是独立机器人业务财报。合订本通知日期为2026年5月12日，所含10-K提交于2月25日。',reports:[{period:'FY2026',title:'2026年度报告、委托投票文件与Form 10-K',publishedAt:'2026-05-12',url:'https://s201.q4cdn.com/141608511/files/doc_financials/2026/ar/2026-Annual-Report-Web.pdf',source:'company'}]},
    en: {status:'reports-available',checkedAt:'2026-09-06',note:'NVIDIA consolidated 2026 annual-report package, including the annual review, proxy statement and Form 10-K; not standalone robotics accounts. The package notice is dated May 12, 2026; its 10-K was filed February 25.',reports:[{period:'FY2026',title:'2026 Annual Report, Proxy Statement and Form 10-K',publishedAt:'2026-05-12',url:'https://s201.q4cdn.com/141608511/files/doc_financials/2026/ar/2026-Annual-Report-Web.pdf',source:'company'}]},
  },
  robosense: {
    zh: {status:'reports-available',checkedAt:'2026-09-06',note:'公司发布的2026年中期业绩摘要，属于集团及业务口径，不是单个雷达型号的收入或销量；摘要不能替代完整财务报表。',reports:[{period:'2026 H1',title:'2026年中期业绩公司公告摘要',publishedAt:'2026-08-26',url:'https://www.robosense.ai/en/news-show-2001',source:'company'}]},
    en: {status:'reports-available',checkedAt:'2026-09-06',note:'Company summary of 2026 interim results at group and segment level, not revenue or shipments for individual lidar models. This summary does not replace full financial statements.',reports:[{period:'2026 H1',title:'Company summary of 2026 interim results',publishedAt:'2026-08-26',url:'https://www.robosense.ai/en/news-show-2001',source:'company'}]},
  },
  hesai: {
    zh: {status:'reports-available',checkedAt:'2026-09-06',note:'集团季度未审计业绩，不代表单一产品线的经营情况；GAAP 与非 GAAP 口径需要分开。',reports:[{period:'2026 Q2',title:'2026 年二季度未审计财务业绩',publishedAt:'2026-08-18',url:'https://investor.hesaitech.com/news-releases/news-release-details/hesai-group-reports-second-quarter-2026-unaudited-financial',source:'company'}]},
    en: {status:'reports-available',checkedAt:'2026-09-06',note:'Unaudited quarterly group results, not individual product-line performance. Distinguish GAAP and non-GAAP measures.',reports:[{period:'2026 Q2',title:'Second-quarter 2026 unaudited financial results',publishedAt:'2026-08-18',url:'https://investor.hesaitech.com/news-releases/news-release-details/hesai-group-reports-second-quarter-2026-unaudited-financial',source:'company'}]},
  },
  photoneo: {
    zh: {
      status: "reports-available", checkedAt: "2026-09-05",
      note: "以下为收购方 Zebra 的集团业绩材料，不是 Photoneo 独立财报。2025 年一季度公告披露收购 Photoneo 支出 6200 万美元，不据此推算 Photoneo 收入、利润或当前估值。",
      reports: [{period:"2025 Q1",title:"Zebra 2025 年一季度业绩及 Photoneo 收购披露",publishedAt:"2025-04-29",url:"https://www.zebra.com/us/en/about-zebra/newsroom/press-releases/2025/zebra-technologies-announces-first-quarter-2025-results.html",source:"company"}],
    },
    en: {
      status: "reports-available", checkedAt: "2026-09-05",
      note: "This is acquirer Zebra's group reporting, not standalone Photoneo accounts. The Q1 2025 release discloses USD 62 million spent acquiring Photoneo; it does not establish Photoneo revenue, profit or current valuation.",
      reports: [{period:"2025 Q1",title:"Zebra Q1 2025 results and Photoneo acquisition disclosure",publishedAt:"2025-04-29",url:"https://www.zebra.com/us/en/about-zebra/newsroom/press-releases/2025/zebra-technologies-announces-first-quarter-2025-results.html",source:"company"}],
    },
  },
  paxini: {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-03",
      note: "公司官网当前未列出面向公众的定期财务报告。该状态不表示公司没有内部财务数据，也不用于推断收入或经营情况。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-03",
      note: "The company website does not currently list periodic public financial reports. This does not mean the company has no internal financial information and is not a basis for inferring revenue or operating performance.",
      reports: [],
    },
  },
  ubtech: {
    zh: {
      status: "reports-available",
      checkedAt: "2026-09-03",
      note: "优必选为上市公司；此处只收录公司投资者关系页面公开的定期报告入口。",
      reports: [
        {
          period: "2024",
          title: "2024 年年度报告",
          publishedAt: "2025-04-30",
          url: "https://owebsite-cdn.ubtrobot.com/resources/file/2025/05/06/673306119077957.pdf",
          source: "company",
        },
      ],
    },
    en: {
      status: "reports-available",
      checkedAt: "2026-09-03",
      note: "UBTECH is publicly listed. This repository records only periodic reports exposed through the company's investor-relations material.",
      reports: [
        {
          period: "2024",
          title: "Annual Report 2024",
          publishedAt: "2025-04-30",
          url: "https://owebsite-cdn.ubtrobot.com/resources/file/2025/05/06/673306119077957.pdf",
          source: "company",
        },
      ],
    },
  },
  onrobot: {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "OnRobot 官网当前未提供面向公众的定期财务报告或投资者关系报告库。该状态不表示公司没有内部财务数据，也不用于推断收入、利润或经营情况。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "The current OnRobot website does not provide a public periodic-financial-report or investor-relations report library. This does not mean the company has no internal financial information and is not a basis for inferring revenue, profit, or operating performance.",
      reports: [],
    },
  },
  robotiq: {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "Robotiq 为非上市公司，官网当前未提供面向公众的定期财务报告库。2018 年官方新闻稿披露 Battery Ventures 投资 3,100 万加元；该融资披露不等同于定期财报，也不能据此推断当前收入、利润或估值。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "Robotiq is privately held and its current website does not provide a public periodic-financial-report library. An official 2018 release disclosed a CAD 31 million Battery Ventures investment; that funding disclosure is not a periodic financial report and is not a basis for inferring current revenue, profit, or valuation.",
      reports: [],
    },
  },
  ouster: {
    zh: {
      status: "reports-available",
      checkedAt: "2026-09-04",
      note: "Ouster 为纳斯达克上市公司（OUST）。此处收录公司投资者关系站公开的 2025 年 Form 10-K；报告数据为历史合并口径，不代表后续季度或单一产品盈利能力。",
      reports: [
        {
          period: "2025",
          title: "2025 年年度报告（Form 10-K）",
          publishedAt: "2026-03-02",
          url: "https://investors.ouster.com/static-files/9c5c3635-e2e3-471e-9864-12e4c2ffa51b",
          source: "company",
        },
      ],
    },
    en: {
      status: "reports-available",
      checkedAt: "2026-09-04",
      note: "Ouster is listed on Nasdaq as OUST. This entry records the 2025 Form 10-K published through the investor-relations site; its figures are historical and consolidated, not evidence of later quarters or model-level profitability.",
      reports: [
        {
          period: "2025",
          title: "Annual Report 2025 (Form 10-K)",
          publishedAt: "2026-03-02",
          url: "https://investors.ouster.com/static-files/9c5c3635-e2e3-471e-9864-12e4c2ffa51b",
          source: "company",
        },
      ],
    },
  },
  "agility-robotics": {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "Agility Robotics 官网当前未提供面向公众的定期财务报告库。2026 年公告描述的是仍需满足交割条件的拟议业务合并，不等同于已完成上市或已发布定期财报。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "The current Agility Robotics website does not provide a public periodic-financial-report library. Its 2026 announcement describes a proposed business combination subject to closing conditions, not a completed listing or a periodic financial report.",
      reports: [],
    },
  },
  "figure-ai": {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "Figure 官网当前未提供面向公众的定期财务报告库。融资金额和估值来自公司融资公告，不等同于收入、利润、现金流或经审计财报。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "The current Figure website does not provide a public periodic-financial-report library. Funding and valuation figures come from company financing announcements and are not revenue, profit, cash-flow, or audited-report figures.",
      reports: [],
    },
  },
  "1x-technologies": {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "1X 官网当前未提供面向公众的定期财务报告库。融资与产品预订披露不等同于经审计财报，也不能据此推断当前收入或利润。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "The current 1X website does not provide a public periodic-financial-report library. Funding and product-preorder disclosures are not audited financial reports and do not establish current revenue or profit.",
      reports: [],
    },
  },
  "sanctuary-ai": {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "Sanctuary AI 官网当前未提供面向公众的定期财务报告库。融资新闻中的累计投入金额不是定期财务报表，也不用于推断经营业绩。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "The current Sanctuary AI website does not provide a public periodic-financial-report library. The cumulative-investment figure in financing news is not a periodic financial statement and is not used to infer operating performance.",
      reports: [],
    },
  },
  "neura-robotics": {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "NEURA Robotics 官网当前未提供面向公众的定期财务报告库。融资与订单簿数字属于公司公告口径，不等同于经审计收入、利润或现金流。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "The current NEURA Robotics website does not provide a public periodic-financial-report library. Funding and orderbook figures are company-announcement measures, not audited revenue, profit, or cash flow.",
      reports: [],
    },
  },
  "boston-dynamics": {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "Boston Dynamics 官网当前未提供独立公司的定期财务报告库。Hyundai Motor Group 的合并披露不能自动视为 Boston Dynamics 的独立收入、利润或现金流。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "The Boston Dynamics website does not currently provide a standalone periodic-financial-report library. Hyundai Motor Group consolidated disclosures are not standalone Boston Dynamics revenue, profit, or cash flow.",
      reports: [],
    },
  },
  apptronik: {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "Apptronik 官网当前未提供面向公众的定期财务报告库。融资金额不能替代收入、利润、现金流或交付数据。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "The Apptronik website does not currently provide a public periodic-financial-report library. Funding amounts do not substitute for revenue, profit, cash flow, or delivery data.",
      reports: [],
    },
  },
  "booster-robotics": {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "Booster Robotics 官网当前未提供面向公众的定期财务报告库。比赛、融资和产品发布资料不用于推断财务业绩。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "The Booster Robotics website does not currently provide a public periodic-financial-report library. Competition, funding, and product-launch material is not used to infer financial performance.",
      reports: [],
    },
  },
  "noetix-robotics": {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "松延动力官网当前未提供面向公众的定期财务报告库。产品页、交付文档与融资消息不能替代审计财务数据。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "The Noetix Robotics website does not currently provide a public periodic-financial-report library. Product pages, delivery documents, and funding news do not substitute for audited financial data.",
      reports: [],
    },
  },
  "fourier-intelligence": {
    zh: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "傅利叶官网当前未提供面向公众的定期财务报告库。公司产品、案例和里程碑披露不构成收入、盈利或现金流证明。",
      reports: [],
    },
    en: {
      status: "no-periodic-reports-found",
      checkedAt: "2026-09-04",
      note: "The Fourier website does not currently provide a public periodic-financial-report library. Product, deployment, and milestone disclosures do not establish revenue, profitability, or cash flow.",
      reports: [],
    },
  },
};

const productSlugOverrides: Record<string, string> = {
  "deep-paxini-data-1": "paxini-pxcap-iii",
  "deep-paxini-data-2": "paxini-pxdex-iii",
  "deep-paxini-data-3": "paxini-pxcap-pro",
  "deep-paxini-data-4": "paxini-omnisharing-db",
};

export const repositoryProductSlug = (id: string) => productSlugOverrides[id] ?? id.replace(/^deep-/, "").replace(/^sku-/, "");

const buildRepositoryCompanies = (locale: Locale) => getCompanies(locale)
  .map((company) => applyVerifiedCompanyPatch(company, locale))
  .map((company) => applyRoboteraCompanyPatch(company, locale))
  .map((company) => applyOnRobotCompanyPatch(company, locale))
  .map((company) => applyRobotiqCompanyPatch(company, locale))
  .map((company) => applyOusterCompanyPatch(company, locale))
  .map((company) => applyVerifiedWaveSixCompanyPatch(company, locale))
  .map((company) => applyVerifiedWaveSevenCompanyPatch(company, locale))
  .map((company) => applyVerifiedWaveEightCompanyPatch(company, locale))
  .map((company) => applyVerifiedWaveNineCompanyPatch(company, locale))
  .map((company) => applyVerifiedWaveTenCompanyPatch(company, locale))
  .map((company) => applyVerifiedWaveElevenCompanyPatch(company, locale))
  .map((company) => applyVerifiedWaveTwelveCompanyPatch(company, locale))
  .map((company) => applyVerifiedWaveThirteenCompanyPatch(company, locale))
  .map((company) => applyVerifiedWaveFourteenCompanyPatch(company, locale))
  .map((company) => applyVerifiedWaveFifteenCompanyPatch(company, locale))
  .map((company) => applyCatalogEnrichment(company, locale));
// Imported catalog modules are immutable within one build/HMR module lifetime.
const companyCache = new Map<Locale, ReturnType<typeof buildRepositoryCompanies>>();
export const getRepositoryCompanies = (locale: Locale) => {
  let records = companyCache.get(locale);
  if (!records) { records = buildRepositoryCompanies(locale); companyCache.set(locale, records); }
  return records.slice();
};
export const getRepositoryMatrices = (locale: Locale) => getMatrices(locale);

type RobotFinderCategory = Exclude<FinderCategory, "enterprise-ai">;
type RepositoryCompany = ReturnType<typeof getRepositoryCompanies>[number];

const matrixCategoryBySlug: Record<string, RobotFinderCategory> = {
  "embodied-robot-platforms": "robot-platform",
  "robot-model-software-compute": "model-software",
  "robot-perception-components": "perception",
  "robot-joint-drive-components": "motion",
  "dexterous-hand-selection": "end-effector",
  "tactile-force-sensing": "perception",
};

const matrixUseCases: Record<RobotFinderCategory, FinderUseCase[]> = {
  "robot-platform": ["research", "manufacturing", "logistics", "service"],
  "end-effector": ["research", "manufacturing", "integration"],
  perception: ["research", "manufacturing", "integration"],
  motion: ["manufacturing", "integration"],
  "model-software": ["research", "integration"],
};

const matrixParameterLabels: Record<Locale, Record<RobotFinderCategory, string[]>> = {
  zh: {
    "robot-platform": ["身高", "整机质量", "全身自由度", "负载", "续航", "移动速度"],
    "end-effector": ["自由度 / 驱动数", "质量", "指尖力 / 夹力", "负载", "触觉配置", "控制接口"],
    perception: ["测量维度", "量程", "分辨率", "采样率", "数据接口", "环境与耐久"],
    motion: ["额定 / 峰值扭矩", "减速比", "回差", "质量", "控制接口", "连续工况"],
    "model-software": ["模型 / 运行时", "支持本体", "训练框架", "部署位置", "接口", "许可证"],
  },
  en: {
    "robot-platform": ["Height", "Mass", "Full-body DoF", "Payload", "Endurance", "Travel speed"],
    "end-effector": ["DoF / actuation", "Mass", "Fingertip / grip force", "Payload", "Tactile sensing", "Control interface"],
    perception: ["Measured axes", "Range", "Resolution", "Sampling rate", "Data interface", "Environment and life"],
    motion: ["Rated / peak torque", "Reduction ratio", "Backlash", "Mass", "Control interface", "Continuous duty"],
    "model-software": ["Model / runtime", "Supported bodies", "Training framework", "Deployment", "Interfaces", "License"],
  },
};

const matrixOpennessLevel = (value: string) => {
  const normalized = value.toLocaleLowerCase();
  if (/(open.source|开源|sdk|developer documentation|开发文档)/.test(normalized)) return "open" as const;
  if (/(confirm|待确认|按项目|not fully public|requires confirmation)/.test(normalized)) return "confirm" as const;
  return "documented" as const;
};

const toFinderProfile = (company: RepositoryCompany): FinderExpansionRecord["profile"] => ({
  slug: company.slug,
  valueChainRole: company.valueChainRole ?? "",
  positioning: company.positioning,
  strengths: company.strengths ?? [],
  products: company.products,
  fit: company.fit ?? [],
  questions: company.presalesQuestions,
  sourceIds: company.sourceIds,
  reviewedAt: company.reviewedAt,
  legalName: company.legalName,
  country: company.country,
  headquarters: company.headquarters,
  founded: company.founded,
  officialUrl: company.officialUrl,
  overview: company.overview,
  businessAreas: company.businessAreas,
  customerGroups: company.customerGroups,
  milestones: company.milestones,
  catalogScope: company.catalogScope,
  catalogCoverage: company.catalogCoverage,
});

const getMatrixProductRecords = (locale: Locale): FinderExpansionRecord[] => {
  const companies = getRepositoryCompanies(locale);
  const companyByName = new Map<string, RepositoryCompany>();
  companies.forEach((company) => {
    companyByName.set(company.name.toLocaleLowerCase(), company);
    companyByName.set(company.englishName.toLocaleLowerCase(), company);
  });

  const fourier = companies.find((company) => company.slug === "fourier-intelligence");
  if (fourier) {
    companyByName.set("傅利叶智能", fourier);
    companyByName.set("fourier intelligence", fourier);
  }

  return getRepositoryMatrices(locale)
    .filter((matrix) => matrix.industry !== "ai")
    .flatMap((matrix) => matrix.rows.map((row, index) => {
      const company = companyByName.get(row.company.toLocaleLowerCase());
      if (!company) throw new Error(`Repository matrix company is missing: ${row.company}`);

      const category = matrixCategoryBySlug[matrix.slug] ?? "robot-platform";
      const refs = row.sourceIds.flatMap((id) => {
        const ref = sourcesById.get(id);
        return ref ? [localizeSource(ref, locale)] : [];
      });
      const primaryRef = refs.find((ref) => ref.sourceType === "official") ?? refs[0];
      const officialUrl = primaryRef?.url ?? company.officialUrl ?? "";
      if (!officialUrl) throw new Error(`Repository matrix product has no public source: ${row.company} / ${row.product}`);

      return {
        id: `${matrix.slug}-${index}`,
        matrixSlug: matrix.slug,
        matrixTitle: matrix.title,
        industry: matrix.industry,
        reviewedAt: matrix.reviewedAt,
        ...row,
        officialUrl,
        category,
        useCases: matrixUseCases[category],
        opennessLevel: matrixOpennessLevel(row.openness),
        parameters: matrixParameterLabels[locale][category].map((label) => ({
          label,
          value: locale === "zh" ? "待补充" : "Pending",
          status: "unknown" as const,
        })),
        catalogCoverage: company.catalogCoverage ?? "pending-review",
        catalogScope: company.catalogScope,
        evidence: {
          level: /\/|系列|series|family/i.test(row.product) ? "family" as const : "model" as const,
          specificationKind: "capabilities" as const,
          overview: [...new Set([company.positioning, row.integration].filter(Boolean))],
          applications: company.fit ?? [],
          disclosureBoundary: locale === "zh"
            ? "本记录复用产品矩阵中已核对的公开定位、集成说明与选型边界。尚未取得型号级官方参数的字段保持未披露，不依据相近型号推断。"
            : "This record reuses verified public positioning, integration notes, and selection boundaries from the product matrix. Fields without model-specific official specifications remain undisclosed and are not inferred from adjacent models.",
          sourceLinks: [...new Map(refs.map((ref) => [ref.url, { label: ref.title, url: ref.url }])).values()],
        },
        profile: toFinderProfile(company),
      } satisfies FinderExpansionRecord;
    }))
    .filter((record) => !(["宇树科技", "Unitree Robotics"].includes(record.company) && /G1\s*\/\s*H/i.test(record.product)));
};

const enterpriseAiSourceIdsBySlug: Record<string, string[]> = {
  langgenius: ["ref-01", "ref-110", "ref-05"],
  infiniflow: ["ref-111"],
  labring: ["ref-112"],
  "ai-indeed": ["ref-16", "ref-16", "ref-16"],
};

const getEnterpriseAiProductRecords = (locale: Locale): FinderExpansionRecord[] => (
  getRepositoryCompanies(locale)
    .filter((company) => company.industry === "ai")
    .flatMap((company) => company.products.map((product, index) => {
      const sourceId = enterpriseAiSourceIdsBySlug[company.slug]?.[index] ?? company.sourceIds[0];
      const ref = sourceId ? sourcesById.get(sourceId) : undefined;
      if (!ref) throw new Error(`Enterprise AI product has no public source: ${company.slug} / ${product}`);
      const source = localizeSource(ref, locale);

      return {
        id: `catalog-ai-${company.slug}-${index + 1}`,
        matrixSlug: "",
        matrixTitle: locale === "zh" ? "企业 AI 产品目录" : "Enterprise AI product catalog",
        industry: company.industry,
        reviewedAt: company.reviewedAt,
        product,
        company: company.name,
        type: company.valueChainRole ?? (locale === "zh" ? "企业 AI 产品或服务" : "Enterprise AI product or service"),
        openness: locale === "zh" ? "公司官方资料可查" : "Company-published material is available",
        integration: company.positioning,
        verificationFocus: company.verificationFocus ?? company.presalesQuestions[0] ?? "",
        sourceIds: [sourceId],
        officialUrl: source.url,
        category: "enterprise-ai",
        useCases: [],
        opennessLevel: "documented",
        parameters: [
          {
            label: locale === "zh" ? "资料层级" : "Record scope",
            value: locale === "zh" ? "公开产品或服务条目" : "Public product or service entry",
            status: "manufacturer",
          },
          {
            label: locale === "zh" ? "版本与规格" : "Version and specifications",
            value: locale === "zh" ? "按官方资料继续核验" : "Requires continued review of official material",
            status: "unknown",
          },
        ],
        catalogPrimary: "software-tools",
        catalogSubclass: "development-tool",
        catalogCoverage: "pending-review",
        evidence: {
          level: "platform",
          specificationKind: "capabilities",
          overview: [company.positioning],
          applications: company.fit ?? [],
          disclosureBoundary: locale === "zh"
            ? "本页从已有公司档案生成产品或服务条目，只记录当前公开定位。版本差异、部署规格、许可与交付边界仍需依据对应官方文档逐项补充。"
            : "This product or service entry is generated from the existing company file and records only its current public positioning. Version differences, deployment specifications, licensing, and delivery boundaries still require item-by-item official documentation.",
          sourceLinks: [{ label: source.title, url: source.url }],
        },
        profile: toFinderProfile(company),
      } satisfies FinderExpansionRecord;
    }))
);

const standaloneRepositoryCompanySlugs = new Set(getRepositoryCompanies("zh").map((company) => company.slug));

const publicSpecificationCompleteIds = new Set([
  "deep-paxini-gen4",
  "deep-paxini-gen3",
  "deep-paxini-px3q",
  "deep-paxini-px6d",
  "deep-paxini-footrix",
  "deep-paxini-dexh13",
  "deep-paxini-gmh18",
  "deep-paxini-tora-one",
  "deep-paxini-tora-double",
  "deep-paxini-data-1",
  "deep-paxini-data-2",
  "deep-paxini-data-3",
  "deep-paxini-data-4",
]);

export const hasStandaloneRepositoryCompany = (slug: string) => standaloneRepositoryCompanySlugs.has(slug);

export const getStandaloneRepositoryCompanies = (locale: Locale) => getRepositoryCompanies(locale);

const enrichStandaloneProductRecord = (record: FinderExpansionRecord, locale: Locale): FinderExpansionRecord => {
  const overview = [record.profile.overview?.[0], record.integration].filter((item): item is string => Boolean(item));
  const distinctOverview = [...new Set(overview)];
  const knownParameters = record.parameters.filter((item) => item.status !== "unknown");
  const isCapabilityRecord = knownParameters.length <= 1;
  const sourceLabel = locale === "zh" ? "产品官方资料" : "Official product material";
  const parameters = applyReviewedParameterIndex(record.id, withParameterIndex(record.parameters, record.officialUrl, sourceLabel));
  const baseEvidence = record.evidence ?? {
    level: /\bseries\b|\bfamily\b|\//i.test(record.product) ? "family" as const : "model" as const,
    specificationKind: isCapabilityRecord ? "capabilities" as const : "parameters" as const,
    overview: distinctOverview,
    applications: record.profile.customerGroups?.length ? record.profile.customerGroups : record.profile.fit,
    disclosureBoundary: locale === "zh"
      ? "本页只记录厂商官网或官方文档中可直接核对的产品定位与参数。系列级记录不把单一型号参数扩展到其他型号，未公开数值也不作推断。"
      : "This page records only product positioning and specifications directly verifiable in official manufacturer material. Family records do not extend one model's figures to other models, and undisclosed values are not inferred.",
    sourceLinks: [{ label: sourceLabel, url: record.officialUrl }],
  };
  const specificationCoverage = baseEvidence.specificationCoverage
    ?? (publicSpecificationCompleteIds.has(record.id)
      ? "official-complete"
      : baseEvidence.specificationKind === "capabilities"
        ? "capability-only"
        : baseEvidence.level === "family" || baseEvidence.level === "platform"
          ? "family-summary"
          : "official-partial");
  return {
    ...record,
    parameters,
    evidence: {
      ...baseEvidence,
      specificationCoverage,
      specificationCoverageNote: baseEvidence.specificationCoverageNote ?? (locale === "zh"
        ? specificationCoverage === "official-complete"
          ? "已逐项转录当前引用官方规格页公开的参数；版本变化仍以来源页为准。"
          : specificationCoverage === "family-summary"
            ? "当前记录仍是产品系列或平台摘要，不能替代系列内具体型号的数据表。"
            : specificationCoverage === "capability-only"
              ? "厂商当前公开材料以功能或平台能力为主，不具备完整型号参数表。"
              : "已收录部分可核对参数，尚未完成当前官方规格表的逐项转录。"
        : specificationCoverage === "official-complete"
          ? "Every parameter published in the currently cited official specification page has been transcribed; the source page remains authoritative for later revisions."
          : specificationCoverage === "family-summary"
            ? "This remains a product-family or platform summary and does not replace model-specific datasheets."
            : specificationCoverage === "capability-only"
              ? "Current manufacturer material describes capabilities rather than a complete model specification table."
              : "Some verifiable parameters are indexed, but the current official specification table has not yet been transcribed in full."),
    },
  };
};

const standaloneProductCache = new Map<Locale, FinderExpansionRecord[]>();
export const getStandaloneRepositoryProductRecords = (locale: Locale) => {
  const cached = standaloneProductCache.get(locale);
  if (cached) return cached.slice();
  const records = getRepositoryProductRecords(locale).map((record) => applyReadySourceWork(enrichProductImageSupplement20261019(enrichStandaloneProductRecord(record, locale), locale),locale));
  const productByRouteSlug = new Map<string, FinderExpansionRecord>();

  for (const record of records) {
    const slug = repositoryProductSlug(record.id);
    const existing = productByRouteSlug.get(slug);
    if (existing && existing.id !== record.id) {
      throw new Error(`Repository product route collision: ${existing.id} and ${record.id} both resolve to ${slug}`);
    }
    productByRouteSlug.set(slug, record);
  }

  const result = [...productByRouteSlug.values()];
  standaloneProductCache.set(locale, result);
  return result.slice();
};

const standaloneCompanyProductCache = new Map<Locale, Map<string, FinderExpansionRecord[]>>();
export function getStandaloneRepositoryCompanyProductRecords(slug: string, locale: Locale): FinderExpansionRecord[] {
  if (!standaloneCompanyProductCache.has(locale)) {
    const grouped = new Map<string, FinderExpansionRecord[]>();
    for (const record of getStandaloneRepositoryProductRecords(locale)) {
      const products = grouped.get(record.profile.slug) ?? [];
      products.push(record);
      grouped.set(record.profile.slug, products);
    }
    standaloneCompanyProductCache.set(locale, grouped);
  }
  return standaloneCompanyProductCache.get(locale)!.get(slug)?.slice() ?? [];
}

function getRobotRepositoryProductRecords(locale: Locale): FinderExpansionRecord[] {
  const precisionRecords = getPrecisionProductRecords(locale);
  const precisionIds = new Set(precisionRecords.map((record) => record.id));
  const deepCompanySlugSet = new Set(deepResearchCompanySlugs);
  const records = [
    ...getMatrixProductRecords(locale),
    ...getPhaseOneProductRecords(locale),
    ...getProductFinderExpansionRecords(locale).filter((record) => !precisionIds.has(record.id)),
    ...precisionRecords,
  ].filter((record) => (
    !deepCompanySlugSet.has(record.profile.slug)
    && !["onrobot", "robotiq", "ouster"].includes(record.profile.slug)
    && !isWaveSixCompanySlug(record.profile.slug)
    && !isWaveSevenCompanySlug(record.profile.slug)
    && !isWaveEightCompanySlug(record.profile.slug)
    && !isWaveNineCompanySlug(record.profile.slug)
    && !isWaveTenCompanySlug(record.profile.slug)
    && !isWaveElevenCompanySlug(record.profile.slug)
    && !isWaveTwelveCompanySlug(record.profile.slug)
    && !isWaveThirteenCompanySlug(record.profile.slug)
    && !isWaveFourteenCompanySlug(record.profile.slug)
  ));

  records.push(...getDeepProductRecords(locale).filter((record) => !isWaveFourteenCompanySlug(record.profile.slug)));
  const patchedRecords = mergeRepositoryProductRecords(records)
    .map((record) => applyVerifiedProductPatch(record, locale))
    .map((record) => applyRoboteraProductPatch(record, locale));

  const limxCompany = getRepositoryCompanies(locale).find((company) => company.slug === "limx-dynamics");
  if (!limxCompany) throw new Error("Verified product patch requires the LimX Dynamics company profile");
  const roboteraCompany = getRepositoryCompanies(locale).find((company) => company.slug === "robotera");
  if (!roboteraCompany) throw new Error("Verified product patch requires the ROBOTERA company profile");
  const onRobotCompany = getRepositoryCompanies(locale).find((company) => company.slug === "onrobot");
  if (!onRobotCompany) throw new Error("Verified product patch requires the OnRobot company profile");
  const robotiqCompany = getRepositoryCompanies(locale).find((company) => company.slug === "robotiq");
  if (!robotiqCompany) throw new Error("Verified product patch requires the Robotiq company profile");
  const ousterCompany = getRepositoryCompanies(locale).find((company) => company.slug === "ouster");
  if (!ousterCompany) throw new Error("Verified product patch requires the Ouster company profile");
  const waveSixCompanies = getRepositoryCompanies(locale).filter((company) => (
    waveSixCompanySlugs.includes(company.slug as typeof waveSixCompanySlugs[number])
  ));
  if (waveSixCompanies.length !== waveSixCompanySlugs.length) {
    throw new Error("Verified wave-six product patches require all wave-six company profiles");
  }
  const waveSevenCompanies = getRepositoryCompanies(locale).filter((company) => (
    waveSevenCompanySlugs.includes(company.slug as typeof waveSevenCompanySlugs[number])
  ));
  if (waveSevenCompanies.length !== waveSevenCompanySlugs.length) {
    throw new Error("Verified wave-seven product patches require all wave-seven company profiles");
  }
  const waveEightCompanies = getRepositoryCompanies(locale).filter((company) => (
    waveEightCompanySlugs.includes(company.slug as typeof waveEightCompanySlugs[number])
  ));
  if (waveEightCompanies.length !== waveEightCompanySlugs.length) {
    throw new Error("Verified wave-eight product patches require all wave-eight company profiles");
  }
  const waveNineCompanies = getRepositoryCompanies(locale).filter((company) => (
    waveNineCompanySlugs.includes(company.slug as typeof waveNineCompanySlugs[number])
  ));
  if (waveNineCompanies.length !== waveNineCompanySlugs.length) {
    throw new Error("Verified wave-nine product patches require all wave-nine company profiles");
  }
  const waveTenCompanies = getRepositoryCompanies(locale).filter((company) => (
    waveTenCompanySlugs.includes(company.slug as typeof waveTenCompanySlugs[number])
  ));
  if (waveTenCompanies.length !== waveTenCompanySlugs.length) {
    throw new Error("Verified wave-ten product patches require all wave-ten company profiles");
  }
  const waveElevenCompanies = getRepositoryCompanies(locale).filter((company) => (
    waveElevenCompanySlugs.includes(company.slug as typeof waveElevenCompanySlugs[number])
  ));
  if (waveElevenCompanies.length !== waveElevenCompanySlugs.length) {
    throw new Error("Verified wave-eleven product patches require all wave-eleven company profiles");
  }
  const waveTwelveCompanies = getRepositoryCompanies(locale).filter((company) => (
    waveTwelveCompanySlugs.includes(company.slug as typeof waveTwelveCompanySlugs[number])
  ));
  if (waveTwelveCompanies.length !== waveTwelveCompanySlugs.length) {
    throw new Error("Verified wave-twelve product patches require all wave-twelve company profiles");
  }
  const waveThirteenCompanies = getRepositoryCompanies(locale).filter((company) => (
    waveThirteenCompanySlugs.includes(company.slug as typeof waveThirteenCompanySlugs[number])
  ));
  if (waveThirteenCompanies.length !== waveThirteenCompanySlugs.length) {
    throw new Error("Verified wave-thirteen product patches require all wave-thirteen company profiles");
  }
  const waveFourteenCompanies = getRepositoryCompanies(locale).filter((company) => (
    waveFourteenCompanySlugs.includes(company.slug as typeof waveFourteenCompanySlugs[number])
  ));
  if (waveFourteenCompanies.length !== waveFourteenCompanySlugs.length) {
    throw new Error("Verified wave-fourteen product patches require all wave-fourteen company profiles");
  }
  const combined = [
    ...patchedRecords,
    ...getVerifiedAdditionalProductRecords(locale, limxCompany),
    ...getRoboteraAdditionalProductRecords(locale, roboteraCompany),
    ...getOnRobotProductRecords(locale, onRobotCompany),
    ...getRobotiqProductRecords(locale, robotiqCompany),
    ...getOusterProductRecords(locale, ousterCompany),
    ...getVerifiedWaveSixProductRecords(locale, waveSixCompanies),
    ...getVerifiedWaveSevenProductRecords(locale, waveSevenCompanies),
    ...getVerifiedWaveEightProductRecords(locale, waveEightCompanies),
    ...getVerifiedWaveNineProductRecords(locale, waveNineCompanies),
    ...getVerifiedWaveTenProductRecords(locale, waveTenCompanies),
    ...getVerifiedWaveElevenProductRecords(locale, waveElevenCompanies),
    ...getVerifiedWaveTwelveProductRecords(locale, waveTwelveCompanies),
    ...getVerifiedWaveThirteenProductRecords(locale, waveThirteenCompanies),
    ...getVerifiedWaveFourteenProductRecords(locale, waveFourteenCompanies),
    ...getVerifiedWaveFifteenProductRecords(locale, getRepositoryCompanies(locale)),
  ];

  return combined;
}

const productIdentityUrl = (value = '') => {
  try {
    const url = new URL(value);
    // Keep query parameters and fragments: selectors can identify separate SKUs.
    url.pathname = url.pathname.replace(/\/+$/, '') || '/';
    // Bota's older category-qualified links retain the same product slug and ID.
    if (url.hostname === 'shop.botasys.com') {
      url.pathname = url.pathname.replace(/^\/shop\/force-torque-sensors-4\/(?=[^/]+-\d+$)/, '/shop/');
    }
    return url.href;
  } catch {
    return value.trim();
  }
};

const productOrderingIdentity = (record: FinderExpansionRecord) => {
  const labels = /^(?:(?:kit\s+)?sku|(?:(?:ordering|order)\s+)?(?:article|part|item|material|product)\s+(?:number|no\.?|code|id|identifier)|(?:ordering|order)\s+(?:number|no\.?|code|id|identifier)|订货标识|订货号|订购号|订货代码|料号|物料号|零件号|商品编号|产品编号|套件\s*SKU)$/i;
  return [...new Set(record.parameters.filter(field => field.status !== 'unknown'
    && [field.label, ...(field.labelAliases ?? [])].some(label => labels.test(label.trim())))
    .map(field => field.value.trim()).filter(Boolean))].sort().join('\u0000');
};

const productDocumentUrl = (value: string) => {
  try { return /\.pdf$/i.test(new URL(value).pathname); } catch { return false; }
};

export function mergeRepositoryProductRecords(
  baseRecords: FinderExpansionRecord[],
  enrichmentRecords: FinderExpansionRecord[] = [],
): FinderExpansionRecord[] {
  type Entry = { record: FinderExpansionRecord; preserveId: boolean };
  const byId = new Map<string, Entry>();
  const byName = new Map<string, Entry[]>();
  for (const [records, preserveId] of [[baseRecords, false], [enrichmentRecords, true]] as const) {
    for (const record of records) {
      const existing = byId.get(record.id)?.record;
      if (existing) {
        const previousSku = productOrderingIdentity(existing);
        const nextSku = productOrderingIdentity(record);
        if (existing.profile.slug !== record.profile.slug || (previousSku && nextSku && previousSku !== nextSku)) {
          throw new Error(`Repository product identity conflict: ${record.id}`);
        }
      }
      // An explicit stable ID can update its title or official citation, not its SKU.
      byId.set(record.id, { record, preserveId });
    }
  }
  for (const entry of byId.values()) {
    const { record } = entry;
    const key = JSON.stringify([record.profile.slug || record.company.toLowerCase(), record.product.toLowerCase()]);
    const entries = byName.get(key) ?? [];
    entries.push(entry);
    byName.set(key, entries);
  }

  const result: FinderExpansionRecord[] = [];
  for (const entries of byName.values()) {
    if (entries.length === 1) { result.push(entries[0].record); continue; }
    const identities = entries.map(entry => {
      const url = productIdentityUrl(entry.record.officialUrl);
      const sku = productOrderingIdentity(entry.record);
      const matrixSummary = entry.record.matrixSlug && entry.record.id.startsWith(`${entry.record.matrixSlug}-`)
        && entry.record.evidence?.specificationKind === 'capabilities'
        && entry.record.parameters.every(field => field.status === 'unknown');
      const phaseOneSummary = entry.record.id.startsWith('phase-one-') && !entry.record.evidence
        && entry.record.parameters.length === 2
        && entry.record.parameters.every(field => !field.sourceUrl)
        && entry.record.parameters.some(field => /^(?:Catalog level|产品层级)$/.test(field.label) && field.status === 'manufacturer')
        && entry.record.parameters.some(field => /^(?:Model specifications|型号参数)$/.test(field.label) && field.status === 'unknown');
      const enterpriseSummary = entry.record.id.startsWith('catalog-ai-')
        && entry.record.evidence?.specificationKind === 'capabilities'
        && entry.record.parameters.every(field => !field.sourceUrl);
      const summary = !sku && (matrixSummary || phaseOneSummary || enterpriseSummary || !url || url.includes('*') || url === productIdentityUrl(entry.record.profile.officialUrl));
      return { ...entry, url, sku, summary };
    });
    const skusByUrl = new Map<string, Set<string>>();
    const scopesByUrl = new Map<string, Set<string>>();
    for (const { record, url, sku, summary } of identities) {
      if (!summary && record.evidence?.level) {
        const scopes = scopesByUrl.get(url) ?? new Set<string>();
        scopes.add(record.evidence.level === 'family' ? 'family' : 'product');
        scopesByUrl.set(url, scopes);
      }
      if (!sku) continue;
      const skus = skusByUrl.get(url) ?? new Set<string>();
      skus.add(sku);
      skusByUrl.set(url, skus);
    }
    const identityKey = ({ record, url, sku }: typeof identities[number]) => {
      const knownSkus = skusByUrl.get(url);
      const knownScopes = scopesByUrl.get(url);
      // Missing legacy scope is not evidence of a model separate from its family.
      // Only inherit it when the same official page has one explicit scope.
      const scope = record.evidence?.level
        ? record.evidence.level === 'family' ? 'family' : 'product'
        : sku ? 'product' : knownScopes?.size === 1 ? [...knownScopes][0] : knownScopes?.size ? 'unspecified' : 'product';
      return JSON.stringify([scope, url, sku || (knownSkus?.size === 1 ? [...knownSkus][0] : ''),
        productDocumentUrl(url) && !sku ? record.id : '']);
    };
    const details = identities.filter(entry => !entry.summary);
    const aliases = new Map<typeof identities[number], string>();
    for (const entry of identities) {
      if (entry.preserveId || entry.summary || !entry.url) continue;
      const legacySeed = !entry.sku && /^(?:phase-one-|deep-|sku-)/.test(entry.record.id)
        && !entry.record.parameters.some(field => field.sourceUrl);
      // Legacy seed rows lack field citations. A successor must explicitly cite
      // their product page; a shared name or company-wide source is insufficient.
      // A datasheet is not a product identity. Require an explicit citation back
      // to the old page or an equal known SKU, even when there is one candidate.
      const targets = new Set(details.filter(candidate => candidate !== entry
        && candidate.record.parameters.some(field => field.sourceUrl)
        && (!entry.record.evidence?.level || !candidate.record.evidence?.level
          || (entry.record.evidence.level === 'family') === (candidate.record.evidence.level === 'family'))
        && ((legacySeed && (candidate.url === entry.url || candidate.record.parameters.some(field =>
          field.sourceUrl && productIdentityUrl(field.sourceUrl) === entry.url)))
          || (details.length === 2 && candidate.preserveId && !productDocumentUrl(entry.url) && productDocumentUrl(candidate.url)
            && (entry.sku ? entry.sku === candidate.sku : candidate.record.parameters.some(field =>
              field.sourceUrl && productIdentityUrl(field.sourceUrl) === entry.url)))))
        .map(identityKey));
      if (targets.size === 1) aliases.set(entry, [...targets][0]);
    }
    const detailedKeys = new Set(identities.filter(entry => !entry.summary && !aliases.has(entry)).map(identityKey));
    const merged = new Map<string, { record: FinderExpansionRecord; summary: boolean }>();
    for (const entry of identities) {
      // A company-level summary can inherit a route only when its target is unique.
      // Family pages and separate ordering URLs are not interchangeable summaries.
      const summary = entry.summary || aliases.has(entry);
      const key = aliases.get(entry) ?? (entry.summary && detailedKeys.size === 1 ? [...detailedKeys][0] : identityKey(entry));
      const existing = merged.get(key);
      if (summary && existing && !existing.summary) continue;
      const record = existing && entry.preserveId ? { ...entry.record, id: existing.record.id } : entry.record;
      merged.set(key, { record, summary });
    }
    result.push(...[...merged.values()].map(entry => entry.record));
  }
  const ids = new Set<string>();
  for (const record of result) {
    if (ids.has(record.id)) throw new Error(`Repository product identity conflict: ${record.id}`);
    ids.add(record.id);
  }
  return result;
}

const productRecordCache = new Map<Locale, FinderExpansionRecord[]>();
export function getRepositoryProductRecords(locale: Locale): FinderExpansionRecord[] {
  const cached = productRecordCache.get(locale);
  if (cached) return cached.slice();
  const result = mergeRepositoryProductRecords(
    [...getRobotRepositoryProductRecords(locale), ...getEnterpriseAiProductRecords(locale)],
    getCatalogEnrichmentProducts(locale, getRepositoryCompanies(locale)),
  );
  productRecordCache.set(locale, result);
  return result.slice();
}

type CompanyResearchEvidence = Pick<NonNullable<FinderExpansionRecord['evidence']>, 'companyTimeline' | 'fundingRounds' | 'investmentView'>;
const companyResearchCache = new Map<Locale, Map<string, CompanyResearchEvidence>>();

export function getRepositoryCompanyResearchEvidence(slug: string, locale: Locale): CompanyResearchEvidence {
  if (!companyResearchCache.has(locale)) {
    const grouped = new Map<string, CompanyResearchEvidence>();
    for (const record of getRepositoryProductRecords(locale)) {
      const key = record.profile.slug;
      const evidence = grouped.get(key) ?? { companyTimeline: [], fundingRounds: [], investmentView: [] };
      evidence.companyTimeline!.push(...(record.evidence?.companyTimeline ?? []));
      evidence.fundingRounds!.push(...(record.evidence?.fundingRounds ?? []));
      evidence.investmentView!.push(...(record.evidence?.investmentView ?? []));
      grouped.set(key, evidence);
    }
    for (const [key, evidence] of grouped) {
      evidence.companyTimeline!.push(...getCatalogCompanyTimeline(key, locale));
      evidence.fundingRounds!.push(...getCatalogCompanyFunding(key, locale));
      evidence.investmentView!.push(...getCatalogCompanyInvestmentView(key, locale));
      // Conflicting company-history claims stay in the review and assessment,
      // not in the confirmed financing chronology inherited by older products.
      const conflictedFunding = (date: string, label: string, sourceUrl: string) => key === 'inspire-robots'
        && date === '2025' && /pre[-\s]*(?:series\s*)?a\+/i.test(label)
        && sourceUrl === 'https://www.inspire-robots.com/about%20us/profile/';
      evidence.companyTimeline = [...new Map(evidence.companyTimeline!
        .filter(event => !conflictedFunding(event.date, event.title, event.sourceUrl))
        .map(event => [`${event.date}:${event.title}:${event.sourceUrl}`, event])).values()]
        .sort((a, b) => a.date.localeCompare(b.date));
      evidence.fundingRounds = [...new Map(evidence.fundingRounds!
        .filter(round => !conflictedFunding(round.date, round.round, round.sourceUrl))
        .map(round => [`${round.date}:${round.round}:${round.amount}:${round.sourceUrl}`, round])).values()]
        .sort((a, b) => a.date.localeCompare(b.date));
      evidence.investmentView = [...new Set(evidence.investmentView)];
    }
    companyResearchCache.set(locale, grouped);
  }
  return companyResearchCache.get(locale)!.get(slug) ?? {};
}

export function getJeelingProductRecords(locale: Locale): FinderExpansionRecord[] {
  const companyBySlug = new Map(
    getStandaloneRepositoryCompanies(locale)
      .map((company) => [company.slug, company]),
  );

  return getStandaloneRepositoryProductRecords(locale)
    .filter((record) => record.category !== "enterprise-ai" && companyBySlug.get(record.profile.slug)?.industry !== "ai")
    .map((record) => {
      const company = companyBySlug.get(record.profile.slug);
      if (!company) throw new Error(`Jeeling product company is missing from the metadata repository: ${record.profile.slug}`);
      return {
        ...record,
        company: company.name,
        profile: toFinderProfile(company),
        evidence: record.evidence ? { ...record.evidence, ...getRepositoryCompanyResearchEvidence(company.slug, locale) } : record.evidence,
      };
    });
}

export function getRepositoryProduct(slug: string, locale: Locale) {
  const record = getRepositoryProductRecords(locale).find((item) => repositoryProductSlug(item.id) === slug);
  return record ? { ...record, slug: repositoryProductSlug(record.id) } : undefined;
}

export function getCompanyFinancialDisclosure(slug: string, locale: Locale): FinancialDisclosure {
  return mergeFinancialDisclosure(slug, locale, financialDisclosureBySlug[slug]?.[locale]) ?? {
    status: "not-reviewed",
    checkedAt: "",
    note: locale === "zh"
      ? "暂未收录该公司的定期财务报告入口；这不等于不存在公开报告。"
      : "Periodic financial-report links have not yet been added for this company; this does not mean no public report exists.",
    reports: [],
  };
}

export const getRepositoryProductPath = (id: string, locale: Locale) => `${locale === "en" ? "/en" : ""}/products/${repositoryProductSlug(id)}`;

export const getStandaloneRepositoryPath = (locale: Locale) => `${locale === "en" ? "/en" : ""}/repository`;

export const getStandaloneRepositoryCompanyPath = (slug: string, locale: Locale) =>
  `${getStandaloneRepositoryPath(locale)}/companies/${slug}`;

export const getStandaloneRepositoryProductPath = (id: string, locale: Locale) =>
  `${getStandaloneRepositoryPath(locale)}/products/${repositoryProductSlug(id)}`;
