import type { CompanyProfile } from "./catalog";
import type { FinderCategory, FinderEvidence, FinderExpansionRecord, FinderParameter, FinderUseCase } from "./product-finder-demo";
import type { Locale } from "../site";
import { paxiniProductContent } from "./paxini-product-details";
import { galbotProductContent } from "./galbot-product-details";
import { linkerBotProductContent } from "./linkerbot-product-details";
import { aheadFormProductContent } from "./aheadform-product-details";
import { tarsProductContent } from "./tars-product-details";
import { unitreeProductContent } from "./unitree-product-details";

type Text = { zh: string; en: string };
type Link = { label: Text; url: string };
type Metric = { label: Text; value: Text };
export type CompanyHistoryKind = "founding" | "product" | "funding" | "business";
type Milestone = { date: string; title: Text; detail: Text; sourceUrl: string; kind?: CompanyHistoryKind };
type FundingRound = { date: string; round: Text; amount: Text; investors: Text; sourceUrl: string };

type DeepProductSeed = {
  id: string;
  companySlug: string;
  name: string;
  nameEn?: string;
  primary: string;
  subclass: string;
  category: FinderCategory;
  type: Text;
  summary: Text;
  overview?: Text[];
  highlights?: Array<{ title: Text; detail: Text }>;
  variants?: Array<{ series: Text; model: string; form: Text; dimensions: string }>;
  applications: Text[];
  parameters: Metric[];
  officialUrl: string;
  imageUrl?: string;
  imageSourceUrl?: string;
  imageCredit?: Text;
  level?: FinderEvidence["level"];
  specificationKind?: FinderEvidence["specificationKind"];
  specificationCoverage?: FinderEvidence["specificationCoverage"];
  useCases?: FinderUseCase[];
  integration?: Text;
  verification?: Text;
  sourceLinks?: Link[];
};

type DeepCompanySeed = {
  slug: string;
  name: Text;
  englishName: string;
  legalName: Text;
  industry: "robotics" | "dexterous-hands";
  country: Text;
  headquarters: Text;
  founded: Text;
  officialUrl: string;
  role: Text;
  positioning: Text;
  overview: Text[];
  businessAreas: Text[];
  customerGroups: Text[];
  strengths: Text[];
  fit: Text[];
  verification: Text;
  questions: Text[];
  catalogScope: Text;
  heroImage: string;
  heroImageAlt: Text;
  heroImageSourceUrl: string;
  heroImageCredit: Text;
  investmentView: Text[];
  milestones: Milestone[];
  fundingRounds: FundingRound[];
  sourceLinks: Link[];
  reviewedAt: string;
};

const text = (zh: string, en: string): Text => ({ zh, en });
const pick = (locale: Locale, value: Text) => value[locale];
const metric = (zh: string, en: string, value: string, valueEn = value): Metric => ({ label: text(zh, en), value: text(value, valueEn) });

const images = {
  tarsA1: "https://n.sinaimg.cn/spider20260311/257/w1080h777/20260311/748c-121a83c04805f78de044667a05b4d2b5.png",
  paxiniDex: "https://cdn-cn.paxini.com/official/images/dex/dex-h13-1.png",
  paxiniGen3: "https://paxini.com/images/Gen3/banner.webp",
  paxiniRobot: "https://cdn-cn.paxini.com/official/images/home/20240817005.png",
  galbotG1: "https://developer.galbot.com/assets/images/product-overview-9b9a81066d18fbf216987712d4d80214.png",
  galbotS1: "https://developer.galbot.com/assets/images/37a50e162c69a5ddc737abf8e133a37fd05fee66ed05bd7c4240e2072889fa9a-2c2d781c67c2dc3187d658a22abcf3fc.jpg",
  unitreeG1: "https://www.unitree.com/images/eec8d82f279b440ea170982ffa80b3fa_3840x2160.jpg?x-oss-process=image/quality,q_60/format,webp",
  unitreeGo2: "https://www.unitree.com/images/382c851410194e098c12d816caf8b90d_3840x2146.jpg",
  unitreeB2: "https://www.unitree.com/images/70b658bf760f4e1a93645f90cc993e3c_1529x883.png",
  linkerL30: "https://botdata.oss-cn-beijing.aliyuncs.com/afterSales/linkerbot_img/products/linkerhand-l30/detail-2.png",
  linkerO6: "https://botdata.oss-cn-beijing.aliyuncs.com/afterSales/linkerbot_img/products/linkerhand-o6/detail-2.png",
};

