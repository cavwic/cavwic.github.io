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

type SensorSpec = {
  id: string;
  product: string;
  pageUrl: string;
  pdfUrl: string;
  applicableModels: string;
  type: Localized;
  summary: Localized;
  applications: Localized[];
  range80: string;
  range10: string;
  pdfMaximumRange: string;
  webMaximumRange: string;
  verticalChannels: string;
  horizontalResolution: string;
  rotationRate: string;
  pdfVerticalFov: string;
  webVerticalFov: string;
  angularSamplingAccuracy: string;
  rangeResolution: string;
  lowDataRateResolution: string;
  precision: string;
  beamDiameter: string;
  beamDivergence: string;
  dataRate: string;
  operatingModes: string;
  powerConsumption: string;
  nominalPower: string;
  startupPower: string;
  dimensions: string;
  weight: string;
  operatingTemperature: string;
  webOperatingTemperature: string;
  webVerticalResolution: string;
  webHorizontalResolution: string;
  ethernetOptions: string;
  beamConfigurationOptions: string;
};

const l = (zh: string, en: string): Localized => ({ zh, en });
const t = (locale: Locale, value: Localized) => value[locale];

const OUSTER_HOME = "https://ouster.com/";
const OUSTER_ABOUT = "https://ouster.com/company/about-us";
const OUSTER_OVERVIEW = "https://ouster.com/os-overview";
const OUSTER_10K = "https://investors.ouster.com/static-files/9c5c3635-e2e3-471e-9864-12e4c2ffa51b";
const OS2_PAGE = "https://ouster.com/products/hardware/os2-lidar-sensor";
const GEMINI_PAGE = "https://ouster.com/products/software/gemini";
const BLUECITY_PAGE = "https://ouster.com/products/software/bluecity";
const STUDIO_PAGE = "https://ouster.com/products/software/ouster-studio";

const sourceNames = {
  page: l("Ouster 官方产品页", "Ouster official product page"),
  overview: l("Ouster 官方传感器对比页", "Ouster official sensor comparison"),
  datasheet: l("Ouster Rev8 v4.0 官方数据表", "Ouster Rev8 v4.0 official datasheet"),
  annualReport: l("Ouster 2025 年 Form 10-K", "Ouster 2025 Form 10-K"),
};

const sourceRow = (
  sourceUrl: string,
  sourceLabel: Localized,
  locator: Localized,
  zh: string,
  en: string,
  valueZh: string,
  valueEn = valueZh,
  conditions?: Localized,
): SpecRow => ({
  label: l(zh, en),
  value: l(valueZh, valueEn),
  sourceUrl,
  sourceLabel,
  locator,
  conditions,
});

const datasheetRow = (
  spec: SensorSpec,
  sectionZh: string,
  sectionEn: string,
  zh: string,
  en: string,
  valueZh: string,
  valueEn = valueZh,
  conditions?: Localized,
) => sourceRow(spec.pdfUrl, sourceNames.datasheet, l(sectionZh, sectionEn), zh, en, valueZh, valueEn, conditions);

const comparisonRow = (
  zh: string,
  en: string,
  valueZh: string,
  valueEn = valueZh,
  conditions?: Localized,
) => sourceRow(
  OUSTER_OVERVIEW,
  sourceNames.overview,
  l("传感器对比表", "Sensor comparison table"),
  zh,
  en,
  valueZh,
  valueEn,
  conditions,
);

const preliminaryCertificationBoundary = l(
  "数据表脚注说明：带 i 的项目为认证待定，带 2 的项目仅在备用配置中提供；全部规格与认证均为初步信息，只适用于数据表所列零件号。",
  "The datasheet footnote states that superscript i means pending certification and superscript 2 means available in an alternate configuration. All specifications and certifications are preliminary and apply only to the listed part number.",
);

