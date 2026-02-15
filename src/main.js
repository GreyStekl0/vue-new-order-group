import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from '@/router.js'

const BlackHatPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eef7f2',
      100: '#d6ebdf',
      200: '#aed6c0',
      300: '#83be9f',
      400: '#4f9d7b',
      500: '#2f7c5d',
      600: '#245f48',
      700: '#1d4f3c',
      800: '#193f31',
      900: '#143228',
      950: '#0a1c16',
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: BlackHatPreset,
    options: {
      darkModeSelector: false,
    },
  },
})

app.mount('#app')
