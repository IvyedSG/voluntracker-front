<template>
  <div class="flex h-screen bg-gradient-to-b from-[#1c2f29] to-[#1a2622] text-white overflow-hidden">
    <!-- SIDEBAR - Ajustado para igualar admin.vue -->
    <div class="w-16 md:w-20 flex flex-col justify-between z-10 bg-transparent">
      <div>
        <!-- LOGO -->
        <div class="py-4 flex flex-col items-center justify-center border-green-800/20">
          <div class="p-1.5 rounded-xl bg-gradient-to-r from-green-800/30 to-green-700/20 backdrop-blur-sm">
            <NuxtImg src="/logo192.png" alt="VolunTracker Logo" class="h-10 w-10 drop-shadow-xl" />
          </div>
        </div>
        
        <!-- BOTONES PRINCIPALES con submenús -->
        <nav class="pt-6">
          <ul class="space-y-5">
            <!-- Elementos sin submenú -->
            <li v-for="(item, index) in navigationMain" :key="index">
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
            
            <!-- Elementos con submenú -->
            <li v-for="(category, catIndex) in navigationCategories" :key="`cat-${catIndex}`">
              <UPopover 
                :content="{ side: 'right', align: 'start', sideOffset: 5 }" 
                mode="click" 
                arrow
              >
                <button 
                  class="w-full flex flex-col items-center px-2 py-2.5 transition-all duration-300"
                  :class="{ 
                    'text-white': isInCategory(category),
                    'text-green-100/80 hover:text-green-300': !isInCategory(category),
                  }"
                >
                  <div class="relative">
                    <UIcon 
                      :name="isInCategory(category) ? category.activeIcon : category.icon" 
                      :size="24" 
                      class="mb-1.5 transition-all duration-200"
                      :class="{ 
                        'text-green-300 drop-shadow-md scale-110': isInCategory(category),
                        'hover:scale-110': !isInCategory(category)
                      }"
                    />
                    <!-- Indicador de submenú -->
                    <div class="absolute -bottom-1 -right-1 h-2 w-2 bg-green-500 rounded-full" v-if="isInCategory(category)"></div>
                  </div>
                  <span class="text-xs font-medium tracking-wide">{{ category.name }}</span>
                </button>
                
                <!-- Contenido del submenú -->
                <template #content>
                  <div class="py-1 bg-gray-900/95 backdrop-blur-sm border border-green-900/30 rounded-lg shadow-xl">
                    <NuxtLink 
                      v-for="(subItem, subIndex) in category.children" 
                      :key="`sub-${subIndex}`"
                      :to="subItem.to"
                      class="flex items-center gap-2 px-3 py-2 hover:bg-green-900/20 transition-colors"
                      :class="{'text-green-400': $route.path === subItem.to}"
                    >
                      <UIcon :name="subItem.icon" class="flex-shrink-0" />
                      <span class="text-sm">{{ subItem.name }}</span>
                    </NuxtLink>
                  </div>
                </template>
              </UPopover>
            </li>
          </ul>
        </nav>
      </div>
      
      <div class="mt-auto flex flex-col items-center space-y-4 mb-5">
        <!-- PERFIL - Ajustado para igualar admin.vue -->
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
            <span class="text-xs font-medium text-green-100/90 mt-1 group-hover:text-green-300 transition-colors duration-200">
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
                
                <!-- Breadcrumb - Añadido para igualar admin.vue -->
                <div class="flex items-center text-sm text-gray-500 ml-2">
                  <div class="h-4 w-px bg-gray-700 mx-2"/>
                  <UIcon name="i-heroicons-home" size="sm" class="mr-1.5 opacity-70" />
                  <span class="text-green-500/70 font-medium">{{ user?.tenantNombre || 'ONG' }}</span>
                  <UIcon name="i-heroicons-chevron-right" size="sm" class="mx-1.5 text-gray-700" />
                  <span class="font-medium">{{ pageTitle }}</span>
                </div>
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

// Obtener las iniciales del nombre del usuario
const getUserInitials = computed(() => {
  if (!user.value?.nombre) return 'TN';
  const nameParts = user.value.nombre.split(' ').filter(part => part.length > 0);
  if (nameParts.length === 1) return nameParts[0].substring(0, 2).toUpperCase();
  return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
});

