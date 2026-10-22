import type { FinderExpansionRecord, FinderParameter } from './product-finder-demo';
import type { Locale } from '../site';
import type { CatalogEnrichmentGroup } from './catalog-enrichment-types';
import { normalizeFinderParameter } from './parameter-index';

type Text = { zh: string; en: string };
const l = (zh: string, en: string): Text => ({ zh, en });

export const readyGripBSources = {
  ati: {
    url: 'https://investors.novanta.com/files/doc_financials/2022/ar/novanta-2022-annual-report.pdf',
    path: 'review/source-scope-2026-10-19/gripping/novanta-2022-annual-report.pdf',
    version: 'Novanta FY2022 Annual Report, notes as of December 31, 2022',
    sha256: '37cea336686b80eefafb3f171696484067f80e3e9c9a2f08a5fb68e2c296cfd8',
  },
  contactile: {
    url: 'https://contactile.com/wp-content/uploads/2026/06/GAL2_B1.1_MAN_JUN26.pdf',
    path: 'review/source-scope-2026-10-19/gripping/GAL2_B1.1_MAN_JUN26.pdf',
    version: 'GAL2_B1.1_MAN_JUN26; Beta v1.1; June 2026',
    sha256: 'b122d6f377c588b0dc625e0351eadcf07b5ba380aa116216c4782503cc863f94',
  },
  robotiq: {
    url: 'https://blog.robotiq.com/hubfs/support-files/PowerPickMulti_User_Manual_2026-03-20.pdf',
    path: 'review/parallel-gripping/sources/7e18d42d6d00a05b.pdf',
    version: 'PowerPick Multi User Manual; revision 2026-03-20',
    sha256: '1d01fd56c20f7dd05aba6a5acb496d70d5b6773c8d0e168601c4250fe0bc5a14',
  },
  onrobot: {
    url: 'https://onrobot.com/storage/datasheets/vg10/datasheet_vg10_v2.6_en.pdf',
    path: 'review/parallel-gripping/gripping20261018c/sources/verified-onrobot-vg10.pdf',
    version: 'VG10 datasheet v2.6',
    sha256: '414d05d488fad34135ca06aca0b82e1f422c72ded2508631c9871ddb9726ad3c',
  },
} as const;

type Source = keyof typeof readyGripBSources;
type PatchRow = { key: string; source: Source; page: number; section: string; label: Text; value: Text; conditions: Text; indexable: boolean };
export const readyGripBParameterPatches: Record<string, PatchRow[]> = {
  'contactile-gal2': [],
  'verified-robotiq-powerpick-multi': [],
  'verified-onrobot-vg10': [],
};
function add(id: string, source: Source, key: string, page: number, section: string, label: Text, value: Text, conditions: Text, indexable = false): void {
  readyGripBParameterPatches[id].push({ key, source, page, section, label, value, conditions, indexable });
}

