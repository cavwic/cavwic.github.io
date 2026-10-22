import { createTactileScene } from './scene';
import { createHistoryScope } from '../history';

type Row = number[];
type Case = { seed:number; condition:string; mode:string; mu:number; mass_kg:number; rows:Row[]; dropped:boolean; peak_force_N:number; displacement_m:number; detection_delay_s:number|null };
type Summary = {condition:string;mode:string;episodes:number;drop_rate:number;mean_force_N:number;mean_peak_force_N:number;mean_detection_delay_s:number|null;detected_slip_episodes:number};
type Scores=Record<string,{precision:number;recall:number;f1:number}>;
type Data = {cases:Case[];closed_loop:Summary[];classification_test:Scores;classification_conditions:Record<string,Scores>;training_history:{epoch:number;train_bce:number;validation_bce:number}[];split_episode_ids:Record<string,number[]>;model:{threshold:number};case_count:number};
const esc=(s:unknown)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const colors=['#315b79','#b06a33','#267e77','#b6404b'];
const poly=(a:number[],x:number,y:number,w:number,h:number,min:number,max:number)=>a.map((v,i)=>`${(x+i*w/Math.max(1,a.length-1)).toFixed(2)},${(y+h-h*Math.max(0,Math.min(1,(v-min)/(max-min)))).toFixed(2)}`).join(' ');
export function mount(host:HTMLElement,locale:'zh'|'en'):void {
  const zh=locale==='zh';const t=(cn:string,en:string)=>zh?cn:en;
  host.innerHTML=`<div class="lab-panel"><p class="lab-note">${t('合成触觉实验 · 100 Hz · 非真实传感器。下方回放脚本运行结果，不是实时硬件数据。','Synthetic tactile experiment · 100 Hz · no real sensors. Playback of computed experiment results, not live hardware.')}</p><p data-loading>${t('正在读取训练与闭环评测记录…','Loading training and closed-loop evaluations…')}</p></div>`;
  let activeRoot=host.firstElementChild;
  void fetch('/robotics-lab/tactile/manifest.json').then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json() as Promise<Data>}).then(async data=>{
    if(host.firstElementChild!==activeRoot)return;
    if(!Array.isArray(data.cases)||!data.cases.length)throw new Error('Missing experiment cases');
    const names:Record<string,string>={fixed:t('固定抓力','Fixed force'),threshold:t('振动阈值','Vibration threshold'),learned:t('学习分类器','Trained classifier'),nominal:t('常规条件','Nominal'),noisy:t('2.5 倍观测噪声','2.5× sensor noise'),'unseen-friction':t('未见过的低摩擦条件','Unseen low friction')};
    host.innerHTML=`<div class="lab-panel"><p class="lab-note">${t('合成触觉 · 已训练的 logistic 分类器。它并非在所有条件下都优于阈值方法，可查看低摩擦失败案例。','Synthetic tactile signals · actually trained logistic classifier. It does not outperform the threshold in every condition; inspect low-friction failures.')}</p><div class="lab-toolbar"><label class="lab-field">${t('环境','Condition')}<select data-condition>${['nominal','noisy','unseen-friction'].map(v=>`<option value="${v}">${esc(names[v])}</option>`).join('')}</select></label><label class="lab-field">${t('控制方法','Controller')}<select data-mode>${['learned','threshold','fixed'].map(v=>`<option value="${v}">${esc(names[v])}</option>`).join('')}</select></label><label class="lab-field">${t('测试回合','Test episode')}<select data-case></select></label><button class="lab-button" data-play>${t('播放','Play')}</button><a class="lab-button" href="/robotics-lab/tactile/results.json" download="tactile-results.json">${t('下载结果 JSON','Download results JSON')}</a></div><div class="lab-grid"><div class="lab-stage"><svg data-stage viewBox="0 0 800 380" role="img" aria-label="${t('合成传感器及滑移时序','Synthetic sensor and slip time series')}"></svg><label class="lab-field">${t('时间','Time')} <input data-time type="range" min="0" max="499" value="0" step="1" /></label><div data-case-metrics class="lab-metrics"></div></div><div class="lab-controls"><h3>${t('逐帧检测 · 独立测试集','Frame detection · held-out test')}</h3><p class="lab-note">${t('120 / 30 / 40 个回合分别用于训练 / 验证 / 测试；先按回合划分数据集，再提取因果窗口。','120 / 30 / 40 episodes for train / validation / test. Split by episode before causal window extraction.')}</p><div data-classification></div><h3>${t('训练过程','Training history')}</h3><svg data-loss class="lab-chart" viewBox="0 0 400 180" role="img" aria-label="${t('训练和验证交叉熵','Training and validation BCE')}"></svg><p class="lab-note">${t('蓝：训练 BCE · 绿：验证 BCE。阈值只用验证集选择。','Blue: train BCE · green: validation BCE. Threshold selected on validation only.')}</p></div></div><h3>${t('闭环对照：同种子、同抓力控制律','Closed-loop comparison: matched seeds and force law')}</h3><p class="lab-note">${t('每种条件 / 方法 40 回合。滑落=累计下滑超过 80 mm；平均峰值力为每回合峰值再取均值。延迟只统计出现滑移且随后检出的回合；未检出的回合不计为 0。','40 rollouts per condition / controller. Drop = cumulative slip >80 mm. Peak force = mean per-rollout maximum. Delay excludes undetected episodes rather than replacing them with zero.')}</p><div data-summary></div><p class="lab-note">${t('限制：振动由滑速合成，接触采用一维简化摩擦模型；低摩擦条件不代表新的真实材料。超过 80 mm 后仍保留虚拟接触，用于诊断，不代表物体掉落后的真实接触过程。不能把此 F1 当作真实传感器准确率。','Limits: vibration is synthesized from slip speed; contact is simplified 1D friction. Low-friction cases are not real new materials. Virtual contact continues after the 80 mm failure budget for diagnostics, not as a falling-object model. F1 is not real-sensor accuracy.')}</p></div>`;
    activeRoot=host.firstElementChild;
    const sceneSection=document.createElement('section');
    sceneSection.className='lab-scene-section';
    sceneSection.innerHTML=`<div class="lab-scene-host" data-contact-scene></div><p class="lab-scene-note" title="${t('仅把一维合成接触画成三维示意；颜色表示抓力，不是触觉阵列。下滑超过80mm后示意停在边界，后续仍是诊断用虚拟接触，并非真实落体。','A 3D view of the synthetic 1D contact only. Pad color represents force, not tactile taxels. At 80 mm the display stops; subsequent virtual contact is diagnostic, not a falling-object simulation.')}">${t('一维合成接触的三维示意 · 颜色 / 箭头随抓力变化','3D view of synthetic 1D contact · force drives color and arrows')}<span data-scene-status></span></p>`;
    host.querySelector('.lab-toolbar')!.after(sceneSection);
    const scene=createTactileScene(host.querySelector<HTMLElement>('[data-contact-scene]')!,locale);
    if(!scene)sceneSection.hidden=true;
    const method=document.createElement('details');method.innerHTML=`<summary>${t('接触与学习方法','Contact and learning method')}</summary><p>${t('静摩擦上界 μN；滑动摩擦 0.85μN；滑动速度 >0.003 m/s 作为参考标签。8 帧因果窗口，6 个力/振动特征，NumPy logistic 回归，160 轮训练；标准化只拟合训练集。控制律报警时 +26 N/s，否则 −0.12 N/s，限幅 2.8–9 N。','Static friction cap μN; kinetic friction 0.85μN; reference slip velocity >0.003 m/s. Eight-frame causal window, six force/vibration features, NumPy logistic regression trained for 160 epochs. Scaling is fitted on training only. Force law: +26 N/s on alarm, otherwise −0.12 N/s; bounds 2.8–9 N.')}</p><p>${t('摩擦建模背景','Contact modeling background')}: <a href="https://mujoco.readthedocs.io/en/stable/computation/index.html#contact" target="_blank" rel="noopener noreferrer">MuJoCo contact documentation</a> ${t('（本实验未调用 MuJoCo）','(this experiment does not invoke MuJoCo)')}</p><p><code>robotics-projects/.venv/Scripts/python.exe robotics-projects/tactile/run.py</code></p></details>`;host.querySelector('.lab-panel')!.append(method);
    const condition=host.querySelector<HTMLSelectElement>('[data-condition]')!; const mode=host.querySelector<HTMLSelectElement>('[data-mode]')!;const caseSelect=host.querySelector<HTMLSelectElement>('[data-case]')!;const time=host.querySelector<HTMLInputElement>('[data-time]')!;const stage=host.querySelector<SVGElement>('[data-stage]')!;const play=host.querySelector<HTMLButtonElement>('[data-play]')!;
    const reset=document.createElement('button');reset.type='button';reset.className='lab-button';reset.dataset.reset='';reset.textContent=t('回到开始','Reset');play.after(reset);
    let selected:Case=data.cases[0];let frameIndex=0;let timer:ReturnType<typeof setInterval>|undefined;let selectionRevision=0;
    const loadedGroups=new Map<string,Case[]>();
    function selectionControls(record:Case,index:number){
      condition.value=record.condition;mode.value=record.mode;
      const list=data.cases.filter(c=>c.condition===record.condition&&c.mode===record.mode);
      caseSelect.innerHTML=list.map((c,j)=>`<option value="${j}">seed ${c.seed}${c.dropped?` · ${t('失败','failed')}`:''}</option>`).join('');
      caseSelect.value=String(list.findIndex(c=>c.seed===record.seed));
      frameIndex=Math.max(0,Math.min(index,record.rows.length-1));time.max=String(record.rows.length-1);time.value=String(frameIndex);
    }
    async function applySelection(selectedCondition:string,selectedMode:string,seed?:number,index=0){
      stop();const revision=++selectionRevision;
      const list=data.cases.filter(c=>c.condition===selectedCondition&&c.mode===selectedMode);
      const record=list.find(c=>c.seed===seed)??list[0];
      try{
        if(!record)throw new Error('Episode selection missing');
        let full=record;
        if(!record.rows.length){
          const key=`${selectedCondition}-${selectedMode}`;let group=loadedGroups.get(key);
          if(!group){const response=await fetch(`/robotics-lab/tactile/cases-${key}.json`);if(!response.ok)throw new Error(`HTTP ${response.status}`);group=await response.json() as Case[];loadedGroups.set(key,group)}
          const loaded=group.find(c=>c.seed===record.seed);if(!loaded||!loaded.rows.length)throw new Error('Episode trajectory missing');full=loaded;
        }
        if(host.firstElementChild!==activeRoot||revision!==selectionRevision)return;
        // Commit selection only after its trajectory exists, including on undo/redo.
        selected=full;selectionControls(selected,index);classification();summary();draw();
      }catch(error){
        if(host.firstElementChild!==activeRoot||revision!==selectionRevision)return;
        selectionControls(selected,frameIndex);classification();summary();draw();
        host.querySelector('[data-case-metrics]')!.innerHTML=`<p class="lab-error">${t('无法加载该回合记录','Unable to load this episode')} ${esc(error instanceof Error?error.message:error)}</p>`;
        throw error;
      }
    }
    const pct=(n:number)=>`${(n*100).toFixed(1)}%`;const delay=(n:number|null)=>n===null?'—':`${(n*1000).toFixed(0)} ms`;
    host.querySelector('[data-classification]')!.innerHTML=`<table class="lab-table"><thead><tr><th>${t('方法','Method')}</th><th>P</th><th>R</th><th>F1</th></tr></thead><tbody>${['threshold','learned'].map(k=>{const r=data.classification_test[k];return `<tr><td>${esc(names[k])}</td><td>${pct(r.precision)}</td><td>${pct(r.recall)}</td><td>${pct(r.f1)}</td></tr>`}).join('')}</tbody></table>`;
    const hist=data.training_history;const maxLoss=Math.max(...hist.flatMap(r=>[r.train_bce,r.validation_bce]));
    host.querySelector('[data-loss]')!.innerHTML=`<path d="M35 15V150H385" fill="none" stroke="#8c9a9f"/><polyline points="${poly(hist.map(r=>r.train_bce),35,15,350,135,0,maxLoss)}" fill="none" stroke="${colors[0]}" stroke-width="2"/><polyline points="${poly(hist.map(r=>r.validation_bce),35,15,350,135,0,maxLoss)}" fill="none" stroke="${colors[2]}" stroke-width="2"/><text x="35" y="173" font-size="12" fill="currentColor">1</text><text x="340" y="173" font-size="12" fill="currentColor">${esc(hist.at(-1)?.epoch)} epoch</text>`;
    function stop(){if(timer!==undefined)clearInterval(timer);timer=undefined;play.textContent=t('播放','Play')}
    function classification(){host.querySelector('[data-classification]')!.innerHTML=`<table class="lab-table"><thead><tr><th>${t('方法','Method')}</th><th>P</th><th>R</th><th>F1</th></tr></thead><tbody>${['threshold','learned'].map(k=>{const r=data.classification_conditions[condition.value][k];return `<tr><td>${esc(names[k])}</td><td>${pct(r.precision)}</td><td>${pct(r.recall)}</td><td>${pct(r.f1)}</td></tr>`}).join('')}</tbody></table>`}
    function draw(){if(!host.isConnected||host.firstElementChild!==activeRoot){stop();return}const rows=selected.rows;const i=Math.max(0,Math.min(Number(time.value),rows.length-1));frameIndex=i;const r=rows[i];const cursor=55+i*710/(rows.length-1);const normal=rows.map(v=>v[1]);const shear=rows.map(v=>v[2]);const vib=rows.map(v=>Math.abs(v[3]));const prob=rows.map(v=>v[8]);const slip=rows.map(v=>v[6]);
      stage.innerHTML=`<rect x="0" y="0" width="800" height="380" fill="transparent"/><text x="55" y="22" font-size="15" fill="currentColor">${t('法向力 / 剪切力','Normal / shear force')} (N)</text><path d="M55 35V160H765 M55 205V330H765" fill="none" stroke="#a9b5b8"/><polyline points="${poly(normal,55,35,710,125,0,10)}" fill="none" stroke="${colors[0]}" stroke-width="2"/><polyline points="${poly(shear,55,35,710,125,0,10)}" fill="none" stroke="${colors[1]}" stroke-width="2"/><text x="55" y="192" font-size="15" fill="currentColor">${t('振动幅值 / 概率 / 参考滑移','Vibration / probability / slip reference')}</text><polyline points="${poly(vib,55,205,710,125,0,.5)}" fill="none" stroke="${colors[1]}" stroke-width="1.5"/><polyline points="${poly(prob,55,205,710,125,0,1)}" fill="none" stroke="${colors[2]}" stroke-width="2"/><polyline points="${poly(slip,55,205,710,125,0,1)}" fill="none" stroke="${colors[3]}" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="${cursor}" x2="${cursor}" y1="32" y2="333" stroke="currentColor" stroke-width="1"/><text x="55" y="357" font-size="13" fill="currentColor">${t('蓝：法向力 · 棕：剪切 / 振动 · 绿：学习概率 · 红虚线：滑移真值','Blue: normal · brown: shear / vibration · green: learned p · red dash: reference')}</text><text x="55" y="375" font-size="13" fill="currentColor">0 s</text><text x="725" y="375" font-size="13" fill="currentColor">5 s</text>`;
      scene?.update(r[1],r[5],Boolean(r[7]));
      const sceneStatus=host.querySelector<HTMLElement>('[data-scene-status]')!;
      sceneStatus.textContent=r[5]>.08?t(' · 超出显示范围，数值继续记录',' · Display limit reached; values continue to be recorded'):'';
      sceneStatus.className=r[5]>.08?'lab-scene-alert':'';
      host.querySelector('[data-case-metrics]')!.innerHTML=`<span>${t('时间','Time')} ${r[0].toFixed(2)} s</span><span>${t('抓力','Force')} ${r[1].toFixed(2)} N</span><span>${t('下滑','Slip')} ${(r[5]*1000).toFixed(1)} mm</span><span>${t('报警','Alarm')} ${r[7]?t('是','yes'):t('否','no')}</span><span>μ=${selected.mu.toFixed(3)}</span><span>${t('本回合滑落','Episode drop')} ${selected.dropped?t('是','yes'):t('否','no')}</span><span>${t('首次检出延迟','Detection delay')} ${delay(selected.detection_delay_s)}</span>`;
    }
    function summary(){host.querySelector('[data-summary]')!.innerHTML=`<table class="lab-table"><thead><tr><th>${t('方法','Method')}</th><th>${t('滑落率','Drop rate')}</th><th>${t('平均力','Mean force')}</th><th>${t('平均峰值力','Mean peak')}</th><th>${t('延迟 / 检出回合数','Delay / detected episodes')}</th></tr></thead><tbody>${data.closed_loop.filter(c=>c.condition===condition.value).map(c=>`<tr><td>${esc(names[c.mode])}</td><td>${pct(c.drop_rate)}</td><td>${c.mean_force_N.toFixed(2)} N</td><td>${c.mean_peak_force_N.toFixed(2)} N</td><td>${delay(c.mean_detection_delay_s)} / ${c.detected_slip_episodes}</td></tr>`).join('')}</tbody></table>`}
    await applySelection(condition.value,mode.value);
    if(host.firstElementChild!==activeRoot)return;
    type ReplayState={episode:number;index:number};
    const history=createHistoryScope<ReplayState>({
      capture:()=>({episode:data.cases.findIndex(c=>c.seed===selected.seed&&c.condition===selected.condition&&c.mode===selected.mode),index:frameIndex}),
      beforeRestore:stop,
      async restore(state){stop();const record=data.cases[state.episode];if(record)await applySelection(record.condition,record.mode,record.seed,state.index)},
    });
    history.reset();
    history.listen(condition,'change',t('切换触觉环境','Change contact condition'),async()=>{await applySelection(condition.value,mode.value)});
    history.listen(mode,'change',t('切换触觉控制方法','Change contact controller'),async()=>{await applySelection(condition.value,mode.value)});
    history.listen(caseSelect,'change',t('切换触觉回合','Change contact episode'),async()=>{const record=data.cases.filter(c=>c.condition===condition.value&&c.mode===mode.value)[Number(caseSelect.value)];if(record)await applySelection(record.condition,record.mode,record.seed)});
    history.listen(time,'input',t('调整触觉回放时间','Seek contact replay'),()=>{stop();draw()});
    reset.addEventListener('click',()=>{history.run(t('回到触觉回放开始','Reset contact replay'),()=>{stop();time.value='0';draw()})});
    play.addEventListener('click',()=>{if(timer!==undefined){stop();return}play.textContent=t('暂停','Pause');timer=setInterval(()=>{if(Number(time.value)>=selected.rows.length-1)time.value='0';else time.value=String(Number(time.value)+4);draw()},40)});
  }).catch(error=>{if(host.firstElementChild!==activeRoot)return;host.innerHTML=`<p class="lab-error">${t('无法读取实验结果，请先运行 robotics-projects/tactile/run.py。','Unable to load results. Run robotics-projects/tactile/run.py first.')} ${esc(error instanceof Error?error.message:error)}</p>`});
}
