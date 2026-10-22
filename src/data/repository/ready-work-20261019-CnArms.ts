import type { FinderExpansionRecord, FinderParameter } from './product-finder-demo';
import type { Locale } from '../site';
import type { CatalogEnrichmentGroup, CatalogEnrichmentProduct } from './catalog-enrichment-types';
import { normalizeFinderParameter } from './parameter-index';

type Text = { zh: string; en: string };
type Row = CatalogEnrichmentProduct['rows'][number] & { key: string };
type Base = {
  model: string; page: 1 | 2; side: 'left' | 'right';
  payload: number; reach: number; j3: number; speeds: number[];
  tcp: number; repeat: number; power: number; nano: boolean;
};
type Column = {
  id: string; model: string; base: string; mode: 'standard' | 'M' | 'X';
  mass: number; supply: string; boxMass?: number;
};
const l = (zh: string, en = zh): Text => ({ zh, en });
const pdf = 'https://tmwebtest.blob.core.windows.net/triwebtest/docs/797ceeca199c5941/TM_Robot_Catalog_260407EN_SPEC.pdf';
const pdfSha = '76d598ecb3612fd1e0d4b06a716942dbfe2e60a6c8b76b1ecbc941a89290f46b';
const version = 'TM_Robot_Catalog_260407EN_SPEC, pinned two-page edition';

const bases: Base[] = [
  {model:'TM5S',page:1,side:'left',payload:5,reach:946,j3:158,speeds:[210,210,210,225,225,450],tcp:4.5,repeat:0.03,power:240,nano:true},
  {model:'TM6S',page:1,side:'left',payload:6,reach:1800,j3:166,speeds:[130,130,210,225,225,450],tcp:4.5,repeat:0.10,power:400,nano:true},
  {model:'TM7S',page:1,side:'left',payload:7,reach:758,j3:152,speeds:[210,210,210,225,225,450],tcp:4.5,repeat:0.03,power:240,nano:true},
  {model:'TM12S',page:1,side:'left',payload:12,reach:1300,j3:162,speeds:[130,130,210,225,225,450],tcp:4.5,repeat:0.03,power:400,nano:true},
  {model:'TM14S',page:1,side:'right',payload:14,reach:1100,j3:159,speeds:[130,130,210,225,225,450],tcp:4.5,repeat:0.03,power:400,nano:true},
  {model:'TM20S',page:1,side:'right',payload:20,reach:1300,j3:162,speeds:[130,95,125,160,190,225],tcp:4.5,repeat:0.05,power:400,nano:true},
  {model:'TM25S',page:1,side:'right',payload:25,reach:1902,j3:166,speeds:[100,100,130,195,210,225],tcp:5.2,repeat:0.05,power:580,nano:false},
  {model:'TM30S',page:1,side:'right',payload:30,reach:1702,j3:170,speeds:[100,100,130,195,210,225],tcp:5.2,repeat:0.05,power:580,nano:false},
  {model:'TM30SC',page:1,side:'right',payload:30,reach:1502,j3:168,speeds:[100,100,130,195,210,225],tcp:5.0,repeat:0.05,power:580,nano:false},
  {model:'TM5-700',page:2,side:'left',payload:6,reach:746,j3:155,speeds:[180,180,180,225,225,225],tcp:4,repeat:0.05,power:220,nano:false},
  {model:'TM5-900',page:2,side:'left',payload:4,reach:946,j3:155,speeds:[180,180,180,225,225,225],tcp:4,repeat:0.05,power:220,nano:false},
  {model:'TM12',page:2,side:'right',payload:12,reach:1300,j3:166,speeds:[120,120,180,180,180,180],tcp:4,repeat:0.10,power:300,nano:false},
  {model:'TM14',page:2,side:'right',payload:14,reach:1100,j3:163,speeds:[120,120,180,150,150,180],tcp:4,repeat:0.10,power:300,nano:false},
  {model:'TM16',page:2,side:'right',payload:16,reach:917,j3:155,speeds:[120,120,180,180,180,180],tcp:4,repeat:0.10,power:300,nano:false},
  {model:'TM20',page:2,side:'right',payload:20,reach:1300,j3:166,speeds:[90,90,120,150,180,225],tcp:4,repeat:0.10,power:300,nano:false},
];

