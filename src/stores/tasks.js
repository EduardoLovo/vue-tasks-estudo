import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'vue-tasks'
const FILTER_KEY = 'vue-tasks-filter'

/*
 * Store do Pinia: estado GLOBAL da aplicação.
 *
 * Este é o estilo "setup store", igualzinho ao <script setup>:
 *   ref      → STATE   (os dados)
 *   computed → GETTERS (valores calculados)
 *   function → ACTIONS (o que altera os dados)
 *
 * 'tasks' é o ID da store (aparece no Vue DevTools).
 * Por convenção, o nome da função começa com "use" e termina com "Store".
 */
export const useTasksStore = defineStore('tasks', () => {
  // ---- state ----
  const tasks = ref(loadTasks())
  const filter = ref(localStorage.getItem(FILTER_KEY) ?? 'all') // 'all' | 'pending' | 'done'

  // ---- getters ----
  const filteredTasks = computed(() => {
    if (filter.value === 'pending') return tasks.value.filter((t) => !t.done)
    if (filter.value === 'done') return tasks.value.filter((t) => t.done)
    return tasks.value
  })
  const pendingCount = computed(() => tasks.value.filter((t) => !t.done).length)
  const doneCount = computed(() => tasks.value.length - pendingCount.value)

  // ---- actions ----
  // 🆕 Busca uma tarefa pelo id (vamos usar na página de detalhes)
  function getTask(id) {
    return tasks.value.find((t) => t.id === id)
  }

  function addTask(title) {
    tasks.value.push({
      id: Date.now(),
      title,
      notes: '', // 🆕 anotações (usadas na página de detalhes)
      done: false,
      createdAt: new Date().toISOString(), // 🆕 data de criação, ex: "2026-10-20T17:30:00.000Z"
    })
  }

  function toggleTask(id) {
    const task = getTask(id) // reaproveita a action de cima
    if (task) task.done = !task.done
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function clearDone() {
    tasks.value = tasks.value.filter((t) => !t.done)
  }

  // ---- persistência ----
  watch(tasks, (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)), {
    deep: true,
  })
  watch(filter, (value) => localStorage.setItem(FILTER_KEY, value))

  // Só o que for RETORNADO aqui fica acessível para os componentes
  return {
    tasks,
    filter,
    filteredTasks,
    pendingCount,
    doneCount,
    getTask,
    addTask,
    toggleTask,
    removeTask,
    clearDone,
  }
})

// Função auxiliar FORA da store: é só um detalhe interno, ninguém de fora precisa dela
function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}