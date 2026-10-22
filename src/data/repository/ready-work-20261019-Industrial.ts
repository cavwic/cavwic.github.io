import type { Locale } from '../site';
import type { FinderExpansionRecord, FinderParameter } from './product-finder-demo';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';

const l = (zh: string, en: string) => ({ zh, en });
const thk = 'https://tech.thk.com/upload/catalog_claim/pdf/209e_kr.pdf';
const misumi = 'https://jp.misumi-ec.com/maker/misumi/mech/special/actuator_portal/rs/download/pdf/RS_E_V200.pdf';
export const industrialSourceHashes = {
  thk: 'c8fdc49bb6a13856e5f4e0563c743ee34f489e00757808d72ee293a83a35e6c9',
  misumi: '8a52aef0a346da32bc62d44973cf1766f2d064e2b5db1db473b7d12fa2d24606',
};
type Row = { label: ReturnType<typeof l>; value: ReturnType<typeof l>; locator: string; page: number };
const row = (page: number, locator: string, zh: string, en: string, valueZh: string, valueEn = valueZh): Row => ({ page, locator, label:l(zh,en), value:l(valueZh,valueEn) });
const drawing = (page: number, code: string, viewZh: string, viewEn: string, valueZh: string, valueEn = valueZh) => {
  const codeEn = code.replace('无外罩',' without cover').replace('带外罩',' with cover').replace('光电传感器','photo sensors').replace('各图传感器挡块','shown sensor-dog configurations');
  return row(page, `KR33 ${codeEn}; ${viewEn}`, `KR33安装图 / ${code} / ${viewZh}`, `KR33 mounting drawing / ${codeEn} / ${viewEn}`, valueZh, valueEn);
};

