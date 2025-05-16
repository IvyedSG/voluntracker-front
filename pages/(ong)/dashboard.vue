<script setup lang="ts">
import { computed } from 'vue';
import DashboardStats from '~/components/dashboard/DashboardStats.vue';
import VolunteerGrowthTable from '~/components/dashboard/VolunteerGrowthTable.vue';
import AreaDistributionList from '~/components/dashboard/AreaDistributionList.vue';
import PredictiveAnalysisCard from '~/components/dashboard/PredictiveAnalysisCard.vue';
import AlertsPanel from '~/components/dashboard/AlertsPanel.vue';
import KpiStatsList from '~/components/dashboard/KpiStatsList.vue';

import { useDashboard } from '~/composables/useDashboard';

definePageMeta({
  layout: 'tenantss',
});

const { stats, alerts, fetchDashboardData, isLoading, error } = useDashboard();

// Verificar que las propiedades existan antes de pasar a los componentes
const hasKpiData = computed(() => 
  typeof stats.value.retencion === 'number' && 
  typeof stats.value.asistencia === 'number'
);

onMounted(async () => {
  await fetchDashboardData();
});
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold text-white mb-6">Dashboard</h1>

    <div v-if="error" class="text-red-500 p-4 bg-red-900/20 rounded-lg">
      {{ error }}
    </div>
    <div v-else-if="isLoading" class="text-gray-500 p-4 flex justify-center">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin mr-2" />
      Cargando datos...
    </div>
    <div v-else class="space-y-6">
      <!-- Métricas principales -->
      <DashboardStats :stats="stats" />

      <!-- Grid de componentes de 2 columnas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- KPIs de participación -->
        <KpiStatsList 
          v-if="hasKpiData"
          :retencion="stats.retencion" 
          :asistencia="stats.asistencia" 
        />

        <!-- Predicciones -->
        <PredictiveAnalysisCard :prediction="stats.prediction" />
      </div>

      <!-- Segunda fila de componentes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Distribución por áreas -->
        <AreaDistributionList :distribution="stats.areaDistribution" />
        
        <!-- Alertas -->
        <AlertsPanel :alerts="alerts" />
      </div>

      <!-- Tabla de crecimiento -->
      <VolunteerGrowthTable :history="stats.volunteerHistory" />
    </div>
  </div>
</template>