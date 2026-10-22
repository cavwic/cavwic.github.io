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
type CompanySlug = typeof waveThirteenCompanySlugs[number];

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
  companySlug: CompanySlug;
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
  level?: "model" | "family" | "platform";
  specificationKind?: "parameters" | "capabilities";
  sourceLinks?: Array<{ label: Localized; url: string }>;
};

type TimelineSeed = {
  date: string;
  title: Localized;
  detail: Localized;
  sourceUrl: string;
  kind: "founding" | "product" | "funding";
};

type FundingSeed = {
  date: string;
  round: Localized;
  amount: string | Localized;
  investors: Localized;
  sourceUrl: string;
};

type CompanySeed = {
  legalName: string;
  country: Localized;
  headquarters: Localized;
  founded: string;
  officialUrl: string;
  aboutUrl: string;
  role: Localized;
  positioning: Localized;
  strengths: Localized[];
  products: string[];
  fit: Localized[];
  overview: Localized[];
  businessAreas: Localized[];
  customerGroups: Localized[];
  catalogScope: Localized;
  verificationFocus: Localized;
  presalesQuestions: Localized[];
  catalogTitle: Localized;
  timeline: TimelineSeed[];
  funding: FundingSeed[];
  investmentView: Localized[];
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const t = (locale: Locale, value: Localized) => value[locale];

const BOSTON_HOME = "https://bostondynamics.com/";
const BOSTON_ABOUT = "https://bostondynamics.com/about/";
const BOSTON_SPOT = "https://bostondynamics.com/products/spot/";
const BOSTON_ARM = "https://bostondynamics.com/products/spot/arm/";
const BOSTON_STRETCH = "https://bostondynamics.com/products/stretch/";
const BOSTON_STRETCH_PDF = "https://bostondynamics.com/wp-content/uploads/2024/01/Stretch-Brochure-2025-compressed.pdf";
const BOSTON_ATLAS = "https://bostondynamics.com/products/atlas/";
const BOSTON_ATLAS_PDF = "https://bostondynamics.com/wp-content/uploads/2026/01/atlas-spec-sheet.pdf";
const BOSTON_ORBIT = "https://bostondynamics.com/products/orbit/";

const APPTRONIK_HOME = "https://apptronik.com/";
const APPTRONIK_APOLLO_2 = "https://apptronik.com/apollo/apollo-2";
const APPTRONIK_APOLLO_2023 = "https://apptronik.com/news-collection/apptronik-unveils-apollo";
const APPTRONIK_SERIES_A = "https://apptronik.com/news-collection/apptronik-raises-350-million-in-series-a-funding";
const APPTRONIK_SERIES_AX = "https://apptronik.com/news-collection/apptronik-closes-over-935-million-series-a";
const APPTRONIK_LEADERSHIP = "https://apptronik.com/company/leadership";

const BOOSTER_HOME = "https://www.booster.tech/";
const BOOSTER_ABOUT = "https://www.booster.tech/about-us/";
const BOOSTER_K1 = "https://www.booster.tech/booster-k1/";
const BOOSTER_K1_DOC = "https://docs.booster.tech/docs/product-manual/k1/getting-started/specifications/";
const BOOSTER_T1 = "https://www.booster.tech/booster-t1/";
const BOOSTER_T2 = "https://www.booster.tech/booster-t2/";
const BOOSTER_T2_DOC = "https://docs.booster.tech/docs/product-manual/t2/getting-started/specifications/";

const NOETIX_HOME = "https://www.noetixrobotics.com/";
const NOETIX_DOCS = "https://web.noetixrobotics.com/docs/";
const NOETIX_N2_DOC = "https://web.noetixrobotics.com/docs/%E9%80%9A%E7%94%A8%E4%BA%BA%E5%BD%A2%E6%9C%BA%E5%99%A8%E4%BA%BA/N2%20SDK%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/";
const NOETIX_N2_DELIVERY = "https://web.noetixrobotics.com/docs/%E9%80%9A%E7%94%A8%E4%BA%BA%E5%BD%A2%E6%9C%BA%E5%99%A8%E4%BA%BA/N2%20%E4%BA%BA%E5%BD%A2%E6%9C%BA%E5%99%A8%E4%BA%BA%E4%BA%A4%E4%BB%98%E6%96%87%E6%A1%A3/";
const NOETIX_E1 = "https://www.noetixrobotics.com/detail/E1";
const NOETIX_E1_DOC = "https://web.noetixrobotics.com/docs/%E9%80%9A%E7%94%A8%E4%BA%BA%E5%BD%A2%E6%9C%BA%E5%99%A8%E4%BA%BA/E1%20SDK%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/";
const NOETIX_XIAONUO = "https://www.noetixrobotics.com/mobile/detail/XN";
const NOETIX_W1 = "https://www.noetixrobotics.com/mobile/detail/W1";

const FOURIER_HOME = "https://www.fftai.cn/";
const FOURIER_ABOUT = "https://www.fftai.cn/fourier/about";
const FOURIER_GR1 = "https://support-old.fftai.com/docs/GR-X-Humanoid-Robot/GR1/GR-1_Introduction/";
const FOURIER_GR2 = "https://support-old.fftai.com/docs/GR-X-Humanoid-Robot/GR2/GR-2_Introduction/";
const FOURIER_GR3 = "https://support-old.fftai.com/docs/GR-X-Humanoid-Robot/GR3/GR-3_Introduction/";
const FOURIER_GR3_SERIES = "https://www.fftai.cn/grx/gr3";
const FOURIER_GR3C = "https://www.fftai.cn/products-gr3c";
const FOURIER_N1 = "https://www.fftai.cn/ecosystem/n1";
const FOURIER_N1_DOC = "https://support-old.fftai.com/docs/GR-X-Humanoid-Robot/Fouriern1/N1_Introduction/";
const FOURIER_FDH6 = "https://www.fftai.cn/products-fdh6";
const FOURIER_GALILEO = "https://www.fftai.cn/products-galileo";
const FOURIER_REHAB = "https://www.fftai.cn/rehab/solution";
const FOURIER_ACTIONNET = "https://www.fftai.cn/open-source/17";
const FOURIER_GRW = "https://fftai.com/en/grw";
const FOURIER_GR1_BROCHURE = "https://www.fftai.cn/uploads/upload/files/20250515/635fba393fdafdb5119df36213254e83.pdf";

export const waveThirteenCompanySlugs = [
  "boston-dynamics",
  "apptronik",
  "booster-robotics",
  "noetix-robotics",
  "fourier-intelligence",
] as const;

const companySlugSet = new Set<string>(waveThirteenCompanySlugs);
export const isWaveThirteenCompanySlug = (slug: string) => companySlugSet.has(slug);

const companySeeds: Record<CompanySlug, CompanySeed> = {
  "boston-dynamics": {
    legalName: "Boston Dynamics, Inc.",
    country: l("美国", "United States"),
    headquarters: l("美国马萨诸塞州沃尔瑟姆", "Waltham, Massachusetts, United States"),
    founded: "1992",
    officialUrl: BOSTON_HOME,
    aboutUrl: BOSTON_ABOUT,
    role: l("动态机器人、移动操作、仓储自动化与机群软件厂商", "Dynamic-robot, mobile-manipulation, warehouse-automation, and fleet-software company"),
    positioning: l("当前公开组合由 Spot、Spot Arm、Stretch、电动 Atlas 与 Orbit 构成，分别覆盖巡检、移动操作、箱件卸载、人形制造作业和机群数据。", "Its current public portfolio spans Spot, Spot Arm, Stretch, electric Atlas, and Orbit for inspection, mobile manipulation, case unloading, humanoid manufacturing work, and fleet data."),
    strengths: [
      l("Spot 与 Stretch 已面向客户现场部署；Atlas 当前页面则明确以早期采用者和选定应用为范围，三者商业阶段不能混同。", "Spot and Stretch have customer deployments, while the current Atlas material is scoped to early adopters and selected applications; their commercial stages are not interchangeable."),
      l("机器人本体、自治软件、开发 API、任务编排和 Orbit 运营数据形成一套部署栈。", "Robot hardware, autonomy software, developer APIs, task orchestration, and Orbit operating data form a deployment stack."),
      l("不同产品针对不同任务：Spot 以感知巡检为主，Stretch 以箱件流转为主，Atlas 面向制造与仓储中的通用移动操作。", "The products target different work: Spot primarily senses and inspects, Stretch handles cases, and Atlas targets general mobile manipulation in manufacturing and warehousing."),
    ],
    products: ["Atlas", "Spot", "Spot Arm", "Stretch", "Orbit"],
    fit: [
      l("工业巡检、危险环境远程观察与数字孪生采集。", "Industrial inspection, remote observation in hazardous environments, and digital-twin capture."),
      l("拖车和集装箱卸货、箱件搬运与仓储入库流程。", "Trailer and container unloading, case handling, and warehouse inbound flows."),
      l("零件排序、机床上下料、订单履约与机器人机群管理。", "Part sequencing, machine tending, order fulfillment, and robot-fleet management."),
    ],
    overview: [
      l("Boston Dynamics 1992 年由 MIT Leg Lab 衍生创立，公开历史从 BigDog、早期 Atlas 等研究平台演进到 Spot、Stretch 和电动 Atlas。现行产品必须与历史液压 Atlas、实验演示和退役平台分开建档。", "Boston Dynamics was founded in 1992 as a spinout of the MIT Leg Lab. Its public history progresses from research platforms such as BigDog and early Atlas to Spot, Stretch, and electric Atlas; current products must be separated from historical hydraulic Atlas, demonstrations, and retired platforms."),
      l("Spot 官网公开完整的基础机器人、电池与载荷安装参数；Stretch 2025 手册公开箱件、工作环境、续航、尺寸和效率范围；Atlas 2025 年 12 月销售表公开 23 项本体、负载、充电、安全与环境字段。", "Spot publishes base-robot, battery, and payload-mounting specifications; the 2025 Stretch brochure publishes case, environment, runtime, dimensional, and throughput fields; and the December 2025 Atlas sheet publishes body, payload, charging, safety, and environment fields."),
      l("公开规格可支持初步筛选，但不能替代现场对象、地面、网络、任务周期、安全评估、人工接管和服务条件的项目验收。", "Public specifications support initial screening but do not replace project acceptance for objects, floors, networks, cycle time, safety assessment, human intervention, and service conditions."),
    ],
    businessAreas: [l("移动巡检与远程响应", "Mobile inspection and remote response"), l("仓储箱件自动化", "Warehouse case automation"), l("工业人形移动操作", "Industrial humanoid mobile manipulation"), l("机群、设施与数据运营软件", "Fleet, facility, and data-operations software")],
    customerGroups: [l("制造、能源、建筑和公共安全机构", "Manufacturing, energy, construction, and public-safety organizations"), l("仓储、物流、零售和配送中心运营商", "Warehousing, logistics, retail, and distribution-center operators"), l("高校、研究机构和机器人应用开发团队", "Universities, research institutions, and robot-application developers")],
    catalogScope: l("本批次按官网当前五个顶层产品分别建档；Spot 载荷与附件生态尚未逐 SKU 拆分，历史平台不计入当前在售型号。", "This wave records the five current top-level products separately. Spot payloads and accessories are not yet split by SKU, and historical platforms are not counted as current models."),
    verificationFocus: l("确认产品代际、订购配置、任务对象、载荷定义、自治与遥操作边界、充电、环境、接口、安全认证和服务方案。", "Confirm product generation, ordered configuration, task objects, payload definition, autonomy and teleoperation boundaries, charging, environment, interfaces, certification, and service plan."),
    presalesQuestions: [l("目标任务应使用 Spot、Spot Arm、Stretch 还是 Atlas，现有案例与现场对象是否可比？", "Should the task use Spot, Spot Arm, Stretch, or Atlas, and is the reference deployment comparable to the target objects?"), l("公开载荷、续航和效率是在什么姿态、附件、环境与任务周期下测得？", "Under what pose, payload, accessory, environment, and duty cycle were the published load, runtime, and throughput measured?"), l("Orbit、开发 API、企业系统、网络、数据保留、异常接管和现场服务如何组合？", "How are Orbit, developer APIs, enterprise systems, networking, retention, exception handling, and field service combined?")],
    catalogTitle: l("Boston Dynamics 产品目录", "Boston Dynamics product catalog"),
    timeline: [
      { date: "1992", title: l("公司创立", "Company founded"), detail: l("由 MIT Leg Lab 衍生成立。", "Founded as a spinout of the MIT Leg Lab."), sourceUrl: BOSTON_ABOUT, kind: "founding" },
      { date: "2013", title: l("Atlas 研究平台", "Atlas research platform"), detail: l("早期液压 Atlas 项目公开。", "The early hydraulic Atlas research platform was introduced."), sourceUrl: BOSTON_ABOUT, kind: "product" },
      { date: "2020", title: l("Spot 商业化", "Spot commercialization"), detail: l("公司历史页记录 Spot 开始商业销售。", "The company history records Spot entering commercial sale."), sourceUrl: BOSTON_ABOUT, kind: "product" },
      { date: "2021", title: l("Stretch 发布", "Stretch introduced"), detail: l("面向仓储箱件卸载的 Stretch 发布。", "Stretch was introduced for warehouse case unloading."), sourceUrl: BOSTON_ABOUT, kind: "product" },
      { date: "2024", title: l("电动 Atlas", "Electric Atlas"), detail: l("新一代全电动 Atlas 公开。", "The new all-electric Atlas was introduced."), sourceUrl: BOSTON_ATLAS, kind: "product" },
    ],
    funding: [],
    investmentView: [l("Spot 与 Stretch 已有现场数据，Atlas 则处于不同商业阶段；评估收入和扩张时应按产品线拆分，而不是用品牌知名度替代交付数据。", "Spot and Stretch have field evidence while Atlas is at a different commercial stage; revenue and scaling analysis should be separated by product line rather than inferred from brand recognition."), l("公司属于 Hyundai Motor Group 体系，但母集团财报不能自动拆解为 Boston Dynamics 的独立收入、毛利或现金流。", "The company is part of Hyundai Motor Group, but parent-group reporting does not automatically disclose standalone Boston Dynamics revenue, margin, or cash flow.")],
  },
  apptronik: {
    legalName: "Apptronik, Inc.", country: l("美国", "United States"), headquarters: l("美国得克萨斯州奥斯汀", "Austin, Texas, United States"), founded: "2016", officialUrl: APPTRONIK_HOME, aboutUrl: APPTRONIK_LEADERSHIP,
    role: l("通用人形机器人、执行器、具身软件与机群运营平台厂商", "General-purpose humanoid, actuator, embodied-software, and fleet-operations company"),
    positioning: l("Apollo 2 是当前硬件平台，Artemis 负责感知、规划、控制与安全，Fleet Connect 负责任务、部署、数据和机群运营。", "Apollo 2 is the current hardware platform, Artemis coordinates perception, planning, control, and safety, and Fleet Connect handles tasks, deployments, data, and fleet operations."),
    strengths: [l("团队从 UT Austin Human Centered Robotics Lab 衍生，Apollo 前积累了包括 NASA Valkyrie 在内的多代机器人。", "The team originated from the UT Austin Human Centered Robotics Lab and built multiple robot generations, including work on NASA Valkyrie, before Apollo."), l("Apollo 2 提供双足和轮式两种移动配置，强调同一上身平台适配不同现场。", "Apollo 2 offers bipedal and wheeled mobility configurations around the same upper-body platform."), l("官网当前以系统能力和部署架构为主，尚未发布 Apollo 2 的完整机械规格表。", "Current official material emphasizes system capabilities and deployment architecture rather than a complete Apollo 2 mechanical specification table.")],
    products: ["Apollo 2", "Apollo (2023 generation)", "Artemis", "Fleet Connect"],
    fit: [l("制造、3PL、零售和物流中的搬运、分拣、配套和机床作业。", "Handling, sorting, kitting, and machine work in manufacturing, 3PL, retail, and logistics."), l("需要双足或轮式配置、具身模型接入和多机器人运营的项目。", "Projects requiring bipedal or wheeled configurations, embodied-model integration, and multi-robot operations.")],
    overview: [l("Apptronik 2016 年由得州大学奥斯汀分校 Human Centered Robotics Lab 团队创立。公司称 Apollo 汇集此前 15 台机器人平台的经验；本仓把 2023 年首代 Apollo 与当前 Apollo 2 分开，避免代际参数串用。", "Apptronik was founded in 2016 by a team from the University of Texas at Austin Human Centered Robotics Lab. The company says Apollo builds on 15 earlier platforms; this repository separates the 2023 Apollo from Apollo 2 to prevent cross-generation specification mixing."), l("Apollo 2 页面明确双足/轮式形态、灵巧操作、LED 与语音交互、可更换电池、机会充电和安全区域，但没有公开身高、质量、自由度、额定负载或速度数值。", "The Apollo 2 page establishes bipedal and wheeled forms, dexterous manipulation, LED and speech interaction, swappable batteries, opportunity charging, and safety zones, but does not publish height, mass, DoF, rated payload, or speed figures."), l("公司融资公告的 2025 Series A 金额经历了初始公告与后续追加，必须按公告时点记录，不能把融资金额当作收入或已交付机器人规模。", "The company's 2025 Series A amount changed between the initial announcement and later extension; each disclosure must be dated, and funding must not be treated as revenue or delivered-robot volume.")],
    businessAreas: [l("Apollo 人形机器人硬件与执行器", "Apollo humanoid hardware and actuators"), l("Artemis 具身感知、规划、控制与安全", "Artemis embodied perception, planning, control, and safety"), l("Fleet Connect 机群与部署运营", "Fleet Connect fleet and deployment operations")],
    customerGroups: [l("汽车与一般制造企业", "Automotive and general manufacturers"), l("物流、3PL、零售与仓储运营商", "Logistics, 3PL, retail, and warehouse operators"), l("具身模型、研究和系统集成合作方", "Embodied-model, research, and systems-integration partners")],
    catalogScope: l("当前按 Apollo 2、2023 Apollo、Artemis 与 Fleet Connect 四项建档；Apollo 2 未公开的机械字段不继承旧代数值。", "The catalog records Apollo 2, the 2023 Apollo, Artemis, and Fleet Connect separately; undisclosed Apollo 2 mechanical fields do not inherit figures from the earlier generation."),
    verificationFocus: l("核对本体代际、移动底座、手部、额定载荷、续航、充电、安全区域、Artemis 版本、人工接管、接口与 Fleet Connect 许可。", "Verify body generation, mobility base, hands, rated load, runtime, charging, safety zones, Artemis revision, human intervention, interfaces, and Fleet Connect licensing."),
    presalesQuestions: [l("报价对应双足还是轮式 Apollo 2，机械规格与末端配置是什么？", "Does the quote cover bipedal or wheeled Apollo 2, and what are its mechanical and end-effector specifications?"), l("Artemis 的自治、感知、规划和安全功能哪些已在目标任务中验证？", "Which Artemis autonomy, perception, planning, and safety functions are validated for the target task?"), l("Fleet Connect 的部署、数据、权限、告警、离线运行和服务边界是什么？", "What are the Fleet Connect boundaries for deployment, data, access, alerts, offline operation, and service?")],
    catalogTitle: l("Apptronik Apollo 平台目录", "Apptronik Apollo platform catalog"),
    timeline: [
      { date: "2016", title: l("公司创立", "Company founded"), detail: l("从 UT Austin Human Centered Robotics Lab 团队创立。", "Founded by a team from the UT Austin Human Centered Robotics Lab."), sourceUrl: APPTRONIK_LEADERSHIP, kind: "founding" },
      { date: "2023", title: l("Apollo 发布", "Apollo introduced"), detail: l("公开首代 Apollo 的尺寸、负载和电池目标。", "The first Apollo generation was introduced with dimensional, payload, and battery targets."), sourceUrl: APPTRONIK_APOLLO_2023, kind: "product" },
      { date: "2025-02", title: l("Series A 初始公告", "Initial Series A announcement"), detail: l("公司最初宣布 3.5 亿美元 Series A。", "The company initially announced a USD 350 million Series A."), sourceUrl: APPTRONIK_SERIES_A, kind: "funding" },
      { date: "2026", title: l("Series A 扩展与 Apollo 2", "Series A extension and Apollo 2"), detail: l("公司后续公告 Series A 总额超过 9.35 亿美元，并发布 Apollo 2 页面。", "A later release stated more than USD 935 million across the Series A and the Apollo 2 page was published."), sourceUrl: APPTRONIK_SERIES_AX, kind: "funding" },
    ],
    funding: [
      { date: "2025-02", round: l("Series A 初始公告", "Initial Series A announcement"), amount: "USD 350 million", investors: l("B Capital、Capital Factory、Google 等", "B Capital, Capital Factory, Google, and others"), sourceUrl: APPTRONIK_SERIES_A },
      { date: "2026", round: l("Series A 与 Series A-X 合计公告", "Series A and Series A-X aggregate announcement"), amount: "> USD 935 million", investors: l("以公司后续公告列示投资方为准", "See the later company release for the disclosed investor set"), sourceUrl: APPTRONIK_SERIES_AX },
    ],
    investmentView: [l("Apollo 2 的客户合作与大额融资说明公司具备较强研发和产业合作资源，但当前公开页面不足以计算交付量、利用率、单位成本或毛利。", "Apollo 2 partnerships and financing indicate substantial R&D and industrial resources, but public pages do not establish deliveries, utilization, unit cost, or gross margin."), l("双足与轮式配置扩大应用覆盖，同时也增加硬件配置、验证、安全和服务复杂度。", "Bipedal and wheeled configurations broaden application coverage while increasing hardware, validation, safety, and service complexity.")],
  },
  "booster-robotics": {
    legalName: "Booster Robotics", country: l("中国", "China"), headquarters: l("中国北京", "Beijing, China"), founded: "2023-06", officialUrl: BOOSTER_HOME, aboutUrl: BOOSTER_ABOUT,
    role: l("人形机器人本体、运动控制、开发工具和教育科研平台厂商", "Humanoid hardware, motion-control, developer-tool, and education/research platform company"),
    positioning: l("K1 面向入门与教育开发，T1 面向全尺寸开发与竞赛，T2 是更高算力和负载的旗舰开发平台。", "K1 targets entry and education development, T1 full-size development and competition, and T2 a higher-compute and higher-load flagship platform."),
    strengths: [l("官网把 K1、T1、T2 的版本、计算平台、传感器、续航和开发接口明确分列。", "Official pages separate K1, T1, and T2 editions, compute platforms, sensors, runtime, and developer interfaces."), l("产品从 0.95 m 的 K1 到约 1.4 m 的 T2，覆盖不同成本、算力和末端配置。", "Products range from the 0.95 m K1 to the roughly 1.4 m T2 across different cost, compute, and end-effector configurations."), l("比赛成绩和公开演示是运动能力证据，但不能替代工业任务节拍、安全认证和长期可靠性验证。", "Competition results and public demonstrations are motion evidence but do not replace industrial cycle-time, safety-certification, and long-term reliability validation.")],
    products: ["Booster K1 Geek", "Booster K1 Education", "Booster K1 Professional", "Booster T1 Basic", "Booster T1 Standard", "Booster T1 Customized", "Booster T2 Education E1", "Booster T2 Education E2", "Booster T2 Education E3", "Booster T2 Professional P1", "Booster T2 Professional P2", "Booster T2 Professional P3"],
    fit: [l("人形运动控制、强化学习、教育、竞赛和算法验证。", "Humanoid locomotion control, reinforcement learning, education, competition, and algorithm validation."), l("需要不同算力、手部和相机配置的人形开发平台。", "Humanoid-development platforms requiring different compute, hand, and camera configurations.")],
    overview: [l("Booster Robotics 2023 年 6 月在北京成立。当前官网公开 K1、T1 与 T2 三条硬件主线，并为 K1 和 T2 提供型号版本对照及关节限位表。", "Booster Robotics was founded in Beijing in June 2023. Its current site publishes K1, T1, and T2 hardware lines, including edition comparisons and joint-limit tables for K1 and T2."), l("本仓把三个系列的 12 个可辨识配置分别建档，避免把教育版、专业版和不同末端配置的算力、质量和相机能力合并成一个虚假的通用型号。", "This repository records 12 distinguishable configurations separately so education, professional, and end-effector-specific compute, mass, and camera fields are not merged into a fictitious universal model."), l("K1 官网和手册对续航给出不同速度条件，本仓并列保留 0.4 m/s 与 1.1 m/s 条件值。", "The K1 product page and manual publish runtime under different walking-speed conditions; this repository preserves both the 0.4 m/s and 1.1 m/s values with their conditions.")],
    businessAreas: [l("小型与全尺寸人形机器人", "Compact and full-size humanoids"), l("运动控制、仿真、开发工具与开源框架", "Motion control, simulation, developer tools, and open-source frameworks"), l("教育、科研与机器人竞赛平台", "Education, research, and robot-competition platforms")],
    customerGroups: [l("高校、研究机构和机器人实验室", "Universities, research institutes, and robotics labs"), l("具身智能算法与开发工具团队", "Embodied-AI algorithm and developer-tool teams"), l("人形机器人竞赛与教育机构", "Humanoid-robot competition and education organizations")],
    catalogScope: l("K1、T1、T2 的 12 个公开配置已拆分；本批次覆盖官网及公开手册中的产品规格和关节限位，不把营销演示外推为工业性能。", "Twelve public K1, T1, and T2 configurations are separated. This wave covers product specifications and joint limits from official pages and manuals without extrapolating demonstrations into industrial performance."),
    verificationFocus: l("锁定版本、末端、算力、内存、存储、关节限位、续航测试速度、接口、SDK、保修、安全和认证适用范围。", "Lock edition, end effector, compute, memory, storage, joint limits, runtime test speed, interfaces, SDK, warranty, safety, and certification scope."),
    presalesQuestions: [l("需要 K1、T1 还是 T2，具体教育/专业/末端版本是什么？", "Is K1, T1, or T2 required, and which education, professional, or end-effector edition?"), l("续航和负载是否按目标速度、姿态、末端和连续任务条件验证？", "Are runtime and load validated under the target speed, pose, end effector, and continuous duty?"), l("SDK、低层控制、仿真、保修、备件和安全责任如何划分？", "How are SDK access, low-level control, simulation, warranty, spares, and safety responsibility divided?")],
    catalogTitle: l("Booster Robotics 型号与配置目录", "Booster Robotics model and configuration catalog"),
    timeline: [{ date: "2023-06", title: l("公司创立", "Company founded"), detail: l("Booster Robotics 在北京成立。", "Booster Robotics was founded in Beijing."), sourceUrl: BOOSTER_ABOUT, kind: "founding" }, { date: "2024", title: l("T1", "T1"), detail: l("T1 全尺寸开发平台发布。", "The full-size T1 development platform was introduced."), sourceUrl: BOOSTER_T1, kind: "product" }, { date: "2025", title: l("K1", "K1"), detail: l("K1 入门级开发平台发布。", "The K1 entry development platform was introduced."), sourceUrl: BOOSTER_K1, kind: "product" }, { date: "2026", title: l("T2", "T2"), detail: l("T2 旗舰开发平台发布。", "The T2 flagship development platform was introduced."), sourceUrl: BOOSTER_T2, kind: "product" }],
    funding: [],
    investmentView: [l("版本跨度带来更宽的教育和研发覆盖，但工业采用仍需补充现场可靠性、认证、量产与服务数据。", "The broad edition range supports education and R&D, while industrial adoption still requires field reliability, certification, production, and service evidence."), l("公开融资新闻与比赛成绩不能替代财务、订单、交付和单位经济性资料。", "Funding news and competition results do not replace financial, order, delivery, or unit-economics data.")],
  },
  "noetix-robotics": {
    legalName: "北京松延动力科技集团股份有限公司", country: l("中国", "China"), headquarters: l("中国北京", "Beijing, China"), founded: "2023-09", officialUrl: NOETIX_HOME, aboutUrl: NOETIX_HOME,
    role: l("通用与仿生人形机器人、消费级机器人和开放开发平台厂商", "General and biomimetic humanoid, consumer-robot, and open-development-platform company"),
    positioning: l("产品同时覆盖 Bumi、N2、E1 通用人形本体和小月、小诺、W1 仿生交互平台。", "The portfolio spans Bumi, N2, and E1 general humanoids plus Xiaoyue, Xiaonuo, and W1 biomimetic interaction platforms."),
    strengths: [l("官网公开交付文档、SDK、URDF 与控制说明，可把产品本体和开发权限区分。", "Official delivery documents, SDKs, URDF files, and control notes help distinguish robot hardware from developer access."), l("Bumi、N2、E1 覆盖不同尺寸、自由度、算力和开发版本。", "Bumi, N2, and E1 cover different sizes, DoF, compute, and development editions."), l("仿生交互产品以头部表情、硅胶外观、语音和导览为主，其评价指标与通用双足运动平台不同。", "Biomimetic interaction products focus on facial expression, silicone appearance, speech, and guidance, requiring different evaluation criteria from general bipedal platforms.")],
    products: ["Bumi Standard", "Bumi Education", "N2", "N2 Education", "E1 Standard", "E1 Education", "Xiaoyue", "Xiaonuo 3.0", "Hobbs W1"],
    fit: [l("教育、科研、运动控制和小型人形机器人开发。", "Education, research, locomotion control, and compact-humanoid development."), l("展陈、接待、导览、直播与角色化交互。", "Exhibition, reception, guidance, livestreaming, and character-based interaction.")],
    overview: [l("松延动力 2023 年 9 月在北京成立，官网当前法律页脚使用“北京松延动力科技集团股份有限公司”。目录将通用人形与仿生人形分开，并把标准版和教育版作为独立配置记录。", "Noetix Robotics was founded in Beijing in September 2023; the current site footer identifies Beijing Noetix Robotics Technology Group Co., Ltd. The catalog separates general and biomimetic humanoids and records standard and education editions independently."), l("Bumi、N2 和 E1 的官方文档公开本体、计算、传感、电池、接口与 SDK 边界；部分产品页与 SDK 文档出现质量或尺寸修订差异，本仓按来源和版本条件并列，不选择性覆盖。", "Official Bumi, N2, and E1 documents publish body, compute, sensing, battery, interface, and SDK boundaries. Some product pages and SDK documents differ on mass or dimensions; this repository preserves source and revision conditions rather than silently overwriting one."), l("小诺与 W1 的公开信息主要集中在仿生头部、交互、底盘和电池；小月缺少可逐项转录的完整规格表，因此保持能力型记录。", "Xiaonuo and W1 public material centers on biomimetic heads, interaction, base, and battery. Xiaoyue lacks a transcribable complete specification table and remains a capability-level record.")],
    businessAreas: [l("通用双足人形机器人", "General bipedal humanoids"), l("仿生外观与情感交互机器人", "Biomimetic appearance and emotional-interaction robots"), l("SDK、运动控制、语音与应用平台", "SDKs, motion control, speech, and application platforms")],
    customerGroups: [l("学校、高校、研究机构与开发者", "Schools, universities, research institutions, and developers"), l("展馆、商业服务、文旅和直播团队", "Exhibition, commercial service, cultural-tourism, and livestream teams"), l("家庭、康养和陪伴场景合作方", "Home, care, and companionship partners")],
    catalogScope: l("当前六条官网产品主线已建档，并将 Bumi、N2、E1 版本拆分为 9 条产品记录；W1 图像型手册中尚未完成逐表结构化的字段保持公开不完整。", "All six current official product lines are represented, with Bumi, N2, and E1 editions separated into nine records. Fields in W1's image-based brochure that are not yet fully structured remain officially partial."),
    verificationFocus: l("核对本体/教育版、固件、运控与二开板、控制权限、电池、接口、语音服务、动作范围、防水与安全操作条件。", "Verify body/education edition, firmware, motion and developer compute, control privileges, battery, interfaces, speech service, motion envelope, water protection, and safety conditions."),
    presalesQuestions: [l("目标是通用运动开发还是仿生交互，所选产品和版本是否对应任务？", "Is the target general locomotion development or biomimetic interaction, and does the selected product and edition match the task?"), l("HighControl、LowControl、SDK、URDF、板卡访问和原厂动作分别开放到什么程度？", "What access is provided for HighControl, LowControl, SDK, URDF, onboard compute, and factory motions?"), l("续航、步速、负载、跌倒保护、使用地面、防水、网络和售后如何验收？", "How will runtime, speed, payload, fall protection, floor conditions, water protection, networking, and support be accepted?")],
    catalogTitle: l("松延动力产品与版本目录", "Noetix Robotics product and edition catalog"),
    timeline: [{ date: "2023-09", title: l("公司创立", "Company founded"), detail: l("公司在北京成立。", "The company was founded in Beijing."), sourceUrl: NOETIX_HOME, kind: "founding" }, { date: "2024", title: l("N2 与仿生产品资料", "N2 and biomimetic product material"), detail: l("N2、Dora/Hobbs 等早期资料公开。", "Early N2 and Dora/Hobbs material was published."), sourceUrl: NOETIX_N2_DOC, kind: "product" }, { date: "2025", title: l("E1", "E1"), detail: l("E1 交付和 SDK 文档发布。", "E1 delivery and SDK material was published."), sourceUrl: NOETIX_E1_DOC, kind: "product" }, { date: "2026", title: l("Bumi 与仿生交互产品扩展", "Bumi and biomimetic portfolio expansion"), detail: l("官网当前列出 Bumi、小月、小诺与 W1。", "The current site lists Bumi, Xiaoyue, Xiaonuo, and W1."), sourceUrl: NOETIX_HOME, kind: "product" }],
    funding: [],
    investmentView: [l("从通用双足到仿生交互的产品跨度较大，市场与技术指标应分线评估，不能用单一销量或演示概括。", "The portfolio spans general bipeds and biomimetic interaction, so markets and technical metrics should be assessed separately rather than summarized through one sales or demo figure."), l("官网和文档可支持产品级核验，但未公开定期财务报告；融资、订单、收入和盈利仍需单独尽调。", "Official pages and documents support product verification, but periodic financial reports are not public; funding, orders, revenue, and profitability require separate diligence.")],
  },
  "fourier-intelligence": {
    legalName: "上海傅利叶智能科技股份有限公司", country: l("中国", "China"), headquarters: l("中国上海", "Shanghai, China"), founded: "2015", officialUrl: FOURIER_HOME, aboutUrl: FOURIER_ABOUT,
    role: l("通用人形机器人、康复机器人、灵巧手、开放开发平台与机器人生态厂商", "General humanoid, rehabilitation-robot, dexterous-hand, open-development-platform, and robotics-ecosystem company"),
    positioning: l("GRx 人形主线覆盖 GR-1、GR-2、GR-3，N1 面向开源开发，FDH-6 为灵巧手，Galileo 与 RehabHub 分别连接机器人训练和康复产品生态。", "The GRx humanoid line spans GR-1, GR-2, and GR-3; N1 targets open development, FDH-6 is a dexterous hand, and Galileo and RehabHub connect robot training and rehabilitation-product ecosystems."),
    strengths: [l("GR-2 和 GR-3 官方文档公开本体核心表以及逐关节位置、速度和扭矩限制。", "Official GR-2 and GR-3 documentation publishes both core robot tables and per-joint position, velocity, and torque limits."), l("公司产品跨通用人形、康复和零部件，既有平台协同，也带来型号与应用验证边界。", "The portfolio spans general humanoids, rehabilitation, and components, creating platform overlap as well as model and application validation boundaries."), l("GR-3 的陪伴交互定位与 GR-2 的通用开发定位不同，不应只按身高或自由度进行替代比较。", "GR-3's companion-interaction positioning differs from GR-2's general-development role and should not be substituted solely by height or DoF.")],
    products: ["GR-1L", "GR-1", "GR-1L Pro", "GR-1 Pro", "GR-2", "GR-3", "GR-3C", "GRW", "N1", "FDH-6", "Galileo", "RehabHub", "ActionNet"],
    fit: [l("人形运动、双臂操作、远程操控、具身模型和算法研究。", "Humanoid locomotion, bimanual manipulation, teleoperation, embodied models, and algorithm research."), l("康复训练、评估、医疗机构和康复服务网络。", "Rehabilitation training, assessment, clinical institutions, and rehabilitation-service networks."), l("灵巧手、开发工具和机器人数据生态集成。", "Dexterous-hand, developer-tool, and robot-data ecosystem integration.")],
    overview: [l("傅利叶智能 2015 年成立于上海，官网当前同时展示通用机器人和康复机器人业务。本仓把 GRx、N1、FDH-6、Galileo、ActionNet 与 RehabHub 分开，避免将软件、生态平台和硬件本体合并。", "Fourier Intelligence was founded in Shanghai in 2015 and currently presents both general and rehabilitation robotics. This repository separates GRx, N1, FDH-6, Galileo, ActionNet, and RehabHub so software and ecosystem platforms are not merged with robot hardware."), l("GR-1 文档公开 30 余项系统参数；GR-2 和 GR-3 除核心参数外还公开 29 与 31 个关节的限位、速度和扭矩。本批次将这些关节列拆成独立可检索字段。", "GR-1 documentation publishes more than 30 system fields. GR-2 and GR-3 additionally publish position, velocity, and torque limits for 29 and 31 joints; this wave separates those joint-table cells into searchable parameters."), l("官网称康复产品超过 40 项，但当前尚未把每一康复 SKU 独立拆页；RehabHub 因此是明确的系列/生态记录，不标记为全型号完成。", "The company states a rehabilitation portfolio of more than 40 products, but each rehabilitation SKU is not yet split into its own page; RehabHub is therefore an explicit family/ecosystem record rather than a claim of model-level completion.")],
    businessAreas: [l("GRx 通用人形机器人", "GRx general humanoids"), l("N1 开放平台、FDH-6 灵巧手与机器人组件", "N1 open platform, FDH-6 dexterous hand, and robot components"), l("Galileo、ActionNet 与机器人开发生态", "Galileo, ActionNet, and the robotics developer ecosystem"), l("RehabHub 与康复机器人产品", "RehabHub and rehabilitation robots")],
    customerGroups: [l("高校、研究机构和具身智能开发团队", "Universities, research institutions, and embodied-AI developers"), l("制造、服务和公共空间方案商", "Manufacturing, service, and public-space solution providers"), l("医院、康复机构和医疗服务合作方", "Hospitals, rehabilitation institutions, and healthcare partners")],
    catalogScope: l("本批次拆分 GR-1 四个公开版本，并建立 GR-2、GR-3、GR-3C、GRW、N1、FDH-6、Galileo、ActionNet 与 RehabHub 记录；康复业务仍是系列级部分覆盖。", "This wave separates four public GR-1 editions and records GR-2, GR-3, GR-3C, GRW, N1, FDH-6, Galileo, ActionNet, and RehabHub; rehabilitation remains partially covered at family level."),
    verificationFocus: l("核对具体型号、手部版本、关节限制、负载、续航、接口、遥操作、开发权限、认证、康复用途合规和售后。", "Verify exact model, hand edition, joint limits, payload, runtime, interfaces, teleoperation, developer access, certification, rehabilitation-use compliance, and support."),
    presalesQuestions: [l("选择 GR-1、GR-2、GR-3、N1 还是其他平台，目标是开发、操作、交互还是康复？", "Should the project use GR-1, GR-2, GR-3, N1, or another platform, and is the goal development, manipulation, interaction, or rehabilitation?"), l("关节表、手部、相机、电池和计算平台是否对应报价版本？", "Do the joint table, hands, cameras, battery, and compute platform match the quoted edition?"), l("SDK、遥操作、数据、模型、功能安全、医疗/康复合规和维护分别由谁负责？", "Who owns SDK access, teleoperation, data, models, functional safety, medical/rehabilitation compliance, and maintenance?")],
    catalogTitle: l("傅利叶智能机器人与平台目录", "Fourier Intelligence robot and platform catalog"),
    timeline: [{ date: "2015", title: l("公司创立", "Company founded"), detail: l("傅利叶智能在上海成立。", "Fourier Intelligence was founded in Shanghai."), sourceUrl: FOURIER_ABOUT, kind: "founding" }, { date: "2017", title: l("X1 康复机器人", "X1 rehabilitation robot"), detail: l("公司发展历程扩展康复机器人产品。", "The company timeline expanded into rehabilitation robotics."), sourceUrl: FOURIER_ABOUT, kind: "product" }, { date: "2023", title: l("GR-1", "GR-1"), detail: l("第一代 GRx 通用人形机器人发布。", "The first GRx general humanoid was introduced."), sourceUrl: FOURIER_GR1, kind: "product" }, { date: "2024", title: l("GR-2", "GR-2"), detail: l("第二代通用人形平台发布。", "The second-generation general humanoid platform was introduced."), sourceUrl: FOURIER_GR2, kind: "product" }, { date: "2025", title: l("GR-3 与 N1", "GR-3 and N1"), detail: l("陪伴型 GR-3 与开放平台 N1 资料发布。", "Companion-oriented GR-3 and open N1 material was published."), sourceUrl: FOURIER_GR3, kind: "product" }],
    funding: [],
    investmentView: [l("通用人形与康复业务能够共享执行器、控制和渠道资源，但监管、客户预算、销售周期和售后模型不同，应分业务线评估。", "General humanoid and rehabilitation businesses may share actuation, control, and channel resources, but regulation, budgets, sales cycles, and service models differ and should be assessed separately."), l("公开技术文档较细，有利于工程筛选；财务、订单、交付和盈利情况仍需独立资料，不能从参数完整度反推。", "Detailed public technical documentation helps engineering selection, while financials, orders, deliveries, and profitability still require separate evidence and cannot be inferred from documentation quality.")],
  },
};

export const applyVerifiedWaveThirteenCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => {
  const seed = companySeeds[company.slug as CompanySlug];
  if (!seed) return company;
  return {
    ...company,
    legalName: seed.legalName,
    country: t(locale, seed.country),
    headquarters: t(locale, seed.headquarters),
    founded: seed.founded,
    officialUrl: seed.officialUrl,
    valueChainRole: t(locale, seed.role),
    positioning: t(locale, seed.positioning),
    strengths: seed.strengths.map((item) => t(locale, item)),
    products: seed.products,
    fit: seed.fit.map((item) => t(locale, item)),
    overview: seed.overview.map((item) => t(locale, item)),
    businessAreas: seed.businessAreas.map((item) => t(locale, item)),
    customerGroups: seed.customerGroups.map((item) => t(locale, item)),
    milestones: seed.timeline.map((item) => ({ date: item.date, event: t(locale, item.detail) })),
    catalogScope: t(locale, seed.catalogScope),
    catalogCoverage: "model-partial",
    verificationFocus: t(locale, seed.verificationFocus),
    presalesQuestions: seed.presalesQuestions.map((item) => t(locale, item)),
    reviewedAt: "2026-09-04",
  };
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
): SpecRow => ({ sourceUrl, sourceLabel, locator, label: l(labelZh, labelEn), value: l(valueZh, valueEn), conditions });

const rows = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  values: Array<[string, string, string, string?]>,
): SpecRow[] => values.map(([labelZh, labelEn, valueZh, valueEn]) => row(sourceUrl, sourceLabel, locator, labelZh, labelEn, valueZh, valueEn ?? valueZh));

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

