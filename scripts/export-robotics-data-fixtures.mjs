import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {makeFixture,audit} from '../src/features/robotics-lab/data/engine.ts';
const out=resolve(import.meta.dirname,'../public/robotics-lab/data');await mkdir(out,{recursive:true});
for(const kind of ['clean','timing','signals','leakage','mixed']){
  const dataset=makeFixture(kind);
  await writeFile(resolve(out,`${kind}.json`),JSON.stringify(dataset));
  await writeFile(resolve(out,`${kind}-report.json`),JSON.stringify(audit(dataset),null,2));
}
console.log('Five deterministic diagnostic fixtures and recomputed reports exported. No physical data.');
