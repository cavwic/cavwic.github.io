import type { FinderExpansionRecord, FinderParameter } from './product-finder-demo';
import type { Locale } from '../site';
import type { CatalogEnrichmentGroup, CatalogEnrichmentProduct } from './catalog-enrichment-types';

type Text = { zh: string; en: string };
type Row = CatalogEnrichmentProduct['rows'][number] & { key: string; evidencePath: string };
type Callout = [key: string, labelZh: string, labelEn: string, value: Text, view: string];
type Drawing = {
  id: string; model: string; memberId: string; sourceUrl: string; materialUrl: string;
  version: Text; locator: string; sha256: string; evidencePath: string; callouts: Callout[];
};
const l = (zh: string, en = zh): Text => ({ zh, en });
const dir='review/ready-work-2026-10-19/CnArms2';
const manual='https://developer.aubo-robotics.cn/hardware/user_manual/joint_module_r_user_manual.html';
const pdf='https://www.aubo-robotics.cn/Upload/2026/09/594e0bfc61144cd3b3774b1a6d181515.pdf';
const pdfSha='b7fca2883f30c32a41d6011fab74b71f4edb7ed06df81b8dfb96ee075192ff85';
const jointVersion=l('R 系列用户手册 v1.0.0* 试行版，2026-08-03','R-series user manual v1.0.0* trial edition, 2026-08-03');
const brochureVersion=l('iS 标准版，印刷修订日期 2026-08-26','iS standard edition, printed revision date 2026-08-26');
const holes=(count: number, thread: string, depth: string, diameter: string, boreDepth: string, fit='',eqs=true)=>l(
  `${count} x ${thread}${fit} 深 ${depth}${eqs?'，均布':''}；⌴ Ø${diameter} 深 ${boreDepth}`,
  `${count} x ${thread}${fit} depth ${depth}${eqs?', EQS':''}; ⌴ Ø${diameter} depth ${boreDepth}`,
);
const call=(key: string, zh: string, en: string, value: Text, view: string): Callout=>[key,zh,en,value,view];
const joints: Drawing[] = [
  {id:'aubo-robotics-parallel-arms-rs14fn',model:'RS14FN',memberId:'gap-8f933d7862471273:2',sourceUrl:'https://developer.aubo-robotics.cn/assets/AUBO-J-3-1-RS14FN.DKbGEQhl.png',materialUrl:`${manual}#_3-4-1-rs14fn`,version:jointVersion,locator:'§3.4.1 RS14FN',sha256:'3f077bc6857641033f1c30edc4b1a9a5b0bd13ef420938e95ab499683c5c91ac',evidencePath:`${dir}/RS14FN.png`,callouts:[
    call('front-hole','端视孔组','End-view hole group',holes(8,'M2.5','4','2.9','5'),'upper-left end view, upper-right leader'),
    call('side-hole','侧视孔组','Side-view hole group',holes(8,'M2.5','3','2.9','2.5'),'upper-right side view, top leader'),
    call('circle','端视圆径标注','End-view circle diameter',l('Ø41'),'upper-left end view'),
    call('fits','侧视配合标注','Side-view fit callouts',l('Ø49.5 h7; Ø52 h7'),'upper-right side view'),
    call('axial','侧视补充轴向尺寸','Additional side-view axial dimensions',l('65.4; 18; 3'),'upper-right side view; tabulated overall 68.4 not reimported'),
  ]},
  {id:'aubo-robotics-parallel-arms-rp14fn',model:'RP14FN',memberId:'gap-20ce4c93777e05bb:2',sourceUrl:'https://developer.aubo-robotics.cn/assets/AUBO-J-3-2-RP14FN.DtJZr5H0.png',materialUrl:`${manual}#_3-4-2-rp14fn`,version:jointVersion,locator:'§3.4.2 RP14FN',sha256:'8035ebb51ab7cabb788f539dc8caf1d89daebcb9d37edb7422807e1df70dfa0d',evidencePath:`${dir}/RP14FN.png`,callouts:[
    call('hole-a','端视上方引线孔组','End-view upper leader hole group',holes(8,'M2.5','4','2.9','7'),'upper-left end view, upper leader'),
    call('hole-b','端视右方引线孔组','End-view right leader hole group',holes(8,'M3','6','3.2','5'),'upper-left end view, right leader'),
    call('circles','端视圆径标注','End-view circle diameters',l('Ø41; Ø55'),'upper-left end view'),
    call('fits','侧视配合标注','Side-view fit callouts',l('Ø50 h7; Ø60 h7'),'upper-right side view'),
    call('axial','侧视补充轴向尺寸','Additional side-view axial dimensions',l('71.6; 20'),'upper-right side view; tabulated overall 74.6 not reimported'),
  ]},
  {id:'aubo-robotics-parallel-arms-rp17fn',model:'RP17FN',memberId:'gap-5d875b0976045cf4:2',sourceUrl:'https://developer.aubo-robotics.cn/assets/AUBO-J-3-3-RP17FN.Cv9PElKh.png',materialUrl:`${manual}#_3-4-3-rp17fn`,version:jointVersion,locator:'§3.4.3 RP17FN',sha256:'099b68b954ad1ae0ac350c64ba31b7dc5c36dcbb66a8cdd29fb9697297c327d0',evidencePath:`${dir}/RP17FN.png`,callouts:[
    call('hole-a','端视上方引线孔组','End-view upper leader hole group',holes(8,'M3','5','3.3','7'),'upper-left end view, upper leader'),
    call('hole-b','端视右方引线孔组','End-view right leader hole group',holes(8,'M3','6','3.2','5.5'),'upper-left end view, right leader'),
    call('circles','端视圆径标注','End-view circle diameters',l('Ø50; Ø65'),'upper-left end view'),
    call('fits','侧视配合标注','Side-view fit callouts',l('Ø60 h7; Ø70 h7'),'upper-right side view'),
    call('axial','侧视补充轴向尺寸','Additional side-view axial dimensions',l('79.8; 22.5'),'upper-right side view; tabulated overall 82.8 not reimported'),
    call('bore-note','图示贯通孔（保留旧表）','Drawing through-hole (table retained)',l('Ø10 贯通；旧表中心孔径 10.5 mm 原样保留','Ø10 through; existing table central bore 10.5 mm retained verbatim'),'upper-left end view, lower-left bore leader; no datum/unit equivalence or conflict adjudication'),
  ]},
  {id:'aubo-robotics-parallel-arms-rp20fn',model:'RP20FN',memberId:'gap-84dda96a94f1d8aa:2',sourceUrl:'https://developer.aubo-robotics.cn/assets/AUBO-J-3-4-RP20FN.BTiXQYDj.png',materialUrl:`${manual}#_3-4-4-rp20fn`,version:jointVersion,locator:'§3.4.4 RP20FN',sha256:'e288be64572da7c445bf21d944387fd61504cf243f12f945283327cc9d86405d',evidencePath:`${dir}/RP20FN.png`,callouts:[
    call('hole-a','端视上方引线孔组','End-view upper leader hole group',holes(12,'M3','5','3.3','8'),'upper-left end view, upper leader'),
    call('hole-b','端视右方引线孔组','End-view right leader hole group',holes(12,'M3','6','3.2','6'),'upper-left end view, right leader'),
    call('circles','端视圆径标注','End-view circle diameters',l('Ø59; Ø75'),'upper-left end view'),
    call('fits','侧视配合标注','Side-view fit callouts',l('Ø70 h7; Ø80 h7'),'upper-right side view'),
    call('axial','侧视补充轴向尺寸','Additional side-view axial dimensions',l('85.6; 24'),'upper-right side view; tabulated overall 88.6 not reimported'),
  ]},
  {id:'aubo-robotics-parallel-arms-rp25fn',model:'RP25FN',memberId:'gap-0bb4196ada2590ad:2',sourceUrl:'https://developer.aubo-robotics.cn/assets/AUBO-J-3-5-RP25FN.CkxoTr23.png',materialUrl:`${manual}#_3-4-5-rp25fn`,version:jointVersion,locator:'§3.4.5 RP25FN',sha256:'98299068d85d286ad79c51e939e585b5d43046dace1b43519174eff568662c0c',evidencePath:`${dir}/RP25FN.png`,callouts:[
    call('hole-a','端视上方引线孔组','End-view upper leader hole group',holes(10,'M4','8','4.3','6.5','-6H',false),'upper-left end view, upper leader'),
    call('hole-b','端视左方引线孔组','End-view left leader hole group',holes(10,'M4','5','4.5','7.5','-6H',false),'upper-left end view, left leader'),
    call('circles','端视圆径标注','End-view circle diameters',l('Ø72; Ø87.50'),'upper-left end view'),
    call('fits','侧视配合与极限偏差','Side-view fits and limit deviations',l('Ø81 h7 (0/-0.04); Ø94 h7 (0/-0.04)'),'upper-middle side view'),
    call('axial','侧视局部轴向尺寸','Local side-view axial dimensions',l('26; 3.50'),'upper-middle side view'),
    call('extent-note','图示轴向尺寸（保留旧表）','Drawing axial extent (table retained)',l('104.10；旧表外形高度 97 mm 原样保留；不认定为同一基准','104.10; existing table envelope height 97 mm retained verbatim; same datum not established'),'upper-middle side view, bottom overall leader; no forced equivalence to table height'),
  ]},
];

