import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

// Cria a aplicação, registra o Pinia como PLUGIN e monta na <div id="app">
createApp(App)
  .use(createPinia()) // habilita as stores em todos os componentes
  .mount('#app')