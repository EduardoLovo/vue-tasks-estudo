import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/*
 * Cada rota liga uma URL (path) a um componente (a "página").
 * O componente da rota ativa aparece no <RouterView /> do App.vue.
 */
const routes = [
  {
    path: '/',
    name: 'home', // nome da rota: dá para criar links pelo nome em vez da URL
    component: HomeView, // import normal: entra junto no carregamento inicial
  },
  {
    path: '/estatisticas',
    name: 'stats',
    // Lazy loading: o código desta página só é baixado quando alguém a visita
    component: () => import('../views/StatsView.vue'),
  },
]

const router = createRouter({
  // createWebHistory: URLs "limpas" (/estatisticas) usando a History API do navegador
  history: createWebHistory(),
  routes,
})

export default router