const capabilitySeed = (
  id: string,
  companySlug: CompanySlug,
  product: string,
  pageUrl: string,
  category: FinderCategory,
  primary: string,
  subclass: string,
  type: Localized,
  overview: Localized[],
  applications: Localized[],
  integration: Localized,
  verification: Localized,
  useCases: FinderUseCase[] = ["research", "integration"],
): ProductSeed => ({ id, companySlug, product, pageUrl, category, primary, subclass, type, overview, applications, integration, verification, useCases, rows: [], coverage: "capability-only", level: "platform", specificationKind: "capabilities" });

const jointRangeRows = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  joints: Array<[string, string, number, number]>,
): SpecRow[] => joints.map(([nameZh, nameEn, maximum, minimum]) => row(
  sourceUrl,
  sourceLabel,
  locator,
  `${nameZh}关节角度范围`,
  `${nameEn} joint angle range`,
  `${minimum}° 至 ${maximum}°`,
  `${minimum}° to ${maximum}°`,
));

type DetailedJoint = [number, string, string, number, number, number, number];

const detailedJointRows = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  joints: DetailedJoint[],
): SpecRow[] => joints.flatMap(([index, name, group, maximum, minimum, speed, torque]) => [
  row(sourceUrl, sourceLabel, locator, `${name} 编号与控制组`, `${name} index and control group`, `编号 ${index}；${group}`, `Index ${index}; ${group}`),
  row(sourceUrl, sourceLabel, locator, `${name} 关节角度范围`, `${name} joint angle range`, `${minimum} 至 ${maximum} rad`, `${minimum} to ${maximum} rad`),
  row(sourceUrl, sourceLabel, locator, `${name} 关节角速度上限`, `${name} joint angular-speed limit`, `${speed} rad/s`),
  row(sourceUrl, sourceLabel, locator, `${name} 关节扭矩上限`, `${name} joint torque limit`, `${torque} N·m`),
]);

