import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=relative=>JSON.parse(readFileSync(path.join(root,relative),'utf8'));
const near=(a,b,tolerance=1e-8)=>assert.ok(Math.abs(a-b)<=tolerance,`${a} != ${b}`);
function isolated(split){const groups=Object.values(split);for(let i=0;i<groups.length;i++){assert.equal(new Set(groups[i]).size,groups[i].length);for(let j=i+1;j<groups.length;j++)assert.equal(groups[i].filter(v=>groups[j].includes(v)).length,0,'Episode leakage');}}
function finite(value){if(typeof value==='number')assert.ok(Number.isFinite(value));else if(Array.isArray(value))value.forEach(finite);else if(value&&typeof value==='object')Object.values(value).forEach(finite);}

const tactile=read('public/robotics-lab/tactile/results.json');
isolated(tactile.split_episode_ids);finite(tactile);
assert.deepEqual(Object.values(tactile.split_episode_ids).map(a=>a.length),[120,30,40]);
assert.equal(tactile.cases.length,360);
assert.equal(tactile.features.length,tactile.model.weights.length);
assert.ok(tactile.model.threshold>0&&tactile.model.threshold<1);
for(const r of Object.values(tactile.classification_test)){
  near(r.precision,r.tp/Math.max(1,r.tp+r.fp));near(r.recall,r.tp/Math.max(1,r.tp+r.fn));near(r.f1,2*r.precision*r.recall/Math.max(1e-12,r.precision+r.recall));
  assert.equal(r.tp+r.fp+r.fn+r.tn,40*500);
}
for(const c of tactile.cases){
  assert.equal(c.rows.length,500);assert.equal(c.rows[0].length,9);
  for(const row of c.rows){if(Math.abs(row[4]-.003)>0.0000051)assert.equal(row[6],Number(row[4]>.003));assert.ok(row[8]>=0&&row[8]<=1);}
  assert.equal(c.dropped,c.displacement_m>.08);
  if(c.mode==='fixed'){assert.equal(c.detection_delay_s,null);assert.ok(c.rows.every(r=>r[7]===0));}
}
for(const summary of tactile.closed_loop){
  const runs=tactile.cases.filter(c=>c.mode===summary.mode&&c.condition===summary.condition);
  assert.equal(runs.length,40);near(summary.drop_rate,runs.filter(c=>c.dropped).length/runs.length);
  near(summary.mean_peak_force_N,runs.reduce((s,c)=>s+c.peak_force_N,0)/runs.length,1e-7);
}
assert.ok(tactile.training_history.at(-1).train_bce<tactile.training_history[0].train_bce,'Logistic training should lower its training loss');
console.log('tactile: episode isolation, confusion metrics, 360 trajectories, 9 closed-loop summaries, causal data schema passed');

const act=read('public/robotics-lab/imitation/results.json');isolated(act.split_episode_ids);finite(act);
assert.equal(act.implementation,'lerobot.policies.act.modeling_act.ACTPolicy');
assert.deepEqual(Object.values(act.split_episode_ids).map(a=>a.length),[180,30,40]);
assert.equal(act.cases.length,360);assert.equal(act.config.chunk_size,8);assert.equal(act.config.execution_steps,4);assert.equal(act.config.use_vae,true);
assert.equal(act.checkpoint.round_trip_verified,true);
const checkpoint=readFileSync(path.join(root,act.checkpoint.file));
assert.equal(checkpoint.length,act.checkpoint.bytes);assert.equal(createHash('sha256').update(checkpoint).digest('hex'),act.checkpoint.sha256);
assert.ok(statSync(path.join(root,'robotics-projects/imitation/mlp_checkpoint.pt')).size>1000);
for(const c of act.cases){
  assert.ok(act.split_episode_ids.test.includes(c.seed));assert.equal(c.path.length,60);assert.equal(c.actions.length,60);
  assert.equal(c.success,c.errors.slice(-5).every(v=>v<act.config.success_radius));near(c.final_error,c.errors.at(-1));
  for(let i=0;i<c.path.length;i++){
    let previous=i===0?[...c.start]:[...c.path[i-1]];
    if(c.condition==='perturbed'&&i===15){previous[0]+=.18;previous[1]-=.15;}
    for(let d=0;d<2;d++){assert.ok(Math.abs(c.actions[i][d])<=.5000001);near(c.path[i][d],Math.max(-1.2,Math.min(1.2,previous[d]+act.config.dt*c.actions[i][d])),1e-6);}
    near(c.errors[i],Math.hypot(c.path[i][0]-c.goal[0],c.path[i][1]-c.goal[1]),1e-6);
  }
  if(c.mode==='act')assert.equal(c.inference_calls,15);
}
for(const s of act.summary){const cases=act.cases.filter(c=>c.mode===s.mode&&c.condition===s.condition);assert.equal(cases.length,40);near(s.success_rate,cases.filter(c=>c.success).length/40);near(s.mean_final_error,cases.reduce((v,c)=>v+c.final_error,0)/40);assert.ok(s.success_wilson95[0]<=s.success_rate+1e-8&&s.success_wilson95[1]>=s.success_rate-1e-8);}
assert.ok(act.training_history.at(-1).validation_l1<act.training_history[0].validation_l1,'ACT should improve validation reconstruction');
console.log('imitation: official ACT identity, 180/30/40 split, checkpoint hash, 360 closed-loop trajectories, action-only dynamics, 9 metrics passed');
