import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { jeelingDevCache } from "./scripts/jeeling-dev-cache.mjs";
import { siteFeatures } from "./src/data/site-features.ts";

export default defineConfig({
  site: "https://cavwic.github.io",
  output: "static",
  trailingSlash: "never",
  integrations: [sitemap({
    filter: (page) => siteFeatures.aiDeliveryWorkbench || !/^\/(?:en\/)?tools\/ai-delivery-workbench\/?$/.test(new URL(page).pathname),
  })],
  vite: {
    plugins: [jeelingDevCache()],
    json: { stringify: true, namedExports: false },
    // Research HTML is evidence, not an application dependency entry point.
    optimizeDeps: { entries: [] },
    server: { watch: { ignored: ['**/review/**', '**/research/**', '**/tmp/**'] } },
  },
});