const bostonSeeds: ProductSeed[] = [
  {
    id: "boston-atlas-electric-2026",
    companySlug: "boston-dynamics",
    product: "Atlas (electric, 2026 specification)",
    pageUrl: BOSTON_ATLAS,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "humanoid-robot",
    useCases: ["manufacturing", "logistics", "integration"],
    type: l("全电动工业人形移动操作机器人", "All-electric industrial humanoid mobile-manipulation robot"),
    integration: l("通过 Orbit 连接 MES/WMS、任务和机群指标，并支持条码、RFID、VR 与平板控制。", "Connects through Orbit to MES/WMS, tasks, and fleet metrics, with barcode, RFID, VR, and tablet operation."),
    verification: l("核对早期采用者资格、任务配置、手部、负载姿态、电池循环、充电站、IP67 范围、安全系统和现场维修认证。", "Verify early-adopter eligibility, task configuration, hands, load pose, battery cycle, charging station, IP67 scope, safety system, and field-repair certification."),
    rows: rows(BOSTON_ATLAS_PDF, l("Atlas 官方规格表", "Official Atlas specification sheet"), l("第 2 页 Specifications", "Page 2, Specifications"), [
      ["身高", "Height", "1.9 m"],
      ["整机质量", "Robot mass", "90 kg"],
      ["全身自由度", "Full-body degrees of freedom", "56 DoF"],
      ["触觉感知", "Tactile sensing", "手指与掌部触觉", "Tactile fingers and palm"],
      ["视觉覆盖", "Camera coverage", "360° 相机视野", "360° camera view"],
      ["一般电池续航", "General battery runtime", "4 h"],
      ["重载电池续航", "Battery runtime with heavy lifting", "2 h"],
      ["自主换电时间", "Autonomous battery-swap time", "3 min"],
      ["充电时间", "Charge time", "1.5 h"],
      ["充电电压", "Charge voltage", "110 V；可选 220 V", "110 V; 220 V optional"],
      ["模块化维修", "Modular serviceability", "模块化、现场可更换", "Modular and field replaceable"],
      ["客户自修", "Customer self-repair", "需要认证", "Certification required"],
      ["瞬时负载", "Instant payload", "50 kg"],
      ["持续负载", "Sustained payload", "30 kg"],
      ["单手负载", "One-handed payload", "20 kg"],
      ["最大可达范围", "Reach", "2.3 m"],
      ["无围栏防护", "Fenceless guarding", "支持", "Supported"],
      ["人员检测", "Human detection", "支持", "Supported"],
      ["工作流识别", "Workflow identification", "条码扫描与 RFID", "Barcode scanning and RFID"],
      ["运行模式", "Operating modes", "自主、VR 遥操作、平板控制", "Autonomous, VR teleoperation, and tablet control"],
      ["防护等级", "Ingress-protection rating", "IP67"],
      ["工作温度", "Operating temperature", "-20°C 至 40°C", "-20°C to 40°C"],
      ["产地声明", "Made-in statement", "美国制造", "Made in the USA"],
    ]),
    overview: [
      l("该记录对应 2025 年 12 月 23 日销售表所描述的全电动 Atlas，不继承历史液压 Atlas 的尺寸、动力或研究参数。", "This record covers the electric Atlas described by the December 23, 2025 sales sheet and does not inherit dimensions, power, or research parameters from the historical hydraulic Atlas."),
      l("规格表覆盖本体、负载、电池、安全和环境字段，但没有逐关节扭矩、速度、精度、通信协议或电池能量表。", "The sheet covers body, load, battery, safety, and environment fields but does not publish per-joint torque, speed, accuracy, communications protocols, or battery energy."),
    ],
    applications: [l("零件排序、机床上下料、订单履约和工厂/仓库物料操作", "Part sequencing, machine tending, order fulfillment, and material handling in factories and warehouses")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("Atlas 官方产品页", "Official Atlas product page"), url: BOSTON_ATLAS }],
  },
  {
    id: "boston-spot-current",
    companySlug: "boston-dynamics",
    product: "Spot",
    pageUrl: BOSTON_SPOT,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "quadruped-robot",
    useCases: ["manufacturing", "service", "research", "integration"],
    type: l("四足工业巡检与动态感知平台", "Quadruped industrial-inspection and dynamic-sensing platform"),
    integration: l("通过载荷导轨、两个 DB25 端口、供电、软件 API、硬件接口和 Orbit 接入传感与任务系统。", "Integrates sensors and task systems through payload rails, two DB25 ports, power, software APIs, hardware interfaces, and Orbit."),
    verification: l("核对整机与电池版本、载荷质量、运行时间条件、通信覆盖、地形、光照、IP54 范围和所选载荷。", "Verify robot and battery revision, payload mass, runtime conditions, communications coverage, terrain, lighting, IP54 scope, and selected payloads."),
    rows: [
      ...rows(BOSTON_SPOT, l("Spot 官方产品页", "Official Spot product page"), l("Spot Specifications / Base Robot", "Spot Specifications / Base Robot"), [
        ["整机长度", "Robot length", "1,100 mm（官网英制 43.3 in；网页公制显示漏一位 0）", "1,100 mm (43.3 in; the web metric display omits one zero)"],
        ["整机宽度", "Robot width", "500 mm"],
        ["坐姿高度", "Sitting height", "191 mm"],
        ["默认行走高度", "Default walking height", "610 mm"],
        ["最大行走高度", "Maximum walking height", "700 mm"],
        ["最小行走高度", "Minimum walking height", "520 mm"],
        ["含电池整机质量", "Robot mass with battery", "33.8 kg"],
        ["最大移动速度", "Maximum speed", "1.6 m/s"],
        ["最大坡度", "Maximum slope", "±30°"],
        ["最大台阶高度", "Maximum step height", "300 mm"],
        ["防护等级", "Ingress-protection rating", "IP54"],
        ["工作温度", "Operating temperature", "-20°C 至 55°C", "-20°C to 55°C"],
        ["地形感知水平视场角", "Terrain-sensing horizontal field of view", "360°"],
        ["地形感知距离", "Terrain-sensing range", "4 m"],
        ["最低照度", "Minimum lighting", ">2 lux"],
        ["避障行为", "Collision-avoidance behavior", "与静止物体保持设定距离", "Maintains a set distance from stationary objects"],
        ["无线网络", "Wi-Fi", "2.4 GHz / 5 GHz，802.11 b/g/n", "2.4 GHz / 5 GHz, 802.11 b/g/n"],
        ["有线网络", "Wired network", "Ethernet"],
      ]),
      ...rows(BOSTON_SPOT, l("Spot 官方产品页", "Official Spot product page"), l("Spot Specifications / Battery & Payload", "Spot Specifications / Battery & Payload"), [
        ["电池能量", "Battery energy", "564 Wh"],
        ["平均运行时间", "Average runtime", "90 min"],
        ["待机时间", "Standby time", "180 min"],
        ["充电时间", "Recharge time", "60 min"],
        ["电池尺寸", "Battery dimensions", "324 × 168 × 93 mm", "324 x 168 x 93 mm"],
        ["电池质量", "Battery mass", "5.2 kg"],
        ["顶部最大载荷", "Maximum payload-mount mass", "14 kg"],
        ["载荷安装区域", "Payload mounting area", "850 × 240 × 270 mm", "850 x 240 x 270 mm"],
        ["载荷机械接口", "Payload mechanical interface", "M5 T 形槽导轨", "M5 T-slot rails"],
        ["载荷电气连接器", "Payload electrical connectors", "DB25 × 2", "DB25 x 2"],
        ["载荷供电", "Payload power supply", "35-58.8 V DC（未稳压），每端口 150 W", "35-58.8 V DC unregulated, 150 W per port"],
        ["集成接口", "Integration interface", "软件 API 与硬件接口控制文档", "Software API and hardware-interface control document"],
      ]),
    ],
    overview: [l("Spot 当前页面提供基础机器人、电池和载荷安装区块。运行时间会随载荷和环境变化；14 kg 是当前营销页的载荷安装质量值。", "The current Spot page publishes base-robot, battery, and payload-mounting blocks. Runtime varies with payload and environment; 14 kg is the current marketing-page payload-mount mass."), l("官网公制长度显示为 110 mm，但同一行的 43.3 in 对应约 1,100 mm；本仓保留纠错说明，而不是把明显排版错误当作机器人长度。", "The official metric length is displayed as 110 mm while the same line states 43.3 in, or about 1,100 mm; this repository records the correction explicitly rather than treating the obvious display typo as robot length.")],
    applications: [l("工业巡检、远程响应、数字孪生、科研和危险环境数据采集", "Industrial inspection, remote response, digital twins, research, and hazardous-environment data capture")],
    coverage: "official-complete",
  },
  {
    id: "boston-stretch-2025",
    companySlug: "boston-dynamics",
    product: "Stretch (2025 brochure)",
    pageUrl: BOSTON_STRETCH,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "mobile-robot",
    useCases: ["logistics", "manufacturing", "integration"],
    type: l("移动式箱件卸载与仓储处理机器人", "Mobile case-unloading and warehouse-handling robot"),
    integration: l("使用 7 轴机械臂、视觉、带感知气动夹具、控制台和无线输送机通信完成卸载。", "Uses a seven-axis arm, vision, a sensing pneumatic gripper, console, and wireless conveyor communication for unloading."),
    verification: l("用现场箱型、破损程度、拖车、输送机、温度、班次与人员配置复核 600-800 箱/小时和 16 小时上限。", "Revalidate the 600-800 cases/hour and up-to-16-hour figures with site-specific cases, damage, trailers, conveyors, temperature, shifts, and staffing."),
    rows: rows(BOSTON_STRETCH_PDF, l("Stretch 2025 官方手册", "Official Stretch 2025 brochure"), l("第 4-7 页操作与规格", "Pages 4-7, operation and specifications"), [
      ["卸货效率", "Unloading rate", "600-800 箱/小时", "600-800 cases/hour"],
      ["最大箱件质量", "Maximum case mass", "23 kg"],
      ["最大垂直可达范围", "Maximum vertical reach", "3.2 m"],
      ["最大水平可达范围", "Maximum horizontal reach", "1.95 m"],
      ["占地尺寸", "Footprint", "1 × 1.25 m", "1 x 1.25 m"],
      ["整机质量", "Robot mass", "1,300 kg"],
      ["电池续航", "Battery runtime", "最长 16 h", "Up to 16 h"],
      ["适用箱件最小表面长度", "Minimum case-surface length", "15 cm"],
      ["适用箱件最大表面长度", "Maximum case-surface length", "91 cm"],
      ["工作温度", "Operating temperature", "5°C 至 45°C", "5°C to 45°C"],
      ["快速充电", "Fast charging", "1 h 45 min 充至 90%", "90% in 1 h 45 min"],
      ["机械臂轴数", "Arm axis count", "7 axes"],
      ["适用拖车", "Eligible trailers", "20/40 ft 标准或高柜集装箱、封闭货运拖车、侧帘拖车", "20/40 ft standard or high-cube containers, enclosed cargo trailers, and curtainsiders"],
      ["适用箱件", "Eligible cases", "胶带或粘合封口的矩形纸箱；可接受常见磨损", "Rectangular taped or glued cardboard cases; common wear is acceptable"],
      ["适用输送机", "Eligible conveyors", "多品牌伸缩输送机", "Telescopic conveyors from various brands"],
      ["拖车照明要求", "Trailer lighting requirement", "无外部照明要求；机载照明用于视觉", "No required trailer lighting; onboard lighting supports vision"],
      ["部署时间声明", "Deployment-time statement", "厂商称 5 天或更短", "Manufacturer states five days or fewer"],
      ["欧盟符合性", "EU conformity", "2006/42/EC、2014/30/EU、2014/53/EU", "2006/42/EC, 2014/30/EU, and 2014/53/EU"],
    ]),
    overview: [l("该记录以 2025 官方手册为规格基准。600-800 箱/小时是厂商给出的运行范围，不是对所有箱型、拖车与堆叠状态的保证。", "This record uses the 2025 official brochure as its specification baseline. The 600-800 cases/hour range is a manufacturer operating figure, not a guarantee across all cases, trailers, and stack states."), l("手册明确 7 轴臂、气动感知夹具、机载照明、控制台和伸缩输送机通信，这些都是系统集成条件而非独立可选参数。", "The brochure explicitly describes a seven-axis arm, sensing pneumatic gripper, onboard lighting, console, and telescopic-conveyor communication; these are system integration conditions rather than standalone interchangeable parameters.")],
    applications: [l("拖车和集装箱卸货、入库箱件处理与仓储自动化", "Trailer and container unloading, inbound case handling, and warehouse automation")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("Stretch 官方产品页", "Official Stretch product page"), url: BOSTON_STRETCH }],
  },
  {
    id: "boston-spot-arm",
    companySlug: "boston-dynamics",
    product: "Spot Arm",
    pageUrl: BOSTON_ARM,
    category: "end-effector",
    primary: "manipulator-end-effector",
    subclass: "robotic-arm",
    useCases: ["manufacturing", "service", "research", "integration"],
    type: l("Spot 集成式六自由度移动操作臂", "Integrated six-DoF mobile-manipulation arm for Spot"),
    integration: l("与 Spot 全身平衡、平板控制和 Arm API 协同，支持关节空间与末端控制。", "Works with Spot whole-body balance, tablet control, and the Arm API for joint-space and end-effector control."),
    verification: l("核对随姿态变化的可达与负载、夹具对象、相机/ToF 标定、控制模式、安全距离和 Spot 总载荷。", "Verify pose-dependent reach and load, gripped objects, camera/ToF calibration, control mode, safety distance, and total Spot payload."),
    rows: rows(BOSTON_ARM, l("Spot Arm 官方产品页", "Official Spot Arm product page"), l("Dexterity / Strength / Sensing / Customizability", "Dexterity / Strength / Sensing / Customizability"), [
      ["机械臂自由度", "Arm degrees of freedom", "6 DoF"],
      ["可达范围", "Reach", "接近 1 m", "Almost 1 m"],
      ["最大举升质量", "Maximum lift mass", "11 kg"],
      ["最大拖拽质量", "Maximum drag mass", "25 kg"],
      ["夹具相机", "In-gripper camera", "4K RGB"],
      ["夹具照明", "In-gripper illumination", "LED"],
      ["集成传感器", "Integrated sensors", "ToF 与 IMU", "ToF and IMU"],
      ["控制模式", "Control modes", "手动、半自动、全自动", "Manual, semi-automated, and fully automated"],
      ["开发接口", "Developer control", "Arm API；关节空间与末端控制", "Arm API; joint-space and end-effector control"],
    ]),
    overview: [l("Spot Arm 是 Spot 的集成操作附件，不是独立移动机器人。公开页给出 6 自由度、近 1 m 可达、11 kg 举升、25 kg 拖拽及传感与 API。", "Spot Arm is an integrated manipulation attachment for Spot rather than a standalone mobile robot. The page publishes six DoF, almost one-meter reach, 11 kg lift, 25 kg drag, sensing, and API access."), l("举升和拖拽使用 Spot 全身协调；不能把附件数值当作固定姿态下任意方向的连续额定负载。", "Lifting and dragging use Spot whole-body coordination; the figures should not be treated as continuous rated loads in every direction from a fixed pose.")],
    applications: [l("阀门、开关、门、危险物品远程操作与近距设备检查", "Valve, switch, door, hazardous-object remote manipulation, and close equipment inspection")],
    coverage: "official-complete",
  },
  capabilitySeed(
    "boston-orbit",
    "boston-dynamics",
    "Orbit",
    BOSTON_ORBIT,
    "model-software",
    "software-tools",
    "application-software",
    l("设施、机器人机群与工业巡检数据平台", "Facility, robot-fleet, and industrial-inspection data platform"),
    [l("Orbit 提供机器人状态、设施地图、任务、工业巡检数据与分析的统一视图。", "Orbit provides a unified view of robot status, facility maps, missions, industrial-inspection data, and analytics."), l("它是部署与运营软件，不应使用机器人本体的质量、负载或续航字段评价。", "It is deployment and operations software and should not be evaluated through robot mass, payload, or runtime fields.")],
    [l("Spot/Atlas 机群管理、巡检数据、设施地图和企业工作流连接", "Spot/Atlas fleet management, inspection data, facility maps, and enterprise-workflow connectivity")],
    l("与 Boston Dynamics 机器人、传感载荷、设施数据以及 MES/WMS 等企业系统连接。", "Connects Boston Dynamics robots, sensor payloads, facility data, and enterprise systems such as MES and WMS."),
    l("核对部署形态、机器人和传感器支持范围、API、SSO、权限、数据保留、离线与告警能力。", "Verify deployment form, robot and sensor support, APIs, SSO, access control, retention, offline behavior, and alerts."),
    ["manufacturing", "logistics", "service", "integration"],
  ),
];

const apptronikSeeds: ProductSeed[] = [
  {
    id: "apptronik-apollo-2",
    companySlug: "apptronik",
    product: "Apollo 2",
    pageUrl: APPTRONIK_APOLLO_2,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "humanoid-robot",
    useCases: ["manufacturing", "logistics", "integration"],
    type: l("模块化双足或轮式通用人形平台", "Modular bipedal or wheeled general-purpose humanoid platform"),
    integration: l("与 Artemis 智能/安全层、Fleet Connect 运营层、可更换电池和机会充电共同部署。", "Deploys with the Artemis intelligence/safety layer, Fleet Connect operations layer, swappable batteries, and opportunity charging."),
    verification: l("索取当前机械规格表并核对移动形态、尺寸、自由度、负载、手部、电池、充电、安全区域、接口和交付状态。", "Obtain the current mechanical specification sheet and verify mobility form, dimensions, DoF, load, hands, battery, charging, safety zones, interfaces, and delivery status."),
    rows: rows(APPTRONIK_APOLLO_2, l("Apollo 2 官方产品页", "Official Apollo 2 product page"), l("Form / Human-centered design / Actuation / Battery / Safety", "Form / Human-centered design / Actuation / Battery / Safety"), [
      ["移动配置", "Mobility configurations", "双足或轮式", "Bipedal or wheeled"],
      ["操作能力", "Manipulation", "灵巧物体操作", "Dexterous object handling"],
      ["视觉状态表达", "Visual status communication", "LED 嘴部、协调照明与胸部显示屏", "LED mouth, coordinated lighting, and chest display"],
      ["语音交互", "Speech interaction", "语音输出与监听", "Speech and listening"],
      ["执行器效率设计目标", "Actuator efficiency design target", ">90%"],
      ["电池形式", "Battery format", "可更换电池", "Swappable batteries"],
      ["运行组织目标", "Operating schedule target", "7 × 22 operation"],
      ["补能方式", "Charging options", "机会充电与系留供电", "Opportunity charging and tethering"],
      ["碰撞区", "Impact zone", "定义半径内检测物体时立即暂停", "Immediate pause when an object is detected within the defined radius"],
      ["外围区", "Perimeter zone", "可配置人员、设备或障碍物进入时的行为", "Configurable behavior as people, equipment, or obstacles enter"],
    ]),
    overview: [l("Apollo 2 页面给出系统结构与定性能力，但没有发布尺寸、质量、自由度、额定负载、速度或电池容量。因此本记录是官方公开不完整，而不是把 2023 Apollo 数值复制过来。", "The Apollo 2 page publishes system architecture and qualitative capabilities but not dimensions, mass, DoF, rated load, speed, or battery capacity. This record is officially partial rather than copying figures from the 2023 Apollo."), l("双足与轮式配置面向不同地面、稳定性和吞吐需求；采购时必须获取与报价一致的配置规格。", "Bipedal and wheeled configurations target different floor, stability, and throughput needs; procurement must obtain specifications matching the quoted configuration.")],
    applications: [l("物料到人、人员到货、配套、分拣、机床与工具作业", "Goods-to-person, person-to-goods, kitting, sorting, machine tending, and tool tending")],
    coverage: "official-partial",
  },
  {
    id: "apptronik-apollo-2023",
    companySlug: "apptronik",
    product: "Apollo (2023 generation)",
    pageUrl: APPTRONIK_APOLLO_2023,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "humanoid-robot",
    useCases: ["manufacturing", "logistics", "research"],
    type: l("历史首代通用人形机器人", "Historical first-generation general-purpose humanoid"),
    integration: l("可更换电池与模块化双足、轮式或固定配置按 2023 发布范围组合。", "Swappable batteries combine with modular bipedal, wheeled, or stationary configurations within the 2023 launch scope."),
    verification: l("仅用于历史代际比较；不得把其尺寸、质量、负载或续航视为 Apollo 2 的当前规格。", "Use only for historical-generation comparison; do not treat its dimensions, mass, load, or runtime as current Apollo 2 specifications."),
    rows: rows(APPTRONIK_APOLLO_2023, l("2023 Apollo 官方发布稿", "Official 2023 Apollo release"), l("Apollo specifications and modularity", "Apollo specifications and modularity"), [
      ["身高", "Height", "5 ft 8 in（约 1.72 m）", "5 ft 8 in (about 1.72 m)"],
      ["整机质量", "Robot mass", "160 lb（约 72.6 kg）", "160 lb (about 72.6 kg)"],
      ["最大举升质量", "Maximum lift mass", "55 lb（约 25 kg）", "55 lb (about 25 kg)"],
      ["单块电池运行时间", "Runtime per battery", "4 h"],
      ["电池形式", "Battery format", "可更换", "Swappable"],
      ["公开配置", "Published configurations", "双足、轮式或固定", "Bipedal, wheeled, or stationary"],
      ["控制架构", "Control architecture", "力控架构", "Force-control architecture"],
    ]),
    overview: [l("该记录保留 2023 年首代 Apollo 的公开数值，用于识别历史资料。Apollo 2 页面没有重申这些数字，因此不能跨代继承。", "This record preserves public figures for the 2023 Apollo to identify historical material. Apollo 2 does not restate them, so they cannot be inherited across generations."), l("发布稿面向物流和制造初始任务；它不是当前交付配置或长期现场性能证明。", "The launch release targeted initial logistics and manufacturing tasks; it is not evidence of the current delivery configuration or long-term field performance.")],
    applications: [l("物流、制造与人形机器人早期开发验证", "Logistics, manufacturing, and early humanoid-development validation")],
    coverage: "official-complete",
  },
  capabilitySeed(
    "apptronik-artemis",
    "apptronik",
    "Artemis",
    APPTRONIK_APOLLO_2,
    "model-software",
    "software-tools",
    "robot-model",
    l("Apollo 感知、规划、控制、安全与任务执行层", "Apollo perception, planning, control, safety, and task-execution layer"),
    [l("Artemis 协调感知、规划、控制、安全、任务执行和人机交互，把高层目标转为全身协调。", "Artemis coordinates perception, planning, controls, safety, task execution, and human-robot interaction to translate high-level goals into whole-body coordination."), l("官网没有公开模型规模、训练数据、频率、硬件需求、许可或 API 表。", "The site does not publish model size, training data, rates, hardware requirements, licensing, or an API table.")],
    [l("Apollo 任务规划、全身控制、人机交互和安全行为", "Apollo task planning, whole-body control, human-robot interaction, and safety behavior")],
    l("作为 Apollo 平台的智能与安全层，与本体传感、执行器和 Fleet Connect 协同。", "Acts as the Apollo platform's intelligence and safety layer with onboard sensing, actuation, and Fleet Connect."),
    l("核对版本、任务覆盖、训练与现场数据、模型更新、人工接管、故障行为、接口和许可。", "Verify revision, task coverage, training and field data, model updates, human intervention, failure behavior, interfaces, and licensing."),
    ["manufacturing", "logistics", "research", "integration"],
  ),
  capabilitySeed(
    "apptronik-fleet-connect",
    "apptronik",
    "Fleet Connect",
    APPTRONIK_APOLLO_2,
    "model-software",
    "software-tools",
    "application-software",
    l("Apollo 机群监控、任务编排、部署与数据运营层", "Apollo fleet monitoring, task orchestration, deployment, and data-operations layer"),
    [l("Fleet Connect 用于监控状态、编排任务、管理部署、采集数据和优化多台人形机器人运行。", "Fleet Connect monitors status, orchestrates tasks, manages deployments, collects data, and optimizes humanoid fleets."), l("官网没有公开部署拓扑、API、离线模式、数据保留、SSO 或许可层级。", "The site does not publish deployment topology, APIs, offline modes, retention, SSO, or license tiers.")],
    [l("人形机器人机群运营、任务调度、部署管理与现场数据分析", "Humanoid-fleet operations, task scheduling, deployment management, and field-data analysis")],
    l("连接 Apollo 机器人、操作员与部署数据，并与 Artemis 和企业工作流配合。", "Connects Apollo robots, operators, and deployment data alongside Artemis and enterprise workflows."),
    l("核对支持规模、网络与离线策略、身份权限、API、数据权利、告警、审计、升级和服务 SLA。", "Verify supported scale, networking and offline behavior, identity and access, APIs, data rights, alerts, audit, upgrades, and service levels."),
    ["manufacturing", "logistics", "integration"],
  ),
];

const boosterK1JointRows = jointRangeRows(
  BOOSTER_K1_DOC,
  l("Booster K1 官方规格文档", "Official Booster K1 specification document"),
  l("Joint position limits table", "Joint position limits table"),
  [
    ["头部偏航", "Head yaw", 59, -59],
    ["头部俯仰", "Head pitch", 49, -19],
    ["左肩俯仰", "Left shoulder pitch", 69, -169],
    ["左肩横滚", "Left shoulder roll", 94, -94],
    ["左肩偏航", "Left shoulder yaw", 109, -109],
    ["左肘", "Left elbow", 39, -129],
    ["右肩俯仰", "Right shoulder pitch", 69, -169],
    ["右肩横滚", "Right shoulder roll", 94, -94],
    ["右肩偏航", "Right shoulder yaw", 109, -109],
    ["右肘", "Right elbow", 129, -39],
    ["左髋俯仰", "Left hip pitch", 128, -170],
    ["左髋横滚", "Left hip roll", 89, -22],
    ["左髋偏航", "Left hip yaw", 59, -59],
    ["左膝", "Left knee", 133, 0],
    ["左踝上行", "Left ankle up", 38, -17],
    ["左踝下行", "Left ankle down", 41, -16],
    ["右髋俯仰", "Right hip pitch", 128, -170],
    ["右髋横滚", "Right hip roll", 22, -89],
    ["右髋偏航", "Right hip yaw", 59, -59],
    ["右膝", "Right knee", 133, 0],
    ["右踝上行", "Right ankle up", 38, -17],
    ["右踝下行", "Right ankle down", 41, -16],
  ],
);

type BoosterK1Edition = {
  id: string;
  product: string;
  editionZh: string;
  editionEn: string;
  battery: string;
  runtimeFast: string;
  runtimeModerate: string;
  compute: string;
  processor: string;
  memory: string;
  storage: string;
  warrantyZh: string;
  warrantyEn: string;
};

