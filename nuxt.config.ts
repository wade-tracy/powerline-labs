import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vercel/analytics'],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Powerline Labs — Web & Mobile App Development',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Powerline Labs builds high-performance web and mobile applications for businesses ready to move fast. Modern tech, clean code, real results.',
        },
        { name: 'theme-color', content: '#0F172A' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://powerlinelabs.com' },
        { property: 'og:title', content: 'Powerline Labs — Web & Mobile App Development' },
        {
          property: 'og:description',
          content:
            'Powerline Labs builds high-performance web and mobile applications for businesses ready to move fast.',
        },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Powerline Labs — Web & Mobile App Development' },
        {
          name: 'twitter:description',
          content: 'Powerline Labs builds high-performance web and mobile applications.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY ?? '',
    contactToEmail: process.env.CONTACT_TO_EMAIL ?? '',
  },
})