type ArmDrawing = { model: string; memberId: string; page: number; panel: string; vertical: string; horizontal: string; workspace: Text; flangeFront: Text; flangeSide: string; baseFront: Text; baseSide: string };
const flange4=l('Ø50；Ø6 (+0.03/0) 深6，位置度 Ø0.05；4 x M6 深6 均布；45°','Ø50; Ø6 (+0.03/0) depth 6, position Ø0.05; 4 x M6 depth 6 EQS; 45°');
const flange6=l('Ø50；Ø6 (+0.03/0) 深6，位置度 Ø0.05；6 x M6 深6 均布；30°','Ø50; Ø6 (+0.03/0) depth 6, position Ø0.05; 6 x M6 depth 6 EQS; 30°');
const arms: ArmDrawing[] = [
  {model:'iS3',memberId:'gap-ca5821a3ad0e040a:2',page:3,panel:'right upper',vertical:'625; 102.5; 256.5; 266; 156',horizontal:'94; 120.5',workspace:l('上图：球面 SR522.5、柱面 R200；下图：球面 R522.5、Ø400；P 点','Upper: spherical SR522.5, cylindrical R200; lower: spherical R522.5, Ø400; P point'),flangeFront:flange4,flangeSide:'Ø31.50 H7 (+0.03/0); 63 h7 (0/-0.03); (Ø75); (49); 8; 7',baseFront:l('Ø126；Ø140；2 x Ø6 (+0.03/0)，位置度 Ø0.05；4 x Ø6.6 均布；45°；126；10；引线标记 1','Ø126; Ø140; 2 x Ø6 (+0.03/0), position Ø0.05; 4 x Ø6.6 EQS; 45°; 126; 10; leader marker 1'),baseSide:'10.2'},
  {model:'iS7',memberId:'gap-9458c07831450cd3:2',page:3,panel:'right lower',vertical:'886.5; 102.5; 376; 408; 122',horizontal:'94; 121.5',workspace:l('球面 SR784；柱面 Ø450；下图 Ø450；P 点','Spherical SR784; cylindrical Ø450; lower Ø450; P point'),flangeFront:flange4,flangeSide:'Ø31.50 H7 (+0.03/0); 63 h7 (0/-0.03); (Ø75); (49); 8; 7',baseFront:l('Ø148；(Ø170)；Ø6 (+0.03/0)，位置度 Ø0.05；4 x Ø8.5 均布；45°；146.64；10','Ø148; (Ø170); Ø6 (+0.03/0), position Ø0.05; 4 x Ø8.5 EQS; 45°; 146.64; 10'),baseSide:'(42); (22); 13'},
  {model:'iS10',memberId:'gap-b5a98ea60becaa29:2',page:4,panel:'left upper',vertical:'1300; 115; 572; 613; 157',horizontal:'102; 185',workspace:l('球面 SR1185；柱面 Ø610；下图 Ø610；P 点','Spherical SR1185; cylindrical Ø610; lower Ø610; P point'),flangeFront:flange4,flangeSide:'31.5 H7 (+0.03/0); Ø63 (0/-0.03); Ø75; (Ø87); (57); 8; 6.5',baseFront:l('(Ø218)；Ø185；2 x Ø8 (+0.02/0)，位置度 0.2；4 x Ø11 均布，位置度 0.2；45°；185','(Ø218); Ø185; 2 x Ø8 (+0.02/0), position 0.2; 4 x Ø11 EQS, position 0.2; 45°; 185'),baseSide:'(46); Ø18; 17; 20'},
  {model:'iS16',memberId:'gap-a517965330593556:2',page:4,panel:'left lower',vertical:'1900; 125; 875; 900; 185.5',horizontal:'108.3; 181',workspace:l('球面 SR1775；上图柱面 R450；下图 Ø900；P 点','Spherical SR1775; upper cylindrical R450; lower Ø900; P point'),flangeFront:flange6,flangeSide:'Ø31.5 (+0.03/0); Ø63 (0/-0.03); Ø80; (Ø98); (61); 8; 7',baseFront:l('(Ø260)；Ø223；2 x Ø10 (+0.03/0)，位置度 0.05；4 x Ø13.30 均布；45°；50','(Ø260); Ø223; 2 x Ø10 (+0.03/0), position 0.05; 4 x Ø13.30 EQS; 45°; 50'),baseSide:'(60); (20); 20'},
  {model:'iS20',memberId:'gap-e627b27881f1aeea:2',page:4,panel:'right upper',vertical:'1647; 125; 719; 803; 185.5',horizontal:'108.3; 181',workspace:l('球面 SR1521；柱面 Ø720；下图 Ø720；P 点','Spherical SR1521; cylindrical Ø720; lower Ø720; P point'),flangeFront:flange6,flangeSide:'Ø31.5 (+0.03/0); Ø63 (0/-0.03); Ø80; (Ø98); (61); 8; 7',baseFront:l('(Ø260)；Ø223；2 x Ø10 (+0.03/0)，位置度 0.05；4 x Ø13.30 均布；45°；50','(Ø260); Ø223; 2 x Ø10 (+0.03/0), position 0.05; 4 x Ø13.30 EQS; 45°; 50'),baseSide:'(60); (20); 20'},
  {model:'iS20L',memberId:'gap-caada96d80c5477e:2',page:4,panel:'right lower',vertical:'2000; 125; 825; 1050; 210.5',horizontal:'108.3; 208',workspace:l('球面 SR1875；柱面 Ø800；下图 Ø800；P 点','Spherical SR1875; cylindrical Ø800; lower Ø800; P point'),flangeFront:flange6,flangeSide:'Ø31.5 (+0.03/0); Ø63 (0/-0.03); Ø80; (Ø98); (61); 8; 7',baseFront:l('(Ø282)；Ø248；2 x Ø10 (+0.02/0)；6 x Ø13.3 均布；30°；80 ±0.03','(Ø282); Ø248; 2 x Ø10 (+0.02/0); 6 x Ø13.3 EQS; 30°; 80 ±0.03'),baseSide:'(60); 30'},
  {model:'iS25',memberId:'gap-d6be87b9cf711c95:2',page:5,panel:'left upper',vertical:'1700; 125; 719; 856; 210.5',horizontal:'108.3; 208',workspace:l('球面 SR1575；柱面 Ø800；下图 Ø800；P 点','Spherical SR1575; cylindrical Ø800; lower Ø800; P point'),flangeFront:flange6,flangeSide:'Ø31.5 (+0.03/0); Ø63 (0/-0.03); Ø80; (Ø98); (61); 8; 7',baseFront:l('(Ø282)；Ø248；2 x Ø10 (+0.02/0)；6 x Ø13.3 均布；30°；80 ±0.03','(Ø282); Ø248; 2 x Ø10 (+0.02/0); 6 x Ø13.3 EQS; 30°; 80 ±0.03'),baseSide:'(60); 30'},
  {model:'iS35',memberId:'gap-745f665ef1b10e52:2',page:5,panel:'left lower',vertical:'2100; 140.5; 959.5; 1000; 377.6',horizontal:'129.5; 245.5',workspace:l('球面 SR1959.5；柱面 Ø900；下图 Ø900；P 点','Spherical SR1959.5; cylindrical Ø900; lower Ø900; P point'),flangeFront:l('Ø80；Ø116；Ø8 H7 (+0.02/0) 深14；6-M8X14（按印刷标注）','Ø80; Ø116; Ø8 H7 (+0.02/0) depth 14; 6-M8X14 (as printed)'),flangeSide:'Ø50 H7 (+0.03/0); Ø100 h7 (0/-0.04); Ø116; 8; 8',baseFront:l('(Ø423)；(Ø315)；8-Ø17 贯穿；⌴ Ø33 深20；220（水平/竖直）；289.1（水平/竖直）','(Ø423); (Ø315); 8-Ø17 through; ⌴ Ø33 depth 20; 220 (horizontal/vertical); 289.1 (horizontal/vertical)'),baseSide:'(100); 18; 38'},
];
const armDrawings: Drawing[]=arms.map(arm=>({
  id:`aubo-robotics-parallel-arms-aubo-${arm.model.toLowerCase()}`,model:`AUBO-${arm.model}`,memberId:arm.memberId,
  sourceUrl:`${pdf}#page=${arm.page}`,materialUrl:`${pdf}#page=${arm.page}`,version:brochureVersion,sha256:pdfSha,
  locator:`PDF physical p${arm.page}, ${arm.panel} ${arm.model} Dimension Drawings`,evidencePath:`${dir}/${arm.model}-drawing.png`,callouts:[
    call('vertical','外形图竖向尺寸链','Exterior drawing vertical dimension chain',l(arm.vertical),'left exterior view, vertical dimension leaders (not total height inferred from reach)'),
    call('horizontal','外形图横向标注','Exterior drawing horizontal callouts',l(arm.horizontal),'left exterior view, horizontal dimension leaders'),
    call('p-point','本体 P 点范围印刷标注','Printed body P-point workspace callouts',arm.workspace,'middle upper/lower P-point range diagrams, labeled values only, no sampled curve coordinates'),
    call('flange-front','末端法兰端视孔位与公差','Tool-flange end-view holes and tolerances',arm.flangeFront,'upper-right tool-flange front view'),
    call('flange-side','末端法兰剖视标注','Tool-flange section callouts',l(arm.flangeSide),'upper-right tool-flange sectional view; parentheses retained'),
    call('base-front','基座端视孔位与尺寸','Base end-view holes and dimensions',arm.baseFront,'lower-right base front view; parentheses retained'),
    call('base-side','基座侧视标注','Base side-view callouts',l(arm.baseSide),'lower-right base side/section view; parentheses retained'),
  ],
}));