const sensorRows = (spec: SensorSpec): SpecRow[] => [
  datasheetRow(spec, "文档范围", "Document scope", "硬件版本", "Hardware version", "REV8.0"),
  datasheetRow(spec, "文档范围", "Document scope", "适用型号编号", "Applicable model numbers", spec.applicableModels),
  datasheetRow(spec, "光学性能", "Optical performance", "80% 朗伯反射率量程", "Range at 80% Lambertian reflectivity", spec.range80, spec.range80, l("1024 × 10 Hz、100 klx 日照、检测概率 >90%。", "1024 x 10 Hz, 100 klx sunlight, >90% detection probability.")),
  datasheetRow(spec, "光学性能", "Optical performance", "10% 朗伯反射率量程", "Range at 10% Lambertian reflectivity", spec.range10, spec.range10, l("1024 × 10 Hz、100 klx 日照、检测概率 >90%。", "1024 x 10 Hz, 100 klx sunlight, >90% detection probability.")),
  datasheetRow(spec, "光学性能", "Optical performance", "数据表最大可表示量程", "Datasheet maximum representable range", spec.pdfMaximumRange),
  datasheetRow(spec, "光学性能", "Optical performance", "最小量程", "Minimum range", "0.0 m；可选 0.3 m；默认 0.5 m", "0.0 m; 0.3 m optional; 0.5 m default"),
  datasheetRow(spec, "光学性能", "Optical performance", "垂直通道数", "Vertical channels", spec.verticalChannels),
  datasheetRow(spec, "光学性能", "Optical performance", "水平分辨率", "Horizontal resolution", spec.horizontalResolution),
  datasheetRow(spec, "光学性能", "Optical performance", "旋转频率", "Rotation rate", spec.rotationRate),
  datasheetRow(spec, "光学性能", "Optical performance", "数据表垂直视场", "Datasheet vertical field of view", spec.pdfVerticalFov),
  datasheetRow(spec, "光学性能", "Optical performance", "水平视场", "Horizontal field of view", "360.0°"),
  datasheetRow(spec, "光学性能", "Optical performance", "角采样精度", "Angular sampling accuracy", spec.angularSamplingAccuracy),
  datasheetRow(spec, "光学性能", "Optical performance", "误报率", "False-positive rate", "1/10,000"),
  datasheetRow(spec, "光学性能", "Optical performance", "量程分辨率", "Range resolution", spec.rangeResolution),
  datasheetRow(spec, "光学性能", "Optical performance", "低数据率配置量程分辨率", "Low-data-rate-profile range resolution", spec.lowDataRateResolution),
  datasheetRow(spec, "光学性能", "Optical performance", "回波数量", "Number of returns", "最多 2 个", "Up to 2"),
  datasheetRow(spec, "光学性能", "Optical performance", "回波排序", "Return order", "最强到最弱、最远到最近、最近到最远", "Strongest to weakest, farthest to nearest, and nearest to farthest"),
  datasheetRow(spec, "量程精度", "Range precision", "量程精密度", "Range precision", spec.precision, spec.precision, l("朗伯与后向反射目标、距离超过 1 m、1024 × 10 Hz；100 次静态测量的 1 个标准差。", "Lambertian and retroreflective targets beyond 1 m at 1024 x 10 Hz; one standard deviation of 100 static measurements.")),
  datasheetRow(spec, "量程精度", "Range precision", "量程准确度", "Range accuracy", "朗伯目标 ±1.25 cm；后向反射目标 ±2.5 cm", "Lambertian targets +/-1.25 cm; retroreflective targets +/-2.5 cm", l("目标距离超过 1 m、1024 × 10 Hz；100 次测量均值与真实距离之差。", "Targets beyond 1 m at 1024 x 10 Hz; error between the mean of 100 measurements and true range.")),
  datasheetRow(spec, "激光", "Laser", "激光产品等级", "Laser product class", "IEC/EN 60825-1:2014 Class 1 人眼安全", "Class 1 eye-safe per IEC/EN 60825-1:2014"),
  datasheetRow(spec, "激光", "Laser", "激光波长", "Laser wavelength", "865 nm"),
  datasheetRow(spec, "激光", "Laser", "出射光束直径", "Beam diameter exiting sensor", spec.beamDiameter),
  datasheetRow(spec, "激光", "Laser", "光束发散角", "Beam divergence", spec.beamDivergence),
  datasheetRow(spec, "激光雷达输出", "Lidar output", "雷达数据连接", "Lidar data connection", "千兆以太网上的 UDP", "UDP over gigabit Ethernet"),
  datasheetRow(spec, "激光雷达输出", "Lidar output", "每秒最大点数", "Maximum points per second", "10,485,760"),
  datasheetRow(spec, "激光雷达输出", "Lidar output", "单点数据字段", "Data per point", "RGB、量程、信号、反射率、近红外、通道、方位角、时间戳", "RGB, range, signal, reflectivity, near-infrared, channel, azimuth angle, and timestamp"),
  datasheetRow(spec, "激光雷达输出", "Lidar output", "雷达时间戳分辨率", "Lidar timestamp resolution", "<1 µs"),
  datasheetRow(spec, "激光雷达输出", "Lidar output", "雷达数据延迟", "Lidar data latency", "<10 ms"),
  datasheetRow(spec, "激光雷达输出", "Lidar output", "数据完整性", "Data integrity", "覆盖完整数据包的端到端 CRC", "End-to-end CRC covering the entire data packet"),
  datasheetRow(spec, "数据率", "Data rate", "通道数据率（最大 / 最小）", "Channel data rate (maximum / minimum)", spec.dataRate, spec.dataRate, l("按 1024 × 10 Hz 计算；顺序为 32 / 64 / 128 / 256 通道。", "Calculated at 1024 x 10 Hz; order is 32 / 64 / 128 / 256 channels.")),
  datasheetRow(spec, "原生彩色输出", "Native color output", "动态范围", "Dynamic range", "116 dB"),
  datasheetRow(spec, "原生彩色输出", "Native color output", "SNR 10 dB 时照度", "Illuminance at SNR 10 dB", "3 lux"),
  datasheetRow(spec, "原生彩色输出", "Native color output", "最大可测照度", "Maximum measurable illuminance", "2,000,000 lux"),
  datasheetRow(spec, "原生彩色输出", "Native color output", "同色异谱敏感度指数", "Sensitivity metamerism index", "80（ISO 17321）", "80 (ISO 17321)"),
  datasheetRow(spec, "原生彩色输出", "Native color output", "位深", "Bit depth", "总计 48-bit；每通道 16-bit", "48-bit total; 16-bit per channel"),
  datasheetRow(spec, "IMU 输出", "IMU output", "IMU 连接", "IMU connection", "UDP over 1000BASE-T"),
  datasheetRow(spec, "IMU 输出", "IMU output", "IMU 每秒采样数", "IMU samples per second", "640 / 1280 / 2560（默认）", "640 / 1280 / 2560 (default)"),
  datasheetRow(spec, "IMU 输出", "IMU output", "单次 IMU 采样字段", "Data per IMU sample", "三轴陀螺仪 + 三轴加速度计", "3-axis gyroscope + 3-axis accelerometer"),
  datasheetRow(spec, "IMU 输出", "IMU output", "IMU 时间戳分辨率", "IMU timestamp resolution", "<1 µs"),
  datasheetRow(spec, "IMU 输出", "IMU output", "IMU 数据延迟", "IMU data latency", "<10 ms"),
  datasheetRow(spec, "IMU 输出", "IMU output", "IMU 型号", "IMU device", "TDK InvenSense IAM-20685HP"),
  datasheetRow(spec, "控制接口", "Control interface", "控制连接", "Control connection", "HTTPS API"),
  datasheetRow(spec, "控制接口", "Control interface", "时间同步输入", "Time-synchronization inputs", "IEEE 1588 PTP（误差 <1 ms）、gPTP（误差 <1 ms）、NMEA $GPRMC UART、外部 PPS（误差 <1 ms）、内部 10 ppm 漂移时钟（误差 <20 ppm）", "IEEE 1588 PTP (<1 ms error), gPTP (<1 ms error), NMEA $GPRMC UART, external PPS (<1 ms error), and internal 10 ppm drift clock (<20 ppm error)"),
  datasheetRow(spec, "控制接口", "Control interface", "同步输出", "Synchronization output", "1–60 Hz 可配置输出脉冲", "Configurable 1-60 Hz output pulse"),
  datasheetRow(spec, "控制接口", "Control interface", "可配置雷达工作模式", "Configurable lidar operating modes", spec.operatingModes),
  datasheetRow(spec, "控制接口", "Control interface", "附加可编程能力", "Additional programmability", "传感器端 3D Zone Monitor、回波排序、最小量程、方位角遮罩、多传感器相位锁定、可查询内参（光束角与 IMU 位姿修正矩阵）、低功耗待机", "On-sensor 3D Zone Monitor, return ordering, minimum range, azimuth masking, multi-sensor phase lock, queryable intrinsics (beam angles and IMU pose-correction matrix), and low-power standby"),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "功耗范围", "Power-consumption range", spec.powerConsumption, spec.powerConsumption, l("按 1024 × 10 Hz 工作模式。", "At the 1024 x 10 Hz operating mode.")),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "标称功耗", "Nominal power", spec.nominalPower),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "-40°C 启动峰值功耗", "Startup peak power at -40°C", spec.startupPower),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "推荐电源连续输出", "Recommended continuous power-supply output", "不低于 30 W", "No less than 30 W"),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "物理连接器", "Physical connector", "侧向专用卡口连接器，1000BASE-T 以太网", "Side-facing proprietary bayonet connector with 1000BASE-T Ethernet"),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "标称工作电压", "Nominal operating voltage", "12 VDC 或 24 VDC", "12 VDC or 24 VDC"),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "可工作电压范围", "Operating-voltage range", "9–58 VDC"),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "供电保护与适配", "Power protection and vehicle supply", "纹波最大 1 Vpp；反接保护至 -60 V；过压保护至 +60 V；适用于带集中式负载突降抑制（≤58 V）的 12 V / 24 V 汽车系统；不适用于标称 48 V 汽车系统", "Maximum ripple 1 Vpp; reverse-polarity protection to -60 V; overvoltage protection to +60 V; suitable for 12 V / 24 V automotive systems with centralized load-dump suppression no higher than 58 V; not suitable for nominal 48 V automotive systems"),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "外形尺寸", "Dimensions", spec.dimensions),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "质量", "Weight", spec.weight),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "安装孔位", "Mounting", "底部：4×M3 + 2×2 mm 定位孔；顶部：4×M3 + 4×2 mm 定位孔 + 1×M6", "Bottom: 4x M3 plus 2x 2 mm locating holes; top: 4x M3 plus 4x 2 mm locating holes plus 1x M6"),
  datasheetRow(spec, "机械与电气", "Mechanical and electrical", "底部安装底板", "Bottom-mount baseplate", "铝制，530 g，110 × 110 × 20.5 mm，4×M8 通孔", "Aluminum, 530 g, 110 x 110 x 20.5 mm, 4x M8 through holes"),
  datasheetRow(spec, "运行条件", "Operational", "数据表工作温度", "Datasheet operating temperature", spec.operatingTemperature, spec.operatingTemperature, l("1024 × 10 Hz；按 Ouster Thermal Integration Guide 安装。", "1024 x 10 Hz; mounted according to the Ouster Thermal Integration Guide.")),
  datasheetRow(spec, "运行条件", "Operational", "存储温度", "Storage temperature", "-40–105°C"),
  datasheetRow(spec, "运行条件", "Operational", "防护等级", "Ingress protection", "IP68（连接 I/O 线缆，1 m 浸水 1 h）；IP69K（连接 I/O 线缆）", "IP68 (I/O cable attached, 1 m submersion for 1 h); IP69K (I/O cable attached)"),
  datasheetRow(spec, "运行条件", "Operational", "冲击", "Shock", "IEC 60068-2-27：100 G，11 ms 半正弦，6 个方向各 3 次", "IEC 60068-2-27: 100 G, 11 ms half-sine, 3 shocks in each of 6 directions"),
  datasheetRow(spec, "运行条件", "Operational", "振动", "Vibration", "IEC 60068-2-64：10 Grms，10–1000 Hz；三轴各 48 h；依据 ISO 16750-3 Test VII 方法及 Ouster 自定义 ASD", "IEC 60068-2-64: 10 Grms, 10-1000 Hz; 48 h per axis on 3 axes; ISO 16750-3 Test VII method and Ouster custom ASD"),
  datasheetRow(spec, "合规", "Compliance", "功能安全与网络安全清单", "Functional-safety and cybersecurity list", "IEC 61508 SIL2、ISO 26262 ASIL-B、ISO 13849 PLd/CAT-2、ISO 21434 Automotive、UNECE-WP 29 Automotive、IEC 62443 Industrial、ISO 27001", "IEC 61508 SIL2, ISO 26262 ASIL-B, ISO 13849 PLd/CAT-2, ISO 21434 Automotive, UNECE-WP 29 Automotive, IEC 62443 Industrial, and ISO 27001", preliminaryCertificationBoundary),
  datasheetRow(spec, "合规", "Compliance", "美国与加拿大清单", "US and Canada list", "IEC/EN 60825-1:2014 Class 1、FDA 21CFR1040 Laser Notice 56 Class 1、加拿大 REDR SOR/2024-196、UL 62368-1 第 4 版、CSA 22.2 No. 62368-1-25、FCC Part 15、ICES-003 Class B", "IEC/EN 60825-1:2014 Class 1, FDA 21CFR1040 Laser Notice 56 Class 1, Canada REDR SOR/2024-196, UL 62368-1 4th Edition, CSA 22.2 No. 62368-1-25, FCC Part 15, and ICES-003 Class B", preliminaryCertificationBoundary),
  datasheetRow(spec, "合规", "Compliance", "欧盟及行业清单", "EU and industry list", "IEC/EN 60825-1、IEC/EN 62368-1、EN 55032、EN 61000-3-2、EN 61000-3-3、EN 55035、GMW3097、UN-ECE Reg 10 Rev 6、ISO 13766-1/-2、IEC/EN 12895、ISO 14982；澳大利亚 AS/NZS CISPR 32", "IEC/EN 60825-1, IEC/EN 62368-1, EN 55032, EN 61000-3-2, EN 61000-3-3, EN 55035, GMW3097, UN-ECE Reg 10 Rev 6, ISO 13766-1/-2, IEC/EN 12895, ISO 14982; Australia AS/NZS CISPR 32", preliminaryCertificationBoundary),
  datasheetRow(spec, "软件", "Software", "Ouster 软件", "Ouster software", "Ouster Python SDK、C++ Driver、Ouster Studio", "Ouster Python SDK, C++ Driver, and Ouster Studio"),
  datasheetRow(spec, "软件", "Software", "第三方集成", "Third-party integrations", "ROS 2、ROS、NVIDIA DriveWorks、MATLAB、NVIDIA Isaac、NVIDIA Isaac Sim", "ROS 2, ROS, NVIDIA DriveWorks, MATLAB, NVIDIA Isaac, and NVIDIA Isaac Sim"),
  datasheetRow(spec, "线缆与连接器", "Cable and connector", "数据表引脚图", "Datasheet pinout", "Type 3（1000BASE-T）线缆与连接器引脚图见数据表第 6 页", "Type 3 (1000BASE-T) cable and connector pinout is on datasheet page 6"),
  comparisonRow("网页对比表最大可表示量程", "Web-comparison maximum representable range", spec.webMaximumRange, spec.webMaximumRange, l("与 Rev8 v4.0 PDF 数据表的口径并列保存，不自动判定其一失效。", "Preserved alongside the Rev8 v4.0 PDF datasheet figure; neither is silently treated as obsolete.")),
  comparisonRow("网页对比表垂直视场", "Web-comparison vertical field of view", spec.webVerticalFov, spec.webVerticalFov, l("与 PDF 数据表的小数口径并列保存。", "Preserved alongside the decimal figure in the PDF datasheet.")),
  comparisonRow("网页对比表最高垂直分辨率", "Web-comparison best vertical resolution", spec.webVerticalResolution),
  comparisonRow("网页对比表最高水平分辨率", "Web-comparison best horizontal resolution", spec.webHorizontalResolution),
  comparisonRow("网页对比表典型功耗", "Web-comparison typical power consumption", spec.powerConsumption),
  comparisonRow("网页对比表工作电压", "Web-comparison operating voltage", "12 V / 24 V"),
  comparisonRow("网页对比表工作温度", "Web-comparison operating temperature", spec.webOperatingTemperature, spec.webOperatingTemperature, l("如与 PDF 数据表不同，则两种公开口径均保留。", "Where this differs from the PDF datasheet, both public figures are retained.")),
  comparisonRow("网页对比表时间同步", "Web-comparison time synchronization", "gPTP；PTP；$GPRMC", "gPTP; PTP; $GPRMC"),
  comparisonRow("网页对比表嵌入式 IMU", "Web-comparison embedded IMU", "有", "Yes"),
  comparisonRow("网页对比表近红外环境数据", "Web-comparison near-IR ambient data", "有", "Yes"),
  comparisonRow("网页对比表以太网选项", "Web-comparison Ethernet options", spec.ethernetOptions),
  comparisonRow("网页对比表光束配置选项", "Web-comparison beam-configuration options", spec.beamConfigurationOptions),
];

