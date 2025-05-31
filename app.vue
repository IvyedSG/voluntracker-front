<template>
  <UApp>
    <!-- Si estamos en /login o página de inicio, solo renderizamos la página sin layout -->
    <div v-if="isPageWithoutLayout">
      <NuxtPage />
    </div>
    <!-- Para todas las demás rutas, usamos el layout correspondiente -->
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Información de la ruta actual
const route = useRoute()

// Detectar páginas que no necesitan layout
const isPageWithoutLayout = computed(() => {
  const pagesWithoutLayout = ['/login', '/', '/auth/login']
  return pagesWithoutLayout.includes(route.path)
})
</script>