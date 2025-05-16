<template>
    <UCard class="bg-gradient-to-br from-sky-800/20 to-sky-700/10 border border-sky-800/30 shadow-lg transform transition duration-300 hover:shadow-sky-900/20 hover:-translate-y-1">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-sky-300">Distribución por Áreas</h3>
        <div class="bg-sky-700/20 p-2 rounded-lg flex items-center justify-center h-10 w-10 shadow-inner">
          <UIcon name="i-heroicons-squares-2x2" class="h-6 w-6 text-sky-400" />
        </div>
      </div>
      
      <ul class="space-y-3">
        <li
          v-for="(value, index) in (distribution?.data || [])"
          :key="index"
          class="p-2 rounded-lg bg-sky-900/10 border border-sky-800/20 transform transition duration-200 hover:bg-sky-900/20"
        >
          <div class="flex justify-between items-center mb-1.5">
            <span class="text-sm text-gray-300 flex items-center">
              <span class="h-3 w-3 rounded-full mr-2" :style="{ backgroundColor: distribution?.colors[index] || '#ffffff' }"></span>
              {{ distribution?.labels[index] || '' }}
            </span>
            <span
              class="text-sm font-bold"
              :style="{ color: distribution?.colors[index] || '#ffffff' }"
            >
              {{ value }}%
            </span>
          </div>
          <div class="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden shadow-inner">
            <div
              class="h-full rounded-full"
              :style="{
                width: value + '%',
                backgroundColor: distribution?.colors[index] || '#ffffff'
              }"
            ></div>
          </div>
        </li>
        
        <li v-if="!(distribution?.data?.length)" class="flex justify-center items-center p-3 text-sm text-gray-400">
          No hay datos disponibles
        </li>
      </ul>
    </UCard>
  </template>
  
  <script setup lang="ts">
  const { distribution } = defineProps<{
    distribution?: {
      labels: string[];
      data: number[];
      colors: string[];
    };
  }>();
  </script>