const boosterK1Editions: BoosterK1Edition[] = [
  { id: "booster-k1-geek", product: "Booster K1 Geek", editionZh: "极客版", editionEn: "Geek", battery: "2 Ah", runtimeFast: "20 min", runtimeModerate: "30 min", compute: "48 TOPS", processor: "ARM", memory: "8 GB", storage: "128 GB", warrantyZh: "3 个月", warrantyEn: "3 months" },
  { id: "booster-k1-education", product: "Booster K1 Education", editionZh: "教育版", editionEn: "Education", battery: "5 Ah", runtimeFast: "1 h 10 min", runtimeModerate: "80 min", compute: "117 TOPS", processor: "NVIDIA Jetson Orin NX 8GB", memory: "8 GB", storage: "512 GB", warrantyZh: "1 年", warrantyEn: "1 year" },
  { id: "booster-k1-professional", product: "Booster K1 Professional", editionZh: "专业版", editionEn: "Professional", battery: "5 Ah", runtimeFast: "1 h 10 min", runtimeModerate: "80 min", compute: "200 TOPS", processor: "NVIDIA Jetson AGX Orin 32GB", memory: "32 GB", storage: "512 GB", warrantyZh: "1 年", warrantyEn: "1 year" },
];

const boosterK1Seeds: ProductSeed[] = boosterK1Editions.map((edition) => ({
  id: edition.id,
  companySlug: "booster-robotics",
  product: edition.product,
  pageUrl: BOOSTER_K1,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "humanoid-robot",
  useCases: ["research", "integration"],
  type: l(`0.95 m 小型人形机器人 K1 ${edition.editionZh}`, `0.95 m compact humanoid, K1 ${edition.editionEn} edition`),
  integration: l("支持官方控制框架、仿真与二次开发；教育版和专业版配置 NVIDIA 计算平台。", "Supports the official control framework, simulation, and secondary development; Education and Professional editions add NVIDIA compute."),
  verification: l("核对版型、续航测试速度、低层控制权限、相机型号、SDK、附件、安全边界和保修起算条件。", "Verify edition, runtime test speed, low-level control access, camera model, SDK, accessories, safety boundary, and warranty start conditions."),
  rows: [
    ...rows(BOOSTER_K1_DOC, l("Booster K1 官方规格文档", "Official Booster K1 specification document"), l("Specifications and edition comparison", "Specifications and edition comparison"), [
      ["产品版本", "Product edition", edition.editionZh, edition.editionEn],
      ["整机高度", "Robot height", "0.95 m"],
      ["整机质量", "Robot mass", "约 19.5 kg", "About 19.5 kg"],
      ["本体自由度", "Body degrees of freedom", "22 DoF"],
      ["腿部自由度", "Leg degrees of freedom", "每条腿 6 DoF", "6 DoF per leg"],
      ["手臂自由度", "Arm degrees of freedom", "每条手臂 4 DoF", "4 DoF per arm"],
      ["头部自由度", "Head degrees of freedom", "2 DoF"],
      ["最大线速度", "Maximum linear speed", "1.1 m/s"],
      ["最大角速度", "Maximum angular speed", "1.5 rad/s"],
      ["电池容量", "Battery capacity", edition.battery],
      ["连续运行时间", "Continuous runtime", edition.runtimeFast, edition.runtimeFast],
      ["充电时间", "Charging time", "不超过 2 h", "No more than 2 h"],
      ["电池循环寿命", "Battery cycle life", "不低于 500 次循环", "At least 500 cycles"],
      ["AI 算力", "AI compute", edition.compute],
      ["处理器", "Processor", edition.processor],
      ["内存", "Memory", edition.memory],
      ["存储", "Storage", edition.storage],
      ["视觉传感器", "Vision sensor", "深度或双目深度相机", "Depth or stereo-depth camera"],
      ["惯性传感器", "Inertial sensor", "9 轴 IMU", "9-axis IMU"],
      ["音频", "Audio", "3 麦克风阵列与扬声器", "Three-microphone array and speaker"],
      ["操作件", "Physical controls", "电源键、急停/功能按键与 RGB 状态灯", "Power, emergency/function buttons, and RGB status light"],
      ["有线网络", "Wired networking", "千兆以太网", "Gigabit Ethernet"],
      ["无线网络", "Wireless networking", "Wi-Fi 6 与 Bluetooth 5.2", "Wi-Fi 6 and Bluetooth 5.2"],
      ["最大关节扭矩", "Maximum joint torque", "60 N·m"],
      ["关节编码器", "Joint encoders", "双编码器", "Dual encoders"],
      ["声压级", "Sound pressure level", "不超过 70 dB", "No more than 70 dB"],
      ["工作温度", "Operating temperature", "-10 至 45 °C", "-10 to 45 °C"],
      ["工作湿度", "Operating humidity", "5% 至 90% RH（无凝露）", "5% to 90% RH, non-condensing"],
      ["合规标识", "Compliance markings", "CE、FCC"],
      ["保修期", "Warranty", edition.warrantyZh, edition.warrantyEn],
    ]),
    row(BOOSTER_K1, l("Booster K1 官方产品页", "Official Booster K1 product page"), l("Edition runtime comparison", "Edition runtime comparison"), "中速行走续航", "Runtime at moderate walking speed", edition.runtimeModerate, edition.runtimeModerate, l("官网按 0.4 m/s 行走条件；不得与手册 1.1 m/s 条件合并。", "Product page at 0.4 m/s walking; do not merge with the manual's 1.1 m/s condition.")),
    row(BOOSTER_K1_DOC, l("Booster K1 官方规格文档", "Official Booster K1 specification document"), l("Edition runtime comparison", "Edition runtime comparison"), "高速行走续航条件", "High-speed runtime condition", edition.runtimeFast, edition.runtimeFast, l("手册按 1.1 m/s 行走条件。", "Manual at 1.1 m/s walking.")),
    ...boosterK1JointRows,
  ],
  overview: [
    l(`K1 ${edition.editionZh} 是 0.95 m、约 19.5 kg 的 22 自由度小型人形平台。该记录只采用 ${edition.editionZh} 的电池、算力、存储与保修配置。`, `K1 ${edition.editionEn} is a 0.95 m, about 19.5 kg, 22-DoF compact humanoid. This record uses only the ${edition.editionEn} battery, compute, storage, and warranty configuration.`),
    l("官网与规格文档在不同步速下给出续航。本仓将 0.4 m/s 和 1.1 m/s 两个条件分开，避免形成无条件续航值。", "The product page and specification document state runtime at different walking speeds. The repository keeps the 0.4 m/s and 1.1 m/s conditions separate rather than creating an unconditional runtime figure."),
  ],
  applications: [l("人形运动控制、课程、竞赛、强化学习和算法原型", "Humanoid locomotion control, coursework, competitions, reinforcement learning, and algorithm prototyping")],
  coverage: "official-complete",
  sourceLinks: [{ label: l("K1 规格文档", "K1 specification document"), url: BOOSTER_K1_DOC }],
}));

const boosterT1CommonRows = rows(
  BOOSTER_T1,
  l("Booster T1 官方产品页", "Official Booster T1 product page"),
  l("Specifications and joint movement space", "Specifications and joint movement space"),
  [
    ["整机尺寸", "Robot dimensions", "118 × 47 × 23 cm"],
    ["腿长", "Leg length", "57 cm"],
    ["臂长", "Arm length", "45 cm"],
    ["整机质量", "Robot mass", "约 30 kg", "About 30 kg"],
    ["腿部自由度", "Leg degrees of freedom", "每条腿 6 DoF", "6 DoF per leg"],
    ["腰部自由度", "Waist degrees of freedom", "1 DoF"],
    ["基础手臂自由度", "Base arm degrees of freedom", "每条手臂 4 DoF", "4 DoF per arm"],
    ["扩展手臂自由度", "Extended arm degrees of freedom", "每条手臂 7 DoF", "7 DoF per arm"],
    ["头部自由度", "Head degrees of freedom", "2 DoF"],
    ["腰部偏航范围", "Waist yaw range", "-58° 至 58°", "-58° to 58°"],
    ["髋关节俯仰范围", "Hip pitch range", "-118° 至 118°", "-118° to 118°"],
    ["髋关节横滚范围", "Hip roll range", "-21° 至 88°", "-21° to 88°"],
    ["髋关节偏航范围", "Hip yaw range", "-58° 至 58°", "-58° to 58°"],
    ["膝关节范围", "Knee range", "0° 至 123°", "0° to 123°"],
    ["踝关节俯仰范围", "Ankle pitch range", "-50° 至 20°", "-50° to 20°"],
    ["踝关节横滚范围", "Ankle roll range", "-25° 至 25°", "-25° to 25°"],
    ["最大关节扭矩", "Maximum joint torque", "130 N·m"],
    ["关节编码器", "Joint encoders", "双编码器", "Dual encoders"],
    ["视觉传感器", "Vision sensor", "深度相机", "Depth camera"],
    ["惯性传感器", "Inertial sensor", "9 轴 IMU", "9-axis IMU"],
    ["音频", "Audio", "6 麦克风环形阵列与扬声器", "Six-microphone circular array and speaker"],
    ["电池容量", "Battery capacity", "10.5 Ah"],
    ["行走续航", "Walking runtime", "约 2 h", "About 2 h"],
    ["站立续航", "Standing runtime", "约 4 h", "About 4 h"],
    ["无线网络", "Wireless networking", "Wi-Fi 6 与 Bluetooth 5.2", "Wi-Fi 6 and Bluetooth 5.2"],
    ["有线接口", "Wired interfaces", "USB 与以太网", "USB and Ethernet"],
    ["软件支持", "Software support", "固件升级与二次开发", "Firmware updates and secondary development"],
    ["保修期", "Warranty", "1 年", "1 year"],
  ],
);

type BoosterT1Edition = {
  id: string;
  product: string;
  editionZh: string;
  editionEn: string;
  dofZh: string;
  dofEn: string;
  compute: string;
  endEffectorZh: string;
  endEffectorEn: string;
  level?: "model" | "family";
};

const boosterT1Editions: BoosterT1Edition[] = [
  { id: "booster-t1-basic", product: "Booster T1 Basic", editionZh: "基础版", editionEn: "Basic", dofZh: "23 DoF", dofEn: "23 DoF", compute: "NVIDIA Jetson AGX Orin，200 TOPS", endEffectorZh: "基础手臂配置", endEffectorEn: "Base arm configuration" },
  { id: "booster-t1-standard", product: "Booster T1 Standard", editionZh: "标准版", editionEn: "Standard", dofZh: "23 DoF", dofEn: "23 DoF", compute: "Intel Core i7-1370P + NVIDIA Jetson AGX Orin，200 TOPS", endEffectorZh: "基础手臂配置", endEffectorEn: "Base arm configuration" },
  { id: "booster-t1-customized", product: "Booster T1 Customized", editionZh: "定制版", editionEn: "Customized", dofZh: "夹爪配置 31 DoF；灵巧手配置 41 DoF", dofEn: "31 DoF with grippers; 41 DoF with dexterous hands", compute: "Intel Core i7-1370P + NVIDIA Jetson AGX Orin，200 TOPS", endEffectorZh: "夹爪或灵巧手选配", endEffectorEn: "Optional grippers or dexterous hands", level: "family" },
];

const boosterT1Seeds: ProductSeed[] = boosterT1Editions.map((edition) => ({
  id: edition.id,
  companySlug: "booster-robotics",
  product: edition.product,
  pageUrl: BOOSTER_T1,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "humanoid-robot",
  useCases: ["research", "integration"],
  type: l(`全尺寸人形开发平台 T1 ${edition.editionZh}`, `Full-size humanoid development platform, T1 ${edition.editionEn}`),
  integration: l("支持固件、运动控制与二次开发；标准版和定制版采用 x86 与 NVIDIA 双计算平台。", "Supports firmware, motion control, and secondary development; Standard and Customized editions use x86 and NVIDIA compute together."),
  verification: l("核对版型、手臂和末端配置、自由度口径、计算板、控制权限、任务负载及续航测试条件。", "Verify edition, arm and end-effector configuration, DoF definition, compute boards, control access, task payload, and runtime conditions."),
  rows: [
    ...boosterT1CommonRows,
    ...rows(BOOSTER_T1, l("Booster T1 官方产品页", "Official Booster T1 product page"), l("Edition comparison", "Edition comparison"), [
      ["产品版本", "Product edition", edition.editionZh, edition.editionEn],
      ["总自由度", "Total degrees of freedom", edition.dofZh, edition.dofEn],
      ["计算平台", "Compute platform", edition.compute],
      ["末端配置", "End-effector configuration", edition.endEffectorZh, edition.endEffectorEn],
    ]),
  ],
  overview: [l(`T1 ${edition.editionZh} 是约 1.18 m、30 kg 的全尺寸开发平台。不同版本的计算平台和末端不同，本记录不把可选配置当作所有交付件的默认配置。`, `T1 ${edition.editionEn} is an approximately 1.18 m, 30 kg full-size development platform. Compute and end effectors differ by edition; optional equipment is not treated as standard on every delivered unit.`), l("官网给出关节运动空间、扭矩、感知、电池和开发能力，但没有公开所有关节的逐轴速度、额定扭矩或寿命表。", "The page publishes joint motion space, torque, sensing, battery, and development capabilities but not per-axis speed, rated torque, or life tables for every joint.")],
  applications: [l("人形运动、强化学习、竞赛、教育科研与二次开发", "Humanoid locomotion, reinforcement learning, competition, education/research, and secondary development")],
  coverage: "official-complete",
  level: edition.level,
}));

const boosterT2Joints: Array<[string, string, number, number]> = [
  ["头部偏航", "Head yaw", 65, -65], ["头部俯仰", "Head pitch", 25, -20],
  ["左肩俯仰", "Left shoulder pitch", 100, -175], ["左肩横滚", "Left shoulder roll", 89, -89], ["左肩偏航", "Left shoulder yaw", 120, -120], ["左肘偏航", "Left elbow yaw", 0, -122.5], ["左腕俯仰", "Left wrist pitch", 120, -120], ["左腕偏航", "Left wrist yaw", 40.9, -44.9], ["左腕横滚", "Left wrist roll", 55, -80],
  ["右肩俯仰", "Right shoulder pitch", 100, -175], ["右肩横滚", "Right shoulder roll", 89, -89], ["右肩偏航", "Right shoulder yaw", 120, -120], ["右肘偏航", "Right elbow yaw", 122.5, 0], ["右腕俯仰", "Right wrist pitch", 120, -120], ["右腕偏航", "Right wrist yaw", 44.9, -40.9], ["右腕横滚", "Right wrist roll", 80, -55],
  ["腰部俯仰", "Waist pitch", 34, -45], ["腰部横滚", "Waist roll", 22.5, -22.5], ["腰部偏航", "Waist yaw", 140, -140],
  ["左髋俯仰", "Left hip pitch", 130, -170], ["左髋横滚", "Left hip roll", 90, -35], ["左髋偏航", "Left hip yaw", 160, -160], ["左膝俯仰", "Left knee pitch", 150, 0], ["左踝俯仰", "Left ankle pitch", 19, -37], ["左踝横滚", "Left ankle roll", 20, -20],
  ["右髋俯仰", "Right hip pitch", 130, -170], ["右髋横滚", "Right hip roll", 35, -90], ["右髋偏航", "Right hip yaw", 160, -160], ["右膝俯仰", "Right knee pitch", 150, 0], ["右踝俯仰", "Right ankle pitch", 19, -37], ["右踝横滚", "Right ankle roll", 20, -20],
];

const boosterT2JointRows = jointRangeRows(
  BOOSTER_T2_DOC,
  l("Booster T2 官方规格文档", "Official Booster T2 specification document"),
  l("Joint position limits table", "Joint position limits table"),
  boosterT2Joints,
);

type BoosterT2Edition = {
  id: string;
  product: string;
  edition: string;
  mass: string;
  compute: string;
  memory: string;
  endEffectorZh: string;
  endEffectorEn: string;
  wristCameraZh: string;
  wristCameraEn: string;
};

const boosterT2Editions: BoosterT2Edition[] = [
  { id: "booster-t2-education-e1", product: "Booster T2 Education E1", edition: "Education E1", mass: "约 42 kg", compute: "375 TOPS", memory: "16 GB", endEffectorZh: "无末端执行器", endEffectorEn: "No end effector", wristCameraZh: "无", wristCameraEn: "No" },
  { id: "booster-t2-education-e2", product: "Booster T2 Education E2", edition: "Education E2", mass: "约 43 kg", compute: "375 TOPS", memory: "16 GB", endEffectorZh: "夹爪", endEffectorEn: "Grippers", wristCameraZh: "有", wristCameraEn: "Yes" },
  { id: "booster-t2-education-e3", product: "Booster T2 Education E3", edition: "Education E3", mass: "约 43 kg", compute: "375 TOPS", memory: "16 GB", endEffectorZh: "灵巧手", endEffectorEn: "Dexterous hands", wristCameraZh: "有", wristCameraEn: "Yes" },
  { id: "booster-t2-professional-p1", product: "Booster T2 Professional P1", edition: "Professional P1", mass: "约 42 kg", compute: "2070 TFLOPS（FP4 稀疏）", memory: "128 GB", endEffectorZh: "无末端执行器", endEffectorEn: "No end effector", wristCameraZh: "无", wristCameraEn: "No" },
  { id: "booster-t2-professional-p2", product: "Booster T2 Professional P2", edition: "Professional P2", mass: "约 43 kg", compute: "2070 TFLOPS（FP4 稀疏）", memory: "128 GB", endEffectorZh: "夹爪", endEffectorEn: "Grippers", wristCameraZh: "有", wristCameraEn: "Yes" },
  { id: "booster-t2-professional-p3", product: "Booster T2 Professional P3", edition: "Professional P3", mass: "约 43 kg", compute: "2070 TFLOPS（FP4 稀疏）", memory: "128 GB", endEffectorZh: "灵巧手", endEffectorEn: "Dexterous hands", wristCameraZh: "有", wristCameraEn: "Yes" },
];

const boosterT2Seeds: ProductSeed[] = boosterT2Editions.map((edition) => {
  const professional = edition.edition.startsWith("Professional");
  return {
    id: edition.id,
    companySlug: "booster-robotics",
    product: edition.product,
    pageUrl: BOOSTER_T2,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "humanoid-robot",
    useCases: ["research", "integration", "manufacturing"],
    type: l(`约 1.4 m 旗舰人形开发平台 ${edition.edition}`, `Approximately 1.4 m flagship humanoid development platform, ${edition.edition}`),
    integration: l("提供教育版或专业版计算平台、官方开发文档、锁止式接口和可选激光雷达；末端型号决定腕部相机。", "Provides Education or Professional compute, official developer documentation, locking interfaces, and optional LiDAR; end-effector edition determines wrist cameras."),
    verification: l("核对 E/P 版、末端、腕部相机、Thor/教育计算平台、功耗、低层接口、双臂负载姿态、安全和交付软件。", "Verify E/P edition, end effectors, wrist cameras, Thor/Education compute, power, low-level interfaces, dual-arm load pose, safety, and delivered software."),
    rows: [
      ...rows(BOOSTER_T2_DOC, l("Booster T2 官方规格文档", "Official Booster T2 specification document"), l("Specifications and edition comparison", "Specifications and edition comparison"), [
        ["产品版本", "Product edition", edition.edition],
        ["整机高度", "Robot height", "约 1.4 m", "About 1.4 m"],
        ["整机质量", "Robot mass", edition.mass, edition.mass.replace("约", "About")],
        ["本体自由度", "Body degrees of freedom", "31 DoF"],
        ["腿部自由度", "Leg degrees of freedom", "每条腿 6 DoF", "6 DoF per leg"],
        ["手臂自由度", "Arm degrees of freedom", "每条手臂 7 DoF", "7 DoF per arm"],
        ["腰部自由度", "Waist degrees of freedom", "3 DoF"],
        ["头部自由度", "Head degrees of freedom", "2 DoF"],
        ["关节结构", "Joint structure", "工业级交叉滚子轴承", "Industrial cross-roller bearings"],
        ["关节电机", "Joint motor", "高速内转子永磁同步电机", "High-speed inner-rotor permanent-magnet synchronous motor"],
        ["最大关节扭矩", "Maximum joint torque", "140 N·m"],
        ["双臂最大负载", "Maximum dual-arm load", "10 kg"],
        ["末端配置", "End-effector configuration", edition.endEffectorZh, edition.endEffectorEn],
        ["AI 算力", "AI compute", edition.compute, edition.compute.replace("（FP4 稀疏）", " (FP4 sparse)")],
        ["计算平台", "Compute platform", professional ? "NVIDIA Jetson Thor T5000" : "教育版计算平台", professional ? "NVIDIA Jetson Thor T5000" : "Education compute platform"],
        ["统一内存", "Unified memory", edition.memory],
        ["存储", "Storage", "512 GB"],
        ["头部视觉", "Head vision", "双目相机", "Binocular camera"],
        ["腹部视觉", "Abdominal vision", "双目相机", "Binocular camera"],
        ["腕部相机", "Wrist cameras", edition.wristCameraZh, edition.wristCameraEn],
        ["音频", "Audio", "麦克风阵列与扬声器", "Microphone array and speaker"],
        ["最高移动速度", "Maximum travel speed", "3 m/s"],
        ["电池电压", "Battery voltage", "48 V"],
        ["电池容量", "Battery capacity", "10 Ah"],
        ["行走续航", "Walking runtime", "约 2 h", "About 2 h"],
        ["充电方式", "Charging method", "磁吸直充；支持边充边用", "Magnetic direct charging; operation while charging supported"],
        ["可选传感器", "Optional sensor", "激光雷达", "LiDAR"],
        ["有线接口", "Wired interfaces", "带锁 USB-C 与以太网", "Locking USB-C and Ethernet"],
        ["无线网络", "Wireless networking", "Wi-Fi 6 与 Bluetooth 5.2", "Wi-Fi 6 and Bluetooth 5.2"],
        ["状态告警", "Status alerts", "灯光与声音告警", "Light and audible alerts"],
      ]),
      row(BOOSTER_T2_DOC, l("Booster T2 官方规格文档", "Official Booster T2 specification document"), l("Load note", "Load note"), "双臂负载条件", "Dual-arm load condition", "随姿态和任务条件变化", "Depends on pose and task conditions", l("10 kg 是双臂最大值，不是任意姿态的连续额定值。", "The 10 kg figure is a maximum for both arms, not a continuous rating in every pose.")),
      ...boosterT2JointRows,
    ],
    overview: [l(`${edition.product} 是 T2 的 ${edition.edition} 配置，具有约 1.4 m 高、31 个本体自由度和 140 N·m 最大关节扭矩。`, `${edition.product} is the ${edition.edition} T2 configuration with an approximately 1.4 m body, 31 body DoF, and 140 N·m maximum joint torque.`), l("六个版本主要由教育/专业计算平台及无末端、夹爪、灵巧手三种末端组合区分。逐关节角度限位来自 T2 官方规格文档。", "The six editions are distinguished primarily by Education/Professional compute and no-effector, gripper, or dexterous-hand configurations. Per-joint position limits come from the official T2 specification document.")],
    applications: [l("人形运动、双臂操作、具身模型、教育科研及工业任务开发", "Humanoid locomotion, bimanual manipulation, embodied models, education/research, and industrial-task development")],
    coverage: "official-complete",
    sourceLinks: [{ label: l("T2 规格文档", "T2 specification document"), url: BOOSTER_T2_DOC }],
  };
});

const boosterSeeds: ProductSeed[] = [
  ...boosterK1Seeds,
  ...boosterT1Seeds,
  ...boosterT2Seeds,
];

