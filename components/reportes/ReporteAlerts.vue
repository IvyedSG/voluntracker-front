<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\reportes\ReporteAlerts.vue -->
<template>
  <div class="space-y-6">
    <!-- Resumen de alertas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-800/30 rounded-xl p-6"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-red-300 text-sm font-medium">Alertas Críticas</p>
            <p class="text-2xl font-bold text-white mt-1">
              {{ alertasCriticas }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-red-900/40 border border-red-800/30 rounded-lg flex items-center justify-center"
          >
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="h-6 w-6 text-red-400"
            />
          </div>
        </div>
      </div>

      <div
        class="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-800/30 rounded-xl p-6"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-yellow-300 text-sm font-medium">Advertencias</p>
            <p class="text-2xl font-bold text-white mt-1">
              {{ alertasAdvertencia }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-yellow-900/40 border border-yellow-800/30 rounded-lg flex items-center justify-center"
          >
            <UIcon
              name="i-heroicons-exclamation-circle"
              class="h-6 w-6 text-yellow-400"
            />
          </div>
        </div>
      </div>

      <div
        class="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-800/30 rounded-xl p-6"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-300 text-sm font-medium">Información</p>
            <p class="text-2xl font-bold text-white mt-1">{{ alertasInfo }}</p>
          </div>
          <div
            class="w-12 h-12 bg-blue-900/40 border border-blue-800/30 rounded-lg flex items-center justify-center"
          >
            <UIcon
              name="i-heroicons-information-circle"
              class="h-6 w-6 text-blue-400"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de alertas -->
    <div class="space-y-4">
      <div
        v-for="alerta in alertas"
        :key="alerta.id"
        class="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/80 transition-colors"
        :class="getAlertaBorderClass(alerta.nivelSeveridad)"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-start space-x-4 flex-1">
            <!-- Icono de alerta -->
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border"
              :class="getAlertaIconClasses(alerta.nivelSeveridad)"
            >
              <UIcon
                :name="getAlertaIcon(alerta.nivelSeveridad)"
                class="h-5 w-5"
              />
            </div>

            <!-- Contenido de la alerta -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-2 mb-2">
                <span
                  class="px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide"
                  :class="getAlertaBadgeClass(alerta.nivelSeveridad)"
                >
                  {{ alerta.nivelSeveridad }}
                </span>
                <span
                  class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300"
                >
                  {{ getAlertaTipoTexto(alerta.tipo) }}
                </span>
                <span class="text-xs text-gray-400">
                  Probabilidad: {{ Math.round(alerta.probabilidad * 100) }}%
                </span>
              </div>

              <h4 class="text-base font-medium text-white mb-2">
                {{ alerta.mensaje }}
              </h4>

              <div class="text-sm text-gray-300 mb-3">
                <p class="flex items-start">
                  <UIcon
                    name="i-heroicons-light-bulb"
                    class="h-4 w-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0"
                  />
                  <span>{{ alerta.recomendacion }}</span>
                </p>
              </div>

              <div
                v-if="alerta.areaProbable"
                class="text-xs text-gray-400 mb-3"
              >
                <span class="flex items-center">
                  <UIcon name="i-heroicons-map-pin" class="h-3 w-3 mr-1" />
                  Área afectada:
                  <span class="text-gray-300 ml-1">{{
                    alerta.areaProbable
                  }}</span>
                </span>
              </div>

              <!-- Barra de probabilidad -->
              <div class="mb-4">
                <div
                  class="flex items-center justify-between text-xs text-gray-400 mb-1"
                >
                  <span>Nivel de confianza</span>
                  <span>{{ Math.round(alerta.probabilidad * 100) }}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div
                    class="h-2 rounded-full transition-all duration-300"
                    :class="getProbabilidadBarClass(alerta.probabilidad)"
                    :style="{ width: `${alerta.probabilidad * 100}%` }"
                  ></div>
                </div>
              </div>

              <!-- Acciones recomendadas -->
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="accion in getAccionesRecomendadas(alerta.tipo)"
                  :key="accion.id"
                  @click="
                    $emit('ejecutar-accion', { accionId: accion.id, alerta })
                  "
                  class="px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors"
                  :class="accion.clase"
                >
                  <UIcon :name="accion.icono" class="h-3 w-3 mr-1" />
                  {{ accion.texto }}
                </button>
              </div>
            </div>
          </div>

          <!-- Acciones de la alerta -->
          <div class="flex items-center space-x-2 flex-shrink-0 ml-4">
            <button
              @click="$emit('marcar-leida', alerta.id)"
              class="p-2 text-gray-400 hover:text-blue-400 rounded-lg hover:bg-gray-700 transition-colors"
              title="Marcar como leída"
            >
              <UIcon name="i-heroicons-eye" class="h-4 w-4" />
            </button>

            <button
              @click="$emit('eliminar', alerta.id)"
              class="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-gray-700 transition-colors"
              title="Eliminar alerta"
            >
              <UIcon name="i-heroicons-trash" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-if="alertas.length === 0" class="text-center py-12">
      <UIcon
        name="i-heroicons-bell-slash"
        class="h-16 w-16 text-gray-600 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-gray-400 mb-2">
        No hay alertas activas
      </h3>
      <p class="text-gray-500">
        ¡Excelente! No se han detectado problemas que requieran atención.
      </p>
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

// Funciones de utilidad
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
      return "bg-red-900/40 text-red-400 border-red-800/30";
    case "advertencia":
      return "bg-yellow-900/40 text-yellow-400 border-yellow-800/30";
    case "info":
      return "bg-blue-900/40 text-blue-400 border-blue-800/30";
    default:
      return "bg-gray-700 text-gray-400 border-gray-600";
  }
};

