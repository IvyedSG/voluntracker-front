<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteVoluntarios.vue -->
<template>
  <div class="space-y-8 overflow-visible h-auto">
    <!-- Tarjetas de KPIs con colores variados -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Voluntarios activos - Verde Esmeralda -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Voluntarios Activos</p>
            <p class="text-3xl font-bold text-emerald-300 mt-2">{{ datos.activos }}</p>
          </div>
          <div class="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-user-group" class="h-6 w-6 text-emerald-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <div class="flex items-center bg-emerald-500/10 px-2 py-1 rounded-md mr-2">
            <UIcon name="i-heroicons-arrow-trending-up" class="h-3 w-3 text-emerald-400 mr-1" />
            <span class="text-emerald-400 font-semibold">+{{ datos.nuevos }}</span>
          </div>
          <span class="text-gray-400">nuevos este mes</span>
        </div>
      </div>
      
      <!-- Voluntarios inactivos - Ámbar -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-amber-500/50 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Voluntarios Inactivos</p>
            <p class="text-3xl font-bold text-amber-300 mt-2">{{ datos.inactivos }}</p>
          </div>
          <div class="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-user-minus" class="h-6 w-6 text-amber-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span class="text-gray-400">Representa el</span>
          <div class="bg-amber-500/10 px-2 py-1 rounded-md mx-2">
            <span class="text-amber-400 font-semibold">{{ Math.round((datos.inactivos / (datos.activos + datos.inactivos)) * 100) }}%</span>
          </div>
          <span class="text-gray-400">del total</span>
        </div>
      </div>
      
      <!-- Tasa de deserción - Morado -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Tasa de Deserción</p>
            <p class="text-3xl font-bold text-purple-300 mt-2">{{ datos.desercion }}%</p>
          </div>
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-arrow-trending-down" class="h-6 w-6 text-purple-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <div 
            class="flex items-center px-2 py-1 rounded-md mr-2"
            :class="desercionTendencia === 'subiendo' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'"
          >
            <UIcon :name="desercionTendencia === 'subiendo' ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'" class="h-3 w-3 mr-1" />
            <span class="font-semibold">{{ desercionCambio }}%</span>
          </div>
          <span class="text-gray-400">vs mes anterior</span>
        </div>
      </div>
      
      <!-- Retención - Azul -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Retención</p>
            <p class="text-3xl font-bold text-blue-300 mt-2">{{ retencion }}%</p>
          </div>
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-arrow-trending-up" class="h-6 w-6 text-blue-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <div class="bg-blue-500/10 px-2 py-1 rounded-md mr-2">
            <span class="text-blue-400 font-semibold">{{ Math.round(promedioPermanencia) }}</span>
          </div>
          <span class="text-gray-400">meses promedio</span>
        </div>
      </div>
    </div>

    <!-- Datos estadísticos con headers coloridos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Distribución por género - Azul -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-users" class="w-5 h-5 mr-2 text-blue-400" />
            Distribución por Género
          </h3>
          <p class="text-sm text-gray-400 mt-1">Composición demográfica actual</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(valor, index) in datosGenero.data" :key="index" class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full mr-3" :style="{ backgroundColor: getGeneroColorByIndex(index) }"></div>
                <span class="text-gray-300 font-medium">{{ datosGenero.labels[index] }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-20 h-2 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <div 
                    class="h-full transition-all duration-300 rounded-full" 
                    :style="{ 
                      width: `${(valor / Math.max(...datosGenero.data)) * 100}%`,
                      backgroundColor: getGeneroColorByIndex(index)
                    }"
                  ></div>
                </div>
                <span 
                  class="font-bold min-w-[2rem] text-right"
                  :style="{ color: getGeneroColorByIndex(index) }"
                >
                  {{ valor }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Distribución por edad - Emerald -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-chart-bar" class="w-5 h-5 mr-2 text-emerald-400" />
            Distribución por Edad
          </h3>
          <p class="text-sm text-gray-400 mt-1">Grupos etarios registrados</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(valor, index) in datosEdad.data" :key="index" class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full mr-3" :style="{ backgroundColor: getEdadColorByIndex(index) }"></div>
                <span class="text-gray-300 font-medium">{{ datosEdad.labels[index] }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-20 h-2 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <div 
                    class="h-full transition-all duration-300 rounded-full" 
                    :style="{ 
                      width: `${(valor / Math.max(...datosEdad.data)) * 100}%`,
                      backgroundColor: getEdadColorByIndex(index)
                    }"
                  ></div>
                </div>
                <span 
                  class="font-bold min-w-[2rem] text-right"
                  :style="{ color: getEdadColorByIndex(index) }"
                >
                  {{ valor }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Tabla con header morado -->
    <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center">
              <UIcon name="i-heroicons-clock" class="w-5 h-5 mr-2 text-indigo-400" />
              Voluntarios Recientes
            </h3>
            <p class="text-sm text-gray-400 mt-1">Últimas incorporaciones registradas</p>
          </div>
          <UButton size="sm" variant="ghost" color="primary" icon="i-heroicons-funnel">
            Filtrar
          </UButton>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-800/50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Voluntario</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Contacto</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Ingreso</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Área</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr 
              v-for="(voluntario, index) in voluntariosRecientes.slice(0, 5)" 
              :key="voluntario.email"
              class="hover:bg-gray-800/50 transition-colors duration-200"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div 
                    class="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                    :class="getAvatarBgClass(index)"
                  >
                    <span 
                      class="text-sm font-bold"
                      :class="getAvatarTextClass(index)"
                    >
                      {{ getInitials(voluntario.nombre) }}
                    </span>
                  </div>
                  <div>
                    <span class="text-sm font-semibold text-white">{{ voluntario.nombre }}</span>
                    <p class="text-xs text-gray-400">Miembro desde {{ formatDate(voluntario.fechaIngreso) }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-300">{{ voluntario.email }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="bg-gray-700/50 px-3 py-1 rounded-md inline-block">
                  <span class="text-sm text-gray-300">{{ formatDate(voluntario.fechaIngreso) }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span 
                  class="px-3 py-1 text-xs font-medium rounded-md"
                  :class="getAreaBadgeClass(index)"
                >
                  {{ voluntario.area }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span 
                  class="px-3 py-1 text-xs font-bold rounded-md"
                  :class="voluntario.activo 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'"
                >
                  {{ voluntario.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="p-6 border-t border-gray-700 bg-gray-800/20 flex justify-between items-center">
        <span class="text-sm text-gray-400">Mostrando 5 de {{ datos.activos + datos.inactivos }} voluntarios</span>
        <UButton size="sm" color="primary" variant="ghost" icon="i-heroicons-arrow-right" trailing>
          Ver todos los voluntarios
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  datos: {
    type: Object,
    required: true
  },
  filtros: {
    type: Object,
    default: () => ({})
  }
});

const cargando = ref(true);

// Valores derivados
const retencion = computed(() => {
  return 100 - props.datos.desercion;
});

const desercionTendencia = ref('bajando');
const desercionCambio = ref(1.5);
const promedioPermanencia = ref(8.3);

// Datos para componentes sin gráficos
const datosGenero = computed(() => {
  return {
    labels: props.datos.porGenero.labels,
    data: props.datos.porGenero.data
  };
});

const datosEdad = computed(() => {
  return {
    labels: props.datos.porEdad.labels,
    data: props.datos.porEdad.data
  };
});

// Voluntarios recientes (datos simulados)
const voluntariosRecientes = [
  {
    nombre: 'Ana García',
    email: 'ana.garcia@ejemplo.com',
    fechaIngreso: '2023-05-15',
    area: 'Educación',
    activo: true
  },
  {
    nombre: 'Carlos Méndez',
    email: 'carlos.mendez@ejemplo.com',
    fechaIngreso: '2023-05-10',
    area: 'Salud',
    activo: true
  },
  {
    nombre: 'Laura Pérez',
    email: 'laura.perez@ejemplo.com',
    fechaIngreso: '2023-04-28',
    area: 'Medio Ambiente',
    activo: true
  },
  {
    nombre: 'Miguel Torres',
    email: 'miguel.torres@ejemplo.com',
    fechaIngreso: '2023-04-22',
    area: 'Tecnología',
    activo: false
  },
  {
    nombre: 'Patricia Ruiz',
    email: 'patricia.ruiz@ejemplo.com',
    fechaIngreso: '2023-04-15',
    area: 'Administración',
    activo: true
  }
];

// Arrays de colores para diferentes secciones
const generoColors = ['#3B82F6', '#06B6D4', '#8B5CF6', '#EC4899']; // Azules y morados
const edadColors = ['#10B981', '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899']; // Verdes a morados
const avatarColors = [
  { bg: 'bg-emerald-500/20', text: 'text-emerald-300' },
  { bg: 'bg-blue-500/20', text: 'text-blue-300' },
  { bg: 'bg-purple-500/20', text: 'text-purple-300' },
  { bg: 'bg-amber-500/20', text: 'text-amber-300' },
  { bg: 'bg-pink-500/20', text: 'text-pink-300' }
];
const areaBadgeColors = [
  'bg-blue-500/20 text-blue-300',
  'bg-emerald-500/20 text-emerald-300',
  'bg-purple-500/20 text-purple-300',
  'bg-amber-500/20 text-amber-300',
  'bg-pink-500/20 text-pink-300'
];

// Funciones de utilidad
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const getGeneroColorByIndex = (index) => {
  return generoColors[index % generoColors.length];
};

const getEdadColorByIndex = (index) => {
  return edadColors[index % edadColors.length];
};

const getAvatarBgClass = (index) => {
  return avatarColors[index % avatarColors.length].bg;
};

const getAvatarTextClass = (index) => {
  return avatarColors[index % avatarColors.length].text;
};

const getAreaBadgeClass = (index) => {
  return areaBadgeColors[index % areaBadgeColors.length];
};

onMounted(() => {
  setTimeout(() => {
    cargando.value = false;
  }, 800);
});
</script>

<style scoped>
.reporte-voluntarios-container {
  overflow: visible !important;
  height: auto !important;
}

/* Efectos de hover mejorados */
.group:hover .absolute {
  opacity: 0.8;
}

/* Efectos de glassmorphism */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Transiciones mejoradas */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover states personalizados */
.group\/row:hover {
  transform: translateX(4px);
}

/* Efectos de glow para los iconos */
.group:hover .relative > div {
  filter: drop-shadow(0 0 8px currentColor);
}

/* Animación de barras de progreso */
@keyframes barGrow {
  from { width: 0%; }
  to { width: var(--target-width); }
}
</style>