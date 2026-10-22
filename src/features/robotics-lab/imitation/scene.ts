import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { createStudio } from '../visuals/studio';

/** A presentation fixture for the recorded 2D task, not a trained arm model. */
export function createImitationScene(host:HTMLElement,locale:'zh'|'en') {
  const zh=locale==='zh';
  const studio=createStudio(host,{locale,label:zh?'XY 平台轨迹':'XY stage trajectory',target:[0,.22,0],camera:[1.22,1.09,1.35],span:1.56,height:420});
  if(!studio)return null;
  const root=studio.content;
  // This factor fits task units to a display fixture. It is not a metres conversion.
  const displayScale=.38;
  const silver=new THREE.MeshStandardMaterial({color:0xbac9cf,metalness:.83,roughness:.24});
  const graphite=new THREE.MeshStandardMaterial({color:0x2c414c,metalness:.65,roughness:.38});
  const railMaterial=new THREE.MeshStandardMaterial({color:0x8da6b5,metalness:.94,roughness:.19});
  const teal=new THREE.MeshStandardMaterial({color:0x2599aa,metalness:.52,roughness:.31});
  const screwMaterial=new THREE.MeshStandardMaterial({color:0x4b6471,metalness:.93,roughness:.22});
  const amber=new THREE.MeshStandardMaterial({color:0xd28b45,metalness:.52,roughness:.29});
  const box=(w:number,h:number,d:number,mat:THREE.Material,x:number,y:number,z:number,r=.005,parent:THREE.Group=root)=>{
    const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,3,r),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
  };
  const cylinder=(r:number,h:number,mat:THREE.Material,x:number,y:number,z:number,parent:THREE.Group=root)=>{
    const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,36),mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
  };
  box(1.18,.055,1.13,graphite,0,.052,0,.012);
  box(1.11,.025,1.065,silver,0,.091,0,.005);
  box(.945,.006,.945,graphite,0,.107,0,.002);
  for(const x of [-.48,.48])for(const z of [-.46,.46]){
    cylinder(.023,.033,graphite,x,.016,z);
    cylinder(.009,.004,screwMaterial,x,.107,z);
  }
  // T-slots in the fixed tooling bed, distinct from the moving linear guides.
  for(let i=-5;i<=5;i++)box(.0016,.0008,.9,railMaterial,i*.082,.111,0,.0003);
  for(let i=-5;i<=5;i++)box(.9,.0008,.0016,railMaterial,0,.111,i*.082,.0003);
  for(const x of [-.535,.535]){
    box(.031,.038,1.02,graphite,x,.131,0,.003);
    box(.014,.011,.975,railMaterial,x,.156,0,.001);
    for(const z of [-.4,-.2,0,.2,.4])cylinder(.004,.002,screwMaterial,x,.163,z);
    // Terminal bearing blocks and motor couplings are stationary.
    for(const z of [-.515,.515])box(.045,.06,.04,silver,x,.145,z,.004);
  }
  const gantry=new THREE.Group();root.add(gantry);
  for(const x of [-.535,.535]){
    box(.06,.05,.108,teal,x,.189,0,.004,gantry);
    box(.045,.107,.055,silver,x,.252,0,.004,gantry);
    for(const z of [-.035,.035])cylinder(.0045,.002,screwMaterial,x,.216,z,gantry);
  }
  box(1.13,.063,.071,silver,0,.315,0,.004,gantry);
  box(1.04,.019,.008,graphite,0,.317,.041,.001,gantry);
  box(1.03,.008,.008,railMaterial,0,.329,.047,.001,gantry);
  box(1.03,.008,.008,railMaterial,0,.304,.047,.001,gantry);
  box(.08,.073,.083,graphite,-.598,.315,0,.005,gantry);
  cylinder(.018,.032,railMaterial,-.641,.315,0,gantry).rotation.z=Math.PI/2;
  const carriage=new THREE.Group();gantry.add(carriage);
  box(.102,.086,.032,teal,0,.315,.062,.005,carriage);
  box(.066,.079,.041,graphite,0,.249,.061,.004,carriage);
  cylinder(.025,.065,silver,0,.215,.061,carriage);
  cylinder(.013,.028,graphite,0,.17,.061,carriage);
  const tip=new THREE.Mesh(new THREE.ConeGeometry(.009,.036,32),amber);tip.position.set(0,.138,.061);tip.rotation.z=Math.PI;tip.castShadow=true;carriage.add(tip);
  for(const x of [-.032,.032])for(const y of [.29,.34]){
    const bolt=cylinder(.004,.003,screwMaterial,x,y,.080,carriage);bolt.rotation.x=Math.PI/2;
  }
  const target=new THREE.Mesh(new THREE.TorusGeometry(1,.035,8,80),new THREE.MeshBasicMaterial({color:0x30b4a8,transparent:true,opacity:.9}));target.rotation.x=-Math.PI/2;root.add(target);
  const cross=new THREE.Group();root.add(cross);
  const crossMaterial=new THREE.MeshBasicMaterial({color:0x30b4a8});
  box(.028,.0015,.002,crossMaterial,0,0,0,.0004,cross);
  box(.002,.0015,.028,crossMaterial,0,0,0,.0004,cross);
  const start=new THREE.Mesh(new THREE.RingGeometry(.006,.009,40),new THREE.MeshBasicMaterial({color:0xc76570,side:THREE.DoubleSide}));start.rotation.x=-Math.PI/2;root.add(start);
  // Allocate trajectory buffers once; episode changes only replace coordinates.
  const pointCapacity=512;
  const coordinates=new Float32Array(pointCapacity*3);
  const trajectoryGeometry=new THREE.BufferGeometry();trajectoryGeometry.setAttribute('position',new THREE.BufferAttribute(coordinates,3));
  const fullPath=new THREE.Line(trajectoryGeometry,new THREE.LineBasicMaterial({color:0x509aac,transparent:true,opacity:.24}));root.add(fullPath);
  const travelledGeometry=new THREE.BufferGeometry();travelledGeometry.setAttribute('position',new THREE.BufferAttribute(coordinates,3));
  const travelled=new THREE.Line(travelledGeometry,new THREE.LineBasicMaterial({color:0x25b8ce}));root.add(travelled);
  const current=new THREE.Mesh(new THREE.RingGeometry(.008,.013,32),new THREE.MeshBasicMaterial({color:0xe7ad62,side:THREE.DoubleSide}));current.rotation.x=-Math.PI/2;root.add(current);
  let path:number[][]=[];
  return {
    setEpisode(nextPath:number[][],origin:number[],goal:number[],radius:number){
      path=nextPath;
      const count=Math.min(path.length,pointCapacity);
      for(let i=0;i<count;i++){
        coordinates[i*3]=path[i][0]*displayScale;
        coordinates[i*3+1]=.115;
        coordinates[i*3+2]=-path[i][1]*displayScale;
      }
      trajectoryGeometry.getAttribute('position').needsUpdate=true;travelledGeometry.getAttribute('position').needsUpdate=true;
      trajectoryGeometry.setDrawRange(0,count);trajectoryGeometry.computeBoundingSphere();travelledGeometry.computeBoundingSphere();
      target.position.set(goal[0]*displayScale,.116,-goal[1]*displayScale);target.scale.setScalar(radius*displayScale);
      cross.position.set(target.position.x,.118,target.position.z);
      start.position.set(origin[0]*displayScale,.116,-origin[1]*displayScale);
    },
    update(index:number){
      const point=path[index];if(!point)return;
      const x=point[0]*displayScale,z=-point[1]*displayScale;
      // The nozzle offset is compensated so its tip is exactly at the recorded XY.
      gantry.position.z=z-.061;carriage.position.x=x;
      current.position.set(x,.118,z);travelledGeometry.setDrawRange(0,Math.min(index+1,pointCapacity));
      studio.requestRender();
    },
    dispose:()=>studio.dispose(),
  };
}
