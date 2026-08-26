import type { IndustryId } from "./content";
import { landscapeCompanies, pickText } from "./industry-landscape";

export type CompanyProfile = {
  slug: string;
  name: string;
  englishName: string;
  industry: IndustryId;
  valueChainRole?: string;
  positioning: string;
  strengths?: string[];
  products: string[];
  fit?: string[];
  verificationFocus?: string;
  presalesQuestions: string[];
  sourceIds: string[];
  reviewedAt: string;
};

type LandscapeProfileSeed = {
  id: keyof typeof landscapeCompanies;
  slug: string;
  industry: Extract<IndustryId, "robotics" | "dexterous-hands">;
  sourceIds: string[];
};

const fromLandscape = ({ id, slug, industry, sourceIds }: LandscapeProfileSeed): CompanyProfile => {
  const entry = landscapeCompanies[id];
  return {
    slug,
    name: pickText(entry.name, "zh"),
    englishName: entry.englishName ?? pickText(entry.name, "en"),
    industry,
    valueChainRole: pickText(entry.role, "zh"),
    positioning: pickText(entry.positioning, "zh"),
    strengths: [pickText(entry.strengths, "zh")],
    products: [pickText(entry.products, "zh")],
    fit: [pickText(entry.fit, "zh")],
    verificationFocus: pickText(entry.verify, "zh"),
    presalesQuestions: [
      "目标对象、任务和现场条件与公开产品定位是否一致？",
      "当前可交付版本开放哪些接口，哪些能力需要定制？",
      "连续运行、故障恢复、维护和备件如何验收？",
    ],
    sourceIds,
    reviewedAt: entry.reviewedAt,
  };
};

const aiCompanies: CompanyProfile[] = [
  {
    slug: "langgenius", name: "LangGenius", englishName: "LangGenius", industry: "ai",
    valueChainRole: "生成式 AI 应用开发与运行平台厂商",
    positioning: "Dify 的开发团队，产品重点是生成式 AI 应用、工作流、知识库和插件扩展。",
    strengths: ["模型接入、工作流编排、知识库与插件生态。"], products: ["Dify Community", "Dify Cloud", "插件生态"],
    fit: ["企业知识应用、工作流自动化、Agent 原型与私有化集成。"],
    verificationFocus: "版本边界、知识权限、检索评测、运行日志和人工接管。",
    presalesQuestions: ["部署边界和版本差异是什么？", "知识权限是否能映射现有组织？", "日志、评测和人工接管如何闭环？"],
    sourceIds: ["ref-01", "ref-02", "ref-03", "ref-04", "ref-05"], reviewedAt: "2026-08-14",
  },
  {
    slug: "infiniflow", name: "InfiniFlow", englishName: "InfiniFlow", industry: "ai",
    valueChainRole: "文档解析与检索增强生成平台厂商",
    positioning: "RAGFlow 的开发团队，公开产品强调文档解析、检索增强生成和可追溯引用。",
    strengths: ["复杂文档解析、检索链路和引用追溯。"], products: ["RAGFlow"],
    fit: ["文档密集型知识库、检索评测和需要引用依据的企业问答。"],
    verificationFocus: "解析失败样本、召回与重排评测、索引更新和权限过滤。",
    presalesQuestions: ["复杂文档解析的失败样本是什么？", "召回、重排和生成如何分开评测？", "索引更新和权限过滤怎样实现？"],
    sourceIds: ["ref-07", "ref-08"], reviewedAt: "2026-08-14",
  },
  {
    slug: "labring", name: "Labring", englishName: "Labring", industry: "ai",
    valueChainRole: "知识库与工作流应用平台厂商",
    positioning: "FastGPT 的开发团队，公开项目覆盖知识库、工作流、模型接入和应用发布。",
    strengths: ["知识库应用、工作流配置、模型接入和 API 发布。"], products: ["FastGPT"],
    fit: ["企业知识助手、流程型 AI 应用和私有化原型。"],
    verificationFocus: "部署依赖、知识质量、工作流版本和索引更新。",
    presalesQuestions: ["私有化部署依赖哪些基础设施？", "知识库质量如何被量化？", "工作流版本和回滚怎样管理？"],
    sourceIds: ["ref-09", "ref-10", "ref-11"], reviewedAt: "2026-08-14",
  },
  {
    slug: "ai-indeed", name: "实在智能", englishName: "AI Indeed", industry: "ai",
    valueChainRole: "企业智能体与业务流程自动化厂商",
    positioning: "企业智能体与自动化厂商，公开方向包括屏幕语义理解、RPA 和业务流程执行。",
    strengths: ["界面语义理解、RPA 与业务流程执行。"], products: ["实在 Agent", "数字员工", "自动化平台"],
    fit: ["跨系统流程自动化、存量系统界面操作和人工流程替代。"],
    verificationFocus: "API 与界面自动化边界、异常接管、流程变更和维护成本。",
    presalesQuestions: ["哪些步骤依赖界面自动化，哪些使用 API？", "异常和人工接管如何处理？", "流程变更后维护成本如何估算？"],
    sourceIds: ["ref-16", "job-03"], reviewedAt: "2026-08-14",
  },
];

