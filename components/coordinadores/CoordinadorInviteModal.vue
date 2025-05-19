<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\coordinadores\CoordinadorInviteModal.vue -->
<template>
    <UModal 
      v-model="isOpen" 
      :ui="{ 
        container: 'bg-gray-900 border border-gray-800 max-w-lg',
        overlay: 'backdrop-blur-sm'
      }"
    >
      <div class="p-5">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 rounded-full bg-indigo-900/30 flex items-center justify-center mr-4">
            <UIcon name="i-heroicons-envelope" class="h-6 w-6 text-indigo-400" />
          </div>
          <h2 class="text-xl font-semibold text-white">Enviar invitación</h2>
        </div>
  
        <div class="space-y-6">
          <!-- Información del coordinador -->
          <div class="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <div class="flex items-center">
              <UAvatar
                :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(coordinador.nombre)}&background=0369a1&color=ffffff`"
                :alt="coordinador.nombre"
                size="md"
                class="border-2 border-indigo-600/40 mr-3"
              />
              <div>
                <h3 class="font-medium text-white">{{ coordinador.nombre }}</h3>
                <p class="text-sm text-indigo-300">{{ coordinador.correo }}</p>
              </div>
              <UBadge 
                :color="getEstadoColor(coordinador.estado)" 
                :variant="coordinador.estado === 'activo' ? 'solid' : 'subtle'"
                size="sm"
                class="ml-auto"
              >
                {{ formatEstado(coordinador.estado) }}
              </UBadge>
            </div>
          </div>
  
          <!-- Mensaje de información -->
          <div class="space-y-4">
            <div class="bg-indigo-900/20 border border-indigo-800/30 rounded-lg p-4">
              <div class="flex">
                <UIcon name="i-heroicons-information-circle" class="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                <div class="text-sm text-indigo-300">
                  <p>Se enviará una invitación por correo electrónico a <strong>{{ coordinador.correo }}</strong> con instrucciones para acceder a la plataforma.</p>
                  <p v-if="coordinador.estado === 'pendiente'" class="mt-1.5">
                    Este coordinador aún no ha activado su cuenta. Al enviar la invitación, tendrá 7 días para completar el registro.
                  </p>
                  <p v-else-if="coordinador.estado === 'inactivo'" class="mt-1.5">
                    Este coordinador está actualmente inactivo. Al enviar la invitación, su estado cambiará a pendiente y tendrá acceso limitado hasta activación.
                  </p>
                  <p v-else class="mt-1.5">
                    Este coordinador ya tiene acceso activo a la plataforma. Esta acción enviará un recordatorio con sus credenciales.
                  </p>
                </div>
              </div>
            </div>
  
            <!-- Opciones de personalización -->
            <UFormGroup label="Mensaje personalizado (opcional)">
              <UTextarea
                v-model="mensaje"
                placeholder="Escribe un mensaje personal que se incluirá en el correo de invitación..."
                :ui="{
                  base: 'bg-gray-800/50 border-gray-700',
                  focus: 'ring-indigo-500/50'
                }"
                rows="3"
              />
              <template #description>
                <p class="text-gray-400 text-xs">
                  Este mensaje personalizado aparecerá en el correo junto con las instrucciones de acceso.
                </p>
              </template>
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
              color="indigo"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              @click="handleConfirm"
            >
              <UIcon name="i-heroicons-envelope" class="mr-1" />
              Enviar invitación
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
  
  // Estado para mensaje personalizado
  const mensaje = ref('');
  
  // Estado de envío
  const isSubmitting = ref(false);
  
  // Función para formatear el estado
  function formatEstado(estado) {
    switch (estado) {
      case 'activo': return 'Activo';
      case 'inactivo': return 'Inactivo';
      case 'pendiente': return 'Pendiente';
      default: return estado;
    }
  }
  
  // Función para obtener el color según el estado
  function getEstadoColor(estado) {
    switch (estado) {
      case 'activo': return 'success';
      case 'inactivo': return 'warning';
      case 'pendiente': return 'blue';
      default: return 'gray';
    }
  }
  
  // Manejar la confirmación
  const handleConfirm = async () => {
    isSubmitting.value = true;
    try {
      // Aquí podrías añadir lógica adicional antes de confirmar
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulación de carga
      
      // Emitir evento de confirmación con datos adicionales si es necesario
      emit('confirm', {
        coordinadorId: props.coordinador.id,
        mensajePersonalizado: mensaje.value
      });
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>