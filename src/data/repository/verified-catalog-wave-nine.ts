import type { Locale } from "../site";
import type { CompanyProfile } from "./catalog";
import type {
  FinderCategory,
  FinderExpansionRecord,
  FinderParameter,
  FinderSpecificationCoverage,
  FinderUseCase,
} from "./product-finder-demo";
import { withParameterIndex } from "./parameter-index";

type Localized = { zh: string; en: string };
type WaveNineCompanySlug = typeof waveNineCompanySlugs[number];

type SpecRow = {
  label: Localized;
  value: Localized;
  sourceUrl: string;
  sourceLabel: Localized;
  locator: Localized;
  conditions?: Localized;
};

type ProductSeed = {
  id: string;
  companySlug: WaveNineCompanySlug;
  product: string;
  pageUrl: string;
  category: FinderCategory;
  primary: string;
  subclass: string;
  useCases: FinderUseCase[];
  type: Localized;
  integration: Localized;
  verification: Localized;
  rows: SpecRow[];
  overview: Localized[];
  applications: Localized[];
  coverage: FinderSpecificationCoverage;
  catalogScope?: Localized;
  sourceLinks?: Array<{ label: Localized; url: string }>;
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const t = (locale: Locale, value: Localized) => value[locale];

const ELITE_HOME = "https://www.elibot.com/";
const ELITE_ABOUT = "https://www.elibot.com/about/profile";
const ELITE_CS = "https://www.elibot.com/product/collaborative/cs";
const KINOVA_HOME = "https://www.kinovarobotics.com/";
const KINOVA_ABOUT = "https://www.kinovarobotics.com/medical/about-kinova";
const KINOVA_GEN3 = "https://www.kinovarobotics.com/uploads/Kinova_Onepager_Gen3_2026_EN.pdf";
const KINOVA_GEN3_LITE = "https://www.kinovarobotics.com/uploads/Kinova_Onepager_Gen3-Lite_2024_EN_2024-07-11-171759_yykn.pdf";
const KINOVA_LINK6 = "https://www.kinovarobotics.com/uploads/Kinova_Onepager_Link6_EN_2024-1.pdf";
const KINOVA_JACO = "https://assistive.kinovarobotics.com/product/jaco-robotic-arm";

export const waveNineCompanySlugs = ["elite-robots", "kinova"] as const;
const waveNineCompanySlugSet = new Set<string>(waveNineCompanySlugs);
export const isWaveNineCompanySlug = (slug: string) => waveNineCompanySlugSet.has(slug);

const patchElite = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: t(locale, l("艾利特智能机器人股份有限公司", "Elite Robots Co., Ltd.")),
  country: t(locale, l("中国", "China")),
  headquarters: t(locale, l("中国苏州", "Suzhou, China")),
  founded: "2016",
  officialUrl: ELITE_HOME,
  valueChainRole: t(locale, l("协作机器人、特种协作机器人和复合机器人厂商", "Collaborative, application-specific collaborative, and mobile-manipulator robot manufacturer")),
  positioning: t(locale, l("以 ES、LS、CS、CSA、CS-Ex、CSF 和 CSH 系列覆盖通用协作、长臂展、防爆、食品、码垛等场景，并提供移动复合机器人。", "Covers general collaboration, long reach, explosion-protected use, food handling, palletizing, and related applications through the ES, LS, CS, CSA, CS-Ex, CSF, and CSH families, plus mobile manipulators.")),
  strengths: [
    t(locale, l("当前 CS 系列公开 3 kg 至 30 kg 负载、624 mm 至 1800 mm 工作半径的九个具名型号。", "The current CS family publishes nine named models spanning 3 kg to 30 kg payload and 624 mm to 1,800 mm reach.")),
    t(locale, l("型号页逐项公开关节范围和速度、工具端供电与 I/O、控制箱、示教器、防护和环境条件。", "Model pages publish joint ranges and speeds, tool power and I/O, controllers, pendants, ingress protection, and environmental limits field by field.")),
    t(locale, l("产品目录把食品、防爆、码垛和移动操作配置分为独立系列，选型时仍需按认证版本和项目配置核验。", "The catalog separates food, explosion-protected, palletizing, and mobile-manipulation configurations; selection still requires verification against the certified version and project configuration.")),
  ],
  products: ["CS63", "CS66", "CS68", "CS612", "CS616", "CS618", "CS620", "CS625", "CS630", "ES series", "LS65", "CSA series", "CS-Ex series", "CSF series", "CSH series", "DC and MC mobile robots"],
  fit: [
    t(locale, l("装配、上下料、焊接、码垛、打磨、检测和包装工作站。", "Assembly, machine tending, welding, palletizing, finishing, inspection, and packaging cells.")),
    t(locale, l("需要 IP68 本体、长臂展、大负载或工具端多路 I/O 的协作自动化。", "Collaborative automation requiring an IP68 arm, long reach, higher payload, or multiple tool-side I/O channels.")),
    t(locale, l("食品、防爆和移动操作等需锁定专项认证或系统边界的应用。", "Food, explosion-protected, and mobile-manipulation applications requiring application-specific certification or system boundaries.")),
  ],
  overview: [
    t(locale, l("艾利特于 2016 年启动控制器原型研发，官网发展历程记录了 2017 年协作机器人项目、七轴样机与 A 轮融资，2019 年 EC 系列量产及 CS 项目启动，2022 年 CS 系列量产。", "Elite began controller-prototype development in 2016. Its official timeline records a cobot project, seven-axis prototype, and Series A in 2017, EC-series mass production and the start of the CS project in 2019, and CS-series mass production in 2022.")),
    t(locale, l("本批次将 CS 系列九个型号从系列摘要拆成独立记录，并覆盖当前各型号页参数表的全部公开字段。型号共享 IP68、工具 I/O 和控制架构，但负载、臂展、质量、速度、功耗、底座和控制箱不同，不能互相替代。", "This wave replaces the CS family summary with nine model records and covers every public field in each current model-page specification table. The models share IP68 protection, tool I/O, and a control architecture, but payload, reach, mass, speed, power, base, and controller differ and are not interchangeable.")),
    t(locale, l("官网的产品数量、客户规模和市场覆盖属于厂商陈述；它们不能替代第三方装机量、可用率或项目验收数据。协作机器人是否可免围栏运行仍取决于整机应用的风险评估。", "Product counts, customer scale, and market coverage on the website are manufacturer statements rather than independent installed-base, availability, or project-acceptance evidence. Fence-free operation still depends on a risk assessment of the complete application.")),
  ],
  businessAreas: [
    t(locale, l("通用协作机器人本体与控制系统", "General collaborative robot arms and controls")),
    t(locale, l("食品、防爆、码垛和长臂展专项协作机器人", "Food, explosion-protected, palletizing, and long-reach cobots")),
    t(locale, l("移动底盘与机械臂一体化复合机器人", "Integrated mobile-base and robot-arm systems")),
  ],
  customerGroups: [
    t(locale, l("汽车、电子、新能源、金属、食品和一般制造企业", "Automotive, electronics, new-energy, metal, food, and general manufacturers")),
    t(locale, l("焊接、码垛、上下料、检测和移动操作系统集成商", "Welding, palletizing, machine-tending, inspection, and mobile-manipulation integrators")),
    t(locale, l("高校、研究机构和协作自动化开发团队", "Universities, research institutes, and collaborative-automation developers")),
  ],
  milestones: [
    { date: "2016", event: t(locale, l("控制器原型研发启动并完成 Pre-A 轮融资。", "Controller-prototype development began and Pre-Series A financing was completed.")) },
    { date: "2017", event: t(locale, l("启动协作机器人项目，完成七轴机器人样机和 A 轮融资。", "The cobot project began, a seven-axis prototype was completed, and Series A financing closed.")) },
    { date: "2019", event: t(locale, l("EC 系列进入量产，CS 项目启动。", "The EC series entered mass production and the CS project began.")) },
    { date: "2020", event: t(locale, l("CS 系列原型完成。", "The CS-series prototype was completed.")) },
    { date: "2021", event: t(locale, l("设立北美子公司、北京研发中心、上海总部和苏州工厂。", "North American operations, a Beijing R&D center, Shanghai headquarters, and a Suzhou plant were established.")) },
    { date: "2022", event: t(locale, l("CS 系列进入量产。", "The CS series entered mass production.")) },
  ],
  catalogScope: t(locale, l("本批次完整转录当前 CS 系列九个型号页的规格表。ES、LS、CSA、CS-Ex、CSF、CSH 和移动机器人仍需按型号继续补录，因此公司目录暂不标记为全产品完成。", "This wave fully transcribes the specification tables for the nine current CS models. ES, LS, CSA, CS-Ex, CSF, CSH, and mobile robots still require model-level records, so the company catalog is not yet marked complete.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定具体系列与型号、负载重心、臂展、节拍、工具供电与 I/O、控制箱、防护、认证版本、安全功能和交付附件。", "Lock the exact family and model, payload center of gravity, reach, cycle time, tool power and I/O, controller, protection, certified version, safety functions, and delivered accessories.")),
  presalesQuestions: [
    t(locale, l("目标负载、工具、重心和轨迹下应选择哪个型号，动态负载曲线是否满足？", "Which model fits the target payload, tool, center of gravity, and trajectory, and does its dynamic load envelope hold?")),
    t(locale, l("工具端供电、I/O、RS-485/CAN、控制箱和现场总线版本如何锁定？", "How will the tool power, I/O, RS-485/CAN, controller, and fieldbus revisions be locked?")),
    t(locale, l("食品、防爆、码垛或移动配置需要哪些专项认证、风险评估和验收文件？", "Which application-specific certifications, risk assessments, and acceptance documents are required for food, explosion-protected, palletizing, or mobile configurations?")),
  ],
  reviewedAt: "2026-09-04",
});

