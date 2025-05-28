<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\pages\(ong)\operaciones.vue -->
<script setup>
import { onMounted, ref } from "vue";
import OperacionControls from "~/components/operaciones/OperacionControls.vue";
import OperacionStats from "~/components/operaciones/OperacionStats.vue";
import OperacionTable from "~/components/operaciones/OperacionTable.vue";
import OperacionKanban from "~/components/operaciones/OperacionKanban.vue";
import OperacionAddModal from "~/components/operaciones/OperacionAddModal.vue";
import OperacionDetailModal from "~/components/operaciones/OperacionDetailModal.vue";
import OperacionEditModal from "~/components/operaciones/OperacionEditModal.vue";
import OperacionCalendar from "~/components/operaciones/OperacionCalendar.vue";
import OperacionDeleteModal from "~/components/operaciones/OperacionDeleteModal.vue";
import OperacionProgressModal from "~/components/operaciones/OperacionProgressModal.vue";

import { useOperaciones } from "~/composables/useOperaciones";

// Layout
definePageMeta({ layout: "tenants" });

// Título de la página
useHead({
  title: "Operaciones - Voluntracker",
});

// Usar el composable consolidado
const {
  // Datos y acciones del store
  operaciones,
  operacionActual,
  isLoading,
  error,
  operacionesFiltradas,
  stats,
  operacionesVencidas,
  fetchOperaciones,
  crearOperacion,
  actualizarOperacion,
  eliminarOperacion,
  cambiarEstado,
  actualizarProgreso,
  agregarComentario,

  // Controles y filtros
  controlsState,
  tipoOptions,
  estadoOptions,
  prioridadOptions,
  areaOptions,

  // Modales
  showAddModal,
  showEditModal,
  showDetailModal,
  showDeleteModal,
  showProgressModal,
  currentOperacion,
  openAddModal,
  openEditModal,
  openDetailModal,
  openDeleteModal,
  openProgressModal,
  closeAddModal,
  closeEditModal,
  closeDetailModal,
  closeDeleteModal,
  closeProgressModal,

  // Utilidades
  refreshData,
} = useOperaciones();

// Opciones para voluntarios (deberían venir de un store de voluntarios)

// Handlers para los modales
const handleAddOperacion = async (formData) => {
  try {
    const success = await crearOperacion(formData);
    if (success) {
      closeAddModal();
      // Mostrar notificación de éxito
      console.log("Operación creada exitosamente");
    }
  } catch (error) {
    console.error("Error al crear operación:", error);
  }
};

const handleEditOperacion = async (formData) => {
  try {
    if (currentOperacion.value?.id) {
      const success = await actualizarOperacion(
        currentOperacion.value.id,
        formData
      );
      if (success) {
        closeEditModal();
        console.log("Operación actualizada exitosamente");
      }
    }
  } catch (error) {
    console.error("Error al actualizar operación:", error);
  }
};

const handleDeleteOperacion = async () => {
  try {
    if (currentOperacion.value?.id) {
      const success = await eliminarOperacion(currentOperacion.value.id);
      if (success) {
        closeDeleteModal();
        console.log("Operación eliminada exitosamente");
      }
    }
  } catch (error) {
    console.error("Error al eliminar operación:", error);
  }
};

const handleUpdateProgress = async ({ progreso, horasReales }) => {
  try {
    if (currentOperacion.value?.id) {
      const success = await actualizarProgreso(
        currentOperacion.value.id,
        progreso,
        horasReales
      );
      if (success) {
        closeProgressModal();
        console.log("Progreso actualizado exitosamente");
      }
    }
  } catch (error) {
    console.error("Error al actualizar progreso:", error);
  }
};

const handleChangeStatus = async (id, nuevoEstado) => {
  try {
    const success = await cambiarEstado(id, nuevoEstado);
    if (success) {
      console.log("Estado cambiado exitosamente");
    }
  } catch (error) {
    console.error("Error al cambiar estado:", error);
  }
};

// Cargar datos al montar el componente
onMounted(async () => {
  await fetchOperaciones();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Estadísticas generales -->
    <OperacionStats
      :stats="stats"
      :operaciones-vencidas="operacionesVencidas"
    />

    <!-- Controles de filtros y búsqueda -->
    <OperacionControls
      v-model:controlsState="controlsState"
      :tipo-options="tipoOptions"
      :estado-options="estadoOptions"
      :prioridad-options="prioridadOptions"
      :area-options="areaOptions"
      :stats="stats"
      :total-operaciones="operaciones.length"
      :is-loading="isLoading"
      @add="openAddModal"
      @refresh="refreshData"
    />

    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="flex items-center space-x-3">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"
        ></div>
        <span class="text-gray-400">Cargando operaciones...</span>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-400 mb-4">{{ error }}</div>
      <UButton @click="fetchOperaciones" color="green" variant="outline">
        Reintentar
      </UButton>
    </div>

    <!-- Contenido principal -->
    <div v-else>
      <!-- Vista de tabla -->
      <OperacionTable
        v-if="controlsState.viewMode === 'tabla'"
        :operaciones="operacionesFiltradas"
        @detail="openDetailModal"
        @edit="openEditModal"
        @delete="openDeleteModal"
        @progress="openProgressModal"
        @change-status="handleChangeStatus"
      />

      <!-- Vista de kanban -->
      <OperacionKanban
        v-else-if="controlsState.viewMode === 'kanban'"
        :operaciones="operacionesFiltradas"
        @detail="openDetailModal"
        @edit="openEditModal"
        @delete="openDeleteModal"
        @progress="openProgressModal"
        @change-status="handleChangeStatus"
      />

      <!-- Vista de calendario -->
      <OperacionCalendar
        v-else
        :operaciones="operacionesFiltradas"
        @detail="openDetailModal"
        @edit="openEditModal"
        @add="openAddModal"
      />

      <!-- Estado vacío -->
      <div v-if="operacionesFiltradas.length === 0" class="text-center py-12">
        <UIcon
          name="i-heroicons-clipboard-document-check"
          class="h-16 w-16 text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-medium text-gray-300 mb-2">
          No hay operaciones
        </h3>
        <p class="text-gray-500 mb-6">
          No se encontraron operaciones que coincidan con los filtros aplicados.
        </p>
        <UButton @click="openAddModal" color="green">
          Crear primera operación
        </UButton>
      </div>
    </div>

    <!-- Modales -->
    <OperacionAddModal
      :model-value="showAddModal"
      @submit="handleAddOperacion"
      @cancel="closeAddModal"
    />

    <OperacionEditModal
      :model-value="showEditModal"
      :operacion="currentOperacion"
      @submit="handleEditOperacion"
      @cancel="closeEditModal"
    />

    <OperacionDetailModal
      :model-value="showDetailModal"
      :operacion="currentOperacion"
      @close="closeDetailModal"
      @edit="
        (operacion) => {
          closeDetailModal();
          openEditModal(operacion);
        }
      "
      @delete="
        (operacion) => {
          closeDetailModal();
          openDeleteModal(operacion);
        }
      "
      @progress="
        (operacion) => {
          closeDetailModal();
          openProgressModal(operacion);
        }
      "
      @add-comment="agregarComentario"
    />

    <OperacionDeleteModal
      :model-value="showDeleteModal"
      :operacion="currentOperacion"
      @confirm="handleDeleteOperacion"
      @cancel="closeDeleteModal"
    />

    <OperacionProgressModal
      :model-value="showProgressModal"
      :operacion="currentOperacion"
      @submit="handleUpdateProgress"
      @cancel="closeProgressModal"
    />
  </div>
</template>