const gal = 'contactile-gal2';
const galScope = l('仅适用于该手册的 GAL2 Beta v1.1、集成 PapillArray v2.0 配置；不是独立触觉传感器规格。', 'Applies only to the manual GAL2 Beta v1.1 configuration with integrated PapillArray v2.0, not standalone tactile-sensor specifications.');
const galConflict = l('手册表值与既有网页行不同；两者保留，不静默改值，不加入无条件数值索引。', 'The manual table differs from existing webpage rows; both are retained without correction or unconditional numeric indexing.');
for (const [key, zh, en, value] of [
  ['stroke', '手册行程（来源差异）', 'Manual stroke (conflicting sources)', 'Min 0; Max 175.2 mm'],
  ['force', '手册夹持力范围（来源差异）', 'Manual gripping-force range (conflicting sources)', 'Min 5; Max 30 N'],
  ['speed', '手册夹持速度（来源差异）', 'Manual gripping speed (conflicting sources)', 'Typical 167.0; Max 167.0 mm/s'],
] as const) add(gal, 'contactile', key, 16, '5.2 Table 5.2, named technical-data row and Min/Typical/Max columns', l(zh, en), l(value, value), galConflict);
add(gal, 'contactile', 'force-repeat', 16, '5.2 Table 5.2, Gripping force repeatability / Typical', l('手册夹持力重复性（典型值）', 'Manual gripping-force repeatability (typical)'), l('0.5 N；不是力测量准确度或额定夹持力', '0.5 N; not force-measurement accuracy or rated gripping force'), galScope);
add(gal, 'contactile', 'voltage', 16, '5.2 Table 5.2, Operating voltage / Typical', l('手册工作电压（典型值）', 'Manual operating voltage (typical)'), l('24 V DC', '24 V DC'), galScope, true);
add(gal, 'contactile', 'current', 16, '5.2 Table 5.2, Current draw / Max', l('手册最大电流', 'Manual maximum current draw'), l('2 A', '2 A'), galScope, true);
add(gal, 'contactile', 'temperature', 16, '5.2 Table 5.2, Ambient operating temperature / Min and Max', l('手册环境工作温度', 'Manual ambient operating temperature'), l('10 to 40 °C', '10 to 40 °C'), galScope, true);
add(gal, 'contactile', 'typical-column', 16, '5.2 Table 5.2, Position sensing resolution / Position repeatability / Weight columns', l('既有分辨率、重复性和质量的列条件', 'Column scope of retained resolution, repeatability and mass'), l('上述三行在表中均位于 Typical 列；Min/Max 的横线不表示零。原数值不重复录入。', 'All three retained rows occupy the Typical column; dashes in Min/Max do not mean zero. Existing values are not repeated.'), galScope);
add(gal, 'contactile', 'materials', 16, '5.1.2 Table 5.1, Fingers and Casing', l('手册结构材料', 'Manual construction materials'), l('手指：阳极氧化铝；外壳：PA-12 HP Nylon', 'Fingers: anodised aluminium; casing: PA-12 HP Nylon'), galScope);
add(gal, 'contactile', 'imu-origin', 15, '5.1.1 Figure 5.1 caption; repeated in Figure 5.2 p16', l('IMU 原点相对夹爪底面中心', 'IMU origin relative to gripper base centre'), l('(-25.6, -12.502, 9.31) mm；按图示坐标轴', '(-25.6, -12.502, 9.31) mm; axes as illustrated'), galScope);
for (const [key, page, section, zh, en, value] of [
  ['fig51-left', 15, 'Figure 5.1 LEFT SIDE, horizontal callouts top-to-bottom; vertical callouts', '图5.1左视图标注', 'Figure 5.1 left-side callouts', 'Horizontal: 24.0 / 26.0 / 22.0 / 49.0 / 33.0 / 76.0 mm; vertical: 38.5 / 42.9 / 52.4 mm'],
  ['fig51-front-x', 15, 'Figure 5.1 FRONT, upper horizontal groups and lower span', '图5.1前视图水平标注', 'Figure 5.1 front-view horizontal callouts', '196.5 / 131.6 / 119.8 / 88.0 / 58.8 / 84.5 mm'],
  ['fig51-front-z', 15, 'Figure 5.1 FRONT, right-side heights and lower-left heights', '图5.1前视图高度标注', 'Figure 5.1 front-view height callouts', 'Right: 62.3 / 102.4 / 192.3 / 204.3 mm; lower left: 28.6 / 14.5 mm'],
  ['fig51-bottom', 15, 'Figure 5.1 BOTTOM, bolt circle, thread and locating-hole callouts', '图5.1底视图安装标注', 'Figure 5.1 bottom-view mounting callouts', 'Bolt circle diameter 50.0 mm; 45 deg; 4 x M6x1.0 depth 6.0 mm; diameter 6.0 H7 depth 4.4 mm'],
  ['fig52-open', 16, 'Figure 5.2 FULLY OPEN FRONT, horizontal and vertical callouts', '图5.2全开前视图标注', 'Figure 5.2 fully-open front-view callouts', 'Horizontal: 282.7 / 219.6 / 207.8 / 176.0 / 131.9 mm; vertical: 51.4 / 148.7 / 160.7 mm'],
  ['fig52-closed', 16, 'Figure 5.2 FULLY CLOSED FRONT, horizontal and vertical callouts', '图5.2全闭前视图标注', 'Figure 5.2 fully-closed front-view callouts', 'Horizontal: 110.1 / 43.6 / 31.8 / 31.9 mm; vertical: 70.3 / 205.2 / 217.2 mm'],
] as const) add(gal, 'contactile', key, page, `5.1.1 ${section}`, l(zh, en), l(value.replace('Horizontal:', '水平：').replace('vertical:', '竖直：').replace('Right:', '右侧：').replace('lower left:', '左下：').replace('Bolt circle diameter', '螺栓圆直径').replaceAll('diameter', '直径').replaceAll('depth', '深度').replace('deg', '度'), value), l('图形标注按视图保留，含对既有包络端点的上下文；不转成新的统一包络、行程或制造公差。尺寸单位为 mm，角度和螺纹标识除外。', 'Drawing callouts remain view-specific, including context for retained envelope endpoints; no new universal envelope, stroke or manufacturing tolerance is derived. Linear units are mm except angle and thread identifiers.'));
add(gal, 'contactile', 'temperature-drift', 17, '5.3 Temperature effects on accuracy', l('温度漂移与补偿资料边界', 'Temperature drift and compensation-document boundary'), l('温度变化可能使传感器读数漂移；补偿和偏置细节另见 PTS_2.0_SPEC_MMMYY，具体版次尚未核定。', 'Temperature changes may cause reading drift; compensation and biasing refer to PTS_2.0_SPEC_MMMYY, whose exact revision is not established here.'), galScope);
add(gal, 'contactile', 'grounding', 17, '5.4 Power; 5.4.1 Current draw profile', l('接地与机器人供电条件', 'Grounding and robot-power conditions'), l('夹爪、电源及 M8/USB-C 外设接地不匹配可能导致异常；同时连接多设备或采用非隔离电源时需留意。机器人 Tool I/O 电流能力须满足所执行操作。', 'Mismatched grounding between the gripper, supply and M8/USB-C equipment may cause unexpected behaviour; take care with multiple devices or a non-isolated supply. Robot Tool I/O current capability must cover the requested operations.'), galScope);
for (const [key, section, zh, en, valueZh, valueEn] of [
  ['silicone', '8.3 PapillArray Tactile Sensor silicone integrity', '传感器硅胶检查', 'Sensor silicone inspection', '定期检查；表面失去光泽可属正常现象。磨损或损伤时可能需要更换硅胶并重新校准，具体由厂商确认。', 'Inspect periodically; a dull surface can be normal. Wear or damage may require silicone replacement and recalibration; contact the manufacturer.'],
  ['cables', '8.4 Cabling and connectors', '传感器与线缆维护', 'Sensor and cable maintenance', '不要将 PapillArray 从夹爪断开；夹爪不用于无传感器运行。持续或频繁移动线缆的应用须定期检查磨损。', 'Do not disconnect the PapillArray sensors; the gripper is not intended to operate without them. Periodically inspect wear where cables move continuously or frequently.'],
  ['calibration', '8.5 Periodic calibration', '重新校准建议', 'Recalibration recommendation', '为维持准确度和分辨率，传感器及电子部分需要定期校准；建议每年重新校准，尤其是频繁循环施加载荷的应用。不是一年免校准保证。', 'Periodic calibration of the sensor and electronics maintains accuracy and resolution; annual recalibration is recommended, especially for frequent load cycling. This is not a one-year calibration-free guarantee.'],
] as const) add(gal, 'contactile', key, 23, section, l(zh, en), l(valueZh, valueEn), galScope);

