import type { Locale } from '../site';
import type { FinderExpansionRecord, FinderParameter } from './product-finder-demo';

const l = (zh: string, en: string) => ({ zh, en });
export const industrial2SourceUrl = 'https://tech.thk.com/upload/catalog_claim/pdf/209e_kr.pdf';
export const industrial2SourceHash = 'c8fdc49bb6a13856e5f4e0563c743ee34f489e00757808d72ee293a83a35e6c9';
type Family = 'KR45H' | 'KR46' | 'KR55' | 'KR65';
type Row = { family: Family; page: number; code: string; view: ReturnType<typeof l>; value: ReturnType<typeof l> };
const drawing = (family: Family, page: number) => (code: string, zh: string, en: string, valueZh: string, valueEn = valueZh): Row => ({ family, page, code, view: l(zh, en), value: l(valueZh, valueEn) });
const sensor = (family: Family, page: number, model: string, cover: boolean, vertical: string, horizontal: string): Row => ({
  family, page, code: model,
  view: l(`传感器安装参考图 / ${cover ? '带外罩' : '无外罩'}`, `sensor mounting reference / ${cover ? 'with cover' : 'without cover'}`),
  value: l(`垂直标注：${vertical}；水平标注：${horizontal}`, `vertical callouts: ${vertical}; horizontal callouts: ${horizontal}`),
});
const notes = (family: Family, page: number, width: number): Row[] => [
  drawing(family, page)('EE-SX671 / EE-SX674', '光电传感器图上方 / 连接器说明', 'above photo-sensor drawings / connector note', '随附EE-1001（OMRON Corporation）连接器3个；客户自行安装。', 'EE-1001 (OMRON Corporation) connectors x3 included; to be mounted by the customer.'),
  drawing(family, page)('EE-SX671 / EE-SX674 / APM-D3A1-001 / APM-D3B1-003 / GX-F12A / GX-F12B / GX-F12A-P / GX-F12B-P', '各传感器图下方 / 挡块宽度', 'below each sensor drawing / sensor-dog width', `传感器挡块宽度：${width} mm（不是传感器外壳宽度）。`, `Sensor dog width: ${width} mm (not sensor-body width).`),
];

const k45 = drawing('KR45H', 101);
const w45 = drawing('KR45H', 103);
const k46 = drawing('KR46', 123);
const w46 = drawing('KR46', 125);
const k55 = drawing('KR55', 143);
const w55 = drawing('KR55', 145);
const k65 = drawing('KR65', 159);
const w65 = drawing('KR65', 161);

