<script setup>
import { useRoute } from 'vue-router'

// useRoute(): informações da rota ATUAL (path, params, query...)
// Lembre: useRoute = "onde estou"  |  useRouter = "quero ir para"
const route = useRoute()
</script>

<template>
  <section class="not-found">
    <p class="code">404</p>
    <p>
      A página <code>{{ route.path }}</code> não existe.
    </p>
    <RouterLink to="/">Voltar para a lista</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  text-align: center;
  color: var(--muted);
  padding: 16px 0;
}

.code {
  margin: 0;
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
}

a {
  color: var(--primary);
}
</style>