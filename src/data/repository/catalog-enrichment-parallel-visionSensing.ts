import raw from './catalog-enrichment-parallel-visionSensing-data.json';
import type { CatalogEnrichmentGroup, CatalogEnrichmentProduct, CatalogCompanyReview } from './catalog-enrichment-types';
import type { Localized, TimelineSeed } from './verified-catalog-wave-fourteen-common';

const l = (zh: string, en: string): Localized => ({ zh, en });
const event = (date: string, kind: TimelineSeed['kind'], url: string, zh: string, en: string): TimelineSeed => ({
  date, kind, sourceUrl: url, title: l(zh, en), detail: l(zh, en),
});
const botaAbout = 'https://shop.botasys.com/about-us';
const botaSeed = 'https://botasys.com/news/bota-systems-announces-242-5-million-in-seed-round/';
const sensoHistory = 'https://www.sensodrive.de/about-us/historie_e.php';
const leptrinoAbout = 'https://www.leptrino.co.jp/company';
const wacohAbout = 'https://wacoh-tech.com/company/outline.html';
const zividAbout = 'https://www.zivid.com/about';
const photoneoAbout = 'https://www.photoneo.com/about-us';
const rsSpinout = 'https://www.realsenseai.com/news-insights/news/realsense-completes-spin-out-from-intel-raises-50-million-to-accelerate-ai-powered-vision-for-robotics-and-biometrics/';
const ousterQ2 = 'https://investors.ouster.com/news-releases/news-release-details/ouster-announces-results-second-quarter-2026';
const orbbecH1 = 'https://static.cninfo.com.cn/finalpage/2026-08-22/1225493290.PDF';

