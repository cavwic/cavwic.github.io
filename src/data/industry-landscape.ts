export type LandscapeLocale = "zh" | "en";

export type LandscapeLayer = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  chain: string[];
  company: {
    name: string;
    englishName: string;
    role: string;
    positioning: string;
    strengths: string;
    products: string;
    fit: string;
    verify: string;
    evidence: string[];
    sourceLabel: string;
    sourceUrl: string;
    reviewedAt: string;
  };
};

type LandscapeSample = {
  label: string;
  title: string;
  intro: string;
  imageAlt: string;
  imageNote: string;
  routeLabel: string;
  companyLabel: string;
  positionLabel: string;
  expandLabel: string;
  fields: {
    strengths: string;
    products: string;
    fit: string;
    verify: string;
  };
  sourceLabel: string;
  layers: LandscapeLayer[];
};

export const dexterousLandscapeSample: Record<LandscapeLocale, LandscapeSample> = {
  zh: {
    label: "LOCAL SAMPLE / NOT PUBLISHED",
    title: "一只灵巧手拆开以后",
    intro: "先看接触如何被感知，再看力如何被传递，最后看关节怎样输出动作。公司放回它真正负责的部件环节，跨层布局也会明确写出。",
    imageAlt: "概念性的灵巧手机构、触觉、驱动、传动和控制部件拆解陈列",
    imageNote: "概念图只用于说明浏览方式，不代表任何厂商的具体产品结构。",
    routeLabel: "按部件浏览",
    companyLabel: "REPRESENTATIVE COMPANY",
    positionLabel: "产业位置",
    expandLabel: "查看公司档案",
    fields: {
      strengths: "公开侧重",
      products: "产品类别",
      fit: "适合进入验证的场景",
      verify: "项目中先确认",
    },
    sourceLabel: "查看官方来源",
    layers: [
      {
        id: "sample-touch",
        index: "01",
        eyebrow: "CONTACT / SENSING",
        title: "接触感知",
        description: "触觉层负责回答接触发生在哪里、力如何变化、物体是否滑动。它连接手指机构、抓取控制和数据采集。",
        chain: ["触觉单元", "阵列与标定", "时间同步", "控制反馈"],
        company: {
          name: "帕西尼",
          englishName: "PaXini",
          role: "触觉传感与灵巧操作的交叉厂商",
          positioning: "公开产品同时覆盖多维触觉传感、触觉灵巧手和具身数据采集，适合放在感知层与末端执行器层交叉观察。",
          strengths: "多维触觉单元、触觉覆盖与灵巧手的一体化产品路径。",
          products: "多维触觉传感器、触觉灵巧手、全身力学套件与数据采集产品。",
          fit: "接触丰富的抓取、遥操作与数据采集、触觉闭环研究。",
          verify: "量程、漂移、标定、采样与同步方式；公开实验室参数不能直接代替目标工况测试。",
          evidence: ["官方产品页", "公开参数", "工况仍需验证"],
          sourceLabel: "帕西尼 GEN3 产品页",
          sourceUrl: "https://paxini.com/cn/dex/gen3",
          reviewedAt: "2026-08-20",
        },
      },
      {
        id: "sample-transmission",
        index: "02",
        eyebrow: "REDUCTION / TRANSMISSION",
        title: "精密传动",
        description: "减速与传动决定关节能否在有限体积内获得需要的扭矩、刚度和定位能力，也会带来寿命、温升与回差问题。",
        chain: ["谐波减速器", "轴承支撑", "结构集成", "寿命验证"],
        company: {
          name: "绿的谐波",
          englishName: "Leaderdrive",
          role: "精密谐波传动向关节产品延伸的核心部件厂商",
          positioning: "官网公开产品从谐波减速器延伸到人形机器人关节、旋转执行器和伺服系统，可同时观察单一部件与机电一体化路径。",
          strengths: "谐波减速器及其向旋转执行器、机器人关节的集成。",
          products: "谐波减速器、人形机器人关节、旋转执行器、伺服系统。",
          fit: "紧凑旋转关节、机器人关节模组和需要精密传动的自动化设备。",
          verify: "具体型号的额定与峰值扭矩、刚度、回差、寿命，以及轴承、电机和驱动器的责任边界。",
          evidence: ["企业官网", "产品目录", "型号需询证"],
          sourceLabel: "绿的谐波官网",
          sourceUrl: "https://www.leaderdrive.cn/",
          reviewedAt: "2026-08-20",
        },
      },
      {
        id: "sample-actuation",
        index: "03",
        eyebrow: "JOINT / ACTUATION",
        title: "关节驱动",
        description: "关节模组把电机、传动、编码、驱动和力控组合成可安装单元。参数必须回到质量、热、控制周期和实际负载。",
        chain: ["无框力矩电机", "驱动器", "编码与力控", "一体化模组"],
        company: {
          name: "长兴动力",
          englishName: "Changxing Power",
          role: "关节执行器与机器人本体跨层布局厂商",
          positioning: "官网公开力控直线执行器、力控旋转执行器和机器人产品，并说明无框力矩电机与驱动器的自研集成路径。",
          strengths: "力控线性与旋转执行器，以及电机、驱动和控制的模组化集成。",
          products: "力控线性执行器、力控旋转执行器、机械臂与机器人产品。",
          fit: "人形机器人关节方案比较、力控执行器样机和需要快速集成的本体开发。",
          verify: "第三方测试、通信协议、控制周期、散热降额，以及质量、体积与扭矩口径。",
          evidence: ["企业官网", "厂商技术说明", "性能需复测"],
          sourceLabel: "长兴动力官网",
          sourceUrl: "https://www.cxdlrobotics.com/",
          reviewedAt: "2026-08-20",
        },
      },
    ],
  },
  en: {
    label: "LOCAL SAMPLE / NOT PUBLISHED",
    title: "What sits inside a dexterous hand",
    intro: "Start with how contact is sensed, follow how force is transmitted, and finish with how a joint produces motion. Each company is placed where its public product evidence belongs.",
    imageAlt: "Conceptual arrangement of dexterous-hand mechanisms, tactile parts, drives, transmissions, and control electronics",
    imageNote: "This concept image explains the browsing model. It does not represent any vendor's actual product architecture.",
    routeLabel: "Browse by component",
    companyLabel: "REPRESENTATIVE COMPANY",
    positionLabel: "Value-chain position",
    expandLabel: "Open company file",
    fields: {
      strengths: "Public focus",
      products: "Product categories",
      fit: "Scenarios worth validating",
      verify: "Confirm before selection",
    },
    sourceLabel: "Open official source",
    layers: [
      {
        id: "sample-touch",
        index: "01",
        eyebrow: "CONTACT / SENSING",
        title: "Contact sensing",
        description: "The tactile layer measures where contact occurs, how force changes, and whether an object is slipping. It connects finger mechanics, grasp control, and data collection.",
        chain: ["Tactile cells", "Array calibration", "Time sync", "Control feedback"],
        company: {
          name: "PaXini",
          englishName: "PaXini",
          role: "A vendor spanning tactile sensing and dexterous manipulation",
          positioning: "Its public portfolio covers multidimensional tactile sensing, tactile dexterous hands, and embodied-data products, placing it across sensing and end-effector layers.",
          strengths: "A public product path connecting multidimensional tactile units, coverage, and dexterous hands.",
          products: "Multidimensional tactile sensors, tactile dexterous hands, force-sensing kits, and data-collection products.",
          fit: "Contact-rich grasping, teleoperation data collection, and tactile closed-loop research.",
          verify: "Range, drift, calibration, sampling, and synchronization. Vendor lab figures do not replace testing under the target duty cycle.",
          evidence: ["Official product page", "Published specifications", "Duty cycle unverified"],
          sourceLabel: "PaXini GEN3 product page",
          sourceUrl: "https://paxini.com/cn/dex/gen3",
          reviewedAt: "2026-08-20",
        },
      },
      {
        id: "sample-transmission",
        index: "02",
        eyebrow: "REDUCTION / TRANSMISSION",
        title: "Precision transmission",
        description: "Reduction and transmission determine whether a compact joint can deliver the required torque, stiffness, and positioning performance, while introducing life, heat, and backlash constraints.",
        chain: ["Harmonic reducer", "Bearing support", "Structural integration", "Life testing"],
        company: {
          name: "Leaderdrive",
          englishName: "Leaderdrive",
          role: "A harmonic-drive specialist extending into joint products",
          positioning: "The public portfolio extends from harmonic reducers to humanoid joints, rotary actuators, and servo systems, showing both component and integrated-product paths.",
          strengths: "Harmonic reducers and their integration into rotary actuators and robot joints.",
          products: "Harmonic reducers, humanoid robot joints, rotary actuators, and servo systems.",
          fit: "Compact rotary joints, robot joint modules, and automation equipment requiring precision transmission.",
          verify: "Rated and peak torque, stiffness, backlash, life, and the responsibility boundary across bearings, motors, and drives for the selected model.",
          evidence: ["Corporate website", "Product catalogue", "Model inquiry required"],
          sourceLabel: "Leaderdrive website",
          sourceUrl: "https://www.leaderdrive.cn/",
          reviewedAt: "2026-08-20",
        },
      },
      {
        id: "sample-actuation",
        index: "03",
        eyebrow: "JOINT / ACTUATION",
        title: "Joint actuation",
        description: "A joint module packages motor, transmission, encoder, drive, and force control into an installable unit. Its figures still depend on mass, heat, control cycle, and real load.",
        chain: ["Frameless motor", "Motor drive", "Encoding and force control", "Integrated module"],
        company: {
          name: "Changxing Power",
          englishName: "Changxing Power",
          role: "A vendor spanning joint actuators and robot platforms",
          positioning: "Its public site lists force-controlled linear and rotary actuators alongside robot products, and describes an integration path using in-house frameless motors and drives.",
          strengths: "Force-controlled linear and rotary actuators with integrated motor, drive, and control development.",
          products: "Force-controlled linear actuators, rotary actuators, manipulators, and robot products.",
          fit: "Humanoid joint architecture studies, force-control prototypes, and robot platforms that need a fast integration path.",
          verify: "Independent test evidence, communication protocol, control cycle, cooling derating, and consistent mass, volume, and torque definitions.",
          evidence: ["Corporate website", "Vendor technical statement", "Performance retest required"],
          sourceLabel: "Changxing Power website",
          sourceUrl: "https://www.cxdlrobotics.com/",
          reviewedAt: "2026-08-20",
        },
      },
    ],
  },
};
