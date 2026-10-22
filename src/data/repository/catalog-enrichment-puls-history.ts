import type { TimelineSeed } from './verified-catalog-wave-fourteen-common';

const l=(zh:string,en:string)=>({zh,en});
const company='https://www.pulspower.com/ca/company/about-puls/history/company-history/';
const technology='https://www.pulspower.com/ca/company/about-puls/history/technology-history/';
export const pulsHistory: TimelineSeed[] = [
  {date:'1980',kind:'founding',title:l('PULS在慕尼黑成立','PULS founded in Munich'),detail:l('Bernhard Erdl创立公司，业务起点为开关电源。','Bernhard Erdl founded the company around switched-mode power supplies.'),sourceUrl:company},
  {date:'1990-11',kind:'product',title:l('展示DIN导轨电源原型','DIN-rail supply prototype shown'),detail:l('官网记录在慕尼黑electronica展会展示原型；原型展示与量产交付分开理解。','The official chronology records a prototype at electronica in Munich, distinct from series-production delivery.'),sourceUrl:technology},
  {date:'2017',kind:'business',title:l('收购Etasyn并更名PULS VARIO','Etasyn acquired and renamed PULS VARIO'),detail:l('该业务面向定制电源与电源系统；收购事件不记作外部融资。','The business addresses custom power supplies and systems; the acquisition is not recorded as external funding.'),sourceUrl:company},
  {date:'2020',kind:'product',title:l('推出FIEPOS现场电源系列','FIEPOS field-supply family introduced'),detail:l('系列面向分布式供电，包含不同连接器与输出保护配置；可选IO-Link并非所有型号标配。','The family addresses decentralized power with connector and output-protection variants; optional IO-Link is not standard on every model.'),sourceUrl:technology},
];
