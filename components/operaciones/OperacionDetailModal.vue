<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionDetailModal.vue -->
<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" @click.self="$emit('close')">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
    
    <!-- Modal container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div 
        class="relative w-full max-w-4xl transform overflow-hidden rounded-lg bg-gray-900 border border-gray-800 shadow-xl transition-all"
        @click.stop
      >
        <div class="max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 z-10">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  :class="getTipoClasses(operacion?.tipo)"
                >
                  <UIcon :name="getTipoIcon(operacion?.tipo)" class="h-6 w-6" />
                </div>
                <div>
                  <h2 class="text-xl font-semibold text-white mb-1">
                    {{ operacion?.nombreActividad }}
                  </h2>
                  <div class="flex items-center space-x-3">
                    <UBadge :color="getEstadoColor(operacion?.estado)" variant="subtle">
                      {{ getEstadoLabel(operacion?.estado) }}
                    </UBadge>
                    <UBadge :color="getPrioridadColor(operacion?.prioridad)" variant="subtle">
                      {{ getPrioridadLabel(operacion?.prioridad) }}
                    </UBadge>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <UButton
                  icon="i-heroicons-pencil"
                  color="blue"
                  variant="ghost"
                  @click="$emit('edit', operacion)"
                >
                  Editar
                </UButton>
                <UButton
                  icon="i-heroicons-x-mark"
                  color="gray"
                  variant="ghost"
                  @click="$emit('close')"
                />
              </div>
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Información principal -->
              <div class="lg:col-span-2 space-y-6">
                <!-- Descripción -->
                <div>
                  <h3 class="text-lg font-medium text-white mb-3">Descripción</h3>
                  <p class="text-gray-300 leading-relaxed">{{ operacion?.descripcion }}</p>
                </div>

                <!-- Progreso -->
                <div v-if="operacion?.estado === 'en_progreso'">
                  <h3 class="text-lg font-medium text-white mb-3">Progreso</h3>
                  <div class="bg-gray-800/50 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-gray-300">{{ operacion.progreso }}% completado</span>
                      <UButton
                        icon="i-heroicons-chart-bar"
                        size="xs"
                        color="green"
                        @click="$emit('progress', operacion)"
                      >
                        Actualizar
                      </UButton>
                    </div>
                    <div class="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        :class="getProgresoColor(operacion.progreso)"
                        class="h-3 rounded-full transition-all duration-300"
                        :style="{ width: `${operacion.progreso}%` }"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Comentarios -->
                <div v-if="operacion?.comentarios?.length">
                  <h3 class="text-lg font-medium text-white mb-3">Comentarios</h3>
                  <div class="space-y-3">
                    <div
                      v-for="comentario in operacion.comentarios"
                      :key="comentario.id"
                      class="bg-gray-800/50 rounded-lg p-4"
                    >
                      <div class="flex items-start justify-between mb-2">
                        <span class="font-medium text-white">{{ comentario.autorNombre }}</span>
                        <span class="text-xs text-gray-400">{{ formatDate(comentario.fecha) }}</span>
                      </div>
                      <p class="text-gray-300">{{ comentario.contenido }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Panel lateral -->
              <div class="space-y-6">
                <!-- Información básica -->
                <div class="bg-gray-800/50 rounded-lg p-4">
                  <h4 class="font-medium text-white mb-3">Información</h4>
                  <div class="space-y-3 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-400">Tipo:</span>
                      <span class="text-white">{{ getTipoLabel(operacion?.tipo) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Área:</span>
                      <span class="text-white">{{ operacion?.area }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Voluntario:</span>
                      <span class="text-white">{{ operacion?.voluntarioNombre }}</span>
                    </div>
                    <div v-if="operacion?.coordinadorNombre" class="flex justify-between">
                      <span class="text-gray-400">Coordinador:</span>
                      <span class="text-white">{{ operacion.coordinadorNombre }}</span>
                    </div>
                    <div v-if="operacion?.ubicacion" class="flex justify-between">
                      <span class="text-gray-400">Ubicación:</span>
                      <span class="text-white">{{ operacion.ubicacion }}</span>
                    </div>
                  </div>
                </div>

                <!-- Fechas -->
                <div class="bg-gray-800/50 rounded-lg p-4">
                  <h4 class="font-medium text-white mb-3">Cronograma</h4>
                  <div class="space-y-3 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-400">Inicio:</span>
                      <span class="text-white">{{ formatDate(operacion?.fechaInicio) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Vencimiento:</span>
                      <span 
                        :class="isVencida(operacion) ? 'text-red-400' : 'text-white'"
                      >
                        {{ formatDate(operacion?.fechaVencimiento) }}
                      </span>
                    </div>
                    <div v-if="operacion?.fechaCompletada" class="flex justify-between">
                      <span class="text-gray-400">Completada:</span>
                      <span class="text-green-400">{{ formatDate(operacion.fechaCompletada) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Horas -->
                <div class="bg-gray-800/50 rounded-lg p-4">
                  <h4 class="font-medium text-white mb-3">Tiempo</h4>
                  <div class="space-y-3 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-400">Estimadas:</span>
                      <span class="text-white">{{ operacion?.horasEstimadas }}h</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Trabajadas:</span>
                      <span class="text-white">{{ operacion?.horasReales || 0 }}h</span>
                    </div>
                    <div v-if="operacion?.presupuesto" class="flex justify-between">
                      <span class="text-gray-400">Presupuesto:</span>
                      <span class="text-white">${{ operacion.presupuesto }}</span>
                    </div>
                  </div>
                </div>

                <!-- Tags -->
                <div v-if="operacion?.tags?.length" class="bg-gray-800/50 rounded-lg p-4">
                  <h4 class="font-medium text-white mb-3">Etiquetas</h4>
                  <div class="flex flex-wrap gap-2">
                    <UBadge
                      v-for="tag in operacion.tags"
                      :key="tag"
                      color="blue"
                      variant="subtle"
                      size="sm"
                    >
                      {{ tag }}
                    </UBadge>
                  </div>
                </div>

                <!-- Acciones -->
                <div class="space-y-2">
                  <UButton
                    v-if="operacion?.estado !== 'completada'"
                    icon="i-heroicons-chart-bar"
                    color="green"
                    block
                    @click="$emit('progress', operacion)"
                  >
                    Actualizar Progreso
                  </UButton>
                  <UButton
                    icon="i-heroicons-trash"
                    color="red"
                    variant="outline"
                    block
                    @click="$emit('delete', operacion)"
                  >
                    Eliminar Operación
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  operacion: { type: Object, default: null }
});

const emit = defineEmits(['close', 'edit', 'delete', 'progress', 'add-comment']);

// Funciones de utilidad (mismas que en otros componentes)
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
    'tarea': 'bg-blue-900/30 text-blue-400',
    'proyecto': 'bg-purple-900/30 text-purple-400',
    'seguimiento': 'bg-yellow-900/30 text-yellow-400'
  };
  return clases[tipo] || 'bg-gray-900/30 text-gray-400';
};

const getTipoLabel = (tipo) => {
  const labels = {
    'tarea': 'Tarea',
    'proyecto': 'Proyecto',
    'seguimiento': 'Seguimiento'
  };
  return labels[tipo] || tipo;
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
  if (progreso >= 80) return 'bg-green-600';
  if (progreso >= 50) return 'bg-yellow-600';
  if (progreso >= 25) return 'bg-orange-600';
  return 'bg-red-600';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const isVencida = (operacion) => {
  if (!operacion) return false;
  const hoy = new Date().toISOString().split('T')[0];
  return operacion.fechaVencimiento < hoy && 
         operacion.estado !== 'completada' && 
         operacion.estado !== 'cancelada';
};
</script>