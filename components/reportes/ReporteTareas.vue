<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteTareas.vue -->
<template>
  <div class="space-y-8 overflow-visible h-auto">
    
    <!-- Tarjetas de KPIs con colores variados -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Tareas completadas - Verde -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-green-500/50 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Tareas Completadas</p>
            <p class="text-3xl font-bold text-green-300 mt-2">{{ datos.completadas }}</p>
          </div>
          <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-check-circle" class="h-6 w-6 text-green-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <div class="bg-green-500/10 px-2 py-1 rounded-md mr-2">
            <span class="text-green-400 font-semibold">{{ porcentajeCompletadas }}%</span>
          </div>
          <span class="text-gray-400">del total</span>
        </div>
      </div>
      
      <!-- Tareas pendientes - Ámbar -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-amber-500/50 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Tareas Pendientes</p>
            <p class="text-3xl font-bold text-amber-300 mt-2">{{ datos.pendientes }}</p>
          </div>
          <div class="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-clock" class="h-6 w-6 text-amber-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <div class="bg-amber-500/10 px-2 py-1 rounded-md mr-2">
            <span class="text-amber-400 font-semibold">{{ datos.enProgreso }}</span>
          </div>
          <span class="text-gray-400">en progreso</span>
        </div>
      </div>
      
      <!-- Tareas vencidas - Rojo -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-red-500/50 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Tareas Vencidas</p>
            <p class="text-3xl font-bold text-red-300 mt-2">{{ datos.vencidas }}</p>
          </div>
          <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-red-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <div class="bg-red-500/10 px-2 py-1 rounded-md mr-2">
            <span class="text-red-400 font-semibold">{{ porcentajeVencidas }}%</span>
          </div>
          <span class="text-gray-400">del total</span>
        </div>
      </div>
      
      <!-- Tiempo promedio - Morado -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Tiempo Promedio</p>
            <p class="text-3xl font-bold text-purple-300 mt-2">{{ tiempoPromedio }}d</p>
          </div>
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-calendar-days" class="h-6 w-6 text-purple-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <div class="bg-green-500/10 px-2 py-1 rounded-md mr-2">
            <span class="text-green-400 font-semibold">-{{ mejoraTiempo }}%</span>
          </div>
          <span class="text-gray-400">mejora vs anterior</span>
        </div>
      </div>
    </div>

    <!-- Gráficos convertidos a componentes con headers coloridos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Tendencia de tareas - Azul -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-chart-bar-square" class="w-5 h-5 mr-2 text-blue-400" />
            Tendencia de Tareas
          </h3>
          <p class="text-sm text-gray-400 mt-1">Evolución de tareas creadas y completadas por mes</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(valor, index) in datosTendencia.labels" :key="index" class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                <span class="text-gray-300 font-medium">{{ valor }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <span class="text-xs text-gray-400 mr-2">Creadas:</span>
                  <span class="text-blue-300 font-semibold">{{ datosTendencia.datasets[0].data[index] }}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-xs text-gray-400 mr-2">Completadas:</span>
                  <span class="text-cyan-300 font-semibold">{{ datosTendencia.datasets[1].data[index] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Distribución por prioridad - Verde -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-flag" class="w-5 h-5 mr-2 text-emerald-400" />
            Distribución por Prioridad
          </h3>
          <p class="text-sm text-gray-400 mt-1">Tareas organizadas por nivel de prioridad</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(valor, index) in datosPrioridad.data" :key="index" class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200">
              <div class="flex items-center">
                <div 
                  class="w-3 h-3 rounded-full mr-3"
                  :class="getPrioridadDotColor(datosPrioridad.labels[index])"
                ></div>
                <span class="text-gray-300 font-medium">{{ datosPrioridad.labels[index] }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-20 h-2 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <div 
                    class="h-full transition-all duration-300 rounded-full"
                    :class="getPrioridadBarColor(datosPrioridad.labels[index])"
                    :style="{ width: `${(valor / Math.max(...datosPrioridad.data)) * 100}%` }"
                  ></div>
                </div>
                <span 
                  class="font-bold min-w-[2rem] text-right"
                  :class="getPrioridadTextColor(datosPrioridad.labels[index])"
                >
                  {{ valor }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Distribución por tipo - Morado -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-squares-2x2" class="w-5 h-5 mr-2 text-purple-400" />
            Distribución por Tipo
          </h3>
          <p class="text-sm text-gray-400 mt-1">Clasificación de tareas por categoría</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(valor, index) in datosTipo.data" :key="index" class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200">
              <div class="flex items-center">
                <div 
                  class="w-3 h-3 rounded-full mr-3"
                  :class="getTipoColorByIndex(index).dot"
                ></div>
                <span class="text-gray-300 font-medium">{{ datosTipo.labels[index] }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-20 h-2 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <div 
                    class="h-full transition-all duration-300 rounded-full"
                    :class="getTipoColorByIndex(index).bar"
                    :style="{ width: `${(valor / Math.max(...datosTipo.data)) * 100}%` }"
                  ></div>
                </div>
                <span 
                  class="font-bold min-w-[2rem] text-right"
                  :class="getTipoColorByIndex(index).text"
                >
                  {{ valor }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tiempo promedio de completado - Rosa -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-pink-500/10 to-rose-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-clock" class="w-5 h-5 mr-2 text-pink-400" />
            Tiempo Promedio de Completado
          </h3>
          <p class="text-sm text-gray-400 mt-1">Días promedio para completar tareas por mes</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(valor, index) in datosTiempoPromedio.datasets[0].data" :key="index" class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-pink-500 mr-3"></div>
                <span class="text-gray-300 font-medium">{{ datosTiempoPromedio.labels[index] }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-20 h-2 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <div 
                    class="h-full bg-pink-500 transition-all duration-300 rounded-full"
                    :style="{ width: `${(valor / Math.max(...datosTiempoPromedio.datasets[0].data)) * 100}%` }"
                  ></div>
                </div>
                <span class="text-pink-300 font-bold min-w-[3rem] text-right">{{ valor }}d</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Tabla de tareas recientes con header colorido -->
    <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center">
              <UIcon name="i-heroicons-clipboard-document-list" class="w-5 h-5 mr-2 text-indigo-400" />
              Tareas Recientes
            </h3>
            <p class="text-sm text-gray-400 mt-1">Últimas tareas creadas y su estado actual</p>
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
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Tarea</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Asignado</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Prioridad</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Fecha Límite</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Estado</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Progreso</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr 
              v-for="(tarea, index) in tareasRecientes.slice(0, 5)" 
              :key="tarea.titulo"
              class="hover:bg-gray-800/50 transition-colors duration-200"
            >
              <td class="px-6 py-4">
                <div>
                  <div class="text-sm font-medium text-white">{{ tarea.titulo }}</div>
                  <div class="text-xs text-gray-400 mt-1">{{ tarea.descripcion }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div 
                    class="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    :class="getAvatarClass(index)"
                  >
                    <span 
                      class="text-sm font-bold"
                      :class="getAvatarTextClass(index)"
                    >
                      {{ getInitials(tarea.asignadoA) }}
                    </span>
                  </div>
                  <span class="text-sm text-gray-300">{{ tarea.asignadoA }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span 
                  class="px-3 py-1 text-xs font-medium rounded-md"
                  :class="getPrioridadBadgeClass(tarea.prioridad)"
                >
                  {{ tarea.prioridad }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="bg-gray-700/50 px-3 py-1 rounded-md inline-block">
                  <span class="text-sm text-gray-300">{{ formatDate(tarea.fechaLimite) }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full mr-2" :class="getEstadoDotClass(tarea.estado)"></div>
                  <span 
                    class="px-3 py-1 text-xs font-medium rounded-md"
                    :class="getEstadoBadgeClass(tarea.estado)"
                  >
                    {{ tarea.estado }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center">
                  <div class="w-16 bg-gray-700 rounded-full h-2 mr-2">
                    <div 
                      class="h-2 rounded-full transition-all duration-300"
                      :class="getProgresoClass(tarea.progreso)"
                      :style="{ width: `${tarea.progreso}%` }"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-400">{{ tarea.progreso }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="p-6 border-t border-gray-700 bg-gray-800/20 flex justify-between items-center">
        <span class="text-sm text-gray-400">Mostrando 5 de {{ totalTareas }} tareas</span>
        <UButton size="sm" color="primary" variant="ghost" icon="i-heroicons-arrow-right" trailing>
          Ver todas las tareas
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

// Valores calculados
const totalTareas = computed(() => {
  return props.datos.completadas + props.datos.pendientes + props.datos.enProgreso + props.datos.vencidas;
});

const porcentajeCompletadas = computed(() => {
  return totalTareas.value === 0 ? 0 : Math.round((props.datos.completadas / totalTareas.value) * 100);
});

const porcentajeVencidas = computed(() => {
  return totalTareas.value === 0 ? 0 : Math.round((props.datos.vencidas / totalTareas.value) * 100);
});

const tiempoPromedio = ref(4.2);
const mejoraTiempo = ref(12);

// Datos para gráficos convertidos a formato de tabla
const datosTendencia = computed(() => {
  return {
    labels: props.datos.tendencia.labels,
    datasets: [
      {
        label: 'Tareas Creadas',
        data: props.datos.tendencia.creadas
      },
      {
        label: 'Tareas Completadas',
        data: props.datos.tendencia.completadas
      }
    ]
  };
});

const datosPrioridad = computed(() => {
  return {
    labels: props.datos.porPrioridad.labels,
    data: props.datos.porPrioridad.data
  };
});

const datosTipo = computed(() => {
  return {
    labels: props.datos.porTipo.labels,
    data: props.datos.porTipo.data
  };
});

const datosTiempoPromedio = computed(() => {
  return {
    labels: props.datos.tiempoPromedio.labels,
    datasets: [{
      label: 'Días Promedio',
      data: props.datos.tiempoPromedio.data
    }]
  };
});

// Arrays de colores
const tipoColors = [
  { dot: 'bg-purple-500', bar: 'bg-purple-500', text: 'text-purple-300' },
  { dot: 'bg-indigo-500', bar: 'bg-indigo-500', text: 'text-indigo-300' },
  { dot: 'bg-violet-500', bar: 'bg-violet-500', text: 'text-violet-300' },
  { dot: 'bg-fuchsia-500', bar: 'bg-fuchsia-500', text: 'text-fuchsia-300' },
  { dot: 'bg-pink-500', bar: 'bg-pink-500', text: 'text-pink-300' }
];

const avatarColors = [
  { bg: 'bg-blue-500/20', text: 'text-blue-300' },
  { bg: 'bg-emerald-500/20', text: 'text-emerald-300' },
  { bg: 'bg-purple-500/20', text: 'text-purple-300' },
  { bg: 'bg-amber-500/20', text: 'text-amber-300' },
  { bg: 'bg-pink-500/20', text: 'text-pink-300' }
];

// Tareas recientes (datos simulados)
const tareasRecientes = [
  {
    titulo: 'Campaña de Donación de Alimentos',
    descripcion: 'Coordinar recolección en mercados locales',
    asignadoA: 'Ana García',
    prioridad: 'Alta',
    fechaLimite: '2023-05-25',
    estado: 'En Progreso',
    progreso: 75
  },
  {
    titulo: 'Taller de Capacitación Digital',
    descripcion: 'Preparar material educativo para adultos mayores',
    asignadoA: 'Carlos Méndez',
    prioridad: 'Media',
    fechaLimite: '2023-05-30',
    estado: 'Pendiente',
    progreso: 25
  },
  {
    titulo: 'Limpieza de Parque Municipal',
    descripcion: 'Jornada de limpieza y mantenimiento',
    asignadoA: 'Laura Pérez',
    prioridad: 'Baja',
    fechaLimite: '2023-05-22',
    estado: 'Completada',
    progreso: 100
  },
  {
    titulo: 'Registro de Nuevos Voluntarios',
    descripcion: 'Proceso de onboarding para 15 nuevos voluntarios',
    asignadoA: 'Miguel Torres',
    prioridad: 'Alta',
    fechaLimite: '2023-05-20',
    estado: 'Vencida',
    progreso: 40
  },
  {
    titulo: 'Evento de Recaudación de Fondos',
    descripcion: 'Organizar evento benéfico para fin de mes',
    asignadoA: 'Patricia Ruiz',
    prioridad: 'Alta',
    fechaLimite: '2023-05-28',
    estado: 'En Progreso',
    progreso: 60
  }
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

const getTipoColorByIndex = (index) => {
  return tipoColors[index % tipoColors.length];
};

const getAvatarClass = (index) => {
  return avatarColors[index % avatarColors.length].bg;
};

const getAvatarTextClass = (index) => {
  return avatarColors[index % avatarColors.length].text;
};

// Funciones de color para prioridad
const getPrioridadDotColor = (prioridad) => {
  switch (prioridad) {
    case 'Alta': return 'bg-red-500';
    case 'Media': return 'bg-amber-500';
    case 'Baja': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getPrioridadBarColor = (prioridad) => {
  switch (prioridad) {
    case 'Alta': return 'bg-red-500';
    case 'Media': return 'bg-amber-500';
    case 'Baja': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getPrioridadTextColor = (prioridad) => {
  switch (prioridad) {
    case 'Alta': return 'text-red-300';
    case 'Media': return 'text-amber-300';
    case 'Baja': return 'text-green-300';
    default: return 'text-gray-300';
  }
};

const getPrioridadBadgeClass = (prioridad) => {
  switch (prioridad) {
    case 'Alta': return 'bg-red-500/20 text-red-300';
    case 'Media': return 'bg-amber-500/20 text-amber-300';
    case 'Baja': return 'bg-green-500/20 text-green-300';
    default: return 'bg-gray-500/20 text-gray-300';
  }
};

const getEstadoBadgeClass = (estado) => {
  switch (estado) {
    case 'Completada': return 'bg-green-500/20 text-green-300';
    case 'En Progreso': return 'bg-blue-500/20 text-blue-300';
    case 'Pendiente': return 'bg-amber-500/20 text-amber-300';
    case 'Vencida': return 'bg-red-500/20 text-red-300';
    default: return 'bg-gray-500/20 text-gray-300';
  }
};

const getEstadoDotClass = (estado) => {
  switch (estado) {
    case 'Completada': return 'bg-green-400';
    case 'En Progreso': return 'bg-blue-400';
    case 'Pendiente': return 'bg-amber-400';
    case 'Vencida': return 'bg-red-400';
    default: return 'bg-gray-400';
  }
};

const getProgresoClass = (progreso) => {
  if (progreso >= 80) return 'bg-green-500';
  if (progreso >= 50) return 'bg-blue-500';
  if (progreso >= 25) return 'bg-amber-500';
  return 'bg-red-500';
};

onMounted(() => {
  setTimeout(() => {
    cargando.value = false;
  }, 800);
});
</script>