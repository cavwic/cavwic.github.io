import { defineConfig } from 'astro/config';
// Isolate these routes from the existing, unrelated product-catalog build.
export default defineConfig({
  site: 'https://cavwic.github.io', output: 'static', trailingSlash: 'never',
  srcDir: './tmp/robotics-lab-build/src',
  publicDir: './tmp/robotics-lab-build/public',
  outDir: './tmp/robotics-lab-build/dist',
  vite: { cacheDir: './tmp/robotics-lab-build/.vite' },
});
