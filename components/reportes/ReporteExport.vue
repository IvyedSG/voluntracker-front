<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteExport.vue -->
<template>
  <div class="bg-gray-900 rounded-xl overflow-hidden">
    <!-- Header del modal -->
    <div class="flex items-center justify-between p-6 border-b border-gray-700">
      <div>
        <h3 class="text-xl font-bold text-white flex items-center">
          <UIcon name="i-heroicons-arrow-down-tray" class="h-6 w-6 mr-3 text-purple-400" />
          Exportar Reportes
        </h3>
        <p class="text-sm text-gray-400 mt-1">
          Descarga y comparte tus reportes en diferentes formatos
          <span v-if="tabActivo" class="text-purple-400 font-medium ml-1">
            (Sección: {{ getNombreTab(tabActivo) }})
          </span>
        </p>
      </div>
      
      <button 
        @click="cerrarModal"
        class="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
      >
        <UIcon name="i-heroicons-x-mark" class="h-6 w-6" />
      </button>
    </div>

    <!-- Contenido del modal -->
    <div class="p-6 max-h-[80vh] overflow-y-auto">
      <!-- Alertas de información -->
      <div v-if="tabActivo && tabActivo !== 'metricas'" class="mb-6 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
        <div class="flex items-start">
          <UIcon name="i-heroicons-information-circle" class="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 class="text-blue-300 font-medium mb-1">Exportación por sección</h4>
            <p class="text-blue-200/80 text-sm">
              Estás exportando datos específicos de la sección "{{ getNombreTab(tabActivo) }}". 
              Para incluir todas las secciones, ve a la pestaña "Métricas" antes de exportar.
            </p>
          </div>
        </div>
      </div>

      <!-- Opciones de formato -->
      <div class="mb-6">
        <h4 class="text-white font-medium mb-4 flex items-center">
          <UIcon name="i-heroicons-document" class="h-5 w-5 mr-2 text-purple-400" />
          Formato de exportación
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="opcion in opcionesExportacion" 
            :key="opcion.id"
            @click="seleccionarOpcion(opcion)"
            class="p-4 border border-gray-700 rounded-lg cursor-pointer transition-all duration-200 hover:border-purple-600 hover:bg-gray-800/50"
            :class="opcionSeleccionada?.id === opcion.id ? 'border-purple-600 bg-purple-900/20' : ''"
          >
            <div class="flex items-center">
              <div 
                class="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                :class="opcionSeleccionada?.id === opcion.id ? 'bg-purple-900/40 border border-purple-700' : 'bg-gray-700 border border-gray-600'"
              >
                <UIcon :name="opcion.icono" class="h-6 w-6" :class="opcionSeleccionada?.id === opcion.id ? 'text-purple-400' : 'text-gray-400'" />
              </div>
              <div>
                <h5 class="text-white font-medium">{{ opcion.nombre }}</h5>
                <p class="text-sm text-gray-400 mt-1">{{ getDescripcionFormato(opcion.formato) }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ getCaracteristicasFormato(opcion.formato) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Configuración de contenido -->
      <div class="mb-6">
        <h4 class="text-white font-medium mb-4 flex items-center">
          <UIcon name="i-heroicons-document-text" class="h-5 w-5 mr-2 text-purple-400" />
          Contenido a incluir
        </h4>
        
        <!-- Secciones automáticas según tab activa -->
        <div v-if="seccionesAutomaticas.length > 0" class="mb-4">
          <p class="text-sm text-gray-400 mb-2">Incluido automáticamente:</p>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="seccion in seccionesAutomaticas"
              :key="seccion"
              class="px-3 py-1 bg-purple-900/30 border border-purple-800/30 rounded-full text-xs text-purple-300"
            >
              {{ getNombreSeccion(seccion) }}
            </span>
          </div>
        </div>
        
        <!-- Secciones opcionales -->
        <div v-if="seccionesOpcionales.length > 0">
          <p class="text-sm text-gray-400 mb-3">Secciones adicionales opcionales:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label 
              v-for="seccion in seccionesOpcionales" 
              :key="seccion.id"
              class="flex items-center p-3 bg-gray-800/50 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <input 
                type="checkbox" 
                v-model="seccionesSeleccionadas" 
                :value="seccion.id"
                class="sr-only"
              />
              <div 
                class="w-5 h-5 rounded border-2 border-gray-500 mr-3 flex items-center justify-center transition-colors"
                :class="seccionesSeleccionadas.includes(seccion.id) ? 'bg-purple-600 border-purple-600' : ''"
              >
                <UIcon 
                  v-if="seccionesSeleccionadas.includes(seccion.id)"
                  name="i-heroicons-check" 
                  class="h-3 w-3 text-white" 
                />
              </div>
              <div>
                <p class="text-sm text-white font-medium">{{ seccion.nombre }}</p>
                <p class="text-xs text-gray-400">{{ seccion.descripcion }}</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Configuración de período -->
      <div class="mb-6">
        <h4 class="text-white font-medium mb-4 flex items-center">
          <UIcon name="i-heroicons-calendar" class="h-5 w-5 mr-2 text-purple-400" />
          Período de tiempo
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Fecha de inicio</label>
            <input 
              v-model="fechaInicio" 
              type="date" 
              class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-600 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Fecha de fin</label>
            <input 
              v-model="fechaFin" 
              type="date" 
              class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Opciones adicionales -->
      <div class="mb-6">
        <h4 class="text-white font-medium mb-4 flex items-center">
          <UIcon name="i-heroicons-cog-6-tooth" class="h-5 w-5 mr-2 text-purple-400" />
          Opciones adicionales
        </h4>
        <div class="space-y-3">
          <label class="flex items-center cursor-pointer group">
            <input 
              type="checkbox" 
              v-model="incluirGraficos"
              class="sr-only"
            />
            <div 
              class="w-5 h-5 rounded border-2 border-gray-500 mr-3 flex items-center justify-center transition-colors group-hover:border-purple-500"
              :class="incluirGraficos ? 'bg-purple-600 border-purple-600' : ''"
            >
              <UIcon 
                v-if="incluirGraficos"
                name="i-heroicons-check" 
                class="h-3 w-3 text-white" 
              />
            </div>
            <div>
              <span class="text-sm text-gray-300 group-hover:text-white transition-colors">Incluir gráficos y visualizaciones</span>
              <p class="text-xs text-gray-500">Agrega gráficos cuando estén disponibles (solo en PDF)</p>
            </div>
          </label>
          
          <label class="flex items-center cursor-pointer group">
            <input 
              type="checkbox" 
              v-model="incluirDatosDetallados"
              class="sr-only"
            />
            <div 
              class="w-5 h-5 rounded border-2 border-gray-500 mr-3 flex items-center justify-center transition-colors group-hover:border-purple-500"
              :class="incluirDatosDetallados ? 'bg-purple-600 border-purple-600' : ''"
            >
              <UIcon 
                v-if="incluirDatosDetallados"
                name="i-heroicons-check" 
                class="h-3 w-3 text-white" 
              />
            </div>
            <div>
              <span class="text-sm text-gray-300 group-hover:text-white transition-colors">Incluir tablas y datos detallados</span>
              <p class="text-xs text-gray-500">Exporta todos los datos numéricos disponibles</p>
            </div>
          </label>
          
          <label class="flex items-center cursor-pointer group">
            <input 
              type="checkbox" 
              v-model="incluirResumenEjecutivo"
              class="sr-only"
            />
            <div 
              class="w-5 h-5 rounded border-2 border-gray-500 mr-3 flex items-center justify-center transition-colors group-hover:border-purple-500"
              :class="incluirResumenEjecutivo ? 'bg-purple-600 border-purple-600' : ''"
            >
              <UIcon 
                v-if="incluirResumenEjecutivo"
                name="i-heroicons-check" 
                class="h-3 w-3 text-white" 
              />
            </div>
            <div>
              <span class="text-sm text-gray-300 group-hover:text-white transition-colors">Agregar resumen ejecutivo</span>
              <p class="text-xs text-gray-500">Incluye una introducción con los puntos clave</p>
            </div>
          </label>
        </div>
      </div>

      <!-- Vista previa -->
      <div v-if="opcionSeleccionada" class="mb-6 p-4 bg-gray-800/50 border border-gray-600 rounded-lg">
        <h4 class="text-white font-medium mb-3 flex items-center">
          <UIcon name="i-heroicons-eye" class="h-5 w-5 mr-2 text-blue-400" />
          Vista previa del reporte
        </h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span class="text-gray-400">Formato:</span>
            <p class="text-white font-medium">{{ opcionSeleccionada.formato.toUpperCase() }}</p>
          </div>
          <div>
            <span class="text-gray-400">Secciones:</span>
            <p class="text-white font-medium">{{ totalSecciones }}</p>
          </div>
          <div>
            <span class="text-gray-400">Período:</span>
            <p class="text-white font-medium">{{ formatearPeriodo }}</p>
          </div>
          <div>
            <span class="text-gray-400">Tamaño est.:</span>
            <p class="text-white font-medium">{{ tamañoEstimado }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer con botones -->
    <div class="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-800/30">
      <button 
        @click="previsualizarReporte"
        :disabled="!puedeExportar"
        class="px-4 py-2 text-sm border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <UIcon name="i-heroicons-eye" class="h-4 w-4 mr-2" />
        Vista previa
      </button>
      
      <div class="flex space-x-3">
        <button 
          @click="cerrarModal"
          class="px-4 py-2 text-sm text-gray-400 hover:text-gray-300 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button 
          @click="exportarReporte"
          :disabled="!puedeExportar || exportando"
          class="px-6 py-2.5 text-sm bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg flex items-center transition-colors"
        >
          <UIcon 
            :name="exportando ? 'i-heroicons-arrow-path' : 'i-heroicons-arrow-down-tray'" 
            :class="exportando ? 'animate-spin' : ''"
            class="h-4 w-4 mr-2" 
          />
          {{ exportando ? 'Exportando...' : 'Exportar Reporte' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  tabActivo: {
    type: String,
    default: 'metricas'
  },
  filtros: {
    type: Object,
    default: () => ({})
  },
  datosDisponibles: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'export']);

// Estado del componente
const exportando = ref(false);
const opcionSeleccionada = ref(null);
const seccionesSeleccionadas = ref([]);
const fechaInicio = ref('');
const fechaFin = ref('');
const incluirGraficos = ref(true);
const incluirDatosDetallados = ref(true);
const incluirResumenEjecutivo = ref(true);

// Opciones de exportación
const opcionesExportacion = [
  {
    id: 'pdf',
    nombre: 'Documento PDF',
    formato: 'pdf',
    icono: 'i-heroicons-document'
  },
  {
    id: 'excel',
    nombre: 'Hoja de Excel',
    formato: 'excel',
    icono: 'i-heroicons-table-cells'
  },
  {
    id: 'csv',
    nombre: 'Archivo CSV',
    formato: 'csv',
    icono: 'i-heroicons-document-text'
  },
  {
    id: 'sheets',
    nombre: 'Google Sheets',
    formato: 'sheets',
    icono: 'i-heroicons-cloud'
  }
];

// Computed properties
const seccionesAutomaticas = computed(() => {
  if (props.tabActivo === 'metricas') {
    return ['metricas', 'voluntarios', 'areas', 'tareas', 'alertas'];
  }
  return [props.tabActivo];
});

const seccionesOpcionales = computed(() => {
  const todasLasSecciones = [
    { id: 'voluntarios', nombre: 'Análisis de Voluntarios', descripcion: 'Estadísticas y tendencias de voluntarios' },
    { id: 'areas', nombre: 'Rendimiento por Áreas', descripcion: 'Eficiencia y distribución por áreas' },
    { id: 'tareas', nombre: 'Gestión de Tareas', descripcion: 'Estado y progreso de tareas y eventos' },
    { id: 'alertas', nombre: 'Alertas Predictivas', descripcion: 'Alertas y recomendaciones del sistema' }
  ];
  
  if (props.tabActivo === 'metricas') {
    return []; // No hay opcionales, todas están incluidas
  }
  
  return todasLasSecciones.filter(s => s.id !== props.tabActivo);
});

const totalSecciones = computed(() => {
  return seccionesAutomaticas.value.length + seccionesSeleccionadas.value.length;
});

const formatearPeriodo = computed(() => {
  if (!fechaInicio.value || !fechaFin.value) return 'No especificado';
  return `${fechaInicio.value} - ${fechaFin.value}`;
});

const tamañoEstimado = computed(() => {
  let size = totalSecciones.value * 0.3; // Base MB por sección
  
  if (incluirGraficos.value) size += 1.5;
  if (incluirDatosDetallados.value) size += 2;
  if (incluirResumenEjecutivo.value) size += 0.5;
  
  if (opcionSeleccionada.value?.formato === 'pdf') size += 1;
  
  return `~${size.toFixed(1)} MB`;
});

const puedeExportar = computed(() => {
  return opcionSeleccionada.value && totalSecciones.value > 0;
});

// Métodos
const getNombreTab = (tab) => {
  const nombres = {
    'metricas': 'Métricas Generales',
    'voluntarios': 'Voluntarios',
    'areas': 'Áreas',
    'tareas': 'Tareas',
    'alertas': 'Alertas'
  };
  return nombres[tab] || tab;
};

const getNombreSeccion = (seccion) => {
  const nombres = {
    'metricas': 'Métricas Generales',
    'voluntarios': 'Voluntarios',
    'areas': 'Áreas', 
    'tareas': 'Tareas',
    'alertas': 'Alertas'
  };
  return nombres[seccion] || seccion;
};

const seleccionarOpcion = (opcion) => {
  opcionSeleccionada.value = opcion;
};

const getDescripcionFormato = (formato) => {
  const descripciones = {
    pdf: 'Documento para imprimir y compartir',
    excel: 'Datos editables y análisis avanzado',
    csv: 'Datos tabulares compatibles',
    sheets: 'Colaboración en tiempo real'
  };
  return descripciones[formato] || '';
};

const getCaracteristicasFormato = (formato) => {
  const caracteristicas = {
    pdf: 'Mantiene formato • Ideal para reportes',
    excel: 'Fórmulas • Gráficos • Filtros',
    csv: 'Compatible con cualquier software',
    sheets: 'Compartir • Colaborar • Sincronizar'
  };
  return caracteristicas[formato] || '';
};

const cerrarModal = () => {
  emit('close');
};

const previsualizarReporte = () => {
  // Implementar lógica de previsualización
  console.log('Previsualizando reporte...', {
    formato: opcionSeleccionada.value,
    secciones: [...seccionesAutomaticas.value, ...seccionesSeleccionadas.value]
  });
};

const exportarReporte = async () => {
  if (!puedeExportar.value) return;
  
  exportando.value = true;
  
  try {
    const configuracion = {
      formato: opcionSeleccionada.value.formato,
      secciones: [...seccionesAutomaticas.value, ...seccionesSeleccionadas.value],
      fechaInicio: fechaInicio.value,
      fechaFin: fechaFin.value,
      opciones: {
        incluirGraficos: incluirGraficos.value,
        incluirDatosDetallados: incluirDatosDetallados.value,
        incluirResumenEjecutivo: incluirResumenEjecutivo.value
      },
      tabOrigen: props.tabActivo,
      datos: props.datosDisponibles
    };
    
    emit('export', configuracion);
    
  } catch (error) {
    console.error('Error al exportar reporte:', error);
  } finally {
    exportando.value = false;
  }
};

// Inicialización
onMounted(() => {
  // Establecer fechas por defecto
  const hoy = new Date();
  const mesAnterior = new Date();
  mesAnterior.setMonth(mesAnterior.getMonth() - 1);
  
  fechaFin.value = hoy.toISOString().split('T')[0];
  fechaInicio.value = mesAnterior.toISOString().split('T')[0];
  
  // Usar fechas de filtros si están disponibles
  if (props.filtros?.fechaInicio) fechaInicio.value = props.filtros.fechaInicio;
  if (props.filtros?.fechaFin) fechaFin.value = props.filtros.fechaFin;
  
  // Seleccionar PDF por defecto
  opcionSeleccionada.value = opcionesExportacion[0];
});

// Watchers
watch(() => props.filtros, (newFiltros) => {
  if (newFiltros?.fechaInicio) fechaInicio.value = newFiltros.fechaInicio;
  if (newFiltros?.fechaFin) fechaFin.value = newFiltros.fechaFin;
}, { deep: true });
</script>

<style scoped>
/* Animación de rotación para el spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Scroll personalizado */
.max-h-\[80vh\]::-webkit-scrollbar {
  width: 6px;
}

.max-h-\[80vh\]::-webkit-scrollbar-track {
  background: rgba(55, 65, 81, 0.3);
  border-radius: 3px;
}

.max-h-\[80vh\]::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 3px;
}

.max-h-\[80vh\]::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.7);
}
</style>