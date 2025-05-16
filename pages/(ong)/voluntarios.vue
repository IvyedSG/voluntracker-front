<script setup>
import VoluntariosTable from '~/components/voluntarios/VoluntariosTable.vue';
import { useVoluntarios } from '~/composables/useVoluntarios';
import { onMounted } from 'vue'; // Falta esta importación


// Usar el nombre correcto del layout
definePageMeta({ layout: 'tenantss' });

const { voluntarios, isLoading, error, fetchVoluntarios, eliminarVoluntario } = useVoluntarios();

onMounted(fetchVoluntarios);

// Función para manejar eliminación
const handleDelete = async (id) => {
  const result = await eliminarVoluntario(id);
  if (result) {
    // Opcional: mostrar mensaje de éxito
  }
};
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold text-white mb-4">Gestión de Voluntarios</h1>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="isLoading" class="text-gray-500">Cargando voluntarios...</div>
    <div v-else>
        <VoluntariosTable :voluntarios="voluntarios" @delete="handleDelete" />
    </div>
  </div>
</template>