const patchKinova = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: "Kinova Inc.",
  country: t(locale, l("加拿大", "Canada")),
  headquarters: t(locale, l("加拿大魁北克省布瓦布里扬", "Boisbriand, Quebec, Canada")),
  founded: "2006",
  officialUrl: KINOVA_HOME,
  valueChainRole: t(locale, l("研究、工业协作、辅助和医疗机器人平台厂商", "Research, industrial-collaborative, assistive, and medical robotics-platform manufacturer")),
  positioning: t(locale, l("从轮椅辅助机械臂扩展到 Gen3 研究机械臂、Link 6 工业协作机器人和面向医疗集成的 KIMA、执行器与控制软件。", "Expanded from wheelchair-mounted assistive arms to Gen3 research manipulators, the Link 6 industrial cobot, and KIMA, actuators, and control software for medical integration.")),
  strengths: [
    t(locale, l("Gen3 提供 6 轴与 7 轴版本、1 kHz 低层控制、力矩传感和开放末端接口。", "Gen3 offers six- and seven-axis versions, 1 kHz low-level control, torque sensing, and an open end-effector interface.")),
    t(locale, l("Link 6 将六维力/力矩传感、工业 I/O、Modbus TCP 和腕部 24 V/4 A 供电集成到工业协作平台。", "Link 6 combines six-axis force/torque sensing, industrial I/O, Modbus TCP, and 24 V/4 A wrist power in an industrial collaborative platform.")),
    t(locale, l("Jaco 延续公司的辅助机器人业务；医疗页面同时列出 KIMA、机器人控制库、执行器系列、器械驱动和工程服务。", "Jaco continues the company's assistive-robotics line; its medical site also lists KIMA, a robot control library, actuator series, instrument drives, and engineering services.")),
  ],
  products: ["Gen3 6 DoF", "Gen3 7 DoF", "Gen3 lite", "Link 6", "Jaco", "KIMA", "Robotic Control Library", "Actuator Series A", "Instrument Drives", "Engineering Services"],
  fit: [
    t(locale, l("机器人操作、触觉、视觉、强化学习和移动操作研究。", "Manipulation, haptics, vision, reinforcement learning, and mobile-manipulation research.")),
    t(locale, l("上下料、装配、检测、包装、焊接和打磨等工业协作工作站。", "Industrial collaborative cells for machine tending, assembly, inspection, packaging, welding, and finishing.")),
    t(locale, l("轮椅辅助、医疗设备集成和需要定制执行器或控制软件的项目。", "Wheelchair assistance, medical-device integration, and projects requiring custom actuators or control software.")),
  ],
  overview: [
    t(locale, l("Kinova 于 2006 年在魁北克省布瓦布里扬成立，最初以帮助上肢活动受限人群恢复自主能力为目标。官方介绍称，公司随后扩展到研究、医疗设备、Physical AI 和自动化，并在加拿大完成机器人平台的设计、装配和测试。", "Kinova was founded in Boisbriand, Quebec, in 2006 with an initial mission of helping people with upper-limb limitations regain independence. Its official profile says the company later expanded into research, medical devices, Physical AI, and automation, with robot platforms designed, assembled, and tested in Canada.")),
    t(locale, l("本批次把 Gen3 的 6 轴和 7 轴配置拆开，并分别建立 Gen3 lite、Link 6 和 Jaco 记录。数据来源是当前官方一页式规格表或产品页；不同配置的负载条件、视觉选件、控制接口和用途边界没有合并。", "This wave separates the six- and seven-axis Gen3 configurations and adds individual Gen3 lite, Link 6, and Jaco records. Data comes from current official one-page specifications or product pages; payload conditions, vision options, control interfaces, and intended-use boundaries are not merged across configurations.")),
    t(locale, l("研究平台、工业协作机器人、辅助设备和医疗部件受不同安全、法规与支持边界约束。公开规格不能替代医疗合规、整机风险评估或特定应用的性能验证。", "Research platforms, industrial cobots, assistive devices, and medical components operate under different safety, regulatory, and support boundaries. Public specifications do not replace medical compliance, whole-system risk assessment, or application-specific performance validation.")),
  ],
  businessAreas: [
    t(locale, l("轻量研究机械臂与机器人开发平台", "Lightweight research manipulators and robot-development platforms")),
    t(locale, l("工业协作机器人与视觉选件", "Industrial cobots and vision options")),
    t(locale, l("轮椅辅助机器人", "Wheelchair-mounted assistive robotics")),
    t(locale, l("医疗机器人本体、执行器、控制库和工程服务", "Medical robot arms, actuators, control libraries, and engineering services")),
  ],
  customerGroups: [
    t(locale, l("高校、研究机构和机器人学习团队", "Universities, research institutes, and robot-learning teams")),
    t(locale, l("制造自动化集成商和工业用户", "Manufacturing integrators and industrial users")),
    t(locale, l("医疗器械厂商、医疗机器人开发者和辅助技术用户", "Medical-device manufacturers, medical-robotics developers, and assistive-technology users")),
  ],
  milestones: [
    { date: "2006", event: t(locale, l("公司在魁北克省布瓦布里扬成立，业务起点为辅助机器人。", "The company was founded in Boisbriand, Quebec, with assistive robotics as its starting point.")) },
    { date: "研究产品阶段", event: t(locale, l("Gen3 与 Gen3 lite 形成轻量研究机械臂产品线，并通过 Kortex API 提供高层和低层控制。", "Gen3 and Gen3 lite formed the lightweight research-arm line with high- and low-level control through the Kortex API.")) },
    { date: "工业产品阶段", event: t(locale, l("Link 6 将产品线扩展到工业协作机器人。", "Link 6 extended the product line into industrial collaborative robotics.")) },
    { date: "2026", event: t(locale, l("公司在成立二十周年期间发布面向医疗场景的 KIMA 机械臂。", "During its twentieth anniversary, the company launched the KIMA arm for medical applications.")) },
  ],
  catalogScope: t(locale, l("本批次完成 Gen3 6/7 轴、Gen3 lite、Link 6 和 Jaco 的当前公开规格块。KIMA、医疗执行器、器械驱动、控制库、视觉模块及辅助附件仍需独立资料页。", "This wave covers the current public specification blocks for Gen3 6/7 DoF, Gen3 lite, Link 6, and Jaco. KIMA, medical actuators, instrument drives, the control library, vision modules, and assistive accessories still need independent records.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定产品线、轴数、负载条件、臂展、末端与视觉配置、控制频率、API/ROS 版本、用途安全、法规边界和支持责任。", "Lock product line, axis count, payload condition, reach, end-effector and vision configuration, control frequency, API/ROS version, intended-use safety, regulatory boundary, and support responsibility.")),
  presalesQuestions: [
    t(locale, l("项目属于研究、工业、辅助还是医疗用途，对应的产品和合规边界是什么？", "Is the project for research, industrial, assistive, or medical use, and which product and compliance boundary applies?")),
    t(locale, l("Gen3 需要 6 轴还是 7 轴，连续负载按全臂展还是中段工作区计算？", "Does the Gen3 application require six or seven axes, and is continuous payload evaluated at full or mid range?")),
    t(locale, l("Kortex、ROS、低层控制、视觉、末端、工业 I/O 与安全回路如何做版本和责任验收？", "How will Kortex, ROS, low-level control, vision, tooling, industrial I/O, and the safety circuit be version- and responsibility-accepted?")),
  ],
  reviewedAt: "2026-09-04",
});

export const applyVerifiedWaveNineCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => {
  if (company.slug === "elite-robots") return patchElite(company, locale);
  if (company.slug === "kinova") return patchKinova(company, locale);
  return company;
};

const row = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  labelZh: string,
  labelEn: string,
  valueZh: string,
  valueEn = valueZh,
  conditions?: Localized,
): SpecRow => ({
  sourceUrl,
  sourceLabel,
  locator,
  label: l(labelZh, labelEn),
  value: l(valueZh, valueEn),
  conditions,
});

const finderProfile = (company: CompanyProfile): FinderExpansionRecord["profile"] => ({
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

const companyAboutUrl: Record<WaveNineCompanySlug, string> = {
  "elite-robots": ELITE_ABOUT,
  kinova: KINOVA_ABOUT,
};

const catalogTitle: Record<WaveNineCompanySlug, Localized> = {
  "elite-robots": l("艾利特型号级产品目录", "Elite model-level product catalog"),
  kinova: l("Kinova 型号级产品目录", "Kinova model-level product catalog"),
};

const toRecord = (locale: Locale, company: CompanyProfile, seed: ProductSeed): FinderExpansionRecord => ({
  id: seed.id,
  matrixSlug: "",
  matrixTitle: t(locale, catalogTitle[seed.companySlug]),
  industry: company.industry,
  reviewedAt: "2026-09-04",
  product: seed.product,
  company: company.name,
  type: t(locale, seed.type),
  openness: locale === "zh" ? "官方产品页或数据表公开" : "Official product page or datasheet is public",
  integration: t(locale, seed.integration),
  verificationFocus: t(locale, seed.verification),
  sourceIds: company.sourceIds,
  officialUrl: seed.pageUrl,
  category: seed.category,
  useCases: seed.useCases,
  opennessLevel: "documented",
  parameters: withParameterIndex(seed.rows.map((item): FinderParameter => ({
    label: t(locale, item.label),
    value: t(locale, item.value),
    status: "manufacturer",
    sourceUrl: item.sourceUrl,
    sourceLabel: t(locale, item.sourceLabel),
    sourceLocator: t(locale, item.locator),
    conditions: item.conditions ? t(locale, item.conditions) : undefined,
  })), seed.pageUrl, locale === "zh" ? "厂商官方产品资料" : "Official manufacturer product material"),
  catalogPrimary: seed.primary,
  catalogSubclass: seed.subclass,
  catalogCoverage: "model-partial",
  catalogScope: seed.catalogScope ? t(locale, seed.catalogScope) : (locale === "zh"
    ? "本记录对应具名型号；数值仅适用于引用来源、配置和条件。"
    : "This record maps to a named model; figures apply only to the cited source, configuration, and conditions."),
  profile: finderProfile(company),
  evidence: {
    level: "model",
    specificationKind: "parameters",
    specificationCoverage: seed.coverage,
    specificationCoverageNote: locale === "zh"
      ? seed.coverage === "official-complete"
        ? "已逐项覆盖当前引用官方规格表中该产品区块的全部公开字段；后续修订仍以来源页和订单文件为准。"
        : "已覆盖当前官方页面的主要规格字段，但尚未声明所有关联手册、选件和附件字段均已转录。"
      : seed.coverage === "official-complete"
        ? "Every public field in the cited product block of the current official specification table is covered; later revisions remain governed by the source and order documents."
        : "The main specification fields on the current official page are covered, but complete transcription of every related manual, option, and accessory field is not claimed.",
    overview: seed.overview.map((item) => t(locale, item)),
    applications: seed.applications.map((item) => t(locale, item)),
    disclosureBoundary: locale === "zh"
      ? "公开数值只适用于引用来源、具名型号、配置和测试条件；价格、交期、未公开字段和项目性能不作推断。"
      : "Published figures apply only to the cited source, named model, configuration, and test conditions; price, lead time, undisclosed fields, and project performance are not inferred.",
    sourceLinks: [...new Map([
      { label: locale === "zh" ? `${seed.product} 官方资料` : `${seed.product} official material`, url: seed.pageUrl },
      ...(seed.sourceLinks ?? []).map((item) => ({ label: t(locale, item.label), url: item.url })),
      { label: locale === "zh" ? "公司官方介绍" : "Official company profile", url: companyAboutUrl[seed.companySlug] },
    ].map((item) => [item.url, item])).values()],
  },
});

type EliteSpec = {
  model: string;
  pageId: number;
  payload: string;
  reach: string;
  repeatability: string;
  power: string;
  tcpSpeed: string;
  mass: string;
  base: string;
  jointSpeeds: [string, string, string, string, string, string];
  controller: string;
  optionalController: string;
  toolPower: string;
  toolCommunication: string;
  certification?: string;
};

const eliteSpecs: EliteSpec[] = [
  { model: "CS63", pageId: 8, payload: "3 kg", reach: "624 mm", repeatability: "±0.02 mm", power: "185 W", tcpSpeed: "2.0 m/s", mass: "15 kg", base: "Φ128 mm", jointSpeeds: ["180°/s", "180°/s", "230°/s", "230°/s", "230°/s", "230°/s"], controller: "ERB3C300", optionalController: "ERB1C600ME-Mini", toolPower: "12/24 V；3 A（三针）、2 A（双针）、1 A（单针）", toolCommunication: "RS-485", certification: "ISO 10218-1、ISO 13849、ISO/TS 15066、RoHS、CE、UL、SEMI、ISO Class 5" },
  { model: "CS66", pageId: 9, payload: "6 kg", reach: "914 mm", repeatability: "±0.02 mm", power: "250 W", tcpSpeed: "2.8 m/s", mass: "20 kg", base: "Φ150 mm", jointSpeeds: ["150°/s", "150°/s", "180°/s", "230°/s", "230°/s", "230°/s"], controller: "ERB3C600", optionalController: "ERB1C600ME-Mini", toolPower: "12/24 V；3 A（三针）、2 A（双针）、1 A（单针）", toolCommunication: "RS-485", certification: "ISO 10218-1、ISO 13849、ISO/TS 15066、RoHS、CE、UL、SEMI、ISO Class 5" },
  { model: "CS68", pageId: 10, payload: "8 kg", reach: "820 mm", repeatability: "±0.02 mm", power: "250 W", tcpSpeed: "2.8 m/s", mass: "22 kg", base: "Φ150 mm", jointSpeeds: ["150°/s", "150°/s", "150°/s", "230°/s", "230°/s", "230°/s"], controller: "ERB3C600", optionalController: "ERB1C600ME-Mini", toolPower: "12/24 V；3 A（三针）、2 A（双针）、1 A（单针）", toolCommunication: "RS-485", certification: "ISO 10218-1、ISO 13849、ISO/TS 15066、RoHS、CE、UL、SEMI、ISO Class 5" },
  { model: "CS612", pageId: 11, payload: "12 kg", reach: "1304 mm", repeatability: "±0.03 mm", power: "435 W", tcpSpeed: "3.4 m/s", mass: "34 kg", base: "Φ190 mm", jointSpeeds: ["120°/s", "120°/s", "150°/s", "180°/s", "180°/s", "180°/s"], controller: "ERB3C1K0", optionalController: "ERB1C600ME-Mini", toolPower: "12/24 V；3 A（三针）、2 A（双针）、1 A（单针）", toolCommunication: "RS-485", certification: "ISO 10218-1、ISO 13849、ISO/TS 15066、RoHS、CE、UL、SEMI、ISO Class 5" },
  { model: "CS616", pageId: 12, payload: "16 kg", reach: "1100 mm", repeatability: "±0.03 mm", power: "435 W", tcpSpeed: "3.0 m/s", mass: "33 kg", base: "Φ190 mm", jointSpeeds: ["120°/s", "120°/s", "150°/s", "180°/s", "180°/s", "180°/s"], controller: "ERB3C1K0", optionalController: "ERB1C600ME-Mini", toolPower: "12/24 V；3 A（三针）、2 A（双针）、1 A（单针）", toolCommunication: "RS-485", certification: "ISO 10218-1、ISO 13849、ISO/TS 15066、RoHS、CE、UL、SEMI、ISO Class 5" },
  { model: "CS618", pageId: 15, payload: "18 kg", reach: "954 mm", repeatability: "±0.03 mm", power: "435 W", tcpSpeed: "3.0 m/s", mass: "33 kg", base: "Φ190 mm", jointSpeeds: ["120°/s", "120°/s", "150°/s", "180°/s", "180°/s", "180°/s"], controller: "ERB3C1K0", optionalController: "ERB1C600ME-Mini", toolPower: "12/24 V；3 A（三针）、2 A（双针）、1 A（单针）", toolCommunication: "RS-485", certification: "ISO 10218-1、ISO 13849、ISO/TS 15066、RoHS、CE、UL、SEMI、ISO Class 5" },
  { model: "CS620", pageId: 13, payload: "20 kg", reach: "1800 mm", repeatability: "±0.05 mm", power: "625 W", tcpSpeed: "3.9 m/s", mass: "60 kg", base: "Φ240 mm", jointSpeeds: ["125°/s", "125°/s", "150°/s", "210°/s", "210°/s", "210°/s"], controller: "ERB3C2K0", optionalController: "ERB3C2K0N、ERB3C4K0MNE", toolPower: "接口 1：12/24 V，3 A（三针）、2 A（双针）、1 A（单针）；接口 2：24 V，5 A", toolCommunication: "RS-485；CAN（预留）", certification: "ISO 10218-1、ISO 13849、ISO/TS 15066、RoHS、CE、UL、SEMI、ISO Class 5" },
  { model: "CS625", pageId: 14, payload: "25 kg", reach: "1500 mm", repeatability: "±0.05 mm", power: "625 W", tcpSpeed: "3.3 m/s", mass: "58 kg", base: "Φ240 mm", jointSpeeds: ["125°/s", "125°/s", "150°/s", "210°/s", "210°/s", "210°/s"], controller: "ERB3C2K0", optionalController: "ERB3C2K0N、ERB3C4K0MNE", toolPower: "接口 1：12/24 V，3 A（三针）、2 A（双针）、1 A（单针）；接口 2：24 V，5 A", toolCommunication: "RS-485；CAN（预留）", certification: "ISO 10218-1、ISO 13849、ISO/TS 15066、RoHS、CE、UL、SEMI、ISO Class 5" },
  { model: "CS630", pageId: 95, payload: "30 kg", reach: "1300 mm", repeatability: "±0.05 mm", power: "625 W", tcpSpeed: "2.0 m/s", mass: "58 kg", base: "Φ240 mm", jointSpeeds: ["125°/s", "125°/s", "150°/s", "210°/s", "210°/s", "210°/s"], controller: "ERB3C2K0", optionalController: "ERB3C2K0N、ERB3C4K0MNE", toolPower: "接口 1：12/24 V，3 A（三针）、2 A（双针）、1 A（单针）；接口 2：24 V，5 A", toolCommunication: "RS-485；CAN（预留）" },
];

const eliteRows = (spec: EliteSpec): SpecRow[] => {
  const sourceUrl = `${ELITE_CS}/${spec.pageId}`;
  const source = l(`${spec.model} 官方型号页`, `${spec.model} official model page`);
  const locator = l("技术参数表", "Technical specification tables");
  const rows = [
    row(sourceUrl, source, locator, "自由度", "Degrees of freedom", "6 DoF"),
    row(sourceUrl, source, locator, "负载", "Payload", spec.payload),
    row(sourceUrl, source, locator, "工作半径", "Reach", spec.reach),
    row(sourceUrl, source, locator, "重复定位精度", "Repeatability", spec.repeatability),
    row(sourceUrl, source, locator, "典型功耗", "Typical power", spec.power),
    row(sourceUrl, source, locator, "安装方式", "Mounting orientation", "任意角度", "Any orientation"),
    row(sourceUrl, source, locator, "工具 I/O", "Tool I/O", "4 路 DO / 4 路 DI（可配置）、1 路 AI、1 路 AO", "4 DO / 4 DI configurable, 1 AI, 1 AO"),
    row(sourceUrl, source, locator, "工具 I/O 供电", "Tool I/O power", spec.toolPower, spec.toolPower.replaceAll("接口", "Interface").replaceAll("三针", "three-pin").replaceAll("双针", "two-pin").replaceAll("单针", "single-pin").replaceAll("预留", "reserved")),
    row(sourceUrl, source, locator, "工具通信", "Tool communication", spec.toolCommunication, spec.toolCommunication.replace("预留", "reserved")),
    ...["基座", "肩部", "肘部", "腕部 1", "腕部 2", "腕部 3"].map((joint, index) => row(
      sourceUrl,
      source,
      locator,
      `${joint}运动范围 / 最大速度`,
      `${["Base", "Shoulder", "Elbow", "Wrist 1", "Wrist 2", "Wrist 3"][index]} range / maximum speed`,
      `±360°；${spec.jointSpeeds[index]}`,
      `±360°; ${spec.jointSpeeds[index]}`,
    )),
    row(sourceUrl, source, locator, "工具最大速度", "Maximum TCP speed", spec.tcpSpeed),
    row(sourceUrl, source, locator, "本体质量", "Robot mass", spec.mass),
    row(sourceUrl, source, locator, "底座直径", "Base diameter", spec.base),
    row(sourceUrl, source, locator, "本体防护等级", "Robot ingress protection", "IP68"),
    row(sourceUrl, source, locator, "工作环境温度", "Ambient operating temperature", "-10°C 至 50°C", "-10°C to 50°C"),
    row(sourceUrl, source, locator, "工作环境湿度", "Ambient humidity", "90% RH（非冷凝）", "90% RH, non-condensing"),
    row(sourceUrl, source, locator, "本体材料", "Robot materials", "铝合金、钢、塑料、橡胶", "Aluminium alloy, steel, plastics, and rubber"),
    row(sourceUrl, source, locator, "标准线缆长度", "Standard cable length", "5.5 m"),
    ...(spec.certification ? [row(sourceUrl, source, locator, "产品认证与洁净等级", "Certifications and cleanroom class", spec.certification)] : []),
    row(sourceUrl, source, locator, "控制箱", "Controller", spec.controller),
    row(sourceUrl, source, locator, "选配控制箱", "Optional controller", spec.optionalController),
    row(sourceUrl, source, locator, "示教器", "Teach pendant", "ERP500"),
    row(sourceUrl, source, locator, "标准示教器", "Standard teach pendant", "ERP500S"),
  ];
  return rows;
};

const eliteSeeds: ProductSeed[] = eliteSpecs.map((spec) => ({
  id: `elite-${spec.model.toLowerCase()}`,
  companySlug: "elite-robots",
  product: `Elite ${spec.model}`,
  pageUrl: `${ELITE_CS}/${spec.pageId}`,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "industrial-arm",
  useCases: ["manufacturing", "integration"],
  type: l("六轴协作机械臂", "Six-axis collaborative robot arm"),
  integration: l("本体、匹配控制箱和示教器构成基础系统；工具端 I/O、RS-485/CAN、现场总线、末端、安全设备和应用软件按项目集成。", "The arm, matching controller, and teach pendant form the base system; tool I/O, RS-485/CAN, fieldbus, end effectors, safety equipment, and application software are integrated per project."),
  verification: l("按型号核对动态负载与重心、臂展、关节/TCP 速度、底座、控制箱、工具供电、现场接口、认证版本和安全功能。", "Verify dynamic payload and center of gravity, reach, joint/TCP speed, base, controller, tool power, field interfaces, certified version, and safety functions for the exact model."),
  rows: eliteRows(spec),
  overview: [
    l(`Elite ${spec.model} 是 CS 系列具名型号，当前官方页面列出 ${spec.payload} 负载、${spec.reach} 工作半径、${spec.repeatability} 重复定位精度和 ${spec.mass} 本体质量。`, `Elite ${spec.model} is a named CS-series model. Its current official page lists ${spec.payload} payload, ${spec.reach} reach, ${spec.repeatability} repeatability, and ${spec.mass} robot mass.`),
    l("记录逐项保留该型号的关节速度、工具端能力、环境条件和控制器配置。标称负载与速度不能直接推导特定工件、轨迹或协作模式下的节拍。", "The record preserves this model's joint speeds, tool-side capabilities, environmental limits, and controller configuration field by field. Rated payload and speed do not directly establish cycle time for a particular workpiece, trajectory, or collaborative mode."),
  ],
  applications: [l("装配、上下料、焊接、码垛、检测和打磨", "Assembly, machine tending, welding, palletizing, inspection, and finishing"), l("包装、搬运与协作工作站集成", "Packaging, handling, and collaborative-cell integration")],
  coverage: "official-complete",
  sourceLinks: [{ label: l("CS 系列官方目录", "Official CS family catalog"), url: ELITE_CS }],
}));

const gen3Source = l("Kinova Gen3 官方一页式数据表", "Kinova Gen3 official one-page datasheet");
const gen3Locator = l("第 2 页技术规格", "Page 2 technical specifications");

const gen3Rows = (dof: 6 | 7, mass: string, reach: string): SpecRow[] => {
  const r = (labelZh: string, labelEn: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => row(KINOVA_GEN3, gen3Source, gen3Locator, labelZh, labelEn, valueZh, valueEn, conditions);
  const payloadCondition = l("不含夹爪；运动状态", "Without gripper; in motion");
  return [
    r("自由度", "Degrees of freedom", `${dof} DoF`),
    r("全臂展连续负载", "Full-range continuous payload", "2.0 kg", "2.0 kg", payloadCondition),
    r("中段工作区连续负载", "Mid-range continuous payload", "4.0 kg", "4.0 kg", payloadCondition),
    r("本体质量", "Robot mass", mass),
    r("最大臂展", "Maximum reach", reach),
    r("最大笛卡尔平移速度", "Maximum Cartesian translation speed", "50 cm/s"),
    r("执行器位置范围", "Actuator position range", "无限连续旋转", "Infinite"),
    r("供电电压", "Power supply voltage", "18-30 V DC；标称 24 V DC", "18-30 V DC; 24 V DC nominal"),
    r("平均功耗", "Average power", "36 W"),
    r("防护等级", "Ingress protection", "IP33"),
    r("工作温度", "Operating temperature", "-30°C 至 35°C", "-30°C to 35°C"),
    r("内置传感", "Integrated sensors", "力矩、位置、电流、电压、温度、加速度计和陀螺仪", "Torque, position, current, voltage, temperature, accelerometer, and gyroscope"),
    r("软件", "Software", "Kinova Kortex"),
    r("内部通信", "Internal communications", "2 × 100 Mbps Ethernet"),
    r("API 兼容环境", "API compatibility", "Windows 10、Linux Ubuntu、ROS Noetic、ROS 2 Humble", "Windows 10, Linux Ubuntu, ROS Noetic, ROS 2 Humble"),
    r("编程语言", "Programming languages", "C++、Python、MATLAB", "C++, Python, MATLAB"),
    r("末端接口", "End-effector interfaces", "Ethernet、I2C、UART、GPIO；24 V / 1 A 供电", "Ethernet, I2C, UART, GPIO; 24 V / 1 A supply"),
    r("控制系统频率", "Control system frequency", "1 kHz"),
    r("低层控制", "Low-level control", "位置、速度、电机电流、力矩", "Position, velocity, motor current, and torque"),
    r("高层控制", "High-level control", "笛卡尔位置/速度、关节位置/速度、力旋量", "Cartesian position/velocity, joint position/velocity, and wrench"),
    r("可选彩色相机分辨率与帧率", "Optional color resolution and frame rate", "最高 1280 × 720，最高 30 fps", "Up to 1280 × 720 at up to 30 fps"),
    r("可选彩色相机对角视场角", "Optional color diagonal field of view", "最高 68.7° ±3°", "Up to 68.7° ±3°"),
    r("可选彩色相机对焦范围", "Optional color focusing range", "30 cm 至无限远", "30 cm to infinity"),
    r("可选深度相机分辨率与帧率", "Optional depth resolution and frame rate", "最高 480 × 270（16:9），最高 30 fps", "Up to 480 × 270 (16:9) at up to 30 fps"),
    r("可选深度相机对角视场角", "Optional depth diagonal field of view", "72° ±3°"),
    r("可选深度相机最小深度距离", "Optional depth minimum distance", "18 cm"),
  ];
};

const kinovaSeeds: ProductSeed[] = [
  ...([
    { id: "kinova-gen3-6dof", product: "Kinova Gen3 6 DoF", dof: 6 as const, mass: "7.2 kg", reach: "891 mm" },
    { id: "kinova-gen3-7dof", product: "Kinova Gen3 7 DoF", dof: 7 as const, mass: "8.2 kg", reach: "902 mm" },
  ]).map((spec): ProductSeed => ({
    id: spec.id,
    companySlug: "kinova",
    product: spec.product,
    pageUrl: KINOVA_GEN3,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "research-arm",
    useCases: ["research", "integration"],
    type: l(`${spec.dof} 自由度轻量研究机械臂`, `${spec.dof}-DoF lightweight research robot arm`),
    integration: l("通过 Kortex、C++/Python/MATLAB、ROS/ROS 2、高低层控制和开放末端接口接入研究或移动操作系统；视觉模块为选件。", "Integrates into research or mobile-manipulation systems through Kortex, C++/Python/MATLAB, ROS/ROS 2, high- and low-level control, and an open end-effector interface; vision is optional."),
    verification: l("核对 6/7 轴配置、全臂展与中段负载条件、末端与视觉选件、控制频率、网络拓扑、API/ROS 版本和安全边界。", "Verify the six/seven-axis configuration, full- versus mid-range payload condition, end-effector and vision options, control rate, network topology, API/ROS version, and safety boundary."),
    rows: gen3Rows(spec.dof, spec.mass, spec.reach),
    overview: [
      l(`${spec.product} 是 Gen3 轻量研究平台的独立配置，官方数据表列出 ${spec.mass} 本体质量、${spec.reach} 最大臂展和 2 kg 全臂展运动连续负载。`, `${spec.product} is a distinct Gen3 lightweight research configuration. The official datasheet lists ${spec.mass} mass, ${spec.reach} maximum reach, and 2 kg full-range continuous payload in motion.`),
      l("4 kg 连续负载仅对应中段工作区，且官方脚注注明负载不含夹爪；本仓将该条件与 2 kg 全臂展值分开，避免参数检索误判。", "The 4 kg continuous payload applies only to the mid-range workspace, and the official footnote excludes the gripper. The repository keeps it separate from the 2 kg full-range value to avoid parameter-search misclassification."),
    ],
    applications: [l("机器人操作、触觉、视觉、机器学习和移动操作研究", "Manipulation, haptics, vision, machine learning, and mobile-manipulation research"), l("高校教学、算法验证和定制机器人系统", "University teaching, algorithm validation, and custom robotic systems")],
    coverage: "official-complete",
  })),
  {
    id: "kinova-gen3-lite",
    companySlug: "kinova",
    product: "Kinova Gen3 lite",
    pageUrl: KINOVA_GEN3_LITE,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "research-arm",
    useCases: ["research", "integration"],
    type: l("六自由度紧凑研究机械臂", "Six-DoF compact research robot arm"),
    integration: l("通过 Kortex、USB、Ethernet、Wi-Fi、C++/Python/MATLAB 和 ROS/ROS 2 接入教学与研究系统。", "Integrates into education and research systems through Kortex, USB, Ethernet, Wi-Fi, C++/Python/MATLAB, and ROS/ROS 2."),
    verification: l("核对 500 g 负载、关节范围、25 cm/s 速度、IP22 环境边界、网络配置、低层控制权限和软件版本。", "Verify the 500 g payload, joint ranges, 25 cm/s speed, IP22 environmental boundary, networking, low-level-control access, and software versions."),
    rows: (() => {
      const s = l("Kinova Gen3 lite 官方一页式数据表", "Kinova Gen3 lite official one-page datasheet");
      const p = l("第 2 页技术规格", "Page 2 technical specifications");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(KINOVA_GEN3_LITE, s, p, zh, en, valueZh, valueEn);
      return [
        r("自由度", "Degrees of freedom", "6 DoF"), r("本体质量", "Robot mass", "5.4 kg"), r("负载", "Payload", "500 g"), r("最大臂展", "Maximum reach", "760 mm"),
        r("最大笛卡尔平移速度", "Maximum Cartesian translation speed", "25 cm/s"), r("执行器关节范围", "Actuator joint range", "±155° 至 ±160°", "±155° to ±160°"),
        r("供电电压", "Power supply voltage", "21-30 V DC；标称 24 V DC", "21-30 V DC; 24 V DC nominal"), r("平均功耗", "Average power", "20 W"),
        r("防护等级", "Ingress protection", "IP22"), r("工作温度", "Operating temperature", "0°C 至 40°C", "0°C to 40°C"),
        r("内置传感", "Integrated sensors", "位置、电流、电压和温度", "Position, current, voltage, and temperature"), r("软件", "Software", "Kinova Kortex"),
        r("内部通信", "Internal communications", "1 × 100 Mbps Ethernet"), r("API 兼容环境", "API compatibility", "Windows 10、Linux Ubuntu、ROS Noetic、ROS 2 Humble", "Windows 10, Linux Ubuntu, ROS Noetic, ROS 2 Humble"),
        r("编程语言", "Programming languages", "C++、Python、MATLAB", "C++, Python, MATLAB"), r("基础接口", "Basic interfaces", "USB-A、Micro-USB、Ethernet、Wi-Fi", "USB-A, Micro-USB, Ethernet, Wi-Fi"),
        r("控制系统频率", "Control system frequency", "1 kHz"), r("低层控制", "Low-level control", "位置、速度、电机电流", "Position, velocity, and motor current"),
        r("高层控制", "High-level control", "笛卡尔位置/速度、关节位置/速度", "Cartesian position/velocity and joint position/velocity"),
      ];
    })(),
    overview: [l("Gen3 lite 是 6 自由度、500 g 负载、5.4 kg 本体质量的紧凑研究与教育机械臂，保留 1 kHz 低层闭环控制。", "Gen3 lite is a compact research and education arm with six degrees of freedom, 500 g payload, 5.4 kg mass, and 1 kHz low-level closed-loop control."), l("其传感、末端接口与负载明显少于 Gen3，不能仅因共享 Kortex 软件而视为同等硬件平台。", "Its sensing, end-effector interfaces, and payload differ materially from Gen3, so shared Kortex software does not make the hardware equivalent.")],
    applications: [l("机器人教学、课程实验、算法验证和轻型桌面操作", "Robotics teaching, coursework, algorithm validation, and light desktop manipulation")],
    coverage: "official-complete",
  },
  {
    id: "kinova-link-6",
    companySlug: "kinova",
    product: "Kinova Link 6",
    pageUrl: KINOVA_LINK6,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "industrial-arm",
    useCases: ["manufacturing", "integration"],
    type: l("六自由度工业协作机器人", "Six-DoF industrial collaborative robot"),
    integration: l("控制器提供通用、模拟、安全 I/O 和 Modbus TCP，腕部提供数字/模拟 I/O、24 V/4 A 供电和 ISO 法兰；视觉模块为选件。", "The controller provides general, analog, and safety I/O plus Modbus TCP; the wrist provides digital/analog I/O, 24 V/4 A power, and an ISO flange; vision is optional."),
    verification: l("核对 200 mm 腕部偏置条件下的连续负载、节拍、腕部供电、I/O、安全功能、控制器接口、IP54 环境和视觉配置。", "Verify continuous payload at the stated 200 mm wrist offset, cycle time, wrist power, I/O, safety functions, controller interfaces, IP54 environment, and vision configuration."),
    rows: (() => {
      const s = l("Kinova Link 6 官方一页式数据表", "Kinova Link 6 official one-page datasheet");
      const p = l("第 2 页技术规格", "Page 2 technical specifications");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => row(KINOVA_LINK6, s, p, zh, en, valueZh, valueEn, conditions);
      return [
        r("自由度", "Degrees of freedom", "6 DoF"), r("全臂展连续负载", "Full-range continuous payload", "6.0 kg", "6.0 kg", l("腕部外 200 mm", "At 200 mm from the wrist")),
        r("最大臂展", "Maximum reach", "1000 mm"), r("最大关节速度", "Maximum joint speeds", "J1-J3：180°/s；J4-J6：300°/s", "J1-J3: 180°/s; J4-J6: 300°/s"),
        r("关节角度限制", "Joint angle limits", "J1-J6：±360°"), r("最大笛卡尔平移速度", "Maximum Cartesian translation speed", "1.85 m/s"),
        r("电源电压与频率", "Power voltage and frequency", "110-240 V AC，50-60 Hz", "110-240 V AC, 50-60 Hz"), r("工作温度", "Operating temperature", "0°C 至 40°C", "0°C to 40°C"),
        r("本体质量", "Robot mass", "23.45 kg", "23.45 kg", l("含 5 m 线缆", "Including 5 m cable")), r("安全功能", "Safety functions", "PLd Cat 3；ISO 13849-1/-2:2015", "PLd Cat 3; ISO 13849-1/-2:2015"),
        r("重复定位精度", "Repeatability", "≤0.1 mm"), r("本体防护等级", "Robot ingress protection", "IP54"), r("本体材料", "Robot materials", "铝、ABS 塑料", "Aluminium and ABS plastic"),
        r("安装方向", "Mounting orientation", "任意方向", "Any orientation"), r("控制器接口", "Controller interfaces", "USB 3.0、Ethernet", "USB 3.0 and Ethernet"),
        r("控制器通用数字 I/O", "Controller general digital I/O", "8 路输入、8 路输出", "8 inputs and 8 outputs"), r("控制器通用模拟 I/O", "Controller general analog I/O", "4 路可编程输入/输出", "4 programmable inputs/outputs"),
        r("控制器安全 I/O", "Controller safety I/O", "8 路冗余安全输入、8 路冗余安全输出", "8 redundant safety inputs and 8 redundant safety outputs"), r("工业以太网", "Industrial Ethernet", "Modbus TCP/IP 服务器，用于机器人控制和监测", "Modbus TCP/IP server for robot control and monitoring"),
        r("腕部数字 I/O", "Wrist digital I/O", "8 路可编程输入/输出", "8 programmable inputs/outputs"), r("腕部模拟 I/O", "Wrist analog I/O", "2 路可编程输入/输出", "2 programmable inputs/outputs"),
        r("腕部工具供电", "Wrist tool power", "24 V，最高 4 A", "24 V, up to 4 A"), r("腕部机械法兰", "Wrist mechanical flange", "ISO 9409-1-50-4-M6"),
        r("控制器处理器", "Controller processor", "Intel Core i7"), r("控制器内存", "Controller memory", "8 GB DDR4 RAM"), r("控制器存储", "Controller storage", "128 GB SSD"),
        r("控制器质量", "Controller mass", "17.6 kg"), r("控制器防护等级", "Controller ingress protection", "IP54"),
        r("可选视觉模块", "Optional vision module", "Intel RealSense 深度与彩色相机", "Intel RealSense depth and color camera"),
      ];
    })(),
    overview: [l("Link 6 是面向工业自动化的六自由度协作机器人，官方数据表给出 6 kg 连续负载、1000 mm 臂展和 ≤0.1 mm 重复定位精度。", "Link 6 is a six-DoF cobot for industrial automation, with 6 kg continuous payload, 1,000 mm reach, and repeatability within 0.1 mm in the official datasheet."), l("6 kg 负载对应全臂展且腕部外 200 mm 的条件；实际工具重心、速度、安全模式和现场风险评估仍会限制可用性能。", "The 6 kg rating is specified at full range and 200 mm from the wrist. Actual tool center of gravity, speed, safety mode, and site risk assessment still constrain usable performance.")],
    applications: [l("上下料、小件装配、质量检测、套件分拣、包装、焊接和打磨", "Machine tending, small-part assembly, quality inspection, kitting, packaging, welding, and finishing")],
    coverage: "official-complete",
  },
  {
    id: "kinova-jaco-assistive-arm",
    companySlug: "kinova",
    product: "Kinova Jaco Assistive Robotic Arm",
    pageUrl: KINOVA_JACO,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "assistive-arm",
    useCases: ["service", "integration"],
    type: l("轮椅安装式辅助机械臂", "Wheelchair-mounted assistive robot arm"),
    integration: l("安装到电动轮椅并通过轮椅操纵杆、头控、吸吹或其他适配接口操作；OLED 显示器和升降臂为选件。", "Mounts to a powered wheelchair and can be operated through the chair joystick, head array, sip-and-puff, or other adapted inputs; the OLED display and lift arm are optional."),
    verification: l("由辅助技术专业人员核对使用者需求、轮椅兼容、安装、控制接口、安全区、负载、培训、维护和当地支付/法规要求。", "Have assistive-technology professionals verify user needs, wheelchair compatibility, mounting, control interface, safety zones, payload, training, service, and local funding/regulatory requirements."),
    rows: (() => {
      const s = l("Jaco 官方产品页", "Jaco official product page");
      const p = l("Specifications", "Specifications");
      const r = (zh: string, en: string, valueZh: string, valueEn = valueZh) => row(KINOVA_JACO, s, p, zh, en, valueZh, valueEn);
      return [
        r("本体质量", "Robot mass", "5.2 kg"), r("全臂展连续负载", "Full-range continuous payload", "1.3 kg"), r("中段工作区连续负载", "Mid-range continuous payload", "1.6 kg"),
        r("最大臂展", "Maximum reach", "900 mm"), r("本体材料", "Robot materials", "碳纤维和铝", "Carbon fiber and aluminium"), r("最大速度", "Maximum speed", "20 cm/s"),
        r("供电电压", "Power supply voltage", "18-29 V DC"), r("平均功耗", "Average power", "25 W；待机 5 W", "25 W; 5 W standby"), r("峰值功耗", "Peak power", "100 W"),
      ];
    })(),
    overview: [l("Jaco 是安装在电动轮椅上的辅助机械臂，用于饮食、饮水、服药、个人护理、开门、操作开关和拾取物品等日常活动。", "Jaco is a powered-wheelchair-mounted assistive arm for daily activities such as eating, drinking, medication, personal care, opening doors, operating switches, and retrieving objects."), l("当前产品页的规格块公开质量、两种连续负载、臂展、材料、速度、电压和功耗；使用资格、安装和安全配置属于个体化辅助技术评估，不应仅凭参数自动推荐。", "The current product-page specification block publishes mass, two continuous-payload conditions, reach, materials, speed, voltage, and power. User eligibility, mounting, and safety configuration require individualized assistive-technology assessment and should not be recommended from parameters alone.")],
    applications: [l("上肢活动受限用户的日常生活辅助与轮椅集成", "Daily-living assistance and wheelchair integration for people with upper-limb limitations")],
    coverage: "official-complete",
  },
];

const productSeeds: ProductSeed[] = [...eliteSeeds, ...kinovaSeeds];

export const getVerifiedWaveNineProductRecords = (
  locale: Locale,
  companies: CompanyProfile[],
): FinderExpansionRecord[] => {
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  return productSeeds.map((seed) => {
    const company = companyBySlug.get(seed.companySlug);
    if (!company) throw new Error(`Wave-nine product company is missing: ${seed.companySlug}`);
    return toRecord(locale, company, seed);
  });
};

export const waveNineCatalogProductCount = productSeeds.length;
