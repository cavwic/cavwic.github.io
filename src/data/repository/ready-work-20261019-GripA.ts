import type { FinderExpansionRecord, FinderParameter } from './product-finder-demo';
import type { Locale } from '../site';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { normalizeFinderParameter } from './parameter-index';

type Pair = readonly [zh: string, en: string];
type Cell = readonly [key: string, labelZh: string, labelEn: string, valueZh: string, valueEn?: string];
type Source = { url: string; version: string; sha256: string; condition: Pair };
type Row = {
  key: string;
  label: Pair;
  value: Pair;
  source: Source;
  locator: string;
  numeric: boolean;
};
type Patch = { companySlug: string; rows: Row[] };

const octagonal: Source = {
  url: 'https://en.inspire-robots.com/wp-content/uploads/2026/09/配件_八角接头-尺寸图.jpg',
  version: 'Unversioned embedded Octagonal Joint drawing; pinned parent HTML inspected 2026-10-19',
  sha256: 'e106f61175e730b885434405336cfa3960ed5f71d95269049880355cb4aba486',
  condition: ['仅适用于所注明的 AMI-LA-ACBO 后缀及图中视图。原图没有标明尺寸单位；保留字面标注，不补 mm，不由像素测量，不作额定性能。', 'Only the named AMI-LA-ACBO suffix and depicted view. No dimensional unit is printed in this image; literal callouts only, no inferred mm, pixel measurements or performance ratings.'],
};
const actuator: Source = {
  url: 'https://en.inspire-robots.com/wp-content/uploads/2026/09/配件_推杆接头-尺寸图.jpg',
  version: 'Unversioned embedded Actuator Joint drawing; pinned parent HTML inspected 2026-10-19',
  sha256: '9cfd40961cba8fd2ab37c10aa1df4487b3fbeeb8da7471ed23559509cc926e25',
  condition: ['仅适用于所注明的 AMI-LA-ACR1 后缀及视图。原图未标尺寸单位；字面标注不换算为 mm，不推导螺距、承载或加工公差。', 'Only the named AMI-LA-ACR1 suffix and view. The image gives no dimensional unit; callouts are not converted to mm and do not establish pitch, load capacity or unprinted manufacturing tolerances.'],
};
const ball: Source = {
  url: 'https://en.inspire-robots.com/wp-content/uploads/2026/09/配件_鱼眼接头-尺寸图.jpg',
  version: 'Unversioned Ball Joint image linked by the AMI-LA-BR-P30 page; inspected 2026-10-19',
  sha256: 'b2abd619a3a47047e199d1bddd0096f7f8be6b16ae13bd40f82fce08650b3654',
  condition: ['型号归属来自 Ball Joint 页面 MODEL: AMI-LA-BR-P30。原图无尺寸单位；以下仅保留原始几何和上下偏差标注，不补 mm，不作为整机尺寸或额定性能。', 'Model attribution is from the Ball Joint page MODEL: AMI-LA-BR-P30. The image has no dimensional unit; these are literal geometry/deviation callouts, not inferred mm, whole-system dimensions or performance ratings.'],
};
const tesollo: Source = {
  url: 'https://cdn.tesollo.com/site/docs/2026/08/10a30190-9e90-4732-8254-378badcdc4b0.pdf',
  version: 'DG-5F-S Hardware Manual 2.0.1 English (2026.07)',
  sha256: 'fba629092ae230c4db630a0601d23d03b5153657c16f2f72d2ca3076ea103a12',
  condition: ['仅限所注明的左手、参考姿态、视图或适配器。图框明确采用 mm；第 15/17 页注明近似尺寸。保留图面精度，不镜像推导、不测量像素，也不作为额定性能。', 'Only the specified left hand, reference pose, view or adapter. Drawing title blocks explicitly use mm; pages 15/17 state approximate dimensions. Printed precision is retained without mirroring, pixel measurement or conversion into performance ratings.'],
};
const qb: Source = {
  url: 'https://qbrobotics.com/wp-content/uploads/2023/01/qbSoftHand2-Research-User-manual-GENERAL-5.pdf',
  version: 'qbSoftHand2 Research General Manual V1.0.4, September 2, 2025',
  sha256: '3ff8af58aa738496190da701b416f460ade50972eedebb1a5a304ef9bd928264',
  condition: ['仅为该版 qbSoftHand2 Research 手册的条件、要求或图纸标注，不是现行法律判断、合规认证、功能安全验收或硬件运行验证；不外推到其他型号。', 'Conditions, instructions or drawing callouts in this qbSoftHand2 Research manual edition only, not a current legal determination, compliance certificate, functional-safety acceptance or hardware test; not extrapolated to other models.'],
};