const vg = 'verified-onrobot-vg10';
const vgScope = l('仅适用于 VG10 v2.6 附录所示配置；保留原有额定值及来源冲突，不据此证明其他型号、批次或当前交货配置。', 'Applies only to configurations illustrated in the VG10 v2.6 appendix. Existing ratings and source conflicts remain; this does not establish other models, revisions or current deliveries.');
add(vg, 'onrobot', 'porous', 9, 'Leakage bullets and porous-cardboard paragraphs above airflow graph', l('多孔纸箱与漏气适用条件', 'Porous cardboard and leakage conditions'), l('多数无涂层、粗糙纸箱不适用；吸盘唇边、形状、表面粗糙度及工件透气性均可能导致漏气，应对目标纸箱试抓。', 'Most uncoated coarse cardboard boxes are unsuitable; cup lips, shape, roughness and workpiece permeability can cause leakage. Test the target box.'), vgScope);
add(vg, 'onrobot', 'cardboard-setting', 10, 'NOTE above 1.2 VG10 box content', l('瓦楞纸箱真空设定建议', 'Corrugated-cardboard vacuum-setting recommendation'), l('较高真空百分比不代表更大起吊能力；建议采用较低设定，例如 20%，以减少气流和吸盘下方摩擦。仅为应用建议。', 'A higher vacuum percentage does not imply greater lifting capacity; a lower setting, for example 20%, is recommended to reduce airflow and friction beneath cups. Application advice only.'), vgScope);
add(vg, 'onrobot', 'box-cups', 10, '1.2 box-content legend items 1-4; asterisk on item2', l('包装吸盘角色', 'Box-content cup roles'), l('VG10；d30 mm 吸盘为预安装；另列 d40 mm 和 d15 mm 吸盘。图示数量不转作未标明的装箱数量。', 'VG10 with pre-mounted d30 mm cups; d40 mm and d15 mm cups are also listed. Illustrated cup counts are not inferred as unprinted package quantities.'), vgScope);
add(vg, 'onrobot', 'box-blind', 10, '1.2 box-content legend item5, x16 annotation; item6', l('包装堵头及定位件', 'Box-content blind screws and positioning items'), l('16 个盲堵螺钉、HEX 3 mm 内六角扳手及定位箭头；不是新增独立产品料号。', '16 blind screws, HEX 3 mm key and positioning arrows; no independent product order code is inferred.'), vgScope);
for (const [key, zh, en, value] of [
  ['drawing-vertical', '附录展开图竖直标注', 'Appendix extended-view vertical callout', '346 mm [13.638 in]'],
  ['drawing-horizontal', '附录展开图水平标注', 'Appendix extended-view horizontal callout', '136 mm [5.371 in]'],
  ['drawing-diameter', '附录重复直径标注及英寸差异', 'Appendix repeated diameter callouts and inch discrepancy', 'Diameter 241 mm; printed paired inch labels [9.487] and [9.505]'],
] as const) add(vg, 'onrobot', key, 12, '1.3 VG10 drawing, named span/diameter and printed mm/[inches] pairing', l(zh, en), l(value, value), l('保留图中原始 mm/英寸配对，不换算或静默纠正；图示配置不是旧行的 390 mm 展开包络。', 'Retains printed mm/inch pairs without conversion or correction. This illustrated configuration is not the retained 390 mm extended-envelope row.'));

