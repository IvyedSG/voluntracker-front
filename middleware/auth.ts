export default defineNuxtRouteMiddleware(async (to) => {
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
  
  // Si estamos autenticados pero no tenemos datos completos del usuario, intentar obtenerlos
  if (auth.isAuthenticated.value && (!auth.user.value?.creado_en || !auth.user.value?.actualizado_en)) {
    try {
      // Silenciosamente obtener datos actualizados del perfil
      await auth.getProfile()
    } catch (error) {
      console.error('Error al actualizar perfil de usuario:', error)
      // No redireccionamos aquí, continuamos con los datos que tenemos
    }
  }
})