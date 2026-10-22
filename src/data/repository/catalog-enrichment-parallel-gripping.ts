import type { CatalogEnrichmentGroup, CatalogEnrichmentProduct, CatalogCompanyReview } from './catalog-enrichment-types';
import { l, type TimelineSeed } from './verified-catalog-wave-fourteen-common';
import { waveFifteenProfiles } from './verified-catalog-wave-fifteen-profiles';
import { waveFifteenBackground } from './verified-catalog-wave-fifteen-history';
import data from './catalog-enrichment-parallel-gripping-data.json';
import threeData from './catalog-enrichment-parallel-gripping-three-data.json';
import { grippingOverviewOverride, grippingAtiProfileBlock20261018l } from './catalog-enrichment-gripping-overviews-20260914';
import { inspireFinancingRounds, inspireFinancingTimeline, inspireFinancingBoundary, inspireFinancingGap } from './catalog-enrichment-inspire-financing-20260914';

export const grippingAssignedCompanySlugs = ['inspire-robots','dh-robotics','shadow-robot','kunwei-technology','xela-robotics','gelsight','wonik-robotics','tesollo','qbrobotics','seed-robotics','psyonic','ati-industrial-automation','syntouch','contactile','robotiq','tacterion','weart','onrobot','sake-robotics'] as const;
const products = [...data.products, ...threeData.products] as CatalogEnrichmentProduct[];
const continuation20261018 = data.continuation20261018;
export const grippingSourceManifest = [...data.sources, ...threeData.sources.filter(s => !data.sources.some(old => old.url === s.url))];
const cached = new Set(data.sources.map(s => s.url));
const event = (date: string, kind: TimelineSeed['kind'], sourceUrl: string, zh: string, en: string): TimelineSeed => ({ date, kind, sourceUrl, title: l(zh, en), detail: l(zh, en) });
const inspire = 'https://en.inspire-robots.com/about-us/';
const dh = 'https://en.dh-robotics.com/about';
const tesollo = 'https://www.tesollo.com/company';
const tesolloFinance = 'https://www.tesollo.com/news/press/robot-hand-specialist-tesollo-begins-ipo-process-selects-kb-securities-as-lead-underwriter';
const atiDeal = 'https://investors.novanta.com/news/news-details/2021/Novanta-Announces-Agreement-to-Acquire-ATI/default.aspx';
const atiClose = 'https://www.ati-ia.com/Company/NewsArticle2.aspx?id=1424430123';
const syn = 'https://www.sec.gov/Archives/edgar/data/1728560/000172856019000002/FormC1.pdf';
const robotiqFinance = 'https://blog.robotiq.com/robotiq-gets-a-31m-energy-boost-from-battery-ventures';
const onrobot = 'https://onrobot.com/en/about-us';

