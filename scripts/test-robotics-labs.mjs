import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const suites=['test-robotics-control.mjs','test-robotics-safety.mjs','test-robotics-grasp.mjs','test-robotics-learning.mjs','test-robotics-data.mjs','test-robotics-visuals.mjs','test-robotics-history.mjs','test-robotics-orbit-history.mjs'];
for(const suite of suites){
  const run=spawnSync(process.execPath,[resolve(root,'scripts',suite)],{cwd:root,stdio:'inherit'});
  if(run.status!==0)process.exit(run.status??1);
}
console.log('All eight robotics suites passed. These are software checks, not hardware validation.');
