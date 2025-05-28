<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteChart.vue -->
<template>
  <div class="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
    <!-- Header del componente -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-base font-semibold text-white">{{ titulo }}</h3>
        <p class="text-xs text-gray-400 mt-0.5">{{ descripcion }}</p>
      </div>
      
      <button 
        @click="$emit('refresh')"
        class="p-1.5 text-gray-400 hover:text-purple-400 rounded-md hover:bg-gray-700 transition-colors"
        title="Actualizar datos"
      >
        <UIcon name="i-heroicons-arrow-path" class="h-4 w-4" />
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="cargando" class="flex items-center justify-center h-64">
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
        <p class="text-sm text-gray-400">Cargando datos...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="flex items-center justify-center h-64">
      <div class="text-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="h-8 w-8 text-red-400 mx-auto mb-2" />
        <p class="text-sm text-red-400">Error al cargar los datos</p>
        <button 
          @click="$emit('refresh')"
          class="mt-2 text-xs text-purple-400 hover:text-purple-300"
        >
          Reintentar
        </button>
      </div>
    </div>

    <!-- Datos en formato tabla/lista -->
    <div v-else class="space-y-4">
      <!-- Tabla de datos detallados -->
      <div v-if="datosTabla.length > 0" class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-600">
              <th class="text-left py-2 px-3 text-gray-300 font-medium">Período</th>
              <th 
                v-for="dataset in datos.datasets" 
                :key="dataset.label"
                class="text-left py-2 px-3 text-gray-300 font-medium"
              >
                {{ dataset.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(label, index) in datos.labels" 
              :key="index"
              class="border-b border-gray-700/50 hover:bg-gray-700/20"
            >
              <td class="py-2 px-3 text-gray-300 font-medium">{{ label }}</td>
              <td 
                v-for="dataset in datos.datasets" 
                :key="dataset.label"
                class="py-2 px-3 text-gray-300"
              >
                {{ formatValue(dataset.data[index] || 0) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Vista de lista alternativa -->
      <div v-else-if="datosLista.length > 0" class="space-y-2">
        <div 
          v-for="(item, index) in datosLista" 
          :key="index"
          class="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg"
        >
          <span class="text-gray-300">{{ item.label }}</span>
          <span class="text-white font-medium">{{ formatValue(item.value) }}</span>
        </div>
      </div>

      <!-- Resumen si no hay datos estructurados -->
      <div v-else class="text-center py-8">
        <UIcon name="i-heroicons-chart-bar-square" class="h-12 w-12 text-gray-600 mx-auto mb-2" />
        <p class="text-gray-400">No hay datos disponibles para mostrar</p>
      </div>
    </div>

    <!-- Footer con información adicional -->
    <div v-if="mostrarFooter" class="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
      <span>{{ fechaActualizacion }}</span>
      <span>{{ totalDataPoints }} registros</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  titulo: string;
  descripcion?: string;
  datos: any;
  tipo: 'line' | 'bar' | 'doughnut' | 'pie' | 'area' | 'table' | 'list';
  cargando?: boolean;
  error?: string;
  mostrarFooter?: boolean;
}>();

const emit = defineEmits<{
  'refresh': [];
}>();

const datosTabla = computed(() => {
  if (!props.datos || !props.datos.datasets || !props.datos.labels) return [];
  return props.datos.labels;
});

const datosLista = computed(() => {
  if (props.tipo !== 'list' || !props.datos) return [];
  
  if (props.datos.labels && props.datos.data) {
    return props.datos.labels.map((label: string, index: number) => ({
      label,
      value: props.datos.data[index]
    }));
  }
  
  return [];
});

const totalDataPoints = computed(() => {
  if (datosTabla.value.length > 0) return datosTabla.value.length;
  if (datosLista.value.length > 0) return datosLista.value.length;
  return 0;
});

const fechaActualizacion = computed(() => {
  return `Actualizado: ${new Date().toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })}`;
});

const formatValue = (value: any): string => {
  if (typeof value === 'number') {
    if (value > 1000) {
      return value.toLocaleString('es-ES');
    }
    return value.toString();
  }
  return String(value);
};
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>