const profiles: CatalogEnrichmentGroup['profiles'] = {
  'bota-systems': {
    aboutUrl: botaAbout, founded: '2020',
    headquarters: l('瑞士苏黎世', 'Zurich, Switzerland'),
    role: l('多轴力/力矩传感器与机器人集成组件供应商', 'Multi-axis force/torque sensors and robot-integration components supplier'),
    overview: [
      l('Bota Systems 于2020年成立，是苏黎世联邦理工学院衍生企业。其官方商店同时承担产品与文档入口，覆盖六轴力/力矩传感器、机器人集成套件和接口、线缆、安装件等配件。', 'Founded in 2020 as an ETH Zurich spin-off, Bota Systems uses its official store as a product and documentation portal for six-axis force/torque sensors, robot integration kits, interfaces, cables and mounting accessories.'),
      l('基础传感器的量程、接口和代际需与套件区分。Gen 0与Gen A套件仍分别出现在目录中；套件对特定机器人提供机械、电气或软件适配，不证明任意传感器量程和协议都可组合订购。', 'Sensor range, interface and generation are distinct from kit identity. Gen 0 and Gen A kits are separately listed. Kits provide robot-specific mechanical, electrical or software adaptation, not evidence that every range/protocol combination is orderable.'),
      l('选型时需同时核对单品规格表和汇总表。本次发现部分力量程、尺寸、质量及噪声数据不一致，保留来源冲突并排除受影响的数值索引。力感知部件本身不等于整机安全认证。', 'Selection requires both individual specifications and the portfolio table. Differences in force range, dimensions, mass and noise are retained as source conflicts and excluded from affected numeric indexes. A force-sensing component is not a complete robot safety certification.'),
    ],
    timeline: [event('2020', 'founding', botaAbout, 'Bota Systems成立，源自ETH Zurich。', 'Bota Systems founded as an ETH Zurich spin-off.'), event('2023-10-03', 'funding', botaSeed, '公告完成250万美元种子轮融资。', 'Announced completion of a USD 2.5 million seed round.')],
    funding: [{ date: '2023-10-03', round: l('种子轮', 'Seed'), amount: 'USD 2.5 million', investors: l('Marathon Venture Capital领投，天使投资人参与。', 'Led by Marathon Venture Capital with angel participation.'), sourceUrl: botaSeed }],
    investmentView: [l('融资公告不披露营收、利润或估值；本次未取得可归属于该主体的完整财务报表。', 'The financing announcement does not disclose revenue, profit or valuation; a complete attributable financial statement was not retrieved in this review.')],
  },
  robotous: {
    aboutUrl: 'https://github.com/ROBOTOUS',
    role: l('机器人力/力矩传感器及通信软件供应商', 'Robot force/torque sensor and communications-software supplier'),
    overview: [
      l('ROBOTOUS的RFT系列面向机器人接触力和力矩测量。保留既有七款硬件规格，当前官网的可读性不足，不将历史数据表当作当前供货或所有型号均在产的证据。', 'ROBOTOUS supplies RFT-series robot contact force/torque sensing. Seven existing hardware specification records are preserved. Limited readability of the current website means historical datasheets are not evidence of current supply or continued production of every model.'),
      l('官方GitHub组织公开UART和EtherCAT的ROS 2接入示例。两者使用不同测试环境与通信路径，不能合并成所有RFT型号均支持的统一接口矩阵。', 'The official GitHub organization provides UART and EtherCAT ROS 2 examples with different tested environments and communications paths. They do not establish a universal interface matrix for every RFT model.'),
      l('集成仍需核对传感器标定、坐标系、数据包、零点和异常恢复。示例仓库可以支撑接口开发，但不代表经过整机控制周期、功能安全或量产可靠性验证。', 'Integration still requires calibration, coordinate frames, packets, zeroing and recovery checks. Example repositories support interface development, not acceptance of complete control timing, functional safety or production reliability.'),
    ],
    investmentView: [l('本次未获得足以核实完整融资史、股权结构或财务数据的原始披露；不以经销商宣传推算经营规模。', 'Primary disclosures sufficient to establish full financing history, ownership or financials were not retrieved; distributor claims are not used to estimate business scale.')],
  },
  sensodrive: {
    aboutUrl: sensoHistory, founded: '2003',
    role: l('扭矩感知关节与定制扭矩传感器供应商', 'Torque-sensing joints and custom torque-sensor supplier'),
    overview: [
      l('SENSODRIVE的技术背景来自DLR研究工作。官方历史把2001年的创业构想与2003年的公司成立分开记录。机器人业务包括SensoJoint完整关节和SensoTorque扭矩传感器。', 'SENSODRIVE originates in DLR research. Its history distinguishes the 2001 venture concept from incorporation in 2003. Its robotics portfolio includes complete SensoJoint joints and SensoTorque transducers.'),
      l('既有23款SensoJoint型号逐列保留。SensoTorque网页给出50多种定制传感器的总体设计范围，而未给出全部订货码；2.5至1000 Nm并非一个型号的连续量程。', 'The 23 existing SensoJoint model columns are preserved. SensoTorque publishes a design envelope across more than 50 custom sensor types, not all order codes; 2.5 to 1000 Nm is not one model’s continuous measurement range.'),
      l('传感器输出、关节驱动和安全功能需分别评估。页面中的功能准确度、带宽与原始采样率有不同定义，过载、极限和破坏扭矩不能替代额定扭矩。安全认证须绑定实际版本和证书范围。', 'Sensing outputs, joint drives and safety functions require separate assessment. Functional accuracy, bandwidth and raw sampling rate have different definitions; maximum, limit and breaking torque do not replace rated torque. Safety certification must match the actual version and certificate scope.'),
    ],
    timeline: [event('2001', 'business', sensoHistory, 'DLR研究人员提出将机器人扭矩感知技术商业化的构想。', 'DLR researchers develop the commercialization concept for robot torque sensing.'), event('2003', 'founding', sensoHistory, '公司成立，开始销售扭矩传感器和转向模拟设备。', 'Company founded, beginning torque-sensor and steering-simulator sales.')],
    investmentView: [l('本次未取得独立融资公告和完整财报；DLR技术渊源不等于当前股权关系。', 'Independent financing announcements and complete financial statements were not retrieved; DLR technical origins do not establish current ownership.')],
  },
  leptrino: {
    aboutUrl: leptrinoAbout, founded: '2001-10',
    role: l('多轴力传感器与测量软件供应商', 'Multi-axis force sensors and measurement-software supplier'),
    overview: [
      l('Leptrino于2001年10月成立，总部位于日本长野县佐久市，并在小诸设有工厂。官网列示资本金1000万日元，这是注册资本口径，不是累计融资或估值。', 'Leptrino was established in October 2001, with headquarters in Saku, Nagano and a Komoro factory. Its stated JPY 10 million capital is registered capital, not cumulative funding or valuation.'),
      l('机器人相关目录包括应变式六轴力传感器、测力台及测量工具。CFS、FFS、PFS和BFS系列按结构、负载与精度需求区分；本次保留39个既有型号，并补充五个官网明确列名的SFS定制示例及LGR101U软件。', 'Its robotics-related catalog includes strain-gauge six-axis sensors, force plates and measurement tools. CFS, FFS, PFS and BFS differ in structure, load and accuracy. This review preserves 39 existing models and adds five explicitly named SFS custom examples and LGR101U software.'),
      l('标准规格与定制选项需分开。官网列出的外置/内置变送器、USB和其他输出选项并非全部型号的默认配置；新FFS型号尚未公开的尺寸和IP67定制条件保持未知。', 'Standard specifications and customization remain separate. Built-in/external transmitters, USB and alternative outputs are not defaults for every model. Unpublished new-FFS dimensions and IP67 customization details remain unknown.'),
    ],
    timeline: [event('2001-10', 'founding', leptrinoAbout, 'Leptrino成立。', 'Leptrino established.'), event('2026-08', 'product', 'https://www.leptrino.co.jp/product/6axis-force-sensor', '六轴产品页标示FFS100、FFS125、FFS160于2026年8月新增；首页公告日期另为9月1日。', 'The six-axis product page dates FFS100/125/160 additions to August 2026; the separate homepage announcement is dated September 1.')],
    investmentView: [l('本次核实资本金信息，未取得公司营收、利润或外部融资轮次的原始披露。', 'Registered capital was verified; primary revenue, profit and external funding-round disclosures were not retrieved.')],
  },
  'wacoh-tech': {
    aboutUrl: wacohAbout, founded: '2007-07',
    role: l('静电容量式力觉传感器与机器人接口供应商', 'Capacitive force sensors and robot-interface supplier'),
    overview: [
      l('WACOH-TECH于2007年7月成立，位于日本富山县高冈市，官网列示资本金6000万日元。其DynPick产品以静电容量式力检测为核心，另提供接口转换和机器人连接部件。', 'WACOH-TECH was founded in July 2007 in Takaoka, Toyama, Japan and lists JPY 60 million capital. DynPick uses capacitive force sensing, supported by interface conversion and robot-connection components.'),
      l('当前日文目录与历史英文页面应分别判断。既有传感器和接口参数保留，本次增加已核实的停售时间线；历史型号不因旧规格页仍存在而被当成现售产品。', 'The current Japanese catalog and historical English pages require separate interpretation. Existing sensor/interface parameters are retained and verified discontinuation events are added; an old specification page does not establish current sale.'),
      l('2025年7月11日公告列明五个停售料号，并要求向销售窗口询问替代品。该公告没有提供可直接替换的料号映射，不据系列名称自行推导替代型号。', 'The July 11, 2025 notice identifies five discontinued part numbers and directs replacement inquiries to sales. It does not provide a drop-in replacement mapping, so replacements are not inferred from family names.'),
    ],
    timeline: [event('2007-07', 'founding', wacohAbout, 'WACOH-TECH成立。', 'WACOH-TECH founded.'), event('2008-10', 'product', wacohAbout, '开始DynPick样品出货。', 'DynPick sample shipments begin.'), event('2009-02', 'business', wacohAbout, '获得三菱UFJ技术育成财团研发助成，金额未在该公司沿革披露。', 'Received an R&D grant from the Mitsubishi UFJ technology-development foundation; this corporate history does not state an amount.'), event('2025-07-11', 'business', 'https://wacoh-tech.com/topics/news/20250711.html', '公告停售ZEF-D-6A200/500-20-RCD-B、ZEF-DR-6A200/500-20-RCD-B及MCF-3A10-0.05-RA5。', 'Discontinuation announced for ZEF-D-6A200/500-20-RCD-B, ZEF-DR-6A200/500-20-RCD-B and MCF-3A10-0.05-RA5.')],
    investmentView: [l('资本金与研发助成不是股权融资总额。完整财务与融资史未完成核实。', 'Registered capital and an R&D grant are not total equity financing. Complete financial and financing histories remain unverified.')],
  },
  zivid: {
    aboutUrl: zividAbout, founded: '2015',
    role: l('机器人三维视觉相机、采集软件与运动规划工具供应商', 'Robot 3D cameras, acquisition software and motion-planning tools supplier'),
    overview: [
      l('Zivid于2015年由SINTEF研究背景的团队创立，面向工业机器人提供三维彩色相机与软件。其定位是视觉和相关规划技术供应商，而不是所有应用的完整机器人工作站制造商。', 'Zivid was founded in 2015 by a team originating in SINTEF research. It supplies industrial robot 3D color cameras and software, rather than complete robot cells for every application.'),
      l('Zivid 2+ Classic的M60、M130、L110与R系列MR60、MR130、LR110是不同身份，不能按名称相似合并规格。采集距离、焦距处点间距、曝光预设和表面材质共同影响可用点云。', 'Zivid 2+ Classic M60/M130/L110 are distinct from R-series MR60/MR130/LR110 and must not share specifications by name similarity. Working distance, point spacing at focus, capture presets and material properties jointly affect usable point clouds.'),
      l('SDK提供相机控制和点云接口，Studio提供采集与检查界面，Motion处理机器人运动规划。三者功能不互相等同，规划时间声明也不是整站节拍或安全保证。', 'SDK handles camera control and point-cloud APIs, Studio provides capture/inspection interfaces, and Motion addresses robot motion planning. These scopes are distinct; a planning-time claim is not a cell-cycle or safety guarantee.'),
    ],
    timeline: [event('2015-05', 'founding', zividAbout, 'Zivid作为SINTEF衍生企业成立。', 'Zivid established as a SINTEF spin-off.'), event('2017-03', 'product', zividAbout, '推出Zivid One。', 'Zivid One introduced.'), event('2020-11', 'product', zividAbout, '推出Zivid 2。', 'Zivid 2 introduced.'), event('2023-06', 'product', zividAbout, '推出Zivid 2+。', 'Zivid 2+ introduced.'), event('2024-12', 'product', zividAbout, '推出Zivid 2+ R系列。', 'Zivid 2+ R-series introduced.'), event('2025-11', 'product', zividAbout, '推出Zivid 3。', 'Zivid 3 introduced.'), event('2026-03', 'product', zividAbout, '推出Zivid Motion。', 'Zivid Motion introduced.')],
    investmentView: [l('未将商业数据库的估算营收、估值或未核实融资条目写成事实；原始融资公告和法定年报仍待补查。', 'Commercial-database estimates of revenue, valuation and unverified funding entries are not treated as facts; primary financing announcements and statutory accounts remain to be reviewed.')],
  },
  photoneo: {
    aboutUrl: photoneoAbout, founded: '2013',
    role: l('工业三维视觉硬件与机器人视觉软件供应商', 'Industrial 3D-vision hardware and robot-vision software supplier'),
    overview: [
      l('Photoneo于2013年由Jan Zizka、Tomas Kovacovsky和Michal Maly创立。其机器人相关业务包括PhoXi、MotionCam-3D、Alpha扫描硬件以及定位、抓取和点云处理软件。', 'Photoneo was founded in 2013 by Jan Zizka, Tomas Kovacovsky and Michal Maly. Its robotics portfolio spans PhoXi, MotionCam-3D and Alpha scanning hardware plus localization, picking and point-cloud software.'),
      l('保留既有22个明确发布的相机规格列，包括蓝/红光和不同工作距离配置；不会由系列名生成未在官方表中列出的组合。本次另补Bin Picking Studio和Locator Studio的版本记录。', 'The 22 existing explicitly offered camera specification columns, including blue/red light and distance variants, are preserved. Unlisted combinations are not synthesized from family names. Version-specific Bin Picking Studio and Locator Studio records are added.'),
      l('官方沿革区分2021年独立业务单元Brightpick与2025年Photoneo加入Zebra的收购。不同主体的融资、机器人产品和后续经营数据不得不加区分地归入视觉传感器公司。', 'The official history distinguishes the Brightpick business unit established in 2021 from Photoneo joining Zebra by acquisition in 2025. Financing, robots and subsequent financials of different entities are not automatically attributed to the vision-sensor company.'),
    ],
    timeline: [event('2013', 'founding', photoneoAbout, 'Photoneo成立。', 'Photoneo founded.'), event('2021', 'business', photoneoAbout, '设立Brightpick业务单元，集团与视觉业务边界需要区分。', 'Brightpick business unit established; group and vision-business boundaries remain distinct.'), event('2025-03-05', 'business', 'https://www.photoneo.com/photoneo-acquired-by-zebra-technologies/', '公告加入Zebra Technologies，属于收购经营事件。', 'Joining Zebra Technologies announced as an acquisition business event.'), event('2026-09-01', 'product', 'https://www.photoneo.com/bin-picking-studio-1-12-locator-studio-1-5/', '发布Bin Picking Studio 1.12和Locator Studio 1.5。', 'Bin Picking Studio 1.12 and Locator Studio 1.5 released.')],
    investmentView: [l('独立视觉业务的完整财务及收购对价尚未在本次核实；不直接分摊Zebra集团营收。', 'Complete standalone vision-business financials and acquisition consideration were not verified here; Zebra group revenue is not allocated by inference.')],
  },
  ouster: {
    aboutUrl: ousterQ2,
    role: l('数字激光雷达与感知平台供应商', 'Digital lidar and perception-platform supplier'),
    overview: [
      l('Ouster面向工业、机器人、交通和基础设施提供数字激光雷达与感知技术。2026年季度公告反映集团已包含相机业务，因此集团传感器出货数不等于激光雷达销量。', 'Ouster supplies digital lidar and perception technology for industrial, robotics, transport and infrastructure uses. Its 2026 quarterly release includes cameras in group operations, so group sensor shipments are not lidar-only sales.'),
      l('本次复核OSDome、OS0、OS1和OS1 Max的REV8.0初步数据表，保留既有每款81行的细分记录，不以较短的重新抽取结果覆盖。未按通道和扫描频率生成未发布订货码。', 'This review rechecks preliminary REV8.0 datasheets for OSDome, OS0, OS1 and OS1 Max, retaining the existing 81 detailed rows per model rather than replacing them with a shorter re-extraction. Unpublished channel/rate order codes are not synthesized.'),
      l('2026年第二季度总收入为5462.6万美元，产品收入5276.3万美元，GAAP毛利率49%；公告概述净亏损约1800万美元。数据为集团季度口径，不代表单一型号或机器人业务收入。', 'For Q2 2026, total revenue was USD 54.626 million, product revenue USD 52.763 million and GAAP gross margin 49%; the release summarizes a net loss of about USD 18 million. These are group quarterly figures, not model or robotics-segment revenue.'),
    ],
    timeline: [event('2026-08-06', 'business', ousterQ2, '发布截至2026年6月30日的第二季度业绩。', 'Published Q2 results for the quarter ended June 30, 2026.')],
    investmentView: [l('2026年6月30日现金、现金等价物、受限现金及短期投资合计约2.63亿美元。非GAAP指标与前瞻指引不混作已实现GAAP利润。', 'At June 30, 2026, cash, equivalents, restricted cash and short-term investments totaled about USD 263 million. Non-GAAP measures and guidance are not realized GAAP profit.')],
  },
  realsense: {
    aboutUrl: rsSpinout, headquarters: l('美国加利福尼亚州库比蒂诺', 'Cupertino, California, United States'),
    role: l('深度相机、视觉模组与感知软件供应商', 'Depth cameras, vision modules and perception-software supplier'),
    overview: [
      l('RealSense技术孵化于Intel，2025年7月11日公告完成分拆并作为独立公司运营。旧Intel品牌产品与新公司的生命周期、版本和供货条件需要分别核对。', 'RealSense technology was incubated at Intel. On July 11, 2025 it announced a completed spinout and independent operation. Legacy Intel-branded products and current company versions/lifecycle/supply require separate checks.'),
      l('机器人相关目录包含USB双目深度相机、IR滤光版本、工业PoE/GMSL设备和嵌入式模组。本次保留既有十款相机，补充D436、D555、D585 Pro及D421，不把裸模组和外壳相机合并。', 'The robotics catalog includes USB stereo cameras, IR-filter variants, industrial PoE/GMSL devices and embedded modules. Ten existing camera records are retained and D436, D555, D585 Pro and D421 are added; bare modules are not merged with enclosed cameras.'),
      l('最小距离、最大分辨率和最大帧率应按模式组合读取。D436页面的RGB视场存在正文表与FAQ差异，相关行暂不用于数值筛选。人脸门禁产品未仅因同一品牌而纳入本次机器人目录。', 'Minimum distance, maximum resolution and maximum frame rate must be read by mode. D436 RGB field-of-view differences between the table and FAQ are excluded from numeric filters. Facial-access-control products are not included merely because they share the brand.'),
    ],
    timeline: [event('2025-07-11', 'business', rsSpinout, '完成从Intel分拆并独立运营。', 'Completed spinout from Intel and began independent operation.'), event('2025-07-11', 'funding', rsSpinout, '宣布完成5000万美元A轮融资。', 'Announced a USD 50 million Series A.')],
    funding: [{ date: '2025-07-11', round: l('A轮', 'Series A'), amount: 'USD 50 million', investors: l('未具名半导体私募股权机构领投；Intel Capital与MediaTek Innovation Fund参与。', 'Led by an unnamed semiconductor private-equity firm, with Intel Capital and MediaTek Innovation Fund participating.'), sourceUrl: rsSpinout }],
    investmentView: [l('融资公告未披露估值及完整利润表；市场份额和客户规模陈述不能替代独立财务核验。', 'The financing announcement does not disclose valuation or a complete income statement; market-share and customer-count claims are not independent financial verification.')],
  },
  orbbec: {
    aboutUrl: orbbecH1, founded: '2013-01-18', legalName: '奥比中光科技集团股份有限公司',
    role: l('三维视觉感知模组、相机、激光雷达与软件供应商', '3D-vision modules, cameras, lidar and software supplier'),
    overview: [
      l('奥比中光于2013年1月18日成立，在上海证券交易所科创板上市，证券代码688322。其业务涵盖三维视觉感知产品设计、研发、生产和销售，集团财务口径包含机器人之外的应用。', 'Orbbec was incorporated on January 18, 2013 and is listed on the Shanghai STAR Market as 688322. It designs, develops, manufactures and sells 3D-vision sensing products; group financials include applications beyond robotics.'),
      l('本次扩展Gemini双目、Femto ToF、Astra结构光和Pulsar激光雷达记录。保留既有Gemini 330系列八款型号；相机输出模式、主机计算和板载计算分别按产品说明记录。', 'This review expands Gemini stereo, Femto ToF, Astra structured-light and Pulsar lidar records while preserving eight existing Gemini 330 models. Output modes and host-versus-onboard computation remain product-specific.'),
      l('2026年10月18日补查进一步区分三类机器人感知部件：Gemini 305g以板载MX6800处理近距双目彩色数据并提供GMSL2连接；Persee+是搭载Amlogic A311D的结构光视觉计算一体机；MS200p是奥锐达旋转式dToF单线雷达。官方资料分别约束主机接口、应用算法和扫描协议，不将这些产品的计算、深度或同步能力互相继承。当前下载目录把Persee+标为已停产、MS200p标为计划停产，这两种状态不能混用。', 'The October 18, 2026 review distinguishes three robot-perception component types: Gemini 305g processes close-range stereo-color data with an onboard MX6800 and offers GMSL2; Persee+ is an Amlogic A311D structured-light camera computer; MS200p is an Oradar rotating single-line dToF lidar. Their official sources separately define host interfaces, application algorithms and scan protocols; compute, depth and synchronization capabilities are not inherited across products. The current download catalog marks Persee+ discontinued and MS200p planned for discontinuation, which are different states.'),
      l('2026年上半年未经审计合并报告披露营收437,605,886.25元、归母净利润41,640,865.93元、扣非归母净利润23,042,790.43元和经营现金流净额13,912,484.83元。币种均为人民币，不能视为机器人相机业务单独收入。', 'The unaudited H1 2026 consolidated report discloses revenue of CNY 437,605,886.25, attributable net profit of CNY 41,640,865.93, attributable profit excluding nonrecurring items of CNY 23,042,790.43 and operating cash flow of CNY 13,912,484.83. These are not standalone robot-camera revenues.'),
    ],
    timeline: [event('2013-01-18', 'founding', orbbecH1, '奥比中光成立；2026年半年报第8页回溯记载。', 'Orbbec incorporated, as recounted on page 8 of the 2026 interim report.'), event('2026-08-22', 'business', orbbecH1, '披露2026年半年度报告，财务报表未经审计。', 'Published the unaudited 2026 interim report.')],
    investmentView: [l('2026年6月末归母净资产3,993,675,044.35元、总资产4,431,080,833.98元。报告说明净资产增长主要与定增募集资金有关；具体发行条款仍需独立核查。', 'At June 2026, attributable net assets were CNY 3,993,675,044.35 and total assets CNY 4,431,080,833.98. The report attributes net-asset growth mainly to equity-issue proceeds; exact issue terms require separate review.')],
  },
  livox: {
    aboutUrl: 'https://www.livoxtech.com/contact', founded: '2016',
    role: l('三维激光雷达、数据汇聚与开发软件供应商', '3D lidar, data-aggregation and development-software supplier'),
    overview: [
      l('Livox官方资料将公司起点追溯至2016年，产品面向机器人、测绘和自动驾驶等感知应用。其目录同时保留现行产品资料与旧型号下载，不以下载文件仍存在推断现售状态。', 'Livox traces its origins to 2016 and addresses robotics, mapping and automated-driving perception. Its catalog includes both current material and legacy downloads; downloadable files are not proof of current sale.'),
      l('MID-360S与MID-360分别建档；Avia 2 NF是官网明确发布的无风扇版本，不从有风扇Avia 2复制量程和点率。HAP的T1和TX按实际数据接口区分，Hub是数据汇聚配件而非独立雷达。', 'MID-360S and MID-360 remain separate. Avia 2 NF is an explicitly published fanless version, without copying Avia 2 range/point-rate claims. HAP T1 and TX are separated by actual data interface, and Hub is an aggregation accessory rather than a lidar.'),
      l('量程与点云质量需连同反射率、环境光、积累时间和回波模式解释。启动功率、激光器内部功率及设备常态功耗为不同概念；旧MID型号风扇IP55与本体IP67条件同时保留。', 'Range and point-cloud quality require reflectivity, illumination, accumulation time and return-mode conditions. Startup power, internal laser power and normal device consumption are different quantities; legacy MID fan IP55 and body IP67 conditions are retained together.'),
    ],
    timeline: [event('2016', 'founding', 'https://www.livoxtech.com/contact', 'Livox成立。', 'Livox established.'), event('2026-07-30', 'product', 'https://www.livoxtech.com/downloads', '下载中心发布Avia 2及Avia 2 NF产品信息和用户手册。', 'Download center publishes Avia 2 and Avia 2 NF product information and user manuals.')],
    investmentView: [l('本次未获得可归属于Livox独立主体的完整财务及融资披露；不使用关联企业收入代替。', 'Complete financial and financing disclosures attributable to Livox independently were not retrieved; related-company revenue is not substituted.')],
  },
};

