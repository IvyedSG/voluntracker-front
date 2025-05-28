<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionTable.vue -->
<template>
  <div class="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-lg overflow-hidden shadow-xl">
    <!-- Header de la tabla -->
    <div class="p-5 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-8 h-8 rounded-lg bg-blue-900/30 flex items-center justify-center mr-4 border border-blue-800/30">
            <UIcon name="i-heroicons-table-cells" class="h-4 w-4 text-blue-400" />
          </div>
          <h3 class="text-lg font-semibold text-white">
            Lista de Operaciones
          </h3>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-blue-400">
            {{ operaciones.length }} operaciones
          </span>
        </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-800/50">
          <tr>
            <th class="px-4 py-3.5 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider border-b border-gray-700/50">
              Operación
            </th>
            <th class="px-4 py-3.5 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider border-b border-gray-700/50">
              Estado
            </th>
            <th class="px-4 py-3.5 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider border-b border-gray-700/50">
              Progreso
            </th>
            <th class="px-4 py-3.5 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider border-b border-gray-700/50">
              Voluntario
            </th>
            <th class="px-4 py-3.5 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider border-b border-gray-700/50">
              Fechas
            </th>
            <th class="px-4 py-3.5 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider border-b border-gray-700/50">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-800/50">
          <tr
            v-for="operacion in operaciones"
            :key="operacion.id"
            class="hover:bg-gray-800/20 transition-colors duration-200"
          >
            <!-- Información de la operación -->
            <td class="px-4 py-4">
              <div class="flex items-start space-x-3">
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md"
                  :class="getTipoClasses(operacion.tipo)"
                >
                  <UIcon :name="getTipoIcon(operacion.tipo)" class="h-5 w-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="text-sm font-medium text-white truncate hover:text-blue-300 transition-colors cursor-pointer" @click="$emit('detail', operacion)">
                    {{ operacion.nombreActividad }}
                  </h4>
                  <p class="text-xs text-gray-400 line-clamp-2 mt-1">
                    {{ operacion.descripcion }}
                  </p>
                  <div class="flex items-center space-x-2 mt-1.5">
                    <span 
                      class="px-2 py-0.5 text-xs rounded-full"
                      :class="getPrioridadClasses(operacion.prioridad)"
                    >
                      {{ getPrioridadLabel(operacion.prioridad) }}
                    </span>
                    <span class="text-xs text-gray-500 px-1.5 py-0.5 bg-gray-800 rounded-full">
                      {{ operacion.area }}
                    </span>
                  </div>
                </div>
              </div>
            </td>

            <!-- Estado -->
            <td class="px-4 py-4">
              <div 
                class="px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center"
                :class="getEstadoBadgeClasses(operacion.estado)"
              >
                <UIcon :name="getEstadoIcon(operacion.estado)" class="h-3.5 w-3.5 mr-1.5" />
                {{ getEstadoLabel(operacion.estado) }}
              </div>
            </td>

            <!-- Progreso -->
            <td class="px-4 py-4">
              <div class="w-28">
                <div class="flex items-center justify-between text-xs mb-1.5">
                  <span 
                    class="font-medium transition-colors"
                    :class="{
                      'text-red-400': operacion.progreso < 25,
                      'text-yellow-400': operacion.progreso >= 25 && operacion.progreso < 50,
                      'text-blue-400': operacion.progreso >= 50 && operacion.progreso < 75,
                      'text-green-400': operacion.progreso >= 75
                    }"
                  >
                    {{ operacion.progreso }}%
                  </span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden shadow-inner">
                  <div 
                    :class="getProgresoColor(operacion.progreso)"
                    class="h-2 rounded-full transition-all duration-500 ease-out"
                    :style="{ width: `${operacion.progreso}%` }"
                  ></div>
                </div>
              </div>
            </td>

            <!-- Voluntario -->
            <td class="px-4 py-4">
              <div class="flex items-center space-x-2.5">
                <div class="w-7 h-7 bg-green-900/40 border border-green-800/30 rounded-full flex items-center justify-center shadow-sm">
                  <UIcon name="i-heroicons-user" class="h-3 w-3 text-green-400" />
                </div>
                <span class="text-sm text-gray-300">{{ operacion.voluntarioNombre || 'Sin asignar' }}</span>
              </div>
            </td>

            <!-- Fechas -->
            <td class="px-4 py-4">
              <div class="text-xs space-y-2">
                <div class="flex items-center text-gray-400">
                  <UIcon name="i-heroicons-calendar" class="h-3 w-3 mr-1.5 text-blue-400" />
                  <span>Inicio: {{ formatDate(operacion.fechaInicio) }}</span>
                </div>
                <div 
                  class="flex items-center"
                  :class="isVencida(operacion) ? 'text-red-400' : 'text-gray-400'"
                >
                  <UIcon 
                    name="i-heroicons-calendar-days" 
                    class="h-3 w-3 mr-1.5" 
                    :class="isVencida(operacion) ? 'text-red-400' : 'text-yellow-400'"
                  />
                  <span>Vence: {{ formatDate(operacion.fechaVencimiento) }}</span>
                  <div 
                    v-if="isVencida(operacion)" 
                    class="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-red-900/30 border border-red-800/30 text-red-300 flex items-center"
                  >
                    <UIcon name="i-heroicons-exclamation-triangle" class="h-3 w-3 mr-1" />
                    Vencida
                  </div>
                </div>
              </div>
            </td>

            <!-- Acciones -->
            <td class="px-4 py-4">
              <div class="flex items-center space-x-1.5">
                <!-- Botón Ver -->
                <button
                  class="p-1.5 rounded-md text-gray-400 hover:text-blue-300 hover:bg-blue-900/20 transition-colors"
                  @click="$emit('detail', operacion)"
                  title="Ver detalles"
                >
                  <UIcon name="i-heroicons-eye" class="h-4 w-4" />
                </button>
                
                <!-- Botón Editar -->
                <button
                  class="p-1.5 rounded-md text-gray-400 hover:text-blue-300 hover:bg-blue-900/20 transition-colors"
                  @click="$emit('edit', operacion)"
                  title="Editar"
                >
                  <UIcon name="i-heroicons-pencil" class="h-4 w-4" />
                </button>
                
                <!-- Botón Progreso -->
                <button
                  v-if="operacion.estado !== 'completada' && operacion.estado !== 'cancelada'"
                  class="p-1.5 rounded-md text-gray-400 hover:text-green-300 hover:bg-green-900/20 transition-colors"
                  @click="$emit('progress', operacion)"
                  title="Actualizar progreso"
                >
                  <UIcon name="i-heroicons-chart-bar" class="h-4 w-4" />
                </button>

                <!-- Menú de acciones adicionales -->
                <div class="relative" v-if="operacion.estado !== 'completada'">
                  <button
                    class="p-1.5 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700/60 transition-colors"
                    @click="toggleActionMenu(operacion.id)"
                    :id="`menu-trigger-${operacion.id}`"
                    title="Más acciones"
                  >
                    <UIcon name="i-heroicons-ellipsis-vertical" class="h-4 w-4" />
                  </button>
                  
                  <!-- Menú desplegable personalizado -->
                  <div 
                    v-if="activeMenuId === operacion.id"
                    class="absolute right-0 mt-1 w-52 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-10 animate-fade-in backdrop-blur-sm"
                    @click.stop
                  >
                    <div class="py-1.5">
                      <!-- Cambiar a En Progreso -->
                      <button
                        v-if="operacion.estado === 'pendiente'"
                        @click="handleStatusChange(operacion.id, 'en_progreso')"
                        class="w-full text-left px-4 py-2 text-sm text-blue-300 hover:bg-blue-900/30 hover:text-blue-200 flex items-center"
                      >
                        <UIcon name="i-heroicons-play" class="h-4 w-4 mr-2" />
                        Iniciar operación
                      </button>
                      
                      <!-- Marcar como Completada -->
                      <button
                        v-if="operacion.estado !== 'completada'"
                        @click="handleStatusChange(operacion.id, 'completada')"
                        class="w-full text-left px-4 py-2 text-sm text-green-300 hover:bg-green-900/30 hover:text-green-200 flex items-center"
                      >
                        <UIcon name="i-heroicons-check-circle" class="h-4 w-4 mr-2" />
                        Marcar como completada
                      </button>
                      
                      <!-- Cancelar -->
                      <button
                        v-if="operacion.estado !== 'cancelada'"
                        @click="handleStatusChange(operacion.id, 'cancelada')"
                        class="w-full text-left px-4 py-2 text-sm text-yellow-300 hover:bg-yellow-900/30 hover:text-yellow-200 flex items-center"
                      >
                        <UIcon name="i-heroicons-x-circle" class="h-4 w-4 mr-2" />
                        Cancelar operación
                      </button>
                      
                      <hr class="border-gray-700 my-1.5" />
                      
                      <!-- Eliminar -->
                      <button
                        @click="handleDelete(operacion)"
                        class="w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-red-900/30 hover:text-red-200 flex items-center"
                      >
                        <UIcon name="i-heroicons-trash" class="h-4 w-4 mr-2" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Estado vacío -->
    <div v-if="operaciones.length === 0" class="text-center py-16 bg-gray-900/20">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800/60 flex items-center justify-center border border-gray-700">
        <UIcon name="i-heroicons-clipboard-document-list" class="h-10 w-10 text-gray-500" />
      </div>
      <h3 class="text-lg font-medium text-gray-300 mb-2">No hay operaciones</h3>
      <p class="text-gray-500 max-w-sm mx-auto">No se encontraron operaciones para mostrar. Intenta cambiando los filtros o crea una nueva operación.</p>
      <button class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center mx-auto">
        <UIcon name="i-heroicons-plus" class="h-4 w-4 mr-1.5" />
        Nueva operación
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  operaciones: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['detail', 'edit', 'delete', 'progress', 'change-status']);

