import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createRobotVisual } from './robot-visual';
import { HandCalibrationSession, applyCalibration, importCalibrationProfile, exportCalibrationProfile, type CalibrationProfile, type CalibrationPhase, type CalibrationProvenance } from './calibration';
import { LandmarkFilter, StationaryVariation, TrackingQuality } from './runtime';
import { labCopy, calibrationErrorCopy } from './copy';
import { createHistoryScope } from '../robotics-lab/history';
import { RecordingHistory, type RecordingSegment } from './history-state';
import { angleBaseline, fingerNames, forwardKinematics, getRobotTargets, jointLimits, metrics,
  normalizeLandmarks, robotModel, modelKinematicsId, sampleGesture, solveIK, type Vec3, type Handedness } from './engine';

const locale = document.documentElement.dataset.locale === 'en' ? 'en' : 'zh';
const c = labCopy[locale];
const el = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const input = (id: string) => el<HTMLInputElement>(id);
const clone = (points: Vec3[]) => points.map(p => [...p] as Vec3);
const tipIndices = [4, 8, 12, 16, 20];
const fingerColors = [0xe49b47, 0xe27661, 0x59ad9a, 0x648fd1, 0x9a7cc4];
type Gesture = Parameters<typeof sampleGesture>[0];
type ImportData = { version: 1; kind?:string;modelKinematicsId?:string;coordinates: 'palm' | 'world'; inputProcessing?:'processed';provenance?: string; handedness?: Handedness; frames: { time: number; points: Vec3[]; normalizedHumanPoints?:Vec3[];pinchTargetVector?:Vec3 }[] };
type InputPacket = { points:Vec3[]; humanPoints:Vec3[]; pinchTargetVector:Vec3; rawWorldPoints?:Vec3[]; handedness:Handedness; sampledAtMs:number; sampleKey:string; calibrationApplied:boolean };
let source: 'synthetic' | 'camera' | 'imported' = 'synthetic';
let gesture: Gesture = 'pinch';
let algorithm = 'ik';
let playing = false;
let time = 1.2;
let dirty = true;
let cameraPoints: Vec3[] | undefined;
let cameraHand: Handedness = 'Right';
let cameraSampledAtMs = 0;
let cameraFrameSerial = 0;
let cameraStartedAtMs = 0;
let cameraValid = false;
let imported: ImportData | undefined;
let offsets: Vec3[] = Array.from({ length: 5 }, () => [0, 0, 0]);
let selectedFinger = 1;
let previousIK: number[] | undefined;
let smoothIK: number[] | undefined;
let smoothBaseline: number[] | undefined;
let currentQ: number[] = Array(20).fill(0);
let lastSolve = 0;
let lastReadout = 0;
let needsSettling = false;
let report: unknown;
let benchmarkWorker: Worker | undefined;
let disposed = false;
const records: Record<string, unknown>[] = [];
const history: { ik: number; baseline: number }[] = [];
type RecordingMetadata={source:'synthetic'|'camera'|'imported';importedProvenance?:string;calibrationProfile?:CalibrationProfile;startedAt:string};
const recordingHistory=new RecordingHistory<Record<string,unknown>,{ik:number;baseline:number},RecordingMetadata>(records,history);
type HandRecording=RecordingSegment<Record<string,unknown>,{ik:number;baseline:number},RecordingMetadata>;
const humanFilter=new LandmarkFilter(),targetFilter=new LandmarkFilter();
const variation=new StationaryVariation(),trackingQuality=new TrackingQuality();
let preparedPacket:InputPacket|undefined;
let preparedKey='';
let importedRevision=0;
let calibrationProfile:CalibrationProfile|undefined;
let legacyCalibrationJson:string|undefined;
let calibrationSession:HandCalibrationSession|undefined;
let calibrationSessionSource:CalibrationProvenance|undefined;
let capturePhase:CalibrationPhase|undefined;
let lastCalibrationSample='';
const calibrationSeenSamples=new Set<string>();
const calibrationStorageKey='cavwic-hand-calibration-v2';
const legacyCalibrationStorageKey='cavwic-hand-calibration-v1';
const say=(zh:string,en:string)=>locale==='zh'?zh:en;

// Register reversible UI changes after initialization, so a snapshot never reads
// a renderer, stream or calibration field before its declaration has run.
const historyBindings: (() => void)[] = [];
function historyClick(node: HTMLElement, label: string, action: () => void | Promise<void>) {
  node.addEventListener('click', () => { actionHistory.run(label, action); });
}
function historyInput(node: HTMLElement, event: 'input' | 'change', label: string, action: (event: Event) => void | Promise<void>) {
  historyBindings.push(() => actionHistory.listen(node, event, label, action));
}

const phases:CalibrationPhase[]=['open','fist','pinch'];
const phaseName=(phase:CalibrationPhase)=>phase==='open'?c.calibrationOpen:phase==='fist'?c.calibrationFist:c.calibrationPinchStage;
function calibrationErrorText(error:unknown){
  const code=(error as {code?:string})?.code||'ERROR';
  return calibrationErrorCopy[locale][code]||(locale==='zh'&&error instanceof Error?error.message:c.calibrationFailure);
}
function currentCalibrationHand():Handedness{return source==='camera'?cameraHand:source==='imported'?imported?.handedness||'Right':'Right';}
function calibrationCompatible(){return !!calibrationProfile&&calibrationProfile.provenance===source&&calibrationProfile.handedness===currentCalibrationHand()&&!(source==='imported'&&imported?.coordinates==='palm');}
function refreshCalibrationUI(){
  const available=source==='camera'?cameraValid:source==='imported'&&imported?.coordinates==='world'&&!!imported.handedness;
  el<HTMLButtonElement>('calibration-capture').disabled=!available&&!capturePhase;
  el('calibration-capture').textContent=capturePhase?say('停止本阶段采集','Stop this stage'):c.calibrationCapture;
  const statuses=calibrationSession?phases.map(p=>calibrationSession!.getPhaseStatus(p)):[];
  document.querySelectorAll<HTMLElement>('[data-calibration-phase]').forEach(node=>{node.dataset.complete=String(statuses.find(s=>s.phase===node.dataset.calibrationPhase)?.ready||false);});
  el<HTMLButtonElement>('calibration-save').disabled=!statuses.length||!statuses.every(s=>s.ready);
  const compatible=calibrationCompatible();input('calibration-enabled').disabled=!compatible;
  if(!compatible)input('calibration-enabled').checked=false;
  el<HTMLButtonElement>('calibration-export').disabled=!calibrationProfile;
  el('calibration-legacy-export').hidden=!legacyCalibrationJson;
  if(calibrationProfile){
    const p=calibrationProfile;
    const origin=p.provenance==='synthetic'?say('合成验证 · 非真人','Synthetic test · not a human'):p.provenance==='camera'?say('相机估计','Camera estimates'):say('导入数据 · 未核验','Imported data · unverified');
    el('calibration-status').textContent=`${p.name} · ${origin}`;
    el('calibration-summary').textContent=`${p.handedness==='Right'?c.cameraHandRight:c.cameraHandLeft} · ${say('掌宽','Palm width')} ${(p.palmWidthM*1000).toFixed(1)} mm\n${say('有效帧','Valid frames')} ${p.sampleCounts.open} / ${p.sampleCounts.fist} / ${p.sampleCounts.pinch}\n${say('各指比例','Finger scales')} ${p.fingerScales.map(v=>v.toFixed(2)).join(' / ')}${compatible?'':`\n${say('当前来源或左右手不匹配，未应用','Not applied: source or actual hand differs')}`}`;
  }else{el('calibration-status').textContent=c.calibrationStatusEmpty;el('calibration-summary').textContent=legacyCalibrationJson?c.calibrationLegacy:c.calibrationSummaryEmpty;}
}
function cancelCalibrationCapture(){capturePhase=undefined;lastCalibrationSample='';refreshCalibrationUI();}
function captureCalibrationFrame(raw:Vec3[],hand:Handedness,timestampMs:number,origin:CalibrationProvenance,sampleKey:string){
  if(!capturePhase||!calibrationSession||calibrationSessionSource!==origin||sampleKey===lastCalibrationSample||calibrationSeenSamples.has(sampleKey))return;
  lastCalibrationSample=sampleKey;
  calibrationSeenSamples.add(sampleKey);
  const result=calibrationSession.addFrame(capturePhase,raw,hand,timestampMs),status=result.status;
  el('calibration-progress').textContent=`${phaseName(capturePhase)} · ${status.acceptedFrames} / ${status.requiredFrames} · ${result.accepted?say('有效帧','Accepted'):calibrationErrorText({code:result.code,message:result.reason})}`;
  if(status.ready){capturePhase=undefined;el('calibration-progress').textContent+=say(' · 已完成，请选择下一阶段',' · Done; select the next stage');}
  refreshCalibrationUI();
}
function storeCalibration(profile:CalibrationProfile){
  calibrationProfile=profile;
  try{localStorage.setItem(calibrationStorageKey,exportCalibrationProfile(profile));}catch{el('calibration-progress').textContent=say('浏览器未允许保存；请导出标定文件。','Browser storage unavailable; export the profile.');}
  refreshCalibrationUI();input('calibration-enabled').checked=calibrationCompatible();clearHistory();
}
el('calibration-capture').addEventListener('click',()=>{
  if(capturePhase){cancelCalibrationCapture();return;}
  try{
    const hand=currentCalibrationHand();
    if(!calibrationSession||calibrationSessionSource!==source){calibrationSession=new HandCalibrationSession({name:input('calibration-name').value,provenance:source,handedness:hand});calibrationSessionSource=source;calibrationSeenSamples.clear();}
    capturePhase=el<HTMLSelectElement>('calibration-step').value as CalibrationPhase;lastCalibrationSample='';
    el('calibration-progress').textContent=`${phaseName(capturePhase)} · ${say('请保持姿势，等待新帧','Hold the pose and wait for new frames')}`;
    refreshCalibrationUI();
    if(source==='imported')setPlay(true);
  }catch(error){el('calibration-progress').textContent=calibrationErrorText(error);}
});
historyInput(el('calibration-step'),'change',say('切换标定阶段','Change calibration stage'),()=>{if(capturePhase){cancelCalibrationCapture();el('calibration-progress').textContent=say('阶段已切换，请点击开始采集。','Stage changed; click start to collect.');}});
historyClick(el('calibration-save'),say('保存标定','Save calibration'),()=>{try{if(!calibrationSession)return;storeCalibration(calibrationSession.finish());cancelCalibrationCapture();el('calibration-progress').textContent=say('标定已保存到本浏览器，可导出备份。','Saved in this browser. Export a backup if needed.');}catch(error){el('calibration-progress').textContent=calibrationErrorText(error);refreshCalibrationUI();}});
historyClick(el('calibration-reset'),say('清除标定','Clear calibration'),()=>{capturePhase=undefined;calibrationSession=undefined;calibrationSessionSource=undefined;calibrationProfile=undefined;legacyCalibrationJson=undefined;input('calibration-enabled').checked=false;try{localStorage.removeItem(calibrationStorageKey);localStorage.removeItem(legacyCalibrationStorageKey);}catch{}el('calibration-progress').textContent=c.calibrationIdle;refreshCalibrationUI();clearHistory();});
historyInput(input('calibration-enabled'),'change',say('应用标定','Apply calibration'),()=>clearHistory());
historyInput(input('calibration-name'),'input',say('修改标定名称','Edit calibration name'),()=>{});
historyInput(input('calibration-import'),'change',say('导入标定','Import calibration'),async()=>{const file=input('calibration-import').files?.[0];if(!file)return;try{if(file.size>100000)throw new Error('size');const profile=importCalibrationProfile(await file.text());cancelCalibrationCapture();calibrationSession=undefined;calibrationSessionSource=undefined;storeCalibration(profile);el('calibration-progress').textContent=say('标定已导入；来源和手别仍按原文件校验。','Imported; original source and hand restrictions remain.');}catch(error){el('calibration-progress').textContent=calibrationErrorText(error);}finally{input('calibration-import').value='';}});
el('calibration-export').addEventListener('click',()=>{if(calibrationProfile)downloadBlob('hand-calibration.json',new Blob([exportCalibrationProfile(calibrationProfile)],{type:'application/json'}));});
el('calibration-legacy-export').addEventListener('click',()=>{if(legacyCalibrationJson)downloadBlob('hand-calibration-legacy-v1.json',new Blob([legacyCalibrationJson],{type:'application/json'}));});
historyClick(el('calibration-synthetic'),say('运行合成标定验证','Run synthetic calibration test'),()=>{
  try{
    const demo=new HandCalibrationSession({name:say('合成流程验证（非真人）','Synthetic workflow test (not human)'),provenance:'synthetic',handedness:'Right'});
    for(let p=0;p<phases.length;p++)for(let i=0;i<24;i++)demo.addFrame(phases[p],sampleGesture(phases[p],1,0,42),'Right',p*1000+i*33);
    const profile=demo.finish();stopCamera();source='synthetic';gesture='pinch';time=1;input('time').value='1';input('noise').value='0';el('noise-value').textContent='0.0 mm';offsets=Array.from({length:5},()=>[0,0,0]);refreshOffsets();setPlay(false);calibrationSession=demo;calibrationSessionSource='synthetic';setSourceUI();storeCalibration(profile);syncTime();
    el('calibration-progress').textContent=say('三阶段合成流程验证通过；这不是你的真人标定。','Three-stage synthetic workflow passed; this is not your hand calibration.');
  }catch(error){el('calibration-progress').textContent=calibrationErrorText(error);}
});