// These are literal, source-qualified drawing groups, never generic robot dimensions.
export const readyCnArms2Patches=[...joints,...armDrawings].map(drawing=>({
  ...drawing,
  rows:drawing.callouts.map(([key,zh,en,value,view]):Row=>({
    key,label:l(`图纸／${zh}`,`Drawing / ${en}`),value,sourceUrl:drawing.sourceUrl,
    sourceLabel:l(`AUBO 官方：${drawing.version.zh}；SHA256 ${drawing.sha256}`,`Official AUBO: ${drawing.version.en}; SHA256 ${drawing.sha256}`),
    locator:l(`${drawing.locator}；${drawing.model}；${view}`,`${drawing.locator}; exact ${drawing.model}; ${view}`),
    conditions:l(`仅对应具名 ${drawing.model} 图示配置；${drawing.version.zh}。仅抄读印刷标注，不测量像素、不采样曲线；括号尺寸与公差原样保留。图内未独立注明线性单位，不补单位、不换算；不把图纸标注当作整机单值参数或移用于 Pro/SE/Ex/Medical 等版本。手册图示供参考，制造装配应另核实交付版图纸。`,`Exact named ${drawing.model} illustrated configuration only; ${drawing.version.en}. Printed callouts only, no pixel measurement or curve sampling. Parentheses and tolerances are retained. Linear units are not independently stated inside these drawings: no unit assignment or conversion. Not whole-robot scalar parameters or values for Pro/SE/Ex/Medical revisions. Manual figures are illustrative; confirm delivery-specific manufacturing/assembly drawings separately.`),
    excludeFromNumericIndex:true,evidencePath:drawing.evidencePath,
  })),
  materials:[{label:l(`${drawing.model} 图纸：${drawing.locator}（${drawing.version.zh}）`,`${drawing.model} drawings: ${drawing.locator} (${drawing.version.en})`),url:drawing.materialUrl}],
}));
const byId=new Map(readyCnArms2Patches.map(patch=>[patch.id,patch]));
const key=(text:string)=>text.normalize('NFKC').replace(/\s/g,'').toLowerCase();
const hasLabel=(field:FinderParameter,row:Row)=>[field.label,...field.labelAliases||[]].some(label=>[row.label.zh,row.label.en].some(candidate=>key(candidate)===key(label)));

