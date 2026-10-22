import type { CatalogEnrichmentProduct } from './catalog-enrichment-types';
const l=(zh:string,en=zh)=>({zh,en});
const base='https://www.mech-mind.com/products/';
type Row=[string,string,string,string];
const software=(name:string,path:string,zh:string,en:string,fields:Row[],applications:ReturnType<typeof l>[]):CatalogEnrichmentProduct=>({
  id:'catalog-mech-mind-'+name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),companySlug:'mech-mind',product:name,pageUrl:base+path,
  primary:'software-tools',subclass:'application-software',category:'model-software',useCases:['integration','manufacturing'],level:'family',coverage:'official-partial',
  type:l('工业视觉与机器人软件','Industrial vision and robot software'),overview:[l(zh,en),l('下列功能来自该产品的官方页面。它们描述公开能力，不代表所有版本、许可和硬件组合均支持；页面没有给出可核对的运行系统、GPU/内存配置和许可版本表，因此没有用其他软件的要求替代。','The functions below are documented on this product page. They do not imply support across every version, license and hardware combination. The page does not provide a verifiable OS, GPU/memory and license-edition matrix; requirements are not borrowed from another product.')],
  rows:fields.map(([zLabel,eLabel,zValue,eValue])=>({label:l(zLabel,eLabel),value:l(zValue,eValue),sourceUrl:base+path,sourceLabel:l('官方产品功能说明','Official product capabilities'),locator:l(`${name} / ${eLabel}`),excludeFromNumericIndex:true})),applications,
  integration:l('核对软件版本、许可、相机与机器人适配清单，并用自己的工件样本验证流程、错误恢复和生产节拍。','Confirm software version, licensing, camera/robot compatibility, then validate workflow, fault recovery and cycle time using representative parts.'),
  verification:l('判断：图形化配置可减少部分编码工作，但不替代工艺设计、数据验证或机器人的安全评估。','Assessment: graphical configuration can reduce some coding work but does not replace process design, data validation or robot safety assessment.'),
  sourceLinks:[{label:l('该软件的官方产品页','Official page for this software'),url:base+path}],
});
export const mechMindSoftwareProducts:CatalogEnrichmentProduct[]=[
  software('Mech-Vision','mech-vision-machine-vision-software.html','Mech-Vision 将相机采集、二维及三维处理、模型匹配、深度学习和位姿调整组织成图形化视觉流程。它输出供机器人或自动化设备使用的识别结果，和负责运动规划的 Mech-Viz 不是同一种产品。','Mech-Vision organizes acquisition, 2D/3D processing, model matching, deep learning and pose adjustment into graphical vision workflows. It produces recognition outputs for robots or automation; it is distinct from Mech-Viz motion planning.',[
    ['流程编排','Workflow','图形化、无代码界面','Graphical no-code interface'],['模板','Templates','工件抓取模板与应用资源库','Workpiece-picking templates and application resources'],
    ['三维处理','3D processing','通用处理、特征处理、模型创建与匹配','General processing, feature processing, model creation and matching'],['二维处理','2D processing','通用处理、特征处理及匹配','General processing, feature processing and matching'],
    ['学习方法','Learning support','二维及三维深度学习模块','2D and 3D deep-learning modules'],['定位调整','Pose tools','三维工件识别与位姿调整工具','3D workpiece recognition and pose-adjustment tools'],
    ['生产监控','Production monitoring','图形化生产界面和各阶段结果监控','Graphical production interface and stage-result monitoring'],['语言','Languages','英语、日语、中文、韩语','English, Japanese, Chinese and Korean'],
  ],[l('散乱工件抓取、上下料、拆码垛和装配视觉','Vision for bin picking, tending, depalletizing and assembly')]),
  software('Mech-Viz','mech-viz-robot-programming-software.html','Mech-Viz 使用功能模块、参数和连接关系描述机器人任务，并结合三维仿真、运动规划和碰撞检测。末端抓取点、对称设置与多个工具坐标系属于其任务规划功能。','Mech-Viz describes robot tasks through function blocks, parameters and connections, combining 3D simulation, motion planning and collision detection. Picking points, symmetry and multiple tool frames are part of its task-planning functions.',[
    ['任务编程','Task programming','流程图：添加模块、配置参数、连接模块','Flowchart: add modules, configure parameters and connect modules'],['机器人适配','Robot adaptation','支持已适配机器人型号；需核对具体型号','Supported adapted robot models; verify the exact model'],
    ['仿真','Simulation','三维运动轨迹动画','3D motion-trajectory animation'],['规划','Planning','运动规划与碰撞预测','Motion planning and collision prediction'],['碰撞检测','Collision detection','可配置的机器人与周围环境碰撞检测','Configurable robot/environment collision detection'],
    ['抓取策略','Picking strategy','多个抓取点、抓取余量、对称设置、多个 TCP','Multiple picking points, picking margin, symmetry and multiple TCPs'],
  ],[l('多品牌机器人视觉引导与作业流程编排','Vision-guided robot workflows across supported brands')]),
  software('Mech-DLK','mech-dlk-deep-learning-software.html','Mech-DLK 是工业视觉模型训练、标注和部署工具，面向重叠物体识别、分类与缺陷检测。它提供算法级联和多语言 SDK；不同功能组合对应不同版本，不能把全部功能视作基础许可自带。','Mech-DLK supports industrial-vision model training, annotation and deployment for overlapping-object recognition, classification and defect inspection. It provides algorithm cascading and SDKs; feature combinations vary by edition rather than being assumed in the base license.',[
    ['算法','Algorithms','快速定位、实例分割、分类、目标检测、缺陷分割、异常检测、OCR','Fast positioning, instance segmentation, classification, object detection, defect segmentation, anomaly detection and OCR'],
    ['标注','Annotation','VFM 标注、智能标注和预训练标注工具','VFM, smart and pre-trained labeling tools'],['流程组合','Model composition','算法模块级联和单一模型包部署','Algorithm-module cascading and single-package deployment'],
    ['SDK 语言','SDK languages','C、C++、C#、Python','C, C++, C# and Python'],['界面','Interface','图形化训练与应用配置','Graphical training and application configuration'],['版本','Editions','官网说明三种功能组合，未列具体版本名称','Official page states three feature combinations without naming the editions'],
  ],[l('工件分类、目标定位、表面缺陷及字符识别','Part classification, localization, surface defects and character recognition')]),
  software('Mech-MSR','mech-msr-3d-measurement-and-inspection-software.html','Mech-MSR 将扫描、处理、结果判定和部署组织成二维及三维测量检测流程。它与 Mech-Eye 相机和线激光轮廓仪配合，支持多传感器布置，适用于尺寸、缺陷、涂胶和防错等任务。','Mech-MSR combines scanning, processing, result evaluation and deployment into 2D/3D metrology and inspection workflows. It works with Mech-Eye cameras and laser profilers and supports multi-sensor layouts for dimensional, defect, glue-bead and mistake-proofing tasks.',[
    ['采集硬件','Acquisition hardware','Mech-Eye 三维相机与三维线激光轮廓仪','Mech-Eye 3D cameras and 3D laser profilers'],['流程界面','Workflow interface','图形化向导与全流程检测配置','Graphical wizard and end-to-end inspection configuration'],
    ['测量工具','Measurement tools','轮廓仪标定、智能对齐与涂胶检测','Profiler calibration, intelligent alignment and glue-bead inspection'],['AI 与降噪','AI and denoising','深度学习及多种点云降噪算法','Deep learning and multiple point-cloud denoising algorithms'],
    ['多传感器布局','Multi-sensor layouts','并排、反向、相对与倾斜布置','Side-by-side, reverse, opposite and angled layouts'],['检测任务','Inspection tasks','尺寸测量、缺陷检测、OCR、防错','Dimensional measurement, defect inspection, OCR and mistake-proofing'],
  ],[l('汽车、电子、电池及光伏的二维三维质量检测','2D/3D quality inspection for automotive, electronics, batteries and photovoltaics')]),
];
