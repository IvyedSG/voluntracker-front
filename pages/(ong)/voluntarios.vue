<script setup>
import { ref, computed, onMounted } from 'vue';
import VoluntariosTable from '~/components/voluntarios/VoluntariosTable.vue';
import VoluntariosGrid from '~/components/voluntarios/VoluntariosGrid.vue';
import VoluntariosControls from '~/components/voluntarios/VoluntariosControls.vue';
import VoluntarioDetailModal from '~/components/voluntarios/VoluntarioDetailModal.vue';
import VoluntarioEditModal from '~/components/voluntarios/VoluntarioEditModal.vue';
import VoluntarioDeleteModal from '~/components/voluntarios/VoluntarioDeleteModal.vue';
import VoluntarioAddModal from '~/components/voluntarios/VoluntarioAddModal.vue';
import { useVoluntarios } from '~/composables/useVoluntarios';

// Usar el nombre correcto del layout
definePageMeta({ layout: 'tenantss' });

// Acceder al store de voluntarios
const { voluntarios, isLoading, error, fetchVoluntarios, agregarVoluntario, eliminarVoluntario } = useVoluntarios();

// Cargar datos al montar el componente
onMounted(fetchVoluntarios);

// Vista actual (tabla o grid)
const viewMode = ref('table');

// Estados modales
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDetailModal = ref(false);
const showDeleteModal = ref(false);
const currentVoluntario = ref(null);

// Filtros y búsqueda
const searchTerm = ref('');
const filterStatus = ref('todos');
const filterArea = ref('todas');

// Lista filtrada de voluntarios
const filteredVoluntarios = computed(() => {
  if (!voluntarios.value) return [];
  
  return voluntarios.value.filter(v => {
    // Filtrar por término de búsqueda
    const matchSearch = searchTerm.value === '' || 
      v.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      v.correo.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      v.dni.toLowerCase().includes(searchTerm.value.toLowerCase());
    
    // Filtrar por estado
    const matchStatus = filterStatus.value === 'todos' || v.estado === filterStatus.value;
    
    // Filtrar por área
    const matchArea = filterArea.value === 'todas' || v.area === filterArea.value;
    
    return matchSearch && matchStatus && matchArea;
  });
});

// Funciones para gestionar voluntarios
const openAddModal = () => {
  showAddModal.value = true;
};

const openEditModal = (voluntario) => {
  currentVoluntario.value = voluntario;
  showEditModal.value = true;
};

const openDetailModal = (voluntario) => {
  currentVoluntario.value = voluntario;
  showDetailModal.value = true;
};

const openDeleteModal = (voluntario) => {
  currentVoluntario.value = voluntario;
  showDeleteModal.value = true;
};

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
  // Implementar la funcionalidad de actualización
  showEditModal.value = false;
  useToast().success('Voluntario actualizado correctamente');
};

// Áreas y estados disponibles para filtrar
const areas = computed(() => {
  if (!voluntarios.value) return ['todas'];
  const uniqueAreas = new Set(voluntarios.value.map(v => v.area));
  return ['todas', ...Array.from(uniqueAreas)];
});

const estados = ['todos', 'activo', 'inactivo'];
</script>

<template>
  <div class="space-y-6">
    <!-- Controles superiores: búsqueda, filtros y cambio de vista -->
    <VoluntariosControls 
      v-model="controlsState"
      :estadoOptions="estadoOptions"
      :areaOptions="areaOptions"
      @add="openAddModal"
      @reset="fetchVoluntarios"
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
      v-if="!isLoading && !error && viewMode === 'table'"
      :voluntarios="filteredVoluntarios"
      @view="openDetailModal"
      @edit="openEditModal"
      @delete="openDeleteModal"
    />
    
    <!-- Modo Grid -->
    <VoluntariosGrid
      v-if="!isLoading && !error && viewMode === 'grid'"
      :voluntarios="filteredVoluntarios"
      @view="openDetailModal"
      @edit="openEditModal"
      @delete="openDeleteModal"
    />
    
    <!-- Mensaje de no resultados -->
    <div 
      v-if="!isLoading && !error && filteredVoluntarios.length === 0" 
      class="bg-gray-800/50 border border-gray-700/50 rounded-lg p-12 text-center text-gray-400"
    >
      <UIcon name="i-heroicons-user-slash" class="h-12 w-12 mx-auto mb-4 opacity-50" />
      <p class="text-lg">No se encontraron voluntarios</p>
      <p v-if="searchTerm || filterStatus !== 'todos' || filterArea !== 'todas'" class="text-sm mt-2">
        Prueba con otros criterios de búsqueda o elimina los filtros
      </p>
      <UButton class="mt-4" @click="openAddModal">Agregar voluntario</UButton>
    </div>
    
    <!-- Modales -->
    <VoluntarioDetailModal
      v-model="showDetailModal"
      :voluntario="currentVoluntario"
      @edit="openEditModal(currentVoluntario)"
    />
    
    <VoluntarioEditModal
      v-model="showEditModal"
      :voluntario="currentVoluntario"
      @submit="handleUpdate"
    />
    
    <VoluntarioDeleteModal
      v-model="showDeleteModal"
      :voluntario="currentVoluntario"
      @confirm="handleDelete(currentVoluntario?.id)"
    />
    
    <VoluntarioAddModal
      v-model="showAddModal"
      @submit="handleAdd"
    />
  </div>
</template>