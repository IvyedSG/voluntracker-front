<script setup>
definePageMeta({
  middleware: () => {
    const auth = useAuth()
    
    // Si el usuario está autenticado, redirigir según su rol
    if (auth.isAuthenticated.value) {
      const user = auth.user.value
      if (user && user.userType === 'admin_plataforma') {
        return navigateTo('/tenants')
      } else {
        return navigateTo('/dashboard')
      }
    }
    
    // Si no está autenticado, redirigir a login
    return navigateTo('/login')
  }
})
</script>

