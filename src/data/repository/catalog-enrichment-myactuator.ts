import raw from './catalog-enrichment-myactuator-data.json';
import type { CatalogEnrichmentGroup, CatalogEnrichmentProduct } from './catalog-enrichment-types';
import { l } from './verified-catalog-wave-fourteen-common';

const home='https://www.myactuator.cn/';
const about='https://www.myactuator.cn/compnay';
export const myactuatorCatalogEnrichment: CatalogEnrichmentGroup = {
  profiles:{myactuator:{
    legalName:'苏州脉塔智能科技有限公司',founded:'2020',country:l('中国','China'),headquarters:l('江苏昆山','Kunshan, Jiangsu'),officialUrl:home,aboutUrl:about,
    role:l('机器人关节、电机与运动控制组件厂商','Manufacturer of robot joints, motors and motion-control components'),
    positioning:l('覆盖行星、谐波、摆线和直驱方案的机器人动力组件供应商','Robotic actuation spanning planetary, harmonic, cycloidal and direct-drive designs'),
    products:['RMD-X V2 / V3 / V4 / V4.1','EPS-RH / HM / CEM','RMD-H / L','RMD-FL / FLO','GP2','RB-A850-10','RB-C002'],
    overview:[
      l('苏州脉塔智能科技有限公司成立于 2020 年，总部位于江苏昆山。公司面向机器人动力系统开发电机、减速模组、反馈与驱动控制组件，产品以 MYACTUATOR 品牌对外提供。','Suzhou MYACTUATOR Intelligent Technology was established in 2020 and is headquartered in Kunshan, Jiangsu. It develops motors, geared modules, feedback and drive-control components for robotic actuation under the MYACTUATOR brand.'),
      l('产品按机械架构分为 RMD-X 行星模组、EPS-RH 与 HM 谐波模组、EPS-CEM 摆线模组、H 与 L 直驱模组，以及 FL、FLO 无框电机。选择模组时，需要把减速器、编码器、驱动器和通信版本视为具体配置，不能把系列名称当作一个固定规格。','The range comprises RMD-X planetary modules, EPS-RH and HM harmonic modules, EPS-CEM cycloidal modules, H and L direct-drive modules, and FL/FLO frameless motors. Gearbox, encoder, drive and communication versions define the actual configuration; a series name does not represent one fixed specification.'),
      l('2026 年目录还列出 GP2 自适应夹爪、RB-A850-10 机械臂与 RB-C002 控制器。控制器资料说明其采用 Orange Pi 5 PLUS、RK3588、IgH EtherCAT Master 和 ROS 2 控制栈。这使目录从动力零部件延伸到末端执行器及控制集成，但不能据此推定所有组件开箱即可互换。','The 2026 catalog also lists GP2 adaptive grippers, the RB-A850-10 manipulator and RB-C002 controller. Controller documentation specifies Orange Pi 5 PLUS, RK3588, IgH EtherCAT Master and a ROS 2 control stack. This extends the range into end effectors and control integration without establishing universal plug-and-play compatibility.'),
      l('选型判断：对机器人研发团队，重点是比较具体配置在目标工况下的扭矩、速度、质量和控制能力。独立规格书对额定摆动工况、10 rpm 峰值和堵转扭矩分别定义；热平衡试验也显示持续时间随转速和负载变化，不能将堵转值作为持续输出承诺。','Selection assessment: compare torque, speed, mass and control capability for the intended operating condition. Individual sheets distinguish the rated oscillating duty, peak torque at 10 rpm and stall torque. Thermal tests also vary with speed and load; stall figures are not continuous-output commitments.'),
    ],
    businessAreas:[l('机器人电机、关节与驱动开发','Robot motor, joint and drive development'),l('自适应夹爪与机械臂组件','Adaptive grippers and manipulator components'),l('多轴控制与 EtherCAT 软件集成','Multi-axis control and EtherCAT software integration')],
    customerGroups:[l('人形机器人、四足机器人及机械臂研发团队','Humanoid, quadruped and manipulator developers'),l('需要紧凑运动组件的自动化设备厂商','Automation-equipment manufacturers needing compact actuation'),l('机器人研究与二次开发团队','Robotics researchers and system developers')],
    strengths:[l('提供多种减速器架构及无框、直驱方案','Multiple reduction architectures plus frameless and direct-drive options'),l('部分新型号提供独立规格书、温升试验与引脚定义','Some new models have dedicated sheets, thermal tests and pin definitions')],
    fit:[l('需要从动力组件逐步集成到机器人控制的研发项目','Development projects integrating actuation components into robot control')],
    catalogScope:l('核对中文型号页面、2026 产品目录、V2/V3 手册及新型号独立规格书。版本差异和未完成的图片、图纸字段核对单独记录；尚不声称整个产品目录已达到全参数完成。','Reviewed Chinese model pages, the 2026 catalog, V2/V3 manuals and dedicated new-model sheets. Version differences and outstanding image/drawing checks are tracked separately; whole-catalog parameter completeness is not claimed.'),
    verificationFocus:l('工况与温升、通信版本、反馈精度、安装公差、配置交付范围','Duty and thermal rise, communication version, feedback accuracy, installation tolerances and delivered configuration'),
    presalesQuestions:[
      l('额定扭矩对应哪种摆动、停留与散热条件，项目占空比能否复现？','What oscillation, holding and cooling conditions define rated torque, and can the project reproduce them?'),
      l('所选型号的 CAN、RS485、EtherCAT、编码器和抱闸具体配置是什么？','Which CAN, RS485, EtherCAT, encoder and brake configuration does the selected model provide?'),
      l('机械接口、公差、控制协议和失效保护需要哪些配套资料及试验？','Which drawings, tolerances, protocols and fault-protection tests are required for integration?'),
    ],
    catalogTitle:l('脉塔官方产品目录与规格书','MYACTUATOR official catalogs and specifications'),
    timeline:[
      {date:'2020',kind:'founding',title:l('公司成立','Company established'),detail:l('公司介绍将成立时间列为 2020 年。','The official profile gives 2020 as the establishment year.'),sourceUrl:about},
      {date:'2026',kind:'product',title:l('公开 2026 产品目录','2026 catalog published'),detail:l('目录列出 V4.1 行星模组、HM 轻量谐波模组、GP2 夹爪、RB-A850-10 机械臂及 RB-C002 控制器；目录年份不等同于各型号首次发布日期。','The catalog lists V4.1 planetary modules, HM lightweight harmonic modules, GP2 grippers, RB-A850-10 and RB-C002. The catalog year is not necessarily each model’s original launch date.'),sourceUrl:raw.catalogUrl},
    ],funding:[],
    investmentView:[l('观察重点应是型号级交付、客户复购、应用验证和收入结构。公司产品目录和人员、专利自述不能替代审计财报或客户验收证据。','Assess model-level deliveries, repeat purchasing, application validation and revenue composition. Catalog breadth and company statements about personnel or patents do not substitute for audited financials or customer acceptance evidence.')],
  }},
  products:raw.products as CatalogEnrichmentProduct[],
  reviews:[{slug:'myactuator',reviewedAt:'2026-09-06',catalogUrls:[home+'product',raw.catalogUrl],reviewedProductUrls:[...new Set(raw.products.map(p=>p.pageUrl))],status:'reviewed-partial',scope:l('型号页、型号规格书、公开手册与目录交叉核对','Cross-check of model pages, dedicated sheets, public manuals and catalog'),gaps:raw.gaps}],
};