const companies: DeepCompanySeed[] = [
  {
    slug: "tars-robotics",
    name: text("它石智航", "TARS Robotics"),
    englishName: "TARS Robotics",
    legalName: text("上海它石智航技术有限公司", "Shanghai TARS Robotics Technology Co., Ltd."),
    industry: "robotics",
    country: text("中国", "China"),
    headquarters: text("上海", "Shanghai"),
    founded: text("2025 年", "2025"),
    officialUrl: "https://www.tars-ai.com/",
    role: text("通用具身机器人、本体与模型研发公司", "General-purpose embodied-robot, body, and model developer"),
    positioning: text("它石智航同时公开了 A 系列轮式机器人、T 系列双足机器人、具身模型、数据采集设备与末端执行器方向。", "TARS publicly presents A-series wheeled robots, T-series biped robots, embodied models, data-capture hardware, and end effectors."),
    overview: [
      text("公司成立于 2025 年，公开路线不是单一整机，而是把本体、具身模型、遥操作数据采集和末端执行器放在同一研发体系中。", "Founded in 2025, the company presents a stack spanning robot bodies, embodied models, teleoperation data capture, and end effectors rather than a single robot product."),
      text("A1 的公开演示聚焦工业线束装配，T1 属于双足通用机器人平台。两者均处于需要继续核对量产版本、交付配置和连续工况证据的阶段。", "Public A1 demonstrations focus on industrial harness assembly, while T1 is a biped general-purpose robot platform. Both still require version, delivery-configuration, and continuous-duty verification."),
      text("投资研究应把高额早期融资、核心团队履历和公开演示，与收入、订单、毛利、客户集中度及量产良率分开看待；后几项尚无同等强度的公开证据。", "Investment research should separate large early-stage funding, team credentials, and public demonstrations from revenue, orders, margins, customer concentration, and production yield, for which equally strong public evidence is not yet available."),
    ],
    businessAreas: [text("A 系列轮式与 T 系列双足机器人", "A-series wheeled and T-series biped robots"), text("AWE 具身模型与 OmniVTA 视觉触觉模型", "AWE embodied models and OmniVTA vision-tactile models"), text("SenseHub 数据采集和多指末端执行器", "SenseHub data capture and multi-finger end effectors")],
    customerGroups: [text("工业装配与精密操作试点", "Industrial assembly and precision-manipulation pilots"), text("具身模型、遥操作与数据闭环研发团队", "Embodied-model, teleoperation, and data-loop R&D teams"), text("需要软硬件联合验证的机器人集成方", "Robot integrators requiring joint hardware-software validation")],
    strengths: [text("本体、模型、感知和数据链路的纵向研发布局", "Vertically integrated body, model, perception, and data stack"), text("A1 已公开展示精密线束装配任务", "A1 has publicly demonstrated precision harness assembly")],
    fit: [text("工业精密操作验证", "Industrial precision-manipulation validation"), text("具身模型与数据采集研究", "Embodied-model and data-capture research")],
    verification: text("T1 和 A1 的量产状态、关键参数、标准接口、任务成功率、连续运行、故障恢复和实际交付规模。", "Production status, key specifications, standard interfaces, task success rate, continuous operation, recovery, and actual delivery scale for T1 and A1."),
    questions: [text("当前可签约交付的是 T1、A1 的哪一硬件版本？", "Which T1 or A1 hardware revision is currently contract-deliverable?"), text("AWE 3.0、OmniVTA 与机器人控制栈的开放接口和许可边界是什么？", "What are the API and licensing boundaries between AWE 3.0, OmniVTA, and the robot control stack?"), text("公开演示中的对象集、成功率、节拍和人工接管比例能否复测？", "Can the demonstrated object set, success rate, cycle time, and human-takeover rate be reproduced?")],
    catalogScope: text("覆盖官网和公开发布材料中可辨认的两款整机、三类末端/手部硬件、SenseHub 及两项模型/数据工具；未把内部原型或未命名部件计为独立产品。", "Covers two identifiable robot platforms, three hand/end-effector hardware lines, SenseHub, and two model/data tools named in official or public launch material; unnamed internal prototypes are excluded."),
    heroImage: images.tarsA1,
    heroImageAlt: text("它石智航 A1 机器人公开展示", "TARS A1 robot public demonstration"),
    heroImageSourceUrl: "https://finance.sina.com.cn/cj/2026-05-29/doc-inhzpwvq7949805.shtml",
    heroImageCredit: text("新浪财经公开报道中的 A1 图片", "A1 image from a Sina Finance public report"),
    investmentView: [text("公司处于融资密集的早期扩张期，融资速度说明资本关注度高，但不能替代订单、收入和量产质量证据。", "The company is in an early, funding-intensive expansion phase. Funding velocity signals investor attention but does not substitute for order, revenue, or manufacturing-quality evidence."), text("目前更适合按“技术与产品验证期”评估：关注 A1/T1 的可交付版本、模型与本体耦合程度，以及工业任务能否跨对象、跨工位复现。", "It is better assessed as being in a technology-and-product validation phase: focus on deliverable A1/T1 versions, model-body integration, and whether industrial tasks reproduce across objects and workcells.")],
    milestones: [
      { date: "2025-02", title: text("公司成立", "Company founded"), detail: text("在上海成立，公开定位为 AI 驱动的具身智能公司。", "Founded in Shanghai as an AI-driven embodied-intelligence company."), sourceUrl: "https://www.robothub.app/zh/companies/homestone-intelligence" },
      { date: "2025-03", title: text("天使轮", "Angel round"), detail: text("披露 1.2 亿美元融资。", "Reported a USD 120 million angel round."), sourceUrl: "https://finance.sina.com.cn/cj/2026-05-29/doc-inhzpwvq7949805.shtml" },
      { date: "2025-07", title: text("天使+轮", "Angel+ round"), detail: text("继续完成天使+轮融资。", "Completed a follow-on Angel+ round."), sourceUrl: "https://news.pedaily.cn/" },
      { date: "2026-03", title: text("AWE 3.0 与 A1 演示", "AWE 3.0 and A1 demonstration"), detail: text("公开模型与机器人产品栈，并展示 A1 精密线束装配。", "Presented its model-and-robot stack and demonstrated A1 precision harness assembly."), sourceUrl: "https://finance.sina.com.cn/cj/2026-05-29/doc-inhzpwvq7949805.shtml" },
      { date: "2026-04", title: text("Pre-A 轮", "Pre-Series A"), detail: text("完成 4.55 亿美元 Pre-A 轮融资。", "Reported a USD 455 million Pre-Series A round."), sourceUrl: "https://www.robothub.app/zh/companies/homestone-intelligence" },
    ],
    fundingRounds: [
      { date: "2025-03", round: text("天使轮", "Angel"), amount: text("1.2 亿美元（公开口径）", "USD 120M (reported)"), investors: text("启明创投、线性资本、蓝驰创投、襄禾资本、洪泰基金", "Qiming Venture Partners, Linear Capital, BlueRun Ventures, Xiang He Capital, Hongtai Fund"), sourceUrl: "https://finance.sina.com.cn/cj/2026-05-29/doc-inhzpwvq7949805.shtml" },
      { date: "2025-07", round: text("天使+轮", "Angel+"), amount: text("1.22 亿美元（公开口径）", "USD 122M (reported)"), investors: text("原有投资方继续参与", "Existing investors participated"), sourceUrl: "https://www.robothub.app/zh/companies/homestone-intelligence" },
      { date: "2026-04", round: text("Pre-A 轮", "Pre-Series A"), amount: text("4.55 亿美元（公开口径）", "USD 455M (reported)"), investors: text("高瓴创投、红杉中国、美团战投联合领投等", "Co-led by GL Ventures, HongShan, and Meituan Strategic Investment, among others"), sourceUrl: "https://www.robothub.app/zh/companies/homestone-intelligence" },
    ],
    sourceLinks: [{ label: text("公司官网", "Official website"), url: "https://www.tars-ai.com/" }, { label: text("RobotHub 公司页", "RobotHub profile"), url: "https://www.robothub.app/zh/companies/homestone-intelligence" }, { label: text("World-In-Your-Hands", "World-In-Your-Hands"), url: "https://github.com/tars-robotics/World-In-Your-Hands" }],
    reviewedAt: "2026-09-02",
  },
  {
    slug: "paxini",
    name: text("帕西尼", "PaXini"), englishName: "PaXini", legalName: text("帕西尼感知科技（深圳）有限公司", "PaXini Perception Technology (Shenzhen) Co., Ltd."),
    industry: "dexterous-hands", country: text("中国", "China"), headquarters: text("深圳", "Shenzhen"), founded: text("2021 年", "2021"), officialUrl: "https://paxini.com/cn/",
    role: text("多维触觉、力觉、灵巧手与机器人平台厂商", "Multidimensional tactile, force, dexterous-hand, and robot-platform vendor"),
    positioning: text("产品链从触觉单元和六维力传感器延伸到灵巧手、数据采集设备、数据库与移动双臂机器人。", "Its product chain extends from tactile cells and six-axis force sensors to dexterous hands, data-capture devices, databases, and mobile dual-arm robots."),
    overview: [text("帕西尼成立于 2021 年，以多维触觉感知为核心，当前官网目录横跨传感器、灵巧手、数据采集生态和人形/移动操作平台。", "Founded in 2021, PaXini centers on multidimensional tactile perception and currently spans sensors, dexterous hands, data capture, and mobile-manipulation platforms."), text("公开资料的优势是型号和指标较多，尤其是 PX6AX、PX3Q、PX6D、DexH13 与 GMH18；但实验室指标、量产一致性和客户现场指标应分开核验。", "Its public material is relatively specification-rich, particularly for PX6AX, PX3Q, PX6D, DexH13, and GMH18, but laboratory figures, production consistency, and customer-site performance should be evaluated separately."), text("投资层面可观察其从零部件向整机与数据平台扩展的协同，也要关注产品跨度增加后的研发投入、销售周期、库存和交付复杂度。", "For investors, the key question is whether expansion from components to robots and data platforms creates synergy or instead increases R&D intensity, sales cycles, inventory, and delivery complexity.")],
    businessAreas: [text("ITPU 多维触觉与力觉传感", "ITPU multidimensional tactile and force sensing"), text("灵巧手与遥操作数据采集", "Dexterous hands and teleoperation data capture"), text("移动双臂机器人与全模态数据库", "Mobile dual-arm robots and multimodal datasets")],
    customerGroups: [text("机器人本体与灵巧手研发团队", "Robot-body and dexterous-hand developers"), text("工业装配、物流与康养项目集成方", "Industrial assembly, logistics, and care integrators"), text("高校、研究机构和具身数据团队", "Universities, research institutes, and embodied-data teams")],
    strengths: [text("传感器到整机的数据链路覆盖", "Sensor-to-robot data-chain coverage"), text("官网公开参数较完整，便于前期选型", "Relatively detailed public specifications for early screening")],
    fit: [text("多维触觉和腕部力控", "Multidimensional tactile sensing and wrist force control"), text("灵巧手、遥操作和数据采集", "Dexterous hands, teleoperation, and data capture")],
    verification: text("实验室参数的测试条件、不同型号和批次的一致性、标定维护、原始数据接口、整机连续运行和客户侧任务成功率。", "Test conditions behind laboratory figures, consistency across models and batches, calibration service, raw-data interfaces, robot continuous duty, and customer-side task success rates."),
    questions: [text("实验室指标对应哪个型号、量程和采样配置？", "Which model, range, and sampling configuration underlies each laboratory figure?"), text("传感器标定、漂移补偿和更换后的重标定由谁完成？", "Who owns calibration, drift compensation, and recalibration after replacement?"), text("灵巧手与 TORA 平台的量产版本、软件接口和现场维护包分别是什么？", "What are the production versions, software interfaces, and field-service packages for the hands and TORA platforms?")],
    catalogScope: text("覆盖官网主目录可见的 12 个产品系列，并保留仍可直接访问的 GMH18 产品页，共 13 条记录；同系列尺寸和量程变体合并为参数。", "Covers the 12 product families visible in the main official catalog plus the still-accessible GMH18 product page, for 13 records in total; size and range variants stay within one family record."),
    heroImage: images.paxiniDex, heroImageAlt: text("帕西尼 DexH13 多维触觉灵巧手", "PaXini DexH13 multidimensional tactile hand"), heroImageSourceUrl: "https://paxini.com/cn/dex/gen2", heroImageCredit: text("帕西尼官网产品图", "PaXini official product image"),
    investmentView: [text("帕西尼的核心观察点不是单一整机数量，而是触觉传感器能否形成稳定的量产收入和数据壁垒，并带动灵巧手与整机订单。", "The central investment question is not robot count alone but whether tactile sensors form durable production revenue and a data advantage that can pull through hand and robot orders."), text("多轮产业资本进入说明上下游协同受到关注；仍需用审计口径收入、客户集中度、应收账款、毛利和产能利用率验证商业质量。", "Repeated strategic investment indicates supply-chain interest, but business quality still requires audited revenue, customer concentration, receivables, gross margin, and capacity-utilization evidence.")],
    milestones: [
      { date: "2021-06", title: text("公司成立", "Company founded"), detail: text("在深圳注册成立，聚焦多维触觉感知。", "Incorporated in Shenzhen with a focus on multidimensional tactile sensing."), sourceUrl: "https://paxini.com/cn/about", kind: "founding" },
      { date: "2024-04", title: text("A 轮及 A1 轮", "Series A and A1"), detail: text("公开披露完成数亿元融资。", "Reported several hundred million RMB across Series A and A1."), sourceUrl: "https://news.pedaily.cn/202404/533289.shtml", kind: "funding" },
      { date: "2025-04", title: text("比亚迪战略投资", "BYD strategic investment"), detail: text("公司确认获得数亿元战略投资。", "The company confirmed a strategic investment of several hundred million RMB."), sourceUrl: "https://static.nfnews.com/content/202504/28/c11237421.html", kind: "funding" },
      { date: "2025-08", title: text("A 系列新一轮", "Additional Series A financing"), detail: text("公司披露四个月累计融资约 10 亿元。", "The company reported roughly RMB 1 billion raised over four months."), sourceUrl: "https://www.stcn.com/article/detail/2950159.html", kind: "funding" },
      { date: "2026", title: text("GMH18 与新一代触觉产品", "GMH18 and new tactile products"), detail: text("官网产品线更新到 GMH18 和 GEN4。", "The official catalog expanded to GMH18 and GEN4."), sourceUrl: "https://paxini.com/cn/dex/gen3", kind: "product" },
    ],
    fundingRounds: [
      { date: "2021-12", round: text("天使轮", "Angel"), amount: text("未披露", "Undisclosed"), investors: text("奇绩创坛", "MiraclePlus"), sourceUrl: "https://www.robothub.app/zh/companies/paxiniTech" },
      { date: "2022-12", round: text("Pre-A 轮", "Pre-Series A"), amount: text("未披露", "Undisclosed"), investors: text("启赋资本、浩方创投", "Qifu Capital and Hofan Venture Capital"), sourceUrl: "https://www.robothub.app/zh/companies/paxiniTech" },
      { date: "2023-08", round: text("Pre-A+ 轮", "Pre-Series A+"), amount: text("未披露", "Undisclosed"), investors: text("盈富泰克、光跃投资", "Infotech Ventures and Light Ray Capital"), sourceUrl: "https://www.robothub.app/zh/companies/paxiniTech" },
      { date: "2024-04", round: text("A 轮", "Series A"), amount: text("未披露；同期报道为数亿元", "Undisclosed; contemporary reports described several hundred million RMB"), investors: text("新奥资本、北汽产投、南山战新投、盈富泰克", "ENN Capital, BAIC Capital, Nanshan Strategic Emerging Industries Fund, and Infotech Ventures"), sourceUrl: "https://news.pedaily.cn/202404/533289.shtml" },
      { date: "2025-04", round: text("战略融资", "Strategic financing"), amount: text("约 0.99 亿元人民币（公开聚合口径）", "About RMB 99M (public aggregator figure)"), investors: text("比亚迪", "BYD"), sourceUrl: "https://static.nfnews.com/content/202504/28/c11237421.html" },
      { date: "2025-06", round: text("A+ 轮", "Series A+"), amount: text("未披露", "Undisclosed"), investors: text("TCL 创投、毅达资本、尚颀资本、基石资本等", "TCL Ventures, Addor Capital, SAIC Capital, Stone Capital, and others"), sourceUrl: "https://www.robothub.app/zh/companies/paxiniTech" },
      { date: "2025-08", round: text("A++ 轮", "Series A++"), amount: text("未单独披露；四个月累计融资超 10 亿元人民币", "Not separately disclosed; more than RMB 1B reported across four months"), investors: text("京东及多家产业、财务投资方", "JD.com and multiple strategic and financial investors"), sourceUrl: "https://www.stcn.com/article/detail/2950159.html" },
      { date: "2026-03", round: text("B 轮", "Series B"), amount: text("约 9.86 亿元人民币（公开报道）", "About RMB 986M (reported)"), investors: text("黄浦江资本、凯泰资本、信安资本等", "Huangpu River Capital, Cathay Capital, Xinan Capital, and others"), sourceUrl: "https://www.robothub.app/zh/companies/paxiniTech" },
    ],
    sourceLinks: [{ label: text("官网产品目录", "Official product catalog"), url: "https://paxini.com/cn/" }, { label: text("GMH18", "GMH18"), url: "https://paxini.com/cn/dex/gen3" }, { label: text("官方商城", "Official store"), url: "https://mall.paxini.com/" }, { label: text("融资汇总与来源入口", "Funding summary and source index"), url: "https://www.robothub.app/zh/companies/paxiniTech" }], reviewedAt: "2026-09-02",
  },
  {
    slug: "aheadform",
    name: text("首形科技", "AheadForm"),
    englishName: "AheadForm",
    legalName: text("官网未披露法定全称", "Legal entity name not stated on the official site"),
    industry: "robotics",
    country: text("中国", "China"),
    headquarters: text("北京、杭州（官网联系地址）", "Beijing and Hangzhou (official contact addresses)"),
    founded: text("官网未披露", "Not stated on the official site"),
    officialUrl: "https://www.aheadform.com/zh/products",
    role: text("超仿生仿人机器人与多模态交互研发公司", "Lifelike humanoid and multimodal-interaction developer"),
    positioning: text("首形科技公开产品以桌面级和全尺寸超仿生仿人机器人为主，重点是面部机构、仿生皮肤、视觉语音感知和人机交互，而不是工业搬运型人形机器人。", "AheadForm's public products center on desktop and full-size lifelike humanoids, emphasizing facial mechanisms, bionic skin, visual and speech perception, and human interaction rather than industrial material-handling humanoids."),
    overview: [
      text("官网将公司定位为高端超仿生仿人机器人开发者，并列出人工智能、大语言模型、机器人控制、表示学习、自监督学习和仿生皮肤等研发方向。", "The official site positions the company as a developer of high-end lifelike humanoids and lists AI, large language models, robot control, representation learning, self-supervised learning, and bionic skin among its R&D directions."),
      text("当前公开产品目录包含 Origin F1、Origin M1、精灵·铱、精灵·璇、精灵·璇 2.0、唐三藏和查派。公开页面对部分型号只给出定位，不能据此推断整机自由度、续航或量产状态。", "The current public catalog names Origin F1, Origin M1, Iris, Xuan, Xuan 2.0, Tang Sanzang, and Chappie. Some entries disclose positioning only, which is insufficient to infer full-body DoF, endurance, or production status."),
    ],
    businessAreas: [text("桌面级超仿生交互机器人", "Desktop lifelike interactive robots"), text("全尺寸超仿生仿人机器人", "Full-size lifelike humanoids"), text("面部运动、仿生皮肤与多模态交互", "Facial motion, bionic skin, and multimodal interaction")],
    customerGroups: [text("展陈、文旅、品牌交互和服务体验项目", "Exhibition, cultural-tourism, brand-interaction, and service-experience projects"), text("人机交互、情感表达和仿生机构研究团队", "Human-robot interaction, affective-expression, and biomimetic-mechanism researchers")],
    strengths: [text("面部表情机构与高拟真外观路线", "Facial-expression mechanisms and lifelike appearance"), text("视觉、语音与实体交互结合", "Combined visual, speech, and physical interaction")],
    fit: [text("重视面对面交互、角色表达和外观定制的场景", "Scenarios prioritizing face-to-face interaction, character expression, and appearance customization")],
    verification: text("应分别核对面部与全身自由度、交互延迟、皮肤耐久和维护、语音视觉边界、内容安全、隐私处理、可交付型号与量产状态。", "Verify facial and full-body DoF separately, interaction latency, skin life and service, speech and vision boundaries, content safety, privacy handling, deliverable models, and production status."),
    questions: [text("目标项目需要桌面头部交互，还是可移动的全尺寸本体？", "Does the project need a desktop head or a mobile full-size body?"), text("面部表情、语音、视觉与角色内容分别开放到什么程度？", "What access is provided for facial expression, speech, vision, and character content?"), text("仿生皮肤的清洁、修复、更换周期和现场维护边界是什么？", "What are the cleaning, repair, replacement, and field-service boundaries for the bionic skin?")],
    catalogScope: text("收录官网产品页可辨认的 7 个命名产品；未公开的参数保持为空。", "Covers the seven named products identifiable on the official product page; undisclosed specifications remain empty."),
    heroImage: "https://static.wixstatic.com/media/94c6f4_c6560c82dddd4427bab275b7f404a9b7~mv2.png",
    heroImageAlt: text("AheadForm Origin F1 官方产品图", "Official AheadForm Origin F1 product image"),
    heroImageSourceUrl: "https://www.aheadform.com/zh/origin-f1",
    heroImageCredit: text("首形科技官网", "AheadForm official website"),
    investmentView: [text("该路线与工业人形机器人的评价标准不同，更应关注交互质量、角色内容、皮肤维护、项目复制性与真实付费场景。", "This route should not be judged by industrial-humanoid criteria alone; interaction quality, character content, skin maintenance, repeatability across projects, and paying use cases are more relevant."), text("官网展示能够确认产品方向，但公开财务、订单、产能与交付规模信息有限，商业判断仍需额外的一手材料。", "The official presentation establishes product direction, while public financial, order, capacity, and delivery-scale evidence remains limited and requires additional first-party material.")],
    milestones: [],
    fundingRounds: [],
    sourceLinks: [{ label: text("官网产品目录", "Official product catalog"), url: "https://www.aheadform.com/zh/products" }, { label: text("Origin F1 产品页", "Origin F1 product page"), url: "https://www.aheadform.com/zh/origin-f1" }],
    reviewedAt: "2026-09-03",
  },
  {
    slug: "galbot", name: text("银河通用", "Galbot"), englishName: "Galbot", legalName: text("北京银河通用机器人股份有限公司", "Beijing Galbot Robotics Co., Ltd."), industry: "robotics", country: text("中国", "China"), headquarters: text("北京", "Beijing"), founded: text("2023 年", "2023"), officialUrl: "https://www.galbot.com/",
    role: text("轮式双臂、工业重载、双足人形机器人与具身模型公司", "Wheeled dual-arm, industrial heavy-payload, biped humanoid, and embodied-model company"),
    positioning: text("银河通用已形成 G1 轮式通用操作、S1 工业重载和 ET-1 双足人形三类本体，并提供 TM01 遥操作与开发平台。", "Galbot now spans G1 wheeled general manipulation, S1 industrial heavy payload, and the ET-1 biped humanoid, supported by TM01 teleoperation and a developer platform."),
    overview: [text("公司成立于 2023 年，公开硬件包括 G1、S1、2026 年亮相的双足人形机器人星仔 ET-1，以及配套 TM01 遥操作主从臂，并提供 SDK 与开发者平台。", "Founded in 2023, the company publicly presents G1, S1, the ET-1 biped humanoid unveiled in 2026, and the TM01 teleoperation master arm, alongside an SDK and developer platform."), text("G1 与 S1 的官方手册公开了尺寸、负载、感知、计算、续航、安全距离、维护和质保信息；ET-1 当前主要是发布与演示层资料，二者证据成熟度不能混用。", "Official G1 and S1 manuals disclose dimensions, payload, sensing, compute, endurance, safety distances, maintenance, and warranty information. ET-1 currently has launch- and demonstration-level evidence, which should not be treated as equivalent."), text("投资判断仍需把产品资料完整度与商业规模分开：公开手册能降低技术尽调成本，但收入结构、项目毛利、客户复购和现场运维成本仍需要财务与项目证据。", "Investment analysis should still separate documentation depth from commercial scale: manuals reduce technical-diligence cost, but revenue mix, project margins, customer repeat orders, and field-service cost require financial and project evidence.")],
    businessAreas: [text("G1 通用移动双臂机器人", "G1 general-purpose mobile dual-arm robot"), text("S1 工业重载与 ET-1 双足人形机器人", "S1 industrial heavy-payload and ET-1 biped humanoid robots"), text("TM01 遥操作、SDK 与开发平台", "TM01 teleoperation, SDK, and developer platform")],
    customerGroups: [text("零售补货、拣选和配送运营方", "Retail replenishment, picking, and delivery operators"), text("工业搬运、上下料和仓储项目方", "Industrial handling, loading, and warehouse projects"), text("具身数据采集、算法开发与系统集成团队", "Embodied-data, algorithm-development, and system-integration teams")],
    strengths: [text("公开规格、维护和安全文档较完整", "Relatively complete public specifications, maintenance, and safety documentation"), text("G1 与 S1 形成通用操作和重载工业的分层产品线", "G1 and S1 form a tiered line for general manipulation and heavy industrial work")],
    fit: [text("移动双臂操作和零售任务", "Mobile dual-arm manipulation and retail tasks"), text("重载工业搬运与上下料", "Heavy industrial handling and machine tending")],
    verification: text("任务成功率和节拍、末端执行器配置、二次开发权限、网络依赖、安全认证、现场运维人数、项目毛利和复购。", "Task success rate and cycle time, end-effector configuration, developer access, network dependence, safety certification, field-service staffing, project margins, and repeat orders."),
    questions: [text("目标任务在 G1 与 S1 的哪一标准配置上完成过连续测试？", "Which standard G1 or S1 configuration has completed continuous tests for the target task?"), text("SDK、遥操作、数据采集和远程接管的权限与数据权属如何约定？", "How are SDK, teleoperation, data capture, remote takeover, and data rights defined?"), text("现场异常恢复、备件、维护周期和服务响应如何计入总成本？", "How do recovery, spares, maintenance intervals, and service response enter total cost?")],
    catalogScope: text("覆盖当前可独立识别的 G1、S1、ET-1 与 TM01 四项硬件；SDK 和开发者平台列入生态说明，不重复计为硬件产品。G1/S1 为手册级资料，ET-1 为发布演示级资料。", "Covers four separately identifiable hardware products: G1, S1, ET-1, and TM01. The SDK and developer platform are ecosystem resources rather than duplicate hardware products. G1/S1 have manual-level evidence; ET-1 remains launch/demo-level."),
    heroImage: images.galbotG1, heroImageAlt: text("Galbot G1 官方产品图", "Official Galbot G1 product image"), heroImageSourceUrl: "https://developer.galbot.com/docs/g1/2.2.4/zh/g1/", heroImageCredit: text("银河通用开发者平台", "Galbot Developer Platform"),
    investmentView: [text("银河通用的产品分层和文档体系说明其正在把研究能力转化为可部署产品；投资重点应转向单项目部署成本、复购、服务收入与规模化交付能力。", "Galbot's tiered product line and documentation suggest a shift from research to deployable products; investment attention should move to deployment cost, repeat orders, service revenue, and scale delivery."), text("轮式双臂避开了双足平衡的部分成本，但不能自动保证操作任务经济性，末端、感知、数据和人工接管仍会决定项目 ROI。", "A wheeled dual-arm form avoids some biped locomotion cost but does not guarantee task economics; end effectors, perception, data, and human takeover still determine project ROI.")],
    milestones: [
      { date: "2023", title: text("公司成立", "Company founded"), detail: text("在北京成立，聚焦具身多模态模型和通用机器人。", "Founded in Beijing around embodied multimodal models and general-purpose robots."), sourceUrl: "https://www.robothub.app/zh/companies/galbot" },
      { date: "2024", title: text("G1 产品与场景验证", "G1 product and scenario validation"), detail: text("G1 进入零售等公开场景验证。", "G1 entered public scenario validation including retail."), sourceUrl: "https://www.galbot.com/g1" },
      { date: "2025", title: text("S1 产品线", "S1 product line"), detail: text("面向重载工业操作的 S1 形成独立产品与手册。", "S1 became a separate documented product for heavy industrial manipulation."), sourceUrl: "https://developer.galbot.com/docs/s1/2.0.0/zh/s1/" },
      { date: "2026-08", title: text("ET-1 星仔亮相", "ET-1 unveiled"), detail: text("双足人形机器人 ET-1 在世界机器人大会公开亮相，当前按公开演示阶段记录。", "The ET-1 biped humanoid was publicly unveiled at the World Robot Conference and remains recorded at the public-demonstration stage."), sourceUrl: "https://www.robothub.app/zh/robots/galbot-et-1" },
    ],
    fundingRounds: [
      { date: "2023-06", round: text("种子轮", "Seed"), amount: text("未披露", "Undisclosed"), investors: text("经纬创投、蓝驰创投", "Matrix Partners China and BlueRun Ventures"), sourceUrl: "https://www.robothub.app/zh/companies/galbot" },
      { date: "2024-06", round: text("A 轮", "Series A"), amount: text("约 7 亿元人民币（公开报道）", "About RMB 700M (reported)"), investors: text("多家产业与财务投资机构", "Industrial and financial investors"), sourceUrl: "https://www.robothub.app/zh/companies/galbot" },
      { date: "2024-11", round: text("战略融资", "Strategic financing"), amount: text("约 4.93 亿元人民币（公开报道）", "About RMB 493M (reported)"), investors: text("上汽恒旭、香港投资公司、深创投等", "SAIC Hengxu, Hong Kong Investment Corporation, Shenzhen Capital Group, and others"), sourceUrl: "https://www.robothub.app/zh/companies/galbot" },
      { date: "2025-06", round: text("B 轮", "Series B"), amount: text("约 11 亿元人民币（公开报道）", "About RMB 1.1B (reported)"), investors: text("公开报道所列投资方", "Investors listed in public reporting"), sourceUrl: "https://www.robothub.app/zh/companies/galbot" },
      { date: "2025-12", round: text("C 轮", "Series C"), amount: text("约 20.7 亿元人民币（公开报道）", "About RMB 2.07B (reported)"), investors: text("中国移动链长基金领投，中金资本等参与", "Led by China Mobile Chain Fund, with CICC Capital and others"), sourceUrl: "https://www.robothub.app/zh/companies/galbot" },
      { date: "2026-03", round: text("D 轮", "Series D"), amount: text("约 25 亿元人民币（公开报道）", "About RMB 2.5B (reported)"), investors: text("公开报道所列投资方", "Investors listed in public reporting"), sourceUrl: "https://www.robothub.app/zh/companies/galbot" },
    ],
    sourceLinks: [{ label: text("公司官网", "Official website"), url: "https://www.galbot.com/" }, { label: text("G1 官方手册", "G1 official manual"), url: "https://developer.galbot.com/docs/g1/2.2.4/zh/g1/" }, { label: text("S1 官方手册", "S1 official manual"), url: "https://developer.galbot.com/docs/s1/2.0.0/zh/s1/" }, { label: text("ET-1 公开资料", "ET-1 public profile"), url: "https://www.robothub.app/zh/robots/galbot-et-1" }], reviewedAt: "2026-09-02",
  },
  {
    slug: "unitree", name: text("宇树科技", "Unitree Robotics"), englishName: "Unitree Robotics", legalName: text("宇树科技股份有限公司", "Unitree Robotics Co., Ltd."), industry: "robotics", country: text("中国", "China"), headquarters: text("杭州", "Hangzhou"), founded: text("2016 年", "2016"), officialUrl: "https://www.unitree.com/cn/",
    role: text("四足、轮足、人形机器人及核心组件厂商", "Quadruped, wheeled-legged, humanoid, and core-component manufacturer"),
    positioning: text("宇树的公开目录已从四足机器人扩展到人形机器人、灵巧手、机械臂、感知和关节组件。", "Unitree's public catalog has expanded from quadrupeds to humanoids, dexterous hands, arms, perception, and joint components."),
    overview: [text("宇树成立于 2016 年，早期以四足机器人形成消费、科研与行业产品线，随后扩展到 H、G、R 系列人形机器人以及手、臂、雷达和关节组件。", "Founded in 2016, Unitree built consumer, research, and industrial quadruped lines before expanding into H-, G-, and R-series humanoids plus hands, arms, LiDAR, and joint components."), text("相比多数早期人形机器人公司，宇树有更长的硬件迭代、供应链和出货历史；但四足经验不能直接视为人形任务成功率、工业安全或持续作业能力的证据。", "Compared with many early humanoid startups, Unitree has a longer hardware, supply-chain, and shipment history, but quadruped experience is not direct proof of humanoid task success, industrial safety, or continuous duty."), text("投资分析可结合已公开的上市文件检查收入结构、盈利能力、研发投入和产品迭代存货，而不只依赖融资或演示视频。", "Investment analysis can use public listing documents to examine revenue mix, profitability, R&D spending, and product-obsolescence inventory rather than relying only on funding or demonstration videos.")],
    businessAreas: [text("消费、科研与行业四足/轮足机器人", "Consumer, research, and industrial quadruped/wheeled-legged robots"), text("H、G、R 系列通用人形机器人", "H-, G-, and R-series general-purpose humanoids"), text("灵巧手、机械臂、雷达、关节电机与配件", "Dexterous hands, arms, LiDAR, joint motors, and accessories")],
    customerGroups: [text("高校、科研机构和开发者", "Universities, research institutes, and developers"), text("巡检、救援、制造和商业展示项目方", "Inspection, emergency, manufacturing, and commercial-demonstration projects"), text("需要本体、关节和开发工具的机器人集成团队", "Robot integrators needing bodies, joints, and developer tools")],
    strengths: [text("产品迭代和价格带覆盖较广", "Broad product iteration and price-band coverage"), text("四足、人形与自研组件形成共用供应链和开发生态", "Shared supply chain and developer ecosystem across quadrupeds, humanoids, and components")],
    fit: [text("足式机器人科研与行业巡检", "Legged-robot research and industrial inspection"), text("人形机器人算法、数据和应用开发", "Humanoid algorithm, data, and application development")],
    verification: text("具体型号生命周期、标准版与 EDU 权限、工业安全、通信安全、连续工况、售后支持以及上市文件披露的收入与客户结构。", "Model lifecycle, standard-versus-EDU access, industrial safety, communications security, continuous duty, after-sales support, and revenue/customer structure disclosed in listing documents."),
    questions: [text("项目需要标准版、EDU 版还是数据采集版，控制权限有何差异？", "Does the project require standard, EDU, or data-capture editions, and how do control rights differ?"), text("产品参数在何种负载、地面、温度和电池状态下测得？", "Under what payload, terrain, temperature, and battery conditions were specifications measured?"), text("目标型号的生命周期、备件、软件版本和安全更新承诺是什么？", "What are the lifecycle, spares, software-version, and security-update commitments for the target model?")],
    catalogScope: text("按官网当前目录建立 45 条独立记录：12 款四足/轮足、5 款通用人形、5 项应用型整机/方案、7 款灵巧手与机械臂、8 款感知/核心组件及 8 款配件。颜色、EDU 配置和同型号选件不重复计数；铁甲拳王按公开应用方案而非可采购通用型号记录。", "Builds 45 separate records from the current official catalog: 12 quadruped/wheeled-legged robots, 5 general humanoids, 5 application robots/solutions, 7 hands and arms, 8 sensing/core components, and 8 accessories. Colors, EDU configurations, and options of the same model are not double-counted; Iron Fist is recorded as a published application solution rather than a generally purchasable model."),
    heroImage: images.unitreeG1, heroImageAlt: text("宇树 G1 人形机器人", "Unitree G1 humanoid robot"), heroImageSourceUrl: "https://www.unitree.com/cn/g1/", heroImageCredit: text("宇树官网产品图", "Unitree official product image"),
    investmentView: [text("宇树与很多机器人初创公司的主要区别是已有跨代产品和公开财务资料，投资判断应更关注产品组合收入、毛利、研发效率、存货跌价和人形业务的实际成效。", "Unitree differs from many robotics startups through multi-generation products and public financial disclosures. Analysis should focus on product-mix revenue, margin, R&D efficiency, inventory impairment, and humanoid execution."), text("产品线扩张既可能复用关节、电控和供应链，也可能带来 SKU、售后和库存复杂度；需要用上市文件与后续定期报告持续验证。", "Catalog expansion may reuse joints, electronics, and supply chain, but can also add SKU, service, and inventory complexity; listing documents and later reports are the appropriate evidence base.")],
    milestones: [
      { date: "2016", title: text("公司成立", "Company founded"), detail: text("在杭州成立，开始四足机器人产品研发。", "Founded in Hangzhou to develop quadruped robots."), sourceUrl: "https://www.unitree.com/cn/about/" },
      { date: "2017", title: text("Laikago", "Laikago"), detail: text("发布早期商业四足机器人。", "Released an early commercial quadruped."), sourceUrl: "https://www.unitree.com/cn/about/" },
      { date: "2021", title: text("Go1", "Go1"), detail: text("消费/科研四足产品进入更低价格带。", "Moved consumer/research quadrupeds into a lower price band."), sourceUrl: "https://www.unitree.com/cn/about/" },
      { date: "2023", title: text("Go2 与 H1", "Go2 and H1"), detail: text("更新四足平台并发布首款通用人形机器人 H1。", "Updated the quadruped line and launched H1, its first general-purpose humanoid."), sourceUrl: "https://www.unitree.com/cn/about/" },
      { date: "2024", title: text("G1 与 B2 轮融资", "G1 and B2 financing"), detail: text("发布 G1；春节前完成近 10 亿元 B2 轮融资。", "Launched G1 and reported nearly RMB 1 billion in B2 financing before Lunar New Year."), sourceUrl: "https://www.unitree.com/cn/news/" },
      { date: "2026", title: text("H2、R1 与上市进程", "H2, R1, and listing process"), detail: text("官网扩展 H2/R1 系列，公开上市文件提供更完整经营数据。", "Expanded the H2/R1 line and entered a public listing process with broader operating disclosures."), sourceUrl: "https://static.sse.com.cn/stock/disclosure/announcement/c/202605/002178_20260525_V4H0.pdf" },
    ],
    fundingRounds: [
      { date: "2016-01", round: text("种子轮", "Seed"), amount: text("197 万元人民币（公开报道）", "RMB 1.97M (reported)"), investors: text("尹方鸣", "Yin Fangming"), sourceUrl: "https://www.robothub.app/zh/companies/unitree" },
      { date: "2018-05", round: text("Pre-Seed", "Pre-Seed"), amount: text("未披露", "Undisclosed"), investors: text("德迅投资、宁波梅山极思投资、深圳安创科技股权投资", "Decent Capital and other early investors"), sourceUrl: "https://www.robothub.app/zh/companies/unitree" },
      { date: "2019-12", round: text("A 轮", "Series A"), amount: text("未披露", "Undisclosed"), investors: text("红杉种子基金、德迅投资、红杉中国", "Sequoia Seed, Decent Capital, and Sequoia China"), sourceUrl: "https://www.robothub.app/zh/companies/unitree" },
      { date: "2020-05", round: text("A+ 轮", "Series A+"), amount: text("未披露", "Undisclosed"), investors: text("祥峰投资、初心资本、红杉中国", "Vertex Ventures, Chuxin Capital, and Sequoia China"), sourceUrl: "https://www.robothub.app/zh/companies/unitree" },
      { date: "2021-07", round: text("B 轮", "Series B"), amount: text("未披露", "Undisclosed"), investors: text("顺为资本", "Shunwei Capital"), sourceUrl: "https://www.robothub.app/zh/companies/unitree" },
      { date: "2022-04", round: text("C 轮", "Series C"), amount: text("未披露", "Undisclosed"), investors: text("经纬创投、顺为资本、深创投、容亿投资、海克斯康", "Matrix Partners China, Shunwei, Shenzhen Capital Group, Rongyi, and Hexagon"), sourceUrl: "https://www.robothub.app/zh/companies/unitree" },
      { date: "2024-02", round: text("B2 / B+ 轮（报道口径不同）", "Series B2 / B+ (reporting labels differ)"), amount: text("约 9.86 亿元人民币", "About RMB 986M"), investors: text("金石投资、美团、源码资本、深创投等", "GoldStone Investment, Meituan, Source Code Capital, Shenzhen Capital Group, and others"), sourceUrl: "https://www.robothub.app/zh/companies/unitree" },
      { date: "2024-09", round: text("战略融资", "Strategic financing"), amount: text("未披露", "Undisclosed"), investors: text("北京机器人产业基金、成都龙珠、中关村科学城成长基金、中信证券投资", "Beijing Robot Industry Fund, Chengdu Longzhu, Zhongguancun Science City Growth Fund, and CITIC Securities Investment"), sourceUrl: "https://www.robothub.app/zh/companies/unitree" },
      { date: "2025-06", round: text("C+ 轮", "Series C+"), amount: text("约 6.85 亿元人民币", "About RMB 685M"), investors: text("中国移动、腾讯、锦秋、阿里巴巴、蚂蚁、吉利等", "China Mobile, Tencent, Jinqiu, Alibaba, Ant Group, Geely, and others"), sourceUrl: "https://www.robothub.app/zh/companies/unitree" },
      { date: "2026-03", round: text("科创板申请（尚未完成）", "STAR Market application (not completed)"), amount: text("拟募资约 41.4 亿元人民币（申报/报道口径）", "Planned raise about RMB 4.14B (filing/reporting figure)"), investors: text("上交所受理阶段，不作为已完成融资", "Accepted for review by the SSE; not treated as completed financing"), sourceUrl: "https://static.sse.com.cn/stock/disclosure/announcement/c/202605/002178_20260525_V4H0.pdf" },
    ],
    sourceLinks: [{ label: text("官网产品目录", "Official product catalog"), url: "https://www.unitree.com/cn/" }, { label: text("开发文档", "Developer documentation"), url: "https://support.unitree.com/" }, { label: text("上市披露", "Listing disclosure"), url: "https://static.sse.com.cn/stock/disclosure/announcement/c/202605/002178_20260525_V4H0.pdf" }, { label: text("融资汇总与来源入口", "Funding summary and source index"), url: "https://www.robothub.app/zh/companies/unitree" }], reviewedAt: "2026-09-04",
  },
  {
    slug: "linkerbot", name: text("灵心巧手", "LinkerBot"), englishName: "LinkerBot", legalName: text("灵心巧手（北京）科技股份有限公司", "LinkerBot (Beijing) Technology Co., Ltd."), industry: "dexterous-hands", country: text("中国", "China"), headquarters: text("北京", "Beijing"), founded: text("2023 年注册；团队称 2019 年开始研发", "Incorporated in 2023; the team states R&D began in 2019"), officialUrl: "https://www.linkerbot.cn/",
    role: text("多路线灵巧手、遥操作、机械臂和灵巧技能平台厂商", "Multi-architecture dexterous-hand, teleoperation, arm, and manipulation-skill platform vendor"),
    positioning: text("产品线同时覆盖低自由度高负载、连杆高自由度、直驱全主动和腱绳仿生路线，并延伸到机械臂、遥操作和技能库。", "The portfolio spans low-DoF high-payload, high-DoF linkage, fully actuated direct-drive, and tendon-driven hands, plus arms, teleoperation, and skill libraries."),
    overview: [text("灵心巧手当前官网列出 O6、L6、L20 Lite、L20、O30、L30 六款手部产品，以及 P7 机械臂、Humanoid、MCG、FFG、TA 和数据/技能平台入口。", "The current official site lists six hands—O6, L6, L20 Lite, L20, O30, and L30—plus P7 arm, Humanoid, MCG, FFG, TA, and data/skill platform entries."), text("六款灵巧手的官网页公开了自由度、传动、接口、重量、负载、力、速度、电流和重复定位精度，便于做架构级选型；负载和抓握力仍需按夹持姿态和安全系数复测。", "Official pages for the six hands disclose DoF, transmission, interfaces, mass, payload, force, speed, current, and repeatability, supporting architecture-level screening. Payload and grip force still require pose- and safety-factor-specific retesting."), text("投资层面可关注其多产品路线是否形成平台复用，还是导致研发和库存分散；融资频次高不等于每条路线都已形成稳定规模收入。", "For investors, the question is whether multiple architectures share a platform or fragment R&D and inventory. Frequent financing does not prove that every product line has stable scale revenue.")],
    businessAreas: [text("连杆、直驱与腱绳灵巧手", "Linkage, direct-drive, and tendon-driven hands"), text("P7 机械臂与具身机器人平台", "P7 arm and embodied robot platforms"), text("遥操作、力反馈、数据与灵巧技能", "Teleoperation, force feedback, data, and manipulation skills")],
    customerGroups: [text("人形机器人本体厂商和机械臂集成商", "Humanoid manufacturers and arm integrators"), text("科研、教育与具身操作模型团队", "Research, education, and embodied-manipulation model teams"), text("精密装配、物流和服务机器人项目方", "Precision assembly, logistics, and service-robot projects")],
    strengths: [text("同一品牌内提供多种传动和自由度路线", "Multiple transmission and DoF architectures under one brand"), text("六款整手公开参数较完整", "Relatively complete public specifications for six complete hands")],
    fit: [text("从普惠集成到高自由度研究的分层选型", "Tiered selection from accessible integration to high-DoF research"), text("遥操作、数据采集和灵巧技能验证", "Teleoperation, data capture, and manipulation-skill validation")],
    verification: text("不同产品的额定/最大负载定义、触觉选件、连续运行温升、寿命、通信频率、SDK 许可、维护耗材和批量一致性。", "Rated versus maximum payload definitions, tactile options, continuous-duty heat, life, communication rate, SDK licensing, consumables, and batch consistency across products."),
    questions: [text("目标任务需要独立关节控制、欠驱动顺应还是高负载自锁？", "Does the task need independent joint control, underactuated compliance, or high-payload self-locking?"), text("触觉、力反馈、遥操作和数据平台分别包含在什么配置中？", "Which configurations include tactile sensing, force feedback, teleoperation, and data-platform access?"), text("公开最大负载对应何种姿态、抓取方式、占空比和安全系数？", "What pose, grasp mode, duty cycle, and safety factor underlie the published maximum payload?")],
    catalogScope: text("覆盖官网当前可独立识别的 16 个产品与平台入口：7 款整手、机械臂、人形/移动操作平台、夹持与遥操作硬件，以及数据和模型平台。整手按型号级参数记录，其余条目按官网实际公开层级记录。", "Covers 16 currently identifiable product and platform entries: seven complete hands, an arm, humanoid/mobile-manipulation platforms, gripping and teleoperation hardware, plus data and model platforms. Complete hands use model-level specifications; other entries retain their actual public disclosure level."),
    heroImage: images.linkerL30, heroImageAlt: text("灵心巧手 Linker Hand L30", "LinkerBot Linker Hand L30"), heroImageSourceUrl: "https://www.linkerbot.cn/details/LinkerHandL30", heroImageCredit: text("灵心巧手官网产品图", "LinkerBot official product image"),
    investmentView: [text("公司以多款整手切入不同价格和任务区间，潜在优势是共用电机、驱控、软件和客户渠道；需要验证这些共用程度是否足以抵消多 SKU 复杂度。", "The company targets multiple price and task bands with several hands. Shared motors, control, software, and channels could be an advantage, but the degree of reuse must offset multi-SKU complexity."), text("公开交易文件确认短期内多轮增资和股份制改制；投资判断仍应回到审计收入、订单结构、关联交易、客户集中度和产能利用率。", "Public transaction filings confirm repeated capital increases and conversion to a joint-stock company. Analysis should still return to audited revenue, order mix, related-party transactions, customer concentration, and capacity utilization.")],
    milestones: [
      { date: "2019", title: text("团队开始研发", "R&D origin stated by company"), detail: text("公司公开资料将灵巧手研发起点追溯到 2019 年。", "Company material traces dexterous-hand R&D to 2019."), sourceUrl: "https://www.linkerbot.cn/about/" },
      { date: "2023-07", title: text("公司注册成立", "Company incorporated"), detail: text("北京主体完成工商注册。", "The Beijing legal entity was incorporated."), sourceUrl: "https://www.linkerbot.cn/about/" },
      { date: "2025", title: text("产品线和多轮融资扩张", "Catalog and financing expansion"), detail: text("公开多款灵巧手并完成多轮融资。", "Expanded the public hand catalog and completed multiple financing rounds."), sourceUrl: "https://static.cninfo.com.cn/finalpage/2026-05-21/1225319409.PDF" },
      { date: "2026-03", title: text("股份制改制", "Joint-stock conversion"), detail: text("公开交易文件称公司完成股份制改制。", "A public transaction filing states that the company converted to a joint-stock company."), sourceUrl: "https://static.cninfo.com.cn/finalpage/2026-05-21/1225319409.PDF" },
    ],
    fundingRounds: [
      { date: "2025-04", round: text("种子轮", "Seed"), amount: text("超 1 亿元人民币（公开报道）", "More than RMB 100M (reported)"), investors: text("以具名公开报道为准", "See named public reporting"), sourceUrl: "https://theroboradar.com/companies/linkerbot" },
      { date: "2025-08", round: text("天使轮", "Angel"), amount: text("数亿元人民币（公开报道）", "Several hundred million RMB (reported)"), investors: text("蚂蚁集团、上海半导体装备基金、中金资本等", "Ant Group, Shanghai Semiconductor Equipment Fund, CICC Capital, and others"), sourceUrl: "https://theroboradar.com/companies/linkerbot" },
      { date: "2025-10", round: text("A 轮", "Series A"), amount: text("数亿元人民币（公开报道）", "Several hundred million RMB (reported)"), investors: text("京国瑞、博佳资本、国中资本、山证投资等", "Jingguorui, Bojia Capital, Guozhong Capital, Shanxi Securities Investment, and others"), sourceUrl: "https://theroboradar.com/companies/linkerbot" },
      { date: "2025-11", round: text("A+ 轮", "Series A+"), amount: text("数亿元人民币（公开报道）", "Several hundred million RMB (reported)"), investors: text("东方精工、乐聚机器人、华福投资等", "Dongfang Precision, Leju Robotics, Huafu Investment, and others"), sourceUrl: "https://theroboradar.com/companies/linkerbot" },
      { date: "2025-12", round: text("A++ 轮", "Series A++"), amount: text("未披露", "Undisclosed"), investors: text("创世伙伴、广发乾和、普丰资本、红杉中国", "CCV, GF Qianhe, Pufeng Capital, and HongShan"), sourceUrl: "https://theroboradar.com/companies/linkerbot" },
      { date: "2026-02", round: text("B 轮", "Series B"), amount: text("接近 15 亿元人民币（公开报道）", "Nearly RMB 1.5B (reported)"), investors: text("盛世投资、道得投资、Eastern Epic Capitals 等", "Shengshi Investment, Daode Investment, Eastern Epic Capitals, and others"), sourceUrl: "https://static.cninfo.com.cn/finalpage/2026-05-21/1225319409.PDF" },
      { date: "2026-04", round: text("B+ 轮", "Series B+"), amount: text("未披露", "Undisclosed"), investors: text("中关村科学城基金、中银资产、复星创富等", "Zhongguancun Science City Fund, BOC Asset Management, Fosun Capital, and others"), sourceUrl: "https://theroboradar.com/companies/linkerbot" },
    ],
    sourceLinks: [{ label: text("公司官网", "Official website"), url: "https://www.linkerbot.cn/" }, { label: text("L30 产品页", "L30 product page"), url: "https://www.linkerbot.cn/details/LinkerHandL30" }, { label: text("公开交易文件", "Public transaction filing"), url: "https://static.cninfo.com.cn/finalpage/2026-05-21/1225319409.PDF" }, { label: text("融资事件与来源索引", "Funding-event source index"), url: "https://theroboradar.com/companies/linkerbot" }], reviewedAt: "2026-09-02",
  },
];