const roboticsCompanies: CompanyProfile[] = [
  fromLandscape({ id: "unitree", slug: "unitree", industry: "robotics", sourceIds: ["ref-51", "ref-52"] }),
  fromLandscape({ id: "booster", slug: "booster-robotics", industry: "robotics", sourceIds: ["ref-17", "ref-18", "ref-19"] }),
  fromLandscape({ id: "galbot", slug: "galbot", industry: "robotics", sourceIds: ["ref-22", "ref-23", "ref-24"] }),
  fromLandscape({ id: "noetix", slug: "noetix-robotics", industry: "robotics", sourceIds: ["ref-25", "ref-26"] }),
  {
    slug: "boston-dynamics", name: "Boston Dynamics", englishName: "Boston Dynamics", industry: "robotics",
    valueChainRole: "动态机器人与工业人形机器人厂商",
    positioning: "Atlas 正从研究样机转向面向工业任务的电动人形平台，公开资料更适合用于核对本体方向，具体交付包仍需按项目确认。",
    strengths: ["全身动态控制、复杂运动和工业机器人系统工程。"], products: ["Atlas", "Spot", "Stretch"],
    fit: ["工业操作验证、复杂运动研究和高动态机器人开发。"],
    verificationFocus: "Atlas 的可采购状态、任务包、接口、安全机制、连续运行和维护责任。",
    presalesQuestions: ["当前可交付的 Atlas 版本包含哪些任务能力？", "控制、感知和任务层分别开放到什么程度？", "连续工况、安全和现场服务如何验收？"],
    sourceIds: ["ref-82"], reviewedAt: "2026-08-26",
  },
  {
    slug: "agility-robotics", name: "Agility Robotics", englishName: "Agility Robotics", industry: "robotics",
    valueChainRole: "物流与制造场景人形机器人厂商",
    positioning: "Digit 与 Arc 面向仓储、物流和制造流程，公开资料覆盖本体、工作流编排、系统连接和部署支持。",
    strengths: ["在既有设施中搬运周转箱，以及机器人工作流和机群运营。"], products: ["Digit", "Agility Arc"],
    fit: ["仓内搬运、产线物料流转和人工作业空间中的自动化补位。"],
    verificationFocus: "对象和工位边界、节拍、续航换班、末端配置、系统接口与现场支持。",
    presalesQuestions: ["目标流程是否落在已验证的搬运任务内？", "Arc 如何连接 WMS、WES、MES 和现场设备？", "异常接管、充电换班和服务响应如何安排？"],
    sourceIds: ["ref-83"], reviewedAt: "2026-08-26",
  },
  {
    slug: "figure-ai", name: "Figure", englishName: "Figure", industry: "robotics",
    valueChainRole: "通用人形机器人与具身模型厂商",
    positioning: "Figure 03 围绕 Helix、手部感知和规模制造设计，同时面向家庭与商业任务；产能和部署进度应视为厂商当前规划核验。",
    strengths: ["本体、手部传感、具身模型和制造体系的纵向整合。"], products: ["Figure 03", "Helix"],
    fit: ["通用操作研究、家庭与商业场景试点，以及端到端学习验证。"],
    verificationFocus: "实际可用任务、触觉耐久、自治边界、充电和数据闭环，以及量产承诺。",
    presalesQuestions: ["目标任务对应哪一版 Helix 与本体能力？", "现场需要多少遥操作、示教和人工接管？", "制造与部署数据哪些已实现，哪些仍是规划？"],
    sourceIds: ["ref-84", "ref-85"], reviewedAt: "2026-08-26",
  },
  {
    slug: "apptronik", name: "Apptronik", englishName: "Apptronik", industry: "robotics",
    valueChainRole: "模块化工业人形机器人厂商",
    positioning: "Apollo 2 以双足或轮式底盘、本体软件和机群运营组成平台，目标是制造、物流和零售中的实际工作流。",
    strengths: ["模块化移动方式、执行器平台、任务软件与机群管理。"], products: ["Apollo 2", "Artemis", "Fleet Connect"],
    fit: ["拣配、分拣、上下料、巡检和物流作业试点。"],
    verificationFocus: "底盘与末端配置、任务自治、安全区、续航方案、接口和批量部署成熟度。",
    presalesQuestions: ["双足和轮式配置分别适合哪些现场条件？", "Artemis 与 Fleet Connect 开放哪些集成接口？", "任务成功率、换电和安全验收依据是什么？"],
    sourceIds: ["ref-86"], reviewedAt: "2026-08-26",
  },
  {
    slug: "1x-technologies", name: "1X", englishName: "1X", industry: "robotics",
    valueChainRole: "家庭场景人形机器人研发厂商",
    positioning: "NEO Gamma 是面向家庭环境内部测试的原型平台，适合观察柔顺结构、人机共处和家庭任务学习，不应直接视为成熟商品。",
    strengths: ["家庭环境的人机共处设计、数据采集和通用任务学习。"], products: ["NEO Gamma"],
    fit: ["家庭任务研究、遥操作与自治边界验证、人机交互试验。"],
    verificationFocus: "公开销售状态、自治程度、数据隐私、安全、可维护性和任务成功率。",
    presalesQuestions: ["当前版本面向内部测试、试点还是公开交付？", "哪些任务需要远程协助或人工接管？", "家庭数据、隐私和安全事件如何处理？"],
    sourceIds: ["ref-87"], reviewedAt: "2026-08-26",
  },
  {
    slug: "sanctuary-ai", name: "Sanctuary AI", englishName: "Sanctuary AI", industry: "robotics",
    valueChainRole: "Physical AI 与通用操作平台厂商",
    positioning: "公司以 Physical AI 和 Phoenix 平台推进通用操作，公开硬件代际变化较快，方案中需要先锁定当前可交付本体和软件版本。",
    strengths: ["通用任务学习、遥操作数据闭环和多指操作研究。"], products: ["Phoenix", "Physical AI platform"],
    fit: ["零售和工业任务试点、通用操作研究与数据采集。"],
    verificationFocus: "当前硬件代际、自治与遥操作比例、手部能力、接口、任务迁移和支持模式。",
    presalesQuestions: ["本次评估对应 Phoenix 的哪一代硬件？", "任务执行中人工和自治分别承担什么？", "新任务数据、训练和上线需要哪些步骤？"],
    sourceIds: ["ref-88", "ref-89"], reviewedAt: "2026-08-26",
  },
  {
    slug: "pal-robotics", name: "PAL Robotics", englishName: "PAL Robotics", industry: "robotics",
    valueChainRole: "科研与服务机器人平台厂商",
    positioning: "TALOS 是面向研究机构的高载荷人形平台，重点在全身控制、双臂操作和 ROS 研究生态，而不是开箱即用的通用劳动力产品。",
    strengths: ["研究型人形本体、全身控制与 ROS 集成。"], products: ["TALOS"],
    fit: ["高校和实验室的全身控制、双臂操作与人形机器人研究。"],
    verificationFocus: "研究版配置、软件栈、维护资源、实验安全、交付周期和本地支持。",
    presalesQuestions: ["研究目标需要哪些传感器和末端配置？", "控制器、仿真和 ROS 包的版本边界是什么？", "维护培训、备件和实验安全由谁负责？"],
    sourceIds: ["ref-90"], reviewedAt: "2026-08-26",
  },
  {
    slug: "neura-robotics", name: "NEURA Robotics", englishName: "NEURA Robotics", industry: "robotics",
    valueChainRole: "认知机器人与人形机器人厂商",
    positioning: "4NE1 延续公司在认知机器人和传感安全上的路线，面向人类工作环境；具体配置和可交付时间需要以当前报价资料为准。",
    strengths: ["感知安全、认知机器人平台和人机协作产品体系。"], products: ["4NE1"],
    fit: ["工业协作、服务任务和认知机器人平台验证。"],
    verificationFocus: "产品配置、交付状态、安全认证、接口、任务软件和服务网络。",
    presalesQuestions: ["可采购配置与公开演示配置是否一致？", "传感皮肤和安全机制如何验收？", "任务开发、远程支持和备件由谁提供？"],
    sourceIds: ["ref-91"], reviewedAt: "2026-08-26",
  },
  {
    slug: "hexagon-robotics", name: "Hexagon Robotics", englishName: "Hexagon Robotics", industry: "robotics",
    valueChainRole: "工业人形机器人与空间智能厂商",
    positioning: "AEON 结合工业人形本体、空间感知和 Hexagon 的工业软件能力，当前更适合按试点和集成项目评估。",
    strengths: ["工业场景空间感知、数字化工具链和机器人系统集成。"], products: ["AEON"],
    fit: ["工业巡检、物料处理和需要空间数据协同的任务试点。"],
    verificationFocus: "试点状态、任务范围、工具和电池更换、现场软件连接、安全与运维。",
    presalesQuestions: ["目标任务是否已有同类试点证据？", "AEON 如何连接现有数字孪生和生产系统？", "换电、工具使用、接管和维护如何设计？"],
    sourceIds: ["ref-92"], reviewedAt: "2026-08-26",
  },
  {
    slug: "wandercraft", name: "Wandercraft", englishName: "Wandercraft", industry: "robotics",
    valueChainRole: "高负载工业人形机器人研发厂商",
    positioning: "Calvin-40 面向工业重载任务，但官网将首批系列交付放在未来时间点，当前应按预量产或联合验证项目看待。",
    strengths: ["动态平衡、重载搬运和从外骨骼积累延伸的运动控制。"], products: ["Calvin-40"],
    fit: ["重载物料处理、工业操作验证和早期联合试点。"],
    verificationFocus: "系列交付时间、任务样本、负载工况、安全、接口和现场保障。",
    presalesQuestions: ["当前可提供样机、试点还是系列产品？", "额定负载对应哪些姿态、速度和持续时间？", "交付前的联合验证和风险退出条件是什么？"],
    sourceIds: ["ref-93"], reviewedAt: "2026-08-26",
  },
  {
    slug: "zsibot", name: "智身科技", englishName: "Zsibot", industry: "robotics",
    valueChainRole: "具身智能机器人与技术平台厂商",
    positioning: "公开资料覆盖具身机器人平台和 Genisom 相关技术方向，具体产品边界需按当前资料核验。",
    strengths: ["具身机器人本体、控制与智能技术整合。"], products: ["具身机器人平台", "Genisom 相关技术"],
    fit: ["具身智能研究、场景验证和机器人平台集成。"],
    verificationFocus: "本体版本、控制与感知接口、开放层级、连续运行和服务条件。",
    presalesQuestions: ["公开演示对应的现场前提是什么？", "控制、感知和任务应用分别开放哪些接口？", "POC 的验收指标能否按场景拆解？"],
    sourceIds: ["ref-27", "ref-28"], reviewedAt: "2026-08-14",
  },
  fromLandscape({ id: "ubtech", slug: "ubtech", industry: "robotics", sourceIds: ["ref-53", "ref-54"] }),
  fromLandscape({ id: "agibot", slug: "agibot", industry: "robotics", sourceIds: ["ref-55", "ref-56"] }),
  fromLandscape({ id: "fourier", slug: "fourier-intelligence", industry: "robotics", sourceIds: ["ref-57", "ref-58"] }),
  fromLandscape({ id: "nvidia", slug: "nvidia-robotics", industry: "robotics", sourceIds: ["ref-59", "ref-60"] }),
  fromLandscape({ id: "deepmind", slug: "google-deepmind", industry: "robotics", sourceIds: ["ref-61", "ref-62"] }),
  fromLandscape({ id: "physicalintelligence", slug: "physical-intelligence", industry: "robotics", sourceIds: ["ref-63"] }),
  fromLandscape({ id: "orbbec", slug: "orbbec", industry: "robotics", sourceIds: ["ref-64", "ref-65"] }),
  fromLandscape({ id: "livox", slug: "livox", industry: "robotics", sourceIds: ["ref-66"] }),
  fromLandscape({ id: "drobotics", slug: "d-robotics", industry: "robotics", sourceIds: ["ref-67", "ref-68"] }),
  fromLandscape({ id: "maxon", slug: "maxon", industry: "robotics", sourceIds: ["ref-76"] }),
  fromLandscape({ id: "faulhaber", slug: "faulhaber", industry: "robotics", sourceIds: ["ref-77"] }),
  fromLandscape({ id: "leaderdrive", slug: "leaderdrive", industry: "robotics", sourceIds: ["ref-78"] }),
  fromLandscape({ id: "harmonicdrive", slug: "harmonic-drive", industry: "robotics", sourceIds: ["ref-79"] }),
  fromLandscape({ id: "kinco", slug: "kinco", industry: "robotics", sourceIds: ["ref-80"] }),
  fromLandscape({ id: "changxing", slug: "changxing-power", industry: "robotics", sourceIds: ["ref-81"] }),
  fromLandscape({ id: "mechmind", slug: "mech-mind", industry: "robotics", sourceIds: ["ref-69", "ref-70"] }),
];

