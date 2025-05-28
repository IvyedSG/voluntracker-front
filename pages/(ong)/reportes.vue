<template>
  <div class="space-y-6">
    <!-- Título y filtros rápidos -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-white">Reportes y Análisis</h1>
        <p class="text-gray-400 mt-1">Visualiza estadísticas del rendimiento organizacional</p>
      </div>

      <div class="flex items-center space-x-3">
        <!-- Filtros rápidos -->
        <div class="flex items-center space-x-2">
          <UButton
            v-for="rango in rangosPredefinidos"
            :key="rango.value"
            size="sm"
            color="primary"
            variant="ghost"
            :class="filtrosActuales.fechaInicio === rango.fechaInicio ? 'bg-purple-900/30 text-purple-300' : ''"
            @click="aplicarRango(rango)"
          >
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
        >
          {{ exportando ? 'Exportando...' : 'Exportar' }}
        </UButton>
      </div>
    </div>

    <!-- Tabs de navegación -->
    <div class="border-b border-gray-700 mb-6">
      <nav class="flex space-x-6">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="tabActivo = tab.id as typeof tabActivo.value"
          class="py-3 px-1 border-b-2 text-sm font-medium transition-colors flex items-center" 
          :class="tabActivo === tab.id 
            ? 'border-purple-500 text-purple-400' 
            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'"
        >
          <UIcon :name="tab.icon" class="h-4 w-4 mr-2" />
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Loading state -->
    <div v-if="cargando" class="flex items-center justify-center h-96">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p class="text-gray-400">Cargando datos de reportes...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-900/20 border border-red-800/30 rounded-lg p-6 mb-6">
      <div class="flex items-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-red-400 mr-3" />
        <div>
          <h3 class="text-red-400 font-medium">Error al cargar los reportes</h3>
          <p class="text-red-300/70 text-sm mt-1">{{ error }}</p>
          <button 
            @click="recargarDatos"
            class="mt-3 px-4 py-2 bg-red-800/30 hover:bg-red-700/40 text-red-300 rounded-lg text-sm"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido de las tabs -->
    <div v-else class="space-y-6">
      <!-- Tab: Métricas Generales -->
      <ReporteMetricas 
        v-if="tabActivo === 'metricas'" 
        :metricas="metricas" 
      />

      <!-- Tab: Voluntarios -->
      <ReporteVoluntarios
        v-if="tabActivo === 'voluntarios'"
        :datos="reportesStore.datosVoluntarios"
        :filtros="filtrosActuales"
      />

      <!-- Tab: Áreas -->
      <ReporteAreas
        v-if="tabActivo === 'areas'"
        :datos="reportesStore.datosAreas"
        :filtros="filtrosActuales"
      />

      <!-- Tab: Tareas -->
      <ReporteTareas
        v-if="tabActivo === 'tareas'"
        :datos="reportesStore.datosTareas"
        :filtros="filtrosActuales"
      />

      <!-- Tab: Alertas -->
      <ReporteAlerts
        v-if="tabActivo === 'alertas'"
        :alertas="alertasPrediccion"
        @marcar-leida="marcarAlertaLeida"
        @eliminar="eliminarAlerta"
        @ejecutar-accion="ejecutarAccionAlerta"
      />
    </div>

    <!-- Modal de exportación simplificado -->
    <UModal v-model="mostrarModalExport">
      <ReporteExport
        :tab-activo="tabActivo"
        :filtros="filtrosActuales"
        :datos-disponibles="{ metricas, alertasPrediccion }"
        @close="cerrarModalExport"
        @export="manejarExportacion"
      />
    </UModal>

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useReportesStore } from '~/stores/reportesStore';

definePageMeta({ layout: "tenants" });

// Store
const reportesStore = useReportesStore();
const toast = useToast();

// Estado local
const tabActivo = ref<'metricas' | 'voluntarios' | 'areas' | 'tareas' | 'alertas'>('metricas');
const mostrarModalExport = ref(false);
const exportando = ref(false);

// Computed properties del store
const cargando = computed(() => reportesStore.cargando);
const error = computed(() => reportesStore.error);
const metricas = computed(() => reportesStore.metricasActuales);
const filtrosActuales = computed(() => reportesStore.filtrosActuales);
const alertasPrediccion = computed(() => reportesStore.alertasPrediccion);

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

// Métodos
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

const manejarExportacion = async (configuracion: any) => {
  exportando.value = true;
  
  try {
    const resultado = await reportesStore.generarReporte(configuracion);
    
    if (resultado.success) {
      toast.add({
        title: 'Reporte exportado exitosamente',
        description: resultado.message ?? '',
        color: 'success'
      });
      
      setTimeout(() => {
        cerrarModalExport();
      }, 1000);
      
    } else {
      throw new Error(resultado.message ?? undefined);
    }
    
  } catch (err: any) {
    toast.add({
      title: 'Error en exportación',
      description: err.message ?? 'No se pudo exportar el reporte',
      color: 'error'
    });
  } finally {
    exportando.value = false;
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
</style>