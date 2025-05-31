<template>
  <div class="space-y-6">
    <!-- Header principal con gradiente -->
    <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div class="p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex-1 min-w-0">
            <h1 class="text-2xl font-bold text-white flex items-center">
              <UIcon name="i-heroicons-chart-bar-square" class="w-7 h-7 mr-3 text-purple-400" />
              Reportes y Análisis
            </h1>
            <p class="text-gray-400 mt-1">Visualiza estadísticas del rendimiento organizacional</p>
          </div>

          <div class="flex items-center space-x-3">
            <!-- Filtros rápidos con colores -->
            <div class="flex items-center space-x-2">
              <UButton
                v-for="(rango, index) in rangosPredefinidos"
                :key="rango.value"
                size="sm"
                variant="ghost"
                :class="getFiltroButtonClass(rango, index)"
                @click="aplicarRango(rango)"
              >
                <UIcon :name="getFiltroIcon(index)" class="w-4 h-4 mr-1.5" />
                {{ rango.label }}
              </UButton>
            </div>
            
            <!-- Botón de exportar mejorado -->
            <UButton 
              @click="abrirModalExport"
              color="primary"
              size="sm"
              icon="i-heroicons-arrow-down-tray"
              :loading="exportando"
              class="bg-green-600 hover:bg-green-700 border-green-500"
            >
              {{ exportando ? 'Exportando...' : 'Exportar' }}
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs de navegación mejorados -->
    <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div class="border-b border-gray-700">
        <nav class="flex">
          <button 
            v-for="(tab, index) in tabs" 
            :key="tab.id"
            @click="tabActivo = tab.id"
            class="relative py-4 px-6 text-sm font-medium transition-all duration-200 flex items-center group" 
            :class="getTabClass(tab.id, index)"
          >
            <UIcon 
              :name="tab.icon" 
              class="h-4 w-4 mr-2 transition-colors duration-200" 
              :class="getTabIconClass(tab.id, index)"
            />
            {{ tab.label }}
            
            <!-- Indicador activo -->
            <div 
              v-if="tabActivo === tab.id"
              class="absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-200"
              :class="getTabIndicatorClass(index)"
            ></div>
          </button>
        </nav>
      </div>
    </div>

    <!-- Loading state mejorado -->
    <div v-if="cargando" class="bg-gray-900 border border-gray-700 rounded-xl p-12">
      <div class="text-center">
        <div class="relative mx-auto mb-6 w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-gray-700"></div>
          <div class="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
        </div>
        <h3 class="text-lg font-medium text-white mb-2">Cargando datos de reportes</h3>
        <p class="text-gray-400">Procesando información del sistema...</p>
        <div class="mt-4 flex justify-center">
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error state mejorado -->
    <div v-else-if="error" class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div class="p-6 bg-gradient-to-r from-red-500/10 to-pink-500/10 border-b border-gray-700">
        <div class="flex items-start">
          <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-red-400" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-white mb-1">Error al cargar los reportes</h3>
            <p class="text-red-300/80 text-sm mb-4">{{ error }}</p>
            <button 
              @click="recargarDatos"
              class="inline-flex items-center px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              <UIcon name="i-heroicons-arrow-path" class="h-4 w-4 mr-2" />
              Reintentar carga
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido de las tabs con transiciones -->
    <div v-else class="space-y-6">
      <Transition name="tab-content" mode="out-in">
        <!-- Tab: Métricas Generales -->
        <div v-if="tabActivo === 'metricas'" key="metricas">
          <ReporteMetricas 
            :metricas="metricas || []"
            :metricasRendimiento="reportesStore.metricasKpi || []"
            :metricasParticipacion="reportesStore.datosParticipacion || []"
            :metricasImpacto="reportesStore.datosImpacto || []"
          />
        </div>

        <!-- Tab: Voluntarios -->
        <div v-else-if="tabActivo === 'voluntarios'" key="voluntarios">
          <ReporteVoluntarios 
            :datos="reportesStore.datosVoluntarios || {}"
            :filtros="filtrosActuales"
          />
        </div>

        <!-- Tab: Áreas -->
        <div v-else-if="tabActivo === 'areas'" key="areas">
          <ReporteAreas 
            :datos="reportesStore.datosAreas || {}"
            :filtros="filtrosActuales"
          />
        </div>

        <!-- Tab: Tareas -->
        <div v-else-if="tabActivo === 'tareas'" key="tareas">
          <ReporteTareas 
            :datos="reportesStore.datosTareas || {}"
            :filtros="filtrosActuales"
          />
        </div>

        <!-- Tab: Alertas -->
        <div v-else-if="tabActivo === 'alertas'" key="alertas">
          <ReporteAlerts 
            :alertas="alertasPrediccion || []"
            @marcar-leida="marcarAlertaLeida"
            @eliminar="eliminarAlerta"
            @ejecutar-accion="ejecutarAccionAlerta"
          />
        </div>
      </Transition>
    </div>

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useReportesStore } from '~/stores/reportesStore';

