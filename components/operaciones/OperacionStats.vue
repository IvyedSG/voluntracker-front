<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionStats.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Total Operaciones -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div class="flex items-center justify-between mb-4">
        <div>
          <p class="text-gray-400 text-sm font-medium">Total Operaciones</p>
          <p class="text-2xl font-bold text-white mt-1 group-hover:text-blue-300 transition-colors">{{ stats.total }}</p>
        </div>
        <div class="w-12 h-12 bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-lg flex items-center justify-center shadow-md border border-blue-800/20">
          <UIcon name="i-heroicons-clipboard-document-list" class="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
        </div>
      </div>
      <div class="flex items-center text-sm justify-between">
        <div class="flex items-center">
          <UIcon name="i-heroicons-check-circle" class="h-4 w-4 text-green-400 mr-1.5" />
          <span class="text-green-400 font-medium">{{ stats.completadas }}</span>
          <span class="text-gray-400 ml-1">completadas</span>
        </div>
        <div class="h-1 w-16 bg-gray-800 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-blue-500 to-green-500"
            :style="{ width: `${(stats.completadas / stats.total) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- En Progreso -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div class="flex items-center justify-between mb-4">
        <div>
          <p class="text-gray-400 text-sm font-medium">En Progreso</p>
          <p class="text-2xl font-bold text-white mt-1 group-hover:text-blue-300 transition-colors">{{ stats.enProgreso }}</p>
        </div>
        <div class="w-12 h-12 bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-lg flex items-center justify-center shadow-md border border-blue-800/20">
          <UIcon name="i-heroicons-play" class="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
        </div>
      </div>
      <div class="flex items-center text-sm justify-between">
        <div class="flex items-center">
          <UIcon name="i-heroicons-clock" class="h-4 w-4 text-yellow-400 mr-1.5" />
          <span class="text-yellow-400 font-medium">{{ stats.pendientes }}</span>
          <span class="text-gray-400 ml-1">pendientes</span>
        </div>
        <div class="h-1 w-16 bg-gray-800 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-yellow-500 to-blue-500"
            :style="{ width: `${(stats.pendientes / stats.total) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Vencidas -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div class="flex items-center justify-between mb-4">
        <div>
          <p class="text-gray-400 text-sm font-medium">Vencidas</p>
          <p class="text-2xl font-bold text-red-400 mt-1 group-hover:text-red-300 transition-colors">{{ stats.vencidas }}</p>
        </div>
        <div class="w-12 h-12 bg-gradient-to-br from-red-900/40 to-red-800/20 rounded-lg flex items-center justify-center shadow-md border border-red-800/20">
          <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-red-400 group-hover:text-red-300 transition-colors" />
        </div>
      </div>
      <div class="flex items-center text-sm justify-between">
        <div class="flex items-center">
          <UIcon name="i-heroicons-x-circle" class="h-4 w-4 text-red-400 mr-1.5" />
          <span class="text-red-400 font-medium">{{ porcentajeVencidas }}%</span>
          <span class="text-gray-400 ml-1">del total</span>
        </div>
        <div class="h-1 w-16 bg-gray-800 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-red-500 to-orange-500"
            :style="{ width: `${porcentajeVencidas}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Eficiencia -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div class="flex items-center justify-between mb-4">
        <div>
          <p class="text-gray-400 text-sm font-medium">Eficiencia</p>
          <p class="text-2xl font-bold text-white mt-1 group-hover:text-green-300 transition-colors">{{ stats.promedioCompletion }}%</p>
        </div>
        <div class="w-12 h-12 bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-lg flex items-center justify-center shadow-md border border-green-800/20">
          <UIcon name="i-heroicons-chart-bar" class="h-6 w-6 text-green-400 group-hover:text-green-300 transition-colors" />
        </div>
      </div>
      <div class="flex items-center text-sm justify-between">
        <div class="flex items-center">
          <UIcon name="i-heroicons-clock" class="h-4 w-4 text-green-400 mr-1.5" />
          <span class="text-green-400 font-medium">{{ stats.horasReales }}/{{ stats.horasTotales }}</span>
          <span class="text-gray-400 ml-1">horas</span>
        </div>
        <div class="h-1 w-16 bg-gray-800 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-cyan-500 to-green-500"
            :style="{ width: `${(stats.horasReales / stats.horasTotales) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
});

const porcentajeVencidas = computed(() => {
  if (props.stats.total === 0) return 0;
  return ((props.stats.vencidas / props.stats.total) * 100).toFixed(1);
});
</script>

<style scoped>
/* Animación para las tarjetas */
.group {
  position: relative;
}

.group::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0);
  transition: box-shadow 0.3s ease;
}

.group:hover::after {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

/* Animación para las barras de progreso */
.h-full {
  transition: width 1s ease-out;
}
</style>
