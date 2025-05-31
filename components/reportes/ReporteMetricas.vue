<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteMetricas.vue -->
<template>
  <div class="space-y-8 overflow-visible h-auto">
    <!-- Panel principal de métricas -->
    <div v-if="metricas && metricas.length > 0" class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(metrica, index) in metricas"
        :key="metrica.id"
        class="bg-gray-900 border border-gray-700 rounded-xl p-6 transition-colors duration-200"
        :class="getMetricaHoverClass(index)"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">{{ metrica.titulo }}</p>
            <p class="text-3xl font-bold text-white mt-2">
              {{ formatValue(metrica.valor, metrica.formatoValor) }}
            </p>
          </div>
          <div 
            class="w-12 h-12 rounded-lg flex items-center justify-center"
            :class="getMetricaIconBg(index)"
          >
            <UIcon 
              :name="metrica.icono || 'i-heroicons-chart-bar'" 
              class="h-6 w-6"
              :class="getMetricaIconColor(index)"
            />
          </div>
        </div>
        
        <div class="flex items-center text-sm" v-if="metrica.variacion !== undefined">
          <div 
            class="flex items-center px-2 py-1 rounded-md mr-2"
            :class="metrica.variacion >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'"
          >
            <UIcon 
              :name="metrica.variacion >= 0 ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'" 
              class="h-3 w-3 mr-1" 
            />
            <span class="font-semibold">{{ metrica.variacion > 0 ? '+' : '' }}{{ metrica.variacion }}%</span>
          </div>
          <span class="text-gray-400">vs período anterior</span>
        </div>
        
        <p v-if="metrica.descripcion" class="text-xs text-gray-400 mt-2">
          {{ metrica.descripcion }}
        </p>
      </div>
    </div>

    <!-- KPIs de Rendimiento -->
    <div v-if="metricasRendimiento && metricasRendimiento.length > 0" class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
        <h3 class="text-lg font-bold text-white flex items-center">
          <UIcon name="i-heroicons-adjustments-horizontal" class="w-5 h-5 mr-2 text-emerald-400" />
          KPIs de Rendimiento
        </h3>
        <p class="text-sm text-gray-400 mt-1">{{ metricasRendimiento.length }} indicadores de rendimiento</p>
      </div>
      
      <div class="p-6">
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="(kpi, index) in metricasRendimiento" 
            :key="kpi.id"
            class="bg-gray-800/50 border border-gray-700/50 p-4 rounded-lg hover:bg-gray-800/70 transition-colors duration-200"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="font-medium text-white">{{ kpi.titulo }}</h4>
                <p class="text-xs text-gray-400 mt-1">{{ kpi.descripcion }}</p>
              </div>
              <div 
                class="w-8 h-8 rounded-lg flex items-center justify-center"
                :class="getKpiIconBg(index)"
              >
                <UIcon 
                  :name="kpi.icono" 
                  class="w-4 h-4"
                  :class="getKpiIconColor(index)"
                />
              </div>
            </div>
            
            <div class="text-xl font-bold text-white mb-3">{{ formatValue(kpi.valor, kpi.formatoValor) }}</div>
            
            <!-- Barra de progreso con colores dinámicos -->
            <div class="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                class="h-2 rounded-full transition-all duration-300"
                :class="getKpiProgressColor(index)"
                :style="{ width: `${kpi.progreso || 0}%` }"
              ></div>
            </div>
            
            <div class="flex justify-between text-xs">
              <span class="text-gray-400">Meta: {{ formatValue(kpi.meta, kpi.formatoValor) }}</span>
              <span 
                class="font-medium"
                :class="getKpiTextColor(index)"
              >
                {{ kpi.progreso || 0 }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Métricas de participación e impacto -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Participación -->
      <div v-if="metricasParticipacion && metricasParticipacion.length > 0" class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-user-group" class="w-5 h-5 mr-2 text-blue-400" />
            Participación y Retención
          </h3>
          <p class="text-sm text-gray-400 mt-1">{{ metricasParticipacion.length }} métricas de participación</p>
        </div>
        
        <div class="p-6">
          <div class="space-y-4">
            <div 
              v-for="(metrica, index) in metricasParticipacion" 
              :key="metrica.id"
              class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200"
            >
              <div class="flex items-center">
                <div 
                  class="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  :class="getParticipacionIconBg(index)"
                >
                  <UIcon 
                    :name="metrica.icono" 
                    class="w-5 h-5"
                    :class="getParticipacionIconColor(index)"
                  />
                </div>
                <div>
                  <div class="font-medium text-white">{{ metrica.titulo }}</div>
                  <p class="text-xs text-gray-400">{{ metrica.descripcion }}</p>
                </div>
              </div>
              <div 
                class="text-lg font-bold"
                :class="getParticipacionTextColor(index)"
              >
                {{ formatValue(metrica.valor, metrica.formatoValor) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Impacto -->
      <div v-if="metricasImpacto && metricasImpacto.length > 0" class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-globe-americas" class="w-5 h-5 mr-2 text-purple-400" />
            Impacto y Resultados
          </h3>
          <p class="text-sm text-gray-400 mt-1">{{ metricasImpacto.length }} métricas de impacto</p>
        </div>
        
        <div class="p-6">
          <div class="space-y-4">
            <div 
              v-for="(metrica, index) in metricasImpacto" 
              :key="metrica.id"
              class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200"
            >
              <div class="flex items-center">
                <div 
                  class="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  :class="getImpactoIconBg(index)"
                >
                  <UIcon 
                    :name="metrica.icono" 
                    class="w-5 h-5"
                    :class="getImpactoIconColor(index)"
                  />
                </div>
                <div>
                  <div class="font-medium text-white">{{ metrica.titulo }}</div>
                  <p class="text-xs text-gray-400">{{ metrica.descripcion }}</p>
                </div>
              </div>
              <div 
                class="text-lg font-bold"
                :class="getImpactoTextColor(index)"
              >
                {{ formatValue(metrica.valor, metrica.formatoValor) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MetricaReporte } from '~/types/reportes';

// Props
const props = defineProps<{
  metricas: MetricaReporte[];
  metricasRendimiento?: any[]; 
  metricasParticipacion?: any[]; 
  metricasImpacto?: any[]; 
}>();

// Arrays de colores para diferentes secciones
const metricaColors = [
  { hover: 'hover:border-emerald-500/50', iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-400' },
  { hover: 'hover:border-blue-500/50', iconBg: 'bg-blue-500/20', iconColor: 'text-blue-400' },
  { hover: 'hover:border-purple-500/50', iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400' },
  { hover: 'hover:border-amber-500/50', iconBg: 'bg-amber-500/20', iconColor: 'text-amber-400' },
  { hover: 'hover:border-pink-500/50', iconBg: 'bg-pink-500/20', iconColor: 'text-pink-400' },
  { hover: 'hover:border-cyan-500/50', iconBg: 'bg-cyan-500/20', iconColor: 'text-cyan-400' },
  { hover: 'hover:border-indigo-500/50', iconBg: 'bg-indigo-500/20', iconColor: 'text-indigo-400' },
  { hover: 'hover:border-teal-500/50', iconBg: 'bg-teal-500/20', iconColor: 'text-teal-400' }
];

const kpiColors = [
  { iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-400', progress: 'bg-emerald-500', text: 'text-emerald-400' },
  { iconBg: 'bg-blue-500/20', iconColor: 'text-blue-400', progress: 'bg-blue-500', text: 'text-blue-400' },
  { iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400', progress: 'bg-purple-500', text: 'text-purple-400' },
  { iconBg: 'bg-amber-500/20', iconColor: 'text-amber-400', progress: 'bg-amber-500', text: 'text-amber-400' },
  { iconBg: 'bg-pink-500/20', iconColor: 'text-pink-400', progress: 'bg-pink-500', text: 'text-pink-400' },
  { iconBg: 'bg-cyan-500/20', iconColor: 'text-cyan-400', progress: 'bg-cyan-500', text: 'text-cyan-400' }
];

const participacionColors = [
  { iconBg: 'bg-blue-500/20', iconColor: 'text-blue-400', text: 'text-blue-300' },
  { iconBg: 'bg-cyan-500/20', iconColor: 'text-cyan-400', text: 'text-cyan-300' },
  { iconBg: 'bg-indigo-500/20', iconColor: 'text-indigo-400', text: 'text-indigo-300' },
  { iconBg: 'bg-sky-500/20', iconColor: 'text-sky-400', text: 'text-sky-300' },
  { iconBg: 'bg-teal-500/20', iconColor: 'text-teal-400', text: 'text-teal-300' }
];

const impactoColors = [
  { iconBg: 'bg-purple-500/20', iconColor: 'text-purple-400', text: 'text-purple-300' },
  { iconBg: 'bg-pink-500/20', iconColor: 'text-pink-400', text: 'text-pink-300' },
  { iconBg: 'bg-violet-500/20', iconColor: 'text-violet-400', text: 'text-violet-300' },
  { iconBg: 'bg-fuchsia-500/20', iconColor: 'text-fuchsia-400', text: 'text-fuchsia-300' },
  { iconBg: 'bg-rose-500/20', iconColor: 'text-rose-400', text: 'text-rose-300' }
];

// Funciones para obtener clases de colores
const getMetricaHoverClass = (index: number) => {
  return metricaColors[index % metricaColors.length].hover;
};

const getMetricaIconBg = (index: number) => {
  return metricaColors[index % metricaColors.length].iconBg;
};

const getMetricaIconColor = (index: number) => {
  return metricaColors[index % metricaColors.length].iconColor;
};

const getKpiIconBg = (index: number) => {
  return kpiColors[index % kpiColors.length].iconBg;
};

const getKpiIconColor = (index: number) => {
  return kpiColors[index % kpiColors.length].iconColor;
};

const getKpiProgressColor = (index: number) => {
  return kpiColors[index % kpiColors.length].progress;
};

const getKpiTextColor = (index: number) => {
  return kpiColors[index % kpiColors.length].text;
};

const getParticipacionIconBg = (index: number) => {
  return participacionColors[index % participacionColors.length].iconBg;
};

const getParticipacionIconColor = (index: number) => {
  return participacionColors[index % participacionColors.length].iconColor;
};

const getParticipacionTextColor = (index: number) => {
  return participacionColors[index % participacionColors.length].text;
};

const getImpactoIconBg = (index: number) => {
  return impactoColors[index % impactoColors.length].iconBg;
};

const getImpactoIconColor = (index: number) => {
  return impactoColors[index % impactoColors.length].iconColor;
};

const getImpactoTextColor = (index: number) => {
  return impactoColors[index % impactoColors.length].text;
};

// Debug logs
console.log('ReporteMetricas - Componente inicializado correctamente');
console.log('Props recibidas:', {
  metricas: props.metricas?.length || 0,
  metricasRendimiento: props.metricasRendimiento?.length || 0,
  metricasParticipacion: props.metricasParticipacion?.length || 0,
  metricasImpacto: props.metricasImpacto?.length || 0
});

// Función simplificada para formatear valores
const formatValue = (valor: number, formato?: string): string => {
  if (!valor && valor !== 0) return '0';
  
  if (formato === 'porcentaje') {
    return `${valor.toFixed(1)}%`;
  }
  if (formato === 'horas') {
    return `${valor.toFixed(1)}h`;
  }
  if (formato === 'dinero') {
    return `$${valor.toLocaleString('es-ES')}`;
  }
  if (formato === 'decimal') {
    return valor.toFixed(1);
  }
  if (valor > 1000) {
    return valor.toLocaleString('es-ES');
  }
  return valor.toString();
};
</script>

<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>