// No native-window controls: this is a browser page, not a desktop wrapper.
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
function setTheme(theme: string) { document.documentElement.dataset.theme = theme; dirty = true; updateTheme(); drawHistory(); }
el('theme-toggle').addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.themePreference = theme;
  try { localStorage.setItem('cavwic-theme', theme); } catch {}
  setTheme(theme);
});
systemTheme.addEventListener('change', e => { if (document.documentElement.dataset.themePreference === 'system') setTheme(e.matches ? 'dark' : 'light'); });

const viewport = el('viewport');
let renderer: THREE.WebGLRenderer | undefined;
let controls: OrbitControls | undefined;
let environmentTarget: THREE.WebGLRenderTarget | undefined;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(36, 1, 0.001, 10);
const humanOffset = new THREE.Vector3(-0.115, 0, 0);
const robotOffset = new THREE.Vector3(0.115, 0, 0);
const viewLabels=document.querySelectorAll<HTMLElement>('.view-labels > span');
const viewRightAxis=new THREE.Vector3();let labelsSwapped:boolean|undefined;
function updateViewLabels(){
  const live=source==='camera';viewRightAxis.set(1,0,0).applyQuaternion(camera.quaternion);
  const swapped=live?false:Math.abs(viewRightAxis.x)<.05?(labelsSwapped??false):viewRightAxis.x<0;
  if(swapped===labelsSwapped)return;labelsSwapped=swapped;
  viewLabels[0].style.order=swapped?'1':'0';viewLabels[1].style.order=swapped?'0':'1';
  viewLabels[0].style.textAlign=swapped?'right':'left';viewLabels[1].style.textAlign=swapped?'left':'right';
}
const humanGroup = new THREE.Group(); humanGroup.position.copy(humanOffset); scene.add(humanGroup);
const robotGroup = new THREE.Group(); robotGroup.position.copy(robotOffset); scene.add(robotGroup);
const ghostGroup = new THREE.Group(); ghostGroup.position.copy(robotOffset); scene.add(ghostGroup);
const targetGroup = new THREE.Group(); targetGroup.position.copy(robotOffset); scene.add(targetGroup);
const robotVisual = createRobotVisual(); robotGroup.add(robotVisual.group);
const tipMaterials = fingerColors.map(color=>new THREE.MeshStandardMaterial({ color, roughness:0.45, emissive:color, emissiveIntensity:0.12 }));
const humanMaterial = new THREE.MeshBasicMaterial({ color: 0xbf573c });
const humanLineMaterial = new THREE.LineBasicMaterial({ color: 0xbf573c, transparent: true, opacity: 0.72 });
const ghostMaterial = new THREE.MeshBasicMaterial({ color: 0xaa862d, transparent: true, opacity: 0.26, depthWrite: false });
const errorMaterial = new THREE.LineBasicMaterial({ color: 0xbf573c, transparent: true, opacity: 0.5 });
const sphereGeometry = new THREE.SphereGeometry(0.0027, 24, 16);
const linkGeometry = new THREE.CylinderGeometry(0.0035, 0.0043, 1, 24);
const humanJoints: THREE.Mesh[] = []; const humanLinks: THREE.Mesh[] = [];
const ghostLinks: THREE.Mesh[] = []; const targetTips: THREE.Mesh[] = [];
const segments: [number, number][] = [];
for (let f = 0; f < 5; f++) { const start = 1 + f * 4; segments.push([0, start]); for (let j = 0; j < 3; j++) segments.push([start+j, start+j+1]); }
const humanLine = new THREE.LineSegments(new THREE.BufferGeometry(), humanLineMaterial); humanGroup.add(humanLine);
const errorLines = new THREE.LineSegments(new THREE.BufferGeometry(), errorMaterial); targetGroup.add(errorLines);
for (let i = 0; i < 21; i++) {
  const h = new THREE.Mesh(sphereGeometry, i===0?humanMaterial:tipMaterials[Math.floor((i-1)/4)]); humanGroup.add(h); humanJoints.push(h);
}
for (let f = 0; f < 5; f++) {
  const target = new THREE.Mesh(new THREE.SphereGeometry(0.0032, 24, 16), tipMaterials[f]); target.userData.finger = f; targetGroup.add(target); targetTips.push(target);
  const boneMaterial = new THREE.MeshStandardMaterial({color:fingerColors[f],transparent:true,opacity:0.32,roughness:0.65,depthWrite:false});
  for (let j = 0; j < 3; j++) {
    const link = new THREE.Mesh(linkGeometry, boneMaterial); humanGroup.add(link); humanLinks.push(link);
    const ghost = new THREE.Mesh(linkGeometry, ghostMaterial); ghostGroup.add(ghost); ghostLinks.push(ghost);
  }
}
const humanPalm = new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshStandardMaterial({color:0xe0a48e,side:THREE.DoubleSide,transparent:true,opacity:0.18,depthWrite:false,roughness:0.8})); humanGroup.add(humanPalm);
scene.add(new THREE.HemisphereLight(0xeaf2ff, 0x84909b, 2));
const light = new THREE.DirectionalLight(0xfff4df, 3.4); light.position.set(-0.25,0.4,0.5); scene.add(light);
const rim = new THREE.DirectionalLight(0xa8c9ff, 2); rim.position.set(0.3,0.25,-0.3); scene.add(rim);
const grid = new THREE.GridHelper(0.65, 26, 0xadbccb, 0xcdd7e1); grid.rotation.x = Math.PI / 2; grid.position.set(0,0.04,-0.03); scene.add(grid);
const axes = new THREE.AxesHelper(0.035); axes.position.set(-0.23,-0.03,0); scene.add(axes);
function fitView() { camera.zoom=Math.min(1,camera.aspect/(source==='camera'?0.72:1.35)); camera.updateProjectionMatrix(); }
function resetView() { camera.position.set(source==='camera'?0.035:0.055, 0.135, source==='camera'?0.47:0.53); fitView(); controls?.target.set(0,0.072,0.006); controls?.update(); }
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.12;
  const room = new RoomEnvironment(); const pmrem = new THREE.PMREMGenerator(renderer); environmentTarget=pmrem.fromScene(room,0.04); scene.environment=environmentTarget.texture; room.dispose(); pmrem.dispose();
  renderer.setClearColor(0xedf2f7);
  viewport.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.09; controls.minDistance = 0.22; controls.maxDistance = 1.0;
  controls.maxPolarAngle = Math.PI * 0.9;
  resetView();
} catch (error) { el('webgl-error').hidden = false; console.warn('Retargeting WebGL initialization:', error); }
const resizeObserver = new ResizeObserver(() => {
  if (!renderer) return;
  const bounds = viewport.getBoundingClientRect();
  renderer.setSize(bounds.width, bounds.height, false); camera.aspect = bounds.width / bounds.height; fitView(); drawHistory();
}); resizeObserver.observe(viewport);
function updateTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  renderer?.setClearColor(dark ? 0x102031 : 0xedf2f7);
  robotVisual.setTheme(dark); humanMaterial.color.set(dark ? 0xf59979 : 0xbf573c);
  humanLineMaterial.color.copy(humanMaterial.color);
  const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
  gridMaterials.forEach(m => { m.opacity = dark ? 0.25 : 0.45; m.transparent = true; });
} updateTheme();

