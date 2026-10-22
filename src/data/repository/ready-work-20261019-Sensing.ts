import type { FinderExpansionRecord, FinderParameter } from './product-finder-demo';
import type { Locale } from '../site';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { normalizeFinderParameter } from './parameter-index';

type Text = { zh: string; en: string };
const l = (zh: string, en: string): Text => ({ zh, en });
export const readySensingSources = {
  mid360: {
    id: 'livox-mid360-v1.2-202404-p14-23',
    url: 'https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/Livox/Livox_Mid-360_User_Manual_EN.pdf',
    version: 'v1.2, 2024.04',
    sha256: '3f202c845330023d50eee086cc522918ec8b1279446c4286ea3d38722400cab2',
  },
  ouster: {
    id: 'ouster-2025-10k-0001628280-26-013313',
    url: 'https://www.sec.gov/Archives/edgar/data/1816581/000162828026013313/oust-20251231.htm',
    version: 'FY2025 Form 10-K, filed 2026-03-02',
    sha256: 'e90eb89445af63e607600deee3b670b3d3978df31de18165d85807f7f0b38424',
  },
} as const;

type SourceRow = {
  key: string; label: Text; value: Text; locator: Text; conditions: Text;
  excludeFromNumericIndex: boolean;
};
const row = (key: string, page: number, section: string, labelZh: string, labelEn: string,
  valueZh: string, valueEn: string, conditionZh: string, conditionEn: string): SourceRow => ({
  key, label: l(labelZh, labelEn), value: l(valueZh, valueEn),
  locator: l(`MID-360 用户手册 v1.2 (2024.04)，PDF 第 ${page} 页 / 印刷第 ${page - 2} 页，${section}`,
    `MID-360 User Manual v1.2 (2024.04), PDF p.${page} / printed p.${page - 2}, ${section}`),
  conditions: l(conditionZh, conditionEn), excludeFromNumericIndex: true,
});
const usageZh = '仅限此版 MID-360 手册；不代表 MID-360S/NF 或外部协议的完整格式。';
const usageEn = 'This MID-360 manual revision only; not MID-360S/NF or a complete external wire-protocol schema.';
const r = (key: string, page: number, section: string, zh: string, en: string, vz: string, ve: string,
  cz = usageZh, ce = usageEn) => row(key, page, section, zh, en, vz, ve, cz, ce);

