<template>
  <UApp>
    <!-- Si estamos en /login, solo renderizamos la página de login sin layout -->
    <div v-if="isLoginPage">
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

// Detectar si la ruta actual es /login
const isLoginPage = computed(() => route.path === '/login')
</script>