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
            color="gray"
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
          color="purple"
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
          @click="tabActivo = tab.id"
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
      <div v-if="tabActivo === 'metricas'" class="space-y-6">
        <!-- Métricas principales -->
        <div v-if="metricas && metricas.length > 0" class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
        
        <!-- Datos principales -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-lg font-semibold text-white">Participación por Áreas</h4>
                <p class="text-sm text-gray-400">Distribución de voluntarios y horas por cada área</p>
              </div>
              <button @click="recargarDatos" class="p-2 text-gray-400 hover:text-gray-300 rounded-lg">
                <UIcon name="i-heroicons-arrow-path" class="h-5 w-5" />
              </button>
            </div>
            <div class="space-y-2">
              <div v-for="(label, index) in datosParticipacionArea.labels" :key="label" class="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                <span class="text-gray-300">{{ label }}</span>
                <div class="flex space-x-4">
                  <span class="text-blue-400">{{ datosParticipacionArea.datasets[0]?.data[index] || 0 }} vol.</span>
                  <span class="text-green-400">{{ datosParticipacionArea.datasets[1]?.data[index] || 0 }}h</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-lg font-semibold text-white">Evolución de Voluntarios</h4>
                <p class="text-sm text-gray-400">Seguimiento de nuevos voluntarios, activos e inactivos</p>
              </div>
              <button @click="recargarDatos" class="p-2 text-gray-400 hover:text-gray-300 rounded-lg">
                <UIcon name="i-heroicons-arrow-path" class="h-5 w-5" />
              </button>
            </div>
            <div class="space-y-2">
              <div v-for="(label, index) in datosEvolucionVoluntarios.labels" :key="label" class="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                <span class="text-gray-300">{{ label }}</span>
                <div class="flex space-x-4">
                  <span class="text-blue-400">{{ datosEvolucionVoluntarios.datasets[0]?.data[index] || 0 }} nuevos</span>
                  <span class="text-green-400">{{ datosEvolucionVoluntarios.datasets[1]?.data[index] || 0 }} activos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="text-lg font-semibold text-white">Evolución de Tareas y Eventos</h4>
              <p class="text-sm text-gray-400">Seguimiento de tareas creadas, completadas y canceladas</p>
            </div>
            <button @click="recargarDatos" class="p-2 text-gray-400 hover:text-gray-300 rounded-lg">
              <UIcon name="i-heroicons-arrow-path" class="h-5 w-5" />
            </button>
          </div>
          <div class="space-y-2">
            <div v-for="(label, index) in datosEvolucionTareas.labels" :key="label" class="flex items-center justify-between p-2 bg-gray-700/50 rounded">
              <span class="text-gray-300">{{ label }}</span>
              <div class="flex space-x-4">
                <span class="text-blue-400">{{ datosEvolucionTareas.datasets[0]?.data[index] || 0 }} creadas</span>
                <span class="text-green-400">{{ datosEvolucionTareas.datasets[1]?.data[index] || 0 }} completadas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab: Voluntarios -->
      <div v-if="tabActivo === 'voluntarios'" class="space-y-6">
        <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Análisis de Voluntarios</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-green-400">{{ datosVoluntarios.activos }}</div>
              <div class="text-sm text-gray-400">Activos</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-red-400">{{ datosVoluntarios.inactivos }}</div>
              <div class="text-sm text-gray-400">Inactivos</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-400">{{ datosVoluntarios.nuevos }}</div>
              <div class="text-sm text-gray-400">Nuevos</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-yellow-400">{{ datosVoluntarios.desercion }}%</div>
              <div class="text-sm text-gray-400">Deserción</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab: Áreas -->
      <div v-if="tabActivo === 'areas'" class="space-y-6">
        <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Rendimiento por Áreas</h3>
          <div class="space-y-4">
            <div v-for="area in datosAreas.areas" :key="area.id" class="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div>
                <h4 class="text-white font-medium">{{ area.nombre }}</h4>
                <div class="text-sm text-gray-400">{{ area.voluntarios }} voluntarios • {{ area.horasRegistradas }}h registradas</div>
              </div>
              <div class="text-right">
                <div class="text-lg font-semibold text-white">{{ area.eficiencia }}%</div>
                <div class="text-sm" :class="area.tendencia === 'arriba' ? 'text-green-400' : area.tendencia === 'abajo' ? 'text-red-400' : 'text-gray-400'">
                  {{ area.tendencia === 'arriba' ? '↗' : area.tendencia === 'abajo' ? '↘' : '→' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab: Tareas -->
      <div v-if="tabActivo === 'tareas'" class="space-y-6">
        <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Gestión de Tareas</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-green-400">{{ datosTareas.completadas }}</div>
              <div class="text-sm text-gray-400">Completadas</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-yellow-400">{{ datosTareas.pendientes }}</div>
              <div class="text-sm text-gray-400">Pendientes</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-400">{{ datosTareas.enProgreso }}</div>
              <div class="text-sm text-gray-400">En Progreso</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-red-400">{{ datosTareas.vencidas }}</div>
              <div class="text-sm text-gray-400">Vencidas</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab: Alertas -->
      <div v-if="tabActivo === 'alertas'" class="space-y-6">
        <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Alertas Predictivas</h3>
          <div class="space-y-4">
            <div v-for="alerta in alertasPrediccion" :key="alerta.id" 
                 class="p-4 rounded-lg border"
                 :class="alerta.nivelSeveridad === 'critica' ? 'bg-red-900/20 border-red-800/30' : 
                         alerta.nivelSeveridad === 'advertencia' ? 'bg-yellow-900/20 border-yellow-800/30' : 
                         'bg-blue-900/20 border-blue-800/30'">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-medium" 
                      :class="alerta.nivelSeveridad === 'critica' ? 'text-red-300' : 
                              alerta.nivelSeveridad === 'advertencia' ? 'text-yellow-300' : 
                              'text-blue-300'">
                    {{ alerta.mensaje }}
                  </h4>
                  <p class="text-sm text-gray-400 mt-1">{{ alerta.recomendacion }}</p>
                  <div class="flex items-center mt-2 space-x-4">
                    <span class="text-xs text-gray-500">Probabilidad: {{ Math.round(alerta.probabilidad * 100) }}%</span>
                    <span v-if="alerta.areaProbable" class="text-xs text-gray-500">Área: {{ alerta.areaProbable }}</span>
                  </div>
                </div>
                <div class="flex space-x-2 ml-4">
                  <button @click="marcarAlertaLeida(alerta.id)" class="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded text-gray-300">
                    Marcar leída
                  </button>
                  <button @click="eliminarAlerta(alerta.id)" class="px-3 py-1 text-xs bg-red-700 hover:bg-red-600 rounded text-white">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de exportación simplificado -->
    <UModal v-model="mostrarModalExport">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-white mb-4">Exportar Reporte</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Formato</label>
            <select v-model="formatoExport" class="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
          <div class="flex justify-end space-x-3">
            <UButton variant="ghost" @click="cerrarModalExport">Cancelar</UButton>
            <UButton color="purple" @click="exportarReporte" :loading="exportando">Exportar</UButton>
          </div>
        </div>
      </div>
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
const formatoExport = ref('pdf');

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

// Datos transformados para las tablas
const datosParticipacionArea = computed(() => {
  const grafico = reportesStore.graficoParticipacionArea;
  if (!grafico || !grafico.series) return { datasets: [], labels: [] };
  
  return {
    datasets: grafico.series.map(serie => ({
      label: serie.nombre,
      data: serie.datos?.map(d => d.valor) || []
    })),
    labels: grafico.etiquetasX || []
  };
});

const datosEvolucionVoluntarios = computed(() => {
  const grafico = reportesStore.graficoDesercionVoluntarios;
  if (!grafico || !grafico.series) return { datasets: [], labels: [] };
  
  return {
    datasets: grafico.series.map(serie => ({
      label: serie.nombre,
      data: serie.datos?.map(d => d.valor) || []
    })),
    labels: grafico.etiquetasX || []
  };
});

const datosEvolucionTareas = computed(() => {
  const grafico = reportesStore.graficoEvolucionTareas;
  if (!grafico || !grafico.series) return { datasets: [], labels: [] };
  
  return {
    datasets: grafico.series.map(serie => ({
      label: serie.nombre,
      data: serie.datos?.map(d => d.valor) || []
    })),
    labels: grafico.etiquetasX || []
  };
});

// Datos simulados para las otras tabs
const datosVoluntarios = computed(() => ({
  activos: 127,
  inactivos: 23,
  nuevos: 15,
  desercion: 8.5,
  porGenero: {
    labels: ['Femenino', 'Masculino', 'No binario', 'Prefiero no decir'],
    data: [68, 52, 4, 3]
  },
  porEdad: {
    labels: ['18-25', '26-35', '36-45', '46-55', '56+'],
    data: [32, 45, 28, 15, 7]
  }
}));

const datosAreas = computed(() => ({
  areas: [
    { id: 'educacion', nombre: 'Educación', voluntarios: 25, horasRegistradas: 450, actividadesCompletadas: 18, eficiencia: 85.2, tendencia: 'arriba', color: '#3B82F6' },
    { id: 'salud', nombre: 'Salud', voluntarios: 32, horasRegistradas: 620, actividadesCompletadas: 22, eficiencia: 91.5, tendencia: 'arriba', color: '#10B981' },
    { id: 'medio-ambiente', nombre: 'Medio Ambiente', voluntarios: 18, horasRegistradas: 310, actividadesCompletadas: 12, eficiencia: 76.8, tendencia: 'abajo', color: '#F59E0B' },
    { id: 'derechos-humanos', nombre: 'Derechos Humanos', voluntarios: 12, horasRegistradas: 180, actividadesCompletadas: 8, eficiencia: 88.9, tendencia: 'arriba', color: '#8B5CF6' },
    { id: 'asistencia-social', nombre: 'Asistencia Social', voluntarios: 40, horasRegistradas: 896, actividadesCompletadas: 35, eficiencia: 82.1, tendencia: 'estable', color: '#EC4899' }
  ]
}));

const datosTareas = computed(() => ({
  completadas: 125,
  pendientes: 43,
  enProgreso: 28,
  vencidas: 7,
  tendencia: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    creadas: [45, 38, 52, 68, 72, 58],
    completadas: [32, 28, 45, 56, 65, 48]
  },
  porPrioridad: {
    labels: ['Alta', 'Media', 'Baja', 'Sin prioridad'],
    data: [18, 45, 32, 8]
  },
  porTipo: {
    labels: ['Eventos', 'Proyectos', 'Tareas rutinarias', 'Emergencias'],
    data: [25, 38, 35, 5]
  },
  tiempoPromedio: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    data: [4.5, 4.2, 3.8, 4.1, 3.9, 4.2]
  }
}));