function block(source: Source, locator: string, cells: readonly Cell[], condition?: Pair): Row[] {
  const scoped = condition ? { ...source, condition: [source.condition[0] + ' ' + condition[0], source.condition[1] + ' ' + condition[1]] as Pair } : source;
  return cells.map(([key, zh, en, valueZh, valueEn]) => ({ key, label: [zh, en], value: [valueZh, valueEn ?? valueZh], source: scoped, locator, numeric: false }));
}

const octagonalRows = block(octagonal, 'Octagonal Joint > Product Models, #e-n-tab-content-1716024132; named suffix panels', [
  ['acbo-s20-geometry', 'ACBO-S20 图面几何标注', 'ACBO-S20 literal geometry callouts', '6.10; 5.70; 2.30; 0.60; 4.60; diameter 4; R1; 1.70'],
  ['acbo-s20-fits', 'ACBO-S20 孔与叉口偏差', 'ACBO-S20 hole and fork deviations', 'diameter 2 (+0.02/0); 2 (0/-0.02)'],
  ['acbo-s20-installed', 'ACBO-S20 装配后孔心至执行器后端面', 'ACBO-S20 installed hole-center to actuator rear face', '2.80'],
  ['acbo-s30-geometry', 'ACBO-S30 图面几何标注', 'ACBO-S30 literal geometry callouts', '6.10; 6.80; 4.60; 2.80; 1.80; 0.60; diameter 4; 5; R1.50; 1.20'],
  ['acbo-s30-fits', 'ACBO-S30 孔与叉口偏差', 'ACBO-S30 hole and fork deviations', 'diameter 3 (+0.02/0); 3 (0/-0.02)'],
  ['acbo-s30-installed', 'ACBO-S30 装配后孔心至执行器后端面', 'ACBO-S30 installed hole-center to actuator rear face', '2.80'],
  ['acbo-t20-geometry', 'ACBO-T20 图面几何标注', 'ACBO-T20 literal geometry callouts', '6.10; 7.10; 2.10; 0.60; 3; 1; diameter 4; diameter 1.60; diameter 1.50'],
  ['acbo-t20-thread', 'ACBO-T20 螺纹标注', 'ACBO-T20 thread callout', 'M2-6g'],
  ['acbo-t20-installed', 'ACBO-T20 装配后顶面至执行器后端面', 'ACBO-T20 installed top surface to actuator rear face', '5.30'],
  ['acbo-t25-geometry', 'ACBO-T25 图面几何标注', 'ACBO-T25 literal geometry callouts', '6.10; 7.10; 2.10; 0.60; 3; 1; diameter 4; diameter 2.05; diameter 2'],
  ['acbo-t25-thread', 'ACBO-T25 螺纹标注', 'ACBO-T25 thread callout', 'M2.5-6g'],
  ['acbo-t25-installed', 'ACBO-T25 装配后顶面至执行器后端面', 'ACBO-T25 installed top surface to actuator rear face', '5.30'],
  ['acbo-t30-geometry', 'ACBO-T30 图面几何标注', 'ACBO-T30 literal geometry callouts', '6.10; 7.60; 2.10; 0.60; 3.50; 1; diameter 4; diameter 2.50; diameter 2.40'],
  ['acbo-t30-thread', 'ACBO-T30 螺纹标注', 'ACBO-T30 thread callout', 'M3-6g'],
  ['acbo-t30-installed', 'ACBO-T30 装配后顶面至执行器后端面', 'ACBO-T30 installed top surface to actuator rear face', '5.80'],
]);
const actuatorRows = block(actuator, 'Actuator Joint > Product Models, #e-n-tab-content-1716024132; named suffix panels', [
  ['acr1-s20-geometry', 'ACR1-S20 图面几何标注', 'ACR1-S20 literal geometry callouts', 'diameter 5; 7; 5.50; 3.50; 1.50; 0.80; 3; R1; R1.50'],
  ['acr1-s20-fits', 'ACR1-S20 孔与叉口偏差', 'ACR1-S20 hole and fork deviations', 'diameter 2 (+0.02/0); 2 (0/-0.02)'],
  ['acr1-s20-thread', 'ACR1-S20 螺纹标注', 'ACR1-S20 thread callout', 'M3-6g'],
  ['acr1-s30-geometry', 'ACR1-S30 图面几何标注', 'ACR1-S30 literal geometry callouts', 'diameter 5; 7.60; 5.50; 4.50; 1.50; 0.80; 3; R1.50; 6.10'],
  ['acr1-s30-fits', 'ACR1-S30 孔与叉口偏差', 'ACR1-S30 hole and fork deviations', 'diameter 3 (+0.02/0); 3 (0/-0.02)'],
  ['acr1-s30-thread', 'ACR1-S30 螺纹标注', 'ACR1-S30 thread callout', 'M3-6g'],
  ['acr1-t20-geometry', 'ACR1-T20 图面几何标注', 'ACR1-T20 literal geometry callouts', '10; 3; 2; 1; 1.50; 0.80; diameter 5; diameter 1.60; diameter 2.30'],
  ['acr1-t20-fits', 'ACR1-T20 扳手面偏差', 'ACR1-T20 wrench-flat deviation', '4.50 (0/-0.06)'],
  ['acr1-t20-threads', 'ACR1-T20 两端螺纹标注', 'ACR1-T20 two-end thread callouts', 'M2-6g; M3-6g'],
  ['acr1-t25-geometry', 'ACR1-T25 图面几何标注', 'ACR1-T25 literal geometry callouts', '10; 3; 2; 1; 1.50; 0.80; diameter 5; diameter 2.05; diameter 2.30'],
  ['acr1-t25-fits', 'ACR1-T25 扳手面偏差', 'ACR1-T25 wrench-flat deviation', '4.50 (0/-0.06)'],
  ['acr1-t25-threads', 'ACR1-T25 两端螺纹标注', 'ACR1-T25 two-end thread callouts', 'M2.5-6g; M3-6g'],
  ['acr1-t30-geometry', 'ACR1-T30 图面几何标注', 'ACR1-T30 literal geometry callouts', '10.50; 3.50; 2; 1; 3; 1.50; 0.80; diameter 5; diameter 2.50; diameter 2.30'],
  ['acr1-t30-fits', 'ACR1-T30 扳手面偏差', 'ACR1-T30 wrench-flat deviation', '4.50 (0/-0.06)'],
  ['acr1-t30-threads', 'ACR1-T30 两端螺纹标注', 'ACR1-T30 two-end thread callouts', 'M3-6g; M3-6g'],
]);
const ballRows = block(ball, 'Ball Joint > Product Models, #e-n-tab-content-1716024132; front and side views', [
  ['br-p30-geometry', 'BR-P30 图面几何标注', 'BR-P30 literal geometry callouts', '20.15; 4.50; 3.00; R5.15; diameter 5.00'],
  ['br-p30-hole', 'BR-P30 贯穿孔标注', 'BR-P30 through-hole callout', 'diameter 3.00 THRU'],
  ['br-p30-fits', 'BR-P30 两处宽度偏差', 'BR-P30 two width deviations', '7.60 (0/-0.05); 6 (0/-0.05)'],
]);

