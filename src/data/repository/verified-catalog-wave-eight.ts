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
type WaveEightCompanySlug = typeof waveEightCompanySlugs[number];

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
  companySlug: WaveEightCompanySlug;
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

const JAKA_ABOUT = "https://www.jaka.com/en/about";
const JAKA_MANUAL = "https://www.jaka.com/profile/upload/2025/11/25/20251125172527A001.pdf";
const JAKA_DOWNLOADS = "https://www.jaka.com/en/download";
const UFACTORY_HOME = "https://www.cn.ufactory.cc/";
const XARM_SPECS = "https://docs.xarm.ufactory.cc/8.technical_specifications.html";
const U850_SPECS = "https://docs.850.ufactory.cc/8.technical_specifications.html";
const LITE6_SPECS = "https://docs.lite6.ufactory.cc/zhHans/9.technical_specifications.html";
const LITE6_PREFACE = "https://docs.lite6.ufactory.cc/0.preface.html";
const XARM_REVISION = "https://help.ufactory.cc/en/articles/5688912-the-main-difference-between-xarm-xf-xi-xs12xx-and-xarm-xf-xi-xs13xx";

export const waveEightCompanySlugs = ["jaka-robotics", "ufactory"] as const;
const waveEightCompanySlugSet = new Set<string>(waveEightCompanySlugs);
export const isWaveEightCompanySlug = (slug: string) => waveEightCompanySlugSet.has(slug);

const patchJaka = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: t(locale, l("节卡机器人股份有限公司", "JAKA Robotics Co., Ltd.")),
  country: t(locale, l("中国", "China")),
  headquarters: t(locale, l("中国上海", "Shanghai, China")),
  founded: "2014",
  officialUrl: "https://www.jaka.com/",
  valueChainRole: t(locale, l("协作机器人、具身智能平台、控制器与感知组件厂商", "Collaborative-robot, embodied-intelligence platform, controller, and perception-component manufacturer")),
  positioning: t(locale, l("围绕 Zu、Pro、S、AL、A 与 Mini 协作机器人系列，以及移动操作、人形和工业具身智能平台，提供本体、控制、视觉、力觉和服务体系。", "Provides robot bodies, controls, vision, force sensing, and services across the Zu, Pro, S, AL, A, and Mini cobot families plus mobile-manipulation, humanoid, and industrial embodied-intelligence platforms.")),
  strengths: [
    t(locale, l("现行协作机器人目录覆盖 3 kg 至 35 kg 负载，并区分通用、高防护、内置力控、视觉一体化和紧凑型产品。", "The current cobot catalog spans 3 kg to 35 kg payloads and separates general, high-protection, integrated-force-control, integrated-vision, and compact products.")),
    t(locale, l("官网同时公开控制柜、示教器、二维/三维视觉、六维力传感和 JAKA+ 生态入口。", "The website also publishes controllers, teach pendants, 2D/3D vision, six-axis force sensing, and the JAKA+ ecosystem.")),
    t(locale, l("官方硬件手册给出型号级负载、质量、臂展、重复定位精度、关节速度、末端速度、功率与控制接口。", "Official hardware manuals publish model-level payload, mass, reach, repeatability, joint speed, TCP speed, power, and control interfaces.")),
  ],
  products: ["JAKA Zu series", "JAKA Pro series", "JAKA S series", "JAKA AL series", "JAKA A series", "JAKA Mini series", "JAKA Kargo", "JAKA K1", "JAKA Lumi", "JAKA S3", "JAKA EVO", "JAKA Lens", "force-control assembly", "Cab V3", "MiniCab", "RoboHub", "Touch I / II"],
  fit: [
    t(locale, l("装配、上下料、焊接、码垛、涂胶、检测、打磨与柔性抓取。", "Assembly, machine tending, welding, palletizing, dispensing, inspection, finishing, and flexible grasping.")),
    t(locale, l("需要高防护、内置力控、视觉一体化或紧凑部署的协作自动化。", "Collaborative automation requiring high ingress protection, integrated force control, integrated vision, or compact deployment.")),
    t(locale, l("移动操作、人形机器人和工业具身智能的联合验证项目。", "Joint validation projects in mobile manipulation, humanoid robotics, and industrial embodied intelligence.")),
  ],
  overview: [
    t(locale, l("节卡机器人于 2014 年在上海成立。官网发展历程记录了 2016 年启动协作机器人研发并完成 A 轮融资、2017 年发布 JAKA Zu、2021 年发布 MiniCobo、2022 年发布 Pro 系列并完成 D 轮融资。", "JAKA Robotics was founded in Shanghai in 2014. Its official history records the start of cobot development and Series A financing in 2016, the JAKA Zu launch in 2017, MiniCobo in 2021, and the Pro-series launch with Series D financing in 2022.")),
    t(locale, l("本批次把 Zu3、Zu5、Zu7、Zu12、Zu18、Zu20 和 Zu30 从旧的系列摘要拆成独立型号，并保留各自负载、质量、臂展、精度、速度、功率和防护边界。Zu35 与 Zu15 的官网公告写明 2026 年下半年可用，因此未混入当前可交付型号筛选。", "This wave replaces the former family summary with individual Zu3, Zu5, Zu7, Zu12, Zu18, Zu20, and Zu30 records while preserving each model's payload, mass, reach, accuracy, speed, power, and protection boundary. The website says Zu35 and Zu15 availability is planned for the second half of 2026, so they are not mixed into the current-delivery filter.")),
    t(locale, l("官网披露的部署数量、合作伙伴和客户名称属于厂商口径，不能替代交付验收或独立市场份额证据。协作功能也不意味着任何末端工具、工件和速度组合都可以免围栏运行。", "Published deployment counts, partner totals, and customer names are manufacturer statements rather than delivery-acceptance or independent market-share evidence. Collaborative functions also do not make every tooling, workpiece, and speed combination suitable for fence-free operation.")),
  ],
  businessAreas: [
    t(locale, l("协作机器人本体与控制系统", "Collaborative robot bodies and control systems")),
    t(locale, l("视觉、力觉、示教器和末端生态", "Vision, force sensing, teach pendants, and end-effector ecosystem")),
    t(locale, l("移动操作、人形机器人与工业具身智能平台", "Mobile manipulation, humanoids, and industrial embodied-intelligence platforms")),
  ],
  customerGroups: [
    t(locale, l("汽车、电子、新能源、家电、食品和金属加工制造企业", "Automotive, electronics, new-energy, appliance, food, and metalworking manufacturers")),
    t(locale, l("焊接、装配、码垛、检测和上下料系统集成商", "Welding, assembly, palletizing, inspection, and machine-tending integrators")),
    t(locale, l("高校、研究机构和具身智能应用团队", "Universities, research institutes, and embodied-intelligence application teams")),
  ],
  milestones: [
    { date: "2014", event: t(locale, l("公司在上海成立。", "The company was founded in Shanghai.")) },
    { date: "2016", event: t(locale, l("启动协作机器人研发并完成 A 轮融资。", "Collaborative-robot R&D began and Series A financing was completed.")) },
    { date: "2017", event: t(locale, l("JAKA Zu 系列发布。", "The JAKA Zu series was launched.")) },
    { date: "2021", event: t(locale, l("MiniCobo 发布并完成 C+ 轮融资。", "MiniCobo was launched and Series C+ financing was completed.")) },
    { date: "2022", event: t(locale, l("Pro 系列发布并完成 D 轮融资。", "The Pro series was launched and Series D financing was completed.")) },
    { date: "2026", event: t(locale, l("官网发布 Zu35 与 Zu15 预售信息，注明计划于 2026 年下半年可用。", "The website announced Zu35 and Zu15 presales and stated planned availability in the second half of 2026.")) },
  ],
  catalogScope: t(locale, l("本批次完成当前 Zu 系列七个既有型号。Pro、S、AL、A、Mini、控制柜、示教器、视觉、力觉以及具身智能平台仍需逐型号转录，Zu35/Zu15 暂按未来可用产品处理。", "This wave completes seven existing models in the current Zu family. Pro, S, AL, A, Mini, controllers, teach pendants, vision, force sensing, and embodied-intelligence platforms still require model-level transcription; Zu35/Zu15 remain future-availability products.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定型号、负载与重心、臂展、节拍、关节限制、安装方向、防护、控制柜、I/O、总线、软件版本、安全链和交付附件。", "Lock model, payload and center of gravity, reach, cycle time, joint limits, mounting, protection, controller, I/O, fieldbus, software version, safety chain, and delivered accessories.")),
  presalesQuestions: [
    t(locale, l("工件、工具、重心、姿态和加速度下的动态负载是否落在型号曲线内？", "Does the dynamic load under the workpiece, tool, center of gravity, pose, and acceleration remain within the model envelope?")),
    t(locale, l("目标环境需要 Zu、Pro、S、AL、A 还是 Mini，防护和传感配置如何验收？", "Does the environment require Zu, Pro, S, AL, A, or Mini, and how will protection and sensing be accepted?")),
    t(locale, l("控制柜、现场总线、视觉、力控、末端、安全回路和恢复责任由谁集成？", "Who integrates the controller, fieldbus, vision, force control, tooling, safety circuit, and recovery responsibilities?")),
  ],
  reviewedAt: "2026-09-04",
});

