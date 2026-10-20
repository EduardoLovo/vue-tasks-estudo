<script setup>
import { ref } from 'vue'

// Agora a lista começa VAZIA: quem preenche é o usuário
const tasks = ref([])

// Guarda o que está sendo digitado no input (ligado via v-model)
const newTitle = ref('')

function addTask() {
  // .trim() remove espaços do começo e do fim: "  oi  " → "oi"
  const title = newTitle.value.trim()

  // Se estiver vazio, não faz nada (return encerra a função)
  if (!title) return

  // No <script> precisamos do .value para acessar o conteúdo do ref
  tasks.value.push({
    id: Date.now(), // milissegundos desde 1970: um número único e simples
    title,          // atalho para  title: title
    done: false,
  })

  // Limpa o campo. Como é v-model, o input na tela também fica vazio
  newTitle.value = ''
}
</script>

<template>
  <main class="app">
    <h1>📝 Vue Tasks</h1>

    <!--
      @submit  → escuta o evento "submit" do formulário (Enter ou clique no botão)
      .prevent → impede o comportamento padrão do navegador (recarregar a página)
    -->
    <form class="form" @submit.prevent="addTask">
      <!--
        v-model liga o input à variável newTitle NOS DOIS SENTIDOS:
          digitou no input → newTitle muda
          mudou newTitle no código → o input muda
      -->
      <input v-model="newTitle" placeholder="O que precisa ser feito?" autofocus />

      <!-- :disabled desabilita o botão enquanto o campo estiver vazio -->
      <button type="submit" :disabled="!newTitle.trim()">Adicionar</button>
    </form>

    <!-- v-if: só mostra a lista se houver tarefas -->
    <ul v-if="tasks.length" class="list">
      <li v-for="task in tasks" :key="task.id" class="item" :class="{ done: task.done }">
        {{ task.title }}
      </li>
    </ul>

    <!-- v-else: mostrado quando o v-if anterior for falso -->
    <p class="footer">Total: {{ tasks.length }} {{ tasks.length === 1 ? 'tarefa' : 'tarefas' }}</p>
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

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item {
  padding: 10px 4px;
  border-bottom: 1px solid var(--border);
}

/* Tarefa concluída: riscada e com cor mais apagada */
.item.done {
  text-decoration: line-through;
  color: var(--muted);
}

.footer {
  margin-top: 16px;
  font-size: 0.9rem;
  color: var(--muted);
}

.form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.form input {
  flex: 1; /* ocupa todo o espaço que sobrar */
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 1rem;
  background: var(--bg);
  color: var(--text);
}

.form input:focus {
  outline: 2px solid var(--primary);
  border-color: transparent;
}

.form button {
  padding: 0 16px;
  border: none;
  border-radius: 6px;
  background: var(--primary);
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.form button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty {
  text-align: center;
  color: var(--muted);
  padding: 24px 0;
}
</style>