// Callouts follow the cited drawing view; they are not actuator envelope ratings.
export const thkKr33DrawingRows: Row[] = [
  drawing(75,'EE-SX671无外罩','传感器安装参考尺寸（垂直/局部水平/总水平）','sensor mounting references without cover (vertical/partial horizontal/overall horizontal)','(2.2); (20.8); (33.7)'),
  drawing(75,'EE-SX671带外罩','传感器安装参考尺寸（垂直/局部水平/总水平）','sensor mounting references with cover (vertical/partial horizontal/overall horizontal)','(2.2); (20.7); (33.7)'),
  drawing(75,'EE-SX674无外罩','传感器安装参考尺寸（垂直/局部水平/总水平）','sensor mounting references without cover (vertical/partial horizontal/overall horizontal)','(1.7); (14.5); (20.7)'),
  drawing(75,'EE-SX674带外罩','传感器安装参考尺寸（垂直/局部水平/总水平）','sensor mounting references with cover (vertical/partial horizontal/overall horizontal)','(1.7); (14.5); (20.7)'),
  drawing(75,'APM-D3A1-001/APM-D3B1-003无外罩','传感器安装参考尺寸（垂直/局部水平）','sensor mounting references without cover (vertical/partial horizontal)','(8.8); (12.5)'),
  drawing(75,'APM-D3A1-001/APM-D3B1-003带外罩','传感器安装参考尺寸（垂直/局部水平/底部水平）','sensor mounting references with cover (vertical/partial horizontal/lower horizontal)','(9); (12.4); (13)'),
  drawing(75,'GX-F12A/GX-F12B/GX-F12A-P/GX-F12B-P无外罩','传感器安装参考尺寸（垂直/局部水平）','sensor mounting references without cover (vertical/partial horizontal)','(8.8); (14.5)'),
  drawing(75,'GX-F12A/GX-F12B/GX-F12A-P/GX-F12B-P带外罩','传感器安装参考尺寸（垂直/局部水平）','sensor mounting references with cover (vertical/partial horizontal)','(9); (14.5)'),
  drawing(75,'EE-SX671','传感器选项对应','sensor option mapping','符号2；EE-SX671；OMRON Corporation；不是THK自制传感器','symbol2; EE-SX671; OMRON Corporation; not a THK-manufactured sensor'),
  drawing(75,'APM-D3A1-001/APM-D3B1-003','传感器选项对应','sensor option mapping','符号7/B/E；APM-D3A1-001或APM-D3B1-003；Azbil Corporation','symbols7/B/E; APM-D3A1-001 or APM-D3B1-003; Azbil Corporation'),
  drawing(75,'光电传感器','随附连接器与安装','photo-sensor included connectors and installation','EE-1001（OMRON Corporation）×3；客户自行安装','EE-1001 (OMRON Corporation)x3 included; to be mounted by customer'),
  drawing(75,'各图传感器挡块','挡块宽度与短滑块条件','sensor-dog width and short-block condition','图示各光电/接近传感器的挡块宽15 mm；括号10 mm仅对应短滑块规格，不是传感器外壳宽度。','sensor-dog width15 mm for the shown photo/proximity configurations; parenthesized10 mm is for short-block specifications,not sensor-body width.'),
  drawing(77,'A0','正视图水平尺寸（外至内）','front horizontal dimensions (outer to inner)','60; 40; 32'),
  drawing(77,'A0','正视图垂直尺寸及下方偏移','front vertical dimensions and lower offset','44.5; 44; 8; 22.5; 0.5'),
  drawing(77,'A0','正视图钻通孔','front drilled through holes','2-3.5钻通','2-3.5 drill through'),
  drawing(77,'A0','正视图螺纹孔及节圆','front tapped holes and pitch circle','4-M4深10; PCD40; 间隔90°; 与水平中心线成±45°','4-M4 depth10; PCD40; spaced90 degrees; +/-45 degrees to horizontal centerline'),
  drawing(77,'A0','侧视图第一排轴向尺寸','side first-row axial dimensions','10; 31; 18'),
  drawing(77,'A0','侧视图第二排轴向尺寸','side second-row axial dimensions','25; 9; 25'),
  drawing(77,'A0','侧视图台阶与直径','side step and diameter callouts','3; Ø30H8; Ø28; Ø6h7'),
  drawing(77,'AP','正视图外形、孔位尺寸','front outline and hole-position dimensions','42; 32; 40; 6'),
  drawing(77,'AP','螺纹孔与钻通孔','tapped and drilled holes','4-M3深10; PCD45; 间隔90°; 2-M3通孔; 2-3.4钻通','4-M3 depth10; PCD45; spaced90 degrees; 2-M3 through; 2-3.4 drill through'),
  drawing(77,'AP','侧视图轴向尺寸与直径','side axial dimensions and diameters','12; 10; 3.5; Ø30H7; Ø28'),
  drawing(77,'AQ','正视图外形、孔位尺寸','front outline and hole-position dimensions','42; 32; 40; 6'),
  drawing(77,'AQ','螺纹孔与钻通孔','tapped and drilled holes','4-M4深10; PCD46; 间隔90°; 2-M3通孔; 2-3.4钻通','4-M4 depth10; PCD46; spaced90 degrees; 2-M3 through; 2-3.4 drill through'),
  drawing(77,'AQ','侧视图轴向尺寸与直径','side axial dimensions and diameters','12; 10; 3.5; Ø30H7; Ø28'),
  drawing(77,'AR','正视图水平、垂直与孔位尺寸','front horizontal, vertical and hole-position dimensions','水平42/32/31; 垂直42/31; 孔位8','horizontal42/32/31; vertical42/31; hole offset8'),
  drawing(77,'AR','通孔及节圆角度','through holes and pitch-circle angle','2-M3通孔（上方）; 下方2-M3通孔（PCD40，30°）','2-M3 through (upper); lower2-M3 through (PCD40,30 degrees)'),
  drawing(77,'AR','背面沉孔','rear counterbore','4-3.4钻通; Ø6.5沉孔深4; 从背面加工','4-3.4 drill through; Ø6.5 counterbore depth4; from back surface'),
  drawing(77,'AR','侧视图轴向尺寸与配合孔','side axial dimensions and mating bore','9; 7; Ø22H7'),
  drawing(77,'AT','正视图水平、垂直与孔位尺寸','front horizontal, vertical and hole-position dimensions','水平56.4/47.14/32; 垂直56.4/47.14; 孔位6','horizontal56.4/47.14/32; vertical56.4/47.14; hole offset6'),
  drawing(77,'AT','螺纹孔及背面通孔','tapped holes and rear through holes','4-M4深10; 2-M3通孔（从背面）; 2-3.4钻通','4-M4 depth10; 2-M3 through (from back surface); 2-3.4 drill through'),
  drawing(77,'AT','侧视图轴向尺寸、配合公差与下方偏移','side axial dimensions, fit tolerance and lower offset','12; 10; 2.5; Ø38(+0.15/+0.05); Ø28; 下方偏移5.2','12; 10; 2.5; Ø38(+0.15/+0.05); Ø28; lower offset5.2'),
  drawing(77,'AU','正视图水平、垂直与孔位尺寸','front horizontal, vertical and hole-position dimensions','水平60/50/32; 垂直60/50; 孔位6','horizontal60/50/32; vertical60/50; hole offset6'),
  drawing(77,'AU','螺纹孔及背面通孔','tapped holes and rear through holes','4-M4深10; 2-M3通孔（从背面）; 2-3.4钻通','4-M4 depth10; 2-M3 through (from back surface); 2-3.4 drill through'),
  drawing(77,'AU','侧视图轴向尺寸、配合孔与下方偏移','side axial dimensions, mating bore and lower offset','12; 10; 2.5; Ø36H7; Ø28; 下方偏移7','12; 10; 2.5; Ø36H7; Ø28; lower offset7'),
  drawing(79,'40','折返支承座正视图尺寸','motor-wrap housing front dimensions','60; 44; 22.5; 0.5; 孔距27×27','60; 44; 22.5; 0.5; hole spacing27x27'),
  drawing(79,'40','折返支承座螺纹孔','motor-wrap housing tapped holes','4-M4深8; Helisert 2D','4-M4 depth8; Helisert 2D'),
  drawing(79,'40','折返支承座侧视图尺寸','motor-wrap housing side dimensions','3; 15; 16; 9; Ø30.4; Ø6h7'),
  drawing(79,'40','折返类型轴端条件','motor-wrap shaft-end condition','折返类型需另行考虑轴端；详细情况联系THK。','Shaft end must be considered separately with motor-wrap types; contact THK for details.'),
  drawing(79,'WQ','法兰厚度与正视图尺寸','flange thickness and front dimensions','厚5 mm; 40; 44; 23; Ø31','thickness5 mm; 40; 44; 23; Ø31'),
  drawing(79,'WQ','法兰螺纹孔与通孔','flange tapped and through holes','4-M3通孔; 4-M4深5; PCD46; 间隔90°','4-M3 through; 4-M4 depth5; PCD46; spaced90 degrees'),
  drawing(79,'WP','法兰厚度与正视图尺寸','flange thickness and front dimensions','厚5 mm; 40; 44; 23; Ø31','thickness5 mm; 40; 44; 23; Ø31'),
  drawing(79,'WP','法兰螺纹孔与通孔','flange tapped and through holes','4-M3通孔; 4-M3深5; PCD45; 间隔90°','4-M3 through; 4-M3 depth5; PCD45; spaced90 degrees'),
];