type Definition = {
  catalogs: string[];
  about: string;
  domain: string;
  narrative: ReturnType<typeof l>;
  scope: ReturnType<typeof l>;
  gaps: CatalogCompanyReview['gaps'];
};
const gap = (item: string, reason: string, sourceUrl?: string) => ({ item, reason, ...(sourceUrl ? {sourceUrl} : {}) });
const definitions: Record<string, Definition> = {
  'inspire-robots': {
    catalogs: ['https://en.inspire-robots.com/','https://en.inspire-robots.com/product-category/accessories/electrical-parts/','https://en.inspire-robots.com/product-category/accessories/mechanical-parts/'], about: inspire, domain: 'inspire-robots.com',
    narrative: l('因时的产品主线是微型直线伺服执行器、五指灵巧手和电动夹爪；本次补充控制转换器及机械连接附件，附件不计作新的手部型号。英文公司史列出 2024 年苏州工厂投产及近 2,000 只手交付，2025 年 10,000+ 只手出货及微型执行器 100,000 台产能。出货与产能采用不同口径，均不是营收。','Inspire develops miniature linear servo actuators, five-finger hands and electric grippers. This pass adds interface converters and mechanical connectors, not additional hand models. Its English history reports the Suzhou factory opening and nearly 2,000 hand deliveries in 2024, then 10,000+ hand shipments and 100,000-unit actuator capacity in 2025. Shipments and capacity are different measures, neither equivalent to revenue.'),
    scope: l('新增电气/机械附件，保留既有 35 个本体与执行器记录；未宣称重新核完所有尺寸图。','Adds electrical/mechanical accessories and retains 35 prior hand/actuator records; not a fresh audit of every dimension drawing.'),
    gaps: [gap('Accessory image-only specifications','Dimensions, wiring diagrams and environmental fields embedded in images need visual transcription.'),gap('AES-LA-71-0C','STM32 controller title conflicts with the AES-LA-11-06 converter body text; no copied electrical ratings.',insLink('stm32-controller-modelaes-la-71-0c/')),gap('EG2-5C / EG2-4C','Homepage and navigation naming differ; no synthetic EG2-5C configuration generated.'),inspireFinancingGap],
  },
  'dh-robotics': {
    catalogs: ['https://en.dh-robotics.com/products','https://en.dh-robotics.com/product/cg','https://en.dh-robotics.com/news'], about: dh, domain: 'dh-robotics.com',
    narrative: l('大寰把夹持、旋转、直线运动和驱动控制做成相邻产品线。此次按表格原始列拆分 CG、PGHL、RGD、VLA/VLAR、DLARA/DLSR、VLM、电缸及伺服驱动器，并保留导程、编码器、电压和制动选件条件。2026 年 UDH-3-7 展示报道补充三指手能力；展示效果不等于长期可靠性或量产销量。官网累计 200,000+ 台出货及近五年 120% 复合增长均为厂商口径，后者未说明财务指标基数，不能当作收入增长率。','DH spans gripping, rotation, linear motion and drive control. The import separates original columns for CG, PGHL, RGD, VLA/VLAR, DLARA/DLSR, VLM, cylinders and drives while retaining lead, encoder, voltage and brake conditions. The 2026 UDH-3-7 exhibition report adds a three-finger hand, not proof of long-term reliability or volume sales. The company reports 200,000+ cumulative shipments and 120% five-year compound growth; the latter lacks a defined financial base and is not labeled revenue growth.'),
    scope: l('当前可读型号参数表、顶部技术声明及新手报道均已补入；系列声明与型号额定值分开。','Adds readable model tables, top-of-page technical claims and a new hand report; family claims remain separate from model ratings.'),
    gaps: [gap('Full manuals and ordering codes','Most downloadable control, CAD and selection manuals remain unreviewed; table lead options are not complete order codes.'),gap('VLA-30-25 / SAC-NP4','VLA table mixes 24 V supply with 48 V force/current figures. SAC-NP4 repeats four codes across two columns; no arbitrary mapping.'),gap('RGD-5-30 / PGIA-140-80','RGD-5-30 appears in downloads but lacks the reviewed model column. PGIA introductory naming differs from the PGI-140-80 table identity.'),gap('Top-of-page conflicts','PGE/PGEA -30 C introductory claims conflict with 0-40 C tables; general servo intro says 24-bit feedback but table says 23-bit; kept out of numeric indexing.'),gap('UDH-3-7','No full model manual, duty curve, thermal envelope, interfaces or lifecycle validation in the reviewed exhibition report.','https://en.dh-robotics.com/15259.html')],
  },
  'shadow-robot': {
    catalogs: ['https://shadowrobot.com/dexterous-hand-series/'], about: 'https://shadowrobot.com/dexterous-hand-series/', domain: 'shadowrobot.com',
    narrative: l('2025 年 Dexterous Hand 与 Lite 规格书给出控制回路、关节范围、采样位数、主机软件及供电边界。手内电机扭矩回路和腱绳零力保护不等于对外提供关节力矩控制。Extra Lite 与 Super Lite 的网页质量高于该规格书配置表，历史负载不自动覆盖当前版本。','The 2025 Dexterous Hand and Lite specifications provide control loops, joint ranges, sampling bits, host software and power boundaries. Internal motor torque loops and zero-tendon-force protection do not establish an exposed joint-torque control mode. Extra Lite and Super Lite webpage masses exceed those in the document configuration table; historical payloads are not transferred to the current revision.'),
    scope: l('加深四种经典手；保留既有 DEX-EE、传感器与遥操作条目。','Deepens four classic hand configurations; retains prior DEX-EE, sensing and teleoperation entries.'),
    gaps: [gap('Mass discrepancy','Extra Lite: 2.1 kg webpage vs 1.8 kg PDF; Super Lite: 1.8 kg webpage vs 1.2 kg PDF. All affected mass rows excluded.'),gap('Document generations','Current STF 100 Hz versus the 2025 hand document 1000 Hz tactile table is not a proven interchangeable specification.'),gap('Remaining drawings and systems','Dimension drawings, DEX-EE manual revision audit, glove/teleoperation integration documents and system BOM remain partial.'),gap('Power unit omission','The source says 48 V @ 2.5 / 24 V @ 2.5 without the second unit; no current/power inference.')],
  },
  'kunwei-technology': {
    catalogs: ['https://www.kunweitech.com/','https://www.kunweitech.com/products/453.html','https://www.kunweitech.com/products/563.html'], about: 'https://www.kunweitech.com/', domain: 'kunweitech.com',
    narrative: l('本次只加深机器人力觉链路：KWH06C100NL 的 RS422、RS485、CAN 三个信号采集版本按官方型号对应，已有通用名称作为同一产品身份保留，不重复创建 RS422/RS485 产品。KWR18F 表中的接口与部分指标属于配套电子，不能视为裸敏感元件同时具备所有通信接口。','This pass focuses on robotic force-sensing chains. Three KWH06C100NL acquisition versions map to RS422, RS485 and CAN; existing generic names retain their identity without duplicate RS422/RS485 products. Interfaces and some KWR18F metrics belong to acquisition electronics, not all simultaneous interfaces on the bare element.'),
    scope: l('采集模块与机器人相关力传感入口复核；不扩展称重、风洞等非机器人专用目录。','Acquisition modules and robotics force-sensing entries reviewed; no expansion of unrelated weighing or wind-tunnel catalogs.'),
    gaps: [gap('Existing force-sensor families','The prior large sensor catalog is retained, not completely re-audited here. Combined loads, calibration matrices, thermal coefficients and acquisition-module dependencies still require model-manual checks.'),gap('KWR18F20 / KWR18F50','Reviewed the live table; older records retained. Resolution/electronics footnotes and 48 V request-only support must remain conditional.'),gap('Public financing','Current-round announcement pages and entity-level financial statements were not fully re-audited in this pass.')],
  },
  'xela-robotics': {
    catalogs: ['https://xelarobotics.com/products/','https://xelarobotics.com/software/'], about: 'https://xelarobotics.com/about/', domain: 'xelarobotics.com',
    narrative: l('当前目录将 uSPr 夹爪保护型、uSCu 曲面指尖与 uSPa 平面阵列区分，并列出面向 IIT iCub 的合作指尖入口。该入口不附独立订货码，不能套用 ALHA 的几何与量程。创始人简历中的 1.17 亿日元 JST START 资助属于其科研创业经历；另一高管在 AGADE 的 400 万欧元 A 轮也不是 XELA 的融资。','The current catalog separates protected uSPr gripper sensors, curved uSCu fingertips and flat uSPa arrays, including an IIT iCub collaboration entry. That entry has no independent order code and does not inherit ALHA geometry or range. The founder biography lists a JPY 117 million JST START grant in his research/entrepreneurship history; another executive’s EUR 4 million Series A at AGADE is not XELA financing.'),
    scope: l('复核当前集成索引、uSCu 页面与软件入口；新增 iCub 合作能力记录。','Reviews current integrations, uSCu and software entry; adds the iCub collaboration capability.'),
    gaps: [gap('Module catalog refresh','The prior 2025 PDF module records remain; every PDF row and newer ordering code has not been freshly audited.'),gap('uSCu iCub','No numeric range, geometry, taxel count, calibration or exact SKU in the reviewed current index.'),gap('uAi','Software page reviewed; SDK version compatibility, synchronization limits and the complete API/register surface remain unverified.')],
  },
  gelsight: {
    catalogs: ['https://www.gelsight.com/products/','https://www.gelsight.com/product/gelsight-mini-system/','https://github.com/gelsightinc/gsrobotics'], about: 'https://www.gelsight.com/products/', domain: 'gelsight.com',
    narrative: l('本次限定机器人用 Mini、配套套件与官方开发仓库，不继续扩展表面计量仪器镜头目录。Mini 的图像到三维重建比例只适用于指定下采样设置，不是系统准确度；官方仓库明确未公开 Mini 系统准确度。套件包含凝胶、调焦工具及线缆，凝胶配方迭代没有可推断的定量使用寿命。','This pass covers the robotics Mini, its kit and official development repository, without further metrology-lens expansion. The image-to-3D scale applies only to the stated downsampling setting and is not system accuracy; the official repository does not publish Mini system accuracy. The kit includes gel, a focus tool and cable; gel formulation changes do not establish quantitative service life.'),
    scope: l('Mini 证据边界与明确 SKU 套件；计量设备历史记录不删除也不新增非机器人镜头。','Mini evidence boundaries and an explicit-SKU kit; existing metrology records are retained without unrelated lens expansion.'),
    gaps: [gap('DIGIT and R1.5 history','DIGIT availability/licensing and later revisions are not fully resolved; the official repository identifies R1.5 as no longer for sale.'),gap('Robot calibration','Force/pressure calibration, elastic modulus and gel-lifetime test conditions are not complete.'),gap('Repository FAQ discrepancies','0.0632 appears in a question and 0.0634 mm/pixel in the answer; conversion is not indexed as accuracy. FAQ 10 says 25 FPS and FAQ 24 says 24 Hz; prior and new frame-rate fields are excluded.')],
  },
  'wonik-robotics': {
    catalogs: ['https://wonikrobotics.com/en/','https://wonikrobotics.com/en/sub/product/acs.php'], about: 'https://wonikrobotics.com/en/sub/company/history.php', domain: 'wonikrobotics.com',
    narrative: l('公司由 2004 年 SimLab 延续而来，2016 年加入 WONIK 后更名，不应把更名年当创立年。Allegro 手之外还有 AMR、AMMR 与 ACS 调度控制。2025 年公司史列示 V5/V5 Plus 的 CE 认证与联盟合作，但奖项、认证和合作声明均不是财务收入。','The company traces to SimLab in 2004 and was renamed after joining WONIK in 2016; the rename is not its founding. The range extends beyond Allegro hands to AMRs, AMMRs and ACS control. Its 2025 history lists V5/V5 Plus CE certification and alliance cooperation; awards, certification and partnerships are not revenue.'),
    scope: l('复核公司史、主目录并新增 ACS 平台；保留此前手部型号和移动机器人规格。','Reviews history and main catalog, adds the ACS platform, and retains prior hand and mobile-robot specifications.'),
    gaps: [gap('Hand and AMR manuals','V6F, V5 Sense, V5 Plus, V5 and V4 manual revisions, accessories and AMR/AMMR hardware tables not re-audited end to end.'),gap('Financial disclosure','Homepage policy-funding/private-investment aggregate is not treated as an all-equity round; instrument split and standalone financials remain missing.'),gap('Future-dated MOU entry','Homepage dates a Roboligent MOU item 2026-11-25, later than this review. It is not added as a completed event.')],
  },
  tesollo: {
    catalogs: ['https://www.tesollo.com/products'], about: tesollo, domain: 'tesollo.com',
    narrative: l('TESOLLO 的 Delto 系列覆盖一至五指操作器和定制 DG-C，并提供机器人应用集成方案。本次核对所有当前手部页面及所链接硬件手册的基础参数、线序与包装表，单列有独立手册的 DG-5F-M 短腕配置。2026 年 6 月完成 B 轮；IPO 是准备及未来目标，不是已上市。','TESOLLO’s Delto range spans one- to five-finger manipulators, custom DG-C and robot application integration. This pass checks all current hand pages and linked hardware-manual basic specifications, wiring and package tables, separating the independently documented DG-5F-M short wrist. Series B completed in June 2026; IPO preparation and a future target do not establish a completed listing.'),
    scope: l('现有型号保留并加深，新增独立短腕配置与 DS-PICK/DS-ASS/DS-Dual Arm 三个系统；型号别名、系统工况、内部控制/通信速率及过热边界分别标明。','Enriches existing models and adds a documented short-wrist configuration plus DS-PICK, DS-ASS and DS-Dual Arm systems; aliases, system conditions, internal/control rates and overheating boundaries remain explicit.'),
    gaps: [gap('DG-1F naming/current conflict','Page DG-1F says maximum 10 A; linked DG-1F-M manual says 6 A. Alias/version and current need written confirmation.'),gap('Manual diagrams and control software','Joint geometry/range drawings, installation dimensions, full register maps, SDK protocol documents and application control manuals still require review.'),gap('Extraction corrections','Basic-table stall-torque and communication-rate cells were visually checked in all seven manuals. Corrected displays retain raw extractions in their locators; peak and conditional rates remain excluded.'),gap('DG-C / DS solutions / fingertip options','Project-specific specifications and separate sensing/suction module SKUs are not fully published or independently audited.'),gap('DG-3F-B','Historical model whose sales ended in 2025, not a currently available substitute for DG-3F-M.')],
  },
  qbrobotics: {
    catalogs: ['https://qbrobotics.com/products/','https://qbrobotics.com/product/qb-softhand-2-research'], about: 'https://qbrobotics.com/from-its-inception-to-the-first-commercial-prototypes/', domain: 'qbrobotics.com',
    narrative: l('SoftHand2 Research 使用两台电机和两个协同维度协调 19 个机械自由度，不是 19 个独立驱动关节。捏持和包络额定负载分别保留，软件与 CAD 入口说明可用开发资源，不表示套件同时包含所有外设。','SoftHand2 Research coordinates 19 mechanical DoF using two motors and two synergies, not 19 independent actuated joints. Pinch and grasp payload ratings remain separate; software and CAD links identify development resources, not all peripherals included in a kit.'),
    scope: l('加深 SoftHand2 页面；既有主产品、研究套件、电源与安装附件保留。','Deepens the SoftHand2 page; prior main products, research kits, power and mounting accessories remain.'),
    gaps: [gap('Downloads and accessories','Newest SoftHand2 user guide/datasheet, API v6/v7 compatibility, exact kit contents and every accessory CAD revision are not fully audited.'),gap('Commercial status and finance','No new model-specific price/lead-time commitment or complete financial statement established by reviewed pages.')],
  },
  'seed-robotics': {
    catalogs: ['https://www.seedrobotics.com/','https://www.seedrobotics.com/rh8d-adult-robot-hand'], about: 'https://www.seedrobotics.com/about-us', domain: 'seedrobotics.com',
    narrative: l('Seed 的研究手从适配 Darwin-OP 的早期 RH4D 发展到成人、儿童手型与简化操作器；2019 年参与制造 NICO，2020 年发布 FTS 触觉传感系列并迁往里斯本。RH8D 首页和型号页的负载差异继续保留，不以较高数值替代不同抓取条件。','Seed’s research hands evolved from an early RH4D for Darwin-OP to adult/child sizes and simplified manipulators. It helped manufacture NICO in 2019, launched FTS tactile sensors and moved to Lisbon in 2020. RH8D homepage/model-page payload differences remain explicit rather than selecting the higher figure across unlike grasp conditions.'),
    scope: l('复核 RH8D、当前目录及公司史；既有型号/FTS 参数不重复计数。','Reviews RH8D, current catalog and history; existing model/FTS fields are not counted again.'),
    gaps: [gap('RH8D payload','Homepage 750 g versus model page 1 kg remains unresolved for like-for-like conditions; prior conflict exclusion preserved.'),gap('RH6D/RH4D/FTS/NICO','Latest full manuals, sensors and palm-option specifications and current ordering configurations remain partial.'),gap('Financial history','No complete company financial statement or documented new equity round established from reviewed pages.')],
  },
  psyonic: {
    catalogs: ['https://www.psyonic.io/robots'], about: 'https://www.psyonic.io/who-we-are', domain: 'psyonic.io',
    narrative: l('PSYONIC 以 Ability Hand 同时服务假肢和机器人研发；本次限定机器人接口与研究用途，不将临床或假肢附件自动加入机器人配置。官方人物/发展页面所列 2020 年 937,000 美元 NSF Phase II SBIR 是科研资助，不是股权轮次，也不代表机器人产品收入。','PSYONIC serves prosthetics and robotics research with Ability Hand. This pass is limited to robotics interfaces and research, without automatically adding clinical accessories to robotic configurations. The official history lists a USD 937,000 NSF Phase II SBIR award in 2020, a research grant rather than an equity round or robotics revenue.'),
    scope: l('复核机器人与公司入口，保留 2026 年 6 月 REV B 大小手型号规格。','Reviews robotics and company pages, retaining June 2026 REV B size-specific hand specifications.'),
    gaps: [gap('Robotics accessories and SDK','Complete wrist adapters, cables, power/battery options, firmware and simulation-version matrices remain unaudited.'),gap('Funding and statements','Equity funding totals, grant-to-product attribution and current standalone financial statements remain unresolved.')],
  },
  'ati-industrial-automation': {
    catalogs: ['https://ati.novanta.com/products/','https://ati.novanta.com/products/force-torque-sensors/','https://ati.novanta.com/products/tool-changers/','https://ati.novanta.com/products/collision-sensors/','https://ati.novanta.com/products/utility-couplers/','https://ati.novanta.com/products/material-removal-tools/'], about: atiDeal, domain: 'ati.novanta.com',
    narrative: l('ATI 为工业、协作与医疗机器人提供工具快换、力/力矩传感、碰撞保护和材料加工末端工具。Novanta 于 2021 年完成收购。新网站的型号索引、默认规格和标定表存在量程及单位不一致，本次保留所有选定表格单元格但不把冲突传感数据用于数值筛选；不能以默认选项生成任意通信/防护/标定组合。','ATI supplies tool changing, force/torque sensing, collision protection and material-processing end effectors for industrial, collaborative and medical robots. Novanta completed its acquisition in 2021. The new website’s catalog, default specification and calibration tables contain range/unit inconsistencies. This pass retains the selected table cells but excludes conflicting sensor data from numeric filtering; default options do not create arbitrary interface/protection/calibration combinations.'),
    scope: l('逐行导入力传感器、自动/手动快换、碰撞与耦合目录；加深已缓存型号页和标定表。','Imports force-sensor, automatic/manual changer, collision and coupler catalog rows; deepens cached model and calibration tables.'),
    gaps: [gap('Force-sensor conflicts','Nano17 catalog says 500 Nm where detail says 0.5 Nm; torque-resolution values also disagree. Some calibration tables appear to describe another range. All ATI sensor numeric table rows excluded pending original drawings/certificates.'),gap('Model configuration matrices','IP65/IP68 combined rows remain family variants; no unsupported cross-product of interfaces, cables, plates or calibrations.'),gap('Remaining product families','Full utility-coupler detail pages, material-removal spindles/grinders/blades/files, force-control/compliance devices, tool-changing modules and part-number accessory datasheets remain incomplete.'),gap('Financial follow-through','The 2021 transaction announcement gives upfront cash and expected revenue, not realized full-year ATI revenue; purchase accounting, contingent consideration and later segment attribution still require filings.')],
  },
  syntouch: {
    catalogs: ['https://syntouchinc.com/',syn], about: 'https://syntouchinc.com/', domain: 'syntouchinc.com',
    narrative: l('SynTouch 的 BioTac 与 BioTac SP 是机器人指尖触觉的不同代际，历史 Toccare 材料评价不能替代标定力测量。SEC 2019 年 Form C-AR 明确区分 2008 年加州 LLC 成立、2016 年特拉华 C 公司重组，以及 SynTouch Inc. 与全资 LLC 的合并报表。本次财务信息仅为 2017/2018 历史披露，不能描述当前偿付或经营情况。','SynTouch BioTac and BioTac SP are distinct robotic tactile-sensor generations; historical Toccare material evaluation is not calibrated force measurement. Its 2019 SEC Form C-AR distinguishes the 2008 California LLC, 2016 Delaware C-corporation reorganization and consolidated Inc./wholly owned LLC accounts. Financial information here concerns historical 2017/2018 disclosures, not current solvency or operations.'),
    scope: l('保留历史传感手册；新增官方监管披露与公司沿革，当前官网仍受限。','Retains historical sensor manuals and adds regulatory financial/history evidence; the current site remains access-limited.'),
    gaps: [gap('Current availability','Current BioTac/BioTac SP/NumaTac ordering, support, skin consumables and successor products not established.'),gap('Financial continuity','Later Form C-AR filings, recent financial statements and corporate status not established; FY2018 is explicitly unaudited.'),gap('SEC local cache','SEC PDF was verified through web retrieval; direct local download returned HTTP 403. No SHA-256 is invented.',syn)],
  },
  contactile: {
    catalogs: ['https://contactile.com/products/'], about: 'https://contactile.com/about-contactile/', domain: 'contactile.com',
    narrative: l('Contactile 的产品从局部三维位移/力/振动测量扩展到滑移、摩擦估计与触觉原生 GAL2 夹爪。本次增加可连接五个传感器的开发板入口并补全 PapillArray 套件功能。网页标为 coming soon 的薄型阵列及三维力/力矩方案不视为已交付产品；UNSW 源头项目资助不等于公司融资。','Contactile combines local 3D displacement/force/vibration with slip/friction estimation and its tactile-native GAL2 gripper. This pass adds the development-board entry for five sensors and enriches PapillArray kit functions. Slim arrays and force/torque offerings labeled coming soon are not treated as shipped products; funding for originating UNSW research is not company equity financing.'),
    scope: l('当前产品目录、开发板与套件；原有 18 个传感配置与 GAL2 保留。','Current catalog, development board and kit; retains prior 18 sensor configurations and GAL2.'),
    gaps: [gap('Development board','No exact SKU, power, sample-rate, protocol, dimensions or enclosure specification in the reviewed index.'),gap('Upcoming versus available','Slim tactile arrays and upcoming force/torque products have no established current model specifications.'),gap('Sensor/manual revisions','Full GAL2 and 3DFBS/PapillArray manual revisions and calibration limits not re-audited in this pass.')],
  },
  robotiq: {
    catalogs: ['https://robotiq.com/products/vacuum-grippers'], about: robotiqFinance, domain: 'robotiq.com',
    narrative: l('Robotiq 以夹爪、真空抓取、传感与工艺软件组成协作机器人应用，并提供码垛等系统方案。已有目录中本体、应用套件、力控软件和支架配置继续分开，不把整套系统负载转为裸夹爪参数。2018 年公告明确 Battery Ventures 投资为 3,100 万加元，不能标成美元。','Robotiq combines grippers, vacuum handling, sensing and process software for collaborative-robot applications, including palletizing systems. Existing body, application-kit, force-software and support-structure records remain separate; system payload does not transfer to a bare gripper. The 2018 Battery Ventures announcement explicitly states CAD 31 million, not US dollars.'),
    scope: l('复核真空产品入口与融资公告；已有完整度较高的夹爪、工具和应用记录保留，不重复计数。','Reviews vacuum-product entry and financing release; prior detailed gripper/tool/application records are retained without duplicate counting.'),
    gaps: [gap('Product detail revalidation','All current 2F, Hand-E/C10, PowerPick/Multi, EPick/AirPick, FT, camera and palletizer manual/CAD revisions remain only partially refreshed.'),gap('Duplicated webpage sections','Vacuum page includes repeated/unrelated specification blocks; those were not blindly assigned across products.'),gap('Financial reporting','Later rounds, revenue, profitability and consolidated statements not established from the reviewed company release.')],
  },
  tacterion: {
    catalogs: ['https://www.tacterion.com/','https://www.tacterion.com/ipm'], about: 'https://www.tacterion.com/company/history', domain: 'tacterion.com',
    narrative: l('tacterion 将柔性 plyon 传感、读取电子及集成模块用于接触交互。公司史在 2020 年记载 taroki 触觉机器人夹爪套件，2022 年记载 skillflow 与装配过程软件；IPM 电动工具按钮参考设计不是独立机器人手型号。本次不扩展无机器人关联的家电/园艺零件。','tacterion combines flexible plyon sensors, readout electronics and integrated contact modules. Its history records the taroki tactile robotic gripper kit in 2020 and skillflow/assembly software in 2022. IPM power-tool button reference designs are not robot-hand models. This pass does not expand unrelated appliance/gardening parts.'),
    scope: l('复核目录、IPM 与公司史，新增 taroki 历史平台；既有传感器件保持。','Reviews catalog, IPM and history, adding the historical taroki platform while retaining prior sensors.'),
    gaps: [gap('taroki','Only historical development evidence; current supply and full technical specification not established.'),gap('plyon and readout','All plyon flex/stretch revisions, readout-board circuits, IPM combinations and skillflow SDK limits not fully audited.'),gap('Financing amounts','Official history names 2016 backing and 2021 Series A investors without amounts; no valuation inferred.')],
  },
  weart: {
    catalogs: ['https://weart.it/haptic-vr-products/','https://weart.it/touchdiver-pro-haptic-gloves/'], about: 'https://weart.it/about-weart/', domain: 'weart.it',
    narrative: l('WEART 源于锡耶纳大学机器人与自动化研究，2018 年与 e-Novia 创建公司，业务是触觉反馈硬件和软件。TouchDIVER 系列可服务遥操作和仿真，温度、压力与纹理反馈不等同于机器人夹持力。2020 年官网 pre-seed 数额写为 750k 而未标币种，2023 年列示 CDP Venture Capital 投资但没有金额。','WEART grew from robotics/automation research at Siena and was founded with e-Novia in 2018 to supply haptic hardware/software. TouchDIVER supports teleoperation and simulation; thermal, pressure and texture feedback are not robot gripping force. The official 2020 pre-seed figure is 750k without a currency, and the 2023 CDP Venture Capital entry gives no amount.'),
    scope: l('复核当前触觉产品和公司路线图；保留 TouchDIVER Pro/G1 与 TouchKEY+，不虚构新版本。','Reviews current haptics and corporate roadmap, retaining TouchDIVER Pro/G1 and TouchKEY+ without synthetic versions.'),
    gaps: [gap('Teleoperation integration','Complete SDK release matrix, tracking calibration, robot mapping and every glove configuration remain incomplete.'),gap('Funding currency','750k currency is unspecified in cited roadmap; no conversion or inferred total.'),gap('Business financials','Current standalone financial statements not established from the reviewed pages.')],
  },
  onrobot: {
    catalogs: ['https://b2b.onrobot.com/grippers1/','https://learn.onrobot.com/en/products-and-applications'], about: onrobot, domain: 'onrobot.com',
    narrative: l('当前 OnRobot A/S 于 2018 年由 On Robot、OptoForce 与 Perception Robotics 合并形成；2015 年是前身 On Robot 的成立年。公司把统一机械/电气连接、末端工具和 D:PLOY 应用软件组合，并通过合作伙伴交付系统。并购 Purple Robotics、取得 RAGNAR 技术权利与产品发布分属不同事件，不能从技术收购推断当前仍出售 RAGNAR 本体。','The current OnRobot A/S formed in 2018 by merging On Robot, OptoForce and Perception Robotics; 2015 refers to predecessor On Robot. Its offering combines unified mechanical/electrical connections, end-of-arm tools and D:PLOY software with partner-delivered systems. Purple Robotics acquisition, RAGNAR technology rights and product launches are separate events; acquiring technology does not prove current RAGNAR robot sales.'),
    scope: l('复核当前夹爪索引和公司史；既有末端、传感、升降、工具快换及应用软件保持。','Reviews current gripper index and history, retaining prior end effectors, sensing, lifts, tool changing and application software.'),
    gaps: [gap('Full source refresh','B2B matrix reviewed, but every tool manual, SG base/accessory, Eyes/HEX, lift and D:PLOY application revision not re-audited.'),gap('Predecessor funding','2016 investment belongs to predecessor history, with no amount; not a new 2018-current company equity total.'),gap('Standalone financials','Complete current statutory accounts and segment/order attribution not established.')],
  },
  'sake-robotics': {
    catalogs: ['https://sakerobotics.com/'], about: 'https://sakerobotics.com/', domain: 'sakerobotics.com',
    narrative: l('SAKE 的公开机器人主线是欠驱动 EZGripper 与平台适配套件。夹爪机械本体、DYNAMIXEL 驱动及 Unitree G1 安装组合要分别识别，质量与承载受安装件及捏持/包络方式影响。本次没有从宣传演示推断额外客户、交付规模或融资。','SAKE’s public robotics range centers on underactuated EZGripper and platform integration kits. The mechanical gripper, DYNAMIXEL drive and Unitree G1 mounting kit are distinct; mass and payload depend on mounts and pinch/envelop grasp. This pass does not infer customers, delivery scale or funding from demonstrations.'),
    scope: l('复核当前官网与既有 Gen2/G1 套件记录；未重复创建同名本体。','Reviews the current site and prior Gen2/G1 kit records without duplicate base products.'),
    gaps: [gap('Generation and kit BOM','Current orderable generation, Unitree G1 kit BOM, mounting mass and included electronics need model-specific confirmation.'),gap('Mechanical/electrical details','Full stroke/force curves, long-duty limits, transmission parts, firmware and current datasheets remain incomplete.'),gap('History and finance','Dated founding/product/financing history and financial statements not established by the reviewed homepage.')],
  },
};
function insLink(path: string) { return `https://en.inspire-robots.com/product/${path}`; }

