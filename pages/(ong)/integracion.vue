<template>
  <div class="space-y-6">
 

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <svg class="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-400">Cargando integraciones...</p>
      </div>
    </div>

    <!-- Grid de 2 columnas para cards más pequeñas -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CardIntegracion
        v-for="integracion in integraciones"
        :key="integracion.id"
        :integracion="integracion"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Import del componente
import CardIntegracion from '~/components/integracion/CardIntegracion.vue'

// Definir layout para usar tenants
definePageMeta({
  title: 'Conexiones Externas',
  description: 'Conecta Voluntracker con herramientas externas',
  layout: 'tenants'
})

// Usar composable
const { integraciones, loading } = useIntegraciones()

// Meta para SEO
useSeoMeta({
  title: 'Conexiones Externas - Voluntracker',
  description: 'Conecta Voluntracker con Google Sheets y Google Calendar'
})
</script>