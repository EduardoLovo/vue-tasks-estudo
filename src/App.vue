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
</script>

<template>
  <main class="app">
    <h1>📝 Vue Tasks</h1>

    <!-- @add escuta o evento que o TaskForm emite. O texto chega como parâmetro de addTask -->
    <TaskForm @add="addTask" />

    <!-- :tasks passa a lista para o TaskList como PROP -->
    <TaskList :tasks="tasks" />

    <p v-if="tasks.length" class="footer">
      Total: {{ tasks.length }} {{ tasks.length === 1 ? 'tarefa' : 'tarefas' }}
    </p>
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
  margin-top: 16px;
  font-size: 0.9rem;
  color: var(--muted);
}
</style>