// The 45 entries are literal printed columns, not an option Cartesian product.
const columns: Column[] = [
  {id:'techman-tm5s',model:'TM5S',base:'TM5S',mode:'standard',mass:23.9,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm6s',model:'TM6S',base:'TM6S',mode:'standard',mass:35.5,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm7s',model:'TM7S',base:'TM7S',mode:'standard',mass:22.9,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm12s',model:'TM12S',base:'TM12S',mode:'standard',mass:33.3,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm5s-m',model:'TM5S-M',base:'TM5S',mode:'M',mass:23.9,boxMass:8.9,supply:'24-60 VDC'},
  {id:'techman-tm6s-m',model:'TM6S-M',base:'TM6S',mode:'M',mass:35.5,boxMass:8.9,supply:'24-60 VDC'},
  {id:'techman-tm7s-m',model:'TM7S-M',base:'TM7S',mode:'M',mass:22.9,boxMass:8.9,supply:'24-60 VDC'},
  {id:'techman-tm12s-m',model:'TM12S-M',base:'TM12S',mode:'M',mass:33.3,boxMass:8.9,supply:'24-60 VDC'},
  {id:'techman-tm5s-x',model:'TM5S-X',base:'TM5S',mode:'X',mass:23.6,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm6s-x',model:'TM6S-X',base:'TM6S',mode:'X',mass:35.2,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm7s-x',model:'TM7S-X',base:'TM7S',mode:'X',mass:22.6,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm12s-x',model:'TM12S-X',base:'TM12S',mode:'X',mass:33,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm14s',model:'TM14S',base:'TM14S',mode:'standard',mass:33,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm20s',model:'TM20S',base:'TM20S',mode:'standard',mass:33.3,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm25s',model:'TM25S',base:'TM25S',mode:'standard',mass:82.1,boxMass:16.3,supply:'200-240 VAC, 50-60 Hz'},
  {id:'techman-tm30s',model:'TM30S',base:'TM30S',mode:'standard',mass:81.1,boxMass:16.3,supply:'200-240 VAC, 50-60 Hz'},
  {id:'techman-tm30sc',model:'TM30SC',base:'TM30SC',mode:'standard',mass:79.7,boxMass:16.3,supply:'200-240 VAC, 50-60 Hz'},
  {id:'techman-tm14s-m',model:'TM14S-M',base:'TM14S',mode:'M',mass:33,boxMass:8.9,supply:'24-60 VDC'},
  {id:'techman-tm20s-m',model:'TM20S-M',base:'TM20S',mode:'M',mass:33.3,boxMass:8.9,supply:'24-60 VDC'},
  {id:'techman-tm25s-m',model:'TM25S-M',base:'TM25S',mode:'M',mass:82.1,boxMass:11.7,supply:'48-60 VDC'},
  {id:'techman-tm30s-m',model:'TM30S-M',base:'TM30S',mode:'M',mass:81.1,boxMass:11.7,supply:'48-60 VDC'},
  {id:'techman-tm30sc-m',model:'TM30SC-M',base:'TM30SC',mode:'M',mass:79.7,boxMass:11.7,supply:'48-60 VDC'},
  {id:'techman-tm14s-x',model:'TM14S-X',base:'TM14S',mode:'X',mass:32.7,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm20s-x',model:'TM20S-X',base:'TM20S',mode:'X',mass:33,boxMass:13.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm25s-x',model:'TM25S-X',base:'TM25S',mode:'X',mass:81.8,boxMass:16.3,supply:'200-240 VAC, 50-60 Hz'},
  {id:'techman-tm30s-x',model:'TM30S-X',base:'TM30S',mode:'X',mass:80.8,boxMass:16.3,supply:'200-240 VAC, 50-60 Hz'},
  {id:'techman-tm30sc-x',model:'TM30SC-X',base:'TM30SC',mode:'X',mass:79.4,boxMass:16.3,supply:'200-240 VAC, 50-60 Hz'},
  {id:'techman-tm5-700',model:'TM5-700',base:'TM5-700',mode:'standard',mass:22.1,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm5-900',model:'TM5-900',base:'TM5-900',mode:'standard',mass:22.6,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm5m-700',model:'TM5M-700',base:'TM5-700',mode:'M',mass:22.1,supply:'22-60 VDC'},
  {id:'techman-tm5m-900',model:'TM5M-900',base:'TM5-900',mode:'M',mass:22.6,supply:'22-60 VDC'},
  {id:'techman-tm5x-700',model:'TM5X-700',base:'TM5-700',mode:'X',mass:21.8,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm5x-900',model:'TM5X-900',base:'TM5-900',mode:'X',mass:22.3,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm12',model:'TM12',base:'TM12',mode:'standard',mass:32.8,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm14',model:'TM14',base:'TM14',mode:'standard',mass:32.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm16',model:'TM16',base:'TM16',mode:'standard',mass:32,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm20',model:'TM20',base:'TM20',mode:'standard',mass:32.8,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm12m',model:'TM12M',base:'TM12',mode:'M',mass:32.8,supply:'22-60 VDC'},
  {id:'techman-tm14m',model:'TM14M',base:'TM14',mode:'M',mass:32.5,supply:'22-60 VDC'},
  {id:'techman-tm16m',model:'TM16M',base:'TM16',mode:'M',mass:32,supply:'22-60 VDC'},
  {id:'techman-tm20m',model:'TM20M',base:'TM20',mode:'M',mass:32.8,supply:'24-60 VDC'},
  {id:'techman-tm12x',model:'TM12X',base:'TM12',mode:'X',mass:32.5,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm14x',model:'TM14X',base:'TM14',mode:'X',mass:32.2,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm16x',model:'TM16X',base:'TM16',mode:'X',mass:31.7,supply:'100-240 VAC, 50-60 Hz'},
  {id:'techman-tm20x',model:'TM20X',base:'TM20',mode:'X',mass:32.5,supply:'100-240 VAC, 50-60 Hz'},
];

