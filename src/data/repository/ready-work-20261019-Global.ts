import type { FinderExpansionRecord, FinderParameter } from './product-finder-demo';
import type { Locale } from '../site';
import type { CatalogEnrichmentGroup, CatalogEnrichmentProduct } from './catalog-enrichment-types';
import { normalizeFinderParameter } from './parameter-index';

type L = { zh: string; en: string };
type Row = CatalogEnrichmentProduct['rows'][number];
const l = (zh: string, en: string): L => ({ zh, en });
const palUrl = (base: boolean) => `https://docs.pal-robotics.com/tiago-${base ? 'base' : 'single'}/handbook.html`;
const kukaUrl = 'https://www.kuka.com/-/media/0993c763460846859aff78300f15570f.pdf';
const kassowUrl = 'https://www.kassowrobots.com/products/edge-edition';
const menteeUrl = 'https://www.sec.gov/Archives/edgar/data/1910139/000110465926086264/mbly-20260627x10q.htm';
const diligentUrl = 'https://www.sec.gov/Archives/edgar/data/1832483/000183248326000035/serv-20260630.htm';
const diligentAnnualUrl = 'https://www.sec.gov/Archives/edgar/data/1832483/000121390026043149/ea028305301ex99-1.htm';
const diligentAgreementUrl = 'https://www.sec.gov/Archives/edgar/data/1832483/000121390026005920/ea0273454-8k_serve.htm';

const row = (url: string, locator: string, label: L, value: L, conditions: L, numeric = false): Row => ({
  label, value, sourceUrl: url,
  sourceLabel: l('官方来源，固定快照见 Global 交接凭证', 'Official source; pinned snapshot in Global receipt'),
  locator: l(locator, locator), conditions, excludeFromNumericIndex: !numeric,
});
const palCondition = l(
  '2026-10-18 留存的旧版官方手册；发行日期未明。仅此章节的软件环境，不外推当前订单、Pro、OMNI 或 Base AI；不是实际运行验证。',
  'Legacy official handbook cached 2026-10-18; issue date unspecified. Chapter-specific software context only, not current orders, Pro, OMNI or Base AI; not runtime verification.',
);
const kukaCondition = l(
  '官方产品组合 PDF 固定快照 fcac9e25；仅本页具名配置。性能及合规均为厂商陈述；不生成载荷/臂展或柜体组合型号。',
  'Official portfolio PDF pinned as fcac9e25; named page configuration only. Performance/compliance are manufacturer statements; no synthesized payload/reach or cabinet variants.',
);
const kassowCondition = l(
  'Edge Edition 官方页面固定快照 b9cca5f6；五款 Edge 共用的软件/运行条件，不替代安全评估，不外推其他系列。',
  'Edge Edition official page pinned as b9cca5f6; shared software/operating conditions for the five Edge models, not a substitute for risk assessment or applicable to other series.',
);
const p = (base: boolean, anchor: string, label: L, value: L) => {
  const aliases: Record<string, string> = {
    dns: 'internal-dns', 'time-synchronization': base ? 'section-ntp' : 'ntp',
    'software-upgrade': base ? 'system-upgrade-base' : 'system-upgrade',
    'hardware-requirements': 'computer-requirements', 'environment-variables': 'setting-ros-environment',
    'development-environment': 'compiling-software', 'deploying-software': 'deploying-software-on-the-robot',
    'modifying-the-startup': 'modifying-robot-startup', 'recovering-the-robot': 'development-computer-installation',
    'the-startup-tab': base ? 'startup-tab' : 'the-startup-tab',
  };
  return row(palUrl(base), `#${aliases[anchor] ?? anchor}`, label, value, palCondition);
};
const k = (page: number, section: string, label: L, value: L, numeric = false) => row(kukaUrl, `PDF ${page}; ${section}`, label, value, kukaCondition, numeric);
const edge = (section: string, label: L, value: L) => row(kassowUrl, section, label, value, kassowCondition);

