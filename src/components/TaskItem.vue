<script setup>
// defineProps declara os dados que este componente RECEBE do pai.
// type e required ajudam o Vue a avisar no console se algo vier errado.
defineProps({
  task: { type: Object, required: true },
})
</script>

<template>
  <!-- Props podem ser usadas direto no template -->
  <li class="item" :class="{ done: task.done }">
    {{ task.done ? '✅' : '⬜' }} {{ task.title }}
  </li>
</template>

<style scoped>
.item {
  padding: 10px 4px;
  border-bottom: 1px solid var(--border);
}

.done {
  text-decoration: line-through;
  color: var(--muted);
}
</style>