const p = (seed: DeepProductSeed) => seed;

const productSeeds: DeepProductSeed[] = [
  p({ id: "deep-tars-t1", companySlug: "tars-robotics", name: "T1", primary: "robot-platform", subclass: "humanoid-robot", category: "robot-platform", type: text("双足通用机器人平台", "Biped general-purpose robot platform"), summary: text("T 系列双足平台，属于完整机器人整机，不属于可独立采购的腿部模块。", "The T-series is a complete biped robot platform, not a separately procurable leg module."), applications: [text("通用操作与工业任务研发", "General manipulation and industrial-task R&D")], parameters: [metric("形态", "Form", "双足人形", "Biped humanoid"), metric("公开阶段", "Public stage", "公开演示", "Public demonstration"), metric("产品层级", "Product level", "整机平台", "Complete robot platform")], officialUrl: "https://www.tars-ai.com/", useCases: ["research", "manufacturing"] }),
  p({ id: "deep-tars-a1", companySlug: "tars-robotics", name: "A1", primary: "robot-platform", subclass: "mobile-robot", category: "robot-platform", type: text("轮式通用操作机器人", "Wheeled general-purpose manipulation robot"), summary: text("A 系列轮式操作平台，公开展示过亚毫米级线束装配任务。", "An A-series wheeled manipulation platform publicly demonstrated on sub-millimeter harness assembly."), applications: [text("精密装配", "Precision assembly"), text("工业操作验证", "Industrial manipulation validation")], parameters: [metric("形态", "Form", "轮式移动双臂", "Wheeled mobile dual-arm"), metric("公开任务", "Public task", "亚毫米级线束装配", "Sub-millimeter harness assembly"), metric("公开阶段", "Public stage", "公开演示", "Public demonstration")], officialUrl: "https://www.tars-ai.com/", imageUrl: images.tarsA1, imageSourceUrl: "https://finance.sina.com.cn/cj/2026-05-29/doc-inhzpwvq7949805.shtml", imageCredit: text("新浪财经公开报道", "Sina Finance public report"), useCases: ["manufacturing", "research"] }),
  p({ id: "deep-tars-awe3", companySlug: "tars-robotics", name: "AWE 3.0", primary: "software-tools", subclass: "robot-model", category: "model-software", type: text("通用具身模型", "General embodied model"), summary: text("面向机器人感知、推理与动作生成的公开模型路线。", "A public model direction for robot perception, reasoning, and action generation."), applications: [text("具身策略与任务泛化研究", "Embodied policy and task-generalization research")], parameters: [metric("模型层级", "Model level", "具身多模态模型", "Embodied multimodal model"), metric("版本", "Version", "3.0", "3.0")], officialUrl: "https://www.tars-ai.com/" }),
  p({ id: "deep-tars-omnivta", companySlug: "tars-robotics", name: "OmniVTA", primary: "software-tools", subclass: "robot-model", category: "model-software", type: text("视觉-触觉世界模型", "Vision-tactile world model"), summary: text("用于联合建模视觉与触觉信息的研究模型。", "A research model for jointly representing visual and tactile information."), applications: [text("接触操作与触觉预测", "Contact manipulation and tactile prediction")], parameters: [metric("输入模态", "Input modalities", "视觉 + 触觉", "Vision + tactile"), metric("公开形态", "Public form", "研究模型/样例", "Research model/samples")], officialUrl: "https://huggingface.co/tars-robotics" }),
  p({ id: "deep-tars-sensehub", companySlug: "tars-robotics", name: "SenseHub", primary: "software-tools", subclass: "development-tool", category: "model-software", type: text("可穿戴数据采集系统", "Wearable data-capture system"), summary: text("用于采集操作示教和多模态行为数据的穿戴式系统。", "A wearable system for collecting manipulation demonstrations and multimodal behavioral data."), applications: [text("遥操作示教和数据集建设", "Teleoperation demonstrations and dataset creation")], parameters: [metric("产品层级", "Product level", "可穿戴采集设备", "Wearable capture hardware"), metric("用途", "Purpose", "机器人操作数据采集", "Robot-manipulation data capture")], officialUrl: "https://wiyh.tars-ai.com/" }),
  ...[text("21 自由度灵巧手", "21-DoF Dexterous Hand"), text("两指末端执行器", "Two-Finger End Effector"), text("三指末端执行器", "Three-Finger End Effector")].map((name, index) => p({ id: `deep-tars-effector-${index + 1}`, companySlug: "tars-robotics", name: name.zh, nameEn: name.en, primary: "manipulator-end-effector", subclass: index === 0 ? "dexterous-hand" : "gripper", category: "end-effector", type: index === 0 ? text("多指灵巧手", "Multi-finger dexterous hand") : text("专用末端执行器", "Dedicated end effector"), summary: text("公开发布材料中出现的末端硬件，当前以产品方向记录，不推断未公开的力、速度或寿命参数。", "End-effector hardware named in public launch material. Unpublished force, speed, and life specifications are not inferred."), applications: [text("精密操作和数据采集", "Precision manipulation and data capture")], parameters: [metric("公开层级", "Disclosure level", "产品方向已公开", "Product direction disclosed"), ...(index === 0 ? [metric("自由度", "DoF", "21", "21")] : [metric("手指数量", "Finger count", String(index + 1), String(index + 1))])], officialUrl: "https://www.tars-ai.com/", level: "family" })),

  p({ id: "deep-paxini-gen4", companySlug: "paxini", name: "PX6AX GEN4", primary: "sensing", subclass: "tactile-sensor", category: "perception", type: text("第四代多维触觉传感器", "Fourth-generation multidimensional tactile sensor"), summary: text("面向夹爪、指尖与曲面覆盖的高密度多维触觉系列，公开资料给出两种夹爪传感器尺寸和薄型定制能力。", "A high-density multidimensional tactile family for grippers, fingertips, and curved surfaces, with two published gripper-sensor sizes and thin custom options."), applications: [text("灵巧手和机器人皮肤", "Dexterous hands and robot skin"), text("夹爪接触检测与精细抓取", "Gripper contact detection and precision grasping")], parameters: [metric("测量", "Measurement", "多维力 / 触觉", "Multidimensional force / tactile"), metric("触觉密度", "Tactile density", "30 taxels/cm²", "30 taxels/cm²"), metric("夹爪传感器尺寸", "Gripper sensor sizes", "28×24×6 / 35×25×6 mm", "28×24×6 / 35×25×6 mm"), metric("法向量程", "Normal-force range", "0–25 N；可定制 ≥300 N", "0–25 N; custom options ≥300 N"), metric("切向量程", "Shear-force range", "±10 N", "±10 N"), metric("最薄定制厚度", "Minimum custom thickness", "2 mm", "2 mm"), metric("工作温度", "Operating temperature", "-10–50 °C", "-10–50 °C"), metric("产品代际", "Generation", "GEN4", "GEN4")], officialUrl: "https://paxini.com/cn/", imageSourceUrl: "https://paxini.com/cn/", imageCredit: text("帕西尼官网", "PaXini official website"), verification: text("不同外形、量程和封装属于可选或定制配置，项目中需按具体料号确认采样、接口和环境等级。", "Form factor, range, and packaging vary by option or customization; confirm sampling, interfaces, and environmental rating against the quoted part number.") }),
  p({ id: "deep-paxini-gen3", companySlug: "paxini", name: "PX-6AX-GEN3", primary: "sensing", subclass: "tactile-sensor", category: "perception", type: text("六维阵列触觉传感器", "Six-axis array tactile sensor"), summary: text("12 款 Elite/Core/Omega 规格，覆盖指尖、指腹和掌面。", "A 12-variant Elite/Core/Omega family covering fingertips, finger pads, and palms."), applications: [text("分布式触觉和接触闭环", "Distributed tactile sensing and contact feedback")], parameters: [metric("输出", "Outputs", "三维阵列分布力、三维合力、三维力矩", "3D distributed force, resultant force, and torque"), metric("触觉信号", "Tactile channels", "最多 717 路", "Up to 717"), metric("量程", "Range", "法向 0–25 N；切向 ±10 N", "Normal 0–25 N; shear ±10 N"), metric("采样/输出", "Sampling/output", "1,000,000 Hz / 1,000 Hz", "1,000,000 Hz / 1,000 Hz"), metric("最小识别力", "Minimum detectable force", "0.01 N", "0.01 N"), metric("空间分辨率", "Spatial resolution", "0.1 mm", "0.1 mm"), metric("重复精度", "Repeatability", "<0.5% FS", "<0.5% FS"), metric("防护", "Ingress protection", "IP68", "IP68"), metric("寿命口径", "Published life", ">1,000 万次测量（厂商实验室）", ">10 million measurements (vendor lab)")], officialUrl: "https://paxini.com/cn/ax/gen3", imageUrl: images.paxiniGen3, imageSourceUrl: "https://paxini.com/cn/ax/gen3", imageCredit: text("帕西尼官网", "PaXini official website") }),
  p({ id: "deep-paxini-px3q", companySlug: "paxini", name: "PX3Q", primary: "sensing", subclass: "force-torque-sensor", category: "perception", type: text("关节扭矩传感器", "Joint torque sensor"), summary: text("多量程、薄型关节扭矩传感器。", "A thin joint-torque sensor family with multiple ranges."), applications: [text("机器人关节和协作机械臂", "Robot joints and collaborative arms")], parameters: [metric("量程", "Range", "±30 / ±50 / ±100 N·m", "±30 / ±50 / ±100 N·m"), metric("分辨率", "Resolution", "0.1% FS", "0.1% FS"), metric("采样率", "Sampling", "1,000 Hz", "1,000 Hz"), metric("直径", "Diameter", "50 / 60 / 70 mm", "50 / 60 / 70 mm"), metric("高度", "Height", "9 / 9 / 11 mm", "9 / 9 / 11 mm"), metric("极限过载", "Ultimate overload", "300%", "300%"), metric("工作温度", "Operating temperature", "-10–80 °C", "-10–80 °C"), metric("接口", "Interfaces", "RS485 / CAN-FD / EtherCAT / USB", "RS485 / CAN-FD / EtherCAT / USB")], officialUrl: "https://www.paxini.com/cn/ax/torque" }),
  p({ id: "deep-paxini-px6d", companySlug: "paxini", name: "PX6D", primary: "sensing", subclass: "force-torque-sensor", category: "perception", type: text("六维力/力矩传感器", "Six-axis force/torque sensor"), summary: text("面向腕部、末端与力控的六维传感器系列。", "A six-axis sensor family for wrists, tools, and force control."), applications: [text("腕部力控、装配和测试", "Wrist force control, assembly, and testing")], parameters: [metric("力量程", "Force range", "Fx/Fy/Fz: -50–50 N", "Fx/Fy/Fz: -50–50 N"), metric("力矩量程", "Torque range", "Mx/My/Mz: -2–2 N·m", "Mx/My/Mz: -2–2 N·m"), metric("采样率", "Sampling", "1,000 Hz", "1,000 Hz"), metric("直径", "Diameter", "36 / 75 / 90 mm", "36 / 75 / 90 mm"), metric("典型高度/质量", "Typical height/mass", "24 mm / 180 g", "24 mm / 180 g"), metric("综合准度", "Combined accuracy", "0.5% FS", "0.5% FS"), metric("防护", "Ingress protection", "IP65 / IP67 / IP68", "IP65 / IP67 / IP68"), metric("接口", "Interfaces", "RS485 / CAN / CAN-FD / EtherCAT / USB", "RS485 / CAN / CAN-FD / EtherCAT / USB")], officialUrl: "https://www.paxini.com/cn/ax/6d" }),
  p({ id: "deep-paxini-footrix", companySlug: "paxini", name: "PX-FOOTRIX", primary: "sensing", subclass: "tactile-sensor", category: "perception", type: text("足底多维触觉传感器", "Plantar multidimensional tactile sensor"), summary: text("用于双足机器人足底接触、三向受力和压力分布感知，公开参数强调大范围受力与密封环境适应。", "A plantar sensor for biped contact, three-axis loading, and pressure distribution, with published emphasis on high loads and sealed environments."), applications: [text("双足机器人和步态研究", "Biped robots and gait research"), text("落足检测、重心与平衡控制", "Footfall detection, center-of-pressure, and balance control")], parameters: [metric("切向力量程", "Shear-force range", "Fx/Fy: ±1,000 N", "Fx/Fy: ±1,000 N"), metric("法向力量程", "Normal-force range", "Fz: 0–2,000 N", "Fz: 0–2,000 N"), metric("分辨率", "Resolution", "1% FS", "1% FS"), metric("空间分辨率", "Spatial resolution", "1 cm", "1 cm"), metric("极限过载", "Ultimate overload", "300%", "300%"), metric("采样率", "Sampling rate", "150 Hz", "150 Hz"), metric("工作温度", "Operating temperature", "-10–50 °C", "-10–50 °C"), metric("防护", "Ingress protection", "IP67 / IP68", "IP67 / IP68"), metric("供电", "Power", "3–5 V；或 12 V 转接", "3–5 V; or 12 V adapter"), metric("接口", "Interfaces", "SPI / UART / RS485 / USB / I2C / CAN-FD", "SPI / UART / RS485 / USB / I2C / CAN-FD")], officialUrl: "https://paxini.com/cn/", level: "model", verification: text("量程、过载和防护为厂商公开口径；仍需确认足型尺寸、标定方法、安装刚度和目标步态冲击条件。", "Range, overload, and ingress ratings follow vendor material; confirm foot geometry, calibration, mounting stiffness, and target gait impacts.") }),
  p({ id: "deep-paxini-dexh13", companySlug: "paxini", name: "DexH13", primary: "manipulator-end-effector", subclass: "dexterous-hand", category: "end-effector", type: text("多维触觉+视觉灵巧手", "Multidimensional tactile and vision dexterous hand"), summary: text("四指、16 自由度，集成 1,140 个触觉单元和 8MP 手眼相机。", "A four-finger, 16-DoF hand with 1,140 tactile cells and an 8MP hand-eye camera."), applications: [text("物流、制造、医疗康养和服务操作", "Logistics, manufacturing, care, and service manipulation")], parameters: [metric("手指/自由度", "Fingers/DoF", "4 / 16（13 主动+3 被动）", "4 / 16 (13 active + 3 passive)"), metric("触觉单元", "Tactile cells", "1,140；3,420 路信号", "1,140; 3,420 signal channels"), metric("视觉", "Vision", "800 万像素 RGB AI 相机", "8MP RGB AI camera"), metric("指尖力", "Fingertip force", "15 N（厂商实验室）", "15 N (vendor lab)"), metric("额定负载", "Rated payload", "5 kg", "5 kg"), metric("最大抓握直径", "Maximum grip diameter", "15 cm", "15 cm"), metric("最小开合时间", "Minimum open/close time", "1.5 s（厂商实验室）", "1.5 s (vendor lab)"), metric("接口", "Interfaces", "EtherCAT / Modbus", "EtherCAT / Modbus"), metric("寿命口径", "Published life", "100 万次", "1 million cycles")], officialUrl: "https://paxini.com/cn/dex/gen2", imageUrl: images.paxiniDex, imageSourceUrl: "https://paxini.com/cn/dex/gen2", imageCredit: text("帕西尼官网", "PaXini official website") }),
  p({ id: "deep-paxini-gmh18", companySlug: "paxini", name: "GMH18", primary: "manipulator-end-effector", subclass: "dexterous-hand", category: "end-effector", type: text("五指协作型多维触觉灵巧手", "Five-finger collaborative multidimensional tactile hand"), summary: text("18 自由度，强调高负载、自锁和全域触觉覆盖。", "An 18-DoF hand emphasizing high payload, self-locking, and broad tactile coverage."), applications: [text("通用抓取和稳固搬运", "General grasping and stable handling")], parameters: [metric("手指/自由度", "Fingers/DoF", "5 / 18（11 主动+7 被动）", "5 / 18 (11 active + 7 passive)"), metric("触觉", "Tactile sensing", "千余颗 ITPU；15 种触觉感知", "1,000+ ITPU cells; 15 tactile modes"), metric("额定负载", "Rated payload", "20 kg（厂商实验室）", "20 kg (vendor lab)"), metric("视觉扩展", "Vision expansion", "RGB / RGB-D / 红外", "RGB / RGB-D / infrared"), metric("接口", "Interfaces", "USB / EtherCAT / Ethernet / Modbus / CAN-FD", "USB / EtherCAT / Ethernet / Modbus / CAN-FD"), metric("供电", "Power", "24–48 VDC / USB PD 3.1", "24–48 VDC / USB PD 3.1"), metric("驱动", "Actuation", "空心杯电机 + 多连杆", "Coreless motors + multi-linkage")], officialUrl: "https://paxini.com/cn/dex/gen3", imageUrl: "https://paxini.com/images/Gen3/banner.webp", imageSourceUrl: "https://paxini.com/cn/dex/gen3", imageCredit: text("帕西尼官网", "PaXini official website") }),
  p({ id: "deep-paxini-tora-one", companySlug: "paxini", name: "TORA-ONE", primary: "robot-platform", subclass: "mobile-robot", category: "robot-platform", type: text("多维触觉移动双臂机器人", "Multidimensional tactile mobile dual-arm robot"), summary: text("可折叠升降的轮式双臂平台，组合视触觉灵巧手、环境感知与激光 SLAM，用于长时移动操作。", "A foldable, height-adjustable wheeled dual-arm platform combining visual-tactile hands, environmental sensing, and LiDAR SLAM for extended mobile manipulation."), applications: [text("物流、制造和服务操作", "Logistics, manufacturing, and service manipulation"), text("遥操作数据采集与具身任务验证", "Teleoperation data capture and embodied-task validation")], parameters: [metric("身高", "Height", "折叠 1.46 m；伸展 1.86 m", "1.46 m folded; 1.86 m extended"), metric("本体自由度", "Body DoF", "21（不含灵巧手）", "21 excluding hands"), metric("双手自由度", "Two-hand DoF", "32；单手 16（13 主动+3 被动）", "32 total; 16 per hand (13 active + 3 passive)"), metric("全机自由度口径", "Published total DoF", "53", "53"), metric("触觉单元", "Tactile cells", "2,280；6,840 路信号", "2,280; 6,840 signal channels"), metric("视觉", "Vision", "5×RGB + 2×RGB-D", "5×RGB + 2×RGB-D"), metric("单臂重复定位精度", "Arm repeatability", "±0.5 mm", "±0.5 mm"), metric("单臂额定负载", "Rated payload per arm", "5 kg", "5 kg"), metric("单臂最大长度", "Maximum arm length", "96.5 cm", "96.5 cm"), metric("底盘速度", "Base speed", "0.6 m/s", "0.6 m/s"), metric("导航", "Navigation", "激光 SLAM", "LiDAR SLAM"), metric("电池", "Battery", "40 Ah", "40 Ah"), metric("充电 / 续航", "Charge / endurance", "6 h / 8 h", "6 h / 8 h")], officialUrl: "https://paxini.com/cn/robot", imageUrl: images.paxiniRobot, imageSourceUrl: "https://paxini.com/cn/robot", imageCredit: text("帕西尼官网", "PaXini official website"), verification: text("自由度、续航和力控指标来自厂商页面；项目中仍需确认手型配置、续航工况、导航边界与安全停机机制。", "DoF, endurance, and force-control figures follow vendor material; confirm hand configuration, endurance duty, navigation boundaries, and safe-stop behavior per project.") }),
  p({ id: "deep-paxini-tora-double", companySlug: "paxini", name: "TORA-DOUBLE ONE", primary: "robot-platform", subclass: "mobile-robot", category: "robot-platform", type: text("轻量化通用人形机器人", "Lightweight general-purpose humanoid robot"), summary: text("采用模块化全向或主动越障底盘、可折叠机身和可选触觉灵巧手的通用操作平台。", "A general manipulation platform with a modular omnidirectional or active-obstacle base, foldable body, and optional tactile dexterous hands."), applications: [text("工业、商业、餐饮、康养和家庭任务验证", "Industrial, commercial, dining, care, and home-task validation"), text("视触觉模型与具身数据闭环", "Visual-tactile models and embodied-data loops")], parameters: [metric("关节自由度", "Joint DoF", "最高 52", "Up to 52"), metric("最小折叠高度", "Minimum folded height", "<60 cm", "<60 cm"), metric("底盘选项", "Base options", "双舵轮全向 / 四驱可变形越障", "Dual-steer-wheel omnidirectional / four-wheel deformable obstacle base"), metric("计算平台", "Compute platform", "NVIDIA Jetson AGX Orin", "NVIDIA Jetson AGX Orin"), metric("具身模型", "Embodied model", "OmniVTLA", "OmniVTLA"), metric("控制", "Control", "PX-Core 视触觉双模态控制", "PX-Core visual-tactile control"), metric("手部配置", "Hand configuration", "支持帕西尼多维触觉灵巧手系列", "Supports PaXini multidimensional tactile-hand options")], officialUrl: "https://www.paxini.com/cn/robot/doubleOne", imageUrl: images.paxiniRobot, imageSourceUrl: "https://www.paxini.com/cn/robot/doubleOne", imageCredit: text("帕西尼官网", "PaXini official website"), level: "family", verification: text("官网描述覆盖多个底盘和灵巧手选项，不能把所有配置视为同一标准型号；应按报价版本核对自由度、负载、尺寸和续航。", "The official page covers several base and hand options, so they should not be treated as one fixed configuration; verify DoF, payload, dimensions, and endurance against the quoted edition.") }),
  p({ id: "deep-paxini-data-1", companySlug: "paxini", name: "PXCap III", primary: "manipulator-end-effector", subclass: "end-effector-general", category: "end-effector", type: text("三指数据采集手套", "Three-finger data-capture glove"), summary: text("与 PXDex III 采用采集—执行同构设计，用于遥操作示教及触觉、视觉和关节状态联合采集。", "A data-capture glove physically aligned with PXDex III for teleoperation demonstrations and joint tactile, visual, and proprioceptive capture."), applications: [text("遥操作示教、跨本体映射和具身数据采集", "Teleoperation demonstrations, cross-body mapping, and embodied-data capture")], parameters: [metric("重量", "Mass", "650 g", "650 g"), metric("自由度", "DoF", "4", "4"), metric("触觉", "Tactile sensing", "6D 霍尔阵列；0.1 N", "6D Hall array; 0.1 N"), metric("触觉数据", "Tactile data", "合力、分布力阵列", "Resultant force and distributed-force array"), metric("编码器精度", "Encoder accuracy", "±0.15°", "±0.15°"), metric("相机", "Cameras", "2×RGB；D170°；1080p / 30 fps", "2×RGB; D170°; 1080p / 30 fps"), metric("抓握范围", "Grip range", "最大 55 mm；最小捏取 2 mm", "55 mm maximum; 2 mm minimum pinch"), metric("供电", "Power", "12 VDC", "12 VDC"), metric("腕部定位", "Wrist tracking", "VR 头显+手柄；≤5 mm", "VR headset + controller; ≤5 mm"), metric("空载开合寿命", "No-load cycle life", "100 万次", "1 million cycles"), metric("通讯", "Communication", "USB", "USB")], officialUrl: "https://www.paxini.com/cn/ax/pxcap3", level: "model", verification: text("精度与寿命为厂商实验室口径；跨本体使用时需单独验证映射误差、采样同步与操作者差异。", "Accuracy and life are vendor-laboratory figures; cross-body use requires separate validation of mapping error, synchronization, and operator variation.") }),
  p({ id: "deep-paxini-data-2", companySlug: "paxini", name: "PXDex III", primary: "manipulator-end-effector", subclass: "dexterous-hand", category: "end-effector", type: text("三指执行末端", "Three-finger execution end effector"), summary: text("与 PXCap III 同构的三指执行器，集成触觉、关节编码和双掌心相机，用于采集后的动作映射和机器人操作。", "A three-finger actuator physically aligned with PXCap III, integrating tactile sensing, joint encoders, and dual palm cameras for action mapping and robot manipulation."), applications: [text("遥操作执行、数据复现、抓取与精细操作", "Teleoperated execution, demonstration replay, grasping, and precision manipulation")], parameters: [metric("重量", "Mass", "836 g", "836 g"), metric("自由度", "DoF", "4", "4"), metric("触觉", "Tactile sensing", "6D 霍尔阵列；0.1 N", "6D Hall array; 0.1 N"), metric("编码器精度", "Encoder accuracy", "±0.15°", "±0.15°"), metric("相机", "Cameras", "2×RGB；D170°；1080p / 30 fps", "2×RGB; D170°; 1080p / 30 fps"), metric("抓握范围", "Grip range", "最大 55 mm；最小捏取 2 mm", "55 mm maximum; 2 mm minimum pinch"), metric("供电", "Power", "19–48 VDC", "19–48 VDC"), metric("驱动", "Actuation", "空心杯电机", "Coreless motors"), metric("额定负载", "Rated payload", "5 kg", "5 kg"), metric("空载开合寿命", "No-load cycle life", "100 万次", "1 million cycles"), metric("通讯", "Communication", "EtherCAT / Modbus / USB", "EtherCAT / Modbus / USB")], officialUrl: "https://mall.paxini.com/product/Cap/6a29287fd969b7b2281c2696", level: "model", verification: text("商城配置和交付周期可能变化；需确认左右手、控制协议、负载工况与 PXCap III 同构映射的软件版本。", "Store configuration and lead time may change; confirm hand side, protocol, payload duty, and the software revision used for PXCap III mapping.") }),
  p({ id: "deep-paxini-data-3", companySlug: "paxini", name: "PXCap Pro", primary: "manipulator-end-effector", subclass: "end-effector-general", category: "end-effector", type: text("五指具身数据采集手套", "Five-finger embodied-data capture glove"), summary: text("五指 17 自由度采集手套，将触觉、关节角度与掌心视觉用于人手操作示教。", "A five-finger, 17-DoF capture glove combining tactile, joint-angle, and palm-vision data for human demonstrations."), applications: [text("五指遥操作示教和具身数据采集", "Five-finger teleoperation demonstrations and embodied-data capture")], parameters: [metric("重量", "Mass", "325 g", "325 g"), metric("自由度 / 编码器", "DoF / encoders", "17 / 17", "17 / 17"), metric("触觉精度", "Tactile accuracy", "0.1 N", "0.1 N"), metric("编码器精度", "Encoder accuracy", "±0.15°", "±0.15°"), metric("相机", "Camera", "1×RGB；D160°/165°；1080p / 30 fps", "1×RGB; D160°/165°; 1080p / 30 fps"), metric("抓握范围", "Grip range", "最大 90 mm；最小捏取 2 mm", "90 mm maximum; 2 mm minimum pinch"), metric("供电", "Power", "12 VDC", "12 VDC"), metric("腕部定位", "Wrist tracking", "VR；≤5 mm", "VR; ≤5 mm"), metric("通讯", "Communication", "USB", "USB")], officialUrl: "https://paxini.com/cn/", level: "model", verification: text("参数为厂商公开口径；应确认手套尺码、操作者适配、手指映射、时间同步和长时佩戴条件。", "Figures follow vendor material; confirm glove sizing, operator fit, finger mapping, time synchronization, and long-session ergonomics.") }),
  p({ id: "deep-paxini-data-4", companySlug: "paxini", name: "OmniSharing DB", primary: "software-tools", subclass: "development-tool", category: "model-software", type: text("全模态具身智能数据平台", "Multimodal embodied-intelligence data platform"), summary: text("面向具身任务数据组织和使用的平台，公开模态包括触觉、多视角视觉、语音、文本、本体感知与空间轨迹。", "A platform for organizing and using embodied-task data across tactile, multi-view vision, speech, text, proprioception, and spatial trajectories."), applications: [text("家庭、办公、工业、餐饮和商场任务数据", "Household, office, industrial, dining, and retail task data"), text("具身模型训练、评测和数据复用", "Embodied-model training, evaluation, and data reuse")], parameters: [metric("数据模态", "Modalities", "触觉 / 多视角视觉 / 语音 / 文本 / 本体感知 / 空间轨迹", "Tactile / multi-view vision / speech / text / proprioception / spatial trajectories"), metric("采集方式", "Collection", "人类采集与机器人任务数据", "Human capture and robot-task data"), metric("产品层级", "Product level", "数据库与数据服务平台", "Dataset and data-service platform"), metric("公开场景", "Published domains", "家庭 / 办公 / 工业 / 餐厅 / 商场", "Household / office / industrial / restaurant / mall")], officialUrl: "https://product-resources.paxini.com/zh/introduce", level: "platform", verification: text("使用前需核对数据许可证、采集设备与机器人构型、标注定义、数据分布、隐私合规和目标任务覆盖。", "Before use, verify licensing, capture devices and robot embodiments, annotation definitions, data distribution, privacy compliance, and target-task coverage.") }),

  p({ id: "deep-aheadform-origin-f1", companySlug: "aheadform", name: "Origin F1", primary: "robot-platform", subclass: "bionic-humanoid", category: "robot-platform", type: text("桌面级超仿生女性人形机器人", "Desktop lifelike female humanoid"), summary: text("面向真实人际交互的桌面级仿生机器人，将面部机构、视觉、语音与 AI 驱动的表情行为结合。", "A desktop lifelike robot for face-to-face interaction, combining facial mechanisms, vision, speech, and AI-driven expression behavior."), applications: [text("接待、展示、角色交互与人机交互研究", "Reception, display, character interaction, and HRI research")], parameters: [metric("头部 / 眼部 / 面部自由度", "Head / eye / facial DoF", "26", "26"), metric("感知", "Perception", "视觉 + 语音", "Vision + speech"), metric("公开能力", "Published capabilities", "人脸识别、视觉感知、语音识别与合成", "Face recognition, visual perception, speech recognition, and synthesis"), metric("形态", "Form", "桌面级", "Desktop")], officialUrl: "https://www.aheadform.com/zh/origin-f1", level: "model", verification: text("官网未披露整机尺寸、重量、功耗、接口和量产状态，项目中需以正式规格与演示验收补齐。", "The official page does not state overall dimensions, mass, power, interfaces, or production status; obtain a formal specification and demonstration acceptance plan.") }),
  p({ id: "deep-aheadform-origin-m1", companySlug: "aheadform", name: "Origin M1", primary: "robot-platform", subclass: "bionic-humanoid", category: "robot-platform", type: text("桌面级超仿生男性人形机器人", "Desktop lifelike male humanoid"), summary: text("面向角色实体化和近距离交互的桌面级产品，公开页面强调第二代仿生皮肤、面部肌肉单元、双目视觉和角色 AI。", "A desktop platform for physical character embodiment and close interaction, with published emphasis on second-generation bionic skin, facial muscle units, binocular vision, and character AI."), applications: [text("IP 角色互动、展陈和品牌体验", "IP-character interaction, exhibition, and brand experience")], parameters: [metric("面部可动肌肉单元", "Facial actuation units", "30", "30"), metric("微表情", "Micro-expressions", "12 种", "12"), metric("皮肤温控", "Skin temperature", "36.5 °C 恒温系统", "36.5 °C temperature-control system"), metric("视觉", "Vision", "双目视觉与眼神追踪", "Binocular vision and gaze tracking"), metric("形态", "Form", "桌面级", "Desktop")], officialUrl: "https://www.aheadform.com/zh/origin-m1", level: "model", verification: text("角色内容合作案例不能替代通用能力证明；应分别验证定制周期、内容授权、交互延迟、皮肤维护和运行稳定性。", "A character-content collaboration is not evidence of general capability; separately validate customization lead time, content rights, interaction latency, skin service, and operating stability.") }),
  p({ id: "deep-aheadform-xuan", companySlug: "aheadform", name: "精灵·璇", nameEn: "Xuan", primary: "robot-platform", subclass: "bionic-humanoid", category: "robot-platform", type: text("超仿生全尺寸人形机器人", "Full-size lifelike humanoid"), summary: text("全尺寸交互型仿人机器人，公开资料重点在面部表情、硅胶仿生皮肤和持续运营的接待展示场景。", "A full-size interactive humanoid whose public material emphasizes facial expression, silicone bionic skin, and ongoing reception or display use."), applications: [text("品牌展示、接待服务、演出和情绪交互", "Brand display, reception, performance, and affective interaction")], parameters: [metric("面部自由度", "Facial DoF", ">30", ">30"), metric("仿生皮肤精度口径", "Published skin-detail figure", "0.5 mm 以内", "Within 0.5 mm"), metric("产品形态", "Form", "全尺寸", "Full-size"), metric("公开方向", "Published focus", "长期交互与场景运营", "Long-duration interaction and scenario operation")], officialUrl: "https://www.aheadform.com/zh/elf-xuan", level: "model", verification: text("面部自由度不等于全身运动自由度；需核对移动方式、稳定性、内容系统、皮肤寿命和运维人员要求。", "Facial DoF is not full-body locomotion DoF; verify mobility, stability, content systems, skin life, and staffing requirements.") }),
  ...[
    ["deep-aheadform-iris", "精灵·铱", "Iris", "超仿生全尺寸人形机器人", "Full-size lifelike humanoid"],
    ["deep-aheadform-xuan-2", "精灵·璇 2.0", "Xuan 2.0", "超仿生全尺寸人形机器人", "Full-size lifelike humanoid"],
    ["deep-aheadform-tang-sanzang", "唐三藏", "Tang Sanzang", "摹生系列仿人机器人", "Lifelike character humanoid"],
    ["deep-aheadform-chappie", "查派", "Chappie", "机甲风格仿人机器人", "Mecha-style humanoid robot"],
  ].map(([id, name, nameEn, typeZh, typeEn]) => p({ id, companySlug: "aheadform", name, nameEn, primary: "robot-platform", subclass: "bionic-humanoid", category: "robot-platform", type: text(typeZh, typeEn), summary: text("官网产品目录可辨认的命名产品；当前公开页面未给出足够的型号级结构与性能参数。", "A named product identifiable in the official catalog; current public material does not provide enough model-level structural or performance specifications."), applications: [text("展示、接待、角色交互或定制项目", "Display, reception, character interaction, or custom projects")], parameters: [metric("产品层级", "Product level", "命名产品", "Named product"), metric("公开资料状态", "Disclosure status", "定位已公开；详细规格未披露", "Positioning published; detailed specifications not disclosed")], officialUrl: "https://www.aheadform.com/zh/products", level: "family", verification: text("不能从图片或同系列型号外推自由度、尺寸、移动能力和交付状态，需向厂商索取对应型号资料。", "Do not infer DoF, dimensions, mobility, or delivery status from images or sibling models; request model-specific documentation.") })),

  p({ id: "deep-galbot-g1", companySlug: "galbot", name: "Galbot G1", primary: "robot-platform", subclass: "mobile-robot", category: "robot-platform", type: text("通用移动双臂机器人", "General-purpose mobile dual-arm robot"), summary: text("面向零售、工业、医疗等场景的轮式双臂机器人。", "A wheeled dual-arm robot for retail, industrial, healthcare, and related tasks."), applications: [text("拣选、补货、配送和操作", "Picking, replenishment, delivery, and manipulation")], parameters: [metric("最高高度", "Maximum height", "1,730 mm", "1,730 mm"), metric("臂长", "Arm length", "710 mm", "710 mm"), metric("升降行程", "Lift travel", "650 mm", "650 mm"), metric("工作空间", "Workspace", "垂直 0–2,100 mm；水平 1,900 mm", "Vertical 0–2,100 mm; horizontal 1,900 mm"), metric("负载", "Payload", "单臂 5 kg；合计 10 kg", "5 kg per arm; 10 kg total"), metric("质量", "Mass", "92.5 kg", "92.5 kg"), metric("计算", "Compute", "Jetson AGX Orin 64GB / 275 TOPS", "Jetson AGX Orin 64GB / 275 TOPS"), metric("自由度", "DoF", "颈 2 + 双臂 14 + 腰 3 + 升降 2", "Neck 2 + arms 14 + waist 3 + lift 2"), metric("底盘", "Base", "4 轮全向；最高 1.5 m/s", "4-wheel omnidirectional; up to 1.5 m/s"), metric("续航/充电", "Endurance/charge", "8 h / 3.5 h（实验室工况）", "8 h / 3.5 h (laboratory conditions)"), metric("电池", "Battery", "48 V / 30 Ah", "48 V / 30 Ah"), metric("感知", "Perception", "双目、4×RGB、2×深度、2×六维力、3D 激光雷达、8×超声", "Stereo, 4×RGB, 2×depth, 2×six-axis force, 3D LiDAR, 8×ultrasonic")], officialUrl: "https://developer.galbot.com/docs/g1/2.2.4/zh/g1/", imageUrl: images.galbotG1, imageSourceUrl: "https://developer.galbot.com/docs/g1/2.2.4/zh/g1/", imageCredit: text("银河通用开发者平台", "Galbot Developer Platform") }),
  p({ id: "deep-galbot-s1", companySlug: "galbot", name: "Galbot S1", primary: "robot-platform", subclass: "mobile-robot", category: "robot-platform", type: text("工业重载移动双臂机器人", "Industrial heavy-payload mobile dual-arm robot"), summary: text("面向工业搬运、上下料和拣选的重载平台。", "A heavy-payload platform for industrial handling, machine tending, and picking."), applications: [text("重载搬运、上下料和拣选", "Heavy handling, machine tending, and picking")], parameters: [metric("最高高度", "Maximum height", "1,793 mm", "1,793 mm"), metric("臂长", "Arm length", "920 mm", "920 mm"), metric("升降行程", "Lift travel", "750 mm", "750 mm"), metric("工作空间", "Workspace", "水平 0–2,400 mm；垂直 2,390 mm", "Horizontal 0–2,400 mm; vertical 2,390 mm"), metric("负载", "Payload", "单臂 15 kg；合计 30 kg", "15 kg per arm; 30 kg total"), metric("质量", "Mass", "320 kg", "320 kg"), metric("计算", "Compute", "Jetson AGX Orin 64GB / 275 TOPS", "Jetson AGX Orin 64GB / 275 TOPS"), metric("底盘", "Base", "4 舵轮全向；最高 1.5 m/s", "4-steer-wheel omnidirectional; up to 1.5 m/s"), metric("续航", "Endurance", "8 h（实验室工况）", "8 h (laboratory conditions)"), metric("电池", "Battery", "48 V / 30 Ah ×2；支持快换", "48 V / 30 Ah ×2; hot-swap supported")], officialUrl: "https://developer.galbot.com/docs/s1/2.0.0/zh/s1/", imageUrl: images.galbotS1, imageSourceUrl: "https://developer.galbot.com/docs/s1/2.0.0/zh/s1/", imageCredit: text("银河通用开发者平台", "Galbot Developer Platform") }),
  p({ id: "deep-galbot-et1", companySlug: "galbot", name: "星仔 ET-1", nameEn: "Galbot ET-1", primary: "robot-platform", subclass: "humanoid-robot", category: "robot-platform", type: text("双足人形机器人", "Biped humanoid robot"), summary: text("2026 年公开亮相的双足人形本体，采用银河星脑智能体与全身控制模型；当前按发布演示级资料记录。", "A biped humanoid unveiled in 2026 with Galbot's AstraBrain agent and whole-body control model; currently recorded at launch/demo evidence level."), applications: [text("人机交互、全身运动学习和通用任务研发", "Human interaction, whole-body motor learning, and general-task research")], parameters: [metric("运动形态", "Locomotion", "双足", "Biped"), metric("智能系统", "Intelligence stack", "AstraBrain-Agent + AstraBrain WBC", "AstraBrain-Agent + AstraBrain WBC"), metric("公开阶段", "Public stage", "2026 世界机器人大会公开演示", "Public demonstration at World Robot Conference 2026"), metric("公开能力", "Public capabilities", "语言交互、实时动作生成、交互学习", "Language interaction, real-time motion generation, interactive learning")], officialUrl: "https://www.galbot.com/", sourceLinks: [{ label: text("ET-1 公开产品资料", "ET-1 public product profile"), url: "https://www.robothub.app/zh/robots/galbot-et-1" }], level: "family", useCases: ["research", "service"] }),
  p({ id: "deep-galbot-tm01", companySlug: "galbot", name: "TM01", primary: "manipulator-end-effector", subclass: "robot-arm", category: "end-effector", type: text("G1 遥操作主从臂", "G1 teleoperation master arm"), summary: text("用于 G1 全身关节遥操作、数据采集和远程接管。", "For G1 whole-body teleoperation, data capture, and remote takeover."), applications: [text("遥操作、数据采集和接管", "Teleoperation, data capture, and takeover")], parameters: [metric("自由度", "DoF", "双臂 7 DoF ×2", "Dual 7-DoF arms"), metric("尺寸", "Dimensions", "530×330×70 mm（不含三脚架）", "530×330×70 mm (without tripod)"), metric("净重", "Net mass", "约 2 kg（不含三脚架）", "About 2 kg (without tripod)"), metric("额定电压/功率", "Rated voltage/power", "12 V / 30 W", "12 V / 30 W"), metric("采样率", "Sampling", "≥100 Hz", "≥100 Hz"), metric("映射延迟", "Mapping latency", "≤20 ms", "≤20 ms"), metric("连接", "Connection", "USB 有线", "Wired USB"), metric("防护", "Ingress protection", "IP20", "IP20")], officialUrl: "https://developer.galbot.com/docs/tm01/1.4.0/zh/tm01/" }),

  ...[
    ["As2-W", "quadruped-robot", "轮足消费/科研四足", "Wheeled-legged consumer/research quadruped", "https://www.unitree.com/cn/As2-W/"],
    ["As2", "quadruped-robot", "紧凑行业四足", "Compact industrial quadruped", "https://www.unitree.com/cn/As2/"],
    ["Go2-W", "quadruped-robot", "轮足消费/科研四足", "Wheeled-legged consumer/research quadruped", "https://www.unitree.com/cn/go2-w/"],
    ["Go2", "quadruped-robot", "消费/科研四足", "Consumer/research quadruped", "https://www.unitree.com/cn/go2/"],
    ["Go1", "quadruped-robot", "上一代消费/科研四足", "Previous-generation consumer/research quadruped", "https://www.unitree.com/cn/go1/"],
    ["A1", "quadruped-robot", "高动态科研四足", "High-dynamic research quadruped", "https://www.unitree.com/cn/a1/"],
    ["A2-W", "quadruped-robot", "轮足行业四足", "Wheeled-legged industrial quadruped", "https://www.unitree.com/cn/A2-W/"],
    ["A2", "quadruped-robot", "行业四足", "Industrial quadruped", "https://www.unitree.com/cn/A2/"],
    ["B2-W", "quadruped-robot", "重载轮足行业四足", "Heavy-duty wheeled-legged industrial quadruped", "https://www.unitree.com/cn/b2-w/"],
    ["B2", "quadruped-robot", "重载行业四足", "Heavy-duty industrial quadruped", "https://www.unitree.com/cn/b2/"],
    ["B1", "quadruped-robot", "IP68 行业四足", "IP68 industrial quadruped", "https://www.unitree.com/cn/b1/"],
    ["Aliengo", "quadruped-robot", "科研/行业四足", "Research/industrial quadruped", "https://www.unitree.com/cn/aliengo/"],
  ].map(([name, subclass, zhType, enType, url], index) => p({ id: `deep-unitree-quadruped-${index + 1}`, companySlug: "unitree", name, primary: "robot-platform", subclass, category: "robot-platform", type: text(zhType, enType), summary: name === "Go2" ? text("搭载 4D 激光雷达 L1 的消费与科研四足平台。", "A consumer/research quadruped with Unitree L1 4D LiDAR.") : name === "B2" ? text("面向巡检、搬运和复杂地形的工业重载四足。", "A heavy industrial quadruped for inspection, handling, and difficult terrain.") : text("宇树官网当前目录中的独立四足/轮足产品系列。", "A separate quadruped/wheeled-legged family in Unitree's current official catalog."), applications: [text("科研、巡检、移动和行业应用", "Research, inspection, mobility, and industrial applications")], parameters: name === "Go2" ? [metric("质量", "Mass", "约 15 kg", "About 15 kg"), metric("续航", "Endurance", "约 1–2 h", "About 1–2 h"), metric("感知", "Perception", "4D 激光雷达 L1；360°×90°", "L1 4D LiDAR; 360°×90°"), metric("最小探测距离", "Minimum detection range", "0.05 m", "0.05 m")] : name === "B2" ? [metric("最高速度", "Maximum speed", "6 m/s", "6 m/s"), metric("持续站立负载", "Continuous standing payload", "40 kg", "40 kg"), metric("最大站立负载", "Maximum standing payload", "120 kg", "120 kg"), metric("越障", "Obstacle crossing", "40 cm", "40 cm"), metric("坡度", "Slope", ">45°", ">45°") ] : [metric("产品层级", "Product level", "独立整机系列", "Complete robot family"), metric("官网状态", "Official status", "当前目录可见", "Visible in current catalog")], officialUrl: url, imageUrl: name === "Go2" ? images.unitreeGo2 : name === "B2" ? images.unitreeB2 : undefined, imageSourceUrl: url, imageCredit: text("宇树官网", "Unitree official website"), level: name === "Go2" || name === "B2" ? "model" : "family", useCases: ["research", "manufacturing", "integration"] })),
  ...[
    ["H2 Plus", "全尺寸科研人形机器人", "Full-size research humanoid", "https://www.unitree.com/cn/H2-Plus/"],
    ["H2", "全尺寸通用人形机器人", "Full-size general-purpose humanoid", "https://www.unitree.com/cn/H2/"],
    ["R1", "轻量人形机器人", "Lightweight humanoid", "https://www.unitree.com/cn/R1/"],
    ["G1", "中型人形机器人开发平台", "Mid-size humanoid development platform", "https://www.unitree.com/cn/g1/"],
    ["H1 / H1-2", "高动态全尺寸人形机器人", "High-dynamic full-size humanoid", "https://www.unitree.com/h1/"],
    ["R1-D", "R1 数据采集与应用平台", "R1 data-capture and application platform", "https://www.unitree.com/cn/R1-D/"],
    ["G1-D", "G1 数据采集平台", "G1 data-capture platform", "https://www.unitree.com/cn/G1-D/"],
    ["G1-Comp", "人形机器人竞赛平台", "Humanoid competition platform", "https://www.unitree.com/cn/G1-Comp/"],
  ].map(([name, zhType, enType, url], index) => p({ id: `deep-unitree-humanoid-${index + 1}`, companySlug: "unitree", name, primary: "robot-platform", subclass: "humanoid-robot", category: "robot-platform", type: text(zhType, enType), summary: name === "G1" ? text("标准版与 EDU 版覆盖 23–43 自由度，面向运动、控制和具身应用开发。", "Standard and EDU editions span 23–43 DoF for locomotion, control, and embodied-application development.") : name === "H2" ? text("182 cm 级全尺寸平台，公开 31 自由度、约 70 kg 和约 3 h 续航口径。", "A 182 cm-class platform with 31 DoF, about 70 kg mass, and a published endurance of about 3 h.") : text("宇树当前官网人形机器人或应用型整机系列。", "A humanoid or application-specific robot family in Unitree's current catalog."), applications: [text("人形机器人科研、数据和任务开发", "Humanoid research, data, and task development")], parameters: name === "G1" ? [metric("站立/折叠尺寸", "Standing/folded size", "1,320×450×200 / 690×450×300 mm", "1,320×450×200 / 690×450×300 mm"), metric("质量", "Mass", "约 35 kg", "About 35 kg"), metric("自由度", "DoF", "23–43", "23–43"), metric("膝关节峰值扭矩", "Peak knee torque", "90–120 N·m", "90–120 N·m"), metric("手臂负载", "Arm payload", "2–3 kg（按版本）", "2–3 kg by edition"), metric("电池", "Battery", "13S / 9,000 mAh", "13S / 9,000 mAh"), metric("续航", "Endurance", "约 2 h", "About 2 h"), metric("感知", "Perception", "深度相机 + 3D 激光雷达", "Depth camera + 3D LiDAR")] : name === "H2" ? [metric("高度", "Height", "1,820 mm", "1,820 mm"), metric("质量", "Mass", "约 70 kg", "About 70 kg"), metric("自由度", "DoF", "31", "31"), metric("手臂额定负载", "Rated arm payload", "约 7 kg", "About 7 kg"), metric("续航", "Endurance", "约 3 h", "About 3 h"), metric("腿部峰值扭矩", "Peak leg torque", "360 N·m", "360 N·m") ] : [metric("产品层级", "Product level", name.endsWith("-D") || name.includes("Comp") ? "应用型整机" : "完整人形机器人", name.endsWith("-D") || name.includes("Comp") ? "Application-specific robot" : "Complete humanoid robot"), metric("官网状态", "Official status", "当前目录可见", "Visible in current catalog")], officialUrl: url, imageUrl: name === "G1" ? images.unitreeG1 : undefined, imageSourceUrl: url, imageCredit: text("宇树官网", "Unitree official website"), level: name === "G1" || name === "H2" ? "model" : "family", useCases: ["research", "manufacturing", "integration"] })),
  ...[
    ["Dex2/5", "dexterous-hand", "双指/五指灵巧手系列", "Two-/five-finger dexterous-hand family"],
    ["Dex1-1", "dexterous-hand", "紧凑灵巧手", "Compact dexterous hand"],
    ["Dex5-1", "dexterous-hand", "五指灵巧手", "Five-finger dexterous hand"],
    ["Dex3-1", "dexterous-hand", "三指力控灵巧手", "Three-finger force-controlled dexterous hand"],
    ["Z1 / D1-T", "robot-arm", "独立机械臂", "Standalone robot arm"],
  ].map(([name, subclass, zhType, enType], index) => p({ id: `deep-unitree-manipulator-${index + 1}`, companySlug: "unitree", name, primary: "manipulator-end-effector", subclass, category: "end-effector", type: text(zhType, enType), summary: text("宇树官网当前目录中的手部或机械臂产品系列。", "A hand or arm family in Unitree's current official catalog."), applications: [text("人形机器人和四足平台操作", "Manipulation on humanoid and quadruped platforms")], parameters: name.startsWith("Z1") ? [metric("自由度", "DoF", "6/7（按版本）", "6/7 by edition"), metric("额定负载", "Rated payload", "3 kg", "3 kg"), metric("臂展", "Reach", "700 mm", "700 mm"), metric("质量", "Mass", "约 4.3 kg", "About 4.3 kg")] : [metric("产品层级", "Product level", "独立末端产品", "Standalone end-effector product"), metric("开发资料", "Developer material", "官方文档中心可查", "Available in official documentation")], officialUrl: name.startsWith("Z1") ? "https://www.unitree.com/cn/z1/" : "https://support.unitree.com/home/zh/developer/", level: name.startsWith("Z1") ? "model" : "family", useCases: ["research", "integration"] })),
  ...[
    ["4D LiDAR L1 / L2", "sensing", "lidar", "4D 激光雷达", "4D LiDAR"],
    ["SV1-25", "sensing", "vision-sensor", "具身立体双目相机", "Embodied stereo camera"],
    ["仿生机器人关节电机", "motion-transmission", "integrated-joint", "机器人关节电机系列", "Robot joint-motor family"],
    ["无刷数字舵机", "motion-transmission", "motor-servo", "无刷数字舵机系列", "Brushless digital-servo family"],
    ["GO-M8010-6", "motion-transmission", "integrated-joint", "四足机器人关节电机", "Quadruped joint motor"],
    ["B1-16", "motion-transmission", "integrated-joint", "IP68 防水关节", "IP68 waterproof joint"],
  ].map(([name, primary, subclass, zhType, enType], index) => p({ id: `deep-unitree-component-${index + 1}`, companySlug: "unitree", name, primary, subclass, category: primary === "sensing" ? "perception" : "motion", type: text(zhType, enType), summary: text("宇树整机生态中可独立识别的感知或关节组件。", "A separately identifiable sensing or joint component in the Unitree ecosystem."), applications: [text("机器人本体集成与开发", "Robot-body integration and development")], parameters: name.startsWith("4D") ? [metric("视场", "Field of view", "360°×90°（L1 公开口径）", "360°×90° (published L1 figure)"), metric("最小探测距离", "Minimum detection range", "0.05 m（L1）", "0.05 m (L1)")] : name === "B1-16" ? [metric("防护", "Ingress protection", "IP68", "IP68"), metric("产品层级", "Product level", "一体化关节", "Integrated joint")] : [metric("产品层级", "Product level", primary === "sensing" ? "传感组件" : "驱动/关节组件", primary === "sensing" ? "Sensing component" : "Drive/joint component"), metric("官网状态", "Official status", "当前目录可见", "Visible in current catalog")], officialUrl: "https://support.unitree.com/", level: "family", useCases: ["research", "integration"] })),

  ...[
    ["Linker Hand O6", "O6", "https://www.linkerbot.cn/details/LinkerHandO6", images.linkerO6, "6 主动+5 被动", "6 active + 5 passive", "360 g", "50 kg", "70 N", "CAN / CAN-FD / RS485 / EtherCAT"],
    ["Linker Hand L6", "L6", "https://www.linkerbot.cn/details/LinkerHandL6", images.linkerO6, "6 主动+5 被动", "6 active + 5 passive", "607 g", "28 kg", "50 N", "CAN / RS485"],
    ["Linker Hand L20 Lite", "L20 Lite", "https://www.linkerbot.cn/details/LinkerHandL20Lite", images.linkerL30, "10 主动+10 被动", "10 active + 10 passive", "800 g", "25 kg", "80 N", "CAN / RS485"],
    ["Linker Hand L20", "L20", "https://www.linkerbot.cn/details/LinkerHandL20", images.linkerL30, "16 主动+5 被动", "16 active + 5 passive", "约 1,200 g", "20 kg", "100 N", "CAN / RS485"],
    ["Linker Hand O30", "O30", "https://www.linkerbot.cn/details/LinkerHandO30", images.linkerO6, "20 全主动", "20 fully actuated", "730 g", "30 kg", "70 N", "CAN / CAN-FD"],
    ["Linker Hand L30", "L30", "https://www.linkerbot.cn/details/LinkerHandL30", images.linkerL30, "18 主动+4 被动", "18 active + 4 passive", "1,192 g", "15 kg", "39 N", "CAN-FD"],
  ].map(([fullName, shortName, url, image, dofZh, dofEn, mass, payload, grip, interfaces], index) => p({ id: `deep-linker-hand-${index + 1}`, companySlug: "linkerbot", name: fullName, primary: "manipulator-end-effector", subclass: "dexterous-hand", category: "end-effector", type: text(index === 4 ? "全主动直驱五指灵巧手" : index === 5 ? "腱绳仿生五指灵巧手" : "五指连杆灵巧手", index === 4 ? "Fully actuated direct-drive five-finger hand" : index === 5 ? "Tendon-driven biomimetic five-finger hand" : "Five-finger linkage hand"), summary: text(`${shortName} 面向不同自由度、负载和响应速度的整手集成。`, `${shortName} targets a distinct balance of DoF, payload, and response speed.`), applications: [text("科研、工业装配、物流和服务操作", "Research, industrial assembly, logistics, and service manipulation")], parameters: [metric("自由度", "DoF", dofZh, dofEn), metric("质量", "Mass", mass, mass), metric("最大负载", "Maximum payload", payload, payload), metric("五指最大抓握力", "Maximum five-finger grip force", grip, grip), metric("重复定位精度", "Repeatability", index === 3 || index === 4 || index === 5 ? "±0.20 mm" : "<±0.20 mm", index === 3 || index === 4 || index === 5 ? "±0.20 mm" : "<±0.20 mm"), metric("控制接口", "Control interfaces", interfaces, interfaces), ...(shortName === "L30" ? [metric("开合时间", "Open/close time", "0.2 s", "0.2 s"), metric("通信频率", "Communication rate", "500 Hz", "500 Hz"), metric("工作电压", "Operating voltage", "24 VDC ±10%", "24 VDC ±10%"), metric("最大电流", "Maximum current", "2.71 A", "2.71 A")] : shortName === "O30" ? [metric("开合时间", "Open/close time", "0.8 s", "0.8 s"), metric("通信频率", "Communication rate", "500 Hz", "500 Hz"), metric("最大功率", "Maximum power", "150 W", "150 W")] : shortName === "L20" ? [metric("工作电压", "Operating voltage", "24–48 VDC", "24–48 VDC"), metric("最大指尖力", "Maximum fingertip force", "拇指 15 N；四指 20 N", "Thumb 15 N; fingers 20 N")] : [])], officialUrl: url, imageUrl: image, imageSourceUrl: url, imageCredit: text("灵心巧手官网", "LinkerBot official website"), useCases: ["research", "manufacturing", "logistics", "integration"] })),
  ...[
    ["Linker Arm P7", "robot-arm", "七自由度机械臂", "Seven-DoF robot arm"],
    ["Linker Humanoid", "humanoid-robot", "具身机器人平台", "Embodied robot platform"],
    ["Linker MCG", "gripper", "多用途夹持/操作组件", "Multi-purpose gripping/manipulation component"],
    ["Linker FFG", "end-effector-general", "力反馈遥操作手套", "Force-feedback teleoperation glove"],
    ["Linker TA", "development-tool", "遥操作与数据采集系统", "Teleoperation and data-capture system"],
    ["LinkerSkillStore", "development-tool", "灵巧操作技能库", "Dexterous-manipulation skill library"],
  ].map(([name, subclass, zhType, enType], index) => p({ id: `deep-linker-platform-${index + 1}`, companySlug: "linkerbot", name, primary: subclass === "humanoid-robot" ? "robot-platform" : subclass === "development-tool" ? "software-tools" : "manipulator-end-effector", subclass, category: subclass === "humanoid-robot" ? "robot-platform" : subclass === "development-tool" ? "model-software" : "end-effector", type: text(zhType, enType), summary: text("官网当前产品体系中独立列出的平台或硬件入口；参数按官网公开层级记录。", "A platform or hardware entry listed separately in the current official catalog; specifications follow the public disclosure level."), applications: [text("灵巧操作、遥操作和系统集成", "Dexterous manipulation, teleoperation, and system integration")], parameters: [metric("官网状态", "Official status", "当前产品体系可见", "Visible in current product system"), metric("产品层级", "Product level", subclass === "development-tool" ? "软件/数据平台" : "硬件/系统平台", subclass === "development-tool" ? "Software/data platform" : "Hardware/system platform")], officialUrl: "https://www.linkerbot.cn/", level: "platform" })),
  p({ id: "deep-linker-hand-o20", companySlug: "linkerbot", name: "Linker Hand O20", primary: "manipulator-end-effector", subclass: "dexterous-hand", category: "end-effector", type: text("全主动直驱五指灵巧手", "Fully actuated direct-drive five-finger hand"), summary: text("16 个全主动自由度的直驱灵巧手。", "A direct-drive dexterous hand with 16 fully actuated DoF."), applications: [text("科研、工业装配、物流和服务操作", "Research, industrial assembly, logistics, and service manipulation")], parameters: [metric("产品层级", "Product level", "型号级", "Model level")], officialUrl: "https://www.linkerbot.cn/", level: "model", useCases: ["research", "manufacturing", "logistics", "integration"] }),
  p({ id: "deep-linker-eg", companySlug: "linkerbot", name: "Linker EG", primary: "manipulator-end-effector", subclass: "end-effector-general", category: "end-effector", type: text("移动双臂操作平台", "Mobile dual-arm manipulation platform"), summary: text("面向具身操作、遥操作和数据采集的移动双臂平台。", "A mobile dual-arm platform for embodied manipulation, teleoperation, and data collection."), applications: [text("具身操作、数据采集和系统集成", "Embodied manipulation, data collection, and system integration")], parameters: [metric("产品层级", "Product level", "系统平台", "System platform")], officialUrl: "https://www.linkerbot.cn/details/LinkerEG/", level: "platform", useCases: ["research", "logistics", "integration"] }),
  p({ id: "deep-linker-open-teledex", companySlug: "linkerbot", name: "Linker Open TeleDex", primary: "software-tools", subclass: "development-tool", category: "model-software", type: text("开放遥操作数据采集平台", "Open teleoperation data-capture platform"), summary: text("覆盖手套、外骨骼、VR 和中间件的开放遥操作数据平台。", "An open teleoperation-data platform spanning gloves, exoskeletons, VR, and middleware."), applications: [text("具身数据采集、遥操作和策略训练", "Embodied-data capture, teleoperation, and policy training")], parameters: [metric("公开层级", "Disclosure level", "平台能力", "Platform capabilities")], officialUrl: "https://www.linkerbot.cn/data/", level: "platform", specificationKind: "capabilities", useCases: ["research", "integration"] }),
  p({ id: "deep-linker-genesis", companySlug: "linkerbot", name: "Linker Genesis", primary: "software-tools", subclass: "robot-model", category: "model-software", type: text("具身操作模型平台", "Embodied-manipulation model platform"), summary: text("官网数据产品体系中列出的具身模型平台。", "An embodied-model platform listed in the official data-product portfolio."), applications: [text("具身策略研究和操作技能开发", "Embodied-policy research and manipulation-skill development")], parameters: [metric("公开层级", "Disclosure level", "平台能力", "Platform capabilities")], officialUrl: "https://www.linkerbot.cn/data/", level: "platform", specificationKind: "capabilities", useCases: ["research", "integration"] }),
];

