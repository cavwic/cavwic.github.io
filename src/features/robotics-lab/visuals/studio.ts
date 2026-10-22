import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createHistoryScope } from '../history';

export type StudioOptions = {
  locale: 'zh' | 'en';
  label: string;
  target?: [number, number, number];
  camera?: [number, number, number];
  height?: number;
  /** Vertical extent of the orthographic view, in the model's own units. */
  span?: number;
};
export type Studio = {
  content: THREE.Group;
  requestRender(): void;
  dispose(): void;
};

/** A local, demand-rendered inspection viewport. It does not simulate any physics. */
export function createStudio(host: HTMLElement, options: StudioOptions): Studio | null {
  const zh = options.locale === 'zh';
  const t = (cn: string, en: string) => zh ? cn : en;
  const span = options.span ?? 1;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch {
    // Callers retain their SVG or signal charts when WebGL is unavailable.
    host.dataset.renderer = 'fallback';
    return null;
  }
  host.classList.add('lab-scene-host');
  host.dataset.renderer = 'webgl';
  const root = document.createElement('div');
  root.className = 'lab-studio';
  root.style.setProperty('--studio-height', `${options.height ?? 460}px`);
  const toolbar = document.createElement('div');
  toolbar.className = 'lab-studio-toolbar';
  const title = document.createElement('span');
  title.className = 'lab-studio-title';
  title.textContent = options.label;
  const views = document.createElement('div');
  views.className = 'lab-studio-views';
  views.setAttribute('role', 'group');
  views.setAttribute('aria-label', t('模型视角', 'Model views'));
  toolbar.append(title, views);
  const viewport = document.createElement('div');
  viewport.className = 'lab-studio-viewport';
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', options.label);
  renderer.domElement.setAttribute('tabindex', '0');
  renderer.domElement.dataset.modelCanvas = 'true';
  const hint = document.createElement('span');
  hint.className = 'lab-studio-hint';
  hint.textContent = t('拖动旋转 · 滚轮缩放', 'Drag to orbit · scroll to zoom');
  hint.title = t('触屏单指旋转、双指缩放。选择视角按钮可恢复标准方向。', 'On touchscreens, orbit with one finger and zoom with two. Use the view buttons to restore a standard view.');
  const status = document.createElement('span');
  status.className = 'lab-studio-status';
  status.setAttribute('role', 'status');
  viewport.append(renderer.domElement, hint, status);
  root.append(toolbar, viewport);
  host.replaceChildren(root);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const content = new THREE.Group();
  content.name = 'record-driven-models';
  scene.add(content);
  const camera = new THREE.OrthographicCamera(-span, span, span / 2, -span / 2, span * .001, span * 80);
  const target = new THREE.Vector3(...(options.target ?? [0, span * .24, 0]));
  const home = new THREE.Vector3(...(options.camera ?? [span * .95, span * .72, span * 1.2]));
  camera.position.copy(home);
  camera.lookAt(target);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(target);
  controls.enableDamping = false;
  controls.enablePan = true;
  controls.minZoom = .35;
  controls.maxZoom = 5;
  controls.minPolarAngle = .015;
  controls.maxPolarAngle = Math.PI * .5;
  controls.zoomSpeed = .8;
  controls.rotateSpeed = .65;
  controls.update();

  const hemi = new THREE.HemisphereLight(0xe6f1ff, 0x657483, 2.0);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xfff5e8, 3.0);
  key.position.set(span * -1.4, span * 2.5, span * 1.8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -span * 2, right: span * 2, top: span * 2, bottom: -span * 2, near: span * .01, far: span * 12 });
  key.shadow.bias = -.0002;
  key.shadow.normalBias = span * .001;
  key.shadow.radius = 3;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xc3e2ff, 1.6);
  fill.position.set(span * 1.8, span, span * -1.1);
  scene.add(fill);
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xe9eff2, roughness: .93, metalness: .03 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(span * 12, span * 12), floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -span * .003;
  floor.receiveShadow = true;
  scene.add(floor);
  const grid = new THREE.GridHelper(span * 8, 64, 0x91a7b5, 0xc0ccd4);
  grid.position.y = -span * .002;
  const gridMaterial = grid.material as THREE.LineBasicMaterial;
  gridMaterial.transparent = true;
  gridMaterial.opacity = .23;
  scene.add(grid);
  // Procedural local environment: no remote HDR files, models or textures.
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  scene.environmentIntensity = .75;
  room.dispose();
  pmrem.dispose();

  let pending = 0, disposed = false;
  function requestRender(): void {
    if (disposed || pending || !root.isConnected) return;
    pending = requestAnimationFrame(() => {
      pending = 0;
      if (disposed || !root.isConnected || document.hidden) return;
      renderer.render(scene, camera);
    });
  }
  const viewButtons: HTMLButtonElement[] = [];
  let orbitActive = false;
  type CameraState = { position: number[]; up: number[]; target: number[]; zoom: number; floor: boolean; selected: string[] };
  const cameraHistory = createHistoryScope<CameraState>({
    label: t('调整模型视角', 'Adjust model view'),
    equals:(a,b)=>Math.abs(a.zoom-b.zoom)<1e-8&&a.floor===b.floor&&a.selected.join()===b.selected.join()&&['position','up','target'].every(key=>a[key as 'position'].every((value,index)=>Math.abs(value-b[key as 'position'][index]!)<1e-8)),
    capture: () => ({ position: camera.position.toArray(), up: camera.up.toArray(), target: controls.target.toArray(), zoom: camera.zoom, floor: floor.visible, selected: viewButtons.map(button => button.getAttribute('aria-pressed') ?? 'false') }),
    restore: state => {
      orbitActive = false;
      // End an in-flight pointer gesture before Ctrl+Z restores the view. Without
      // this, its remaining pointermove events can change the camera off-history.
      controls.disconnect(); controls.connect(renderer.domElement);
      camera.position.fromArray(state.position); camera.up.fromArray(state.up); controls.target.fromArray(state.target); camera.zoom = state.zoom;
      floor.visible = grid.visible = state.floor;
      camera.updateProjectionMatrix(); controls.update();
      viewButtons.forEach((button, index) => button.setAttribute('aria-pressed', state.selected[index] ?? 'false'));
      requestRender();
    },
  });
  const viewDirections = [home.clone().sub(target), new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, .001)];
  [t('斜视', 'Angle'), t('正视', 'Front'), t('侧视', 'Side'), t('俯视', 'Top'), t('复位', 'Reset')].forEach((label, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.title = index === 4 ? t('恢复视角与缩放，不重置实验', 'Reset the view and zoom, not the experiment') : label;
    button.dataset.view = String(index);
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => cameraHistory.run(t('切换模型视角', 'Change model view'), () => {
      controls.target.copy(target);
      camera.up.set(0, 1, 0);
      // Exact orthographic inspection should not be occluded by a horizon band.
      floor.visible = grid.visible = index !== 1 && index !== 2;
      const direction = viewDirections[index === 4 ? 0 : index]!.clone();
      camera.position.copy(target).add(direction.normalize().multiplyScalar(home.distanceTo(target)));
      camera.zoom = 1;
      camera.updateProjectionMatrix();
      controls.update();
      viewButtons.forEach((b, j) => b.setAttribute('aria-pressed', String(j === (index === 4 ? 0 : index))));
      requestRender();
    }));
    views.append(button);
    viewButtons.push(button);
  });
  const onOrbit = () => { cameraHistory.begin(t('旋转、平移或缩放模型', 'Orbit, pan or zoom model')); orbitActive = true; };
  const orbitChange = () => { if(orbitActive){floor.visible=grid.visible=true;viewButtons.forEach(b=>b.setAttribute('aria-pressed','false'));}requestRender(); };
  const endOrbit = () => {orbitActive=false;cameraHistory.commit(t('旋转、平移或缩放模型', 'Orbit, pan or zoom model'));};
  controls.addEventListener('start', onOrbit);
  controls.addEventListener('end', endOrbit);
  controls.addEventListener('change', orbitChange);
  const resize = () => {
    const width = viewport.clientWidth, height = viewport.clientHeight;
    if (!width || !height || disposed) return;
    const verticalSpan = span * Math.max(1, height / width);
    camera.left = -verticalSpan * width / height / 2;
    camera.right = verticalSpan * width / height / 2;
    camera.top = verticalSpan / 2;
    camera.bottom = -verticalSpan / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    requestRender();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(viewport);
  const updateTheme = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    scene.background = new THREE.Color(dark ? 0x152534 : 0xeef3f6);
    floorMaterial.color.set(dark ? 0x1d3041 : 0xe8eef2);
    gridMaterial.color.set(dark ? 0x8299a8 : 0x91a8b7);
    gridMaterial.opacity = dark ? .18 : .23;
    renderer.toneMappingExposure = dark ? .93 : 1.05;
    requestRender();
  };
  const theme = new MutationObserver(updateTheme);
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const onVisible = () => { if (!document.hidden) requestRender(); };
  document.addEventListener('visibilitychange', onVisible);
  const onLost = (event: Event) => { event.preventDefault(); status.textContent = t('三维视图已暂停，请刷新页面恢复。', '3D view paused. Reload the page to restore it.'); };
  renderer.domElement.addEventListener('webglcontextlost', onLost);
  const removal = new MutationObserver(() => { if (!host.isConnected || !host.contains(root)) dispose(); });
  removal.observe(document.body, { childList: true, subtree: true });
  function dispose(): void {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(pending);
    observer.disconnect(); theme.disconnect(); removal.disconnect();
    cameraHistory.dispose();
    document.removeEventListener('visibilitychange', onVisible);
    renderer.domElement.removeEventListener('webglcontextlost', onLost);
    controls.dispose();
    const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>(), textures = new Set<THREE.Texture>();
    scene.traverse(object => {
      const item = object as THREE.Mesh;
      if (item.geometry) geometries.add(item.geometry);
      if (item.material) for (const material of Array.isArray(item.material) ? item.material : [item.material]) {
        materials.add(material);
        for (const value of Object.values(material)) if (value instanceof THREE.Texture && value !== environment.texture) textures.add(value);
      }
    });
    geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
    environment.dispose();
    renderer.dispose();
  }
  updateTheme(); resize();
  cameraHistory.reset();
  return { content, requestRender, dispose };
}
