<script setup>
import { computed } from 'vue'
import { useTasksStore } from '../stores/tasks'

// Primeiro a store...
const store = useTasksStore()

// ...depois o que USA a store
const progress = computed(() =>
  store.tasks.length ? Math.round((store.doneCount / store.tasks.length) * 100) : 0,
)
</script>

<template>
  <section>
    <div class="cards">
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
    </div>

    <p class="label">Progresso: {{ progress }}%</p>
    <div class="bar">
      <!-- :style com objeto: a largura acompanha o valor reativo -->
      <div class="fill" :style="{ width: progress + '%' }"></div>
    </div>
  </section>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colunas de tamanhos iguais */
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

.label {
  margin: 20px 0 8px;
  font-size: 0.9rem;
  color: var(--muted);
}

/* O "trilho" cinza */
.bar {
  height: 10px;
  border-radius: 5px;
  background: var(--border);
  overflow: hidden; /* corta o preenchimento nas bordas arredondadas */
}

/* O preenchimento verde: a largura vem do :style */
.fill {
  height: 100%;
  background: var(--primary);
  transition: width 0.3s; /* anima quando a largura muda */
}
</style>