function palRows(base: boolean): Row[] {
  const rows = [
    p(base, 'file-system', l('手册根文件系统持久性', 'Handbook root filesystem persistence'), l('根文件系统为 /ro 只读底层与 RAM 写层的 union；/home 和 /var/log 持久保存。', 'Union root with read-only /ro and RAM writes; /home and /var/log persist.')),
    p(base, 'dns', l('手册内部 DNS 持久性', 'Handbook internal DNS persistence'), l('内部网络 reem-lan；addLocalDns / delLocalDns 的修改重启后不保留。', 'Internal reem-lan network; addLocalDns / delLocalDns changes do not survive reboot.')),
    p(base, 'time-synchronization', l('手册时钟同步约束', 'Handbook time synchronization constraint'), l('ROS master 启动前执行 NTP 同步；超时后停止守护进程以避免运行中大幅时间跳变。', 'NTP synchronization precedes ROS master; after timeout the daemon stops to avoid large runtime time jumps.')),
    p(base, 'software-upgrade', l('手册软件更新工具', 'Handbook software update tool'), l('pal_upgrade；固件包 pal-ferrum-firmware-*。须核对所装版本，不在此执行更新。', 'pal_upgrade; firmware packages pal-ferrum-firmware-*. Installed-version checks required; no update executed here.')),
    p(base, 'hardware-requirements', l('手册开发电脑建议', 'Handbook development PC recommendation'), l('开发电脑建议 8 核 CPU、至少 1920 x 1080 显示；不是机器人内置计算规格。', 'Development PC: recommended 8 CPU cores and at least 1920 x 1080 display; not onboard robot specifications.')),
    p(base, 'computer-requirements', l('手册开发显卡支持边界', 'Handbook development graphics-support boundary'), l('开发 ISO 支持 NVIDIA 显卡；升级开发电脑内核后不保证其他显卡支持。', 'Development ISO supports NVIDIA cards; support for other graphics cards after development-PC kernel upgrades is not guaranteed.')),
    p(base, 'environment-variables', l('手册开发环境预设', 'Handbook development environment presets'), l('该开发章节列 PAL gallium / ROS noetic；另列 ROS 2 的 alum / humble 环境预设；不等于同一机器人同时装有全部版本。', 'Development chapter lists PAL gallium / ROS noetic and alternative ROS 2 alum / humble environment presets; not all versions installed simultaneously on one robot.')),
    p(base, 'ros-communication-with-the-robot', l('手册 ROS 网络前提', 'Handbook ROS networking prerequisites'), l(`ROS_MASTER_URI 使用 ${base ? 'pmb2-1c' : 'tiago-0c'} 的 ROS master；双方主机名须可解析，或正确配置 ROS_IP。`, `ROS_MASTER_URI uses the ${base ? 'pmb2-1c' : 'tiago-0c'} ROS master; mutual hostname resolution or correct ROS_IP configuration is required.`)),
    p(base, 'development-environment', l('手册 API 开放边界', 'Handbook API availability boundary'), l('开发环境含 ROS 消息及开放的系统/C++ 头文件；部分高级专有 API 头文件不随附，需 NDA。', 'Development environment includes ROS messages and open system/C++ headers; some advanced proprietary API headers are excluded and require an NDA.')),
    p(base, 'the-startup-tab', l('WebCommander 启动依赖监控', 'WebCommander startup dependency monitoring'), base ? l('显示应用/应用组启动状态及依赖满足情况；绿色已启动、黄色等待依赖、红色依赖等待超时。', 'Shows application/group startup state and dependencies: green launched, yellow waiting for dependencies, red dependency timeout.') : l('显示应用/应用组启动状态及依赖满足情况；可选 Startup Extras 用于非默认启动功能。', 'Shows application/group startup state and dependencies; optional Startup Extras exposes features not started by default.')),
    p(base, 'diagnostics-tab', l('WebCommander 诊断树', 'WebCommander diagnostic tree'), l('以树状层次显示硬件及软件功能状态。', 'Hierarchical hardware and software-function status.')),
    p(base, 'logs-tab', l('WebCommander 日志范围', 'WebCommander log scope'), l('实时 Fatal/Error/Warn/Info/Debug 日志；不能显示打开此标签之前的消息。', 'Live Fatal/Error/Warn/Info/Debug messages; messages preceding tab opening cannot be displayed.')),
    p(base, 'tab-configuration', l('WebCommander 扩展配置', 'WebCommander extension configuration'), l('ROS 参数 /wt；启动时载入 /home/pal/.pal/wt/ 的 YAML 配置。', 'ROS parameter /wt; YAML configuration loaded from /home/pal/.pal/wt/ at startup.')),
    p(base, 'technical-considerations', l('Web UI 客户端限制', 'Web UI client restriction'), l('Web User Interface 仅支持电脑上的 Chrome；手机、平板或其他浏览器可能缺失功能。与 WebCommander 的浏览器说明分开。', 'Web User Interface supports Chrome on a laptop/computer only; phones, tablets or other browsers may lose functions. Separate from the WebCommander browser statement.')),
    p(base, 'blocks', l('Web UI 可视化程序块', 'Web UI visual program blocks'), l('动作、条件、控制与装饰器块；可用块随机器人型号变化。', 'Action, conditional, control and decorator blocks; availability depends on robot model.')),
    p(base, 'deploying-software', l('手册部署工具和安装规则', 'Handbook deployment tool and install rules'), l('deploy.py 部署已构建 catkin 包；依赖 CMake install 规则，不是直接复制源码。', 'deploy.py deploys built catkin packages using CMake install rules, not arbitrary source copying.')),
    p(base, 'deploying-software', l('手册工作空间覆盖顺序', 'Handbook workspace overlay precedence'), l('/home/pal/deployed_ws 优先于 /opt/pal/${PAL_DISTRO}；原发行包不被改写。', '/home/pal/deployed_ws precedes /opt/pal/${PAL_DISTRO}; original distribution packages remain untouched.')),
    p(base, 'deploying-software', l('手册覆盖包兼容性限制', 'Handbook overlay compatibility constraint'), l('ABI/API 变化可能影响依赖包；须配套构建依赖；工具不提供单包卸载。', 'ABI/API changes may break dependants; dependent builds must remain compatible; no individual-package removal tool.')),
    p(base, 'navigation-issues', l('手册导航诊断前提', 'Handbook navigation diagnostic prerequisites'), l('摇杆优先级、充电器连接/停靠暂停会阻止导航；需 move_base 运行及正确 ROS_MASTER_URI / ROS_IP。', 'Joystick priority and charger/docking pause can inhibit navigation; move_base and correct ROS_MASTER_URI / ROS_IP are required.')),
    p(base, 'network-issues', l('手册网络配置持久保存条件', 'Handbook network configuration persistence'), l('Apply change 后还需 Save 与 Confirm；否则重启后回退。', 'Save and Confirm are required after Apply change; otherwise changes revert on reboot.')),
    p(base, 'gazebo-issues', l('手册集成显卡仿真限制', 'Handbook integrated-GPU simulation limitation'), l('非独立显卡的激光仿真问题使用 LIBGL_ALWAYS_SOFTWARE=1；仅为 Gazebo 故障排查条件。', 'LIBGL_ALWAYS_SOFTWARE=1 is documented for laser-simulation issues on non-dedicated GPUs; Gazebo troubleshooting context only.')),
  ];
  if (base) rows.push(
    p(true, 'scheduled-tasks-tab', l('Base Web UI 任务安排', 'Base Web UI task scheduling'), l('可查看、创建和管理定时任务；Execute Task 支持即时任务。', 'Inspect/create/manage scheduled tasks; Execute Task supports immediate tasks.')),
    p(true, 'development-computer-installation', l('Base 恢复介质与数据边界', 'Base recovery media and data boundary'), l('随附 Software USB 为自包含离线安装；Install Development (Advanced) 可选目标分区，普通 Install Development 会删除全部分区。', 'Supplied Software USB provides self-contained offline installation; Install Development (Advanced) selects a target partition; ordinary Install Development deletes all partitions.')),
    p(true, 'user-panel', l('Base 主电源与急停边界', 'Base main-power versus emergency-stop boundary'), l('用户面板电源开关/钥匙锁立即切断电源；不是急停。电脑 On/Off 用于正常电源管理。', 'User-panel switch/key lock cuts power immediately; it is not an emergency stop. Computer On/Off provides normal power management.')),
    p(true, 'modifying-the-startup', l('Base 启动应用配置', 'Base startup application configuration'), l('YAML 定义依赖；超时默认 10 s，auto_start 默认 True；自定义目录 /home/pal/.pal/pal_startup/。', 'YAML defines dependencies; default timeout 10 s and auto_start True; custom directory /home/pal/.pal/pal_startup/.')),
    p(true, 'modifying-the-startup', l('Base 启动服务 API', 'Base startup service API'), l('/pal_startup_{startup_id}/start、stop、get_log、get_log_file；按启动组管理应用与日志。', '/pal_startup_{startup_id}/start, stop, get_log, get_log_file manage applications and logs per startup group.')),
    p(true, 'navigation-ros-api', l('Base 导航 ROS 接口', 'Base navigation ROS interfaces'), l('/move_base_simple/goal 发送无需状态监控的目标；/move_base 动作提供执行状态；/current_zone_of_interest 需 Advanced Navigation 包。', '/move_base_simple/goal sends goals without status monitoring; /move_base action exposes execution status; /current_zone_of_interest requires Advanced Navigation.')),
    p(true, 'mapping', l('Base 地图表示', 'Base mapping representation'), l('二维激光扫描生成 Occupancy Grid Map，供后续定位/自主导航使用。', '2D laser readings generate an Occupancy Grid Map for later localization/autonomous navigation.')),
  );
  else rows.push(
    p(false, 'upperbody-movements-issues', l('Single 动作控制与规划诊断边界', 'Single motion-control and planning diagnostic boundary'), l('预置动作依赖 play_motion；关节不能同时被其他节点控制。skip_planning 为 true 时首个路点不进行规划，可能发生自碰撞。', 'Predefined motions require play_motion; joints must not be controlled simultaneously by other nodes. With skip_planning true, the first waypoint bypasses planning and self-collision can occur.')),
    p(false, 'motion-builder', l('Single Motion Builder 功能', 'Single Motion Builder functions'), l('创建/编辑/存储动作及关键帧、管理关节组；默认动作不可编辑/删除，可复制后编辑。重力补偿模式为可选包。', 'Create/edit/store motions and keyframes, manage joint groups; default motions cannot be edited/deleted but can be copied. Gravity-compensation mode is optional.')),
    p(false, 'speed-of-the-execution', l('Single 动作编辑器降速边界', 'Single motion-editor speed-reduction boundary'), l('降速仅在编辑器中生效；从主页或其他 Web App 播放时按时间线以 100% 速度执行。', 'Speed reduction applies only in the editor; homepage/other webapp playback runs at 100% according to the timeline.')),
    p(false, 'recovering-the-robot', l('Single 恢复介质与数据边界', 'Single recovery media and data boundary'), l('随附 Software USB 支持离线开发环境；Run Development 可不安装运行，Install Development 会删除磁盘全部分区。', 'Supplied Software USB supports offline development; Run Development can run without installation; Install Development deletes all disk partitions.')),
    p(false, 'software-architecture', l('Single 架构章节的旧版软件栈', 'Single architecture-chapter legacy stack'), l('架构章节另列 Ubuntu/Xenomai、Orocos、ROS melodic、PAL ferrum；与开发章节 gallium/noetic 分开保留，不推定同一发行版。', 'Architecture chapter separately lists Ubuntu/Xenomai, Orocos, ROS melodic and PAL ferrum; retained separately from development gallium/noetic, not treated as one release.')),
    p(false, 'wbc', l('Single 全身控制演示许可条件', 'Single whole-body-control demo prerequisite'), l('WBC 演示要求安装对应 Premium Software Package。', 'WBC demos require the corresponding Premium Software Package.')),
  );
  return rows;
}