const noetixBumiCommonRows = rows(
  NOETIX_DOCS,
  l("Bumi 官方综合使用文档", "Official Bumi comprehensive guide"),
  l("About Bumi, electrical interfaces, onboard computer, battery, and charger", "About Bumi, electrical interfaces, onboard computer, battery, and charger"),
  [
    ["站立尺寸", "Standing dimensions", "98 × 35 × 20 cm"],
    ["带电池质量", "Mass with battery", "约 17 kg", "About 17 kg"],
    ["总自由度", "Total degrees of freedom", "21 DoF"],
    ["单腿自由度", "Degrees of freedom per leg", "6 DoF"],
    ["单臂自由度", "Degrees of freedom per arm", "4 DoF"],
    ["腰部自由度", "Waist degrees of freedom", "1 DoF"],
    ["关节通信", "Joint communication", "EtherCAT 与 CAN FD", "EtherCAT and CAN FD"],
    ["最大关节扭矩", "Maximum joint torque", "70 N·m"],
    ["大腿与小腿总长", "Combined thigh and shank length", "约 513 mm", "About 513 mm"],
    ["手臂臂展", "Arm reach", "约 379 mm", "About 379 mm"],
    ["供电方式", "Power source", "锂电池", "Lithium battery"],
    ["惯性传感器", "Inertial sensor", "IMU"],
    ["麦克风阵列", "Microphone array", "标配", "Standard"],
    ["扬声器", "Speaker", "标配", "Standard"],
    ["电池形式", "Battery format", "快拆智能电池", "Quick-release smart battery"],
    ["手机应用", "Mobile application", "支持", "Supported"],
    ["OTA 升级", "OTA updates", "支持", "Supported"],
    ["续航时间", "Runtime", "2 至 3 h", "2 to 3 h"],
    ["RJ45 接口", "RJ45 ports", "1 个，1000BASE-T", "1, 1000BASE-T"],
    ["USB 接口", "USB ports", "2 个 USB 3.0", "2 USB 3.0"],
    ["HDMI 接口", "HDMI ports", "1 个", "1"],
    ["运控板", "Motion-control computer", "Rockchip RK3576"],
    ["运控板算力", "Motion-control compute", "6 TOPS"],
    ["运控板频率", "Motion-control CPU frequency", "2.4 GHz"],
    ["运控板内存与存储", "Motion-control memory and storage", "8 GB + 64 GB"],
    ["电池品牌", "Battery brand", "深圳格瑞普", "Grepow"],
    ["电池型号", "Battery model", "GRP6752097-13S1P"],
    ["电池容量", "Battery capacity", "5100 mAh"],
    ["电池电压", "Battery voltage", "48 V"],
    ["充电器型号", "Charger model", "TA300 Robot"],
    ["充电器输入", "Charger input", "100-240 V AC，50/60 Hz，4.5 A", "100-240 V AC, 50/60 Hz, 4.5 A"],
    ["充电器支持电池", "Supported charger batteries", "LiPo/LiFe/LiHV，13S-16S", "LiPo/LiFe/LiHV, 13S-16S"],
    ["充电器输出", "Charger output", "35-72 V DC，7.5 A，最大 350 W", "35-72 V DC, 7.5 A, 350 W maximum"],
    ["充电器工作模式", "Charger operating mode", "充电", "Charge"],
    ["充电器质量", "Charger mass", "510 g ± 10 g"],
    ["DDS 实现", "DDS implementation", "CycloneDDS 0.11.0"],
    ["SDK 控制频率", "SDK control rate", "500 Hz"],
    ["开发语言", "Development languages", "C++ 与 Python", "C++ and Python"],
    ["HighControl", "HighControl", "支持", "Supported"],
    ["防水使用限制", "Water-protection limitation", "防水能力低；不得在雨雪或潮湿环境使用", "Low water protection; do not use in rain, snow, or humid environments"],
  ],
);

const noetixBumiSeeds: ProductSeed[] = [
  {
    id: "noetix-bumi-standard",
    companySlug: "noetix-robotics",
    product: "Bumi Standard",
    pageUrl: NOETIX_DOCS,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "humanoid-robot",
    useCases: ["service", "research"],
    type: l("21 自由度小型人形机器人标准版", "21-DoF compact humanoid, Standard edition"),
    integration: l("通过手机应用和 HighControl 调用原厂运动能力；运控板不向用户开放。", "Uses the mobile application and HighControl to call factory motion capabilities; the motion-control board is not open to users."),
    verification: l("核对是否带算力板、相机版本、图传、HighControl 功能、场地、防水限制和售后安全流程。", "Verify whether a compute board is installed, camera revision, video feed, HighControl functions, site conditions, water limitation, and support safety process."),
    rows: [
      ...noetixBumiCommonRows,
      ...rows(NOETIX_DOCS, l("Bumi 官方综合使用文档", "Official Bumi comprehensive guide"), l("Standard-edition fields", "Standard-edition fields"), [
        ["产品版本", "Product edition", "标准版", "Standard"],
        ["相机型号", "Camera model", "DC_V93"],
        ["图像访问", "Image access", "手机应用内图传", "Video feed in the mobile application"],
        ["二次开发算力板", "Secondary-development computer", "未标配", "Not standard"],
        ["LowController", "LowController", "不支持", "Not supported"],
      ]),
      row(NOETIX_DOCS, l("Bumi 官方综合使用文档", "Official Bumi comprehensive guide"), l("Charger specification table", "Charger specification table"), "充电器尺寸原始披露", "Raw published charger dimensions", "1729746 mm", "1729746 mm", l("官网文本缺少清晰分隔符；保留原文，不推断为 172 × 97 × 46 mm。", "The official text lacks clear separators; the raw value is retained rather than inferred as 172 x 97 x 46 mm.")),
    ],
    overview: [l("Bumi 标准版是约 0.98 m、17 kg、21 自由度的小型人形机器人，采用 48 V、5100 mAh 快拆电池。标准版以 App 和 HighControl 为主要开发边界。", "Bumi Standard is an approximately 0.98 m, 17 kg, 21-DoF compact humanoid with a 48 V, 5100 mAh quick-release battery. Its primary development boundary is the app and HighControl."), l("官方明确运控板不向用户开放，LowController 仅教育版支持，因此不能把教育版开发权限复制给标准版。", "The official guide states that the motion-control board is not open to users and LowController is limited to the Education edition, so Education development access is not copied to Standard.")],
    applications: [l("教育展示、基础运动调用、交互演示和原厂动作集成", "Education display, basic motion calls, interactive demonstrations, and factory-motion integration")],
    coverage: "official-complete",
  },
  {
    id: "noetix-bumi-education",
    companySlug: "noetix-robotics",
    product: "Bumi Education",
    pageUrl: NOETIX_DOCS,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "humanoid-robot",
    useCases: ["research", "integration"],
    type: l("21 自由度小型人形机器人教育版", "21-DoF compact humanoid, Education edition"),
    integration: l("支持 HighControl 与 500 Hz LowController；可选 Orin Nano Super 或 Orin NX 二次开发板。", "Supports HighControl and 500 Hz LowController with optional Orin Nano Super or Orin NX secondary-development compute."),
    verification: l("核对 EDU/EDU Air 具体版本、Orin 板卡、相机、低层控制权限、训练框架状态、吊架与安全责任。", "Verify exact EDU/EDU Air edition, Orin board, camera, low-level access, training-framework status, suspension rig, and safety responsibility."),
    rows: [
      ...noetixBumiCommonRows,
      ...rows(NOETIX_DOCS, l("Bumi 官方综合使用文档", "Official Bumi comprehensive guide"), l("Education-edition fields", "Education-edition fields"), [
        ["产品版本", "Product edition", "教育版", "Education"],
        ["相机型号", "Camera model", "Intel RealSense D435i / D435ICB（EDU Air 除外）", "Intel RealSense D435i / D435ICB (except EDU Air)"],
        ["图像访问", "Image access", "可从二次开发算力板访问硬件", "Hardware accessible from the secondary-development computer"],
        ["二次开发算力板选项一", "Secondary-development compute option 1", "NVIDIA Jetson Orin Nano Super，67 TOPS，1.7 GHz，8 GB + 128 GB", "NVIDIA Jetson Orin Nano Super, 67 TOPS, 1.7 GHz, 8 GB + 128 GB"],
        ["二次开发算力板选项二", "Secondary-development compute option 2", "NVIDIA Jetson Orin NX，117 TOPS，2.0 GHz，16 GB + 128 GB", "NVIDIA Jetson Orin NX, 117 TOPS, 2.0 GHz, 16 GB + 128 GB"],
        ["LowController", "LowController", "支持，500 Hz", "Supported at 500 Hz"],
        ["训练框架", "Training framework", "后续开放", "Planned for later release"],
      ]),
      row(NOETIX_DOCS, l("Bumi 官方综合使用文档", "Official Bumi comprehensive guide"), l("Charger specification table", "Charger specification table"), "充电器尺寸原始披露", "Raw published charger dimensions", "1729746 mm", "1729746 mm", l("官网文本缺少清晰分隔符；保留原文，不推断。", "The official text lacks clear separators; the raw value is retained without inference.")),
    ],
    overview: [l("Bumi 教育版与标准版共享本体、电池和基础运控硬件，主要差异是可选 NVIDIA 二次开发算力板、相机访问和 LowController。", "Bumi Education shares the body, battery, and base motion computer with Standard; its main differences are optional NVIDIA development compute, camera access, and LowController."), l("官方训练框架仍标注为后续开放；LowController 可用不等同于训练、仿真和策略部署工具链已经全部交付。", "The official training framework remains marked for later release; LowController availability does not establish that a complete training, simulation, and policy-deployment toolchain is delivered.")],
    applications: [l("运动控制、强化学习、教育课程、视觉与大模型集成", "Motion control, reinforcement learning, education, vision, and large-model integration")],
    coverage: "official-complete",
  },
];

type NoetixEdition = {
  id: string;
  product: string;
  editionZh: string;
  editionEn: string;
  compute: string;
  highComputeZh: string;
  highComputeEn: string;
  developmentZh: string;
  developmentEn: string;
};

const noetixN2CommonRows = rows(
  NOETIX_N2_DOC,
  l("N2 官方 SDK 开发指南", "Official N2 SDK development guide"),
  l("Robot specifications, electrical interfaces, and onboard computers", "Robot specifications, electrical interfaces, and onboard computers"),
  [
    ["站立尺寸", "Standing dimensions", "1140 × 491.38 × 280 mm"],
    ["带电池质量", "Mass with battery", "约 33.5 kg", "About 33.5 kg"],
    ["总自由度", "Total degrees of freedom", "18 至 20 DoF", "18 to 20 DoF"],
    ["单腿自由度", "Degrees of freedom per leg", "5 DoF"],
    ["单臂自由度", "Degrees of freedom per arm", "4 DoF"],
    ["最大关节扭矩", "Maximum joint torque", "150 N·m"],
    ["手臂最大负载", "Maximum arm payload", "5 kg"],
    ["大腿与小腿总长", "Combined thigh and shank length", "约 0.76 m", "About 0.76 m"],
    ["手臂臂展", "Arm reach", "约 0.4 m", "About 0.4 m"],
    ["关节编码器", "Joint encoders", "双编码器", "Dual encoders"],
    ["散热", "Cooling", "局部风冷", "Local forced-air cooling"],
    ["供电", "Power source", "锂电池", "Lithium battery"],
    ["感知传感器", "Perception sensor", "深度相机", "Depth camera"],
    ["麦克风阵列", "Microphone array", "4 麦克风，选配", "Four microphones, optional"],
    ["扬声器", "Speaker", "5 W，选配", "5 W, optional"],
    ["电池", "Battery", "52 V / 7 Ah 快拆智能电池", "52 V / 7 Ah quick-release smart battery"],
    ["充电器", "Charger", "54.6 V / 5 A"],
    ["遥控手柄", "Remote controller", "标配", "Included"],
    ["续航", "Runtime", "约 2 h", "About 2 h"],
    ["以太网接口", "Ethernet ports", "1 个", "1"],
    ["USB 接口", "USB ports", "2 个", "2"],
    ["HDMI 接口", "HDMI ports", "1 个，连接运控板", "1, connected to the motion-control computer"],
    ["运控板", "Motion-control computer", "Rockchip RK3588S"],
    ["运控板算力", "Motion-control compute", "6 TOPS"],
    ["运控板频率", "Motion-control CPU frequency", "2.4 GHz"],
    ["运控板内存与存储", "Motion-control memory and storage", "4 GB + 32 GB"],
    ["DDS 实现", "DDS implementation", "CycloneDDS 0.11.0"],
    ["低层闭环频率", "Low-level closed-loop rate", "500 Hz"],
    ["SDK 操作系统", "SDK operating system", "Linux"],
    ["SDK 对 ROS 依赖", "SDK ROS dependency", "不依赖 ROS", "ROS-independent"],
    ["HighControl", "HighControl", "方向、速度和动作编号级控制", "Direction, speed, and action-index control"],
    ["LowControl", "LowControl", "位置、速度、扭矩、kp、kd 电机命令", "Motor commands for position, velocity, torque, kp, and kd"],
  ],
);

const noetixN2Editions: NoetixEdition[] = [
  { id: "noetix-n2-standard", product: "N2 Standard", editionZh: "标准版", editionEn: "Standard", compute: "6 TOPS", highComputeZh: "未配备", highComputeEn: "Not installed", developmentZh: "未开放二次开发", developmentEn: "Secondary development not provided" },
  { id: "noetix-n2-education", product: "N2 Education", editionZh: "教育版", editionEn: "Education", compute: "6 + 67 TOPS", highComputeZh: "Jetson Orin Nano Super，67 TOPS，1.7 GHz，8 GB + 128 GB", highComputeEn: "Jetson Orin Nano Super, 67 TOPS, 1.7 GHz, 8 GB + 128 GB", developmentZh: "支持", developmentEn: "Supported" },
];

const noetixN2Seeds: ProductSeed[] = noetixN2Editions.map((edition) => ({
  id: edition.id,
  companySlug: "noetix-robotics",
  product: edition.product,
  pageUrl: NOETIX_N2_DOC,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "humanoid-robot",
  useCases: ["research", "service", "integration"],
  type: l(`约 1.14 m 通用人形机器人 ${edition.editionZh}`, `Approximately 1.14 m general humanoid, ${edition.editionEn}`),
  integration: l("原厂运控经 DDS 提供 HighControl；教育版增加 Orin Nano Super 与 LowControl 二次开发。", "Factory motion control exposes HighControl over DDS; Education adds Orin Nano Super and LowControl development."),
  verification: l("核对 18/20 自由度配置、教育版算力板、控制权限、相机、可选音频、负载姿态、场地及 SSH 安全流程。", "Verify 18/20-DoF configuration, Education compute, control access, camera, optional audio, load pose, site, and SSH safety process."),
  rows: [
    ...noetixN2CommonRows,
    ...rows(NOETIX_N2_DOC, l("N2 官方 SDK 开发指南", "Official N2 SDK development guide"), l("Edition comparison", "Edition comparison"), [
      ["产品版本", "Product edition", edition.editionZh, edition.editionEn],
      ["总算力", "Total compute", edition.compute],
      ["二次开发算力板", "Secondary-development computer", edition.highComputeZh, edition.highComputeEn],
      ["二次开发", "Secondary development", edition.developmentZh, edition.developmentEn],
    ]),
    row(NOETIX_N2_DELIVERY, l("N2 官方交付文档", "Official N2 delivery document"), l("Operating-site requirements", "Operating-site requirements"), "可跨越障碍高度", "Traversable obstacle height", "不超过 5 cm", "No more than 5 cm"),
    row(NOETIX_N2_DELIVERY, l("N2 官方交付文档", "Official N2 delivery document"), l("Operating-site requirements", "Operating-site requirements"), "可用坡度", "Usable slope", "不超过 20°", "No more than 20°"),
    row(NOETIX_N2_DELIVERY, l("N2 官方交付文档", "Official N2 delivery document"), l("Dance-site requirements", "Dance-site requirements"), "舞蹈建议场地", "Recommended dance area", "6 × 6 m"),
  ],
  overview: [l(`${edition.product} 采用约 1.14 m、33.5 kg 本体，公开表给出 18 至 20 自由度、150 N·m 最大关节扭矩和 5 kg 手臂最大负载。`, `${edition.product} uses an approximately 1.14 m, 33.5 kg body; the official table states 18 to 20 DoF, 150 N·m maximum joint torque, and 5 kg maximum arm payload.`), l("SDK 文档警告运控程序运行期间 SSH 访问运控板可能占用 EtherCAT 带宽并导致失能。该限制属于部署安全条件，不是普通网络配置提示。", "The SDK guide warns that SSH access to the motion-control computer while motion control is running may consume EtherCAT bandwidth and disable the robot. This is a deployment safety condition rather than a routine networking note.")],
  applications: [l("人形运动、教育科研、视觉/语音集成和通用动作开发", "Humanoid locomotion, education/research, vision/speech integration, and general behavior development")],
  coverage: "official-complete",
  sourceLinks: [{ label: l("N2 交付文档", "N2 delivery document"), url: NOETIX_N2_DELIVERY }],
}));

const noetixE1CommonRows = rows(
  NOETIX_E1_DOC,
  l("E1 官方 SDK 开发指南", "Official E1 SDK development guide"),
  l("Robot specifications, electrical interfaces, onboard computers, and audio", "Robot specifications, electrical interfaces, onboard computers, and audio"),
  [
    ["站立尺寸", "Standing dimensions", "1400 × 485 × 320 mm"],
    ["带电池质量", "Mass with battery", "约 40 kg", "About 40 kg"],
    ["总自由度", "Total degrees of freedom", "23 至 28 DoF", "23 to 28 DoF"],
    ["单腿自由度", "Degrees of freedom per leg", "6 DoF，可选增加 2 DoF", "6 DoF, optional additional 2 DoF"],
    ["单臂自由度", "Degrees of freedom per arm", "5 DoF"],
    ["腰部自由度", "Waist degrees of freedom", "1 DoF"],
    ["关节通信", "Joint communication", "EtherCAT 与 CAN FD", "EtherCAT and CAN FD"],
    ["关节通信波特率", "Joint communication baud rate", "1 Mbaud"],
    ["最大关节扭矩", "Maximum joint torque", "150 N·m"],
    ["大腿与小腿总长", "Combined thigh and shank length", "约 0.7 m", "About 0.7 m"],
    ["手臂臂展", "Arm reach", "约 0.6 m", "About 0.6 m"],
    ["关节编码器", "Joint encoders", "双编码器", "Dual encoders"],
    ["散热", "Cooling", "局部风冷", "Local forced-air cooling"],
    ["供电", "Power source", "锂电池", "Lithium battery"],
    ["感知传感器", "Perception sensors", "IMU 与深度相机", "IMU and depth camera"],
    ["麦克风阵列", "Microphone array", "标配", "Standard"],
    ["扬声器", "Speaker", "标配", "Standard"],
    ["电池", "Battery", "48 V / 10.5 Ah 快拆智能电池", "48 V / 10.5 Ah quick-release smart battery"],
    ["充电器", "Charger", "标配", "Included"],
    ["遥控手柄", "Remote controller", "标配", "Included"],
    ["续航", "Runtime", "2 至 4 h", "2 to 4 h"],
    ["以太网接口", "Ethernet ports", "1 个", "1"],
    ["USB 接口", "USB ports", "2 个", "2"],
    ["USB Type-C 接口", "USB Type-C ports", "1 个", "1"],
    ["HDMI 接口", "HDMI ports", "1 个，连接运控板", "1, connected to the motion-control computer"],
    ["XT30 外部电源接口", "XT30 external-power ports", "1 个，12 V，最大 5 A", "1, 12 V, 5 A maximum"],
    ["运控板", "Motion-control computer", "Rockchip RK3588S"],
    ["运控板算力", "Motion-control compute", "6 TOPS"],
    ["运控板频率", "Motion-control CPU frequency", "2.4 GHz"],
    ["运控板内存与存储", "Motion-control memory and storage", "8 GB + 64 GB"],
    ["语音声道", "Speech audio format", "2 声道", "2 channels"],
    ["语音采样率", "Speech sampling rate", "16 kHz"],
    ["语音采样精度", "Speech sampling depth", "16 bit"],
    ["语音模型服务", "Speech model service", "讯飞星火 Spark4.0 Ultra", "iFlytek Spark4.0 Ultra"],
    ["DDS 实现", "DDS implementation", "CycloneDDS 0.11.0"],
    ["SDK 控制频率", "SDK control rate", "500 Hz"],
    ["开发语言", "Development languages", "C++ 与 Python", "C++ and Python"],
  ],
);

const noetixE1Editions: NoetixEdition[] = [
  { id: "noetix-e1-standard", product: "E1 Standard", editionZh: "标准版", editionEn: "Standard", compute: "6 TOPS", highComputeZh: "未配备", highComputeEn: "Not installed", developmentZh: "未开放二次开发", developmentEn: "Secondary development not provided" },
  { id: "noetix-e1-education", product: "E1 Education", editionZh: "教育版", editionEn: "Education", compute: "6 + 67 TOPS", highComputeZh: "Jetson Orin Nano Super，67 TOPS，1.7 GHz，8 GB + 128 GB", highComputeEn: "Jetson Orin Nano Super, 67 TOPS, 1.7 GHz, 8 GB + 128 GB", developmentZh: "支持", developmentEn: "Supported" },
];

const noetixE1Seeds: ProductSeed[] = noetixE1Editions.map((edition) => ({
  id: edition.id,
  companySlug: "noetix-robotics",
  product: edition.product,
  pageUrl: NOETIX_E1,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "humanoid-robot",
  useCases: ["research", "service", "integration"],
  type: l(`约 1.4 m 通用人形机器人 ${edition.editionZh}`, `Approximately 1.4 m general humanoid, ${edition.editionEn}`),
  integration: l("提供原厂动作与 DDS 开发接口；教育版增加 Orin Nano Super 二次开发算力板。", "Provides factory motions and DDS development interfaces; Education adds an Orin Nano Super secondary-development computer."),
  verification: l("核对 23/28 自由度、可选腿部关节、开发板、SDK、相机、语音服务、速度/负载修订、场地与安全条件。", "Verify 23/28 DoF, optional leg joints, development computer, SDK, camera, speech service, speed/load revision, site, and safety conditions."),
  rows: [
    ...noetixE1CommonRows,
    ...rows(NOETIX_E1_DOC, l("E1 官方 SDK 开发指南", "Official E1 SDK development guide"), l("Edition comparison", "Edition comparison"), [
      ["产品版本", "Product edition", edition.editionZh, edition.editionEn],
      ["总算力", "Total compute", edition.compute],
      ["二次开发算力板", "Secondary-development computer", edition.highComputeZh, edition.highComputeEn],
      ["二次开发", "Secondary development", edition.developmentZh, edition.developmentEn],
    ]),
    row(NOETIX_E1, l("E1 官方产品页", "Official E1 product page"), l("Product summary", "Product summary"), "官网整机质量", "Product-page robot mass", "40 kg", "40 kg", l("当前产品页口径；交付文档曾出现 44.5 kg，采购需锁定版本。", "Current product-page figure; a delivery document previously stated 44.5 kg, so procurement must lock the revision.")),
    row(NOETIX_E1, l("E1 官方产品页", "Official E1 product page"), l("Product summary", "Product summary"), "最高移动速度", "Maximum travel speed", "3.5 m/s"),
    row(NOETIX_E1, l("E1 官方产品页", "Official E1 product page"), l("Product summary", "Product summary"), "移动负载上限", "Maximum moving payload", "5 kg"),
    row(NOETIX_E1, l("E1 官方产品页", "Official E1 product page"), l("Product summary", "Product summary"), "官网电池容量", "Product-page battery capacity", "10.6 Ah", "10.6 Ah", l("当前产品页口径；SDK 表为 10.5 Ah。", "Current product-page figure; the SDK table states 10.5 Ah.")),
    row(NOETIX_E1, l("E1 官方产品页", "Official E1 product page"), l("Product summary", "Product summary"), "换电时间", "Battery-swap time", "5 s"),
    row(NOETIX_E1, l("E1 官方产品页", "Official E1 product page"), l("Product summary", "Product summary"), "移动续航上限", "Maximum mobile runtime", "2 h"),
  ],
  overview: [l(`${edition.product} 是约 1.4 m 的 E1 配置，SDK 表公开 23 至 28 自由度、150 N·m 最大关节扭矩、48 V / 10.5 Ah 电池和 2 至 4 小时续航。`, `${edition.product} is an approximately 1.4 m E1 configuration. The SDK table publishes 23 to 28 DoF, 150 N·m maximum joint torque, a 48 V / 10.5 Ah battery, and 2 to 4 hours of runtime.`), l("当前产品页和交付/SDK 文档在质量、电池容量和续航口径上存在修订差异。本仓保留来源与条件，实际报价必须附版本规格表。", "The current product page and delivery/SDK documents differ in mass, battery-capacity, and runtime definitions. The repository preserves source and conditions; an actual quote must include a revision-specific specification sheet.")],
  applications: [l("通用人形运动、教育科研、交互展示、视觉与语音应用开发", "General humanoid locomotion, education/research, interactive display, and vision/speech application development")],
  coverage: "official-complete",
  sourceLinks: [{ label: l("E1 SDK 开发指南", "E1 SDK development guide"), url: NOETIX_E1_DOC }],
}));

