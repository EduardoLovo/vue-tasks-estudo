<script setup>
import { ref, computed, watch } from 'vue' // 🆕 watch
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

// 🆕 Nome da "gaveta" no localStorage. Constante em MAIÚSCULAS = valor fixo de configuração
const STORAGE_KEY = 'vue-tasks'

// 🆕 Lê as tarefas salvas (ou começa com lista vazia)
function loadTasks() {
  try {
    // getItem devolve null se a chave não existir.
    // JSON.parse(null) → null, e ?? troca null/undefined por []
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    // Se o texto salvo estiver corrompido, o JSON.parse lança um erro.
    // Em vez de quebrar o app, começamos do zero.
    return []
  }
}

// 🆕 O valor inicial agora vem do localStorage
const tasks = ref(loadTasks())

// 🆕 Qual filtro está ativo: 'all' | 'pending' | 'done'
const filter = ref(localStorage.getItem('vue-tasks-filter') ?? 'all')

watch(filter, (value) => localStorage.setItem('vue-tasks-filter', value))

// 🆕 Opções dos botões. É uma constante comum (não muda, então não precisa de ref)
const filters = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'done', label: 'Concluídas' },
]

// 🆕 A lista que aparece na tela depende de "tasks" E de "filter"
const filteredTasks = computed(() => {
  if (filter.value === 'pending') return tasks.value.filter((t) => !t.done)
  if (filter.value === 'done') return tasks.value.filter((t) => t.done)
  return tasks.value // 'all'
})

// 🆕 Contadores
const pendingCount = computed(() => tasks.value.filter((t) => !t.done).length)
const doneCount = computed(() => tasks.value.length - pendingCount.value) // computed pode usar outro computed!

function addTask(title) {
  tasks.value.push({
    id: Date.now(),
    title,
    done: false,
  })
}

function toggleTask(id) {
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.done = !task.done
}

function removeTask(id) {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}

function clearDone() {
  tasks.value = tasks.value.filter((t) => !t.done)
}

// 🆕 Sempre que "tasks" mudar, salva no localStorage
watch(
  tasks, // O QUE observar
  (value) => {
    // O QUE FAZER quando mudar (value = o novo valor)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true }, // OPÇÕES: observa também as mudanças DENTRO dos objetos
)
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