<script setup>
import { ref } from 'vue'

// defineEmits declara quais eventos este componente envia para o pai
const emit = defineEmits(['add'])

// O texto digitado agora é "assunto" só do formulário
const title = ref('')

function submit() {
  const text = title.value.trim()
  if (!text) return
  emit('add', text) // "Pai, o usuário quer adicionar isto!"
  title.value = ''  // limpa o input
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <input v-model="title" placeholder="O que precisa ser feito?" autofocus />
    <button type="submit" :disabled="!title.trim()">Adicionar</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 1rem;
  background: var(--bg);
  color: var(--text);
}

input:focus {
  outline: 2px solid var(--primary);
  border-color: transparent;
}

button {
  padding: 0 16px;
  border: none;
  border-radius: 6px;
  background: var(--primary);
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>