const NOETIX_W1_DOC = "https://web.noetixrobotics.com/docs/%E4%BB%BF%E7%94%9F%E4%BA%BA%E5%BD%A2%E6%9C%BA%E5%99%A8%E4%BA%BA/NOETIX%E4%BB%BF%E7%94%9F%E6%9C%BA%E5%99%A8%E4%BA%BA%20Hobbs%20W1%20%E5%AE%A3%E4%BC%A0%E6%89%8B%E5%86%8C/";

const noetixBiomimeticSeeds: ProductSeed[] = [
  capabilitySeed(
    "noetix-xiaoyue",
    "noetix-robotics",
    "Xiaoyue",
    "https://www.noetixrobotics.com/mobile/detail/XY",
    "robot-platform",
    "robot-platform",
    "biomimetic-humanoid",
    l("消费与陪伴方向的仿生人形机器人", "Consumer and companionship-oriented biomimetic humanoid"),
    [l("官网将小月列入仿生交互产品线，强调外观、对话和陪伴场景。", "The official site lists Xiaoyue in its biomimetic-interaction line with emphasis on appearance, dialogue, and companionship."), l("当前公开页面未提供可逐项核验的完整本体、电机、关节、电池或计算规格表，因此保持能力型记录。", "The current public page does not provide a complete, itemized body, motor, joint, battery, or compute table, so the record remains capability-level.")],
    [l("陪伴、展示、接待与角色化交互", "Companionship, display, reception, and character-based interaction")],
    l("需与语音服务、内容系统、远程运维和场景安全策略组合。", "Requires integration with speech services, content systems, remote operations, and scenario safety policies."),
    l("索取当前型号规格表、隐私与数据处理说明、语音服务边界、动作范围、电池、维护和交付清单。", "Obtain the current model specification, privacy and data-processing statement, speech-service boundary, motion envelope, battery, maintenance, and delivery list."),
    ["service", "integration"],
  ),
  {
    id: "noetix-xiaonuo-3",
    companySlug: "noetix-robotics",
    product: "Xiaonuo 3.0",
    pageUrl: NOETIX_XIAONUO,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "biomimetic-humanoid",
    useCases: ["service", "integration"],
    type: l("高仿生头部与人机交互智慧体", "High-fidelity biomimetic head and human-interaction agent"),
    integration: l("提供运动、面部表情、音频和唇形等接口，并支持跨平台 SDK。", "Provides motion, facial-expression, audio, and lip-sync interfaces with a cross-platform SDK."),
    verification: l("核对头部版本、主动/被动自由度定义、识别测试条件、SDK 平台、模型服务、数据合规和定制交付。", "Verify head revision, active/passive DoF definition, recognition test conditions, SDK platforms, model services, data compliance, and custom delivery."),
    rows: rows(NOETIX_XIAONUO, l("小诺 3.0 官方产品页", "Official Xiaonuo 3.0 product page"), l("Product highlights", "Product highlights"), [
      ["头部主动自由度", "Active head degrees of freedom", "32 DoF"],
      ["头部被动自由度", "Passive head degrees of freedom", "8 DoF"],
      ["面部材料", "Facial material", "铂金硅胶", "Platinum silicone"],
      ["语音识别准确率", "Speech-recognition accuracy", "98%"],
      ["开发支持", "Development support", "跨平台 SDK", "Cross-platform SDK"],
      ["开放接口", "Available interfaces", "运动、面部表情、音频与唇形", "Motion, facial expression, audio, and lip sync"],
      ["语音与口型", "Speech and lip sync", "支持同步", "Synchronized"],
      ["面部定制", "Face customization", "支持个性化定制与快速更换", "Personalized customization and quick replacement supported"],
    ]),
    overview: [l("小诺 3.0 以 32 个主动和 8 个被动头部自由度、铂金硅胶外观、语音理解与唇形同步为核心。", "Xiaonuo 3.0 centers on 32 active and eight passive head DoF, platinum-silicone appearance, speech understanding, and lip synchronization."), l("98% 是官网公布的语音识别值，但未披露数据集、语言、噪声、距离或统计方法，不能直接外推到目标现场。", "The 98% speech-recognition figure is official, but dataset, language, noise, distance, and methodology are not disclosed and cannot be extrapolated directly to a target site.")],
    applications: [l("展陈、接待、直播、文旅、品牌角色和人机交互研究", "Exhibition, reception, livestreaming, cultural tourism, brand characters, and human-robot interaction research")],
    coverage: "official-partial",
  },
  {
    id: "noetix-hobbs-w1",
    companySlug: "noetix-robotics",
    product: "Hobbs W1",
    pageUrl: NOETIX_W1,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "biomimetic-humanoid",
    useCases: ["service", "integration"],
    type: l("轮式全身仿生交互机器人", "Wheeled full-body biomimetic interaction robot"),
    integration: l("集成仿生头部、双臂灵巧手、视觉、麦克风、显示屏和轮式底盘；通过串口与上层系统连接。", "Integrates a biomimetic head, arms and hands, vision, microphones, display, and wheeled base with serial connectivity to upper-level systems."),
    verification: l("逐项核对手册版本、尺寸分隔、头臂手自由度、底盘算力、负载、语音时延、接口、充电及定制交付。", "Verify brochure revision, dimension separators, head/arm/hand DoF, base compute, load, speech latency, interfaces, charging, and custom delivery."),
    rows: rows(NOETIX_W1_DOC, l("Hobbs W1 官方宣传手册", "Official Hobbs W1 brochure"), l("Product parameter image", "Product parameter image"), [
      ["整机质量", "Robot mass", "75 kg"],
      ["整机尺寸", "Robot dimensions", "525 × 525 × 1700 mm"],
      ["无线网络", "Wireless networking", "Wi-Fi 2.4 GHz / 5 GHz"],
      ["电池容量", "Battery capacity", "32 Ah"],
      ["电池电压", "Battery voltage", "21 至 29.4 V", "21 to 29.4 V"],
      ["工作时间", "Operating time", "6 h"],
      ["待机时间", "Standby time", "8 h"],
      ["标准充电时间", "Standard charging time", "6.5 h"],
      ["快速充电时间", "Fast charging time", "2 h"],
      ["头部质量", "Head mass", "2.8 kg"],
      ["头部主动自由度", "Active head degrees of freedom", "32 DoF"],
      ["头部被动自由度", "Passive head degrees of freedom", "8 DoF"],
      ["面部材料", "Facial material", "铂金硅胶", "Platinum silicone"],
      ["眼部相机", "Eye cameras", "2 个 RGB 相机", "2 RGB cameras"],
      ["胸部相机", "Chest camera", "1 个 RGB 相机", "1 RGB camera"],
      ["麦克风阵列", "Microphone array", "4 麦克风", "4 microphones"],
      ["头部供电", "Head power", "7.5 V DC"],
      ["头部通信", "Head communication", "串口", "Serial"],
      ["对话时延", "Dialogue latency", "小于 1200 ms", "Less than 1200 ms"],
      ["表情响应时延", "Expression response latency", "小于 150 ms", "Less than 150 ms"],
      ["单臂质量", "Mass per arm", "3.3 kg"],
      ["单臂负载", "Payload per arm", "2 kg"],
      ["单臂主动自由度", "Active degrees of freedom per arm", "5 DoF"],
      ["单手主动自由度", "Active degrees of freedom per hand", "6 DoF"],
      ["单手被动自由度", "Passive degrees of freedom per hand", "5 DoF"],
      ["手臂工作空间", "Arm workspace", "600 mm / 225°"],
      ["交互计算平台", "Interaction compute", "Rockchip RK3588"],
      ["显示屏", "Display", "7 英寸，1280 × 800", "7-inch, 1280 x 800"],
      ["交互系统", "Interaction operating system", "Android 12"],
      ["交互内存与存储", "Interaction memory and storage", "4 GB + 64 GB"],
      ["底盘处理器", "Base processor", "Intel J1900"],
      ["底盘 AI 算力", "Base AI compute", "2 × 6 TOPS"],
      ["底盘内存", "Base memory", "32 GB"],
      ["底盘最大存储", "Maximum base storage", "256 GB"],
      ["底盘承载", "Base load capacity", "50 kg"],
      ["导航精度", "Navigation accuracy", "±50 mm"],
      ["底盘最高速度", "Maximum base speed", "1.2 m/s"],
      ["可用坡度", "Traversable slope", "10°"],
      ["可跨沟宽度", "Traversable gap width", "30 mm"],
      ["可越门槛高度", "Traversable threshold height", "18 mm"],
    ]),
    overview: [l("Hobbs W1 将仿生头部、双臂灵巧手、交互计算、显示屏和轮式导航底盘组合为全身交互平台。", "Hobbs W1 combines a biomimetic head, arms and hands, interaction compute, display, and a wheeled navigation base as a full-body interaction platform."), l("参数主要来自官方图片型宣传手册。本记录完成了当前可辨识字段的转录，但仍标为官方公开不完整，以便后续用原始 PDF 或结构化规格表复核。", "Parameters primarily come from an official image-based brochure. This record transcribes currently legible fields but remains officially partial pending verification against an original PDF or structured specification sheet.")],
    applications: [l("展馆、接待、导览、直播、品牌展示和仿生交互研究", "Exhibitions, reception, guidance, livestreaming, brand display, and biomimetic-interaction research")],
    coverage: "official-partial",
  },
];

const noetixSeeds: ProductSeed[] = [
  ...noetixBumiSeeds,
  ...noetixN2Seeds,
  ...noetixE1Seeds,
  ...noetixBiomimeticSeeds,
];

type FourierGR1Edition = {
  id: string;
  product: string;
  armSpan: string;
  mass: string;
  actuators: string;
  endEffectorZh: string;
  endEffectorEn: string;
  depthCameras: string;
  shellZh: string;
  shellEn: string;
  pro: boolean;
};

const fourierGR1Editions: FourierGR1Edition[] = [
  { id: "fourier-gr1l", product: "GR-1L", armSpan: "1665 mm", mass: "约 55 kg", actuators: "34", endEffectorZh: "夹爪", endEffectorEn: "Gripper", depthCameras: "1", shellZh: "骨架外壳", shellEn: "Skeletal shell", pro: false },
  { id: "fourier-gr1", product: "GR-1", armSpan: "1680 mm", mass: "约 55 kg", actuators: "44", endEffectorZh: "灵巧手", endEffectorEn: "Dexterous hand", depthCameras: "1", shellZh: "骨架外壳", shellEn: "Skeletal shell", pro: false },
  { id: "fourier-gr1l-pro", product: "GR-1L Pro", armSpan: "1665 mm", mass: "约 60 kg", actuators: "34", endEffectorZh: "夹爪", endEffectorEn: "Gripper", depthCameras: "2", shellZh: "封闭外壳", shellEn: "Enclosed shell", pro: true },
  { id: "fourier-gr1-pro", product: "GR-1 Pro", armSpan: "1680 mm", mass: "约 60 kg", actuators: "44", endEffectorZh: "灵巧手", endEffectorEn: "Dexterous hand", depthCameras: "2", shellZh: "封闭外壳", shellEn: "Enclosed shell", pro: true },
];

const fourierGR1CommonRows = rows(
  FOURIER_GR1_BROCHURE,
  l("GR-1 系列官方规格彩页", "Official GR-1 series specification brochure"),
  l("Technical specifications and feature matrix", "Technical specifications and feature matrix"),
  [
    ["站立尺寸", "Standing dimensions", "1650 × 515 × 320 mm"],
    ["材料", "Materials", "铝合金与工程塑料", "Aluminum alloy and engineering plastic"],
    ["供电电压", "Supply voltage", "46.2 V"],
    ["最大工作功率", "Maximum operating power", "约 550 W", "About 550 W"],
    ["步行速度", "Walking speed", "5 km/h"],
    ["单手负载", "Single-hand payload", "3 kg"],
    ["处理器", "Processor", "Intel Core i7-13700H，6P + 8E，20 线程，1.6/5.0 GHz", "Intel Core i7-13700H, 6P + 8E, 20 threads, 1.6/5.0 GHz"],
    ["最大关节峰值扭矩", "Maximum joint peak torque", "230 N·m"],
    ["腰部自由度", "Waist degrees of freedom", "3 DoF"],
    ["头部自由度", "Head degrees of freedom", "3 DoF"],
    ["踝部自由度", "Ankle degrees of freedom", "每侧 2 DoF", "2 DoF per side"],
    ["IMU", "IMU", "标配", "Standard"],
    ["运动模式", "Motion modes", "静态站立、步态运动、原地运动、末端抓取", "Static standing, gait motion, in-place motion, and end-effector grasping"],
    ["控制终端", "Control terminal", "触屏遥控器", "Touchscreen remote controller"],
    ["无线网络", "Wireless networking", "Wi-Fi"],
    ["蓝牙", "Bluetooth", "支持", "Supported"],
    ["二次开发", "Secondary development", "支持", "Supported"],
    ["电池能量", "Battery energy", "460 Wh"],
    ["充电器输出", "Charger output", "46 V / 2 A"],
  ],
);

const fourierGR1Seeds: ProductSeed[] = fourierGR1Editions.map((edition) => ({
  id: edition.id,
  companySlug: "fourier-intelligence",
  product: edition.product,
  pageUrl: FOURIER_GR1,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "humanoid-robot",
  useCases: ["research", "service", "integration", "manufacturing"],
  type: l(`GR-1 系列全尺寸人形机器人 ${edition.product}`, `GR-1 series full-size humanoid, ${edition.product}`),
  integration: l("通过以太网连接执行器和整机局域网，手部使用以太网转 RS485；Ubuntu、ROS 2 与二次开发接口用于上层集成。", "Uses Ethernet across actuators and the robot LAN, with Ethernet-to-RS485 for hands; Ubuntu, ROS 2, and development interfaces support upper-level integration."),
  verification: l("核对 L/Pro/末端版本、手部、外壳、相机、软件版本、电池修订、负载姿态、SDK 和现场安全。", "Verify L/Pro/end-effector edition, hands, shell, cameras, software revision, battery revision, load pose, SDK, and site safety."),
  rows: [
    ...fourierGR1CommonRows,
    ...rows(FOURIER_GR1_BROCHURE, l("GR-1 系列官方规格彩页", "Official GR-1 series specification brochure"), l("Model-specific column", "Model-specific column"), [
      ["产品型号", "Product model", edition.product],
      ["臂展", "Arm span", edition.armSpan],
      ["整机质量", "Robot mass", edition.mass, edition.mass.replace("约", "About")],
      ["执行器数量", "Actuator count", edition.actuators],
      ["末端执行器", "End effector", edition.endEffectorZh, edition.endEffectorEn],
      ["深度相机数量", "Depth-camera count", edition.depthCameras],
      ["防护外壳", "Protective shell", edition.shellZh, edition.shellEn],
      ["环形麦克风", "Circular microphone array", edition.pro ? "标配" : "未配备", edition.pro ? "Standard" : "Not installed"],
      ["腰部安全扶手", "Waist safety handle", edition.pro ? "标配" : "未配备", edition.pro ? "Standard" : "Not installed"],
      ["一键启动", "One-button start", edition.pro ? "支持" : "不支持", edition.pro ? "Supported" : "Not supported"],
      ["语音控制", "Voice control", edition.pro ? "支持" : "不支持", edition.pro ? "Supported" : "Not supported"],
      ["集群控制", "Cluster control", edition.pro ? "支持" : "不支持", edition.pro ? "Supported" : "Not supported"],
      ["曲面屏", "Curved display", edition.pro ? "标配" : "未配备", edition.pro ? "Standard" : "Not installed"],
    ]),
    ...rows(FOURIER_GR1, l("GR-1 官方文档中心", "Official GR-1 documentation"), l("Computer parameters", "Computer parameters"), [
      ["操作系统", "Operating system", "Ubuntu 20.04 + ROS 2"],
      ["计算机型号", "Computer model", "ASUS PN64171RZ"],
      ["运行内存", "Memory", "16 GB"],
      ["SSD", "SSD", "512 GB"],
      ["无线标准", "Wireless standards", "IEEE 802.11a/b/g/n/ac，Bluetooth 4.2", "IEEE 802.11a/b/g/n/ac, Bluetooth 4.2"],
      ["外部接口", "External interfaces", "1 × HDMI，3 × Type-C", "1 x HDMI, 3 x Type-C"],
      ["FSA 执行器数量", "FSA actuator count", "32"],
      ["执行器工作电压", "Actuator operating voltage", "12 至 60 V", "12 to 60 V"],
      ["执行器额定电压", "Actuator rated voltage", "46 V"],
      ["执行器最大电流", "Actuator maximum current", "40 A"],
      ["执行标准", "Referenced standards", "GB 17625.1-2012；GB 4943.1-2011；GB/T 9254-2008", "GB 17625.1-2012; GB 4943.1-2011; GB/T 9254-2008"],
      ["组件通信", "Component communication", "以太网；手部为以太网转 RS485", "Ethernet; Ethernet-to-RS485 for hands"],
      ["交换机端口", "Switch ports", "8 个千兆以太网接口", "8 Gigabit Ethernet ports"],
    ]),
    row(FOURIER_GR1, l("GR-1 官方文档中心", "Official GR-1 documentation"), l("Robot specification revision", "Robot specification revision"), "文档版本整机尺寸", "Documentation-revision dimensions", "1650 × 524 × 325 mm", "1650 x 524 x 325 mm", l("与系列彩页的型号表尺寸不同；保留为文档修订口径。", "Differs from the model table in the series brochure and is retained as a documentation-revision figure.")),
    row(FOURIER_GR1, l("GR-1 官方文档中心", "Official GR-1 documentation"), l("Robot specification revision", "Robot specification revision"), "文档版本臂展", "Documentation-revision arm span", "1764 mm", "1764 mm", l("通用文档口径，不覆盖型号彩页臂展。", "Generic documentation figure; it does not overwrite model-specific brochure spans.")),
    row(FOURIER_GR1, l("GR-1 官方文档中心", "Official GR-1 documentation"), l("Robot specification revision", "Robot specification revision"), "文档版本净重", "Documentation-revision net mass", "约 52 kg", "About 52 kg", l("通用文档口径，不覆盖型号彩页质量。", "Generic documentation figure; it does not overwrite model-specific brochure mass.")),
    ...rows(FOURIER_GR1, l("GR-1 官方文档中心", "Official GR-1 documentation"), l("Battery and adapter table", "Battery and adapter table"), [
      ["文档版本电池能量", "Documentation-revision battery energy", "483 Wh"],
      ["电池类型", "Battery type", "锂离子电池", "Lithium-ion"],
      ["电池标称电压", "Battery nominal voltage", "40 V"],
      ["充电限制电压", "Charge-limit voltage", "46 V"],
      ["额定容量原文", "Published rated-capacity field", "5.2 Ah / 112.3 Wh"],
      ["一般续航", "General runtime", "约 60 min", "About 60 min"],
      ["行走续航", "Walking runtime", "约 45 min", "About 45 min"],
      ["充电时间", "Charging time", "315 min"],
      ["适配器输入", "Adapter input", "100-240 V AC，50/60 Hz", "100-240 V AC, 50/60 Hz"],
      ["适配器输出", "Adapter output", "最大 46 V / 2 A", "46 V / 2 A maximum"],
    ]),
  ],
  overview: [l(`${edition.product} 是 GR-1 系列的 ${edition.endEffectorZh} 配置，官方型号彩页给出 ${edition.actuators} 个执行器、${edition.armSpan} 臂展和 ${edition.mass} 质量。`, `${edition.product} is the ${edition.endEffectorEn.toLowerCase()} configuration in the GR-1 series. The official model brochure states ${edition.actuators} actuators, ${edition.armSpan} arm span, and ${edition.mass.replace("约", "about")} mass.`), l("文档中心与型号彩页在尺寸、质量和电池能量上存在修订差异。本仓并列保存并标注来源，不把不同修订混成单一无条件数值。", "The documentation center and model brochure differ in dimensions, mass, and battery energy. Both are retained with provenance rather than merged into one unconditional figure.")],
  applications: [l("科研教育、导览服务、康复交互、工业任务开发与具身模型验证", "Research and education, guidance services, rehabilitation interaction, industrial-task development, and embodied-model validation")],
  coverage: "official-complete",
  sourceLinks: [{ label: l("GR-1 型号彩页", "GR-1 model brochure"), url: FOURIER_GR1_BROCHURE }],
}));

const fourierGR2Joints: DetailedJoint[] = [
  [0, "left_hip_pitch_joint", "left_leg", 2.618, -2.618, 6.4997, 366.05],
  [1, "left_hip_roll_joint", "left_leg", 1.5708, -0.59341, 12.362, 95.472],
  [2, "left_hip_yaw_joint", "left_leg", 1.5708, -0.69813, 14.745, 54.33],
  [3, "left_knee_pitch_joint", "left_leg", 2.3562, -0.087266, 6.4997, 366.05],
  [4, "left_ankle_pitch_joint", "left_leg", 0.7854, -0.7854, 14.745, 54.33],
  [5, "left_ankle_roll_joint", "left_leg", 0.38397, -0.38397, 16.755, 29.835],
  [6, "right_hip_pitch_joint", "right_leg", 2.618, -2.618, 6.4997, 366.05],
  [7, "right_hip_roll_joint", "right_leg", 0.59341, -1.5708, 12.362, 95.472],
  [8, "right_hip_yaw_joint", "right_leg", 0.69813, -1.5708, 14.745, 54.33],
  [9, "right_knee_pitch_joint", "right_leg", 2.3562, -0.087266, 6.4997, 366.05],
  [10, "right_ankle_pitch_joint", "right_leg", 0.7854, -0.7854, 14.745, 54.33],
  [11, "right_ankle_roll_joint", "right_leg", 0.38397, -0.38397, 16.755, 29.835],
  [12, "waist_yaw_joint", "waist", 2.618, -2.618, 7.7568, 74.45],
  [13, "head_yaw_joint", "head", 1.3963, -1.3963, 9.1627, 17.325],
  [14, "head_pitch_joint", "head", 0.5236, -0.5236, 9.1627, 17.325],
  [15, "left_shoulder_pitch_joint", "left_manipulator", 2.9671, -2.9671, 7.7568, 74.45],
  [16, "left_shoulder_roll_joint", "left_manipulator", 2.7925, -0.5236, 7.7568, 74.45],
  [17, "left_shoulder_yaw_joint", "left_manipulator", 1.8326, -1.8326, 6.283, 42.75],
  [18, "left_elbow_pitch_joint", "left_manipulator", 0.47997, -1.5272, 6.283, 42.75],
  [19, "left_wrist_yaw_joint", "left_manipulator", 1.8326, -1.8326, 9.1627, 17.325],
  [20, "left_wrist_pitch_joint", "left_manipulator", 0.61087, -0.61087, 9.1627, 17.325],
  [21, "left_wrist_roll_joint", "left_manipulator", 0.95993, -0.95993, 9.1627, 17.325],
  [22, "right_shoulder_pitch_joint", "right_manipulator", 2.9671, -2.9671, 7.7568, 74.45],
  [23, "right_shoulder_roll_joint", "right_manipulator", 0.5236, -2.7925, 7.7568, 74.45],
  [24, "right_shoulder_yaw_joint", "right_manipulator", 1.8326, -1.8326, 6.283, 42.75],
  [25, "right_elbow_pitch_joint", "right_manipulator", 0.47997, -1.5272, 6.283, 42.75],
  [26, "right_wrist_yaw_joint", "right_manipulator", 1.8326, -1.8326, 9.1627, 17.325],
  [27, "right_wrist_pitch_joint", "right_manipulator", 0.61087, -0.61087, 9.1627, 17.325],
  [28, "right_wrist_roll_joint", "right_manipulator", 0.95993, -0.95993, 9.1627, 17.325],
];

