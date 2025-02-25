import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' 

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
         },

    ssr: true,
    components,
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})