// Copy installed, version-pinned runtime assets and retrieve the fixed official
// model. This is a build preparation step, never a page-time CDN dependency.
import { mkdir, copyFile, readFile, writeFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('..', import.meta.url));
const version = '1.1.0';
const wasmRoot = path.join(root, 'public/vendor/mediapipe', version, 'wasm');
const packageRoot = path.join(root, 'node_modules/@mediapipe/tasks-vision');
const files = ['vision_wasm_internal.js','vision_wasm_internal.wasm','vision_wasm_module_internal.js','vision_wasm_module_internal.wasm','vision_wasm_nosimd_internal.js','vision_wasm_nosimd_internal.wasm'];
await mkdir(wasmRoot, { recursive: true });
for (const file of files) await copyFile(path.join(packageRoot,'wasm',file),path.join(wasmRoot,file));
const licensePath = path.join(wasmRoot,'../LICENSE');
try { await copyFile(path.join(packageRoot,'LICENSE'),licensePath); }
catch {
  const license = await fetch('https://raw.githubusercontent.com/google-ai-edge/mediapipe/master/LICENSE', { signal: AbortSignal.timeout(30000) });
  if (!license.ok) throw new Error(`License retrieval failed: HTTP ${license.status}`);
  await writeFile(licensePath, await license.text());
}
const modelUrl = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
const modelPath = path.join(root,'public/models/hand_landmarker-v1.task');
await mkdir(path.dirname(modelPath), { recursive: true });
let hasModel = false;
try { hasModel = (await stat(modelPath)).size === 7819105; } catch {}
if (!hasModel) {
  const response = await fetch(modelUrl, { signal: AbortSignal.timeout(120000) });
  if (!response.ok) throw new Error(`Model download failed: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length !== 7819105) throw new Error(`Unexpected model size: ${bytes.length}`);
  await writeFile(modelPath, bytes);
}
const modelHash = createHash('sha256').update(await readFile(modelPath)).digest('hex');
console.log(JSON.stringify({ runtimeVersion:version, modelUrl, modelSha256:modelHash, wasmFiles:files, modelBytes:7819105 },null,2));
