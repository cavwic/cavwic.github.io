import { mkdir, copyFile, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { benchmark, normalizeLandmarks, sampleGesture, robotModel, jointLimits,modelKinematicsId } from '../src/features/hand-retargeting/engine.ts';
const root=fileURLToPath(new URL('..',import.meta.url));
const output=path.join(root,'public/hand-retargeting');
await mkdir(path.join(output,'source'),{recursive:true});
const modules=['engine.ts','app.ts','calibration.ts','runtime.ts','robot-visual.ts','visual-frame.ts','vision.worker.ts','benchmark.worker.ts','copy.ts','history-state.ts'];
for(const name of modules) await copyFile(path.join(root,'src/features/hand-retargeting',name),path.join(output,'source',name));
for(const name of ['test-hand-retargeting.mjs','test-hand-calibration.mjs','test-hand-runtime.mjs','test-hand-visual.mjs','test-hand-history-records.mjs'])await copyFile(path.join(root,'scripts',name),path.join(output,'source',name));
await copyFile(path.join(root,'node_modules/three/LICENSE'),path.join(output,'THREE-LICENSE.txt'));
// UI-only updates must not regenerate numeric fixtures or timestamped benchmarks.
const matches=(await Promise.all(modules.map(async name=>(await readFile(path.join(root,'src/features/hand-retargeting',name),'utf8'))===(await readFile(path.join(output,'source',name),'utf8'))))).every(Boolean);
if(!matches)throw new Error('Public source differs from actual solver');
if(process.argv.includes('--source-only')){console.log(JSON.stringify({sourceMatches:matches,sourceOnly:true,modules:modules.length}));process.exit(0)}
const frames=Array.from({length:60},(_,i)=>({time:i/15,points:normalizeLandmarks(sampleGesture('wave',i/15,0,42)).points}));
await writeFile(path.join(output,'sample-sequence.json'),JSON.stringify({version:1,coordinates:'palm',provenance:'procedural synthetic human-like hand; seed 42; not human recording',frames},null,2));
await writeFile(path.join(output,'model.json'),JSON.stringify({modelKinematicsId,robotModel,jointLimits,units:'m/rad',hardwareValidated:false},null,2));
const report={version:1,modelKinematicsId,createdAt:new Date().toISOString(),runtime:process.version,source:'synthetic',conditions:{pinchWeight:3,enforceLimits:true,inputFilterSeconds:0,outputSmoothingSeconds:0,personalCalibration:false},...benchmark({frames:36,seed:42,gestures:['open','fist','pinch','point','spread','wave'],ik:{pinchWeight:3}}),stressTest:benchmark({frames:24,seed:42,gestures:['unreachable'],ik:{pinchWeight:3}})};
await writeFile(path.join(output,'reference-benchmark.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({sourceMatches:matches,frames:report.aggregate.totalFrames,baselineMeanMm:report.aggregate.baselineMeanMm,ikMeanMm:report.aggregate.ikMeanMm,fixtureFrames:frames.length},null,2));