const getAlertaBorderClass = (severidad) => {
  switch (severidad) {
    case "critica":
      return "border-l-4 border-l-red-500";
    case "advertencia":
      return "border-l-4 border-l-yellow-500";
    case "info":
      return "border-l-4 border-l-blue-500";
    default:
      return "";
  }
};

const getAlertaBadgeClass = (severidad) => {
  switch (severidad) {
    case "critica":
      return "bg-red-900/40 text-red-300 border border-red-800/30";
    case "advertencia":
      return "bg-yellow-900/40 text-yellow-300 border border-yellow-800/30";
    case "info":
      return "bg-blue-900/40 text-blue-300 border border-blue-800/30";
    default:
      return "bg-gray-700 text-gray-300 border border-gray-600";
  }
};

const getProbabilidadBarClass = (probabilidad) => {
  if (probabilidad >= 0.8) return "bg-red-500";
  if (probabilidad >= 0.6) return "bg-yellow-500";
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

const getAccionesRecomendadas = (tipo) => {
  const acciones = {
    desercion: [
      {
        id: "entrevista",
        texto: "Entrevista",
        icono: "i-heroicons-user",
        clase:
          "bg-blue-900/20 text-blue-300 border-blue-800/30 hover:bg-blue-800/30",
      },
      {
        id: "revision",
        texto: "Revisar carga",
        icono: "i-heroicons-clipboard-document-list",
        clase:
          "bg-yellow-900/20 text-yellow-300 border-yellow-800/30 hover:bg-yellow-800/30",
      },
    ],
    participacion: [
      {
        id: "capacitacion",
        texto: "Capacitación",
        icono: "i-heroicons-academic-cap",
        clase:
          "bg-green-900/20 text-green-300 border-green-800/30 hover:bg-green-800/30",
      },
      {
        id: "evaluacion",
        texto: "Evaluación",
        icono: "i-heroicons-clipboard-document-check",
        clase:
          "bg-purple-900/20 text-purple-300 border-purple-800/30 hover:bg-purple-800/30",
      },
    ],
    completitud: [
      {
        id: "reasignar",
        texto: "Reasignar",
        icono: "i-heroicons-arrow-path",
        clase:
          "bg-orange-900/20 text-orange-300 border-orange-800/30 hover:bg-orange-800/30",
      },
      {
        id: "notificar",
        texto: "Notificar",
        icono: "i-heroicons-bell",
        clase:
          "bg-blue-900/20 text-blue-300 border-blue-800/30 hover:bg-blue-800/30",
      },
    ],
    retencion: [
      {
        id: "recordatorio",
        texto: "Recordatorio",
        icono: "i-heroicons-bell-alert",
        clase:
          "bg-cyan-900/20 text-cyan-300 border-cyan-800/30 hover:bg-cyan-800/30",
      },
      {
        id: "contactar",
        texto: "Contactar",
        icono: "i-heroicons-phone",
        clase:
          "bg-green-900/20 text-green-300 border-green-800/30 hover:bg-green-800/30",
      },
    ],
  };

  return (
    acciones[tipo] || [
      {
        id: "revisar",
        texto: "Revisar",
        icono: "i-heroicons-eye",
        clase: "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600",
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