// Follow-up boundaries replace obsolete first-handoff gaps, not historical evidence.
definitions.tesollo.scope = l('补齐七份硬件手册的关节范围图、图示尺寸与安装接口；增列手册明确提供的 DG-5F-S 15-DoF 配置。逐型号补充通讯、GPIO/RTU 限制和寄存器能力，并保留完整协议/SDK 链接。','Adds joint ranges, illustrated dimensions and mounting interfaces from seven hardware manuals, plus the explicitly offered DG-5F-S 15-DoF configuration. Adds model-specific communication, GPIO/RTU restrictions and register capabilities, retaining complete protocol/SDK links.');
definitions.tesollo.gaps = definitions.tesollo.gaps.filter(g => g.item !== 'Manual diagrams and control software');
definitions.tesollo.gaps.push(gap('Remaining drawing details','All joint-range diagrams and major reference-pose dimensions are extracted. Fine adapter machining dimensions, every left-hand dimensional callout and full CAD tolerance stacks remain untranscribed. DG-5F-S page 17 heading says 20-DoF Left after 15-DoF Right on page 16; do not silently relabel it.','https://cdn.tesollo.com/site/docs/2026/08/10a30190-9e90-4732-8254-378badcdc4b0.pdf'));
definitions['ati-industrial-automation'].scope = l('补齐 CDB/CRT、17 个加工工具选择器型号及 U1-050、3 个 L1X、15 个 RCC 型号全部网页技术表。核查 CDB/CRT/PCFC/U1/L1X-063 手册主规格、RCC 全型号承载/尺寸矩阵及 5 型剪切垫；电气、气源、安装和冲突分开记录。','Adds all web technical rows for CDB/CRT, 17 exact material-tool selector variants, U1-050, three L1X and fifteen RCC variants. Reviews main CDB/CRT/PCFC/U1/L1X-063 manual specifications, full RCC capacity/size matrices and five shear pads; electrical, pneumatic, mounting and conflicting values remain separate.');
definitions['ati-industrial-automation'].gaps = definitions['ati-industrial-automation'].gaps.filter(g => g.item !== 'Remaining product families');
definitions['ati-industrial-automation'].gaps.push(
  gap('Material-tool conflicts','RCE-230/710 tables cross power/speed mappings; all their table numbers excluded. CDB webpage/manual differ on mass, radial force and axial-travel notation; CRT recommended travel differs; PCFC C force upper bound is 260 N webpage versus 242.9 N manual. Both sources retained.','https://ati.novanta.com/product/radial-compliant-deburring-spindles/'),
  gap('Remaining current tables','All three current compliance-device families now have their offered web tables extracted. Tool-changer-module landing page has no technical tables or individual ordering-model links in the reviewed content, not a cached untranscribed table. Utility-coupler detail pages, L1X-125-H dedicated manual and remaining accessory drawing dimensions are still partial.','https://ati.novanta.com/products/tool-changers/tool-changer-modules/'),
  gap('Compliance-device source conflicts','RCC web tables repeat Cocking Capacity with N units and leave Lateral Capacity blank; exact manual load/stiffness matrix preserved separately. U1 web travel 2.8 mm/mass 0.635 kg versus manual +/-2.7 mm/0.6 kg with sensor. L1X-063 manual states -30 C versus web -29 C minimum. Original source differences are excluded from numeric filters.','https://ati.novanta.com/wp-content/uploads/sites/2/2025/05/9610-15-1000.pdf'),
);
definitions['xela-robotics'].scope = l('复核全部本次定位的现行模块页，补齐四份现行链接规格书的基础、H/L 灵敏度及噪声表，并加入迟滞、标定与安装条件。保留旧型号身份，单列明确命名的 eWSEGI。','Reviews all located current module pages and adds basic, H/L sensitivity and noise tables from four currently linked datasheets, plus hysteresis, calibration and mounting conditions. Preserves prior identities and separately records explicitly named eWSEGI.');
definitions['xela-robotics'].gaps = definitions['xela-robotics'].gaps.filter(g => !['Module catalog refresh','uSCu iCub'].includes(g.item));
definitions['xela-robotics'].gaps.push(
  gap('uSPr identity and missing sheets','Current uSPr 2F links the sheet naming uSPr eF2; retained on the same family identity with conditions. eWSEGI is not automatically equated with WSG 50. HE35, WSG50 and DS pages provide common family copy but no separate linked numeric sheet in the reviewed content.','https://xelarobotics.com/products/uspr-wsg50/'),
  gap('iCub not for sale','Exact IIT/iCub fingertip is explicitly not for sale or replication under the exclusive collaboration; generic page force/taxel claims are not assigned to it.','https://xelarobotics.com/products/uscu-collaboration-with-iit/'),
  gap('Geometry and generic claims','uSPa11/44 dimensions differ from prior catalog. Family-level 500 Hz/0.1 gf/1500 gf claims do not replace model, axis and sensitivity-specific sheets. Full CAD dimensions and individual calibration accuracy still need review.','https://xelarobotics.com/wp-content/uploads/2025/12/uSPa46_Specsheet_Jul_2025.pdf'),
);
definitions.gelsight.scope = l('补充 Mini Robotics Package、DIGIT DG-01 和 Meta/GelSight Digit 360 研究平台身份；DIGIT 视频模式有官方接口代码依据，但 README 与代码的默认值冲突。','Adds Mini Robotics Package, DIGIT DG-01 and Meta/GelSight Digit 360 research-platform identities. DIGIT video modes are supported by official interface code, while README/code defaults conflict.');
definitions.gelsight.gaps.push(gap('Digit 360 current supply and specifications','Research call is not a stocked GelSight SKU. Detailed multimodal accuracy/bandwidth, commercial ordering and hardware revision remain partial; linked Meta publication retrieval was throttled.','https://github.com/facebookresearch/digit360'));
definitions['kunwei-technology'].scope = l('在 KWH06C100NL 三型基础上，补齐 KWH00C100LEC/LEN、LEN-ME、KWH06C70NLA、100HL 三型和 106NE 两型的全部官网技术表；不添加已有同名型号。','Adds all official technical rows for KWH00C100LEC/LEN, LEN-ME, KWH06C70NLA, three 100HL and two 106NE models beyond the three 100NL versions, without duplicating existing names.');
definitions.tacterion.scope = l('补齐当前 flex Devkit 技术表和 BOM，新增 D02 板的明确套件身份；stretch 新套件不继承 D01 电气尺寸。taroki 仍仅为历史平台。','Adds the current flex Devkit technical table/BOM and D02 kit-component identity. Updated stretch kit does not inherit D01 electrical/dimensional specifications. taroki remains historical.');
definitions.tacterion.gaps.push(gap('D02 and availability','No separate D02 dimensions/sample-rate table on current devkit page; page simultaneously displays 4-6 week lead time and out-of-stock wording, so current availability is unresolved.','https://www.tacterion.com/product/devkit'));
definitions.weart.gaps.push(gap('Haptic Totems scope exclusion','Reviewed page describes museum/event/branded-space audiovisual haptics, not robot control or manipulation; not added as a robotics product solely for its haptic capability.','https://weart.it/haptic-vr-products/haptic-totems/'));
definitions['sake-robotics'].catalogs.push('https://sakerobotics.com/store/','https://sakerobotics.com/support/');
definitions['wonik-robotics'].scope = l('保留手部与移动机器人记录，补充 ACS；BCU 和 Charging Station 的官方 data-url 弹窗表分别提取 21 与 4 行。BCU 为自动换电及充电系统，按能源补给系统分类，不按缩写推定为电池控制板。','Retains hand and mobile-robot records, adds ACS, and extracts 21 BCU plus four Charging Station rows from official data-url popups. BCU is an automatic battery-replacement and charging system, classified as energy replenishment rather than an acronym-inferred battery-control board.');
definitions['wonik-robotics'].gaps.push(gap('BCU and Charging Station conditions','BCU capacity cell says 25V 100A, not Ah; do not infer 100 Ah. Battery specifications/slot count are configurable and 24-hour operation is not single-battery endurance. Charging Station standards text is concatenated/truncated and is not a verified certificate.','https://wonikrobotics.com/en/sub/product/function_pop.php?idx=32'));
definitions['seed-robotics'].catalogs.push('https://www.seedrobotics.com/rh5d-rh7d-childsize-robot-hand','https://www.seedrobotics.com/rh4d-advanced-manipulator','https://www.seedrobotics.com/fts-tactile-pressure-sensors','https://www.seedrobotics.com/nico-robot');