// Importaciones de componentes
import ReporteMetricas from '~/components/reportes/ReporteMetricas.vue';
import ReporteVoluntarios from '~/components/reportes/ReporteVoluntarios.vue';
import ReporteAreas from '~/components/reportes/ReporteAreas.vue';
import ReporteTareas from '~/components/reportes/ReporteTareas.vue';
import ReporteAlerts from '~/components/reportes/ReporteAlerts.vue';
import ReporteExport from '~/components/reportes/ReporteExport.vue';

definePageMeta({ layout: "tenants" });

// Store
const reportesStore = useReportesStore();
const toast = useToast();

// Estado local
const tabActivo = ref('metricas');
const mostrarModalExport = ref(false);
const exportando = ref(false);

// Computed properties del store
const cargando = computed(() => reportesStore.cargando);
const error = computed(() => reportesStore.error);
const metricas = computed(() => reportesStore.metricasActuales);
const filtrosActuales = computed(() => reportesStore.filtrosActuales);
const alertasPrediccion = computed(() => reportesStore.alertasPrediccion);

// Configuración de colores
const tabColors = [
  { 
    bg: 'bg-purple-500/10', 
    text: 'text-purple-400', 
    icon: 'text-purple-400',
    indicator: 'bg-purple-500',
    hover: 'hover:bg-purple-500/5'
  },
  { 
    bg: 'bg-blue-500/10', 
    text: 'text-blue-400', 
    icon: 'text-blue-400',
    indicator: 'bg-blue-500',
    hover: 'hover:bg-blue-500/5'
  },
  { 
    bg: 'bg-emerald-500/10', 
    text: 'text-emerald-400', 
    icon: 'text-emerald-400',
    indicator: 'bg-emerald-500',
    hover: 'hover:bg-emerald-500/5'
  },
  { 
    bg: 'bg-amber-500/10', 
    text: 'text-amber-400', 
    icon: 'text-amber-400',
    indicator: 'bg-amber-500',
    hover: 'hover:bg-amber-500/5'
  },
  { 
    bg: 'bg-red-500/10', 
    text: 'text-red-400', 
    icon: 'text-red-400',
    indicator: 'bg-red-500',
    hover: 'hover:bg-red-500/5'
  }
];

const filtroColors = [
  { 
    bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    active: 'bg-emerald-500/30 text-emerald-200 border-emerald-400',
    hover: 'hover:bg-emerald-500/25'
  },
  { 
    bg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    active: 'bg-blue-500/30 text-blue-200 border-blue-400',
    hover: 'hover:bg-blue-500/25'
  },
  { 
    bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    active: 'bg-purple-500/30 text-purple-200 border-purple-400',
    hover: 'hover:bg-purple-500/25'
  }
];

const filtroIcons = [
  'i-heroicons-calendar-days',
  'i-heroicons-calendar',
  'i-heroicons-chart-bar'
];

// Datos preparados para exportación
const datosParaExportar = computed(() => {
  return {
    metricas: reportesStore.metricasKpi || [],
    voluntarios: reportesStore.datosVoluntarios || {},
    areas: reportesStore.datosAreas || {},
    tareas: reportesStore.datosTareas || {},
    alertas: alertasPrediccion.value || [],
    participacion: reportesStore.datosParticipacion || [],
    impacto: reportesStore.datosImpacto || []
  };
});

// Rangos predefinidos
const rangosPredefinidos = [
  {
    label: "7 días",
    value: "last7days",
    fechaInicio: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    fechaFin: new Date().toISOString().split("T")[0],
  },
  {
    label: "30 días", 
    value: "lastMonth",
    fechaInicio: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    fechaFin: new Date().toISOString().split("T")[0],
  },
  {
    label: "3 meses",
    value: "last3months", 
    fechaInicio: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    fechaFin: new Date().toISOString().split("T")[0],
  }
];

