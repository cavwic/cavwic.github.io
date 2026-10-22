import type { Locale } from "../site";
import type { FinderExpansionRecord, FinderParameter } from "./product-finder-demo";

export type PrecisionProductClass = "motor-servo" | "integrated-joint" | "force-tactile-sensor";

export type PrecisionSpecs = {
  voltageV?: number;
  voltageOptionsV?: number[];
  ratedTorqueNm?: number;
  maxTorqueNm?: number;
  speedRpm?: number;
  massG?: number;
  reductionRatio?: number;
  axes?: number;
  forceRangeN?: number;
  samplingHz?: number;
};

export type PrecisionProductRecord = FinderExpansionRecord & {
  precision: {
    productClass: PrecisionProductClass;
    subtype: string;
    subtypeKey: string;
    interfaces: string[];
    lifecycle: "active" | "unknown";
    specs: PrecisionSpecs;
    conditions: string[];
  };
};

type Text = { zh: string; en: string };
type ParameterSeed = { label: Text; value: Text };
type PrecisionSeed = {
  id: string;
  company: Text;
  profileSlug: string;
  product: string;
  productClass: PrecisionProductClass;
  category: "motion" | "perception";
  subtype: Text;
  subtypeKey?: string;
  positioning: Text;
  integration: Text;
  verification: Text;
  officialUrl: string;
  interfaces: string[];
  specs: PrecisionSpecs;
  conditions: Text[];
  parameters: ParameterSeed[];
};

const text = (zh: string, en: string): Text => ({ zh, en });
const localize = (locale: Locale, value: Text) => value[locale];