const sensors: SensorSpec[] = [
  {
    id: "verified-ouster-osdome-rev8",
    product: "OSDome Rev8",
    pageUrl: "https://ouster.com/products/hardware/osdome-lidar-sensor",
    pdfUrl: "https://data.ouster.io/downloads/datasheets/datasheet-rev8-v4p0-osdome.pdf",
    applicableModels: "OSDOME-080-XXX-X-X-002-XX",
    type: l("近距半球视场成像激光雷达", "Short-range hemispherical imaging lidar"),
    summary: l("OSDome 以 180° 垂直视场覆盖传感器下方半球空间，适合室内人员跟踪、移动机器人近距感知与固定设施监测。", "OSDome covers the hemisphere below the sensor with a 180-degree vertical field of view for indoor people tracking, near-field mobile-robot perception, and fixed-infrastructure monitoring."),
    applications: [l("室内人员与区域监测", "Indoor people and zone monitoring"), l("移动机器人近距全向感知", "Near-field all-around mobile-robot perception")],
    range80: "45 m", range10: "20 m", pdfMaximumRange: "500 m", webMaximumRange: "约 250 m", verticalChannels: "32 / 64 / 128", horizontalResolution: "512 / 1024 / 2048 / 4096（可配置）", rotationRate: "5 / 10 / 15 / 20 / 30 / 40 Hz（可配置）", pdfVerticalFov: "180.0°", webVerticalFov: "180°", angularSamplingAccuracy: "垂直 ±0.01°；水平 ±0.01°", rangeResolution: "0.1 cm", lowDataRateResolution: "0.8 cm", precision: "最小 ±0.5 cm；最大 ±5 cm", beamDiameter: "5 mm", beamDivergence: "0.35° FWHM", dataRate: "最大 75 / 148 / 295 / N/A Mbps；最小 12 / 22 / 43 / N/A Mbps", operatingModes: "512：10/15/20/30/40 Hz；1024：10/15/20/30/40 Hz；2048：10/20 Hz；4096：5/10 Hz", powerConsumption: "10–20 W", nominalPower: "15 W", startupPower: "22 W", dimensions: "直径 87 mm", weight: "不含底板 540 g", operatingTemperature: "-40–85°C", webOperatingTemperature: "-40–60°C", webVerticalResolution: "1.4°", webHorizontalResolution: "0.09°", ethernetOptions: "1000BASE-T 或 1000BASE-T1", beamConfigurationOptions: "适用于 32 / 64 通道选项",
  },
  {
    id: "verified-ouster-os0-rev8",
    product: "OS0 Rev8",
    pageUrl: "https://ouster.com/products/hardware/os0-lidar-sensor",
    pdfUrl: "https://data.ouster.io/downloads/datasheets/datasheet-rev8-v4p0-os0.pdf",
    applicableModels: "OS0-080-XXX-X-X-002-XX",
    type: l("近距超广角高分辨率成像激光雷达", "Short-range ultra-wide high-resolution imaging lidar"),
    summary: l("OS0 将 90° 垂直视场与 35 m 的 10% 反射率量程结合，面向 AMR、AGV、无人车、重型机械、机器人、无人机和测绘。", "OS0 combines a 90-degree vertical field of view with 35 m range at 10% reflectivity for AMRs, AGVs, autonomous vehicles, heavy machinery, robots, drones, and mapping."),
    applications: [l("仓储 AMR 与 AGV", "Warehouse AMRs and AGVs"), l("机器人、无人机与近距测绘", "Robotics, drones, and near-field mapping")],
    range80: "75 m", range10: "35 m", pdfMaximumRange: "500 m", webMaximumRange: "约 250 m", verticalChannels: "32 / 64 / 128", horizontalResolution: "512 / 1024 / 2048 / 4096（可配置）", rotationRate: "5 / 10 / 15 / 20 / 30 / 40 Hz（可配置）", pdfVerticalFov: "90.0°（+45.0° 至 -45.0°）", webVerticalFov: "90°", angularSamplingAccuracy: "垂直 ±0.01°；水平 ±0.01°", rangeResolution: "0.1 cm", lowDataRateResolution: "0.8 cm", precision: "最小 ±0.25 cm；最大 ±1.5 cm", beamDiameter: "5 mm", beamDivergence: "0.35° FWHM", dataRate: "最大 75 / 148 / 295 / N/A Mbps；最小 12 / 22 / 43 / N/A Mbps", operatingModes: "512：10/15/20/30/40 Hz；1024：10/15/20/30/40 Hz；2048：10/20 Hz；4096：5/10 Hz", powerConsumption: "10–20 W", nominalPower: "15 W", startupPower: "22 W", dimensions: "直径 87 mm；不含帽高 58.35 mm；含热帽高 74.2 mm", weight: "不含 halo cap / 底板 500 g；含 halo cap 580 g", operatingTemperature: "-40–85°C", webOperatingTemperature: "-40–85°C", webVerticalResolution: "0.7°", webHorizontalResolution: "0.09°", ethernetOptions: "1000BASE-T 或 1000BASE-T1", beamConfigurationOptions: "适用于 32 / 64 通道选项",
  },
  {
    id: "verified-ouster-os1-rev8",
    product: "OS1 Rev8",
    pageUrl: "https://ouster.com/products/hardware/os1-lidar-sensor",
    pdfUrl: "https://data.ouster.io/downloads/datasheets/datasheet-rev8-v4p0-os1.pdf",
    applicableModels: "OS1-080-XXX-X-X-002-XX",
    type: l("中距高分辨率成像激光雷达", "Mid-range high-resolution imaging lidar"),
    summary: l("OS1 在 44° 垂直视场内提供 90 m 的 10% 反射率量程，覆盖工业自动化、自动驾驶、测绘、智慧基础设施与机器人。", "OS1 provides 90 m range at 10% reflectivity across a 44-degree vertical field for industrial automation, autonomous vehicles, mapping, smart infrastructure, and robotics."),
    applications: [l("工业自动化与机器人导航", "Industrial automation and robot navigation"), l("测绘、智慧基础设施与车辆感知", "Mapping, smart infrastructure, and vehicle perception")],
    range80: "170 m", range10: "90 m", pdfMaximumRange: "500 m", webMaximumRange: "约 250 m", verticalChannels: "32 / 64 / 128", horizontalResolution: "512 / 1024 / 2048 / 4096（可配置）", rotationRate: "5 / 10 / 15 / 20 / 30 / 40 Hz（可配置）", pdfVerticalFov: "44.0°（+22.0° 至 -22.0°）", webVerticalFov: "45°", angularSamplingAccuracy: "垂直 ±0.01°；水平 ±0.01°", rangeResolution: "0.1 cm", lowDataRateResolution: "0.8 cm", precision: "最小 ±0.25 cm；最大 ±1.5 cm", beamDiameter: "9.5 mm", beamDivergence: "0.18° FWHM", dataRate: "最大 75 / 148 / 295 / N/A Mbps；最小 12 / 22 / 43 / N/A Mbps", operatingModes: "512：10/15/20/30/40 Hz；1024：10/15/20/30/40 Hz；2048：10/15/20 Hz；4096：5/10 Hz", powerConsumption: "10–20 W", nominalPower: "15 W", startupPower: "22 W", dimensions: "直径 87 mm；不含帽高 58.35 mm；含 halo cap 高 74.2 mm", weight: "不含 halo cap / 底板 500 g；含 halo cap 580 g", operatingTemperature: "-40–85°C", webOperatingTemperature: "-40–85°C", webVerticalResolution: "0.34°", webHorizontalResolution: "0.09°", ethernetOptions: "1000BASE-T 或 1000BASE-T1", beamConfigurationOptions: "适用于 32 / 64 通道选项",
  },
  {
    id: "verified-ouster-os1-max-rev8",
    product: "OS1 Max Rev8",
    pageUrl: "https://ouster.com/products/hardware/os1-max",
    pdfUrl: "https://data.ouster.io/downloads/datasheets/datasheet-rev8-v4p0-os1-max.pdf",
    applicableModels: "OS1MAX-080-XXX-X-X-002-XX",
    type: l("远距 256 通道高分辨率成像激光雷达", "Long-range 256-channel high-resolution imaging lidar"),
    summary: l("OS1 Max 是 Rev8 远距型号，支持最高 256 通道，在 10% 反射率目标上给出 200 m 量程，面向远距工业、非公路车辆、道路交通、安全与三维测绘。", "OS1 Max is the long-range Rev8 model with up to 256 channels and 200 m range at 10% reflectivity for long-range industrial, off-highway, road-vehicle, traffic, security, and 3D-mapping use."),
    applications: [l("远距工业车辆与自动驾驶", "Long-range industrial vehicles and autonomous driving"), l("交通、安全监测与三维测绘", "Traffic, security monitoring, and 3D mapping")],
    range80: "350 m", range10: "200 m", pdfMaximumRange: "500 m", webMaximumRange: "约 500 m", verticalChannels: "64 / 128 / 256", horizontalResolution: "512 / 1024 / 2048 / 4096（可配置）", rotationRate: "5 / 10 / 15 / 20 / 30 / 40 Hz（可配置）", pdfVerticalFov: "43.9°（+21.95° 至 -21.95°）", webVerticalFov: "45°", angularSamplingAccuracy: "垂直 ±0.01°；水平 ±0.01°", rangeResolution: "0.1 cm", lowDataRateResolution: "0.8 cm", precision: "最小 ±0.25 cm；最大 ±1.5 cm", beamDiameter: "19 mm", beamDivergence: "0.09° FWHM", dataRate: "最大 N/A / 148 / 295 / 589 Mbps；最小 N/A / 22 / 43 / 86 Mbps", operatingModes: "512：10/15/20/30/40 Hz；1024：10/15/20 Hz；2048：10 Hz；4096：5 Hz", powerConsumption: "15–25 W", nominalPower: "19 W", startupPower: "28 W", dimensions: "直径 87 mm；不含帽高 82 mm；含热帽高 87 mm", weight: "不含 halo cap / 底板 670 g；含 halo cap 720 g", operatingTemperature: "-40–85°C", webOperatingTemperature: "-40–85°C", webVerticalResolution: "0.17°", webHorizontalResolution: "0.09°", ethernetOptions: "1000BASE-T 或 1000BASE-T1", beamConfigurationOptions: "适用于 32 / 64 / 128 通道选项（网页原文；PDF 适用型号列 64 / 128 / 256）",
  },
];

