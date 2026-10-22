import type { Locale } from '../site';
import type { CompanyProfile } from './catalog';
import type { FinderExpansionRecord } from './product-finder-demo';
import tables from './verified-catalog-wave-fifteen-tables.json';
import { l, row, buildWaveFourteenRecords, applyWaveFourteenCompanyPatch } from './verified-catalog-wave-fourteen-common';
import { manualProducts15, productId15, type Product15 } from './verified-catalog-wave-fifteen-manual';
import { waveFifteenCompanySeed, waveFifteenCompanySlugs, waveFifteenProfiles } from './verified-catalog-wave-fifteen-profiles';
import { normalizeFinderParameter } from './parameter-index';
export { waveFifteenCompanySlugs };

// Original labels remain in source locators; these terms only localize presentation.
const terms: Array<[string,string,string?]> = [
  ['整手尺寸','Hand dimensions'],['手指数','Finger count'],['主动自由度','Active DoF'],['总自由度','Total DoF'],['驱动方式','Actuation'],['传动方式','Transmission'],['力传感器数量','Force sensor count'],['四指弯曲速度','Four-finger bending speed'],['拇指横移速度','Thumb lateral speed'],['指尖重复定位精度','Fingertip repeatability'],['拇指最大指尖力','Maximum thumb fingertip force'],['四指单指最大指尖力','Maximum single-finger fingertip force'],['四指最大抓握力','Maximum four-finger grasp force'],['静态电流','Static current'],['空载平均电流','No-load average current'],['触觉传感器','Tactile sensor'],['触觉配置','Tactile configuration'],['触觉量程','Tactile range'],['供电范围','Supply voltage range'],['通讯接口','Interfaces'],['固件升级','Firmware upgrade'],['质量','Mass'],
  ['3D sensing technology','3D sensing technology','三维感测技术'],['Output data','Output data','输出数据'],['Scanning range','Scanning range','扫描范围'],['Scanning area','Scanning area','扫描区域'],['Scanning distance','Scanning distance','扫描距离'],['Relative distance accuracy','Relative distance accuracy','相对距离精度'],['Global planarity','Global planarity','全局平面度'],['Local planarity','Local planarity','局部平面度'],['Temporal noise','Temporal noise','时间噪声'],['Point-to-point distance','Point-to-point distance','点间距'],['Color Image resolution','Color image resolution','彩色图像分辨率'],['Color image resolution','Color image resolution','彩色图像分辨率'],['Depth map resolution','Depth map resolution','深度图分辨率'],['Acquisition time','Acquisition time','采集时间'],['Scanning time','Scanning time','扫描时间'],['Baseline','Baseline','基线'],['Temperature working ranges','Operating temperature ranges','工作温度范围'],['Temperature working range','Operating temperature range','工作温度范围'],['Projection unit laser color','Projection laser color','投射激光颜色'],['Data connection','Data connection','数据连接'],['Processing unit','Processing unit','处理器'],['Maximum FPS','Maximum frame rate','最高帧率'],
  ['定格容量','Rated force/torque range','额定力/扭矩量程'],['許容過負荷','Permissible overload','允许过载'],['非直線性','Nonlinearity','非线性'],['⾮直線性','Nonlinearity','非线性'],['他軸⼲渉','Cross-axis interference','轴间干扰'],['外形寸法','Dimensions','外形尺寸'],['分解能','Resolution','分辨率'],['貸出機','Loan unit availability','样机借用'],['価格(税込)','Price (tax included)','价格（含税）'],['価格 (税込)','Price (tax included)','价格（含税）'],['出⼒レート','Output rate','输出频率'],['インターフェイス','Interface','接口'],['アナログ','Analog','模拟'],['テーブル','Table diameter','台面直径'],['質量','Mass','质量'],['電源電圧','Supply voltage','供电电压'],['電源','Power supply','供电'],['定格荷重','Rated load','额定载荷'],['出力形態','Output interface','输出接口'],['消費電流','Current consumption','电流消耗'],['使用温度範囲','Operating temperature range','工作温度'],['温度特性','Temperature coefficient','温度特性'],['直進性','Linearity','线性度'],['ヒステリシス','Hysteresis','迟滞'],['他軸感度','Cross-axis sensitivity','轴间灵敏度'],['防塵・防水機能','Ingress protection','防护等级'],
  ['量程Fx,Fy','Force range Fx/Fy'],['量程Mx,My','Torque range Mx/My'],['量程Fx','Force range Fx'],['量程Fy','Force range Fy'],['量程Fz','Force range Fz'],['量程Mx','Torque range Mx'],['量程My','Torque range My'],['量程Mz','Torque range Mz'],
  ['额定量程','Rated measurement range'],['重复精度','Repeatability'],['重复性','Repeatability'],['非线性','Nonlinearity'],['线性度','Linearity'],['准度','Accuracy'],['精度','Accuracy'],['分辨率','Resolution'],['采样频率','Sampling frequency'],['采样率','Sampling rate'],['采样分辨率','Sampling resolution'],['供电电压','Supply voltage'],['工作温度','Operating temperature'],['存储温度','Storage temperature'],['补偿温度范围','Compensated temperature range'],['温度补偿范围','Compensated temperature range'],['防护等级','IP rating'],['通信接口','Communication interface'],['通讯协议','Communication protocol'],['通信方式','Communication interface'],['通讯方式','Communication interface'],['灵敏度温度系数','Sensitivity temperature coefficient'],['零点温度系数','Zero temperature coefficient'],['零点输出','Zero output'],['灵敏度','Sensitivity'],['滞后','Hysteresis'],['迟滞性','Hysteresis'],['扭转刚度','Torsional stiffness'],['安全过载','Safe overload'],['极限过载','Ultimate overload'],['过载水平','Overload level'],['过载能力','Overload capacity'],['绝缘电阻','Insulation resistance'],['输入阻抗','Input impedance'],['输出阻抗','Output impedance'],['信号输出','Signal output'],['输出信号','Output signal'],['输入信号','Input signal'],['表面处理','Surface treatment'],['表面','Surface'],['产品材料','Product material'],['材料','Material'],['材质','Material'],['重量','Weight'],['重 量','Weight'],['直径','Diameter'],['高度','Height'],['厚度','Thickness'],['长度','Length'],['宽度','Width'],['尺寸','Dimensions'],['长×宽×高','Length x width x height'],['长x宽','Length x width'],['线缆长度','Cable length'],['电缆长度','Cable length'],['通道数量','Channel count'],['通道数','Channel count'],['激励电压','Excitation voltage'],['供桥电压','Bridge excitation'],['蠕变','Creep'],['应变计型号','Strain gauge model'],['敏感栅','Sensing grid'],['基底','Backing'],
  ['Number of Fingers','Number of Fingers','手指数'],['Degrees of Freedom','Degrees of Freedom','自由度'],['Actuation','Actuation','驱动'],['Gear Ratio','Gear Ratio','减速比'],['Stall Torque','Stall Torque','堵转扭矩'],['Nominal Torque','Nominal Torque','额定扭矩'],['Payload','Payload','负载'],['Weight','Weight','质量'],['Joint Resolution','Joint Resolution','关节分辨率'],['Communication','Communication','通信'],['Power Requirement','Power Requirement','电源要求'],['Pressure Operating Range','Pressure Operating Range','压力工作范围'],['Temperature Operating Range','Temperature Operating Range','温度工作范围'],['Pressure Accuracy','Pressure Accuracy','压力精度'],['System Requirement','System Requirement','系统要求'],['Gearbox type','Gearbox type','减速器类型'],['Torque sensor','Torque sensor','扭矩传感器'],['Motor controller','Motor controller','电机控制器'],['Motor','Motor','电机'],['Brake holding torque','Brake holding torque','制动保持扭矩'],['Brake','Brake','制动器'],['Supply voltage','Supply voltage','供电电压'],['Communikation interface','Communication interface','通信接口'],['Safety functions','Safety functions','安全功能'],['Main bearing','Main bearing','主轴承'],['Position sensor on the output side','Output position sensor','输出位置传感器'],['Sound pressure level','Sound pressure level','噪声'],['Reduction ratio','Reduction ratio','减速比'],['Rated torque','Rated torque','额定扭矩'],['Maximum torque','Maximum torque','最大扭矩'],['Rated speed','Rated speed','额定转速'],['Maximum speed','Maximum speed','最大转速'],['Length','Length','长度'],['Diameter','Diameter','直径'],['Hollow shaft diameter','Hollow shaft diameter','中空轴直径'],
  ['Dimensions','Dimensions','尺寸'],['Field of View','Field of View','视场'],['Accuracy','Accuracy','精度'],['Sensitivity','Sensitivity','灵敏度'],['Roughness','Roughness','粗糙度'],['Capture Speed','Capture Speed','采集时间'],['Operating System','Operating System','操作系统'],['Interface / Power','Interface / Power','接口与供电'],['Data Export Format','Data Export Format','数据导出格式'],['Optional Computer','Optional Computer','可选计算机'],['Gel Thickness','Gel Thickness','凝胶厚度'],['Camera Resolution','Camera Resolution','相机分辨率'],['Camera Frame Rate','Camera Frame Rate','相机帧率'],['Humidity Rating','Humidity Rating','湿度'],['Storage Temperature','Storage Temperature','存储温度'],['Gel Durability','Gel Durability','凝胶耐久测试'],
];
function translated(label: string, locale: Locale) {
  let result=label;
  const used=new Set<string>();
  for(const [original,en,zh] of [...terms].sort((a,b)=>b[0].length-a[0].length)) {
    const replacement=locale==='en'?en:zh??original;
    if(original===replacement || used.has(original))continue;
    result=result.split(original).join(replacement); used.add(original);
  }
  return result;
}
function valueWithUnit(label: string, raw: string, european = false) {
  let value=raw.replace(/\n/g,' ').replace(/㎜/g,'mm').replace(/ｇ/g,'g').replace(//g,'µ');
  if(european)value=value.replace(/(\d),(\d)/g,'$1.$2');
  const unit=label.match(/(?:\/\s*|\[|\()([±]?(?:%[A-Za-z.]*|VDC|mNm|Nm|mN|mm|kg|g|N|Hz|kHz|rpm|℃|°C))(?:\]|\)|$)/)?.[1]?.replace('±','').replace('VDC','V');
  if(unit && !/[a-zA-Z%°℃µ]/.test(value.replace(/approx\.?|about/gi,'')))value+=` ${unit}`;
  return value;
}
const sourceNotes: Record<string, ReturnType<typeof l>> = Object.fromEntries([
  l('以 / 或 ; 分隔的选项仍为独立配置；精度及输出指标取决于指定的采集电子。','Options separated by / or ; remain discrete choices. Accuracy and output specifications depend on the specified acquisition electronics.'),
  l('近点、最佳点和远点为不同测试条件。相对距离精度单位为千分比，不是百分比；静态与动态数值不能合并。','Near / sweet / far distances are distinct test conditions. Relative distance accuracy uses per mille (not percent). Static and dynamic figures must not be combined.'),
  l('型号专属规格表；可选电压和接口并非每种配置均包含。','Model-specific table. Optional voltage/interfaces are not included in every configuration.'),
  l('厂商日文规格表；○ 表示提供，(○) 表示选配。价格为来源中的历史报价，并非实时报价。','Manufacturer Japanese specification table; ○ available, (○) optional. Prices are historical source quotations, not a live offer.'),
  l('电气性能适用于所列电压及配置版本；峰值与额定负载不能互换。','Electrical performance at the stated supply voltage and configuration revision; peak and nominal loads are not interchangeable.'),
  l('系列共用规格字段。','Family-common field.'),
  l('厂商 v1.0 历史规格书，不保证当前供货状态。','Manufacturer v1.0 historical datasheet; not a current-availability guarantee.'),
  l('历史厂商规格；信号带宽、采样率和力估计能力不能互换。','Historical manufacturer specification. Signal bandwidth, sampling rate and force estimation are not interchangeable.'),
  l('负载取决于测量方法。V5 Sense 计划中的 Ethernet 支持不作为已提供接口。','Payload depends on the measurement method. Planned Ethernet support is not a current interface in V5 Sense.'),
  l('标准版与触觉版分别建档；此来源中的横线表示未配置该功能，不是测量值为零。','Standard and tactile editions are distinct. A dash means the function is absent, not a zero measurement.'),
  l('公制与英制数值为等价换算；精度取决于指定的校准板和测量范围。','Metric and imperial entries are equivalents; accuracy depends on the named calibration plate and measurement range.'),
  l('小数逗号采用欧洲记法；ADC 比值表示分辨率，不是工作量程。','Decimal commas use European notation. Sensor ADC ratios are resolutions, not operating ranges.'),
  l('历史手册，不保证当前供货或软件支持状态。','Historical manual; no present-day supply or software support guarantee.'),
  l('系列范围；单个定制传感器并不同时覆盖全部扭矩值或接口。','Series range; a custom sensor does not cover every torque value or interface simultaneously.'),
  l('厂商公开值。','Manufacturer claim'),l('仅柔性电路版本。','Flexible circuit model only'),l('仅六针版本。','6-pin model only'),
  l('来源表格含额外重复单元格。保留待核对，不分配到具体测量条件，也不用于数值筛选。','Source render contains an extra repeated cell. Preserved for review, not assigned to a measurement condition or numerical filter.'),
].map(note => [note.en, note]));
Object.assign(sourceNotes, {
  '電源電圧により変動':l('随供电电压变化。','Varies with supply voltage.'),
  '結露なきこと':l('不得结露。','Non-condensing.'),'結露無き事':l('不得结露。','Non-condensing.'),
  '突起部含まず':l('不含突出部分。','Excludes protrusions.'),
  '※RS422以外はオプション対応':l('除 RS422 外，其余接口为选配。','Interfaces other than RS422 are optional.'),
  'DynPickの消費電流を含む':l('包含 DynPick 的电流消耗。','Includes DynPick current consumption.'),
  'ケーブルを除く':l('不含线缆。','Excludes cable.'),
});
function localizedNote(note: string) {
  return sourceNotes[note] ?? l(note === '-' || note === 'ー' ? '' : note, note === '-' || note === 'ー' ? '' : note);
}
function localizedValue(label: string, value: string, company: string, locale: Locale) {
  const raw=valueWithUnit(label,value,['sensodrive','qbrobotics'].includes(company));
  const exact: Record<string, ReturnType<typeof l>> = {
    'Not fitted':l('未配置','Not fitted'),'Not published':l('未公开','Not published'),'TBD':l('待确定','TBD'),'Coming Soon':l('即将公布','Coming Soon'),
    '微型直流电机＋连杆传动':l('微型直流电机＋连杆传动','Miniature DC motors with linkage transmission'),
    '支持OTA在线升级':l('支持 OTA 在线升级','OTA firmware updates supported'),
  };
  return exact[raw]?.[locale] ?? raw;
}
const tableUses: Record<string, ReturnType<typeof l>> = {
  'dexterous-hand': l('用于机器人末端抓取、操作学习及遥操作集成。自由度、指尖力与整手负载分别描述不同能力，触觉版和标准版不能混用规格。', 'Intended for robotic grasping, manipulation learning and teleoperation integration. Degrees of freedom, fingertip force and whole-hand payload describe different capabilities; tactile and standard editions have separate specifications.'),
  'integrated-joint': l('用于机器人关节与实验执行机构。选型需要将持续扭矩、峰值、输出转速、减速比和散热条件联合考虑，不能用堵转值代替连续工作能力。', 'For robotic joints and experimental actuators. Selection combines continuous torque, peak capability, output speed, reduction ratio and thermal conditions; stall values do not establish continuous duty.'),
  'force-torque-sensor': l('用于受力测量与测试链路。量程、轴间干扰、分辨率和过载限制应分别核对；实际控制效果还取决于安装刚度、标定及采集电子。', 'For force measurement and testing chains. Range, cross-axis interference, resolution and overload limits require separate checks; control performance also depends on mounting stiffness, calibration and acquisition electronics.'),
  'sensor-general': l('用于应变与载荷测量链路。敏感栅形状、基底尺寸与阻值影响粘贴布置和电桥配置；目录中的通配后缀仍需转化为具体订货代码。', 'For strain and load measurement chains. Grid geometry, backing dimensions and resistance affect bonding layout and bridge configuration; catalog wildcard suffixes still require a resolved order code.'),
  'io-module': l('连接传感器模拟信号与上位控制系统。应分别确认输入信号、桥路激励、通道数量、输出接口和隔离要求；模块自身不等同于力传感器。', 'Connects sensor signals with host control systems. Confirm signal inputs, bridge excitation, channel count, output interfaces and isolation separately; the electronics are not themselves a force transducer.'),
  'tactile-sensor': l('通过接触反馈获得物体表面或接触状态信息。测量区域、分辨率、表面材料和校准条件共同限定结果，不宜将空间精度等同于力量程。', 'Uses contact feedback to measure surfaces or contact state. Measurement area, resolution, surface material and calibration conditions jointly bound the result; spatial accuracy is not a force range.'),
  'vision-sensor': l('为三维测量与机器人视觉提供空间数据。不同扫描模式、工作距离、激光颜色和曝光条件对应不同指标；视场与点间距需按实际安装距离核对。', 'Provides spatial data for 3D measurement and robot vision. Modes, working distances, laser colors and exposure conditions have distinct specifications; field of view and point spacing require the actual mounting distance.'),
};
function tableOverview(entry: typeof tables[number], type: ReturnType<typeof l>) {
  const priorities = /range|torque|speed|resolution|dimensions|supply|interface|degrees|自由度|量程|供电|质量|質量|定格容量|外形|基底|敏感栅/i;
  const eligible = entry.rows.filter(field => !/^(?:TBD|Coming Soon|Not published|[-—]+$)/i.test(field.value) && field.value.length < 140 && !/overload|过载|許容過負荷/i.test(field.label));
  const fields = [...eligible.filter(field => priorities.test(field.label)), ...eligible.filter(field => !priorities.test(field.label))].slice(0, 4);
  const specs = (locale: Locale) => fields.map(field => `${translated(field.label, locale)}: ${valueWithUnit(field.label, field.value, ['sensodrive','qbrobotics'].includes(entry.company))}`).join(locale === 'zh' ? '；' : '; ');
  return [l(`${entry.model} 是${type.zh}。公开规格包括${specs('zh')}。`, `${entry.model} is an ${type.en.toLowerCase()}. Published specifications include ${specs('en')}.`), tableUses[entry.kind]];
}
const tableProducts: Product15[] = tables.map((entry)=> {
  const hand=entry.kind==='dexterous-hand'; const motion=entry.kind==='integrated-joint'; const vision=entry.kind==='vision-sensor';
  const connection=['io-module','connector-cable'].includes(entry.kind);
  const profile=waveFifteenProfiles[entry.company];
  const type=l(hand?'多指电驱灵巧手':motion?'一体化关节':vision?'工业三维视觉传感器':connection?'测量链路接口组件':entry.kind==='sensor-general'?'应变测量元件':'接触与力学测量器件',hand?'Electrically driven dexterous hand':motion?'Integrated joint':vision?'Industrial 3D vision sensor':connection?'Acquisition-interface component':entry.kind==='sensor-general'?'Electrical strain-measurement element':'Instrument for contact and mechanical sensing');
  return {
    id:productId15(entry.company,entry.model),companySlug:entry.company,product:entry.model,pageUrl:entry.url,
    category:hand?'end-effector':motion?'motion':'perception',primary:hand?'manipulator-end-effector':motion?'motion-transmission':connection?'communication-connectivity':'sensing',subclass:entry.kind,
    useCases:['research','integration'],type,
    integration:profile.business,verification:profile.judgment,overview:tableOverview(entry,type),
    applications:[profile.users],coverage:entry.coverage as Product15['coverage'],level:entry.model.includes('**')||entry.model==='SensoTorque'?'family':'model',
    rows:entry.rows.map(r=>row(r.url,l('厂商规格表','Manufacturer specification table'),l(`${r.locator}；原字段：${r.label}`,`${r.locator}; original field: ${r.label}`),
      translated(r.label,'zh'),translated(r.label,'en'),localizedValue(r.label,r.value,entry.company,'zh'),localizedValue(r.label,r.value,entry.company,'en'),localizedNote(r.condition))),
  };
});
const isUnknownValue=(value:string)=>/^(?:Not published|Not stated|TBD|Coming Soon|未公开|待确定|即将公布|[-—－]+$)/i.test(value);
const seeds=[...tableProducts,...manualProducts15].map(seed=>({...seed,
  coverage:seed.coverage==='official-complete'&&seed.rows.some(r=>isUnknownValue(r.value.en))?'official-partial' as const:seed.coverage,
}));
const seedById=new Map(seeds.map(s=>[s.id,s]));
if(seedById.size!==seeds.length)throw new Error(`Duplicate wave-fifteen IDs: ${seeds.filter((s,i)=>seeds.findIndex(p=>p.id===s.id)!==i).map(s=>`${s.id} (${s.product})`).join(', ')}`);
export const waveFifteenProductManifest=seeds.map(s=>({id:s.id,company:s.companySlug,product:s.product,fields:s.rows.length,coverage:s.coverage,url:s.pageUrl}));

export function applyVerifiedWaveFifteenCompanyPatch(company: CompanyProfile, locale: Locale): CompanyProfile {
  if(!waveFifteenProfiles[company.slug])return company;
  const products=[...new Set([...seeds.filter(s=>s.companySlug===company.slug).map(s=>s.product),...company.products])];
  const patch=applyWaveFourteenCompanyPatch(company,locale,{[company.slug]:waveFifteenCompanySeed(company,locale,products)});
  return {...patch,milestones:[...new Map([...(company.milestones??[]),...(patch.milestones??[])].map(e=>[`${e.date}:${e.event}`,e])).values()],reviewedAt:'2026-09-05'};
}
export function getVerifiedWaveFifteenProductRecords(locale: Locale,companies: CompanyProfile[]): FinderExpansionRecord[] {
  const companySeeds=Object.fromEntries(companies.filter(c=>waveFifteenProfiles[c.slug]).map(c=>[c.slug,waveFifteenCompanySeed(c,locale,seeds.filter(s=>s.companySlug===c.slug).map(s=>s.product))]));
  return buildWaveFourteenRecords(locale,companies,companySeeds,seeds).map(record=>({
    ...record,reviewedAt:'2026-09-05',parameters:record.parameters.map((parameter,index)=>{
      const source=seedById.get(record.id)!.rows[index];
      if(isUnknownValue(parameter.value))return {...parameter,status:'unknown' as const,normalized:[]};
      // Electrical damage limits and source ambiguities must never satisfy operating filters.
      if(/absolute maximum|ambiguous source|conflicting sources|overload|recommended bench supply/i.test(source.label.en))return {...parameter,normalized:[]};
      // Keep source display intact; index a unit-bearing, unambiguous numeric projection.
      const value=source.value.en.replace(/\s+-\s+(?=\d)/g,' to ').replace(/(\d+(?:\.\d+)?)\s*mNm\b/g,(_,n)=>`${Number(n)/1000} Nm`).replace(/(\d+(?:\.\d+)?)\s*mN\b/g,(_,n)=>`${Number(n)/1000} N`);
      const indexed={...parameter,label:source.label.en,value};
      return {...parameter,normalized:normalizeFinderParameter(indexed).map(p=>({...p,sourceLabel:parameter.label}))};
    }),
  }));
}
