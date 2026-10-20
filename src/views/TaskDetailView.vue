<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTasksStore } from '../stores/tasks'

// O "id" chega como PROP graças ao "props" que definimos na rota.
// (Alternativa sem props: const route = useRoute(); Number(route.params.id))
const props = defineProps({
  id: { type: Number, required: true },
})

const store = useTasksStore()

// useRouter(): o "controle remoto" do router, para navegar pelo código
const router = useRouter()

// computed: se o id da URL mudar, a tarefa exibida muda junto
const task = computed(() => store.getTask(props.id))

/*
 * ?. (optional chaining): se task.value for undefined, para ali e devolve undefined,
 * em vez de dar erro tentando ler .createdAt de undefined.
 * As tarefas criadas antes da Etapa 9 não têm createdAt, então mostram '—'.
 */
const createdAt = computed(() =>
  task.value?.createdAt ? new Date(task.value.createdAt).toLocaleString('pt-BR') : '—',
)

function remove() {
  store.removeTask(props.id)
  router.push({ name: 'home' }) // navega para a lista depois de excluir
}
</script>

<template>
  <section v-if="task" class="detail">
    <!--
      v-model DIRETO na tarefa da store: digitar aqui já altera o estado global
      (e o watch da store salva no localStorage). Volte para a lista e veja!
    -->
    <label class="field">
      <span>Título</span>
      <input v-model="task.title" />
    </label>

    <label class="field">
      <span>Anotações</span>
      <textarea v-model="task.notes" rows="4" placeholder="Detalhes, links, ideias..."></textarea>
    </label>

    <p class="meta">
      Criada em {{ createdAt }} ·
      <strong :class="task.done ? 'ok' : 'pending'">
        {{ task.done ? 'Concluída' : 'Pendente' }}
      </strong>
    </p>

    <div class="actions">
      <button class="primary" @click="store.toggleTask(task.id)">
        {{ task.done ? 'Reabrir' : 'Concluir' }}
      </button>
      <button class="danger" @click="remove">Excluir</button>
      <!-- router.back() = o botão "voltar" do navegador -->
      <!-- <button class="ghost" @click="router.back()">← Voltar</button> -->
      <button class="ghost" :disabled="!task.title.trim()" @click="router.back()">← Voltar</button>
    </div>
  </section>

  <!-- Se alguém digitar /tarefa/999 e essa tarefa não existir -->
  <section v-else class="missing">
    <p>Tarefa #{{ id }} não encontrada.</p>
    <RouterLink to="/">Voltar para a lista</RouterLink>
  </section>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  font-size: 0.85rem;
  color: var(--muted);
}

input,
textarea {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font: inherit; /* textarea não herda a fonte por padrão */
  font-size: 1rem;
  background: var(--bg);
  color: var(--text);
  resize: vertical; /* só deixa redimensionar na altura */
}

input:focus,
textarea:focus {
  outline: 2px solid var(--primary);
  border-color: transparent;
}

.meta {
  font-size: 0.85rem;
  color: var(--muted);
}

.ok {
  color: var(--primary);
}

.pending {
  color: #e5a50a;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.actions button {
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
}

.primary {
  background: var(--primary);
  color: white;
}

.actions .danger {
  background: transparent;
  border-color: #e5484d;
  color: #e5484d;
}

.ghost {
  margin-left: auto; /* empurra o "Voltar" para a direita */
  background: transparent;
  color: var(--muted);
}

.ghost:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.missing {
  text-align: center;
  color: var(--muted);
  padding: 24px 0;
}

.missing a {
  color: var(--primary);
}
</style>