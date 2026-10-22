import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { createStudio } from '../visuals/studio';

type Locale = 'zh' | 'en';
export type ObjectShape = { type: string; size: number[] };
export type RecordedGraspFrame = {
  object: number[]; quat: number[]; jaws: number[]; contactPositions: number[][];
};

// Metres, copied from public/robotics-lab/grasp/model.xml. These dimensions
// describe the recorded model, not a particular commercially available gripper.
export const RECORDED_GRIPPER = {
  stageZ: .046,
  jawOriginX: .065,
  padHalfSize: [.006, .035, .030],
  bridgePosition: [0, 0, .070],
  bridgeHalfSize: [.09, .015, .008],
} as const;

export interface RecordedGraspScene {
  update(frame: RecordedGraspFrame, shape: string): void;
  setAppearance(visible: boolean): void;
  setContacts(visible: boolean): void;
  dispose(): void;
}

/** Recorded transforms only: no physics, interpolation, or generated contacts. */
export function createRecordedGraspScene(
  host: HTMLElement,
  shapes: Record<string, ObjectShape>,
  locale: Locale,
  contactCapacity = 16,
): RecordedGraspScene | null {
  const studio = createStudio(host, {
    locale,
    label: locale === 'zh' ? 'MuJoCo 抓取记录的三维回放' : '3D replay of recorded MuJoCo grasps',
    target: [0, .105, 0], camera: [.285, .245, .30], span: .42, height: 450,
  });
  if (!studio) return null;

  // MuJoCo is z-up; the studio floor is Three.js y-up. Rotate the entire
  // recorded coordinate system so x remains x, z becomes y, and y becomes -z.
  const recordedWorld = new THREE.Group();
  recordedWorld.name = 'mujoco-z-up-recording';
  recordedWorld.rotation.x = -Math.PI / 2;
  studio.content.add(recordedWorld);
  const movingStage = new THREE.Group();
  movingStage.name = 'recorded-lift-stage';
  recordedWorld.add(movingStage);
  const exterior = new THREE.Group();
  exterior.name = 'illustrative-noncolliding-exterior';
  movingStage.add(exterior);

  const aluminium = new THREE.MeshStandardMaterial({ color: 0x6c8291, metalness: .68, roughness: .30 });
  const machined = new THREE.MeshStandardMaterial({ color: 0xc2cdd2, metalness: .76, roughness: .24 });
  const housing = new THREE.MeshStandardMaterial({ color: 0x285369, metalness: .42, roughness: .34 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x263b45, metalness: .05, roughness: .91 });
  const fastener = new THREE.MeshStandardMaterial({ color: 0x41535f, metalness: .82, roughness: .28 });
  const jawCollision = new THREE.MeshStandardMaterial({ color: 0x15b4c0, transparent: true, opacity: .29, roughness: .5, depthWrite: false });
  const objectMaterial = new THREE.MeshStandardMaterial({ color: 0xe99d44, metalness: .13, roughness: .34 });
  const objectCollision = new THREE.MeshStandardMaterial({ color: 0xe9a34c, transparent: true, opacity: .34, roughness: .5, depthWrite: false });
  const bridgeGhost = new THREE.MeshStandardMaterial({ color: 0x8497a3, transparent: true, opacity: .18, depthWrite: false });
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x486370, transparent: true, opacity: .53 });
  const collisionEdges = new THREE.LineBasicMaterial({ color: 0x118998, transparent: true, opacity: .85 });

  function box(parent: THREE.Object3D, size: readonly number[], position: readonly number[], material: THREE.Material, radius = 0): THREE.Mesh {
    const geometry = radius > 0
      ? new RoundedBoxGeometry(size[0]!, size[1]!, size[2]!, 3, radius)
      : new THREE.BoxGeometry(size[0]!, size[1]!, size[2]!);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position[0]!, position[1]!, position[2]!);
    mesh.castShadow = true; mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  function screw(parent: THREE.Object3D, x: number, y: number, z: number, axis: 'x' | 'y' | 'z' = 'z'): void {
    const screwGroup = new THREE.Group();
    screwGroup.position.set(x, y, z);
    // CylinderGeometry's axis is y; use a common local +z fastening direction.
    if (axis === 'x') screwGroup.rotation.y = (x < 0 ? -1 : 1) * Math.PI / 2;
    if (axis === 'y') screwGroup.rotation.x = -Math.PI / 2;
    const head = new THREE.Mesh(new THREE.CylinderGeometry(.0021, .0021, .0012, 32), fastener);
    head.rotation.x = Math.PI / 2;
    const recess = new THREE.Mesh(new THREE.CylinderGeometry(.00085, .00085, .00012, 6), rubber);
    recess.rotation.x = Math.PI / 2; recess.position.z = .00064;
    screwGroup.add(head, recess);
    parent.add(screwGroup);
  }

  // The bridge has contype=0 and conaffinity=0 in the MJCF. Keep it in its
  // exact recorded location, but distinguish it from the actual collision pads.
  const bridge = box(movingStage, RECORDED_GRIPPER.bridgeHalfSize.map(value => value * 2), RECORDED_GRIPPER.bridgePosition, aluminium);
  bridge.name = 'recorded-noncolliding-bridge';
  const bridgeEdges = new THREE.LineSegments(new THREE.EdgesGeometry(bridge.geometry), edgeMaterial);
  bridgeEdges.position.copy(bridge.position); movingStage.add(bridgeEdges);

  // Everything in `exterior` is non-collision presentation geometry. Rails,
  // covers and fasteners stay above the pads, away from their contact faces.
  box(exterior, [.094, .044, .032], [0, 0, .094], housing, .003);
  box(exterior, [.081, .001, .022], [0, -.0225, .094], aluminium, .0003);
  box(exterior, [.060, .0012, .009], [0, -.0232, .094], rubber, .0004);
  for (let i = 0; i < 8; i++) box(exterior, [.0012, .0008, .006], [-.026 + i * .0075, -.024, .094], machined);
  for (const x of [-.038, .038]) for (const z of [.085, .103]) screw(exterior, x, -.0237, z, 'y');
  for (const y of [-.0105, .0105]) {
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(.0026, .0026, .174, 40), machined);
    rail.rotation.z = Math.PI / 2; rail.position.set(0, y, .0818); rail.castShadow = true;
    exterior.add(rail);
  }
  for (const x of [-.082, .082]) {
    box(exterior, [.011, .029, .008], [x, 0, .083], housing, .0008);
    for (const y of [-.009, .009]) screw(exterior, x, y, .0875);
  }

  const jaws = [-1, 1].map(side => {
    const group = new THREE.Group(); movingStage.add(group);
    group.name = side < 0 ? 'recorded-left-jaw' : 'recorded-right-jaw';
    // Unmodified box extents, matching MuJoCo's pad size (half sizes).
    const pad = box(group, RECORDED_GRIPPER.padHalfSize.map(value => value * 2), [0, 0, 0], rubber);
    pad.name = 'recorded-collision-pad';
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(pad.geometry), collisionEdges);
    group.add(edges);
    const detail = new THREE.Group(); group.add(detail);
    // The shaft runs up from the pad; its backing lies on the non-contact side.
    box(detail, [.008, .027, .043], [side * .002, 0, .0515], aluminium, .0008);
    box(detail, [.019, .030, .009], [0, 0, .077], machined, .0008);
    box(detail, [.0014, .055, .050], [side * .0068, 0, 0], housing, .0004);
    for (const y of [-.019, .019]) for (const z of [-.019, .019]) screw(detail, side * .0078, y, z, 'x');
    // Fine lateral ribs deliberately do not alter the inward contact surface.
    for (let i = 0; i < 8; i++) {
      box(detail, [.009, .0006, .001], [0, -.0353, -.022 + i * .0063], aluminium);
      box(detail, [.009, .0006, .001], [0, .0353, -.022 + i * .0063], aluminium);
    }
    return { group, pad, detail };
  });

  const objects = new Map<string, { group: THREE.Group; mesh: THREE.Mesh }>();
  for (const [name, shape] of Object.entries(shapes)) {
    const group = new THREE.Group(); group.visible = false;
    group.name = `recorded-object-${name}`;
    const geometry = shape.type === 'cylinder'
      ? new THREE.CylinderGeometry(shape.size[0]!, shape.size[0]!, shape.size[1]! * 2, 96, 1).rotateX(Math.PI / 2)
      : new THREE.BoxGeometry(shape.size[0]! * 2, shape.size[1]! * 2, shape.size[2]! * 2);
    const mesh = new THREE.Mesh(geometry, objectMaterial);
    mesh.castShadow = true; mesh.receiveShadow = true;
    group.add(mesh, new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 25), edgeMaterial));
    recordedWorld.add(group); objects.set(name, { group, mesh });
  }

  // Contact markers are enlarged for visibility. Their centres are the exact
  // recorded world positions; they do not imply a measured patch radius.
  const contacts = new THREE.Group(); recordedWorld.add(contacts);
  contacts.name = 'recorded-contact-positions';
  const markerGeometry = new THREE.SphereGeometry(.0016, 20, 12);
  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff5637, depthTest: false, transparent: true, opacity: .94 });
  const markers = Array.from({ length: contactCapacity }, () => {
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.renderOrder = 20; marker.visible = false; contacts.add(marker); return marker;
  });
  let active: THREE.Group | undefined;
  let disposed = false;
  return {
    update(frame, name) {
      if (disposed) return;
      const object = objects.get(name);
      if (!object) return;
      if (active !== object.group) { if (active) active.visible = false; active = object.group; active.visible = true; }
      movingStage.position.z = RECORDED_GRIPPER.stageZ + frame.jaws[0]!;
      jaws[0]!.group.position.x = -RECORDED_GRIPPER.jawOriginX + frame.jaws[1]!;
      jaws[1]!.group.position.x = RECORDED_GRIPPER.jawOriginX - frame.jaws[2]!;
      object.group.position.set(frame.object[0]!, frame.object[1]!, frame.object[2]!);
      // MuJoCo serializes [w, x, y, z]; THREE.Quaternion.set expects [x, y, z, w].
      object.group.quaternion.set(frame.quat[1]!, frame.quat[2]!, frame.quat[3]!, frame.quat[0]!);
      for (let i = 0; i < markers.length; i++) {
        const p = frame.contactPositions[i]; markers[i]!.visible = Boolean(p);
        if (p) markers[i]!.position.set(p[0]!, p[1]!, p[2]!);
      }
      studio.requestRender();
    },
    setAppearance(visible) {
      exterior.visible = visible;
      bridge.material = visible ? aluminium : bridgeGhost;
      jaws.forEach(jaw => { jaw.detail.visible = visible; jaw.pad.material = visible ? rubber : jawCollision; });
      objects.forEach(object => { object.mesh.material = visible ? objectMaterial : objectCollision; });
      studio.requestRender();
    },
    setContacts(visible) { contacts.visible = visible; studio.requestRender(); },
    dispose() {
      if (disposed) return;
      disposed = true;
      // The shared studio owns renderer, controls and mesh resource disposal.
      studio.dispose();
    },
  };
}
