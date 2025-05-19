<script setup>
import { onMounted } from 'vue';
import VoluntariosTable from '~/components/voluntarios/VoluntariosTable.vue';
import VoluntariosGrid from '~/components/voluntarios/VoluntariosGrid.vue';
import VoluntariosControls from '~/components/voluntarios/VoluntariosControls.vue';
import VoluntarioDetailModal from '~/components/voluntarios/VoluntarioDetailModal.vue';
import VoluntarioEditModal from '~/components/voluntarios/VoluntarioEditModal.vue';
import VoluntarioDeleteModal from '~/components/voluntarios/VoluntarioDeleteModal.vue';
import VoluntarioAddModal from '~/components/voluntarios/VoluntarioAddModal.vue';
import { useVoluntarios } from '~/composables/useVoluntarios';


// Usar el nombre correcto del layout
definePageMeta({ layout: 'tenants' });

// Usar el composable consolidado que maneja toda la lógica
const {
  // Datos y acciones del store
  voluntarios,
  isLoading,
  error,
  fetchVoluntarios,
  agregarVoluntario,
  eliminarVoluntario,
  actualizarVoluntario,
  cambiarEstadoVoluntario,
  
  // Controles y filtros
  viewMode,
  controlsState,
  estadoOptions,
  areaOptions,
  filteredVoluntarios,
  resetFilters,
  
  // Modales
  showAddModal,
  showEditModal,
  showDetailModal,
  showDeleteModal,
  currentVoluntario,
  openAddModal,
  openEditModal,
  openDetailModal,
  openDeleteModal,
  closeAddModal,
  closeEditModal,
  closeDetailModal,
  closeDeleteModal,
  
  // Utilidades
  refreshData
} = useVoluntarios();

// Cargar datos al montar el componente
onMounted(fetchVoluntarios);

// Funciones para manejar acciones CRUD con feedback de UI
const handleDelete = async (id) => {
  const success = await eliminarVoluntario(id);
  if (success) {
    useToast().success('Voluntario eliminado correctamente');
  } else {
    useToast().error('Error al eliminar el voluntario');
  }
};

const handleAdd = async (voluntarioData) => {
  const success = await agregarVoluntario(voluntarioData);
  if (success) {
    showAddModal.value = false;
    useToast().success('Voluntario agregado correctamente');
  } else {
    useToast().error('Error al agregar el voluntario');
  }
};

const handleUpdate = async (voluntarioData) => {
  const success = await actualizarVoluntario(voluntarioData);
  if (success) {
    showEditModal.value = false;
    useToast().success('Voluntario actualizado correctamente');
  } else {
    useToast().error('Error al actualizar el voluntario');
  }
};

const toggleVoluntarioStatus = (voluntario) => {
  const nuevoEstado = voluntario.estado === 'activo' ? 'inactivo' : 'activo';
  cambiarEstadoVoluntario(voluntario.id, nuevoEstado)
    .then(success => {
      if (success) {
        useToast().success(`Estado cambiado a: ${nuevoEstado}`);
      } else {
        useToast().error('Error al cambiar el estado');
      }
    });
};
</script>

<template>
  <div class="space-y-6">
    <!-- Controles superiores: búsqueda, filtros y cambio de vista -->
    <VoluntariosControls 
      v-model="controlsState"
      :estadoOptions="estadoOptions"
      :areaOptions="areaOptions"
      @add="openAddModal"
      @reset="refreshData"
    />
    
    <!-- Indicadores de carga y error -->
    <div v-if="error" class="bg-red-900/30 border border-red-700/50 rounded-lg p-4 text-red-300">
      {{ error }}
    </div>
    
    <div v-if="isLoading" class="flex justify-center p-12">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-gray-400" />
    </div>
    
    <!-- Modo Tabla -->
    <VoluntariosTable 
      v-if="!isLoading && !error && viewMode === 'table' && filteredVoluntarios.length > 0"
      :voluntarios="filteredVoluntarios"
      @view="openDetailModal"
      @edit="openEditModal"
      @delete="openDeleteModal"
      @toggle-status="toggleVoluntarioStatus"
      @add="openAddModal"
    />
    
    <!-- Modo Grid -->
    <VoluntariosGrid
      v-if="!isLoading && !error && viewMode === 'grid' && filteredVoluntarios.length > 0"
      :voluntarios="filteredVoluntarios"
      @view="openDetailModal"
      @edit="openEditModal"
      @delete="openDeleteModal"
      @toggle-status="toggleVoluntarioStatus"
      @add="openAddModal"
    />
    
    <!-- Mensaje de no resultados -->
    <div 
      v-if="!isLoading && !error && filteredVoluntarios.length === 0" 
      class="bg-gray-800/50 border border-gray-700/50 rounded-lg p-12 text-center text-gray-400"
    >
      <UIcon name="i-heroicons-user-minus" class="h-12 w-12 mx-auto mb-4 opacity-50" />
      <p class="text-lg">No se encontraron voluntarios</p>
      <p v-if="controlsState.search || controlsState.estado !== null || controlsState.area !== null" class="text-sm mt-2">
        Prueba con otros criterios de búsqueda o elimina los filtros
      </p>
      <UButton class="mt-4" @click="openAddModal">Agregar voluntario</UButton>
    </div>
    
    <!-- Modales -->
    <VoluntarioDetailModal
      v-if="currentVoluntario"
      v-model="showDetailModal"
      :voluntario="currentVoluntario"
      @edit="openEditModal(currentVoluntario)"
    />
    
    <VoluntarioEditModal
      v-if="currentVoluntario"
      v-model="showEditModal"
      :voluntario="currentVoluntario"
      @submit="handleUpdate"
      @cancel="closeEditModal"
    />
    
    <VoluntarioDeleteModal
      v-if="currentVoluntario"
      v-model="showDeleteModal"
      :voluntario="currentVoluntario"
      @confirm="handleDelete(currentVoluntario?.id)"
      @cancel="closeDeleteModal"
    />
    
    <VoluntarioAddModal
      v-model="showAddModal"
      @submit="handleAdd"
    />
  </div>
</template>