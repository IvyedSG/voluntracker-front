<template>
    <UCard class="bg-gradient-to-br from-teal-800/20 to-teal-700/10 border border-teal-800/30 shadow-lg transform transition duration-300 hover:shadow-teal-900/20 hover:-translate-y-1">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-teal-300">Análisis Predictivo</h3>
        <div class="bg-teal-700/20 p-2 rounded-lg flex items-center justify-center h-10 w-10 shadow-inner">
          <UIcon name="i-heroicons-chart-pie" class="h-6 w-6 text-teal-400" />
        </div>
      </div>
      
      <div class="p-3 rounded-lg bg-teal-900/20 border border-teal-800/30 mb-4">
        <div class="flex items-center space-x-2 mb-2">
          <UIcon name="i-heroicons-arrow-trending-up" class="h-5 w-5 text-teal-400" />
          <p class="text-sm text-gray-300">
            Basado en los datos históricos, se espera un crecimiento del:
          </p>
        </div>
        <div class="text-2xl font-bold text-center text-green-400 my-2">
          +{{ prediction?.growth || 0 }}%
        </div>
        <p class="text-xs text-gray-400 text-center">en los próximos meses</p>
      </div>
      
      <div class="space-y-2">
        <div class="flex justify-between text-xs text-gray-400">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
        <div class="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            class="bg-gradient-to-r from-green-600 to-green-400 h-3 rounded-full relative"
            :style="{ width: Math.min((prediction?.growth || 0), 100) + '%' }"
          >
            <div class="absolute inset-0 bg-white/10 overflow-hidden rounded-full bg-[length:10px_10px] bg-[0_0] animate-shimmer"></div>
          </div>
        </div>
      </div>
    </UCard>
  </template>
  
  <script setup lang="ts">
  const { prediction } = defineProps<{
    prediction?: {
      growth: number;
    };
  }>();
  </script>
  
  <style scoped>
  @keyframes shimmer {
    100% {
      background-position: 100px 0;
    }
  }
  
  .animate-shimmer {
    animation: shimmer 2s infinite linear;
    background-image: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  </style>