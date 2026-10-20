<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: { type: Array, required: true },
})

defineEmits(['toggle', 'remove'])
</script>

<template>
  <ul v-if="tasks.length" class="list">
    <!--
      O TaskList só REPASSA os eventos para o App,
      acrescentando o id da tarefa que foi clicada.
    -->
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="$emit('toggle', task.id)"
      @remove="$emit('remove', task.id)"
    />
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