import type { Locale } from "../site";
import type { PrecisionProductRecord } from "./robodict-precision";
import { phaseOneCountryBySlug } from "./robodict-phase-one";
import { deepResearchCountryBySlug, deepResearchFundingBySlug } from "./robodict-deep-research";
import { getCompanyFinancialDisclosure, getJeelingProductRecords, getStandaloneRepositoryCompanyPath, getStandaloneRepositoryProductPath } from "./index";
import { getJeelingTaxonomy } from "./jeeling-taxonomy";
import { repositoryCountryCode } from "./company-country";
import { mechInvestorClassification } from "./catalog-enrichment-mech-history";
import { hesaiInvestorClassification } from "./catalog-enrichment-hesai-history";
const cache = new Map<Locale, ReturnType<typeof createJeelingRecords>>();
export function getJeelingRecords(locale: Locale) {
  if (!cache.has(locale)) cache.set(locale, createJeelingRecords(locale));
  return cache.get(locale)!;
}
function createJeelingRecords(locale: Locale) {
const { catalogPairs } = getJeelingTaxonomy(locale);
const countryByKey: Record<string, string> = {
  unitree: "cn", "booster-robotics": "cn", galbot: "cn", "noetix-robotics": "cn", ubtech: "cn", agibot: "cn", "fourier-intelligence": "cn",
  orbbec: "cn", livox: "cn", "d-robotics": "cn", leaderdrive: "cn", kinco: "cn", "changxing-power": "cn", "mech-mind": "cn", linkerbot: "cn",
  "inspire-robots": "cn", paxini: "cn", "dh-robotics": "cn", "kunwei-technology": "cn", synapx: "cn", "boston-dynamics": "us", "agility-robotics": "us",
  "figure-ai": "us", apptronik: "us", "physical-intelligence": "us", "nvidia-robotics": "us", psyonic: "us", "ati-industrial-automation": "us", syntouch: "us",
  "1x-technologies": "no", "sanctuary-ai": "ca", "pal-robotics": "es", "neura-robotics": "de", "harmonic-drive": "de", faulhaber: "de", schunk: "de",
  "hexagon-robotics": "se", wandercraft: "fr", maxon: "ch", qbrobotics: "it", "seed-robotics": "pt", "shadow-robot": "gb", xela: "jp",
  "wonik-robotics": "kr", tesollo: "kr", gelsight: "us", "google-deepmind": "gb",
  kepler: "cn", engineai: "cn", robotera: "cn", "limx dynamics": "cn", contactile: "au", robotiq: "ca", tacterion: "de", weart: "it",
  robotis: "kr", cubemars: "cn", "ati industrial automation": "us",
  ...deepResearchCountryBySlug,
  ...phaseOneCountryBySlug,
};

const fundingByKey: Record<string, { stage: string; scale: string }> = {
  "figure-ai": { stage: "series-c", scale: "over-1b" },
  apptronik: { stage: "series-a", scale: "100m-1b" },
  ...deepResearchFundingBySlug,
  "mech-mind": mechInvestorClassification,
  hesai: hesaiInvestorClassification,
};

const rawRecords = getJeelingProductRecords(locale);

const precisionFor = (record: (typeof rawRecords)[number]): PrecisionProductRecord["precision"] | null => (
  "precision" in record ? (record as PrecisionProductRecord).precision : null
);

const catalogClassificationOverrides: Record<string, { primary: string; subclass: string }> = {
  "parallel-global-pal-robotics-tiago-expansion-panel": { primary: "communication-connectivity", subclass: "io-module" },
  "parallel-global-boston-dynamics-spot-dock": { primary: "power-energy", subclass: "charger" },
  "parallel-global-boston-dynamics-spot-battery-2024-specification": { primary: "power-energy", subclass: "battery-pack" },
  "parallel-global-boston-dynamics-spot-charger-2024-specification": { primary: "power-energy", subclass: "charger" },
  "parallel-global-boston-dynamics-spot-tablet-2024-specification": { primary: "control-compute", subclass: "industrial-hmi" },
  "parallel-global-boston-dynamics-spot-robot-travel-case": { primary: "structure-thermal", subclass: "structure" },
  "parallel-global-boston-dynamics-spot-power-travel-case": { primary: "structure-thermal", subclass: "structure" },
  "dobot-parallel-arms-dobot-safeskin": { primary: "sensing", subclass: "sensor-general" },
  "ufactory-parallel-arms-ufactory-ai1500": { primary: "sensing", subclass: "force-torque-sensor" },
  "jaka-robotics-parallel-arms-jaka-lens-vps": { primary: "sensing", subclass: "vision-sensor" },
  "jaka-robotics-parallel-arms-jaka-lens-2d": { primary: "sensing", subclass: "vision-sensor" },
  "jaka-robotics-parallel-arms-end-effector-6-axis-force-sensor-assembly": { primary: "sensing", subclass: "force-torque-sensor" },
  "robot-model-software-compute-2": { primary: "software-tools", subclass: "robot-model" },
  "robot-model-software-compute-3": { primary: "software-tools", subclass: "development-tool" },
  "robot-model-software-compute-4": { primary: "control-compute", subclass: "edge-compute" },
  "robot-model-software-compute-5": { primary: "software-tools", subclass: "development-tool" },
  "robot-perception-components-3": { primary: "sensing", subclass: "force-torque-sensor" },
  "tactile-force-sensing-1": { primary: "sensing", subclass: "force-torque-sensor" },
  "exp-tacterion-flex": { primary: "sensing", subclass: "tactile-sensor" },
  "exp-weart-touchdiver": { primary: "sensing", subclass: "tactile-sensor" },
};

const explicitCatalogAliases: Record<string, { primary: string; subclass: string }> = {
  "robot-platform/inventory-robot": { primary: "robot-platform", subclass: "mobile-robot" },
  "robot-platform/social-robot": { primary: "robot-platform", subclass: "robot-platform-general" },
  "end-effector/dexterous-hand": { primary: "manipulator-end-effector", subclass: "dexterous-hand" },
  "perception/tactile-sensor": { primary: "sensing", subclass: "tactile-sensor" },
  "perception/vision-sensor": { primary: "sensing", subclass: "vision-sensor" },
  "perception/camera": { primary: "sensing", subclass: "vision-sensor" },
  "perception/thermal-camera": { primary: "sensing", subclass: "vision-sensor" },
  "perception/gas-sensor": { primary: "sensing", subclass: "sensor-general" },
  "perception/inspection-payload": { primary: "sensing", subclass: "sensor-general" },
  "perception/human-robot-interface": { primary: "control-compute", subclass: "industrial-hmi" },
  "motion/compute-kit": { primary: "control-compute", subclass: "edge-compute" },
  "motion/robot-controller": { primary: "control-compute", subclass: "robot-controller" },
  "motion/motion-controller": { primary: "control-compute", subclass: "robot-controller" },
  "motion/artificial-muscle": { primary: "motion-transmission", subclass: "artificial-muscle" },
  "motion/linear-motion": { primary: "structure-thermal", subclass: "linear-guide" },
  "motion/positioner": { primary: "motion-transmission", subclass: "rotary-actuator" },
  "motion/joint-module": { primary: "motion-transmission", subclass: "integrated-joint" },
  "motion-transmission/tool-changer": { primary: "manipulator-end-effector", subclass: "tool-changer" },
  "motion-transmission/structure": { primary: "structure-thermal", subclass: "structure" },
  "sensing/io-module": { primary: "communication-connectivity", subclass: "io-module" },
  "model-software/robot-software": { primary: "software-tools", subclass: "application-software" },
  "model-software/robotics-software": { primary: "software-tools", subclass: "application-software" },
  "model-software/fleet-management": { primary: "software-tools", subclass: "application-software" },
  "model-software/embodied-ai-model": { primary: "software-tools", subclass: "robot-model" },
  "robot-platform/desktop-arm": { primary: "robot-platform", subclass: "industrial-arm" },
  "robot-platform/research-arm": { primary: "robot-platform", subclass: "industrial-arm" },
  "robot-platform/assistive-arm": { primary: "robot-platform", subclass: "industrial-arm" },
  "robot-platform/palletizing-arm": { primary: "robot-platform", subclass: "industrial-arm" },
  "robot-platform/collaborative-arm": { primary: "robot-platform", subclass: "industrial-arm" },
  "robot-platform/cognitive-arm": { primary: "robot-platform", subclass: "industrial-arm" },
  "robot-platform/dual-arm-platform": { primary: "robot-platform", subclass: "robot-platform-general" },
  "robot-platform/mobile-manipulator": { primary: "robot-platform", subclass: "mobile-robot" },
  "robot-platform/mobile-base": { primary: "robot-platform", subclass: "mobile-robot" },
  "robot-platform/autonomous-mobile-robot": { primary: "robot-platform", subclass: "mobile-robot" },
  "robot-platform/mobile-manipulator-base": { primary: "robot-platform", subclass: "mobile-robot" },
  "robot-platform/industrial-humanoid": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/general-purpose-humanoid": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/home-humanoid": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/wheeled-humanoid": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/wheeled-general-purpose-robot": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/biomimetic-humanoid": { primary: "robot-platform", subclass: "bionic-humanoid" },
  "robot-platform/lifelike-humanoid": { primary: "robot-platform", subclass: "bionic-humanoid" },
  "robot-platform/consumer-humanoid": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/open-humanoid": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/compact-humanoid": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/bipedal-robot": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/bipedal-platform": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/dual-arm-humanoid": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/dual-arm-research-platform": { primary: "robot-platform", subclass: "humanoid-robot" },
  "robot-platform/wheeled-manipulator": { primary: "robot-platform", subclass: "mobile-robot" },
  "robot-platform/wheeled-leg-robot": { primary: "robot-platform", subclass: "mobile-robot" },
  "robot-platform/heavy-wheeled-leg-robot": { primary: "robot-platform", subclass: "mobile-robot" },
  "robot-platform/delivery-robot": { primary: "robot-platform", subclass: "mobile-robot" },
  "robot-platform/cleaning-robot": { primary: "robot-platform", subclass: "mobile-robot" },
  "robot-platform/service-robot": { primary: "robot-platform", subclass: "robot-platform-general" },
  "robot-platform/rehabilitation-robot": { primary: "robot-platform", subclass: "robot-platform-general" },
  "robot-platform/medical-exoskeleton": { primary: "robot-platform", subclass: "robot-platform-general" },
  "robot-platform/education-robot": { primary: "robot-platform", subclass: "robot-platform-general" },
  "robot-platform/education-kit": { primary: "robot-platform", subclass: "robot-platform-general" },
  "robot-platform/robot-accessory": { primary: "robot-platform", subclass: "robot-platform-general" },
  "manipulator-end-effector/robotic-arm": { primary: "manipulator-end-effector", subclass: "robot-arm" },
  "manipulator-end-effector/parallel-gripper": { primary: "manipulator-end-effector", subclass: "gripper" },
  "manipulator-end-effector/adaptive-gripper": { primary: "manipulator-end-effector", subclass: "gripper" },
  "manipulator-end-effector/rotary-gripper": { primary: "manipulator-end-effector", subclass: "gripper" },
  "manipulator-end-effector/centric-gripper": { primary: "manipulator-end-effector", subclass: "gripper" },
  "end-effector/parallel-gripper": { primary: "manipulator-end-effector", subclass: "gripper" },
  "end-effector/vacuum-gripper": { primary: "manipulator-end-effector", subclass: "vacuum-gripper" },
  "end-effector/integrated-humanoid-hand": { primary: "manipulator-end-effector", subclass: "dexterous-hand" },
  "end-effector/hydraulic-dexterous-hand": { primary: "manipulator-end-effector", subclass: "dexterous-hand" },
  "perception/human-detection-sensor": { primary: "sensing", subclass: "sensor-general" },
  "perception/cobot-sensing-kit": { primary: "sensing", subclass: "sensor-general" },
  "perception/force-torque-sensor": { primary: "sensing", subclass: "force-torque-sensor" },
  "motion-transmission/linear-actuator": { primary: "motion-transmission", subclass: "transmission" },
  "motion-transmission/force-sensing-linear-actuator": { primary: "motion-transmission", subclass: "transmission" },
  "motion-transmission/electric-cylinder": { primary: "motion-transmission", subclass: "transmission" },
  "motion-transmission/flexible-transport": { primary: "motion-transmission", subclass: "transmission" },
  "motion-transmission/hexapod-stage": { primary: "motion-transmission", subclass: "transmission" },
  "motion-transmission/servo-drive": { primary: "control-compute", subclass: "motor-driver" },
  "motion-transmission/power-supply": { primary: "power-energy", subclass: "power-supply" },
  "control-compute/teleoperation": { primary: "software-tools", subclass: "application-software" },
  "software-tools/fleet-orchestration": { primary: "software-tools", subclass: "application-software" },
  "software-tools/facility-assessment": { primary: "software-tools", subclass: "application-software" },
  "model-software/fleet-orchestration": { primary: "software-tools", subclass: "application-software" },
  "model-software/whole-body-vla": { primary: "software-tools", subclass: "robot-model" },
  "model-software/robot-data-platform": { primary: "software-tools", subclass: "development-tool" },
  "model-software/teleoperation-data": { primary: "software-tools", subclass: "development-tool" },
  "model-software/cross-embodiment-vla": { primary: "software-tools", subclass: "robot-model" },
  "model-software/physical-ai-control-platform": { primary: "software-tools", subclass: "robot-model" },
  "model-software/robot-teaching": { primary: "software-tools", subclass: "application-software" },
};

const classifyCatalog = (record: (typeof rawRecords)[number]) => {
  if (catalogClassificationOverrides[record.id]) return catalogClassificationOverrides[record.id];
  if ("catalogPrimary" in record && record.catalogPrimary && record.catalogSubclass) {
    const explicitPair = `${record.catalogPrimary}/${record.catalogSubclass}`;
    return explicitCatalogAliases[explicitPair] ?? { primary: record.catalogPrimary, subclass: record.catalogSubclass };
  }
  const precision = precisionFor(record);
  if (precision?.productClass === "motor-servo") return { primary: "motion-transmission", subclass: "motor-servo" };
  if (precision?.productClass === "integrated-joint") return { primary: "motion-transmission", subclass: "integrated-joint" };
  if (precision?.productClass === "force-tactile-sensor") {
    return {
      primary: "sensing",
      subclass: precision.subtypeKey === "tactile-array" ? "tactile-sensor" : "force-torque-sensor",
    };
  }

  const productText = `${record.product} ${record.type}`.toLocaleLowerCase();
  const text = `${productText} ${record.integration} ${record.profile?.valueChainRole ?? ""} ${record.profile?.positioning ?? ""}`.toLocaleLowerCase();
  if (record.category === "robot-platform") {
    if (/(四足|quadruped)/.test(productText)) return { primary: "robot-platform", subclass: "quadruped-robot" };
    if (/(超仿生|高拟真|仿真人|逼真人形|lifelike|ultra.?bionic|bionic humanoid|realistic humanoid)/.test(productText)) return { primary: "robot-platform", subclass: "bionic-humanoid" };
    if (/(人形|humanoid)/.test(productText)) return { primary: "robot-platform", subclass: "humanoid-robot" };
    if (/(移动|轮式|mobile|wheeled|amr|agv)/.test(productText)) return { primary: "robot-platform", subclass: "mobile-robot" };
    if (/(机械臂|协作机器人|industrial arm|cobot|robot arm)/.test(productText)) return { primary: "robot-platform", subclass: "industrial-arm" };
    return { primary: "robot-platform", subclass: "robot-platform-general" };
  }
  if (record.category === "end-effector") {
    if (/(夹爪|夹持|gripper|gripping)/.test(productText)) return { primary: "manipulator-end-effector", subclass: "gripper" };
    if (/(灵巧手|五指|多指|dexterous|\bhand\b|five.finger|multi.finger)/.test(productText)) return { primary: "manipulator-end-effector", subclass: "dexterous-hand" };
    if (/(快换|换枪盘|tool changer|quick.change)/.test(productText)) return { primary: "manipulator-end-effector", subclass: "tool-changer" };
    if (/(机械臂|robot arm|manipulator)/.test(productText)) return { primary: "manipulator-end-effector", subclass: "robot-arm" };
    if (/(腿|足端|\bleg\b|\bfoot\b)/.test(productText)) return { primary: "manipulator-end-effector", subclass: "leg-module" };
    return { primary: "manipulator-end-effector", subclass: "end-effector-general" };
  }
  if (record.category === "motion") {
    if (/(谐波|行星减速|摆线|减速器|harmonic|planetary reducer|cycloidal|gearbox)/.test(productText)) return { primary: "motion-transmission", subclass: "reducer" };
    if (/(丝杠|同步带|传动|screw|belt|transmission)/.test(productText)) return { primary: "motion-transmission", subclass: "transmission" };
    if (/(关节模组|一体化关节|joint module|joint actuator|integrated joint)/.test(productText)) return { primary: "motion-transmission", subclass: "integrated-joint" };
    return { primary: "motion-transmission", subclass: "motor-servo" };
  }
  if (record.category === "perception") {
    if (/(触觉|压力阵列|tactile|pressure array)/.test(productText)) return { primary: "sensing", subclass: "tactile-sensor" };
    if (/(力矩|力传感|force.?torque|force sensor|torque sensor)/.test(productText)) return { primary: "sensing", subclass: "force-torque-sensor" };
    if (/(激光雷达|lidar)/.test(productText)) return { primary: "sensing", subclass: "lidar" };
    if (/(视觉|相机|深度|vision|camera|depth)/.test(productText)) return { primary: "sensing", subclass: "vision-sensor" };
    if (/(编码器|imu|惯性|位置|姿态|encoder|position|motion sensor)/.test(productText)) return { primary: "sensing", subclass: "position-motion-sensor" };
    return { primary: "sensing", subclass: "sensor-general" };
  }
  if (record.category === "model-software" || record.category === "enterprise-ai") {
    if (/(gpu|npu|算力|计算平台|jetson|compute platform|edge compute)/.test(text)) return { primary: "control-compute", subclass: "edge-compute" };
    if (/(仿真|数字孪生|simulation|simulator|digital twin)/.test(text)) return { primary: "software-tools", subclass: "simulation" };
    if (/(ros|中间件|运行时|middleware|runtime)/.test(text)) return { primary: "software-tools", subclass: "middleware" };
    if (/(数据|训练|开发工具|dataset|training|developer tool)/.test(text)) return { primary: "software-tools", subclass: "development-tool" };
    return { primary: "software-tools", subclass: "robot-model" };
  }
  return { primary: "software-tools", subclass: "development-tool" };
};

const interfaceCatalog = [
  { label: "CAN FD", pattern: /\bCAN\s*FD\b/i },
  { label: "CAN", pattern: /\bCAN\b(?!\s*FD)/i },
  { label: "RS-485", pattern: /\bRS[- ]?485\b/i },
  { label: "RS-232", pattern: /\bRS[- ]?232\b/i },
  { label: "EtherCAT", pattern: /\bEtherCAT\b/i },
  { label: "EtherNet/IP", pattern: /\bEtherNet\/?IP\b/i },
  { label: "PROFINET", pattern: /\bPROFINET\b/i },
  { label: "Ethernet", pattern: /\bEthernet\b|以太网/i },
  { label: "Modbus", pattern: /\bModbus\b/i },
  { label: "USB", pattern: /\bUSB\b/i },
  { label: "UART", pattern: /\bUART\b/i },
  { label: "TTL", pattern: /\bTTL\b/i },
  { label: "I2C", pattern: /\bI2C\b/i },
  { label: "SPI", pattern: /\bSPI\b/i },
  { label: "ROS 2", pattern: /\bROS\s*2\b/i },
  { label: "ROS", pattern: /\bROS\b(?!\s*2)/i },
  { label: "DAQ", pattern: /\bDAQ\b/i },
  { label: "DYNAMIXEL 2.0", pattern: /DYNAMIXEL\s*(Protocol\s*)?2\.0/i },
];

const interfacesForRecord = (record: (typeof rawRecords)[number]) => {
  const precision = precisionFor(record);
  if (precision?.interfaces.length) return [...new Set(precision.interfaces)];
  const text = (record.parameters ?? [])
    .filter((item) => item.status !== "unknown" && /interface|protocol|bus|network|connectiv|output signal|communication|ROS|接口|协议|总线|网络|通信|通讯|输出信号/i.test(item.label))
    .filter((item) => !/not supported|not included|not available|optional|depending|需确认|不支持|不包含|选配|可选/i.test(item.value))
    .map((item) => `${item.label} ${item.value}`).join(" ");
  return interfaceCatalog.filter((item) => item.pattern.test(text)).map((item) => item.label);
};

const records = rawRecords.map((record) => {
  const key = (record.profile?.slug || record.company).toLocaleLowerCase();
  const publicText = `${record.profile?.positioning ?? ""} ${record.openness} ${record.type}`.toLocaleLowerCase();
  const publicStage = /(原型|研究样机|prototype|research platform)/.test(publicText)
    ? "research"
    : /(试点|部署|pilot|deployment)/.test(publicText)
      ? "pilot"
      : /(产品|售价|公开|available|product)/.test(publicText)
        ? "public-product"
        : "unknown";
  const funding = fundingByKey[key] ?? { stage: "undisclosed", scale: "undisclosed" };
  const catalog = classifyCatalog(record);
  return {
    ...record,
    precision: "precision" in record ? record.precision : null,
    evidence: "evidence" in record ? record.evidence : undefined,
    catalogPrimary: catalog.primary,
    catalogSubclass: catalog.subclass,
    dataInterfaces: interfacesForRecord(record),
    investor: {
      country: repositoryCountryCode(record.profile?.country) ?? countryByKey[key] ?? "unknown",
      publicStage,
      fundingStage: funding.stage,
      fundingScale: funding.scale,
    },
    financialDisclosure: getCompanyFinancialDisclosure(record.profile?.slug ?? "", locale),
    companyPath: record.profile?.slug ? getStandaloneRepositoryCompanyPath(record.profile.slug, locale) : "",
    productPath: getStandaloneRepositoryProductPath(record.id, locale),
  };
});

const invalidCatalogRecords = records.filter((record) => !catalogPairs.has(`${record.catalogPrimary}/${record.catalogSubclass}`));
if (invalidCatalogRecords.length) {
  throw new Error(`Jeeling catalog classification is missing ${invalidCatalogRecords.map((record) => `${record.id}:${record.catalogPrimary}/${record.catalogSubclass}`).join(", ")}`);
}


return records;
}
