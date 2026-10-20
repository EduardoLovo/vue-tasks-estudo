import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // 🆕 (não precisa do /index.js: ele é achado automaticamente)
import './style.css'

createApp(App)
  .use(createPinia()) // habilita as stores em todos os componentes
  .use(router) // 🆕 habilita <RouterView>, <RouterLink>, useRoute() e useRouter()
  .mount('#app')