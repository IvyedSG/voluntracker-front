<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\coordinadores\CoordinadorDeleteModal.vue -->
<template>
    <div 
      class="fixed inset-0 z-50 overflow-y-auto"
      @click.self="$emit('cancel')"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
      
      <!-- Modal container -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div 
          class="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-gray-900 border border-gray-800 shadow-xl transition-all"
          @click.stop
        >
          <div class="p-6">
            <div class="flex items-start mb-6">
              <div class="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mr-4 mt-1">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-red-400" />
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-semibold text-white">Eliminar coordinador</h2>
                <p class="text-gray-400 mt-1">Esta acción no se puede deshacer.</p>
              </div>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark"
                class="ml-auto"
                @click="$emit('cancel')"
              />
            </div>
  
            <div class="space-y-6">
              <!-- Información del coordinador -->
              <div class="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div class="flex items-center">
                  <UAvatar
                    :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(coordinador.nombre)}&background=dc2626&color=ffffff`"
                    :alt="coordinador.nombre"
                    size="md"
                    class="border-2 border-red-600/40 mr-3"
                  />
                  <div class="flex-1">
                    <h3 class="font-medium text-white">{{ coordinador.nombre }}</h3>
                    <p class="text-sm text-gray-400">{{ coordinador.correo }}</p>
                    <div class="flex items-center gap-2 mt-2">
                      <UBadge
                        :color="getEstadoBadgeColor(coordinador.estado)"
                        variant="subtle"
                        size="xs"
                      >
                        {{ formatEstado(coordinador.estado) }}
                      </UBadge>
                      <UBadge
                        color="gray"
                        variant="outline"
                        size="xs"
                      >
                        {{ formatRol(coordinador.rol) }}
                      </UBadge>
                    </div>
                    
                    <!-- Áreas asignadas -->
                    <div v-if="coordinador.areasAsignadas && coordinador.areasAsignadas.length > 0" class="flex flex-wrap gap-1.5 mt-2">
                      <UBadge
                        v-for="(area, index) in coordinador.areasAsignadas.slice(0, 3)"
                        :key="area.id || index"
                        color="blue"
                        variant="subtle"
                        size="xs"
                      >
                        {{ area.nombre }}
                      </UBadge>
                      <UBadge
                        v-if="coordinador.areasAsignadas.length > 3"
                        color="blue"
                        variant="outline"
                        size="xs"
                      >
                        +{{ coordinador.areasAsignadas.length - 3 }} más
                      </UBadge>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Advertencias -->
              <div class="space-y-3">
                <div class="bg-red-900/20 border border-red-800/30 rounded-lg p-4">
                  <div class="flex">
                    <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div class="text-sm text-red-300">
                      <p class="font-medium mb-2">Al eliminar este coordinador:</p>
                      <ul class="list-disc list-inside space-y-1">
                        <li>Se revocará su acceso inmediatamente</li>
                        <li>Se desvincularán todas sus asignaciones</li>
                        <li>El usuario será notificado por correo electrónico</li>
                        <li>Los datos históricos se mantendrán para auditoría</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <!-- Validación de seguridad -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-300">
                    Escribe <span class="font-semibold text-red-400">"eliminar"</span> para confirmar *
                  </label>
                  <UInput
                    v-model="confirmText"
                    placeholder="eliminar"
                    size="lg"
                    :ui="{
                      base: 'bg-gray-800/50 border-gray-700',
                      focus: 'ring-red-500/50'
                    }"
                    @keyup.enter="handleDelete"
                  />
                  <p v-if="confirmError" class="text-red-400 text-sm">{{ confirmError }}</p>
                  <p v-else class="text-gray-500 text-xs">
                    Escribe exactamente "eliminar" para habilitar el botón de confirmación
                  </p>
                </div>
              </div>
  
              <!-- Botones de acción -->
              <div class="flex justify-end gap-3 pt-4 border-t border-gray-800">
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
                  :disabled="isDeleting || !isConfirmValid"
                  @click="handleDelete"
                >
                  <UIcon name="i-heroicons-trash" class="mr-1" />
                  {{ isDeleting ? 'Eliminando...' : 'Eliminar coordinador' }}
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  // Props
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    coordinador: {
      type: Object,
      required: true
    }
  });
  
  // Emits
  const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);
  
  // Estado para texto de confirmación
  const confirmText = ref('');
  const isDeleting = ref(false);
  
  // Computadas para validación
  const isConfirmValid = computed(() => {
    return confirmText.value.toLowerCase().trim() === 'eliminar';
  });
  
  const confirmError = computed(() => {
    if (confirmText.value && !isConfirmValid.value) {
      return 'Por favor, escribe exactamente "eliminar" para confirmar';
    }
    return '';
  });
  
  // Funciones utilitarias para formatear datos
  const formatEstado = (estado) => {
    const estados = {
      'activo': 'Activo',
      'inactivo': 'Inactivo',
      'pendiente': 'Pendiente'
    };
    return estados[estado] || estado;
  };
  
  const formatRol = (rol) => {
    const roles = {
      'admin_global': 'Admin Global',
      'lider_local': 'Líder Local',
      'coordinador_local': 'Coordinador Local'
    };
    return roles[rol] || rol;
  };
  
  const getEstadoBadgeColor = (estado) => {
    const colors = {
      'activo': 'green',
      'inactivo': 'yellow',
      'pendiente': 'blue'
    };
    return colors[estado] || 'gray';
  };
  
  // Manejar la eliminación
  const handleDelete = async () => {
    if (!isConfirmValid.value || isDeleting.value) {
      return;
    }
    
    isDeleting.value = true;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      emit('confirm');
      resetForm();
    } catch (error) {
      console.error('Error al eliminar coordinador:', error);
    } finally {
      isDeleting.value = false;
    }
  };
  
  // Resetear el formulario
  const resetForm = () => {
    confirmText.value = '';
  };
  
  // Bloquear scroll del body cuando el modal está abierto
  watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      resetForm();
    } else {
      document.body.style.overflow = '';
    }
  });
  </script>