const patchUfactory = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  legalName: t(locale, l("深圳市众为创造科技有限公司", "Shenzhen UFACTORY Technology Co., Ltd.")),
  country: t(locale, l("中国", "China")),
  headquarters: t(locale, l("中国深圳", "Shenzhen, China")),
  officialUrl: "https://www.ufactory.cc/",
  valueChainRole: t(locale, l("轻量机械臂、协作机器人、末端工具与开发软件厂商", "Lightweight robot-arm, collaborative-robot, end-tool, and development-software manufacturer")),
  positioning: t(locale, l("以 xArm 5/6/7、UFACTORY 850 和 Lite6 覆盖研究、教育、商业服务与轻型工业自动化，并提供 Studio、Python/C++ SDK、ROS 和末端工具。", "Covers research, education, commercial service, and light industrial automation with xArm 5/6/7, UFACTORY 850, and Lite6, supported by Studio, Python/C++ SDKs, ROS, and end tools.")),
  strengths: [
    t(locale, l("xArm 系列以相同工作空间和控制平台提供 5、6、7 轴结构选择。", "The xArm family offers 5-, 6-, and 7-axis structures on a shared workspace and control platform.")),
    t(locale, l("UFACTORY 850 把 5 kg 负载、850 mm 工作范围和 ±0.02 mm 重复定位精度组合到工业协作机械臂。", "UFACTORY 850 combines a 5 kg payload, 850 mm workspace, and ±0.02 mm repeatability in an industrial cobot.")),
    t(locale, l("在线硬件手册公开本体、控制器、I/O、通信、洁净等级、安装、法兰以及官方夹爪和吸具参数。", "Online hardware manuals publish robot, controller, I/O, communication, cleanroom, mounting, flange, and official gripper/vacuum-tool specifications.")),
  ],
  products: ["xArm 5", "xArm 6", "xArm 7", "UFACTORY 850", "Lite6", "xArm Gripper", "G2 Gripper", "xArm Vacuum Gripper", "Lite6 Gripper", "Lite6 Vacuum Gripper", "UFACTORY Studio", "Python/C++ SDK", "ROS packages"],
  fit: [
    t(locale, l("研究、教育、机器人学习和移动操作开发。", "Research, education, robot learning, and mobile-manipulation development.")),
    t(locale, l("轻型上下料、抓取、装配、检测和商业服务设备。", "Light machine tending, pick-and-place, assembly, inspection, and commercial-service equipment.")),
    t(locale, l("需要 Python、C++、ROS 或图形化开发入口的快速原型。", "Rapid prototypes requiring Python, C++, ROS, or graphical development access.")),
  ],
  overview: [
    t(locale, l("UFACTORY 官网当前把产品分为 xArm、UFACTORY 850 和 Lite6，并提供配套夹爪、真空吸具、控制箱与软件开发入口。现行手册采用网页化规格表，适合逐字段索引。", "The current UFACTORY website groups products into xArm, UFACTORY 850, and Lite6, with matching grippers, vacuum tools, controllers, and software-development entry points. Current manuals expose web-based specification tables suitable for field-level indexing.")),
    t(locale, l("xArm 5、6、7 共享大部分机械、电气与控制参数，但轴数、负载、关节范围和本体质量不同，因此本仓保留三个独立型号，不用系列摘要代替。", "xArm 5, 6, and 7 share most mechanical, electrical, and control specifications but differ in axis count, payload, joint range, and body mass, so the repository keeps three distinct models rather than one family summary.")),
    t(locale, l("官方帮助中心记录 2021 年 xArm 1300 代硬件在工具法兰和控制箱上的变化；集成商必须按序列号与硬件代次选择图纸、末端适配和控制箱，不能只按产品名称假设兼容。", "The official help center records 2021 xArm 1300-generation changes to the tool flange and controller. Integrators must select drawings, end-tool adapters, and controllers by serial number and hardware generation rather than assuming compatibility from the product name alone.")),
  ],
  businessAreas: [
    t(locale, l("轻量机械臂与工业协作机器人", "Lightweight robot arms and industrial cobots")),
    t(locale, l("电动夹爪、真空吸具和末端集成", "Electric grippers, vacuum tools, and end-effector integration")),
    t(locale, l("Studio、SDK、ROS 与机器人开发支持", "Studio, SDK, ROS, and robot-development support")),
  ],
  customerGroups: [
    t(locale, l("高校、实验室、教育装备和机器人开发团队", "Universities, laboratories, education-equipment providers, and robot developers")),
    t(locale, l("轻型制造、商业服务和自动化设备集成商", "Light manufacturing, commercial-service, and automation-equipment integrators")),
    t(locale, l("需要开放开发接口的初创企业与产品研发部门", "Startups and product-development teams requiring accessible development interfaces")),
  ],
  milestones: [
    { date: "2021", event: t(locale, l("官方帮助中心记录 xArm 1300 代硬件更新，调整工具法兰并更新控制箱。", "The official help center documented the xArm 1300-generation hardware update, including tool-flange and controller changes.")) },
    { date: "2022", event: t(locale, l("官方帮助中心发布 xArm 5/6/7 型号差异说明。", "The official help center published its xArm 5/6/7 model comparison.")) },
    { date: "2024", event: t(locale, l("Studio 2.5 系列发布说明记录对 xArm 1305 与 850 的适配更新。", "Studio 2.5 release notes documented compatibility updates for xArm 1305 and 850.")) },
    { date: "2026", event: t(locale, l("官网当前并列展示 xArm、850 与 Lite6，在线手册持续公开规格和接口。", "The current website presents xArm, 850, and Lite6, with online manuals publishing specifications and interfaces.")) },
  ],
  catalogScope: t(locale, l("本批次完成五个机械臂型号及官方规格表中的五个夹爪/吸具。BIO Gripper、六维力传感器、更多控制器和软件版本仍需独立资料页。", "This wave completes five arm models and five gripper/vacuum tools listed in the official specification tables. BIO Gripper, six-axis force/torque sensing, additional controllers, and software versions still need independent records.")),
  catalogCoverage: "model-partial",
  verificationFocus: t(locale, l("锁定硬件代次、序列号、轴数、负载、工作空间、重复精度、控制器、供电、工具法兰、RS-485/Modbus、SDK/固件版本与风险评估。", "Lock hardware generation, serial number, axis count, payload, workspace, repeatability, controller, power, tool flange, RS-485/Modbus, SDK/firmware version, and risk assessment.")),
  presalesQuestions: [
    t(locale, l("目标任务需要 5、6 还是 7 轴，或需要 850 的精度与工作范围？", "Does the task require 5, 6, or 7 axes, or the accuracy and workspace of the 850?")),
    t(locale, l("本体与控制箱属于哪个硬件代次，现有末端和法兰图纸是否匹配？", "Which hardware generation are the arm and controller, and do existing tools and flange drawings match?")),
    t(locale, l("SDK、ROS、固件、I/O、Modbus、碰撞检测和异常恢复如何做版本验收？", "How will SDK, ROS, firmware, I/O, Modbus, collision detection, and fault recovery be version-accepted?")),
  ],
  reviewedAt: "2026-09-04",
});

export const applyVerifiedWaveEightCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => {
  if (company.slug === "jaka-robotics") return patchJaka(company, locale);
  if (company.slug === "ufactory") return patchUfactory(company, locale);
  return company;
};

const row = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  label: Localized,
  value: Localized,
  conditions?: Localized,
): SpecRow => ({ sourceUrl, sourceLabel, locator, label, value, conditions });

const simpleRow = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  labelZh: string,
  labelEn: string,
  valueZh: string,
  valueEn = valueZh,
  conditions?: Localized,
) => row(sourceUrl, sourceLabel, locator, l(labelZh, labelEn), l(valueZh, valueEn), conditions);

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

const companyAboutUrl: Record<WaveEightCompanySlug, string> = {
  "jaka-robotics": JAKA_ABOUT,
  ufactory: UFACTORY_HOME,
};

const catalogTitle: Record<WaveEightCompanySlug, Localized> = {
  "jaka-robotics": l("JAKA 型号级产品目录", "JAKA model-level product catalog"),
  ufactory: l("UFACTORY 型号级产品目录", "UFACTORY model-level product catalog"),
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
  openness: locale === "zh" ? "官方产品页或硬件手册公开" : "Official product page or hardware manual is public",
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
    ? "本条对应具名型号；数值只适用于引用来源所述配置和条件。"
    : "This record maps to a named model; figures apply only to the cited configuration and conditions."),
  profile: finderProfile(company),
  evidence: {
    level: "model",
    specificationKind: "parameters",
    specificationCoverage: seed.coverage,
    specificationCoverageNote: locale === "zh"
      ? seed.coverage === "official-complete"
        ? "已逐项覆盖当前引用官方规格表中该产品区块的公开字段；后续修订仍以来源页和订单文件为准。"
        : "已覆盖当前官方页面或手册的核心公开字段，但尚未声明所有关联手册、选件和固件字段均已转录。"
      : seed.coverage === "official-complete"
        ? "All public fields in the cited product block of the current official specification table are covered; later revisions remain governed by the source and order documents."
        : "Core public fields from the current official page or manual are covered, but complete transcription of every related manual, option, and firmware field is not yet claimed.",
    overview: seed.overview.map((item) => t(locale, item)),
    applications: seed.applications.map((item) => t(locale, item)),
    disclosureBoundary: locale === "zh"
      ? "公开数值只适用于引用来源、具名型号、硬件代次、配置和测试条件；价格、交期、未公开字段和项目性能不作推断。"
      : "Published figures apply only to the cited source, named model, hardware generation, configuration, and test conditions; price, lead time, undisclosed fields, and project performance are not inferred.",
    sourceLinks: [...new Map([
      { label: locale === "zh" ? `${seed.product} 官方资料` : `${seed.product} official material`, url: seed.pageUrl },
      ...(seed.sourceLinks ?? []).map((item) => ({ label: t(locale, item.label), url: item.url })),
      { label: locale === "zh" ? "公司官方介绍" : "Official company profile", url: companyAboutUrl[seed.companySlug] },
    ].map((item) => [item.url, item])).values()],
  },
});

type JakaZuSpec = {
  model: string;
  payload: string;
  mass: string;
  reach: string;
  repeatability: string;
  tcpSpeed: string;
  power: string;
  bodyIp: string;
  footprint: string;
  jointSpeeds: string;
};