const edgeRows: Row[] = [
  edge('Arm can run in automatic mode without Teach Pendant', l('Edge 无示教器自动运行条件', 'Edge pendantless automatic-mode condition'), l('完成编程后可配置为无示教器自动运行；不代表免编程或免安全评估。', 'May be configured for automatic operation without a teach pendant once programmed; not programming-free or exempt from risk assessment.')),
  edge('Software / Intuitive user interface', l('Edge 平板编程界面', 'Edge tablet programming interface'), l('Android 平板、分屏、块式编程及原生 3D 引擎。', 'Android tablet interface with split screen, block-based programming and native 3D engines.')),
  edge('Ecosystem / Modularity', l('Edge Cbun 扩展框架', 'Edge Cbun extension framework'), l('Cbun 能力包接入外围设备；可访问机器人 API，并提供定制开发 SDK/文档。', 'Cbun capability bundles integrate peripherals; robot API access and custom-development SDK/documentation are offered.')),
  edge('Software / REMII', l('Edge REMII 离线编程', 'Edge REMII offline programming'), l('在电脑上模拟机器人模型的完整系统并编程，无需示教器。', 'Emulates the full robot-model system on a computer for programming without a teach pendant.')),
  edge('Software / CBunX Framework', l('Edge CBunX 界面扩展', 'Edge CBunX interface extension'), l('KR Pulse 生态伙伴可构建定制用户界面。', 'KR Pulse ecosystem partners can build customized user interfaces.')),
  edge('Collaboration / Safety is our priority', l('Edge 安全声明的前提', 'Edge safety-claim prerequisite'), l('页面描述过载检测传感器，并明确任何应用之前须开展风险评估；不据此认定所有工况可免防护。', 'Page describes overload-detection sensors and explicitly requires risk assessment first; no blanket safeguarding exemption is inferred.')),
];