const adapterRows = block(tesollo, 'PDF p23; section 3.2.2 Adapter frame dimensions; orthographic views and SECTION A-A; title block Units:mm', [
  ['adapter-reference', '适配器图的用途边界', 'Adapter drawing purpose boundary', '仅供参考和接口信息；用户须验证具体机器人兼容性', 'Reference/interface information only; user must verify the specific robot compatibility'],
  ['adapter-outline', '适配器主视图圆形与平面标注', 'Adapter front-view circular and flat callouts', 'diameter 63.00 mm; 50.10 mm'],
  ['adapter-pcd', '适配器安装孔节圆标注', 'Adapter mounting-hole pitch-circle callout', 'PCD diameter 50.00 mm'],
  ['adapter-front-leaders', '适配器主视图成对尺寸引线', 'Adapter front-view paired dimension leaders', '29.50 / 29.50 mm; 25.00 / 25.00 mm; 30.30 mm'],
  ['adapter-corner', '适配器圆角及角度标注', 'Adapter corner and angle callouts', '4 x R7.00 mm; 45 deg; 90 deg'],
  ['adapter-m6', '适配器主视图沉孔标注', 'Adapter front-view counterbore callout', '4 x M6 C.BORE EQ SPACING'],
  ['adapter-section', '适配器 A-A 剖面台阶尺寸', 'Adapter SECTION A-A step dimensions', '7.50 mm; 6.50 mm'],
  ['adapter-chamfer', '适配器 A-A 剖面倒角', 'Adapter SECTION A-A chamfer', '1.00 mm x 45 deg'],
  ['adapter-side', '适配器侧视图尺寸引线', 'Adapter side-view dimension leaders', '21.50 mm; 17.00 mm; 3.50 mm'],
  ['adapter-m3', '适配器侧视图沉孔标注', 'Adapter side-view counterbore callout', '4 x M3 C.BORE'],
  ['adapter-blind', '适配器背面盲孔标注', 'Adapter rear-view blind-hole callout', '4 x diameter 6.00 mm BLIND HOLE EQ SPACING; 90 deg'],
], ['参考图不提供完整加工公差；不把盲孔直径当孔深。该共同适配器章节沿用两条既有 DG-5F-S 记录的适用范围。', 'This reference drawing is not a complete manufacturing-tolerance specification; blind-hole diameter is not hole depth. The common adapter chapter follows applicability already retained on both DG-5F-S records.']);