const jakaSource = l("JAKA Zu 系列硬件用户手册 V11", "JAKA Zu Series Hardware User Manual V11");
const jakaLocator = l("技术规格与控制柜参数表", "Technical specifications and controller tables");
const jakaProductUrl = (model: string) => `https://www.jaka.com/en/productDetails/JAKA_${model}`;
const jakaZuSpecs: JakaZuSpec[] = [
  { model: "Zu3", payload: "3 kg", mass: "12 kg", reach: "626 mm", repeatability: "±0.02 mm", tcpSpeed: "1.5 m/s", power: "150 W", bodyIp: "IP54", footprint: "129 mm", jointSpeeds: "J1-J3 180°/s; J4-J6 220°/s" },
  { model: "Zu5", payload: "5 kg", mass: "23 kg", reach: "954 mm", repeatability: "±0.02 mm", tcpSpeed: "3 m/s", power: "350 W", bodyIp: "IP54", footprint: "158 mm", jointSpeeds: "J1-J6 180°/s" },
  { model: "Zu7", payload: "7 kg", mass: "22 kg", reach: "819 mm", repeatability: "±0.02 mm", tcpSpeed: "2.5 m/s", power: "350 W", bodyIp: "IP54", footprint: "158 mm", jointSpeeds: "J1-J6 180°/s" },
  { model: "Zu12", payload: "12 kg", mass: "41 kg", reach: "1327 mm", repeatability: "±0.03 mm", tcpSpeed: "3 m/s", power: "500 W", bodyIp: "IP54", footprint: "188 mm", jointSpeeds: "J1-J3 120°/s; J4-J6 180°/s" },
  { model: "Zu18", payload: "18 kg", mass: "35 kg", reach: "1073 mm", repeatability: "±0.03 mm", tcpSpeed: "3.5 m/s", power: "500 W", bodyIp: "IP54", footprint: "188 mm", jointSpeeds: "J1-J2 120°/s; J3-J6 180°/s" },
  { model: "Zu20", payload: "20 kg", mass: "68 kg", reach: "1780 mm", repeatability: "±0.05 mm", tcpSpeed: "5 m/s", power: "750 W", bodyIp: "IP65", footprint: "246 mm", jointSpeeds: "J1-J3 120°/s; J4-J6 220°/s" },
  { model: "Zu30", payload: "30 kg", mass: "65 kg", reach: "1350 mm", repeatability: "±0.05 mm", tcpSpeed: "4.2 m/s", power: "750 W", bodyIp: "IP65", footprint: "246 mm", jointSpeeds: "J1-J3 120°/s; J4-J6 220°/s" },
];

