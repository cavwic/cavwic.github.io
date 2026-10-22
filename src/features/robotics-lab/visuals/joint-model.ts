import * as THREE from 'three';

/** Display-only single-axis test fixture. Geometry is not a manufactured CAD assembly. */
export interface JointFixture {
  root: THREE.Group;
  setPose(q: number, target: number, enabled?: boolean, color?: THREE.ColorRepresentation): void;
}

export function createJointFixture(accent: THREE.ColorRepresentation): JointFixture {
  const root = new THREE.Group();
  root.name = 'single-axis-joint-fixture';
  const metal = new THREE.MeshStandardMaterial({ color: 0xbcc7ce, metalness: .82, roughness: .28 });
  const bright = new THREE.MeshStandardMaterial({ color: 0xe2e8ec, metalness: .9, roughness: .22 });
  const graphite = new THREE.MeshStandardMaterial({ color: 0x26333f, metalness: .56, roughness: .38 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x151b23, roughness: .82 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x52616c, metalness: .8, roughness: .3 });
  const accentMaterial = new THREE.MeshStandardMaterial({ color: accent, metalness: .36, roughness: .32 });
  const indicatorMaterial = new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: .65, roughness: .26 });
  function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D, x: number, y: number, z: number) {
    const object = new THREE.Mesh(geometry, material); object.position.set(x, y, z); object.castShadow = true; object.receiveShadow = true; parent.add(object); return object;
  }
  function box(parent: THREE.Object3D, x: number, y: number, z: number, w: number, h: number, d: number, material = metal) {
    return mesh(new THREE.BoxGeometry(w, h, d), material, parent, x, y, z);
  }
  function cylinder(parent: THREE.Object3D, x: number, y: number, z: number, r: number, depth: number, material = metal, segments = 64) {
    const object = mesh(new THREE.CylinderGeometry(r, r, depth, segments), material, parent, x, y, z); object.rotation.x = Math.PI / 2; return object;
  }
  function bolt(parent: THREE.Object3D, x: number, y: number, z: number, radius = .004) {
    cylinder(parent, x, y, z, radius * 1.3, .0015, dark, 32);
    const head = cylinder(parent, x, y, z + .002, radius, .003, bright, 6); head.rotation.y = Math.PI / 6;
    cylinder(parent, x, y, z + .0038, radius * .43, .0003, graphite, 6);
  }
  function wire(points: number[][], material: THREE.Material, radius = .002) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p as [number, number, number])));
    mesh(new THREE.TubeGeometry(curve, 42, radius, 8, false), material, root, 0, 0, 0);
  }

  // A grounded mounting plate with feet, T slots and recessed fastening hardware.
  box(root, 0, .018, -.012, .28, .022, .225, graphite);
  box(root, 0, .032, -.012, .272, .006, .217, metal);
  for (const x of [-.104, .104]) {
    for (const z of [-.088, .066]) {
      box(root, x, .006, z, .028, .012, .027, rubber);
      const washer = mesh(new THREE.CylinderGeometry(.008, .008, .0015, 32), dark, root, x, .036, z);
      washer.rotation.y = Math.PI / 6;
      const head = mesh(new THREE.CylinderGeometry(.0054, .0054, .003, 6), bright, root, x, .038, z);
      mesh(new THREE.CylinderGeometry(.0024, .0024, .0005, 6), graphite, root, x, .0398, z);
      head.rotation.y = Math.PI / 6;
    }
    box(root, x * .58, .0354, -.012, .004, .001, .18, graphite);
  }

  const pivot = .215;
  // Servo body and gearbox are fixed: the only moving assembly rotates around Z.
  box(root, 0, .116, -.082, .096, .158, .025, metal);
  for (const x of [-.044, .044]) box(root, x, .129, -.056, .01, .142, .062, metal);
  cylinder(root, 0, pivot, -.092, .056, .1, graphite);
  for (let i = 0; i < 9; i++) cylinder(root, 0, pivot, -.135 + i * .0094, .057, .0025, dark);
  cylinder(root, 0, pivot, -.147, .049, .009, dark);
  cylinder(root, 0, pivot, -.039, .063, .02, metal);
  cylinder(root, 0, pivot, -.024, .057, .01, bright);
  cylinder(root, 0, pivot, -.015, .042, .009, graphite);
  cylinder(root, 0, pivot, -.008, .031, .012, bright);
  cylinder(root, 0, pivot, .011, .014, .036, dark);
  cylinder(root, 0, pivot, .032, .027, .008, bright);
  cylinder(root, 0, pivot, .038, .023, .004, dark);
  cylinder(root, 0, pivot, .042, .019, .004, bright);
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4; bolt(root, Math.sin(a) * .049, pivot + Math.cos(a) * .049, -.017, .003);
  }
  // A non-moving dial and physical end-stop pins make the single axis legible.
  const dialGeometry = new THREE.TorusGeometry(.084, .0022, 8, 100, 2.7);
  const dial = mesh(dialGeometry, dark, root, 0, pivot, .016); dial.rotation.z = Math.PI / 2 - 1.35;
  const marks: number[] = [];
  for (let i = 0; i <= 30; i++) {
    const a = -1.35 + i * 2.7 / 30, r = i % 5 === 0 ? .072 : .077;
    marks.push(Math.sin(a) * r, pivot + Math.cos(a) * r, .02, Math.sin(a) * .084, pivot + Math.cos(a) * .084, .02);
  }
  const ticks = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(marks, 3)), new THREE.LineBasicMaterial({ color: 0x6f8492 })); root.add(ticks);
  for (const q of [-1.35, 1.35]) cylinder(root, Math.sin(q) * .083, pivot + Math.cos(q) * .083, .023, .006, .016, graphite, 32);
  box(root, -.09, .05, .055, .035, .008, .026, graphite);
  const indicator = mesh(new THREE.SphereGeometry(.0052, 24, 16), indicatorMaterial, root, -.09, .057, .056); indicator.scale.y = .45;
  box(root, .067, .053, -.095, .042, .028, .025, graphite);
  box(root, .067, .056, -.079, .025, .013, .006, dark);
  for (const [i, color] of [0x293441, 0xd2864c, 0x227c89].entries()) {
    const material = new THREE.MeshStandardMaterial({ color, roughness: .75 });
    wire([[.023 + i * .006, .197, -.15], [.065 + i * .005, .16, -.16], [.09 + i * .004, .074, -.14], [.067 + i * .006, .064, -.11]], material, .0018);
  }
  wire([[-.021, .195, -.15], [-.07, .17, -.15], [-.09, .06, -.12], [-.09, .045, -.01]], rubber, .0034);

  // A machined load arm: one revolute DOF, two clearance holes and a relief slot.
  const moving = new THREE.Group(); moving.name = 'joint-output'; moving.position.set(0, pivot, .052); root.add(moving);
  const shape = new THREE.Shape(); const radius = .02, length = .205;
  shape.moveTo(-radius, 0); shape.lineTo(-radius, length); shape.absarc(0, length, radius, Math.PI, 0, true); shape.lineTo(radius, 0); shape.absarc(0, 0, radius, 0, -Math.PI, true);
  for (const [y, r] of [[0, .0103], [length, .0082]]) { const hole = new THREE.Path(); hole.absarc(0, y, r, 0, Math.PI * 2, true); shape.holes.push(hole); }
  const slot = new THREE.Path(); slot.moveTo(-.006, .055); slot.lineTo(-.006, .154); slot.absarc(0, .154, .006, Math.PI, 0, true); slot.lineTo(.006, .055); slot.absarc(0, .055, .006, 0, -Math.PI, true); shape.holes.push(slot);
  mesh(new THREE.ExtrudeGeometry(shape, { depth: .012, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: .0014, bevelThickness: .0012, curveSegments: 32 }), metal, moving, 0, 0, 0);
  for (const x of [-.014, .014]) box(moving, x, .104, .0145, .002, .12, .001, bright);
  cylinder(moving, 0, 0, .016, .017, .004, accentMaterial);
  bolt(moving, 0, 0, .019, .006);
  cylinder(moving, 0, length, .007, .025, .027, graphite);
  cylinder(moving, 0, length, .024, .022, .004, dark);
  cylinder(moving, 0, length, .027, .018, .002, accentMaterial);
  bolt(moving, 0, length, .03, .005);
  for (const a of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) bolt(moving, Math.sin(a) * .013, Math.cos(a) * .013, .018, .0023);

  const reference = new THREE.Group(); reference.name = 'joint-reference'; reference.position.set(0, pivot, .025); root.add(reference);
  const referenceGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, .092, 0), new THREE.Vector3(0, .239, 0)]);
  const referenceLine = new THREE.Line(referenceGeometry, new THREE.LineDashedMaterial({ color: 0x728b9a, dashSize: .009, gapSize: .006, transparent: true, opacity: .65 })); referenceLine.computeLineDistances(); reference.add(referenceLine);
  const marker = new THREE.Mesh(new THREE.TorusGeometry(.007, .0015, 8, 24), new THREE.MeshBasicMaterial({ color: 0x728b9a })); marker.position.y = .239; reference.add(marker);

  return {
    root,
    setPose(q, target, enabled = true, color = accent) {
      // Positive q leans right from vertical, matching the numerical/SVG convention.
      moving.rotation.z = -q; reference.rotation.z = -target;
      accentMaterial.color.set(color); indicatorMaterial.color.set(color); indicatorMaterial.emissive.set(color);
      indicatorMaterial.emissiveIntensity = enabled ? .8 : .06; indicatorMaterial.opacity = enabled ? 1 : .55;
      indicatorMaterial.transparent = !enabled;
    },
  };
}
