<template>
  <div class="relative mb-8">
    <!-- Banner -->
    <div class="w-full h-60 bg-gray-900 rounded-xl overflow-hidden">
      <img 
        v-if="ong?.banner" 
        :src="ong.banner" 
        :alt="`Banner de ${ong.nombre}`"
        class="w-full h-full object-cover"
      />
      <div 
        v-else 
        class="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900"
      >
        <h2 class="text-2xl font-bold text-gray-200">{{ ong?.nombre || 'Cargando...' }}</h2>
      </div>
    </div>
    
    <!-- Logo y nombre -->
    <div class="absolute bottom-0 left-8 transform translate-y-1/2 flex items-end">
      <div class="bg-white p-2 rounded-xl shadow-lg mr-4">
        <img 
          v-if="ong?.logo" 
          :src="ong.logo" 
          :alt="`Logo de ${ong.nombre}`"
          class="w-24 h-24 object-contain"
        />
        <div v-else class="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Estado y acciones -->
    <div class="absolute bottom-0 right-8 transform translate-y-1/2 flex items-center space-x-4">
      <span :class="[
        'px-3 py-1 rounded-full text-sm font-medium',
        getEstadoBadgeClass(ong?.estado)
      ]">
        {{ getEstadoLabel(ong?.estado) }}
      </span>
      
      <button 
        class="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-2 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span>Editar</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ong, EstadoOng } from '~/types/ong';

interface Props {
  ong: Ong | null;
}

const props = defineProps<Props>();

// Obtener clase de badge según estado
const getEstadoBadgeClass = (estado?: EstadoOng) => {
  if (!estado) return 'bg-gray-100 text-gray-800';
  
  const classes = {
    activa: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    inactiva: 'bg-gray-100 text-gray-800 border border-gray-200',
    pendiente: 'bg-amber-100 text-amber-800 border border-amber-200',
    suspendida: 'bg-red-100 text-red-800 border border-red-200'
  };
  
  return classes[estado];
};

// Obtener etiqueta según estado
const getEstadoLabel = (estado?: EstadoOng) => {
  if (!estado) return 'Desconocido';
  
  const labels = {
    activa: 'Activa',
    inactiva: 'Inactiva',
    pendiente: 'Pendiente de revisión',
    suspendida: 'Suspendida'
  };
  
  return labels[estado];
};
</script>