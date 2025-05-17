export default defineNuxtPlugin((nuxtApp) => {
  // Este plugin solo expone el método de logout como inyectable global
  // No gestiona redirecciones para evitar duplicidad con el middleware
  
  if (import.meta.client) {
    const auth = useAuth()
    
    // Exponer método de logout para uso global en la aplicación
    nuxtApp.provide('logout', () => auth.logout())
  }
})