// Estado para el menú activo
const activeMenuId = ref(null);

// Funciones para el menú
const toggleActionMenu = (operacionId) => {
  activeMenuId.value = activeMenuId.value === operacionId ? null : operacionId;
};

const closeAllMenus = () => {
  activeMenuId.value = null;
};

const handleStatusChange = (id, nuevoEstado) => {
  emit('change-status', id, nuevoEstado);
  closeAllMenus();
};

const handleDelete = (operacion) => {
  emit('delete', operacion);
  closeAllMenus();
};

// Cerrar menús al hacer clic fuera
const handleClickOutside = (event) => {
  // Verificar si el clic fue en un trigger de menú
  const isMenuTrigger = event.target.closest('[id^="menu-trigger-"]');
  if (!isMenuTrigger) {
    closeAllMenus();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Funciones de utilidad mejoradas
const getTipoIcon = (tipo) => {
  const iconos = {
    'tarea': 'i-heroicons-clipboard-document-check',
    'proyecto': 'i-heroicons-folder',
    'seguimiento': 'i-heroicons-eye'
  };
  return iconos[tipo] || 'i-heroicons-document';
};

const getTipoClasses = (tipo) => {
  const clases = {
    'tarea': 'bg-gradient-to-br from-blue-900/60 to-blue-800/30 text-blue-400 border border-blue-800/30',
    'proyecto': 'bg-gradient-to-br from-purple-900/60 to-purple-800/30 text-purple-400 border border-purple-800/30',
    'seguimiento': 'bg-gradient-to-br from-yellow-900/60 to-yellow-800/30 text-yellow-400 border border-yellow-800/30'
  };
  return clases[tipo] || 'bg-gradient-to-br from-gray-900/60 to-gray-800/30 text-gray-400';
};

const getEstadoColor = (estado) => {
  const colores = {
    'pendiente': 'yellow',
    'en_progreso': 'blue',
    'completada': 'green',
    'cancelada': 'red'
  };
  return colores[estado] || 'gray';
};

const getEstadoBadgeClasses = (estado) => {
  const clases = {
    'pendiente': 'bg-yellow-900/20 text-yellow-300 border border-yellow-800/30',
    'en_progreso': 'bg-blue-900/20 text-blue-300 border border-blue-800/30',
    'completada': 'bg-green-900/20 text-green-300 border border-green-800/30',
    'cancelada': 'bg-red-900/20 text-red-300 border border-red-800/30'
  };
  return clases[estado] || 'bg-gray-900/20 text-gray-300 border border-gray-800/30';
};

const getEstadoIcon = (estado) => {
  const iconos = {
    'pendiente': 'i-heroicons-clock',
    'en_progreso': 'i-heroicons-play',
    'completada': 'i-heroicons-check-circle',
    'cancelada': 'i-heroicons-x-circle'
  };
  return iconos[estado] || 'i-heroicons-question-mark-circle';
};

const getPrioridadColor = (prioridad) => {
  const colores = {
    'baja': 'green',
    'media': 'yellow',
    'alta': 'orange',
    'critica': 'red'
  };
  return colores[prioridad] || 'gray';
};

const getPrioridadClasses = (prioridad) => {
  const clases = {
    'baja': 'bg-green-900/20 text-green-300 border border-green-800/30',
    'media': 'bg-yellow-900/20 text-yellow-300 border border-yellow-800/30',
    'alta': 'bg-orange-900/20 text-orange-300 border border-orange-800/30',
    'critica': 'bg-red-900/20 text-red-300 border border-red-800/30'
  };
  return clases[prioridad] || 'bg-gray-900/20 text-gray-300 border border-gray-800/30';
};

const getPrioridadLabel = (prioridad) => {
  const labels = {
    'baja': 'Baja',
    'media': 'Media',
    'alta': 'Alta',
    'critica': 'Crítica'
  };
  return labels[prioridad] || prioridad;
};

const getProgresoColor = (progreso) => {
  if (progreso >= 80) return 'bg-gradient-to-r from-green-500 to-emerald-400';
  if (progreso >= 50) return 'bg-gradient-to-r from-blue-500 to-cyan-400';
  if (progreso >= 25) return 'bg-gradient-to-r from-yellow-500 to-amber-400';
  return 'bg-gradient-to-r from-red-500 to-orange-400';
};

const formatDate = (dateString) => {
  if (!dateString) return 'Sin fecha';
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const isVencida = (operacion) => {
  if (!operacion.fechaVencimiento) return false;
  const hoy = new Date().toISOString().split('T')[0];
  return operacion.fechaVencimiento < hoy && 
         operacion.estado !== 'completada' && 
         operacion.estado !== 'cancelada';
};

const getEstadoLabel = (estado) => {
  const labels = {
    'pendiente': 'Pendiente',
    'en_progreso': 'En Progreso',
    'completada': 'Completada',
    'cancelada': 'Cancelada'
  };
  return labels[estado] || estado;
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animación para el menú */
.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Personalizar el scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.2);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.7);
}

/* Añadir efecto hover a las filas */
tr {
  position: relative;
}

tr:hover::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
}
</style>
