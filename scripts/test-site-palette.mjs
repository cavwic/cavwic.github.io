import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const css=read('src/styles/global.css');
const tokens=block=>Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[\da-f]{3,6})\s*;/gi)].map(([,key,value])=>[key,value]));
const light=tokens(css.match(/:root\s*\{([^}]+)\}/)[1]);
const dark={...light,...tokens(css.match(/html\[data-theme="dark"\]\s*\{([^}]+)\}/)[1])};
const hand=read('src/components/HandRetargetingLab.astro');
const handLight=tokens(hand.match(/:root\s*\{([^}]+)\}/)[1]);
const handDark={...handLight,...tokens(hand.match(/html\[data-theme=dark\]\s*\{([^}]+)\}/)[1])};
const withoutComments=css.replace(/\/\*[\s\S]*?\*\//g,'');
const declarations=block=>Object.fromEntries([...block.matchAll(/([\w-]+)\s*:\s*([^;{}]+)\s*;?/g)].map(([,key,value])=>[key,value.trim()]));
const rules=[...withoutComments.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([,selector,body])=>({selector:selector.trim(),declarations:declarations(body)}));
// Split only top-level commas so :is(...) selectors remain a single selector.
const selectorList=selector=>{let depth=0,start=0,result=[];for(let i=0;i<selector.length;i++){if(selector[i]==='('||selector[i]==='[')depth++;if(selector[i]===')'||selector[i]===']')depth--;if(selector[i]===','&&depth===0){result.push(selector.slice(start,i).trim());start=i+1;}}result.push(selector.slice(start).trim());return result;};
const declarationFor=selector=>Object.assign({},...rules.filter(rule=>selectorList(rule.selector).includes(selector)).map(rule=>rule.declarations));
const resolveColor=(value,palette)=>{
  if(!value)throw new Error('Missing color declaration');
  const result=value.replace(/var\(--([\w-]+)\)/g,(_,key)=>{assert(palette[key],`Defined color token: ${key}`);return palette[key]});
  assert(/^#[\da-f]{3,6}$/i.test(result),`Expected an opaque theme color, received ${result}`);
  return result;
};
const rgb=hex=>{let v=hex.slice(1);if(v.length===3)v=[...v].map(c=>c+c).join('');return v.match(/../g).map(c=>parseInt(c,16)/255)};
const luminance=hex=>rgb(hex).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>{const values=[luminance(a),luminance(b)].sort((a,b)=>b-a);return(values[0]+.05)/(values[1]+.05)};
const composite=(value,background)=>{
  if(/^#[\da-f]{3,6}$/i.test(value))return value;
  const rgba=value.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([.\d]+)\s*\)$/);
  assert(rgba,`Expected rgba background, received ${value}`);
  const alpha=Number(rgba[4]);
  return '#'+rgb(background).map((base,i)=>Math.round(Number(rgba[i+1])*alpha+base*255*(1-alpha)).toString(16).padStart(2,'0')).join('');
};
const mix=(foreground,background,amount)=>'#'+rgb(background).map((base,i)=>Math.round((rgb(foreground)[i]*amount+base*(1-amount))*255).toString(16).padStart(2,'0')).join('');

for(const [name,palette,reference] of [['light',light,handLight],['dark',dark,handDark]]){
  for(const [site,lab] of [['paper','rt-paper'],['surface','rt-surface'],['ink','rt-ink'],['ink-soft','rt-muted'],['line','rt-line'],['signal','rt-blue']])assert.deepEqual(rgb(palette[site]),rgb(reference[lab]),`${name}: ${site} matches retargeting`);
  // Semantics retain distinct colors; only their text readability is constrained.
  // This intentionally does not scan RGB colors in charts, physics or status data.
  const pairs=['ink','ink-soft','signal','teal','gold','orange'].flatMap(fg=>['paper','paper-deep','surface'].map(bg=>[fg,bg]));
  pairs.push(['on-signal','signal'],['on-signal','signal-hover'],['on-teal','teal'],['white','panel-inverse'],['inverse-accent','panel-inverse'],['inverse-muted','panel-inverse']);
  for(const [fg,bg] of pairs){
    const ratio=contrast(palette[fg],palette[bg]);assert(ratio>=4.5,`${name}: ${fg}/${bg} ${ratio.toFixed(2)} < 4.5`);
  }
  // Filled buttons must use an explicit, theme-aware foreground. White on the
  // pale blue / teal dark-theme fills would fail even though light mode passes.
  for(const [selector,background] of [['.button-primary','signal'],['.catalog-item:hover','teal'],['.catalog-item-accent:hover','signal'],['.landscape-route a:hover','teal'],['.deliverable-grid > a:hover','teal'],['.company-history-filters button:hover','teal'],['.filter-buttons button.active','teal']]){
    const rule=declarationFor(selector);
    const ratio=contrast(resolveColor(rule.color,palette),palette[background]);
    assert(ratio>=4.5,`${name}: ${selector} label/fill ${ratio.toFixed(2)} < 4.5`);
    assert.equal(resolveColor(rule.background,palette),palette[background],`${name}: ${selector} uses expected fill`);
  }
  for(const selector of ['.hero .button-primary','.hero .button-primary:hover']){
    const rule=declarationFor(selector);
    const base=declarationFor('.hero .button-primary');
    const fill=resolveColor(rule.background||base.background,palette);
    const foreground=resolveColor(rule.color||base.color,palette);
    const textRatio=contrast(foreground,fill);
    const boundaryRatio=contrast(fill,palette['panel-inverse']);
    assert(textRatio>=4.5,`${name}: ${selector} text/fill ${textRatio.toFixed(2)} < 4.5`);
    assert(boundaryRatio>=3,`${name}: ${selector} fill/inverse section ${boundaryRatio.toFixed(2)} < 3`);
  }
  for(const selector of ['.button-quiet','.button-quiet:hover','.button-quiet.resume-link-pending','.button-quiet.resume-link-pending:hover']){
    const base=declarationFor('.button-quiet');
    const rule={...base,...declarationFor(selector)};
    const foreground=resolveColor(rule.color,palette);
    const fill=composite(rule.background,palette['panel-inverse']);
    const ratio=contrast(foreground,fill);
    assert(ratio>=4.5,`${name}: ${selector} readable against inverse backdrop ${ratio.toFixed(2)} < 4.5`);
  }
  const inverseEyebrow=declarationFor(':is(.page-head, .distribution-band, .boundary-band, .not-found) .eyebrow');
  const inverseRatio=contrast(resolveColor(inverseEyebrow.color,palette),palette['panel-inverse']);
  assert(inverseRatio>=4.5,`${name}: inverse eyebrow ${inverseRatio.toFixed(2)} < 4.5`);
  const placeholder=declarationFor('input::placeholder');
  assert.equal(placeholder.opacity,'1','Placeholder foreground must not be faded by extra opacity');
  for(const bg of ['paper','paper-deep','surface'])assert(contrast(resolveColor(placeholder.color,palette),palette[bg])>=4.5,`${name}: placeholder/${bg}`);
  // The company/story cards have tinted surfaces, not plain paper-deep. Muted
  // labels passed on paper but were only 3.9:1 on these actual light-mode fills.
  const storyLabel=resolveColor(declarationFor('.company-product-story-step small').color,palette);
  for(const [accent,amount] of [['signal',.10],['teal',.12],['ink',.08]]){
    const fill=mix(palette[accent],palette['paper-deep'],amount);
    assert(contrast(storyLabel,fill)>=4.5,`${name}: story label on ${accent} tinted card`);
  }
  assert(/\.tool-story-steps small\s*\{[^}]*color:\s*var\(--ink\)/.test(read('src/components/RoboDict.astro')),'Tool company story labels use the same readable foreground');
  const privacyBase=declarationFor('.privacy-button');
  const privacyDisabled=declarationFor('.privacy-button:disabled');
  const disabledRatio=contrast(resolveColor(privacyDisabled.color,palette),resolveColor(privacyBase.background,palette));
  assert(disabledRatio>=4.5,`${name}: disabled privacy control remains legible ${disabledRatio.toFixed(2)} < 4.5`);
  assert.equal(Number(privacyDisabled.opacity),1,'Disabled privacy control does not fade its whole text/background layer');
  assert.equal(privacyDisabled['border-style'],'dashed','Disabled state is identifiable without sacrificing text contrast');
  console.log(`PASS ${name}: reference tokens match; ${pairs.length} text/action pairs and 7 actual filled-control rules >=4.5:1`);
  console.log(`PASS ${name}: always-dark hero CTA default/hover, quiet/pending states, inverse eyebrow and legible disabled privacy control`);
}
for(const file of ['BaseLayout','ToolAppLayout','RepositoryLayout']){
  const source=read(`src/layouts/${file}.astro`);
  assert(source.includes('#edf2f7')&&source.includes('#102031'),`${file}: browser theme colors`);
  assert(!/#f1f4ef|#181c1b/.test(source),`${file}: no stale browser color`);
}
// Compare actual usages to declarations. var(--cyan) previously silently dropped
// the second company-story card background because no such token existed.
const declared=new Set([...withoutComments.matchAll(/--([\w-]+)\s*:/g)].map(([,key])=>key));
const localOrRuntime=new Set(['landscape-columns']);
for(const [,key] of withoutComments.matchAll(/var\(--([\w-]+)(?:\s*[,\)])/g))assert(declared.has(key)||localOrRuntime.has(key),`CSS variable --${key} is declared or explicitly supplied by markup`);
// Do not blanket-ban red/green: semantic status tokens are intentional and
// independent of the brand palette, as are visualizer and plot data colors.
const brandRules=withoutComments.replace(/--(?:teal|gold|orange|success|warning|danger|error)[\w-]*\s*:[^;]+;/g,'');
assert(!/#e24a32|#ff6850|#181c1b|#f1f4ef/i.test(brandRules),'No old brand palette remains outside semantic declarations');
assert(!/#d8dad8|rgba\(\s*9\s*,\s*12\s*,\s*11\b|rgba\(\s*10\s*,\s*12\s*,\s*12\b/i.test(brandRules),'No stale green-neutral placeholders, shadows or quiet-button backgrounds');
const home=read('src/pages/index.astro');
assert(home.includes('从需求分析到方案交付')&&home.includes('方案与研究成果'),'Chinese home headings use the approved natural wording');
assert(!home.includes('从需求到交付，不在演示结束处停住')&&!home.includes('招聘方可以直接检查的交付物'),'Awkward original headings removed');
console.log('PASS shared palette and browser chrome color contract. This is not pixel or full-site accessibility certification.');
