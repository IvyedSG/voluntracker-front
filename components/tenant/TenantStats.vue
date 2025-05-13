<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Organizaciones activas -->
    <UCard
      class="bg-gradient-to-br from-emerald-800/20 to-emerald-700/10 border border-emerald-800/30 shadow-lg transform transition hover:shadow-emerald-900/20 hover:-translate-y-1"
    >
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm font-medium text-emerald-400">Organizaciones activas</div>
          <div class="text-3xl font-bold mt-1">{{ stats.activos }}</div>
          <div class="mt-2 text-xs text-emerald-300/70">
            <span class="flex items-center">
              <UIcon name="i-heroicons-arrow-trending-up" class="mr-0.5" />
              <span>+{{ stats.nuevosUltimaSemana }} nuevas esta semana</span>
            </span>
          </div>
        </div>
        <div class="bg-emerald-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
          <UIcon name="i-heroicons-building-office-2" class="h-7 w-7 text-emerald-400" />
        </div>
      </div>
      <div class="h-1 bg-emerald-500/30 mt-3 rounded-full overflow-hidden">
        <div class="h-full bg-emerald-500 rounded-full" :style="`width: ${Math.min(stats.activos / totalOrgs * 100, 100)}%`"></div>
      </div>
    </UCard>

    <!-- Voluntarios totales -->
    <UCard
      class="bg-gradient-to-br from-blue-800/20 to-blue-700/10 border border-blue-800/30 shadow-lg transform transition hover:shadow-blue-900/20 hover:-translate-y-1"
    >
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm font-medium text-blue-400">Voluntarios totales</div>
          <div class="text-3xl font-bold mt-1">{{ formatNumber(stats.totalVoluntarios) }}</div>
          <div class="mt-2 text-xs text-blue-300/70 flex items-center">
            <UIcon name="i-heroicons-user-group" class="mr-0.5" />
            <span>Promedio: {{ stats.promedioVoluntarios }} por ONG</span>
          </div>
        </div>
        <div class="bg-blue-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
          <UIcon name="i-heroicons-users" class="h-7 w-7 text-blue-400" />
        </div>
      </div>
      <div class="h-1 bg-blue-500/30 mt-3 rounded-full overflow-hidden">
        <div class="h-full bg-blue-500 rounded-full" :style="`width: ${Math.min(stats.totalVoluntarios / 1000 * 100, 100)}%`"></div>
      </div>
    </UCard>

    <!-- Planes Premium -->
    <UCard
      class="bg-gradient-to-br from-purple-800/20 to-purple-700/10 border border-purple-800/30 shadow-lg transform transition hover:shadow-purple-900/20 hover:-translate-y-1"
    >
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm font-medium text-purple-400">Planes Premium</div>
          <div class="text-3xl font-bold mt-1">{{ stats.premium }}</div>
          <div class="mt-2 text-xs text-purple-300/70 flex items-center">
            <UIcon name="i-heroicons-star" class="mr-0.5" />
            <span>{{ stats.porcentajePremium }}% del total de planes</span>
          </div>
        </div>
        <div class="bg-purple-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
          <UIcon name="i-heroicons-sparkles" class="h-7 w-7 text-purple-400" />
        </div>
      </div>
      <div class="h-1 bg-purple-500/30 mt-3 rounded-full overflow-hidden">
        <div class="h-full bg-purple-500 rounded-full" :style="`width: ${stats.porcentajePremium}%`"></div>
      </div>
    </UCard>

    <!-- Tasa de actividad -->
    <UCard
      class="bg-gradient-to-br from-amber-800/20 to-amber-700/10 border border-amber-800/30 shadow-lg transform transition hover:shadow-amber-900/20 hover:-translate-y-1"
    >
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm font-medium text-amber-400">Tasa de actividad</div>
          <div class="text-3xl font-bold mt-1">{{ activityRate }}%</div>
          <div class="mt-2 text-xs text-amber-300/70 flex items-center">
            <UIcon name="i-heroicons-chart-bar" class="mr-0.5" />
            <span>{{ stats.activos }} activas de {{ totalOrgs }} organizaciones</span>
          </div>
        </div>
        <div class="bg-amber-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
          <UIcon name="i-heroicons-bolt" class="h-7 w-7 text-amber-400" />
        </div>
      </div>
      <div class="h-1 bg-amber-500/30 mt-3 rounded-full overflow-hidden">
        <div class="h-full bg-amber-500 rounded-full" :style="`width: ${activityRate}%`"></div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface TenantStats {
  activos: number;
  nuevosUltimaSemana: number;
  totalVoluntarios: number;
  promedioVoluntarios: number;
  premium: number;
  porcentajePremium: number;
}

const props = defineProps<{
  stats: TenantStats;
  totalOrgs: number;
}>();

// Calcular la tasa de actividad
const activityRate = computed(() => {
  if (props.totalOrgs === 0) return 0;
  return Math.round((props.stats.activos / props.totalOrgs) * 100);
});

// Formatear números grandes con separadores de miles
function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-ES').format(num);
}
</script>