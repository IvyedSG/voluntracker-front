<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex justify-between items-start mb-6">
      <h3 class="text-lg font-bold text-gray-900">Información General</h3>
      
      <!-- Botón editar -->
      <button 
        class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
        title="Editar información"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
    
    <!-- Información -->
    <div class="space-y-6">
      <!-- Nombre -->
      <div>
        <h4 class="text-sm font-medium text-gray-500 mb-1">Nombre de la organización</h4>
        <p class="text-base text-gray-900">{{ ong?.nombre || 'Cargando...' }}</p>
      </div>
      
      <!-- Descripción -->
      <div>
        <h4 class="text-sm font-medium text-gray-500 mb-1">Descripción</h4>
        <p class="text-base text-gray-900 leading-relaxed">{{ ong?.descripcion || 'Sin descripción disponible' }}</p>
      </div>
      
      <!-- Misión y Visión -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 class="text-sm font-medium text-gray-500 mb-1">Misión</h4>
          <p class="text-base text-gray-900 leading-relaxed">{{ ong?.mision || 'Sin misión definida' }}</p>
        </div>
        
        <div>
          <h4 class="text-sm font-medium text-gray-500 mb-1">Visión</h4>
          <p class="text-base text-gray-900 leading-relaxed">{{ ong?.vision || 'Sin visión definida' }}</p>
        </div>
      </div>
      
      <!-- Fecha de creación -->
      <div>
        <h4 class="text-sm font-medium text-gray-500 mb-1">Fecha de creación</h4>
        <p class="text-base text-gray-900">{{ formatearFecha(ong?.fechaCreacion) }}</p>
      </div>
      
      <!-- Áreas de trabajo -->
      <div>
        <h4 class="text-sm font-medium text-gray-500 mb-1">Áreas de trabajo</h4>
        <div class="flex flex-wrap gap-2 mt-2">
          <span 
            v-for="area in ong?.areas" 
            :key="area.id"
            class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
            :style="area.color ? { backgroundColor: `${area.color}20`, color: area.color } : {}"
          >
            {{ area.nombre }}
          </span>
          <span v-if="!ong?.areas?.length" class="text-gray-500">No se han definido áreas</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ong } from '~/types/ong';

interface Props {
  ong: Ong | null;
}

const props = defineProps<Props>();

// Formatear fecha
const formatearFecha = (fecha?: string) => {
  if (!fecha) return 'Fecha no disponible';
  
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>