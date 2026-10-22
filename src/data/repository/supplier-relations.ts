import {localizePath, type Locale} from '../site';
import {isPagesBuild} from '../build-scope';

type Text = {zh:string;en:string};
export type SupplierRelation = {
  id:string;
  supplierSlug:string;
  robotCompanySlug:string;
  relationshipType:'confirmed-supply'|'documented-integration';
  component:Text;
  summary:Text;
  boundary:Text;
  sourceUrl:string;
  sourceTitle:string;
  sourceDate?:string;
  officialComponentUrl:string;
};

const names:Record<string,Text> = {
  harting:{zh:'浩亭',en:'HARTING'},kuka:{zh:'库卡',en:'KUKA'},
  nabtesco:{zh:'纳博特斯克',en:'Nabtesco'},maxon:{zh:'maxon',en:'maxon'},
  anybotics:{zh:'ANYbotics',en:'ANYbotics'},realsense:{zh:'RealSense',en:'RealSense'},
  'pal-robotics':{zh:'PAL Robotics',en:'PAL Robotics'},
};

export const supplierRelations:SupplierRelation[] = [
  {
    id:'harting-kuka-connectors',supplierSlug:'harting',robotCompanySlug:'kuka',relationshipType:'confirmed-supply',
    component:{zh:'工业连接器与定制连接方案',en:'Industrial connectors and tailored connectivity'},
    summary:{zh:'浩亭官方供货说明列出向美的集团—库卡提供工业模块化连接器、板端连接器及定制连接方案。',en:'HARTING identifies industrial modular connectors, board-end connectors and tailored connectivity supplied to Midea Group-KUKA.'},
    boundary:{zh:'公司级历史供货披露，未列机器人型号或零件料号。',en:'Historical company-level supply disclosure; no robot model or part number is identified.'},
    sourceUrl:'https://www.harting.com/en-HK/harting-china-awards',sourceTitle:'HARTING China Awards — KUKA supplier awards',
    officialComponentUrl:'https://www.harting.com/',
  },
  {
    id:'nabtesco-kuka-reducers',supplierSlug:'nabtesco',robotCompanySlug:'kuka',relationshipType:'confirmed-supply',
    component:{zh:'工业机器人精密减速机',en:'Precision reduction gears for industrial robots'},
    summary:{zh:'纳博特斯克 2025 年 2 月演示材料将 KUKA Roboter 列为工业机器人精密减速机业务的主要客户。',en:'Nabtesco lists KUKA Roboter as a main customer for industrial-robot precision reduction gears in its February 2025 presentation.'},
    boundary:{zh:'材料第 40 页，仅到部件类别级，未披露具体减速机系列或机器人型号。',en:'Slide 40 supports the component category, without a reducer series or robot model.'},
    sourceUrl:'https://www.nabtesco.com/en/news/20250219-16205/',sourceTitle:'Nabtesco February 20, 2025 presentation, slide 40',sourceDate:'2025-02-20',
    officialComponentUrl:'https://precision.nabtesco.com/en/products/',
  },
  {
    id:'maxon-anymal-actuators',supplierSlug:'maxon',robotCompanySlug:'anybotics',relationshipType:'confirmed-supply',
    component:{zh:'ANYmal 驱动系统与执行器',en:'ANYmal drive systems and actuators'},
    summary:{zh:'maxon 2020 年 9 月官方公告明确其为 ANYmal 驱动系统供应方，并说明后续执行器开发与生产安排。',en:'maxon identifies itself as an ANYmal drive-system supplier and describes subsequent actuator development and production in its September 2020 announcement.'},
    boundary:{zh:'对应当时的合作安排；未指定可独立订购的执行器型号或覆盖全部 ANYmal 代际。',en:'Scoped to that announcement; no separately orderable actuator or coverage of every ANYmal generation is established.'},
    sourceUrl:'https://www.maxongroup.com/en/knowledge-and-support/blog/maxon-and-anybotics-46002',sourceTitle:'maxon and ANYbotics, a strategic partnership',sourceDate:'2020-09-15',
    officialComponentUrl:'https://www.maxongroup.com/en/market-solutions/mobility-solutions/robotics',
  },
  {
    id:'realsense-tiago-pro-d435',supplierSlug:'realsense',robotCompanySlug:'pal-robotics',relationshipType:'documented-integration',
    component:{zh:'TIAGo Pro 头部 D435 RGB-D 相机',en:'D435 RGB-D camera in TIAGo Pro head'},
    summary:{zh:'PAL OS 25.01 的 TIAGo Pro 官方硬件表列出 Intel RealSense D435 头部 RGB-D 相机。',en:'The official PAL OS 25.01 TIAGo Pro hardware table names Intel RealSense D435 as the head RGB-D camera.'},
    boundary:{zh:'确认该版文档中的硬件配置，未据此确认直接采购合同或当前全部配置。',en:'Documents that versioned hardware configuration, without establishing direct procurement or all current configurations.'},
    sourceUrl:'https://docs.pal-robotics.com/25.01/hardware/tiagopro/hardware-overview.html',sourceTitle:'TIAGo Pro hardware overview — PAL OS 25.01',
    officialComponentUrl:'https://store.realsenseai.com/buy-realsense-depth-camera-d435.html',
  },
  {
    id:'realsense-ari-d435i',supplierSlug:'realsense',robotCompanySlug:'pal-robotics',relationshipType:'documented-integration',
    component:{zh:'ARI 的 D435i RGB-D 相机配置',en:'D435i RGB-D camera configuration in ARI'},
    summary:{zh:'PAL OS 25.01 的 ARI 视觉表在头部与躯干前部相机条目中列出 RealSense D435i。',en:'The PAL OS 25.01 ARI vision table names RealSense D435i in the head-camera and torso-front entries.'},
    boundary:{zh:'保留原表的配置选项含义，不推定每台 ARI 的相机数量或现今供货法人。',en:'Retains the table’s configuration scope without inferring camera quantities per robot or today’s supplying legal entity.'},
    sourceUrl:'https://docs.pal-robotics.com/25.01/hardware/ari/hardware-overview.html',sourceTitle:'ARI hardware overview — PAL OS 25.01',
    officialComponentUrl:'https://store.realsenseai.com/buy-realsense-depth-camera-d435i.html',
  },
];

export function getCompanyComponentRelations(slug:string,locale:Locale) {
  return supplierRelations.filter(item=>item.supplierSlug===slug || item.robotCompanySlug===slug).map(item=>{
    const partnerSlug = item.supplierSlug===slug ? item.robotCompanySlug : item.supplierSlug;
    return {id:item.id,relationshipType:item.relationshipType,
      partnerSlug,partnerName:names[partnerSlug]?.[locale] || partnerSlug,
      partnerPath:localizePath(locale,`${isPagesBuild ? '' : '/repository'}/companies/${partnerSlug}`),
      component:item.component[locale],summary:item.summary[locale],boundary:item.boundary[locale],
      sourceUrl:item.sourceUrl,sourceTitle:item.sourceTitle,sourceDate:item.sourceDate,
      officialComponentUrl:item.officialComponentUrl,
    };
  });
}

export type CompanyComponentRelation = ReturnType<typeof getCompanyComponentRelations>[number];
