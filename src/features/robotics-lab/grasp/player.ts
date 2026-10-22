import { createRecordedGraspScene } from './scene';
import { createHistoryScope } from '../history';

type Locale = 'zh' | 'en';
type Kind = 'grasp' | 'randomization';
type Frame = { t: number; object: number[]; quat: number[]; jaws: number[]; normal: number[];
  contacts: number; contactPositions: number[][]; actuatorForce: number[] };
type Trial = { seed: number; shape: string; method: string; domain?: string; success: boolean;
  condition: { mass: number; friction: number; offset: number; yaw: number; delay: number; noise: number };
  policy: { forceTargetN: number; liftTimeS: number }; frames: Frame[]; holdMinHeightM: number;
  peakNormalN: number; actuatorAbsWorkJ: number; maxLiftM: number; failure: string | null };
type Summary = { shape?: string; method?: string; domain?: string; trials: number; successes: number;
  rate: number; wilson95: number[]; seedBlockBootstrap95: number[]; seedBlocks: number; meanPeakNormalN: number; meanAbsWorkJ: number };
type Result = { schemaVersion: number; experimentVersion: string; engine: string; engineVersion: string;
  sourceSha256: string; dt: number; durationS: number; trials: Trial[]; summary: Summary[];
  shapes: Record<string, { type: string; size: number[] }>; selection?: string;
  policies?: { domain: string; forceTargetN: number; liftTimeS: number }[];
  pairedComparisons?: { domain: string; meanSuccessDifference: number; seedBlockBootstrap95: number[];
    pairedWins: number; pairedLosses: number; seedBlocks: number }[] };

const WORDS: Record<string, [string, string]> = {
  cube: ['立方块', 'Cube'], cylinder: ['圆柱', 'Cylinder'], plate: ['薄片', 'Thin plate'],
  fixed_gap: ['固定闭合量', 'Fixed closure'], geometry: ['名义几何适配', 'Nominal geometry'],
  force_feedback: ['接触力闭环', 'Contact-force feedback'], nominal: ['名义工况搜索', 'Nominal search'],
  physics: ['物理随机化搜索', 'Physics-randomized search'], full: ['物理 + 延迟噪声搜索', 'Physics + delay/noise search'],
};
const STYLE = `<style>
 .grasp-study{--grasp-ink:#244453;--grasp-cyan:#167d94;--grasp-orange:#b35f16;--grasp-grid:#aec1ca;font-size:16px}
 .grasp-study .lab-toolbar{display:flex;flex-wrap:wrap;gap:12px;align-items:end;margin:16px 0}
 .grasp-study .lab-field{display:flex;flex-direction:column;gap:6px;min-width:130px}
 .grasp-study select,.grasp-study button{font:inherit;padding:9px 12px;min-height:42px}
 .grasp-study .lab-grid{display:grid;grid-template-columns:minmax(0,1.8fr) minmax(230px,1fr);gap:20px}
 .grasp-study .lab-stage{width:100%;border:1px solid var(--grasp-grid);background:#edf3f5;color:#244453;border-radius:8px;overflow:hidden}
 .grasp-study .lab-stage svg,.grasp-study .lab-chart svg{display:block;width:100%;height:auto}
 .grasp-study .grasp-scene-options{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;margin:10px 0;font-size:.9em}
 .grasp-study .grasp-scene-options[hidden]{display:none}
 .grasp-study .grasp-scene-options label{display:flex;align-items:center;gap:7px}
 .grasp-study .grasp-scene-options select{min-height:36px;padding:5px 9px}
 .grasp-study .grasp-scene-options input{accent-color:var(--grasp-cyan);width:17px;height:17px}
 .grasp-study .grasp-scene-caption{margin:8px 0;font-size:.86em;line-height:1.55}
 .grasp-study .lab-metrics{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0}
 .grasp-study .lab-metrics div{border-bottom:1px solid var(--grasp-grid);padding:10px 0}
 .grasp-study dt{font-size:.86em;opacity:.8}.grasp-study dd{font:600 1.4em Consolas,monospace;margin:5px 0}
 .grasp-study .lab-chart{margin-top:14px;background:#edf3f5;color:#244453;border-radius:6px}
 .grasp-study .lab-note{line-height:1.65;font-size:.94em}.grasp-study .lab-table{width:100%;border-collapse:collapse;font-size:.9em}
 .grasp-study .lab-table th,.grasp-study .lab-table td{padding:10px 8px;text-align:left;border-bottom:1px solid var(--grasp-grid)}
 .grasp-study .table-scroll{overflow:auto}.grasp-study input[type=range]{width:100%;accent-color:#167d94}
 .grasp-study button:focus-visible,.grasp-study select:focus-visible,.grasp-study a:focus-visible,.grasp-study input:focus-visible{outline:3px solid #d48436;outline-offset:3px}
 .grasp-study .grasp-outcome{padding:8px 12px;border-left:4px solid var(--grasp-orange);background:rgba(179,95,22,.09)}
 .grasp-study .downloads{display:flex;flex-wrap:wrap;gap:16px;margin:16px 0}
 .grasp-study .lab-error{padding:24px;border:1px solid #b54c3c}.grasp-study .lab-controls{display:flex;gap:12px;align-items:center;margin:10px 0}
 @media(max-width:760px){.grasp-study .lab-grid{grid-template-columns:1fr}.grasp-study .lab-toolbar>*{flex:1}.grasp-study .lab-metrics{grid-template-columns:repeat(2,1fr)}}
 </style>`;

