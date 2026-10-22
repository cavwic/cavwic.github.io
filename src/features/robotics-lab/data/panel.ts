import { audit, makeFixture, parseDataset, quarantine, isFrame, defaultRules, type Dataset, type Report } from './engine';
import { episodeSamples, extent, signalPath } from './plot';
import { createHistoryScope } from '../history';
export function mount(host:HTMLElement,locale:'zh'|'en'):void {
  const zh=locale==='zh',t=(a:string,b:string)=>zh?a:b;
  const esc=(v:unknown)=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
  let data:Dataset=makeFixture(),report:Report=audit(data),selected='',currentFixture='mixed',selectedSample=0;
  host.innerHTML=`<div class="lab-toolbar"><label>${t('输入样本','Input fixture')}<select id="data-case"><option value="mixed">${t('混合故障','Mixed faults')}</option><option value="clean">${t('无故障对照','Clean control')}</option><option value="timing">${t('时间异常','Timing faults')}</option><option value="signals">${t('信号异常','Signal faults')}</option><option value="leakage">${t('划分泄漏','Split leakage')}</option></select></label><label class="lab-button">${t('导入 JSON','Import JSON')}<input id="data-import" type="file" accept="application/json,.json" hidden/></label><button id="data-download">${t('导出诊断报告','Export report')}</button><button id="data-sample">${t('下载原始数据','Download data')}</button></div>
  <div id="data-message" role="status"></div><div class="lab-grid"><aside class="lab-controls"><h2>${t('检查规则','Check rules')}</h2><label>${t('预期采样周期','Nominal period')}<span><input id="data-period" type="number" min="1" max="1000" value="20"/> ms</span></label><label>${t('传感时间偏移阈值','Sensor offset limit')}<span><input id="data-lag" type="number" min="1" max="1000" value="35"/> ms</span></label><label>${t('查看 episode','Inspect episode')}<select id="data-episode"></select></label><p class="lab-note">${t('阈值是可修改的实验规则，不是通用机器人安全标准。原数据只读；隔离副本不会覆盖输入。','Thresholds are experiment rules, not universal safety limits. Inputs remain unchanged; quarantine creates a separate copy.')}</p><button id="data-quarantine">${t('导出隔离副本','Export quarantine copy')}</button></aside><div class="lab-stage"><h2>${t('时间与信号检查','Timing and signal evidence')}</h2><svg id="data-chart" class="lab-chart" viewBox="0 0 800 380" role="img" aria-label="${t('关节信号与时间偏移','Joint signal and timestamp offset')}"></svg><div class="lab-metrics" id="data-metrics"></div><p id="data-origin" class="lab-note"></p></div></div>
  <h3>${t('逐行检查结果','Row-level findings')}</h3><p class="lab-note">${t('同一行可能触发多条规则；“受影响行”按行号去重统计。时间偏移不直接等于网络延迟；采样缺口不直接等于视频掉帧。','A row may trigger multiple rules; affected rows are counted uniquely. Timestamp offsets are not measured network latency, and sample gaps are not proof of video loss.')}</p><div class="lab-table-wrap"><table class="lab-table"><thead><tr><th>${t('行 / episode','Row / episode')}</th><th>${t('规则','Rule')}</th><th>${t('观测值 / 阈值','Observed / limit')}</th><th>${t('证据','Evidence')}</th></tr></thead><tbody id="data-findings"></tbody></table></div><p id="data-count" class="lab-note"></p>
  <details><summary>${t('数据格式、方法与复现','Data contract, method and reproduction')}</summary><p>${t('每行是一条同步关节样本，单位固定为 ms、rad、A、°C；主键为 episodeId + timestampMs。检查完整性、复合键唯一性、时间顺序、采样间隔、关节速度、电流温度及跨划分重复。内容泄漏检查比较六位小数量化后的整段轨迹，匹配结果标记为疑似泄漏。','Each row is a synchronized joint sample in ms, rad, A and °C. Key: episodeId + timestampMs. Checks cover schema, unique keys, time order, gaps, velocity, current, temperature and cross-split duplication. Whole-trajectory matching is quantized to six decimals and flags possible leakage.')}</p><p>${t('浏览器导入规范 JSON；rosbag2/MCAP 需先用复现包中的离线适配脚本转换。不读取原始视频像素，不能检验图像语义与动作一致性。','The browser accepts canonical JSON. Convert rosbag2/MCAP with the offline adapter in the reproduction bundle. Raw video pixels are not inspected; visual-action consistency is not evaluated.')}</p><pre>{"version":1,"provenance":"your source","frames":[{"episodeId":"e1","split":"train","timestampMs":0,"sensorTimestampMs":-8,"commandTimestampMs":-5,"positionRad":[0],"commandRad":[0],"currentA":0.3,"temperatureC":28}]}</pre></details>`;
  const query=<T extends HTMLElement>(id:string)=>host.querySelector<T>(`#${id}`)!;
  const describeError=(error:unknown)=>{const message=error instanceof Error?error.message:String(error);return message==='Thresholds must be finite and positive'?t('采样周期和时间偏移阈值必须为大于 0 的有限数字。','Enter a positive, finite sampling period and timestamp limit.'):message;};
  const chart=query('data-chart');
  chart.setAttribute('viewBox','0 0 1000 500');
  const displayControls=document.createElement('div');displayControls.className='lab-toolbar lab-signal-toolbar';
  displayControls.innerHTML=`<label>${t('关节','Joint')}<select id="data-joint" aria-label="${t('选择关节','Select joint')}"></select></label><label>${t('横轴','X axis')}<select id="data-axis"><option value="time">${t('采样时间','Sample time')}</option><option value="order">${t('原始顺序','Acquisition order')}</option></select></label><span title="${t('显示所有结构有效的原始采样点，不平滑、不降采样。时间倒退和重复时间戳保留原顺序。','All valid-schema samples are shown without smoothing or downsampling. Clock reversals and duplicate timestamps remain in acquisition order.')}">${t('原始采样 · 未平滑','Raw samples · no smoothing')} ⓘ</span>`;
  chart.before(displayControls);
  const inspect=document.createElement('div');inspect.className='lab-signal-inspector';
  inspect.innerHTML=`<label>${t('逐帧检查','Inspect sample')}<input id="data-cursor" type="range" min="0" max="0" step="1" value="0"/></label><div id="data-sample-readout" aria-live="polite"></div>`;
  chart.after(inspect);
  type DataState = { data:Dataset; report:Report; selected:string; currentFixture:string; sample:number; period:string; lag:string; fixture:string; joint:string; axis:string; message:string; messageClass:string };
  const history=createHistoryScope<DataState>({
    // Datasets and reports are immutable after creation; retaining them avoids
    // copying an imported file for each cursor move or threshold edit.
    capture:()=>({data,report,selected,currentFixture,sample:selectedSample,period:query<HTMLInputElement>('data-period').value,lag:query<HTMLInputElement>('data-lag').value,fixture:query<HTMLSelectElement>('data-case').value,joint:query<HTMLSelectElement>('data-joint').value,axis:query<HTMLSelectElement>('data-axis').value,message:query('data-message').textContent??'',messageClass:query('data-message').className}),
    equals:(a,b)=>a.data===b.data&&JSON.stringify({...a,data:null,report:a.report.rules})===JSON.stringify({...b,data:null,report:b.report.rules}),
    restore:state=>{
      data=state.data;report=state.report;selected=state.selected;currentFixture=state.currentFixture;selectedSample=state.sample;
      // Render the retained valid report first, then restore any unfinished or
      // invalid rule edit without replacing the last valid dataset/report.
      query<HTMLInputElement>('data-period').value=String(state.report.rules.periodMs);
      query<HTMLInputElement>('data-lag').value=String(state.report.rules.maxSensorLagMs);
      render(data);
      query<HTMLInputElement>('data-period').value=state.period;query<HTMLInputElement>('data-lag').value=state.lag;
      render(data);
      query<HTMLSelectElement>('data-case').value=state.fixture;
      query<HTMLSelectElement>('data-joint').value=state.joint;query<HTMLSelectElement>('data-axis').value=state.axis;
      selectedSample=state.sample;draw();
      query('data-message').textContent=state.message;query('data-message').className=state.messageClass;
    },
  });
  const download=(name:string,value:unknown)=>{const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  function draw(){
    const f=episodeSamples(data.frames,selected),svg=query<SVGElement&HTMLElement>('data-chart');
    if(!f.length){svg.innerHTML='';query('data-sample-readout').textContent=t('没有可绘制的采样点','No samples to plot');return;}
    const joint=Number(query<HTMLSelectElement>('data-joint').value)||0,byTime=query<HTMLSelectElement>('data-axis').value==='time';
    const [xMin,xMax]=byTime?extent(f.map(v=>v.frame.timestampMs),1):[-.5,Math.max(.5,f.length-.5)];
    const [qMin,qMax]=extent(f.flatMap(v=>[v.frame.positionRad[joint],v.frame.commandRad[joint]]),.1);
    const lag=(v:typeof f[number])=>v.frame.timestampMs-v.frame.sensorTimestampMs;
    const commandLag=(v:typeof f[number])=>v.frame.timestampMs-v.frame.commandTimestampMs;
    const [lMin,lMax]=extent([0,report.rules.maxSensorLagMs,report.rules.maxCommandLagMs,...f.flatMap(v=>[lag(v),commandLag(v)])],10);
    const xs=(v:typeof f[number],i:number)=>78+((byTime?v.frame.timestampMs:i)-xMin)/(xMax-xMin)*884;
    const qy=(v:number)=>218-(v-qMin)/(qMax-qMin)*165,ly=(v:number)=>421-(v-lMin)/(lMax-lMin)*145;
    const fmt=(v:number)=>Math.abs(v)<10?v.toFixed(2):v.toFixed(0);
    const ticks=(min:number,max:number,y:(v:number)=>number)=>Array.from({length:5},(_,i)=>{const v=min+(max-min)*i/4;return `<path d="M78 ${y(v)}H962" stroke="var(--line)" stroke-dasharray="3 5"/><text x="66" y="${y(v)+4}" text-anchor="end" fill="var(--ink-soft)" font-size="12">${fmt(v)}</text>`}).join('');
    const xTicks=Array.from({length:6},(_,i)=>{const x=78+i*884/5,value=xMin+(xMax-xMin)*i/5;return `<path d="M${x} 53V421" stroke="var(--line)" stroke-dasharray="3 5"/><text x="${x}" y="447" text-anchor="middle" fill="var(--ink-soft)" font-size="12">${value.toFixed(0)}</text>`}).join('');
    const issues=report.issues.filter(i=>i.episode===selected),byRow=new Map<number,string[]>();
    for(const issue of issues){const codes=byRow.get(issue.row)??[];codes.push(issue.code);byRow.set(issue.row,codes);}
    const marks=f.map((v,i)=>byRow.has(v.row)?`<path d="M${xs(v,i)} 53V421" stroke="var(--lab-red)" opacity=".20" stroke-width="4"><title>${esc(byRow.get(v.row)!.join(', '))}</title></path>`:'').join('');
    selectedSample=Math.max(0,Math.min(f.length-1,selectedSample));const active=f[selectedSample],cursor=xs(active,selectedSample);
    const series=(get:(v:typeof f[number])=>number|undefined,y:(v:number)=>number)=>signalPath(f,get,xs,y);
    svg.innerHTML=`${xTicks}${ticks(qMin,qMax,qy)}${ticks(lMin,lMax,ly)}${marks}<path d="${series(v=>v.frame.positionRad[joint],qy)}" fill="none" stroke="var(--lab-blue)" stroke-width="2.5"/><path d="${series(v=>v.frame.commandRad[joint],qy)}" fill="none" stroke="var(--lab-green)" stroke-width="2" stroke-dasharray="6 4"/><path d="${series(lag,ly)}" fill="none" stroke="var(--lab-orange)" stroke-width="2"/><path d="${series(commandLag,ly)}" fill="none" stroke="var(--lab-green)" stroke-width="1.5" stroke-dasharray="3 4"/><path d="M78 ${ly(report.rules.maxSensorLagMs)}H962" stroke="var(--lab-red)" stroke-dasharray="6 5"/><path d="M78 ${ly(report.rules.maxCommandLagMs)}H962" stroke="var(--lab-green)" stroke-dasharray="6 5" opacity=".6"/><path d="M${cursor} 48V426" stroke="var(--ink)" stroke-width="1.5" opacity=".7"/>${active.frame.positionRad[joint]===undefined?'':`<circle cx="${cursor}" cy="${qy(active.frame.positionRad[joint])}" r="5" fill="var(--lab-blue)" stroke="var(--surface)" stroke-width="2"/>`}<g fill="var(--ink)" font-size="14"><text x="78" y="25">${t(`关节 ${joint} · 观测 / 指令（虚线），rad`,`Joint ${joint} · observed / command (dashed), rad`)}</text><text x="78" y="255">${t('时间偏移 · 传感 / 指令（虚线），ms','Timestamp offset · sensor / command (dashed), ms')}</text><text x="962" y="25" text-anchor="end" fill="var(--lab-red)" font-size="12">${t('红带：异常行','Red bands: flagged rows')}</text><text x="78" y="477" font-size="12">${byTime?t('采样时间，ms · 按原始顺序连接','Sample time, ms · connected in acquisition order'):t('episode 内有效采样序号','Valid sample index within episode')}</text><text x="962" y="477" text-anchor="end" font-size="12">${f.length} ${t('原始采样点','raw samples')}</text></g>`;
    // SVG is scaled with its container; keep annotations readable at laptop widths.
    svg.querySelectorAll('text').forEach(text=>text.setAttribute('font-size',text.parentElement?.tagName.toLowerCase()==='g'&&!text.hasAttribute('font-size')?'23':'20'));
    query<HTMLInputElement>('data-cursor').max=String(f.length-1);query<HTMLInputElement>('data-cursor').value=String(selectedSample);
    const frame=active.frame,values=[[t('原始行','Source row'),String(active.row+1)],[t('时间','Time'),`${frame.timestampMs.toFixed(1)} ms`],[t('观测 / 指令','Observed / command'),`${frame.positionRad[joint]?.toFixed(4)??'—'} / ${frame.commandRad[joint]?.toFixed(4)??'—'} rad`],[t('传感 / 指令偏移','Sensor / command offset'),`${lag(active).toFixed(1)} / ${commandLag(active).toFixed(1)} ms`],[t('电流 / 温度','Current / temperature'),`${frame.currentA.toFixed(3)} A / ${frame.temperatureC.toFixed(1)} °C`]];
    query('data-sample-readout').innerHTML=values.map(([label,value])=>`<div><span>${label}</span><strong>${value}</strong></div>`).join('');
  }
  function render(candidate:Dataset=data){
    const period=Number(query<HTMLInputElement>('data-period').value),lag=Number(query<HTMLInputElement>('data-lag').value);
    try{const nextReport=audit(candidate,{...defaultRules,periodMs:period,maxSensorLagMs:lag});data=candidate;report=nextReport;query('data-message').textContent='';query('data-message').className='';for(const id of ['data-download','data-quarantine','data-sample'])query<HTMLButtonElement>(id).disabled=false;}catch(error){query('data-message').className='lab-error';query('data-message').textContent=t('保留上一组数据和报告；请修正阈值后再导出：','Previous dataset and report retained. Correct thresholds before exporting: ')+describeError(error);for(const id of ['data-download','data-quarantine','data-sample'])query<HTMLButtonElement>(id).disabled=true;return false;}
    const ids=[...new Set(data.frames.filter(isFrame).map(f=>f.episodeId))];if(!ids.includes(selected))selected=ids[0]??'';
    query<HTMLSelectElement>('data-episode').innerHTML=ids.map(id=>`<option value="${esc(id)}" ${id===selected?'selected':''}>${esc(id)}</option>`).join('');
    query('data-metrics').innerHTML=[[t('输入行数','Rows'),report.rows],[t('结构有效行','Valid-schema rows'),report.validRows],[t('受影响行','Affected rows'),report.affectedRows],[t('受影响比例','Affected share'),`${(report.affectedRate*100).toFixed(1)}%`]].map(([l,v])=>`<div><span>${l}</span><strong>${v}</strong></div>`).join('');
    query('data-origin').textContent=data.provenance;
    const items=report.issues.filter(i=>i.episode===selected||i.episode==='?');
    query('data-findings').innerHTML=items.length?items.slice(0,100).map(i=>`<tr><td>${i.row+1} / ${esc(i.episode)}</td><td>${esc(i.code)}<br/><small>${esc(i.severity)}</small></td><td>${i.value===null?'—':i.value.toFixed(2)} / ${i.limit??'—'}</td><td>${esc(i.detail)}</td></tr>`).join(''):`<tr><td colspan="4">${t('本 episode 未触发已配置规则，但仍可能存在其他数据质量风险。','No configured rule triggered in this episode; other quality risks may remain.')}</td></tr>`;
    const previousJoint=query<HTMLSelectElement>('data-joint').value;
    const dimensions=Math.max(1,...episodeSamples(data.frames,selected).map(v=>v.frame.positionRad.length));
    query('data-joint').innerHTML=Array.from({length:dimensions},(_,i)=>`<option value="${i}">${t('关节','Joint')} ${i}</option>`).join('');
    query<HTMLSelectElement>('data-joint').value=String(Math.min(dimensions-1,Number(previousJoint)||0));
    query('data-count').textContent=t(`当前 episode ${items.length} 条异常，最多显示100条；全数据共 ${report.issues.length} 条，涉及 ${report.flaggedRows} 行。受影响行包含疑似泄漏的整段 episode，表示建议隔离复核的范围，不代表这些行都已确认有误。`,`Selected episode: ${items.length} findings, showing up to 100; dataset total: ${report.issues.length} at ${report.flaggedRows} anchor rows. Affected rows include whole suspected-leak episodes for quarantine review, not confirmed errors in every row.`);draw();return true;
  }
  const importedOption=document.createElement('option');importedOption.value='imported';importedOption.textContent=t('已导入文件','Imported file');importedOption.disabled=true;query('data-case').append(importedOption);
  history.listen(query('data-case'),'change',t('切换输入样本','Change input fixture'),()=>{const choice=query<HTMLSelectElement>('data-case').value;if(render(makeFixture(choice)))currentFixture=choice;else query<HTMLSelectElement>('data-case').value=currentFixture;});
  history.listen(query('data-period'),'input',t('调整采样周期','Change sampling period'),()=>render());
  history.listen(query('data-lag'),'input',t('调整时间偏移阈值','Change timestamp limit'),()=>render());
  history.listen(query('data-episode'),'change',t('切换数据回合','Change data episode'),()=>{selected=query<HTMLSelectElement>('data-episode').value;selectedSample=0;render();});
  history.listen(query('data-joint'),'change',t('切换关节','Change inspected joint'),draw);
  history.listen(query('data-axis'),'change',t('切换横轴','Change plot axis'),draw);
  history.listen(query('data-cursor'),'input',t('移动逐帧游标','Move sample cursor'),()=>{selectedSample=Number(query<HTMLInputElement>('data-cursor').value);draw();});
  query('data-download').addEventListener('click',()=>download('robot-data-audit.json',report));query('data-sample').addEventListener('click',()=>download('robot-data-input.json',data));
  query('data-quarantine').addEventListener('click',()=>{const q=quarantine(data,report);download('robot-data-quarantine.json',{...q.dataset,quarantine:{removed:q.removed,originalIndices:q.indices,rules:report.rules}});});
  query('data-import').addEventListener('change',()=>{const file=query<HTMLInputElement>('data-import').files?.[0];if(!file)return;void history.run(t('导入数据文件','Import dataset'),async()=>{try{if(file.size>8_000_000)throw Error('8 MB limit');const candidate=parseDataset(await file.text());if(render(candidate)){currentFixture='imported';query<HTMLSelectElement>('data-case').value='imported';}}catch(error){query('data-message').className='lab-error';query('data-message').textContent=t('导入失败，保留之前的数据：','Import failed; previous input retained: ')+String(error);}query<HTMLInputElement>('data-import').value='';});});render();history.reset();
}
