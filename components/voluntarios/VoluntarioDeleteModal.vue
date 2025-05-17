<template>
    <UModal v-model:open="isOpen" :dismissible="false">
      <template #header>
        <div class="flex items-center">
          <UIcon name="i-heroicons-exclamation-triangle" class="mr-2 text-red-500" />
          <h3 class="text-lg font-medium">Confirmar eliminación</h3>
        </div>
      </template>
      
      <template #body>
        <div class="space-y-4">
          <p>¿Estás seguro de que deseas eliminar al voluntario <span class="font-semibold text-white">{{ voluntario.nombre }}</span>?</p>
          <div class="bg-red-950/30 border border-red-900/50 rounded-lg p-3 text-sm">
            <p class="text-red-300">
              <UIcon name="i-heroicons-exclamation-circle" class="inline mr-1 -mt-0.5" />
              Esta acción eliminará permanentemente todos los datos asociados, incluyendo:
            </p>
            <ul class="list-disc ml-8 mt-2 text-red-200/90 space-y-1">
              <li>Historial de participación en eventos</li>
              <li>Registro de horas de voluntariado</li>
              <li>Certificados emitidos</li>
              <li>Otros registros relacionados con este voluntario</li>
            </ul>
          </div>
        </div>
      </template>
      
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton 
            color="neutral" 
            variant="ghost" 
            @click="cancel"
          >
            Cancelar
          </UButton>
          <UButton 
            color="error" 
            :loading="deleting" 
            @click="confirm"
          >
            Eliminar permanentemente
          </UButton>
        </div>
      </template>
    </UModal>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import type { Voluntario } from '~/types/voluntarios';
  
  // Props
  const props = defineProps<{
    modelValue: boolean; // Cambiar 'open' por 'modelValue'
    voluntario: Voluntario;
    deleting?: boolean;
  }>();
  
  // Emits
  const emit = defineEmits<{
    (e: 'update:modelValue', open: boolean): void; // Cambiar 'update:open' por 'update:modelValue'
    (e: 'confirm' | 'cancel'): void; // Unificado para evitar sobrecarga innecesaria
  }>();
  
  // Estado del modal
  const isOpen = computed({
    get: () => props.modelValue, // Cambiar props.open por props.modelValue
    set: (value) => emit('update:modelValue', value) // Cambiar 'update:open' por 'update:modelValue'
  });
  
  // Confirmar eliminación
  function confirm() {
    emit('confirm');
  }
  
  // Cancelar eliminación
  function cancel() {
    emit('cancel');
    isOpen.value = false;
  }
  </script>