function sourceRows(column: Column): Row[] {
  const base = bases.find(b => b.model === column.base)!;
  const s = base.page === 1;
  const result: Row[] = [];
  const condition = l(
    `固定版 260407，第 ${base.page} 页 ${column.model} 列；仅该配置，合并单元格仅按印刷覆盖列归属，不代表当前可订购或独立测试。`,
    `Pinned edition 260407, page ${base.page}, ${column.model} column only. Shared cells follow their printed column span; no current orderability or independent validation is implied.`,
  );
  const put = (key: string, zh: string, en: string, value: Text, section = 'Specification', excluded = false, extra?: Text) => {
    result.push({key,label:l(zh,en),value,sourceUrl:pdf,sourceLabel:l(`TM 官方 260407 两页规格表；SHA256 ${pdfSha}`,`${version}; SHA256 ${pdfSha}`),locator:l(`第 ${base.page} 页，${base.side === 'left' ? '左' : '右'}表，${column.model} 列，${section} / ${en}`,`PDF p${base.page}, ${base.side} table, exact ${column.model} column, ${section} / ${en}`),conditions:extra?l(`${condition.zh} ${extra.zh}`,`${condition.en} ${extra.en}`):condition,...(excluded?{excludeFromNumericIndex:true}:{})});
  };
  put('mass','本体质量','Robot mass',l(`${column.mass} kg`));
  put('payload','最大负载','Maximum payload',l(`${base.payload} kg`),'Specification',true,l('最大负载非任意重心/速度下的连续载荷。','Maximum payload is not a continuous rating at arbitrary center of gravity or speed.'));
  put('reach','最大工作半径','Maximum reach',l(`${base.reach} mm`));
  put('dof','自由度','Degrees of freedom',l('6 个旋转关节','6 rotating joints'));
  const otherRanges=s||column.mode==='X'?'+/-360 deg':'J1/J6 +/-270 deg; J2/J4/J5 +/-180 deg';
  const joints=l('关节编号、逐轴范围及逐轴速度保留原始分组；不把编号或不同轴值混入整机单值索引。','Joint identifiers and per-axis limits remain grouped; identifiers and different-axis values are excluded from whole-robot scalar indexing.');
  put('ranges','J1/J2/J4/J5/J6 关节范围','J1/J2/J4/J5/J6 joint ranges',l(otherRanges),'Specification > Joint Ranges',true,joints);
  put('j3','J3 关节范围','J3 joint range',l(`+/-${base.j3} deg`),'Specification > Joint Ranges',true,joints);
  put('speeds','最大关节速度','Maximum joint speeds',l(base.speeds.map((v,i)=>`J${i+1} ${v} deg/s`).join('; ')),s?'Specification > Speed (six J1-J6 rows)':'Specification > Speed (five rows: merged J1/J2, then J3, J4, J5, J6)',true,joints);
  put('tcp','最大 TCP 速度','Maximum TCP speed',l(`${base.tcp} m/s`));
  put('repeat','重复定位精度','Repeatability',l(`+/-${base.repeat.toFixed(2)} mm`));
  if(s)put('boxMass','标准控制箱质量','Standard controller weight',l(`${column.boxMass} kg`),'Specification > Control Box Weight',true,l('控制箱部件质量，不作为机器人本体质量索引。','Control-box component mass, not robot-arm mass.'));
  put('digitalIO','控制箱数字 I/O','Controller digital I/O',l('16 路输入 / 16 路输出','16 inputs / 16 outputs'),'Specification > I/O',true);
  put('analogIO','控制箱模拟 I/O','Controller analog I/O',s?l('2 路输入 / 2 路输出','2 inputs / 2 outputs'):l('2 路输入 / 1 路输出','2 inputs / 1 output'),'Specification > I/O',true);
  put('toolDigitalIO','工具端数字 I/O','Tool digital I/O',s?l('3 路输入 / 3 路输出','3 inputs / 3 outputs'):l('4 路输入 / 4 路输出','4 inputs / 4 outputs'),'Specification > I/O',true);
  if(s)put('toolMultiplex','工具端复用通信','Tool multiplexed communication',l('DO_0 可复用为 AI；DO_1/DO_2 可复用为 RS-485 -/+','DO_0 can be multiplexed as AI; DO_1/DO_2 can be multiplexed as RS-485 -/+'),'Specification > I/O',true);
  else put('toolAnalogIO','工具端模拟 I/O','Tool analog I/O',l('1 路输入 / 0 路输出','1 input / 0 outputs'),'Specification > I/O',true);
  put('ioPower','I/O 供电','I/O power supply',l('控制箱 24 V 2.0 A；工具端 24 V 1.5 A','Controller 24 V 2.0 A; tool 24 V 1.5 A'),'Specification > I/O Power Supply',true);
  put('armIP','机械臂防护等级','Robot-arm ingress protection',l(s?'IP65':'IP54'));
  put('boxIP','控制箱防护等级','Controller ingress protection',l(s?'IP54':'IP32'),'Specification > IP Classification',true);
  put('power','典型功耗','Typical power consumption',l(`${base.power} W`));
  put('temperature','工作温度','Operating temperature',l('0-50°C'));
  put('clean','洁净等级','Cleanroom class',l('ISO Class 3'),'Specification',true);
  put('supply',column.mode==='M'?'直流供电':'交流供电',column.mode==='M'?'DC power supply':'AC power supply',l(column.supply),'Specification > Power Supply',true);
  put('physicalIO','控制箱物理接口','Controller physical interfaces',l(s?'2 x COM; 1 x HDMI; 3 x LAN; 2 x USB 2.0; 4 x USB 3.0':'3 x COM; 1 x HDMI; 3 x LAN; 4 x USB 2.0; 2 x USB 3.0'),'Specification > I/O Interface',true);
  put('protocols','通信协议','Communication protocols',l(s?'RS-232, RS-422/RS-485, Ethernet, Modbus TCP/RTU master and slave':'RS-232, Ethernet, Modbus TCP/RTU master and slave'),'Specification > Communication',true);
  put('networks','可选网络卡','Optional network cards',l('PROFINET, EtherNet/IP, EtherCAT, CC-Link'),'Specification > Communication / footnote (1)',true,l('可选指定网络卡；详细规格需联系厂商，不据此认定所有协议默认同时启用。','Specified optional network cards; contact the manufacturer for detailed specifications, not all protocols enabled by default.'));
  put('programming','编程环境','Programming environments',s?l('TMflow（流程图）、TMscript（脚本）、TMcraft（开发）','TMflow (flowchart), TMscript (script), TMcraft (developer)'):l('TMflow（流程图/脚本）','TMflow (flowchart/script)'),'Specification > Programming Environment',true);
  put('safety','安全标准','Safety standards',l('ISO 13849-1, ISO 10218-1, ISO/TS 15066'),'Specification > Certification',true,l('仅转录规格表所列认证/标准，不外推系统集成功能安全认证。','Only the sheet-listed certification/standards, not certification of an integrated system.'));
  if(s)put('tuv','规格表所列 TÜV 认证','Sheet-listed TÜV certification',l('TÜV：ISO 13849-1, ISO 10218-1, ISO/TS 15066','TÜV: ISO 13849-1, ISO 10218-1, ISO/TS 15066'),'Specification > Certification > TÜV',true,l('仅为制造商规格表中的认证机构与标准标注，未单独核验认证证书或系统集成认证。','Manufacturer-sheet certification body and standards only; no separate certificate or integrated-system certification is verified.'));
  if(s)put('sgs','SGS 所列控制设备认证','SGS-listed equipment certification',l('UL1740, CAN/CSA Z424-14 (R2019)'),'Specification > Certification',true);
  const nsf=s&&base.nano;
  put('certOptions','CE 与可选认证项','CE and optional certification items',l(nsf?'CE; NSF/ANSI 169（可选）; SEMI S2（可选）':'CE; SEMI S2（可选）',nsf?'CE; NSF/ANSI 169 (optional); SEMI S2 (optional)':'CE; SEMI S2 (optional)'),'Specification > Certification',true);
  if(s){
    if(base.nano){
      put('nanoMass','Nano 控制箱质量','Nano control-box mass',l('7.2 kg'),'Nano Control Box > Control Box Weight',true);
      put('nanoDimensions','Nano 控制箱尺寸','Nano control-box dimensions',l('156.5 x 359.0 x 322.1 mm'),'Nano Control Box > Control Box Dimension',true);
      put('nanoIP','Nano 控制箱防护标记','Nano control-box IP entry',l('表内标记 N/A','Sheet entry N/A'),'Nano Control Box > IP Classification',true);
      put('nanoSupply','Nano 控制箱供电','Nano control-box power supply',l(column.mode==='M'?'42-60 VDC':'200-240 VAC, 50-60 Hz'),'Nano Control Box > Power Supply',true,l('Nano 配置独立于上方标准控制箱，不用其电压覆盖标准控制箱。','Nano configuration is separate from the main control box; its voltage does not replace the main supply.'));
      put('nanoPower','Nano 配置典型功耗','Nano configuration typical power consumption',l(`${base.power} W`),'Nano Control Box > Typical Power Consumption',true);
    }else put('nanoNA','Nano 控制箱适用性','Nano control-box applicability',l('此列 Nano Control Box 整块标记 N/A','This column has N/A for the Nano Control Box block'),'Nano Control Box',true);
  }
  if(column.mode!=='X'){
    put('aiFunction','AI 功能','AI functions',l('分类、物体检测、分割、异常检测、AI OCR','Classification, Object Detection, Segmentation, Anomaly Detection, AI OCR'),'AI & Robot Vision > AI Function',true);
    put('visionApplication','视觉应用','Vision applications',l('定位、1D/2D 条码读取、OCR、缺陷检测、测量、装配检查','Positioning, 1D/2D barcode reading, OCR, defect detection, measurement, assembly check'),'AI & Robot Vision > Application',true);
    const lab=l('脚注 (2)：TM 实验室工作距离 100 mm；实际精度受现场光源、物体特性及视觉程序影响。','Footnote (2): TM laboratory working distance 100 mm; practical accuracy varies with ambient light, object characteristics and vision-programming methods.');
    put('vision2d','视觉二维定位精度','Vision 2D positioning accuracy',l('0.1 mm'),'AI & Robot Vision > Positioning Accuracy / footnote (2)',true,lab);
    const accuracy=s?'0.10 / 0.20 / 0.33 mm':'0.24 / 0.53 / 1.00 mm';
    put('vision3d','TM Landmark 三维定位精度','TM Landmark 3D positioning accuracy',l(`工作点距 Landmark 100 / 200 / 300 mm：${accuracy}`,`Working point distance from Landmark 100 / 200 / 300 mm: ${accuracy}`),'AI & Robot Vision > Positioning Accuracy / footnote (2)',true,lab);
    put('eyeInHand','内置手眼相机','Built-in eye-in-hand camera',l('自动对焦彩色相机，5M 分辨率；工作距离 100 mm 至无穷','Auto-focused color camera, 5M resolution; working distance 100 mm to infinity'),'AI & Robot Vision > Eye in Hand (Built in)',true);
  }else put('visionNA','AI 与内置视觉适用性','AI and built-in vision applicability',l('此列 AI 功能、视觉应用、定位精度和内置手眼相机标记 N/A','This column marks AI functions, vision applications, positioning accuracy and built-in eye-in-hand camera N/A'),'AI & Robot Vision',true);
  put('eyeToHand','可选眼在手外相机组合','Optional eye-to-hand camera combinations',l('最多 2 台 GigE 2D 相机，或 1 台 GigE 2D 相机 + 1 台 3D 相机','Maximum 2 GigE 2D cameras, or 1 GigE 2D camera + 1 3D camera'),'AI & Robot Vision > Eye to Hand (Optional) / footnote (3)',true,l('脚注 (3)：兼容相机具体型号见 TM Plug & Play 官方列表；不据此补写相机型号。','Footnote (3): compatible camera models refer to the official TM Plug & Play list; no camera model is inferred.'));
  if(s){
    const standard=['TM25S','TM30S','TM30SC'].includes(base.model);
    const forceCondition=standard?l('此型号列 Force Sensing 标为 Standard；不得加算选配质量。','The exact model column labels Force Sensing Standard; no optional mass increment is added.'):l('此型号列 Force Sensing 标为 Optional；脚注 (4) 说明选配时总质量增加 500 g，不改写本体质量。','The exact model column labels Force Sensing Optional; footnote (4) gives a 500 g total-weight increase when selected, not a revised bare-arm mass.');
    put('forceAvailability','力传感配置','Force-sensing configuration',l(standard?'标准配置':'可选配置',standard?'Standard':'Optional'),'Force Sensing / footnote (4)',true,forceCondition);
    if(!standard)put('forceMass','选配力传感总质量增量','Optional force-sensing total-mass increment',l('500 g'),'Force Sensing / footnote (4)',true,forceCondition);
    put('forceRange','力传感 x/y/z 量程','Force-sensing x/y/z range',l('+/-300 N'),'Force Sensing > Force x-y-z > Range',true,forceCondition);
    put('forcePrecision','力传感精密度','Force-sensing precision',l('2 % F.S.'),'Force Sensing > Force x-y-z > Precision',true,forceCondition);
    put('forceAccuracy','力传感准确度','Force-sensing accuracy',l('5.5 % F.S.'),'Force Sensing > Force x-y-z > Accuracy',true,forceCondition);
    put('torqueRange','扭矩传感 x/y/z 量程','Torque-sensing x/y/z range',l('+/-30 Nm'),'Force Sensing > Torque x-y-z > Range',true,forceCondition);
    put('torquePrecision','扭矩传感精密度','Torque-sensing precision',l('0.3 % F.S.'),'Force Sensing > Torque x-y-z > Precision',true,forceCondition);
    put('torqueAccuracy','扭矩传感准确度','Torque-sensing accuracy',l('5 % F.S.'),'Force Sensing > Torque x-y-z > Accuracy',true,forceCondition);
  }
  return result;
}

