import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './styles.css'

import en from './locales/en.json'
import kh from './locales/kh.json'
import zh from './locales/zh.json'

const messages = { en, kh, zh }

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('site_lang') || 'en',
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