const left20Rows = block(tesollo, 'PDF p15; section 3.1.1; DG-5F-S (20-DoF) Left hand; approximate-dimension drawing', [
  ['left20-length', '20 自由度左手图面总长', '20-DoF left-hand drawing overall length', '215.50 mm'],
  ['left20-spread', '20 自由度左手图面展开宽度', '20-DoF left-hand drawing spread width', '188.80 mm'],
  ['left20-palm', '20 自由度左手图面掌宽与相邻引线', '20-DoF left-hand drawing palm and adjacent leaders', '90.10 mm; 19.60 mm'],
  ['left20-depth', '20 自由度左手图面深度', '20-DoF left-hand drawing depth', '56.90 mm'],
  ['left20-finger', '20 自由度左手指段水平引线', '20-DoF left-hand finger horizontal leader', '102.70 mm'],
  ['left20-thumb', '20 自由度左手拇指端宽引线', '20-DoF left-hand thumb-tip width leader', '16.10 mm'],
  ['left20-offset', '20 自由度左手底部水平引线', '20-DoF left-hand basal horizontal leader', '7.00 mm'],
  ['left20-interface', '20 自由度左手腕部图面标注', '20-DoF left-hand wrist drawing callouts', '30.00 x 50.00 mm; R8.00 mm'],
]);
const left17Rows = block(tesollo, 'PDF p17; section 3.1.1; left-hand drawing; title-block model DG-5F-S(15DoF), heading says20-DoF', [
  ['p17-conflict', '第 17 页左手配置标题冲突', 'Page17 left-hand configuration heading conflict', '页首写 20-DoF Left hand，图框写 DG-5F-S(15DoF)；未解决', 'Heading says20-DoF Left hand; title block says DG-5F-S(15DoF); unresolved'],
  ['p17-length', '第 17 页左手图面总长', 'Page17 left-hand drawing overall length', '189.50 mm'],
  ['p17-spread', '第 17 页左手图面展开宽度', 'Page17 left-hand drawing spread width', '162.80 mm'],
  ['p17-palm', '第 17 页左手掌宽与相邻引线', 'Page17 left-hand palm and adjacent leaders', '90.10 mm; 19.60 mm'],
  ['p17-depth', '第 17 页左手图面深度', 'Page17 left-hand drawing depth', '56.90 mm'],
  ['p17-finger', '第 17 页左手指段水平引线', 'Page17 left-hand finger horizontal leader', '76.70 mm'],
  ['p17-thumb', '第 17 页左手拇指两处引线', 'Page17 left-hand thumb pair of leaders', '24.70 mm; 16.10 mm'],
  ['p17-offset', '第 17 页左手底部水平引线', 'Page17 left-hand basal horizontal leader', '7.00 mm'],
  ['p17-interface', '第 17 页左手腕部图面标注', 'Page17 left-hand wrist drawing callouts', '30.00 x 50.00 mm; R8.00 mm'],
], ['仅按图框关联到既有 15-DoF 记录，不能据此消除页首 20-DoF 冲突；不作为无条件配置额定尺寸。', 'Attached to the existing15-DoF record only by the drawing title block, without resolving the conflicting20-DoF heading; not unconditional configuration ratings.']);