const ppm = 'verified-robotiq-powerpick-multi';
const ppmScope = l('仅为 2026-03-20 版 PowerPick Multi 的维护或备件条件；不是机械输出额定值。间隔按平均正常使用给出，须按温湿度、污染、工件和运动动态调整。', 'Maintenance or spare-part conditions for PowerPick Multi revision 2026-03-20 only, not mechanical output ratings. Intervals assume average normal use and must be adjusted for temperature, humidity, contamination, workpieces and motion dynamics.');
add(ppm, 'robotiq', 'maintenance-safety', 57, '6 Maintenance; 6.1.1 General Guidelines; continuation p58', l('维护范围及隔离条件', 'Maintenance scope and isolation conditions'), l('仅限合格授权人员执行外部维护；先断电防止意外通电，并排空气动设备、锁定气动隔离。除特别说明外，维修由 Robotiq 执行；非 Robotiq 人员开壳会使保修失效。', 'External maintenance by qualified authorized personnel only; de-energize and prevent restart, empty pneumatic devices and lock out pneumatic isolation. Unless specified, repairs are by Robotiq; opening by others voids the warranty.'), ppmScope);
for (const [key, zh, en, valueZh, valueEn] of [
  ['clean-dirty', '吸盘清洁间隔（脏污环境）', 'Cup-cleaning interval (dirty workspace)', '每日', 'Daily'],
  ['clean-normal', '吸盘清洁间隔（正常环境）', 'Cup-cleaning interval (normal workspace)', '每月', 'Monthly'],
] as const) add(ppm, 'robotiq', key, 58, '6.2.1 Chart 6-1, Workspace Conditions / Interval', l(zh, en), l(valueZh, valueEn), ppmScope);
add(ppm, 'robotiq', 'clean-method', 58, '6.2.1 cleaning bullets', l('吸盘清洁与磨损处理', 'Cup cleaning and wear handling'), l('温水和肥皂清除表面异物；适用时以压缩空气清洁网状过滤器；出现可见磨损则更换吸盘。', 'Remove surface debris with warm water and soap; use compressed air for the mesh filter where applicable; replace visibly worn cups.'), ppmScope);
add(ppm, 'robotiq', 'cup-variants', 58, '6.2.2 Replacing or Changing Suction Cups, two bullet items', l('更换吸盘配置适用性', 'Replacement-cup configuration applicability'), l('默认 PIAB 52 mm 双波纹吸盘针对 UR20、箱体缺陷和不平表面；可选 PIAB 52 mm 单波纹吸盘用于较高负载。不是新增通用载荷值。', 'Default PIAB 52 mm double-bellows cups target UR20, box defects and uneven surfaces; optional PIAB 52 mm single-bellow cups suit higher payloads. No new universal payload value is implied.'), ppmScope);
add(ppm, 'robotiq', 'cup-fitting', 59, 'Removing the Cups / Installing New Cups', l('吸盘拆装工具及安装扭矩', 'Cup-service tools and installation torque'), l('拆卸用随附 22 mm 扳手；安装需未随附的 10 mm 六角批头，螺钉拧至 5 Nm；用装配工具装入 piSave Sense。', 'Removal uses the supplied 22 mm wrench; installation requires a non-supplied 10 mm hex bit and 5 Nm screw torque; fit piSave Sense with the assembly tool.'), ppmScope);
for (const [key, zh, en, valueZh, valueEn] of [
  ['inspect-electrical', '电缆及固定件磨损目视检查', 'Electrical cable and fixture wear inspection', '每月', 'Monthly'],
  ['inspect-pneumatic', '气管及固定件磨损目视检查', 'Pneumatic tubing and fixture wear inspection', '每月', 'Monthly'],
  ['inspect-cups', '吸盘裂纹或损伤目视检查', 'Cup crack or damage inspection', '每六个月', 'Every six months'],
] as const) add(ppm, 'robotiq', key, 59, '6.2.3 Chart 6-2, Operation / Interval', l(zh, en), l(valueZh, valueEn), ppmScope);
add(ppm, 'robotiq', 'replace-criteria', 59, '6.2.3 inspection and replacement bullets', l('吸盘和气管更换触发条件', 'Cup and tube replacement criteria'), l('吸盘磨损、抓取可靠性降低或达到真空的时间增加时更换；气管被挤压或折弯时更换。没有给出固定使用寿命。', 'Replace cups for wear, reduced grip reliability or increased vacuum-acquisition time; replace crushed or kinked tubing. No fixed service life is stated.'), ppmScope);
add(ppm, 'robotiq', 'fastener-interval', 59, '6.2.4 Fasteners, inspection paragraph', l('紧固件检查间隔', 'Fastener inspection interval'), l('每月；维护后检查紧固扭矩，仅使用原厂备件。', 'Monthly; verify torque after maintenance and use original spare parts only.'), ppmScope);
for (const [key, page, locationZh, locationEn, designation, metric, imperial] of [
  ['wrist', 59, '机器人腕部', 'robot wrist', 'Socket Head Cap Screw M8 x 1.25', '16 Nm', '11.8 lb-ft'],
  ['accessory', 59, '附件', 'accessories', 'Socket Head Cap Screw M8 x 1.25', '16 Nm', '11.8 lb-ft'],
  ['mount', 59, '安装板', 'mounting plate', 'Socket Head Cap Screw M8 x 1.25', '16 Nm', '11.8 lb-ft'],
  ['shell', 59, '防护壳', 'protective shells', 'Socket Head Cap Screw M4 x 0.7', '1 Nm', '8.9 lb-in'],
  ['plate-shell', 59, '吸盘板外壳', 'suction cup plate shells', 'Flat Head Cap Screw M4 x 0.7', '2 Nm', '17.7 lb-in'],
  ['stabilizer-frame', 60, '运动稳定器框架和三件抓取稳定器框架', 'motion stabilizer frame and triple-pick stabilizer frame', 'Socket Head Cap Screw M4 x 0.7', '1 Nm', '8.9 lb-in'],
  ['stabilizer-bar', 60, '运动稳定杆和三件抓取稳定器滑块', 'motion stabilizer bar and triple-pick stabilizer slider', 'Button Head Cap Screw M5 x 0.7', '1.5 Nm', '13.3 lb-in'],
] as const) add(ppm, 'robotiq', `fastener-${key}`, page, `6.2.4 Table 6-3, ${designation}, ${locationEn}`, l(`安装扭矩：${locationZh}`, `Installation torque: ${locationEn}`), l(`${designation}: ${metric} (${imperial})`, `${designation}: ${metric} (${imperial})`), l('按表中的位置和螺钉原标识保留，包括 M5 x 0.7；不按常用螺距纠正，不作为夹爪输出扭矩。', 'Retains printed location and screw designation, including M5 x 0.7; no correction to a conventional pitch and no gripper-output torque inference.'));
for (const [key, page, nameZh, nameEn, code, bomZh, bomEn] of [
  ['double-kit', 61, '52 mm 双波纹吸盘套件', '52 mm double-bellows cup kit', 'VAC-CUP-PIAB-52MM-DB-KIT', '24 个 BX52P 双波纹 G1/4 吸盘；24 个 PiSaveSense 气动阀；1 个 PiSave 安装工具套筒', '24 BX52P double-bellows G1/4 cups; 24 PiSaveSense pneumatic valves; 1 PiSave installation tool socket'],
  ['single-kit', 61, '52 mm 单波纹吸盘套件', '52 mm single-bellow cup kit', 'VAC-CUP-PIAB-52MM-SB-KIT', '24 个 B52XP 单波纹 G1/4 吸盘；24 个 PiSaveSense 气动阀；1 个 PiSave 安装工具套筒', '24 B52XP single-bellow G1/4 cups; 24 PiSaveSense pneumatic valves; 1 PiSave installation tool socket'],
  ['double-one', 61, '52 mm 双波纹吸盘单件', '52 mm double-bellows single cup', 'VAC-CUP-PIAB-52MM-DB', '1 个 BX52P 双波纹 G1/4 吸盘；1 个 PiSaveSense 气动阀；不含仅套件随附的安装工具套筒', '1 BX52P double-bellows G1/4 cup; 1 PiSaveSense valve; installation tool socket is included in kits only'],
  ['single-one', 61, '52 mm 单波纹吸盘单件', '52 mm single-bellow single cup', 'VAC-CUP-PIAB-52MM-SB', '1 个 B52XP 单波纹 G1/4 吸盘；1 个 PiSaveSense 气动阀；不含仅套件随附的安装工具套筒', '1 B52XP single-bellow G1/4 cup; 1 PiSaveSense valve; installation tool socket is included in kits only'],
  ['cover1', 61, '区域1外壳盖', 'zone 1 shell cover', 'VAC-PPM-SHELL-COVER-ZONE1', '1 个区域1夹爪外壳盖', '1 gripper zone 1 shell cover'],
  ['cover2', 62, '区域2外壳盖', 'zone 2 shell cover', 'VAC-PPM-SHELL-COVER-ZONE2', '1 个区域2夹爪外壳盖', '1 gripper zone 2 shell cover'],
  ['motion-kit', 62, '运动稳定器套件', 'motion stabilizer kit', 'VAC-POWERPICK-MULTI-MOT-STAB', '1 个 PowerPick Multi 运动稳定器套件', '1 PowerPick Multi motion stabilizer kit'],
  ['triple-kit', 62, '三件抓取稳定器套件', 'triple-pick stabilizer kit', 'VAC-POWERPICK-MULTI-TRIP-STAB', '1 个 PowerPick Multi 三件抓取稳定器套件', '1 PowerPick Multi triple-pick stabilizer kit'],
  ['female-kit', 62, '母连接套件', 'female connection kit', 'VAC-PPM-FEMALE-CONNECTION-KIT', '各1件：Rear Mount M8-Male 8 connector、Rear Mount M12M 5 CONN. M16、12 Pins 母 PCB 端子块、1/4 in 直径 x 1 in 热缩管；8 个线端套管', '1 each: Rear Mount M8-Male 8 connector; Rear Mount M12M 5 CONN. M16; 12-pin female PCB terminal block; heat-shrink tubing 1/4 in diameter x 1 in; 8 ferrules'],
  ['short-cable', 62, '短腕线缆', 'short wrist cable', 'VAC-PPM-SHORT-WRIST-CABLE', '1 根 PowerPick Multi 短腕线缆；本表未列长度', '1 PowerPick Multi short wrist cable; no length stated in this table'],
  ['long-cable', 62, '长腕线缆', 'long wrist cable', 'VAC-PPM-LONG-WRIST-CABLE', '1 根 PowerPick Multi 长腕线缆；本表未列长度', '1 PowerPick Multi long wrist cable; no length stated in this table'],
  ['io-cable', 62, '10 m I/O 线缆', '10 m I/O cable', 'VAC-PPM-I/O-CABLE-10M', '1 根 PowerPick Multi I/O 线缆；条目注明 10 m', '1 PowerPick Multi I/O cable; item identifies 10 m'],
] as const) add(ppm, 'robotiq', `spare-${key}`, page, `7 Table 7-1, ${nameEn}, Ordering Number / Description`, l(`备件及物料：${nameZh}`, `Spare part and contents: ${nameEn}`), l(`${code}; ${bomZh}`, `${code}; ${bomEn}`), l('料号及物料清单仅为该手册版次的公开列表，可能变化；不保证当前在售，也不创建假想套件组合。连接器缩写按原表保留，不补造针脚映射。', 'Literal order code and contents from this manual revision, subject to change; no current-stock assurance or synthetic kit combinations. Connector abbreviations remain as printed, without invented pin mappings.'));