function linePositions(points: Vec3[], pairs: [number,number][]) { return new Float32Array(pairs.flatMap(([a,b]) => [...points[a], ...points[b]])); }
function setLine(line: THREE.LineSegments, positions: Float32Array) { line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); line.geometry.computeBoundingSphere(); }
const up = new THREE.Vector3(0, 1, 0);
function updateLinks(links: THREE.Mesh[], points: Vec3[]) {
  let k = 0;
  for (let f = 0; f < 5; f++) for (let j = 0; j < 3; j++) {
    const a = new THREE.Vector3(...points[1+f*4+j]); const b = new THREE.Vector3(...points[2+f*4+j]);
    const diff = b.clone().sub(a); const link = links[k++];
    link.position.copy(a).add(b).multiplyScalar(.5); link.scale.set(1,diff.length(),1); link.quaternion.setFromUnitVectors(up,diff.normalize());
  }
}
function updateScene(points: Vec3[], q: number[], baselineQ: number[], humanPoints=points) {
  const fk = forwardKinematics(q); const baselineFK = forwardKinematics(baselineQ); const targets = getRobotTargets(points);
  humanJoints.forEach((mesh,i) => mesh.position.set(...humanPoints[i])); robotVisual.update(fk,q);
  const palmIndices=[1,5,9,13,17,1]; humanPalm.geometry.setAttribute('position',new THREE.Float32BufferAttribute(palmIndices.slice(0,-1).flatMap((index,i)=>[...humanPoints[0],...humanPoints[index],...humanPoints[palmIndices[i+1]]]),3)); humanPalm.geometry.computeVertexNormals(); humanPalm.geometry.computeBoundingSphere();
  setLine(humanLine,linePositions(humanPoints,segments)); updateLinks(humanLinks,humanPoints); updateLinks(ghostLinks,baselineFK);
  ghostGroup.visible = input('compare').checked && algorithm === 'ik';
  targetTips.forEach((mesh,f) => { mesh.position.set(...targets[tipIndices[f]]); mesh.scale.setScalar(f===selectedFinger?1.35:1); });
  setLine(errorLines, new Float32Array(tipIndices.flatMap(i => [...targets[i],...fk[i]])));
}