const microRows = [
  k(65, 'printed 128-129; KR C5 micro / KSS', l('KSS micro 控制功能边界', 'KSS micro control function scope'), l('控制器集成运动、PLC 与安全控制；本条仅指 KSS 版本。', 'Integrates motion, PLC and safety control; KSS edition only.')),
  k(65, 'printed 128-129; KR C5 micro / KSS', l('KSS micro 适用机器人系列', 'KSS micro supported robot families'), l('本页列 LBR iisy、KR CYBERTECH nano、KR AGILUS、KR DELTA、KR SCARA。', 'Page lists LBR iisy, KR CYBERTECH nano, KR AGILUS, KR DELTA and KR SCARA.')),
  k(65, 'printed 128-129; KR C5 micro / KSS options', l('KSS micro 防护柜选件', 'KSS micro protective-cabinet option'), l('可选 IP54 控制柜；不改变既有裸控制器 IP20 规格。', 'Optional IP54 control cabinet; does not replace the existing bare-controller IP20 rating.')),
];
const smartpadRows = [
  k(67, 'printed 132-133; smartPAD', l('smartPAD 编程与多机选项', 'smartPAD programming and multi-robot option'), l('KSS Inline Forms 与自定义程序模块；RoboTeam 最多同步 6 台机器人，须对应配置。', 'KSS Inline Forms and custom program modules; RoboTeam supports up to 6 synchronized robots with the corresponding configuration.')),
  k(67, 'printed 132-133; smartPAD', l('smartPAD 手动点动接口', 'smartPAD manual jogging interface'), l('6D 鼠标可控制 3 或 6 自由度；8 个独立点动键用于机器人或外部轴。', '6D mouse for 3 or 6 degrees of freedom; 8 separate jogging keys for robot or external axes.')),
];

export const readyGlobalParameterPatches: Readonly<Record<string, { companySlug: string; rows: Row[] }>> = {
  'parallel-global-pal-robotics-tiago': { companySlug: 'pal-robotics', rows: palRows(false) },
  'parallel-global-pal-robotics-tiago-base': { companySlug: 'pal-robotics', rows: palRows(true) },
  ...Object.fromEntries(['kr810', 'kr1018', 'kr1205', 'kr1410', 'kr1805'].map(model => [
    `kassow-robots-parallel-arms-kassow-${model}-edge`, { companySlug: 'kassow-robots', rows: edgeRows },
  ])),
  'kuka-parallel-arms-kr-c5-micro-kss': { companySlug: 'kuka', rows: microRows },
  'kuka-parallel-arms-smartpad': { companySlug: 'kuka', rows: smartpadRows },
};

const labelKey = (value: string) => value.normalize('NFKC').trim().toLowerCase().replace(/\s+/g, ' ');
export function applyReadyGlobalProduct(record: FinderExpansionRecord, locale: Locale): FinderExpansionRecord {
  const patch = readyGlobalParameterPatches[record.id];
  if (!patch || record.profile.slug !== patch.companySlug) return record;
  const present = new Set(record.parameters.flatMap(p => [p.label, ...(p.labelAliases ?? [])]).map(labelKey));
  const appended: FinderParameter[] = [];
  for (const spec of patch.rows) {
    const aliases = [spec.label.zh, spec.label.en];
    // A conflicting existing label is retained, never overwritten or duplicated.
    if (aliases.some(label => present.has(labelKey(label)))) continue;
    const canonical: FinderParameter = {
      label: spec.label.en, labelAliases: aliases, value: spec.value.en, status: 'manufacturer',
      sourceUrl: spec.sourceUrl, sourceLabel: spec.sourceLabel.en,
      sourceLocator: spec.locator.en, conditions: spec.conditions?.en,
    };
    const normalized = spec.excludeFromNumericIndex ? [] : normalizeFinderParameter(canonical);
    appended.push({ ...canonical, label: spec.label[locale], value: spec.value[locale],
      sourceLabel: spec.sourceLabel[locale], sourceLocator: spec.locator[locale],
      conditions: spec.conditions?.[locale], normalized });
    aliases.forEach(label => present.add(labelKey(label)));
  }
  return appended.length ? { ...record, parameters: [...record.parameters, ...appended] } : record;
}

const materialUrl = (rows: Row[]) => `${kukaUrl}#page=${/^PDF (\d+);/.exec(rows[0].locator.en)![1]}`;
const product = (id: string, name: string, rows: Row[], software = false, mobile = false): CatalogEnrichmentProduct => ({
  id: `ready-global-kuka-${id}`, companySlug: 'kuka', product: name, pageUrl: materialUrl(rows),
  category: mobile ? 'robot-platform' : 'model-software',
  primary: software ? 'software-tools' : mobile ? 'robot-platform' : 'control-compute',
  subclass: software ? 'application-software' : mobile ? 'mobile-robot' : 'robot-controller',
  useCases: ['integration'], type: software ? l('机器人应用软件系列', 'Robot application-software family') : mobile ? l('移动操作平台', 'Mobile manipulation platform') : l('具名控制器版本', 'Named controller edition'),
  integration: l('仅限所列配置与条件；接口和选件以该页为准。', 'Listed configuration and conditions only; interfaces/options are page-specific.'),
  verification: kukaCondition, rows, overview: [l(`${name}：按官方固定快照中的具名产品和实际字段建档。`, `${name}: named official portfolio product with source-disclosed fields.`)],
  applications: [software ? l('机器人应用集成', 'Robot application integration') : l('机器人系统集成', 'Robot system integration')],
  coverage: 'official-partial', level: software ? 'family' : mobile ? 'platform' : 'family', specificationKind: software ? 'capabilities' : 'parameters',
  sourceLinks: [{ label: l('KUKA 官方 PDF 对应产品页', 'KUKA official PDF product page'), url: materialUrl(rows) }],
});

