export default defineNuxtPlugin(async (nuxtApp) => {
  // Este plugin se ejecuta solo en el cliente
  if (import.meta.client) {
    const auth = useAuth()
    const route = useRoute()
    
    // Evitar verificación en ruta de login
    if (route.path !== '/login') {
      try {
        // Verificar estado de autenticación
        const isAuth = await auth.checkAuth()
        
        // Si no está autenticado, redirigir a login
        if (!isAuth) {
          // Usar window.location para asegurar limpieza completa del estado
          window.location.href = '/login'
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error)
        // En caso de error, redirigir a login
        window.location.href = '/login'
      }
    }
    
    // Exponer método de logout para uso global
    nuxtApp.provide('logout', () => auth.logout())
  }
})