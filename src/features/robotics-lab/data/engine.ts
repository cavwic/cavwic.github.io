/** One row is one synchronized joint sample; timestamps are milliseconds. */
export interface Frame { episodeId:string; split:'train'|'validation'|'test'; timestampMs:number; sensorTimestampMs:number; commandTimestampMs:number; positionRad:number[]; commandRad:number[]; currentA:number; temperatureC:number }
export interface Dataset { version:1; provenance:string; frames:unknown[] }
export interface Rules { periodMs:number; maxSensorLagMs:number; maxCommandLagMs:number; maxVelocityRadS:number; maxCurrentA:number; maxTemperatureC:number; maxPositionRad:number }
export const defaultRules:Rules={periodMs:20,maxSensorLagMs:35,maxCommandLagMs:50,maxVelocityRadS:8,maxCurrentA:2,maxTemperatureC:65,maxPositionRad:2};
export interface Issue { row:number; episode:string; code:string; severity:'high'|'medium'; value:number|null; limit:number|null; detail:string }
export interface Report { rows:number; episodes:number; validRows:number; flaggedRows:number; affectedRows:number; affectedRate:number; issues:Issue[]; rules:Rules; provenance:string; splitCounts:Record<string,number>; codes:Record<string,number> }
const finite=(x:unknown):x is number=>typeof x==='number'&&Number.isFinite(x);
const vector=(x:unknown):x is number[]=>Array.isArray(x)&&x.length>0&&x.length<=32&&x.every(finite);
export function isFrame(value:unknown):value is Frame {
  if(!value||typeof value!=='object')return false;
  const f=value as Frame;
  return typeof f.episodeId==='string'&&f.episodeId.length>0&&f.episodeId.length<=200&&['train','validation','test'].includes(f.split)&&
    [f.timestampMs,f.sensorTimestampMs,f.commandTimestampMs,f.currentA,f.temperatureC].every(finite)&&vector(f.positionRad)&&vector(f.commandRad)&&f.positionRad.length===f.commandRad.length;
}
export function parseDataset(text:string):Dataset {
  if(text.length>8_000_000)throw Error('File exceeds 8 MB / 文件超过 8 MB');
  const parsed=JSON.parse(text);
  if(parsed?.version!==1||!Array.isArray(parsed.frames)||parsed.frames.length===0||parsed.frames.length>20_000)throw Error('Expected version 1 and 1–20,000 frames / 需要 version=1 和 1～20000 行 frames');
  return {version:1,provenance:typeof parsed.provenance==='string'?parsed.provenance.slice(0,500):'Imported / unverified origin',frames:parsed.frames};
}
export function audit(dataset:Dataset, rules:Rules=defaultRules):Report {
  for(const value of Object.values(rules))if(!finite(value)||value<=0)throw Error('Thresholds must be finite and positive');
  if(!Array.isArray(dataset.frames)||dataset.frames.length>20_000)throw Error('Invalid dataset size');
  const issues:Issue[]=[], previous=new Map<string,{frame:Frame;row:number}>(), keys=new Set<string>();
  const episodeSplits=new Map<string,Set<string>>(), signals=new Map<string,{row:number;split:string;values:string[]}>();
  const episodes=new Set<string>(),splitCounts:Record<string,number>={train:0,validation:0,test:0}; let validRows=0;
  const add=(row:number,episode:string,code:string,value:number|null,limit:number|null,detail:string,severity:'high'|'medium'='high')=>issues.push({row,episode,code,value,limit,detail,severity});
  dataset.frames.forEach((raw,row)=>{
    if(!isFrame(raw)){add(row,'?', 'SCHEMA',null,null,'Missing, non-finite or mismatched fields / 字段缺失、非有限或维度不一致');return;}
    const f=raw;validRows++;episodes.add(f.episodeId);splitCounts[f.split]++;
    const splits=episodeSplits.get(f.episodeId)??new Set<string>();splits.add(f.split);episodeSplits.set(f.episodeId,splits);
    if(splits.size>1)add(row,f.episodeId,'SPLIT_LEAK',null,null,'Same episode ID occurs in multiple splits / 同一 episode 跨数据划分');
    const key=JSON.stringify([f.episodeId,f.timestampMs]);if(keys.has(key))add(row,f.episodeId,'DUPLICATE',f.timestampMs,null,'Duplicate episode / timestamp key / 重复复合主键');keys.add(key);
    const old=previous.get(f.episodeId);
    if(old){const dt=f.timestampMs-old.frame.timestampMs;
      if(dt<=0)add(row,f.episodeId,'CLOCK',dt,0,'Non-increasing sample timestamp / 采样时间不递增');
      if(dt>rules.periodMs*1.8)add(row,f.episodeId,'GAP',dt,rules.periodMs*1.8,'Sampling gap; not proof of a lost video frame / 采样间隔异常，不等于已证实视频丢帧','medium');
      if(f.positionRad.length!==old.frame.positionRad.length)add(row,f.episodeId,'DIMENSION',f.positionRad.length,old.frame.positionRad.length,'Joint dimension changed within episode / 同一 episode 关节维度变化');
      else if(dt>0&&dt<=rules.periodMs*1.8){const speed=Math.max(...f.positionRad.map((x,j)=>Math.abs(x-old.frame.positionRad[j])*1000/dt));if(speed>rules.maxVelocityRadS)add(row,f.episodeId,'JUMP',speed,rules.maxVelocityRadS,'Finite-difference velocity exceeds configured bound / 差分速度越过设定阈值');}
    }
    previous.set(f.episodeId,{frame:f,row});
    const sensorLag=f.timestampMs-f.sensorTimestampMs,commandLag=f.timestampMs-f.commandTimestampMs;
    if(sensorLag<0||sensorLag>rules.maxSensorLagMs)add(row,f.episodeId,'SENSOR_TIME',sensorLag,rules.maxSensorLagMs,'Sensor timestamp offset; clock synchronization not established / 传感时间偏移，需确认时钟同步');
    if(commandLag<0||commandLag>rules.maxCommandLagMs)add(row,f.episodeId,'COMMAND_TIME',commandLag,rules.maxCommandLagMs,'Command timestamp offset, not measured network latency / 指令时间偏移，不直接代表网络延迟');
    const maxAngle=Math.max(...f.positionRad.map(Math.abs));if(maxAngle>rules.maxPositionRad)add(row,f.episodeId,'POSITION',maxAngle,rules.maxPositionRad,'Position exceeds configured joint bound / 关节位置超出设定范围');
    if(Math.abs(f.currentA)>rules.maxCurrentA)add(row,f.episodeId,'CURRENT',f.currentA,rules.maxCurrentA,'Current exceeds configured bound / 电流越过设定阈值');
    if(f.temperatureC>rules.maxTemperatureC)add(row,f.episodeId,'TEMPERATURE',f.temperatureC,rules.maxTemperatureC,'Temperature exceeds configured bound / 温度越过设定阈值');
    const signal=signals.get(f.episodeId)??{row,split:f.split,values:[]};signal.values.push(JSON.stringify([f.positionRad.map(x=>+x.toFixed(6)),f.commandRad.map(x=>+x.toFixed(6))]));signals.set(f.episodeId,signal);
  });
  const fingerprints=new Map<string,{episode:string;split:string}>();
  for(const[episode,signal]of signals){if(signal.values.length<10)continue;const fingerprint=signal.values.join('|'),old=fingerprints.get(fingerprint);if(old&&old.split!==signal.split)add(signal.row,episode,'CONTENT_LEAK',null,null,`Identical quantized trajectory across splits; possible duplicate of ${old.episode} / 跨划分轨迹完全相同，疑似重复`);else fingerprints.set(fingerprint,{episode,split:signal.split});}
  const affected=new Set(issues.map(i=>i.row)),flaggedRows=affected.size;
  const leakedEpisodes=new Set(issues.filter(i=>['SPLIT_LEAK','CONTENT_LEAK'].includes(i.code)).map(i=>i.episode));
  dataset.frames.forEach((f,i)=>{if(isFrame(f)&&leakedEpisodes.has(f.episodeId))affected.add(i);});
  const affectedRows=affected.size,codes:Record<string,number>={};for(const i of issues)codes[i.code]=(codes[i.code]??0)+1;
  return {rows:dataset.frames.length,episodes:episodes.size,validRows,flaggedRows,affectedRows,affectedRate:dataset.frames.length?affectedRows/dataset.frames.length:0,issues,rules:{...rules},provenance:dataset.provenance,splitCounts,codes};
}
export function makeFixture(kind='mixed',seed=42):Dataset {
  let state=seed>>>0;const rand=()=>{state=(1664525*state+1013904223)>>>0;return state/4294967296;};
  const frames:unknown[]=[];
  for(let e=0;e<4;e++)for(let i=0;i<120;i++){const t=i*20,phase=i*.025+e*.4;frames.push({episodeId:`episode-${e+1}`,split:e<2?'train':e===2?'validation':'test',timestampMs:t,sensorTimestampMs:t-8-rand()*4,commandTimestampMs:t-5,positionRad:[.5*Math.sin(phase),.3*Math.cos(phase)],commandRad:[.5*Math.sin(phase+.03),.3*Math.cos(phase+.03)],currentA:.3+.04*rand(),temperatureC:28+.5*rand()});}
  if(kind==='clean')return{version:1,provenance:`Synthetic deterministic fixture; seed=${seed}; 50 Hz; no physical sensors`,frames};
  if(kind==='timing'||kind==='mixed'){
    (frames[40] as Frame).timestampMs=(frames[39] as Frame).timestampMs-5;
    for(let i=60;i<80;i++)(frames[i] as Frame).sensorTimestampMs-=65;
    (frames[100] as Frame).commandTimestampMs-=90;frames.splice(90,3);frames.splice(15,0,structuredClone(frames[14]));
  }
  if(kind==='signals'||kind==='mixed'){
    (frames[170] as Frame).positionRad=[1.4,-1.3];(frames[185] as Frame).currentA=3.2;(frames[190] as Frame).temperatureC=78;(frames[195] as Record<string,unknown>).positionRad=null;
  }
  if(kind==='leakage'||kind==='mixed'){
    const original=frames.filter(isFrame).filter(f=>f.episodeId==='episode-3');
    frames.push(...original.map(f=>({...structuredClone(f),episodeId:'episode-copy',split:'test' as const})));
    frames.push({...structuredClone(frames[2] as Frame),split:'test' as const});
  }
  return {version:1,provenance:`Synthetic fault-injection fixture; seed=${seed}; no physical sensor / video measurements`,frames};
}
export function quarantine(dataset:Dataset,report:Report):{dataset:Dataset;removed:number;indices:number[]} {
  // A conservative review copy only. Never overwrite the source or infer a correction.
  const marked=new Set(report.issues.map(i=>i.row));const leakedEpisodes=new Set(report.issues.filter(i=>['SPLIT_LEAK','CONTENT_LEAK'].includes(i.code)).map(i=>i.episode));
  const indices=dataset.frames.flatMap((f,i)=>marked.has(i)||(isFrame(f)&&leakedEpisodes.has(f.episodeId))?[i]:[]),excluded=new Set(indices);
  return {dataset:{...dataset,provenance:`Quarantine preview derived from: ${dataset.provenance}`,frames:dataset.frames.filter((_,i)=>!excluded.has(i))},removed:indices.length,indices};
}
