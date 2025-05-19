<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\pages\(ong)\coordinadores.vue -->
<script setup>
import { onMounted } from "vue";
import CoordinadorTable from "~/components/coordinadores/CoordinadorTable.vue";
import CoordinadorGrid from "~/components/coordinadores/CoordinadorGrid.vue";
import CoordinadorControls from "~/components/coordinadores/CoordinadorControls.vue";
import CoordinadorDetailModal from "~/components/coordinadores/CoordinadorDetailModal.vue";
import CoordinadorEditModal from "~/components/coordinadores/CoordinadorEditModal.vue";
import CoordinadorDeleteModal from "~/components/coordinadores/CoordinadorDeleteModal.vue";
import CoordinadorAddModal from "~/components/coordinadores/CoordinadorAddModal.vue";
import CoordinadorInviteModal from "~/components/coordinadores/CoordinadorInviteModal.vue";
import { useCoordinadores } from "~/composables/useCoordinadores";

// Usar el nombre correcto del layout
definePageMeta({ layout: "tenants" });

// Usar el composable consolidado que maneja toda la lógica
const {
  // Datos y acciones del store
  coordinadores: _coordinadores, // Renombrado con _ para evitar advertencias de no uso
  isLoading,
  error,
  fetchCoordinadores,
  agregarCoordinador,
  eliminarCoordinador,
  actualizarCoordinador,
  cambiarEstadoCoordinador,
  reenviarInvitacion,

  // Controles y filtros
  viewMode,
  controlsState,
  estadoOptions,
  rolOptions,
  filteredCoordinadores,
  resetFilters,

  // Modales
  showAddModal,
  showEditModal,
  showDetailModal,
  showDeleteModal,
  showInviteModal,
  currentCoordinador,
  openAddModal,
  openEditModal,
  openDetailModal,
  openDeleteModal,
  openInviteModal,
  closeAddModal,
  closeEditModal,
  closeDetailModal,
  closeDeleteModal,
  closeInviteModal,

  // Utilidades
  refreshData,
} = useCoordinadores();

// Cargar datos al montar el componente
onMounted(fetchCoordinadores);

// Funciones para manejar acciones CRUD con feedback de UI
const handleDelete = async (id) => {
  const success = await eliminarCoordinador(id);
  if (success) {
    $toast?.success("Coordinador eliminado correctamente");
    closeDeleteModal();
  } else {
    $toast?.error("Error al eliminar el coordinador");
  }
};

const handleAdd = async (data) => {
  const success = await agregarCoordinador(data);
  if (success) {
    $toast?.success("Coordinador agregado correctamente");
    closeAddModal();
  } else {
    $toast?.error("Error al agregar el coordinador");
  }
};

const handleUpdate = async (data) => {
  const success = await actualizarCoordinador(data);
  if (success) {
    $toast?.success("Coordinador actualizado correctamente");
    closeEditModal();
  } else {
    $toast?.error("Error al actualizar el coordinador");
  }
};

const toggleCoordinadorStatus = (coordinador) => {
  // Ciclo entre estados: activo -> inactivo -> pendiente -> activo
  let nuevoEstado;
  if (coordinador.estado === "activo") {
    nuevoEstado = "inactivo";
  } else if (coordinador.estado === "inactivo") {
    nuevoEstado = "pendiente";
  } else {
    nuevoEstado = "activo";
  }

  cambiarEstadoCoordinador(coordinador.id, nuevoEstado).then((success) => {
    if (success) {
      $toast?.success(`Estado cambiado a: ${nuevoEstado}`);
    } else {
      $toast?.error("Error al cambiar el estado");
    }
  });
};

const handleReenviarInvitacion = async (id) => {
  const success = await reenviarInvitacion(id);
  if (success) {
    $toast?.success("Invitación enviada correctamente");
    closeInviteModal();
  } else {
    $toast?.error("Error al enviar la invitación");
  }
};

</script>

<template>
  <div class="space-y-6">
    <!-- Controles superiores: búsqueda, filtros y cambio de vista -->
    <CoordinadorControls
      v-model="controlsState"
      :estadoOptions="estadoOptions"
      :rolOptions="rolOptions"
      @add="openAddModal"
      @reset="refreshData"
    />

    <!-- Indicadores de carga y error -->
    <div
      v-if="error"
      class="bg-red-900/30 border border-red-700/50 rounded-lg p-4 text-red-300"
    >
      {{ error }}
    </div>

    <div v-if="isLoading" class="flex justify-center p-12">
      <UIcon
        name="i-heroicons-arrow-path"
        class="animate-spin h-8 w-8 text-gray-400"
      />
    </div>

    <!-- Modo Tabla -->
    <CoordinadorTable
      v-if="
        !isLoading &&
        !error &&
        viewMode === 'table' &&
        filteredCoordinadores.length > 0
      "
      :coordinadores="filteredCoordinadores"
      @view="openDetailModal"
      @edit="openEditModal"
      @delete="openDeleteModal"
      @invite="openInviteModal"
      @toggle-status="toggleCoordinadorStatus"
      @add="openAddModal"
    />

    <!-- Modo Grid -->
    <CoordinadorGrid
      v-if="
        !isLoading &&
        !error &&
        viewMode === 'grid' &&
        filteredCoordinadores.length > 0
      "
      :coordinadores="filteredCoordinadores"
      @view="openDetailModal"
      @edit="openEditModal"
      @delete="openDeleteModal"
      @invite="openInviteModal"
      @toggle-status="toggleCoordinadorStatus"
      @add="openAddModal"
    />

    <!-- Mensaje de no resultados -->
    <div
      v-if="!isLoading && !error && filteredCoordinadores.length === 0"
      class="bg-gray-800/50 border border-gray-700/50 rounded-lg p-12 text-center text-gray-400"
    >
      <UIcon
        name="i-heroicons-user-minus"
        class="h-12 w-12 mx-auto mb-4 opacity-50"
      />
      <p class="text-lg">No se encontraron coordinadores</p>
      <p
        v-if="
          controlsState.search ||
          controlsState.estado !== null ||
          controlsState.rol !== null
        "
        class="text-sm mt-2"
      >
        Prueba con otros criterios de búsqueda o elimina los filtros
      </p>
      <UButton class="mt-4" @click="openAddModal">Agregar coordinador</UButton>
    </div>

    <!-- Modales -->
    <CoordinadorDetailModal
      v-if="currentCoordinador"
      v-model="showDetailModal"
      :coordinador="currentCoordinador"
      @edit="openEditModal(currentCoordinador)"
      @invite="openInviteModal(currentCoordinador)"
    />

    <CoordinadorEditModal
      v-if="currentCoordinador"
      v-model="showEditModal"
      :coordinador="currentCoordinador"
      @submit="handleUpdate"
      @cancel="closeEditModal"
    />

    <CoordinadorDeleteModal
      v-if="currentCoordinador"
      v-model="showDeleteModal"
      :coordinador="currentCoordinador"
      @confirm="handleDelete(currentCoordinador?.id)"
      @cancel="closeDeleteModal"
    />

    <CoordinadorAddModal
        v-if="currentCoordinador"
        v-model="showAddModal"
        @submit="handleAdd"
        @cancel="closeAddModal"
        />

    <CoordinadorInviteModal
      v-if="currentCoordinador"
      v-model="showInviteModal"
      :coordinador="currentCoordinador"
      @confirm="handleReenviarInvitacion(currentCoordinador?.id)"
      @cancel="closeInviteModal"
    />
  </div>
</template>