const jakaZuRows = (spec: JakaZuSpec): SpecRow[] => {
  const r = (labelZh: string, labelEn: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => (
    simpleRow(JAKA_MANUAL, jakaSource, jakaLocator, labelZh, labelEn, valueZh, valueEn, conditions)
  );
  return [
    r("额定负载", "Rated payload", spec.payload),
    r("本体质量（含电缆）", "Robot mass including cable", spec.mass),
    r("臂展", "Reach", spec.reach),
    r("重复定位精度", "Repeatability", spec.repeatability),
    r("自由度", "Degrees of freedom", "6 DoF"),
    r("最大工具端速度", "Maximum TCP speed", spec.tcpSpeed),
    r("最大关节速度", "Maximum joint speeds", spec.jointSpeeds),
    r("平均功率", "Average power", spec.power),
    r("本体防护等级", "Robot ingress protection", spec.bodyIp),
    r("底座直径", "Base diameter", spec.footprint),
    r("编程方式", "Programming", "图形化编程、拖拽编程", "Graphical programming and freedrive programming"),
    r("示教终端", "Teaching terminal", "电脑、平板或手机", "Computer, tablet, or mobile phone"),
    r("工具端 I/O", "Tool I/O", "2 路数字输入、2 路数字输出、2 路模拟输入", "2 digital inputs, 2 digital outputs, 2 analog inputs"),
    r("控制柜 I/O", "Controller I/O", "16 路数字输入、16 路数字输出、2 路模拟输入或输出", "16 digital inputs, 16 digital outputs, 2 analog inputs or outputs"),
    r("通信协议", "Communication protocols", "TCP/IP、Modbus TCP、Modbus RTU、PROFINET、EtherNet/IP", "TCP/IP, Modbus TCP, Modbus RTU, PROFINET, EtherNet/IP"),
    r("控制柜供电", "Controller input", "100-240 V AC, 50-60 Hz"),
    r("控制柜尺寸", "Controller dimensions", "410 × 307 × 235 mm"),
    r("控制柜防护等级", "Controller ingress protection", "IP44"),
  ];
};

const jakaSeeds: ProductSeed[] = jakaZuSpecs.map((spec) => ({
  id: `jaka-${spec.model.toLowerCase()}`,
  companySlug: "jaka-robotics",
  product: `JAKA ${spec.model}`,
  pageUrl: jakaProductUrl(spec.model),
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "industrial-arm",
  useCases: ["manufacturing", "integration"],
  type: l("六轴协作机械臂", "Six-axis collaborative robot arm"),
  integration: l("本体、JAKA 控制柜、移动示教终端、工具端 I/O 与工业网络组成基础系统；末端、视觉、力控和安全设备按应用集成。", "The base system combines the arm, JAKA controller, mobile teaching terminal, tool I/O, and industrial networking; tooling, vision, force control, and safety devices are application-integrated."),
  verification: l("按具体硬件和控制柜版本核对负载重心、工作空间、关节限制、节拍、安装、防护、I/O、安全功能和软件版本。", "Verify payload center of gravity, workspace, joint limits, cycle time, mounting, protection, I/O, safety functions, and software version for the specific arm and controller revision."),
  rows: jakaZuRows(spec),
  overview: [
    l(`JAKA ${spec.model} 是当前 Zu 系列中的具名型号，官方手册给出的额定负载为 ${spec.payload}、臂展 ${spec.reach}、重复定位精度 ${spec.repeatability}。`, `JAKA ${spec.model} is a named current Zu-series model. The official manual publishes ${spec.payload} rated payload, ${spec.reach} reach, and ${spec.repeatability} repeatability.`),
    l("本记录把型号级机械与控制字段拆开索引；实际节拍、协作速度和免围栏条件仍由工具、工件、轨迹、风险评估和安全配置决定。", "This record indexes model-level mechanical and control fields separately. Actual cycle time, collaborative speed, and fence-free suitability still depend on tooling, workpiece, trajectory, risk assessment, and safety configuration."),
  ],
  applications: [l("装配、上下料、焊接、涂胶、检测与打磨", "Assembly, machine tending, welding, dispensing, inspection, and finishing"), l("包装、码垛和柔性搬运", "Packaging, palletizing, and flexible handling")],
  coverage: "official-partial",
  sourceLinks: [
    { label: l("JAKA Zu 系列硬件用户手册", "JAKA Zu Series hardware manual"), url: JAKA_MANUAL },
    { label: l("JAKA 下载中心", "JAKA download center"), url: JAKA_DOWNLOADS },
  ],
}));

const xarmSource = l("UFACTORY xArm 在线硬件手册", "UFACTORY xArm online hardware manual");
const xarmCommonLocator = l("8.1 xArm5/xArm6/xArm7 通用规格与控制器表", "8.1 xArm5/xArm6/xArm7 common specifications and controller table");
const u850Source = l("UFACTORY 850 在线硬件手册", "UFACTORY 850 online hardware manual");
const u850Locator = l("8 技术规格与控制器表", "Section 8 technical specifications and controller table");
const lite6Source = l("UFACTORY Lite6 在线硬件手册", "UFACTORY Lite6 online hardware manual");
const lite6Locator = l("9 技术规格", "Section 9 technical specifications");

const xarmCommonRows = (): SpecRow[] => {
  const r = (labelZh: string, labelEn: string, valueZh: string, valueEn = valueZh, conditions?: Localized) => (
    simpleRow(XARM_SPECS, xarmSource, xarmCommonLocator, labelZh, labelEn, valueZh, valueEn, conditions)
  );
  return [
    r("笛卡尔工作范围", "Cartesian range", "X ±700 mm；Y ±700 mm；Z -400 至 951.5 mm；Roll/Pitch/Yaw ±180°", "X ±700 mm; Y ±700 mm; Z -400 to 951.5 mm; Roll/Pitch/Yaw ±180°"),
    r("最大关节速度", "Maximum joint speed", "180°/s"),
    r("最大末端速度", "Maximum TCP speed", "1 m/s"),
    r("重复定位精度", "Repeatability", "±0.1 mm"),
    r("工作温度", "Operating temperature", "0-50°C"),
    r("功耗", "Power consumption", "最小 8.4 W；典型 200 W；建议 500 W", "Minimum 8.4 W; typical 200 W; recommended 500 W"),
    r("本体输入电源", "Robot input power", "24 V DC, 20.8 A"),
    r("ISO 洁净室等级", "ISO cleanroom class", "Class 5"),
    r("安装方向", "Mounting orientation", "任意方向", "Any direction"),
    r("本体材料", "Robot materials", "铝、碳纤维", "Aluminium and carbon fiber"),
    r("底座占地", "Footprint", "Ø126 mm"),
    r("末端法兰", "End flange", "DIN ISO 9409-1-A50/63 (M5 × 6)"),
    r("本体通信协议", "Robot communication protocol", "私有 TCP（自定义）", "Private TCP (custom)"),
    r("末端通信协议", "End-effector communication protocol", "Modbus TCP"),
    r("编程方式", "Programming", "UFACTORY Studio、Python、C++、ROS", "UFACTORY Studio, Python, C++, ROS"),
    r("AC 控制箱输入", "AC controller input", "100-240 V AC, 50/60 Hz"),
    r("DC 控制箱输入", "DC controller input", "24-72 V DC"),
    r("AC 控制箱输出", "AC controller output", "24 V DC, 20.8 A"),
    r("DC 控制箱输出", "DC controller output", "24 V DC, 最大 672 W", "24 V DC, 672 W maximum"),
    r("控制箱通信", "Controller communication", "以太网；私有 TCP", "Ethernet; private TCP"),
    r("控制箱 I/O", "Controller I/O", "8 CI + 8 DI；8 CO + 8 DO；2 AI；2 AO；1 路 RS-485 主站", "8 CI + 8 DI; 8 CO + 8 DO; 2 AI; 2 AO; 1 RS-485 master"),
    r("AC 控制箱质量", "AC controller mass", "3.9 kg"),
    r("DC 控制箱质量", "DC controller mass", "2.6 kg"),
    r("AC 控制箱尺寸", "AC controller dimensions", "285 × 135 × 101 mm"),
    r("DC 控制箱尺寸", "DC controller dimensions", "262 × 160 × 76 mm"),
  ];
};

type XarmModel = { model: string; anchor: string; joints: string; payload: string; dof: string; mass: string };
const xarmModels: XarmModel[] = [
  { model: "xArm 5", anchor: "8-2-xarm5-specifications", joints: "J1-J5: ±360°, -117° to 116°, -219° to 10°, -97° to 180°, ±360°", payload: "3 kg", dof: "5 DoF", mass: "11.3 kg" },
  { model: "xArm 6", anchor: "8-3-xarm6-specifications", joints: "J1-J6: ±360°, -117° to 116°, -219° to 10°, ±360°, -97° to 180°, ±360°", payload: "5 kg", dof: "6 DoF", mass: "12.5 kg" },
  { model: "xArm 7", anchor: "8-4-xarm7-specifications", joints: "J1-J7: ±360°, -117° to 116°, ±360°, -6° to 225°, ±360°, -97° to 180°, ±360°", payload: "3.5 kg", dof: "7 DoF", mass: "14.3 kg" },
];

const xarmSeeds: ProductSeed[] = xarmModels.map((spec) => {
  const locator = l(`${spec.model} 型号规格`, `${spec.model} model specifications`);
  const modelRows = [
    simpleRow(XARM_SPECS, xarmSource, locator, "关节范围", "Joint range", spec.joints),
    simpleRow(XARM_SPECS, xarmSource, locator, "最大负载", "Maximum payload", spec.payload),
    simpleRow(XARM_SPECS, xarmSource, locator, "自由度", "Degrees of freedom", spec.dof),
    simpleRow(XARM_SPECS, xarmSource, locator, "本体质量", "Robot mass", spec.mass),
  ];
  return {
    id: `ufactory-${spec.model.toLowerCase().replace(/\s+/g, "-")}`,
    companySlug: "ufactory",
    product: `UFACTORY ${spec.model}`,
    pageUrl: `${XARM_SPECS}#${spec.anchor}`,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "industrial-arm",
    useCases: ["research", "manufacturing", "integration"],
    type: l(`${spec.dof.replace(" DoF", "")} 自由度轻量机械臂`, `${spec.dof} lightweight robot arm`),
    integration: l("本体与 AC 或 DC 控制箱通过以太网和私有 TCP 通信，末端与控制器 I/O、RS-485 及 SDK/ROS 按硬件代次集成。", "The arm and AC or DC controller communicate over Ethernet and private TCP; tool I/O, controller I/O, RS-485, SDK, and ROS integration depend on hardware generation."),
    verification: l("按序列号确认 1200/1300 代法兰和控制箱，再核对负载、关节范围、工作空间、重复精度、末端协议和软件版本。", "Confirm the 1200/1300-generation flange and controller by serial number, then verify payload, joint range, workspace, repeatability, end-effector protocol, and software version."),
    rows: [...xarmCommonRows(), ...modelRows],
    overview: [
      l(`UFACTORY ${spec.model} 是 xArm 系列的独立结构，官方手册列出 ${spec.dof}、${spec.payload} 最大负载和 ${spec.mass} 本体质量。`, `UFACTORY ${spec.model} is a distinct xArm configuration. The official manual lists ${spec.dof}, ${spec.payload} maximum payload, and ${spec.mass} robot mass.`),
      l("三款 xArm 共享大部分工作空间、控制器和软件字段，但不能因共用平台而合并轴数、关节范围或负载。", "The three xArm models share most workspace, controller, and software fields, but axis count, joint range, and payload must not be merged merely because they share a platform."),
    ],
    applications: [l("研究、教育、取放、检测与轻型装配", "Research, education, pick-and-place, inspection, and light assembly"), l("机器人学习、末端开发与移动操作", "Robot learning, end-effector development, and mobile manipulation")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("xArm 1300 代硬件差异", "xArm 1300-generation hardware differences"), url: XARM_REVISION }],
  };
});