export function applyReadyCnArms2Product(record:FinderExpansionRecord,locale:Locale):FinderExpansionRecord {
  const patch=byId.get(record.id);
  if(!patch||record.profile.slug!=='aubo-robotics'||record.product!==patch.model)return record;
  const extra=patch.rows.filter(row=>!record.parameters.some(field=>hasLabel(field,row))).map((row):FinderParameter=>({
    label:row.label[locale],labelAliases:[row.label.zh,row.label.en],value:row.value[locale],status:'manufacturer',
    sourceUrl:row.sourceUrl,sourceLabel:row.sourceLabel[locale],sourceLocator:row.locator[locale],conditions:row.conditions?.[locale],normalized:[],
  }));
  const links=record.evidence?patch.materials.filter(link=>!record.evidence!.sourceLinks.some(old=>old.url===link.url&&[link.label.zh,link.label.en].includes(old.label))).map(link=>({label:link.label[locale],url:link.url})):[];
  if(!extra.length&&!links.length)return record;
  return {...record,parameters:extra.length?[...record.parameters,...extra]:record.parameters,...(record.evidence&&links.length?{evidence:{...record.evidence,sourceLinks:[...record.evidence.sourceLinks,...links]}}:{})};
}

export const readyCnArms2Profiles:CatalogEnrichmentGroup={profiles:{},products:[],reviews:[]};
