<template>
    <UCard class="bg-gradient-to-br from-sky-800/40 to-blue-600/20 border border-sky-600/30 shadow-lg transform transition duration-300 hover:shadow-sky-700/30 hover:-translate-y-1">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-sky-300">Alertas</h3>
        <div class="bg-sky-700/30 p-2 rounded-lg flex items-center justify-center h-10 w-10 shadow-inner">
          <UIcon name="i-heroicons-bell-alert" class="h-6 w-6 text-sky-400" />
        </div>
      </div>
      
      <div v-if="alerts && alerts.length > 0" class="space-y-3">
        <div 
          v-for="(alert, index) in alerts" 
          :key="index" 
          class="flex items-start space-x-2 p-3 rounded-lg bg-sky-900/50 border border-sky-600/40 transform transition duration-200 hover:bg-sky-800/50"
        >
          <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <p class="text-sm text-sky-200">{{ alert }}</p>
        </div>
      </div>
      
      <div v-else class="flex items-center justify-center p-4 rounded-lg bg-sky-900/40 border border-sky-700/30">
        <div class="flex flex-col items-center">
          <UIcon name="i-heroicons-check-circle" class="h-8 w-8 text-green-400 mb-2" />
          <p class="text-sm text-sky-400/80 text-center">No hay alertas actualmente</p>
        </div>
      </div>
    </UCard>
  </template>
  
  <script setup lang="ts">
  const { alerts } = defineProps<{
    alerts?: string[];
  }>();
  </script>