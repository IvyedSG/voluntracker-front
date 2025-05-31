<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteAreas.vue -->
<template>
  <div class="space-y-8 overflow-visible h-auto">

    <!-- Resumen de áreas con colores dinámicos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(area, index) in datos.areas"
        :key="area.id"
        class="bg-gray-900 border border-gray-700 rounded-xl p-6 transition-colors duration-200"
        :class="getAreaHoverClass(index)"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 
              class="text-lg font-semibold"
              :class="getAreaTitleColor(index)"
            >
              {{ area.nombre }}
            </h3>
            <p class="text-sm text-gray-400">{{ area.voluntarios }} voluntarios activos</p>
          </div>
          <div 
            class="w-12 h-12 rounded-lg flex items-center justify-center"
            :class="getAreaIconBg(index)"
          >
            <UIcon 
              name="i-heroicons-squares-2x2" 
              class="h-6 w-6"
              :class="getAreaIconColor(index)"
            />
          </div>
        </div>

        <div class="space-y-3">
          <!-- Horas registradas -->
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Horas registradas</span>
            <span 
              class="font-medium"
              :class="getAreaAccentColor(index)"
            >
              {{ area.horasRegistradas }}h
            </span>
          </div>

          <!-- Actividades completadas -->
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Actividades completadas</span>
            <span 
              class="font-medium"
              :class="getAreaAccentColor(index)"
            >
              {{ area.actividadesCompletadas }}
            </span>
          </div>

          <!-- Eficiencia -->
          <div class="flex justify-between items-center">
            <span class="text-gray-400 text-sm">Eficiencia</span>
            <div class="flex items-center">
              <span 
                class="font-medium mr-2"
                :class="getAreaAccentColor(index)"
              >
                {{ area.eficiencia }}%
              </span>
              <UIcon 
                :name="getTendenciaIcon(area.tendencia)" 
                :class="getTendenciaClass(area.tendencia)"
                class="h-4 w-4"
              />
            </div>
          </div>

          <!-- Barra de progreso de eficiencia con colores dinámicos -->
          <div class="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              class="h-2 rounded-full transition-all duration-300"
              :class="getAreaProgressColor(index)"
              :style="{ width: `${area.eficiencia}%` }"
            ></div>
          </div>
        </div>

        <!-- Acciones rápidas -->
        <div class="mt-4 pt-4 border-t border-gray-700 flex space-x-2">
          <button 
            class="flex-1 px-3 py-2 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors duration-200"
            :class="getAreaButtonHover(index)"
          >
            Ver detalles
          </button>
          <button 
            class="px-3 py-2 text-xs text-gray-400 rounded-lg transition-colors duration-200"
            :class="getAreaIconHover(index)"
          >
            <UIcon name="i-heroicons-chart-bar" class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  
    <!-- Tabla comparativa con header colorido -->
    <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center">
              <UIcon name="i-heroicons-table-cells" class="w-5 h-5 mr-2 text-purple-400" />
              Comparativa de Áreas
            </h3>
            <p class="text-sm text-gray-400 mt-1">Análisis detallado del rendimiento por área</p>
          </div>
          <UButton size="sm" variant="ghost" color="primary" icon="i-heroicons-funnel">
            Filtrar
          </UButton>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-800/50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Área</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Voluntarios</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Horas</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Actividades</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Eficiencia</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Tendencia</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-300 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr 
              v-for="(area, index) in datos.areas" 
              :key="area.id" 
              class="hover:bg-gray-800/50 transition-colors duration-200"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div 
                    class="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                    :class="getAreaIconBg(index)"
                  >
                    <UIcon 
                      name="i-heroicons-squares-2x2" 
                      class="h-5 w-5"
                      :class="getAreaIconColor(index)"
                    />
                  </div>
                  <div>
                    <span class="text-sm font-semibold text-white">{{ area.nombre }}</span>
                    <p class="text-xs text-gray-400">ID: {{ area.id }}</p>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span 
                  class="text-sm font-medium"
                  :class="getTableAccentColor(index)"
                >
                  {{ area.voluntarios }}
                </span>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span 
                  class="text-sm"
                  :class="getTableAccentColor(index)"
                >
                  {{ area.horasRegistradas }}h
                </span>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span 
                  class="text-sm"
                  :class="getTableAccentColor(index)"
                >
                  {{ area.actividadesCompletadas }}
                </span>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center">
                  <div class="w-16 bg-gray-700 rounded-full h-2 mr-2">
                    <div 
                      class="h-2 rounded-full transition-all duration-300"
                      :class="getAreaProgressColor(index)"
                      :style="{ width: `${area.eficiencia}%` }"
                    ></div>
                  </div>
                  <span 
                    class="text-xs"
                    :class="getTableAccentColor(index)"
                  >
                    {{ area.eficiencia }}%
                  </span>
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap text-center">
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
              
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center space-x-2">
                  <button class="p-1 text-gray-400 hover:text-blue-400 rounded transition-colors duration-200">
                    <UIcon name="i-heroicons-eye" class="h-4 w-4" />
                  </button>
                  <button class="p-1 text-gray-400 hover:text-green-400 rounded transition-colors duration-200">
                    <UIcon name="i-heroicons-chart-bar" class="h-4 w-4" />
                  </button>
                  <button class="p-1 text-gray-400 hover:text-purple-400 rounded transition-colors duration-200">
                    <UIcon name="i-heroicons-cog-6-tooth" class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Análisis adicional con headers coloridos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Distribución de voluntarios - Azul -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-user-group" class="w-5 h-5 mr-2 text-blue-400" />
            Distribución de Voluntarios por Área
          </h3>
          <p class="text-sm text-gray-400 mt-1">Cantidad de voluntarios asignados a cada área</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(area, index) in datos.areas" :key="area.id" class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200">
              <div class="flex items-center">
                <div 
                  class="w-3 h-3 rounded-full mr-3"
                  :class="getDistribucionDotColor(index)"
                ></div>
                <span class="text-gray-300 font-medium">{{ area.nombre }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-20 h-2 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <div 
                    class="h-full transition-all duration-300 rounded-full"
                    :class="getDistribucionBarColor(index)"
                    :style="{ 
                      width: `${(area.voluntarios / Math.max(...datos.areas.map(a => a.voluntarios))) * 100}%`
                    }"
                  ></div>
                </div>
                <span 
                  class="font-bold min-w-[2rem] text-right"
                  :class="getDistribucionTextColor(index)"
                >
                  {{ area.voluntarios }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Ranking de eficiencia - Ámbar -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-amber-500/10 to-yellow-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-trophy" class="w-5 h-5 mr-2 text-amber-400" />
            Ranking de Eficiencia
          </h3>
          <p class="text-sm text-gray-400 mt-1">Áreas ordenadas por porcentaje de eficiencia</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(area, index) in areasOrdenadas" :key="area.id" class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200">
              <div class="flex items-center">
                <div class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3" 
                     :class="getRankingClass(index)">
                  {{ index + 1 }}
                </div>
                <span class="text-gray-300 font-medium">{{ area.nombre }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-20 h-2 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <div 
                    class="h-full transition-all duration-300 rounded-full"
                    :class="getRankingBarColor(index)"
                    :style="{ width: `${area.eficiencia}%` }"
                  ></div>
                </div>
                <span 
                  class="font-bold min-w-[3rem] text-right"
                  :class="getRankingTextColor(index)"
                >
                  {{ area.eficiencia }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

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

// Arrays de colores para diferentes secciones
const areaColors = [
  {
    hover: 'hover:border-emerald-500/50',
    title: 'text-emerald-300',
    accent: 'text-emerald-300',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    progress: 'bg-emerald-500',
    buttonHover: 'hover:bg-emerald-500/10',
    iconHover: 'hover:text-emerald-400'
  },
  {
    hover: 'hover:border-blue-500/50',
    title: 'text-blue-300',
    accent: 'text-blue-300',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    progress: 'bg-blue-500',
    buttonHover: 'hover:bg-blue-500/10',
    iconHover: 'hover:text-blue-400'
  },
  {
    hover: 'hover:border-purple-500/50',
    title: 'text-purple-300',
    accent: 'text-purple-300',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
    progress: 'bg-purple-500',
    buttonHover: 'hover:bg-purple-500/10',
    iconHover: 'hover:text-purple-400'
  },
  {
    hover: 'hover:border-amber-500/50',
    title: 'text-amber-300',
    accent: 'text-amber-300',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    progress: 'bg-amber-500',
    buttonHover: 'hover:bg-amber-500/10',
    iconHover: 'hover:text-amber-400'
  },
  {
    hover: 'hover:border-pink-500/50',
    title: 'text-pink-300',
    accent: 'text-pink-300',
    iconBg: 'bg-pink-500/20',
    iconColor: 'text-pink-400',
    progress: 'bg-pink-500',
    buttonHover: 'hover:bg-pink-500/10',
    iconHover: 'hover:text-pink-400'
  },
  {
    hover: 'hover:border-cyan-500/50',
    title: 'text-cyan-300',
    accent: 'text-cyan-300',
    iconBg: 'bg-cyan-500/20',
    iconColor: 'text-cyan-400',
    progress: 'bg-cyan-500',
    buttonHover: 'hover:bg-cyan-500/10',
    iconHover: 'hover:text-cyan-400'
  }
];

const distribucionColors = [
  { dot: 'bg-blue-500', bar: 'bg-blue-500', text: 'text-blue-300' },
  { dot: 'bg-cyan-500', bar: 'bg-cyan-500', text: 'text-cyan-300' },
  { dot: 'bg-indigo-500', bar: 'bg-indigo-500', text: 'text-indigo-300' },
  { dot: 'bg-sky-500', bar: 'bg-sky-500', text: 'text-sky-300' },
  { dot: 'bg-teal-500', bar: 'bg-teal-500', text: 'text-teal-300' }
];

const rankingColors = [
  { bar: 'bg-yellow-500', text: 'text-yellow-300' },
  { bar: 'bg-amber-500', text: 'text-amber-300' },
  { bar: 'bg-orange-500', text: 'text-orange-300' },
  { bar: 'bg-red-500', text: 'text-red-300' },
  { bar: 'bg-pink-500', text: 'text-pink-300' }
];

// Datos computados
const areasOrdenadas = computed(() => {
  return [...props.datos.areas].sort((a, b) => b.eficiencia - a.eficiencia);
});

// Funciones para obtener clases de colores de áreas
const getAreaHoverClass = (index) => areaColors[index % areaColors.length].hover;
const getAreaTitleColor = (index) => areaColors[index % areaColors.length].title;
const getAreaAccentColor = (index) => areaColors[index % areaColors.length].accent;
const getAreaIconBg = (index) => areaColors[index % areaColors.length].iconBg;
const getAreaIconColor = (index) => areaColors[index % areaColors.length].iconColor;
const getAreaProgressColor = (index) => areaColors[index % areaColors.length].progress;
const getAreaButtonHover = (index) => areaColors[index % areaColors.length].buttonHover;
const getAreaIconHover = (index) => areaColors[index % areaColors.length].iconHover;

// Funciones para tabla
const getTableAccentColor = (index) => areaColors[index % areaColors.length].accent;

// Funciones para distribución
const getDistribucionDotColor = (index) => distribucionColors[index % distribucionColors.length].dot;
const getDistribucionBarColor = (index) => distribucionColors[index % distribucionColors.length].bar;
const getDistribucionTextColor = (index) => distribucionColors[index % distribucionColors.length].text;

// Funciones para ranking
const getRankingBarColor = (index) => rankingColors[index % rankingColors.length].bar;
const getRankingTextColor = (index) => rankingColors[index % rankingColors.length].text;

// Funciones de utilidad originales
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

const getRankingClass = (index) => {
  switch (index) {
    case 0:
      return 'bg-yellow-500/20 text-yellow-400'; // Oro
    case 1:
      return 'bg-gray-400/20 text-gray-300'; // Plata
    case 2:
      return 'bg-amber-600/20 text-amber-500'; // Bronce
    default:
      return 'bg-gray-600/20 text-gray-400';
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