const ousterProducts = [
  "OSDome Rev8",
  "OS0 Rev8",
  "OS1 Rev8",
  "OS1 Max Rev8",
  "OS2",
  "Ouster Gemini",
  "Ouster BlueCity",
  "Ouster Studio",
];

const ousterCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => ({
  ...company,
  name: "Ouster",
  englishName: "Ouster",
  legalName: "Ouster, Inc.",
  country: locale === "zh" ? "美国" : "United States",
  headquarters: locale === "zh" ? "美国加利福尼亚州旧金山" : "San Francisco, California, United States",
  founded: "2015-06-30",
  officialUrl: OUSTER_HOME,
  valueChainRole: locale === "zh"
    ? "数字激光雷达、相机与边缘计算、传感器融合和感知软件供应商"
    : "Digital-lidar, camera and edge-compute, sensor-fusion, and perception-software supplier",
  positioning: locale === "zh"
    ? "Ouster 面向汽车、工业、机器人和智慧基础设施提供数字激光雷达及感知软件；2026 年收购 Stereolabs 后，公司公开口径扩展到相机和 AI 计算。"
    : "Ouster supplies digital lidar and perception software to automotive, industrial, robotics, and smart-infrastructure markets; after acquiring Stereolabs in 2026, its stated portfolio expanded to cameras and AI compute.",
  strengths: locale === "zh" ? [
    "OS 系列采用统一数字化平台，覆盖半球、超广角、中距和远距场景",
    "公开数据表同时覆盖光学、输出、同步、机械、电气、环境与合规字段",
    "Gemini、BlueCity 与 Ouster Studio 将传感器接入监测、交通和点云数据工作流",
  ] : [
    "A common digital platform spans hemispherical, ultra-wide, mid-range, and long-range OS sensors",
    "Public datasheets cover optical, output, synchronization, mechanical, electrical, environmental, and compliance fields",
    "Gemini, BlueCity, and Ouster Studio connect sensors to monitoring, traffic, and point-cloud-data workflows",
  ],
  products: ousterProducts,
  fit: locale === "zh" ? [
    "AMR、AGV、机器人、无人机和工业车辆环境感知",
    "测绘、自动驾驶、非公路车辆和重型机械",
    "交通路口、道路、安全、园区和人群监测",
    "OS 系列点云查看、记录、共享和 SLAM 地图生成",
  ] : [
    "Environmental perception for AMRs, AGVs, robots, drones, and industrial vehicles",
    "Mapping, autonomous driving, off-highway vehicles, and heavy machinery",
    "Intersection, roadway, security, yard, and crowd monitoring",
    "OS-series point-cloud viewing, recording, sharing, and SLAM-map generation",
  ],
  overview: locale === "zh" ? [
    "Ouster Technologies, Inc. 的运营前身成立于 2015 年 6 月 30 日。公司总部位于旧金山，Ouster, Inc. 为纳斯达克上市公司，代码 OUST。2025 年 Form 10-K 将目标市场归纳为汽车、工业、机器人和智慧基础设施。",
    "当前 Ouster 官网主导航列出 OSDome、OS0、OS1、OS1 Max 与 OS2，以及 Gemini、BlueCity 和 Ouster Studio。Rev8 v4.0 数据表按适用零件号公开了量程、分辨率、回波、数据输出、原生彩色、IMU、同步、功耗、尺寸、环境与合规信息；网页对比表与 PDF 个别数值不一致时，本仓库并列保存。",
    "公司于 2021 年收购 Sense Photonics，2023 年完成与 Velodyne Lidar 的合并，并在 2025 年停止制造 VLP-16、VLP-16 Lite、VLP-16 Hi-Res、VLP-32 与 VLS-128。2026 年 2 月收购 Stereolabs 后，Ouster 的企业级产品组合包含 ZED 相机与 AI Compute；为避免重复归属，本批次仍把 Stereolabs 具名型号留待独立公司目录同步。",
    "2025 年 Form 10-K 报告总收入 1.69384 亿美元、净亏损 6037.7 万美元。这是公司合并财务报表中的历史披露，不代表后续季度、单一产品盈利能力或未来表现。",
  ] : [
    "Ouster Technologies, Inc., the operating predecessor, was founded on June 30, 2015. Headquartered in San Francisco, Ouster, Inc. is listed on Nasdaq as OUST. Its 2025 Form 10-K groups target markets into automotive, industrial, robotics, and smart infrastructure.",
    "The current Ouster navigation lists OSDome, OS0, OS1, OS1 Max, and OS2 plus Gemini, BlueCity, and Ouster Studio. Rev8 v4.0 datasheets publish range, resolution, returns, data output, native color, IMU, synchronization, power, dimensions, environment, and compliance against applicable part numbers. Where the web comparison and PDFs differ, this repository keeps both figures.",
    "The company acquired Sense Photonics in 2021, completed its merger with Velodyne Lidar in 2023, and stopped manufacturing VLP-16, VLP-16 Lite, VLP-16 Hi-Res, VLP-32, and VLS-128 in 2025. After the February 2026 Stereolabs acquisition, Ouster's corporate portfolio includes ZED cameras and AI Compute; to avoid duplicate ownership, named Stereolabs models remain for a separate company-catalog synchronization batch.",
    "The 2025 Form 10-K reports total revenue of USD 169.384 million and a net loss of USD 60.377 million. These are historical consolidated financial-statement figures, not evidence of later quarters, model-level profitability, or future performance.",
  ],
  businessAreas: locale === "zh" ? [
    "OS 系列旋转式数字成像激光雷达",
    "智慧空间检测、分类、跟踪与分析软件",
    "道路交通检测、信号控制集成与安全分析",
    "点云可视化、记录、共享与 SLAM 数据管理",
    "收购后的立体相机、AI 计算与传感器融合平台",
  ] : [
    "OS-series rotating digital imaging lidar",
    "Smart-space detection, classification, tracking, and analytics software",
    "Road-traffic detection, signal-controller integration, and safety analytics",
    "Point-cloud visualization, recording, sharing, and SLAM data management",
    "Post-acquisition stereo cameras, AI compute, and sensor-fusion platform",
  ],
  customerGroups: locale === "zh" ? [
    "机器人、AMR、AGV、无人机和自动化设备开发商",
    "汽车、非公路车辆、重型机械和测绘系统厂商",
    "交通管理部门、城市基础设施和安防运营方",
    "系统集成商、算法团队、研究机构与点云数据团队",
  ] : [
    "Robot, AMR, AGV, drone, and automation-equipment developers",
    "Automotive, off-highway, heavy-machinery, and mapping-system manufacturers",
    "Transport agencies, municipal infrastructure, and security operators",
    "System integrators, algorithm teams, research institutions, and point-cloud-data teams",
  ],
  milestones: locale === "zh" ? [
    { date: "2015-06-30", event: "Ouster Technologies, Inc. 的运营前身成立。" },
    { date: "2018", event: "公司推出 OS 产品线。" },
    { date: "2021-03", event: "完成与 Colonnade Acquisition Corp. 的业务合并并更名为 Ouster, Inc.。" },
    { date: "2021-10", event: "收购固态闪光激光雷达开发商 Sense Photonics。" },
    { date: "2023-02-10", event: "完成与 Velodyne Lidar 的对等合并。" },
    { date: "2025", event: "停止制造合并获得的 VLP-16、VLP-16 Lite、VLP-16 Hi-Res、VLP-32 和 VLS-128。" },
    { date: "2026-02-04", event: "完成对 Stereolabs SAS 的收购。" },
  ] : [
    { date: "2015-06-30", event: "Ouster Technologies, Inc., the operating predecessor, was founded." },
    { date: "2018", event: "The OS product line was introduced." },
    { date: "2021-03", event: "The Colonnade business combination closed and the company became Ouster, Inc." },
    { date: "2021-10", event: "Ouster acquired solid-state flash-lidar developer Sense Photonics." },
    { date: "2023-02-10", event: "The merger of equals with Velodyne Lidar closed." },
    { date: "2025", event: "Manufacturing stopped for acquired VLP-16, VLP-16 Lite, VLP-16 Hi-Res, VLP-32, and VLS-128 products." },
    { date: "2026-02-04", event: "Ouster completed its acquisition of Stereolabs SAS." },
  ],
  catalogScope: locale === "zh"
    ? "本批次覆盖 Ouster 当前官网主导航中的 5 个具名 OS 硬件入口和 3 个 Ouster 软件入口。4 款 Rev8 传感器按 v4.0 PDF 数据表逐字段建档；OS2 因当前入口未提供同版完整表而标记为部分覆盖。已停止制造的 Velodyne 型号不作为当前产品，Stereolabs 品牌的 ZED / AI Compute 型号留待独立归属建档，开发中的 DF 系列不当作已交付产品。"
    : "This batch covers five named OS hardware entries and three Ouster software entries in the current website navigation. Four Rev8 sensors are transcribed field by field from v4.0 PDF datasheets; OS2 remains partial because its current entry does not expose an equivalent complete table. Discontinued Velodyne models are not current products, Stereolabs-branded ZED and AI Compute models remain for separate ownership records, and the in-development DF series is not treated as delivered product.",
  catalogCoverage: "model-partial",
  verificationFocus: locale === "zh"
    ? "按适用零件号、通道、以太网选项、光束配置、帽盖与底板、供电、热集成、同步源、软件许可和待定认证状态锁定交付配置；网页与 PDF 冲突项必须由最新报价和数据表确认。"
    : "Lock delivery against applicable part number, channels, Ethernet option, beam configuration, cap and baseplate, power, thermal integration, timing source, software license, and pending-certification status; resolve web-versus-PDF conflicts through the latest quote and datasheet.",
  presalesQuestions: locale === "zh" ? [
    "目标反射率、日照、量程、视场、角分辨率、帧率和点频分别是多少？",
    "需要哪种通道数、1000BASE-T/T1、光束配置、同步输入、数据格式和软件接口？",
    "安装散热、线缆、供电、IP、冲击振动和功能安全认证状态如何验收？",
  ] : [
    "What target reflectivity, sunlight, range, field of view, angular resolution, frame rate, and point rate are required?",
    "Which channel count, 1000BASE-T/T1 option, beam configuration, timing input, data format, and software interface are required?",
    "How will thermal mounting, cable, power, IP, shock/vibration, and functional-safety certification status be accepted?",
  ],
  reviewedAt: "2026-09-04",
});