// These contextual rows must not become unconditional operating ratings in numeric search.
export const readySensingMid360Rows: SourceRow[] = [
  r('coordinate-origin', 14, 'Usage / Coordinates', '点云坐标系原点', 'Point-cloud coordinate-system origin',
    '采用图示笛卡尔 O-XYZ 坐标系，O 点为原点。', 'Uses the illustrated Cartesian O-XYZ point-cloud coordinate system, with point O as the origin.',
    '只转录本页明确的坐标定义；不从不可见文本或图形比例估计机械尺寸。', 'Only the explicit coordinate definition is transcribed; no mechanical dimensions estimated from invisible text or diagram scale.'),
  r('output-classes', 14, 'Usage / Output Data', '输出数据类别', 'Output data classes',
    '信息推送、点云数据、IMU 数据；完整格式另见通信协议。', 'Information push, point cloud data and IMU data; full formats are delegated to the communication protocol.'),
  r('push-policy', 14, 'Information Push', '信息推送策略', 'Information push policy',
    '上电后定期推送到设置的 IP 地址，默认广播。', 'Periodically pushed after power-on to the configured IP address; broadcast by default.'),
  r('push-identity', 14, 'Information Push table / Device information', '推送的设备标识字段', 'Pushed device identity fields',
    '唯一序列号、固件版本、硬件版本、MAC 地址。', 'Unique serial number, firmware version, hardware version and MAC address.',
    '表格仅列部分推送信息，不宣称完整字段目录。', 'The manual explicitly lists only part of the pushed information, not an exhaustive field inventory.'),
  r('push-ip', 14, 'Information Push table / User configuration', '推送的网络配置字段', 'Pushed network configuration fields',
    '雷达 IP 配置含 IP 地址、子网掩码和网关；另含信息推送及点云的目标地址。', 'LiDAR IP configuration includes IP address, subnet mask and gateway; target addresses for information push and point cloud data are also pushed.'),
  r('push-config', 15, 'Information Push table / User configuration', '推送的格式与开关配置', 'Pushed format and switch configuration',
    '点云坐标格式可配置；IMU 数据推送开关默认开启；FOV 可配置为 360 度视场的一部分。', 'Point-cloud coordinate format is configurable; IMU data push is enabled by default; FOV may be configured to a subset of the 360-degree field.'),
  r('extrinsic-storage', 15, 'Information Push table / Extrinsic parameters', '外参存储行为', 'Extrinsic storage behavior',
    '可存储标定所得外参，但 MID-360 不使用这些外参。', 'Calibrated extrinsics can be stored, but MID-360 does not use these extrinsics.'),
  r('default-mode', 15, 'Information Push table / Working mode', '默认目标工作模式', 'Default target working mode',
    '上电后默认 Sampling 采样模式。', 'Sampling mode is the default after power-on.'),
  r('detection-modes', 15, 'Information Push table / Detection mode', '探测模式及噪声权衡', 'Detection modes and noise trade-off',
    'Normal 为默认；Sensitive 可增强低反射率目标在强光或弱光下的探测，同时可能增加噪声。', 'Normal is the default; Sensitive improves detection of low-reflectivity targets under strong or weak illumination but may increase noise.'),
  r('push-status', 15, 'Information Push table / Status information', '推送的状态字段', 'Pushed status fields',
    '当前工作状态、内部关键部件温度、指示原因与类别的错误码。', 'Current working state, internal critical-component temperature and error codes indicating cause and category.'),
  r('point-fields', 15, 'Point Cloud Data', '点云数据内容', 'Point cloud data content',
    '目标反射率、坐标、标签和时间戳。', 'Target reflectivity, coordinates, tags and timestamp.'),
  r('reflectivity-encoding', 15, 'Point Cloud Data / Reflectivity', '反射率编码', 'Reflectivity encoding',
    '无符号值 0-255；0-150 对应朗伯反射率 0%-100%；151-255 对应逆反射目标。', 'Unsigned values 0-255; 0-150 represents Lambertian reflectivity 0%-100%; 151-255 represents retroreflective targets.',
    '数字是输出编码，不是测距或光学精度额定值。', 'These numbers encode output data; they are not ranging or optical accuracy ratings.'),
  r('near-reflectivity', 15, 'Point Cloud Data / Reflectivity', '近距离反射率限制', 'Near-target reflectivity limitation',
    '目标距离小于 2 m 时反射率误差较大，仅可区分全反射和漫反射目标。', 'For targets closer than 2 m, reflectivity error is large; the data can only distinguish total-reflection from diffuse-reflection targets.'),
  r('coordinates', 15, 'Point Cloud Data / Coordinates', '点云坐标形式', 'Point-cloud coordinate forms',
    '可选择笛卡尔坐标 (x,y,z) 或球坐标 (r,theta,phi)。', 'Cartesian (x,y,z) or spherical (r,theta,phi) coordinates may be selected.'),
  r('invalid-return', 15, 'Point Cloud Data / Coordinates', '无目标或超范围返回', 'No-target or out-of-range return',
    '笛卡尔坐标为 (0,0,0)；球坐标为 (0,theta,phi)。', 'Cartesian coordinates are (0,0,0); spherical coordinates are (0,theta,phi).',
    '手册所举大于 100 m 是无效返回示例，不是额定探测距离。', 'The manual example above 100 m illustrates invalid returns, not a rated detection range.'),
  r('coordinate-transform', 16, 'Point Cloud Data / coordinate diagram', '球坐标至笛卡尔坐标公式', 'Spherical-to-Cartesian formulas',
    'X=r*sin(theta)*cos(phi)；Y=r*sin(theta)*sin(phi)；Z=r*cos(theta)。', 'X=r*sin(theta)*cos(phi); Y=r*sin(theta)*sin(phi); Z=r*cos(theta).',
    '按坐标图转录显式公式，未从图形估计角度或尺寸。', 'Explicit formulas transcribed from the coordinate diagram; no angles or dimensions estimated from its geometry.'),
  r('tag-width', 16, 'Tags', '点云标签位宽', 'Point-cloud tag width',
    '8 位无符号整数，按位组表示点属性与置信度。', '8-bit unsigned integer, grouped into point-property and confidence fields.'),
  r('tag-reserved', 16, 'Tags table / Bit[7-6]', '标签保留位', 'Tag reserved bits', '位 7-6 保留。', 'Bits 7-6 are reserved.'),
  r('tag-other', 16, 'Tags table / Bit[5-4]', '标签其他噪声位组', 'Tag other-noise field',
    '位 5-4：0 高置信度正常点，1 中等，2 低，3 保留。', 'Bits 5-4: 0 high-confidence normal points, 1 moderate, 2 low, 3 reserved.'),
  r('tag-atmosphere', 16, 'Tags table / Bit[3-2]', '标签大气颗粒位组', 'Tag atmospheric-particle field',
    '位 3-2 表示雨、雾、尘等：0 高置信度正常点，1 中等，2 低，3 保留。', 'Bits 3-2 indicate rain, fog, dust and similar particles: 0 high-confidence normal points, 1 moderate, 2 low, 3 reserved.'),
  r('tag-dragging', 16, 'Tags table / Bit[1-0]', '标签物体间拖点位组', 'Tag inter-object dragging-noise field',
    '位 1-0：0 高置信度正常点，1 中等，2 低，3 保留。', 'Bits 1-0: 0 high-confidence normal points, 1 moderate, 2 low, 3 reserved.'),
  r('tag-use', 16, 'Tags / confidence interpretation', '标签置信度解释', 'Tag confidence interpretation',
    '低置信度表示对应噪声影响较大，可依据标签过滤点云。', 'Low confidence indicates greater influence of the corresponding noise; tags can be used to filter points.'),
  r('timestamp-representation', 16, 'Timestamp', '时间戳表示', 'Timestamp representation',
    '64 位整数，单位 ns；同步方式为 IEEE 1588-2008 或 GPS。', '64-bit integers in ns; synchronization uses IEEE 1588-2008 or GPS.'),
  r('ptp-transport', 16, 'Timestamp / IEEE 1588-2008', 'PTP 时钟角色与传输限制', 'PTP clock role and transport restriction',
    '作为 ordinary clock，仅支持 UDP/IPv4；消息为 Sync、Follow_up、Delay_req、Delay_resp。', 'Ordinary-clock role, UDP/IPv4 only; messages are Sync, Follow_up, Delay_req and Delay_resp.'),
  r('gps-input', 16, 'Timestamp / GPS', 'GPS 同步输入方式', 'GPS synchronization inputs',
    'PPS 加 GPRMC 串口消息，针脚另见已录入连接器章节。', 'PPS plus serial GPRMC messages; pin assignments are in the previously recorded Connectors section.'),
  r('pps-timing', 16, 'Timestamp / GPS', 'PPS 脉冲时序', 'PPS pulse timing',
    '周期 1 s (t0=1000 ms)；高电平持续时间 t1 > 1 us。', 'Interval 1 s (t0=1000 ms); high-level duration t1 > 1 us.',
    '同步输入要求，不是 LiDAR 帧率、采样率或精度。', 'Synchronization input requirements, not LiDAR frame rate, sampling rate or accuracy.'),
  r('gps-network', 16, 'Timestamp / GPS', '逐脉冲网络时间戳替代方式', 'Per-pulse network timestamp alternative',
    '除串口 GPS 消息外，可通过网络包发送每个脉冲的时间戳；具体命令在外部协议中。', 'Instead of serial GPS messages, each pulse timestamp can be sent in network packets; commands are specified in the external protocol.'),
  r('imu-axes', 17, 'IMU Data', 'IMU 数据轴与方向', 'IMU data axes and directions',
    '三轴加速度计与三轴陀螺仪；输出三轴加速度和角速度，方向与点云坐标一致。', 'Three-axis accelerometer and three-axis gyroscope; output is three-axis acceleration and angular velocity aligned with point-cloud coordinates.'),
  r('imu-default-rate', 17, 'IMU Data', 'IMU 默认推送频率', 'IMU default push frequency',
    '上电后默认 200 Hz，可由主机启用或禁用。', '200 Hz by default after power-on; the host can enable or disable it.',
    '仅 IMU 输出，不是点云点频、LiDAR 帧率或时钟同步精度。', 'IMU output only, not point-cloud point rate, LiDAR frame rate or clock synchronization accuracy.'),
  r('imu-position', 17, 'IMU Data / chip position', 'IMU 在点云坐标系中的位置', 'IMU position in point-cloud coordinates',
    'x=11.0 mm，y=23.29 mm，z=-44.12 mm。', 'x=11.0 mm, y=23.29 mm, z=-44.12 mm.',
    '位置矢量保留负号；不是外形尺寸或精度。', 'Position vector with the negative sign preserved; not enclosure dimensions or accuracy.'),
  r('state-v-mode', 17, 'Working States and Working Modes', '工作状态与目标模式区别', 'Working-state versus target-mode distinction',
    '状态表示当前情况；模式表示用户选择的目标工作模式。', 'State describes the current condition; mode is the user-selected target working mode.'),
  r('state-sampling', 17, 'Working States table / Sampling', 'Sampling 状态', 'Sampling state', '已上电、正常工作并发射激光。', 'Powered on, operating normally and emitting laser beams.'),
  r('state-idle', 17, 'Working States table / Idle', 'Idle 状态', 'Idle state',
    '仅通信模块保持供电，其余部件关闭；此状态功耗最低，未给出瓦数。', 'All components except the communication module are powered off; this is the lowest-power state, without a wattage figure.'),
  r('state-error', 17, 'Working States table / Error', 'Error 状态', 'Error state', '检测到错误时进入。', 'Entered when an error is detected.'),
  r('state-self-check', 17, 'Working States table / Self-check', 'Self-check 状态', 'Self-check state', '正在执行上电自检。', 'Power-on self-check is in progress.'),
  r('state-motor', 17, 'Working States table / Motor Startup', 'Motor Startup 状态', 'Motor Startup state', '电机启动中。', 'The motor is starting.'),
  r('state-upgrading', 17, 'Working States table / Upgrading', 'Upgrading 状态', 'Upgrading state', '固件升级中。', 'Firmware update is in progress.'),
  r('state-ready', 17, 'Working States table / Ready', 'Ready 状态', 'Ready state', '已上电并准备发射激光。', 'Powered on and ready to emit laser beams.'),
  r('target-modes', 17, 'Working Modes Descriptions', '可选目标模式', 'Selectable target modes',
    'Idle、Ready、Sampling 三种；通过 Viewer 2 或 SDK 2 选择。', 'Idle, Ready and Sampling; selectable using Viewer 2 or SDK 2.'),
  r('viewer-functions', 17, 'Livox Viewer 2', 'Viewer 2 手册内功能', 'Viewer 2 functions in this manual',
    '实时点云显示与记录、点云回放及分析、产品参数设置、外参标定。', 'Real-time point-cloud display and recording, replay and analysis, product-parameter settings and extrinsic calibration.'),
  r('viewer-os', 17, 'Livox Viewer 2 / supported systems', 'Viewer 2 手册内系统要求', 'Viewer 2 systems stated in this manual',
    'Windows 10 (64 bit) 或 Ubuntu 18.04 (64 bit)。', 'Windows 10 (64 bit) or Ubuntu 18.04 (64 bit).',
    '2024.04 手册的历史兼容性声明，不代表当前下载版或最新版操作系统支持。', 'Historical compatibility statement in the 2024.04 manual, not verification of current downloads or newer operating systems.'),
  r('viewer-launch', 18, 'Livox Viewer 2 / launch steps', 'Viewer 2 手册内启动文件', 'Viewer 2 launch files in this manual',
    'Windows 解压后打开 Livox Viewer 2 的 .exe；Ubuntu 解压后在目录内运行 ./livox_viewer_2.sh。', 'After extraction, Windows opens the Livox Viewer 2 .exe; Ubuntu runs ./livox_viewer_2.sh from the extracted directory.',
    '仅转录手册步骤，未下载或执行软件。', 'Manual instructions only; software was not downloaded or executed.'),
  r('sdk-functions', 18, 'Software Development Kit / Livox SDK 2', 'SDK 2 手册内功能与接口引用', 'SDK 2 functions and API reference in this manual',
    '配置参数与查看状态、获取点云坐标、更新固件；API 引用 https://github.com/Livox-SDK/Livox-SDK2。', 'Configure parameters and inspect status, obtain point-cloud coordinates and update firmware; API reference https://github.com/Livox-SDK/Livox-SDK2.',
    '此处只确认手册引用，不宣称已读取 API、版本或命令实现。', 'Only the manual reference is verified here; API contents, versions and commands have not been reviewed.'),
  r('protocol-reference', 18, 'SDK Communication Protocol', 'SDK 通信协议引用', 'SDK communication-protocol reference',
    'Viewer 2 与 SDK 2 均使用 SDK 通信协议；自定义软件可依协议通信、控制和收取坐标；引用 https://livox-wiki-en.readthedocs.io。', 'Viewer 2 and SDK 2 use the SDK communication protocol; custom software may communicate, control and collect coordinates using it; reference https://livox-wiki-en.readthedocs.io.',
    '外部协议内容仍为独立未完成范围，不推断包头、端口、命令或时延。', 'External protocol contents remain a separate residual task; no packet headers, ports, commands or latency inferred.'),
  r('storage-temperature', 19, 'Storage', '存储温度', 'Storage temperature', '-40 至 70 deg C。', '-40 to 70 deg C.',
    '同时见 PDF 第 22 页规格表；仅存储条件，不是 -20 至 55 deg C 工作温度的替代值。', 'Also in the PDF p.22 specification table; storage only, not a replacement for the -20 to 55 deg C operating range.'),
  r('storage-environment', 19, 'Storage', '存储环境与搬放', 'Storage environment and handling',
    '保持干燥无尘，避免有毒或腐蚀性气体、材料；勿跌落，存取时小心。', 'Keep dry and dust-free, avoid poisonous or corrosive gases and materials; do not drop and handle carefully during storage.'),
  r('long-storage', 19, 'Storage / unused equipment', '长期停用检查条件', 'Long non-use inspection condition',
    '预计超过三个月不用时，定期检查传感器和连接器是否异常。', 'If not to be used for more than three months, regularly inspect sensors and connectors for abnormalities.',
    '三个月是停用条件；手册没有给出固定检查周期或寿命。', 'Three months is the non-use condition; the manual does not state a fixed inspection interval or service life.'),
  r('transport', 19, 'Transportation', '运输包装与防护', 'Transport packaging and protection',
    '用适当箱体固定，箱内放泡沫并保持清洁干燥；防冲击、碰撞和跌落。', 'Secure in a suitable box with foam; keep the box clean and dry and protect against impacts, bumps and drops.'),
  r('window-clean-air', 19, 'Maintenance / step 1', '光窗清洁的先后顺序', 'Optical-window cleaning sequence',
    '先用压缩或罐装空气除尘，勿直接擦拭积尘表面；除尘后无明显污渍则无需擦拭。', 'Remove dust first using compressed or canned air; do not wipe a dusty window directly; if no stains remain afterwards, wiping is unnecessary.',
    '手册称正常情况下唯一所需维护为清洁光窗；先检查是否需清洁，未给固定清洁周期。', 'The manual states that optical-window cleaning is the only maintenance required under normal conditions; inspect first to decide whether cleaning is necessary. No fixed cleaning interval is stated.'),
  r('window-clean-wipe', 19, 'Maintenance / step 2', '光窗污渍擦拭材料', 'Optical-window stain-removal materials',
    '用清洁干燥的镜头纸轻擦；仍脏时用镜头纸蘸少量异丙醇慢慢擦拭。', 'Gently wipe with clean dry lens tissue; if still dirty, use lens tissue with a small amount of isopropyl alcohol and wipe slowly.'),
  r('diagnostic-detection', 20, 'Troubleshooting / Cannot detect', '无法发现设备的额外诊断', 'Additional discovery diagnostics',
    '确认未被其他软件连接、主机与设备在同一 LAN、安全软件未阻挡以太网广播，并核实所有已连接设备的报文输出。', 'Check that no other software is connected, the host and sensor share a LAN, security software is not blocking Ethernet broadcasts, and packet outputs of all connected devices are present.',
    '接线和 9-27 V 供电已在旧行中。PDF 第 18/20 页另有关闭防火墙的原文建议；本补丁不执行或推广全局关闭，需按本地安全策略审查。', 'Cabling and 9-27 V supply already exist in prior rows. PDF pp.18/20 also suggest disabling firewalls; this patch neither executes nor promotes global disabling, which requires local security-policy review.'),
  r('diagnostic-connect', 20, 'Troubleshooting / Cannot connect or start sampling', '已发现但无法连接或采样', 'Detected but cannot connect or sample',
    '检查已列接线和供电；仍失败时重启雷达与 Viewer 2。', 'Check the already-listed cabling and supply; if the issue persists, reboot the sensor and restart Viewer 2.'),
  r('diagnostic-no-data', 20, 'Troubleshooting / No data received', '未收到数据的报文诊断', 'Packet diagnostics for missing data',
    '用其他应用（手册举例 Wireshark）确认所有已连接设备的报文输出。', 'Use another application (the manual gives Wireshark as an example) to confirm packet outputs of all connected devices.'),
  r('after-sales-reference', 20, 'After-Sales Information', '售后政策外部引用', 'External after-sales policy reference',
    '手册指向 https://www.livoxtech.com/support 查询政策和保修条件。', 'The manual directs readers to https://www.livoxtech.com/support for policy and warranty conditions.',
    '本页未给出保修年限、售后 SLA、寿命或采购条款，未推断。', 'This page does not state warranty duration, service SLA, service life or procurement terms; none are inferred.'),
  r('angular-qualification', 22, 'Specifications / Angular Random Error (1 sigma)', '角度随机误差的手册口径', 'Manual angular-random-error qualification',
    '手册为 <= 0.15 deg (1 sigma)；旧产品页字段为 < 0.15 deg (1 sigma)，保留两者而不覆盖。', 'The manual states <= 0.15 deg (1 sigma); the existing product-page field states < 0.15 deg (1 sigma). Both are retained without replacement.',
    '原图已核对；比较符不同，不能合并为同一无条件精度值。', 'Verified against page pixels; the comparison operators differ and must not be collapsed into one unconditional accuracy value.'),
  r('power-temperature-qualification', 22, 'Specifications / Power', '功耗的环境温度限定', 'Power ambient-temperature qualification',
    '6.5 W 的表格条件为环境温度 25 deg C。', 'The table conditions the 6.5 W figure on an ambient temperature of 25 deg C.',
    '补充旧功耗行缺少的环境条件，不覆盖其数值；不与冷启动功耗混用。', 'Adds the ambient condition missing from the existing power row without replacing its value; not interchangeable with cold-start power.'),
  r('embedded-laser-divergence', 22, 'Specifications / footnote [1]', '内置激光器发散角与安全边界', 'Embedded-laser divergence and safety boundary',
    '内置激光器发散角为水平 25.2 deg、垂直 8 deg，按半高全宽测量；勿拆卸。', 'Embedded-laser divergence is 25.2 deg horizontal by 8 deg vertical, measured at full width at half maximum; do not disassemble.',
    '仅内置激光器的脚注，不是 LiDAR FOV 或远场光斑额定值。', 'Footnote about the embedded laser only, not LiDAR FOV or a rated far-field spot size.'),
  r('embedded-laser-power', 22, 'Specifications / footnote [1]', '内置激光器功率警告', 'Embedded-laser power warning',
    '内置激光器最大功率可能超过 70 W；为避免激光伤害不得拆卸。', 'Maximum power of the embedded laser may exceed 70 W; do not disassemble to avoid laser injury.',
    '是内部激光器安全警告，不是整机输入电功率、额定输出或采购规格。', 'Internal-laser safety warning, not whole-device electrical input, rated output or a procurement specification.'),
  r('reflectivity-error-qualification', 22, 'Specifications / footnote [3]', '不同反射率的局部精度限制', 'Local accuracy limitation across reflectivities',
    '在探测范围内，检测不同反射率物体时极少数位置的点云精度可能略有下降。', 'Within the detection range, point-cloud accuracy at very few positions may slightly decrease for targets of different reflectivities.'),
  r('near-target-guarantee', 22, 'Specifications / footnote [5]', '近距离小目标不保证条件', 'Near-range small-target non-guarantee',
    '0.1-1 m 内低反射率或细小目标不保证探测效果，例如黑色泡沫、水面、抛光或哑光物体表面、细线。', 'For low-reflectivity or thin and tiny targets within 0.1-1 m, detection is not guaranteed; examples include black foam, water surfaces, polished or matte surfaces and thin lines.',
    '不替代旧 0.2 m / 25 deg C / 80% 反射率精度测试条件，也不是统一缩短探测距离。', 'Does not replace the existing accuracy test at 0.2 m, 25 deg C and 80% reflectivity or impose a universal reduced range.'),
  r('environment-qualification', 23, 'Specifications / footnote [7]', '环境导致的性能变化与散热', 'Environmental performance and cooling qualification',
    '高低温、强振动、浓雾可能略降性能；长期高温可能永久损伤，建议额外散热。', 'High or low temperature, strong vibration and heavy fog may slightly reduce performance; prolonged high temperature may permanently damage the product, and extra cooling is recommended.'),
  r('thermal-protection', 23, 'Specifications / footnote [7]', '过温保护行为', 'Overtemperature protection behavior',
    '高温触发保护并发出警告；温度过高时自动停止工作，未给出触发温度。', 'High temperature triggers protection and a warning; operation stops automatically if too hot, without a stated trigger temperature.'),
  r('surface-temperature', 23, 'Specifications / footnote [7] / points a-b', '指定外壳测点温度上限', 'Specified enclosure measurement-point temperature limit',
    '不得超过 75 deg C：标志朝向用户时的底部中心，以及左散热器中央凹槽内斜面的最高点。', 'Must not exceed 75 deg C at the bottom center and the highest point of the sloped surface in the left heatsink center groove, with the logo facing the user.',
    '指定外壳测点，不是环境工作温度，也不是自动停机阈值。', 'Specified enclosure measurement points, not ambient operating temperature or an automatic-shutdown threshold.'),
];