const fourierGR2Seed: ProductSeed = {
  id: "fourier-gr2",
  companySlug: "fourier-intelligence",
  product: "GR-2",
  pageUrl: FOURIER_GR2,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "humanoid-robot",
  useCases: ["research", "service", "manufacturing", "integration"],
  type: l("53 自由度通用人形机器人", "53-DoF general-purpose humanoid"),
  integration: l("Aurora SDK 提供整机关节控制；支持双目视觉、语音、遥操作、以太网、Wi-Fi 6 和可选高算力模块。", "Aurora SDK provides whole-robot joint control with binocular vision, speech, teleoperation, Ethernet, Wi-Fi 6, and optional high-performance compute."),
  verification: l("核对灵巧手自由度、275 TOPS 选件、关节表修订、电池、遥操作终端、负载姿态、接口和安全恢复。", "Verify hand DoF, the 275-TOPS option, joint-table revision, battery, teleoperation terminal, load pose, interfaces, and safety recovery."),
  rows: [
    ...rows(FOURIER_GR2, l("GR-2 官方文档中心", "Official GR-2 documentation"), l("Core specifications, interfaces, and computer performance", "Core specifications, interfaces, and computer performance"), [
      ["整机尺寸", "Robot dimensions", "1750 × 552 × 275 mm"],
      ["本体臂展", "Body arm span", "1520 mm"],
      ["12 自由度灵巧手版臂展", "Arm span with 12-DoF hands", "最高 1920 mm", "Up to 1920 mm"],
      ["大腿与小腿长度", "Thigh and shank length", "465 mm + 378 mm"],
      ["整机净重", "Robot net mass", "约 63 kg", "About 63 kg"],
      ["材料", "Materials", "铝合金与工程塑料", "Aluminum alloy and engineering plastic"],
      ["执行器总数", "Total actuator count", "最高 53 个", "Up to 53"],
      ["单腿自由度", "Degrees of freedom per leg", "6 DoF"],
      ["单臂自由度", "Degrees of freedom per arm", "7 DoF"],
      ["腰部自由度", "Waist degrees of freedom", "1 DoF"],
      ["头部自由度", "Head degrees of freedom", "2 DoF"],
      ["单手基础自由度", "Base degrees of freedom per hand", "6 DoF"],
      ["单手增强自由度", "Enhanced degrees of freedom per hand", "可选 12 DoF", "Optional 12 DoF"],
      ["最大关节峰值扭矩", "Maximum joint peak torque", "436 N·m"],
      ["下肢编码器", "Lower-limb encoders", "23 bit / 23 bit 双编码器", "23-bit / 23-bit dual encoders"],
      ["上肢编码器", "Upper-limb encoders", "24 bit / 24 bit 双编码器", "24-bit / 24-bit dual encoders"],
      ["步行速度", "Walking speed", "5 km/h"],
      ["单手负载", "Single-hand payload", "约 3 kg", "About 3 kg"],
      ["电池类型", "Battery type", "锂离子电池", "Lithium-ion"],
      ["电池能量", "Battery energy", "约 950 Wh", "About 950 Wh"],
      ["续航", "Runtime", "约 2 h", "About 2 h"],
      ["充电时间", "Charging time", "约 2 h", "About 2 h"],
      ["电池总质量", "Total battery mass", "不超过 9 kg", "No more than 9 kg"],
      ["电池标称电压", "Battery nominal voltage", "39.6 V"],
      ["充电限制电压", "Charge-limit voltage", "46.2 V"],
      ["电池循环寿命", "Battery cycle life", "不低于 500 次（80% DOD）", "At least 500 cycles at 80% DOD"],
      ["相机", "Cameras", "双目相机", "Binocular cameras"],
      ["IMU", "IMU", "6 轴，加速度与角速度", "6-axis, acceleration and angular velocity"],
      ["无线急停", "Wireless emergency stop", "1 个", "1"],
      ["本机急停", "Onboard emergency stop", "1 个", "1"],
      ["有线通信", "Wired communication", "Ethernet"],
      ["无线通信", "Wireless communication", "Wi-Fi 6"],
      ["工作温度", "Operating temperature", "0 至 45 °C", "0 to 45 °C"],
      ["工作湿度", "Operating humidity", "20% 至 80% RH（无凝露）", "20% to 80% RH, non-condensing"],
      ["运动控制处理器", "Motion-control processor", "Intel Core i7，14 核 / 18 线程，最高 4.5 GHz", "Intel Core i7, 14 cores / 18 threads, up to 4.5 GHz"],
      ["运动控制内存", "Motion-control memory", "16 GB"],
      ["运动控制存储", "Motion-control storage", "512 GB"],
      ["感知处理器", "Perception processor", "4 × Cortex-A76 + 4 × Cortex-A55，最高 2.4 GHz", "4 x Cortex-A76 + 4 x Cortex-A55, up to 2.4 GHz"],
      ["感知算力", "Perception AI compute", "6 TOPS"],
      ["感知内存", "Perception memory", "8 GB"],
      ["感知存储", "Perception storage", "64 GB"],
      ["有线网络", "Wired networking", "运动与感知模块各 1 × 1000 Mbps", "1 x 1000 Mbps on both motion and perception modules"],
      ["Type-C", "USB Type-C", "支持扩展 USB 与 HDMI", "Supports USB and HDMI expansion"],
      ["百兆以太网", "100-Mbps Ethernet", "1 个", "1"],
      ["千兆以太网", "Gigabit Ethernet", "1 个", "1"],
      ["USB 3.0", "USB 3.0", "1 个", "1"],
      ["外部供电", "External power output", "16 V DC / 6 A"],
    ]),
    ...rows("https://www.fftai.cn/uploads/upload/files/20250515/a38248c9edb2fe61a88efa1f05718607.pdf", l("GR-2 官方规格彩页", "Official GR-2 specification brochure"), l("Options and adapter specifications", "Options and adapter specifications"), [
      ["高算力模块", "High-performance compute option", "可选 275 TOPS", "Optional 275 TOPS"],
      ["额定功率", "Rated power", "约 930 W", "About 930 W"],
      ["适配器输入", "Adapter input", "90-260 V AC，50/60 Hz", "90-260 V AC, 50/60 Hz"],
      ["适配器输出", "Adapter output", "最大 46 V / 13 A", "46 V / 13 A maximum"],
      ["操作系统", "Operating system", "Ubuntu 20.04"],
      ["遥操作", "Teleoperation", "Pico / Vision Pro 沉浸式遥操作", "Pico / Vision Pro immersive teleoperation"],
      ["语音交互", "Speech interaction", "支持回声消除与语音交互", "Echo cancellation and speech interaction supported"],
    ]),
    ...detailedJointRows(FOURIER_GR2, l("GR-2 官方文档中心", "Official GR-2 documentation"), l("Joint limits table", "Joint limits table"), fourierGR2Joints),
  ],
  overview: [l("GR-2 是约 1.75 m、63 kg 的通用人形机器人，基础本体与可选 12 自由度灵巧手组合后最高 53 个执行器。", "GR-2 is an approximately 1.75 m, 63 kg general humanoid; the base body with optional 12-DoF hands reaches up to 53 actuators."), l("官方关节表公开 29 个本体关节的位置、速度和扭矩上限。本仓逐单元记录；这些是机械/控制限位，不等同于连续额定工况。", "The official joint table publishes position, velocity, and torque limits for 29 body joints. Each cell is indexed here; these are mechanical/control limits rather than continuous ratings.")],
  applications: [l("科研教育、双臂操作、遥操作、制造、康复交互和具身模型开发", "Research and education, bimanual manipulation, teleoperation, manufacturing, rehabilitation interaction, and embodied-model development")],
  coverage: "official-complete",
};

const fourierGR3Joints: DetailedJoint[] = [
  [0, "left_hip_pitch_joint", "left_leg", 2.618, -2.618, 6.49, 366],
  [1, "left_hip_roll_joint", "left_leg", 1.5708, -0.17453, 12.985, 140.4],
  [2, "left_hip_yaw_joint", "left_leg", 1.5708, -0.69813, 12.985, 140.4],
  [3, "left_knee_pitch_joint", "left_leg", 2.3562, 0, 6.49, 366],
  [4, "left_ankle_pitch_joint", "left_leg", 0.7854, -0.7854, 16.76, 59.4],
  [5, "left_ankle_roll_joint", "left_leg", 0.43633, -0.43633, 16.76, 59.4],
  [6, "right_hip_pitch_joint", "right_leg", 2.618, -2.618, 6.49, 366],
  [7, "right_hip_roll_joint", "right_leg", 0.17453, -1.5708, 12.985, 140.4],
  [8, "right_hip_yaw_joint", "right_leg", 0.69813, -1.5708, 12.985, 140.4],
  [9, "right_knee_pitch_joint", "right_leg", 2.3562, 0, 6.49, 366],
  [10, "right_ankle_pitch_joint", "right_leg", 0.7854, -0.7854, 16.76, 59.4],
  [11, "right_ankle_roll_joint", "right_leg", 0.43633, -0.43633, 16.76, 59.4],
  [12, "waist_yaw_joint", "waist", 2.618, -2.618, 12.985, 140.4],
  [13, "waist_roll_joint", "waist", 0.17453, -0.17453, 14.77, 108.6],
  [14, "waist_pitch_joint", "waist", 0.5236, -0.20944, 14.77, 108.6],
  [15, "head_yaw_joint", "head", 1.3963, -1.3963, 9.21, 17.4],
  [16, "head_pitch_joint", "head", 0.5236, -0.5236, 9.21, 17.4],
  [17, "left_shoulder_pitch_joint", "left_manipulator", 2.9671, -2.9671, 7.75, 74.4],
  [18, "left_shoulder_roll_joint", "left_manipulator", 1.9199, -0.2618, 7.75, 74.4],
  [19, "left_shoulder_yaw_joint", "left_manipulator", 1.8326, -1.8326, 6.28, 42.9],
  [20, "left_elbow_pitch_joint", "left_manipulator", 0.087266, -2.2689, 6.28, 42.9],
  [21, "left_wrist_yaw_joint", "left_manipulator", 1.8326, -1.8326, 6.28, 42.9],
  [22, "left_wrist_pitch_joint", "left_manipulator", 1.309, -0.87266, 9.2153, 17.4],
  [23, "left_wrist_roll_joint", "left_manipulator", 1.2217, -1.0472, 9.2153, 17.4],
  [24, "right_shoulder_pitch_joint", "right_manipulator", 2.9671, -2.9671, 7.75, 74.4],
  [25, "right_shoulder_roll_joint", "right_manipulator", 0.2618, -1.9199, 7.75, 74.4],
  [26, "right_shoulder_yaw_joint", "right_manipulator", 1.8326, -1.8326, 6.28, 42.9],
  [27, "right_elbow_pitch_joint", "right_manipulator", 0.087266, -2.2689, 6.28, 42.9],
  [28, "right_wrist_yaw_joint", "right_manipulator", 1.8326, -1.8326, 6.28, 42.9],
  [29, "right_wrist_pitch_joint", "right_manipulator", 1.309, -0.87266, 9.2153, 17.4],
  [30, "right_wrist_roll_joint", "right_manipulator", 1.0472, -1.2217, 9.2153, 17.4],
];

const fourierGR3CommonRows = [
  ...rows(FOURIER_GR3, l("GR-3 官方文档中心", "Official GR-3 documentation"), l("Core specification table and body interfaces", "Core specification table and body interfaces"), [
    ["整机尺寸", "Robot dimensions", "1642 × 552 × 292 mm"],
    ["本体臂展", "Body arm span", "1395 mm"],
    ["12 自由度灵巧手版臂展", "Arm span with 12-DoF hands", "最高 1759 mm", "Up to 1759 mm"],
    ["大腿与小腿长度", "Thigh and shank length", "425 mm + 408 mm"],
    ["整机净重", "Robot net mass", "约 71 kg", "About 71 kg"],
    ["材料", "Materials", "铝合金、工程塑料与软包材料", "Aluminum alloy, engineering plastic, and soft covering"],
    ["标称电压", "Nominal voltage", "46.8 V"],
    ["额定功率", "Rated power", "约 936 W", "About 936 W"],
    ["文档步行速度", "Documentation walking speed", "6.1 km/h"],
    ["单手负载", "Single-hand payload", "约 3 kg", "About 3 kg"],
    ["执行器总数", "Total actuator count", "最高 55 个", "Up to 55"],
    ["最大关节峰值扭矩", "Maximum joint peak torque", "440 N·m"],
    ["头部自由度", "Head degrees of freedom", "2 DoF"],
    ["单腿自由度", "Degrees of freedom per leg", "6 DoF"],
    ["腰部自由度", "Waist degrees of freedom", "3 DoF"],
    ["单臂自由度", "Degrees of freedom per arm", "7 DoF"],
    ["单手基础自由度", "Base degrees of freedom per hand", "6 DoF"],
    ["单手增强自由度", "Enhanced degrees of freedom per hand", "可选 12 DoF", "Optional 12 DoF"],
    ["足部编码器", "Foot encoders", "支持绝对编码器", "Absolute encoders supported"],
    ["有线通信", "Wired communication", "Ethernet"],
    ["主电池能量", "Main-battery energy", "702 Wh"],
    ["辅助电池能量", "Auxiliary-battery energy", "234 Wh"],
    ["电池类型", "Battery type", "锂离子电池", "Lithium-ion"],
    ["主电池质量", "Main-battery mass", "3.8 kg"],
    ["辅助电池质量", "Auxiliary-battery mass", "1.3 kg"],
    ["电池标称电压", "Battery nominal voltage", "46.8 V"],
    ["充电限制电压", "Charge-limit voltage", "54.6 V"],
    ["电池循环寿命", "Battery cycle life", "不低于 500 次（80% DOD）", "At least 500 cycles at 80% DOD"],
    ["续航", "Runtime", "约 3 h", "About 3 h"],
    ["充电时间", "Charging time", "约 1.5 h", "About 1.5 h"],
    ["热插拔", "Hot swap", "支持", "Supported"],
    ["充电器输入", "Charger input", "90-260 V AC，50/60 Hz", "90-260 V AC, 50/60 Hz"],
    ["充电器输出", "Charger output", "最大 54.6 V / 12 A", "54.6 V / 12 A maximum"],
    ["操作系统", "Operating system", "Ubuntu 22.04"],
    ["处理器", "Processor", "AMD Ryzen 7 8845HS"],
    ["I/O", "I/O", "Type-C、USB 3.0、RJ45", "Type-C, USB 3.0, RJ45"],
    ["遥操作", "Teleoperation", "Pico / Vision Pro / Quest 沉浸式遥操作", "Pico / Vision Pro / Quest immersive teleoperation"],
    ["语音功能", "Speech functions", "回声消除、声源定位与语音对话", "Echo cancellation, sound-source localization, and speech dialogue"],
    ["文档相机", "Documentation camera", "单目相机", "Monocular camera"],
    ["IMU", "IMU", "6 轴，加速度与角速度", "6-axis, acceleration and angular velocity"],
    ["麦克风", "Microphone", "360° 全向收声", "360-degree omnidirectional pickup"],
    ["扬声器", "Speaker", "最大 15 W，可调音量", "Up to 15 W, adjustable volume"],
    ["触觉", "Tactile sensing", "支持", "Supported"],
    ["外部供电", "External power output", "19 V / 3 A"],
    ["外部急停接口", "External emergency-stop interface", "支持", "Supported"],
    ["千兆以太网", "Gigabit Ethernet", "1 个", "1"],
  ]),
  ...rows("https://support.fftai.com/en/getting-started/general-information", l("GR-3 当前官方英文文档", "Current official English GR-3 documentation"), l("Development board and environment", "Development board and environment"), [
    ["开发主机", "Development computer", "E-Sports D70"],
    ["集成显卡", "Integrated GPU", "AMD Radeon 780M"],
    ["三级缓存", "L3 cache", "16 MB"],
    ["开发主机内存", "Development-computer memory", "32 GB"],
    ["开发主机存储", "Development-computer storage", "1 TB"],
    ["无线网络", "Wireless networking", "Wi-Fi 6"],
    ["工作温度", "Operating temperature", "0 至 45 °C", "0 to 45 °C"],
    ["工作湿度", "Operating humidity", "20% 至 80%（无凝露）", "20% to 80%, non-condensing"],
  ]),
  ...detailedJointRows(FOURIER_GR3, l("GR-3 官方文档中心", "Official GR-3 documentation"), l("Joint limits table", "Joint limits table"), fourierGR3Joints),
];

const fourierGR3Seeds: ProductSeed[] = [
  {
    id: "fourier-gr3",
    companySlug: "fourier-intelligence",
    product: "GR-3",
    pageUrl: FOURIER_GR3_SERIES,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "humanoid-robot",
    useCases: ["service", "research", "integration"],
    type: l("交互陪伴导向的全尺寸 Care-bot 人形机器人", "Full-size Care-bot humanoid oriented to interaction and companionship"),
    integration: l("结合全感交互、软包本体、语音、视觉、触觉、双电池热插拔与沉浸式遥操作。", "Combines full-sense interaction, soft body covering, speech, vision, touch, dual hot-swappable batteries, and immersive teleoperation."),
    verification: l("核对 6/12 自由度手、视觉模块、31 点触觉、语音模型、软包维护、续航、数据隐私和目标人群安全。", "Verify 6/12-DoF hands, vision module, 31-point touch array, speech model, covering maintenance, runtime, data privacy, and target-user safety."),
    rows: [
      ...fourierGR3CommonRows,
      ...rows(FOURIER_GR3_SERIES, l("GR-3 系列官方产品页", "Official GR-3 series product page"), l("GR-3 interaction configuration", "GR-3 interaction configuration"), [
        ["产品定位", "Product positioning", "交互服务 / Care-bot", "Interactive service / Care-bot"],
        ["官网身高", "Product-page height", "165 cm"],
        ["官网体重", "Product-page mass", "71 kg"],
        ["官网步行速度", "Product-page walking speed", "5.5 km/h"],
        ["官网续航", "Product-page runtime", "3 h"],
        ["官网自由度", "Product-page degrees of freedom", "55 DoF"],
        ["视觉模块", "Vision module", "3D 视觉与深度 AI 相机组合", "3D vision and depth-AI camera combination"],
        ["麦克风阵列", "Microphone array", "4 麦克风", "Four microphones"],
        ["触觉传感器总数", "Total tactile sensors", "31 个", "31"],
        ["头部触觉传感器", "Head tactile sensors", "16 个", "16"],
        ["躯干触觉传感器", "Torso tactile sensors", "15 个", "15"],
        ["表层面料", "Surface material", "Alcantara"],
        ["软包填充", "Soft-cover filling", "GFOAM 固特棉", "GFOAM foamed material"],
        ["框架结构", "Frame structure", "铝合金与工程塑料", "Aluminum alloy and engineering plastic"],
      ]),
      row("https://www.fftai.com/uploads/upload/files/20251022/425294838296d52b62b802c68128c30f.pdf", l("GR-3 系列官方彩页", "Official GR-3 series brochure"), l("General technical specifications", "General technical specifications"), "彩页 12 自由度灵巧手版臂展", "Brochure arm span with 12-DoF hands", "最高 1795 mm", "Up to 1795 mm", l("与文档中心 1759 mm 不同；保留两种官方修订。", "Differs from the documentation-center figure of 1759 mm; both official revisions are retained.")),
    ],
    overview: [l("GR-3 是以交互服务和陪伴为主的第三代人形机器人，官网公开 55 自由度、3 kg 单手负载、双电池热插拔及听觉、视觉、触觉组合。", "GR-3 is a third-generation humanoid focused on interactive service and companionship; official material publishes 55 DoF, 3 kg single-arm payload, dual hot-swappable batteries, and combined hearing, vision, and touch."), l("系列页给出 5.5 km/h，而文档中心给出 6.1 km/h；彩页和文档对带灵巧手臂展也有 1795/1759 mm 差异。本仓保留两种修订，不将较大值默认视为当前交付值。", "The series page states 5.5 km/h while the documentation center states 6.1 km/h; brochure and documentation also differ at 1795/1759 mm for arm span with hands. Both revisions are retained, and the larger value is not assumed to be the delivered specification.")],
    applications: [l("公共空间交互、康养陪伴、教育研究、导览和人机交互开发", "Public-space interaction, wellness companionship, education/research, guidance, and human-robot interaction development")],
    coverage: "official-complete",
  },
  {
    id: "fourier-gr3c",
    companySlug: "fourier-intelligence",
    product: "GR-3C",
    pageUrl: FOURIER_GR3C,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "humanoid-robot",
    useCases: ["manufacturing", "service", "research", "integration"],
    type: l("功能服务导向、增强外壳的人形机器人", "Function-service humanoid with reinforced shell"),
    integration: l("在 GR-3 技术底座上增加激光雷达、硬质增强外壳和 LED 环屏头域，可选视觉模块、12 自由度灵巧手和全身遥操作。", "Adds LiDAR, a reinforced hard shell, and an LED ring-display head to the GR-3 technical base, with optional vision modules, 12-DoF hands, and whole-body teleoperation."),
    verification: l("确认报价是否包含激光雷达、视觉、头域、灵巧手、遥操作、外壳等级和对应软件；不得把可选项当标配。", "Confirm whether the quote includes LiDAR, vision, head module, hands, teleoperation, shell rating, and corresponding software; do not treat options as standard."),
    rows: [
      ...fourierGR3CommonRows,
      ...rows(FOURIER_GR3C, l("GR-3C 官方产品页", "Official GR-3C product page"), l("GR-3C configuration", "GR-3C configuration"), [
        ["产品定位", "Product positioning", "功能服务", "Functional service"],
        ["外壳", "Shell", "强化铝合金与工程塑料硬质外壳", "Reinforced aluminum-alloy and engineering-plastic hard shell"],
        ["头域显示", "Head display", "LED 环屏，可扩展表情、数据与任务界面", "LED ring display for expression, data, and task interfaces"],
        ["激光雷达", "LiDAR", "在 GR-3C 系列配置中提供", "Provided in the GR-3C series configuration"],
        ["头域模组", "Head module", "可定制", "Customizable"],
        ["视觉模组", "Vision module", "可定制", "Customizable"],
        ["末端扩展", "End-effector expansion", "可升级 12 自由度灵巧手", "Upgradeable to 12-DoF dexterous hands"],
        ["全身遥操作", "Whole-body teleoperation", "支持多种控制终端", "Supports multiple control terminals"],
      ]),
    ],
    overview: [l("GR-3C 与 GR-3 共享第三代本体参数，但面向功能服务，采用强化硬质外壳、环形显示头域并增加激光雷达配置。", "GR-3C shares the third-generation body specifications with GR-3 but targets functional service with a reinforced hard shell, ring-display head, and LiDAR configuration."), l("头域、视觉、灵巧手和遥操作存在定制项。搜索命中代表该系列可配置，不代表某台基础交付机器已经安装。", "Head, vision, hand, and teleoperation modules include custom options. A search match means the series can be configured that way, not that every base unit includes it.")],
    applications: [l("工业装配、远程巡检、科研开发、康养服务和公共空间任务", "Industrial assembly, remote inspection, research and development, wellness service, and public-space tasks")],
    coverage: "official-complete",
  },
];

