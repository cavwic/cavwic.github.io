import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://cavwic.github.io",
  output: "static",
  trailingSlash: "never",
  integrations: [sitemap()],
});
