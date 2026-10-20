<script setup>
import { ref } from 'vue'

const props = defineProps({
  task: { type: Object, required: true },
})

// Os eventos que este componente pode enviar ao pai
const emit = defineEmits(['toggle', 'remove', 'rename'])

// 🆕 Estado LOCAL da edição: só este item sabe se está sendo editado
const isEditing = ref(false)
const draft = ref('') // o texto do input enquanto edita (não mexe na tarefa até salvar)

function startEdit() {
  draft.value = props.task.title
  isEditing.value = true
}

function save() {
  // Enter salva e some com o input, o que também pode disparar o blur:
  // este "if" evita salvar duas vezes (e salvar depois de um Esc)
  if (!isEditing.value) return
  isEditing.value = false
  // A store ignora título vazio/só espaços e aplica o trim()
  if (draft.value.trim() !== props.task.title) emit('rename', draft.value)
}

function cancel() {
  isEditing.value = false // o draft é descartado, o título original fica
}

/*
 * 🆕 Diretiva customizada: no <script setup>, qualquer variável que comece com "v"
 * + letra maiúscula vira diretiva. vFocus → v-focus no template.
 * "mounted" roda quando o elemento entra na tela: aí já dá para focar.
 * (Alternativa: template ref + await nextTick() + inputRef.value.focus())
 */
const vFocus = {
  mounted: (el) => {
    el.focus()
    el.select() // já seleciona o texto, para facilitar a troca
  },
}
</script>

<template>
  <li class="item" :class="{ done: task.done }">
    <!--
      Por que não v-model aqui? Props são SOMENTE LEITURA no filho.
      Então o checkbox só MOSTRA o estado (:checked) e AVISA o pai (@change).
      $emit pode ser usado direto no template, sem criar função.
    -->
    <input type="checkbox" :checked="task.done" @change="$emit('toggle')" />

    <!--
      🆕 v-if / v-else: ou mostra o input (editando) ou o texto.
      @keyup.enter / @keyup.esc são MODIFICADORES de evento: só disparam naquela tecla.
    -->
    <input
      v-if="isEditing"
      v-model="draft"
      v-focus
      class="edit"
      @keyup.enter="save"
      @keyup.esc="cancel"
      @blur="save"
    />
    <span v-else class="title" title="Duplo clique para editar" @dblclick="startEdit">
      {{ task.title }}
    </span>

    <!--
      Link para a rota "task", preenchendo o parâmetro :id → gera /tarefa/<id>.
      Fica separado do título: se o título fosse o link, o 1º clique do duplo clique já navegaria.
    -->
    <RouterLink class="details" title="Detalhes" :to="{ name: 'task', params: { id: task.id } }">
      ›
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

input[type='checkbox'] {
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: var(--primary); /* cor do checkbox marcado */
  cursor: pointer;
}

.title {
  flex: 1;
  color: var(--text);
  cursor: text;
  user-select: none; /* evita selecionar a palavra no duplo clique */
}

.edit {
  flex: 1;
  min-width: 0;
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font: inherit;
  background: var(--bg);
  color: var(--text);
}

.edit:focus {
  outline: 2px solid var(--primary);
  border-color: transparent;
}

.details {
  color: var(--muted);
  text-decoration: none; /* tira o sublinhado padrão de link */
  font-size: 1.3rem;
  line-height: 1;
}

.details:hover {
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