export const applyOusterCompanyPatch = (company: CompanyProfile, locale: Locale): CompanyProfile => (
  company.slug === "ouster" ? ousterCompanyPatch(company, locale) : company
);

const sensorSeeds: ProductSeed[] = sensors.map((spec) => ({
  id: spec.id,
  product: spec.product,
  pageUrl: spec.pageUrl,
  category: "perception",
  primary: "sensing",
  subclass: "lidar",
  useCases: ["research", "manufacturing", "logistics", "integration"],
  type: spec.type,
  integration: l(
    "通过千兆以太网、HTTPS API、PTP/gPTP/PPS/GPRMC、Ouster SDK 及 ROS 2 等生态接入；必须按具体零件号和网络拓扑确认吞吐、同步、供电与散热。",
    "Integration uses gigabit Ethernet, HTTPS API, PTP/gPTP/PPS/GPRMC, the Ouster SDK, and ecosystems such as ROS 2. Throughput, timing, power, and thermal design must be confirmed for the exact part number and network topology.",
  ),
  verification: l(
    "先固定适用零件号、通道数、以太网与光束配置，再在目标反射率、日照、天气、安装热阻、振动和同步条件下复测。带脚注的认证不得在完成证书核验前表述为已获认证。",
    "First lock the applicable part number, channel count, Ethernet, and beam configuration, then retest under target reflectivity, sunlight, weather, mounting thermal resistance, vibration, and timing. Footnoted certifications must not be represented as completed before certificate verification.",
  ),
  rows: sensorRows(spec),
  overview: [
    spec.summary,
    l(
      "本记录逐字段覆盖当前引用的 Rev8 v4.0 数据表，并另存官网对比表口径。数据表声明所有规格和认证为初步信息、仅适用于所列零件号，性能是测试条件下的典型值。",
      "This record covers the fields in the currently cited Rev8 v4.0 datasheet and separately preserves the web-comparison figures. The datasheet states that specifications and certifications are preliminary, apply only to the listed part number, and represent typical values under test conditions.",
    ),
  ],
  applications: spec.applications,
  coverage: "official-complete",
  specificationKind: "parameters",
  sourceLinks: [
    { label: l(`${spec.product} 官方数据表`, `${spec.product} official datasheet`), url: spec.pdfUrl },
    { label: l("Ouster 传感器对比", "Ouster sensor comparison"), url: OUSTER_OVERVIEW },
  ],
}));

