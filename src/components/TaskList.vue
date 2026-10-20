<script setup>
// Para usar um componente dentro de outro, basta importar
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: { type: Array, required: true },
})
</script>

<template>
  <ul v-if="tasks.length" class="list">
    <!--
      O v-for agora repete um COMPONENTE, não um <li>.
      :task="task" passa cada tarefa como prop para o TaskItem.
    -->
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
  </ul>
  <p v-else class="empty">Nenhuma tarefa por aqui ✨</p>
</template>

<style scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.empty {
  text-align: center;
  color: var(--muted);
  padding: 24px 0;
}
</style>