// Keep the previously published bilingual narrative alongside the additional review.
const preservedOverviews = (raw as unknown as { priorCompanyOverviews?: Record<string, Localized[]> }).priorCompanyOverviews || {};
const preservedProducts = (raw as unknown as { priorCompanyProducts?: Record<string, string[]> }).priorCompanyProducts || {};
for (const [slug, profile] of Object.entries(profiles)) {
  profile.overview = [...new Map([...(preservedOverviews[slug] || []), ...(profile.overview || [])].map(item => [item.zh + '\n' + item.en, item])).values()];
  profile.products = [...new Set([...(preservedProducts[slug] || []), ...raw.products.filter(p => p.companySlug === slug).map(p => p.product)])];
  profile.catalogScope = l('保留既有型号及2026-09-06审阅数据，2026-09-08仅补充Bota、RealSense、Orbbec和Livox的指定资料差集，未新增财务披露。型号、套件、附件与历史停售产品分别标识；剩余差集见审阅记录，不代表全部公开产品已完成。', 'Existing models and the 2026-09-06 review are preserved. The 2026-09-08 increment covers specific Bota, RealSense, Orbbec and Livox document differences, with no new financial disclosure. Models, kits, accessories and discontinued products remain distinct; remaining differences are not represented as complete public-product coverage.');
  if (slug === 'orbbec') profile.catalogScope = l('保留既有全部记录及首轮3型号282行；2026-10-18续补305g第20-42页流/控制/性能、45-50页软件集成及51-52页两张连接器图纸，并补MS200p A1命令示例和具名软件目录声明。第31页低分辨率视场图的小号平面尺寸仍待清晰来源，MS200p SDK包返回403，未虚构内部API；未新增财务披露，也不代表全公司目录完成。', 'All existing records and the first three-model/282-row increment are preserved. The October18 continuation covers305g PDF20-42 streams/controls/performance,45-50 software/integration and51-52 connector drawings, plus MS200p A1 command examples and its named software catalog declaration. Small footprint dimensions in the low-resolution PDF31 FOV diagrams still need a clear source; the MS200p SDK archive returned403 and no internal APIs are invented. No financial disclosures or company-wide completion claim are added.');
  if (slug === 'bota-systems') profile.catalogScope = l('历史数据全部保留；2026-10-18复用已哈希PixONE T25/T60修订A图纸，补第1页27行孔、角度与弹簧触点焊盘标注。推荐接触件不生成SKU，图纸位置不作为无条件额定值；缺页、受限手册和其他型号仍待补。', 'All historical data is preserved. The October18 increment reuses hashed PixONE T25/T60 revision A drawings for27 remaining PDF1 hole, angular and pogo-pad annotations. Recommended contacts do not generate SKUs; drawing positions are not unconditional ratings. Missing sheets, restricted manuals and other model gaps remain.');
  if (slug === 'zivid') profile.catalogScope = l('保留七款已录相机与全部附件；2026-10-18增加具名旧代Zivid 2 M70/L100，分别绑定硬件Rev B及2023-04手册1.3/1.0。规格表、性能条件、光学/机械图和全部连接器针脚按型号记录；2026.09 FAQ差异另列，曲线不估读。旧代目录分类不等于当前供货；One/One+、其他修订和完整SDK仍未完成。', 'The seven previously recorded cameras and all accessories are retained. The October18 increment adds named legacy Zivid2 M70/L100, respectively bound to hardware Rev B and April2023 datasheets1.3/1.0. Tables, performance conditions, optical/mechanical drawings and all connector pins are model-specific; FAQ2026.09 differences stay separate and curves are not estimated. Legacy classification does not establish current availability; One/One+, other revisions and the full SDK remain incomplete.');
  if (slug === 'photoneo') profile.catalogScope = l('保留全部历史数据与两款Studio记录；2026-10-18单独增加Localization SDK的1.3版94行，来源为2020-05手册及2020-05-04官方发布说明。覆盖产品功能、技术要求表、许可、模型/场景格式、算法参数及版本兼容条件，不逐行收录教程代码，不将应用、配置器或许可方式拆成SKU。下载入口返回502，当前最新版未核实；其余软件、方案及相机资料缺口仍保留。', 'All historical data and both Studio records are preserved. The October18 increment adds one Localization SDK record with94 rows for version1.3, using the May2020 manual and May4,2020 official release article. It covers capabilities, requirement tables, licensing, model/scene formats, algorithm controls and version compatibility, without line-by-line tutorial code or application, Configurator or license-method SKUs. The download index returned502; the current latest release is unverified. Other software, solution and camera-document gaps remain.');
  if (slug === 'photoneo') profile.catalogScope = l(profile.catalogScope.zh + ' 最后有界块另按官网对比表及具名说明增加3D Meshing Standard/Instant两个软件库、22行；未标具体发布版本，PDF下载及截图失败后不采用其参数，归属含糊的PC推荐配置不录入。版本手册与完整API仍待补。', profile.catalogScope.en + ' The final bounded block adds two explicitly named3D Meshing Standard/Instant libraries and22 rows from the official comparison and named descriptions. No release number is specified; the failed PDF download/screenshot supplies no parameters, and ambiguously assigned PC recommendations are omitted. Versioned manuals and full APIs remain pending.');
  if (slug === 'photoneo') profile.catalogScope = l(profile.catalogScope.zh + ' 本轮续增PhoXi Control一个软件记录、235行，限定1.17官方HTML用户手册（基于1.17.0）：运行与主机条件、网络、文件、维护及触发说明，71行采集/处理控制表、31行API示例语言/功能矩阵及16行坐标变换矩阵。设备、模式、固件及来源冲突独立保留，全部为非无条件额定值；未导入教程代码或未读外链硬件资料。', profile.catalogScope.en + ' This continuation adds one PhoXi Control software record with235 rows, limited to the official1.17 HTML user manual (based on1.17.0): host/runtime, network, files, maintenance and trigger conditions,71 capture/processing controls,31 API example language/capability rows and16 coordinate-transform rows. Device, mode, firmware and source conflicts remain explicit; none is an unconditional rating. Tutorial code and unread linked hardware documents are not imported.');
  if (slug === 'photoneo') profile.catalogScope = l(profile.catalogScope.zh + ' 后续拆垛模块块按官方具名、单独订购的AnyPick module for Boxes及LayerPick module分别增加60行与16行，明确对应Depalletization和Delayering。箱体AI定位、抓取点、定位包围盒及版本能力采用VGR1.12分支资料，不将分支号当模块版本；不继承独立周转箱模块参数、CAD算例或早期Universal Depalletizer整套方案额定值。旧方案PDF和旧Delayering页502，未采用其搜索摘要参数。', profile.catalogScope.en + ' The pallet-module block adds60 rows for the separately ordered AnyPick module for Boxes and16 for LayerPick module, explicitly linked to Depalletization and Delayering. Box AI localization, gripping points, localization bounding boxes and release-specific capabilities use the VGR1.12 documentation branch, not a module version number. Distinct tote-module parameters, CAD examples and earlier Universal Depalletizer system ratings are not inherited. The legacy-system PDF and old Delayering page returned502; search-snippet parameters are not imported.');
}