const capabilityRow = (
  pageUrl: string,
  locatorZh: string,
  locatorEn: string,
  zh: string,
  en: string,
  valueZh: string,
  valueEn = valueZh,
) => sourceRow(pageUrl, sourceNames.page, l(locatorZh, locatorEn), zh, en, valueZh, valueEn);

const productSeeds: ProductSeed[] = [
  ...sensorSeeds,
  {
    id: "verified-ouster-os2",
    product: "OS2",
    pageUrl: OS2_PAGE,
    category: "perception",
    primary: "sensing",
    subclass: "lidar",
    useCases: ["research", "manufacturing", "logistics", "integration"],
    type: l("远距高分辨率激光雷达", "Long-range high-resolution lidar"),
    integration: l("通过 Ouster OS 数据接口及 SDK 接入，并可与 Gemini 和 BlueCity 配合；实际硬件代际、通道与连接器必须由订单确认。", "Integrates through OS data interfaces and SDKs and can pair with Gemini and BlueCity. Hardware generation, channels, and connector must be confirmed on the order."),
    verification: l("当前产品页保留了 OS2 的公开重点参数，但未提供与 Rev8 v4.0 四款传感器相同的完整表。采购前应下载对应 REV6/REV7 文档并锁定零件号。", "The current page retains OS2 headline specifications but does not expose a table equivalent to the four Rev8 v4.0 datasheets. Download the matching REV6/REV7 documentation and lock the part number before procurement."),
    rows: [
      capabilityRow(OS2_PAGE, "产品规格摘要", "Product specification summary", "10% 反射率量程", "Range at 10% reflectivity", "200 m"),
      capabilityRow(OS2_PAGE, "产品规格摘要", "Product specification summary", "最大量程", "Maximum range", "400 m"),
      capabilityRow(OS2_PAGE, "产品规格摘要", "Product specification summary", "垂直视场", "Vertical field of view", "22.5°"),
      capabilityRow(OS2_PAGE, "产品规格摘要", "Product specification summary", "通道数", "Channels", "128"),
      capabilityRow(OS2_PAGE, "产品规格摘要", "Product specification summary", "每秒最大点数", "Maximum points per second", "2.62 million"),
      capabilityRow(OS2_PAGE, "产品规格摘要", "Product specification summary", "最大帧率", "Maximum frame rate", "20 Hz"),
      capabilityRow(OS2_PAGE, "产品规格摘要", "Product specification summary", "最大精密度", "Maximum precision", "±2 cm", "+/-2 cm"),
      capabilityRow(OS2_PAGE, "产品规格摘要", "Product specification summary", "平均无故障时间", "Mean time to failure", "≥250,000 h"),
      capabilityRow(OS2_PAGE, "常见问题", "FAQ", "公开垂直分辨率选项", "Published vertical-resolution options", "32 / 64 / 128 通道", "32 / 64 / 128 channels"),
      capabilityRow(OS2_PAGE, "常见问题", "FAQ", "32 / 64 通道光束配置", "32 / 64-channel beam configurations", "梯度、地平线下、地平线上", "Gradient, below horizon, and above horizon"),
      capabilityRow(OS2_PAGE, "常见问题", "FAQ", "防护等级说明", "Ingress-protection statement", "IP69K；可承受最高 1600 psi 冲洗；可在 1 m 水深浸没", "IP69K; power washing up to 1600 psi; submersion to 1 m"),
    ],
    overview: [
      l("OS2 产品页将其定位为大范围基础设施、安全与自主移动的远距传感器，并保留 200 m / 400 m、128 通道和 2.62M 点/s 等规格。", "The OS2 page positions it as a long-range sensor for large-scale infrastructure, security, and autonomous mobility and retains 200 m / 400 m, 128-channel, and 2.62M points/s specifications."),
      l("该页同时引导用户查找前代 REV6 规格，说明当前入口混合了产品概览与历史代际资料。本记录不把 Rev8 OS1 Max 的参数外推给 OS2。", "The page also directs users to previous REV6 specifications, indicating that the current entry mixes a product overview with earlier-generation material. This record does not infer Rev8 OS1 Max figures for OS2."),
    ],
    applications: [l("大范围基础设施与安全监测", "Large-scale infrastructure and security monitoring"), l("自主移动、交通与远距测绘", "Autonomous mobility, traffic, and long-range mapping")],
    coverage: "official-partial",
    specificationKind: "parameters",
  },
  {
    id: "verified-ouster-gemini",
    product: "Ouster Gemini",
    pageUrl: GEMINI_PAGE,
    category: "model-software",
    primary: "software-tools",
    subclass: "robot-model",
    useCases: ["logistics", "service", "integration"],
    type: l("激光雷达空间感知与分析平台", "Lidar spatial-perception and analytics platform"),
    integration: l("平台由 OS 系列传感器、边缘处理器、感知软件和云端分析组成；部署、站点管理、告警与 VMS 对接需按具体许可和网络架构确认。", "The platform combines OS sensors, edge processors, perception software, and cloud analytics. Deployment, site management, alerts, and VMS integration depend on license and network architecture."),
    verification: l("核对目标对象、遮挡、覆盖区、传感器网格、事件区、边缘与云边界、数据保留、隐私要求、告警接口和许可费用。", "Verify target classes, occlusion, coverage, sensor mesh, event zones, edge/cloud boundary, retention, privacy requirements, alert interfaces, and licensing."),
    rows: [
      capabilityRow(GEMINI_PAGE, "产品概述", "Product overview", "检测对象", "Detected objects", "人员、物体与车辆", "People, objects, and vehicles"),
      capabilityRow(GEMINI_PAGE, "产品概述", "Product overview", "核心任务", "Core tasks", "检测、分类与跟踪", "Detection, classification, and tracking"),
      capabilityRow(GEMINI_PAGE, "产品概述", "Product overview", "公开精度口径", "Published precision statement", "厘米级跟踪精度", "Centimeter-level tracking precision"),
      capabilityRow(GEMINI_PAGE, "产品概述", "Product overview", "传感器网络", "Sensor network", "支持多传感器自动融合与网格化覆盖", "Automated multi-sensor merging and meshed coverage"),
      capabilityRow(GEMINI_PAGE, "产品概述", "Product overview", "可视化", "Visualization", "WebGUI 实时 2D / 3D 数字孪生", "Real-time 2D / 3D digital-twin WebGUI"),
      capabilityRow(GEMINI_PAGE, "包含内容", "What's included", "平台组件", "Platform components", "感知引擎、多传感器融合、WebGUI、诊断仪表板、自定义事件区、OTA 更新、云端多站点门户", "Perception engine, multi-sensor merging, WebGUI, diagnostics dashboard, custom event zones, OTA updates, and multi-site cloud portal"),
      capabilityRow(GEMINI_PAGE, "监控与安全", "Monitoring and security", "监控能力", "Monitoring capabilities", "周界安全、禁入区、实时告警、围栏/大门/开放区域户外监控", "Perimeter security, keep-out zones, real-time alerts, and outdoor fence/gate/open-site monitoring"),
      capabilityRow(GEMINI_PAGE, "监控与安全", "Monitoring and security", "隐私输出", "Privacy output", "不输出人脸或车牌；公司称其不输出个人可识别信息", "No faces or license plates; the company states that it does not output personally identifiable information"),
      sourceRow(OUSTER_10K, sourceNames.annualReport, l("产品组合 - Ouster Gemini", "Product portfolio - Ouster Gemini"), "平台组成（10-K）", "Platform composition (10-K)", "OS 系列雷达、边缘处理器硬件、感知软件和云端分析", "OS-series lidar, edge-processor hardware, perception software, and cloud analytics"),
    ],
    overview: [l("Gemini 面向安防、园区管理、人群与零售分析等智慧空间，以 Ouster 雷达数据执行对象检测、分类和持续跟踪。", "Gemini targets smart spaces such as security, yard management, crowd, and retail analytics using Ouster lidar for object detection, classification, and continuous tracking."), l("其公开资料以平台能力和部署组成而非单一硬件参数表为主，因此本条不标记为型号参数完整。", "Its public material is organized around platform capabilities and deployment components rather than a single hardware specification table, so this record is not marked model-specification complete.")],
    applications: [l("周界安防与禁入区", "Perimeter security and keep-out zones"), l("园区、人群、交通与零售分析", "Yard, crowd, traffic, and retail analytics")],
    coverage: "capability-only",
    level: "platform",
    specificationKind: "capabilities",
    sourceLinks: [{ label: sourceNames.annualReport, url: OUSTER_10K }],
  },
  {
    id: "verified-ouster-bluecity",
    product: "Ouster BlueCity",
    pageUrl: BLUECITY_PAGE,
    category: "model-software",
    primary: "software-tools",
    subclass: "simulation",
    useCases: ["service", "integration"],
    type: l("道路交通感知、控制与分析系统", "Road-traffic perception, control, and analytics system"),
    integration: l("支持 NTCIP / SDLC 交通控制器、RSU 上的 V2X 安全消息、开放 API，以及本地边缘或云端门户。", "Supports NTCIP / SDLC traffic controllers, V2X safety messages over RSUs, open APIs, and local-edge or cloud portals."),
    verification: l("核对道路几何、遮挡、雷达数量、控制器协议、信号相位、V2X、数据治理、许可证、现场安装与交通安全验收。", "Verify roadway geometry, occlusion, sensor count, controller protocol, signal phases, V2X, data governance, licensing, installation, and traffic-safety acceptance."),
    rows: [
      capabilityRow(BLUECITY_PAGE, "产品概述", "Product overview", "公开检测距离", "Published detection range", "最高 500 ft", "Up to 500 ft"),
      capabilityRow(BLUECITY_PAGE, "产品概述", "Product overview", "水平覆盖", "Horizontal coverage", "360°"),
      capabilityRow(BLUECITY_PAGE, "产品概述", "Product overview", "检测与跟踪对象", "Detected and tracked road users", "行人、骑行者、车辆和有轨电车", "Pedestrians, cyclists, vehicles, and trams"),
      capabilityRow(BLUECITY_PAGE, "产品概述", "Product overview", "停止线检测准确率", "Stop-bar detection accuracy", "99%"),
      capabilityRow(BLUECITY_PAGE, "产品概述", "Product overview", "API 架构", "API architecture", "开放 API，用于生态集成和数据共享", "Open API for ecosystem integration and data sharing"),
      capabilityRow(BLUECITY_PAGE, "产品概述", "Product overview", "环境检测口径", "Environmental detection statement", "全天候与全光照 24/7 检测", "24/7 all-weather and all-light detection"),
      capabilityRow(BLUECITY_PAGE, "部署", "Deployment", "单路口雷达数量", "Lidar sensors per intersection", "2 个", "2"),
      capabilityRow(BLUECITY_PAGE, "部署", "Deployment", "平均安装时间", "Average installation time", "3–5 h"),
      capabilityRow(BLUECITY_PAGE, "部署", "Deployment", "传感器可靠性口径", "Sensor reliability statement", "MTTF ≥250,000 h"),
      capabilityRow(BLUECITY_PAGE, "部署", "Deployment", "传感器工作温度", "Sensor operating temperature", "-40–85°C"),
      capabilityRow(BLUECITY_PAGE, "路口管理", "Intersection management", "交通控制器集成", "Traffic-controller integration", "NTCIP / SDLC"),
      capabilityRow(BLUECITY_PAGE, "路口管理", "Intersection management", "V2X 输出", "V2X output", "通过 RSU 发送实时 V2X 安全消息", "Real-time V2X safety messages over RSU"),
      capabilityRow(BLUECITY_PAGE, "门户", "Portal", "门户部署方式", "Portal deployment", "边缘本地或云端访问", "Local edge or cloud access"),
      capabilityRow(BLUECITY_PAGE, "门户", "Portal", "门户能力", "Portal capabilities", "实时 3D 交通数字孪生、可选原生彩色点云和二维图像、远程配置、事件记录与分析、诊断与系统健康", "Live 3D traffic digital twin, optional native-color point cloud and 2D image, remote configuration, event recordings and analytics, diagnostics, and system health"),
      capabilityRow(BLUECITY_PAGE, "许可", "Licensing", "分析许可", "Analytics licensing", "永久许可或可扩展 SaaS 许可", "Perpetual or scalable SaaS license"),
      sourceRow(OUSTER_10K, sourceNames.annualReport, l("产品组合 - BlueCity", "Product portfolio - BlueCity"), "分析仪表板示例", "Analytics-dashboard examples", "险情数量、行人过街时间估计、违法转向和闯红灯", "Near-miss counts, pedestrian crossing-time estimates, illegal-turn detection, and red-light violations"),
    ],
    overview: [l("BlueCity 是由 Gemini 驱动的交通运营、规划和安全系统，结合 3D 激光雷达、AI 感知、信号控制接口和分析门户。", "BlueCity is a Gemini-powered traffic-operations, planning, and safety system combining 3D lidar, AI perception, signal-controller interfaces, and analytics portals."), l("99%、500 ft、安装时间和 MTTF 等数值是厂商公开口径，仍需结合道路、遮挡、安装高度、天气、控制器与验收方法复测。", "The 99%, 500 ft, installation-time, and MTTF figures are manufacturer-published statements and still require validation against roadway, occlusion, mounting height, weather, controller, and acceptance method.")],
    applications: [l("路口信号感应与交通流优化", "Intersection actuation and traffic-flow optimization"), l("道路安全、易受伤交通参与者与历史事件分析", "Road safety, vulnerable-road-user, and historical-event analysis")],
    coverage: "capability-only",
    level: "platform",
    specificationKind: "capabilities",
    sourceLinks: [{ label: sourceNames.annualReport, url: OUSTER_10K }],
  },
  {
    id: "verified-ouster-studio",
    product: "Ouster Studio",
    pageUrl: STUDIO_PAGE,
    category: "model-software",
    primary: "software-tools",
    subclass: "development-tool",
    useCases: ["research", "integration"],
    type: l("激光雷达点云可视化与数据管理工具", "Lidar point-cloud visualization and data-management tool"),
    integration: l("Web 与桌面端均处理 Ouster OS 点云和样例数据；桌面端额外支持传感器发现、直连、实时查看与记录，并可上传到云端共享。", "Web and desktop handle Ouster OS point clouds and sample data. Desktop additionally supports sensor discovery, direct connection, live viewing and recording, plus cloud upload for sharing."),
    verification: l("核对桌面与 Web 功能差异、系统版本、数据格式、存储配额、组织权限、公开/私有链接、上传合规和 SLAM 结果质量。", "Verify desktop-versus-web features, OS version, data format, storage quota, organization permissions, public/private links, upload compliance, and SLAM-map quality."),
    rows: [
      capabilityRow(STUDIO_PAGE, "产品概述", "Product overview", "支持数据", "Supported data", "Ouster OS 系列激光雷达点云与官方样例数据", "Ouster OS-series lidar point clouds and official sample data"),
      capabilityRow(STUDIO_PAGE, "下载", "Downloads", "客户端平台", "Client platforms", "Web、Windows、Linux、macOS", "Web, Windows, Linux, and macOS"),
      capabilityRow(STUDIO_PAGE, "功能对比", "Feature comparison", "共同能力", "Shared capabilities", "查看已记录数据、上传下载、私有/公开链接共享、组织设置、标签/筛选/搜索、上传后自动生成 SLAM 地图、查看下载样例数据", "View recorded data, upload/download, share via private/public links, organization settings, tag/filter/search, automatic SLAM maps after upload, and view/download sample data"),
      capabilityRow(STUDIO_PAGE, "功能对比", "Feature comparison", "桌面端专属能力", "Desktop-only capabilities", "传感器发现与连接；实时数据查看与记录", "Sensor discovery and connection; live-data visualization and recording"),
      capabilityRow(STUDIO_PAGE, "Web", "Web", "免费云存储口径", "Published free cloud-storage allowance", "最高 250 GB", "Up to 250 GB"),
      capabilityRow(STUDIO_PAGE, "数据管理", "Data management", "数据工作流", "Data workflow", "上传、查看、组织、共享、样例下载和自动 SLAM 地图", "Upload, view, organize, share, sample download, and automatic SLAM mapping"),
    ],
    overview: [l("Ouster Studio 将 OS 系列传感器发现、实时点云查看、记录、上传、组织、共享和 SLAM 地图生成放在桌面与 Web 工作流中。", "Ouster Studio provides desktop and web workflows for OS-sensor discovery, live point-cloud viewing, recording, upload, organization, sharing, and SLAM-map generation."), l("网页列出的是版本能力矩阵而非硬件式规格表。本记录保留 Web 与桌面边界，不把云存储额度或功能表述为永久不变。", "The website publishes an edition-capability matrix rather than a hardware-style specification table. This record preserves the web/desktop boundary and does not treat cloud quotas or features as permanent.")],
    applications: [l("传感器调试与点云质量检查", "Sensor commissioning and point-cloud quality checks"), l("数据分享、样例复现与 SLAM 地图生成", "Data sharing, sample reproduction, and SLAM-map generation")],
    coverage: "capability-only",
    level: "platform",
    specificationKind: "capabilities",
  },
];

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