const detailedProductContent = [
  ...paxiniProductContent,
  ...galbotProductContent,
  ...linkerBotProductContent,
  ...aheadFormProductContent,
  ...tarsProductContent,
  ...unitreeProductContent,
];
const productContentById = new Map(detailedProductContent.map((product) => [product.id, product]));

if (productContentById.size !== detailedProductContent.length) {
  throw new Error(`Detailed product catalog audit failed: ${detailedProductContent.length - productContentById.size} duplicate ID(s).`);
}

const productSeedIds = new Set(productSeeds.map((product) => product.id));
const products: DeepProductSeed[] = [
  ...productSeeds.map((product) => {
    const content = productContentById.get(product.id);
    return content ? { ...product, ...content } : product;
  }),
  ...unitreeProductContent.filter((product) => !productSeedIds.has(product.id)),
];

const companyBySlug = new Map(companies.map((company) => [company.slug, company]));

const localizedMilestones = (locale: Locale, items: Milestone[]) => items.map((item) => ({ date: item.date, title: pick(locale, item.title), detail: pick(locale, item.detail), sourceUrl: item.sourceUrl, kind: item.kind }));
const localizedFunding = (locale: Locale, items: FundingRound[]) => items.map((item) => ({ date: item.date, round: pick(locale, item.round), amount: pick(locale, item.amount), investors: pick(locale, item.investors), sourceUrl: item.sourceUrl }));
const localizedSources = (locale: Locale, items: Link[]) => items.map((item) => ({ label: pick(locale, item.label), url: item.url }));

