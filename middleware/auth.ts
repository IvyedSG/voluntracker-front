export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth()
  
  // Permitir acceso a ruta de login
  if (to.path === '/login') {
    // Si ya está autenticado, redirigir según tipo de usuario
    if (auth.isAuthenticated.value && auth.user.value) {
      // Redirigir basado en el tipo de usuario
      return navigateTo(
        auth.user.value.userType === 'admin_plataforma' 
          ? '/tenants' 
          : '/dashboard',
        { replace: true }
      )
    }
    return // Permitir acceso a login para usuarios no autenticados
  }
  
  // Proteger todas las demás rutas
  if (!auth.isAuthenticated.value) {
    return navigateTo('/login', { replace: true })
  }
})