export const readyCnArmsSourceColumns = columns.map(column=>({ ...column, page:bases.find(base=>base.model===column.base)!.page, rows:sourceRows(column) }));
const byId = new Map(readyCnArmsSourceColumns.map(c=>[c.id,c]));
const textKey = (value: string) => value.normalize('NFKC').replace(/±/g,'+/-').replace(/°/g,'deg').replace(/[\s,;、；()（）]/g,'').toLowerCase();
function sameValue(field: FinderParameter, row: Row) {
  if(row.key==='speeds'){
    const speeds: Record<string,number> = {};
    for(const match of field.value.matchAll(/\b((?:J[1-6](?:\/J?[1-6])*))\s+([\d.]+)\s*(?:°|deg)\/s/g)) for(const joint of match[1].split('/'))speeds[joint.startsWith('J')?joint:`J${joint}`]=Number(match[2]);
    const column=readyCnArmsSourceColumns.find(c=>c.rows.includes(row));
    const expected=bases.find(b=>b.model===column?.base)?.speeds;
    return expected?.every((value,i)=>speeds[`J${i+1}`]===value)??false;
  }
  if([row.value.zh,row.value.en].some(value=>textKey(value)===textKey(field.value)))return true;
  if(['mass','payload','reach','j3','tcp','repeat','power','boxMass'].includes(row.key)){
    const before=normalizeFinderParameter({...field,label:row.label.en});
    const after=normalizeFinderParameter({...field,label:row.label.en,value:row.value.en});
    const values=(items:typeof before)=>JSON.stringify(items.map(({metric,unit,values})=>({metric,unit,values})));
    return before.length>0&&values(before)===values(after);
  }
  return false;
}
const compareKeys = new Set(['mass','payload','reach','j3','speeds','tcp','repeat','power','boxMass','supply']);
const matchesLabel = (field: FinderParameter, row: Row) => [field.label,...field.labelAliases||[]].some(label=>[row.label.zh,row.label.en].some(candidate=>textKey(candidate)===textKey(label)));
function localizedRow(row: Row, locale: Locale): FinderParameter {
  const field: FinderParameter={label:row.label[locale],labelAliases:[row.label.zh,row.label.en],value:row.value[locale],status:'manufacturer',sourceUrl:row.sourceUrl,sourceLabel:row.sourceLabel[locale],sourceLocator:row.locator[locale],conditions:row.conditions?.[locale]};
  const canonical={...field,label:row.label.en,value:row.value.en.replace(/(\d)\s*-\s*(?=\d)/g,'$1 to ')};
  return {...field,normalized:row.excludeFromNumericIndex?[]:normalizeFinderParameter(canonical).map(metric=>({...metric,sourceLabel:field.label}))};
}
function discrepancy(row: Row, locale: Locale, original: FinderParameter): FinderParameter {
  const label=l(`来源差异：${row.label.zh}（260407）`,`Source discrepancy: ${row.label.en} (260407)`);
  return {...localizedRow(row,locale),label:label[locale],labelAliases:[label.zh,label.en],normalized:[],conditions:`${row.conditions?.[locale]||''} ${locale==='zh'?'既有行原样保留；此处为固定版规格表值，不裁定制造商冲突。':'Existing row retained verbatim; this is the pinned-sheet value, not an adjudication of the discrepancy.'} ${original.value}`};
}
export function applyReadyCnArmsProduct(record: FinderExpansionRecord, locale: Locale): FinderExpansionRecord {
  const column=byId.get(record.id);
  if(!column||record.profile.slug!=='techman-robot'||record.product!==column.model)return record;
  const appended: FinderParameter[]=[];
  for(const row of column.rows){
    const present=record.parameters.find(field=>matchesLabel(field,row));
    if(present){
      if(!compareKeys.has(row.key)||sameValue(present,row))continue;
      const conflict=discrepancy(row,locale,present);
      if(!record.parameters.some(field=>field.label===conflict.label&&field.value===conflict.value))appended.push(conflict);
      continue;
    }
    const field=localizedRow(row,locale);
    if(![...record.parameters,...appended].some(existing=>matchesLabel(existing,row)&&[row.value.zh,row.value.en].includes(existing.value)))appended.push(field);
  }
  return appended.length?{...record,parameters:[...record.parameters,...appended]}:record;
}

