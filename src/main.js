import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthInit } from '@/components/composables/useAuthInit'

import App from './App.vue'
import router from './router'

// font
import '@fontsource/poppins'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

useAuthInit()

app.mount('#app')