const profiles: CatalogEnrichmentGroup['profiles'] = {};
for (const slug of grippingAssignedCompanySlugs) {
  const d = definitions[slug], previous = waveFifteenProfiles[slug];
  const background = waveFifteenBackground[slug];
  const timeline = (background?.timeline ?? []).filter(e => cached.has(e.sourceUrl));
  profiles[slug] = {
    aboutUrl: slug === 'robotiq' ? 'https://robotiq.com/about' : d.about,
    overview: grippingOverviewOverride(slug) ?? (threeData.overviews as Record<string, Array<{zh:string;en:string}>>)[slug]?.map(p => l(p.zh,p.en)) ?? [...(previous ? [previous.route, previous.business] : []), d.narrative],
    catalogScope: d.scope,
    verificationFocus: l('逐项确认型号、版本、附件、载荷条件、来源冲突和当前供货；本次覆盖状态见公司复核记录。','Confirm exact model, revision, accessories, loading conditions, source conflicts and current supply; consult the company review for actual coverage.'),
    timeline,
    investmentView: [l('产品目录、科研资助、合作与产能不是经审计营收；未公开金额、利润和估值不补算。','Catalog breadth, grants, partnerships and production capacity are not audited revenue; undisclosed funding, profit and valuation are not estimated.')],
  };
}
for (const [slug, additions] of Object.entries(continuation20261018.profileAdditions)) {
  profiles[slug].overview = [...(profiles[slug].overview ?? []), ...additions];
}
// Four bounded history sources; the cached 1997 event above remains the existing founding record.
const shadowHistory20261018 = data.continuation20261018e.shadowHistory;
profiles['shadow-robot'].aboutUrl = shadowHistory20261018.aboutUrl;
profiles['shadow-robot'].founded = shadowHistory20261018.founded;
profiles['shadow-robot'].timeline = [...(profiles['shadow-robot'].timeline ?? []), ...(shadowHistory20261018.timeline as TimelineSeed[])].sort((a, b) => a.date.localeCompare(b.date));
// Bounded XELA biography dates; preserve the existing 2018-08 founding event.
profiles['xela-robotics'].timeline = [...(profiles['xela-robotics'].timeline ?? []), ...(data.continuation20261018f.xelaTimeline as TimelineSeed[])].sort((a, b) => a.date.localeCompare(b.date));
profiles['inspire-robots'].timeline = [
  event('2016','founding',inspire,'在北京成立并完成初代原型。','Founded in Beijing and completed its first-generation prototype.'),
  event('2020','product',inspire,'发布 30-50 mm 行程微型直线执行器。','Launched miniature linear actuators with 30-50 mm strokes.'),
  event('2024','business',inspire,'苏州工厂投产；公司列示近 2,000 只灵巧手交付。','Suzhou factory entered production; the company reports nearly 2,000 hand deliveries.'),
  event('2025','business',inspire,'公司列示 10,000+ 只手出货、100,000 台执行器产能及北京 10,000 平方米总部投入运营。','The company reports 10,000+ hand shipments, 100,000-unit actuator capacity and a 10,000 m2 Beijing headquarters entering operation.'),
  ...inspireFinancingTimeline,
].sort((a, b) => a.date.localeCompare(b.date));
profiles['inspire-robots'].funding = inspireFinancingRounds;
// The old 2025 Pre-A+ extraction error is retained in before.json and the dated handoff.
export const grippingFundingConflicts: Array<{ companySlug: string; status: string; sourceClaims: Array<{ date: string; round: ReturnType<typeof l>; sourceUrl: string }>; boundary: ReturnType<typeof l> }> = [];
profiles['inspire-robots'].investmentView!.push(inspireFinancingBoundary);
profiles['dh-robotics'].timeline = [
  event('2026-08-05','product','https://en.dh-robotics.com/15259.html','公布 UDH-3-7 三指手的 WAIC 展示及型号能力。','Published UDH-3-7 three-finger-hand capabilities and WAIC demonstration.'),
];
profiles['wonik-robotics'].timeline!.push(event('2026-05-27','product','https://wonikrobotics.com/en/','官网社交动态列示 Allegro Hand V5 Sense 正式发布。','Official social-feed index records the Allegro Hand V5 Sense launch.'));
profiles.tesollo.founded = '2019-01';
profiles.tesollo.timeline = [
  event('2019-01','founding',tesollo,'TESOLLO Inc. 成立。','TESOLLO Inc. was founded.'),
  event('2020-07','business',tesollo,'建立研发中心。','Established an R&D center.'),
  event('2021-10','business',tesollo,'签署三指关节夹爪技术转让合同。','Signed a technology-transfer contract for a three-finger articulated gripper.'),
  event('2022-01','product',tesollo,'商用发布 12 自由度 DG-3F。','Commercially launched the 12-DoF DG-3F.'),
  event('2023-01','business',tesollo,'启动手与夹爪专用执行器的内部研发。','Began in-house development of dedicated hand/gripper actuators.'),
  event('2024-10','product',tesollo,'在 IROS 首次展示 20 自由度 DG-5F。','First unveiled the 20-DoF DG-5F at IROS.'),
  event('2025-03','product',tesollo,'商用发布 DG-5F。','Commercially launched DG-5F.'),
  event('2026-03','product',tesollo,'全球发布轻量紧凑 DG-5F-S。','Globally launched the compact lightweight DG-5F-S.'),
  event('2026-03','business',tesolloFinance,'选定 KB Securities 为 IPO 主承销商；目标为 2027 年后上市，未视为完成上市。','Selected KB Securities as IPO lead underwriter; listing after 2027 is a target, not a completed listing.'),
  event('2026-06','funding',tesolloFinance,'完成 B 轮，金额未在该公告披露。','Completed Series B; the cited release gives no amount.'),
  event('2026-07','business',tesollo,'扩建并迁移生产设施。','Expanded and relocated production facilities.'),
];
profiles.tesollo.funding = [{date:'2026-06',round:l('B 轮','Series B'),amount:l('公告未披露','Not disclosed in the release'),investors:l('POSCO Technology Investment、KB Investment、Enlight Ventures；战略投资方 Daesung Hi-Tech、HL Mando','POSCO Technology Investment, KB Investment, Enlight Ventures; strategic investors Daesung Hi-Tech and HL Mando'),sourceUrl:tesolloFinance}];
profiles['ati-industrial-automation'].founded = '1989';
profiles['ati-industrial-automation'].timeline = [
  event('1989','founding',atiDeal,'ATI 成立；成立年由收购公告确认。','ATI founded; founding year confirmed in the acquisition release.'),
  event('2021-07-19','business',atiDeal,'Novanta 宣布收购协议：1.72 亿美元前期现金，另有业绩挂钩现金及绩效股权；不是 ATI 融资轮。','Novanta announced an acquisition agreement with USD 172 million upfront cash plus performance-linked cash and equity incentives, not an ATI financing round.'),
  event('2021-08-31','business',atiClose,'ATI 公告确认 Novanta 完成收购。','ATI confirmed that Novanta completed its acquisition.'),
];
profiles['ati-industrial-automation'].businessAreas = grippingAtiProfileBlock20261018l.businessAreas.map(({ zh, en }) => l(zh, en));
profiles['ati-industrial-automation'].customerGroups = grippingAtiProfileBlock20261018l.customerGroups.map(({ zh, en }) => l(zh, en));
profiles['ati-industrial-automation'].timeline = [...profiles['ati-industrial-automation'].timeline!, ...grippingAtiProfileBlock20261018l.timeline].sort((a, b) => a.date.localeCompare(b.date));
profiles.syntouch.founded = '2008-07-10';
profiles.syntouch.timeline = [
  event('2008-07-10','founding',syn,'SynTouch LLC 在加州成立。','SynTouch LLC formed in California.'),
  event('2016-02-17','business',syn,'重组为特拉华 C 公司；同年 5 月 16 日 LLC 持有人转换为公司持股。','Reorganized as a Delaware C corporation; LLC ownership converted to corporate holdings on May 16 of that year.'),
  event('2019-04-30','business',syn,'Form C-AR 披露 2017/2018 合并财务数据；2018 报表未经审计。','Form C-AR disclosed consolidated 2017/2018 financial data; FY2018 statements were unaudited.'),
];
profiles.robotiq.funding = [{date:'2018-12-11',round:l('首次外部投资（公司表述）','First external investment (company description)'),amount:'CAD 31 million',investors:l('Battery Ventures','Battery Ventures'),sourceUrl:robotiqFinance}];
profiles.robotiq.timeline = [event('2018-12-11','funding',robotiqFinance,'公布 Battery Ventures 投资 3,100 万加元。','Announced CAD 31 million investment from Battery Ventures.')];
profiles.onrobot.founded = '2018';
profiles.onrobot.timeline = [
  event('2015','business',onrobot,'前身 On Robot 成立；不等于合并后 OnRobot A/S 的成立年。','Predecessor On Robot founded; not the founding year of merged OnRobot A/S.'),
  event('2018','founding',onrobot,'OnRobot A/S 成立。','OnRobot A/S was founded.'),
  event('2018','business',onrobot,'On Robot、OptoForce 与 Perception Robotics 合并。','On Robot, OptoForce and Perception Robotics merged.'),
  event('2018','business',onrobot,'收购 Purple Robotics 的双真空夹爪技术业务。','Acquired Purple Robotics and its dual-vacuum-gripper technology.'),
  event('2019','business',onrobot,'取得 RAGNAR 技术权利并吸纳原 Blue Workforce 部分人员。','Acquired RAGNAR technology rights and hired part of the former Blue Workforce team.'),
  event('2019','product',onrobot,'发布 VGC10 与统一机械/电气连接系统。','Launched VGC10 and the unified mechanical/electrical connection system.'),
  event('2020','product',onrobot,'组合新增 3FG15、Soft Gripper、2FG7、Eyes、Screwdriver 与 Sander。','Added 3FG15, Soft Gripper, 2FG7, Eyes, Screwdriver and Sander.'),
  event('2021','product',onrobot,'推出 WebLytics、LEARN、MG10 与 VGP20。','Introduced WebLytics, LEARN, MG10 and VGP20.'),
  event('2022','product',onrobot,'推出 LIFT100 与 2FGP20。','Introduced LIFT100 and 2FGP20.'),
  event('2023','product',onrobot,'推出 D:PLOY。','Introduced D:PLOY.'),
  event('2024','business',onrobot,'与集成伙伴提供基于 D:PLOY 的现成应用系统。','Offered D:PLOY-based off-the-shelf systems with integration partners.'),
  event('2025','product',onrobot,'推出 VGP30 气动真空夹爪。','Introduced the VGP30 pneumatic vacuum gripper.'),
];

