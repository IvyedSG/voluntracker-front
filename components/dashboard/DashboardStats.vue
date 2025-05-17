<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Voluntarios Activos -->
      <UCard
        class="bg-gradient-to-br from-emerald-800/20 to-emerald-700/10 border border-emerald-800/30 shadow-lg transform transition hover:shadow-emerald-900/20 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-emerald-400">Voluntarios Activos</div>
            <div class="text-3xl font-bold mt-1">{{ stats.voluntariosActivos ?? 0 }}</div>
            <div class="mt-2 text-xs text-emerald-300/70">
              <span class="flex items-center">
                <UIcon name="i-heroicons-arrow-trending-up" class="mr-0.5" />
                <span>{{ (stats.evolucionVoluntarios > 0 ? '+' : '') + stats.evolucionVoluntarios }}% vs mes anterior</span>
              </span>
            </div>
          </div>
          <div class="bg-emerald-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
            <UIcon name="i-heroicons-users" class="h-7 w-7 text-emerald-400" />
          </div>
        </div>
        <div class="h-1 bg-emerald-500/30 mt-3 rounded-full overflow-hidden">
          <div class="h-full bg-emerald-500 rounded-full" :style="`width: ${Math.min((stats.evolucionVoluntarios + 100) / 2, 100)}%`"></div>
        </div>
      </UCard>
  
      <!-- Eventos Programados -->
      <UCard
        class="bg-gradient-to-br from-blue-800/20 to-blue-700/10 border border-blue-800/30 shadow-lg transform transition hover:shadow-blue-900/20 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-blue-400">Eventos Programados</div>
            <div class="text-3xl font-bold mt-1">{{ stats.eventosProgramados ?? 0 }}</div>
            <div class="mt-2 text-xs text-blue-300/70 flex items-center">
              <UIcon name="i-heroicons-calendar" class="mr-0.5" />
              <span>Próximo: {{ stats.proximoEvento || 'No hay eventos' }}</span>
            </div>
          </div>
          <div class="bg-blue-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
            <UIcon name="i-heroicons-calendar-days" class="h-7 w-7 text-blue-400" />
          </div>
        </div>
        <div class="h-1 bg-blue-500/30 mt-3 rounded-full overflow-hidden">
          <div class="h-full bg-blue-500 rounded-full" :style="`width: ${Math.min((stats.eventosProgramados ?? 0) * 10, 100)}%`"></div>
        </div>
      </UCard>
  
      <!-- Tareas Pendientes -->
      <UCard
        class="bg-gradient-to-br from-purple-800/20 to-purple-700/10 border border-purple-800/30 shadow-lg transform transition hover:shadow-purple-900/20 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-purple-400">Tareas Pendientes</div>
            <div class="text-3xl font-bold mt-1">{{ stats.tareasPendientes ?? 0 }}</div>
            <div class="mt-2 text-xs text-purple-300/70 flex items-center">
              <UIcon name="i-heroicons-clock" class="mr-0.5" />
              <span>Carga horaria: {{ stats.cargaHoraria ?? 0 }} horas</span>
            </div>
          </div>
          <div class="bg-purple-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
            <UIcon name="i-heroicons-clipboard-document-list" class="h-7 w-7 text-purple-400" />
          </div>
        </div>
        <div class="h-1 bg-purple-500/30 mt-3 rounded-full overflow-hidden">
          <div class="h-full bg-purple-500 rounded-full" :style="`width: ${stats.cargaHorariaPorcentaje ?? 0}%`"></div>
        </div>
      </UCard>
  
      <!-- Horas Donadas -->
      <UCard
        class="bg-gradient-to-br from-amber-800/20 to-amber-700/10 border border-amber-800/30 shadow-lg transform transition hover:shadow-amber-900/20 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-amber-400">Horas Donadas</div>
            <div class="text-3xl font-bold mt-1">{{ stats.horasDonadas ?? 0 }}</div>
            <div class="mt-2 text-xs text-amber-300/70 flex items-center">
              <UIcon name="i-heroicons-chart-bar" class="mr-0.5" />
              <span>Total acumulado</span>
            </div>
          </div>
          <div class="bg-amber-700/20 p-3 rounded-xl flex items-center justify-center h-14 w-14 shadow-inner">
            <UIcon name="i-heroicons-clock" class="h-7 w-7 text-amber-400" />
          </div>
        </div>
        <div class="h-1 bg-amber-500/30 mt-3 rounded-full overflow-hidden">
          <div class="h-full bg-amber-500 rounded-full" :style="`width: ${Math.min((stats.horasDonadas ?? 0) / 20, 100)}%`"></div>
        </div>
      </UCard>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { DashboardStats } from '~/types/dashboard';
  
  const { stats } = defineProps<{
    stats: DashboardStats;
  }>();
  </script>