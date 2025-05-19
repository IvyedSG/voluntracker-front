<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\coordinadores\CoordinadoresTable.vue -->
<template>
    <UCard class="shadow-lg border border-gray-700/50 overflow-hidden">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <div class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900/40 mr-3">
            <UIcon name="i-heroicons-shield-check" class="text-blue-400" />
          </div>
          <h2 class="text-lg font-semibold text-gray-200">Lista de Coordinadores</h2>
        </div>
        <div class="flex items-center bg-blue-900/20 px-3 py-1.5 rounded-full text-sm text-blue-300 font-medium">
          <UIcon name="i-heroicons-shield-check" class="mr-2 text-blue-400" />
          Total: {{ coordinadores.length }} coordinadores
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-300">
          <thead>
            <tr class="text-gray-400 uppercase bg-gray-800/40 border-b border-gray-700">
              <th class="px-4 py-3">Nombre</th>
              <th class="px-4 py-3">Correo</th>
              <th class="px-4 py-3">Rol</th>
              <th class="px-4 py-3">Áreas</th>
              <th class="px-4 py-3">Nivel</th>
              <th class="px-4 py-3">Estado</th>
              <th class="px-4 py-3">Registro</th>
              <th class="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="c in coordinadores" 
              :key="c.id" 
              class="border-b border-gray-800/70 hover:bg-gray-800/30 transition-colors"
            >
              <!-- Nombre con Avatar -->
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <UAvatar
                    :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(c.nombre)}&background=0369a1&color=ffffff`"
                    :alt="c.nombre"
                    size="sm"
                    class="border-2 border-blue-600/40 shadow-lg shadow-blue-500/10"
                  />
                  <span class="font-medium">{{ c.nombre }}</span>
                </div>
              </td>
              
              <!-- Correo -->
              <td class="px-4 py-3">
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center mr-2">
                    <UIcon name="i-heroicons-envelope" class="text-blue-400" />
                  </div>
                  <span class="text-blue-300">{{ c.correo }}</span>
                </div>
              </td>
              
              <!-- Rol -->
              <td class="px-4 py-3">
                <UBadge
                  color="purple"
                  variant="subtle"
                  size="md"
                  class="py-1 px-2.5"
                  icon="i-heroicons-identification"
                >
                  {{ formatRol(c.rol) }}
                </UBadge>
              </td>
              
              <!-- Áreas -->
              <td class="px-4 py-3">
                <div class="flex flex-wrap gap-1.5">
                  <UBadge
                    v-for="(area, idx) in c.areasAsignadas.nombre" :key="idx"
                    color="info"
                    variant="outline"
                    size="xs"
                    class="py-0.5 px-1.5"
                  >
                    {{ area }}
                  </UBadge>
                </div>
              </td>
              
              <!-- Nivel -->
              <td class="px-4 py-3">
                <UBadge 
                  :color="c.nivelAcceso === 'avanzado' ? 'indigo' : 'sky'"
                  variant="subtle"
                  size="md"
                  :icon="c.nivelAcceso  === 'avanzado' ? 'i-heroicons-star' : 'i-heroicons-academic-cap'"
                  class="py-1 px-2.5"
                >
                  {{ formatNivel(c.nivelAcceso ) }}
                </UBadge>
              </td>
              
              <!-- Estado -->
              <td class="px-4 py-3">
                <UBadge 
                  :color="getEstadoColor(c.estado)"
                  variant="subtle"
                  size="md"
                  :icon="getEstadoIcon(c.estado)"
                  class="py-1 px-2.5"
                >
                  {{ formatEstado(c.estado) }}
                </UBadge>
              </td>
              
              <!-- Fecha de Registro -->
              <td class="px-4 py-3">
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-amber-900/30 flex items-center justify-center mr-2">
                    <UIcon name="i-heroicons-calendar" class="text-amber-400" />
                  </div>
                  <span>{{ formatDate(c.fechaRegistro) }}</span>
                </div>
              </td>
              
              <!-- Acciones -->
              <td class="px-4 py-3">
                <div class="flex gap-2 justify-center bg-gray-800/50 rounded-lg p-1">
                  <UTooltip text="Ver detalles">
                    <UButton 
                      icon="i-heroicons-eye" 
                      color="blue" 
                      size="sm" 
                      variant="ghost" 
                      class="hover:bg-blue-900/30"
                      @click="emit('view', c)" 
                    />
                  </UTooltip>
                  
                  <UTooltip text="Editar">
                    <UButton 
                      icon="i-heroicons-pencil-square" 
                      color="yellow" 
                      size="sm" 
                      variant="ghost" 
                      class="hover:bg-yellow-900/30"
                      @click="emit('edit', c)" 
                    />
                  </UTooltip>
                  
                  <UTooltip :text="getTooltipByEstado(c.estado)">
                    <UButton 
                      :icon="getButtonIconByEstado(c.estado)" 
                      :color="getButtonColorByEstado(c.estado)" 
                      size="sm" 
                      variant="ghost" 
                      class="hover:bg-gray-700/50"
                      @click="emit('toggle-status', c)" 
                    />
                  </UTooltip>
                  
                  <UTooltip text="Enviar invitación">
                    <UButton 
                      icon="i-heroicons-envelope" 
                      color="indigo" 
                      size="sm" 
                      variant="ghost" 
                      class="hover:bg-indigo-900/30"
                      @click="emit('invite', c)" 
                    />
                  </UTooltip>
                  
                  <UTooltip text="Eliminar">
                    <UButton 
                      icon="i-heroicons-trash" 
                      color="red" 
                      size="sm" 
                      variant="ghost" 
                      class="hover:bg-red-900/30"
                      @click="emit('delete', c)" 
                    />
                  </UTooltip>
                </div>
              </td>
            </tr>
            
            <!-- Estado vacío -->
            <tr v-if="coordinadores.length === 0">
              <td colspan="8" class="px-4 py-10 text-center">
                <div class="flex flex-col items-center justify-center">
                  <div class="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-3">
                    <UIcon name="i-heroicons-shield-check" class="text-gray-400 h-8 w-8" />
                  </div>
                  <p class="text-lg text-gray-300">No hay coordinadores registrados</p>
                  <p class="text-gray-400 mt-1">Agrega coordinadores para verlos listados aquí</p>
                  <UButton class="mt-4" color="success" icon="i-heroicons-user-plus" @click="emit('add')">
                    Agregar coordinador
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </template>
  
  <script setup lang="ts">
  import { formatDate } from '~/utils/dateUtils';
  import type { Coordinador } from '~/types/coordinadores';
  
  defineProps<{ coordinadores: Array<Coordinador> }>();
  
  const emit = defineEmits(['view', 'edit', 'delete', 'invite', 'toggle-status', 'add']);
  
  // Formateadores
  function formatRol(rol: string): string {
    switch (rol) {
      case 'admin_global': return 'Administrador Global';
      case 'lider_local': return 'Líder Local';
      case 'coordinador_local': return 'Coordinador Local';
      case 'voluntario': return 'Voluntario';
      default: return rol;
    }
  }
  
  function formatNivel(nivel: string): string {
    return nivel === 'avanzado' ? 'Avanzado' : 'Básico';
  }
  
  function formatEstado(estado: string): string {
    switch (estado) {
      case 'activo': return 'Activo';
      case 'inactivo': return 'Inactivo';
      case 'pendiente': return 'Pendiente';
      default: return estado;
    }
  }
  
  function getEstadoColor(estado: string): string {
    switch (estado) {
      case 'activo': return 'success';
      case 'inactivo': return 'warning';
      case 'pendiente': return 'blue';
      default: return 'gray';
    }
  }
  
  function getEstadoIcon(estado: string): string {
    switch (estado) {
      case 'activo': return 'i-heroicons-check-circle';
      case 'inactivo': return 'i-heroicons-pause-circle';
      case 'pendiente': return 'i-heroicons-clock';
      default: return 'i-heroicons-question-mark-circle';
    }
  }
  
  function getTooltipByEstado(estado: string): string {
    switch (estado) {
      case 'activo': return 'Desactivar';
      case 'inactivo': return 'Marcar como pendiente';
      case 'pendiente': return 'Activar';
      default: return 'Cambiar estado';
    }
  }
  
  function getButtonIconByEstado(estado: string): string {
    switch (estado) {
      case 'activo': return 'i-heroicons-pause';
      case 'inactivo': return 'i-heroicons-clock';
      case 'pendiente': return 'i-heroicons-check';
      default: return 'i-heroicons-arrow-path';
    }
  }
  
  function getButtonColorByEstado(estado: string): string {
    switch (estado) {
      case 'activo': return 'warning';
      case 'inactivo': return 'blue';
      case 'pendiente': return 'success';
      default: return 'gray';
    }
  }
  </script>