export function applyReadySensingProduct(record: FinderExpansionRecord, locale: Locale): FinderExpansionRecord {
  if (record.id !== 'livox-mid-360') return record;
  const existingLabels = new Set(record.parameters.flatMap(p => [p.label, ...(p.labelAliases ?? [])]));
  const additions: FinderParameter[] = readySensingMid360Rows.filter(item =>
    !existingLabels.has(item.label.en) && !existingLabels.has(item.label.zh),
  ).map(item => {
    const canonical: FinderParameter = { label: item.label.en, value: item.value.en, status: 'manufacturer' };
    return {
      label: item.label[locale], labelAliases: [item.label.zh, item.label.en], value: item.value[locale],
      status: 'manufacturer', sourceUrl: readySensingSources.mid360.url,
      sourceLabel: l('MID-360 用户手册 v1.2 (2024.04)', 'MID-360 User Manual v1.2 (2024.04)')[locale],
      sourceLocator: item.locator[locale], conditions: item.conditions[locale],
      normalized: item.excludeFromNumericIndex ? [] : normalizeFinderParameter(canonical)
        .map(value => ({ ...value, sourceLabel: item.label[locale] })),
    };
  });
  return additions.length ? { ...record, parameters: [...record.parameters, ...additions] } : record;
}

const sec = readySensingSources.ouster.url;
const financeBasis = l(
  '口径：Ouster, Inc. 及全资子公司合并，U.S. GAAP；2025/2024 年度 Form 10-K（2026-03-02 提交），Item 8，印刷第 59-64 页。PricewaterhouseCoopers LLP 于 2026-03-02 出具财务报表审计意见，未对内控有效性发表审计意见。除每股和股数另列，以下金额单位为千美元；不归属于机器人业务、单型号或单一子公司。',
  'Basis: Ouster, Inc. and wholly owned subsidiaries, consolidated U.S. GAAP; FY2025/2024 Form 10-K filed 2026-03-02, Item 8, printed pp.59-64. PricewaterhouseCoopers LLP financial-statement audit report dated 2026-03-02; no audit opinion on internal-control effectiveness. Amounts below are USD thousands unless per-share or share units are specified; not robotics, model or individual-subsidiary results.',
);