const fourierN1Joints: DetailedJoint[] = [
  [1, "left_hip_pitch_joint", "left_leg", 2.617, -2.617, 16.2, 90],
  [2, "left_hip_roll_joint", "left_leg", 1.57, -0.261, 14.738, 54],
  [3, "left_hip_yaw_joint", "left_leg", 2.617, -2.617, 14.738, 54],
  [4, "left_knee_pitch_joint", "left_leg", 2.356, -0.0872, 16.2, 90],
  [5, "left_ankle_roll_joint", "left_leg", 0.436, -0.436, 16.747, 30],
  [6, "left_ankle_pitch_joint", "left_leg", 0.436, -0.436, 16.747, 30],
  [7, "right_hip_pitch_joint", "right_leg", 2.617, -2.617, 16.2, 90],
  [8, "right_hip_roll_joint", "right_leg", 0.261, -1.57, 14.738, 54],
  [9, "right_hip_yaw_joint", "right_leg", 2.617, -2.617, 14.738, 54],
  [10, "right_knee_pitch_joint", "right_leg", 2.356, -0.0872, 16.2, 90],
  [11, "right_ankle_roll_joint", "right_leg", 0.436, -0.436, 16.747, 30],
  [12, "right_ankle_pitch_joint", "right_leg", 0.436, -0.436, 16.747, 30],
  [13, "waist_yaw_joint", "waist", 2.617, -2.617, 14.738, 54],
  [14, "left_shoulder_pitch_joint", "left_manipulator", 2.966, -2.966, 14.738, 54],
  [15, "left_shoulder_roll_joint", "left_manipulator", 2.792, -0.174, 16.747, 30],
  [16, "left_shoulder_yaw_joint", "left_manipulator", 1.832, -1.832, 16.747, 30],
  [17, "left_elbow_pitch_joint", "left_manipulator", 1.658, -0.349, 16.747, 30],
  [18, "left_wrist_yaw_joint", "left_manipulator", 1.832, -1.832, 16.747, 30],
  [19, "right_shoulder_pitch_joint", "right_manipulator", 2.966, -2.966, 14.738, 54],
  [20, "right_shoulder_roll_joint", "right_manipulator", 0.174, -2.792, 16.747, 30],
  [21, "right_shoulder_yaw_joint", "right_manipulator", 1.832, -1.832, 16.747, 30],
  [22, "right_elbow_pitch_joint", "right_manipulator", 1.658, -0.349, 16.747, 30],
  [23, "right_wrist_yaw_joint", "right_manipulator", 1.832, -1.832, 16.747, 30],
];

const fourierN1Seed: ProductSeed = {
  id: "fourier-n1",
  companySlug: "fourier-intelligence",
  product: "Fourier N1",
  pageUrl: FOURIER_N1,
  category: "robot-platform",
  primary: "robot-platform",
  subclass: "humanoid-robot",
  useCases: ["research", "integration"],
  type: l("23 自由度开源人形机器人平台", "23-DoF open-source humanoid platform"),
  integration: l("开放 BOM、结构图纸、装配指南、基础软件与通信接口；Aurora SDK 支持整机关节级开发。", "Opens the BOM, mechanical drawings, assembly guide, base software, and communication interfaces; Aurora SDK supports joint-level development."),
  verification: l("核对开源资源版本、当前整机修订、关节表、视觉选件、策略/训练框架开放状态、电池和安全测试。", "Verify open-resource revision, current body revision, joint table, vision option, policy/training-framework availability, battery, and safety testing."),
  rows: [
    ...rows(FOURIER_N1_DOC, l("Fourier N1 官方文档中心", "Official Fourier N1 documentation"), l("Core specifications and computer performance", "Core specifications and computer performance"), [
      ["文档版本整机尺寸", "Documentation-revision dimensions", "1245 × 441 × 202 mm"],
      ["文档版本臂展", "Documentation-revision arm span", "1240 mm"],
      ["文档版本净重", "Documentation-revision net mass", "约 39 kg", "About 39 kg"],
      ["材料", "Materials", "铝合金与工程塑料", "Aluminum alloy and engineering plastic"],
      ["额定电压", "Rated voltage", "39.6 V"],
      ["额定功率", "Rated power", "约 460 W", "About 460 W"],
      ["步行速度", "Walking speed", "2.7 km/h"],
      ["文档奔跑速度", "Documentation running speed", "10.8 km/h"],
      ["执行器总数", "Total actuator count", "23"],
      ["总自由度", "Total degrees of freedom", "23 DoF"],
      ["头部自由度", "Head degrees of freedom", "0 DoF，可扩展视觉", "0 DoF, vision-expandable"],
      ["单臂自由度", "Degrees of freedom per arm", "5 DoF"],
      ["腰部自由度", "Waist degrees of freedom", "1 DoF"],
      ["单腿自由度", "Degrees of freedom per leg", "6 DoF"],
      ["最大关节峰值扭矩", "Maximum joint peak torque", "144 N·m"],
      ["执行器工作电压", "Actuator operating voltage", "24 至 60 V", "24 to 60 V"],
      ["执行器额定电压", "Actuator rated voltage", "46 V"],
      ["双编码器", "Dual encoders", "16 bit / 14 bit"],
      ["关节通信", "Joint communication", "Ethernet"],
      ["电池类型", "Battery type", "锂离子电池", "Lithium-ion"],
      ["电池能量", "Battery energy", "475 Wh"],
      ["电池质量", "Battery mass", "不超过 3.2 kg", "No more than 3.2 kg"],
      ["电池标称电压", "Battery nominal voltage", "39.6 V"],
      ["充电限制电压", "Charge-limit voltage", "46.2 V"],
      ["循环寿命", "Cycle life", "25 °C、10 A 放电条件下超过 800 次，SOH 80%", "More than 800 cycles at 25 °C and 10 A discharge, SOH 80%"],
      ["续航", "Runtime", "约 2 h", "About 2 h"],
      ["充电时间", "Charging time", "约 3.5 h", "About 3.5 h"],
      ["适配器输入", "Adapter input", "100-240 V AC，50/60 Hz", "100-240 V AC, 50/60 Hz"],
      ["适配器输出", "Adapter output", "46 V / 4 A"],
      ["操作系统", "Operating system", "Ubuntu 22.04"],
      ["处理器", "Processor", "Intel Core i7-13700H"],
      ["计算机核心", "CPU configuration", "8 核高性能 CPU", "8-core high-performance CPU"],
      ["内存", "Memory", "16 GB"],
      ["存储", "Storage", "512 GB NVMe"],
      ["I/O", "I/O", "HDMI、Type-C、Type-A", "HDMI, Type-C, Type-A"],
      ["有线网络", "Wired networking", "100 / 1000 / 2500 Mbps"],
      ["无线网络", "Wireless networking", "Wi-Fi 6"],
      ["相机", "Camera", "双目深度相机，选配", "Binocular depth camera, optional"],
      ["IMU", "IMU", "6 轴，加速度与角速度", "6-axis, acceleration and angular velocity"],
      ["电池开关", "Battery switch", "1 个", "1"],
      ["系统开关", "System switch", "1 个", "1"],
      ["充电接口", "Charging port", "1 个", "1"],
    ]),
    ...rows(FOURIER_N1, l("Fourier N1 官方产品页", "Official Fourier N1 product page"), l("Public product summary and open resources", "Public product summary and open resources"), [
      ["产品页身高", "Product-page height", "130 cm"],
      ["产品页质量", "Product-page mass", "38 kg"],
      ["产品页最高稳定速度", "Product-page maximum stable speed", "3.5 m/s"],
      ["连续运行时间", "Continuous runtime", "超过 2 h", "More than 2 h"],
      ["可用坡度", "Traversable slope", "15° 至 20°", "15° to 20°"],
      ["可攀爬台阶高度", "Climbable step height", "20 cm"],
      ["开放硬件资源", "Open hardware resources", "BOM、结构图纸、装配指南与操作演示", "BOM, mechanical drawings, assembly guide, and operating demonstrations"],
      ["开放软件资源", "Open software resources", "基础操作软件与通信接口", "Base operating software and communication interfaces"],
      ["推理代码与训练框架", "Inference code and training framework", "计划逐步开放", "Planned for phased release"],
    ]),
    ...detailedJointRows(FOURIER_N1_DOC, l("Fourier N1 官方文档中心", "Official Fourier N1 documentation"), l("Joint limits table", "Joint limits table"), fourierN1Joints),
  ],
  overview: [l("Fourier N1 是面向具身研究的 23 自由度开放人形平台。官网产品页与文档中心分别给出 130 cm/38 kg 和 1245 mm/39 kg 的修订口径。", "Fourier N1 is a 23-DoF open humanoid for embodied research. The product page and documentation center state revision-specific figures of 130 cm/38 kg and 1245 mm/39 kg, respectively."), l("硬件资源和基础软件已公开，但推理代码与训练框架被描述为逐步开放。开源标签不能替代对仓库版本、许可证、已发布文件和可复现性的核验。", "Hardware resources and base software are open, while inference code and training frameworks are described as phased releases. The open-source label does not replace verification of repository revision, license, released files, and reproducibility.")],
  applications: [l("运动控制、强化学习、多模态集成、开源硬件复刻和具身算法研究", "Motion control, reinforcement learning, multimodal integration, open-hardware replication, and embodied-algorithm research")],
  coverage: "official-complete",
  sourceLinks: [{ label: l("N1 文档中心", "N1 documentation"), url: FOURIER_N1_DOC }],
};

const fourierSupportingSeeds: ProductSeed[] = [
  {
    id: "fourier-grw",
    companySlug: "fourier-intelligence",
    product: "GRW",
    pageUrl: FOURIER_GRW,
    category: "robot-platform",
    primary: "robot-platform",
    subclass: "mobile-manipulator-base",
    useCases: ["manufacturing", "logistics", "service", "integration"],
    type: l("轮式升降双臂移动操作机器人", "Wheeled height-adjustable dual-arm mobile manipulator"),
    integration: l("集成 360° 自主导航、双臂、可更换夹爪/吸盘/灵巧手、视觉任务编程和 FOCUS 机群系统。", "Integrates 360-degree autonomous navigation, dual arms, interchangeable grippers/suction cups/hands, visual task programming, and the FOCUS fleet system."),
    verification: l("核对 16 kg 负载定义、升降高度、末端、导航传感、安全等级、换电站、精度条件、接口及 FOCUS 许可。", "Verify the 16 kg payload definition, lift height, end effectors, navigation sensing, safety rating, battery station, repeatability conditions, interfaces, and FOCUS licensing."),
    rows: rows(FOURIER_GRW, l("GRW 官方产品页", "Official GRW product page"), l("Published performance summary", "Published performance summary"), [
      ["高度范围", "Height range", "116 至 165 cm", "116 to 165 cm"],
      ["整机质量", "Robot mass", "160 kg"],
      ["本体自由度", "Body degrees of freedom", "29 DoF（不含末端）", "29 DoF excluding end effectors"],
      ["最大工作高度", "Maximum working height", "2 m"],
      ["双臂稳定负载", "Stable dual-arm payload", "最高 16 kg", "Up to 16 kg"],
      ["工作可达", "Working reach", "接近 2 m", "Nearly 2 m"],
      ["重复精度", "Repeatability", "不超过 0.1 mm", "No more than 0.1 mm"],
      ["转弯直径", "Turning diameter", "895 mm"],
      ["运行时间", "Operating time", "最高 4 h", "Up to 4 h"],
      ["最高速度", "Maximum speed", "1.5 m/s"],
      ["导航", "Navigation", "360° 自主导航与智能避障", "360-degree autonomous navigation and intelligent obstacle avoidance"],
      ["电池", "Battery", "自主热插拔", "Autonomous hot swap"],
      ["安全功能", "Safety functions", "断电制动、防倾倒与快速故障响应", "Power-loss braking, anti-tip protection, and rapid fault response"],
      ["末端选项", "End-effector options", "三指夹爪、桨式夹爪、两指夹爪、灵巧手与吸盘", "Three-finger, paddle, and two-finger grippers, dexterous hands, and suction cups"],
      ["任务编程", "Task programming", "可视化拖拽编程", "Visual drag-and-drop programming"],
      ["机群系统", "Fleet system", "FOCUS"],
    ]),
    overview: [l("GRW 是傅利叶当前公开的轮式双臂移动操作平台，面向搬运、辅助、康复照护和轻制造。", "GRW is Fourier's current wheeled dual-arm mobile-manipulation platform for handling, assistance, rehabilitation care, and light manufacturing."), l("当前产品页公开了尺寸级别、质量、自由度、负载、可达、精度、速度与续航等筛选字段，但未给出完整关节、传感器、电池容量或认证表，因此标为官方公开不完整。", "The current page publishes size, mass, DoF, payload, reach, repeatability, speed, and runtime for screening but not a complete joint, sensor, battery-capacity, or certification table, so coverage remains officially partial.")],
    applications: [l("康复辅助、养老照护、仓储物流、轻制造、物料搬运和移动双臂操作", "Rehabilitation assistance, eldercare, warehousing and logistics, light manufacturing, material handling, and mobile dual-arm manipulation")],
    coverage: "official-partial",
  },
  {
    id: "fourier-fdh6",
    companySlug: "fourier-intelligence",
    product: "FDH-6",
    pageUrl: FOURIER_FDH6,
    category: "end-effector",
    primary: "manipulator-end-effector",
    subclass: "dexterous-hand",
    useCases: ["research", "manufacturing", "service", "integration"],
    type: l("六自由度仿生灵巧手", "Six-DoF biomimetic dexterous hand"),
    integration: l("配套 SDK 与上位机，面向机器人末端快速部署。", "Includes an SDK and host software for rapid robot end-effector deployment."),
    verification: l("核对左右手、接口、电压、电流、抓力、速度、负载、安装法兰、寿命测试工况和 SDK 版本。", "Verify left/right hand, interfaces, voltage, current, grip force, speed, payload, mounting flange, life-test conditions, and SDK revision."),
    rows: rows(FOURIER_FDH6, l("FDH-6 官方产品页", "Official FDH-6 product page"), l("Published specification highlights", "Published specification highlights"), [
      ["整手质量", "Hand mass", "515 g"],
      ["自由度", "Degrees of freedom", "6 DoF"],
      ["骨架与表面材料", "Frame and surface materials", "铝合金、铜合金与硅胶", "Aluminum alloy, copper alloy, and silicone"],
      ["指尖重复定位精度", "Fingertip repeatability", "0.5 mm"],
      ["公开稳定运行测试", "Published stable-operation test", "30 万次", "300,000 cycles"],
      ["连续作业表述", "Continuous-operation statement", "7 × 24 h"],
      ["开发支持", "Development support", "SDK 与上位机", "SDK and host software"],
    ]),
    overview: [l("FDH-6 是 515 g、6 自由度的机器人灵巧手，官网公开材料与指尖重复定位精度及测试次数。", "FDH-6 is a 515 g, six-DoF robot hand; the official page publishes materials, fingertip repeatability, and a test-cycle count."), l("官网尚未披露抓力、额定负载、开合速度、电气和通信接口的结构化表，因此这些字段不以推测值补入。", "The official page does not yet disclose a structured table for grip force, rated payload, open/close speed, electrical data, or communication interfaces, so no inferred values are added.")],
    applications: [l("精细抓取、机器人研究、智能服务、制造操作和末端集成", "Precision grasping, robotics research, intelligent service, manufacturing manipulation, and end-effector integration")],
    coverage: "official-complete",
  },
  capabilitySeed(
    "fourier-galileo",
    "fourier-intelligence",
    "Galileo",
    FOURIER_GALILEO,
    "model-software",
    "software-tools",
    "development-tool",
    l("机器人运动量化、训练与评估系统", "Robot motion quantification, training, and evaluation system"),
    [l("Galileo 用于运动量化评估、训练和人形机器人控制验证，并与傅利叶机器人实验室和开发流程结合。", "Galileo supports motion quantification, training, and humanoid-control validation within Fourier's laboratory and development workflow."), l("公开页面未提供统一的硬件清单、采样规格、软件接口、许可和当前可交付配置表。", "The public page does not provide a unified hardware list, sampling specification, software interface, licensing, or currently deliverable configuration table.")],
    [l("运动评估、机器人训练、康复和算法验证", "Motion assessment, robot training, rehabilitation, and algorithm validation")],
    l("与傅利叶机器人、运动捕捉、训练数据和评估软件组合。", "Combines with Fourier robots, motion capture, training data, and evaluation software."),
    l("确认系统版本、传感器、采样率、精度、同步、数据格式、API、许可和适用对象。", "Confirm system revision, sensors, sample rate, accuracy, synchronization, data formats, APIs, licensing, and intended subjects."),
    ["research", "service", "integration"],
  ),
  capabilitySeed(
    "fourier-actionnet",
    "fourier-intelligence",
    "Fourier ActionNet",
    FOURIER_ACTIONNET,
    "model-software",
    "software-tools",
    "robot-model",
    l("GRx 系列全尺寸人形机器人操作数据集与工具链", "GRx full-size humanoid manipulation dataset and toolchain"),
    [l("ActionNet 记录 GRx 系列在真实环境中的取放、倾倒和工具操作数据，并公开数据质量评估与工具链方向。", "ActionNet records GRx pick-and-place, pouring, and tool-use data in real environments and publishes a data-quality evaluation and toolchain direction."), l("数据集任务覆盖不等同于任意新对象、环境或机器人上的成功率；应核对版本、许可、样本分布和评测协议。", "Dataset task coverage does not establish success on arbitrary new objects, environments, or robots; verify revision, license, sample distribution, and evaluation protocol.")],
    [l("模仿学习、操作策略、数据评估和跨 GRx 型号研究", "Imitation learning, manipulation policies, data evaluation, and cross-GRx research")],
    l("与 GRx 本体、遥操作、数据采集、DP、ACT、iDP3 等基准和训练工具连接。", "Connects GRx robots, teleoperation, data collection, DP, ACT, iDP3, and training tools."),
    l("核对下载内容、许可证、数据量、频率、传感模态、任务分布、训练/测试划分、标定和复现脚本。", "Verify downloads, license, volume, frequency, sensor modalities, task distribution, train/test split, calibration, and reproduction scripts."),
    ["research", "integration"],
  ),
  {
    ...capabilitySeed(
      "fourier-rehabhub",
      "fourier-intelligence",
      "RehabHub",
      FOURIER_REHAB,
      "robot-platform",
      "robot-platform",
      "rehabilitation-robot",
      l("覆盖全周期康复训练的机器人产品与解决方案系列", "Robot-product and solution family spanning rehabilitation training cycles"),
      [l("RehabHub 汇集上肢、下肢、手部、认知、评估和康复管理产品，并与医院及康复机构工作流结合。", "RehabHub combines upper-limb, lower-limb, hand, cognitive, assessment, and rehabilitation-management products with clinical workflows."), l("官网称该体系整合 30 余款康复产品；当前仓库尚未逐 SKU 拆分，因此这是一条系列记录而非全型号完成声明。", "The company states that the system integrates more than 30 rehabilitation products. These are not yet split SKU by SKU in this repository, so this is a family record rather than a complete-model claim.")],
      [l("神经、骨科、疼痛、上肢、下肢、认知和远程康复", "Neurological, orthopedic, pain, upper-limb, lower-limb, cognitive, and remote rehabilitation")],
      l("结合康复机器人、治疗师工作站、数据平台和机构流程部署。", "Deploys rehabilitation robots, therapist workstations, data platforms, and institutional workflows together."),
      l("逐 SKU 核对医疗器械注册、适应证、禁忌、训练模式、力/速度范围、临床责任、数据与售后。", "Verify each SKU's medical-device registration, indications, contraindications, training modes, force/speed ranges, clinical responsibility, data, and support."),
      ["service", "integration"],
    ),
    coverage: "family-summary" as const,
    level: "family" as const,
  },
];

const fourierSeeds: ProductSeed[] = [
  ...fourierGR1Seeds,
  fourierGR2Seed,
  ...fourierGR3Seeds,
  fourierN1Seed,
  ...fourierSupportingSeeds,
];

const productSeeds: ProductSeed[] = [
  ...bostonSeeds,
  ...apptronikSeeds,
  ...boosterSeeds,
  ...noetixSeeds,
  ...fourierSeeds,
];

const toRecord = (locale: Locale, company: CompanyProfile, seed: ProductSeed): FinderExpansionRecord => {
  const companySeed = companySeeds[seed.companySlug];
  return {
    id: seed.id,
    matrixSlug: "",
    matrixTitle: t(locale, companySeed.catalogTitle),
    industry: company.industry,
    reviewedAt: "2026-09-04",
    product: seed.product,
    company: company.name,
    type: t(locale, seed.type),
    openness: locale === "zh" ? "厂商官方产品页、规格文档或工程资料公开" : "Official product page, specification, or engineering material is public",
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
    catalogScope: locale === "zh"
      ? "产品代际、版型、选件、软件和系列记录分别建档；参数仅适用于引用来源及其条件。"
      : "Generations, editions, options, software, and family records are separated; parameters apply only to the cited source and conditions.",
    profile: finderProfile(company),
    evidence: {
      level: seed.level ?? "model",
      specificationKind: seed.specificationKind ?? (seed.rows.length ? "parameters" : "capabilities"),
      specificationCoverage: seed.coverage,
      specificationCoverageNote: locale === "zh"
        ? seed.coverage === "official-complete"
          ? "已逐项覆盖引用官方规格区块当前可读的公开字段；版本冲突、选件和订单配置另行标注。"
          : seed.coverage === "capability-only"
            ? "厂商公开材料以能力或平台说明为主，没有可逐项转录的完整型号参数表。"
            : seed.coverage === "family-summary"
              ? "当前仅完成系列范围记录，尚未逐 SKU 拆分，不能作为全型号参数完成声明。"
              : "已覆盖当前官方页面可明确归属的字段；未披露字段与跨代参数不作推断。"
        : seed.coverage === "official-complete"
          ? "Every currently readable public field in the cited official specification block is covered; revision conflicts, options, and order configurations are marked separately."
          : seed.coverage === "capability-only"
            ? "Manufacturer material describes capabilities or a platform without a complete model specification table to transcribe."
            : seed.coverage === "family-summary"
              ? "Coverage is currently at family scope rather than individual SKUs and is not a complete-model claim."
              : "Fields unambiguously attributable on current official pages are covered; undisclosed and cross-generation fields are not inferred.",
      overview: seed.overview.map((item) => t(locale, item)),
      applications: seed.applications.map((item) => t(locale, item)),
      disclosureBoundary: locale === "zh"
        ? "厂商公开值按来源和条件记录；峰值、实验、演示、目标、选件与连续额定工况不互相替代。"
        : "Manufacturer figures are recorded with source and conditions; peaks, tests, demonstrations, targets, options, and continuous ratings are not interchangeable.",
      sourceLinks: [...new Map([
        { label: locale === "zh" ? `${seed.product} 官方资料` : `${seed.product} official material`, url: seed.pageUrl },
        ...(seed.sourceLinks ?? []).map((item) => ({ label: t(locale, item.label), url: item.url })),
        { label: locale === "zh" ? "公司官方介绍" : "Official company profile", url: companySeed.aboutUrl },
      ].map((item) => [item.url, item])).values()],
      companyTimeline: companySeed.timeline.map((item) => ({
        date: item.date,
        title: t(locale, item.title),
        detail: t(locale, item.detail),
        sourceUrl: item.sourceUrl,
        kind: item.kind,
      })),
      fundingRounds: companySeed.funding.map((item) => ({
        date: item.date,
        round: t(locale, item.round),
        amount: typeof item.amount === "string" ? item.amount : t(locale, item.amount),
        investors: t(locale, item.investors),
        sourceUrl: item.sourceUrl,
      })),
      investmentView: companySeed.investmentView.map((item) => t(locale, item)),
    },
  };
};

export const getVerifiedWaveThirteenProductRecords = (
  locale: Locale,
  companies: CompanyProfile[],
): FinderExpansionRecord[] => {
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  return productSeeds.map((seed) => {
    const company = companyBySlug.get(seed.companySlug);
    if (!company) throw new Error(`Wave-thirteen product company is missing: ${seed.companySlug}`);
    return toRecord(locale, company, seed);
  });
};

export const waveThirteenCatalogProductCount = productSeeds.length;
