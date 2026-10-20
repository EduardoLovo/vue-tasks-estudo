import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/*
 * Cada rota liga uma URL (path) a um componente (a "página").
 * O componente da rota ativa aparece no <RouterView /> do App.vue.
 * meta: "informações extras" que podemos pendurar na rota (aqui, o título da aba).
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Tarefas' },
  },
  {
    // 🆕 :id é um PARÂMETRO dinâmico. /tarefa/123 → id = '123'
    path: '/tarefa/:id',
    name: 'task',
    component: () => import('../views/TaskDetailView.vue'),
    // 🆕 props: transforma os params da rota em PROPS do componente.
    // Parâmetros da URL sempre chegam como TEXTO, então convertemos para número
    // (os ids das tarefas são números, e '123' === 123 é false!)
    props: (route) => ({ id: Number(route.params.id) }),
    meta: { title: 'Detalhes' },
  },
  {
    path: '/estatisticas',
    name: 'stats',
    component: () => import('../views/StatsView.vue'),
    meta: { title: 'Estatísticas' },
  },
  {
    // 🆕 Rota "pega-tudo": qualquer URL que não casou com as de cima → 404.
    // Tem que ser a ÚLTIMA da lista.
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Página não encontrada' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🆕 Navigation guard: roda DEPOIS de toda navegação. Aqui atualiza o título da aba.
router.afterEach((to) => {
  document.title = `${to.meta.title} · Vue Tasks`
})

export default router