const u850Rows = (): SpecRow[] => {
  const r = (labelZh: string, labelEn: string, valueZh: string, valueEn = valueZh) => (
    simpleRow(U850_SPECS, u850Source, u850Locator, labelZh, labelEn, valueZh, valueEn)
  );
  return [
    r("本体质量", "Robot mass", "20 kg"),
    r("最大负载", "Maximum payload", "5 kg"),
    r("笛卡尔工作范围", "Cartesian range", "X ±850 mm；Y ±850 mm；Z -400 至 1214 mm；Roll/Pitch/Yaw ±180°", "X ±850 mm; Y ±850 mm; Z -400 to 1214 mm; Roll/Pitch/Yaw ±180°"),
    r("关节范围", "Joint range", "J1-J6: ±360°, ±132°, -242° to 3.5°, ±360°, ±124°, ±360°"),
    r("最大末端速度", "Maximum TCP speed", "1 m/s"),
    r("最大关节速度", "Maximum joint speed", "180°/s"),
    r("重复定位精度", "Repeatability", "±0.02 mm"),
    r("工作温度", "Operating temperature", "0-50°C"),
    r("功耗", "Power consumption", "典型 240 W；最大 1000 W；建议 500 W", "Typical 240 W; maximum 1000 W; recommended 500 W"),
    r("本体输入电源", "Robot input power", "48 V DC, 20.8 A"),
    r("ISO 洁净室等级", "ISO cleanroom class", "Class 5"),
    r("安装方向", "Mounting orientation", "任意方向", "Any direction"),
    r("本体材料", "Robot materials", "铝、碳纤维", "Aluminium and carbon fiber"),
    r("底座占地", "Footprint", "Ø190 mm"),
    r("末端法兰", "End flange", "DIN ISO 9409-1-50-4-M6 (M6 × 6)"),
    r("本体通信协议", "Robot communication protocol", "私有 TCP（自定义）", "Private TCP (custom)"),
    r("末端通信协议", "End-effector communication protocol", "Modbus TCP"),
    r("编程方式", "Programming", "UFACTORY Studio、Python、C++、ROS", "UFACTORY Studio, Python, C++, ROS"),
    r("AC 控制箱输入", "AC controller input", "100-240 V AC, 50/60 Hz"),
    r("DC 控制箱输入", "DC controller input", "48-72 V DC"),
    r("AC 控制箱输出", "AC controller output", "48 V DC, 最大 1000 W", "48 V DC, 1000 W maximum"),
    r("DC 控制箱输出", "DC controller output", "48 V DC, 最大 960 W", "48 V DC, 960 W maximum"),
    r("控制箱通信", "Controller communication", "以太网；私有 TCP", "Ethernet; private TCP"),
    r("控制箱 I/O", "Controller I/O", "8 CI + 8 DI；8 CO + 8 DO；2 AI；2 AO；1 路 RS-485 主站", "8 CI + 8 DI; 8 CO + 8 DO; 2 AI; 2 AO; 1 RS-485 master"),
    r("AC 控制箱质量", "AC controller mass", "4.8 kg"),
    r("DC 控制箱质量", "DC controller mass", "2.8 kg"),
    r("AC 控制箱尺寸", "AC controller dimensions", "345 × 135 × 101 mm"),
    r("DC 控制箱尺寸", "DC controller dimensions", "262 × 160 × 76 mm"),
  ];
};

const lite6Rows = (): SpecRow[] => {
  const r = (labelZh: string, labelEn: string, valueZh: string, valueEn = valueZh) => (
    simpleRow(LITE6_SPECS, lite6Source, lite6Locator, labelZh, labelEn, valueZh, valueEn)
  );
  return [
    r("笛卡尔工作范围", "Cartesian range", "X ±440 mm；Y ±440 mm；Z -165 至 683.5 mm；Roll/Pitch/Yaw ±180°", "X ±440 mm; Y ±440 mm; Z -165 to 683.5 mm; Roll/Pitch/Yaw ±180°"),
    r("本体质量", "Robot mass", "8 kg"),
    r("最大负载", "Maximum payload", "600 g"),
    r("自由度", "Degrees of freedom", "6 DoF"),
    r("最大关节速度", "Maximum joint speed", "180°/s"),
    r("最大末端速度", "Maximum TCP speed", "500 mm/s"),
    r("重复定位精度", "Repeatability", "±0.5 mm"),
    r("工作温度", "Operating temperature", "0-50°C"),
    r("功耗", "Power consumption", "典型 150 W；建议 350 W", "Typical 150 W; recommended 350 W"),
    r("输入电源", "Input power", "24 V DC, 14.66 A"),
    r("ISO 洁净室等级", "ISO cleanroom class", "Class 5"),
    r("安装方向", "Mounting orientation", "任意角度", "Any orientation"),
    r("本体材料", "Robot materials", "铝、碳纤维", "Aluminium and carbon fiber"),
    r("底座占地", "Footprint", "130 × 140 mm"),
    r("末端法兰", "End flange", "DIN ISO 9409-1-A50/63 (M5 × 6)"),
    r("本体通信协议", "Robot communication protocol", "私有 TCP（自定义）", "Private TCP (custom)"),
    r("末端 485 协议", "Tool RS-485 protocol", "Modbus RTU"),
    r("编程方式", "Programming", "UFACTORY Studio、Python、C++、ROS", "UFACTORY Studio, Python, C++, ROS"),
    simpleRow(LITE6_PREFACE, lite6Source, l("前言中的产品运动范围", "Product motion range in the preface"), "关节范围", "Joint range", "J1-J6: ±360°, ±150°, -3.5° to 300°, ±360°, ±124°, ±360°"),
  ];
};

