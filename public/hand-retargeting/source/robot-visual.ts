import * as THREE from 'three';
import { fingerKinematics, forwardKinematics, robotModel, type Vec3 } from './engine';
import { visualBoneFrame } from './visual-frame';

/**
 * Original, procedural housing for the lab's synthetic 20-DOF hand.
 * The housings and decorative bearings are illustrations, not a commercial
 * URDF, collision geometry, manufactured mechanism or verified actuator layout.
 * All moving parts follow the existing FK landmarks; this module solves no IK.
 */
export function createRobotVisual(): {
  group: THREE.Group;
  update(points: Vec3[], q: number[]): void;
  setTheme(dark: boolean): void;
  setSkeleton(visible: boolean): void;
  dispose(): void;
} {
  const group = new THREE.Group();
  group.name = 'Original synthetic hand · FK visual';
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const keepGeometry = <T extends THREE.BufferGeometry>(geometry: T) => { geometries.add(geometry); return geometry; };
  const keepMaterial = <T extends THREE.Material>(material: T) => { materials.add(material); return material; };
  const surface = (color: number, metalness: number, roughness: number) => keepMaterial(new THREE.MeshStandardMaterial({ color, metalness, roughness }));
  const shell = surface(0xe3e5df, .16, .38);
  const graphite = surface(0x28343a, .34, .49);
  const metal = surface(0x89969f, .84, .29);
  const rubber = surface(0x24292b, .02, .88);
  const detail = surface(0x48656c, .58, .36);
  const screwMaterial = surface(0x39454d, .79, .35);
  const seam = surface(0x101b20, .15, .65);
  const solidMaterials = [shell, graphite, metal, rubber, detail, screwMaterial, seam];
  let skeletonVisible = false;
  let disposed = false;

  const mesh = (geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D = group) => {
    const object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  };
  const polygon = (outline: readonly (readonly [number, number])[], depth: number, bevel: number) => {
    const shape = new THREE.Shape();
    outline.forEach(([x, y], index) => index ? shape.lineTo(x, y) : shape.moveTo(x, y));
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel,
      bevelSegments: 2, steps: 1, curveSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return keepGeometry(geometry);
  };
  // The reusable phalange profile has clipped shoulders and a tapered nose.
  // It is a unit asset scaled to each *actual* FK segment, not a new skeleton.
  const phalange = polygon([
    [-.31, -.44], [.31, -.44], [.43, -.29], [.40, .28],
    [.26, .44], [-.26, .44], [-.40, .28], [-.43, -.29],
  ], .70, .055);
  const box = keepGeometry(new THREE.BoxGeometry(1, 1, 1));
  const cylinder = keepGeometry(new THREE.CylinderGeometry(1, 1, 1, 20));
  const sphere = keepGeometry(new THREE.SphereGeometry(1, 14, 10));
  // A stepped metal bearing with a recessed centre, shared by all hinges.
  const bearing = keepGeometry(new THREE.LatheGeometry([
    new THREE.Vector2(.57, -.50), new THREE.Vector2(.85, -.50),
    new THREE.Vector2(1, -.43), new THREE.Vector2(1, -.29),
    new THREE.Vector2(.72, -.24), new THREE.Vector2(.72, .24),
    new THREE.Vector2(1, .29), new THREE.Vector2(1, .43),
    new THREE.Vector2(.85, .50), new THREE.Vector2(.57, .50),
  ], 20));
  const baseRing = keepGeometry(new THREE.TorusGeometry(.0076, .00065, 7, 28));
  const gasketRing = keepGeometry(new THREE.TorusGeometry(.0050, .00055, 6, 20));
  const screwGeometry = keepGeometry(new THREE.CylinderGeometry(.00130, .00130, .00065, 6));
  const screwSpecifications: { parent: THREE.Object3D; position: THREE.Vector3; rotation: THREE.Quaternion; size: number }[] = [];
  const faceScrewRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  const axleScrewRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
  const screw = (parent: THREE.Object3D, x: number, y: number, z: number, size = 1, onAxle = false) => {
    screwSpecifications.push({ parent, position: new THREE.Vector3(x, y, z), rotation: (onAxle ? axleScrewRotation : faceScrewRotation).clone(), size });
  };

  const chassis = new THREE.Group();
  chassis.name = 'Chamfered palm and split back plates';
  group.add(chassis);
  const palmOutline: [number, number][] = [
    [-.018, -.002], [.018, -.002], [.028, .006], [.032, .018],
    [.029, .033], [.036, .043], [.037, .058], [.030, .069],
    [.014, .077], [-.012, .078], [-.029, .071], [-.040, .059],
    [-.043, .044], [-.036, .017], [-.028, .005],
  ];
  const palmBody = mesh(polygon(palmOutline, .011, .0017), shell, chassis);
  palmBody.position.z = -.006;
  // The seam is a slightly recessed second outline, visible around both faces.
  const palmSeam = mesh(polygon(palmOutline.map(([x, y]) => [x * .975, y * .975 + .0007] as [number, number]), .0012, .0005), seam, chassis);
  palmSeam.position.z = -.0127;
  const rearPlate = mesh(polygon([
    [-.016, .006], [.015, .006], [.025, .017], [.024, .039],
    [.028, .056], [.011, .068], [-.014, .068], [-.033, .054], [-.029, .021],
  ], .0024, .0008), graphite, chassis);
  rearPlate.position.z = -.0142;

  // Four individually fitted longitudinal inserts leave a continuous shell rim.
  const inserts = [
    { x: .020, y: .043, length: .041, angle: -.11 },
    { x: .001, y: .045, length: .052, angle: 0 },
    { x: -.018, y: .042, length: .046, angle: .10 },
    { x: -.032, y: .041, length: .028, angle: .17 },
  ];
  inserts.forEach(({ x, y, length, angle }, index) => {
    const insert = mesh(phalange, graphite, chassis);
    insert.position.set(x, y, .0012); insert.scale.set(index === 3 ? .008 : .011, length, .0038); insert.rotation.z = angle;
    const reveal = mesh(box, detail, chassis);
    reveal.scale.set(.0011, length * .55, .0006); reveal.position.set(x + .0035, y, .0030); reveal.rotation.z = angle;
  });
  // Rear ventilation grooves and an inset seam: geometry only, no fake branding.
  for (let index = 0; index < 5; index++) {
    const vent = mesh(box, seam, chassis);
    vent.scale.set(.022 - index * .0017, .0013, .0006);
    vent.position.set(-.002, .026 + index * .006, -.0159);
  }
  const palmFasteners: [number, number][] = [[-.018,.009],[.018,.009],[-.032,.031],[.027,.034],[-.029,.058],[.022,.059],[-.006,.071]];
  palmFasteners.forEach(([x, y]) => { screw(chassis, x, y, .0018, .88); screw(chassis, x, y, -.0160, .88); });

  // A bolted wrist collar is deliberately below the wrist landmark, so it does
  // not hide the palm or alter the measured wrist-to-finger distances.
  const wristHousing = mesh(polygon([
    [-.017, -.025], [.017, -.025], [.021, -.020], [.021, -.007],
    [.016, -.002], [-.016, -.002], [-.021, -.007], [-.021, -.020],
  ], .017, .0015), graphite, chassis);
  wristHousing.position.z = -.006;
  const wristFlange = mesh(box, metal, chassis);
  wristFlange.scale.set(.045, .0033, .021); wristFlange.position.set(0, -.023, -.006);
  const wristInset = mesh(phalange, shell, chassis);
  wristInset.scale.set(.031, .013, .003); wristInset.position.set(0, -.013, .0038);
  for (const x of [-.014, .014]) for (const y of [-.019, -.007]) screw(chassis, x, y, .0048, 1.04);
  for (let index = 0; index < 3; index++) {
    const notch = mesh(box, detail, chassis);
    notch.scale.set(.0030, .0010, .0005); notch.position.set(-.004 + index * .004, -.013, .0052);
  }

  const boneGroups: THREE.Group[] = [];
  const boneSurfaces: { body: THREE.Mesh; back: THREE.Mesh; pad: THREE.Mesh; ribs: THREE.Mesh[]; tip?: THREE.Mesh }[] = [];
  const jointGroups: THREE.Group[] = [];
  const mountGroups: THREE.Group[] = [];
  const fingerWidths = [.0162, .0148, .0158, .0146, .0128];
  const metacarpalStarts: Vec3[] = [[.026,.032,-.006],[.026,.067,-.006],[0,.072,-.006],[-.023,.068,-.006],[-.034,.058,-.006]];
  for (let finger = 0; finger < 5; finger++) {
    const mount = new THREE.Group();
    mount.name = `Finger ${finger + 1} · spread bearing`;
    const angles = robotModel.mounts[finger];
    mount.quaternion.setFromEuler(new THREE.Euler(angles[0], angles[1], angles[2], 'ZYX'));
    group.add(mount); mountGroups.push(mount);
    const mountPlate = mesh(cylinder, graphite, mount);
    mountPlate.rotation.x = Math.PI / 2; mountPlate.scale.set(.0084, .0047, .0084); mountPlate.position.z = -.0052;
    mesh(baseRing, metal, mount).position.z = -.0025;
    // Two visible bolts in each spread-bearing seat.
    screw(mount, -.0051, -.0020, -.0021, .72); screw(mount, .0051, -.0020, -.0021, .72);
    if (finger > 0) {
      const brace = mesh(phalange, shell, chassis);
      const start = new THREE.Vector3(...metacarpalStarts[finger]);
      const end = new THREE.Vector3(...robotModel.bases[finger]);
      const direction = end.clone().sub(start);
      brace.position.copy(start).add(end).multiplyScalar(.5);
      brace.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
      brace.scale.set(fingerWidths[finger] * .78, direction.length() + .003, .0080);
    }
    for (let segment = 0; segment < 3; segment++) {
      const bone = new THREE.Group();
      bone.name = `Finger ${finger + 1} · phalange ${segment + 1}`;
      group.add(bone); boneGroups.push(bone);
      const body = mesh(phalange, shell, bone);
      const back = mesh(phalange, graphite, bone);
      const pad = mesh(phalange, rubber, bone);
      const ribs: THREE.Mesh[] = [];
      // Only distal pads have grip ribs; proximal shells remain visually quiet.
      if (segment === 2) for (let rib = 0; rib < 3; rib++) ribs.push(mesh(box, seam, bone));
      const tip = segment === 2 ? mesh(sphere, rubber, bone) : undefined;
      boneSurfaces.push({ body, back, pad, ribs, tip });
      const width = fingerWidths[finger] * (1 - segment * .10);
      screw(bone, -width * .30, 0, segment === 0 ? -.0060 : -.0054, .57);
      screw(bone, width * .30, 0, segment === 0 ? -.0060 : -.0054, .57);

      const joint = new THREE.Group();
      joint.name = `Finger ${finger + 1} · flexion hinge ${segment + 1}`;
      group.add(joint); jointGroups.push(joint);
      const axle = mesh(bearing, metal, joint);
      axle.rotation.z = -Math.PI / 2;
      axle.scale.set(segment === 0 ? .0059 : .0048, width * 1.12, segment === 0 ? .0059 : .0048);
      for (const sign of [-1, 1]) {
        const gasket = mesh(gasketRing, seam, joint);
        gasket.rotation.y = Math.PI / 2;
        gasket.scale.setScalar(segment === 0 ? 1 : .82);
        gasket.position.x = sign * width * .39;
        screw(joint, sign * width * .575, 0, 0, segment === 0 ? 1.25 : 1.04, true);
      }
    }
  }
  // The model's thumb has its own lateral base. An angled outrigger connects
  // its illustrative mounting seat, without moving that base into the palm.
  const thumbOutrigger = mesh(phalange, shell, chassis);
  const thumbStart = new THREE.Vector3(...metacarpalStarts[0]);
  const thumbEnd = new THREE.Vector3(...robotModel.bases[0]);
  const thumbDirection = thumbEnd.clone().sub(thumbStart);
  thumbOutrigger.position.copy(thumbStart).add(thumbEnd).multiplyScalar(.5);
  thumbOutrigger.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), thumbDirection.clone().normalize());
  thumbOutrigger.scale.set(.015, thumbDirection.length() + .004, .012);

  // Fasteners are batched: one draw call, including moving phalange/axle screws.
  const fasteners = new THREE.InstancedMesh(screwGeometry, screwMaterial, screwSpecifications.length);
  fasteners.name = 'Shared hex fasteners';
  fasteners.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  fasteners.castShadow = true; group.add(fasteners);
  // These parts are small and their custom matrices are updated each frame.
  // A stale instance bounding sphere must not make a curled fingertip disappear.
  fasteners.frustumCulled = false;

  const skeleton = new THREE.Group();
  skeleton.name = 'FK landmarks · inspection overlay';
  skeleton.visible = false; group.add(skeleton);
  const lineMaterial = keepMaterial(new THREE.LineBasicMaterial({ color: 0x168fbd, depthTest: false, transparent: true, opacity: .95 }));
  const skeletonGeometry = keepGeometry(new THREE.BufferGeometry());
  const lineCoordinates = new Float32Array(20 * 2 * 3);
  const lineAttribute = new THREE.BufferAttribute(lineCoordinates, 3).setUsage(THREE.DynamicDrawUsage);
  skeletonGeometry.setAttribute('position', lineAttribute);
  const chain = new THREE.LineSegments(skeletonGeometry, lineMaterial);
  chain.renderOrder = 8; chain.frustumCulled = false; skeleton.add(chain);
  const markerMaterial = keepMaterial(new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, transparent: true, opacity: 1 }));
  const markers = new THREE.InstancedMesh(sphere, markerMaterial, 21);
  markers.renderOrder = 9; markers.frustumCulled = false;
  markers.instanceMatrix.setUsage(THREE.DynamicDrawUsage); skeleton.add(markers);
  for (let index = 0; index < 21; index++) markers.setColorAt(index, new THREE.Color(index > 0 && index % 4 === 0 ? 0xc67b38 : 0x168fbd));

  const points3D = Array.from({ length: 21 }, () => new THREE.Vector3());
  const tangent = new THREE.Vector3(), side = new THREE.Vector3(), front = new THREE.Vector3();
  const rotationMatrix = new THREE.Matrix4(), localMatrix = new THREE.Matrix4(), instanceMatrix = new THREE.Matrix4();
  const instanceScale = new THREE.Vector3(), unitRotation = new THREE.Quaternion();
  const markerScale = new THREE.Vector3(.0021, .0021, .0021);

  function update(points: Vec3[], q: number[]) {
    if (disposed || points.length !== 21 || Array.from(points).some(point => !Array.isArray(point) || point.length !== 3
      || Array.from(point).some(value => !Number.isFinite(value)))
      || !Array.isArray(q) || q.length !== 20 || Array.from(q).some(value => !Number.isFinite(value))) return;
    points.forEach((point, index) => points3D[index].set(...point));
    chassis.position.copy(points3D[0]);
    for (let finger = 0; finger < 5; finger++) {
      const base = 1 + finger * 4;
      mountGroups[finger].position.copy(points3D[base]);
      // CMC opposition/pronation changes axial roll even when all three bones
      // are collinear. Only the complete FK rotations preserve that pad direction.
      const fk = fingerKinematics(q, finger);

      for (let segment = 0; segment < 3; segment++) {
        const index = finger * 3 + segment;
        const bone = boneGroups[index], joint = jointGroups[index];
        const start = points3D[base + segment], end = points3D[base + segment + 1];
        const frame = visualBoneFrame(points[base + segment], points[base + segment + 1], fk.rotations[segment]);
        if (!frame) { bone.visible = false; joint.visible = false; continue; }
        const length = frame.length;
        bone.visible = true; joint.visible = true;
        side.set(...frame.side); tangent.set(...frame.tangent); front.set(...frame.front);
        rotationMatrix.makeBasis(side, tangent, front);
        bone.quaternion.setFromRotationMatrix(rotationMatrix);
        bone.position.copy(start).add(end).multiplyScalar(.5);
        joint.quaternion.copy(bone.quaternion); joint.position.copy(start);
        const width = fingerWidths[finger] * (1 - segment * .10);
        const housingLength = Math.max(.005, length - (segment === 0 ? .009 : .0075));
        const depth = segment === 0 ? .0124 : .0108;
        const surfaces = boneSurfaces[index];
        surfaces.body.scale.set(width, housingLength, depth);
        surfaces.back.scale.set(width * .66, housingLength * .70, .0024);
        surfaces.back.position.set(0, -.0005, -depth * .38);
        surfaces.pad.scale.set(width * .65, housingLength * .71, .0038);
        surfaces.pad.position.set(0, housingLength * .045, depth * .40);
        surfaces.ribs.forEach((rib, offset) => {
          rib.scale.set(width * .42, .00065, .00045);
          rib.position.set(0, housingLength * (.27 - offset * .17), depth * .40 + .0016);
        });
        if (surfaces.tip) {
          surfaces.tip.scale.set(width * .315, .0034, .0038);
          surfaces.tip.position.set(0, Math.min(length * .5 - .0029, housingLength * .46), depth * .18);
        }
        bone.updateMatrix(); joint.updateMatrix();
      }
      mountGroups[finger].updateMatrix();
    }
    chassis.updateMatrix();
    screwSpecifications.forEach((specification, index) => {
      instanceScale.setScalar(specification.size);
      localMatrix.compose(specification.position, specification.rotation, instanceScale);
      instanceMatrix.multiplyMatrices(specification.parent.matrix, localMatrix);
      fasteners.setMatrixAt(index, instanceMatrix);
    });
    fasteners.instanceMatrix.needsUpdate = true;

    let cursor = 0;
    for (let finger = 0; finger < 5; finger++) {
      const base = 1 + finger * 4;
      for (let link = 0; link < 4; link++) {
        const a = points3D[link === 0 ? 0 : base + link - 1];
        const b = points3D[base + link];
        lineCoordinates[cursor++] = a.x; lineCoordinates[cursor++] = a.y; lineCoordinates[cursor++] = a.z;
        lineCoordinates[cursor++] = b.x; lineCoordinates[cursor++] = b.y; lineCoordinates[cursor++] = b.z;
      }
    }
    lineAttribute.needsUpdate = true;
    points3D.forEach((position, index) => { instanceMatrix.compose(position, unitRotation, markerScale); markers.setMatrixAt(index, instanceMatrix); });
    markers.instanceMatrix.needsUpdate = true;
  }

  function setSkeleton(visible: boolean) {
    if (disposed) return;
    skeletonVisible = visible; skeleton.visible = visible;
    solidMaterials.forEach((material, index) => {
      material.transparent = visible;
      material.opacity = visible ? [.20, .12, .29, .12, .24, .26, .10][index] : 1;
      material.depthWrite = !visible;
      material.needsUpdate = true;
    });
  }
  function setTheme(dark: boolean) {
    if (disposed) return;
    shell.color.setHex(dark ? 0xc7d0d1 : 0xe3e5df);
    graphite.color.setHex(dark ? 0x35454e : 0x28343a);
    metal.color.setHex(dark ? 0xa7b9c4 : 0x89969f);
    detail.color.setHex(dark ? 0x6aa5ad : 0x48656c);
    rubber.color.setHex(dark ? 0x303a3e : 0x24292b);
    lineMaterial.color.setHex(dark ? 0x69cef2 : 0x168fbd);
    for (let index = 0; index < 21; index++) markers.setColorAt(index, new THREE.Color(index > 0 && index % 4 === 0 ? (dark ? 0xffc181 : 0xc67b38) : (dark ? 0x69cef2 : 0x168fbd)));
    if (markers.instanceColor) markers.instanceColor.needsUpdate = true;
    setSkeleton(skeletonVisible);
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    fasteners.dispose(); markers.dispose(); group.clear();
  }
  const neutral = Array(20).fill(0);
  update(forwardKinematics(neutral), neutral);
  return { group, update, setTheme, setSkeleton, dispose };
}
