<template>
  <div class="flex h-screen bg-gradient-to-b from-[#1c2f29] to-[#1a2622] text-white overflow-hidden">
    <!-- SIDEBAR -->
    <div class="w-16 md:w-20 flex flex-col justify-between z-10 bg-transparent">
      <div>
        <!-- LOGO -->
        <div class="py-4 flex flex-col items-center justify-center border-green-800/20">
          <div class="p-1.5 rounded-xl bg-gradient-to-r from-green-800/30 to-green-700/20 backdrop-blur-sm">
            <NuxtImg src="/logo192.png" alt="VolunTracker Logo" class="h-10 w-10 drop-shadow-xl" />
          </div>
        </div>
        
        <!-- BOTONES -->
        <nav class="pt-6">
          <ul class="space-y-5">
            <li v-for="(item, index) in navigation" :key="index">
              <NuxtLink 
                :to="item.to" 
                class="flex flex-col items-center px-2 py-2.5 transition-all duration-300"
                :class="{ 
                  'text-white': $route.path === item.to,
                  'text-green-100/80 hover:text-green-300': $route.path !== item.to,
                }"
              >
                <div class="relative">
                  <UIcon 
                    :name="$route.path === item.to ? item.activeIcon : item.icon" 
                    :size="24" 
                    class="mb-1.5 transition-all duration-200"
                    :class="{ 
                      'text-green-300 drop-shadow-md scale-110': $route.path === item.to,
                      'hover:scale-110': $route.path !== item.to
                    }"
                  />
                </div>
                <span class="text-xs font-medium tracking-wide">{{ item.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      
      <div class="mt-auto flex flex-col items-center space-y-4 mb-5">
        <!-- NOTIFICACIONES -->
        <UDropdownMenu :items="notificationItems" :popper="{ placement: 'right-start' }">
          <div class="flex flex-col items-center cursor-pointer text-green-100/80 hover:text-green-300 transition-all duration-300">
            <div class="relative">
              <UChip 
                color="error" 
                size="xl" 
                position="top-right"
              >
                <UIcon 
                  name="i-heroicons-bell" 
                  :size="24" 
                  class="mb-1.5 hover:scale-110 transition-transform duration-200" 
                />
              </UChip>
            </div>
            <span class="text-xs font-medium tracking-wide">Alertas</span>
          </div>
        </UDropdownMenu>
        
        <!-- PERFIL -->
        <UDropdownMenu :items="userMenuItems" :popper="{ placement: 'right-start' }">
          <div class="cursor-pointer flex flex-col items-center group">
            <div class="p-0.5 rounded-full bg-gradient-to-br from-green-500/70 to-green-300/70 shadow-md group-hover:from-green-400/80 group-hover:to-green-200/80 transition-all duration-300">
              <UAvatar
                :src="user?.avatar || undefined"
                :alt="user?.nombre || 'Admin profile'"
                :text="getUserInitials"
                size="sm"
                class="border-1.5 border-[#1a2622]"
              />
            </div>
            <span class="text-xs font-medium text-green-100/90 mt-1 group-hover:text-green-300 transition-colors duration-200">
              {{ user?.nombre || 'Admin' }}
            </span>
          </div>
        </UDropdownMenu>
      </div>
    </div>
    
    <!-- MAIN CONTENT-->
    <div class="flex-1 overflow-hidden p-2">
      <div class="h-full bg-[#121212] rounded-2xl overflow-hidden shadow-2xl">
        <div class="px-4 py-2.5 bg-gradient-to-r from-[#1a1a1a] to-[#121212] border-b border-gray-800/30">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <!-- Icon for the page -->
              <div class="flex-shrink-0 h-8 w-8 rounded-lg bg-green-900/30 flex items-center justify-center shadow-inner">
                <UIcon 
                  :name="getPageIcon(route.path)" 
                  class="h-4 w-4 text-green-400"
                />
              </div>
              
              <!-- Title and breadcrumb -->
              <div class="flex items-center gap-2">
                <h1 class="text-lg font-bold text-white">{{ pageTitle }}</h1>
                <UBadge v-if="pageBadge" color="green" variant="subtle" size="xl" class="font-medium">
                  {{ pageBadge }}
                </UBadge>

                <!-- Breadcrumb -->
              <div class="flex items-center text-sm text-gray-500 ml-2">
                <div class="h-4 w-px bg-gray-700 mx-2"/>
                <UIcon name="i-heroicons-home" size="sm" class="mr-1.5 opacity-70" />
                <span class="text-green-500/70 font-medium">Admin</span>
                <UIcon name="i-heroicons-chevron-right" size="sm" class="mx-1.5 text-gray-700" />
                <span class="font-medium">{{ pageTitle }}</span>
              </div>
              </div>
            </div>
            
          </div>
        </div>
        
        <!-- MAIN CON SCROLL-->
        <div class="p-6 h-[calc(100%-44px)] overflow-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const auth = useAuth()
const route = useRoute()

// Obtener el usuario del estado de autenticación
const user = computed(() => auth.user.value)

// Cargar perfil actualizado al montar el componente
onMounted(async () => {
  try {
    // Actualizar los datos del perfil desde el servidor
    await auth.getProfile()
  } catch (error) {
    console.error('Error al cargar perfil de usuario:', error)
  }
  
  // Actualizar la hora cada minuto
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }, 60000)
})