// Funciones para las métricas
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
      color: 'green'
    });
  } catch (err) {
    toast.add({
      title: 'Error al actualizar',
      description: 'No se pudieron actualizar los datos',
      color: 'red'
    });
  }
};

const exportarReporte = async () => {
  exportando.value = true;
  
  try {
    const configuracion = {
      formato: formatoExport.value,
      tabActivo: tabActivo.value,
      fechaInicio: filtrosActuales.value.fechaInicio,
      fechaFin: filtrosActuales.value.fechaFin
    };

    const resultado = await reportesStore.generarReporte(configuracion);
    
    if (resultado.success) {
      toast.add({
        title: 'Reporte exportado exitosamente',
        description: resultado.message,
        color: 'green',
        timeout: 5000
      });
      
      setTimeout(() => {
        cerrarModalExport();
      }, 1000);
      
    } else {
      throw new Error(resultado.message);
    }
    
  } catch (err: any) {
    toast.add({
      title: 'Error en exportación',
      description: err.message || 'No se pudo exportar el reporte',
      color: 'red',
      timeout: 7000
    });
  } finally {
    exportando.value = false;
  }
};

const marcarAlertaLeida = (alertaId: string) => {
  toast.add({
    title: 'Alerta marcada como leída',
    description: 'La alerta ha sido marcada como leída',
    color: 'blue'
  });
};

const eliminarAlerta = (alertaId: string) => {
  toast.add({
    title: 'Alerta eliminada',
    description: 'La alerta ha sido eliminada correctamente',
    color: 'orange'
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