const qbRows = [
  ...block(qb, 'PDF p5; section1.1 Using this document and1.2 Symbols and conventions', [
    ['qb-document', '手册版本、可读性与移交要求', 'Manual edition, readability and handover requirements', '核对手册发布日期早于购买日期；保持完整可读，供操作维护人员随时查阅，并随产品移交', 'Check that manual release predates purchase; keep it complete/readable and accessible to operation/maintenance staff; pass it to subsequent owners/users'],
    ['qb-symbols', '手册警示符号的范围', 'Manual warning-symbol scope', 'CRITICAL/WARNING 标识设备损坏和人身伤害风险及规避信息，不是认证等级', 'CRITICAL/WARNING identify damage/injury risks and avoidance information, not certification levels'],
  ]),
  ...block(qb, 'PDF p8 / printed p4; sections2.1 Intended use and2.2 Safety instructions', [
    ['qb-use', '手册预期用途与对象限制', 'Manual intended-use and object restrictions', '研究、教育及安装于机械臂；不得抓取易碎、锋利或带锐边物体；不改变既有质量和歧义几何限制', 'Research/education and installation on robot arms; fragile, sharp or sharp-edged objects prohibited; existing mass and ambiguous geometry restrictions unchanged'],
    ['qb-training', '手册人员及断能要求', 'Manual personnel and de-energization requirements', '仅限经过专门培训的人员；安装、清洁、维护前断电并确认无残余能量；不用时关机或拔电', 'Specially trained staff only; disconnect power and remove residual energy before installation, cleaning or maintenance; switch off/unplug when unused'],
    ['qb-electrical', '手册电气与装配防护要求', 'Manual electrical and assembly precautions', '不得使用损坏的线缆、插头或松动插座；避免静电接触电气部件；确认可靠紧固与接线；不得使用损坏或有缺陷的产品；不得拆解', 'No damaged cable/plug or loose socket; avoid electrostatic contact with electronics; securely bolt and cable the hand; do not use a damaged/defective product; do not disassemble'],
    ['qb-moving', '手册运动及可燃品限制', 'Manual moving-part and flammable-product restrictions', '不在运动手指间放入物体；头面部远离工作范围；不穿宽松衣物或佩戴饰物；附近不用气雾剂、石油基润滑剂或可燃品', 'Keep objects out of moving fingers and head/face outside reach; no loose clothing/jewelry; no aerosols, petroleum-based lubricants or flammable products on/near the end effector'],
  ]),
  ...block(qb, 'PDF p9 / printed p5; section2.3 and subsections2.3.1-2.3.2', [
    ['qb-directives', '该版手册的指令适用性陈述', 'Manual-edition directive-applicability statements', '厂商在本手册称 2006/42/EC 和 2014/35/EU 不适用这些产品；仅记录其声明，不确认法律适用性或认证', 'Manufacturer states in this manual that2006/42/EC and2014/35/EU do not apply to these products; attributed statement only, not confirmation of legal applicability or certification'],
    ['qb-jurisdiction', '手册跨法域使用要求', 'Manual cross-jurisdiction use requirement', '在欧盟之外使用还须遵守相关国际、国家和地区要求；不得把文中电压阈值当作手部供电额定值', 'Outside the EU also observe relevant international,national and regional requirements; directive voltage thresholds are not hand supply ratings'],
  ]),
  ...block(qb, 'PDF p9 / printed p5; section2.4 Environmental conditions; WARNING list', [
    ['qb-risk', '手册风险评估前置要求', 'Manual prior risk-assessment requirement', '完成风险评估前以及超出允许工况和规格的使用均属不当用途', 'Use before risk assessment or outside permissible conditions/specifications is impermissible misuse'],
    ['qb-environment', '手册列明的禁止使用环境', 'Manual prohibited operating environments', '非低尘环境、高温或高湿、潮湿场所、潜在爆炸环境及户外；手册未在本节给出温湿度阈值', 'Non-low-dust environments,high temperature/humidity,wet places,potentially explosive atmospheres and outdoors; this section gives no temperature/humidity thresholds'],
    ['qb-critical', '手册列明的禁止应用', 'Manual prohibited applications', '医疗或生命关键应用、靠近头面眼区域、作为攀爬辅助；保留研究用途边界', 'Medical/life-critical applications,close to head/face/eyes,or as a climbing aid; retain research-use boundary'],
  ]),
  ...block(qb, 'PDF pp9-10 / printed pp5-6; section2.5 Environmental safety', [
    ['qb-disposal', '手册处置、RoHS 与 WEEE 声明', 'Manual disposal,RoHS and WEEE statements', '按适用国家要求处置；厂商称部件按 2011/65/EU 选取，并要求进口商遵守 2012/19/EU 的国家登记要求；未独立认证', 'Dispose under applicable national requirements; manufacturer states component selection under2011/65/EU and importer national-registration requirements under2012/19/EU; not independently certified'],
  ]),
  ...block(qb, 'PDF p11 / printed p7; section3.1 Figure1; flange top view and side view', [
    ['qb-flange-circle', '手册第 11 页法兰孔圆引线', 'Manual page11 flange hole-circle leader', 'diameter 50 mm'],
    ['qb-side77', '手册第 11 页侧视底部尺寸', 'Manual page11 side-view bottom dimension', '77 mm'],
    ['qb-drawing-boundary', '手册第 11 页图纸适用与尺度警告', 'Manual page11 drawing applicability and scale warning', '正文称左右手均适用，单位为 mm/deg，图可能不按比例；保留既有数据表的 71 mm 侧视标注，不强行统一', 'Text applies to both hands,with mm/deg units and an out-of-scale warning;retain the existing datasheet71 mm side-view callout without forcing reconciliation'],
  ]),
];

