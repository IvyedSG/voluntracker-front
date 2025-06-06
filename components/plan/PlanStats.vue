<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Total de planes -->
    <UCard
      class="bg-gradient-to-br from-emerald-800/20 to-emerald-700/10 border border-emerald-800/30 shadow-lg transform transition hover:shadow-emerald-900/20 hover:-translate-y-1"
    >
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm font-medium text-emerald-400">Total de planes</div>
          <div class="text-3xl font-bold mt-1">{{ stats.total }}</div>
          <div class="mt-2 text-xs text-emerald-300/70">
            <span class="flex items-center">
              <UIcon name="i-heroicons-arrow-trending-up" class="mr-0.5" />
              <span>+{{ stats.nuevosUltimaSemana }} nuevos esta semana</span>
            </span>
          </div>
        </div>
        <div class="bg-emerald-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
          <UIcon name="i-heroicons-credit-card" class="h-7 w-7 text-emerald-400" />
        </div>
      </div>
      <div class="h-1 bg-emerald-500/30 mt-3 rounded-full overflow-hidden">
        <div class="h-full bg-emerald-500 rounded-full" :style="`width: ${Math.min(stats.activos / stats.total * 100, 100)}%`"></div>
      </div>
    </UCard>

    <!-- Ingresos totales -->
    <UCard
      class="bg-gradient-to-br from-blue-800/20 to-blue-700/10 border border-blue-800/30 shadow-lg transform transition hover:shadow-blue-900/20 hover:-translate-y-1"
    >
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm font-medium text-blue-400">Ingresos mensuales</div>
          <div class="text-3xl font-bold mt-1">{{ formatCurrency(stats.ingresosTotal, 'USD') }}</div>
          <div class="mt-2 text-xs text-blue-300/70 flex items-center">
            <UIcon name="i-heroicons-arrow-trending-up" class="mr-0.5" />
            <span>+{{ stats.ingresosIncremento }}% vs mes anterior</span>
          </div>
        </div>
        <div class="bg-blue-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
          <UIcon name="i-heroicons-banknotes" class="h-7 w-7 text-blue-400" />
        </div>
      </div>
      <div class="h-1 bg-blue-500/30 mt-3 rounded-full overflow-hidden">
        <div class="h-full bg-blue-500 rounded-full" :style="`width: 75%`"></div>
      </div>
    </UCard>

    <!-- Plan más popular -->
    <UCard
      class="bg-gradient-to-br from-purple-800/20 to-purple-700/10 border border-purple-800/30 shadow-lg transform transition hover:shadow-purple-900/20 hover:-translate-y-1"
    >
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm font-medium text-purple-400">Plan más popular</div>
          <div class="text-3xl font-bold mt-1 text-white">{{ stats.planMasPopular }}</div>
          <div class="mt-2 text-xs text-purple-300/70 flex items-center">
            <UIcon name="i-heroicons-building-office-2" class="mr-0.5" />
            <span>{{ Math.round(stats.organizacionesPromedio) }} organizaciones en promedio</span>
          </div>
        </div>
        <div class="bg-purple-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
          <UIcon name="i-heroicons-star" class="h-7 w-7 text-purple-400" />
        </div>
      </div>
      <div class="h-1 bg-purple-500/30 mt-3 rounded-full overflow-hidden">
        <div class="h-full bg-purple-500 rounded-full" style="width: 90%"></div>
      </div>
    </UCard>

    <!-- Planes activos -->
    <UCard
      class="bg-gradient-to-br from-amber-800/20 to-amber-700/10 border border-amber-800/30 shadow-lg transform transition hover:shadow-amber-900/20 hover:-translate-y-1"
    >
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm font-medium text-amber-400">Planes activos</div>
          <div class="text-3xl font-bold mt-1">{{ activePlanRate }}%</div>
          <div class="mt-2 text-xs text-amber-300/70 flex items-center">
            <UIcon name="i-heroicons-chart-bar" class="mr-0.5" />
            <span>{{ stats.activos }} activos de {{ stats.total }} planes</span>
          </div>
        </div>
        <div class="bg-amber-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
          <UIcon name="i-heroicons-check-circle" class="h-7 w-7 text-amber-400" />
        </div>
      </div>
      <div class="h-1 bg-amber-500/30 mt-3 rounded-full overflow-hidden">
        <div class="h-full bg-amber-500 rounded-full" :style="`width: ${activePlanRate}%`"></div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { PlanStats } from '~/types/plan';

// Props
const props = defineProps<{
  stats: PlanStats;
}>();

// Porcentaje de planes activos
const activePlanRate = computed(() => {
  if (props.stats.total === 0) return 0;
  return Math.round((props.stats.activos / props.stats.total) * 100);
});

// Formatear moneda
function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
</script>