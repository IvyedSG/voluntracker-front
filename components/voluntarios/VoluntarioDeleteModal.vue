<template>
  <UModal :open="isOpen" @update:open="isOpen = $event" :dismissible="false" size="md">
    <template #header>
      <div class="flex items-center bg-red-950/30 p-2 rounded-lg">
        <UIcon name="i-heroicons-exclamation-triangle" class="mr-3 text-red-500 text-2xl animate-pulse" />
        <h3 class="text-lg font-medium text-red-100">Confirmar eliminación</h3>
      </div>
    </template>
    
    <template #body>
      <div class="space-y-5 py-2">
        <p class="text-center">
          ¿Estás seguro de que deseas eliminar al voluntario 
          <span v-if="voluntario" class="font-semibold text-white bg-red-900/20 px-1 py-0.5 rounded">
            {{ voluntario.nombre }}
          </span>
          <span v-else class="font-semibold text-white bg-red-900/20 px-1 py-0.5 rounded">
            seleccionado
          </span>?
        </p>
        
        <div class="bg-gradient-to-br from-red-950/40 to-red-900/20 border border-red-900/50 rounded-lg p-4 text-sm shadow-inner">
          <p class="text-red-300 flex items-start">
            <UIcon name="i-heroicons-exclamation-circle" class="mr-2 mt-0.5 text-red-500" />
            <span>Esta acción eliminará permanentemente todos los datos asociados, incluyendo:</span>
          </p>
          <ul class="list-disc ml-10 mt-3 text-red-200/90 space-y-1.5">
            <li>Historial de participación en eventos</li>
            <li>Registro de horas de voluntariado</li>
            <li>Certificados emitidos</li>
            <li>Otros registros relacionados con este voluntario</li>
          </ul>
        </div>
      </div>
    </template>
    
    <template #footer>
      <div class="flex justify-end gap-3 border-t border-gray-800 pt-4">
        <UButton 
          color="neutral" 
          variant="ghost" 
          @click="cancel"
          class="hover:bg-gray-800 transition-colors"
        >
          Cancelar
        </UButton>
        <UButton 
          color="error" 
          :loading="deleting" 
          variant="solid"
          @click="confirm"
          class="shadow-md hover:shadow-lg hover:shadow-red-900/30 transition-all"
        >
          <UIcon name="i-heroicons-trash" class="mr-1" />
          Eliminar permanentemente
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  voluntario: {
    type: Object,
    required: false,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const deleting = ref(false);

function confirm() {
  if (!props.voluntario) return;
  
  deleting.value = true;
  
  // Simular una operación asíncrona
  setTimeout(() => {
    emit('confirm', props.voluntario.id);
    deleting.value = false;
    isOpen.value = false;
  }, 300);
}

function cancel() {
  emit('cancel');
  isOpen.value = false;
}
</script>