const inferHistoryKind = (item: Milestone): CompanyHistoryKind => {
  if (item.kind) return item.kind;
  const title = `${item.title.zh} ${item.title.en}`;
  if (/成立|创立|founded|foundation/i.test(title)) return "founding";
  if (/融资|投资|轮|funding|investment|series|round/i.test(title)) return "funding";
  return "product";
};

const historySortKey = (date: string) => date.length === 4 ? `${date}-12` : date;

const localizedHistory = (locale: Locale, company: DeepCompanySeed) => [
  ...company.milestones
    .filter((item) => inferHistoryKind(item) !== "funding")
    .map((item) => ({
      date: item.date,
      title: pick(locale, item.title),
      detail: pick(locale, item.detail),
      sourceUrl: item.sourceUrl,
      kind: inferHistoryKind(item),
    })),
  ...company.fundingRounds.map((item) => ({
    date: item.date,
    title: pick(locale, item.round),
    detail: `${pick(locale, item.amount)} · ${pick(locale, item.investors)}`,
    sourceUrl: item.sourceUrl,
    kind: "funding" as const,
  })),
].sort((a, b) => historySortKey(a.date).localeCompare(historySortKey(b.date)));

export const deepResearchCompanySlugs = companies.map((company) => company.slug);
export const deepResearchCountryBySlug: Record<string, string> = Object.fromEntries(companies.map((company) => [company.slug, "cn"]));
export const deepResearchFundingBySlug: Record<string, { stage: string; scale: string }> = {
  "tars-robotics": { stage: "series-a", scale: "100m-1b" },
  paxini: { stage: "series-b", scale: "100m-1b" },
  galbot: { stage: "series-d", scale: "100m-1b" },
  unitree: { stage: "ipo", scale: "100m-1b" },
  linkerbot: { stage: "series-b", scale: "100m-1b" },
};

