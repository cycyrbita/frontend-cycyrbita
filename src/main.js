import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice'
import VueClipboard from 'vue3-clipboard'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
})
app.use(vuetify)

app.mount('#app')
