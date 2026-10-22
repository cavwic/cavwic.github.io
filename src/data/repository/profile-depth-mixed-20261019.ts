import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { softwareCatalogEnrichment } from './catalog-enrichment-software';
import { visionSensingCatalogEnrichment } from './catalog-enrichment-parallel-visionSensing';
import { waveFifteenProfiles } from './verified-catalog-wave-fifteen-profiles';
import { l, type Localized, type TimelineSeed, type WaveFourteenCompanySeed } from './verified-catalog-wave-fourteen-common';

type Profile = Partial<WaveFourteenCompanySeed>;
type DepthAddition = {
  overview: Localized[];
  businessAreas: Localized[];
  customerGroups: Localized[];
  timeline?: TimelineSeed[];
};

function appendText(previous: Localized[], additions: Localized[]): Localized[] {
  return [...new Map([...previous, ...additions].map(value => [JSON.stringify(value), value])).values()];
}

// Later enrichment groups replace list fields, so carry their verified predecessors forward.
function deepen(slug: string, previous: Profile, addition: DepthAddition): Profile {
  const legacy = waveFifteenProfiles[slug];
  const timeline = [...(previous.timeline ?? []), ...(addition.timeline ?? [])];
  return {
    overview: appendText(previous.overview ?? [], addition.overview),
    businessAreas: appendText(previous.businessAreas ?? (legacy ? [legacy.business] : []), addition.businessAreas),
    customerGroups: appendText(previous.customerGroups ?? (legacy ? [legacy.users] : []), addition.customerGroups),
    timeline: [...new Map(timeline.map(event => [JSON.stringify(event), event])).values()],
  };
}