function validate(value: unknown): Result {
  const r = value as Result;
  if (!r || r.schemaVersion !== 1 || r.engine !== 'MuJoCo' || !Array.isArray(r.trials) || !r.trials.length || !Array.isArray(r.summary)) {
    throw new Error('Invalid MuJoCo evidence schema');
  }
  for (const t of r.trials) {
    if (!Array.isArray(t.frames) || t.frames.length < 2 || !r.shapes[t.shape] || typeof t.success !== 'boolean') throw new Error('Missing trial trajectories');
    for (const f of t.frames) {
      if (![f.t, ...f.object, ...f.quat, ...f.jaws, ...f.normal, ...f.contactPositions.flat()].every(Number.isFinite)) throw new Error('Non-finite physical state');
    }
  }
  return r;
}

function hull(points: number[][]): number[][] {
  const p = points.sort((a, b) => a[0]! - b[0]! || a[1]! - b[1]!);
  const cross = (a: number[], b: number[], c: number[]) => (b[0]! - a[0]!) * (c[1]! - a[1]!) - (b[1]! - a[1]!) * (c[0]! - a[0]!);
  const lower: number[][] = [], upper: number[][] = [];
  for (const x of p) { while (lower.length >= 2 && cross(lower[lower.length - 2]!, lower[lower.length - 1]!, x) <= 0) lower.pop(); lower.push(x); }
  for (const x of [...p].reverse()) { while (upper.length >= 2 && cross(upper[upper.length - 2]!, upper[upper.length - 1]!, x) <= 0) upper.pop(); upper.push(x); }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

function objectPolygon(frame: Frame, shape: Result['shapes'][string]): string {
  const [w = 1, x = 0, y = 0, z = 0] = frame.quat;
  const rotate = ([a = 0, b = 0, c = 0]: number[]) => [
    (1 - 2*y*y - 2*z*z)*a + (2*x*y - 2*z*w)*b + (2*x*z + 2*y*w)*c,
    (2*x*z - 2*y*w)*a + (2*y*z + 2*x*w)*b + (1 - 2*x*x - 2*y*y)*c,
  ];
  const vertices: number[][] = [];
  if (shape.type === 'cylinder') {
    for (const h of [-shape.size[1]!, shape.size[1]!]) for (let i = 0; i < 20; i++) vertices.push([shape.size[0]! * Math.cos(i * Math.PI / 10), shape.size[0]! * Math.sin(i * Math.PI / 10), h]);
  } else {
    for (const a of [-1, 1]) for (const b of [-1, 1]) for (const c of [-1, 1]) vertices.push([a*shape.size[0]!, b*shape.size[1]!, c*shape.size[2]!]);
  }
  return hull(vertices.map(v => { const r = rotate(v); return [400 + (frame.object[0]! + r[0]!) * 1400, 338 - (frame.object[2]! + r[1]!) * 1400]; }))
    .map(p => `${p[0]!.toFixed(2)},${p[1]!.toFixed(2)}`).join(' ');
}

function stage(frame: Frame, shape: Result['shapes'][string], label: string): string {
  const z = frame.jaws[0]!;
  const left = 400 + (-.065 + frame.jaws[1]! - .006) * 1400;
  const right = 400 + (.065 - frame.jaws[2]! - .006) * 1400;
  const top = 338 - (.046 + z + .03) * 1400;
  return `<svg viewBox="0 0 800 380" role="img" aria-label="${label}">
    <defs><pattern id="grasp-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#d6e0e5" stroke-width="1"/></pattern></defs>
    <rect width="800" height="380" fill="url(#grasp-grid)"/>
    <text x="24" y="30" fill="#244453" font-size="17" font-family="Consolas,monospace">MuJoCo / X–Z / t = ${frame.t.toFixed(2)} s</text>
    <path d="M35 338H765" stroke="#657f8d" stroke-width="3"/>
    <path d="M42 191H758" stroke="#99aeb9" stroke-dasharray="5 6"/><text x="44" y="181" fill="#526b78" font-size="13">z = 105 mm</text>
    <rect x="${left}" y="${top}" width="16.8" height="84" rx="3" fill="#167d94"/>
    <rect x="${right}" y="${top}" width="16.8" height="84" rx="3" fill="#167d94"/>
    <path d="M${left+8.4} ${top}V${top-56}H${right+8.4}V${top}" stroke="#718995" fill="none" stroke-width="12"/>
    <polygon points="${objectPolygon(frame, shape)}" fill="#df9a53" fill-opacity=".8" stroke="#915018" stroke-width="2"/>
    ${frame.contactPositions.map(p => `<circle cx="${400+p[0]!*1400}" cy="${338-p[2]!*1400}" r="4" fill="#bd5422"/>`).join('')}
    <text x="24" y="366" fill="#244453" font-size="14">${label}</text>
  </svg>`;
}

function chart(frames: Frame[], index: number, en: boolean): string {
  const width = 680, height = 170, x0 = 54, y0 = 135, sx = (width - 76) / frames[frames.length-1]!.t;
  const points = (get: (f: Frame) => number, scale: number) => frames.map(f => `${x0+f.t*sx},${y0-get(f)*scale}`).join(' ');
  const active = frames[index]!;
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${en ? 'Recorded height and normal force' : '记录的高度与接触法向力'}">
   <path d="M${x0} 28V${y0}H${width-15}" fill="none" stroke="#8aa0ad"/>
   <path d="M${x0} ${y0-.105*600}H${width-15}" stroke="#aabac2" stroke-dasharray="4 4"/>
   <polyline points="${points(f=>f.object[2]!,600)}" stroke="#167d94" stroke-width="2" fill="none"/>
   <polyline points="${points(f=>Math.max(...f.normal),7)}" stroke="#b35f16" stroke-width="1.5" fill="none"/>
   <path d="M${x0+active.t*sx} 28V${y0}" stroke="#244453" stroke-width="1.2"/>
   <text x="14" y="20" fill="#167d94" font-size="13">${en ? 'Height' : '高度'} / 0–180 mm</text>
   <text x="290" y="20" fill="#b35f16" font-size="13">${en ? 'Max jaw normal force' : '较大单指法向力'} / 0–15 N</text>
   <text x="${x0}" y="157" fill="#526b78" font-size="12">0 s</text><text x="${width-60}" y="157" fill="#526b78" font-size="12">3.8 s</text>
  </svg>`;
}

export function mountExperiment(host: HTMLElement, locale: Locale, kind: Kind): void {
  const en = locale === 'en';
  const text = (zh: string, english: string) => en ? english : zh;
  const word = (id: string) => WORDS[id]?.[en ? 1 : 0] ?? id;
  const base = `${import.meta.env.BASE_URL}robotics-lab/${kind}/`;
  host.classList.add('lab-panel', 'grasp-study');
  host.innerHTML = `${STYLE}<p role="status">${text('正在加载仿真实验记录…', 'Loading recorded physics experiments…')}</p>`;
  fetch(`${base}results.json`).then(async response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${base}results.json`);
    return validate(await response.json());
  }).then(result => {
    if (!host.isConnected) return;
    const methods = kind === 'grasp' ? ['fixed_gap', 'geometry', 'force_feedback'] : ['nominal', 'physics', 'full'];
    host.innerHTML = `${STYLE}
      <p class="lab-note">${kind === 'grasp'
        ? text('双指夹爪 · 自由刚体 · 摩擦接触。切换选项可查看已运行的仿真工况，浏览器不实时求解物理过程。', 'Parallel jaws · free rigid object · frictional contact. Controls select recorded experiments, not live browser physics.')
        : text('在同一组未参与参数选择的工况上，配对比较三种搜索分布。这里只进行了有限参数网格搜索，没有强化学习，也没有真实硬件迁移验证。', 'Three search distributions, paired on the same held-out conditions. Finite parameter grid search only: no reinforcement learning and no real-hardware transfer claim.')}</p>
      <div class="lab-toolbar">
        <label class="lab-field">${text('物体', 'Object')}<select data-shape>${Object.keys(result.shapes).map(x=>`<option value="${x}">${word(x)}</option>`).join('')}</select></label>
        <label class="lab-field">${text('策略', 'Policy')}<select data-method>${methods.map(x=>`<option value="${x}">${word(x)}</option>`).join('')}</select></label>
        <label class="lab-field">${text('工况 / 种子', 'Trial / seed')}<select data-trial></select></label>
      </div>
      <div class="lab-grid"><section><div class="lab-stage" data-stage></div>
        <div class="grasp-scene-options" data-scene-options>
          <label>${text('模型', 'Model')}<select data-model-view title="${text('碰撞视图中，青色指垫与橙色物体参与碰撞；灰色桥不参与碰撞。', 'In collision view, cyan pads and the orange object collide. The grey bridge does not.')}" ><option value="appearance">${text('细节外观', 'Detailed appearance')}</option><option value="collision">${text('碰撞几何', 'Collision geometry')}</option></select></label>
          <label><input type="checkbox" checked data-contacts/>${text('接触点', 'Contact points')}</label>
        </div>
        <p class="grasp-scene-caption" data-scene-caption>${text('按仿真尺寸回放 · 外壳、滑轨仅用于展示，不是工程 CAD，也不参与碰撞。', 'Recorded at simulation scale. Housing and rails are visual illustrations, not engineering CAD; they do not collide.')}</p>
        <div class="lab-controls"><button class="lab-button" data-play>${text('播放', 'Play')}</button><button class="lab-button" data-reset>${text('回到开始', 'Reset')}</button><span data-clock></span></div>
        <input type="range" min="0" step="1" value="0" data-seek aria-label="${text('回放时间', 'Replay time')}"/>
        <div class="lab-chart" data-chart></div>
      </section><aside><p class="grasp-outcome" data-outcome></p><dl class="lab-metrics" data-metrics></dl><p class="lab-note" data-condition></p><p class="lab-note" data-policy></p></aside></div>
      <p class="lab-note">${text('橙点为 MuJoCo 记录的接触坐标，标记已放大，不代表接触面积。蓝线：质心高度；橙线：较大单指法向力。力以 100 Hz 采样，可能漏掉短时冲击峰值。成功要求最后 0.7 秒全程质心高度 ≥ 105 mm，且最终横向偏移 < 60 mm。', 'Orange markers show recorded MuJoCo contact positions, enlarged for visibility—not contact area. Blue: centre height. Orange curve: larger jaw normal force. Force is sampled at 100 Hz and can miss brief impact peaks. Success: centre height ≥105 mm throughout the final 0.7 s and final |x| <60 mm.')}</p>
      <div class="table-scroll"><table class="lab-table"><thead><tr><th>${text('条件', 'Condition')}</th><th>${text('成功 / 总数', 'Success / trials')}</th><th>${text('成功比例', 'Fraction')}</th><th>${kind==='grasp'?text('95% Wilson 区间', '95% Wilson interval'):text('种子块重采样 95% 区间', 'Seed-block bootstrap 95%')}</th><th>${text('平均采样峰值法向力', 'Mean sampled peak normal')}</th><th>${text('平均执行器绝对功', 'Mean actuator |work|')}</th></tr></thead><tbody>${result.summary.map(row=>`<tr><td>${row.shape ? word(row.shape)+' / ' : ''}${word(row.method ?? row.domain ?? '')}</td><td>${row.successes} / ${row.trials}</td><td>${(row.rate*100).toFixed(1)}%</td><td>${(kind==='grasp'?row.wilson95:row.seedBlockBootstrap95).map(x=>(x*100).toFixed(1)).join('–')}%</td><td>${row.meanPeakNormalN.toFixed(2)} N</td><td>${row.meanAbsWorkJ.toFixed(3)} J</td></tr>`).join('')}</tbody></table></div>
      ${kind==='randomization'?`<p class="lab-note">${text('比较时也要看力与机械功：搜索可能选择更大的力目标来换取成功率，这不能说明算法在同等执行强度下更有优势。物理随机化与联合随机化若并列，不能宣称额外噪声带来了提升。', 'Read force and mechanical work alongside success: search may select a higher force target. This is not proof of algorithmic superiority at equal effort. A tie does not demonstrate an additional benefit from delay/noise randomization.')}</p>`:''}
      ${result.pairedComparisons ? `<p class="lab-note">${text('相对名义搜索的配对成功比例差（百分点；按种子整块重采样 2,000 次）：', 'Paired difference versus nominal search (percentage points; 2,000 seed-block resamples):')}<br>${result.pairedComparisons.map(p=>`${word(p.domain)}: ${(p.meanSuccessDifference*100).toFixed(1)} ${text('百分点', 'pp')} [${p.seedBlockBootstrap95.map(x=>(x*100).toFixed(1)).join(', ')}] · ${text('配对胜/负', 'paired wins/losses')} ${p.pairedWins}/${p.pairedLosses}`).join('<br>')}</p>` : ''}
      <div class="downloads"><a href="${base}results.json" download>${text('下载结果与全部轨迹', 'Results + trajectories')}</a><a href="${base}trials.json" download>${text('下载逐次试验表', 'Per-trial records')}</a>${kind==='grasp' ? `<a href="${base}model.xml" download>MJCF</a>` : `<a href="${base}training-trials.json" download>${text('下载参数搜索原始记录', 'Search trial records')}</a>`}<a href="${base}README.md">${text('方法与复现说明', 'Methods + reproduction')}</a></div>
      <p class="lab-note">MuJoCo ${result.engineVersion} · Δt ${result.dt*1000} ms · ${result.experimentVersion}<br>${text('限制：使用刚体与理想执行器模型，不含触觉硬件、热模型或破损模型。三维视图只回放记录，不进行在线物理求解；外观细节不参与碰撞。小样本统计区间不能保证现实性能。', 'Limits: rigid bodies and ideal servos; no tactile hardware, thermal or breakage model. The 3D view replays records without live physics. Appearance details do not collide. Small-sample intervals are not real-world guarantees.')}</p>`;
    const query = <T extends Element>(selector: string) => host.querySelector<T>(selector)!;
    const shapeSelect = query<HTMLSelectElement>('[data-shape]');
    const methodSelect = query<HTMLSelectElement>('[data-method]');
    const trialSelect = query<HTMLSelectElement>('[data-trial]');
    const seek = query<HTMLInputElement>('[data-seek]');
    const play = query<HTMLButtonElement>('[data-play]');
    const stageHost = query<HTMLElement>('[data-stage]');
    const modelView = query<HTMLSelectElement>('[data-model-view]');
    const contacts = query<HTMLInputElement>('[data-contacts]');
    const contactCapacity = Math.max(16, ...result.trials.map(trial => Math.max(...trial.frames.map(frame => frame.contactPositions.length))));
    const scene = createRecordedGraspScene(stageHost, result.shapes, locale, contactCapacity);
    if (!scene) {
      query<HTMLElement>('[data-scene-options]').hidden = true;
      query('[data-scene-caption]').textContent = text('当前环境无法显示 WebGL，已切换为 X–Z 二维投影回放。', 'WebGL is unavailable. Showing the recorded X–Z projection instead.');
    }
    let available: Trial[] = [], selected: Trial, index = 0, playing = false, last = 0;
    let appearance = true, showContacts = true;
    const draw = () => {
      const f = selected.frames[index]!;
      if (scene) scene.update(f, selected.shape);
      else stageHost.innerHTML = stage(f, result.shapes[selected.shape]!, `${word(selected.shape)} · ${f.contacts} ${text('接触', 'contacts')}`);
      query('[data-chart]').innerHTML = chart(selected.frames, index, en);
      query('[data-clock]').textContent = `${f.t.toFixed(2)} / ${result.durationS.toFixed(1)} s`;
      seek.value = String(index);
    };
    const stop = () => { playing = false; play.textContent = text('播放', 'Play'); };
    const select = () => {
      stop(); selected = available[Number(trialSelect.value)]!; index = 0; seek.max = String(selected.frames.length-1);
      query('[data-outcome]').textContent = selected.success ? text('仿真结果：提起并保持', 'Observed: lifted and held') : text(`仿真结果：${selected.failure==='no_lift'?'未提起':'滑落或掉落'}`, `Observed: ${selected.failure==='no_lift'?'not lifted':'slipped or dropped'}`);
      query('[data-metrics]').innerHTML = [[text('保持段最低高度', 'Minimum hold height'), `${(selected.holdMinHeightM*1000).toFixed(1)} mm`], [text('峰值法向力', 'Peak jaw normal'), `${selected.peakNormalN.toFixed(2)} N`], [text('执行器绝对功', 'Actuator |work|'), `${selected.actuatorAbsWorkJ.toFixed(3)} J`], [text('最大提起高度', 'Maximum lift'), `${(selected.maxLiftM*1000).toFixed(1)} mm`]].map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
      const c = selected.condition;
      query('[data-condition]').textContent = `${text('工况', 'Condition')}: m ${(c.mass*1000).toFixed(0)} g · μ ${c.friction.toFixed(2)} · x ${(c.offset*1000).toFixed(1)} mm · yaw ${(c.yaw*180/Math.PI).toFixed(1)}° · ${text('反馈延迟', 'Feedback delay')} ${(c.delay*1000).toFixed(0)} ms · ${text('增量噪声 σ', 'Increment noise σ')} ${(c.noise*.08*1000).toFixed(3)} mm`;
      query('[data-policy]').textContent = selected.method==='force_feedback' ? `${text('选定参数', 'Policy')}: ${selected.policy.forceTargetN.toFixed(1)} N / ${text('指', 'jaw')} · ${text('提起时间', 'Lift')} ${selected.policy.liftTimeS.toFixed(2)} s` : text('固定闭合量与名义几何方法不使用接触力反馈；所示力是测量记录，不是控制目标。', 'Fixed and geometry methods do not use contact-force feedback. Displayed force is measured, not commanded.');
      draw();
    };
    const filter = (previousSeed = selected?.seed) => {
      available = result.trials.filter(t=>t.shape===shapeSelect.value && (kind==='grasp'?t.method:t.domain)===methodSelect.value);
      trialSelect.innerHTML = available.map((t,i)=>`<option value="${i}">seed ${t.seed} · ${t.success?text('成功','held'):text('失败','failed')}</option>`).join('');
      const same = available.findIndex(t=>t.seed===previousSeed); if (same>=0) trialSelect.value=String(same);
      select();
    };
    filter();
    type ReplayState = { trial: number; index: number; appearance: boolean; contacts: boolean };
    const history = createHistoryScope<ReplayState>({
      // Capture canonical selection, not a <select> value already changed by the browser.
      capture: () => ({ trial: result.trials.indexOf(selected), index, appearance, contacts: showContacts }),
      beforeRestore: stop,
      restore(state) {
        stop();
        const trial = result.trials[state.trial];
        if (!trial) return;
        shapeSelect.value = trial.shape;
        methodSelect.value = kind === 'grasp' ? trial.method : trial.domain!;
        filter(trial.seed);
        index = Math.max(0, Math.min(state.index, selected.frames.length - 1));
        appearance = state.appearance; showContacts = state.contacts;
        modelView.value = appearance ? 'appearance' : 'collision'; contacts.checked = showContacts;
        scene?.setAppearance(appearance); scene?.setContacts(showContacts);
        draw();
      },
    });
    history.reset();
    history.listen(shapeSelect, 'change', text('切换物体', 'Change object'), () => filter());
    history.listen(methodSelect, 'change', text('切换抓取策略', 'Change grasp policy'), () => filter());
    history.listen(trialSelect, 'change', text('切换抓取工况', 'Change grasp trial'), select);
    if (scene) {
      history.listen(modelView, 'change', text('切换模型视图', 'Change model view'), () => { stop(); appearance = modelView.value === 'appearance'; scene.setAppearance(appearance); });
      history.listen(contacts, 'change', text('切换接触点显示', 'Toggle contact points'), () => { stop(); showContacts = contacts.checked; scene.setContacts(showContacts); });
    }
    // The shared input transaction updates immediately and commits once per drag.
    history.listen(seek, 'input', text('调整回放时间', 'Seek replay'), () => { stop(); index=Number(seek.value); draw(); });
    play.addEventListener('click', ()=>{ playing=!playing; if(playing && index===selected.frames.length-1) index=0; last=performance.now(); play.textContent=playing?text('暂停','Pause'):text('播放','Play'); });
    query('[data-reset]').addEventListener('click', ()=>{ history.run(text('回到回放开始', 'Reset replay'), ()=>{ stop(); index=0; draw(); }); });
    const tick = (now: number) => {
      if (!host.isConnected || !host.contains(play)) { scene?.dispose(); return; }
      if (playing && now-last>=20) { const steps=Math.floor((now-last)/20); index=Math.min(selected.frames.length-1,index+steps); last+=steps*20; draw(); if(index===selected.frames.length-1) stop(); }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }).catch(error => {
    host.innerHTML = `${STYLE}<div class="lab-error" role="alert"><h3>${text('实验数据无法读取', 'Evidence unavailable')}</h3><p>${text('页面未生成替代成功率。请确认 public/robotics-lab 中的 results.json 已由实验脚本生成，并检查浏览器网络请求。', 'No substitute results were generated. Run the experiment script and verify the results.json network response.')}</p><code></code></div>`;
    host.querySelector('code')!.textContent = String(error);
  });
}
