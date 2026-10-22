import { defineConfig } from 'astro/config';
// Isolated verification of the new pages, without changing existing catalog
// routes or treating an unrelated full-site route failure as a lab failure.
export default defineConfig({
  site: 'https://cavwic.github.io', output: 'static', trailingSlash: 'never',
  srcDir: './tmp/hand-retargeting-build/src',
  publicDir: './tmp/hand-retargeting-build/public',
  outDir: './tmp/hand-retargeting-build/dist',
  vite: { cacheDir: './tmp/hand-retargeting-build/.vite' },
});