const dexterousHandCompanies: CompanyProfile[] = [
  fromLandscape({ id: "linkerbot", slug: "linkerbot", industry: "dexterous-hands", sourceIds: ["ref-29", "ref-30", "ref-31", "ref-32"] }),
  fromLandscape({ id: "inspire", slug: "inspire-robots", industry: "dexterous-hands", sourceIds: ["ref-33", "ref-34"] }),
  fromLandscape({ id: "paxini", slug: "paxini", industry: "dexterous-hands", sourceIds: ["ref-35", "ref-36", "ref-37", "ref-38"] }),
  fromLandscape({ id: "dhrobotics", slug: "dh-robotics", industry: "dexterous-hands", sourceIds: ["ref-40"] }),
  fromLandscape({ id: "shadow", slug: "shadow-robot", industry: "dexterous-hands", sourceIds: ["ref-71", "ref-72"] }),
  fromLandscape({ id: "kunwei", slug: "kunwei-technology", industry: "dexterous-hands", sourceIds: ["ref-73"] }),
  fromLandscape({ id: "xela", slug: "xela-robotics", industry: "dexterous-hands", sourceIds: ["ref-74"] }),
  fromLandscape({ id: "gelsight", slug: "gelsight", industry: "dexterous-hands", sourceIds: ["ref-75"] }),
  {
    slug: "wonik-robotics", name: "Wonik Robotics", englishName: "Wonik Robotics", industry: "dexterous-hands",
    valueChainRole: "研究型多指灵巧手厂商",
    positioning: "Allegro Hand 是机器人操作研究中常见的四指平台，当前产品代际和 ROS 软件应按官网与仓库版本核对。",
    strengths: ["紧凑多指机构、力矩控制和研究软件生态。"], products: ["Allegro Hand V4", "Allegro Hand V5"],
    fit: ["抓取研究、强化学习、遥操作和灵巧操作算法验证。"],
    verificationFocus: "产品代际、左右手配置、控制接口、ROS 版本、标定、耐久和备件。",
    presalesQuestions: ["研究代码对应哪一代 Allegro Hand？", "控制频率、通信和力矩接口如何开放？", "标定恢复、耗材和长期实验如何维护？"],
    sourceIds: ["ref-94", "ref-95"], reviewedAt: "2026-08-26",
  },
  {
    slug: "tesollo", name: "TESOLLO", englishName: "TESOLLO", industry: "dexterous-hands",
    valueChainRole: "全驱动多指灵巧手厂商",
    positioning: "DG-5F-M 以多关节独立驱动和可选指尖力觉或触觉配置面向研究与机器人集成。",
    strengths: ["多关节独立驱动、可选传感和机器人手臂集成。"], products: ["DG-5F-M"],
    fit: ["精细抓取研究、遥操作、机器人学习和多指控制验证。"],
    verificationFocus: "具体型号、传感选件、通信接口、控制周期、负载口径、寿命和交期。",
    presalesQuestions: ["需要的传感能力属于标准配置还是选件？", "控制接口和 SDK 支持哪些平台？", "目标对象集的抓取成功率和耐久如何验收？"],
    sourceIds: ["ref-96"], reviewedAt: "2026-08-26",
  },
  {
    slug: "qbrobotics", name: "qbrobotics", englishName: "qbrobotics", industry: "dexterous-hands",
    valueChainRole: "柔顺欠驱动手与执行器厂商",
    positioning: "qb SoftHand 系列以协同驱动和机械柔顺减少控制维度，研究版与工业版的接口、耐久和认证边界需要分开核验。",
    strengths: ["欠驱动协同、机械柔顺和 ROS/ROS 2 研究集成。"], products: ["qb SoftHand2 Research", "qb SoftHand Industry"],
    fit: ["安全抓取、人机协作、研究验证和柔顺末端应用。"],
    verificationFocus: "协同自由度、可控性边界、接口、夹持力、耐久、认证和维护。",
    presalesQuestions: ["任务需要独立关节控制还是协同抓取？", "研究版和工业版在认证与耐久上有何差异？", "ROS、机械安装和电气集成如何完成？"],
    sourceIds: ["ref-97", "ref-98"], reviewedAt: "2026-08-26",
  },
  {
    slug: "schunk", name: "SCHUNK", englishName: "SCHUNK", industry: "dexterous-hands",
    valueChainRole: "工业夹持系统与五指机械手厂商",
    positioning: "SVH 是集成电子系统的伺服电动五指手，适合与 SCHUNK 既有工业末端产品体系一起比较。",
    strengths: ["工业夹持产品积累、集成电子系统和 ROS 驱动支持。"], products: ["SVH Five-Finger Hand"],
    fit: ["研究展示、服务机器人和需要拟人外形的轻载操作。"],
    verificationFocus: "驱动自由度、接口、指力、速度、负载边界、备件和生命周期状态。",
    presalesQuestions: ["SVH 是否仍符合项目交付周期和生命周期要求？", "任务是否确实需要五指形态？", "安装、ROS 驱动和安全限制如何验证？"],
    sourceIds: ["ref-99"], reviewedAt: "2026-08-26",
  },
  {
    slug: "seed-robotics", name: "Seed Robotics", englishName: "Seed Robotics", industry: "dexterous-hands",
    valueChainRole: "欠驱动多指机器人手厂商",
    positioning: "RH8D 采用欠驱动结构和内置执行器，面向研究、教学与机器人原型，可选触觉配置需按具体版本确认。",
    strengths: ["紧凑自包含结构、欠驱动抓取和开放集成文档。"], products: ["RH8D Adult Robot Hand"],
    fit: ["教学研究、低成本多指原型、遥操作和对象集验证。"],
    verificationFocus: "执行器与自由度关系、触觉选件、接口、抓力、回差、耐久和备件。",
    presalesQuestions: ["欠驱动耦合是否满足目标操作精度？", "触觉和控制板属于哪一版配置？", "连续实验中的回差、温升和维护如何评估？"],
    sourceIds: ["ref-100", "ref-101"], reviewedAt: "2026-08-26",
  },
  {
    slug: "psyonic", name: "PSYONIC", englishName: "PSYONIC", industry: "dexterous-hands",
    valueChainRole: "仿生手与机器人研究末端厂商",
    positioning: "Ability Hand 源自假肢产品，并已面向研究用户和机器人应用开放；选型时需要区分医疗假肢目标与工业机器人目标。",
    strengths: ["轻量仿生结构、指尖触觉反馈和研究接口。"], products: ["Ability Hand"],
    fit: ["遥操作、仿生控制、人机接口研究和轻载机器人操作。"],
    verificationFocus: "机器人版接口、负载与占空比、触觉数据、耐久、维修和非医疗用途支持。",
    presalesQuestions: ["本项目使用的是研究版还是医疗产品衍生配置？", "持续机器人操作是否超出原设计占空比？", "触觉数据、控制接口和维修服务如何提供？"],
    sourceIds: ["ref-102", "ref-103"], reviewedAt: "2026-08-26",
  },
  {
    slug: "ati-industrial-automation", name: "ATI Industrial Automation", englishName: "ATI Industrial Automation", industry: "dexterous-hands",
    valueChainRole: "机器人多轴力与力矩传感器厂商",
    positioning: "ATI 的力与力矩传感器位于手腕或工具端，测量整体交互力，不能替代指尖分布式触觉。",
    strengths: ["多轴力测量、工业机器人集成和较完整的型号体系。"], products: ["Multi-Axis Force/Torque Sensors"],
    fit: ["腕部力控、装配、打磨、测试和验收测量。"],
    verificationFocus: "量程、过载、分辨率、采样链、坐标标定、安装刚度和环境等级。",
    presalesQuestions: ["需要测量整体腕力还是局部接触分布？", "任务的冲击和过载峰值是多少？", "控制器、采集卡和机器人坐标如何同步标定？"],
    sourceIds: ["ref-104", "ref-105"], reviewedAt: "2026-08-26",
  },
  {
    slug: "syntouch", name: "SynTouch", englishName: "SynTouch", industry: "dexterous-hands",
    valueChainRole: "仿生指尖触觉传感器厂商",
    positioning: "BioTac 通过压力、振动和温度等通道模拟指尖感知，公开资料较早，采购前必须确认当前型号、供货和支持状态。",
    strengths: ["多模态仿生指尖触觉和机器人触觉研究积累。"], products: ["BioTac"],
    fit: ["触觉识别、滑移研究、材料交互和多模态接触实验。"],
    verificationFocus: "当前可采购型号、采样与接口、封装耐久、标定、替换件和软件支持。",
    presalesQuestions: ["官网资料对应的型号目前是否仍可交付？", "各感知通道的采样和标定怎样完成？", "指尖表皮、液体和连接件如何维护或更换？"],
    sourceIds: ["ref-106", "ref-107"], reviewedAt: "2026-08-26",
  },
  {
    slug: "theo-hand", name: "万拿机器人", englishName: "Theo Hand", industry: "dexterous-hands",
    valueChainRole: "多指灵巧手厂商",
    positioning: "公开页面展示 Theo Hand 代表产品和面向具身操作的定位，部分工程参数仍需询证。",
    strengths: ["拟人化多指末端与具身操作产品方向。"], products: ["Theo Hand"],
    fit: ["多指抓取、遥操作和具身操作验证。"],
    verificationFocus: "驱动与触觉配置、接口、负载口径、重复抓取、维护耗材和交付版本。",
    presalesQuestions: ["可重复抓取能力如何测试？", "维护耗材和更换周期是否公开？", "与机械臂和遥操作系统怎样集成？"],
    sourceIds: ["ref-39"], reviewedAt: "2026-08-14",
  },
];