export const readyGlobalNewProducts: CatalogEnrichmentProduct[] = [
  product('kmr-iisy-2', 'KMR iisy-2', [
    k(58, 'printed 114-115; KMR iisy-2; manipulator', l('机械臂额定载荷选项', 'Manipulator payload options'), l('11 kg 或 15 kg；不是移动底盘载荷，不生成臂展组合。', '11 kg or 15 kg; not mobile-platform payload; no reach combinations synthesized.')),
    k(58, 'printed 114-115; platform', l('平台承载能力上限', 'Platform maximum load capacity'), l('最高 200 kg；仅指平台。', 'Up to 200 kg; platform only.'), true),
    k(58, 'printed 114-115; platform footprint', l('平台占地尺寸', 'Platform footprint dimensions'), l('695 x 1120 mm', '695 x 1120 mm'), true),
    k(58, 'printed 114-115; platform speed', l('平台最高速度', 'Platform maximum speed'), l('1.5 m/s', '1.5 m/s'), true),
    k(58, 'printed 114-115; protection', l('防护等级', 'Protection rating'), l('IP54', 'IP54')),
    k(58, 'printed 114-115; navigation', l('移动导航与障碍检测', 'Mobile navigation and obstacle detection'), l('差速驱动、自由 SLAM 导航；二维码可提高工位定位精度；安全扫描器和 3D 相机可检测离地最高 2 m 的障碍物，不是激光量程。', 'Differential drive and free SLAM navigation; QR codes can improve station positioning; safety scanners and 3D cameras detect obstacles up to 2 m above ground, not a lidar range.')),
    k(58, 'printed 114-115; operation and charging', l('平台操作与充电方式', 'Platform operation and charging'), l('集成 smartPAD pro，或通过 smartPLUG 接入客户设备；在充电站或工作过程中充电。24/7 表述不等于单次续航。', 'Integrated smartPAD pro or customer device through smartPLUG; charging at a station or during work processes. The 24/7 claim is not single-charge runtime.')),
  ], false, true),
  product('kr-c5-kss', 'KR C5 / KSS', [
    k(64, 'printed 126-127; technical data / OS', l('控制系统', 'Control system'), l('KSS', 'KSS')),
    k(64, 'printed 126-127; infeed', l('三相电源配置', 'Three-phase supply configurations'), l('无变压器 380-480 VAC；带变压器 380-575 VAC；不能视作同一配置。', '380-480 VAC without transformer; 380-575 VAC with transformer; distinct configurations.')),
    k(64, 'printed 126-127; axes', l('机器人与外部轴能力', 'Robot and external-axis capacity'), l('6 个机器人轴，最多另加 6 个外部轴。', '6 robot axes plus up to 6 additional external axes.')),
    k(64, 'printed 126-127; CPU and storage', l('计算与存储', 'Compute and storage'), l('Intel x86 主控 + ARM 安全控制；60 GB M.2 SSD。', 'Intel x86 main control + ARM safety control; 60 GB M.2 SSD.')),
    k(64, 'printed 126-127; dimensions H x W x D', l('KSS 控制柜外形尺寸', 'KSS cabinet dimensions'), l('高 x 宽 x 深：dualcab 720 x 720 x 600 mm；triplecab 960 x 720 x 600 mm；quadcab 1210 x 720 x 600 mm；控制器本体 207 x 392 x 500 mm。', 'H x W x D: dualcab 720 x 720 x 600 mm; triplecab 960 x 720 x 600 mm; quadcab 1210 x 720 x 600 mm; controller 207 x 392 x 500 mm.')),
    k(64, 'printed 126-127; weight and protection', l('KSS 柜体质量与防护', 'KSS cabinet mass and protection'), l('dualcab 约 83 kg，triplecab 约 107 kg，quadcab 约 131 kg；控制器约 22 kg。柜体 IP54；控制器 IP20。', 'dualcab approx. 83 kg, triplecab approx. 107 kg, quadcab approx. 131 kg; controller approx. 22 kg. Cabinet IP54; controller IP20.')),
    k(64, 'printed 126-127; ambient temperature', l('环境温度', 'Ambient temperature'), l('0-45 deg C', '0-45 deg C')),
    k(64, 'printed 126-127; networks', l('工业通信', 'Industrial communications'), l('PROFINET/PROFIsafe、EtherNet/IP/CIP Safety；扩展可含 EtherCAT slave/FSoE、PROFIBUS、DeviceNet；集成以太网交换机。', 'PROFINET/PROFIsafe, EtherNet/IP/CIP Safety; expansion can include EtherCAT slave/FSoE, PROFIBUS and DeviceNet; integrated Ethernet switch.')),
    k(64, 'printed 126-127; safety', l('KSS 安全等级声明', 'KSS safety-rating statement'), l('厂商列 ISO 10218-1、ISO 13849-1 Category 3 PL d。', 'Manufacturer lists ISO 10218-1 and ISO 13849-1 Category 3 PL d.')),
  ]),
  product('kr-c5-iiqka-os2', 'KR C5 / iiQKA.OS2', [
    k(66, 'printed 130; KR C5 / iiQKA.OS2', l('OS2 控制柜结构', 'OS2 cabinet architecture'), l('模块化可堆叠柜体；独立 US1/US2 外围设备电源；以太网和数字 I/O。', 'Modular stackable cabinet; separate US1/US2 peripheral supplies; Ethernet and digital I/O.')),
    k(66, 'printed 130; KR C5 / iiQKA.OS2', l('OS2 标准适用声明', 'OS2 standards applicability claim'), l('本页正文写 ISO 10218-1:2024，图标写 ISO 10218:2024-compliant，另列 MASCHVO-safe 和 IEC 62443-compliant；不据此替代认证证书核对。', 'Body states ISO 10218-1:2024; icon states ISO 10218:2024-compliant, alongside MASCHVO-safe and IEC 62443-compliant; not a substitute for checking certificates.')),
  ]),
  product('kr-c5-slim-iiqka-os2', 'KR C5 slim / iiQKA.OS2', [
    k(66, 'printed 130; KR C5 slim', l('slim 适用系列', 'slim supported robot families'), l('面向 KR CYBERTECH 与 KR CYBERTECH nano。', 'For KR CYBERTECH and KR CYBERTECH nano.')),
    k(66, 'printed 130; KR C5 slim', l('slim 柜体防护', 'slim cabinet protection'), l('IP54', 'IP54')),
    k(66, 'printed 130; KR C5 slim options', l('slim 选件与标准就绪状态', 'slim options and standards readiness'), l('可选变压器和 NVIDIA AI 模块；ISO 10218:2025 为就绪声明，不视为已取得认证。', 'Optional transformer and NVIDIA AI modules; ISO 10218:2025 is a readiness statement, not certification.')),
  ]),
  product('kr-c5-micro-iiqka-os2', 'KR C5 micro / iiQKA.OS2', [
    k(66, 'printed 131; KR C5 micro / iiQKA.OS2', l('OS2 micro 外形尺寸', 'OS2 micro dimensions'), l('449 x 300 x 89 mm；不混用 KSS 版尺寸。', '449 x 300 x 89 mm; not the KSS-edition dimensions.'), true),
    k(66, 'printed 131; interfaces', l('OS2 micro 通信接口', 'OS2 micro communications'), l('KSI、KONI、KLI、KEI；本页另列集成 16 digital IN/OUT，未据此推断为各 16 路。', 'KSI, KONI, KLI, KEI; page separately lists integrated 16 digital IN/OUT, not interpreted as 16 each.')),
    k(66, 'printed 131; physical I/O', l('OS2 micro 物理 I/O', 'OS2 micro physical I/O'), l('12 路输入 / 8 路输出。', '12 inputs / 8 outputs.')),
    k(66, 'printed 131; stack and options', l('OS2 micro 扩展条件', 'OS2 micro expansion conditions'), l('最多堆叠 3 台；可选 NVIDIA 扩展与 OPSU 24 V 电源；EADB 双通道软件激活支持 1-2 个附加轴、最高 12 A。', 'Up to 3 stacked units; optional NVIDIA expansion and OPSU 24 V supply; software-activated dual-channel EADB supports 1-2 additional axes up to 12 A.')),
  ]),
  product('iiqka-arctech', 'iiQKA.ArcTech', [
    k(75, 'printed 148; iiQKA.ArcTech', l('弧焊应用功能', 'Arc-welding application functions'), l('弧焊命令、菜单及状态键；可配置电源库、在线焊接参数修改；iiQWorks.Sim 日志功能。', 'Arc-welding commands, menus and status keys; configurable power-source libraries, online weld-parameter changes and iiQWorks.Sim logbook functions.')),
  ], true),
  product('iiqka-seamtech', 'iiQKA.SeamTech Finding / Tracking', [
    k(75, 'printed 149; iiQKA.SeamTech', l('寻缝与跟踪方式', 'Seam finding and tracking modes'), l('Finding 在焊前检测工件/焊缝；Tracking 在焊接时跟踪；三角测量激光传感器通过以太网连接，跟踪使用实时协议。', 'Finding detects components/seams before welding; Tracking follows during welding; triangulation laser sensor over Ethernet, with a real-time protocol for tracking.')),
    k(75, 'printed 149; controller and packages', l('SeamTech 控制器原文与组合', 'SeamTech source controller wording and combinations'), l('本页原文写 KR C5-2，暂不擅改为其他控制器；可与 ArcTech Basic/Advanced、LaserTech、GlueTech 组合。', 'Page literally states KR C5-2; not silently mapped to another controller; combinable with ArcTech Basic/Advanced, LaserTech and GlueTech.')),
  ], true),
  product('iiqka-touchsense', 'iiQKA.TouchSense', [
    k(75, 'printed 149; iiQKA.TouchSense', l('工件比较测量和补偿', 'Component comparison measurement and compensation'), l('接触式/非接触式比较测量；补偿工件位置和形状偏差，最多 6 个维度；不代表数值精度。', 'Tactile/non-contact comparison measurement; component position/shape compensation in up to 6 dimensions; not a numeric accuracy rating.')),
  ], true),
  product('iiqka-tcp-check', 'iiQKA.TCP-Check', [
    k(76, 'printed 150; iiQKA.TCP-Check', l('TCP 检测方式与硬件条件', 'TCP measurement and hardware prerequisites'), l('检测/标定实际 TCP 的 XYZ 坐标；需要叉形光电传感器及线缆，软件与硬件配套。', 'Checks/calibrates actual TCP XYZ coordinates; requires fork photoelectric barrier and cable, with software and hardware used together.')),
  ], true),
  product('iiqka-lasertech', 'iiQKA.LaserTech', [
    k(76, 'printed 151; iiQKA.LaserTech', l('激光工艺集成功能', 'Laser-process integration functions'), l('激光焊接/切割；通过现场总线集成激光控制器、气阀、送丝/送粉与光学器件；功率可随速度并按时间/距离斜坡变化。', 'Laser welding/cutting; fieldbus integration of laser controller, gas valves, wire/powder feed and optics; velocity-dependent power and time/distance-based ramps.')),
  ], true),
  product('iiqka-force-torque-control', 'iiQKA.ForceTorqueControl', [
    k(77, 'printed 152; iiQKA.ForceTorqueControl', l('力矩传感与控制', 'Force/torque sensing and control'), l('使用力矩传感器输入控制规定的力/力矩，含重力补偿；经支持的现场总线接入，以 RSIVisual 配置，可与 ConveyorTech 组合。', 'Uses force/torque sensor input to control defined forces/torques with gravity compensation; supported fieldbus input, RSIVisual configuration, combinable with ConveyorTech.')),
    k(77, 'printed 152; processing statement', l('力矩数据处理时间声明', 'Force/torque data processing-time statement'), l('厂商称数据在 4 ms 内处理；不换算成伺服环频率或保证延迟。', 'Manufacturer states data processing within 4 ms; not converted to servo-loop frequency or guaranteed latency.')),
  ], true),
  product('iiqka-state-control-family', 'iiQKA.StateControl Family', [
    k(77, 'printed 153; StateControl / GripperControl', l('设备状态控制规模', 'Device-state control capacity'), l('最多 32 个可配置设备、每设备最多 16 个信号和 32 个开关状态；GripperControl 每设备最多 3 个状态。', 'Up to 32 configurable devices, 16 signals and 32 switching states per device; GripperControl is limited to 3 states per device.')),
    k(77, 'printed 153; StateControl / GripperControl', l('状态控制子包边界', 'State-control package boundaries'), l('GripperControl 用于少量信号的简单机械/气动夹具；StateControl 面向复杂设备，并集成载荷数据切换。', 'GripperControl targets simple mechanical/pneumatic grippers with few signals; StateControl targets complex devices and integrates load-data switching.')),
  ], true),
  product('iiqka-servogun-family', 'iiQKA.ServoGun Family', [
    k(78, 'printed 154-155; Basic / Advanced', l('焊钳力控制版本与精度声明', 'Welding-gun force-control editions and stated accuracy'), l('Basic 为位置式控制，厂商标称精度 3-7%；Advanced 通过电机/焊钳传感器连续监控，标称 1-3%；不混为同一版本。', 'Basic uses position-based control with stated 3-7% accuracy; Advanced continuously monitors motor/gun sensors with stated 1-3%; distinct editions.')),
    k(78, 'printed 154-155; ExternalControl', l('ExternalControl 驱动条件', 'ExternalControl drive condition'), l('面向带集成伺服驱动的 BOSCH Rexroth 焊接柜；与 Basic/Advanced 不同，不作为附加机器人轴。', 'For BOSCH Rexroth welding cabinets with integrated servo drive; unlike Basic/Advanced, not treated as an additional robot axis.')),
    k(78, 'printed 154-155; options and footnote', l('ServoGun 选件适用边界', 'ServoGun option applicability'), l('EqualizingTech 用于 Basic/Advanced/ExternalControl 的工件偏差补偿；RoboSpin 通过 TCP 旋转辅助接触/修磨；CFS10 推荐用于 Basic/Advanced 标定，不适用 ExternalControl。', 'EqualizingTech compensates workpiece offset for Basic/Advanced/ExternalControl; RoboSpin uses TCP rotation for contact/dressing; CFS10 is recommended for Basic/Advanced calibration, not ExternalControl.')),
  ], true),
];

