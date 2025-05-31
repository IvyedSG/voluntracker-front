<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionControls.vue -->
<template>
  <div
    class="bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900 backdrop-blur-lg rounded-xl p-6 mb-8 shadow-lg border border-gray-800"
  >
    <div class="flex flex-wrap items-center justify-between gap-4">
      <!-- Título y botones principales -->
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900/50 to-purple-900/30 border border-blue-800/30 flex items-center justify-center shadow-md mr-4"
        >
          <UIcon
            name="i-heroicons-clipboard-document-list"
            class="h-5 w-5 text-blue-400"
          />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-white">Operaciones</h2>
          <p class="text-sm text-gray-400">
            Gestiona todas tus operaciones y tareas
          </p>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <!-- Botones de vista -->
        <div
          class="bg-gray-800/80 border border-gray-700 rounded-lg p-1 flex items-center"
        >
          <button
            @click="controlsState.viewMode = 'tabla'"
            class="flex items-center px-3 py-1.5 rounded-md text-sm"
            :class="
              controlsState.viewMode === 'tabla'
                ? 'bg-blue-900/70 text-blue-300 border border-blue-800'
                : 'text-gray-400 hover:text-gray-300'
            "
          >
            <UIcon name="i-heroicons-table-cells" class="h-4 w-4 mr-2" />
            Tabla
          </button>
          <button
            @click="controlsState.viewMode = 'kanban'"
            class="flex items-center px-3 py-1.5 rounded-md text-sm"
            :class="
              controlsState.viewMode === 'kanban'
                ? 'bg-blue-900/70 text-blue-300 border border-blue-800'
                : 'text-gray-400 hover:text-gray-300'
            "
          >
            <UIcon name="i-heroicons-view-columns" class="h-4 w-4 mr-2" />
            Kanban
          </button>
          <button
            @click="controlsState.viewMode = 'calendario'"
            class="flex items-center px-3 py-1.5 rounded-md text-sm"
            :class="
              controlsState.viewMode === 'calendario'
                ? 'bg-blue-900/70 text-blue-300 border border-blue-800'
                : 'text-gray-400 hover:text-gray-300'
            "
          >
            <UIcon name="i-heroicons-calendar" class="h-4 w-4 mr-2" />
            Calendario
          </button>
        </div>

        <!-- Botón de nueva operación -->
        <UButton @click="$emit('add')" color="green" class="group">
          <div class="flex items-center">
            <div
              class="w-5 h-5 rounded-full bg-green-900/50 border border-green-800/30 flex items-center justify-center mr-2 group-hover:bg-green-800/50 transition-colors"
            >
              <UIcon
                name="i-heroicons-plus"
                class="h-3 w-3 text-green-400 group-hover:text-green-300 transition-colors"
              />
            </div>
            <span>Nueva Operación</span>
          </div>
        </UButton>
      </div>
    </div>

    <!-- Buscador y filtros básicos -->
    <div class="mt-6 flex flex-wrap gap-4">
      <!-- Buscador -->
      <div class="w-full md:w-1/3 lg:flex-1">
        <div class="relative">
          <UIcon
            name="i-heroicons-magnifying-glass"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
          />
          <input
            v-model="controlsState.filtros.busqueda"
            type="text"
            placeholder="Buscar operaciones..."
            class="w-full bg-gray-800/70 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 focus:outline-none transition-all"
          />
          <button
            v-if="controlsState.filtros.busqueda"
            @click="controlsState.filtros.busqueda = ''"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <UIcon name="i-heroicons-x-mark" class="h-4 w-4" />
          </button>
        </div>
      </div>

      <!-- Filtros rápidos -->
      <div class="flex flex-wrap gap-2">
        <!-- Aquí deberían estar tus filtros, pero los sustituimos por botones para evitar USelect -->
        <button
          class="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-sm flex items-center text-gray-300"
        >
          <UIcon name="i-heroicons-funnel" class="h-4 w-4 mr-2 text-gray-400" />
          Estado
        </button>

        <button
          class="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-sm flex items-center text-gray-300"
        >
          <UIcon name="i-heroicons-tag" class="h-4 w-4 mr-2 text-gray-400" />
          Tipo
        </button>

        <button
          class="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-sm flex items-center text-gray-300"
        >
          <UIcon name="i-heroicons-flag" class="h-4 w-4 mr-2 text-gray-400" />
          Prioridad
        </button>
      </div>

      <!-- Acciones adicionales -->
      <div class="flex ml-auto space-x-2">
        <UButton
          color="gray"
          variant="ghost"
          @click="$emit('refresh')"
          class="flex items-center"
        >
          <UIcon name="i-heroicons-arrow-path" class="h-4 w-4 mr-1" />
          Actualizar
        </UButton>

        <button
          class="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-sm flex items-center text-gray-300"
        >
          <UIcon
            name="i-heroicons-adjustments-horizontal"
            class="h-4 w-4 mr-2 text-gray-400"
          />
          Filtros
        </button>
      </div>
    </div>

    <!-- Indicadores activos -->
    <div
      v-if="hayFiltrosActivos"
      class="mt-4 flex flex-wrap items-center gap-2"
    >
      <span class="text-xs text-gray-400">Filtros activos:</span>

      <div
        v-if="controlsState.filtros.estado?.length"
        class="bg-blue-900/20 border border-blue-900/30 rounded-full px-2.5 py-1 flex items-center text-xs text-blue-300"
      >
        <span>Estado: {{ controlsState.filtros.estado.join(", ") }}</span>
        <button @click="controlsState.filtros.estado = []" class="ml-2">
          <UIcon name="i-heroicons-x-mark" class="h-3 w-3" />
        </button>
      </div>

      <div
        v-if="controlsState.filtros.tipo?.length"
        class="bg-purple-900/20 border border-purple-900/30 rounded-full px-2.5 py-1 flex items-center text-xs text-purple-300"
      >
        <span>Tipo: {{ controlsState.filtros.tipo.join(", ") }}</span>
        <button @click="controlsState.filtros.tipo = []" class="ml-2">
          <UIcon name="i-heroicons-x-mark" class="h-3 w-3" />
        </button>
      </div>

      <div
        v-if="controlsState.filtros.soloVencidas"
        class="bg-red-900/20 border border-red-900/30 rounded-full px-2.5 py-1 flex items-center text-xs text-red-300"
      >
        <span>Solo vencidas</span>
        <button
          @click="controlsState.filtros.soloVencidas = false"
          class="ml-2"
        >
          <UIcon name="i-heroicons-x-mark" class="h-3 w-3" />
        </button>
      </div>

      <button
        @click="limpiarFiltros"
        class="ml-auto text-xs text-blue-400 hover:text-blue-300"
      >
        Limpiar todos
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  controlsState: {
    type: Object,
    required: true,
  },
  tipoOptions: Array,
  estadoOptions: Array,
  prioridadOptions: Array,
  areaOptions: Array,
  stats: Object,
  totalOperaciones: Number,
  isLoading: Boolean,
});

const emit = defineEmits(["add", "refresh"]);

// Comprobar si hay filtros activos
const hayFiltrosActivos = computed(() => {
  const { filtros } = props.controlsState;
  return (
    filtros.busqueda ||
    (filtros.estado && filtros.estado.length > 0) ||
    (filtros.tipo && filtros.tipo.length > 0) ||
    (filtros.prioridad && filtros.prioridad.length > 0) ||
    (filtros.area && filtros.area.length > 0) ||
    filtros.soloVencidas ||
    filtros.soloSinAsignar
  );
});

const limpiarFiltros = () => {
  props.controlsState.filtros = {
    busqueda: "",
    tipo: [],
    estado: [],
    prioridad: [],
    area: [],
    voluntario: [],
    coordinador: [],
    soloVencidas: false,
    soloSinAsignar: false,
  };
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Efecto hover para cards */
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
