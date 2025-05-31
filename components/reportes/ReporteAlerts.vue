<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteAlerts.vue -->
<template>
  <div class="space-y-8 overflow-visible h-auto">

    <!-- Resumen de alertas con diseño consistente -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Alertas Críticas - Rojo -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-red-500/50 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Alertas Críticas</p>
            <p class="text-3xl font-bold text-red-300 mt-2">{{ alertasCriticas }}</p>
          </div>
          <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-red-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <div class="bg-red-500/10 px-2 py-1 rounded-md mr-2">
            <span class="text-red-400 font-semibold">Requieren atención inmediata</span>
          </div>
        </div>
      </div>

      <!-- Advertencias - Ámbar -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-amber-500/50 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Advertencias</p>
            <p class="text-3xl font-bold text-amber-300 mt-2">{{ alertasAdvertencia }}</p>
          </div>
          <div class="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-exclamation-circle" class="h-6 w-6 text-amber-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <div class="bg-amber-500/10 px-2 py-1 rounded-md mr-2">
            <span class="text-amber-400 font-semibold">Monitoreo recomendado</span>
          </div>
        </div>
      </div>

      <!-- Información - Azul -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-gray-400 text-sm font-medium">Información</p>
            <p class="text-3xl font-bold text-blue-300 mt-2">{{ alertasInfo }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-information-circle" class="h-6 w-6 text-blue-400" />
          </div>
        </div>
        <div class="flex items-center text-sm">
          <div class="bg-blue-500/10 px-2 py-1 rounded-md mr-2">
            <span class="text-blue-400 font-semibold">Notificaciones generales</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de alertas con header colorido -->
    <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
      <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-red-500/10 to-amber-500/10">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center">
              <UIcon name="i-heroicons-clipboard-document-list" class="w-5 h-5 mr-2 text-red-400" />
              Alertas Activas
            </h3>
            <p class="text-sm text-gray-400 mt-1">{{ alertas.length }} alertas requieren atención</p>
          </div>
          <div class="flex items-center space-x-2">
            <UButton size="sm" variant="ghost" color="primary" icon="i-heroicons-funnel">
              Filtrar
            </UButton>
            <UButton size="sm" variant="ghost" color="gray" icon="i-heroicons-check-circle">
              Marcar todas como leídas
            </UButton>
          </div>
        </div>
      </div>

      <div class="p-6">
        <!-- Lista de alertas -->
        <div class="space-y-4">
          <div
            v-for="(alerta, index) in alertas"
            :key="alerta.id"
            class="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 hover:bg-gray-800/70 transition-colors duration-200"
            :class="getAlertaBorderClass(alerta.nivelSeveridad)"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-4 flex-1">
                <!-- Icono de alerta -->
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  :class="getAlertaIconClasses(alerta.nivelSeveridad)"
                >
                  <UIcon
                    :name="getAlertaIcon(alerta.nivelSeveridad)"
                    class="h-5 w-5"
                  />
                </div>

                <!-- Contenido de la alerta -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-3 mb-2">
                    <h4 class="text-white font-medium">{{ alerta.mensaje }}</h4>
                    <span
                      class="px-2 py-1 text-xs rounded-md flex-shrink-0"
                      :class="getAlertaBadgeClass(alerta.nivelSeveridad)"
                    >
                      {{ getAlertaTipoTexto(alerta.tipo) }}
                    </span>
                  </div>

                  <p class="text-gray-400 text-sm mb-3">{{ alerta.recomendacion }}</p>

                  <div class="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <span>Probabilidad: {{ Math.round(alerta.probabilidad * 100) }}%</span>
                    <span v-if="alerta.areaProbable">Área: {{ alerta.areaProbable }}</span>
                  </div>

                  <!-- Barra de probabilidad -->
                  <div class="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="getProbabilidadBarClass(alerta.probabilidad)"
                      :style="{ width: `${alerta.probabilidad * 100}%` }"
                    ></div>
                  </div>

                  <!-- Acciones recomendadas -->
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="accion in getAccionesRecomendadas(alerta.tipo)"
                      :key="accion.id"
                      @click="$emit('ejecutar-accion', alerta.id, accion.id)"
                      class="inline-flex items-center px-3 py-1.5 text-xs rounded-md transition-colors duration-200"
                      :class="accion.clase"
                    >
                      <UIcon :name="accion.icono" class="h-3 w-3 mr-1.5" />
                      {{ accion.texto }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Acciones de la alerta -->
              <div class="flex items-center space-x-2 flex-shrink-0 ml-4">
                <button
                  @click="$emit('marcar-leida', alerta.id)"
                  class="p-2 text-gray-400 hover:text-blue-400 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
                  title="Marcar como leída"
                >
                  <UIcon name="i-heroicons-eye" class="h-4 w-4" />
                </button>

                <button
                  @click="$emit('eliminar', alerta.id)"
                  class="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
                  title="Eliminar alerta"
                >
                  <UIcon name="i-heroicons-trash" class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-if="alertas.length === 0" class="bg-gray-900 border border-gray-700 rounded-xl p-12">
      <div class="text-center">
        <div class="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
          <UIcon name="i-heroicons-bell-slash" class="h-8 w-8 text-green-400" />
        </div>
        <h3 class="text-lg font-medium text-white mb-2">
          No hay alertas activas
        </h3>
        <p class="text-gray-400">
          ¡Excelente! No se han detectado problemas que requieran atención.
        </p>
      </div>
    </div>

    <!-- Estadísticas adicionales -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Distribución por tipo - Morado -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-chart-pie" class="w-5 h-5 mr-2 text-purple-400" />
            Distribución por Tipo de Alerta
          </h3>
          <p class="text-sm text-gray-400 mt-1">Clasificación de alertas por categoría</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(tipo, index) in tiposAlerta" :key="tipo.nombre" class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200">
              <div class="flex items-center">
                <div 
                  class="w-3 h-3 rounded-full mr-3"
                  :class="getTipoColorByIndex(index).dot"
                ></div>
                <span class="text-gray-300 font-medium">{{ tipo.nombre }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-20 h-2 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <div 
                    class="h-full transition-all duration-300 rounded-full"
                    :class="getTipoColorByIndex(index).bar"
                    :style="{ width: `${(tipo.cantidad / Math.max(...tiposAlerta.map(t => t.cantidad))) * 100}%` }"
                  ></div>
                </div>
                <span 
                  class="font-bold min-w-[2rem] text-right"
                  :class="getTipoColorByIndex(index).text"
                >
                  {{ tipo.cantidad }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tendencia de alertas - Verde -->
      <div class="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div class="p-6 border-b border-gray-700 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
          <h3 class="text-lg font-bold text-white flex items-center">
            <UIcon name="i-heroicons-chart-bar" class="w-5 h-5 mr-2 text-emerald-400" />
            Tendencia de Alertas (Últimos 7 días)
          </h3>
          <p class="text-sm text-gray-400 mt-1">Evolución diaria del número de alertas</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(dia, index) in tendenciaAlertas" :key="dia.fecha" class="flex items-center justify-between hover:bg-gray-800/50 rounded-lg px-2 py-2 transition-colors duration-200">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-emerald-500 mr-3"></div>
                <span class="text-gray-300 font-medium">{{ dia.fecha }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-20 h-2 bg-gray-700 rounded-full overflow-hidden mr-3">
                  <div 
                    class="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                    :style="{ width: `${(dia.cantidad / Math.max(...tendenciaAlertas.map(t => t.cantidad))) * 100}%` }"
                  ></div>
                </div>
                <span class="text-emerald-300 font-bold min-w-[2rem] text-right">{{ dia.cantidad }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  alertas: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["marcar-leida", "eliminar", "ejecutar-accion"]);

// Computed para contadores
const alertasCriticas = computed(
  () => props.alertas.filter((a) => a.nivelSeveridad === "critica").length
);

const alertasAdvertencia = computed(
  () => props.alertas.filter((a) => a.nivelSeveridad === "advertencia").length
);

const alertasInfo = computed(
  () => props.alertas.filter((a) => a.nivelSeveridad === "info").length
);

// Datos para estadísticas adicionales
const tiposAlerta = computed(() => {
  const tipos = {
    'desercion': { nombre: 'Deserción', cantidad: 0 },
    'retencion': { nombre: 'Retención', cantidad: 0 },
    'participacion': { nombre: 'Participación', cantidad: 0 },
    'completitud': { nombre: 'Completitud', cantidad: 0 }
  };
  
  props.alertas.forEach(alerta => {
    if (tipos[alerta.tipo]) {
      tipos[alerta.tipo].cantidad++;
    }
  });
  
  return Object.values(tipos);
});

const tendenciaAlertas = [
  { fecha: 'Lun', cantidad: 12 },
  { fecha: 'Mar', cantidad: 8 },
  { fecha: 'Mié', cantidad: 15 },
  { fecha: 'Jue', cantidad: 6 },
  { fecha: 'Vie', cantidad: 10 },
  { fecha: 'Sáb', cantidad: 4 },
  { fecha: 'Dom', cantidad: 7 }
];

// Arrays de colores
const tipoColors = [
  { dot: 'bg-purple-500', bar: 'bg-purple-500', text: 'text-purple-300' },
  { dot: 'bg-indigo-500', bar: 'bg-indigo-500', text: 'text-indigo-300' },
  { dot: 'bg-blue-500', bar: 'bg-blue-500', text: 'text-blue-300' },
  { dot: 'bg-cyan-500', bar: 'bg-cyan-500', text: 'text-cyan-300' }
];

// Funciones de utilidad originales
const getAlertaIcon = (severidad) => {
  switch (severidad) {
    case "critica":
      return "i-heroicons-exclamation-triangle";
    case "advertencia":
      return "i-heroicons-exclamation-circle";
    case "info":
      return "i-heroicons-information-circle";
    default:
      return "i-heroicons-bell";
  }
};

const getAlertaIconClasses = (severidad) => {
  switch (severidad) {
    case "critica":
      return "bg-red-500/20 text-red-400";
    case "advertencia":
      return "bg-amber-500/20 text-amber-400";
    case "info":
      return "bg-blue-500/20 text-blue-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const getAlertaBorderClass = (severidad) => {
  switch (severidad) {
    case "critica":
      return "border-l-4 border-l-red-500";
    case "advertencia":
      return "border-l-4 border-l-amber-500";
    case "info":
      return "border-l-4 border-l-blue-500";
    default:
      return "";
  }
};

const getAlertaBadgeClass = (severidad) => {
  switch (severidad) {
    case "critica":
      return "bg-red-500/20 text-red-300";
    case "advertencia":
      return "bg-amber-500/20 text-amber-300";
    case "info":
      return "bg-blue-500/20 text-blue-300";
    default:
      return "bg-gray-500/20 text-gray-300";
  }
};

const getProbabilidadBarClass = (probabilidad) => {
  if (probabilidad >= 0.8) return "bg-red-500";
  if (probabilidad >= 0.6) return "bg-amber-500";
  if (probabilidad >= 0.4) return "bg-blue-500";
  return "bg-green-500";
};

const getAlertaTipoTexto = (tipo) => {
  const tipos = {
    desercion: "Deserción",
    retencion: "Retención",
    participacion: "Participación",
    completitud: "Completitud",
  };
  return tipos[tipo] || "General";
};

const getTipoColorByIndex = (index) => {
  return tipoColors[index % tipoColors.length];
};

const getAccionesRecomendadas = (tipo) => {
  const acciones = {
    desercion: [
      {
        id: "entrevista",
        texto: "Entrevista",
        icono: "i-heroicons-user",
        clase: "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30",
      },
      {
        id: "revision",
        texto: "Revisar carga",
        icono: "i-heroicons-clipboard-document-list",
        clase: "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30",
      },
    ],
    participacion: [
      {
        id: "capacitacion",
        texto: "Capacitación",
        icono: "i-heroicons-academic-cap",
        clase: "bg-green-500/20 text-green-300 hover:bg-green-500/30",
      },
      {
        id: "evaluacion",
        texto: "Evaluación",
        icono: "i-heroicons-clipboard-document-check",
        clase: "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30",
      },
    ],
    completitud: [
      {
        id: "reasignar",
        texto: "Reasignar",
        icono: "i-heroicons-arrow-path",
        clase: "bg-orange-500/20 text-orange-300 hover:bg-orange-500/30",
      },
      {
        id: "notificar",
        texto: "Notificar",
        icono: "i-heroicons-bell",
        clase: "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30",
      },
    ],
    retencion: [
      {
        id: "recordatorio",
        texto: "Recordatorio",
        icono: "i-heroicons-bell-alert",
        clase: "bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30",
      },
      {
        id: "contactar",
        texto: "Contactar",
        icono: "i-heroicons-phone",
        clase: "bg-green-500/20 text-green-300 hover:bg-green-500/30",
      },
    ],
  };

  return (
    acciones[tipo] || [
      {
        id: "revisar",
        texto: "Revisar",
        icono: "i-heroicons-eye",
        clase: "bg-gray-500/20 text-gray-300 hover:bg-gray-500/30",
      },
    ]
  );
};
</script>

<style scoped>
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