const jointRoot = el('joint-readout');
for (let f = 0; f < 5; f++) {
  const group = document.createElement('div'); group.className = 'joint-group';
  const title = document.createElement('h3'); title.textContent = c[fingerNames[f] as 'thumb']; group.append(title);
  const cells = document.createElement('div'); cells.className = 'joint-cells';
  for (let j = 0; j < 4; j++) { const cell = document.createElement('div'); cell.className='joint-cell'; cell.id=`q-${f*4+j}`; cell.textContent='0.0'; cell.title=`${f===0?['CMC opposition','CMC flexion','MCP flexion','IP flexion'][j]:j===0?'Spread':'Flexion '+j} · ${(jointLimits[f*4+j].min*180/Math.PI).toFixed(0)}–${(jointLimits[f*4+j].max*180/Math.PI).toFixed(0)}°`; cells.append(cell); }
  group.append(cells); jointRoot.append(group);
}
function updateReadout(q: number[]) {
  q.forEach((angle,i) => { const cell=el(`q-${i}`); const limits=jointLimits[i]; cell.textContent=(angle*180/Math.PI).toFixed(1); cell.classList.toggle('outside', angle<limits.min-1e-6 || angle>limits.max+1e-6); cell.style.setProperty('--fill',`${Math.max(0,Math.min(1,(angle-limits.min)/(limits.max-limits.min)))*100}%`); });
}
const chart = el<HTMLCanvasElement>('history-chart');
function drawHistory() {
  const context=chart.getContext('2d'); if (!context) return;
  const width=chart.clientWidth; const height=chart.clientHeight; if(!width || !height) return;
  chart.width=width*devicePixelRatio; chart.height=height*devicePixelRatio; context.scale(devicePixelRatio,devicePixelRatio);
  const css=getComputedStyle(document.documentElement); const line=css.getPropertyValue('--rt-line'); const muted=css.getPropertyValue('--rt-muted');
  const max=Math.max(5,...history.flatMap(p=>[p.ik,p.baseline]));
  const top=12, bottom=height-20, left=36, right=width-6;
  context.font='10px Consolas, monospace'; context.fillStyle=muted; context.strokeStyle=line; context.lineWidth=.7;
  for(let i=0;i<3;i++) { const y=top+(bottom-top)*i/2; context.beginPath(); context.moveTo(left,y); context.lineTo(right,y); context.stroke(); context.fillText((max*(1-i/2)).toFixed(1),0,y+3); }
  (['baseline','ik'] as const).forEach(key=>{context.strokeStyle=css.getPropertyValue(key==='ik'?'--rt-blue':'--rt-ghost');context.lineWidth=1.6;context.beginPath();history.forEach((p,i)=>{const x=left+(right-left)*i/Math.max(1,history.length-1),y=bottom-(bottom-top)*p[key]/max;i?context.lineTo(x,y):context.moveTo(x,y);});context.stroke();});
  context.fillStyle=muted; context.fillText('mm',0,height-3); context.fillText(`${history.length} ${c.frames}`,Math.max(left,right-70),height-3);
}
function applySmoothing(q: number[], previous: number[] | undefined, dt: number) {
  const tau=Number(input('smoothing').value); if(!previous || tau===0) return [...q];
  const alpha=1-Math.exp(-Math.max(.001,dt)/tau); return q.map((v,i)=>previous[i]+alpha*(v-previous[i]));
}
function resetInputState(){humanFilter.reset();targetFilter.reset();preparedPacket=undefined;preparedKey='';variation.reset();}
function inputPacket(now:number):InputPacket|undefined{
  let raw:Vec3[],hand:Handedness='Right',sampleKey:string,sampledAtMs=now,alreadyPalm=false,processed=false,storedHuman:Vec3[]|undefined,storedPinch:Vec3|undefined;
  if(source==='camera'){
    if(!cameraValid||!cameraPoints)return undefined;
    raw=cameraPoints;hand=cameraHand;sampleKey=`camera:${cameraSession}:${cameraFrameSerial}`;sampledAtMs=cameraSampledAtMs;
  }else if(source==='imported'&&imported){
    let index=0;for(let i=1;i<imported.frames.length;i++){if(imported.frames[i].time>time)break;index=i;}
    const frame=imported.frames[index];raw=frame.points;hand=imported.handedness||'Right';alreadyPalm=imported.coordinates==='palm';processed=alreadyPalm&&imported.inputProcessing==='processed';storedHuman=frame.normalizedHumanPoints;storedPinch=frame.pinchTargetVector;sampleKey=`imported:${importedRevision}:${index}`;
    if(!alreadyPalm&&imported.handedness)captureCalibrationFrame(raw,hand,now,'imported',sampleKey);
  }else{
    raw=sampleGesture(gesture,time,Number(input('noise').value),42);
    sampleKey=`synthetic:${gesture}:${time}:${input('noise').value}:${offsets.flat().join(',')}`;
  }
  const key=`${sampleKey}:${input('calibration-enabled').checked}:${calibrationProfile?.createdAt||''}:${input('input-filter').value}`;
  if(key===preparedKey&&preparedPacket)return preparedPacket;
  let humanPoints:Vec3[],points:Vec3[],calibrationApplied=false;
  if(alreadyPalm){humanPoints=clone(processed&&storedHuman?storedHuman:raw);points=clone(raw);}
  else{
    const normalized=normalizeLandmarks(raw,hand);if(!normalized.valid)return undefined;
    humanPoints=normalized.points;points=clone(humanPoints);
    if(input('calibration-enabled').checked&&calibrationProfile){
      try{
        const calibrated=applyCalibration(raw,hand,calibrationProfile,source);
        humanPoints=calibrated.normalizedPalmPoints;points=calibrated.retargetPoints;calibrationApplied=true;
      }catch(error){input('calibration-enabled').checked=false;el('calibration-status').textContent=calibrationErrorText(error);}
    }
  }
  if(source==='synthetic')tipIndices.forEach((index,f)=>{
    points[index]=points[index].map((v,axis)=>v+offsets[f][axis]) as Vec3;
    humanPoints[index]=humanPoints[index].map((v,axis)=>v+offsets[f][axis]) as Vec3;
  });
  const tau=Number(input('input-filter').value);
  if(!processed){humanPoints=humanFilter.update(humanPoints,sampledAtMs,tau);points=targetFilter.update(points,sampledAtMs,tau);}
  const pinchTargetVector=alreadyPalm&&storedPinch?[...storedPinch] as Vec3:humanPoints[4].map((v,axis)=>v-humanPoints[8][axis]) as Vec3;
  preparedPacket={points,humanPoints,pinchTargetVector,rawWorldPoints:alreadyPalm?undefined:clone(raw),handedness:hand,sampledAtMs,sampleKey,calibrationApplied};preparedKey=key;
  return preparedPacket;
}
function invalidateInput(){el('solver-status').textContent=c.statusInvalid;['tip-error','baseline-error','solve-time','input-pinch','robot-pinch','pinch-error','pinch-vector-error','pad-facing','jitter-value','pipeline-time','violations'].forEach(id=>el(id).textContent='—');needsSettling=false;resetInputState();}
function recompute(dt: number, now: number, settling = false, recordSample = true) {
  const packet=inputPacket(now);if(!packet){invalidateInput();return;}const {points,pinchTargetVector}=packet;
  const enforceLimits=input('limits').checked;
  const baselineQ=angleBaseline(points,enforceLimits?jointLimits:null);
  const pinchWeight=Number(input('pinch-weight').value);
  const result=solveIK(points,previousIK,{enforceLimits,pinchWeight,pinchTargetVector});
  if(result.status==='invalid-input') {invalidateInput();return;}
  previousIK=result.q;
  smoothIK=applySmoothing(result.q,smoothIK,dt); smoothBaseline=applySmoothing(baselineQ,smoothBaseline,dt);
  if(enforceLimits){smoothIK=smoothIK.map((v,i)=>Math.max(jointLimits[i].min,Math.min(jointLimits[i].max,v)));smoothBaseline=smoothBaseline.map((v,i)=>Math.max(jointLimits[i].min,Math.min(jointLimits[i].max,v)));}
  needsSettling=Number(input('smoothing').value)>0 && (smoothIK.some((v,i)=>Math.abs(v-result.q[i])>1e-4) || smoothBaseline.some((v,i)=>Math.abs(v-baselineQ[i])>1e-4));
  const ikMetrics=metrics(smoothIK,points,{pinchTargetVector}); const baselineMetrics=metrics(smoothBaseline,points,{pinchTargetVector});
  currentQ=algorithm==='ik'?smoothIK:smoothBaseline;
  const activeMetrics=algorithm==='ik'?ikMetrics:baselineMetrics;
  el('tip-error').textContent=activeMetrics.meanTipErrorMm.toFixed(2); el('baseline-error').textContent=baselineMetrics.meanTipErrorMm.toFixed(2);
  el('solve-time').textContent=result.elapsedMs.toFixed(2); el('violations').textContent=String(activeMetrics.limitViolations);
  el('solver-status').textContent=algorithm==='baseline'?c.baseline:result.status==='converged'?(needsSettling?say('原始 IK 已收敛 · 输出平滑中','Raw IK converged · output smoothing'):c.statusConverged):c.statusEffort;
  updateScene(points,currentQ,smoothBaseline,packet.humanPoints);
  const pipelineMs=source==='camera'?Math.max(0,performance.now()-packet.sampledAtMs):null;
  const jitter=variation.update(packet.humanPoints,forwardKinematics(currentQ),packet.sampledAtMs);
  el('input-pinch').textContent=activeMetrics.inputPinchDistanceMm.toFixed(2);el('robot-pinch').textContent=activeMetrics.robotPinchDistanceMm.toFixed(2);
  el('pinch-error').textContent=activeMetrics.pinchDistanceErrorMm.toFixed(2);el('pinch-vector-error').textContent=activeMetrics.pinchVectorErrorMm.toFixed(2);
  const thumbFace=activeMetrics.thumbPadFacingCos,indexFace=activeMetrics.indexPadFacingCos;
  el('pad-facing').textContent=Math.min(activeMetrics.inputPinchDistanceMm,activeMetrics.robotPinchDistanceMm)>30?'—':thumbFace===null||indexFace===null?say('方向未定义','Direction undefined'):`${thumbFace>.15&&indexFace>.15?say('相向','Facing'):say('尚未相向','Not facing')} · ${thumbFace.toFixed(2)} / ${indexFace.toFixed(2)}`;
  el('jitter-value').textContent=jitter.rmsMm===null?'—':jitter.rmsMm.toFixed(2);
  el('pipeline-time').textContent=pipelineMs===null?'—':pipelineMs.toFixed(1);
  el('tracking-loss').textContent=source==='camera'&&trackingQuality.lossPercent!==null?trackingQuality.lossPercent.toFixed(1):'—';
  if(recordSample){history.push({ik:ikMetrics.meanTipErrorMm,baseline:baselineMetrics.meanTipErrorMm}); if(history.length>160) history.shift();}
  // Bounded local ring buffer: the website never uploads camera frames or landmarks.
  if(recordSample){
    if(!records.length)recordingHistory.start({source,importedProvenance:source==='imported'?imported?.provenance:undefined,calibrationProfile:calibrationProfile?structuredClone(calibrationProfile):undefined,startedAt:new Date().toISOString()});
    records.push({time,source,recordKind:settling?'command-settling':'input-or-parameter-update',gesture:source==='synthetic'?gesture:undefined,inputPoints:clone(points),normalizedHumanPoints:clone(packet.humanPoints),rawWorldPoints:packet.rawWorldPoints,handedness:packet.handedness,pinchTargetVector:[...pinchTargetVector],calibrationApplied:packet.calibrationApplied,jointAnglesRad:[...currentQ],ikJointAnglesRad:[...smoothIK],baselineJointAnglesRad:[...smoothBaseline],rawIKJointAnglesRad:[...result.q],rawIKMetrics:result.metrics,metrics:activeMetrics,ikMetrics,baselineMetrics,pipelineMs,stationaryOutputRmsMm:jitter.rmsMm,processedTrackingFrames:source==='camera'?trackingQuality.processedFrames:undefined,invalidTrackingFrames:source==='camera'?trackingQuality.invalidFrames:undefined,solver:{status:result.status,appliesTo:'rawIKJointAnglesRad',iterations:result.iterations,fallbackAttempts:result.fallbackAttempts,elapsedMs:result.elapsedMs},settings:{enforceLimits,noiseMm:Number(input('noise').value),smoothingSeconds:Number(input('smoothing').value),inputFilterSeconds:Number(input('input-filter').value),pinchWeight,algorithm},timestampMs:now});
  }
  if(records.length>5000) records.shift();
  if(now-lastReadout>100 || !playing) {updateReadout(currentQ);drawHistory();el('record-status').textContent=`${records.length} / 5000 ${c.frames}`;lastReadout=now;}
}
function setPlay(value: boolean) { playing=value; el('play').querySelector('span')!.textContent=value?c.pause:c.play; }
function clearHistory() { recordingHistory.clear();refreshRecordingBackups();previousIK=undefined;smoothIK=undefined;smoothBaseline=undefined;needsSettling=false;resetInputState();el('record-status').textContent=`0 / 5000 ${c.frames}`;drawHistory();dirty=true; }
function refreshOffsets() { ['x','y','z'].forEach((axis,i)=>{input(`offset-${axis}`).value=String(Math.round(offsets[selectedFinger][i]*1000));el(`offset-${axis}-value`).textContent=`${Math.round(offsets[selectedFinger][i]*1000)} mm`;}); }
document.querySelectorAll<HTMLButtonElement>('[data-gesture]').forEach(button=>historyClick(button,say('切换合成动作','Change synthetic motion'),()=>{
  stopCamera(); source='synthetic'; gesture=button.dataset.gesture as Gesture; setSourceUI(); offsets=Array.from({length:5},()=>[0,0,0]);refreshOffsets();clearHistory();time=1.2;input('time').value=String(time);syncTime();
  document.querySelectorAll('[data-gesture]').forEach(b=>b.classList.toggle('active',b===button));
}));
document.querySelectorAll<HTMLButtonElement>('[data-algorithm]').forEach(button=>historyClick(button,say('切换重定向算法','Change retargeting method'),()=>{algorithm=button.dataset.algorithm!;document.querySelectorAll('[data-algorithm]').forEach(b=>b.classList.toggle('active',b===button));dirty=true;}));
el('play').addEventListener('click',()=>setPlay(!playing));
function syncTime() {el('time-value').textContent=`${time.toFixed(2)} s`;}
historyInput(input('time'),'input',say('调整动作进度','Scrub motion'),()=>{time=Number(input('time').value);setPlay(false);syncTime();dirty=true;});
historyInput(input('noise'),'input',say('调整输入噪声','Adjust input noise'),()=>{el('noise-value').textContent=`${Number(input('noise').value).toFixed(2)} mm`;dirty=true;});
historyInput(input('smoothing'),'input',say('调整输出平滑','Adjust output smoothing'),()=>{const tau=Number(input('smoothing').value);el('smoothing-value').textContent=tau?`${Math.round(tau*1000)} ms`:c.smoothingOff;dirty=true;});
historyInput(input('input-filter'),'input',say('调整输入滤波','Adjust input filtering'),()=>{const tau=Number(input('input-filter').value);el('input-filter-value').textContent=tau?`${Math.round(tau*1000)} ms`:c.smoothingOff;resetInputState();dirty=true;});
historyInput(input('pinch-weight'),'input',say('调整捏合约束','Adjust pinch constraint'),()=>{el('pinch-weight-value').textContent=Number(input('pinch-weight').value).toFixed(2);dirty=true;});
['compare','limits'].forEach(id=>historyInput(input(id),'change',say(id==='compare'?'切换基线对照':'切换关节限位',id==='compare'?'Toggle baseline comparison':'Toggle joint limits'),()=>{dirty=true;}));
historyInput(el('finger'),'change',say('选择指尖','Select fingertip'),()=>{selectedFinger=Number(el<HTMLSelectElement>('finger').value);refreshOffsets();dirty=true;});
['x','y','z'].forEach((axis,i)=>historyInput(input(`offset-${axis}`),'input',say('调整指尖偏移','Adjust fingertip offset'),()=>{
  if(source!=='synthetic')return;
  offsets[selectedFinger][i]=Number(input(`offset-${axis}`).value)/1000;refreshOffsets();el('input-status').textContent=c.statusManual;dirty=true;
}));
historyClick(el('reset'),say('重置实验','Reset experiment'),()=>{stopCamera();source='synthetic';gesture='pinch';setPlay(false);time=1.2;input('time').value=String(time);syncTime();offsets=Array.from({length:5},()=>[0,0,0]);refreshOffsets();input('noise').value='0';el('noise-value').textContent='0.0 mm';input('smoothing').value='0';el('smoothing-value').textContent=c.smoothingOff;input('limits').checked=true;input('compare').checked=true;algorithm='ik';document.querySelectorAll('[data-algorithm]').forEach(b=>b.classList.toggle('active',(b as HTMLElement).dataset.algorithm==='ik'));document.querySelectorAll('[data-gesture]').forEach(b=>b.classList.toggle('active',(b as HTMLElement).dataset.gesture==='pinch'));input('input-filter').value='0.03';el('input-filter-value').textContent='30 ms';input('pinch-weight').value='3';el('pinch-weight-value').textContent='3.00';setSourceUI();clearHistory();resetView();});
historyClick(el('view-reset'),say('重置视角','Reset view'),resetView);
historyInput(input('skeleton'),'change',say('切换骨架显示','Toggle skeleton view'),()=>robotVisual.setSkeleton(input('skeleton').checked));
historyClick(el('front-view'),say('正面视角','Front view'),()=>{camera.position.set(0,0.075,source==='camera'?0.47:0.53);controls?.target.set(0,0.075,0);controls?.update();});
historyClick(el('back-view'),say('背面视角','Back view'),()=>{camera.position.set(0,0.075,source==='camera'?-.47:-.53);controls?.target.set(0,0.075,0);controls?.update();});
historyClick(el('side-view'),say('侧面视角','Side view'),()=>{camera.position.set(0.33,0.14,source==='camera'?0.35:0.43);controls?.target.set(0,0.075,0);controls?.update();});
historyClick(el('camera-expand'),say('调整相机布局','Change camera layout'),()=>{const expanded=el('workspace').classList.toggle('camera-expanded');el('camera-expand').setAttribute('aria-pressed',String(expanded));el('camera-expand').textContent=expanded?c.cameraCompare:c.cameraExpand;});