// Append these arrays to the existing profile; the shared company helper replaces arrays.
export const readySensingProfiles: CatalogEnrichmentGroup = {
  profiles: {
    ouster: {
      investmentView: [
        financeBasis,
        l(`FY2025 / FY2024：总收入 169,384 / 111,101，产品收入 146,578 / 111,101，特许权使用费 22,806 / 原表横线；毛利 83,436 / 40,460，营业亏损 (73,999) / (104,177)，净亏损 (60,377) / (97,045)。基本及摊薄每股亏损为 -1.07 / -2.08 美元/股。单位除每股外为千美元。来源：上述 10-K 第 62 页 Consolidated Statements of Operations and Comprehensive Loss。${sec}`,
          `FY2025 / FY2024: total revenue 169,384 / 111,101; product revenue 146,578 / 111,101; royalties 22,806 / source dash; gross profit 83,436 / 40,460; operating loss (73,999) / (104,177); net loss (60,377) / (97,045). Basic and diluted loss per share: USD -1.07 / -2.08 per share. All other amounts USD thousands. Source: this 10-K, printed p.62, Consolidated Statements of Operations and Comprehensive Loss. ${sec}`),
        l(`2025 / 2024 年 12 月 31 日：现金及等价物 67,413 / 45,542；短期投资 141,172 / 126,480；流动受限现金 1,467 / 722，非流动受限现金 1,100 / 1,835；资产总额 349,516 / 276,148，负债总额 87,778 / 95,237，股东权益 261,738 / 180,911。单位千美元。不同于已有 2026Q2 口径。来源：第 61 页 Consolidated Balance Sheets。${sec}`,
          `At December 31, 2025 / 2024: cash and equivalents 67,413 / 45,542; short-term investments 141,172 / 126,480; current restricted cash 1,467 / 722 and non-current restricted cash 1,100 / 1,835; total assets 349,516 / 276,148, total liabilities 87,778 / 95,237, equity 261,738 / 180,911. USD thousands; distinct from the existing Q2-2026 basis. Source: printed p.61, Consolidated Balance Sheets. ${sec}`),
        l(`FY2025 / FY2024：经营活动现金净流出 (39,956) / (33,694)，投资活动净现金 (36,251) / 14,652，融资活动净现金 97,610 / 15,393；期末现金、现金等价物及受限现金 69,980 / 48,099。单位千美元；期末现金数不含短期投资。来源：第 64 页 Consolidated Statements of Cash Flows。${sec}`,
          `FY2025 / FY2024: net operating cash (39,956) / (33,694), net investing cash (36,251) / 14,652, net financing cash 97,610 / 15,393; ending cash, equivalents and restricted cash 69,980 / 48,099. USD thousands; ending cash excludes short-term investments. Source: printed p.64, Consolidated Statements of Cash Flows. ${sec}`),
        l(`FY2025 / FY2024：ATM 股权变动表列发行 4,671,406 / 6,045,428 股，扣佣金费用及发行成本后权益增加 95,158 / 56,216 千美元。现金流表列扣佣金及费用的 ATM 收款 95,583 / 57,806 千美元，另列发行成本 (421) / (346) 千美元；保留表间口径，不强行相减调平。来源：第 63-64 页。${sec}`,
          `FY2025 / FY2024: the equity statement shows 4,671,406 / 6,045,428 ATM shares and equity increases of 95,158 / 56,216 USD thousands after commissions, fees and issuance costs. The cash-flow statement reports ATM receipts net of commissions and fees of 95,583 / 57,806, with issuance costs separately (421) / (346) USD thousands. Distinct statement bases are retained without forced reconciliation. Source: printed pp.63-64. ${sec}`),
        l(`Note 5 Debt，第 78 页：2024-08-12 用自有现金清偿 UBS 协议全部欠款并终止承诺，所列循环贷款本金为 44.0 百万美元，另加应计未付利息；这不是新增融资。${sec}`,
          `Note 5 Debt, printed p.78: on 2024-08-12 all UBS indebtedness was repaid with cash on hand and commitments terminated; the disclosed revolving-loan principal was USD 44.0 million plus accrued unpaid interest, not new funding. ${sec}`),
        l(`Note 6 Warrants，第 78-79 页：截至 2025-12-31，Amazon 权证可发行 3,271,970 股，行权价 50.57 美元/股，已归属 2,728,985 股；归属与最高 100.0 百万美元商品服务采购付款挂钩，不等于已收投资或采购承诺。FY2025 / FY2024 归属 568,680 / 226,691 股，正文列非现金收入扣减 2.6 / 0.9 百万美元，报表精确值另列 2,623 / 892 千美元。${sec}`,
          `Note 6 Warrants, printed pp.78-79: at 2025-12-31 the Amazon Warrant covered 3,271,970 issuable shares at USD 50.57 per share, with 2,728,985 vested. Vesting is linked to up to USD 100.0 million of goods/services payments, not received investment or a purchase commitment. FY2025 / FY2024 vested shares: 568,680 / 226,691; narrative non-cash revenue reduction USD 2.6 / 0.9 million, with statement precision separately 2,623 / 892 USD thousands. ${sec}`),
        l(`Note 9 Common Stock，第 84 页：2025-05-12 与 Oppenheimer 签 ATM 协议，上限 100.0 百万美元；2025 年售出 4,671,406 股，均价 20.88 美元/股，正文总额约 97.5、净额约 95.6 百万美元，剩余额度约 2.5 百万美元。Note 1 第 65 页将总额/净额的 95.6 与 97.5 写法互换；保留此原文冲突，不将任一约数替代审计表精确值。${sec}`,
          `Note 9 Common Stock, printed p.84: the 2025-05-12 Oppenheimer ATM agreement has a USD 100.0 million ceiling; 4,671,406 shares sold in 2025 at a USD 20.88 weighted-average price; narrative gross approximately USD 97.5 million, net approximately USD 95.6 million, remaining capacity approximately USD 2.5 million. Note 1 on printed p.65 reverses the 95.6/97.5 gross/net wording. This source conflict is retained; neither rounded narrative replaces precise statement values. ${sec}`),
        l(`Note 16 Subsequent Event，第 95 页：2026-02-04 收购 Stereolabs 全部股本，现金 35.4 百万美元及新发行 1,847,677 股（交割日估值 35.4 百万美元）。其中 660,005 股四年分批锁定，每周年释放 25%，以关键员工仍在职为条件；自交割日起合并，不计为 FY2025 收入。提交年报时购买价分摊尚未完成；此处不合并产品身份。${sec}`,
          `Note 16 Subsequent Event, printed p.95: on 2026-02-04 Ouster acquired all Stereolabs share capital for USD 35.4 million cash plus 1,847,677 newly issued shares valued at USD 35.4 million at closing. Of these, 660,005 shares have staggered four-year lock-ups releasing 25% on each anniversary subject to continued key-employee employment. Consolidation begins at closing, not FY2025 revenue; purchase-price allocation was unfinished at filing. Product identities are not merged here. ${sec}`),
      ],
      timeline: [
        { date: '2024-08-12', kind: 'business', title: l('清偿并终止 UBS 信贷协议', 'UBS credit agreement repaid and terminated'),
          detail: l('FY2025 10-K（2026-03-02）Note 5，第 78 页：44.0 百万美元循环贷款本金另加应计未付利息，以自有现金清偿；不是新增融资。', 'FY2025 10-K filed 2026-03-02, Note 5, printed p.78: USD 44.0 million revolving-loan principal plus accrued unpaid interest repaid with cash on hand; not new financing.'), sourceUrl: sec },
        { date: '2025-05-12', kind: 'funding', title: l('签署有上限的 ATM 股权发行协议', 'Capped ATM equity issuance agreement signed'),
          detail: l('FY2025 10-K Note 9，第 84 页：与 Oppenheimer 协议上限 100.0 百万美元；额度不是交割到账额。年度股数、报表值和 Note 1/9 约数冲突分别保留于投资视图。', 'FY2025 10-K, Note 9, printed p.84: Oppenheimer agreement ceiling USD 100.0 million; capacity is not proceeds received. Annual shares, statement values and the Note 1/9 rounded-amount conflict are retained separately in the investment view.'), sourceUrl: sec },
        { date: '2026-02-04', kind: 'business', title: l('收购 Stereolabs 的期后事项', 'Stereolabs acquisition subsequent event'),
          detail: l('FY2025 10-K Note 16，第 95 页：100% 股本，现金 35.4 百万美元加 1,847,677 股（交割日值 35.4 百万美元）；660,005 股按四年及继续任职条件解锁。自交割日起合并，购买价分摊在本年报时未完成。', 'FY2025 10-K, Note 16, printed p.95: 100% of share capital for USD 35.4 million cash plus 1,847,677 shares valued at USD 35.4 million at closing; 660,005 shares subject to four-year continued-employment lock-ups. Consolidation starts at closing; allocation unfinished at this filing.'), sourceUrl: sec },
        { date: '2026-03-02', kind: 'business', title: l('提交 FY2025 经审计年度报表', 'Audited FY2025 annual statements filed'),
          detail: l('FY2025/2024 合并 U.S. GAAP 财务报表，PwC 财务审计；不将其替代已有 2026Q2 披露，也不声称内控审计或机器人分部收入。', 'Consolidated U.S. GAAP FY2025/2024 statements audited by PwC; separate from existing Q2-2026 disclosures and not an ICFR audit or robotics-segment revenue.'), sourceUrl: sec },
      ],
    },
  },
  products: [], reviews: [],
};
