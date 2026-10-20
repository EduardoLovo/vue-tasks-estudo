<script setup>
import { useTasksStore } from './stores/tasks'

// A mesma store das páginas: o contador no menu atualiza junto
const store = useTasksStore()
</script>

<template>
  <main class="app">
    <header class="header">
      <h1>📝 Vue Tasks</h1>
      <nav>
        <!--
          RouterLink é o "<a>" do Vue Router: troca de página SEM recarregar.
          to="/"           → link pela URL
          :to="{ name }"   → link pelo NOME da rota (se a URL mudar um dia, o link continua certo)
        -->
        <RouterLink to="/">Tarefas</RouterLink>
        <RouterLink :to="{ name: 'stats' }">
          Estatísticas
          <span v-if="store.pendingCount" class="badge">{{ store.pendingCount }}</span>
        </RouterLink>
      </nav>
    </header>

    <!-- Aqui aparece o componente da rota atual -->
    <RouterView />
  </main>
</template>

<style scoped>
.app {
  max-width: 480px;
  margin: 48px auto;
  padding: 24px;
  background: var(--card);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgb(0 0 0 / 0.08);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* título à esquerda, menu à direita */
  flex-wrap: wrap; /* em tela pequena, o menu desce para a linha de baixo */
  gap: 8px;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
  font-size: 1.6rem;
  color: var(--primary);
}

nav {
  display: flex;
  gap: 16px;
}

nav a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 500;
}

/*
 * O RouterLink da rota ativa ganha esta classe AUTOMATICAMENTE.
 * Usamos a versão "exact" porque a "router-link-active" deixaria
 * o link "/" ativo em TODAS as páginas (toda URL começa com /).
 */
nav a.router-link-exact-active {
  color: var(--primary);
}

/* Bolinha com o número de pendentes */
.badge {
  display: inline-block;
  min-width: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: var(--primary);
  color: white;
  font-size: 0.75rem;
  text-align: center;
}
</style>