const seeds: PrecisionSeed[] = [
  {
    id: "sku-robotis-xm430-w350-r",
    company: text("ROBOTIS", "ROBOTIS"),
    profileSlug: "robotis",
    product: "DYNAMIXEL XM430-W350-R",
    productClass: "motor-servo",
    category: "motion",
    subtype: text("总线型智能舵机", "Bus-connected smart servo"),
    positioning: text("带减速器、编码器和控制器的紧凑型智能舵机。", "A compact smart servo integrating gearing, an encoder, and control electronics."),
    integration: text("RS-485 多点总线，支持 DYNAMIXEL Protocol 2.0。", "RS-485 multidrop bus with DYNAMIXEL Protocol 2.0."),
    verification: text("堵转扭矩是瞬时口径，不能直接替代连续输出能力；需结合性能曲线和热工况选型。", "Stall torque is a momentary rating, not continuous output; use the performance curve and thermal duty for selection."),
    officialUrl: "https://emanual.robotis.com/docs/en/dxl/x/xm430-w350/",
    interfaces: ["RS-485", "DYNAMIXEL 2.0"],
    specs: { voltageV: 12, voltageOptionsV: [12], maxTorqueNm: 4.1, speedRpm: 46, massG: 82, reductionRatio: 353.5 },
    conditions: [text("扭矩和转速采用 12 V 厂商口径。", "Torque and speed use the manufacturer's 12 V rating."), text("最大扭矩为堵转扭矩。", "Maximum torque is the stall-torque rating.")],
    parameters: [
      { label: text("推荐电压", "Recommended voltage"), value: text("12 V", "12 V") },
      { label: text("堵转扭矩", "Stall torque"), value: text("4.1 N·m @ 12 V", "4.1 N·m @ 12 V") },
      { label: text("空载转速", "No-load speed"), value: text("46 rpm @ 12 V", "46 rpm @ 12 V") },
      { label: text("质量", "Mass"), value: text("82 g", "82 g") },
      { label: text("减速比", "Gear ratio"), value: text("353.5:1", "353.5:1") },
      { label: text("接口", "Interface"), value: text("RS-485 / DYNAMIXEL 2.0", "RS-485 / DYNAMIXEL 2.0") },
    ],
  },
  {
    id: "sku-robotis-xm430-w210-r",
    company: text("ROBOTIS", "ROBOTIS"),
    profileSlug: "robotis",
    product: "DYNAMIXEL XM430-W210-R",
    productClass: "motor-servo",
    category: "motion",
    subtype: text("高速型总线智能舵机", "Higher-speed bus smart servo"),
    positioning: text("与 XM430-W350 同系列、偏向较高转速的智能舵机型号。", "A higher-speed member of the XM430 smart-servo family."),
    integration: text("RS-485 多点总线，型号级控制与反馈通过 DYNAMIXEL 协议完成。", "RS-485 multidrop control and feedback through the DYNAMIXEL protocol."),
    verification: text("对比 W350 时需同时考虑速度、瞬时扭矩和连续热能力。", "Compare speed, momentary torque, and continuous thermal capability against the W350."),
    officialUrl: "https://emanual.robotis.com/docs/en/dxl/x/xm430-w350/",
    interfaces: ["RS-485", "DYNAMIXEL 2.0"],
    specs: { voltageV: 12, voltageOptionsV: [12], maxTorqueNm: 3, speedRpm: 77 },
    conditions: [text("扭矩和转速采用官方同系列对照表的 12 V 口径。", "Torque and speed use the official family comparison at 12 V."), text("最大扭矩为堵转扭矩。", "Maximum torque is the stall-torque rating.")],
    parameters: [
      { label: text("参考电压", "Reference voltage"), value: text("12 V", "12 V") },
      { label: text("堵转扭矩", "Stall torque"), value: text("3.0 N·m @ 12 V", "3.0 N·m @ 12 V") },
      { label: text("空载转速", "No-load speed"), value: text("77 rpm @ 12 V", "77 rpm @ 12 V") },
      { label: text("接口", "Interface"), value: text("RS-485 / DYNAMIXEL 2.0", "RS-485 / DYNAMIXEL 2.0") },
    ],
  },
  {
    id: "sku-robotis-xl430-w250-t",
    company: text("ROBOTIS", "ROBOTIS"),
    profileSlug: "robotis",
    product: "DYNAMIXEL XL430-W250-T",
    productClass: "motor-servo",
    category: "motion",
    subtype: text("TTL 总线智能舵机", "TTL-bus smart servo"),
    positioning: text("面向较轻负载机构和教育开发的紧凑型智能舵机。", "A compact smart servo for lighter mechanisms and educational development."),
    integration: text("TTL 半双工串行总线，支持 DYNAMIXEL 协议。", "TTL half-duplex serial bus with the DYNAMIXEL protocol."),
    verification: text("需核对实际负载曲线、安装刚度、供电裕量和连续运行温升。", "Verify the load curve, mounting stiffness, supply margin, and continuous temperature rise."),
    officialUrl: "https://emanual.robotis.com/docs/en/dxl/x/xm430-w350/",
    interfaces: ["TTL", "DYNAMIXEL 2.0"],
    specs: { voltageV: 12, voltageOptionsV: [12], maxTorqueNm: 1.5, speedRpm: 61 },
    conditions: [text("扭矩和转速采用官方同系列对照表的 12 V 口径。", "Torque and speed use the official family comparison at 12 V."), text("最大扭矩为堵转扭矩。", "Maximum torque is the stall-torque rating.")],
    parameters: [
      { label: text("参考电压", "Reference voltage"), value: text("12 V", "12 V") },
      { label: text("堵转扭矩", "Stall torque"), value: text("1.5 N·m @ 12 V", "1.5 N·m @ 12 V") },
      { label: text("空载转速", "No-load speed"), value: text("61 rpm @ 12 V", "61 rpm @ 12 V") },
      { label: text("接口", "Interface"), value: text("TTL / DYNAMIXEL 2.0", "TTL / DYNAMIXEL 2.0") },
    ],
  },
  {
    id: "sku-cubemars-ak40-10",
    company: text("CubeMars", "CubeMars"),
    profileSlug: "cubemars",
    product: "AK40-10 KV170",
    productClass: "integrated-joint",
    category: "motion",
    subtype: text("紧凑型一体化关节执行器", "Compact integrated joint actuator"),
    positioning: text("集成无刷电机、10:1 行星减速器、编码器和驱动器。", "Integrates a brushless motor, 10:1 planetary reduction, encoder, and drive electronics."),
    integration: text("支持 CAN、UART、伺服控制和 MIT 混合控制。", "Supports CAN, UART, servo control, and MIT hybrid control."),
    verification: text("峰值扭矩不可作为连续额定扭矩；腕部应用还需核对热、回差和线缆弯折。", "Peak torque is not continuous torque; wrist use also requires thermal, backlash, and cable-flex checks."),
    officialUrl: "https://www.cubemars.com/product/ak40-10-robotic-actuator.html",
    interfaces: ["CAN", "UART"],
    specs: { voltageV: 24, voltageOptionsV: [24], ratedTorqueNm: 1.3, maxTorqueNm: 4.1, speedRpm: 370, massG: 185, reductionRatio: 10 },
    conditions: [text("速度为额定转速，最大扭矩为峰值扭矩。", "Speed is rated speed; maximum torque is peak torque.")],
    parameters: [
      { label: text("额定电压", "Rated voltage"), value: text("24 V", "24 V") },
      { label: text("额定 / 峰值扭矩", "Rated / peak torque"), value: text("1.3 / 4.1 N·m", "1.3 / 4.1 N·m") },
      { label: text("额定转速", "Rated speed"), value: text("370 rpm", "370 rpm") },
      { label: text("减速比", "Reduction ratio"), value: text("10:1", "10:1") },
      { label: text("质量", "Mass"), value: text("185 g", "185 g") },
      { label: text("接口", "Interfaces"), value: text("CAN / UART", "CAN / UART") },
    ],
  },
  {
    id: "sku-cubemars-ak60-6-v3",
    company: text("CubeMars", "CubeMars"),
    profileSlug: "cubemars",
    product: "AK60-6 V3.0 KV80",
    productClass: "integrated-joint",
    category: "motion",
    subtype: text("中型一体化关节执行器", "Mid-size integrated joint actuator"),
    positioning: text("集成无刷电机、6:1 行星减速器、磁编码器和驱动器。", "Integrates a brushless motor, 6:1 planetary reduction, magnetic encoder, and drive electronics."),
    integration: text("支持位置、速度、扭矩和 MIT 混合控制，通信接口按交付版本确认。", "Supports position, speed, torque, and MIT hybrid control; confirm communications by delivered version."),
    verification: text("24 V 与 48 V 对应不同速度口径，选型时必须锁定电压和热工况。", "The 24 V and 48 V ratings have different speeds; lock voltage and thermal duty during selection."),
    officialUrl: "https://www.cubemars.com/product/ak60-6-v3-0-kv80-robotic-actuator.html",
    interfaces: ["CAN", "UART"],
    specs: { voltageV: 48, voltageOptionsV: [24, 48], ratedTorqueNm: 3, maxTorqueNm: 9, speedRpm: 490, massG: 380, reductionRatio: 6 },
    conditions: [text("筛选采用 48 V 额定转速 490 rpm。", "Filtering uses the 490 rpm rated speed at 48 V."), text("峰值扭矩为 9 N·m。", "Peak torque is 9 N·m.")],
    parameters: [
      { label: text("额定电压", "Rated voltage"), value: text("24 / 48 V", "24 / 48 V") },
      { label: text("额定 / 峰值扭矩", "Rated / peak torque"), value: text("3 / 9 N·m", "3 / 9 N·m") },
      { label: text("额定转速", "Rated speed"), value: text("233 / 490 rpm", "233 / 490 rpm") },
      { label: text("减速比", "Reduction ratio"), value: text("6:1", "6:1") },
      { label: text("质量", "Mass"), value: text("380 g", "380 g") },
      { label: text("编码器", "Encoder"), value: text("21-bit 磁编码器", "21-bit magnetic encoder") },
    ],
  },
  {
    id: "sku-cubemars-ak80-9-v3",
    company: text("CubeMars", "CubeMars"),
    profileSlug: "cubemars",
    product: "AK80-9 V3.0 KV100",
    productClass: "integrated-joint",
    category: "motion",
    subtype: text("高扭矩一体化关节执行器", "Higher-torque integrated joint actuator"),
    positioning: text("集成无刷电机、9:1 行星减速器、磁编码器和驱动板。", "Integrates a brushless motor, 9:1 planetary reduction, magnetic encoder, and drive board."),
    integration: text("面向足式机器人、外骨骼和机器人关节，控制与通信按 V3.0 版本核验。", "Targets legged robots, exoskeletons, and robot joints; verify control and communications for the V3.0 version."),
    verification: text("V2 与 V3 峰值扭矩不同，不能混用；还需核对峰值持续时间和散热。", "V2 and V3 have different peak-torque ratings and must not be mixed; verify peak duration and cooling."),
    officialUrl: "https://www.cubemars.com/product/ak80-9-v3-0-robotic-actuator.html",
    interfaces: ["UART"],
    specs: { voltageV: 48, voltageOptionsV: [48], ratedTorqueNm: 9, maxTorqueNm: 22, speedRpm: 390, massG: 490, reductionRatio: 9 },
    conditions: [text("采用 V3.0 KV100 规格。", "Uses the V3.0 KV100 specification."), text("最大扭矩为峰值扭矩。", "Maximum torque is peak torque.")],
    parameters: [
      { label: text("额定电压", "Rated voltage"), value: text("48 V", "48 V") },
      { label: text("额定 / 峰值扭矩", "Rated / peak torque"), value: text("9 / 22 N·m", "9 / 22 N·m") },
      { label: text("额定 / 空载转速", "Rated / no-load speed"), value: text("390 / 570 rpm", "390 / 570 rpm") },
      { label: text("减速比", "Reduction ratio"), value: text("9:1", "9:1") },
      { label: text("质量", "Mass"), value: text("490 g", "490 g") },
      { label: text("编码器", "Encoder"), value: text("16-bit 磁编码器", "16-bit magnetic encoder") },
    ],
  },
  {
    id: "exp-contactile-papillarray",
    company: text("Contactile", "Contactile"),
    profileSlug: "contactile",
    product: "PapillArray Development Kit 2.0",
    productClass: "force-tactile-sensor",
    category: "perception",
    subtype: text("三轴阵列触觉传感器", "Three-axis tactile-array sensor"),
    subtypeKey: "tactile-array",
    positioning: text("通过软柱阵列测量局部三维力、振动和滑移相关信息。", "A soft-pillar array measures local three-axis force, vibration, and slip-related signals."),
    integration: text("USB、Windows/Linux、C++ 库和可选 ROS 节点。", "USB, Windows/Linux, a C++ library, and an optional ROS node."),
    verification: text("局部和全局量程不能混用；软柱寿命、污染、漂移和闭环延迟需实测。", "Do not mix local and global ranges; test pillar life, contamination, drift, and closed-loop latency."),
    officialUrl: "https://contactile.com/wp-content/uploads/2022/01/Contactile_PTSDevKit2.0_SpecSheet_JAN22.pdf",
    interfaces: ["USB", "ROS"],
    specs: { axes: 3, forceRangeN: 60, samplingHz: 1000 },
    conditions: [text("60 N 是全局 Z 向力量程；局部 Z 向为 15 N。", "60 N is the global Z-force range; local Z-force range is 15 N."), text("轴数表示局部 XYZ 力。", "Axis count refers to local XYZ force.")],
    parameters: [
      { label: text("采样率", "Sampling rate"), value: text("1000 Hz", "1000 Hz") },
      { label: text("局部 XY 力量程", "Local XY force range"), value: text("±4 N", "±4 N") },
      { label: text("局部 / 全局 Z 力量程", "Local / global Z-force range"), value: text("15 / 60 N", "15 / 60 N") },
      { label: text("传感阵列尺寸", "Sensor-array size"), value: text("24 × 30.6 × 12.8 mm", "24 × 30.6 × 12.8 mm") },
      { label: text("接口", "Interface"), value: text("USB / C++ / 可选 ROS", "USB / C++ / optional ROS") },
    ],
  },
  {
    id: "sku-ati-nano17-titanium",
    company: text("ATI Industrial Automation", "ATI Industrial Automation"),
    profileSlug: "ati-industrial-automation",
    product: "Nano17 Titanium",
    productClass: "force-tactile-sensor",
    category: "perception",
    subtype: text("微型六维力/力矩传感器", "Miniature six-axis force/torque sensor"),
    subtypeKey: "force-torque",
    positioning: text("面向空间受限的机器人手、手术机器人和研究测量。", "Targets space-constrained robot hands, surgical robots, and research measurement."),
    integration: text("可配 DAQ、EtherCAT、网络、CAN 或 RS-485 系统，接口取决于所选电子系统。", "Can use DAQ, EtherCAT, network, CAN, or RS-485 systems depending on the selected electronics."),
    verification: text("量程随标定型号变化，筛选值仅代表官网列出的最大 SI Fx/Fy 标定选项。", "Range depends on calibration; the filter value represents the largest published SI Fx/Fy calibration option."),
    officialUrl: "https://www.ati-ia.com/products/ft/ft_models.aspx?id=Nano17+Titanium",
    interfaces: ["DAQ", "EtherCAT", "CAN", "RS-485"],
    specs: { axes: 6, forceRangeN: 32, massG: 10.1 },
    conditions: [text("32 N 为 SI-32-0.2 标定的 Fx/Fy 量程。", "32 N is the Fx/Fy range for the SI-32-0.2 calibration."), text("接口由配套电子系统决定。", "The interface depends on the paired electronics.")],
    parameters: [
      { label: text("测量轴数", "Measured axes"), value: text("6", "6") },
      { label: text("SI Fx/Fy 标定选项", "SI Fx/Fy calibration options"), value: text("8 / 16 / 32 N", "8 / 16 / 32 N") },
      { label: text("质量", "Mass"), value: text("10.1 g", "10.1 g") },
      { label: text("直径 × 高度", "Diameter × height"), value: text("17 × 14.5 mm", "17 × 14.5 mm") },
      { label: text("系统接口", "System interfaces"), value: text("DAQ / EtherCAT / CAN / RS-485", "DAQ / EtherCAT / CAN / RS-485") },
    ],
  },
  {
    id: "sku-ati-mini45",
    company: text("ATI Industrial Automation", "ATI Industrial Automation"),
    profileSlug: "ati-industrial-automation",
    product: "Mini45",
    productClass: "force-tactile-sensor",
    category: "perception",
    subtype: text("紧凑型六维力/力矩传感器", "Compact six-axis force/torque sensor"),
    subtypeKey: "force-torque",
    positioning: text("兼顾紧凑尺寸、通孔布线和较高量程的腕部或工具端传感器。", "A wrist/tool sensor combining compact size, through-hole routing, and higher force capacity."),
    integration: text("可配 DAQ、EtherCAT、网络、CAN 或 RS-485 系统，接口取决于所选电子系统。", "Can use DAQ, EtherCAT, network, CAN, or RS-485 systems depending on the selected electronics."),
    verification: text("量程、分辨率和接口均取决于标定及电子系统，项目中必须锁定完整订货配置。", "Range, resolution, and interface depend on calibration and electronics; lock the full ordering configuration."),
    officialUrl: "https://www.ati-ia.com/products/ft/ft_models.aspx?id=Mini45",
    interfaces: ["DAQ", "EtherCAT", "CAN", "RS-485"],
    specs: { axes: 6, forceRangeN: 580, massG: 91.7 },
    conditions: [text("580 N 为 SI-580-20 标定的 Fx/Fy 量程，Fz 为 1160 N。", "580 N is the Fx/Fy range for the SI-580-20 calibration; Fz is 1160 N."), text("接口由配套电子系统决定。", "The interface depends on the paired electronics.")],
    parameters: [
      { label: text("测量轴数", "Measured axes"), value: text("6", "6") },
      { label: text("SI Fx/Fy 标定选项", "SI Fx/Fy calibration options"), value: text("145 / 290 / 580 N", "145 / 290 / 580 N") },
      { label: text("对应 Fz 标定选项", "Corresponding Fz options"), value: text("290 / 580 / 1160 N", "290 / 580 / 1160 N") },
      { label: text("质量", "Mass"), value: text("91.7 g", "91.7 g") },
      { label: text("直径 × 高度", "Diameter × height"), value: text("45 × 15.7 mm", "45 × 15.7 mm") },
      { label: text("系统接口", "System interfaces"), value: text("DAQ / EtherCAT / CAN / RS-485", "DAQ / EtherCAT / CAN / RS-485") },
    ],
  },
];