const newProducts: CatalogEnrichmentProduct[] = readyCnArmsSourceColumns.filter(c=>c.mode!=='standard').map(column=>({
  id:column.id,companySlug:'techman-robot',product:column.model,pageUrl:`${pdf}#page=${column.page}`,
  category:'robot-platform',primary:'robot-platform',subclass:'industrial-arm',useCases:['manufacturing','integration','research'],
  type:l('规格表具名协作机械臂配置','Named collaborative-arm configuration in the specification sheet'),
  integration:l('按本列电源、控制箱和视觉配置集成；不继承同系列其他配置。','Integrate using this column\'s supply, control-box and vision configuration, not another variant.'),
  verification:l('确认订单版本、负载工况、控制箱和选配；固定规格表不证明当前可订购。','Confirm ordered revision, load conditions, control box and options; the pinned sheet does not prove current orderability.'),
  rows:column.rows,coverage:'official-partial',level:'model',specificationKind:'parameters',
  overview:[l(`官方 260407 两页规格表明确列出的 ${column.model} 配置；与基本型号及另一 M/X 配置分开记录。`,`The ${column.model} configuration explicitly printed in the pinned 260407 two-page sheet, recorded separately from the base and other M/X configurations.`)],
  applications:[l('厂商规格表所述协作机器人集成；现场风险评估另行确认。','Collaborative-robot integration described by the manufacturer sheet; site risk assessment remains separate.')],
  sourceLinks:[{label:l(`${column.model} 官方规格表，第 ${column.page} 页（260407）`,`${column.model} official specification, PDF page ${column.page} (260407)`),url:`${pdf}#page=${column.page}`}],
}));