// Tabs de navegación
const tabs = [
  { id: 'metricas', label: 'Métricas', icon: 'i-heroicons-chart-bar' },
  { id: 'voluntarios', label: 'Voluntarios', icon: 'i-heroicons-user-group' },
  { id: 'areas', label: 'Áreas', icon: 'i-heroicons-squares-2x2' },
  { id: 'tareas', label: 'Tareas', icon: 'i-heroicons-clipboard-document-check' },
  { id: 'alertas', label: 'Alertas', icon: 'i-heroicons-bell-alert' },
];

// Funciones de estilo
const getTabClass = (tabId: string, index: number) => {
  const colors = tabColors[index % tabColors.length];
  const isActive = tabActivo.value === tabId;
  
  if (isActive) {
    return `${colors.bg} ${colors.text} border-r border-gray-700 last:border-r-0`;
  }
  return `text-gray-400 hover:text-gray-300 ${colors.hover} border-r border-gray-700 last:border-r-0`;
};

const getTabIconClass = (tabId: string, index: number) => {
  const colors = tabColors[index % tabColors.length];
  const isActive = tabActivo.value === tabId;
  
  if (isActive) {
    return colors.icon;
  }
  return 'text-gray-500 group-hover:text-gray-400';
};

const getTabIndicatorClass = (index: number) => {
  const colors = tabColors[index % tabColors.length];
  return colors.indicator;
};

const getFiltroButtonClass = (rango: any, index: number) => {
  const colors = filtroColors[index % filtroColors.length];
  const isActive = filtrosActuales.value?.fechaInicio === rango.fechaInicio;
  
  if (isActive) {
    return `${colors.active} border`;
  }
  return `${colors.bg} border ${colors.hover} transition-colors duration-200`;
};

const getFiltroIcon = (index: number) => {
  return filtroIcons[index % filtroIcons.length];
};

// Métodos (sin cambios en la lógica, solo estilos)
const aplicarRango = (rango: any) => {
  reportesStore.actualizarFiltros({
    fechaInicio: rango.fechaInicio,
    fechaFin: rango.fechaFin
  });
};

const abrirModalExport = () => {
  mostrarModalExport.value = true;
};

const cerrarModalExport = () => {
  mostrarModalExport.value = false;
};

const procesarExportacion = async (configuracion: any) => {
  exportando.value = true;
  
  try {
    toast.add({
      title: 'Iniciando exportación',
      description: `Preparando reporte en formato ${configuracion.formato.toUpperCase()}...`,
      color: 'info'
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Configuración de exportación:', configuracion);
    
    toast.add({
      title: 'Reporte exportado',
      description: `El reporte se ha generado correctamente en formato ${configuracion.formato.toUpperCase()}`,
      color: 'success'
    });
    
    cerrarModalExport();
    
  } catch (error) {
    console.error('Error en exportación:', error);
    toast.add({
      title: 'Error en exportación',
      description: 'No se pudo generar el reporte. Inténtalo de nuevo.',
      color: 'error'
    });
  } finally {
    exportando.value = false;
  }
};

const recargarDatos = async () => {
  try {
    await reportesStore.cargarDatosReportes();
    toast.add({
      title: 'Datos actualizados',
      description: 'Los reportes se han actualizado correctamente',
      color: 'success'
    });
  } catch (err) {
    toast.add({
      title: 'Error al actualizar',
      description: 'No se pudieron actualizar los datos',
      color: 'error'
    });
  }
};

const marcarAlertaLeida = (alertaId: string) => {
  toast.add({
    title: 'Alerta marcada como leída',
    description: 'La alerta ha sido marcada como leída',
    color: 'info'
  });
};

const eliminarAlerta = (alertaId: string) => {
  toast.add({
    title: 'Alerta eliminada',
    description: 'La alerta ha sido eliminada correctamente',
    color: 'warning'
  });
};

const ejecutarAccionAlerta = (alertaId: string, accionId: string) => {
  toast.add({
    title: 'Acción ejecutada',
    description: `Se ha ejecutado la acción ${accionId} para la alerta`,
    color: 'info'
  });
};

// Inicializar datos al montar
onMounted(async () => {
  try {
    await reportesStore.cargarDatosReportes();
  } catch (err) {
    console.error('Error al cargar datos iniciales:', err);
  }
});

// SEO y meta tags
useSeoMeta({
  title: 'Reportes y Análisis - Voluntracker',
  description: 'Panel de reportes y análisis estadístico para la gestión de voluntarios y actividades',
});
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

/* Transiciones entre tabs */
.tab-content-enter-active,
.tab-content-leave-active {
  transition: all 0.3s ease;
}

.tab-content-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.tab-content-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Animación de puntos de carga */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>