// This schema has no financial-statement field. Export source-bounded disclosures
// separately for parent registration rather than disguising them as funding.
export const grippingFinancialDisclosures = [
  {
    companySlug: 'syntouch', sourceUrl: syn, locator: 'PDF page 1, fiscal 2018/2017 consolidated financial table; page 3, unaudited FY2018 warning', sha256: null,
    title: l('SynTouch 2018 年年度报告（Form C-AR 附件 A）','SynTouch Annual Report 2018 (Exhibit A to Form C-AR)'),
    publishedAt: null, documentDate: '2019-04-30', documentKind: 'annual-report',
    publicationDateBasis: l('报告封面日期为 2019-04-30；独立发布及 SEC 接收日期未核实。','Cover date is 2019-04-30; independent publication and SEC acceptance dates remain unverified.'),
    period: 'FY2018 / FY2017', currency: 'USD', audited: false,
    boundary: l('SynTouch Inc. 与 SynTouch LLC 合并；历史报表，2018 年未经审计。SEC 浏览核验可读，本地下载 403，未填写哈希。','Consolidated SynTouch Inc. and LLC historical accounts; FY2018 unaudited. SEC web retrieval was readable but local download returned 403, so no hash is supplied.'),
    rows: [
      {metric:l('总资产','Total assets'),fy2018:2377879.08,fy2017:862183.70},
      {metric:l('现金及现金等价物','Cash and cash equivalents'),fy2018:938002.78,fy2017:299215.17},
      {metric:l('应收账款','Accounts receivable'),fy2018:356239.89,fy2017:163046.64},
      {metric:l('短期债务','Short-term debt'),fy2018:13272.09,fy2017:373825.08},
      {metric:l('长期债务','Long-term debt'),fy2018:0,fy2017:950000},
      {metric:l('收入/销售额','Revenue / sales'),fy2018:1853589.91,fy2017:1429466.34},
      {metric:l('销售成本','Cost of goods sold'),fy2018:1287278.27,fy2017:1279896.95},
      {metric:l('已付税金','Taxes paid'),fy2018:2492.61,fy2017:0},
      {metric:l('净利润（亏损为负）','Net income (loss negative)'),fy2018:-255752.54,fy2017:-680635.94},
    ],
  },
  {
    companySlug:'ati-industrial-automation',sourceUrl:atiDeal,locator:'July 19, 2021 acquisition release; transaction terms and full-year revenue expectation',sha256:data.sources.find(s=>s.url===atiDeal)!.sha256,
    title:l('Novanta 宣布达成收购 ATI 协议','Novanta Announces Agreement to Acquire ATI'),
    publishedAt:'2021-07-19',documentDate:'2021-07-19',documentKind:'acquisition-release',
    publicationDateBasis:l('公告正文标题下的发布日期；不是全年财务报表。','Publication date shown below the release title; not a full-year financial statement.'),
    period:'2021 announcement',currency:'USD',audited:false,
    boundary:l('收购前期现金 172,000,000 美元；另有未量化或附条件对价。2021 全年收入 >70,000,000 美元是公告时预期，不是已实现收入，也不是 Novanta 集团营收。','USD 172,000,000 upfront acquisition cash plus unquantified/contingent consideration. Full-year 2021 revenue >USD 70,000,000 was an announcement-date expectation, not realized revenue or Novanta group revenue.'),
    upfrontCash:172000000,expectedFullYearRevenueLowerBound:70000000,expectationOnly:true,
  },
];
profiles.syntouch.investmentView!.push(l('2018 年历史合并收入 1,853,589.91 美元、净亏损 255,752.54 美元；2017 年收入 1,429,466.34 美元、净亏损 680,635.94 美元。来源为 2019 年 Form C-AR，2018 年未经审计。','Historical consolidated FY2018 revenue was USD 1,853,589.91 with a USD 255,752.54 net loss; FY2017 revenue was USD 1,429,466.34 with a USD 680,635.94 net loss. Source: 2019 Form C-AR; FY2018 unaudited.'));
profiles['ati-industrial-automation'].investmentView!.push(grippingFinancialDisclosures[1].boundary);

