<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteVoluntarios.vue -->
<template>
  <div class="space-y-6 reporte-voluntarios-container">
    <!-- Tarjetas de KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Voluntarios activos -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Voluntarios Activos</p>
            <p class="text-2xl font-bold text-white mt-1">{{ datos.activos }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-lg flex items-center justify-center shadow-md border border-blue-800/20">
            <UIcon name="i-heroicons-user-group" class="h-6 w-6 text-blue-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span class="text-blue-400 font-medium">+{{ datos.nuevos }}</span>
          <span class="text-gray-400 ml-1">nuevos este mes</span>
        </div>
      </div>
      
      <!-- Voluntarios inactivos -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Voluntarios Inactivos</p>
            <p class="text-2xl font-bold text-white mt-1">{{ datos.inactivos }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 rounded-lg flex items-center justify-center shadow-md border border-yellow-800/20">
            <UIcon name="i-heroicons-user-minus" class="h-6 w-6 text-yellow-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span class="text-gray-400">Representa el</span>
          <span class="text-yellow-400 font-medium ml-1">{{ Math.round((datos.inactivos / (datos.activos + datos.inactivos)) * 100) }}%</span>
          <span class="text-gray-400 ml-1">del total</span>
        </div>
      </div>
      
      <!-- Tasa de deserción -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Tasa de Deserción</p>
            <p class="text-2xl font-bold text-white mt-1">{{ datos.desercion }}%</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-lg flex items-center justify-center shadow-md border border-purple-800/20">
            <UIcon name="i-heroicons-arrow-trending-down" class="h-6 w-6 text-purple-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span 
            :class="desercionTendencia === 'subiendo' ? 'text-red-400' : 'text-green-400'"
          >
            {{ desercionTendencia === 'subiendo' ? '↗' : '↘' }} {{ desercionCambio }}%
          </span>
          <span class="text-gray-400">respecto al mes anterior</span>
        </div>
      </div>
      
      <!-- Participación total -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Retención</p>
            <p class="text-2xl font-bold text-white mt-1">{{ retencion }}%</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-lg flex items-center justify-center shadow-md border border-green-800/20">
            <UIcon name="i-heroicons-arrow-trending-up" class="h-6 w-6 text-green-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <span class="text-green-400 font-medium">{{ Math.round(promedioPermanencia) }}</span>
          <span class="text-gray-400 ml-1">meses de permanencia promedio</span>
        </div>
      </div>
    </div>

    <!-- Datos estadísticos sin gráficos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Distribución por género -->
      <ReporteChart
        titulo="Distribución por Género"
        descripcion="Porcentaje de voluntarios según su género registrado"
        :datos="datosGenero"
        tipo="list"
        :cargando="cargando"
      />
      
      <!-- Distribución por edad -->
      <ReporteChart
        titulo="Distribución por Edad"
        descripcion="Cantidad de voluntarios por grupo etario"
        :datos="datosEdad"
        tipo="list"
        :cargando="cargando"
      />
    </div>
    
    <!-- Tabla de voluntarios recientes -->
    <div class="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <div class="p-4 bg-gray-800 border-b border-gray-700">
        <h3 class="text-base font-semibold text-white">Voluntarios Recientes</h3>
        <p class="text-xs text-gray-400 mt-0.5">Últimos voluntarios incorporados a la organización</p>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-900/50">
            <tr>
              <th class="px-4 py-3.5 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">Voluntario</th>
              <th class="px-4 py-3.5 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">Email</th>
              <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Fecha Ingreso</th>
              <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Área</th>
              <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr 
              v-for="voluntario in voluntariosRecientes.slice(0, 5)" 
              :key="voluntario.email"
              class="hover:bg-gray-700/20"
            >
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-purple-900/40 rounded-full flex items-center justify-center border border-purple-800/30 mr-3">
                    <span class="text-xs font-medium text-purple-300">{{ getInitials(voluntario.nombre) }}</span>
                  </div>
                  <span class="text-sm font-medium text-white">{{ voluntario.nombre }}</span>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{{ voluntario.email }}</td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-400 text-center">{{ formatDate(voluntario.fechaIngreso) }}</td>
              <td class="px-4 py-4 whitespace-nowrap text-center">
                <span class="px-2 py-1 text-xs rounded-full bg-blue-900/20 text-blue-400 border border-blue-800/30">
                  {{ voluntario.area }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-center">
                <span 
                  class="px-2 py-1 text-xs rounded-full border"
                  :class="voluntario.activo 
                    ? 'bg-green-900/20 text-green-400 border-green-800/30' 
                    : 'bg-red-900/20 text-red-400 border-red-800/30'"
                >
                  {{ voluntario.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="p-4 border-t border-gray-700 flex justify-between items-center">
        <span class="text-sm text-gray-400">Mostrando 5 de {{ datos.activos + datos.inactivos }} voluntarios</span>
        <button class="text-sm text-purple-400 hover:text-purple-300 flex items-center">
          Ver todos
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

onMounted(() => {
  setTimeout(() => {
    cargando.value = false;
  }, 800);
});
</script>

<style scoped>
tr.hover\:bg-gray-700\/20:hover {
  background-color: rgba(55, 65, 81, 0.2);
}

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

/* En cada uno de los componentes */
.reporte-voluntarios-container, .reporte-tareas-container {
  overflow: visible !important;
  height: auto !important;
}
</style>