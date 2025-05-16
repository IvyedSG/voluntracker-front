<template>
    <UCard class="bg-gradient-to-br from-blue-900/20 to-violet-900/10 border border-blue-800/30 shadow-lg transform transition duration-300 hover:shadow-violet-900/20 hover:-translate-y-1">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-blue-300">Crecimiento de Voluntarios</h3>
        <div class="bg-violet-800/20 p-2 rounded-lg flex items-center justify-center h-10 w-10 shadow-inner">
          <UIcon name="i-heroicons-arrow-up-right" class="h-6 w-6 text-violet-400" />
        </div>
      </div>
      
      <div class="rounded-lg overflow-hidden border border-blue-800/30">
        <table class="w-full text-sm">
          <thead class="bg-blue-900/30">
            <tr>
              <th class="text-left py-2 px-3 text-blue-300 font-medium">Mes</th>
              <th class="text-right py-2 px-3 text-blue-300 font-medium">Voluntarios</th>
              <th class="text-right py-2 px-3 text-blue-300 font-medium">Variación</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-blue-800/20">
            <tr 
              v-for="(count, index) in (history?.data || [])" 
              :key="index"
              class="transition duration-150 hover:bg-blue-900/20"
            >
              <td class="py-2 px-3 text-gray-300">{{ history?.labels[index] || '' }}</td>
              <td class="py-2 px-3 text-right text-gray-300">{{ count }}</td>
              <td class="py-2 px-3 text-right">
                <span 
                  v-if="index > 0" 
                  class="inline-flex items-center"
                  :class="{
                    'text-green-400': count > (history?.data[index-1] || 0),
                    'text-red-400': count < (history?.data[index-1] || 0),
                    'text-gray-400': count === (history?.data[index-1] || 0)
                  }"
                >
                  <UIcon 
                    :name="count > (history?.data[index-1] || 0) ? 'i-heroicons-arrow-up' : count < (history?.data[index-1] || 0) ? 'i-heroicons-arrow-down' : 'i-heroicons-minus'" 
                    class="h-4 w-4 mr-1"
                  />
                  {{ Math.abs(count - (history?.data[index-1] || 0)) }}
                </span>
                <span v-else>-</span>
              </td>
            </tr>
            <tr v-if="!(history?.data?.length)" class="hover:bg-blue-900/20">
              <td colspan="3" class="py-4 text-center text-gray-400">No hay datos disponibles</td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </template>
  
  <script setup lang="ts">
  const { history } = defineProps<{
    history?: {
      labels: string[];
      data: number[];
    };
  }>();
  </script>