// Tip editing uses a camera-facing plane; it is independent of robot FK.
const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();let dragFinger: number|undefined;let dragStart: THREE.Vector3|undefined;let dragOffset: Vec3|undefined;const dragPlane=new THREE.Plane();
function cast(event:PointerEvent) {const rect=viewport.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);}
viewport.addEventListener('pointerdown',event=>{
  if(source!=='synthetic' || !renderer) return;cast(event);const hit=raycaster.intersectObjects(targetTips)[0];if(!hit) return;
  actionHistory.begin();
  dragFinger=hit.object.userData.finger;selectedFinger=dragFinger!;el<HTMLSelectElement>('finger').value=String(selectedFinger);refreshOffsets();
  dragPlane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(new THREE.Vector3()),hit.point);dragStart=raycaster.ray.intersectPlane(dragPlane,new THREE.Vector3()) || undefined;dragOffset=[...offsets[selectedFinger]];controls!.enabled=false;viewport.setPointerCapture(event.pointerId);setPlay(false);event.stopImmediatePropagation();
},true);
viewport.addEventListener('pointermove',event=>{if(dragFinger===undefined || !dragStart || !dragOffset) return;cast(event);const point=raycaster.ray.intersectPlane(dragPlane,new THREE.Vector3());if(!point)return;const delta=point.sub(dragStart);offsets[dragFinger]=[delta.x+dragOffset[0],delta.y+dragOffset[1],delta.z+dragOffset[2]].map(v=>Math.max(-.08,Math.min(.08,v))) as Vec3;refreshOffsets();el('input-status').textContent=c.statusManual;dirty=true;});
function endDrag(){const edited=dragFinger!==undefined;dragFinger=undefined;if(controls)controls.enabled=true;if(edited)actionHistory.commit(say('拖动指尖目标','Drag fingertip target'));}
viewport.addEventListener('pointerup',endDrag);viewport.addEventListener('pointercancel',endDrag);