// Each call is a visible source view, never an ordering combination or a rating.
export const industrial2DrawingRows: Row[] = [
  sensor('KR45H',99,'EE-SX671',false,'(6.4)','(21.2); (33.8)'),
  sensor('KR45H',99,'EE-SX671',true,'(6.4)','(21.3); (33.8)'),
  sensor('KR45H',99,'EE-SX674',false,'(6.1)','(16.2); (22.3)'),
  sensor('KR45H',99,'EE-SX674',true,'(6.1)','(16.2); (22.3)'),
  sensor('KR45H',99,'APM-D3A1-001 / APM-D3B1-003',false,'(14)','(13.2)'),
  sensor('KR45H',99,'APM-D3A1-001 / APM-D3B1-003',true,'(14)','(13.2)'),
  sensor('KR45H',99,'GX-F12A / GX-F12B / GX-F12A-P / GX-F12B-P',false,'(13.8); (13)','(14.8)'),
  sensor('KR45H',99,'GX-F12A / GX-F12B / GX-F12A-P / GX-F12B-P',true,'(14); (13)','(11.9); (14.8)'),
  ...notes('KR45H',99,10),
  k45('A0','支承座A正视图 / 尺寸与孔加工','Housing A front / dimensions and hole machining','水平79.6；垂直63、62.5、30、0.5；4-M5深10，PCD70，与水平中心线成±45°；4-M4深8，PCD60，与水平中心线成±30°。','horizontal79.6; vertical63,62.5,30,0.5; 4-M5 depth10,PCD70,+/-45 degrees to horizontal centerline; 4-M4 depth8,PCD60,+/-30 degrees to horizontal centerline.'),
  k45('A0','支承座A侧视图 / 轴向与直径','Housing A side / axial and diameter callouts','上排14、51、23；下排37、18、33；局部3.5、14；Ø50H8；Ø44；Ø10h7。','upper row14,51,23; lower row37,18,33; local3.5,14; Ø50H8; Ø44; Ø10h7.'),
  k45('AY','中间法兰正视图 / 外形及孔加工','Intermediate Flange front / outline and hole machining','62×60；4-M4深10（PCD70，间隔90°）；4-4.5钻通，Ø8沉孔深4.5（PCD60，图示±30°）。','62x60; 4-M4 depth10 (PCD70,spaced90 degrees); 4-4.5 drill through,Ø8 counterbore depth4.5 (PCD60,shown+/-30 degrees).'),
  k45('AY','中间法兰侧视图 / 轴向与直径','Intermediate Flange side / axial and diameter callouts','12.5; 10; 3.5; Ø50H7; Ø44; Ø42'),
  k45('AU','中间法兰正视图 / 外形及孔加工','Intermediate Flange front / outline and hole machining','外形62×60；孔位50×50；4-M4深10；4-4.5钻通，Ø8沉孔深4.5（PCD60，图示±30°）。','outline62x60; hole positions50x50; 4-M4 depth10; 4-4.5 drill through,Ø8 counterbore depth4.5 (PCD60,shown+/-30 degrees).'),
  k45('AU','中间法兰侧视图 / 轴向与配合孔','Intermediate Flange side / axial and mating-bore callouts','12.5; 10; Ø36H7'),
  w45('60','折返支承座A正视图 / 尺寸与螺孔','Motor Wrap Housing A front / dimensions and tapped holes','水平79.6；垂直56.5、30、10、0.5；孔位40×40；4-M5深10（Helisert 2D）。','horizontal79.6; vertical56.5,30,10,0.5; hole positions40x40; 4-M5 depth10 (Helisert 2D).'),
  w45('60','折返支承座A侧视图 / 轴向与公差','Motor Wrap Housing A side / axial and tolerance callouts','3; 20; 28; 18; Ø40.4; Ø10h7(0/-0.015)'),
  w45('WV','折返中间法兰正视图 / 厚度及孔加工','Motor Wrap Specification (Intermediate Flange) front / thickness and hole machining','厚6 mm；60×71；中心线至底边36.5；Ø51；4-M5通孔；4-M5深6（PCD70，间隔90°）。','thickness6 mm; 60x71; centerline-to-bottom36.5; Ø51; 4-M5 through; 4-M5 depth6 (PCD70,spaced90 degrees).'),
  w45('WY','折返中间法兰正视图 / 厚度及孔加工','Motor Wrap Specification (Intermediate Flange) front / thickness and hole machining','厚6 mm；60×71；中心线至底边36.5；Ø51；4-M5通孔；4-M4深6（PCD70，间隔90°）。','thickness6 mm; 60x71; centerline-to-bottom36.5; Ø51; 4-M5 through; 4-M4 depth6 (PCD70,spaced90 degrees).'),

  sensor('KR46',121,'EE-SX671',false,'(25.8); (15.2)','(20.6); (33.6)'),
  sensor('KR46',121,'EE-SX671',true,'(26); (15.2)','(20.7); (33.6)'),
  sensor('KR46',121,'EE-SX674',false,'(25.8); (14.1)','(14.5); (20.6)'),
  sensor('KR46',121,'EE-SX674',true,'(26); (14.1)','(14.5); (20.6)'),
  sensor('KR46',121,'APM-D3A1-001 / APM-D3B1-003',false,'(21.8)','(12.4)'),
  sensor('KR46',121,'APM-D3A1-001 / APM-D3B1-003',true,'(22)','(12.4)'),
  sensor('KR46',121,'GX-F12A / GX-F12B / GX-F12A-P / GX-F12B-P',false,'(21.8)','(14.5)'),
  sensor('KR46',121,'GX-F12A / GX-F12B / GX-F12A-P / GX-F12B-P',true,'(22)','(14.5)'),
  ...notes('KR46',121,15),
  k46('A0','支承座A正视图 / 尺寸与孔加工','Housing A front / dimensions and hole machining','水平83、60；垂直64、63、27.5、31、1；两组4-M4深8；PCD64图示±45°，该组间隔90°；PCD60图示±30°。','horizontal83,60; vertical64,63,27.5,31,1; two4-M4 depth8 callouts; PCD64 shown+/-45 degrees,that set spaced90 degrees; PCD60 shown+/-30 degrees.'),
  k46('A0','支承座A侧视图 / 轴向与直径','Housing A side / axial and diameter callouts','上排14、50.5、23；下排36.5、18、33；局部3.5；Ø50H8；Ø44；Ø8h7。','upper row14,50.5,23; lower row36.5,18,33; local3.5; Ø50H8; Ø44; Ø8h7.'),
  k46('10','支承座A正视图 / 尺寸及配合孔','Housing A front / dimensions and mating bore','水平83、60；垂直63、58.5、31、1；孔位50×50；4-M4深8；Ø36H8。','horizontal83,60; vertical63,58.5,31,1; hole positions50x50; 4-M4 depth8; Ø36H8.'),
  k46('30','支承座A正视图 / 尺寸与孔加工','Housing A front / dimensions and hole machining','水平83、60；垂直63、58.5、31、1；Ø50H8；Ø44；4-M4深8（PCD70，间隔90°）；图示45°。','horizontal83,60; vertical63,58.5,31,1; Ø50H8; Ø44; 4-M4 depth8 (PCD70,spaced90 degrees); shown45 degrees.'),
  k46('40','支承座A正视图 / 尺寸与孔加工','Housing A front / dimensions and hole machining','水平83、60；垂直63、58.5、31、1；Ø50H8；Ø44；4-M5深10（PCD70，间隔90°）；图示45°。','horizontal83,60; vertical63,58.5,31,1; Ø50H8; Ø44; 4-M5 depth10 (PCD70,spaced90 degrees); shown45 degrees.'),
  w46('60','折返支承座A正视图 / 尺寸与螺孔','Motor Wrap Housing A front / dimensions and tapped holes','水平83；垂直63、31、1；孔位40×40；4-M5深10（Helisert 2D）。','horizontal83; vertical63,31,1; hole positions40x40; 4-M5 depth10 (Helisert 2D).'),
  w46('60','折返支承座A侧视图 / 轴向与直径','Motor Wrap Housing A side / axial and diameter callouts','3; 20; 28; 18; Ø40.4; Ø8h7'),
  w46('WV','折返中间法兰正视图 / 厚度及孔加工','Motor Wrap Specification (Intermediate Flange) front / thickness and hole machining','厚6 mm；60×71；中心线至底边36.5；Ø51；4-M5通孔；4-M5深6（PCD70，间隔90°）。','thickness6 mm; 60x71; centerline-to-bottom36.5; Ø51; 4-M5 through; 4-M5 depth6 (PCD70,spaced90 degrees).'),
  w46('WY','折返中间法兰正视图 / 厚度及孔加工','Motor Wrap Specification (Intermediate Flange) front / thickness and hole machining','厚6 mm；60×71；中心线至底边36.5；Ø51；4-M5通孔；4-M4深6（PCD70，间隔90°）。','thickness6 mm; 60x71; centerline-to-bottom36.5; Ø51; 4-M5 through; 4-M4 depth6 (PCD70,spaced90 degrees).'),

  sensor('KR55',141,'EE-SX671',false,'(24.5); (13.6)','(20.7); (33.5)'),
  sensor('KR55',141,'EE-SX671',true,'(25); (13.6)','(20.6); (33.5)'),
  sensor('KR55',141,'EE-SX674',false,'(24.5); (13.1)','(13.5); (20.5)'),
  sensor('KR55',141,'EE-SX674',true,'(24); (13.1)','(13.5); (20.5)'),
  sensor('KR55',141,'APM-D3A1-001 / APM-D3B1-003',false,'(22)','(12.4)'),
  sensor('KR55',141,'APM-D3A1-001 / APM-D3B1-003',true,'(22)','(12.4)'),
  sensor('KR55',141,'GX-F12A / GX-F12B / GX-F12A-P / GX-F12B-P',false,'(22); (21)','(14.5)'),
  sensor('KR55',141,'GX-F12A / GX-F12B / GX-F12A-P / GX-F12B-P',true,'(22); (21)','(11.6); (14.5)'),
  ...notes('KR55',141,20),
  k55('A0','支承座A正视图 / 尺寸与孔加工','Housing A front / dimensions and hole machining','水平99、78；垂直72、71.5、31.5、0.5；4-M5深10；PCD70；图示±45°。','horizontal99,78; vertical72,71.5,31.5,0.5; 4-M5 depth10; PCD70; shown+/-45 degrees.'),
  k55('A0','支承座A侧视图 / 轴向与直径','Housing A side / axial and diameter callouts','上排22、45、27；下排39、22、33；Ø50H8；Ø12h7。','upper row22,45,27; lower row39,22,33; Ø50H8; Ø12h7.'),
  k55('A5','中间法兰正视图 / 外形及孔加工','Intermediate Flange front / outline and hole machining','80×80；4-M5深12（PCD90，间隔90°）；4-5.5钻通，Ø9.5沉孔深5.4（PCD70，间隔90°）。','80x80; 4-M5 depth12 (PCD90,spaced90 degrees); 4-5.5 drill through,Ø9.5 counterbore depth5.4 (PCD70,spaced90 degrees).'),
  k55('A5','中间法兰侧视图 / 轴向、配合孔及下方偏移','Intermediate Flange side / axial, mating bore and lower offset','15; 12; 3; 3.5; Ø70H7; Ø45; 下方偏移8','15; 12; 3; 3.5; Ø70H7; Ø45; lower offset8'),
  k55('AZ','中间法兰正视图 / 外形及孔加工','Intermediate Flange front / outline and hole machining','80×80；4-M6深12（PCD90，间隔90°）；4-5.5钻通，Ø9.5沉孔深9（PCD70，间隔90°）。','80x80; 4-M6 depth12 (PCD90,spaced90 degrees); 4-5.5 drill through,Ø9.5 counterbore depth9 (PCD70,spaced90 degrees).'),
  k55('AZ','中间法兰侧视图 / 轴向、配合孔及下方偏移','Intermediate Flange side / axial, mating bore and lower offset','15; 12; 3; 3.5; Ø70H7; Ø45; 下方偏移8','15; 12; 3; 3.5; Ø70H7; Ø45; lower offset8'),
  k55('A6','中间法兰正视图 / 外形及孔加工','Intermediate Flange front / outline and hole machining','外形85×85；孔位70×70；4-M6深12（间隔90°）；4-5.5钻通（PCD70，间隔90°）。','outline85x85; hole positions70x70; 4-M6 depth12 (spaced90 degrees); 4-5.5 drill through (PCD70,spaced90 degrees).'),
  k55('A6','中间法兰侧视图 / 轴向、配合孔及下方偏移','Intermediate Flange side / axial, mating bore and lower offset','15; 12; 3; 2.5; Ø60H7; Ø45; 下方偏移10.5','15; 12; 3; 2.5; Ø60H7; Ø45; lower offset10.5'),
  w55('20','折返支承座A正视图 / 尺寸与螺孔','Motor Wrap Housing A front / dimensions and tapped holes','水平99；垂直71.5、31.5、9、0.5；孔位45×45；4-M6深12。','horizontal99; vertical71.5,31.5,9,0.5; hole positions45x45; 4-M6 depth12.'),
  w55('20','折返支承座A侧视图 / 轴向与公差','Motor Wrap Housing A side / axial and tolerance callouts','3; 24; 32; 22; Ø41; Ø12h7(0/-0.018)'),
  w55('WV','折返中间法兰正视图 / 厚度及孔加工','Motor Wrap Specification (Intermediate Flange) front / thickness and hole machining','厚6 mm；60×71；中心线至底边36.5；Ø51；4-M5通孔；4-M5深6（PCD70，间隔90°）。','thickness6 mm; 60x71; centerline-to-bottom36.5; Ø51; 4-M5 through; 4-M5 depth6 (PCD70,spaced90 degrees).'),
  w55('W5','折返中间法兰正视图 / 厚度及孔加工','Motor Wrap Specification (Intermediate Flange) front / thickness and hole machining','厚6 mm；80×90；Ø71；4-M5通孔；4-M5深6（PCD90，间隔90°）。','thickness6 mm; 80x90; Ø71; 4-M5 through; 4-M5 depth6 (PCD90,spaced90 degrees).'),
  w55('WZ','折返中间法兰正视图 / 厚度及孔加工','Motor Wrap Specification (Intermediate Flange) front / thickness and hole machining','厚6 mm；80×90；Ø71；4-M5通孔；4-M6深6（PCD90，间隔90°）。','thickness6 mm; 80x90; Ø71; 4-M5 through; 4-M6 depth6 (PCD90,spaced90 degrees).'),

  sensor('KR65',157,'EE-SX671',false,'(28.1); (16.6)','(20.5); (33.5)'),
  sensor('KR65',157,'EE-SX671',true,'(28); (16.6)','(20.6); (33.5)'),
  sensor('KR65',157,'EE-SX674',false,'(28.6); (16.1)','(14); (20.5)'),
  sensor('KR65',157,'EE-SX674',true,'(28); (16.1)','(14); (20.5)'),
  sensor('KR65',157,'APM-D3A1-001 / APM-D3B1-003',false,'(25.1)','(12.4)'),
  sensor('KR65',157,'APM-D3A1-001 / APM-D3B1-003',true,'(25)','(12.4)'),
  sensor('KR65',157,'GX-F12A / GX-F12B / GX-F12A-P / GX-F12B-P',false,'(25.1); (24)','(11.6); (14)'),
  sensor('KR65',157,'GX-F12A / GX-F12B / GX-F12A-P / GX-F12B-P',true,'(25); (24)','(11.6); (14)'),
  ...notes('KR65',157,20),
  k65('A0','支承座A正视图 / 尺寸与孔加工','Housing A front / dimensions and hole machining','水平128、102；垂直83、82、37、1；两组4-M6深12；PCD90图示±45°；PCD100图示±30°。','horizontal128,102; vertical83,82,37,1; two4-M6 depth12 callouts; PCD90 shown+/-45 degrees; PCD100 shown+/-30 degrees.'),
  k65('A0','支承座A侧视图 / 轴向与直径','Housing A side / axial and diameter callouts','上排30、35、35；下排36、16、48；局部3.5；Ø70H8；Ø60；Ø15h7。','upper row30,35,35; lower row36,16,48; local3.5; Ø70H8; Ø60; Ø15h7.'),
  k65('AV','中间法兰正视图 / 外形及孔加工','Intermediate Flange front / outline and hole machining','74×74；4-M5通孔（PCD70，间隔90°）；4-6.6钻通，Ø11沉孔深6.5（PCD90，间隔90°）。','74x74; 4-M5 through (PCD70,spaced90 degrees); 4-6.6 drill through,Ø11 counterbore depth6.5 (PCD90,spaced90 degrees).'),
  k65('AV','中间法兰侧视图 / 轴向与配合孔','Intermediate Flange side / axial and mating-bore callouts','15; 12; 3; Ø50H7'),
  k65('A5','中间法兰正视图 / 外形及孔加工','Intermediate Flange front / outline and hole machining','100×80；4-M5通孔（PCD90，间隔90°）；4-6.6钻通，Ø11沉孔深6.5（PCD100，图示±30°）。','100x80; 4-M5 through (PCD90,spaced90 degrees); 4-6.6 drill through,Ø11 counterbore depth6.5 (PCD100,shown+/-30 degrees).'),
  k65('A5','中间法兰侧视图 / 轴向、配合孔及下方偏移','Intermediate Flange side / axial, mating bore and lower offset','15; 12; 3; 3.5; Ø70H7; Ø60; 下方偏移2','15; 12; 3; 3.5; Ø70H7; Ø60; lower offset2'),
  k65('A6','中间法兰正视图 / 外形及孔加工','Intermediate Flange front / outline and hole machining','外形100×85；孔位70×70；4-M6通孔；4-6.6钻通，Ø11沉孔深6.5（PCD100，图示±30°）。','outline100x85; hole positions70x70; 4-M6 through; 4-6.6 drill through,Ø11 counterbore depth6.5 (PCD100,shown+/-30 degrees).'),
  k65('A6','中间法兰侧视图 / 轴向、配合孔及下方偏移','Intermediate Flange side / axial, mating bore and lower offset','15; 12; 3; Ø60H7; 下方偏移4.5','15; 12; 3; Ø60H7; lower offset4.5'),
  k65('AZ','中间法兰正视图 / 外形及孔加工','Intermediate Flange front / outline and hole machining','80×80；4-7钻通（PCD90，间隔90°）。','80x80; 4-7 drill through (PCD90,spaced90 degrees).'),
  k65('AZ','中间法兰侧视图 / 轴向、配合孔及下方偏移','Intermediate Flange side / axial, mating bore and lower offset','18; 15; 3; 3.5; Ø70H7; Ø60; 下方偏移2','18; 15; 3; 3.5; Ø70H7; Ø60; lower offset2'),
  w65('30','折返支承座A正视图 / 尺寸与螺孔','Motor Wrap Housing A front / dimensions and tapped holes','水平128；垂直82、37、16、1；孔位56×56；4-M6深12。','horizontal128; vertical82,37,16,1; hole positions56x56; 4-M6 depth12.'),
  w65('30','折返支承座A侧视图 / 轴向与公差','Motor Wrap Housing A side / axial and tolerance callouts','29; 35; 16; Ø15h7(0/-0.018)'),
  w65('WV','折返中间法兰正视图 / 厚度及孔加工','Motor Wrap Specification (Intermediate Flange) front / thickness and hole machining','厚6 mm；外形86×100；孔位74×86；Ø51；4-M5通孔；4-M5深6（PCD70，间隔90°）。','thickness6 mm; outline86x100; hole positions74x86; Ø51; 4-M5 through; 4-M5 depth6 (PCD70,spaced90 degrees).'),
  w65('W5','折返中间法兰正视图 / 厚度及孔加工','Motor Wrap Specification (Intermediate Flange) front / thickness and hole machining','厚6 mm；外形86×100；孔位74×86；Ø71；4-M5通孔；4-M5深6（PCD90，间隔90°）。','thickness6 mm; outline86x100; hole positions74x86; Ø71; 4-M5 through; 4-M5 depth6 (PCD90,spaced90 degrees).'),
  w65('WZ','折返中间法兰正视图 / 厚度及孔加工','Motor Wrap Specification (Intermediate Flange) front / thickness and hole machining','厚6 mm；86×100；Ø71；4-M5通孔；4-M6深6（PCD90，间隔90°）。','thickness6 mm; 86x100; Ø71; 4-M5 through; 4-M6 depth6 (PCD90,spaced90 degrees).'),
];