export const misumiRs2DrawingRows: Row[] = [
  row(123,'RS2 STRAIGHT TYPE; cable,Notes2-3','RS2直线型安装图 / 线缆固定和弯曲限制','RS2 straight drawing / cable securing and bend limits','引出线长约200；在引出端100 mm以内用扎带固定，避免过大外力；电机线缆最小弯曲半径R30。','lead cable approx.200; secure with tie-band within100 mm of unit cable end against excessive loads; motor-cable minimum bend radiusR30.'),
  row(123,'RS2 STRAIGHT TYPE; upper view; motor-side/non-motor-side origin','RS2直线型安装图 / 原点至机端尺寸','RS2 straight drawing / origin-to-end dimensions','电机侧原点178±2、末端(52)；非电机侧原点(178)、末端52±2','motor-side origin178+/-2,end(52); non-motor-side origin(178),end52+/-2'),
  row(123,'RS2 STRAIGHT TYPE; upper view; Note1','RS2直线型安装图 / 机械挡块两端距离','RS2 straight drawing / distances to mechanical stoppers','两端140±1；带制动器电机端180±1。注1为到机械挡块的距离。','140+/-1 at both ends; motor end180+/-1 with brake. Note1: distance to mechanical stopper.'),
  row(123,'RS2 STRAIGHT TYPE; upper view; brake configuration','RS2直线型安装图 / 带制动器原点距离','RS2 straight drawing / braked origin distance','电机侧原点218±2；非电机侧原点(218)，均为带制动器配置。','motor-side origin218+/-2; non-motor-side origin(218),both with brake.'),
  row(123,'RS2 STRAIGHT TYPE; slider upper view','RS2直线型安装图 / 滑台定位孔及螺孔','RS2 straight drawing / slider locating and tapped holes','2-Ø4H7深6；4-M4×0.7深8；孔位34×42','2-Ø4H7 depth6; 4-M4x0.7 depth8; hole spacing34x42'),
  row(123,'RS2 STRAIGHT TYPE; side/end views','RS2直线型安装图 / 主体及滑台视图','RS2 straight drawing / body and slider views','滑台70/42；端视50/34；止动面57；51；主体55×56；端部24','slider70/42; end view50/34; stopper face57; 51; body55x56; end24'),
  row(123,'RS2 STRAIGHT TYPE; upper view; knockout tolerance','RS2直线型安装图 / 敲落孔间距公差','RS2 straight drawing / tolerance between knockouts','42（敲落孔间公差±0.02）','42 (tolerance between knockouts+/-0.02)'),
  row(123,'RS2 STRAIGHT TYPE; underside view','RS2直线型安装图 / 底部螺孔和定位孔','RS2 straight drawing / underside threaded and locating holes','B-M6×1深8；Ø4H7(+0.012/0)深6；槽宽4(+0.02/0)深6；R2；末端偏移2','B-M6x1 depth8; Ø4H7(+0.012/0) depth6; slot width4(+0.02/0) depth6; R2; end offset2'),
  row(123,'RS2 STRAIGHT TYPE; underside view; dimension symbols','RS2直线型安装图 / 底部尺寸基准','RS2 straight drawing / underside dimension origins','孔距A×50；首孔101.5（带制动器141.5）；定位孔126.5（带制动器166.5）；后续50；总长L（带制动器L+40）。A/B/C/L按已收录行程表配套。','hole spacingAx50; first hole101.5 (141.5 with brake); locating hole126.5 (166.5 with brake); subsequent50; totalL (L+40 with brake). A/B/C/L use the existing stroke-linked table.'),
  row(123,'RS2 STRAIGHT TYPE; cable connector end view','RS2直线型安装图 / 线缆接头端视图','RS2 straight drawing / cable-connector end view','30.5; 13; 15; 24; 40.5; 20.5; 8; 12.5'),
];

