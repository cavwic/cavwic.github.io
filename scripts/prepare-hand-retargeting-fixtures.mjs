// Generated local-only inputs for repeatable browser QA; never human recordings.
import {mkdir,writeFile} from 'node:fs/promises';
import {sampleGesture,normalizeLandmarks} from '../src/features/hand-retargeting/engine.ts';
import {HandCalibrationSession} from '../src/features/hand-retargeting/calibration.ts';
const folder=new URL('../tmp/hand-retargeting-qa/',import.meta.url);
await mkdir(folder,{recursive:true});
const phases=['open','fist','pinch'];
for(const hand of ['Right','Left']){
  const frames=[];
  for(let phase=0;phase<3;phase++)for(let frame=0;frame<75;frame++){
    const points=sampleGesture(phases[phase],1,.1,42+frame).map(([x,y,z])=>[hand==='Left'?-x:x,y,z]);
    frames.push({time:(phase*75+frame)/30,points});
  }
  await writeFile(new URL(`world-${hand}.json`,folder),JSON.stringify({version:1,coordinates:'world',handedness:hand,provenance:'synthetic browser-QA fixture; not a human recording',frames}));
}
const session=new HandCalibrationSession({name:'Synthetic QA profile',provenance:'synthetic',handedness:'Right'});
for(let p=0;p<3;p++)for(let i=0;i<24;i++)session.addFrame(phases[p],sampleGesture(phases[p],1,0,42),'Right',p*1000+i*33);
await writeFile(new URL('synthetic-profile.json',folder),JSON.stringify(session.finish()));
await writeFile(new URL('invalid-profile.json',folder),JSON.stringify({version:1,name:'invalid fixture',provenance:'camera'}));
const points=normalizeLandmarks(sampleGesture('pinch',1,0,42)).points;
const humanPoints=points.map(p=>[...p]);humanPoints[4]=[...humanPoints[8]];
await writeFile(new URL('processed-palm.json',folder),JSON.stringify({version:1,coordinates:'palm',inputProcessing:'processed',provenance:'synthetic zero-gap processed replay test; not human data',frames:[{time:0,points,normalizedHumanPoints:humanPoints,pinchTargetVector:[0,0,0]}]}));
await writeFile(new URL('invalid-world.json',folder),JSON.stringify({version:1,coordinates:'world',handedness:'Right',provenance:'deliberate degenerate QA fixture',frames:[{time:0,points:Array.from({length:21},()=>[0,0,0])}]}));
console.log('Generated Right/Left world, synthetic/invalid profile and processed-palm QA fixtures in tmp/hand-retargeting-qa.');
