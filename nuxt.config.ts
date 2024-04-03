
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    'nuxt-mdi'
  ],

  css: [
          'vuetify/lib/styles/main.sass'      
         ],
  build: {
    transpile: ['vuetify'],
  },


  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  

 
})
