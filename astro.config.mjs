import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercel from '@astrojs/vercel/serverless';
import react from "@astrojs/react";
import playformCompress from "@playform/compress";
import robotsTxt from "astro-robots-txt";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  site: "",
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    maxDuration: 8
  }),
  integrations: [tailwind({
    applyBaseStyles: false
  }), sitemap(), react(), playformCompress(), robotsTxt({ sitemap: false }), astroI18next()]
});