const companyById: Record<string, string> = {
  'contactile-gal2': 'contactile',
  'verified-robotiq-powerpick-multi': 'robotiq',
  'verified-onrobot-vg10': 'onrobot',
};

function parameter(seed: PatchRow, locale: Locale): FinderParameter {
  const source = readyGripBSources[seed.source];
  const marker = `[ready-GripB:${seed.key}]`;
  const canonical: FinderParameter = { label: seed.label.en, value: seed.value.en, status: 'manufacturer' };
  return {
    label: seed.label[locale], value: seed.value[locale], status: 'manufacturer',
    sourceUrl: source.url,
    sourceLabel: locale === 'zh' ? '官方固定版次资料' : 'Official pinned-revision source',
    sourceLocator: `${source.version}; PDF p.${seed.page}; ${seed.section}; SHA256 ${source.sha256}; ${marker}`,
    conditions: seed.conditions[locale],
    normalized: seed.indexable ? normalizeFinderParameter(canonical) : [],
  };
}

export function applyReadyGripBProduct(record: FinderExpansionRecord, locale: Locale): FinderExpansionRecord {
  const seeds = readyGripBParameterPatches[record.id];
  if (!seeds || record.profile.slug !== companyById[record.id]) return record;
  const missing: FinderParameter[] = [];
  for (const seed of seeds) {
    const row = parameter(seed, locale);
    const priorRows = record.parameters.filter(p => p.sourceLocator?.endsWith(`[ready-GripB:${seed.key}]`));
    if (priorRows.length > 1) throw new Error(`GripB duplicate source-row: ${record.id}/${seed.key}`);
    const prior = priorRows[0];
    if (prior) {
      if (prior.sourceUrl !== row.sourceUrl || prior.sourceLocator !== row.sourceLocator || prior.status !== 'manufacturer'
        || ![seed.value.zh, seed.value.en].includes(prior.value) || ![seed.label.zh, seed.label.en].includes(prior.label)
        || ![seed.conditions.zh, seed.conditions.en].includes(prior.conditions ?? '')
        || JSON.stringify(prior.normalized) !== JSON.stringify(row.normalized)) {
        throw new Error(`GripB source-row conflict: ${record.id}/${seed.key}`);
      }
      continue;
    }
    if (record.parameters.some(p => p.status === 'manufacturer' && p.sourceUrl === row.sourceUrl
      && p.sourceLocator?.includes(readyGripBSources[seed.source].version)
      && [seed.label.zh, seed.label.en].includes(p.label) && [seed.value.zh, seed.value.en].includes(p.value)
      && [seed.conditions.zh, seed.conditions.en].includes(p.conditions ?? '')
      && JSON.stringify(p.normalized) === JSON.stringify(row.normalized))) continue;
    missing.push(row);
  }
  return missing.length ? { ...record, parameters: [...record.parameters, ...missing] } : record;
}