function downloadJson(filename:string,value:unknown) {downloadBlob(filename,new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));}
function downloadBlob(filename:string,blob:Blob) {const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=filename;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function exportRecording(segment:HandRecording){
  const rows=segment.records,start=Number(rows[0]?.timestampMs||0),metadata=segment.metadata;
  return {
    version:1,coordinates:'palm',inputProcessing:'processed',kind:'retargeting-experiment',modelKinematicsId,
    units:{positions:'m',jointAngles:'rad',residuals:'mm'},createdAt:new Date().toISOString(),model:robotModel,
    calibrationProfile:rows.some(r=>r.calibrationApplied)?metadata?.calibrationProfile:undefined,
    coordinateConvention:{x:'little-to-index side',y:'wrist-to-middle MCP',z:'canonical palmar flexion; actual hand selected explicitly'},
    provenance:metadata?.source==='camera'?'MediaPipe world-landmark estimates':metadata?.source==='imported'?metadata.importedProvenance || 'user-supplied, unverified':'procedurally generated synthetic human hand',seed:metadata?.source==='synthetic'?42:undefined,
    frames:rows.map(record=>({...record,time:(Number(record.timestampMs)-start)/1000,sampleTime:record.time,points:record.inputPoints})),
  };
}
el('export').addEventListener('click',()=>{
  if(!records.length){el('record-status').textContent=c.downloadEmpty;return;}
  downloadJson('hand-retargeting-session.json',exportRecording(recordingHistory.snapshot()));
});
const recordingBackupsButton=document.createElement('button');recordingBackupsButton.id='record-backups';recordingBackupsButton.className='button';recordingBackupsButton.hidden=true;
recordingBackupsButton.title=say('导出切换或撤销前保留的分段记录，每段保留独立来源。记录仅保留在本页，刷新前请下载。','Download retained runs from before switching or undoing. Each run keeps its source. Download before refreshing this page.');
el('export').after(recordingBackupsButton);
function refreshRecordingBackups(){const count=recordingHistory.backups().length;recordingBackupsButton.hidden=count===0;recordingBackupsButton.textContent=say(`导出保留记录（${count} 段）`,`Export retained runs (${count})`);}
recordingBackupsButton.addEventListener('click',()=>{
  const backups=recordingHistory.backups();if(!backups.length)return;
  downloadJson('hand-retargeting-retained-runs.json',{version:1,kind:'retargeting-record-backup',createdAt:new Date().toISOString(),
    note:'Each entry contains a standalone retargeting-experiment session. To use the single-session importer, save the selected session object as a separate JSON file.',
    runs:backups.map(segment=>({id:segment.id,source:segment.metadata?.source,startedAt:segment.metadata?.startedAt,session:exportRecording(segment)})),
  });
});
el('model-download').addEventListener('click',()=>downloadJson('hand-retargeting-model.json',{modelKinematicsId,robotModel,jointLimits,units:'m/rad',hardwareValidated:false}));
historyInput(input('import-file'),'change',say('导入动作序列','Import motion sequence'),async()=>{
  const file=input('import-file').files?.[0];if(!file)return;
  try {
    if(file.size>128*1024*1024)throw new Error('size');const value=JSON.parse(await file.text()) as ImportData;
    if(value.version!==1 || !['palm','world'].includes(value.coordinates) || !Array.isArray(value.frames) || value.frames.length<1 || value.frames.length>5000)throw new Error('schema');
    if(value.kind==='retargeting-experiment'&&value.modelKinematicsId!==modelKinematicsId)throw new Error('kinematics');
    if(value.handedness!==undefined&&!['Left','Right'].includes(value.handedness))throw new Error('hand');
    if(value.inputProcessing!==undefined&&value.inputProcessing!=='processed')throw new Error('processing');
    const validPoints=(points:Vec3[])=>Array.isArray(points)&&points.length===21&&points.every(p=>Array.isArray(p)&&p.length===3&&p.every(v=>typeof v==='number'&&Number.isFinite(v)&&Math.abs(v)<=10));
    let previousTime=-Infinity;for(const frame of value.frames){if(!Number.isFinite(frame.time) || frame.time<0 || frame.time<previousTime || !validPoints(frame.points))throw new Error('frame');if(frame.normalizedHumanPoints!==undefined&&!validPoints(frame.normalizedHumanPoints))throw new Error('human');if(frame.pinchTargetVector!==undefined&&(!Array.isArray(frame.pinchTargetVector)||frame.pinchTargetVector.length!==3||frame.pinchTargetVector.some(v=>!Number.isFinite(v)||Math.abs(v)>10)))throw new Error('pinch');previousTime=frame.time;}
    stopCamera();imported=value;importedRevision++;calibrationSession=undefined;calibrationSessionSource=undefined;source='imported';time=value.frames[0].time;input('time').max=String(Math.max(time+.01,value.frames.at(-1)!.time));input('time').value=String(time);setPlay(false);clearHistory();setSourceUI();syncTime();el('input-status').textContent=`${c.importOk} · ${value.frames.length} ${c.frames}`;
  }catch(error){el('input-status').textContent=error instanceof Error&&error.message==='kinematics'?say('此记录使用旧运动链，不能直接重放到新版；原文件保留。请重新采集或导入原始 world 序列。','This session uses a legacy chain and cannot replay directly. The file is unchanged; capture again or import the original world sequence.'):c.importError;}finally{input('import-file').value='';}
});
el('benchmark').addEventListener('click',()=>{
  if(benchmarkWorker)return;report=undefined;el('report-download').hidden=true;el<HTMLButtonElement>('benchmark').disabled=true;el('benchmark-result').textContent=c.working;
  benchmarkWorker=new Worker(new URL('./benchmark.worker.ts',import.meta.url),{type:'module'});
  benchmarkWorker.onmessage=({data})=>{
    if(data.type==='result'){report=data.report;renderReport(data.report);el('report-download').hidden=false;}else el('benchmark-result').textContent=c.runningError;
    benchmarkWorker?.terminate();benchmarkWorker=undefined;el<HTMLButtonElement>('benchmark').disabled=false;
  };
  benchmarkWorker.onerror=()=>{el('benchmark-result').textContent=c.runningError;benchmarkWorker?.terminate();benchmarkWorker=undefined;el<HTMLButtonElement>('benchmark').disabled=false;};benchmarkWorker.postMessage({type:'run',pinchWeight:Number(input('pinch-weight').value)});
});
function renderReport(value: any) {
  const root=el('benchmark-result');root.replaceChildren();const summary=document.createElement('p');summary.textContent=c.reportDone;root.append(summary);
  const rows=[...(value.rows || []),...(value.stressTest?.rows || [])];const table=document.createElement('table');const head=document.createElement('tr');
  [locale==='zh'?'动作':'Motion',c.baseline,c.ik].forEach(label=>{const th=document.createElement('th');th.textContent=label;head.append(th);});table.append(head);
  for(const row of rows){const tr=document.createElement('tr');const gestureKey=row.gesture as keyof typeof c;const a=row.baselineMeanMm ?? row.baseline?.meanTipErrorMm;const b=row.ikMeanMm ?? row.ik?.meanTipErrorMm;[c[gestureKey] || String(row.gesture),Number(a).toFixed(2),Number(b).toFixed(2)].forEach(label=>{const td=document.createElement('td');td.textContent=label;tr.append(td);});table.append(tr);}root.append(table);
  const note=document.createElement('p');note.textContent=say('单位 mm；固定合成数据，未应用个人标定、输入滤波或输出平滑。捏合权重：','Units: mm; fixed synthetic data without personal calibration, input filtering or output smoothing. Pinch weight: ')+String(value.conditions?.pinchWeight??1.5);root.append(note);
}
el('report-download').addEventListener('click',()=>downloadJson('hand-retargeting-benchmark.json',report));

let stream: MediaStream | undefined;let visionWorker: Worker | undefined;let cameraSession=0;let cameraBusy=false;let cameraStarting=false;let cameraFrameHandle:number|undefined;let cameraFrameTimeout:number|undefined;let lastVisionResultAt=0;
const video=el<HTMLVideoElement>('camera-preview');
const overlay=el<HTMLCanvasElement>('camera-overlay');
let cameraLayout=false;
function setSourceUI(){
  const live=source==='camera';
  if(calibrationSessionSource&&calibrationSessionSource!==source){calibrationSession=undefined;calibrationSessionSource=undefined;capturePhase=undefined;calibrationSeenSamples.clear();el('calibration-progress').textContent=c.calibrationIdle;}
  document.querySelectorAll<HTMLButtonElement>('button[data-source]').forEach(b=>b.classList.toggle('active',b.dataset.source===source));
  el('workspace').dataset.source=live?'camera':source;
  el('synthetic-controls').hidden=source!=='synthetic';el<HTMLFieldSetElement>('synthetic-controls').disabled=source!=='synthetic';el('camera-controls').hidden=!live;el('camera-panel').hidden=!live;el('camera-expand').hidden=!live;
  el('source-label').textContent=live?c.camera:source==='imported'?c.imported:c.synthetic;
  if(!live)el('tracking-loss').textContent='—';
  el('input-status').textContent=live?c.cameraWaiting:source==='imported'?c.statusImported:c.statusSynthetic;
  el('play').toggleAttribute('disabled',live);input('noise').disabled=source!=='synthetic';
  document.querySelectorAll('[data-gesture]').forEach(b=>b.classList.toggle('active',source==='synthetic' && (b as HTMLElement).dataset.gesture===gesture));
  humanGroup.visible=!live;[robotGroup,ghostGroup,targetGroup].forEach(group=>group.position.copy(live?new THREE.Vector3():robotOffset));
  axes.position.x=live?-.11:-.23;
  if(cameraLayout!==live){cameraLayout=live;resetView();}
  if(!live){el('workspace').classList.remove('camera-expanded');el('camera-expand').setAttribute('aria-pressed','false');el('camera-expand').textContent=c.cameraExpand;}
  if(source==='synthetic')input('time').max='6';if(live)holdCameraPose(c.cameraWaiting);refreshCalibrationUI();dirty=true;
}
document.querySelectorAll<HTMLButtonElement>('button[data-source]').forEach(button=>historyClick(button,say('切换输入来源','Change input source'),()=>{stopCamera();source=button.dataset.source as 'synthetic'|'camera';setPlay(false);clearHistory();setSourceUI();}));
function clearOverlay(){overlay.getContext('2d')?.clearRect(0,0,overlay.width,overlay.height);}
function cameraStage(message:string){el('camera-stage-status').textContent=message;}
function stopCamera(){cameraSession++;cameraValid=false;cameraPoints=undefined;cameraStarting=false;cameraBusy=false;capturePhase=undefined;lastCalibrationSample='';resetInputState();if(cameraFrameHandle!==undefined)video.cancelVideoFrameCallback?.(cameraFrameHandle);if(cameraFrameTimeout!==undefined)clearTimeout(cameraFrameTimeout);stream?.getTracks().forEach(track=>track.stop());stream=undefined;video.srcObject=null;visionWorker?.terminate();visionWorker=undefined;el('camera-start').querySelector('span')!.textContent=c.cameraStart;el('camera-placeholder').hidden=false;el('camera-resolution').textContent=c.cameraLocal;clearOverlay();cameraStage(c.cameraWaiting);refreshCalibrationUI();}
function holdCameraPose(message:string){cameraValid=false;resetInputState();clearOverlay();el('input-status').textContent=message;cameraStage(message);el('solver-status').textContent=c.statusInvalid;['tip-error','baseline-error','solve-time','input-pinch','robot-pinch','pinch-error','pinch-vector-error','pad-facing','jitter-value','pipeline-time'].forEach(id=>el(id).textContent='—');el('tracking-loss').textContent=trackingQuality.lossPercent===null?'—':trackingQuality.lossPercent.toFixed(1);refreshCalibrationUI();}
historyInput(el('camera-hand'),'change',say('切换实际手别','Change actual hand'),()=>{
  cameraHand=el<HTMLSelectElement>('camera-hand').value as Handedness;
  calibrationSession=undefined;calibrationSessionSource=undefined;capturePhase=undefined;clearHistory();holdCameraPose(say('左右手选择已切换，正在等待新的相机帧','Actual hand changed; waiting for a new frame'));refreshCalibrationUI();
});
function drawCameraLandmarks(points:{x:number;y:number}[]|undefined){
  clearOverlay();if(!points || points.length!==21 || points.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)))return;
  const width=video.videoWidth,height=video.videoHeight;if(!width||!height)return;
  if(overlay.width!==width||overlay.height!==height){overlay.width=width;overlay.height=height;}
  const context=overlay.getContext('2d');if(!context)return;context.lineWidth=Math.max(2,width/320);context.lineCap='round';
  for(let finger=0;finger<5;finger++){
    context.strokeStyle=`#${fingerColors[finger].toString(16).padStart(6,'0')}`;context.beginPath();
    const chain=[0,1+finger*4,2+finger*4,3+finger*4,4+finger*4];chain.forEach((i,j)=>{const p=points[i];j?context.lineTo(p.x*width,p.y*height):context.moveTo(p.x*width,p.y*height);});context.stroke();
    chain.slice(1).forEach(i=>{context.beginPath();context.arc(points[i].x*width,points[i].y*height,Math.max(3,width/210),0,Math.PI*2);context.fillStyle=context.strokeStyle;context.fill();context.strokeStyle='#f5f8fc';context.lineWidth=Math.max(1,width/640);context.stroke();context.strokeStyle=`#${fingerColors[finger].toString(16).padStart(6,'0')}`;context.lineWidth=Math.max(2,width/320);});
  }
}
el('camera-start').addEventListener('click',()=>{if(stream || cameraStarting){stopCamera();holdCameraPose(c.cameraWaiting);return;}void startCamera();});
async function startCamera(){
  source='camera';trackingQuality.reset();cameraStartedAtMs=performance.now();setSourceUI();cameraStarting=true;const session=++cameraSession;setPlay(false);clearHistory();el('input-status').textContent=c.cameraLoading;el('camera-start').querySelector('span')!.textContent=c.cameraStop;
  try {
    if(!navigator.mediaDevices?.getUserMedia)throw new Error('getUserMedia unavailable');
    el('input-status').textContent=c.cameraPermission;cameraStage(c.cameraPermission);
    const acquired=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:1280},height:{ideal:960},frameRate:{ideal:30,max:30}},audio:false});
    if(session!==cameraSession){acquired.getTracks().forEach(track=>track.stop());return;}stream=acquired;stream.getVideoTracks().forEach(track=>track.addEventListener('ended',()=>{if(session!==cameraSession)return;stopCamera();holdCameraPose(c.cameraLost);}));video.srcObject=stream;await video.play();if(session!==cameraSession)return;
    el('input-status').textContent=c.cameraLoading;cameraStage(c.cameraLoading);el('camera-placeholder').hidden=true;el('camera-resolution').textContent=`${video.videoWidth} × ${video.videoHeight}`;
    visionWorker=new Worker(new URL('./vision.worker.ts',import.meta.url),{type:'module'});
    const assetRoot=new URL(import.meta.env.BASE_URL,location.origin);
    visionWorker.onmessage=({data})=>{
      if(session!==cameraSession)return;
      if(data.type==='ready'){cameraStarting=false;el('input-status').textContent=c.cameraLost;scheduleCameraFrame(session);return;}
      if(data.type==='error'){stopCamera();holdCameraPose(c.cameraModelError);return;}
      if(data.type!=='result' || data.session!==cameraSession)return;cameraBusy=false;lastVisionResultAt=performance.now();
      const landmarks=data.worldLandmarks?.[0];if(!landmarks?.length){trackingQuality.add(false,data.sampledAtMs);holdCameraPose(c.cameraLost);return;}
      const raw:Vec3[]=landmarks.map((p:{x:number;y:number;z:number})=>[p.x,p.y,p.z]);
      // CSS mirrors the preview only. Explicit actual hand determines palm normal;
      // detector category labels never silently flip a calibrated motion chain.
      const normalized=normalizeLandmarks(raw,cameraHand);
      if(!normalized.valid){trackingQuality.add(false,data.sampledAtMs);holdCameraPose(c.cameraInvalid);return;}
      trackingQuality.add(true,data.sampledAtMs);
      drawCameraLandmarks(data.landmarks?.[0]);
      if(!cameraValid){previousIK=undefined;smoothIK=undefined;smoothBaseline=undefined;resetInputState();}cameraValid=true;cameraPoints=raw;cameraSampledAtMs=Number.isFinite(data.sampledAtMs)?data.sampledAtMs:lastVisionResultAt;cameraFrameSerial++;time=(cameraSampledAtMs-cameraStartedAtMs)/1000;
      captureCalibrationFrame(raw,cameraHand,cameraSampledAtMs,'camera',`camera:${session}:${cameraFrameSerial}`);refreshCalibrationUI();
      const tracking=`${c.cameraTracking} · ${data.inferenceMs.toFixed(0)} ms / inference`;el('input-status').textContent=tracking;cameraStage(tracking);dirty=true;
    };
    visionWorker.onerror=()=>{if(session!==cameraSession)return;stopCamera();holdCameraPose(c.cameraModelError);};
    visionWorker.postMessage({type:'init',wasmRoot:new URL('vendor/mediapipe/1.1.0/wasm',assetRoot).href,modelUrl:new URL('models/hand_landmarker-v1.task',assetRoot).href});
  }catch(error){if(session!==cameraSession)return;stopCamera();holdCameraPose(c.cameraUnavailable);console.warn('Camera:',error);}
}
function scheduleCameraFrame(session:number){
  if(session!==cameraSession || !stream)return;
  const submit=async()=>{scheduleCameraFrame(session);if(cameraBusy || video.readyState<2 || !visionWorker)return;cameraBusy=true;
    try{const sampledAtMs=performance.now();const bitmap=await createImageBitmap(video);if(session!==cameraSession || !visionWorker){bitmap.close();return;}visionWorker.postMessage({type:'frame',session,bitmap,timestamp:sampledAtMs,sampledAtMs},[bitmap]);}
    catch{if(session!==cameraSession)return;cameraBusy=false;holdCameraPose(c.cameraLost);}
  };
  if(video.requestVideoFrameCallback)cameraFrameHandle=video.requestVideoFrameCallback(()=>void submit());else cameraFrameTimeout=window.setTimeout(()=>void submit(),50);
}

