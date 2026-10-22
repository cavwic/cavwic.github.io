import {createHash} from 'node:crypto';
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {resolve,relative,join} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=resolve(import.meta.dirname,'..');
const included=['robotics-projects','src/features/robotics-lab','src/features/hand-retargeting','src/components/RoboticsLab.astro','src/components/RoboticsLabNav.astro','src/components/HandRetargetingLab.astro','src/styles/global.css','src/pages/tools/robotics-lab','src/pages/en/tools/robotics-lab','src/pages/tools/hand-retargeting.astro','src/pages/en/tools/hand-retargeting.astro','public/robotics-lab','public/hand-retargeting','public/vendor/mediapipe/1.1.0','public/models/hand_landmarker-v1.task','public/favicon.svg','package.json','package-lock.json','scripts/test-robotics-control.mjs','scripts/test-robotics-safety.mjs','scripts/test-robotics-grasp.mjs','scripts/test-robotics-learning.mjs','scripts/test-robotics-data.mjs','scripts/test-robotics-labs.mjs','scripts/test-hand-retargeting.mjs','scripts/test-hand-calibration.mjs','scripts/test-hand-runtime.mjs','scripts/test-hand-visual.mjs','scripts/prepare-hand-retargeting-assets.mjs','scripts/prepare-hand-retargeting-fixtures.mjs','scripts/export-hand-retargeting-evidence.mjs','scripts/stage-hand-retargeting-build.mjs','scripts/build-robotics-labs.mjs','scripts/package-robotics-labs.mjs','scripts/export-robotics-data-fixtures.mjs','astro.robotics-lab.config.mjs','astro.hand-retargeting.config.mjs'];
const files=[];
included.push('scripts/verify-robotics-http.mjs','scripts/test-robotics-visuals.mjs','src/components/ExperimentActions.astro','scripts/test-robotics-history.mjs','scripts/test-robotics-orbit-history.mjs','scripts/test-hand-history-records.mjs');
async function visit(path){
  if(/(?:^|[\\/])(?:\.venv|\.training-venv|__pycache__|\.pytest_cache)(?:[\\/]|$)/.test(path))return;
  const {stat}=await import('node:fs/promises'); const s=await stat(path);
  if(s.isDirectory()){for(const item of await readdir(path))await visit(join(path,item));}
  else if(!path.endsWith('.zip')&&!path.endsWith('.zip.tmp')&&!path.endsWith('source-manifest.json'))files.push(path);
}
for(const item of included)await visit(resolve(root,item));
files.sort();const entries=[];
for(const file of files){const bytes=await readFile(file);entries.push({path:relative(root,file).replaceAll('\\','/'),bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}
const out=resolve(root,'public/robotics-lab');await mkdir(out,{recursive:true});
await writeFile(resolve(out,'source-manifest.json'),JSON.stringify({schema:'robotics-source-v1',files:entries},null,2));
const python=resolve(root,'robotics-projects/.venv/Scripts/python.exe');
const archive=resolve(out,'robotics-projects-source.zip');
const list=JSON.stringify([...entries.map(e=>e.path),'public/robotics-lab/source-manifest.json']);
const code='import json,sys,zipfile,pathlib; root=pathlib.Path(sys.argv[1]); files=json.loads(sys.stdin.read()); out=pathlib.Path(sys.argv[2]); temp=out.with_suffix(".zip.tmp"); z=zipfile.ZipFile(temp,"w",zipfile.ZIP_DEFLATED); [z.write(root/f,f) for f in files]; z.close(); temp.replace(out); print(str(out))';
const run=spawnSync(python,['-X','utf8','-c',code,root,archive],{input:list,encoding:'utf8',maxBuffer:1_000_000});
if(run.status!==0){console.error(run.stderr);process.exit(run.status??1);}console.log(run.stdout);console.log(`${entries.length} source / result files packaged; isolated environments excluded.`);