const ufactoryArmSeeds: ProductSeed[] = [
  ...xarmSeeds,
  {
    id: "ufactory-850", companySlug: "ufactory", product: "UFACTORY 850", pageUrl: U850_SPECS,
    category: "robot-platform", primary: "robot-platform", subclass: "industrial-arm", useCases: ["manufacturing", "integration"],
    type: l("六轴工业协作机械臂", "Six-axis industrial collaborative robot arm"),
    integration: l("48 V 本体与 AC/DC 控制箱、控制器 I/O、RS-485、以太网和 Studio/SDK/ROS 组成基础集成面。", "The 48 V arm integrates with AC/DC controllers, controller I/O, RS-485, Ethernet, and Studio/SDK/ROS."),
    verification: l("核对 5 kg 动态负载、850 mm 工作空间、安装刚度、法兰、控制箱版本、末端通信、安全链和连续节拍。", "Verify the 5 kg dynamic payload, 850 mm workspace, mounting stiffness, flange, controller revision, tool communication, safety chain, and sustained cycle time."),
    rows: u850Rows(),
    overview: [l("UFACTORY 850 是官方当前工业协作机械臂，在线手册公开 5 kg 最大负载、20 kg 本体质量和 ±0.02 mm 重复定位精度。", "UFACTORY 850 is the current industrial cobot in the official catalog. Its online manual publishes a 5 kg maximum payload, 20 kg body mass, and ±0.02 mm repeatability."), l("记录逐项覆盖本体和 AC/DC 控制箱规格；G2 夹爪与 AS1200 吸具作为独立产品记录，避免把选件参数误归到本体。", "The record covers arm and AC/DC-controller specifications field by field. The G2 gripper and AS1200 vacuum tool are separate records so option specifications are not misattributed to the arm.")],
    applications: [l("轻型装配、上下料、检测和抓取", "Light assembly, machine tending, inspection, and handling"), l("研究与工业协作工作站", "Research and industrial collaborative workcells")],
    coverage: "official-complete",
  },
  {
    id: "ufactory-lite6", companySlug: "ufactory", product: "UFACTORY Lite6", pageUrl: LITE6_SPECS,
    category: "robot-platform", primary: "robot-platform", subclass: "desktop-arm", useCases: ["research", "service", "integration"],
    type: l("桌面级六轴机械臂", "Desktop six-axis robot arm"),
    integration: l("24 V 本体通过 UFACTORY Studio、Python/C++/ROS 和工具端 I/O/Modbus RTU 开发；轻量夹爪与真空吸头独立选配。", "The 24 V arm is developed through UFACTORY Studio, Python/C++/ROS, and tool I/O/Modbus RTU; the lightweight gripper and vacuum head are separate options."),
    verification: l("核对 600 g 负载下的姿态、节拍、±0.5 mm 重复定位精度、末端质量、安装刚度、用途安全和连续运行。", "Verify pose, cycle time, ±0.5 mm repeatability, tool mass, mounting stiffness, intended-use safety, and continuous duty at the 600 g payload."),
    rows: lite6Rows(),
    overview: [l("Lite6 是当前桌面级六轴机械臂，官方在线手册公开 600 g 最大负载、440 mm 级工作范围和 8 kg 本体质量。", "Lite6 is the current desktop six-axis arm. The official online manual publishes a 600 g maximum payload, a 440 mm-class workspace, and 8 kg body mass."), l("当前网页技术规格写明 ±0.5 mm 重复定位精度；旧版资料可能出现不同数字，选型时应锁定硬件与手册修订版。", "The current web specification states ±0.5 mm repeatability. Older materials may show different figures, so selection must lock the hardware and manual revision.")],
    applications: [l("教育、科研、桌面取放和轻型服务设备", "Education, research, desktop pick-and-place, and light service equipment"), l("机器人学习和末端工具原型", "Robot learning and end-tool prototyping")],
    coverage: "official-complete",
  },
];

const accessorySeed = (
  id: string,
  product: string,
  pageUrl: string,
  subclass: string,
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  specs: Array<[string, string, string, string?]>,
  overview: Localized[],
  applications: Localized[],
  coverage: FinderSpecificationCoverage = "official-complete",
): ProductSeed => ({
  id,
  companySlug: "ufactory",
  product,
  pageUrl,
  category: "end-effector",
  primary: "end-effector",
  subclass,
  useCases: ["research", "manufacturing", "integration"],
  type: subclass === "vacuum-gripper" ? l("机器人真空吸具", "Robot vacuum tool") : l("机器人电动夹爪", "Robot electric gripper"),
  integration: l("按对应机械臂工具法兰、24 V 供电、I/O 或 RS-485/Modbus 接口和负载模型集成。", "Integrate against the matching arm flange, 24 V supply, I/O or RS-485/Modbus interface, and payload model."),
  verification: l("以工件材料、表面、摩擦、姿态、加速度、行程、夹持力或真空泄漏、线缆和硬件代次做样件验收。", "Validate with real parts across material, surface, friction, pose, acceleration, stroke, grip force or vacuum leakage, cabling, and hardware generation."),
  rows: specs.map(([labelZh, labelEn, valueZh, valueEn]) => simpleRow(sourceUrl, sourceLabel, locator, labelZh, labelEn, valueZh, valueEn ?? valueZh)),
  overview,
  applications,
  coverage,
});

