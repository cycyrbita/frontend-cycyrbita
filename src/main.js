import './assets/styles/main.scss'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'


import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

app.mount('#app')
