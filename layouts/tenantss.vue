<template>
  <div class="flex h-screen bg-gradient-to-b from-[#1c2f29] to-[#1a2622] text-white overflow-hidden">
    <!-- SIDEBAR -->
    <div class="w-20 md:w-24 flex flex-col justify-between z-10 bg-transparent">
      <div>
        <!-- LOGO -->
        <div class="py-4 flex flex-col items-center justify-center border-green-800/20">
          <div class="p-1.5 rounded-xl bg-gradient-to-r from-green-800/30 to-green-700/20 backdrop-blur-sm">
            <NuxtImg src="/logo192.png" alt="VolunTracker Logo" class="h-10 w-10 drop-shadow-xl" />
          </div>
        </div>

        <!-- BOTONES -->
        <nav class="pt-6">
          <ul class="space-y-2">
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
                    :size="14" 
                    class="mb-1 transition-all duration-200"
                    :class="{ 
                      'text-green-300 drop-shadow-md scale-110': $route.path === item.to,
                      'hover:scale-110': $route.path !== item.to
                    }"
                  />
                </div>
                <span class="text-[8px] font-medium tracking-wide leading-tight text-center">
                  {{ item.name }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="mt-auto flex flex-col items-center space-y-4 mb-5">
        <!-- PERFIL -->
        <UDropdownMenu :items="userMenuItems" :popper="{ placement: 'right-start' }">
          <div class="cursor-pointer flex flex-col items-center group">
            <div class="p-0.5 rounded-full bg-gradient-to-br from-green-500/70 to-green-300/70 shadow-md group-hover:from-green-400/80 group-hover:to-green-200/80 transition-all duration-300">
              <UAvatar
                :src="user?.avatar || undefined"
                :alt="user?.nombre || 'Tenant profile'"
                :text="getUserInitials"
                size="sm"
                class="border-1.5 border-[#1a2622]"
              />
            </div>
            <span class="text-[9px] font-medium text-green-100/90 mt-1 group-hover:text-green-300 transition-colors duration-200">
              {{ user?.nombre || 'Tenant' }}
            </span>
          </div>
        </UDropdownMenu>
      </div>
    </div>

    <!-- MAIN CONTENT -->
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
              </div>
            </div>
          </div>
        </div>

        <!-- MAIN CONTENT WITH SCROLL -->
        <div class="p-6 h-[calc(100%-44px)] overflow-auto">
          <slot />
        </div>
      </div>
    </div>
  </div> 
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const auth = useAuth();
const route = useRoute();
const router = useRouter();

// Obtener el usuario del estado de autenticación
const user = computed(() => auth.user.value);

// Iniciales del usuario
const getUserInitials = computed(() => {
  if (!user.value?.nombre) return 'TN';
  const nameParts = user.value.nombre.split(' ').filter(part => part.length > 0);
  if (nameParts.length === 1) return nameParts[0].substring(0, 2).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
});

// Título según ruta
const pageTitle = computed(() => {
  switch (route.path) {
    case '/dashboard':
      return 'Dashboard';
    case '/voluntarios':
      return 'Voluntarios';
    case '/operaciones':
      return 'Operaciones';
    case '/roles':
      return 'Coordinadores';
    case '/reports':
      return 'Reportes';
    case '/notifications':
      return 'Notificaciones';
    case '/certificates':
      return 'Certificados';
    case '/integrations':
      return 'Integraciones';
    case '/ong-settings':
      return 'Configuración de la ONG';
    default:
      return 'Panel de Tenant';
  }
});

// Badge según ruta
const pageBadge = computed(() => {
  switch (route.path) {
    case '/dashboard':
      return 'Lider de la Organización';
    case '/voluntarios':
      return 'Gestión de Voluntarios';
    case '/reports':
      return 'Análisis Detallado';
    default:
      return null;
  }
});

// Navegación
const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: 'i-heroicons-home', activeIcon: 'i-heroicons-home-solid' },
  { name: 'Voluntarios', to: '/voluntarios', icon: 'i-heroicons-user-group', activeIcon: 'i-heroicons-user-group-solid' },
  { name: 'Operaciones', to: '/operaciones', icon: 'i-heroicons-clipboard-document-list', activeIcon: 'i-heroicons-clipboard-document-list-solid' },
  { name: 'Coordinadores', to: '/roles', icon: 'i-heroicons-shield-check', activeIcon: 'i-heroicons-shield-check-solid' },
  { name: 'Reportes', to: '/reports', icon: 'i-heroicons-chart-bar', activeIcon: 'i-heroicons-chart-bar-solid' },
  { name: 'Notificaciones', to: '/notifications', icon: 'i-heroicons-bell', activeIcon: 'i-heroicons-bell-solid' },
  { name: 'Certificados', to: '/certificates', icon: 'i-heroicons-document-text', activeIcon: 'i-heroicons-document-text-solid' },
  { name: 'Integraciones', to: '/integrations', icon: 'i-heroicons-link', activeIcon: 'i-heroicons-link-solid' },
  { name: 'Configuración de la ONG', to: '/ong-settings', icon: 'i-heroicons-cog-6-tooth', activeIcon: 'i-heroicons-cog-6-tooth-solid' },
];

// Menú de usuario
const userMenuItems = [
  [
    { label: 'Mi perfil', icon: 'i-heroicons-user-circle', to: '/tenant-profile' },
    { label: 'Configuraciones', icon: 'i-heroicons-cog-6-tooth', to: '/settings' },
  ],
  [
    { label: 'Cerrar sesión', icon: 'i-heroicons-arrow-right-on-rectangle', onClick: () => auth.logout() },
  ],
];

// Icono de página actual
function getPageIcon(path) {
  const item = navigation.find(nav => nav.to === path);
  return item ? item.activeIcon : 'i-heroicons-squares-2x2-solid';
}

// Redirección
onMounted(() => {
  if (route.path === '/ong') {
    router.push('/dashboard');
  }
});
</script>