// Título de la página según la ruta
const pageTitle = computed(() => {
switch (route.path) {
  case '/dashboard':
    return 'Panel Principal';
  case '/voluntarios':
    return 'Gestión de Equipo';
  case '/operaciones':
    return 'Eventos y Actividades';
  case '/coordinadores':
    return 'Líderes y Coordinadores';
  case '/reportes':
    return 'Análisis de Datos';
  case '/notifications':
    return 'Centro de Avisos';
  case '/certificates':
    return 'Diplomas y Certificados';
  case '/integrations':
    return 'Conexiones Externas';
  case '/ong-settings':
    return 'Configuración';
  default:
    return 'Panel de Control';
}
});

// Badge dinámico según la ruta
const pageBadge = computed(() => {
  switch (route.path) {
    case '/dashboard':
      return 'Lider de la Organización';
    case '/voluntarios':
      return 'Gestión de Equipo';
    case '/coordinadores':
      return 'Líderes y Coordinadores';
      case '/operaciones':
      return 'Eventos y Actividades';
    default:
      return null;
  }
});

// Navegación reorganizada con categorías y submenús
const navigationMain = [
  { name: 'Inicio', to: '/dashboard', icon: 'i-heroicons-home', activeIcon: 'i-heroicons-home-solid' },
  { name: 'Voluntarios', to: '/voluntarios', icon: 'i-heroicons-user-group', activeIcon: 'i-heroicons-user-group-solid' },
];

// Categorías con submenús
const navigationCategories = [
  { 
    name: 'Gestión', 
    icon: 'i-heroicons-clipboard-document-list', 
    activeIcon: 'i-heroicons-clipboard-document-list-solid',
    children: [
      { name: 'Operaciones', to: '/operaciones', icon: 'i-heroicons-calendar' },
      { name: 'Coordinadores', to: '/coordinadores', icon: 'i-heroicons-shield-check' },
    ]
  },
  { 
    name: 'Análisis', 
    icon: 'i-heroicons-chart-bar', 
    activeIcon: 'i-heroicons-chart-bar-solid',
    children: [
      { name: 'Reportes', to: '/reportes', icon: 'i-heroicons-document-chart-bar' },
      { name: 'Certificados', to: '/certificates', icon: 'i-heroicons-document-text' },
    ]
  },
  { 
    name: 'Sistema', 
    icon: 'i-heroicons-cog-6-tooth', 
    activeIcon: 'i-heroicons-cog-6-tooth-solid',
    children: [
      { name: 'Notificaciones', to: '/notifications', icon: 'i-heroicons-bell' },
      { name: 'Integraciones', to: '/integrations', icon: 'i-heroicons-link' },
      { name: 'Configuración', to: '/ong-settings', icon: 'i-heroicons-wrench-screwdriver' },
    ]
  },
];

// Menú de usuario para tenants
const userMenuItems = [
  [
    { label: 'Mi perfil', icon: 'i-heroicons-user-circle', to: '/tenant-profile' },
    { label: 'Configuraciones', icon: 'i-heroicons-cog-6-tooth', to: '/settings' },
  ],
  [
    { label: 'Cerrar sesión', icon: 'i-heroicons-arrow-right-on-rectangle', onClick: () => auth.logout() },
  ],
];

// Comprobar si una ruta pertenece a una categoría
function isInCategory(category) {
  return category.children.some(item => route.path === item.to);
}

// Obtener todos los ítems de navegación (planos)
const allNavigationItems = computed(() => {
  const items = [...navigationMain];
  navigationCategories.forEach(category => {
    items.push(...category.children);
  });
  return items;
});

// Obtener el icono de la página actual
function getPageIcon(path) {
  const item = allNavigationItems.value.find(nav => nav.to === path);
  return item ? (item.activeIcon || item.icon) : 'i-heroicons-squares-2x2-solid';
}

// Redirigir a /dashboard si la ruta actual es la raíz del layout
onMounted(() => {
  if (route.path === '/ong') {
    router.push('/dashboard');
  }
});
</script>
