import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://tannerwj.com",
  output: "static",
  integrations: [
    sitemap({
      // /s/<slug> pages are noindex share stubs — keep them out of the sitemap.
      filter: (page) => !new URL(page).pathname.startsWith("/s/"),
    }),
  ],
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