type FinancialFact = {
  field: string; label: Text; value: number; unit: 'USD thousand' | 'USD million';
  period: string; entityBasis: string; sourceUrl: string; sourceLocator: string; sha256: string;
  amortizationYears?: number;
};
const ati = readyGripBSources.ati;
export const readyGripBATIFinancials: FinancialFact[] = [];
function financial(field: string, label: Text, value: number, unit: FinancialFact['unit'], page: number, section: string, period: string, amortizationYears?: number): void {
  readyGripBATIFinancials.push({ field, label, value, unit, period,
    entityBasis: 'ATI-specific historical disclosures in Novanta consolidated FY2022 annual-report notes; not ATI standalone audited statements or current robotics revenue',
    sourceUrl: ati.url, sourceLocator: `${ati.version}; PDF p.${page} (printed p.${page-6}); ${section}`, sha256: ati.sha256,
    ...(amortizationYears === undefined ? {} : { amortizationYears }),
  });
}
for (const [field, zh, en, value] of [
  ['cash', '现金', 'Cash', 10709], ['receivables', '应收账款', 'Accounts receivable', 12596],
  ['inventories', '存货', 'Inventories', 18151], ['ppe', '不动产、厂房及设备', 'Property, plant and equipment', 4618],
  ['lease-assets', '经营租赁资产', 'Operating lease assets', 11263], ['intangibles', '无形资产', 'Intangible assets', 52800],
  ['goodwill', '商誉', 'Goodwill', 134420], ['other-assets', '其他资产', 'Other assets', 229],
  ['total-assets', '取得资产总额', 'Total assets acquired', 244786], ['payables', '应付账款', 'Accounts payable', 5135],
  ['current-lease', '经营租赁负债流动部分', 'Current portion of operating lease liabilities', 1740],
  ['lease-liabilities', '经营租赁负债', 'Operating lease liabilities', 9525], ['other-liabilities', '其他负债', 'Other liabilities', 4452],
  ['total-liabilities', '承接负债总额', 'Total liabilities assumed', 20852], ['net-assets', '取得资产扣除承接负债', 'Total assets acquired, net of liabilities assumed', 223934],
  ['less-cash', '减：取得现金', 'Less: cash acquired', 10709], ['add-nwc', '加：净营运资本调整', 'Add: net working capital adjustment', 820],
  ['less-contingent', '减：或有对价', 'Less: contingent consideration', 44000], ['initial-net-price', '初始购买价（扣除取得现金）', 'Initial purchase price, net of cash acquired', 170045],
] as const) financial(`ppa-${field}`, l(zh, en), value, 'USD thousand', 74, `Note4 ATI final purchase-price allocation, ${en}`, 'Historical ATI acquisition allocation finalized in FY2022 report');
for (const [field, zh, en, value, years] of [
  ['technology', '已开发技术', 'Developed technologies', 19800, 15],
  ['customers', '客户关系', 'Customer relationships', 23900, 15],
  ['trademarks', '商标及商号', 'Trademarks and trade names', 5600, 15],
  ['backlog', '未完成订单', 'Backlog', 3500, 1],
] as const) financial(`intangible-${field}`, l(zh, en), value, 'USD thousand', 74, `Note4 ATI intangible fair value and weighted-average amortization period, ${en}`, 'ATI acquisition-date valuation, finalized FY2022', years);
financial('intangible-total', l('无形资产公允价值合计', 'Total intangible fair value'), 52800, 'USD thousand', 74, 'Note4 ATI intangible-assets table, Total', 'ATI acquisition allocation');
financial('contribution-revenue', l('收购后并表期间收入贡献', 'Acquisition-period revenue contribution'), 34, 'USD million', 75, 'Note4 ATI operating-results paragraph', 'Contribution to year ended 2021-12-31; results included beginning 2021-08-31, not full-year ATI revenue');
financial('contribution-pretax', l('收购后并表期间税前利润贡献', 'Acquisition-period profit before income taxes'), 3.4, 'USD million', 75, 'Note4 ATI operating-results paragraph', 'Acquisition period through 2021-12-31; includes the disclosed amortization charges');
financial('contribution-amortization', l('上述税前利润内的收购摊销', 'Acquisition amortization included in that pretax profit'), 3.5, 'USD million', 75, 'Note4 ATI inventory fair-value and purchased-intangible amortization paragraph', 'Acquisition date through 2021-12-31; not an add-back to inferred adjusted earnings');
for (const [field, zh, en, value, period] of [
  ['fair-2021', '2021年末或有对价公允价值', 'Contingent-consideration fair value at 2021 year-end', 44, 'As of 2021-12-31'],
  ['fair-2022', '2022年最终确定后或有对价', 'Contingent consideration after 2022 final determination', 45, '2022, based on final ATI 2021 Adjusted EBITDA under the acquisition agreement'],
  ['paid', '或有对价实际结算', 'Actual contingent-consideration settlement', 45, 'August 2022; exact payment day not disclosed here'],
  ['financing', '结算现金流中的融资活动部分', 'Settlement classified as financing cash outflow', 44, 'Novanta consolidated statement of cash flows for 2022'],
  ['operating', '结算现金流中的经营活动部分', 'Settlement classified as operating cash outflow', 1, 'Novanta consolidated statement of cash flows for 2022'],
] as const) financial(`contingent-${field}`, l(zh, en), value, 'USD million', 79, `Contingent Considerations, ATI paragraph, ${en}`, period);

