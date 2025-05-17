export default defineNuxtRouteMiddleware(async (to) => {
  // Permitir acceso a la ruta de login siempre
  if (to.path === '/login') {
    const auth = useAuth()
    
    // Si ya está autenticado, redirigir según tipo de usuario
    if (auth.isAuthenticated.value && auth.user.value) {
      return navigateTo(
        auth.user.value.userType === 'admin_plataforma' 
          ? '/tenants' 
          : '/dashboard',
        { replace: true }
      )
    }
    
    return // Permitir acceso a login para usuarios no autenticados
  }
  
  // Para todas las demás rutas, verificar autenticación
  const auth = useAuth()
  
  // Verificar si el usuario está autenticado
  if (!auth.isAuthenticated.value) {
    // Intentar actualizar la autenticación
    const isAuth = await auth.checkAuth()
    
    if (!isAuth) {
      return navigateTo('/login', { replace: true })
    }
  }
  
  // Verificar permisos específicos por ruta
  if (auth.user.value) {
    const userType = auth.user.value.userType
    
    // Proteger ruta /tenants solo para administradores de plataforma
    if (to.path.startsWith('/tenants') && userType !== 'admin_plataforma') {
      return navigateTo('/dashboard', { replace: true })
    }
    
    // Aquí puedes agregar otras verificaciones de permisos específicas
  }
  
  // Completar datos del usuario si faltan
  if (auth.isAuthenticated.value && auth.user.value && 
      (!auth.user.value?.creado_en || !auth.user.value?.actualizado_en)) {
    try {
      await auth.getProfile()
    } catch (error) {
      console.error('Error al actualizar perfil de usuario:', error)
      // Continuar con los datos que tenemos
    }
  }
})