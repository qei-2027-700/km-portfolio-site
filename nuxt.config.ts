// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME || 'KM Portfolio'
    }
  },

  css: ['~/assets/css/main.css'],
  
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxthq/studio',
  ],

  // https://content.nuxt.com/docs/getting-started/configuration
  content: {
    highlight: {
      theme: 'github-light'
    }
  },
})
