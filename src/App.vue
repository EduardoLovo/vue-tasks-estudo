<script setup>
import { ref } from 'vue'

/*
 * ref() cria um valor REATIVO: quando ele muda, a tela se atualiza sozinha.
 * Por enquanto a lista é fixa. Nas próximas etapas o usuário vai adicionar tarefas.
 *
 * Cada tarefa é um OBJETO com:
 *   id    → identificador único (o Vue precisa dele no v-for)
 *   title → o texto da tarefa
 *   done  → true se está concluída, false se está pendente
 */
const tasks = ref([
  { id: 1, title: 'Estudar HTTP e HTTPS', done: true },
  { id: 2, title: 'Aprender o básico de SQL', done: true },
  { id: 3, title: 'Criar meu primeiro app em Vue', done: false },
  { id: 4, title: 'Praticar Vue Router', done: false },
])
</script>

<template>
  <main class="app">
    <h1>📝 Vue Tasks</h1>

    <ul class="list">
      <!--
        v-for repete o <li> para CADA tarefa da lista.
        :key diz ao Vue qual item é qual (precisa ser ÚNICO → usamos o id).
        :class adiciona a classe "done" SÓ quando task.done for true.
      -->
      <li v-for="task in tasks" :key="task.id" class="item" :class="{ done: task.done }">
        <!-- {{ }} mostra o valor de uma variável no HTML -->
        {{ task.title }}
      </li>
    </ul>

    <!-- Expressões JavaScript simples também funcionam dentro de {{ }} -->
    <p class="footer">Total: {{ tasks.length }} tarefas</p>
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
</style>