export const getPrecisionProductRecords = (locale: Locale): PrecisionProductRecord[] => seeds.map((seed) => {
  const company = localize(locale, seed.company);
  const parameters: FinderParameter[] = seed.parameters.map((item) => ({
    label: localize(locale, item.label),
    value: localize(locale, item.value),
    status: "manufacturer",
  }));

  return {
    id: seed.id,
    matrixSlug: "",
    matrixTitle: locale === "zh" ? "型号级产品目录" : "Model-level product catalog",
    industry: seed.category === "perception" ? "dexterous-hands" : "robotics",
    reviewedAt: "2026-08-29",
    product: seed.product,
    company,
    type: localize(locale, seed.subtype),
    openness: locale === "zh" ? "官方型号页或规格文件可查" : "Official model page or specification available",
    integration: localize(locale, seed.integration),
    verificationFocus: localize(locale, seed.verification),
    sourceIds: [`official-${seed.id}`],
    officialUrl: seed.officialUrl,
    category: seed.category,
    useCases: seed.category === "perception" ? ["research", "integration", "manufacturing"] : ["research", "integration"],
    opennessLevel: "documented",
    parameters,
    profile: {
      slug: seed.profileSlug,
      valueChainRole: localize(locale, seed.subtype),
      positioning: localize(locale, seed.positioning),
      strengths: [],
      products: [seed.product],
      fit: [],
      questions: [localize(locale, seed.verification)],
      sourceIds: [`official-${seed.id}`],
      reviewedAt: "2026-08-29",
    },
    precision: {
      productClass: seed.productClass,
      subtype: localize(locale, seed.subtype),
      subtypeKey: seed.subtypeKey ?? seed.productClass,
      interfaces: seed.interfaces,
      lifecycle: "active",
      specs: seed.specs,
      conditions: seed.conditions.map((condition) => localize(locale, condition)),
    },
  };
});
