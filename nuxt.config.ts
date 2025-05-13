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
    '@nuxtjs/color-mode', // Asegúrate de incluir este módulo
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
        global: true
      }
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext']
    },
    processCSSVariables: true
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  routeRules: {
    '/**': { appMiddleware: ['auth'] }
  },
  colorMode: {
    preference: 'dark', // Establece el modo preferido a oscuro
    fallback: 'dark',   // Usa oscuro si no se detecta preferencia del sistema
    classSuffix: '',    // No agrega sufijo a las clases (usa 'dark' en lugar de 'dark-mode')
  },
})
