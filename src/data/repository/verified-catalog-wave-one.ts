import type { Locale } from "../site";
import type { CompanyProfile } from "./catalog";
import type { FinderEvidence, FinderExpansionRecord, FinderParameter } from "./product-finder-demo";

type Localized = { zh: string; en: string };
type SpecRow = {
  label: Localized;
  value: Localized;
  conditions?: Localized;
  locator?: Localized;
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const t = (locale: Locale, value: Localized) => value[locale];

const LIMX_ABOUT = "https://www.limxdynamics.com/en/about";
const LIMX_LUNA = "https://www.limxdynamics.com/en/products/luna/spec";
const LIMX_OLI = "https://www.limxdynamics.com/en/products/oli/spec";
const LIMX_TRON2 = "https://www.limxdynamics.com/en/products/tron2/spec";
const LIMX_TRON1 = "https://www.limxdynamics.com/en/products/tron1/spec";
const LIMX_FLUXVLA = "https://www.limxdynamics.com/en/products/fluxvla";
const LIMX_FLUX = "https://flux.limxdynamics.com/";

const verifiedSpecs = (locale: Locale, url: string, rows: SpecRow[]): FinderParameter[] => rows.map((row) => ({
  label: t(locale, row.label),
  value: t(locale, row.value),
  status: "manufacturer",
  sourceUrl: url,
  sourceLabel: locale === "zh" ? "产品官方规格表" : "Official product specification table",
  sourceLocator: t(locale, row.locator ?? l("规格表对应行", "Matching specification-table row")),
  conditions: row.conditions ? t(locale, row.conditions) : undefined,
}));

const standardConditions = l(
  "数值为厂商实验室口径，可能受环境、使用方式、设备状态和软件版本影响；采购前应按具体版本复核。",
  "Figures are manufacturer laboratory results and may vary with environment, use, device condition, and software version; verify the exact edition before purchase.",
);

const limxCompanyPatch = (locale: Locale, company: CompanyProfile): CompanyProfile => ({
  ...company,
  name: locale === "zh" ? "逐际动力" : "LimX Dynamics",
  englishName: "LimX Dynamics",
  legalName: "LimX Dynamics Technology Co., Ltd.",
  country: locale === "zh" ? "中国" : "China",
  headquarters: locale === "zh" ? "深圳" : "Shenzhen",
  founded: "2022",
  officialUrl: "https://www.limxdynamics.com/",
  valueChainRole: locale === "zh"
    ? "通用机器人本体、运动智能与机器人开发平台厂商"
    : "General robot hardware, motion-intelligence, and robotics-development platform company",
  positioning: locale === "zh"
    ? "逐际动力围绕机器人本体与运动智能构建产品组合，当前官网目录包括人形机器人、多形态具身机器人以及 VLA 与云端训练平台。"
    : "LimX Dynamics builds a portfolio around robot hardware and motion intelligence. Its current official catalog includes humanoids, multi-form embodied robots, and VLA and cloud-training platforms.",
  strengths: locale === "zh"
    ? ["双足、轮足和人形本体", "通用运动控制", "面向真实机器人部署的开发工具链"]
    : ["Biped, wheeled-leg, and humanoid bodies", "General motion control", "Development tooling for real-robot deployment"],
  products: ["Luna", "Oli", "TRON 2", "TRON 1", "FluxVLA Engine", "FluxTraining"],
  fit: locale === "zh"
    ? ["机器人科研与教学", "具身算法训练与部署", "制造、服务与移动操作验证"]
    : ["Robotics research and teaching", "Embodied-model training and deployment", "Manufacturing, service, and mobile-manipulation validation"],
  overview: locale === "zh" ? [
    "逐际动力 2022 年在深圳成立。公司官网将其核心技术归纳为机器人本体、运动控制和具身智能相关能力，公开产品横跨全尺寸人形、多形态双足平台以及算法训练与部署工具。",
    "当前硬件目录由 Luna、Oli、TRON 2 和 TRON 1 组成。Luna 偏交互型全尺寸人形，Oli 以 Lite、EDU、Super 三个版本覆盖通用人形开发，TRON 2 面向双臂移动操作与足/轮形态，TRON 1 面向可更换足端的双足研究。",
    "FluxVLA Engine 和 FluxTraining 分别覆盖 VLA 工程化工作流与云端机器人算法训练。公开页面能说明兼容范围和功能，但不能替代项目中的算力费用、数据权利、服务等级和最终硬件配置确认。",
  ] : [
    "LimX Dynamics was founded in Shenzhen in 2022. Its official material describes core work in robot hardware, motion control, and embodied intelligence, spanning full-size humanoids, multi-form biped platforms, and training and deployment tools.",
    "The current hardware catalog consists of Luna, Oli, TRON 2, and TRON 1. Luna is positioned for full-size interaction, Oli spans Lite, EDU, and Super development editions, TRON 2 targets dual-arm mobile manipulation with sole and wheel forms, and TRON 1 supports biped research with interchangeable foot ends.",
    "FluxVLA Engine and FluxTraining cover VLA engineering and cloud robotics training. Public pages establish compatibility and functional scope, but project-specific compute cost, data rights, service levels, and final hardware configuration still require confirmation.",
  ],
  businessAreas: locale === "zh"
    ? ["人形与多形态机器人本体", "通用运动控制与遥操作", "VLA 模型训练、仿真和真机部署", "机器人云端训练与实验管理"]
    : ["Humanoid and multi-form robot hardware", "General motion control and teleoperation", "VLA training, simulation, and real-robot deployment", "Cloud robotics training and experiment management"],
  customerGroups: locale === "zh"
    ? ["高校与机器人实验室", "具身智能算法与数据团队", "制造、物流和服务场景集成团队", "机器人开发者与教学团队"]
    : ["Universities and robotics laboratories", "Embodied-AI model and data teams", "Manufacturing, logistics, and service integrators", "Robotics developers and teaching teams"],
  milestones: locale === "zh" ? [
    { date: "2022-01", event: "公司在深圳成立。" },
    { date: "2023-09", event: "公开 W1 轮足机器人；同年 10 月公开 P1 双足机器人和近 2 亿元天使轮及 Pre-A 轮融资。" },
    { date: "2024-07", event: "完成由阿里巴巴领投的 A 轮融资；同年 10 月发布 TRON 1。" },
    { date: "2025-07", event: "获得京东战略投资并发布 Oli；同年 9 月公开 Data Recipe 与 DreamActor。" },
    { date: "2026-02", event: "宣布完成 2 亿美元 B 轮融资。" },
    { date: "2026-04", event: "发布 FluxVLA Engine。" },
    { date: "2026-05", event: "发布 Luna。" },
    { date: "2026-07", event: "宣布近 2 亿美元 Pre-IPO 轮融资。" },
  ] : [
    { date: "2022-01", event: "Founded in Shenzhen." },
    { date: "2023-09", event: "Published the W1 wheeled quadruped; in October, published the P1 biped and announced nearly RMB 200 million across angel and Pre-A financing." },
    { date: "2024-07", event: "Completed a Series A led by Alibaba; released TRON 1 in October." },
    { date: "2025-07", event: "Received strategic investment from JD.com and released Oli; published Data Recipe and DreamActor in September." },
    { date: "2026-02", event: "Announced a USD 200 million Series B." },
    { date: "2026-04", event: "Released FluxVLA Engine." },
    { date: "2026-05", event: "Released Luna." },
    { date: "2026-07", event: "Announced a nearly USD 200 million pre-IPO round." },
  ],
  catalogScope: locale === "zh"
    ? "按官网当前产品导航收录 Luna、Oli、TRON 2、TRON 1、FluxVLA Engine 与 FluxTraining；历史 W1、P1、CL-1 等原型不作为当前商品目录。"
    : "The current official product navigation is indexed: Luna, Oli, TRON 2, TRON 1, FluxVLA Engine, and FluxTraining. Earlier W1, P1, and CL-1 prototypes are not treated as current catalog products.",
  catalogCoverage: "model-partial",
  verificationFocus: locale === "zh"
    ? "硬件需锁定版本、末端、感知、计算和开发权限；软件平台需确认许可、算力计费、数据权利、可复现性与服务边界。"
    : "For hardware, lock edition, end effector, sensing, compute, and development access. For software platforms, confirm licensing, compute billing, data rights, reproducibility, and service boundaries.",
  presalesQuestions: locale === "zh" ? [
    "目标任务需要哪一版本体、足端、末端执行器和感知配置？",
    "低层控制、传感数据、仿真、遥操作和 OTA 权限分别开放到什么程度？",
    "官网实验室参数在目标地面、负载、温度和连续运行工况下如何验收？",
  ] : [
    "Which body edition, foot end, end effector, and sensing configuration does the task require?",
    "What access is provided for low-level control, sensor data, simulation, teleoperation, and OTA updates?",
    "How will published laboratory figures be accepted under the target floor, load, temperature, and continuous-duty conditions?",
  ],
  sourceIds: company.sourceIds,
  reviewedAt: "2026-09-04",
});

export const applyVerifiedCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => (
  company.slug === "limx-dynamics" ? limxCompanyPatch(locale, company) : company
);

const lunaRows: SpecRow[] = [
  { label: l("身高", "Height"), value: l("160 cm", "160 cm") },
  { label: l("肩宽", "Shoulder width"), value: l("47 cm", "47 cm") },
  { label: l("手臂长度（含手）", "Arm length (with hand)"), value: l("69 cm", "69 cm") },
  { label: l("整机质量（含电池）", "Weight (with battery)"), value: l("56 kg", "56 kg") },
  { label: l("主动自由度", "Active DoF"), value: l("27", "27") },
  { label: l("单腿自由度", "Leg DoF"), value: l("6", "6") },
  { label: l("单臂自由度", "Arm DoF"), value: l("5", "5") },
  { label: l("腰部自由度", "Waist DoF"), value: l("3", "3") },
  { label: l("颈部自由度", "Neck DoF"), value: l("2", "2") },
  { label: l("控制器", "Controller"), value: l("遥控器（含充电线）和触控平板", "Remote controller with charging cable and tablet") },
  { label: l("标配末端", "Standard end effectors"), value: l("仿人手、拳形手", "Humanoid hand and fist-shaped hand") },
  { label: l("可选末端", "Optional end effector"), value: l("五指手（6 自由度）", "5-finger hand (6 DoF)") },
  { label: l("颈部关节范围", "Neck joint range"), value: l("俯仰 ±30°；偏航 ±45°", "Pitch ±30°; yaw ±45°") },
  { label: l("肩部关节范围", "Shoulder joint range"), value: l("俯仰 -60°~175°；横滚 -5°~110°；偏航 -90°~145°", "Pitch -60° to 175°; roll -5° to 110°; yaw -90° to 145°") },
  { label: l("肘部关节范围", "Elbow joint range"), value: l("俯仰 -30°~137°", "Pitch -30° to 137°") },
  { label: l("腕部关节范围", "Wrist joint range"), value: l("偏航 ±90°", "Yaw ±90°") },
  { label: l("腰部关节范围", "Waist joint range"), value: l("俯仰 -45°~30°；横滚 ±30°；偏航 ±90°", "Pitch -45° to 30°; roll ±30°; yaw ±90°") },
  { label: l("髋部关节范围", "Hip joint range"), value: l("俯仰 -90°~175°；横滚 -60°~90°；偏航 ±90°", "Pitch -90° to 175°; roll -60° to 90°; yaw ±90°") },
  { label: l("膝部关节范围", "Knee joint range"), value: l("俯仰 +5°~140°", "Pitch +5° to 140°") },
  { label: l("踝部关节范围", "Ankle joint range"), value: l("俯仰 -35°~58°；横滚 ±25°", "Pitch -35° to 58°; roll ±25°") },
  { label: l("主控散热", "Main-control cooling"), value: l("风冷", "Air cooling") },
  { label: l("无线通信", "Wireless communication"), value: l("Wi-Fi 6、Bluetooth", "Wi-Fi 6 and Bluetooth") },
  { label: l("惯性测量单元", "IMU"), value: l("自研 6 轴 IMU", "Self-developed 6-axis IMU") },
  { label: l("视觉传感器", "Vision sensor"), value: l("RGB 相机", "RGB camera") },
  { label: l("电池模块", "Battery modules"), value: l("抽拉式电池 ×2", "Two slide-out battery modules") },
  { label: l("电池容量", "Battery capacity"), value: l("10,000 mAh", "10,000 mAh") },
  { label: l("续航", "Battery life"), value: l("约 4 h", "About 4 h"), conditions: standardConditions },
  { label: l("补能方式", "Recharging method"), value: l("直充 / 换电", "Direct charging / battery swapping") },
  { label: l("充电时间", "Charging time"), value: l("约 1 h", "About 1 h"), conditions: standardConditions },
  { label: l("充电输入电压", "Charging input voltage"), value: l("110–220 V", "110–220 V") },
  { label: l("充电器输出", "Charger output"), value: l("58.8 V / 10 A", "58.8 V / 10 A") },
  { label: l("单臂最大负载", "Maximum arm payload"), value: l("3 kg", "3 kg"), conditions: standardConditions },
  { label: l("最大行走速度", "Maximum walking speed"), value: l("5 km/h", "5 km/h"), conditions: standardConditions },
  { label: l("最大电机扭矩", "Maximum motor torque"), value: l("200 N·m", "200 N·m"), conditions: l("不同电机最大扭矩不同；该值为最高扭矩电机的上限。", "Maximum torque varies by motor; this is the highest-torque motor's maximum.") },
  { label: l("运控计算", "Motion-control compute"), value: l("RK3588 / 16 GB / 256 GB", "RK3588 / 16 GB / 256 GB") },
  { label: l("感知计算", "Perception compute"), value: l("RK3588 / 8 GB / 32 GB", "RK3588 / 8 GB / 32 GB") },
  { label: l("交互硬件", "Interaction hardware"), value: l("面部交互屏、麦克风、扬声器、LED 灯带", "Facial interaction screen, microphone, speaker, and LED strip") },
  { label: l("LimX UP", "LimX UP"), value: l("标配；含账户登录、设备连接、基础控制和状态切换", "Standard; includes account login, device connection, basic control, and state switching") },
  { label: l("舞蹈程序", "Dance routines"), value: l("20", "20") },
  { label: l("动作程序", "Motion actions"), value: l("20", "20") },
  { label: l("LimX Studio", "LimX Studio"), value: l("支持视频模仿、手动示教、编舞、智能任务与群控", "Supports video imitation, manual teaching, choreography, intelligent tasks, and group control") },
  { label: l("云端动捕训练平台", "Cloud motion-capture training platform"), value: l("支持；需订阅", "Available; subscription required") },
  { label: l("COSA", "COSA"), value: l("支持", "Supported") },
  { label: l("保修", "Warranty"), value: l("12 个月", "12 months") },
  { label: l("OTA 更新", "OTA update"), value: l("支持", "Supported") },
  { label: l("随附配置", "Included accessories"), value: l("专属皮肤、便携运输箱", "Exclusive skin and portable transport case") },
];

const oliRows: SpecRow[] = [
  { label: l("产品版本", "Editions"), value: l("Oli Lite / Oli EDU / Oli Super", "Oli Lite / Oli EDU / Oli Super") },
  { label: l("身高", "Height"), value: l("Lite 165 cm；EDU 165 cm；Super 175 cm", "Lite 165 cm; EDU 165 cm; Super 175 cm") },
  { label: l("肩宽", "Shoulder width"), value: l("Lite 55 cm；EDU 55 cm；Super 60 cm", "Lite 55 cm; EDU 55 cm; Super 60 cm") },
  { label: l("手臂长度", "Arm length"), value: l("Lite 70 cm；EDU 70 cm；Super 80 cm", "Lite 70 cm; EDU 70 cm; Super 80 cm") },
  { label: l("整机质量（含电池）", "Weight (battery included)"), value: l("Lite ≤55 kg；EDU ≤55 kg；Super ≤60 kg", "Lite ≤55 kg; EDU ≤55 kg; Super ≤60 kg") },
  { label: l("主动自由度", "Active DoF"), value: l("Lite 31；EDU 33；Super 43", "Lite 31; EDU 33; Super 43") },
  { label: l("单腿自由度", "Single-leg DoF"), value: l("6", "6") },
  { label: l("单臂自由度", "Single-arm DoF"), value: l("7", "7") },
  { label: l("腰部自由度", "Waist DoF"), value: l("3", "3") },
  { label: l("颈部自由度", "Neck DoF"), value: l("2", "2") },
  { label: l("仿人手", "Humanoid hand"), value: l("三版本标配", "Standard on all three editions") },
  { label: l("两指夹爪（1 自由度）", "2-finger gripper (1 DoF)"), value: l("Lite 无；EDU 标配；Super 标配", "Lite none; EDU standard; Super standard") },
  { label: l("五指手（6 自由度）", "5-finger hand (6 DoF)"), value: l("Lite 无；EDU 可选；Super 标配", "Lite none; EDU optional; Super standard") },
  { label: l("自研两指夹爪（1 自由度）", "Self-developed 2-finger gripper (1 DoF)"), value: l("Lite 无；EDU 可选；Super 可选", "Lite none; EDU optional; Super optional") },
  { label: l("自研三指夹爪（4 自由度）", "Self-developed 3-finger gripper (4 DoF)"), value: l("Lite 无；EDU 可选；Super 可选", "Lite none; EDU optional; Super optional") },
  { label: l("遥控器", "Remote controller"), value: l("三版本标配", "Standard on all three editions") },
  { label: l("手持急停", "Handheld emergency stop"), value: l("Lite 无；EDU 可选；Super 标配", "Lite none; EDU optional; Super standard") },
  { label: l("颈部关节范围", "Neck joint range"), value: l("EDU：俯仰 -30°~45°；偏航 ±45°", "EDU: pitch -30° to 45°; yaw ±45°") },
  { label: l("肩部关节范围", "Shoulder joint range"), value: l("EDU：俯仰 ±160°；横滚 -5°~185°；偏航 -90°~195°", "EDU: pitch ±160°; roll -5° to 185°; yaw -90° to 195°") },
  { label: l("肘部关节范围", "Elbow joint range"), value: l("EDU：俯仰 -66°~137°", "EDU: pitch -66° to 137°") },
  { label: l("腕部关节范围", "Wrist joint range"), value: l("EDU：俯仰 ±90°；横滚 ±90°；偏航 -45°~135°", "EDU: pitch ±90°; roll ±90°; yaw -45° to 135°") },
  { label: l("腰部关节范围", "Waist joint range"), value: l("EDU：俯仰 -30°~45°；横滚 ±30°；偏航 ±150°", "EDU: pitch -30° to 45°; roll ±30°; yaw ±150°") },
  { label: l("髋部关节范围", "Hip joint range"), value: l("EDU：俯仰 ±150°；横滚 -50°~120°；偏航 ±150°", "EDU: pitch ±150°; roll -50° to 120°; yaw ±150°") },
  { label: l("膝部关节范围", "Knee joint range"), value: l("EDU：俯仰 +5°~148°", "EDU: pitch +5° to 148°") },
  { label: l("踝部关节范围", "Ankle joint range"), value: l("EDU：俯仰 -35°~58°；横滚 ±25°", "EDU: pitch -35° to 58°; roll ±25°") },
  { label: l("主控散热", "Main-control cooling"), value: l("三版本风冷；EDU 优化，Super 增强", "Air-cooled on all editions; optimized on EDU and enhanced on Super") },
  { label: l("Wi-Fi 6", "Wi-Fi 6"), value: l("三版本标配", "Standard on all three editions") },
  { label: l("Bluetooth", "Bluetooth"), value: l("三版本标配", "Standard on all three editions") },
  { label: l("USB 3.0/3.2", "USB 3.0/3.2"), value: l("Lite 无；EDU/Super 标配，支持 USB Hub", "Lite none; standard on EDU/Super with USB hub support") },
  { label: l("千兆以太网（RJ45）", "Gigabit Ethernet (RJ45)"), value: l("Lite 无；EDU/Super 标配 ×2", "Lite none; two ports on EDU/Super") },
  { label: l("Type-C", "Type-C"), value: l("仅 Super 标配，支持 USB Hub", "Standard on Super only; USB hub supported") },
  { label: l("5G", "5G"), value: l("仅 Super 标配", "Standard on Super only") },
  { label: l("24 V / 5 A 电源接口", "24 V / 5 A power ports"), value: l("Lite 无；EDU ×2；Super ×4", "Lite none; EDU ×2; Super ×4") },
  { label: l("12 V / 5 A 电源接口", "12 V / 5 A power ports"), value: l("Lite 无；EDU ×2；Super ×4", "Lite none; EDU ×2; Super ×4") },
  { label: l("惯性测量单元", "IMU"), value: l("Lite/EDU 自研 6 轴；Super 自研 9 轴", "Lite/EDU self-developed 6-axis; Super self-developed 9-axis") },
  { label: l("头部深度相机", "Head depth camera"), value: l("Lite 无；EDU/Super 标配", "Lite none; standard on EDU/Super") },
  { label: l("胸部深度相机", "Chest depth camera"), value: l("Lite 无；EDU/Super 标配", "Lite none; standard on EDU/Super") },
  { label: l("腕部深度相机安装位", "Wrist depth-camera mount"), value: l("仅 Super 标配", "Standard on Super only") },
  { label: l("髋部深度相机", "Hip depth camera"), value: l("仅 Super 标配", "Standard on Super only") },
  { label: l("激光雷达", "LiDAR"), value: l("仅 Super 标配", "Standard on Super only") },
  { label: l("电池容量", "Battery capacity"), value: l("三版本 9,500 mAh", "9,500 mAh on all three editions") },
  { label: l("续航", "Battery life"), value: l("Lite 约 2 h；EDU/Super 约 1.5 h", "Lite about 2 h; EDU/Super about 1.5 h"), conditions: standardConditions },
  { label: l("充电器", "Charger"), value: l("58.8 V / 10 A", "58.8 V / 10 A") },
  { label: l("抽拉式电池", "Slide-out battery modules"), value: l("Lite 无；EDU/Super ×2", "Lite none; EDU/Super ×2") },
  { label: l("单臂最大负载", "Maximum single-arm payload"), value: l("Lite/EDU 3 kg；Super 5 kg", "Lite/EDU 3 kg; Super 5 kg"), conditions: standardConditions },
  { label: l("最大移动速度", "Maximum moving speed"), value: l("5 km/h", "5 km/h"), conditions: standardConditions },
  { label: l("最大关节扭矩", "Maximum joint torque"), value: l("Lite/EDU 150 N·m；Super 250 N·m", "Lite/EDU 150 N·m; Super 250 N·m"), conditions: l("不同电机最大扭矩不同；该值为最高扭矩电机的上限。", "Maximum torque varies by motor; this is the highest-torque motor's maximum.") },
  { label: l("计算配置", "Compute configuration"), value: l("Lite：RK3588/8G/64G，无感知计算；EDU：RK3588/8G/64G + Orin NX 157 TOPS/16G/1T；Super：RK3588/16G/256G + Orin NX 157 TOPS/16G/2T", "Lite: RK3588/8G/64G, no perception compute; EDU: RK3588/8G/64G + Orin NX 157 TOPS/16G/1T; Super: RK3588/16G/256G + Orin NX 157 TOPS/16G/2T") },
  { label: l("计算背包", "Compute backpack"), value: l("仅 Super 可选：NVIDIA AGX Orin、64 GB、275 TOPS", "Optional on Super only: NVIDIA AGX Orin, 64 GB, 275 TOPS") },
  { label: l("语音交互模块", "Voice interaction module"), value: l("Lite 无；EDU/Super 标配", "Lite none; standard on EDU/Super") },
  { label: l("LED 指示、状态监控和基础动作库", "LEDs, status monitoring, and basic motion library"), value: l("三版本标配", "Standard on all three editions") },
  { label: l("动作库扩展服务", "Motion-library expansion service"), value: l("Lite 可选；EDU/Super 标配", "Optional on Lite; standard on EDU/Super") },
  { label: l("二次开发", "Custom development"), value: l("Lite 无；EDU/Super 支持", "Lite none; supported on EDU/Super") },
  { label: l("遥控 API", "Remote-control API"), value: l("Lite 无；EDU/Super 支持", "Lite none; supported on EDU/Super") },
  { label: l("传感器 API", "Sensor API"), value: l("Lite 无；EDU：视觉与 IMU；Super：视觉、IMU 与激光雷达", "Lite none; EDU: vision and IMU; Super: vision, IMU, and LiDAR") },
  { label: l("低层和高层运动控制 API", "Low- and high-level motion-control APIs"), value: l("Lite 无；EDU/Super 支持", "Lite none; supported on EDU/Super") },
  { label: l("OTA 更新", "OTA updates"), value: l("三版本支持", "Supported on all three editions") },
  { label: l("Studio 套件", "Studio package"), value: l("Lite 无；EDU 可选；Super 标配", "Lite none; EDU optional; Super standard") },
  { label: l("保修", "Warranty"), value: l("12 个月", "12 months") },
];

const tron2Rows: SpecRow[] = [
  { label: l("产品版本", "Editions"), value: l("TRON 2 EDU / TRON 2 Standard", "TRON 2 EDU / TRON 2 Standard") },
  { label: l("机身材料", "Material"), value: l("铝合金、塑料", "Aluminum alloy and plastic") },
  { label: l("单臂自由度", "Single-arm DoF"), value: l("7", "7") },
  { label: l("单腿自由度", "Single-leg DoF"), value: l("5", "5") },
  { label: l("主动视觉头自由度", "Active-vision head DoF"), value: l("2", "2") },
  { label: l("二次开发", "Secondary development"), value: l("EDU 支持；Standard 不支持", "Supported on EDU; unavailable on Standard") },
  { label: l("足式/轮式控制功能", "Sole/wheeled control functions"), value: l("四向移动、转向、静态站立、原地蹲起、机身高度调节、跌倒起身和离地检测", "Four-directional movement, turning, static standing, in-place squat, height adjustment, fall recovery, and ground-clearance detection") },
  { label: l("双臂遥操作方式", "Dual-arm teleoperation"), value: l("EDU：VR 设备；Standard 不支持", "EDU: VR device; unavailable on Standard") },
  { label: l("数据采集与存储", "Data collection and storage"), value: l("EDU 支持；Standard 不支持", "Supported on EDU; unavailable on Standard") },
  { label: l("双臂安全边界保护", "Dual-arm safety-boundary protection"), value: l("EDU 支持；Standard 不支持", "Supported on EDU; unavailable on Standard") },
  { label: l("末端最大负载", "Maximum end-effector payload"), value: l("单臂最大 5 kg；完全伸展时 3 kg", "Maximum 5 kg per arm; 3 kg when extended"), conditions: standardConditions },
  { label: l("末端最大速度", "Maximum end-effector speed"), value: l("5 m/s", "5 m/s"), conditions: standardConditions },
  { label: l("末端最大加速度", "Maximum end-effector acceleration"), value: l("36 m/s²", "36 m/s²"), conditions: standardConditions },
  { label: l("重复定位精度", "Repeat positioning accuracy"), value: l("±0.5 mm", "±0.5 mm"), conditions: standardConditions },
  { label: l("遥操作延迟", "Teleoperation latency"), value: l("100 ms", "100 ms"), conditions: standardConditions },
  { label: l("末端执行器类型", "End-effector type"), value: l("夹爪 / 灵巧手", "Gripper / dexterous hand") },
  { label: l("夹爪抓力", "Gripper force"), value: l("20 N", "20 N"), conditions: standardConditions },
  { label: l("夹爪最大开口", "Maximum gripper width"), value: l("85 mm", "85 mm"), conditions: standardConditions },
  { label: l("最大移动速度", "Maximum movement speed"), value: l("足式 2–3 m/s；轮式 3–5 m/s", "Sole 2–3 m/s; wheeled 3–5 m/s"), conditions: standardConditions },
  { label: l("最大爬坡角度", "Maximum climbing slope"), value: l("足式 15°；轮式 30°", "Sole 15°; wheeled 30°"), conditions: standardConditions },
  { label: l("最大台阶高度", "Maximum step height"), value: l("20 cm", "20 cm"), conditions: standardConditions },
  { label: l("移动负载", "Mobile payload"), value: l("平地行走 30 kg；爬楼梯 20 kg", "30 kg on level ground; 20 kg on stairs"), conditions: standardConditions },
  { label: l("电池输出电压", "Battery output voltage"), value: l("46.8 V", "46.8 V") },
  { label: l("电池最大功率", "Maximum battery power"), value: l("2,800 W", "2,800 W") },
  { label: l("电池更换", "Battery replacement"), value: l("支持", "Supported") },
  { label: l("电池类型", "Battery type"), value: l("三元锂电池", "Ternary lithium battery") },
  { label: l("电池容量", "Battery capacity"), value: l("9 Ah", "9 Ah") },
  { label: l("充电功率", "Charging power"), value: l("542 W", "542 W") },
  { label: l("充电输入电压/电流", "Charging input voltage/current"), value: l("100–240 V / 8 A", "100–240 V / 8 A") },
  { label: l("充电输出电压/电流", "Charging output voltage/current"), value: l("54.2 V / 10 A", "54.2 V / 10 A") },
  { label: l("充电时间", "Charging time"), value: l("20%–80%：30 min；20%–100%：54 min", "20%–80%: 30 min; 20%–100%: 54 min") },
  { label: l("腰部 RGBD 相机", "Waist RGBD camera"), value: l("标配", "Standard") },
  { label: l("IMU", "IMU"), value: l("标配", "Standard") },
  { label: l("头部 RGBD 相机", "Head RGBD camera"), value: l("仅双臂配置", "Dual-arm configuration only") },
  { label: l("腕部 RGBD 相机", "Wrist RGBD camera"), value: l("仅双臂配置", "Dual-arm configuration only") },
  { label: l("以太网接口", "Ethernet"), value: l("1 个", "1 port") },
  { label: l("USB 3.0 接口", "USB 3.0"), value: l("1 个", "1 port") },
  { label: l("EtherCAT 接口", "EtherCAT"), value: l("2 个", "2 ports") },
  { label: l("RS-485 接口", "RS-485"), value: l("1 个", "1 port") },
  { label: l("12 V 电源输出", "12 V power output"), value: l("未提供", "Unavailable") },
  { label: l("24 V 电源输出", "24 V power output"), value: l("2 个", "2 ports") },
  { label: l("48 V 电源输出", "48 V power output"), value: l("1 个", "1 port") },
  { label: l("外部供电接口", "External power-supply port"), value: l("1 个", "1 port") },
  { label: l("扩展计算 CPU", "Expansion-module CPU"), value: l("EDU：Intel Core Ultra；Standard 无", "EDU: Intel Core Ultra; unavailable on Standard") },
  { label: l("扩展存储", "Expansion-module storage"), value: l("EDU：2 TB；Standard 无", "EDU: 2 TB; unavailable on Standard") },
  { label: l("扩展计算接口", "Expansion-module interfaces"), value: l("EDU：3×ETH、3×USB 3.0、1×24 V 输入、1×12 V 输出；Standard 无", "EDU: 3×ETH, 3×USB 3.0, 1×24 V input, 1×12 V output; unavailable on Standard") },
  { label: l("开发指南（SDK）", "Development guide (SDK)"), value: l("EDU 支持；Standard 不支持", "Supported on EDU; unavailable on Standard") },
  { label: l("机器人管理平台（Studio）", "Robot management platform (Studio)"), value: l("EDU 与 Standard 均支持", "Supported on EDU and Standard") },
  { label: l("仿真器与算法示例", "Simulator and algorithm examples"), value: l("EDU 支持；Standard 不支持", "Supported on EDU; unavailable on Standard") },
  { label: l("软件兼容性", "Software compatibility"), value: l("EDU 支持 Python、C++、ROS 1/ROS 2；Standard 不支持开发环境", "EDU supports Python, C++, ROS 1, and ROS 2; development environments are unavailable on Standard") },
];

const tron1Rows: SpecRow[] = [
  { label: l("产品版本", "Editions"), value: l("TRON 1 Standard / TRON 1 EDU", "TRON 1 Standard / TRON 1 EDU") },
  { label: l("外形尺寸", "Dimensions"), value: l("≤392 × 420 × 845 mm", "≤392 × 420 × 845 mm") },
  { label: l("机身材料", "Material"), value: l("铝合金 + 工业塑料", "Aluminum alloy + industrial plastic") },
  { label: l("净重", "Net weight"), value: l("≤20 kg", "≤20 kg") },
  { label: l("电池供电电压", "Battery supply voltage"), value: l("46.8 V", "46.8 V") },
  { label: l("电池最大功率", "Maximum battery power"), value: l("1,000 W", "1,000 W") },
  { label: l("换电", "Battery swapping"), value: l("支持", "Supported") },
  { label: l("电池类型", "Battery type"), value: l("三元锂电池", "Ternary lithium") },
  { label: l("电池容量", "Battery capacity"), value: l("4.5 Ah", "4.5 Ah") },
  { label: l("续航", "Battery range"), value: l("≤2 h", "≤2 h"), conditions: standardConditions },
  { label: l("充电方式", "Charging methods"), value: l("电池充电 / 快速换电", "Battery charging / quick battery swap") },
  { label: l("充电器", "Charger"), value: l("电池充电底座", "Battery charging dock") },
  { label: l("充电时间", "Charging time"), value: l("20%–80%：<1 h；充满：1.5 h", "20%–80%: <1 h; full: 1.5 h") },
  { label: l("负载", "Payload"), value: l("≤10 kg", "≤10 kg"), conditions: standardConditions },
  { label: l("移动速度", "Motion speed"), value: l("点足 <1 m/s；脚掌 <1 m/s；轮式 ≤3 m/s", "Point foot <1 m/s; sole <1 m/s; wheeled ≤3 m/s"), conditions: l("官网注释说明爬坡、越障和移动速度数据在轮式状态下获得。", "The official note states that climbing, obstacle, and movement-speed data were obtained in wheeled mode.") },
  { label: l("最大爬坡角", "Maximum climbing angle"), value: l("≤30°", "≤30°"), conditions: standardConditions },
  { label: l("最大越障高度", "Maximum obstacle height"), value: l("≤20 cm", "≤20 cm"), conditions: standardConditions },
  { label: l("计算机配置", "Computer specification"), value: l("第 12 代 Intel i3 / 16 GB / 512 GB", "12th Gen Intel i3 / 16 GB / 512 GB") },
  { label: l("工作温度", "Operating temperature"), value: l("-5~40 °C；适宜天气条件", "-5 to 40 °C; favorable weather conditions") },
  { label: l("执行器额定电压", "Actuator rated voltage"), value: l("48 V", "48 V") },
  { label: l("执行器额定扭矩", "Actuator rated torque"), value: l("30 N·m", "30 N·m") },
  { label: l("执行器峰值扭矩", "Actuator peak torque"), value: l("60 N·m", "60 N·m") },
  { label: l("执行器峰值速度", "Actuator peak speed"), value: l("15 rad/s", "15 rad/s") },
  { label: l("RGBD 相机", "RGBD camera"), value: l("Standard 无；EDU 预留为 0 / 未列为标配", "Standard none; EDU shown as 0 / not listed as standard") },
  { label: l("IMU", "IMU"), value: l("Standard 标配；EDU 标配并提供 IMU 数据", "Standard; EDU standard with IMU data") },
  { label: l("外设扩展接口", "Peripheral expansion ports"), value: l("USB 3.0 ×1、千兆以太网 ×1", "USB 3.0 ×1 and GbE ×1") },
  { label: l("外设供电接口", "Peripheral power-supply port"), value: l("24 V；输出 100 W，峰值 200 W", "24 V; 100 W output, 200 W peak") },
  { label: l("外设安装位", "Peripheral mounting point"), value: l("支持", "Supported") },
  { label: l("手持遥控器", "Handheld remote controller"), value: l("标配", "Standard") },
  { label: l("遥控通信距离", "Remote-control range"), value: l("50 m", "50 m") },
  { label: l("遥控急停", "Remote emergency stop"), value: l("支持", "Supported") },
  { label: l("软件升级", "Software upgrade"), value: l("支持", "Supported") },
  { label: l("二次开发", "Secondary development"), value: l("Standard 不支持；EDU 支持", "Unavailable on Standard; supported on EDU") },
  { label: l("SDK", "SDK"), value: l("Standard 无；EDU 支持", "Unavailable on Standard; supported on EDU") },
  { label: l("数据可视化", "Data visualization"), value: l("Standard 无；EDU 支持", "Unavailable on Standard; supported on EDU") },
  { label: l("数据记录与回放", "Data recording and playback"), value: l("Standard 无；EDU 支持", "Unavailable on Standard; supported on EDU") },
  { label: l("关节控制算法", "Joint-control algorithm"), value: l("Standard 无；EDU 支持", "Unavailable on Standard; supported on EDU") },
  { label: l("仿真平台", "Simulation platform"), value: l("两版本官网规格表均未列为提供", "Not listed as provided for either edition") },
  { label: l("点足运动功能", "Point-foot functions"), value: l("四向移动、转向、踏步、下蹲、机身高度调节和离地检测", "Four-directional movement, turning, stepping, squatting, height adjustment, and ground-clearance detection") },
  { label: l("脚掌运动功能", "Sole functions"), value: l("四向移动、转向、静态站立、原地蹲起、机身高度调节、跌倒起身和离地检测", "Four-directional movement, turning, static standing, in-place squat, height adjustment, fall recovery, and ground-clearance detection") },
  { label: l("轮式运动功能", "Wheeled functions"), value: l("前后移动、转向、原地站立、原地蹲起、机身高度调节、跌倒起身和离地检测", "Forward/backward movement, turning, in-place standing and squat, height adjustment, fall recovery, and ground-clearance detection") },
  { label: l("机身急停按钮", "E-stop button"), value: l("标配", "Standard") },
  { label: l("备用电池", "Spare battery"), value: l("Standard / EDU 均可选", "Optional on Standard and EDU") },
  { label: l("防滚架", "Roll cage"), value: l("标配", "Standard") },
  { label: l("点足附件", "Point-foot accessory"), value: l("Standard 标配；EDU 可选", "Standard on Standard edition; optional on EDU") },
  { label: l("轮式附件", "Wheeled accessory"), value: l("Standard 无；EDU 可选", "Unavailable on Standard; optional on EDU") },
  { label: l("脚掌附件", "Sole accessory"), value: l("Standard 标配；EDU 可选", "Standard on Standard edition; optional on EDU") },
];

type HardwarePatch = {
  url: string;
  rows: SpecRow[];
  level: FinderEvidence["level"];
  type: Localized;
  integration: Localized;
  verification: Localized;
  overview: Localized[];
  highlights: Array<{ title: Localized; detail: Localized }>;
  applications: Localized[];
  variants?: Array<{ series: string; model: string; form: string; dimensions: string }>;
};

const hardwarePatches: Record<string, HardwarePatch> = {
  "exp-limx-luna": {
    url: LIMX_LUNA,
    rows: lunaRows,
    level: "model",
    type: l("全尺寸交互人形机器人", "Full-size interactive humanoid robot"),
    integration: l("集成人形本体、面部交互屏、语音、RGB 相机、双电池和 LimX 软件工具。", "Integrates a humanoid body, facial display, voice, RGB camera, dual batteries, and LimX software tools."),
    verification: l("重点核对 27 自由度本体、3 kg 单臂负载、可选六自由度五指手、订阅服务和目标现场续航。", "Verify the 27-DoF body, 3 kg arm payload, optional 6-DoF five-finger hand, subscription services, and endurance at the target site."),
    overview: [
      l("Luna 是逐际动力面向交互与服务场景的全尺寸人形机器人，官网规格表公开机械尺寸、关节范围、感知、计算、电池、交互硬件和软件配置。", "Luna is LimX Dynamics' full-size humanoid for interaction and service scenarios. Its official table publishes mechanics, joint ranges, sensing, compute, battery, interaction hardware, and software configuration."),
      l("它与 Oli 的定位不同：Luna 的公开配置强调面部显示、语音和预置动作，单臂最大负载为 3 kg；开发与任务能力仍需结合 LimX Studio、COSA 和实际交付版本确认。", "Its positioning differs from Oli: Luna emphasizes facial display, voice, and preset motions, with a published maximum arm payload of 3 kg. Development and task capability still depend on LimX Studio, COSA, and the delivered edition."),
    ],
    highlights: [
      { title: l("交互配置", "Interaction"), detail: l("面部交互屏、麦克风、扬声器和 LED 灯带。", "Facial display, microphone, speaker, and LED strip.") },
      { title: l("双电池", "Dual battery"), detail: l("两块抽拉式 10,000 mAh 电池，支持直充和换电。", "Two slide-out 10,000 mAh batteries with direct charging and swapping.") },
      { title: l("软件工具", "Software tooling"), detail: l("LimX UP、LimX Studio、云端动捕训练平台与 COSA。", "LimX UP, LimX Studio, a cloud motion-capture training platform, and COSA.") },
    ],
    applications: [l("展陈、接待和互动服务验证", "Exhibition, reception, and interactive-service validation"), l("人形机器人交互与动作开发", "Humanoid interaction and motion development")],
  },
  "exp-limx-oli": {
    url: LIMX_OLI,
    rows: oliRows,
    level: "family",
    type: l("全尺寸通用人形机器人系列", "Full-size general-purpose humanoid family"),
    integration: l("Lite、EDU、Super 共用人形本体架构，末端、感知、计算和开发权限按版本递增。", "Lite, EDU, and Super share a humanoid architecture, with progressively different end effectors, sensing, compute, and development access."),
    verification: l("选型必须落到 Lite、EDU 或 Super；不能把 Super 的 43 自由度、5 kg 单臂负载或 250 N·m 峰值扩展到其他版本。", "Selection must resolve to Lite, EDU, or Super; Super's 43 DoF, 5 kg arm payload, and 250 N·m maximum must not be assigned to other editions."),
    overview: [
      l("Oli 是逐际动力的全尺寸通用人形系列。官网以三列对照表区分 Lite、EDU 和 Super，差异覆盖身高、自由度、末端、传感器、计算配置、开发 API 和 Studio 套件。", "Oli is LimX Dynamics' full-size general-purpose humanoid family. The official three-column table distinguishes Lite, EDU, and Super across dimensions, DoF, end effectors, sensors, compute, APIs, and Studio tooling."),
      l("Lite 更接近基础动作与交互配置；EDU 开放二次开发、控制与传感 API；Super 增加更高自由度、负载、关节扭矩、感知和算力。采购和参数检索均应保留版本条件。", "Lite is closer to a basic motion and interaction configuration; EDU opens secondary development and control and sensor APIs; Super adds DoF, payload, joint torque, sensing, and compute. Edition conditions must be retained in procurement and parameter search."),
    ],
    highlights: [
      { title: l("三版本矩阵", "Three-edition matrix"), detail: l("31 / 33 / 43 主动自由度，配置不能跨版本合并。", "31 / 33 / 43 active DoF; configurations cannot be merged across editions.") },
      { title: l("开发边界", "Development boundary"), detail: l("Lite 不开放二次开发，EDU 和 Super 提供控制与传感接口。", "Lite does not provide secondary development; EDU and Super expose control and sensing interfaces.") },
      { title: l("Super 增量", "Super additions"), detail: l("5 kg 单臂负载、250 N·m 最高关节扭矩、激光雷达和更高算力配置。", "5 kg arm payload, 250 N·m highest joint torque, LiDAR, and higher compute configuration.") },
    ],
    applications: [l("人形机器人科研与教学", "Humanoid research and teaching"), l("制造、服务和通用操作开发", "Manufacturing, service, and general-manipulation development")],
    variants: [
      { series: "Oli", model: "Oli Lite", form: "31 DoF", dimensions: "165 cm / ≤55 kg" },
      { series: "Oli", model: "Oli EDU", form: "33 DoF", dimensions: "165 cm / ≤55 kg" },
      { series: "Oli", model: "Oli Super", form: "43 DoF", dimensions: "175 cm / ≤60 kg" },
    ],
  },
  "exp-limx-tron2": {
    url: LIMX_TRON2,
    rows: tron2Rows,
    level: "family",
    type: l("多形态具身机器人", "Multi-form embodied robot"),
    integration: l("通过双臂、足式/轮式移动、RGBD 感知、VR 遥操作与可选扩展计算组成移动操作平台。", "Combines dual arms, sole/wheeled mobility, RGBD sensing, VR teleoperation, and optional expansion compute for mobile manipulation."),
    verification: l("区分 EDU 与 Standard 的开发权限和扩展模块，并按末端伸展、地面与楼梯工况核对负载。", "Separate EDU and Standard development access and expansion modules, and verify payload by arm extension, level-ground, and stair conditions."),
    overview: [
      l("TRON 2 是足式和轮式可切换的多形态平台，公开规格覆盖双臂操作、移动性能、供电、传感器、通信与开发工具。", "TRON 2 is a multi-form platform switchable between sole and wheel modes. The official table covers dual-arm manipulation, mobility, power, sensors, interfaces, and developer tools."),
      l("EDU 版提供二次开发、VR 双臂遥操作、数据采集、扩展计算和 SDK；Standard 保留基础运动与 Studio 管理，但不应被视为同等开发平台。", "The EDU edition provides secondary development, VR dual-arm teleoperation, data collection, expansion compute, and an SDK. Standard retains base motion and Studio management but should not be treated as an equivalent development platform."),
    ],
    highlights: [
      { title: l("双臂操作", "Dual-arm manipulation"), detail: l("每臂最大 5 kg，伸展时 3 kg；重复定位精度 ±0.5 mm。", "Up to 5 kg per arm, 3 kg extended; ±0.5 mm repeat positioning accuracy.") },
      { title: l("足/轮移动", "Sole/wheel mobility"), detail: l("足式 2–3 m/s，轮式 3–5 m/s。", "2–3 m/s in sole mode and 3–5 m/s in wheeled mode.") },
      { title: l("开发接口", "Developer interfaces"), detail: l("Ethernet、USB 3.0、EtherCAT、RS-485；EDU 支持 Python、C++ 和 ROS 1/2。", "Ethernet, USB 3.0, EtherCAT, and RS-485; EDU supports Python, C++, and ROS 1/2.") },
    ],
    applications: [l("移动操作与遥操作研究", "Mobile-manipulation and teleoperation research"), l("数据采集、算法验证与场景集成", "Data collection, algorithm validation, and deployment integration")],
    variants: [
      { series: "TRON 2", model: "TRON 2 EDU", form: "Development edition", dimensions: "7-DoF arm / 5-DoF leg" },
      { series: "TRON 2", model: "TRON 2 Standard", form: "Standard edition", dimensions: "7-DoF arm / 5-DoF leg" },
    ],
  },
  "exp-limx-tron1": {
    url: LIMX_TRON1,
    rows: tron1Rows,
    level: "family",
    type: l("多模态双足机器人平台", "Multi-modal biped robot platform"),
    integration: l("同一本体可安装点足、脚掌或轮式足端，并提供遥控、扩展供电与 EDU 开发工具。", "One body supports point-foot, sole, or wheeled ends, with remote control, peripheral power, and EDU development tools."),
    verification: l("区分 Standard 与 EDU 的开发权限，并把速度、爬坡和越障指标限定在官网说明的轮式测试条件。", "Separate Standard and EDU development access and constrain speed, slope, and obstacle figures to the wheeled test conditions stated by the manufacturer."),
    overview: [
      l("TRON 1 是可更换点足、脚掌和轮式足端的双足研究平台。官网规格表公开机械、电池、运动、执行器、扩展、遥控、软件和附件矩阵。", "TRON 1 is a biped research platform with interchangeable point-foot, sole, and wheeled ends. Its official table publishes mechanical, battery, motion, actuator, expansion, remote-control, software, and accessory fields."),
      l("Standard 版保留基础运动与遥控能力；EDU 版开放二次开发、SDK、数据可视化、记录回放和关节控制算法。官网特别说明速度、爬坡和越障数据取自轮式状态。", "Standard retains basic motion and remote operation; EDU opens secondary development, SDK, visualization, recording and playback, and joint-control algorithms. The official note specifically ties speed, climbing, and obstacle figures to wheeled mode."),
    ],
    highlights: [
      { title: l("三种足端", "Three foot ends"), detail: l("点足、脚掌和轮式附件具有不同运动能力与版本配置。", "Point-foot, sole, and wheel accessories have different motion capabilities and edition availability.") },
      { title: l("执行器", "Actuator"), detail: l("48 V，额定 30 N·m，峰值 60 N·m，峰值 15 rad/s。", "48 V, 30 N·m rated, 60 N·m peak, and 15 rad/s peak speed.") },
      { title: l("EDU 工具", "EDU tooling"), detail: l("SDK、可视化、数据记录回放和关节控制算法。", "SDK, visualization, data recording and playback, and joint-control algorithms.") },
    ],
    applications: [l("双足和轮足运动研究", "Biped and wheeled-leg locomotion research"), l("强化学习、控制与教育开发", "Reinforcement learning, control, and education")],
    variants: [
      { series: "TRON 1", model: "TRON 1 Standard", form: "Standard edition", dimensions: "≤392 × 420 × 845 mm" },
      { series: "TRON 1", model: "TRON 1 EDU", form: "Development edition", dimensions: "≤392 × 420 × 845 mm" },
    ],
  },
};

export const applyVerifiedProductPatch = (record: FinderExpansionRecord, locale: Locale): FinderExpansionRecord => {
  const patch = hardwarePatches[record.id];
  if (!patch) return record;
  const sourceLabel = locale === "zh" ? "逐际动力官方规格表" : "LimX Dynamics official specification table";
  return {
    ...record,
    reviewedAt: "2026-09-04",
    officialUrl: patch.url,
    type: t(locale, patch.type),
    openness: locale === "zh" ? "官网提供当前版本对照规格表" : "The official site provides a current edition-comparison table",
    integration: t(locale, patch.integration),
    verificationFocus: t(locale, patch.verification),
    parameters: verifiedSpecs(locale, patch.url, patch.rows),
    catalogCoverage: patch.level === "model" ? "family-complete" : "model-partial",
    catalogScope: locale === "zh" ? "覆盖当前官方规格表列出的全部字段和版本差异。" : "Covers every field and edition difference listed in the current official specification table.",
    evidence: {
      level: patch.level,
      specificationKind: "parameters",
      specificationCoverage: "official-complete",
      specificationCoverageNote: locale === "zh"
        ? "已逐行转录当前官方规格表；数值条件、版本差异和未提供项均保留。"
        : "The current official specification table has been transcribed row by row, preserving conditions, edition differences, and unavailable fields.",
      overview: patch.overview.map((item) => t(locale, item)),
      highlights: patch.highlights.map((item) => ({ title: t(locale, item.title), detail: t(locale, item.detail) })),
      variants: patch.variants,
      applications: patch.applications.map((item) => t(locale, item)),
      disclosureBoundary: t(locale, standardConditions),
      sourceLinks: [
        { label: sourceLabel, url: patch.url },
        { label: locale === "zh" ? "逐际动力公司介绍" : "LimX Dynamics company introduction", url: LIMX_ABOUT },
      ],
    },
  };
};

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

const capabilityParameter = (locale: Locale, url: string, label: Localized, value: Localized): FinderParameter => ({
  label: t(locale, label),
  value: t(locale, value),
  status: "manufacturer",
  sourceUrl: url,
  sourceLabel: locale === "zh" ? "产品官方页面" : "Official product page",
});

export const getVerifiedAdditionalProductRecords = (locale: Locale, company: CompanyProfile): FinderExpansionRecord[] => {
  const common = {
    matrixSlug: "",
    matrixTitle: locale === "zh" ? "逐际动力当前产品目录" : "Current LimX Dynamics product catalog",
    industry: "robotics" as const,
    reviewedAt: "2026-09-04",
    company: company.name,
    openness: locale === "zh" ? "官网公开平台说明" : "Official platform description is public",
    sourceIds: [],
    category: "model-software" as const,
    useCases: ["research", "integration"] as FinderExpansionRecord["useCases"],
    opennessLevel: "open" as const,
    catalogPrimary: "software-tools",
    catalogSubclass: "development-tool",
    catalogCoverage: "family-complete" as const,
    profile: finderProfile(company),
  };

  return [
    {
      ...common,
      id: "verified-limx-fluxvla",
      product: "FluxVLA Engine",
      type: locale === "zh" ? "开源 VLA 工程框架" : "Open-source VLA engineering framework",
      officialUrl: LIMX_FLUXVLA,
      integration: locale === "zh" ? "统一数据处理、模型、训练、评测、推理、仿真与真机部署配置。" : "Unifies configuration for data processing, models, training, evaluation, inference, simulation, and real-robot deployment.",
      verificationFocus: locale === "zh" ? "按代码版本核对支持模型、本体、仿真器、许可证和厂商性能测试环境。" : "Verify supported models, robots, simulators, licensing, and benchmark environment against the exact code version.",
      parameters: [
        capabilityParameter(locale, LIMX_FLUXVLA, l("开源范围", "Open-source scope"), l("代码、模型权重和文档", "Code, model weights, and documentation")),
        capabilityParameter(locale, LIMX_FLUXVLA, l("模型类型", "Model types"), l("VLM、VLA、WAM", "VLM, VLA, and WAM")),
        capabilityParameter(locale, LIMX_FLUXVLA, l("示例模型", "Example models"), l("Qwen、GR00T、Pi 系列、OpenVLA 等", "Qwen, GR00T, Pi family, OpenVLA, and others")),
        capabilityParameter(locale, LIMX_FLUXVLA, l("仿真兼容", "Simulation compatibility"), l("Isaac Sim、LIBERO、RoboCasa", "Isaac Sim, LIBERO, and RoboCasa")),
        capabilityParameter(locale, LIMX_FLUXVLA, l("硬件兼容", "Hardware compatibility"), l("LimX Oli、TRON 2、UR 协作机器人、ALOHA 双臂等", "LimX Oli, TRON 2, UR cobots, ALOHA dual-arm systems, and others")),
        capabilityParameter(locale, LIMX_FLUXVLA, l("官方推理加速口径", "Published inference speedup"), l("5–10×", "5–10×")),
        capabilityParameter(locale, LIMX_FLUXVLA, l("轨迹平滑", "Trajectory smoothing"), l("集成 Real-Time Chunking（RTC）等方法", "Includes Real-Time Chunking (RTC) and related methods")),
      ],
      evidence: {
        level: "platform",
        specificationKind: "capabilities",
        specificationCoverage: "capability-only",
        specificationCoverageNote: locale === "zh" ? "官网公开的是框架能力和兼容范围，不存在硬件式完整参数表。" : "The official page publishes framework capabilities and compatibility rather than a hardware-style specification table.",
        overview: locale === "zh" ? ["FluxVLA Engine 是面向 VLA 数据、训练、评测、推理、仿真和真机部署的开源工程框架。", "其统一配置和模块化接口用于替换视觉编码器、语言骨干与动作头，并连接多种模型、仿真器和机器人。"] : ["FluxVLA Engine is an open engineering framework for VLA data, training, evaluation, inference, simulation, and real-robot deployment.", "Its unified configuration and modular interfaces support replacing vision encoders, language backbones, and action heads while connecting multiple models, simulators, and robots."],
        applications: locale === "zh" ? ["VLA 研究、工程验证和真机部署"] : ["VLA research, engineering validation, and real-robot deployment"],
        disclosureBoundary: locale === "zh" ? "5–10 倍加速和 30 分钟端到端流程均为厂商测试口径，不能脱离模型、硬件和任务环境比较。" : "The 5–10× speedup and 30-minute workflow are manufacturer test claims and cannot be compared without model, hardware, and task context.",
        sourceLinks: [{ label: locale === "zh" ? "FluxVLA Engine 官方页面" : "FluxVLA Engine official page", url: LIMX_FLUXVLA }],
      },
    },
    {
      ...common,
      id: "verified-limx-fluxtraining",
      product: "FluxTraining",
      type: locale === "zh" ? "机器人算法云端训练与实验管理平台" : "Cloud robotics training and experiment-management platform",
      officialUrl: LIMX_FLUX,
      integration: locale === "zh" ? "提供预装环境、云端算力、在线 IDE、云桌面、存储、多人协作与实验追踪。" : "Provides prebuilt environments, cloud compute, an online IDE, cloud desktop, storage, collaboration, and experiment tracking.",
      verificationFocus: locale === "zh" ? "确认支持镜像、GPU 与计费、数据保存和导出、访问控制、服务可用性及本地部署边界。" : "Confirm supported images, GPU and billing, data retention and export, access control, availability, and local-deployment boundaries.",
      parameters: [
        capabilityParameter(locale, LIMX_FLUX, l("平台形态", "Platform form"), l("云端机器人算法训练平台", "Cloud robotics algorithm-training platform")),
        capabilityParameter(locale, LIMX_FLUX, l("训练场景", "Training scenarios"), l("强化学习与模仿学习", "Reinforcement learning and imitation learning")),
        capabilityParameter(locale, LIMX_FLUX, l("官方环境", "Official environments"), l("6 个官方优化镜像，覆盖 Isaac Gym / Isaac Sim", "Six officially optimized images covering Isaac Gym / Isaac Sim")),
        capabilityParameter(locale, LIMX_FLUX, l("开发方式", "Development access"), l("在线 IDE、云桌面、CLI", "Online IDE, cloud desktop, and CLI")),
        capabilityParameter(locale, LIMX_FLUX, l("实验能力", "Experiment features"), l("多任务并行、AI 参数调整、环境复用和实验追踪", "Parallel tasks, AI-assisted tuning, environment reuse, and experiment tracking")),
        capabilityParameter(locale, LIMX_FLUX, l("目标用户", "Target users"), l("高校教师、研究团队、学生和机器人算法初学者", "University instructors, research groups, students, and robotics-algorithm beginners")),
      ],
      evidence: {
        level: "platform",
        specificationKind: "capabilities",
        specificationCoverage: "capability-only",
        specificationCoverageNote: locale === "zh" ? "官网公开平台能力，但未在公开页列出固定 GPU 套餐、价格或 SLA。" : "The official page publishes platform capabilities but does not list fixed GPU plans, pricing, or an SLA on the public page.",
        overview: locale === "zh" ? ["FluxTraining 是面向机器人算法训练的云端环境与实验管理平台。", "公开功能包括预装环境、按需云算力、在线 IDE、云桌面、多任务并行、参数调整和实验可追踪。"] : ["FluxTraining is a cloud environment and experiment-management platform for robotics algorithm training.", "Public features include prebuilt environments, on-demand cloud compute, an online IDE, cloud desktop, parallel tasks, parameter tuning, and experiment traceability."],
        applications: locale === "zh" ? ["机器人教学、强化学习、模仿学习和实验复现"] : ["Robotics teaching, reinforcement learning, imitation learning, and experiment reproduction"],
        disclosureBoundary: locale === "zh" ? "算力规格、价格、配额、数据保留、SLA 和本地部署方案需在实际采购或注册时确认。" : "Compute specifications, pricing, quotas, data retention, SLA, and local-deployment options require confirmation during signup or procurement.",
        sourceLinks: [{ label: locale === "zh" ? "FluxTraining 官方页面" : "FluxTraining official page", url: LIMX_FLUX }],
      },
    },
  ];
};