export const companies: CompanyProfile[] = [...aiCompanies, ...roboticsCompanies, ...dexterousHandCompanies];

export type MatrixRow = {
  product: string;
  company: string;
  type: string;
  openness: string;
  integration: string;
  verificationFocus: string;
  sourceIds: string[];
};

export type ProductMatrix = {
  slug: string;
  title: string;
  description: string;
  industry: IndustryId;
  dimensions: string[];
  rows: MatrixRow[];
  reviewedAt: string;
};

export const matrices: ProductMatrix[] = [
  {
    slug: "enterprise-ai-platforms", title: "企业 AI 应用平台对比矩阵",
    description: "按知识处理、编排、扩展、部署与评测路径比较，不给脱离场景的总排名。", industry: "ai",
    dimensions: ["应用定位", "知识处理", "工作流与 Agent", "扩展与接口", "部署与运维", "评测与审计"], reviewedAt: "2026-08-14",
    rows: [
      { product: "Dify", company: "LangGenius", type: "LLM 应用与工作流平台", openness: "开源项目；云服务与社区版边界需按版本核验", integration: "API、插件、模型与外部工具", verificationFocus: "权限映射、检索评测、日志和版本治理", sourceIds: ["ref-01", "ref-02", "ref-04", "ref-05"] },
      { product: "RAGFlow", company: "InfiniFlow", type: "以文档解析和 RAG 为重点的平台", openness: "开源项目；功能以当前文档为准", integration: "API、模型、解析和检索组件", verificationFocus: "复杂文档解析、召回与引用一致性", sourceIds: ["ref-07", "ref-08"] },
      { product: "FastGPT", company: "Labring", type: "知识库与工作流应用平台", openness: "开源项目；版本能力需逐项核验", integration: "模型、知识库、工作流和 API", verificationFocus: "部署依赖、工作流维护和索引更新", sourceIds: ["ref-09", "ref-10", "ref-11"] },
      { product: "Coze Studio", company: "Coze", type: "Agent 与应用开发平台", openness: "开源项目；服务能力与开源版本分开核验", integration: "API、插件、Chat SDK", verificationFocus: "插件权限、运行日志与部署边界", sourceIds: ["ref-12", "ref-13", "ref-14", "ref-15"] },
    ],
  },
  {
    slug: "embodied-robot-platforms", title: "具身机器人本体与开发平台矩阵",
    description: "先按科研、教育、展示、服务和任务执行区分，再核对本体、开发开放度、现场条件和服务责任。", industry: "robotics",
    dimensions: ["产品定位", "本体形态", "开发开放度", "任务适配", "现场依赖", "服务与维护"], reviewedAt: "2026-08-26",
    rows: [
      { product: "G1 / H 系列", company: "宇树科技", type: "人形机器人平台", openness: "产品页、SDK 与开源资源可查；接口按版本核验", integration: "本体控制、仿真、开发套件与上层算法", verificationFocus: "目标任务、负载、续航、控制权限和安全边界", sourceIds: ["ref-51", "ref-52"] },
      { product: "K1 / T 系列", company: "加速进化", type: "不同尺寸的人形机器人平台", openness: "产品、开发文档和开源资源可查", integration: "SDK、控制接口、仿真与训练资源", verificationFocus: "型号定位、控制频率、续航、维护和备件", sourceIds: ["ref-17", "ref-18", "ref-19"] },
      { product: "G1 / S1", company: "银河通用", type: "具身机器人与场景产品", openness: "G1 有开发文档入口；其他字段按产品版本询证", integration: "本体、模型、开发平台与场景系统", verificationFocus: "任务闭环、接口、失败恢复和交付条件", sourceIds: ["ref-22", "ref-23", "ref-24"] },
      { product: "Bumi / N2 / E1", company: "松延动力", type: "不同定位的人形机器人产品", openness: "产品信息公开；完整接口范围需询证", integration: "二次开发层级未完整公开", verificationFocus: "科研或展示定位、连续运行、接口和售后", sourceIds: ["ref-25", "ref-26"] },
      { product: "具身机器人平台", company: "智身科技", type: "本体与具身技术平台", openness: "公司与技术入口公开；型号级信息按当前资料核验", integration: "控制、感知与任务应用的开放边界需询证", verificationFocus: "演示前提、接口层级、POC 指标和服务条件", sourceIds: ["ref-27", "ref-28"] },
      { product: "Walker 系列", company: "优必选", type: "工业与服务人形机器人", openness: "产品与行业资料公开；开发接口需按项目询证", integration: "本体、任务系统与行业流程集成", verificationFocus: "工位改造、节拍、安全、接管和运维责任", sourceIds: ["ref-53", "ref-54"] },
      { product: "远征等产品系列", company: "智元机器人", type: "通用与行业具身机器人平台", openness: "产品生态与 AimDK 文档可查", integration: "本体、开发套件、数据与模型工具链", verificationFocus: "支持型号、接口权限、数据许可和现场稳定性", sourceIds: ["ref-55", "ref-56"] },
      { product: "GR / N 系列", company: "傅利叶智能", type: "人形机器人与开发平台", openness: "产品和开发资料可查；型号能力分别核验", integration: "本体控制、SDK、遥操作与应用开发", verificationFocus: "任务定位、负载、控制开放度、可靠性和服务", sourceIds: ["ref-57", "ref-58"] },
      { product: "Atlas", company: "Boston Dynamics", type: "面向工业任务的电动人形机器人", openness: "产品方向公开；采购、接口与任务包需按项目确认", integration: "全身控制、感知、操作与工业任务开发", verificationFocus: "可交付状态、任务边界、安全、连续运行和服务", sourceIds: ["ref-82"] },
      { product: "Digit / Arc", company: "Agility Robotics", type: "物流与制造人形机器人及运营平台", openness: "本体、工作流平台和服务路径公开", integration: "WMS、WES、MES、机群管理与现场流程", verificationFocus: "对象工位、节拍、续航、末端、异常接管和支持", sourceIds: ["ref-83"] },
      { product: "Figure 03 / Helix", company: "Figure", type: "通用人形机器人与具身智能系统", openness: "产品与模型方向公开；部署和制造进度按厂商当前资料核验", integration: "本体、手部触觉、视觉语言动作模型和数据闭环", verificationFocus: "实际任务、自治边界、耐久、充电、数据与量产承诺", sourceIds: ["ref-84", "ref-85"] },
      { product: "Apollo 2", company: "Apptronik", type: "模块化工业人形机器人平台", openness: "本体、任务软件和机群平台方向公开", integration: "双足或轮式底盘、Artemis 与 Fleet Connect", verificationFocus: "配置、任务成功率、安全区、续航、接口和部署成熟度", sourceIds: ["ref-86"] },
      { product: "NEO Gamma", company: "1X", type: "家庭场景人形机器人测试平台", openness: "内部家庭测试方向公开；不视为成熟量产商品", integration: "家庭数据采集、遥操作、学习与人机交互", verificationFocus: "销售状态、自治程度、隐私、安全、维护和任务成功率", sourceIds: ["ref-87"] },
      { product: "Phoenix / Physical AI", company: "Sanctuary AI", type: "通用操作与 Physical AI 平台", openness: "公司方向和部分硬件代际公开；当前交付版本需锁定", integration: "多指操作、遥操作数据、任务学习与本体", verificationFocus: "硬件代际、自治比例、接口、任务迁移和支持模式", sourceIds: ["ref-88", "ref-89"] },
      { product: "TALOS", company: "PAL Robotics", type: "高载荷研究型人形机器人", openness: "研究平台与数据表公开；配置按项目确认", integration: "ROS、全身控制、双臂操作与实验室工具链", verificationFocus: "软件版本、传感配置、维护、安全、交期和本地支持", sourceIds: ["ref-90"] },
      { product: "4NE1", company: "NEURA Robotics", type: "认知与协作人形机器人", openness: "产品方向公开；配置、认证与交付状态需确认", integration: "感知安全、任务软件和认知机器人产品体系", verificationFocus: "可采购配置、安全认证、接口、任务软件和服务网络", sourceIds: ["ref-91"] },
      { product: "AEON", company: "Hexagon Robotics", type: "空间智能工业人形机器人", openness: "产品和试点方向公开；按早期集成项目评估", integration: "空间感知、工业软件、工具使用与机群运营", verificationFocus: "试点证据、任务范围、换电、软件连接、安全和运维", sourceIds: ["ref-92"] },
      { product: "Calvin-40", company: "Wandercraft", type: "高负载工业人形机器人", openness: "产品方向公开；官网预计首批系列交付在未来阶段", integration: "动态平衡、重载搬运和工业任务开发", verificationFocus: "交付时间、负载工况、任务样本、安全、接口和保障", sourceIds: ["ref-93"] },
    ],
  },
  {
    slug: "robot-model-software-compute", title: "机器人模型、软件与计算平台矩阵",
    description: "比较机器人基础模型、开发工具和端侧算力的职责边界，不把研究模型当作可直接交付的整机能力。", industry: "robotics",
    dimensions: ["层级与职责", "支持本体", "数据与训练", "部署位置", "接口开放", "限制与评测"], reviewedAt: "2026-08-20",
    rows: [
      { product: "Isaac GR00T / Jetson Thor", company: "NVIDIA", type: "机器人模型、仿真与边缘计算平台", openness: "开发入口公开；模型、硬件与许可按版本核验", integration: "训练仿真、高层策略、视觉与端侧推理", verificationFocus: "支持本体、算子、延迟、功耗、许可和安全", sourceIds: ["ref-59", "ref-60"] },
      { product: "Gemini Robotics", company: "Google DeepMind", type: "具身推理与机器人模型系列", openness: "研究与模型卡公开；可用范围需按发布状态核验", integration: "多模态理解、任务规划与机器人控制", verificationFocus: "硬件支持、接口、延迟、数据政策和失败样本", sourceIds: ["ref-61", "ref-62"] },
      { product: "pi0", company: "Physical Intelligence", type: "跨本体通用机器人策略", openness: "研究公开；不视为即插即用交付产品", integration: "多机器人、多任务数据与连续动作策略", verificationFocus: "模型可获得性、后训练、推理硬件和安全边界", sourceIds: ["ref-63"] },
      { product: "AimDK", company: "智元机器人", type: "机器人开发工具链", openness: "开发文档入口公开", integration: "本体接口、应用开发与生态资源", verificationFocus: "支持型号、API 稳定性、许可和版本兼容", sourceIds: ["ref-55", "ref-56"] },
      { product: "RDK X5 / RDK S", company: "地瓜机器人", type: "机器人边缘计算与开发套件", openness: "硬件、算法和配件生态公开", integration: "视觉、导航、模型部署与多 I/O 原型", verificationFocus: "算子支持、端到端延迟、实时分工、功耗和供货", sourceIds: ["ref-67", "ref-68"] },
    ],
  },
  {
    slug: "robot-perception-components", title: "机器人环境与接触感知矩阵",
    description: "按导航、近距操作、接触反馈和工位视觉拆分传感职责，避免用单一传感器覆盖全部场景。", industry: "robotics",
    dimensions: ["感知对象", "测量原理", "安装位置", "数据接口", "标定同步", "环境与耐久"], reviewedAt: "2026-08-20",
    rows: [
      { product: "Gemini 330 系列", company: "奥比中光", type: "机器人 RGB-D 与 3D 相机", openness: "产品与 SDK 入口公开", integration: "机械臂近距感知、移动导航与多相机系统", verificationFocus: "距离精度、强光反光、运动模糊、同步和标定", sourceIds: ["ref-64", "ref-65"] },
      { product: "MID-360", company: "Livox", type: "三维激光雷达", openness: "产品资料公开", integration: "SLAM、移动导航、避障与周界感知", verificationFocus: "近距盲区、反射率、运动畸变、同步和安全冗余", sourceIds: ["ref-66"] },
      { product: "ITPU / AX 系列", company: "帕西尼", type: "多维触觉与力觉产品", openness: "产品页公开；原始数据和接口按型号核验", integration: "指尖掌面、全身力学和接触闭环", verificationFocus: "量程、分辨率、漂移、标定、同步和耐磨", sourceIds: ["ref-35", "ref-36"] },
      { product: "六维力与关节扭矩传感器", company: "坤维科技", type: "腕部与关节力学传感", openness: "产品目录公开；型号参数逐项核验", integration: "腕部力控、关节反馈、装配测试和验收测量", verificationFocus: "量程、过载、轴间耦合、温漂、采样和安装刚度", sourceIds: ["ref-73"] },
      { product: "Mech-Eye / Mech-Vision", company: "梅卡曼德", type: "工业 3D 视觉软硬件", openness: "产品和场景资料公开", integration: "拆码垛、上下料、无序抓取、定位与检测", verificationFocus: "对象样本、节拍、反光透明件、异常恢复和工位改造", sourceIds: ["ref-69", "ref-70"] },
    ],
  },
  {
    slug: "robot-joint-drive-components", title: "机器人关节、驱动与传动矩阵",
    description: "区分电机、减速器、驱动器和完整关节模组，比较集成深度及其责任边界。", industry: "robotics",
    dimensions: ["部件层级", "输出与负载谱", "传动与回差", "编码与控制", "热与连续工况", "寿命与供货"], reviewedAt: "2026-08-20",
    rows: [
      { product: "无框电机与驱动系统", company: "maxon", type: "电机、齿轮、编码器、控制器与关节组件", openness: "机器人产品路径公开；选型数据按具体组合核验", integration: "从单部件到驱动系统逐级集成", verificationFocus: "工作点效率、连续热、齿轮寿命、控制兼容和周期", sourceIds: ["ref-76"] },
      { product: "微型精密驱动组合", company: "FAULHABER", type: "微型电机、齿轮、编码与控制", openness: "机器人关节应用资料公开", integration: "面向手指、腕部、医疗和实验设备的紧凑驱动", verificationFocus: "负载谱、温升、齿隙、噪声、寿命和定制成本", sourceIds: ["ref-77"] },
      { product: "谐波减速器与关节", company: "绿的谐波", type: "精密减速器、旋转执行器和关节模组", openness: "产品路径公开；型号数据按手册询证", integration: "从减速器延伸到人形关节和伺服系统", verificationFocus: "额定峰值扭矩、刚度、回差、寿命和责任边界", sourceIds: ["ref-78"] },
      { product: "谐波齿轮与旋转执行器", company: "Harmonic Drive", type: "减速部件、齿轮单元和集成执行器", openness: "产品系列公开", integration: "不同尺寸和集成深度的精密旋转执行", verificationFocus: "负载谱、扭转刚度、润滑、轴承、寿命和冲击", sourceIds: ["ref-79"] },
      { product: "FMK / RD 与关节方案", company: "步科", type: "无框电机、驱动器与关节电控", openness: "方案与产品路径公开", integration: "电机、驱动、通信和减速器匹配", verificationFocus: "控制频率、编码器、力矩估算、功能安全和散热", sourceIds: ["ref-80"] },
      { product: "机器人关节模组", company: "长兴动力", type: "一体化关节与执行器", openness: "公司产品入口公开；型号级数据需询证", integration: "电机、减速、编码、驱动和结构集成", verificationFocus: "额定输出、热、冲击、回差、寿命、总线和维护", sourceIds: ["ref-81"] },
    ],
  },
  {
    slug: "dexterous-hand-selection", title: "灵巧手产品与选型矩阵",
    description: "自由度只是入口；真正影响交付的是驱动、触觉、接口、负载定义、耐久性和目标抓取集合。", industry: "dexterous-hands",
    dimensions: ["机构与驱动", "自由度与驱动数", "触觉配置", "控制与接口", "负载口径", "耐久与维护"], reviewedAt: "2026-08-26",
    rows: [
      { product: "O6 / L6 / L20 / L30 / R30", company: "灵心巧手", type: "多路线多指灵巧手", openness: "产品、FAQ、支持资料和数据表可查", integration: "按型号核对机构、通讯、SDK、遥操作和数据平台", verificationFocus: "驱动自由度、触觉覆盖、控制频率、温升和寿命", sourceIds: ["ref-29", "ref-30", "ref-31", "ref-32"] },
      { product: "RH56 系列", company: "因时机器人", type: "微型伺服驱动五指灵巧手", openness: "产品与用户手册可查", integration: "按手册核对安装、电气、通讯和控制", verificationFocus: "电缸寿命、手指输出、刷新率、过载保护和备件", sourceIds: ["ref-33", "ref-34"] },
      { product: "DEX / AX 系列", company: "帕西尼", type: "多维触觉灵巧手", openness: "产品页公开；具体版本逐项核验", integration: "触觉、整手、全身力学和数据采集路径", verificationFocus: "量程、漂移、标定、同步、耐磨和对象集成功率", sourceIds: ["ref-35", "ref-36", "ref-37", "ref-38"] },
      { product: "五指灵巧手", company: "大寰机器人", type: "工业末端执行器产品", openness: "灵巧手与夹爪产品目录公开", integration: "与夹爪、旋转执行器一并评估", verificationFocus: "任务必要性、对象覆盖、节拍、寿命、安装和总成本", sourceIds: ["ref-40"] },
      { product: "Dexterous Hand / Lite / DEX-EE", company: "Shadow Robot", type: "研究型高自由度灵巧手", openness: "产品系列与 ROS 相关路径公开", integration: "机器人学习、遥操作和触觉研究", verificationFocus: "腱绳耗材、标定恢复、对象集成功率和连续实验", sourceIds: ["ref-71", "ref-72"] },
      { product: "Theo Hand", company: "万拿机器人", type: "多指灵巧手", openness: "产品页公开；部分工程字段未公开", integration: "机械臂、遥操作和具身操作集成需询证", verificationFocus: "驱动触觉、接口、负载、重复抓取、耗材和维护", sourceIds: ["ref-39"] },
      { product: "Allegro Hand V4 / V5", company: "Wonik Robotics", type: "研究型四指力矩控制灵巧手", openness: "产品和软件仓库公开；代际与 ROS 版本需匹配", integration: "抓取研究、遥操作、强化学习和多指控制", verificationFocus: "版本、接口、控制频率、标定、耐久和备件", sourceIds: ["ref-94", "ref-95"] },
      { product: "DG-5F-M", company: "TESOLLO", type: "多关节独立驱动五指灵巧手", openness: "产品与选件公开；具体交付配置需询证", integration: "可选指尖力觉或触觉、SDK 与机械臂集成", verificationFocus: "传感选件、接口、控制周期、负载、寿命和交期", sourceIds: ["ref-96"] },
      { product: "qb SoftHand2 Research", company: "qbrobotics", type: "柔顺欠驱动协同灵巧手", openness: "研究与工业产品路径公开；版本边界需区分", integration: "ROS/ROS 2、协同控制和柔顺抓取", verificationFocus: "协同自由度、可控边界、夹持力、耐久、认证和维护", sourceIds: ["ref-97", "ref-98"] },
      { product: "SVH", company: "SCHUNK", type: "伺服电动五指机械手", openness: "产品与 ROS 驱动路径公开；生命周期状态需确认", integration: "集成电子系统、机器人接口和拟人轻载操作", verificationFocus: "驱动自由度、接口、指力、速度、备件和产品周期", sourceIds: ["ref-99"] },
      { product: "RH8D", company: "Seed Robotics", type: "自包含欠驱动多指机器人手", openness: "产品和知识库公开；触觉选件按版本确认", integration: "教学研究、遥操作、多指原型和对象集测试", verificationFocus: "驱动映射、触觉、接口、抓力、回差、耐久和备件", sourceIds: ["ref-100", "ref-101"] },
      { product: "Ability Hand", company: "PSYONIC", type: "由仿生假肢延伸的研究型机器人手", openness: "研究用户与机器人合作方向公开；非医疗用途配置需确认", integration: "遥操作、仿生控制、触觉反馈和机器人研究", verificationFocus: "机器人接口、负载、占空比、触觉数据、维修和支持", sourceIds: ["ref-102", "ref-103"] },
    ],
  },
  {
    slug: "tactile-force-sensing", title: "灵巧操作触觉与力觉产品矩阵",
    description: "区分指尖分布式触觉、成像触觉和腕部六维力，先确定要测什么，再比较精度、同步和耐久。", industry: "dexterous-hands",
    dimensions: ["测量对象", "传感维度", "覆盖与封装", "采样与同步", "标定与漂移", "耐久与更换"], reviewedAt: "2026-08-26",
    rows: [
      { product: "ITPU 触觉传感器", company: "帕西尼", type: "多维分布式触觉", openness: "产品资料公开；原始数据接口按型号核验", integration: "灵巧手、全身力学套件和数据采集", verificationFocus: "量程、分辨率、漂移、同步、耐磨和覆盖曲面", sourceIds: ["ref-35", "ref-36"] },
      { product: "六维力与关节扭矩传感器", company: "坤维科技", type: "整体受力与关节反馈", openness: "产品目录公开；型号规格逐项核验", integration: "腕部、关节、力控、标定和验收测量", verificationFocus: "轴间耦合、过载、温漂、安装刚度和采样链", sourceIds: ["ref-73"] },
      { product: "uSkin uSCu / uSPa", company: "XELA Robotics", type: "模块化三轴触觉皮肤", openness: "产品入口公开；定制规格需询证", integration: "指腹、掌面、夹爪和曲面分布式覆盖", verificationFocus: "曲率、布线、封装耐久、同步、标定和延迟", sourceIds: ["ref-74"] },
      { product: "GelSight Mini", company: "GelSight", type: "成像式高分辨率触觉", openness: "产品入口公开", integration: "表面识别、滑移研究、装配判断和材料实验", verificationFocus: "帧率、光学表面寿命、污染、重标定和闭环延迟", sourceIds: ["ref-75"] },
      { product: "多轴力与力矩传感器", company: "ATI Industrial Automation", type: "腕部或工具端整体力觉", openness: "产品与型号目录公开", integration: "腕部力控、装配、打磨、测试和验收测量", verificationFocus: "量程、过载、分辨率、采样、坐标标定和安装刚度", sourceIds: ["ref-104", "ref-105"] },
      { product: "BioTac", company: "SynTouch", type: "多模态仿生指尖触觉", openness: "产品资料公开但版本较早；当前供货与支持需确认", integration: "压力、振动、温度、滑移和材料交互研究", verificationFocus: "可采购型号、采样接口、封装耐久、标定和替换件", sourceIds: ["ref-106", "ref-107"] },
    ],
  },
];