const reviews: CatalogCompanyReview[] = grippingAssignedCompanySlugs.map(slug => {
  const d=definitions[slug];
  const urls=data.sources.map(s=>s.url).filter(url=>url.includes(d.domain) && (/\/product|\/robots|\/ipm|\/acs|\/rh8d|\/software|\/solutions\/|haptic|grippers1|\.pdf/.test(url)));
  if(slug==='sake-robotics')urls.push('https://sakerobotics.com/');
  if(slug==='gelsight')urls.push('https://github.com/gelsightinc/gsrobotics');
  const additionalSources = (continuation20261018.reviewedSources as Record<string, string[]>)[slug] ?? [];
  const additionalGaps = (continuation20261018.gaps as Record<string, CatalogCompanyReview['gaps']>)[slug] ?? [];
  const replacedGap = slug === 'qbrobotics' ? 'Downloads and accessories' : slug === 'wonik-robotics' ? 'Hand and AMR manuals' : null;
  const gaps = additionalGaps.length ? [...d.gaps.filter(g => g.item !== replacedGap), ...additionalGaps] : d.gaps;
  return {slug,reviewedAt:additionalSources.length ? '2026-10-18' : '2026-09-06',catalogUrls:d.catalogs,reviewedProductUrls:[...new Set([...urls,...products.filter(p=>p.companySlug===slug).map(p=>p.pageUrl),...additionalSources])],status:'reviewed-partial',scope:d.scope,gaps};
});