// Obtener las iniciales del nombre del usuario
const getUserInitials = computed(() => {
  if (!user.value?.nombre) return 'AD'
  
  // Dividir el nombre completo en partes
  const nameParts = user.value.nombre.split(' ').filter(part => part.length > 0)
  
  if (nameParts.length === 0) return 'AD'
  
  if (nameParts.length === 1) {
    // Si solo hay un nombre, usar las dos primeras letras
    return nameParts[0].substring(0, 2).toUpperCase()
  } else {
    // Usar la primera letra del primer nombre y la primera letra del último nombre/apellido
    const firstInitial = nameParts[0].charAt(0)
    const lastInitial = nameParts[nameParts.length - 1].charAt(0)
    return (firstInitial + lastInitial).toUpperCase()
  }
})

// Título de la página según la ruta
const pageTitle = computed(() => {
  switch (route.path) {
    case '/tenants':
      return 'Gestión de Tenants'
    case '/plans':
      return 'Planes de Suscripción'
    case '/platform-stats':
      return 'Estadísticas de Plataforma'
    case '/admin-settings':
      return 'Configuración'
    default:
      return 'Panel de Administración'
  }
})

// Badge dinámico según la ruta
const pageBadge = computed(() => {
  switch (route.path) {
    case '/tenants':
      return 'Administración global'
    default:
      return null
  }
})

// Menú de navegación simplificado para administradores globales
const navigation = [
  { 
    name: 'Tenants', 
    to: '/tenants', 
    icon: 'i-heroicons-building-office-2', 
    activeIcon: 'i-heroicons-building-office-2-solid' 
  },
  { 
    name: 'Planes', 
    to: '/plans', 
    icon: 'i-heroicons-credit-card', 
    activeIcon: 'i-heroicons-credit-card-solid' 
  },
  { 
    name: 'Estadísticas', 
    to: '/platform-stats', 
    icon: 'i-heroicons-chart-bar', 
    activeIcon: 'i-heroicons-chart-bar-solid' 
  },
  { 
    name: 'Ajustes', 
    to: '/admin-settings', 
    icon: 'i-heroicons-cog-6-tooth', 
    activeIcon: 'i-heroicons-cog-6-tooth-solid' 
  },
]

// Notificaciones relevantes para administradores globales
const notificationItems = [
  [{ label: 'Notificaciones', slot: 'header' }],
  [
    {
      label: 'Nueva organización registrada',
      description: 'Cruz Roja se ha registrado',
      avatar: { src: 'https://i.pravatar.cc/150?u=1' },
      icon: 'i-heroicons-building-office-2',
      iconClass: 'text-blue-500',
      time: 'Hace 5 minutos'
    },
    {
      label: 'Actualización de plan',
      description: 'Fundación Esperanza actualizó a Premium',
      avatar: { src: 'https://i.pravatar.cc/150?u=2' },
      icon: 'i-heroicons-credit-card',
      iconClass: 'text-green-500',
      time: 'Hace 1 hora'
    },
    {
      label: 'Alerta de uso',
      description: 'Voluntarios Unidos alcanzó 90% de su límite',
      avatar: { src: 'https://i.pravatar.cc/150?u=3' },
      icon: 'i-heroicons-exclamation-circle',
      iconClass: 'text-red-500',
      time: 'Hace 3 horas'
    }
  ],
  [
    {
      label: 'Ver todas las notificaciones',
      icon: 'i-heroicons-arrow-right',
      to: '/notifications',
      color: 'green'
    }
  ]
]

// Menú de usuario para administrador global
const userMenuItems = [
  [
    {
      label: 'Mi perfil',
      icon: 'i-heroicons-user-circle',
      to: '/admin-profile'
    },
    {
      label: 'Configuración global',
      icon: 'i-heroicons-cog-6-tooth',
      to: '/admin-settings'
    }
  ],
  [
    {
      label: 'Cerrar sesión',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      onClick: () => {
        console.log("Cerrando sesión de administrador...")
        auth.logout()
      }
    }
  ]
]

// Current time display
const currentTime = ref(new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }))

// Get icon for current page
function getPageIcon(path) {
  switch (path) {
    case '/tenants':
      return 'i-heroicons-building-office-2-solid'
    case '/plans':
      return 'i-heroicons-credit-card-solid'
    case '/platform-stats':
      return 'i-heroicons-chart-bar-solid'
    case '/admin-settings':
      return 'i-heroicons-cog-6-tooth-solid'
    default:
      return 'i-heroicons-squares-2x2-solid'
  }
}

// Definir los eventos que puede emitir el layout
defineEmits(['add-tenant'])
</script>