export const readyGripAProductPatches: Readonly<Record<string, Patch>> = {
  'inspire-robots-gripping-ami-la-acbo-s20-s30-t20-t25-t30-ceb61d': { companySlug: 'inspire-robots', rows: octagonalRows },
  'inspire-robots-gripping-ami-la-acr1-s20-s30-t20-t25-t30-159c0a': { companySlug: 'inspire-robots', rows: actuatorRows },
  'inspire-robots-gripping-ami-la-br-p30-027bed': { companySlug: 'inspire-robots', rows: ballRows },
  'tesollo-dg-5f-s': { companySlug: 'tesollo', rows: [...left20Rows, ...adapterRows] },
  'tesollo-gripping-dg-5f-s-15-dof-8331b2': { companySlug: 'tesollo', rows: [...left17Rows, ...adapterRows] },
  'qbrobotics-qb-softhand2-research': { companySlug: 'qbrobotics', rows: qbRows },
};

function localized(row: Row, locale: Locale): FinderParameter {
  const i = locale === 'en' ? 1 : 0;
  const canonical: FinderParameter = { label: row.label[1], value: row.value[1], status: 'manufacturer' };
  return {
    label: row.label[i],
    labelAliases: [...row.label],
    value: row.value[i],
    status: 'manufacturer',
    sourceUrl: row.source.url,
    sourceLabel: locale === 'en' ? 'Official source: bounded GripA extraction' : '官方来源：GripA 限定摘录',
    sourceLocator: `${row.source.version}; ${row.locator}; [GripA:${row.key}]`,
    conditions: `${row.source.condition[i]} SHA-256 ${row.source.sha256}`,
    normalized: row.numeric ? normalizeFinderParameter(canonical) : [],
  };
}

export function applyReadyGripAProduct(record: FinderExpansionRecord, locale: Locale): FinderExpansionRecord {
  const patch = readyGripAProductPatches[record.id];
  if (!patch || record.profile.slug !== patch.companySlug) return record;
  const parameters = [...record.parameters];
  for (const row of patch.rows) {
    const marker = `[GripA:${row.key}]`;
    const exists = parameters.some(p =>
      p.sourceLocator?.includes(marker) ||
      (p.sourceUrl === row.source.url && row.label.some(label => p.label === label || p.labelAliases?.includes(label)) && row.value.includes(p.value)),
    );
    if (!exists) parameters.push(localized(row, locale));
  }
  return parameters.length === record.parameters.length ? record : { ...record, parameters };
}

export const readyGripAProfiles: CatalogEnrichmentGroup = { profiles: {}, products: [], reviews: [] };