const thkConditions = l('仅KR33 A/B/C/D对应代码和所示视图；不是无条件额定规格，不生成选件组合。保留原图参考尺寸、孔加工及公差；除明确mm标注外不推定局部图单位换算。','Only the stated KR33 A/B/C/D code and drawing view, not unconditional ratings or generated option combinations. Preserve reference dimensions, machining and tolerances; infer no unit conversion where not explicitly stated.');
const misumiConditions = l('仅RS2 STRAIGHT TYPE、RS手册Ver2.00印刷5-5页；不适用于折返型或RS2C。尺寸与原点方向、制动器、行程配套，括号保持原图参考语义；不是通用额定性能。','RS2 STRAIGHT TYPE only, RS manual Ver2.00 printed5-5; not motor-folded or RS2C. Keep origin direction, brake, stroke and parenthesized reference conditions; not generic performance ratings.');

export function applyReadyIndustrialProduct(record: FinderExpansionRecord, locale: Locale): FinderExpansionRecord {
  const isThk = record.id === 'catalog-thk-kr33';
  const isMisumi = record.id === 'catalog-parallel-industrial-misumi-rs2';
  if (!isThk && !isMisumi) return record;
  const source = isThk ? thk : misumi;
  const hash = industrialSourceHashes[isThk ? 'thk' : 'misumi'];
  const conditions = (isThk ? thkConditions : misumiConditions)[locale];
  const additions: FinderParameter[] = (isThk ? thkKr33DrawingRows : misumiRs2DrawingRows).map(item => ({
    label:item.label[locale],labelAliases:[item.label.zh,item.label.en],value:item.value[locale],status:'manufacturer',
    sourceUrl:`${source}#page=${item.page}`,sourceLabel:locale==='zh'?'官方手册安装图':'Official manual drawing',
    sourceLocator:`PDF page ${item.page}; ${item.locator}; SHA-256 ${hash}`,conditions,normalized:[],
  }));
  const key = (field: FinderParameter) => `${field.sourceUrl}|${field.sourceLocator}|${field.label}`;
  const existing = new Set(record.parameters.map(key));
  const missing = additions.filter(field=>!existing.has(key(field)));
  return missing.length ? {...record,parameters:[...record.parameters,...missing]} : record;
}

export const readyIndustrialProfiles: CatalogEnrichmentGroup = {profiles:{},products:[],reviews:[]};
