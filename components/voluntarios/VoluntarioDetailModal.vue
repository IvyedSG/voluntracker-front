<template>
  <UModal 
    v-model:open="isOpen" 
    :dismissible="true"
    title="Detalles del voluntario"
    size="lg"
    class="voluntario-detail-modal"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <UIcon name="i-heroicons-user-circle" class="mr-3 text-blue-500 text-3xl" />
          <h3 class="text-xl font-medium bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">Detalles del voluntario</h3>
        </div>
        <UBadge 
          :color="voluntario.estado === 'activo' ? 'success' : 'warning'" 
          variant="solid"
          size="lg"
          :icon="voluntario.estado === 'activo' ? 'i-heroicons-check-circle' : 'i-heroicons-pause-circle'"
          class="shadow-md"
        >
          {{ voluntario.estado }}
        </UBadge>
      </div>
    </template>
    
    <template #body>
      <div class="space-y-7">
        <!-- Cabecera con info principal mejorada visualmente -->
        <div class="flex items-center bg-gradient-to-r from-blue-900/30 to-indigo-900/20 p-5 rounded-xl border border-blue-900/30 shadow-inner">
          <div class="relative">
            <div class="absolute inset-0 rounded-full blur-md bg-blue-500/20"></div>
            <UAvatar
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(voluntario.nombre)}&background=0369a1&color=ffffff`"
              :alt="voluntario.nombre"
              class="h-20 w-20 border-2 border-blue-600/60 shadow-lg relative z-10"
            />
          </div>
          <div class="ml-5">
            <h2 class="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 text-transparent bg-clip-text">{{ voluntario.nombre }}</h2>
            <div class="flex items-center mt-2 text-gray-300 text-base">
              <UIcon name="i-heroicons-identification" class="mr-2 text-lg text-blue-400" />
              <span>DNI: {{ voluntario.dni }}</span>
            </div>
          </div>
        </div>
        
        <!-- Estadísticas rápidas mejoradas -->
        <div class="grid grid-cols-3 gap-5 p-6 bg-gradient-to-b from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-800/80 shadow-inner">
          <div class="text-center">
            <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">Eventos</div>
            <div class="text-2xl font-semibold text-blue-400">{{ voluntario.historial.eventos }}</div>
          </div>
          <div class="text-center border-x border-gray-700/30">
            <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">Horas</div>
            <div class="text-2xl font-semibold text-blue-400">{{ voluntario.historial.horas }}</div>
          </div>
          <div class="text-center">
            <div class="text-sm uppercase tracking-wider text-gray-500 mb-2">Certificados</div>
            <div class="text-2xl font-semibold text-blue-400">{{ voluntario.historial.certificados }}</div>
          </div>
        </div>
        
        <!-- Información detallada con mejor estilo -->
        <div class="space-y-4">
          <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 pl-1 border-l-4 border-blue-500">Información de contacto</h4>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
            <div class="space-y-2 p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-800/80 hover:shadow-md transition-all">
              <div class="text-sm text-gray-400">Email</div>
              <div class="flex items-center">
                <UIcon name="i-heroicons-envelope" class="mr-2 text-blue-500 text-xl" />
                <a :href="`mailto:${voluntario.correo}`" class="text-lg text-blue-400 hover:text-blue-300 transition-colors">
                  {{ voluntario.correo }}
                </a>
              </div>
            </div>
            
            <div class="space-y-2 p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-800/80 hover:shadow-md transition-all">
              <div class="text-sm text-gray-400">Teléfono</div>
              <div class="flex items-center">
                <UIcon name="i-heroicons-phone" class="mr-2 text-blue-500 text-xl" />
                <span class="text-lg">{{ voluntario.telefono }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Área y registro con efecto visual -->
        <div class="space-y-3">
          <h4 class="text-base font-semibold uppercase tracking-wider text-gray-400 pl-1 border-l-4 border-blue-500">Actividad</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="flex items-center p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-800/80 hover:shadow-md transition-all">
              <div class="text-base text-gray-300 mr-4">Área:</div>
              <UBadge color="info" variant="solid" size="lg" class="shadow-sm">{{ voluntario.area }}</UBadge>
            </div>
            
            <div class="flex items-center p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-800/80 hover:shadow-md transition-all">
              <div class="text-base text-gray-300 mr-4">Fecha de registro:</div>
              <span class="text-base">{{ formatDate(voluntario.fechaRegistro) }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <template #footer>
      <div class="flex justify-between w-full py-3">
        <UButton
          color="neutral"
          variant="ghost"
          size="lg"
          @click="isOpen = false"
          class="hover:bg-gray-800 transition-colors"
        >
          Cerrar
        </UButton>
        
        <UButton
          color="warning"
          icon="i-heroicons-pencil-square"
          size="lg"
          @click="$emit('edit', voluntario)"
          class="shadow-md hover:shadow-lg hover:shadow-yellow-900/30 transition-all"
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