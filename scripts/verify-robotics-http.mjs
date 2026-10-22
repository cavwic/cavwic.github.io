import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {projects} from '../src/features/robotics-lab/catalog.ts';
const base=(process.argv[2] || 'http://127.0.0.1:43201').replace(/\/$/,'');
const expectedIds=[1,2,3,4,5,6,7,8];
assert.deepEqual(projects.map(project=>project.id),expectedIds,'Experiment catalog must retain the original 01–08 order');
assert.equal(new Set(projects.map(project=>project.slug)).size,8,'Experiment slugs must be unique');
assert.equal(projects[1].slug,'hand-retargeting');
assert.equal(projects[1].key,'retargeting');
const request=(path,options={})=>fetch(base+path,{signal:AbortSignal.timeout(30_000),...options});
function assertNoDecorativeMark(body,path){
  assert(!/>\s*r\s*\/\s*<\/span>/.test(body),`${path}: remove the decorative r / mark`);
  assert(!/>\s*H↦R\s*<\/span>/.test(body),`${path}: remove the decorative H↦R mark`);
}
function assertNavigation(body,prefix,path){
  const ids=[...body.matchAll(/<a\b[^>]*\bdata-experiment-id="(\d+)"[^>]*>/g)].map(match=>Number(match[1]));
  assert.deepEqual(ids,expectedIds,`${path}: eight-item navigation order`);
  for(const project of projects)assert(body.includes(`href="${prefix}/tools/robotics-lab/${project.slug}"`),`${path}: navigation link ${project.slug}`);
}
function assertHistoryToolbar(body,prefix,path){
  assert.equal((body.match(/\bdata-history-toolbar\b/g)||[]).length,1,`${path}: one history toolbar`);
  for(const control of ['data-history-undo','data-history-redo','data-history-status'])assert(body.includes(control),`${path}: ${control}`);
  const back=body.match(/<a\b[^>]*\bdata-experiment-back\b[^>]*>/)?.[0];
  assert(back?.includes(`href="${prefix}/tools/robotics-lab"`),`${path}: explicit return to parent overview`);
}
function assertHandWorkspace(body,prefix,path){
  assert(body.includes('id="workspace"'),`${path}: complete retargeting workspace`);
  assert(body.includes('id="viewport"'),`${path}: 3D viewport`);
  assert(body.includes('id="camera-panel"'),`${path}: camera panel`);
  assert(body.includes('id="camera-start"'),`${path}: camera controls`);
  assert(body.includes('id="calibration-name"'),`${path}: calibration controls`);
  const alternate=`${prefix===''?'/en':''}/tools/robotics-lab/hand-retargeting`;
  assert(body.includes(`href="${alternate}"`),`${path}: language switch remains in the workbench`);
}
let workbenchPages=0;
for(const prefix of ['', '/en']){
  for(const path of ['/tools/robotics-lab',...projects.map(p=>`/tools/robotics-lab/${p.slug}`)]){
    const fullPath=prefix+path;
    const response=await request(fullPath);assert.equal(response.status,200,fullPath);
    const body=await response.text();assert(body.includes('<title>'),fullPath);assert(body.includes('robotics-main'),fullPath);
    assert(body.includes(`data-locale="${prefix===''?'zh':'en'}"`),`${fullPath}: locale`);
    assertNoDecorativeMark(body,fullPath);
    if(path==='/tools/robotics-lab'){
      let previous=-1;
      for(const project of projects){
        const index=body.indexOf(`href="${prefix}/tools/robotics-lab/${project.slug}"`);
        assert(index>previous,`${fullPath}: overview card order ${project.id}`);previous=index;
      }
      assert(!/<aside\b[^>]*class="[^"]*\blab-existing\b/.test(body),`${fullPath}: retargeting is no longer a separate existing-project aside`);
    }else {assertNavigation(body,prefix,fullPath);assertHistoryToolbar(body,prefix,fullPath);}
    if(path.endsWith('/hand-retargeting'))assertHandWorkspace(body,prefix,fullPath);
    workbenchPages++;
  }
}
for(const prefix of ['', '/en']){
  const path=prefix+'/tools/hand-retargeting';
  const response=await request(path);assert.equal(response.status,200,path);
  const body=await response.text();assertNoDecorativeMark(body,path);assertNavigation(body,prefix,path);assertHandWorkspace(body,prefix,path);assertHistoryToolbar(body,prefix,path);
}
for(const path of ['/tools','/en/tools'])assert.equal((await request(path)).status,200,path);
for(const path of ['/robotics-lab/grasp/results.json','/robotics-lab/randomization/results.json','/robotics-lab/tactile/manifest.json','/robotics-lab/imitation/results.json','/robotics-lab/data/mixed.json']){
  const response=await request(path);assert.equal(response.status,200,path);assert((await response.json())!==null);
}
const model=await request('/models/hand_landmarker-v1.task');assert.equal(model.status,200);
const modelBytes=new Uint8Array(await model.arrayBuffer());assert.equal(modelBytes.length,7_819_105);
assert.equal(createHash('sha256').update(modelBytes).digest('hex'),'fbc2a30080c3c557093b5ddfc334698132eb341044ccee322ccf8bcf3607cde1','Pinned MediaPipe hand model SHA256');
const wasmFiles=['vision_wasm_internal.js','vision_wasm_internal.wasm','vision_wasm_module_internal.js','vision_wasm_module_internal.wasm','vision_wasm_nosimd_internal.js','vision_wasm_nosimd_internal.wasm'];
for(const name of wasmFiles){
  const path=`/vendor/mediapipe/1.1.0/wasm/${name}`;
  const response=await request(path,{method:'HEAD'});assert.equal(response.status,200,path);
  assert(Number(response.headers.get('content-length'))>0,`${path}: nonempty runtime asset`);
  assert(!response.headers.get('content-type')?.includes('text/html'),`${path}: runtime asset must not fall back to HTML`);
}
for(const path of ['/vendor/mediapipe/1.1.0/LICENSE','/hand-retargeting/THIRD_PARTY.md','/hand-retargeting/THREE-LICENSE.txt']){
  const response=await request(path);assert.equal(response.status,200,path);assert((await response.text()).length>0,path);
}
const manifestResponse=await request('/robotics-lab/source-manifest.json');assert.equal(manifestResponse.status,200);
const manifest=await manifestResponse.json();const sourcePaths=new Set(manifest.files.map(file=>file.path));
for(const path of ['src/components/ExperimentActions.astro','src/features/robotics-lab/history.ts','src/features/robotics-lab/history-core.ts','src/features/hand-retargeting/history-state.ts','scripts/test-robotics-history.mjs','scripts/test-robotics-orbit-history.mjs','scripts/test-hand-history-records.mjs'])assert(sourcePaths.has(path),`Reproduction manifest includes operation history: ${path}`);
for(const path of ['src/components/RoboticsLabNav.astro','src/components/HandRetargetingLab.astro','src/features/hand-retargeting/engine.ts','src/pages/tools/hand-retargeting.astro','src/pages/en/tools/hand-retargeting.astro','scripts/stage-hand-retargeting-build.mjs','scripts/test-hand-retargeting.mjs','public/models/hand_landmarker-v1.task','public/vendor/mediapipe/1.1.0/LICENSE','public/hand-retargeting/THIRD_PARTY.md'])assert(sourcePaths.has(path),`Reproduction manifest includes ${path}`);
assert([...sourcePaths].every(path=>!/(?:^|\/)(?:node_modules|\.venv|\.training-venv|__pycache__|\.pytest_cache)(?:\/|$)/.test(path)),'Reproduction bundle excludes local dependency environments');
const archive=await request('/robotics-lab/robotics-projects-source.zip');assert.equal(archive.status,200);
const bytes=new Uint8Array(await archive.arrayBuffer());assert.equal(bytes[0],0x50);assert.equal(bytes[1],0x4b);
console.log(JSON.stringify({workbenchPages,legacyRetargetingPages:2,toolEntrypoints:2,jsonArtifacts:5,cameraAssets:1+wasmFiles.length,licenseDocuments:3,sourceManifestFiles:sourcePaths.size,sourceZipBytes:bytes.length,result:'PASS'},null,2));