// No overview replacement or acquisition-as-funding entries; investmentView is collected append-only.
export const readyGlobalProfiles: CatalogEnrichmentGroup = {
  profiles: {
    'mentee-robotics': {
      investmentView: [
        l(`Mobileye 截至 2026-06-27 的未审计 10-Q，Note 13 pp.26-28：Mentee 收购对价（USD million）为现金 607（股份 583、已归属/加速期权的收购前服务部分 24）、非服务条件股份公允价值 23、承接期权收购前服务部分 7，合计 637。与原合同 900 的口径不同，不能相加或记作融资。来源：${menteeUrl}`, `Mobileye unaudited 10-Q, quarter ended 2026-06-27, Note 13 pp.26-28: Mentee purchase consideration (USD million) is cash 607 (shares 583; pre-combination vested/accelerated options 24), non-service-contingent stock 23 and pre-acquisition assumed options 7, total 637. Different from contractual 900; neither additive nor a funding round. Source: ${menteeUrl}`),
        l(`同注 pp.26-27：服务条件股份公允价值 207 按 2/4 年费用化；替换 RSU 的收购后服务部分 10 最长按 4 年费用化；加速期权收购后部分 4 即时费用化，均不计入上述 637。初步分配（USD million）：现金 16、其他流动资产 1、设备净额 1、无形资产 128、商誉 498、递延所得税资产 2、其他长期资产 1，总资产 647；应付及应计不足 1、员工应计 1、其他流动负债 1、递延税负债 8，总负债 10，净额 637。IP 摊销 9 年；最终分配仍可调整。来源：${menteeUrl}`, `Same note pp.26-27: service-contingent stock 207 is expensed over 2/4 years, post-combination replacement RSUs 10 over up to 4 years and accelerated-option post-combination portion 4 immediately, outside 637. Preliminary allocation (USD million): cash 16, other current assets 1, net equipment 1, intangibles 128, goodwill 498, deferred tax assets 2, other long-term assets 1; assets 647. Payables/accruals below 1, employee accruals 1, other current liabilities 1, deferred tax liabilities 8; liabilities 10, net 637. IP life 9 years; allocation remains provisional. Source: ${menteeUrl}`),
      ],
    },
    'diligent-robotics': {
      investmentView: [
        l(`Serve 2026-01-19 协议 8-K Item 1.01 列股票对价 USD 29.0 million（含潜在 earnout 5.3），受净债务等调整；这是签约口径，非现金融资。来源：${diligentAgreementUrl}`, `Serve agreement dated 2026-01-19, 8-K Item 1.01: stock consideration USD 29.0 million including potential earnout 5.3, subject to net-debt/other adjustments; signing basis, not cash financing. Source: ${diligentAgreementUrl}`),
        l(`Serve 截至 2026-06-30 的未审计 10-Q Note 4 pp.15-17：Diligent 于 2026-01-27 交割。USD thousand：现金 20,095、197,472 股公允价值 2,522、274,749 股或有 earnout 公允价值 3,090，合计 25,707；另有 91,583 股受员工持续服务条件约束，不计该对价。初步 PPA：已识别资产 22,349、负债 7,090、净额 15,259、商誉 10,448，合计 25,707；交割后 12 个月内可调整，不与协议金额相加。来源：${diligentUrl}`, `Serve unaudited 10-Q, quarter ended 2026-06-30, Note 4 pp.15-17: Diligent closed 2026-01-27. USD thousand: cash 20,095; 197,472 shares fair value 2,522; 274,749 contingent earnout shares fair value 3,090; total 25,707. Another 91,583 shares require employee service and are excluded. Preliminary PPA: identified assets 22,349, liabilities 7,090, net 15,259, goodwill 10,448; total 25,707, adjustable within 12 months of closing, not additive to agreement value. Source: ${diligentUrl}`),
        l(`同份未审计 10-Q Note 4 p.17 初步 PPA 明细（USD thousand）：现金 557、应收 564、预付 388、设备 12,474、无形资产 6,000、资本化软件 2,238、其他资产 128；应付 2,010、应计负债 2,327、递延收入 1,925、递延税负债 740、其他负债 88。无形资产含技术 5,300（6 年）和商号 700（4 年）。p.18 列 2026-01-27 至 2026-06-30 纳入 Serve 的 Diligent 收入 USD 2.9 million、亏损 USD 14.0 million；不是全年或 Moxi 单一产品数据。来源：${diligentUrl}`, `Same unaudited 10-Q, Note 4 p.17, preliminary PPA (USD thousand): cash 557, receivables 564, prepaids 388, equipment 12,474, intangibles 6,000, capitalized software 2,238, other assets 128; payables 2,010, accruals 2,327, deferred revenue 1,925, deferred tax 740, other liabilities 88. Intangibles: technology 5,300 (6 years), trade names 700 (4 years). Page 18 reports Diligent revenue USD 2.9 million and loss USD 14.0 million included in Serve from 2026-01-27 through 2026-06-30, not full-year or Moxi-only figures. Source: ${diligentUrl}`),
        l(`Diligent Robotics, Inc. 2025 年度经审计报表（USD thousand，US GAAP；dbbmckennon 审计报告 2026-04-13；Exhibit 99.1 F-2/F-4 至 F-7）：收入 9,044、收入成本 10,429、毛损 1,385、营业亏损 20,321、净亏损 22,708；年末现金 1,052、资产 13,436、负债 17,471、可赎回优先股 106,205（非负债）、股东权益赤字 110,240。经营/投资现金净流出 20,314/172，融资净流入 17,577；期初现金 3,961，净减少 2,909。F-12/13 服务收入按期间确认，不据此拆出 Moxi 产品收入；不是 Serve 合并收入或未经审计 pro forma。来源：${diligentAnnualUrl}`, `Diligent Robotics, Inc., audited FY2025 (USD thousand, US GAAP; dbbmckennon report 2026-04-13; Exhibit 99.1 F-2/F-4 to F-7): revenue 9,044, cost 10,429, gross loss 1,385, operating loss 20,321, net loss 22,708; year-end cash 1,052, assets 13,436, liabilities 17,471, redeemable preferred stock 106,205 (not liabilities), stockholders' deficit 110,240. Operating/investing cash outflows 20,314/172; financing inflow 17,577; opening cash 3,961, decrease 2,909. F-12/13 recognizes service revenue over time; not Moxi-only, Serve consolidated or unaudited pro forma revenue. Source: ${diligentAnnualUrl}`),
        l(`同份 2025 经审计报表 F-6/F-7（USD thousand）：可赎回优先股账面额由 91,163 至 106,205；Series B-3 本年发行账面额 15,244，现金净募集额 15,041；股权薪酬 635。二者口径不同，不能重复相加或擅标为新的公告融资轮。F-8/9 指持续亏损和经营现金流为负引发的持续经营重大疑虑因 2026-01-27 收购而缓解，并非对未来盈利的保证。来源：${diligentAnnualUrl}`, `Same audited FY2025 statements, F-6/F-7 (USD thousand): redeemable preferred carrying amount 91,163 to 106,205; Series B-3 issuance carrying amount 15,244 versus net cash proceeds 15,041; stock compensation 635. Different bases, not additive or a newly announced funding round. F-8/9 says acquisition on 2026-01-27 alleviated substantial going-concern doubt from continuing losses/negative operating cash flow, not a guarantee of future profitability. Source: ${diligentAnnualUrl}`),
      ],
      timeline: [
        { date: '2026-01-27', title: l('Serve 完成收购 Diligent', 'Serve completes Diligent acquisition'), detail: l('交割日由 Serve Q2 2026 未审计 10-Q Note 4 p.15 明确；不将收购记作融资轮。', 'Closing date explicitly reported in Serve unaudited Q2 2026 10-Q, Note 4 p.15; acquisition, not a funding round.'), sourceUrl: diligentUrl, kind: 'business' },
      ],
    },
  },
  products: [], reviews: [],
};

