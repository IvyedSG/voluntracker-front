<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteTareas.vue -->
<template>
  <div class="space-y-6">
    <!-- Tarjetas de KPIs de tareas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Tareas completadas -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Tareas Completadas</p>
            <p class="text-2xl font-bold text-white mt-1">{{ datos.completadas }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-lg flex items-center justify-center shadow-md border border-green-800/20">
            <UIcon name="i-heroicons-check-circle" class="h-6 w-6 text-green-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span class="text-green-400 font-medium">{{ porcentajeCompletadas }}%</span>
          <span class="text-gray-400 ml-1">del total</span>
        </div>
      </div>
      
      <!-- Tareas pendientes -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Tareas Pendientes</p>
            <p class="text-2xl font-bold text-white mt-1">{{ datos.pendientes }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 rounded-lg flex items-center justify-center shadow-md border border-yellow-800/20">
            <UIcon name="i-heroicons-clock" class="h-6 w-6 text-yellow-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span class="text-yellow-400 font-medium">{{ datos.enProgreso }}</span>
          <span class="text-gray-400 ml-1">en progreso</span>
        </div>
      </div>
      
      <!-- Tareas vencidas -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Tareas Vencidas</p>
            <p class="text-2xl font-bold text-white mt-1">{{ datos.vencidas }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-red-900/40 to-red-800/20 rounded-lg flex items-center justify-center shadow-md border border-red-800/20">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-red-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span class="text-red-400 font-medium">{{ porcentajeVencidas }}%</span>
          <span class="text-gray-400 ml-1">del total</span>
        </div>
      </div>
      
      <!-- Tiempo promedio -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Tiempo Promedio</p>
            <p class="text-2xl font-bold text-white mt-1">{{ tiempoPromedio }}d</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-lg flex items-center justify-center shadow-md border border-purple-800/20">
            <UIcon name="i-heroicons-calendar-days" class="h-6 w-6 text-purple-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span class="text-green-400 font-medium">-{{ mejoraTiempo }}%</span>
          <span class="text-gray-400 ml-1">mejora vs anterior</span>
        </div>
      </div>
    </div>

    <!-- Gráficos convertidos a tablas para análisis de tareas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Tendencia de tareas -->
      <ReporteChart
        titulo="Tendencia de Tareas"
        descripcion="Evolución de tareas creadas y completadas"
        :datos="datosTendencia"
        tipo="table"
        :cargando="cargando"
      />
      
      <!-- Distribución por prioridad -->
      <ReporteChart
        titulo="Distribución por Prioridad"
        descripcion="Tareas organizadas por nivel de prioridad"
        :datos="datosPrioridad"
        tipo="list"
        :cargando="cargando"
      />
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Distribución por tipo -->
      <ReporteChart
        titulo="Distribución por Tipo"
        descripcion="Clasificación de tareas por categoría"
        :datos="datosTipo"
        tipo="list"
        :cargando="cargando"
      />
      
      <!-- Tiempo promedio de completado -->
      <ReporteChart
        titulo="Tiempo Promedio de Completado"
        descripcion="Días promedio para completar tareas por mes"
        :datos="datosTiempoPromedio"
        tipo="table"
        :cargando="cargando"
      />
    </div>
    
    <!-- Tabla de tareas recientes -->
    <div class="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <div class="p-4 bg-gray-800 border-b border-gray-700">
        <h3 class="text-base font-semibold text-white">Tareas Recientes</h3>
        <p class="text-xs text-gray-400 mt-0.5">Últimas tareas creadas y su estado actual</p>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-900/50">
            <tr>
              <th class="px-4 py-3.5 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">Tarea</th>
              <th class="px-4 py-3.5 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">Asignado</th>
              <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Prioridad</th>
              <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Fecha Límite</th>
              <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Estado</th>
              <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Progreso</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr 
              v-for="tarea in tareasRecientes.slice(0, 5)" 
              :key="tarea.titulo"
              class="hover:bg-gray-700/20"
            >
              <td class="px-4 py-4">
                <div>
                  <div class="text-sm font-medium text-white">{{ tarea.titulo }}</div>
                  <div class="text-xs text-gray-400 mt-1">{{ tarea.descripcion }}</div>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-purple-900/40 rounded-full flex items-center justify-center border border-purple-800/30 mr-3">
                    <span class="text-xs font-medium text-purple-300">{{ getInitials(tarea.asignadoA) }}</span>
                  </div>
                  <span class="text-sm text-gray-300">{{ tarea.asignadoA }}</span>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-center">
                <span 
                  class="px-2 py-1 text-xs rounded-full border"
                  :class="getPrioridadClass(tarea.prioridad)"
                >
                  {{ tarea.prioridad }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-400 text-center">{{ formatDate(tarea.fechaLimite) }}</td>
              <td class="px-4 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full mr-2" :class="getEstadoDotClass(tarea.estado)"></div>
                  <span 
                    class="px-2 py-1 text-xs rounded-full border"
                    :class="getEstadoClass(tarea.estado)"
                  >
                    {{ tarea.estado }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center">
                  <div class="w-16 bg-gray-700 rounded-full h-2 mr-2">
                    <div 
                      class="h-2 rounded-full transition-all"
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
      
      <div class="p-4 border-t border-gray-700 flex justify-between items-center">
        <span class="text-sm text-gray-400">Mostrando 5 de {{ totalTareas }} tareas</span>
        <button class="text-sm text-purple-400 hover:text-purple-300 flex items-center">
          Ver todas
          <UIcon name="i-heroicons-arrow-right" class="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ReporteChart from './ReporteChart.vue';

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

const getPrioridadClass = (prioridad) => {
  switch (prioridad) {
    case 'Alta':
      return 'bg-red-900/20 text-red-400 border border-red-800/30';
    case 'Media':
      return 'bg-yellow-900/20 text-yellow-400 border border-yellow-800/30';
    case 'Baja':
      return 'bg-green-900/20 text-green-400 border border-green-800/30';
    default:
      return 'bg-gray-900/20 text-gray-400 border border-gray-800/30';
  }
};

const getEstadoClass = (estado) => {
  switch (estado) {
    case 'Completada':
      return 'bg-green-900/20 text-green-400 border border-green-800/30';
    case 'En Progreso':
      return 'bg-blue-900/20 text-blue-400 border border-blue-800/30';
    case 'Pendiente':
      return 'bg-yellow-900/20 text-yellow-400 border border-yellow-800/30';
    case 'Vencida':
      return 'bg-red-900/20 text-red-400 border border-red-800/30';
    default:
      return 'bg-gray-900/20 text-gray-400 border border-gray-800/30';
  }
};

const getEstadoDotClass = (estado) => {
  switch (estado) {
    case 'Completada':
      return 'bg-green-400';
    case 'En Progreso':
      return 'bg-blue-400';
    case 'Pendiente':
      return 'bg-yellow-400';
    case 'Vencida':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
};

const getProgresoClass = (progreso) => {
  if (progreso >= 80) return 'bg-green-500';
  if (progreso >= 50) return 'bg-blue-500';
  if (progreso >= 25) return 'bg-yellow-500';
  return 'bg-red-500';
};

onMounted(() => {
  // Simulamos carga de datos
  setTimeout(() => {
    cargando.value = false;
  }, 800);
});
</script>

<style scoped>
/* Efecto hover para filas de tabla */
tr.hover\:bg-gray-700\/20:hover {
  background-color: rgba(55, 65, 81, 0.2);
}

/* Efecto para tarjetas */
.group {
  position: relative;
}

.group::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0);
  transition: box-shadow 0.3s ease;
}

.group:hover::after {
  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
}
</style>