const toRecord = (locale: Locale, company: CompanyProfile, seed: ProductSeed): FinderExpansionRecord => ({
  id: seed.id,
  matrixSlug: "",
  matrixTitle: locale === "zh" ? "Ouster 型号级产品目录" : "Ouster model-level product catalog",
  industry: "robotics",
  reviewedAt: "2026-09-04",
  product: seed.product,
  company: company.name,
  type: t(locale, seed.type),
  openness: locale === "zh" ? "官方产品页、数据表或上市公司报告公开" : "Official product page, datasheet, or public-company filing is available",
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
  })), seed.pageUrl, locale === "zh" ? "Ouster 官方资料" : "Ouster official material"),
  catalogPrimary: seed.primary,
  catalogSubclass: seed.subclass,
  catalogCoverage: "model-partial",
  catalogScope: locale === "zh"
    ? "本记录对应具名硬件、软件或平台入口；不会把相邻型号、已停产 Velodyne 型号或 Stereolabs 品牌型号的参数自动并入。"
    : "This record maps to a named hardware, software, or platform entry and does not merge figures from adjacent models, discontinued Velodyne products, or Stereolabs-branded models.",
  profile: finderProfile(company),
  evidence: {
    level: seed.level ?? "model",
    specificationKind: seed.specificationKind ?? "parameters",
    specificationCoverage: seed.coverage,
    specificationCoverageNote: locale === "zh"
      ? seed.coverage === "official-complete"
        ? "已逐字段覆盖当前引用的 Rev8 v4.0 PDF 数据表，并单独保存官网对比表中的冲突口径。"
        : seed.coverage === "capability-only"
          ? "厂商公开内容采用平台能力或版本功能表，不存在可声明完整的单一硬件式参数表。"
          : "已收录当前入口中可核对的规格，但尚未取得同代完整数据表，不能声明型号参数完整。"
      : seed.coverage === "official-complete"
        ? "Every field in the cited Rev8 v4.0 PDF datasheet is covered, with conflicting web-comparison figures preserved separately."
        : seed.coverage === "capability-only"
          ? "The manufacturer publishes platform capabilities or an edition feature matrix rather than a single complete hardware-style specification table."
          : "Verifiable specifications on the current entry are recorded, but an equivalent complete-generation datasheet is not available, so model-level completeness is not claimed.",
    overview: seed.overview.map((item) => t(locale, item)),
    applications: seed.applications.map((item) => t(locale, item)),
    disclosureBoundary: locale === "zh"
      ? "数值只适用于引用来源的具体型号、零件号、配置和测试条件；待定认证、网页与 PDF 差异、软件许可及部署结果必须单独核验。"
      : "Figures apply only to the cited model, part number, configuration, and test conditions; pending certifications, web-versus-PDF differences, software licenses, and deployment outcomes require separate verification.",
    sourceLinks: [...new Map([
      { label: locale === "zh" ? `${seed.product} 官方产品页` : `${seed.product} official product page`, url: seed.pageUrl },
      ...(seed.sourceLinks ?? []).map((item) => ({ label: t(locale, item.label), url: item.url })),
      { label: locale === "zh" ? "Ouster 公司介绍" : "About Ouster", url: OUSTER_ABOUT },
    ].map((item) => [item.url, item])).values()],
  },
});

export const getOusterProductRecords = (locale: Locale, company: CompanyProfile): FinderExpansionRecord[] => (
  productSeeds.map((seed) => toRecord(locale, company, seed))
);

export const ousterCatalogProductCount = productSeeds.length;
