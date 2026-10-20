<script setup>
import { ref } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

// O App continua sendo o DONO dos dados
const tasks = ref([])

// Recebe o texto que veio do evento "add" do TaskForm
function addTask(title) {
  tasks.value.push({
    id: Date.now(),
    title,
    done: false,
  })
}

// Inverte o "done" da tarefa com aquele id
function toggleTask(id) {
  // .find() devolve o PRIMEIRO item que satisfaz a condição (ou undefined)
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.done = !task.done // ! inverte: true → false, false → true
}

// Remove a tarefa com aquele id
function removeTask(id) {
  // .filter() cria um NOVO array só com os itens que passam no teste.
  // "Fique com todas as tarefas cujo id seja DIFERENTE deste"
  tasks.value = tasks.value.filter((t) => t.id !== id)
}

// Remove todas as tarefas concluídas
function clearDone() {
  tasks.value = tasks.value.filter((t) => !t.done)
}
</script>

<template>
  <main class="app">
    <h1>📝 Vue Tasks</h1>

    <!-- @add escuta o evento que o TaskForm emite. O texto chega como parâmetro de addTask -->
    <TaskForm @add="addTask" />

    <!-- :tasks passa a lista para o TaskList como PROP -->
    <TaskList :tasks="tasks" @toggle="toggleTask" @remove="removeTask" />

    <footer v-if="tasks.length" class="footer">
      <span>Total: {{ tasks.length }} {{ tasks.length === 1 ? 'tarefa' : 'tarefas' }}</span>
      <button v-if="tasks.some((t) => t.done)" class="link" @click="clearDone">
  Limpar concluídas
      </button>
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
</style>