const ufactoryAccessorySeeds: ProductSeed[] = [
  accessorySeed(
    "ufactory-xarm-gripper", "UFACTORY xArm Gripper", `${XARM_SPECS}#gripper`, "parallel-gripper", XARM_SPECS, xarmSource, l("8.1 Gripper 规格表", "Section 8.1 Gripper table"),
    [
      ["额定供电电压", "Nominal supply voltage", "24 V DC"], ["绝对最大供电电压", "Absolute maximum supply voltage", "28 V DC"],
      ["静态功耗", "Quiescent power", "1.5 W"], ["峰值电流", "Peak current", "1.5 A"],
      ["行程", "Working range", "84 mm"], ["最大夹持力", "Maximum clamping force", "30 N"],
      ["质量", "Mass", "802 g"], ["通信方式", "Communication method", "RS-485"],
      ["官方表列通信协议", "Protocol as listed in official table", "Modbus TCP"], ["可编程参数", "Programmable parameters", "位置、速度", "Position and speed"],
      ["反馈", "Feedback", "位置", "Position"],
    ],
    [l("xArm Gripper 是 84 mm 行程的两指电动夹爪，官方表公开 30 N 最大夹持力和位置反馈。", "xArm Gripper is a two-finger electric gripper with 84 mm stroke, 30 N maximum clamping force, and position feedback."), l("同一表同时写 RS-485 与 Modbus TCP，协议层描述存在不一致；下单前必须以当前硬件手册、序列号和支持答复确认。", "The same table lists RS-485 and Modbus TCP, creating a protocol-layer inconsistency. Confirm against the current hardware manual, serial number, and support response before ordering.")],
    [l("轻型取放、教育和末端开发", "Light pick-and-place, education, and end-tool development")],
    "official-partial",
  ),
  accessorySeed(
    "ufactory-as1200", "UFACTORY AS1200 Vacuum Gripper", `${XARM_SPECS}#vacuum-gripper-as1200`, "vacuum-gripper", XARM_SPECS, xarmSource, l("8.1 Vacuum Gripper (AS1200) 规格表", "Section 8.1 Vacuum Gripper (AS1200) table"),
    [
      ["额定供电电压", "Rated supply voltage", "24 V DC"], ["绝对最大供电电压", "Absolute maximum supply voltage", "28 V DC"],
      ["真空压力", "Vacuum pressure", "-55 kPa"], ["真空流量", "Vacuum flow", ">4 L/min"],
      ["质量", "Mass", "610 g"], ["尺寸", "Dimensions", "122.5 × 91.6 × 75 mm"],
      ["最大负载", "Maximum payload", "≤5 kg"], ["噪声（30 cm）", "Noise at 30 cm", "<60 dB"],
      ["静态电流", "Quiescent current", "20 mA"], ["峰值电流", "Peak current", "500 mA"],
      ["通信方式", "Communication method", "数字 I/O", "Digital I/O"], ["状态指示", "State indication", "电源状态、工作状态", "Power and working state"],
      ["反馈", "Feedback", "气压低或正常", "Air pressure low or normal"],
    ],
    [l("AS1200 是带数字 I/O 和气压状态反馈的官方真空吸具；5 kg 额定值仍取决于吸盘、表面、姿态、加速度和泄漏。", "AS1200 is the official vacuum tool with digital I/O and air-pressure feedback. Its 5 kg rating still depends on cup choice, surface, pose, acceleration, and leakage.")],
    [l("平面工件、包装和轻型搬运", "Flat workpieces, packaging, and light handling")],
  ),
  accessorySeed(
    "ufactory-g2-ag1200", "UFACTORY G2 (AG1200)", `${U850_SPECS}#gripper-g2-ag1200`, "parallel-gripper", U850_SPECS, u850Source, l("Gripper G2 (AG1200) 规格表", "Gripper G2 (AG1200) table"),
    [
      ["额定供电电压", "Nominal supply voltage", "24 V DC"], ["绝对最大供电电压", "Absolute maximum supply voltage", "28 V DC"],
      ["静态功耗", "Quiescent power", "1 W"], ["最大负载", "Payload", "5 kg"], ["质量", "Mass", "800 g"],
      ["夹持力", "Clamping force", "10-50 N"], ["行程", "Working range", "84 ±1 mm"], ["夹持速度", "Speed", "15-225 mm/s"],
      ["手指类型", "Finger type", "可更换", "Replaceable"], ["循环寿命", "Cycle life", ">2,000,000 cycles"],
      ["通信方式", "Communication method", "RS-485"], ["通信协议", "Communication protocol", "Modbus RTU"],
      ["可编程参数", "Programmable parameters", "位置、速度、力", "Position, speed, and force"], ["反馈", "Feedback", "位置", "Position"],
      ["防护等级", "Ingress protection", "IP40"], ["工作温度上限", "Maximum operating temperature", "50°C"],
    ],
    [l("G2 (AG1200) 是 850 手册列出的可换指电动夹爪，公开 84 mm 行程、10-50 N 夹持力和超过 200 万次循环寿命。", "G2 (AG1200) is the replaceable-finger electric gripper listed in the 850 manual, with 84 mm stroke, 10-50 N clamping force, and a published life above two million cycles.")],
    [l("装配、取放、上下料和柔性夹持", "Assembly, pick-and-place, machine tending, and flexible gripping")],
  ),
  accessorySeed(
    "ufactory-lite6-gripper-lg1000", "UFACTORY Lite6 Gripper (LG1000)", `${LITE6_SPECS}#lite6`, "parallel-gripper", LITE6_SPECS, lite6Source, l("Lite6 机械爪 (LG1000) 规格表", "Lite6 Gripper (LG1000) table"),
    [["输入电压", "Input voltage", "24 V DC"], ["行程", "Stroke", "16 mm"], ["最大夹持力", "Maximum clamping force", "5 N"], ["质量", "Mass", "350 g"], ["通信方式", "Communication method", "I/O"], ["寿命", "Service life", ">6000 h"]],
    [l("LG1000 是 Lite6 配套的小行程轻型夹爪，官方表公开 16 mm 行程、5 N 最大夹持力和 350 g 质量。", "LG1000 is the short-stroke lightweight gripper for Lite6, with 16 mm stroke, 5 N maximum clamping force, and 350 g mass in the official table.")],
    [l("教学、微小工件和轻型桌面取放", "Teaching, small parts, and light desktop pick-and-place")],
  ),
  accessorySeed(
    "ufactory-lite6-vacuum-ls1001", "UFACTORY Lite6 Vacuum Gripper (LS1001)", `${LITE6_SPECS}#lite6-1`, "vacuum-gripper", LITE6_SPECS, lite6Source, l("Lite6 真空吸头 (LS1001) 规格表", "Lite6 Vacuum Gripper (LS1001) table"),
    [["输入电压", "Input voltage", "24 V DC"], ["真空压力", "Vacuum pressure", "-40 kPa"], ["质量", "Mass", "250 g"], ["通信方式", "Communication method", "I/O"], ["反馈", "Feedback", "抓取检测", "Grip detection"], ["寿命", "Service life", ">6000 h"]],
    [l("LS1001 是 Lite6 配套的真空吸头，提供 I/O 控制与抓取检测反馈；吸附能力必须用真实表面和泄漏条件验证。", "LS1001 is the Lite6 vacuum head with I/O control and grip-detection feedback. Holding capability must be validated on the real surface and leakage conditions.")],
    [l("平面小件、包装样件和桌面取放", "Small flat parts, packaging samples, and desktop pick-and-place")],
  ),
];

const productSeeds: ProductSeed[] = [...jakaSeeds, ...ufactoryArmSeeds, ...ufactoryAccessorySeeds];

export const getVerifiedWaveEightProductRecords = (
  locale: Locale,
  companies: CompanyProfile[],
): FinderExpansionRecord[] => {
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  return productSeeds.map((seed) => {
    const company = companyBySlug.get(seed.companySlug);
    if (!company) throw new Error(`Wave-eight product company is missing: ${seed.companySlug}`);
    return toRecord(locale, company, seed);
  });
};

export const waveEightCatalogProductCount = productSeeds.length;
