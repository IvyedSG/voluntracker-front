<script setup>
definePageMeta({
  layout: false, // ← Añadir esta línea
  middleware: () => {
    const auth = useAuth()
    
    if (auth.isAuthenticated.value) {
      const user = auth.user.value
      if (user && user.userType === 'admin_plataforma') {
        return navigateTo('/tenants')
      } else {
        return navigateTo('/dashboard')
      }
    }
    
    return navigateTo('/login')
  }
})
</script>