// A real model-runtime smoke test on a synthetic blank image, no camera access.
let smokeWorker:Worker|undefined;
let smokeTimer:number|undefined;
el('vision-check').addEventListener('click',()=>{
  if(smokeWorker)return;const button=el<HTMLButtonElement>('vision-check');button.disabled=true;el('vision-check-status').textContent=c.visionWait;
  smokeWorker=new Worker(new URL('./vision.worker.ts',import.meta.url),{type:'module'});
  const finish=(ok:boolean)=>{el('vision-check-status').textContent=ok?c.visionReady:c.cameraModelError;smokeWorker?.terminate();smokeWorker=undefined;clearTimeout(smokeTimer);button.disabled=false;};
  smokeTimer=window.setTimeout(()=>finish(false),45000);
  smokeWorker.onerror=event=>{console.warn('Vision worker self-check:',event.message);finish(false);};
  smokeWorker.onmessage=async({data})=>{
    if(data.type==='error'){console.warn('Vision model self-check:',data.message);finish(false);return;}
    if(data.type==='result'){finish(true);return;}
    if(data.type==='ready'){
      try{const canvas=new OffscreenCanvas(128,128);const context=canvas.getContext('2d');if(!context)throw new Error('2d context');context.fillStyle='#202020';context.fillRect(0,0,128,128);const bitmap=canvas.transferToImageBitmap();if(!smokeWorker){bitmap.close();return;}smokeWorker.postMessage({type:'frame',session:-1,timestamp:performance.now(),bitmap},[bitmap]);}
      catch{finish(false);}
    }
  };
  const root=new URL(import.meta.env.BASE_URL,location.origin);smokeWorker.postMessage({type:'init',wasmRoot:new URL('vendor/mediapipe/1.1.0/wasm',root).href,modelUrl:new URL('models/hand_landmarker-v1.task',root).href});
});