export const grippingCatalogEnrichment: CatalogEnrichmentGroup = { profiles, products, reviews };

// Audit keys describe the former records, not lookups against corrected history.
export const grippingTimelineOverrides = [
  ...([
    ['seed-robotics','2019','product','https://www.seedrobotics.com/about-us','与汉堡大学合作制造开源 NICO 平台。','Collaborated with the University of Hamburg to manufacture the open-source NICO platform.'],
    ['seed-robotics','2020','founding','https://www.seedrobotics.com/about-us','迁往里斯本，扩大工作及制造空间。','Relocated to Lisbon with larger workspace and manufacturing facilities.'],
    ['qbrobotics','2015','founding','https://qbrobotics.com/from-its-inception-to-the-first-commercial-prototypes/','迁入 Navacchio 科技园，扩大研发及原型制造条件。','Moved to the Navacchio technology park to support R&D and prototyping.'],
    ['wonik-robotics','2016','founding','https://wonikrobotics.com/en/sub/company/history.php','加入 WONIK 集团后更名为 WONIK Robotics；不是一次新的公司初创。','Renamed WONIK Robotics after joining WONIK Group; this is a restructuring milestone, not a new founding.'],
  ] as const).map(([companySlug,date,oldKind,sourceUrl,zh,en])=>{
    return {companySlug,date,oldTitle:l(zh,en),sourceUrl,oldKind,newKind:'business' as const,action:'change-kind-exact-match' as const};
  }),
  (()=>{
    const companySlug='wonik-robotics',date='2012',sourceUrl='https://wonikrobotics.com/en/sub/company/history.php';
    const oldTitle=l('获得 KITECH 人形机器人手技术转移，开始生产销售 Allegro Hand V1。','Received humanoid-hand technology from KITECH and began Allegro Hand V1 production and sales.');
    return {companySlug,date,oldTitle,sourceUrl,oldKind:'product' as const,newKind:null,action:'replace-exact-mixed-event' as const,replacements:[
      event(date,'business',sourceUrl,'获得 KITECH 人形机器人手技术转移。','Received humanoid-robot-hand technology transfer from KITECH.'),
      event(date,'product',sourceUrl,'开始生产销售 Allegro Hand V1。','Began Allegro Hand V1 production and sales.'),
    ]};
  })(),
];
