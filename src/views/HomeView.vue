<script setup>
import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/tasks'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'

const store = useTasksStore()

const { tasks, filter, filteredTasks, pendingCount, doneCount } = storeToRefs(store)
const { addTask, toggleTask, updateTitle, removeTask, clearDone } = store

const filters = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'done', label: 'Concluídas' },
]
</script>

<template>
  <TaskForm @add="addTask" />

  <nav class="filters">
    <!-- Como "filter" vive na store, o filtro escolhido continua ao trocar de página e voltar -->
    <button
      v-for="f in filters"
      :key="f.value"
      :class="{ active: filter === f.value }"
      @click="filter = f.value"
    >
      {{ f.label }}
    </button>
  </nav>

  <TaskList
    :tasks="filteredTasks"
    @toggle="toggleTask"
    @remove="removeTask"
    @rename="updateTitle"
  />

  <footer v-if="tasks.length" class="footer">
    <span>{{ pendingCount }} {{ pendingCount === 1 ? 'pendente' : 'pendentes' }}</span>
    <button v-if="doneCount" class="link" @click="clearDone">Limpar concluídas</button>
  </footer>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}

.filters button {
  flex: 1;
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

.footer {
  display: flex;
  justify-content: space-between;
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
</style>