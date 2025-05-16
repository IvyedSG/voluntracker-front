<template>
    <UCard class="bg-gradient-to-br from-indigo-800/20 to-indigo-700/10 border border-indigo-800/30 shadow-lg transform transition duration-300 hover:shadow-indigo-900/20 hover:-translate-y-1">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-indigo-300">KPIs de Participación</h3>
        <div class="bg-indigo-700/20 p-2 rounded-lg flex items-center justify-center h-10 w-10 shadow-inner">
          <UIcon name="i-heroicons-chart-bar" class="h-6 w-6 text-indigo-400" />
        </div>
      </div>
      
      <ul class="space-y-3">
        <li class="flex justify-between items-center">
          <span class="text-sm text-gray-300 flex items-center">
            <UIcon name="i-heroicons-user-group" class="h-4 w-4 mr-2 text-indigo-400" />
            % Asistencia
          </span>
          <div class="flex items-center space-x-2">
            <div class="w-16 bg-gray-700 h-2 rounded-full overflow-hidden">
              <div class="h-full bg-indigo-500 rounded-full" :style="`width: ${asistencia}%`"></div>
            </div>
            <span class="font-bold text-indigo-300">{{ asistencia }}%</span>
          </div>
        </li>
        
        <li class="flex justify-between items-center">
          <span class="text-sm text-gray-300 flex items-center">
            <UIcon name="i-heroicons-heart" class="h-4 w-4 mr-2 text-green-400" />
            % Retención
          </span>
          <div class="flex items-center space-x-2">
            <div class="w-16 bg-gray-700 h-2 rounded-full overflow-hidden">
              <div class="h-full bg-green-500 rounded-full" :style="`width: ${retencion}%`"></div>
            </div>
            <span class="font-bold text-green-300">{{ retencion }}%</span>
          </div>
        </li>
        
        <li class="flex justify-between items-center">
          <span class="text-sm text-gray-300 flex items-center">
            <UIcon name="i-heroicons-arrow-trending-down" class="h-4 w-4 mr-2 text-red-400" />
            % Abandono
          </span>
          <div class="flex items-center space-x-2">
            <div class="w-16 bg-gray-700 h-2 rounded-full overflow-hidden">
              <div class="h-full bg-red-500 rounded-full" :style="`width: ${abandono}%`"></div>
            </div>
            <span class="font-bold text-red-300">{{ abandono }}%</span>
          </div>
        </li>
      </ul>
    </UCard>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  const { retencion, asistencia } = defineProps<{
    retencion: number;
    asistencia: number;
  }>();
  
  // Cálculo del porcentaje de abandono
  const abandono = computed(() => 100 - retencion);
  </script>