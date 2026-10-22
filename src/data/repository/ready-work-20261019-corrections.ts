import type { Locale } from '../site';
import type { FinderExpansionRecord } from './product-finder-demo';
import { normalizeFinderParameter } from './parameter-index';

const source='https://tmwebtest.blob.core.windows.net/triwebtest/docs/797ceeca199c5941/TM_Robot_Catalog_260407EN_SPEC.pdf';
const sha='76d598ecb3612fd1e0d4b06a716942dbfe2e60a6c8b76b1ecbc941a89290f46b';
type Correction = {id:string;labels:[string,string];before:[string,string];after:[string,string];numeric:boolean;column:string};
const speedsZh='J1 100°/s；J2 100°/s；J3 130°/s；J4 195°/s；J5 210°/s；J6 225°/s';
const speedsEn='J1 100°/s; J2 100°/s; J3 130°/s; J4 195°/s; J5 210°/s; J6 225°/s';
export const readyVerifiedCorrections: Correction[] = [
  {id:'techman-tm20s',labels:['标准控制箱质量','Standard controller weight'],before:['16.3 kg','16.3 kg'],after:['13.5 kg','13.5 kg'],numeric:false,column:'Control Box Weight; merged TM14S/TM20S cell'},
  {id:'techman-tm20s',labels:['典型功耗','Typical power consumption'],before:['580 W','580 W'],after:['400 W','400 W'],numeric:true,column:'Typical power consumption; merged TM14S/TM20S cell'},
  {id:'techman-tm20s',labels:['交流供电','AC power supply'],before:['200-240 VAC, 50-60 Hz','200-240 VAC, 50-60 Hz'],after:['100-240 VAC, 50-60 Hz','100-240 VAC, 50-60 Hz'],numeric:true,column:'Power Supply; main controller, merged TM14S/TM20S cell; not Nano'},
  ...['techman-tm25s','techman-tm30s','techman-tm30sc'].map(id=>({id,labels:['最大关节速度','Maximum joint speeds'] as [string,string],before:['J1/J2 100°/s；J3 130°/s；J4/J5 195°/s；J6 225°/s','J1/J2 100°/s; J3 130°/s; J4/J5 195°/s; J6 225°/s'] as [string,string],after:[speedsZh,speedsEn] as [string,string],numeric:false,column:'J1-J6 speed rows; J4=195, J5=210 deg/s'})),
];

export function applyReadyVerifiedCorrections(record:FinderExpansionRecord,locale:Locale):FinderExpansionRecord{
  if(record.profile.slug!=='techman-robot')return record;
  const applicable=readyVerifiedCorrections.filter(c=>c.id===record.id);
  if(!applicable.length)return record;
  const index=locale==='zh'?0:1;
  let changed=false;
  const parameters=record.parameters.map(field=>{
    const correction=applicable.find(c=>c.labels.includes(field.label)&&field.sourceUrl===source&&field.value===c.before[index]);
    if(!correction)return field;
    changed=true;
    const canonical={...field,label:correction.labels[1],value:correction.after[1]};
    const note=locale==='zh'?`同版官方规格表错列转录更正，原记录：${field.value}；不是版本差异。`:`Correction of a wrong-column transcription in the same pinned sheet; previous value: ${field.value}; not a revision discrepancy.`;
    return {...field,value:correction.after[index],sourceLocator:`PDF p1,right table;${record.product};${correction.column};SHA-256 ${sha};reviewed-correction-20261019`,
      conditions:[field.conditions,note].filter(Boolean).join(' '),normalized:correction.numeric?normalizeFinderParameter(canonical).map(n=>({...n,sourceLabel:field.label})):[]};
  });
  return changed?{...record,parameters}:record;
}
