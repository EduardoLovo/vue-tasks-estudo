<script setup>
import { storeToRefs } from 'pinia'
import { useTasksStore } from './stores/tasks'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

// "Pega" a store. Qualquer componente que chamar isto recebe a MESMA store
const store = useTasksStore()

/*
 * ⚠️ Atenção: desestruturar a store direto  →  const { tasks } = store
 * PERDE a reatividade (a tela para de atualizar).
 *
 * storeToRefs() transforma state e getters em refs, mantendo tudo reativo.
 * As actions (funções) não são reativas, então podem ser desestruturadas direto da store.
 */
const { tasks, filter, filteredTasks, pendingCount, doneCount } = storeToRefs(store)
const { addTask, toggleTask, removeTask, clearDone } = store

// As opções dos botões são da TELA, não dos dados, então ficam aqui
const filters = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'done', label: 'Concluídas' },
]
</script>

<template>
  <main class="app">
    <h1>📝 Vue Tasks</h1>

    <TaskForm @add="addTask" />

    <nav class="filters">
      <!--
        Um botão para cada filtro.
        :class   → o botão do filtro atual ganha a classe "active"
        @click   → dá para alterar um ref direto no template (sem .value!)
      -->
      <button
        v-for="f in filters"
        :key="f.value"
        :class="{ active: filter === f.value }"
        @click="filter = f.value"
      >
        {{ f.label }}
      </button>
    </nav>

    <!-- 🆕 A lista agora recebe a versão FILTRADA -->
    <TaskList :tasks="filteredTasks" @toggle="toggleTask" @remove="removeTask" />

    <footer v-if="tasks.length" class="footer">
      <!-- Template bem mais limpo: a lógica foi para os computed -->
      <span>{{ pendingCount }} {{ pendingCount === 1 ? 'pendente' : 'pendentes' }}</span>
      <button v-if="doneCount" class="link" @click="clearDone">Limpar concluídas</button>
    </footer>
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

h1 {
  margin: 0 0 20px;
  font-size: 1.6rem;
  color: var(--primary);
}

.footer {
  display: flex;
  justify-content: space-between; /* texto à esquerda, botão à direita */
  margin-top: 16px;
  font-size: 0.9rem;
  color: var(--muted);
}

.link {
  border: none;
  background: none;
  color: var(--muted);
  cursor: pointer;
  text-decoration: underline;
}

.filters {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}

.filters button {
  flex: 1; /* os 3 botões com a mesma largura */
  padding: 6px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--text);
  cursor: pointer;
}

.filters button.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}
</style>