const settingIds=['noise','smoothing','input-filter','pinch-weight'] as const;
const checkIds=['compare','limits','skeleton','calibration-enabled'] as const;
const metricIds=['tip-error','baseline-error','solve-time','violations','solver-status','input-pinch','robot-pinch','pinch-error','pinch-vector-error','pad-facing','jitter-value','pipeline-time','tracking-loss'] as const;
function savedCalibrationState(){
  try{return {available:true,current:localStorage.getItem(calibrationStorageKey),legacy:localStorage.getItem(legacyCalibrationStorageKey)};}
  catch{return {available:false,current:null,legacy:null};}
}
function captureActionState(){
  return {
    values:{
      source,gesture,algorithm,time,selectedFinger,cameraHand,recordRevision:recordingHistory.id,
      settings:Object.fromEntries(settingIds.map(id=>[id,input(id).value])),
      checks:Object.fromEntries(checkIds.map(id=>[id,input(id).checked])),offsets:clone(offsets),
      calibrationName:input('calibration-name').value,calibrationStep:el<HTMLSelectElement>('calibration-step').value,
      profile:calibrationProfile?structuredClone(calibrationProfile):undefined,legacyCalibrationJson,
      // TypeScript private fields are ordinary own data here. Keep their values
      // isolated, then restore the existing prototype; do not rerun calibration.
      session:calibrationSession?structuredClone(calibrationSession) as object:undefined,
      calibrationSessionSource,calibrationSeenSamples:[...calibrationSeenSamples],
      calibrationProgress:el('calibration-progress').textContent,wasCapturing:!!capturePhase,
      storage:savedCalibrationState(),
      view:{position:camera.position.toArray(),quaternion:camera.quaternion.toArray(),target:controls?.target.toArray(),zoom:camera.zoom},
      expanded:el('workspace').classList.contains('camera-expanded'),
    },
    // Imported frames and appended record objects are not mutated after creation.
    // Shallow arrays preserve data across reset/clear without duplicating every
    // landmark in the 5,000-frame buffer for each of the 50 history entries.
    imported,recording:recordingHistory.snapshot(),
    pose:{packet:preparedPacket?structuredClone(preparedPacket):undefined,q:[...currentQ],previousIK:previousIK?[...previousIK]:undefined,
      smoothIK:smoothIK?[...smoothIK]:undefined,smoothBaseline:smoothBaseline?[...smoothBaseline]:undefined,dirty,
      readouts:Object.fromEntries(metricIds.map(id=>[id,el(id).textContent]))},
  };
}
type ActionState=ReturnType<typeof captureActionState>;
function restoreActionState(state:ActionState){
  const value=state.values;
  // Storage is part of the saved calibration, not an unrelated UI side effect.
  // If it becomes inaccessible, fail before replacing the current profile.
  if(value.storage.available){
    for(const [key,stored] of [[calibrationStorageKey,value.storage.current],[legacyCalibrationStorageKey,value.storage.legacy]] as const){
      if(localStorage.getItem(key)===stored)continue;
      if(stored===null)localStorage.removeItem(key);else localStorage.setItem(key,stored);
    }
  }
  const cameraInvolved=source==='camera'||value.source==='camera'||!!stream||cameraStarting;
  setPlay(false);capturePhase=undefined;lastCalibrationSample='';
  if(cameraInvolved)stopCamera();
  source=value.source;gesture=value.gesture;algorithm=value.algorithm;time=value.time;selectedFinger=value.selectedFinger;cameraHand=value.cameraHand;
  imported=state.imported;importedRevision++;offsets=clone(value.offsets);
  recordingHistory.restore(state.recording);refreshRecordingBackups();
  // Source layout resets the view and may discard incompatible current capture
  // sessions. Restore the isolated historical session only after that step.
  setSourceUI();
  calibrationProfile=value.profile?structuredClone(value.profile):undefined;legacyCalibrationJson=value.legacyCalibrationJson;
  calibrationSession=value.session?Object.assign(Object.create(HandCalibrationSession.prototype),structuredClone(value.session)) as HandCalibrationSession:undefined;
  calibrationSessionSource=value.calibrationSessionSource;calibrationSeenSamples.clear();value.calibrationSeenSamples.forEach(key=>calibrationSeenSamples.add(key));
  input('calibration-name').value=value.calibrationName;el<HTMLSelectElement>('calibration-step').value=value.calibrationStep;
  settingIds.forEach(id=>{input(id).value=value.settings[id];});checkIds.forEach(id=>{input(id).checked=value.checks[id];});
  input('time').max=source==='imported'&&imported?String(Math.max(imported.frames[0].time+.01,imported.frames.at(-1)!.time)):'6';
  input('time').value=String(time);el<HTMLSelectElement>('finger').value=String(selectedFinger);el<HTMLSelectElement>('camera-hand').value=cameraHand;
  el('noise-value').textContent=`${Number(input('noise').value).toFixed(2)} mm`;
  for(const id of ['smoothing','input-filter'] as const){const tau=Number(input(id).value);el(`${id}-value`).textContent=tau?`${Math.round(tau*1000)} ms`:c.smoothingOff;}
  el('pinch-weight-value').textContent=Number(input('pinch-weight').value).toFixed(2);refreshOffsets();syncTime();
  document.querySelectorAll<HTMLElement>('[data-algorithm]').forEach(node=>node.classList.toggle('active',node.dataset.algorithm===algorithm));
  document.querySelectorAll<HTMLElement>('[data-gesture]').forEach(node=>node.classList.toggle('active',source==='synthetic'&&node.dataset.gesture===gesture));
  robotVisual.setSkeleton(input('skeleton').checked);refreshCalibrationUI();
  el('calibration-progress').textContent=value.wasCapturing?say('已恢复采集的标定帧；采集保持暂停，请手动继续。','Collected calibration frames restored. Capture is paused; resume it manually.'):value.calibrationProgress;
  const expanded=source==='camera'&&value.expanded;el('workspace').classList.toggle('camera-expanded',expanded);
  el('camera-expand').setAttribute('aria-pressed',String(expanded));el('camera-expand').textContent=expanded?c.cameraCompare:c.cameraExpand;
  // Consume the previous gesture's damping delta before setting the saved view.
  const viewDamping=controls?.enableDamping;
  if(controls){controls.disconnect();if(renderer)controls.connect(renderer.domElement);controls.enableDamping=false;controls.update();}
  camera.position.fromArray(value.view.position);camera.quaternion.fromArray(value.view.quaternion);camera.zoom=value.view.zoom;camera.updateProjectionMatrix();
  if(value.view.target)controls?.target.fromArray(value.view.target);
  if(controls){controls.update();controls.enableDamping=viewDamping??true;controls.enabled=true;}
  dragFinger=undefined;dragStart=undefined;dragOffset=undefined;resetInputState();needsSettling=false;
  previousIK=state.pose.previousIK?[...state.pose.previousIK]:undefined;smoothIK=state.pose.smoothIK?[...state.pose.smoothIK]:undefined;smoothBaseline=state.pose.smoothBaseline?[...state.pose.smoothBaseline]:undefined;currentQ=[...state.pose.q];
  if(state.pose.packet){const packet=state.pose.packet;updateScene(packet.points,currentQ,smoothBaseline||currentQ,packet.humanPoints);updateReadout(currentQ);metricIds.forEach(id=>{el(id).textContent=state.pose.readouts[id];});}
  if(source==='camera'){
    holdCameraPose(say('已恢复设置；相机已暂停，请手动重新开启。','Settings restored. The camera is paused; start it manually.'));
  }else if(state.pose.dirty||!state.pose.packet){
    recompute(.033,performance.now(),false,false);needsSettling=false;
  }
  dirty=false;drawHistory();el('record-status').textContent=`${records.length} / 5000 ${c.frames}`;updateViewLabels();
  if(!value.storage.available)el('calibration-progress').textContent=say('已恢复本页标定；浏览器存储不可用，请导出备份。','Calibration restored for this page. Browser storage is unavailable; export a backup.');
}

let previousFrame=performance.now();let frameHandle=0;
function frame(now:number){if(disposed)return;const dt=Math.min(.1,(now-previousFrame)/1000);previousFrame=now;
  if(source==='camera' && cameraValid && now-lastVisionResultAt>700){holdCameraPose(c.cameraLost);}
  if(playing && source!=='camera'){time+=dt;const max=Number(input('time').max);if(time>max)time=source==='imported'?imported!.frames[0].time:0;input('time').value=String(time);syncTime();dirty=true;}
  const settling=needsSettling && source!=='camera';
  if((dirty || settling) && now-lastSolve>33){recompute(Math.min(.25,(now-lastSolve)/1000),now,!dirty && settling);dirty=false;lastSolve=now;}
  controls?.update();updateViewLabels();if(renderer)renderer.render(scene,camera);frameHandle=requestAnimationFrame(frame);
}
try{legacyCalibrationJson=localStorage.getItem(legacyCalibrationStorageKey)||undefined;const stored=localStorage.getItem(calibrationStorageKey);if(stored)calibrationProfile=importCalibrationProfile(stored);}catch{el('calibration-progress').textContent=say('已保存的标定未通过校验，请重新标定。','Stored profile failed validation; recalibrate.');}
refreshCalibrationUI();setSourceUI();syncTime();
const actionHistory=createHistoryScope<ActionState>({capture:captureActionState,restore:restoreActionState,
  // Solver/camera frames do not become user actions; compare only explicit UI
  // state and imported-sequence identity, never the changing sample buffers.
  equals:(a,b)=>a.imported===b.imported&&JSON.stringify(a.values)===JSON.stringify(b.values),
  beforeRestore:()=>{setPlay(false);capturePhase=undefined;lastCalibrationSample='';refreshCalibrationUI();},
});
actionHistory.reset();
historyBindings.forEach(bind=>bind());
controls?.addEventListener('start',()=>actionHistory.begin());
controls?.addEventListener('end',()=>{
  if(controls){const damping=controls.enableDamping;controls.enableDamping=false;controls.update();controls.enableDamping=damping;}
  actionHistory.commit(say('调整三维视角','Adjust 3D view'));
});
frameHandle=requestAnimationFrame(frame);
window.addEventListener('pagehide',event=>{
  disposed=true;cancelAnimationFrame(frameHandle);stopCamera();smokeWorker?.terminate();smokeWorker=undefined;clearTimeout(smokeTimer);el<HTMLButtonElement>('vision-check').disabled=false;
  if(event.persisted)return;
  benchmarkWorker?.terminate();resizeObserver.disconnect();controls?.dispose();robotVisual.dispose();robotGroup.remove(robotVisual.group);
  const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>();
  scene.traverse(object=>{const mesh=object as THREE.Mesh;if(mesh.geometry)geometries.add(mesh.geometry);if(mesh.material)(Array.isArray(mesh.material)?mesh.material:[mesh.material]).forEach(material=>materials.add(material));});
  geometries.forEach(geometry=>geometry.dispose());materials.forEach(material=>material.dispose());environmentTarget?.dispose();scene.environment=null;renderer?.dispose();
});
window.addEventListener('pageshow',event=>{if(!event.persisted)return;disposed=false;previousFrame=performance.now();dirty=true;if(source==='camera')el('input-status').textContent=c.cameraWaiting;frameHandle=requestAnimationFrame(frame);});