export const readyCnArmsProfiles: CatalogEnrichmentGroup = {
  profiles:{
    'techman-robot':{},
    'aubo-robotics':{
      timeline:[
        {date:'2015',kind:'funding',title:l('官网历程记载天使轮投资','Official timeline records angel investment'),detail:l('官网发展历程将“6000万天使轮投资”置于 2015 年节点；原文未注明币种，未列投资方或月日。这是公司历程陈述，不是经审计财务报表。','The official history places "60 million angel investment" in the 2015 node. Currency, investors and month/day are not specified. This is a company-timeline statement, not an audited financial account.'),sourceUrl:'https://www.aubo-robotics.cn/about'},
        {date:'2017',kind:'funding',title:l('官网历程记载 6000 万元 A 轮融资','Official timeline records 60 million yuan Series A financing'),detail:l('官网发展历程将“获得6000万元A轮融资”置于 2017 年节点；仅保留原文“元”单位及年份，不补投资方、估值或月日，不将融资当作收入。','The official history places "60 million yuan Series A financing" in the 2017 node. Only the printed yuan unit and year are retained; no investors, valuation or month/day are added, and financing is not revenue.'),sourceUrl:'https://www.aubo-robotics.cn/about'},
      ],
      investmentView:[l('来源为遨博（北京）智能科技股份有限公司官网发展历程固定快照：2015 年天使轮原文“6000万”未注明币种；2017 年 A 轮原文“6000万元”。未按人民币推断天使轮币种，未合计两轮金额，未新增经审计财务、估值或经营收入。','Source: the pinned official history of AUBO (Beijing) Robotics Technology Co., Ltd. The 2015 angel entry prints "60 million" without currency; the 2017 Series A entry prints "60 million yuan". No angel-entry CNY assumption, round aggregation, audited accounts, valuation or operating revenue is added.')],
    },
  },
  products:newProducts,
  reviews:[],
};
