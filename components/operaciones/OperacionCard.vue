<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionCard.vue -->
<template>
  <div class="relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
    <!-- Barra superior de color según tipo -->
    <div 
      class="h-1.5 w-full"
      :class="getTipoBackgroundColor(operacion.tipo)"
    ></div>
    
    <div class="p-4">
      <!-- Header de la card -->
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center space-x-2">
          <div
            class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-inner"
            :class="getTipoClasses(operacion.tipo)"
          >
            <UIcon :name="getTipoIcon(operacion.tipo)" class="h-3.5 w-3.5" />
          </div>
          <UBadge :color="getPrioridadColor(operacion.prioridad)" variant="subtle" size="xs">
            {{ getPrioridadLabel(operacion.prioridad) }}
          </UBadge>
        </div>
        
        <!-- Menú de acciones con mejor hover -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            class="p-1 rounded-md hover:bg-gray-700"
            @click.stop="toggleMenu"
          >
            <UIcon name="i-heroicons-ellipsis-horizontal" class="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      <!-- Título y descripción con hover effect -->
      <div 
        @click="$emit('detail', operacion)"
        class="cursor-pointer group-hover:translate-x-0.5 transition-all duration-200"
      >
        <h4 class="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-300">
          {{ operacion.nombreActividad }}
        </h4>
        <p class="text-xs text-gray-400 line-clamp-3 mb-3">
          {{ operacion.descripcion }}
        </p>
      </div>

      <!-- Progreso con animación -->
      <div class="mb-4">
        <div class="flex items-center justify-between text-xs mb-1.5">
          <span class="text-gray-400">Progreso</span>
          <span 
            class="text-white font-medium transition-all duration-500"
            :class="{
              'text-red-400': operacion.progreso < 25,
              'text-yellow-400': operacion.progreso >= 25 && operacion.progreso < 50,
              'text-blue-400': operacion.progreso >= 50 && operacion.progreso < 75,
              'text-green-400': operacion.progreso >= 75
            }"
          >{{ operacion.progreso }}%</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <div 
            :class="getProgresoColor(operacion.progreso)"
            class="h-1.5 rounded-full transition-all duration-700 ease-out"
            :style="{ width: `${operacion.progreso}%` }"
          ></div>
        </div>
      </div>

      <!-- Información adicional con mejores iconos -->
      <div class="space-y-2.5 text-xs mb-4">
        <!-- Voluntario -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <UIcon name="i-heroicons-user-circle" class="h-3.5 w-3.5 mr-2 text-green-400" />
            <span class="text-gray-400">Voluntario:</span>
          </div>
          <span class="text-gray-300 font-medium">{{ operacion.voluntarioNombre }}</span>
        </div>
        
        <!-- Fecha de vencimiento -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <UIcon name="i-heroicons-calendar" class="h-3.5 w-3.5 mr-2 text-blue-400" />
            <span class="text-gray-400">Vence:</span>
          </div>
          <span 
            :class="isVencida(operacion) ? 'text-red-400 font-medium' : 'text-gray-300'"
            class="flex items-center"
          >
            {{ formatDate(operacion.fechaVencimiento) }}
            <UIcon 
              v-if="isVencida(operacion)"
              name="i-heroicons-exclamation-triangle"
              class="h-3.5 w-3.5 ml-1 text-red-400"
            />
          </span>
        </div>
        
        <!-- Horas -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5 mr-2 text-yellow-400" />
            <span class="text-gray-400">Horas:</span>
          </div>
          <span class="text-gray-300">
            {{ operacion.horasReales || 0 }}/{{ operacion.horasEstimadas }}h
          </span>
        </div>
      </div>

      <!-- Tags con hover -->
      <div v-if="operacion.tags?.length" class="mt-3 mb-4">
        <div class="flex flex-wrap gap-1.5">
          <UBadge
            v-for="tag in operacion.tags.slice(0, 2)"
            :key="tag"
            color="blue"
            variant="subtle"
            size="xs"
            class="transition-all hover:bg-blue-800 hover:text-blue-300"
          >
            {{ tag }}
          </UBadge>
          <span 
            v-if="operacion.tags.length > 2" 
            class="text-xs text-gray-500"
          >
            +{{ operacion.tags.length - 2 }}
          </span>
        </div>
      </div>

      <!-- Footer con acciones rápidas y gradiente -->
      <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-700/50 relative">
        <UBadge 
          :color="getEstadoColor(operacion.estado)" 
          variant="subtle" 
          size="sm"
          class="px-2.5"
        >
          <UIcon :name="getEstadoIcon(operacion.estado)" class="h-3 w-3 mr-1" />
          {{ getEstadoLabel(operacion.estado) }}
        </UBadge>
        
        <div class="flex items-center space-x-1.5">
          <button
            class="p-1 rounded-md hover:bg-blue-900/20 text-gray-400 hover:text-blue-400"
            @click.stop="$emit('detail', operacion)"
            title="Ver detalles"
          >
            <UIcon name="i-heroicons-eye" class="h-4 w-4" />
          </button>
          <button
            class="p-1 rounded-md hover:bg-blue-900/30 text-gray-400 hover:text-blue-300" 
            @click.stop="$emit('edit', operacion)"
            title="Editar"
          >
            <UIcon name="i-heroicons-pencil" class="h-4 w-4" />
          </button>
          <button
            v-if="operacion.estado !== 'completada'"
            class="p-1 rounded-md hover:bg-green-900/30 text-gray-400 hover:text-green-300" 
            @click.stop="$emit('progress', operacion)"
            title="Actualizar progreso"
          >
            <UIcon name="i-heroicons-chart-bar" class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Gradiente decorativo según estado -->
    <div 
      class="absolute bottom-0 left-0 right-0 h-0.5"
      :class="getEstadoGradient(operacion.estado)"
    ></div>

    <!-- Menú contextual con estilo mejorado -->
    <div 
      v-if="showMenu"
      class="absolute right-2 top-12 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 animate-fade-in backdrop-blur-sm"
      @click.stop
    >
      <div class="py-1.5">
        <button
          v-if="operacion.estado === 'pendiente'"
          @click="handleStatusChange('en_progreso')"
          class="w-full text-left px-4 py-2 text-xs text-blue-300 hover:bg-blue-900/30 hover:text-blue-200 flex items-center"
        >
          <UIcon name="i-heroicons-play" class="h-3.5 w-3.5 mr-2" />
          Iniciar operación
        </button>
        <button
          v-if="operacion.estado !== 'completada'"
          @click="handleStatusChange('completada')"
          class="w-full text-left px-4 py-2 text-xs text-green-300 hover:bg-green-900/30 hover:text-green-200 flex items-center"
        >
          <UIcon name="i-heroicons-check-circle" class="h-3.5 w-3.5 mr-2" />
          Marcar como completada
        </button>
        <button
          v-if="operacion.estado !== 'cancelada' && operacion.estado !== 'completada'"
          @click="handleStatusChange('cancelada')"
          class="w-full text-left px-4 py-2 text-xs text-yellow-300 hover:bg-yellow-900/30 hover:text-yellow-200 flex items-center"
        >
          <UIcon name="i-heroicons-x-circle" class="h-3.5 w-3.5 mr-2" />
          Cancelar operación
        </button>
        <hr class="border-gray-700 my-1.5" />
        <button
          @click="$emit('delete', operacion)"
          class="w-full text-left px-4 py-2 text-xs text-red-300 hover:bg-red-900/30 hover:text-red-200 flex items-center"
        >
          <UIcon name="i-heroicons-trash" class="h-3.5 w-3.5 mr-2" />
          Eliminar operación
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  operacion: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['detail', 'edit', 'delete', 'progress', 'change-status']);

