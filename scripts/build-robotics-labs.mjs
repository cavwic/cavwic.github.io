import {cp,mkdir,access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=resolve(import.meta.dirname,'..'),stage=resolve(root,'tmp/robotics-lab-build');
await mkdir(resolve(stage,'src/components'),{recursive:true});
await cp(resolve(root,'src/components/ExperimentActions.astro'),resolve(stage,'src/components/ExperimentActions.astro'));
for(const relative of ['src/components/RoboticsLab.astro','src/components/RoboticsLabNav.astro','src/components/HandRetargetingLab.astro','src/features/robotics-lab','src/features/hand-retargeting','src/styles/global.css','src/pages/tools/robotics-lab','src/pages/en/tools/robotics-lab','src/pages/tools/hand-retargeting.astro','src/pages/en/tools/hand-retargeting.astro','public/robotics-lab','public/hand-retargeting','public/vendor/mediapipe/1.1.0','public/models/hand_landmarker-v1.task','public/favicon.svg']){
  await access(resolve(root,relative));
  await mkdir(resolve(stage,relative,'..'),{recursive:true});
  await cp(resolve(root,relative),resolve(stage,relative),{recursive:true});
}
const run=spawnSync(process.execPath,[resolve(root,'node_modules/astro/bin/astro.mjs'),'build','--config','./astro.robotics-lab.config.mjs'],{cwd:root,stdio:'inherit'});
process.exit(run.status??1);
