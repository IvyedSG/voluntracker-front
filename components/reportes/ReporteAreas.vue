<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteAreas.vue -->
<template>
  <div class="space-y-6">
    <!-- Resumen de áreas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="area in datos.areas"
        :key="area.id"
        class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
              {{ area.nombre }}
            </h3>
            <p class="text-sm text-gray-400">{{ area.voluntarios }} voluntarios activos</p>
          </div>
          <div 
            class="w-12 h-12 rounded-lg flex items-center justify-center shadow-md border"
            :style="{ backgroundColor: area.color + '20', borderColor: area.color + '40' }"
          >
            <UIcon name="i-heroicons-squares-2x2" class="h-6 w-6" :style="{ color: area.color }" />
          </div>
        </div>

        <div class="space-y-3">
          <!-- Horas registradas -->
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Horas registradas</span>
            <span class="text-white font-medium">{{ area.horasRegistradas }}h</span>
          </div>

          <!-- Actividades completadas -->
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Actividades completadas</span>
            <span class="text-white font-medium">{{ area.actividadesCompletadas }}</span>
          </div>

          <!-- Eficiencia -->
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Eficiencia</span>
            <div class="flex items-center">
              <span class="text-white font-medium mr-2">{{ area.eficiencia }}%</span>
              <UIcon 
                :name="getTendenciaIcon(area.tendencia)" 
                :class="getTendenciaClass(area.tendencia)"
                class="h-4 w-4"
              />
            </div>
          </div>

          <!-- Barra de progreso de eficiencia -->
          <div class="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              class="h-2 rounded-full transition-all duration-300"
              :style="{ width: `${area.eficiencia}%`, backgroundColor: area.color }"
            ></div>
          </div>
        </div>

        <!-- Acciones rápidas -->
        <div class="mt-4 pt-4 border-t border-gray-700 flex space-x-2">
          <button class="flex-1 px-3 py-2 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors">
            Ver detalles
          </button>
          <button class="px-3 py-2 text-xs text-gray-400 hover:text-purple-400 rounded-lg transition-colors">
            <UIcon name="i-heroicons-chart-bar" class="h-4 w-4" />
          </button>
          </div>
        </div>
      </div>
  
      <!-- Tabla comparativa de áreas -->
      <div class="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <div class="p-4 bg-gray-800 border-b border-gray-700">
          <h3 class="text-base font-semibold text-white">Comparativa de Áreas</h3>
          <p class="text-xs text-gray-400 mt-0.5">Análisis detallado del rendimiento por área</p>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-900/50">
              <tr>
                <th class="px-4 py-3.5 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">Área</th>
                <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Voluntarios</th>
                <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Horas</th>
                <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Actividades</th>
                <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Eficiencia</th>
                <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Tendencia</th>
                <th class="px-4 py-3.5 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-800">
              <tr 
                v-for="area in datos.areas" 
                :key="area.id" 
                class="hover:bg-gray-700/20"
              >
                <td class="px-4 py-4">
                  <div class="flex items-center">
                    <div 
                      class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 border"
                      :style="{ backgroundColor: area.color + '20', borderColor: area.color + '40' }"
                    >
                      <UIcon name="i-heroicons-squares-2x2" class="h-4 w-4" :style="{ color: area.color }" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-white">{{ area.nombre }}</p>
                      <p class="text-xs text-gray-400">ID: {{ area.id }}</p>
                    </div>
                  </div>
                </td>
                
                <td class="px-4 py-4 text-center">
                  <span class="text-sm text-white font-medium">{{ area.voluntarios }}</span>
                </td>
                
                <td class="px-4 py-4 text-center">
                  <span class="text-sm text-white">{{ area.horasRegistradas }}h</span>
                </td>
                
                <td class="px-4 py-4 text-center">
                  <span class="text-sm text-white">{{ area.actividadesCompletadas }}</span>
                </td>
                
                <td class="px-4 py-4 text-center">
                  <div class="flex items-center justify-center">
                    <div class="w-16 bg-gray-700 rounded-full h-2 mr-2">
                      <div 
                        class="h-2 rounded-full transition-all duration-300"
                        :style="{ width: `${area.eficiencia}%`, backgroundColor: area.color }"
                      ></div>
                    </div>
                    <span class="text-xs text-gray-300">{{ area.eficiencia }}%</span>
                  </div>
                </td>
                
                <td class="px-4 py-4 text-center">
                  <div class="flex items-center justify-center">
                    <UIcon 
                      :name="getTendenciaIcon(area.tendencia)" 
                      :class="getTendenciaClass(area.tendencia)"
                      class="h-4 w-4 mr-1"
                    />
                    <span 
                      class="text-xs font-medium"
                      :class="getTendenciaClass(area.tendencia)"
                    >
                      {{ getTendenciaTexto(area.tendencia) }}
                    </span>
                  </div>
                </td>
                
                <td class="px-4 py-4 text-center">
                  <div class="flex items-center justify-center space-x-1">
                    <button class="p-1 text-gray-400 hover:text-blue-400 rounded transition-colors">
                      <UIcon name="i-heroicons-eye" class="h-4 w-4" />
                    </button>
                    <button class="p-1 text-gray-400 hover:text-green-400 rounded transition-colors">
                      <UIcon name="i-heroicons-chart-bar" class="h-4 w-4" />
                    </button>
                    <button class="p-1 text-gray-400 hover:text-purple-400 rounded transition-colors">
                      <UIcon name="i-heroicons-cog-6-tooth" class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Análisis adicional -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Distribución de voluntarios -->
        <ReporteChart
          titulo="Distribución de Voluntarios por Área"
          descripcion="Cantidad de voluntarios asignados a cada área"
          :datos="datosDistribucion"
          tipo="list"
          :cargando="false"
        />
        
        <!-- Ranking de eficiencia -->
        <ReporteChart
          titulo="Ranking de Eficiencia"
          descripcion="Áreas ordenadas por porcentaje de eficiencia"
          :datos="datosEficiencia"
          tipo="list"
          :cargando="false"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import ReporteChart from './ReporteChart.vue';
  
  const props = defineProps({
    datos: {
      type: Object,
      required: true
    },
    filtros: {
      type: Object,
      default: () => ({})
    }
  });
  
  // Datos para gráficos
  const datosDistribucion = computed(() => {
    return {
      labels: props.datos.areas.map(area => area.nombre),
      data: props.datos.areas.map(area => area.voluntarios)
    };
  });
  
  const datosEficiencia = computed(() => {
    const areasOrdenadas = [...props.datos.areas].sort((a, b) => b.eficiencia - a.eficiencia);
    return {
      labels: areasOrdenadas.map(area => area.nombre),
      data: areasOrdenadas.map(area => `${area.eficiencia}%`)
    };
  });
  
  // Funciones de utilidad
  const getTendenciaIcon = (tendencia) => {
    switch (tendencia) {
      case 'arriba':
        return 'i-heroicons-arrow-trending-up';
      case 'abajo':
        return 'i-heroicons-arrow-trending-down';
      case 'estable':
        return 'i-heroicons-minus';
      default:
        return 'i-heroicons-minus';
    }
  };
  
  const getTendenciaClass = (tendencia) => {
    switch (tendencia) {
      case 'arriba':
        return 'text-green-400';
      case 'abajo':
        return 'text-red-400';
      case 'estable':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };
  
  const getTendenciaTexto = (tendencia) => {
    switch (tendencia) {
      case 'arriba':
        return 'Mejorando';
      case 'abajo':
        return 'Declinando';
      case 'estable':
        return 'Estable';
      default:
        return 'Sin datos';
    }
  };
  </script>
  
  <style scoped>
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
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0);
    transition: box-shadow 0.3s ease;
  }
  
  .group:hover::after {
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
  }
  
  tr.hover\:bg-gray-700\/20:hover {
    background-color: rgba(55, 65, 81, 0.2);
  }
  
  .reporte-areas-container {
    /* Esto evitará scrolls innecesarios */
    overflow: visible !important;
    height: auto !important;
  }
  </style>