export const industrial2ProductFamilies: Record<string, Family> = {
  'catalog-thk-kr45h': 'KR45H',
  'catalog-thk-kr46': 'KR46',
  'catalog-thk-kr55': 'KR55',
  'catalog-thk-kr65': 'KR65',
};

export function applyReadyIndustrial2Product(record: FinderExpansionRecord, locale: Locale): FinderExpansionRecord {
  const family = Object.hasOwn(industrial2ProductFamilies, record.id) ? industrial2ProductFamilies[record.id] : undefined;
  if (!family) return record;
  const variant = family === 'KR55' || family === 'KR65' ? 'A/B' : 'A/B/C/D';
  const additions: FinderParameter[] = industrial2DrawingRows.filter(item => item.family === family).map(item => {
    const heading = item.page === 121 || item.page === 157 ? family : `${family} ${variant}`;
    return {
    label: `${family}${locale === 'zh' ? '安装图' : ' mounting drawing'} / ${item.code} / ${item.view[locale]}`,
    labelAliases: [`${family}安装图 / ${item.code} / ${item.view.zh}`, `${family} mounting drawing / ${item.code} / ${item.view.en}`],
    value: item.value[locale], status: 'manufacturer',
    sourceUrl: `${industrial2SourceUrl}#page=${item.page}`,
    sourceLabel: locale === 'zh' ? 'THK官方手册条件安装图' : 'THK official conditional mounting drawing',
    sourceLocator: `PDF page ${item.page}; printed ${item.page - 1}; ${heading}; code ${item.code}; ${item.view.en}; SHA-256 ${industrial2SourceHash}`,
    conditions: l(`仅${heading}、代码${item.code}及所引视图；不代表无条件额定规格，不生成选件或订货组合。括号为原图参考标注；区分外罩状态、孔加工和配合公差。仅保留图示数值，未明确标注单位的不补加单位。第三方传感器不作为THK自有产品。`, `Only ${heading},code ${item.code} and the cited view; not unconditional ratings or generated option/order combinations. Preserve parenthesized reference callouts,cover state,hole machining and fits. Retain shown numbers without adding units absent from the figure. Third-party sensors are not THK products.`)[locale],
    normalized: [],
  };
  });
  const key = (field: FinderParameter) => `${field.sourceUrl}|${field.sourceLocator}`;
  const existing = new Set(record.parameters.map(key));
  const missing = additions.filter(field => !existing.has(key(field)));
  return missing.length ? { ...record, parameters: [...record.parameters, ...missing] } : record;
}