export function getDeepResearchCompany(slug: string, locale: Locale) {
  const company = companyBySlug.get(slug);
  if (!company) return undefined;
  const companyProducts = products.filter((product) => product.companySlug === slug);
  return {
    slug: company.slug,
    heroImage: company.heroImage,
    heroImageAlt: pick(locale, company.heroImageAlt),
    heroImageSourceUrl: company.heroImageSourceUrl,
    heroImageCredit: pick(locale, company.heroImageCredit),
    investmentView: company.investmentView.map((item) => pick(locale, item)),
    milestones: localizedMilestones(locale, company.milestones),
    historyEvents: localizedHistory(locale, company),
    fundingRounds: localizedFunding(locale, company.fundingRounds),
    sourceLinks: localizedSources(locale, company.sourceLinks),
    products: companyProducts.map((product) => ({
      id: product.id,
      name: locale === "en" ? product.nameEn ?? product.name : product.name,
      type: pick(locale, product.type),
      summary: pick(locale, product.summary),
      officialUrl: product.officialUrl,
      imageUrl: product.imageUrl,
      imageAlt: `${locale === "en" ? product.nameEn ?? product.name : product.name} - ${pick(locale, product.type)}`,
      imageSourceUrl: product.imageSourceUrl,
      imageCredit: product.imageCredit ? pick(locale, product.imageCredit) : undefined,
      parameterCount: product.parameters.length,
    })),
  };
}

