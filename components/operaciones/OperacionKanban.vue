<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\operaciones\OperacionKanban.vue -->
<template>
  <div
    class="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-lg p-6 shadow-xl"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center mr-4 border border-blue-800/30"
        >
          <UIcon
            name="i-heroicons-view-columns"
            class="h-5 w-5 text-blue-400"
          />
        </div>
        <h3 class="text-lg font-semibold text-white">Vista Kanban</h3>
      </div>
      <div
        class="text-sm px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 text-blue-300 font-medium flex items-center"
      >
        <UIcon
          name="i-heroicons-clipboard-document-check"
          class="mr-2 h-4 w-4"
        />
        {{ operaciones.length }} operaciones
      </div>
    </div>

    <!-- Columnas Kanban -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Pendiente -->
      <div class="space-y-4">
        <div
          class="flex items-center justify-between bg-yellow-900/20 p-3 rounded-lg border border-yellow-800/40"
        >
          <h4 class="font-medium text-yellow-400 flex items-center">
            <UIcon name="i-heroicons-clock" class="h-4 w-4 mr-2" />
            Pendientes
          </h4>
          <UBadge
            color="yellow"
            variant="subtle"
            class="px-2 py-0.5 bg-yellow-900/30 border border-yellow-800/40"
          >
            {{ operacionesPendientes.length }}
          </UBadge>
        </div>
        <div
          class="space-y-4 min-h-[calc(100vh-320px)] rounded-lg p-3 bg-gradient-to-b from-yellow-950/10 to-transparent border border-yellow-900/10 overflow-y-auto"
          style="max-height: calc(100vh - 320px)"
        >
          <OperacionCard
            v-for="operacion in operacionesPendientes"
            :key="operacion.id"
            :operacion="operacion"
            @detail="$emit('detail', $event)"
            @edit="$emit('edit', $event)"
            @delete="$emit('delete', $event)"
            @progress="$emit('progress', $event)"
            @change-status="$emit('change-status', $event.id, $event.estado)"
          />
          <div
            v-if="operacionesPendientes.length === 0"
            class="flex flex-col items-center justify-center py-10 opacity-80"
          >
            <UIcon
              name="i-heroicons-inbox"
              class="h-10 w-10 text-yellow-800/40 mb-3"
            />
            <p class="text-sm text-yellow-800/60">
              No hay operaciones pendientes
            </p>
          </div>
        </div>
      </div>

      <!-- En Progreso -->
      <div class="space-y-4">
        <div
          class="flex items-center justify-between bg-blue-900/20 p-3 rounded-lg border border-blue-800/40"
        >
          <h4 class="font-medium text-blue-400 flex items-center">
            <UIcon name="i-heroicons-play" class="h-4 w-4 mr-2" />
            En Progreso
          </h4>
          <UBadge
            color="blue"
            variant="subtle"
            class="px-2 py-0.5 bg-blue-900/30 border border-blue-800/40"
          >
            {{ operacionesEnProgreso.length }}
          </UBadge>
        </div>
        <div
          class="space-y-4 min-h-[calc(100vh-320px)] rounded-lg p-3 bg-gradient-to-b from-blue-950/10 to-transparent border border-blue-900/10 overflow-y-auto"
          style="max-height: calc(100vh - 320px)"
        >
          <OperacionCard
            v-for="operacion in operacionesEnProgreso"
            :key="operacion.id"
            :operacion="operacion"
            @detail="$emit('detail', $event)"
            @edit="$emit('edit', $event)"
            @delete="$emit('delete', $event)"
            @progress="$emit('progress', $event)"
            @change-status="$emit('change-status', $event.id, $event.estado)"
          />
          <div
            v-if="operacionesEnProgreso.length === 0"
            class="flex flex-col items-center justify-center py-10 opacity-80"
          >
            <UIcon
              name="i-heroicons-inbox"
              class="h-10 w-10 text-blue-800/40 mb-3"
            />
            <p class="text-sm text-blue-800/60">
              No hay operaciones en progreso
            </p>
          </div>
        </div>
      </div>

      <!-- Completadas -->
      <div class="space-y-4">
        <div
          class="flex items-center justify-between bg-green-900/20 p-3 rounded-lg border border-green-800/40"
        >
          <h4 class="font-medium text-green-400 flex items-center">
            <UIcon name="i-heroicons-check-circle" class="h-4 w-4 mr-2" />
            Completadas
          </h4>
          <UBadge
            color="green"
            variant="subtle"
            class="px-2 py-0.5 bg-green-900/30 border border-green-800/40"
          >
            {{ operacionesCompletadas.length }}
          </UBadge>
        </div>
        <div
          class="space-y-4 min-h-[calc(100vh-320px)] rounded-lg p-3 bg-gradient-to-b from-green-950/10 to-transparent border border-green-900/10 overflow-y-auto"
          style="max-height: calc(100vh - 320px)"
        >
          <OperacionCard
            v-for="operacion in operacionesCompletadas"
            :key="operacion.id"
            :operacion="operacion"
            @detail="$emit('detail', $event)"
            @edit="$emit('edit', $event)"
            @delete="$emit('delete', $event)"
            @progress="$emit('progress', $event)"
            @change-status="$emit('change-status', $event.id, $event.estado)"
          />
          <div
            v-if="operacionesCompletadas.length === 0"
            class="flex flex-col items-center justify-center py-10 opacity-80"
          >
            <UIcon
              name="i-heroicons-inbox"
              class="h-10 w-10 text-green-800/40 mb-3"
            />
            <p class="text-sm text-green-800/60">
              No hay operaciones completadas
            </p>
          </div>
        </div>
      </div>

      <!-- Canceladas -->
      <div class="space-y-4">
        <div
          class="flex items-center justify-between bg-red-900/20 p-3 rounded-lg border border-red-800/40"
        >
          <h4 class="font-medium text-red-400 flex items-center">
            <UIcon name="i-heroicons-x-circle" class="h-4 w-4 mr-2" />
            Canceladas
          </h4>
          <UBadge
            color="red"
            variant="subtle"
            class="px-2 py-0.5 bg-red-900/30 border border-red-800/40"
          >
            {{ operacionesCanceladas.length }}
          </UBadge>
        </div>
        <div
          class="space-y-4 min-h-[calc(100vh-320px)] rounded-lg p-3 bg-gradient-to-b from-red-950/10 to-transparent border border-red-900/10 overflow-y-auto"
          style="max-height: calc(100vh - 320px)"
        >
          <OperacionCard
            v-for="operacion in operacionesCanceladas"
            :key="operacion.id"
            :operacion="operacion"
            @detail="$emit('detail', $event)"
            @edit="$emit('edit', $event)"
            @delete="$emit('delete', $event)"
            @progress="$emit('progress', $event)"
            @change-status="$emit('change-status', $event.id, $event.estado)"
          />
          <div
            v-if="operacionesCanceladas.length === 0"
            class="flex flex-col items-center justify-center py-10 opacity-80"
          >
            <UIcon
              name="i-heroicons-inbox"
              class="h-10 w-10 text-red-800/40 mb-3"
            />
            <p class="text-sm text-red-800/60">No hay operaciones canceladas</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import OperacionCard from "./OperacionCard.vue";

const props = defineProps({
  operaciones: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "detail",
  "edit",
  "delete",
  "progress",
  "change-status",
]);

// Operaciones agrupadas por estado
const operacionesPendientes = computed(() =>
  props.operaciones.filter((op) => op.estado === "pendiente")
);

const operacionesEnProgreso = computed(() =>
  props.operaciones.filter((op) => op.estado === "en_progreso")
);

const operacionesCompletadas = computed(() =>
  props.operaciones.filter((op) => op.estado === "completada")
);

const operacionesCanceladas = computed(() =>
  props.operaciones.filter((op) => op.estado === "cancelada")
);
</script>

<style scoped>
/* Personalizar el scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.2);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.7);
}

/* Efecto para las columnas */
.space-y-4 {
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.space-y-4:hover {
  transform: translateY(-2px);
}

/* Animación para tarjetas vacías */
@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
}

.opacity-80 {
  animation: pulse 2s ease-in-out infinite;
}
</style>
