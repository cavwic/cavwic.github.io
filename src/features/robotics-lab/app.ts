import type { Locale } from './catalog';
const locale: Locale = document.documentElement.dataset.locale === 'en' ? 'en' : 'zh';
const theme = document.getElementById('robotics-theme');
theme?.addEventListener('click', () => {
  const value = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = value;
  document.documentElement.dataset.preference = value;
  try { localStorage.setItem('cavwic-theme', value); } catch {}
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{
  if(document.documentElement.dataset.preference==='system') document.documentElement.dataset.theme=e.matches?'dark':'light';
});
type Panel = { mount(host: HTMLElement, locale: Locale): void };
// The overview and data-only page do not need to download a 3D renderer.
const panels: Record<string, () => Promise<Panel>> = {
  control: () => import('./control/panel'), safety: () => import('./safety/panel'),
  grasp: () => import('./grasp/panel'), tactile: () => import('./tactile/panel'),
  data: () => import('./data/panel'), imitation: () => import('./imitation/panel'),
  randomization: () => import('./randomization/panel'),
};
const host = document.getElementById('robotics-panel');
if(host){
  void (async () => {
    try { const load=panels[host.dataset.project ?? '']; if(!load)throw Error('Unknown experiment'); const {mount}=await load(); if(host.isConnected)mount(host,locale); }
    catch(error){const p=document.createElement('p');p.className='lab-error';p.textContent=`${locale==='zh'?'实验加载失败：':'Experiment failed: '}${error instanceof Error?error.message:String(error)}`;if(host.isConnected)host.replaceChildren(p);}
  })();
}
