// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
  ],
  experimental: {
    payloadExtraction: false,
  },
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
    optimizeDeps: {
      exclude: ["fsevents"],
    },
  },
  fonts: {
    families: [
      {
        name: "DM Sans",
        weights: [400, 500, 600, 700],
        styles: ["normal", "italic"],
        provider: "google",
        global: true,
      },
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
    },
    processCSSVariables: true,
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  routeRules: {
    "/**": { appMiddleware: ["auth"] },
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
    classSuffix: "",
  },
});
