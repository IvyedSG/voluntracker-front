<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteMetricas.vue -->
<template>
  <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="metrica in metricas"
      :key="metrica.id"
      class="bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all hover:shadow-lg hover:bg-gray-800/80"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-gray-400">{{ metrica.titulo }}</p>
          <h4 class="text-2xl font-semibold mt-1 text-white">
            {{ formatValue(metrica.valor, metrica.formatoValor) }}
          </h4>
        </div>
        
        <div class="w-12 h-12 rounded-lg flex items-center justify-center shadow-inner"
          :class="getColorClasses(metrica.color)"
        >
          <UIcon :name="metrica.icono || 'i-heroicons-chart-bar'" class="w-6 h-6" />
        </div>
      </div>
      
      <div class="mt-4 flex items-center text-sm" v-if="metrica.variacion !== undefined">
        <div :class="getTrendClass(metrica.tendencia)" class="flex items-center">
          <UIcon :name="getTrendIcon(metrica.tendencia)" class="w-4 h-4 mr-1" />
          <span>{{ metrica.variacion > 0 ? '+' : '' }}{{ metrica.variacion }}%</span>
        </div>
        <span class="text-gray-500 ml-2">vs período anterior</span>
      </div>
      
      <p v-if="metrica.descripcion" class="text-xs text-gray-500 mt-2">
        {{ metrica.descripcion }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MetricaReporte } from '~/types/reportes';

defineProps<{
  metricas: MetricaReporte[]
}>();

// Funciones de utilidad
const formatValue = (valor: number, formato?: string): string => {
  if (formato === 'porcentaje') {
    return `${valor.toFixed(1)}%`;
  }

  if (formato === 'horas') {
    return `${valor.toFixed(1)}h`;
  }

  if (formato === 'dinero') {
    return `$${valor.toLocaleString('es-ES')}`;
  }

  if (valor > 1000) {
    return valor.toLocaleString('es-ES');
  }

  return valor.toString();
};

const getTrendClass = (tendencia?: "arriba" | "abajo" | "estable"): string => {
  if (tendencia === "arriba") return "text-green-400";
  if (tendencia === "abajo") return "text-red-400";
  return "text-gray-400";
};

const getTrendIcon = (tendencia?: "arriba" | "abajo" | "estable"): string => {
  if (tendencia === "arriba") return "i-heroicons-arrow-trending-up";
  if (tendencia === "abajo") return "i-heroicons-arrow-trending-down";
  return "i-heroicons-minus";
};

const getColorClasses = (color?: string): string => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-900/40 text-blue-400 border border-blue-800/30',
    green: 'bg-green-900/40 text-green-400 border border-green-800/30',
    yellow: 'bg-yellow-900/40 text-yellow-400 border border-yellow-800/30',
    purple: 'bg-purple-900/40 text-purple-400 border border-purple-800/30',
    red: 'bg-red-900/40 text-red-400 border border-red-800/30',
    orange: 'bg-orange-900/40 text-orange-400 border border-orange-800/30',
  };
  
  return colorMap[color || 'blue'] || colorMap.blue;
};
</script>