export function getDeepCompanyProfiles(locale: Locale): CompanyProfile[] {
  return companies.map((company) => {
    const companyProducts = products.filter((product) => product.companySlug === company.slug);
    return {
      slug: company.slug,
      name: pick(locale, company.name),
      englishName: company.englishName,
      industry: company.industry,
      valueChainRole: pick(locale, company.role),
      positioning: pick(locale, company.positioning),
      strengths: company.strengths.map((item) => pick(locale, item)),
      products: companyProducts.map((item) => locale === "en" ? item.nameEn ?? item.name : item.name),
      fit: company.fit.map((item) => pick(locale, item)),
      verificationFocus: pick(locale, company.verification),
      presalesQuestions: company.questions.map((item) => pick(locale, item)),
      sourceIds: company.slug === "paxini" ? ["ref-35", "ref-36", "ref-37", "ref-38"] : company.slug === "galbot" ? ["ref-22", "ref-23", "ref-24"] : company.slug === "unitree" ? ["ref-51", "ref-52"] : company.slug === "linkerbot" ? ["ref-115", "ref-29", "ref-30", "ref-31", "ref-32"] : [],
      reviewedAt: company.reviewedAt,
      legalName: pick(locale, company.legalName),
      country: pick(locale, company.country),
      headquarters: pick(locale, company.headquarters),
      founded: pick(locale, company.founded),
      officialUrl: company.officialUrl,
      overview: company.overview.map((item) => pick(locale, item)),
      businessAreas: company.businessAreas.map((item) => pick(locale, item)),
      customerGroups: company.customerGroups.map((item) => pick(locale, item)),
      milestones: company.milestones.map((item) => ({ date: item.date, event: `${pick(locale, item.title)}：${pick(locale, item.detail)}` })),
      catalogScope: pick(locale, company.catalogScope),
      catalogCoverage: "family-complete",
    };
  });
}

