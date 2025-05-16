<template>
    <UModal 
      v-model:open="isOpen" 
      :dismissible="true"
      title="Detalles del voluntario"
      size="lg"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <UIcon name="i-heroicons-user-circle" class="mr-3 text-blue-500 text-2xl" />
            <h3 class="text-xl font-medium">Detalles del voluntario</h3>
          </div>
          <UBadge 
            :color="voluntario.estado === 'activo' ? 'success' : 'warning'" 
            variant="subtle"
            size="lg"
            :icon="voluntario.estado === 'activo' ? 'i-heroicons-check-circle' : 'i-heroicons-pause-circle'"
          >
            {{ voluntario.estado }}
          </UBadge>
        </div>
      </template>
      
      <template #body>
        <div class="space-y-7">
          <!-- Cabecera con info principal -->
          <div class="flex items-center">
            <UAvatar
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(voluntario.nombre)}&background=0369a1&color=ffffff`"
              :alt="voluntario.nombre"
              class="h-20 w-20 border-2 border-blue-600/40 shadow-lg"
            />
            <div class="ml-5">
              <h2 class="text-2xl font-bold text-white">{{ voluntario.nombre }}</h2>
              <div class="flex items-center mt-2 text-gray-400 text-base">
                <UIcon name="i-heroicons-identification" class="mr-2 text-lg" />
                <span>DNI: {{ voluntario.dni }}</span>
              </div>
            </div>
          </div>
          
          <!-- Estadísticas rápidas -->
          <div class="grid grid-cols-3 gap-5 p-5 bg-gray-800/30 rounded-lg border border-gray-800 shadow-inner">
            <div class="text-center">
              <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">Eventos</div>
              <div class="text-2xl font-semibold">{{ voluntario.historial.eventos }}</div>
            </div>
            <div class="text-center border-x border-gray-800">
              <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">Horas</div>
              <div class="text-2xl font-semibold">{{ voluntario.historial.horas }}</div>
            </div>
            <div class="text-center">
              <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">Certificados</div>
              <div class="text-2xl font-semibold">{{ voluntario.historial.certificados }}</div>
            </div>
          </div>
          
          <!-- Información detallada -->
          <div class="space-y-4">
            <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400">Información de contacto</h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
              <div class="space-y-2 p-4 bg-gray-800/20 rounded-lg border border-gray-800">
                <div class="text-sm text-gray-500">Email</div>
                <div class="flex items-center">
                  <UIcon name="i-heroicons-envelope" class="mr-2 text-gray-400 text-xl" />
                  <a :href="`mailto:${voluntario.correo}`" class="text-lg text-blue-400 hover:text-blue-300 transition-colors">
                    {{ voluntario.correo }}
                  </a>
                </div>
              </div>
              
              <div class="space-y-2 p-4 bg-gray-800/20 rounded-lg border border-gray-800">
                <div class="text-sm text-gray-500">Teléfono</div>
                <div class="flex items-center">
                  <UIcon name="i-heroicons-phone" class="mr-2 text-gray-400 text-xl" />
                  <span class="text-lg">{{ voluntario.telefono }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Área y registro -->
          <div class="space-y-3">
            <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400">Actividad</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="flex items-center p-4 bg-gray-800/20 rounded-lg border border-gray-800">
                <div class="text-base text-gray-300 mr-4">Área:</div>
                <UBadge color="info" variant="subtle" size="lg">{{ voluntario.area }}</UBadge>
              </div>
              
              <div class="flex items-center p-4 bg-gray-800/20 rounded-lg border border-gray-800">
                <div class="text-base text-gray-300 mr-4">Fecha de registro:</div>
                <span class="text-base">{{ formatDate(voluntario.fechaRegistro) }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <template #footer>
        <div class="flex justify-between w-full py-1">
          <UButton
            color="neutral"
            variant="ghost"
            size="lg"
            @click="isOpen = false"
          >
            Cerrar
          </UButton>
          
          <UButton
            color="warning"
            icon="i-heroicons-pencil-square"
            size="lg"
            @click="$emit('edit', voluntario)"
          >
            Editar voluntario
          </UButton>
        </div>
      </template>
    </UModal>
  </template>
  
  <script setup lang="ts">
import { computed } from 'vue';
import { formatDate } from '~/utils/dateUtils';
import type { Voluntario } from '~/types/voluntarios';

// Props
const props = defineProps<{
  modelValue: boolean; // Cambiar 'open' por 'modelValue'
  voluntario: Voluntario;
}>();

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', open: boolean): void; // Cambiar 'update:open' por 'update:modelValue'
  (e: 'edit', voluntario: Voluntario): void;
}>();

// Estado del modal
const isOpen = computed({
  get: () => props.modelValue, // Cambiar props.open por props.modelValue
  set: (value) => emit('update:modelValue', value) // Cambiar 'update:open' por 'update:modelValue'
});
</script>