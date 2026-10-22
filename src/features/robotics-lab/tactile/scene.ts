import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { createStudio } from '../visuals/studio';

/** Presentation only: the experiment has one scalar contact, not tactile taxels. */
export function createTactileScene(host:HTMLElement, locale:'zh'|'en') {
  const zh=locale==='zh';
  const studio=createStudio(host,{locale,label:zh?'双指接触示意':'Two-pad contact',target:[0,.21,0],camera:[.51,.44,.62],span:.5,height:390});
  if(!studio)return null;
  const root=studio.content;
  const silver=new THREE.MeshStandardMaterial({color:0xb8c7ce,metalness:.8,roughness:.27});
  const dark=new THREE.MeshStandardMaterial({color:0x293d48,metalness:.58,roughness:.33});
  const rubber=new THREE.MeshStandardMaterial({color:0x258e9c,metalness:.04,roughness:.67});
  const fastener=new THREE.MeshStandardMaterial({color:0x788d99,metalness:.88,roughness:.2});
  const cyan=new THREE.MeshStandardMaterial({color:0x42c3ce,metalness:.48,roughness:.3});
  const objectMaterial=new THREE.MeshStandardMaterial({color:0x7f9daa,metalness:.6,roughness:.28});
  const padMaterials=[rubber.clone(),rubber.clone()];
  const box=(w:number,h:number,d:number,mat:THREE.Material,x:number,y:number,z:number,r=.003)=>{
    const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,3,r),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh;
  };
  const cylinder=(radius:number,height:number,mat:THREE.Material,x:number,y:number,z:number)=>{
    const mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,height,40),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh;
  };
  // Machined base, split actuator body, and genuinely separate guide components.
  box(.3,.018,.22,dark,0,.015,0,.006);
  box(.23,.01,.16,silver,0,.029,0,.003);
  for(const x of [-.113,.113])for(const z of [-.073,.073]){
    cylinder(.007,.004,fastener,x,.037,z);
    const socket=new THREE.Mesh(new THREE.CylinderGeometry(.003,.003,.001,6),dark);socket.position.set(x,.0396,z);root.add(socket);
  }
  box(.043,.29,.052,silver,-.115,.183,-.047,.004);
  box(.043,.29,.052,silver,.115,.183,-.047,.004);
  for(const x of [-.115,.115]){
    box(.018,.235,.009,dark,x,.183,-.016,.001);
    box(.007,.235,.004,fastener,x,.183,-.009,.001);
    for(const y of [.084,.18,.275])cylinder(.004,.004,fastener,x,y,-.002).rotation.x=Math.PI/2;
  }
  box(.29,.056,.083,dark,0,.35,-.041,.005);
  box(.135,.03,.028,silver,0,.35,.012,.003);
  for(const x of [-.032,.032]){
    const rod=cylinder(.004,.082,fastener,x,.302,.008);rod.rotation.z=Math.PI/2;
  }
  // Independent pad backing plates and continuous soft pads; never a fake taxel grid.
  for(let j=0;j<2;j++){
    const sign=j?1:-1;
    box(.021,.113,.07,silver,sign*.058,.267,.008,.003);
    box(.009,.105,.065,dark,sign*.043,.267,.008,.002);
    box(.014,.094,.059,padMaterials[j],sign*.031,.267,.008,.006);
    for(const y of [.23,.305]){
      const bolt=cylinder(.004,.003,fastener,sign*.058,y,.045);bolt.rotation.x=Math.PI/2;
    }
    // Cast insert backing, not measured surface pressure cells.
    box(.004,.062,.038,cyan,sign*.0219,.267,.008,.001);
  }
  const object=new THREE.Group();root.add(object);
  const payload=new THREE.Mesh(new RoundedBoxGeometry(.041,.17,.045,4,.005),objectMaterial);payload.castShadow=true;payload.receiveShadow=true;object.add(payload);
  for(const y of [-.065,.065]){
    const band=new THREE.Mesh(new RoundedBoxGeometry(.042,.006,.046,3,.0015),silver);band.position.y=y;object.add(band);
  }
  const grooveMaterial=new THREE.MeshStandardMaterial({color:0x38505e,metalness:.65,roughness:.4});
  for(const y of [-.038,-.012,.014,.04]){
    const groove=new THREE.Mesh(new RoundedBoxGeometry(.027,.0012,.0012,2,.0004),grooveMaterial);groove.position.set(0,y,.0231);object.add(groove);
  }
  const left=new THREE.ArrowHelper(new THREE.Vector3(1,0,0),new THREE.Vector3(-.118,.267,.067),.065,0x2bbbc8,.012,.007);
  const right=new THREE.ArrowHelper(new THREE.Vector3(-1,0,0),new THREE.Vector3(.118,.267,.067),.065,0x2bbbc8,.012,.007);
  root.add(left,right);
  // The 80 mm visual budget is a scale, not a physical drop animation.
  const guide=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(.087,.267,.061),new THREE.Vector3(.087,.187,.061)]);
  root.add(new THREE.Line(guide,new THREE.LineBasicMaterial({color:0x8ca0ad,transparent:true,opacity:.65})));
  const ticks=new THREE.Group();root.add(ticks);
  for(let i=0;i<=4;i++){
    const g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(.083,.267-i*.02,.061),new THREE.Vector3(.092,.267-i*.02,.061)]);
    ticks.add(new THREE.Line(g,new THREE.LineBasicMaterial({color:0x8ca0ad})));
  }
  const marker=new THREE.Mesh(new THREE.SphereGeometry(.0035,20,12),cyan);root.add(marker);
  const cold=new THREE.Color(0x267d90),hot=new THREE.Color(0xe99c49),failed=new THREE.Color(0xbf535c),nominal=new THREE.Color(0x7f9daa);
  return {
    update(normalForce:number,displacement:number,alarm:boolean){
      const fraction=THREE.MathUtils.clamp((normalForce-2.8)/(9-2.8),0,1);
      const exceeded=displacement>.08;
      // The numeric readout remains unbounded. Geometry stops at the failure budget.
      object.position.set(0,.267-Math.max(0,Math.min(.08,displacement)),.008);
      objectMaterial.color.copy(exceeded?failed:nominal);
      for(const mat of padMaterials)mat.color.copy(cold).lerp(hot,fraction);
      const length=.038+.036*fraction;
      left.setLength(length,.01,.006);right.setLength(length,.01,.006);
      left.setColor(alarm?0xe99c49:0x2bbbc8);right.setColor(alarm?0xe99c49:0x2bbbc8);
      marker.position.set(.087,object.position.y,.061);
      studio.requestRender();
    },
    dispose:()=>studio.dispose(),
  };
}