const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const handleStatusChange = (nuevoEstado) => {
  emit('change-status', { id: props.operacion.id, estado: nuevoEstado });
  showMenu.value = false;
};

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

const getTipoBackgroundColor = (tipo) => {
  const colores = {
    'tarea': 'bg-blue-500',
    'proyecto': 'bg-purple-500',
    'seguimiento': 'bg-yellow-500'
  };
  return colores[tipo] || 'bg-gray-500';
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

const getEstadoIcon = (estado) => {
  const iconos = {
    'pendiente': 'i-heroicons-clock',
    'en_progreso': 'i-heroicons-play',
    'completada': 'i-heroicons-check-circle',
    'cancelada': 'i-heroicons-x-circle'
  };
  return iconos[estado] || 'i-heroicons-question-mark-circle';
};

const getEstadoGradient = (estado) => {
  const gradientes = {
    'pendiente': 'bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500',
    'en_progreso': 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500',
    'completada': 'bg-gradient-to-r from-green-600 via-green-500 to-emerald-500',
    'cancelada': 'bg-gradient-to-r from-red-600 via-red-500 to-rose-500'
  };
  return gradientes[estado] || 'bg-gradient-to-r from-gray-600 to-gray-500';
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

const getPrioridadColor = (prioridad) => {
  const colores = {
    'baja': 'green',
    'media': 'yellow',
    'alta': 'orange',
    'critica': 'red'
  };
  return colores[prioridad] || 'gray';
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
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short'
  });
};

const isVencida = (operacion) => {
  const hoy = new Date().toISOString().split('T')[0];
  return operacion.fechaVencimiento < hoy && 
         operacion.estado !== 'completada' && 
         operacion.estado !== 'cancelada';
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
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
</style>