const financeSource = `Novanta FY2022 Annual Report; ${ati.url}; SHA256 ${ati.sha256}`;
export const readyGripBProfiles: CatalogEnrichmentGroup = {
  products: [], reviews: [],
  profiles: {
    'ati-industrial-automation': {
      investmentView: [
        l(`ATI 在从2021年8月31日起至2021年12月31日的并表期间，为 Novanta 贡献收入3400万美元、税前利润340万美元；税前利润含存货公允价值调整及收购无形资产摊销350万美元。不是 ATI 2021全年、2022全年或当前收入，也不据此计算调整后利润。来源：${financeSource}；PDF第75页（印刷第69页），Note4 ATI。`, `ATI contributed USD 34.0 million revenue and USD 3.4 million pretax profit during the consolidation period beginning August 31, 2021 through December 31, 2021; pretax profit included USD 3.5 million inventory fair-value and purchased-intangible amortization. These are not full-year 2021, FY2022 or current ATI figures; no adjusted profit is derived. Source: ${financeSource}; PDF p.75 (printed p.69), Note4 ATI.`),
        l(`ATI 最终购买价分摊表以千美元列示：取得资产扣除承接负债223934，减取得现金10709、加净营运资本调整820、减或有对价44000，得到初始净购买价170045；其中无形资产52800、商誉134420。它们是历史收购会计项目，不是融资轮、当前估值或营收。来源：${financeSource}；PDF第74页（印刷第68页），Note4 ATI。`, `The final ATI allocation is in USD thousands: net acquired assets 223934, less cash 10709, plus net working-capital adjustment 820, less contingent consideration 44000, giving initial net purchase price 170045; identifiable intangibles 52800 and goodwill 134420. These are historical acquisition-accounting figures, not funding, current valuation or revenue. Source: ${financeSource}; PDF p.74 (printed p.68), Note4 ATI.`),
        l(`ATI 无形资产公允价值及加权平均摊销期（千美元／年）：已开发技术19800／15，客户关系23900／15，商标及商号5600／15，未完成订单3500／1；合计52800。不是整家公司资产或技术寿命预测。年报预计其中1.344亿美元商誉可用于美国所得税税前扣除；不是实际税款节省额。来源：${financeSource}；PDF第74页无形资产表、第75页商誉段（印刷第68、69页）。`, `ATI intangible fair values and weighted-average amortization periods (USD thousands/years) are developed technologies 19800/15, customer relationships 23900/15, trademarks and trade names 5600/15, and backlog 3500/1; total 52800. These are acquisition valuations, not whole-company assets or technical-life forecasts. The report expects USD 134.4 million goodwill to be deductible for US income tax purposes; this is not realized tax savings. Source: ${financeSource}; PDF p.74 intangible-assets table and p.75 goodwill paragraph (printed pp.68-69).`),
        l(`ATI 或有对价在2021年末公允价值为4400万美元；按收购协议最终确定2021年 Adjusted EBITDA 后，2022年调整至4500万美元，并于2022年8月支付。Novanta 的2022年合并现金流将4400万美元归入融资活动流出、100万美元归入经营活动流出；融资现金流分类不等于 ATI 获得一轮融资。初始估值采用蒙特卡洛方法；结算前后续公允价值变动列入重组、收购及相关成本。来源：${financeSource}；PDF第79页（印刷第73页），Contingent Considerations。`, `ATI contingent consideration had USD 44.0 million fair value at 2021 year-end, was adjusted to USD 45.0 million after final determination of contractual 2021 Adjusted EBITDA, and was paid in August 2022. Novanta classified USD 44.0 million as financing and USD 1.0 million as operating cash outflow in its 2022 consolidated cash flows; financing classification is not an ATI funding round. Initial fair value used Monte Carlo valuation; subsequent fair-value changes were recorded in restructuring, acquisition and related costs until settlement. Source: ${financeSource}; PDF p.79 (printed p.73), Contingent Considerations.`),
        l(`口径：所读为 Novanta 合并年报中的 ATI 专属历史附注，未核得 ATI 独立审计意见或当前独立报表；不将 Precision Motion 分部总额归为 ATI。第79页写收购日为2021-08-30，第75页写从2021-08-31起纳入经营结果；两种表述按原章节保留，不改写既有收购时间线。来源：${financeSource}；PDF第75、79页。`, `Basis: ATI-specific historical notes in Novanta consolidated accounts, not an inspected standalone ATI audit opinion or current standalone statements; Precision Motion totals are not attributed to ATI. PDF p.79 states acquisition on 2021-08-30, while p.75 includes results beginning 2021-08-31. Both section-specific statements are retained without rewriting the existing acquisition timeline. Source: ${financeSource}; PDF pp.75,79.`),
      ],
      timeline: [{
        date: '2022-08', kind: 'business', sourceUrl: ati.url,
        title: l('历史收购或有对价结算', 'Historical acquisition contingent-consideration settlement'),
        detail: l(`Novanta 年报披露于2022年8月支付 ATI 或有对价4500万美元；4400万美元列为融资现金流流出、100万美元列为经营现金流流出。仅为历史收购结算，不是 ATI 股权融资或当前业绩。${financeSource}; PDF第79页（印刷第73页）。`, `Novanta disclosed an August 2022 USD 45.0 million ATI contingent-consideration payment, with USD 44.0 million financing and USD 1.0 million operating cash outflows. Historical acquisition settlement only, not ATI equity funding or current performance. ${financeSource}; PDF p.79 (printed p.73).`),
      }],
    },
  },
};
