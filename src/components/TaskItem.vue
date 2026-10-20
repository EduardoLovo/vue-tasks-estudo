<script setup>
defineProps({
  task: { type: Object, required: true },
})

// Os dois eventos que este componente pode enviar ao pai
defineEmits(['toggle', 'remove'])
</script>

<template>
  <li class="item" :class="{ done: task.done }">
    <!--
      Por que não v-model aqui? Props são SOMENTE LEITURA no filho.
      Então o checkbox só MOSTRA o estado (:checked) e AVISA o pai (@change).
      $emit pode ser usado direto no template, sem criar função.
    -->
    <input type="checkbox" :checked="task.done" @change="$emit('toggle')" />

        <!-- Link para a rota "task", preenchendo o parâmetro :id → gera /tarefa/<id> -->
    <RouterLink class="title" :to="{ name: 'task', params: { id: task.id } }">
      {{ task.title }}
    </RouterLink>

    <button class="remove" title="Remover" @click="$emit('remove')">✕</button>
  </li>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 4px;
  border-bottom: 1px solid var(--border);
}

input {
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: var(--primary); /* cor do checkbox marcado */
  cursor: pointer;
}

.title {
  flex: 1;
  color: var(--text);
  text-decoration: none; /* tira o sublinhado padrão de link */
}

.title:hover {
  color: var(--primary);
}

.done .title {
  text-decoration: line-through;
  color: var(--muted);
}

.remove {
  border: none;
  background: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 1rem;
  opacity: 0; /* invisível... */
  transition: opacity 0.15s;
}

.item:hover .remove {
  opacity: 1; /* ...e aparece ao passar o mouse na tarefa */
}

.remove:hover {
  color: #e5484d;
}
</style>