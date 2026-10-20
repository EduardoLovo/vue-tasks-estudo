<script setup>
import { useTasksStore } from '../stores/tasks'
import { computed } from 'vue'

const progress = computed(() =>
  store.tasks.length ? Math.round((store.doneCount / store.tasks.length) * 100) : 0,
)
// Mesma store da lista: nenhum dado precisa ser passado entre as páginas
const store = useTasksStore()
</script>

<template>
  <section class="cards">
    <div class="card">
      <strong>{{ store.tasks.length }}</strong>
      <span>Total</span>
    </div>
    <div class="card">
      <strong>{{ store.pendingCount }}</strong>
      <span>Pendentes</span>
    </div>
    <div class="card">
      <strong>{{ store.doneCount }}</strong>
      <span>Concluídas</span>
    </div>
    <div class="card">
      <strong>{{ progress }}%</strong>
      <span>Progresso</span>
    </div>
  </section>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 3 colunas de tamanhos iguais */
  gap: 8px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  border: 1px solid var(--border);
  border-radius: 8px;
}

.card strong {
  font-size: 1.8rem;
  color: var(--primary);
}

.card span {
  font-size: 0.85rem;
  color: var(--muted);
}
</style>