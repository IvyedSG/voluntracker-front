<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\coordinadores\CoordinadorDeleteModal.vue -->
<template>
    <UModal 
      v-model="isOpen" 
      :ui="{ 
        container: 'bg-gray-900 border border-gray-800 max-w-lg',
        overlay: 'backdrop-blur-sm'
      }"
    >
      <div class="p-5">
        <div class="flex items-start mb-6">
          <div class="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mr-4 mt-1">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h2 class="text-xl font-semibold text-white">Eliminar coordinador</h2>
            <p class="text-gray-400 mt-1">Esta acción no se puede deshacer.</p>
          </div>
        </div>
  
        <div class="space-y-6">
          <!-- Información del coordinador -->
          <div class="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <div class="flex items-center">
              <UAvatar
                :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(coordinador.nombre)}&background=0369a1&color=ffffff`"
                :alt="coordinador.nombre"
                size="md"
                class="border-2 border-red-600/40 mr-3"
              />
              <div>
                <h3 class="font-medium text-white">{{ coordinador.nombre }}</h3>
                <p class="text-sm text-gray-400">{{ coordinador.correo }}</p>
                <div class="flex flex-wrap gap-1.5 mt-1">
                  <UBadge
                    v-for="(area, index) in coordinador.areas"
                    :key="index"
                    color="blue"
                    variant="subtle"
                    size="xs"
                  >
                    {{ area.nombre }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Advertencias -->
          <div class="space-y-3">
            <div class="bg-red-900/20 border border-red-800/30 rounded-lg p-4">
              <div class="flex">
                <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                <div class="text-sm text-red-300">
                  <p>Al eliminar este coordinador:</p>
                  <ul class="list-disc list-inside mt-2 space-y-1">
                    <li>Se revocará su acceso inmediatamente</li>
                    <li>Se desvincularán todas sus asignaciones</li>
                    <li>El usuario será notificado por correo electrónico</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Validación de seguridad -->
            <UFormGroup 
              label="Escribe 'eliminar' para confirmar" 
              required
              :error="confirmError"
            >
              <UInput
                v-model="confirmText"
                placeholder="eliminar"
                :ui="{
                  base: 'bg-gray-800/50 border-gray-700',
                  focus: 'ring-red-500/50'
                }"
              />
            </UFormGroup>
          </div>
  
          <!-- Botones de acción -->
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <UButton 
              type="button"
              color="gray"
              variant="ghost"
              @click="$emit('cancel')"
            >
              Cancelar
            </UButton>
            <UButton 
              type="button"
              color="red"
              :loading="isDeleting"
              :disabled="isDeleting || confirmText.toLowerCase() !== 'eliminar'"
              @click="handleDelete"
            >
              <UIcon name="i-heroicons-trash" class="mr-1" />
              Eliminar coordinador
            </UButton>
          </div>
        </div>
      </div>
    </UModal>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
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
  
  // Sincronizar el estado del modal con v-model
  const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });
  
  // Estado para texto de confirmación
  const confirmText = ref('');
  const confirmError = computed(() => {
    if (confirmText.value && confirmText.value.toLowerCase() !== 'eliminar') {
      return 'Por favor, escribe exactamente "eliminar" para confirmar';
    }
    return '';
  });
  
  // Estado de eliminación
  const isDeleting = ref(false);
  
  // Manejar la eliminación
  const handleDelete = async () => {
    if (confirmText.value.toLowerCase() !== 'eliminar') {
      return;
    }
    
    isDeleting.value = true;
    try {
      // Aquí podrías añadir lógica adicional antes de confirmar
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulación de carga
      
      // Emitir evento de confirmación
      emit('confirm');
    } finally {
      isDeleting.value = false;
    }
  };
  </script>