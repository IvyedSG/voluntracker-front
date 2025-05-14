<template>
  <UApp>
    <!-- Si la ruta actual es '/login', no usar layout -->
    <div v-if="isLoginPage">
      <NuxtPage />
    </div>
    <!-- Usar el layout definido en la página -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
// Obtener el estado de autenticación
const auth = useAuth()
const route = useRoute()

// Simple verificación para determinar si estamos en la página de login
const isLoginPage = computed(() => route.path === '/login')

// Debounce utilidad para la transición
const applyTransition = useDebounce(() => {
  document.body.classList.add('layout-transition')
  setTimeout(() => {
    document.body.classList.remove('layout-transition')
  }, 300)
}, 50)

// Observar cambios en ruta o estado de autenticación
watch(
  [() => route.path, () => auth.isAuthenticated.value], 
  () => {
    // Aplicar transición solo cuando el DOM esté listo
    nextTick(applyTransition)
  }
)

// Función de debounce para optimizar
function useDebounce(fn, delay) {
  let timeout
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}
</script>

<style>
/* Animación suave para transiciones de layout */
.layout-transition {
  animation: layout-fade 0.3s ease;
}

@keyframes layout-fade {
  0% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
</style>
