<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionDeleteModal.vue -->
<template>
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center" @click.self="$emit('cancel')">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
      
      <!-- Modal container -->
      <div 
        class="relative w-full max-w-md transform overflow-hidden rounded-lg bg-gray-900 border border-gray-800 shadow-xl transition-all"
        @click.stop
      >
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mr-3">
              <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-red-400" />
            </div>
            <h2 class="text-lg font-semibold text-white">Eliminar Operación</h2>
          </div>
  
          <!-- Contenido -->
          <div class="mb-6">
            <p class="text-gray-300 mb-4">
              ¿Estás seguro de que quieres eliminar esta operación? Esta acción no se puede deshacer.
            </p>
            
            <!-- Información de la operación -->
            <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div class="flex items-start space-x-3">
                <div 
                  class="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                  :class="getTipoClasses(operacion?.tipo)"
                >
                  <UIcon :name="getTipoIcon(operacion?.tipo)" class="h-4 w-4" />
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="text-sm font-medium text-white truncate">
                    {{ operacion?.nombreActividad }}
                  </h4>
                  <p class="text-xs text-gray-400 mt-1 line-clamp-2">
                    {{ operacion?.descripcion }}
                  </p>
                  <div class="flex items-center space-x-2 mt-2">
                    <UBadge :color="getEstadoColor(operacion?.estado)" variant="subtle" size="xs">
                      {{ getEstadoLabel(operacion?.estado) }}
                    </UBadge>
                    <UBadge :color="getPrioridadColor(operacion?.prioridad)" variant="subtle" size="xs">
                      {{ getPrioridadLabel(operacion?.prioridad) }}
                    </UBadge>
                  </div>
                  <div class="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <span>Voluntario: {{ operacion?.voluntarioNombre }}</span>
                    <span>Área: {{ operacion?.area }}</span>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Advertencias según el estado -->
            <div v-if="showWarnings" class="mt-4 space-y-2">
              <div v-if="operacion?.estado === 'en_progreso'" class="flex items-center p-3 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0" />
                <span class="text-yellow-300 text-sm">
                  Esta operación está en progreso. Al eliminarla se perderá todo el progreso registrado.
                </span>
              </div>
              
              <div v-if="operacion?.comentarios?.length" class="flex items-center p-3 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                <UIcon name="i-heroicons-chat-bubble-left-right" class="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                <span class="text-blue-300 text-sm">
                  Se eliminarán {{ operacion.comentarios.length }} comentario(s) asociado(s).
                </span>
              </div>
  
              <div v-if="operacion?.recursos?.length" class="flex items-center p-3 bg-purple-900/20 border border-purple-800/50 rounded-lg">
                <UIcon name="i-heroicons-wrench-screwdriver" class="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                <span class="text-purple-300 text-sm">
                  Se liberarán {{ operacion.recursos.length }} recurso(s) asignado(s).
                </span>
              </div>
            </div>
  
            <!-- Checkbox de confirmación -->
            <div class="mt-4">
              <label class="flex items-center">
                <UCheckbox
                  v-model="confirmDelete"
                  color="red"
                />
                <span class="ml-2 text-sm text-gray-300">
                  Confirmo que quiero eliminar esta operación permanentemente
                </span>
              </label>
            </div>
          </div>
  
          <!-- Botones -->
          <div class="flex justify-end gap-3">
            <UButton
              type="button"
              color="gray"
              variant="ghost"
              :disabled="isDeleting"
              @click="$emit('cancel')"
            >
              Cancelar
            </UButton>
            <UButton
              type="button"
              color="red"
              :loading="isDeleting"
              :disabled="!confirmDelete"
              @click="handleDelete"
            >
              <UIcon name="i-heroicons-trash" class="mr-1" />
              {{ isDeleting ? 'Eliminando...' : 'Eliminar' }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    modelValue: { type: Boolean, default: false },
    operacion: { type: Object, default: null }
  });
  
  const emit = defineEmits(['confirm', 'cancel']);
  
  // Estado
  const confirmDelete = ref(false);
  const isDeleting = ref(false);
  
  // Computadas
  const showWarnings = computed(() => {
    return props.operacion && (
      props.operacion.estado === 'en_progreso' ||
      props.operacion.comentarios?.length > 0 ||
      props.operacion.recursos?.length > 0
    );
  });
  
  // Funciones de utilidad
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
  
  // Funciones
  const handleDelete = async () => {
    if (!confirmDelete.value) return;
  
    isDeleting.value = true;
  
    try {
      // Simular delay de eliminación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      emit('confirm', props.operacion.id);
      
      // Reset state
      confirmDelete.value = false;
    } catch (error) {
      console.error('Error al eliminar:', error);
    } finally {
      isDeleting.value = false;
    }
  };
  
  // Watchers
  watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
      confirmDelete.value = false;
      isDeleting.value = false;
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>