const profiles: CatalogEnrichmentGroup['profiles'] = {
  labring: deepen('labring', softwareCatalogEnrichment.profiles.labring, {
    overview: [
      l('FastGPT的企业业务不只提供知识库问答组件。官网按销售、客服运营、人力行政、财务法务组织应用场景，示例包括销售知识助手、工单分流、简历筛选与报销审核；这些是其公开提供的应用方向，不代表已核实的客户合同或实际效果。', 'FastGPT presents more than knowledge-base Q&A components. Its enterprise offering organizes applications around sales, support and operations, HR and administration, and finance and legal work, with examples including sales knowledge assistants, ticket routing, resume screening and expense review. These are offered use cases, not verified customer contracts or measured outcomes.'),
      l('商业版文档把软件授权与交付服务分开：商业镜像与社区版共同部署，另提供托管或自部署支持、工作流应用定制、升级迁移及第三方系统集成。企业因此既可采用现成平台，也可采购围绕自身系统的实施支持；不同交付方式的运维责任并不相同。', 'The Commercial Edition documentation separates software licensing from delivery services. A licensed commercial image runs alongside the Community Edition, with managed or self-hosted support, custom workflow applications, upgrades, migration and third-party integration. Organizations can adopt the platform or obtain implementation support around their systems; operational responsibilities differ by delivery model.'),
    ],
    businessAreas: [l('企业知识库、Agent与工作流应用软件', 'Enterprise knowledge-base, agent and workflow software'), l('商业部署、应用定制与系统集成支持', 'Commercial deployment, application customization and integration support')],
    customerGroups: [l('建设内部知识应用及销售、客服、人力、财务流程的企业开发与业务团队', 'Enterprise development and business teams building internal knowledge applications and sales, support, HR or finance workflows')],
  }),
  robotous: deepen('robotous', visionSensingCatalogEnrichment.profiles.robotous, {
    overview: [
      l('ROBOTOUS在测量硬件之外公开维护RFT传感器的ROS 2接入软件。UART仓库通过串口节点发布传感数据，EtherCAT仓库采用独立接口程序连接总线；这是传感器进入机器人软件栈的两条明确路径，不是两类新的传感器型号。', 'Alongside measurement hardware, ROBOTOUS publicly maintains ROS 2 integration software for RFT sensors. The UART repository publishes sensor data through a serial node, while the EtherCAT repository uses a separate bus-interface program. These are two documented routes into a robot software stack, not two new sensor models.'),
      l('两套接口指南面向需要把接触测量接入机器人控制软件的开发人员。UART示例记录Ubuntu 24.04与ROS 2 Jazzy测试环境，EtherCAT示例记录Ubuntu 20.04与ROS 2 Foxy，并明确涉及原始网络套接字权限；公司公开支持材料的边界因此是具体协议和测试环境，而不是任意硬件、操作系统或安全控制系统的通用兼容承诺。', 'Both guides address developers connecting contact measurements to robot-control software. The UART example records Ubuntu 24.04 and ROS 2 Jazzy, while EtherCAT records Ubuntu 20.04 and ROS 2 Foxy and discusses raw-network-socket privileges. This public support material is bounded by protocol and tested environment, not a universal compatibility commitment across hardware, operating systems or safety controllers.'),
    ],
    businessAreas: [l('RFT六轴力与力矩测量硬件', 'RFT six-axis force and torque measurement hardware'), l('RFT串口、EtherCAT与ROS 2接入软件', 'RFT serial, EtherCAT and ROS 2 integration software')],
    customerGroups: [l('使用RFT传感器的机器人接触测量、控制与ROS 2集成开发团队', 'Robot contact-measurement, control and ROS 2 integration teams using RFT sensors')],
  }),
  sensodrive: deepen('sensodrive', visionSensingCatalogEnrichment.profiles.sensodrive, {
    overview: [
      l('SENSODRIVE同时经营面向设备制造商的扭矩传感器与可直接集成的完整关节。官网说明SensoTorque侧重中大批量定制，而小批量项目可采用SensoJoint；两者分别服务嵌入现有驱动的测量需求和购买成套机电执行单元的需求。', 'SENSODRIVE offers both OEM torque sensors and complete joints for integration. Its sensor page describes a focus on medium- and large-volume customization and points smaller-volume projects toward SensoJoint. These address different purchasing needs: adding measurement to an existing drive or obtaining a complete mechatronic actuator.'),
      l('其业务还包括力反馈产品和客户定制机电开发。官方沿革记录了从扭矩传感器、转向模拟设备起步，到汽车和医疗技术领域定制驱动与开发项目的扩展；这与工业及医疗机器人关节业务并行，不能把公司简单归为单一电机或传感器供应商。', 'Its business also includes force-feedback products and customer-specific mechatronic development. The official history describes an initial torque-sensor and steering-simulator offering followed by custom drives and development projects in automotive and medical technology. These activities sit alongside industrial and medical robot joints, rather than a single motor or sensor line.'),
    ],
    businessAreas: [l('扭矩传感器与扭矩控制完整关节', 'Torque sensors and torque-controlled complete joints'), l('力反馈、转向模拟与定制机电开发', 'Force feedback, steering simulation and custom mechatronic development')],
    customerGroups: [l('工业及医疗机器人制造商、汽车与力反馈设备研发团队', 'Industrial and medical robot manufacturers and automotive or force-feedback development teams')],
  }),
  leptrino: deepen('leptrino', visionSensingCatalogEnrichment.profiles.leptrino, {
    overview: [
      l('Leptrino的六轴测量业务把应变式传感、变送器和数据处理连成一条测量链。官方产品页说明六个力与力矩分量可在传感器内滤波和转换，标准USB便于连接计算机，其他接口及特殊结构则按定制需求确认；其交付对象既包括机器人末端，也包括独立测量装置。', 'Leptrino combines strain-gauge sensing, transmitters and data processing into a six-axis measurement chain. Its product page describes internal filtering and force conversion, standard USB connection to a computer and separately confirmed interface or structural customization. The offering serves robot end effectors as well as standalone measurement equipment.'),
      l('配套LGR101U承担实时显示、CSV记录和分析，官网列举的用途还包括风洞与流体实验、操作力及感官评价。由此可区分机器人控制反馈、实验测量和数据采集分析三类需求；这些公开用途不能推导为具体机构的现行采购关系。', 'The accompanying LGR101U provides live display, CSV recording and analysis. The site also describes wind-tunnel and fluid experiments, operating-force measurement and sensory evaluation. This distinguishes robot-control feedback, experimental measurement and acquisition/analysis needs; the stated applications do not establish current purchasing relationships with particular institutions.'),
    ],
    businessAreas: [l('标准及定制六轴力与力矩传感器', 'Standard and customized six-axis force and torque sensors'), l('测力台、加工测力与数据采集分析工具', 'Force plates, machining-force measurement and acquisition/analysis tools')],
    customerGroups: [l('机器人与精密设备开发、实验测量和加工测试团队', 'Robot and precision-equipment developers, experimental-measurement teams and machining-test teams')],
  }),
  'wacoh-tech': deepen('wacoh-tech', visionSensingCatalogEnrichment.profiles['wacoh-tech'], {
    overview: [
      l('WACOH-TECH在公司介绍中将主营业务列为力觉传感器制造销售，并列出富山总部、富山工厂和东京营业所。其业务链同时包含传感器制造与应用连接部件，官网把协作机器人专用品、一般六轴和三轴传感器分别列示，而不是只提供单一量程的通用测头。', 'WACOH-TECH identifies force-sensor manufacturing and sales as its principal business and lists a Toyama headquarters and factory plus a Tokyo sales office. Its offering combines sensor manufacturing with application-connection components. The catalog separates collaborative-robot products from general six-axis and three-axis sensors rather than offering one universal sensing head.'),
      l('接口与线缆是可独立识别的配套业务：目录说明如何把DynPick的RS422信号转换为USB、模拟量、Ethernet或EtherCAT，并列出面向DENSO WAVE和FANUC机器人的连接线缆。兼容线缆表明适配用途，不证明这些机器人厂商是其客户、股东或商业合作伙伴。', 'Interfaces and cables form a separately identifiable supporting business. The catalog explains RS422 conversion to USB, analog, Ethernet or EtherCAT and lists cables intended for DENSO WAVE and FANUC robots. Such compatibility indicates an integration use, not evidence that those robot makers are customers, shareholders or commercial partners.'),
    ],
    businessAreas: [l('DynPick六轴、三轴及协作机器人力觉传感器', 'DynPick six-axis, three-axis and collaborative-robot force sensors'), l('通信转换器、可动线缆与机器人连接部件', 'Communication converters, flex cables and robot-connection components')],
    customerGroups: [l('需要接触力反馈的机器人与工装集成商，以及测试测量设备开发团队', 'Robot and fixture integrators needing contact-force feedback, and test/measurement equipment developers')],
  }),
  photoneo: deepen('photoneo', visionSensingCatalogEnrichment.profiles.photoneo, {
    overview: [
      l('Photoneo的机器人视觉业务连接相机采集与整套抓取配置。Bin Picking Studio公开流程包含机器人选择、夹具和工件CAD导入、抓取点配置、工位环境、定位、手眼标定及交互调试；公司因此同时面向视觉部件采购与需要配置机器人应用的集成需求。', 'Photoneo connects camera acquisition with robotic-picking configuration. The published Bin Picking Studio workflow covers robot selection, gripper and object CAD import, gripping points, cell environment, localization, camera-to-robot calibration and interactive debugging. The business addresses both vision-component procurement and integrators configuring robot applications.'),
      l('官网将汽车、物流和电商列为服务行业，抓取软件页另提供可行性研究、培训和部署技术支持入口。其应用业务不仅是销售扫描器，也包含视觉引导软件与集成支持；所列行业和支持服务是官方业务定位，不用来推算客户数量、合同金额或产线收益。', 'The company identifies automotive, logistics and e-commerce as served sectors, while its picking-software page offers feasibility studies, training and deployment support. The offering therefore includes vision-guidance software and integration support alongside scanners. These official market and service descriptions are not used to infer customer counts, contract values or production returns.'),
    ],
    businessAreas: [l('工业三维扫描器与动态三维相机', 'Industrial 3D scanners and moving-scene 3D cameras'), l('机器人定位、抓取软件及应用集成支持', 'Robot localization, picking software and application-integration support')],
    customerGroups: [l('汽车制造、物流电商自动化团队及机器人视觉系统集成商', 'Automotive manufacturing, logistics and e-commerce automation teams, and robot-vision system integrators')],
    timeline: [
      { date: '2016', kind: 'product', sourceUrl: 'https://www.photoneo.com/about-us', title: l('首款商业产品PhoXi发布', 'First commercial PhoXi product launched'), detail: l('官方沿革将2016年记为首款商业产品PhoXi 3D Scanner的推出年份。', 'The official history dates the first commercial product, PhoXi 3D Scanner, to 2016.') },
      { date: '2018', kind: 'product', sourceUrl: 'https://www.photoneo.com/about-us', title: l('Bin Picking Studio推出', 'Bin Picking Studio introduced'), detail: l('官方沿革记录2018年推出面向工业无序抓取的Bin Picking Studio；不推定具体发布日期或首个客户。', 'The official history records Bin Picking Studio for industrial bin picking in 2018, without establishing an exact launch day or first customer.') },
    ],
  }),
};

export const profileDepthMixedEnrichment: CatalogEnrichmentGroup = { profiles, products: [], reviews: [] };
