// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  fonts: {
    families: [
      {
        name: 'DM Sans',
        weights: [400, 500, 600, 700],
        styles: ['normal', 'italic'],
        provider: 'google',
        global: true // This ensures the font is loaded globally
      }
    ],
    defaults: {
      // Default font options
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext']
    },
    // Enable CSS variable processing to work better with Tailwind
    processCSSVariables: true
  },
  // Actualiza runtimeConfig para usar URL relativas
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  // Aplica el middleware de autenticación globalmente
  routeRules: {
    '/**': { appMiddleware: ['auth'] }
  }
})