export function getDeepProductRecords(locale: Locale): FinderExpansionRecord[] {
  return products.map((product) => {
    const company = companyBySlug.get(product.companySlug);
    if (!company) throw new Error(`Missing deep company: ${product.companySlug}`);
    const profileProducts = products.filter((item) => item.companySlug === company.slug);
    const evidence: FinderEvidence = {
      level: product.level ?? "model",
      specificationKind: product.specificationKind ?? "parameters",
      specificationCoverage: product.specificationCoverage,
      imageUrl: product.imageUrl,
      imageAlt: product.imageUrl ? `${locale === "en" ? product.nameEn ?? product.name : product.name} - ${pick(locale, product.type)}` : undefined,
      imageSourceUrl: product.imageSourceUrl,
      imageCredit: product.imageCredit ? pick(locale, product.imageCredit) : undefined,
      overview: (product.overview ?? [product.summary]).map((item) => pick(locale, item)),
      highlights: product.highlights?.map((item) => ({ title: pick(locale, item.title), detail: pick(locale, item.detail) })),
      variants: product.variants?.map((item) => ({ series: pick(locale, item.series), model: item.model, form: pick(locale, item.form), dimensions: item.dimensions })),
      applications: product.applications.map((item) => pick(locale, item)),
      disclosureBoundary: locale === "zh"
        ? "仅录入厂商官网、官方手册或具名公开报道中的产品和参数。未公开字段不填入数值，也不以产品系列参数替代具体型号参数。"
        : "Only products and specifications found in official sites, manuals, or named public reporting are recorded. Undisclosed fields remain absent, and family-level figures are not substituted for model-level specifications.",
      sourceLinks: [{ label: locale === "zh" ? "产品官方资料" : "Official product material", url: product.officialUrl }, ...localizedSources(locale, product.sourceLinks ?? [])],
      companyTimeline: localizedHistory(locale, company),
      fundingRounds: localizedFunding(locale, company.fundingRounds),
      investmentView: company.investmentView.map((item) => pick(locale, item)),
    };
    const parameters: FinderParameter[] = product.parameters.map((item) => ({ label: pick(locale, item.label), value: pick(locale, item.value), status: "manufacturer" }));
    return {
      id: product.id,
      matrixSlug: "",
      matrixTitle: "Jeeling Deep Research",
      industry: company.industry,
      reviewedAt: company.reviewedAt,
      product: locale === "en" ? product.nameEn ?? product.name : product.name,
      company: pick(locale, company.name),
      type: pick(locale, product.type),
      openness: locale === "zh" ? "官方产品页或官方手册可查；采购版本与开发权限需按项目确认" : "Official product pages or manuals are available; confirm purchasable edition and developer access per project",
      integration: product.integration ? pick(locale, product.integration) : pick(locale, product.summary),
      verificationFocus: product.verification ? pick(locale, product.verification) : pick(locale, company.verification),
      sourceIds: [],
      officialUrl: product.officialUrl,
      category: product.category,
      useCases: product.useCases ?? ["research", "integration"],
      opennessLevel: "documented",
      parameters,
      catalogPrimary: product.primary,
      catalogSubclass: product.subclass,
      catalogCoverage: "family-complete",
      catalogScope: pick(locale, company.catalogScope),
      evidence,
      profile: {
        slug: company.slug,
        valueChainRole: pick(locale, company.role),
        positioning: pick(locale, company.positioning),
        strengths: company.strengths.map((item) => pick(locale, item)),
        products: profileProducts.map((item) => locale === "en" ? item.nameEn ?? item.name : item.name),
        fit: company.fit.map((item) => pick(locale, item)),
        questions: company.questions.map((item) => pick(locale, item)),
        sourceIds: [],
        reviewedAt: company.reviewedAt,
        legalName: pick(locale, company.legalName),
        country: pick(locale, company.country),
        headquarters: pick(locale, company.headquarters),
        founded: pick(locale, company.founded),
        officialUrl: company.officialUrl,
        overview: company.overview.map((item) => pick(locale, item)),
        businessAreas: company.businessAreas.map((item) => pick(locale, item)),
        customerGroups: company.customerGroups.map((item) => pick(locale, item)),
        milestones: company.milestones.map((item) => ({ date: item.date, event: `${pick(locale, item.title)}: ${pick(locale, item.detail)}` })),
        catalogScope: pick(locale, company.catalogScope),
        catalogCoverage: "family-complete",
      },
    };
  });
}

export const deepResearchExpectedCounts = Object.fromEntries(companies.map((company) => [company.slug, products.filter((product) => product.companySlug === company.slug).length]));