const categories = {
  'force-torque-sensor': l('力/力矩传感器', 'Force/torque sensor'),
  'vision-sensor': l('三维视觉传感器', '3D vision sensor'),
  'vision-processor': l('视觉处理器与计算板卡', 'Vision processor and compute board'),
  lidar: l('激光雷达', 'Lidar'), software: l('机器人感知软件', 'Robot perception software'),
  kit: l('机器人集成套件', 'Robot integration kit'), accessory: l('传感器配件', 'Sensor accessory'),
};
function taxonomy(p: (typeof raw.products)[number]): { primary: string; subclass: string } {
  if (p.kind === 'vision-processor') return { primary: 'control-compute', subclass: 'edge-compute' };
  if (p.kind === 'software') return { primary: 'software-tools', subclass: /ROS 2/.test(p.product) ? 'middleware' : /SDK/.test(p.product) ? 'development-tool' : 'application-software' };
  if (p.kind === 'kit') return { primary: 'sensing', subclass: 'force-torque-sensor' };
  if (p.kind === 'accessory') {
    if (/power supply/i.test(p.product)) return { primary: 'power-energy', subclass: 'power-supply' };
    if (p.product === 'Livox Hub') return { primary: 'communication-connectivity', subclass: 'industrial-network' };
    if (/adapter|injector|hub|terminal block/i.test(p.product)) return { primary: 'communication-connectivity', subclass: 'io-module' };
    if (/cable|connector|USB-C|ZVDA-CBL-/i.test(p.product)) return { primary: 'communication-connectivity', subclass: 'connector-cable' };
    return { primary: 'structure-thermal', subclass: 'structure' };
  }
  return { primary: 'sensing', subclass: p.kind };
}
// Avia 2 already exists in wave six; enrichment must retain that identity and narrative.
const avia2Legacy = (raw as unknown as { avia2Legacy?: CatalogEnrichmentProduct }).avia2Legacy;
// MID-360 is also a wave-six identity, not a newly discovered product.
const mid360Legacy = (raw as unknown as { mid360Legacy?: CatalogEnrichmentProduct }).mid360Legacy;
const products: CatalogEnrichmentProduct[] = raw.products.map((p) => ({
  id: `parallel-vision-sensing-${p.companySlug}-${p.product.toLowerCase().replace(/\+/g, '-plus-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
  companySlug: p.companySlug, product: p.product, pageUrl: p.pageUrl,
  category: p.kind === 'software' || p.kind === 'vision-processor' ? 'model-software' : 'perception',
  ...taxonomy(p),
  useCases: ['integration', 'research'],
  type: p.kind === 'vision-processor' ? (p.product === 'Vision Processor D4' ? l('双目深度处理ASIC', 'Stereo-depth processing ASIC') : l('视觉处理器板卡', 'Vision processor board')) : categories[p.kind as keyof typeof categories],
  level: p.level as 'model' | 'family' | 'platform', coverage: 'official-partial',
  specificationKind: p.kind === 'software' ? 'capabilities' : 'parameters',
  overview: [l(`${p.product}按官网具名产品单独建档。参数、代际、选项及测试条件均按所列原始来源保留。`, `${p.product} is recorded as the explicitly named official product, retaining source-specific parameters, generation, options and test conditions.`), p.note],
  applications: [l('机器人感知与研发集成；适用范围按单品说明核对。', 'Robot perception and R&D integration; applicability follows the individual product documentation.')],
  integration: l('核对实际料号、机械图纸、供电、接口、固件及标定条件；配件和套件不自动继承基础传感器的全部能力。', 'Verify the actual part number, drawings, supply, interface, firmware and calibration conditions; kits and accessories do not automatically inherit every base-sensor capability.'),
  verification: l('公开资料仍为部分覆盖。冲突、条件化性能、初步规格及过载/破坏值不作为无条件数值筛选依据。', 'Public material remains partially covered. Conflicts, conditional performance, preliminary specifications and overload/breaking values are not unconditional numeric-filter evidence.'),
  ...(p.companySlug === 'livox' && p.product === 'Avia 2' && avia2Legacy ? avia2Legacy : {}),
  ...(p.companySlug === 'livox' && p.product === 'MID-360' && mid360Legacy ? mid360Legacy : {}),
  rows: p.rows,
  sourceLinks: [...new Set([p.pageUrl, ...p.rows.map(r => r.sourceUrl)])].map(url => ({ url, label: l('官方原始资料', 'Official source material') })),
}));

const catalogs: Record<string, string[]> = {
  'bota-systems': ['https://shop.botasys.com/product-portfolio', 'https://shop.botasys.com/shop/category/robot-integration-kits-1', 'https://shop.botasys.com/shop/category/accessories-spare-parts-6'],
  robotous: ['https://www.robotous.com/', 'https://github.com/ROBOTOUS'],
  sensodrive: ['https://www.sensodrive.de/products/torque-technology-senso-joint.php', 'https://www.sensodrive.de/products/torque-technology-torque-sensors.php'],
  leptrino: ['https://www.leptrino.co.jp/product/6axis-force-sensor'],
  'wacoh-tech': ['https://wacoh-tech.com/products/', 'https://wacoh-tech.com/topics/news/'],
  zivid: ['https://www.zivid.com/en/compare-and-select-3d', 'https://www.zivid.com/documentation', 'https://www.zivid.com/en/zivid-accessories', 'https://shop.zivid.com/'],
  photoneo: ['https://www.photoneo.com/'],
  ouster: ['https://ouster.com/downloads/'],
  realsense: ['https://www.realsenseai.com/compare-depth-cameras/', 'https://www.realsenseai.com/product-datasheets/', 'https://www.realsenseai.com/products/modules-processors/'],
  orbbec: ['https://www.orbbec.com/products/', 'https://www.orbbec.com.cn/index/Download2025/info.html?cate=121&id=1'],
  livox: ['https://www.livoxtech.com/downloads'],
};
const gaps: Record<string, Array<[string, string]>> = {
  'bota-systems': [
    ['TactX', 'A portfolio-only family record is added, but the linked product URL returned 404. Full model table and fingertip variant mapping remain unverified. / 已录汇总表系列行，单品链接404，完整规格与指尖配置映射待查。'],
    ['Kit/accessory manual access', 'All 20 kit and 37 accessory pages were fetched, not 57 complete manuals. Many linked document endpoints remain unreadable through HTTP; a checked UR-kit document redirects to an email-gated HubSpot viewer. No email or consent was submitted. Package BOMs and all robot-side dimensions remain partial. / 57为套件/附件网页数，并非完整手册数；多个文档端点未能读取，UR套件实例实测跳转邮箱门槛。未提交邮箱或同意，整套BOM和机器人侧尺寸仍未全录。'],
    ['Accessible accessory drawings transcribed', 'Direct PDFs supply Gen Zero cable/adapter pinouts, PSU electrical rows, DIN injector modes/geometry, D435-bracket assembly and PixONE T25/T60 Gen A mass/inertia. September8 adds exact reference tool/robot flange holes, fits, depths and sealing steps, not supplied flanges or sensor-body dimensions. Other cable lengths, Gen A pinouts and kit-specific limits remain untranscribed. / 已录旧代线缆针脚、电源、注入器及装配图；9月8日新增两个PixONE具名参考法兰的孔、配合、深度和密封台阶，不等同随货法兰或传感器尺寸；其他线长、Gen A针脚及套件极限待补。'],
    ['PixONE revision A drawing continuation', 'October18 adds27 remaining PDF1 hole depths/chamfers, angular annotations, pogo-pad positions, pad sizes and recommended contact references. Unsigned drawing positions are not inferred signed coordinates; contact references are not new supplied-part SKUs. / 10月18日补第1页27行孔深倒角、角度、焊盘位置尺寸及推荐触点编号；无符号尺寸不推导带符号坐标，推荐件不新增随货SKU。'],
    ['Missing drawing pages / source mass conflict', 'PixONE T60 download has 2 pages while title blocks say 1/3 and 2/3; bracket download has 1 page marked 1/2. T25 CAD mass 258.02 g conflicts with title-block 236.00 g; illustrated bracket-assembly 299.20 g is not bare-bracket mass. / 下载缺页不等同未披露；质量冲突与整套/单件范围已分别保留，数值不索引。'],
    ['Portfolio conflicts', 'Range/noise/mass/dimensions can differ from individual Gen A tables. Affected numeric fields are excluded, not reconciled by inference. / 汇总表与单品表量程、噪声、质量和尺寸存在差异，相关数值不索引。'],
  ],
  robotous: [['Hardware catalog access', 'Current company site was not readable; seven existing RFT hardware records remain based on previously verified manufacturer material. No claim that the full current catalog or lifecycle is verified. / 官网不可读，保留七款历史已核规格，不宣称现行全目录完成。'], ['Interfaces and firmware', 'UART/EtherCAT examples do not establish support for every RFT hardware revision; CAN and historical utility/software variants require review. / 示例不能代表全部硬件版本；CAN及历史工具待查。']],
  sensodrive: [['SensoJoint documentation', '23 existing model columns retained; firmware, motor/encoder wiring, CAD tolerances and safety-certificate appendices still need model-specific review. / 保留23个型号，固件、接线、CAD公差及安全证书附件待逐型核查。'], ['SensoTorque custom forms', 'More than 50 types are advertised without a full order-code matrix; custom dimensions and options remain configuration-level unknowns. / 50多种形式未给出完整订货矩阵。']],
  leptrino: [['New FFS dimensions', 'Coming Soon cells remain unknown; IP67 is a custom option, not a default rating for all FFS products. / 新FFS未公布尺寸保持未知，IP67为定制选项。'], ['Custom SFS examples and interfaces', 'Five named examples added, but availability, drawings, cables and serial/Ethernet/analog options require individual confirmation. / 五个具名示例已录，供货、图纸、线缆及输出选项待逐项确认。'], ['Force plates and dynamometers', 'Existing records retained; complete manuals, calibration procedures and software licensing remain unreviewed. / 保留既有测力台及测力计，完整手册、标定与软件许可待查。']],
  'wacoh-tech': [['Historical discontinued models', '2025 notice names ZEF-D-6A200-20-RCD-B, ZEF-D-6A500-20-RCD-B, ZEF-DR-6A200-20-RCD-B, ZEF-DR-6A500-20-RCD-B, MCF-3A10-0.05-RA5; historical specifications and replacements are not fully modeled. / 五个停售型号的历史规格及替代品未完整建档。'], ['Interfaces/cables', 'Existing sensor/interface/cable rows retained; current Japanese manuals, pinouts, host drivers and every robot-specific cable SKU still need reconciliation. / 既有行保留，日文手册、针脚、驱动和全部机器人线缆料号待核。']],
  zivid: [
    ['Current seven camera tables and drawings', 'M60/M130/L110, MR60/MR130/LR110 and XL250 technical text tables, mechanical dimensions, mounting threads, locating fits and connector figures are transcribed. Continuous performance curves are not digitized; they are readable evidence, not undisclosed parameters. / 七款现行相机技术表及机械、安装、定位和连接器图示已摘录；连续性能曲线未数字化，不标为未披露。'],
    ['Named accessories and lifecycle', '32 exact official order codes cover mounts/extenders, calibration boards, Ethernet, power and optical USB cables with table rows and drawing dimensions. Dated Obsolete variants stay historical; no unoffered length/connector combinations are generated. Legacy One/One+ and accessory revisions outside these documents remain gaps. / 已录32个官方订货码的安装件、标定板与线缆参数及图示；停产版本保留日期，不组合未提供配置。One/One+及文档外附件修订仍待补。'],
    ['M70/L100 Rev B datasheets', 'October18 adds the225 rows of these two exact legacy models: April2023 datasheets1.3/1.0 tables, operating conditions, drawings and complete power/data pin tables. FAQ2026.09 precision/trueness differs and is kept separately. Other hardware revisions and full user guides remain outside this block; continuous curves are not digitized. / 10月18日补两款旧代型号225行，包含指定修订手册的规格、工况、图示及全部供电/数据针脚。2026.09 FAQ精密度/真值度差异独立保留；其他硬件修订、完整用户指南及曲线数字化仍未覆盖。'],
    ['Source conflicts', 'Camera page/PDF conditions remain separate. CB02 125x150 versus 125x125, ST30 162 versus 162.1, cable connector captions and reversed USB bend-radius ordering are retained without silent reconciliation. / 相机网页与PDF工况、CB02尺寸、ST30尺寸、线缆连接器标签及USB弯曲半径顺序差异分别保留，不静默消解。'],
    ['SDK/Motion completeness', 'API version matrices, robot support and GPU performance limits still need detailed documentation review. / API版本矩阵、机器人支持与GPU性能条件待查。'],
  ],
  photoneo: [['Pallet modules and legacy system', 'AnyPick module for Boxes (Depalletization) and LayerPick module (Delayering) now have60/16 rows from six official HTML sources. Box/general AI controls and localization bounding-box configuration are covered; Center of Tote and its separately ordered tote module are not inherited. Legacy Universal Depalletizer PDF and old Delayering page returned502, with no accepted PDF or snippet-derived rating. Full LayerPick parameter/API reference, exact robot/gripper compatibility and module-version matrices remain gaps. / 已按六份官方HTML分别收录两模块60及16行，箱体与通用AI参数及定位包围盒已覆盖；不继承独立周转箱模块。旧方案PDF及旧Delayering页502，未采用PDF或摘要额定值；完整LayerPick参数/API、机器人夹具型号表及模块版本矩阵仍待补。'], ['PhoXi Control scope', 'The1.17 HTML user manual now supplies one product with235 rows, including all71 named capture/processing rows,31 API examples and16 coordinate-transform combinations. Full C++/C#/Python API signatures, external GigE integration manuals, hardware electrical/pin specifications, other releases and installed-device behavior remain unverified. GUI key maps, tutorial code and screenshot sample values are intentionally not itemized. / 已录1.17手册的具名控制表、API示例和变换矩阵；完整API签名、外部GigE手册、硬件电气及针脚、其他版本与实机行为仍未核实，快捷键、教程代码及截图示例数值不逐行收录。'], ['3D Meshing versioned manuals', 'Standard/Instant are now separate software records from the official HTML comparison and named descriptions. Versioned manuals/full APIs remain pending. The10/2022 PDF original returned502 and screenshot timed out; it contributes no rows. Repeated PC headings and duplicated comparison text are not used to infer host requirements or cross-library capabilities. / 已按官网具名对比拆分两库；版本手册及完整API仍待补，失败PDF不贡献参数，重复PC标题及混入对比文字不用于推断主机配置或跨库能力。'], ['Localization SDK revisions', 'Localization SDK1.3 manual05/2020 and release2020-05-04 are covered as one product, distinct from Locator Studio and Photoneo Locator. Current download index returned502; later revisions, package headers and full API signatures remain unverified. Tutorial code and example pose values are intentionally excluded. / 已录独立SDK1.3，严格区分两种Locator产品；当前下载入口502，后续版本、包内头文件及完整API签名未核实，教程代码与示例位姿不逐行收录。'], ['Camera manuals/accessories', '22 existing camera configurations retained; revision-specific manuals, cooling, mounts and calibration accessories require further review. / 保留22个配置，版本手册、散热、安装与标定附件待补。']],
  ouster: [['Legacy generations and software', 'REV7 OS0/OS1/OS2, legacy Velodyne models, cables/mounts/interfaces and complete Gemini/BlueCity/SDK functionality remain gaps. Stereolabs products must keep their own company identity. / 旧代雷达、Velodyne、附件及软件待补，Stereolabs不重复归属。'], ['REV8 preliminary data', 'No final availability/certification inferred. Superscript i is pending and 2 denotes alternate configuration; plots and application-note constraints are not exhaustively transcribed. / 初步规格不代表正式供货或全部认证，曲线与应用说明未全录。'], ['Financial history', 'Q2 2026 release reviewed; full historical 10-K/10-Q, acquisitions and financing chronology remain incomplete. / 已核本季公告，历年财报、并购及融资史仍待补。']],
  realsense: [
    ['Current modules and processors', 'D410/D415/D430/D450/D401 bare modules, D4 ASIC, V1/V3/V4/V5/V6 processor boards and exact D401/D415/D430/D450 GMSL module combinations are modeled separately. D421 remains a bare module. V4 uses Micro-B and has no exposed external-sync connector; V5 drawing page is an unannotated image, not an omitted numeric dimension table. / 当前裸模组、ASIC、五种具名板卡版本V1/V3/V4/V5/V6及官方GMSL组合分别建档；D421仍为裸模组，V4为Micro-B且无外露同步口，V5机械图页无尺寸标注。'], 
    ['Readable appendices, controls and named IMU revisions', 'D400 optics, rails/sequencing,225 BGA balls, connectors, model-specific streams and AppendixA/B are retained. September8 adds exposed D4 control tables, BMI055/BMI085 rows only for named D435i,D455 and D450+V3 combinations, and D421/D555 mounting figures. Exposed controls are not a register-address map. Remaining housed-camera figures, platform-routing details, D585 Pro engineering datasheet, Perception Studio and full SDK matrix remain gaps. / 保留D400光学、供电时序、225焊球、针脚、逐型流及附录A/B；9月8日新增D4开放控制项、具名D435i/D455/D450+V3的BMI055/BMI085版本表以及D421/D555安装图。控制项不等于寄存器地址表，其他整机图、平台布线和软件矩阵仍待补。'],
    ['Source conflicts and connector scope', 'D415 width/thickness, D450 mounting-screw recommendations, D401 RGB FOV/ideal-range typo, GMSL comparison RGB/IMU entries and earlier camera discrepancies remain source-specific. D457 appendix labels a 50-position connector but its generic dimension table has no 50-position row; no dimension is inferred from other pin counts. / D415尺寸、D450螺钉、D401视场及距离单位、GMSL比较表RGB/IMU与既有冲突分别保留；D457附录虽称50位连接器，通用尺寸表没有50位行，不能套用其他针数。'],
  ],
  orbbec: [
    ['Catalog difference', 'October18 adds separate Gemini305g, MS200p and Persee+ identities. Robot-free collection products, Physis157g/257g, PulsarMH24, LS635 and remaining legacy models still need bounded model-specific review; catalog links are discovery evidence only. MS200 A0/MS200k/MS200p and Persee+/2/N1 remain distinct. / 10月18日新增305g、MS200p及Persee+独立身份；无本体采集、Physis157g/257g、PulsarMH24、LS635及其余旧型仍待逐型审阅，目录链接仅作发现依据；不合并MS或Persee代际。'],
    ['October18 bounded source blocks', 'MS200p A1 specification/pin/mechanical/protocol tables and12 command examples are transcribed, including the short standby reply. Its official software modal lists MS200_Ros-V1.3.4, limited maintenance, Ubuntu16/18/20/22 and an in-package Readme; the linked ZIP returned403 and was not bypassed. Exact SDK APIs/ROS interfaces, external Viewer manual and optional-board engineering details remain unverified; generic MS200/A0/MS200k interfaces are not inherited. Persee+14-row Chinese specifications/NPU and discontinued status remain preserved; the English link misroutes to Persee2 and Feishu documents remain unaccessed. / MS200p A1规格/针脚/机械/协议表及12组命令示例已录，保留无长度参数的待机短响应；官方软件弹窗列MS200_Ros-V1.3.4、有限维护、Ubuntu16/18/20/22及包内Readme，ZIP返回403且未绕过。精确SDK API/ROS接口、外部Viewer手册及转接板工程细节仍待核验，不继承MS200/A0/MS200k接口。Persee+14行中文规格/NPU及停售状态未改，英文链接误指Persee2，飞书资料未访问。'],
    ['Gemini305g manual continuation and source conflicts', 'V1.0 core/interfaces/electrical tables, full web model columns,75 stream configurations, decimation/D2C/FOV/intrinsics/Min-Z/control/performance tables, firmware/software/install conditions and both51-52 connector drawings are retained. PDF31 small raster footprint labels remain unreadable after native-image and high-resolution review; axial70/430mm labels are retained, not reconstructed footprints. FAKRA/SMB drawing IDs are not new SKUs. MJEG spelling,858x530 decimation input, depth ROI bounds, singleton color settings, denoising defaults and trigger60fps/30Hz qualification remain source-specific, as do all prior power/IP/polarity/temperature conflicts. External ME/Cable Design Guide V1.0 contents are not implied by citations. / 核心/接口/电气、官网完整型号列、75组流模式、降采样/D2C/FOV/内参/最小Z/控制/性能、固件软件安装及51-52页两张图纸已录。第31页小号栅格平面尺寸经原图及高分辨率核对仍不可靠，仅保留轴向70/430mm，不反推平面尺寸。FAKRA/SMB图号不造SKU；MJEG、858x530、ROI范围、彩色单值设置、降噪默认值、60fps配置/30Hz触发及既有功耗防护极性温度差异均按来源保留，引用ME/Cable指南不代表已取得正文。'],
    ['Persee and lifecycle', 'Persee 2 and N1 specification tables, components, N1 UART/GPIO pins and mechanical annotations are transcribed. Official June 10 2026 notices mark Persee 2/N1, Femto Mega I and non-PoE Gemini 2 XL EOL; the individual PCN last-buy/last-ship terms still need extraction. / Persee 2/N1规格、部件、N1针脚及图纸已录；2026-06-10官方EOL状态保留，逐份PCN的末次订购和交付条款待补。'],
    ['MS and ME450 readable tables closed', 'MS600/MS500 official parameter images and both Pulsar ME450 image tables are transcribed, including ranges/reflectivity, precision conditions, interfaces, power and environment. MS200 A0 and separately verified MS200k manuals supply specification, wiring, mechanical and packet-format rows. Full MS600/MS500/ME450 engineering manuals remain outside this slice; MS200 developer-page wavelength/dimensions differ from A0 and are not merged. / MS600/MS500与ME450图片参数已实际转录，MS200 A0及独立MS200k手册的规格、接线、尺寸及协议表已录；其余完整工程手册待补，MS200开发者网页与A0波长和尺寸不同，不跨版本合并。'],
    ['Camera diagram differences and conflicts', 'Gemini345Lg D2C annotated geometry, legible AppendixA mounting dimensions and missing interface/firmware/packing/compliance statements are transcribed; repeated software/hardware diagrams counted once. Legacy mapping3 is a retained merged footnote, not a third mode. AppendixA USB-sealed wording conflicts with functional USB sections; do not infer simultaneous GMSL/USB use. Other camera drawings/control details remain readable-not-transcribed; existing conflicts and explicit Wide TBC stay excluded. / Gemini345Lg具名D2C几何、附录A可读安装尺寸及接口/固件/包装/合规缺项已录，相同软硬件图仅计一次；旧mapping3为保留的合并脚注，不是第三模式。附图USB封闭表述与正文不一致，不推断GMSL/USB同时使用；其他相机图纸与控制差集仍待补，冲突和TBC均排除数值比较。'],
    ['Financial history', '2026 interim report core figures are verified; historical reports and equity-issue terms remain incomplete. / 2026半年报核心数字已核，历年报表和定增条款尚未完成。'],
  ],
  livox: [
    ['Avia 2 NF identified manual scope closed', 'NF v1.0 manual interface/pinout, annotated range/FOV, mechanical mounting, thermal duration, supply, network, data/IMU, synchronization and operating-mode tables are now transcribed. Normal and Focus reflectivity conditions remain distinct; continuous curve points are not inferred. Manual versus product-information clearance/power and fanless wording conflicts stay explicit. / NF手册接口针脚、具名量程视场、机械安装、散热时长、供电、网络、数据及IMU、同步和模式表已录；不同反射率不混用，连续曲线不插值，功耗、间隙及无风扇表述冲突保留。'],
    ['Named software and accessories', 'Viewer/Viewer2 manuals, SDK/SDK2 and ROS Driver/Driver2 official README capability/configuration rows plus the Avia2 1-to-3 breakout cable are modeled. Runtime API/command references, other extension couplers, power adapters and splitters still require separate source review. / 两代Viewer、SDK及ROS驱动的手册或官方README能力配置与Avia2一分三线缆已建档；完整运行时API、其余耦合器、电源及分线器待补。'],
    ['HAP TX v1.2 bounded hardware manual', 'October18 adds108 rows from the cached September2024 HAP(TX) v1.2 manual, PDF4-22, with19 pages visually reviewed. Full specification/footnote, pinout, tag and troubleshooting tables are covered through new rows plus exact preserved web cells; mounting drawings, thermal/startup conditions, coordinates, network and AUTOSAR gPTP restrictions are retained. The9-32 V contact-only wording creates no SKU. Internal laser power, reference power-plot endpoints, source power/false-alarm and connector-gender discrepancies remain conditional. / 10月18日依据缓存2024-09版HAP(TX)v1.2手册第4-22页新增108行，19页已视觉核对；规格脚注、针脚、标签及故障表通过新增行与原网页单元格关联覆盖，安装图、热启动、坐标网络及AUTOSAR gPTP限制保留。9-32 V咨询文字不造SKU，内置激光功率、参考图端点及功耗/虚警率/连接器性别差异均保留条件。'],
    ['Avia 2 v1.0 bounded hardware manual', 'The July2026 manual now adds120 source-only rows including five linked specification footnotes. All pin, information-push, state, power and troubleshooting tables,22 drawing callouts and21 visually checked pages are covered;26 legacy specification rows and the original livox-avia-2 identity/narrative are preserved. Default Idle versus power-on point-cloud output,56.69 versus69.69 mm drawing references, test-distance versus accuracy-table bands and the conditional hot-restart limit stay explicit. No NF/HAP conditions or curve estimates are inherited. / 2026-07版Avia2手册新增120行来源记录（含规格页五条脚注），针脚、推送、状态、功耗及故障表、22项尺寸图标注及21页像素均核对；保留26行旧规格和原ID/介绍。默认Idle与上电输出点云、两图参考尺寸、测试距离与精度区间及热重启条件分别保留，不继承NF/HAP或曲线估点。'],
    ['HAP T1 v1.2 bounded hardware manual', 'October18 adds106 source-only rows from the independently read September2024 T1 manual, with18 pages visually checked. Full specification/footnote,8-pin,tag and troubleshooting tables plus drawing annotations are mapped to new and preserved rows. Separate automotive Ethernet/power connectors, converter Master mode, cable-dependent IP67/IP54 and unsupported IMU are explicit. The M12 wording in the supply paragraph conflicts with the connector chapter; four protocol types versus three listed classes remains unresolved. No TX9-32V option or Avia/MID condition is inherited. / 10月18日独立核对2024-09版T1手册并新增106行，18页视觉核对；完整规格脚注、8针、标签、故障表及尺寸标注关联新旧行。独立车载以太网/电源接口、转换器Master、连接线缆后的IP67与未连接IP54及不支持IMU明确保留。电源段M12与接口章、协议称四类却只列三类的矛盾不静默消解，不继承TX的9-32V选项或Avia/MID条件。'],
    ['MID360 bounded connector and installation manual', 'The cached April2024 v1.2 manual PDF7-13 adds53 source-only rows: all13 pin-table rows, mounting drawing callouts, supply/startup/self-heating conditions and physical-network precautions. Seven pages are visually checked; original livox-mid-360 identity and25 legacy rows are unchanged. Pins11/12 remain reserved outputs; exactly35C startup power is unspecified; no torque or cable interchangeability is inferred. Data/IMU, synchronization, operating modes, maintenance, troubleshooting and remaining appendix material are outside this bounded block. / 缓存2024年4月v1.2手册第7-13页新增53行来源记录，完整13行针脚表、安装图标注、供电启动自加热及实体网络注意事项已录，7页已视觉核对。保留原livox-mid-360身份和25行旧规格；11/12脚仍为保留输出，恰好35C启动功耗未定义，不推断扭矩或线缆互换。数据/IMU、同步、模式、维护、故障和其余附录未扩展。'],
    ['Other accessible manuals and lifecycle', 'September8 MID360S manual tables and drawings remain preserved; pins11/12 are reserved IO, unlike NF, and no cable interchangeability is inferred. Avia2 external SDK2 API/packet references, other revisions, lifecycle and continuous curves remain outside these blocks. HAP T1/TX external command/protocol references and TX contact-only voltage-version identity remain gaps. Original Avia2/MID360 identities and51 legacy rows stay exact. / 保留9月8日MID360S手册表图；11/12脚是保留IO，不类推NF或线缆互换。Avia2外部SDK2 API/包协议、其他修订、生命周期及连续曲线未扩展。HAP T1/TX外部命令协议及TX需咨询电压版本身份仍有缺口；Avia2/MID360原身份及51行历史规格完整保留。'],
  ],
};

const reviews: CatalogCompanyReview[] = Object.keys(profiles).map(slug => ({
  slug, reviewedAt: ['orbbec','bota-systems','zivid','photoneo','livox'].includes(slug) ? '2026-10-18' : ['realsense'].includes(slug) ? '2026-09-08' : '2026-09-06', status: 'reviewed-partial', catalogUrls: catalogs[slug],
  reviewedProductUrls: [...new Set([...products.filter(p => p.companySlug === slug).flatMap(p => [p.pageUrl, ...p.rows.map(r => r.sourceUrl)]), ...(slug === 'ouster' ? ['osdome','os0','os1','os1-max'].map(model => `https://data.ouster.io/downloads/datasheets/datasheet-rev8-v4p0-${model}.pdf`) : [])])],
  scope: l('按公开目录、具体型号表和公司原始披露深化；既有记录保留。本次覆盖并不代表所有公开型号、附件或财务历史已完整转录。', 'Deepened from public catalogs, model-specific tables and primary corporate disclosures while preserving existing records. This does not mean every public model, accessory or financial-history item is fully transcribed.'),
  gaps: [...gaps[slug].map(([item, reason]) => ({ item, reason })), { item: 'Financial/funding completeness', reason: 'Only dated primary disclosures explicitly listed are included; missing financials, funding rounds, valuations and customers are not inferred. / 仅收录具名原始披露，不推断缺失财务、融资、估值或客户。' }],
}));

// Parent registers the group and financial sources separately; no shared registry changes here.
export const visionSensingCatalogEnrichment: CatalogEnrichmentGroup = { profiles, products, reviews };
export const visionSensingFinancialDisclosures = [
  { companySlug: 'orbbec', url: orbbecH1, date: '2026-08-22', title: l('2026年半年度报告（未经审计）', '2026 Interim Report (Unaudited)'), locator: 'PDF pages 8-11; consolidated H1 2026, CNY; report page 2 states unaudited' },
  { companySlug: 'ouster', url: ousterQ2, date: '2026-08-06', title: l('2026年第二季度业绩公告', 'Second Quarter 2026 Results'), locator: 'Quarter ended June 30, 2026; condensed consolidated statements; USD thousands unless otherwise stated' },
];
