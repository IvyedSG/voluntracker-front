<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex justify-between items-start mb-6">
      <h3 class="text-lg font-bold text-gray-900">Estadísticas</h3>
      
      <div class="flex items-center space-x-3">
        <!-- Toggle de visibilidad -->
        <button 
          class="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          @click="switchPublic"
        >
          <span v-if="isPublic">Visibilidad: Pública</span>
          <span v-else>Visibilidad: Privada</span>
          <span 
            class="relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            :class="isPublic ? 'bg-emerald-500' : 'bg-gray-200'"
          >
            <span 
              class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              :class="isPublic ? 'translate-x-5' : 'translate-x-0'"
            ></span>
          </span>
        </button>
        
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
    </div>
    
    <!-- Grid de estadísticas -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <!-- Voluntarios activos -->
      <div class="bg-blue-50 rounded-lg p-4 flex flex-col">
        <div class="text-blue-600 mb-2 flex items-center">
          <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span class="text-sm font-medium">Voluntarios</span>
        </div>
        <div class="text-2xl font-bold text-gray-900">
          {{ formatearNumero(ong?.stats?.voluntariosActivos) }}
        </div>
        <div class="text-xs text-blue-600 mt-1">activos</div>
      </div>
      
      <!-- Actividades realizadas -->
      <div class="bg-purple-50 rounded-lg p-4 flex flex-col">
        <div class="text-purple-600 mb-2 flex items-center">
          <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span class="text-sm font-medium">Actividades</span>
        </div>
        <div class="text-2xl font-bold text-gray-900">
          {{ formatearNumero(ong?.stats?.actividadesRealizadas) }}
        </div>
        <div class="text-xs text-purple-600 mt-1">realizadas</div>
      </div>
      
      <!-- Horas de voluntariado -->
      <div class="bg-green-50 rounded-lg p-4 flex flex-col">
        <div class="text-green-600 mb-2 flex items-center">
          <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm font-medium">Horas</span>
        </div>
        <div class="text-2xl font-bold text-gray-900">
          {{ formatearNumero(ong?.stats?.horasVoluntariado) }}
        </div>
        <div class="text-xs text-green-600 mt-1">de voluntariado</div>
      </div>
      
      <!-- Beneficiarios alcanzados -->
      <div v-if="ong?.stats?.beneficiariosAlcanzados" class="bg-amber-50 rounded-lg p-4 flex flex-col">
        <div class="text-amber-600 mb-2 flex items-center">
          <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm font-medium">Beneficiarios</span>
        </div>
        <div class="text-2xl font-bold text-gray-900">
          {{ formatearNumero(ong.stats.beneficiariosAlcanzados) }}
        </div>
        <div class="text-xs text-amber-600 mt-1">alcanzados</div>
      </div>
      
      <!-- Proyectos activos -->
      <div v-if="ong?.stats?.proyectosActivos" class="bg-rose-50 rounded-lg p-4 flex flex-col">
        <div class="text-rose-600 mb-2 flex items-center">
          <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="text-sm font-medium">Proyectos</span>
        </div>
        <div class="text-2xl font-bold text-gray-900">
          {{ formatearNumero(ong.stats.proyectosActivos) }}
        </div>
        <div class="text-xs text-rose-600 mt-1">activos</div>
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
const isPublic = ref(true);

// Cambiar visibilidad de estadísticas
const switchPublic = () => {
  isPublic.value = !isPublic.value;
};

// Formatear número con separación de miles
const formatearNumero = (valor?: number) => {
  if (valor === undefined) return '-';
  return new Intl.NumberFormat('es-ES').format(valor);
};
</script>