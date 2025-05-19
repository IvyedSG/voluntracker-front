<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\coordinadores\CoordinadoresGrid.vue -->
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <UCard
        v-for="coordinador in coordinadores"
        :key="coordinador.id"
        class="border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 shadow-lg hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <!-- Cabecera con color según estado y efecto visual mejorado -->
        <div 
          class="h-2 -mx-4 -mt-4 mb-4"
          :class="{
            'bg-gradient-to-r from-green-600 to-emerald-500': coordinador.estado === 'activo',
            'bg-gradient-to-r from-yellow-600 to-amber-500': coordinador.estado === 'inactivo',
            'bg-gradient-to-r from-blue-600 to-indigo-500': coordinador.estado === 'pendiente'
          }"
        ></div>
        
        <div class="flex justify-between">
          <!-- Avatar y nombre con efectos visuales -->
          <div class="flex space-x-3">
            <div class="flex-shrink-0 relative">
              <div 
                class="absolute inset-0 rounded-full blur-sm"
                :class="{
                  'bg-green-600/20': coordinador.estado === 'activo',
                  'bg-yellow-600/20': coordinador.estado === 'inactivo',
                  'bg-blue-600/20': coordinador.estado === 'pendiente'
                }"
              ></div>
              <UAvatar 
                :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(coordinador.nombre)}&background=0369a1&color=ffffff`" 
                :alt="coordinador.nombre"
                class="h-10 w-10 border-2 shadow-md"
                :class="{
                  'border-green-600/60': coordinador.estado === 'activo',
                  'border-yellow-600/60': coordinador.estado === 'inactivo',
                  'border-blue-600/60': coordinador.estado === 'pendiente'
                }"
              />
            </div>
            <div>
              <h3 class="text-white font-medium leading-tight">{{ coordinador.nombre }}</h3>
              <div class="flex items-center mt-1 text-xs text-gray-400">
                <span>{{ formatRol(coordinador.rol) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Estado con badge mejorado -->
          <UBadge 
            :color="getEstadoColor(coordinador.estado)" 
            :variant="coordinador.estado === 'activo' ? 'solid' : 'subtle'"
            :icon="getEstadoIcon(coordinador.estado)"
            size="xl"
            class="shadow-sm"
          >
            {{ formatEstado(coordinador.estado) }}
          </UBadge>
        </div>
        
        <!-- Nivel y áreas asignadas -->
        <div class="mt-3 pt-3 border-t border-gray-800/70">
          <div class="flex items-center justify-between">
            <UBadge 
              :color="coordinador.nivelAcceso === 'avanzado' ? 'indigo' : 'sky'"
              variant="subtle"
              size="md"
              :icon="coordinador.nivelAcceso === 'avanzado' ? 'i-heroicons-star' : 'i-heroicons-academic-cap'"
            >
              {{ formatNivel(coordinador.nivelAcceso) }}
            </UBadge>
            
            <span class="text-xs text-gray-500">{{ coordinador.areasAsignadas.length }} áreas</span>
          </div>
          
          <!-- Áreas -->
          <div class="mt-2 flex flex-wrap gap-1.5">
            <UBadge
              v-for="(area, idx) in coordinador.areasAsignadas.slice(0, 3)"
              :key="idx"
              color="info"
              variant="outline"
              size="xs"
              class="py-0.5 px-1.5"
            >
              {{ area }}
            </UBadge>
            
            <UBadge
              v-if="coordinador.areasAsignadas.length > 3"
              color="gray"
              variant="outline"
              size="xs"
              class="py-0.5 px-1.5"
            >
              +{{ coordinador.areasAsignadas.length - 3 }} más
            </UBadge>
          </div>
        </div>
        
        <!-- Contacto e info con iconos mejorados -->
        <div class="mt-3 text-sm text-gray-400">
          <div class="flex items-center hover:text-blue-400 transition-colors">
            <UIcon name="i-heroicons-envelope" class="mr-1 text-blue-500/70" />
            <span class="truncate">{{ coordinador.correo }}</span>
          </div>
          <div class="flex items-center mt-1">
            <UIcon name="i-heroicons-calendar" class="mr-1 text-blue-500/70" />
            <span>Desde {{ formatDate(coordinador.fechaRegistro) }}</span>
          </div>
          <div v-if="coordinador.ultimoAcceso" class="flex items-center mt-1">
            <UIcon name="i-heroicons-arrow-right-on-rectangle" class="mr-1 text-blue-500/70" />
            <span>Último acceso: {{ formatLastAccess(coordinador.ultimoAcceso) }}</span>
          </div>
        </div>
        
        <!-- Acciones con botones mejorados y efectos hover -->
        <div class="flex justify-end items-center mt-3">
          <div class="flex gap-1 p-1 bg-gray-800/30 rounded-lg">
            <UButton 
              color="blue" 
              variant="ghost" 
              icon="i-heroicons-eye" 
              size="lg"
              class="hover:bg-blue-900/30 transition-colors"
              @click="$emit('view', coordinador)" 
            />
            <UButton 
              color="warning" 
              variant="ghost" 
              icon="i-heroicons-pencil-square" 
              size="lg"
              class="hover:bg-yellow-900/30 transition-colors"
              @click="$emit('edit', coordinador)" 
            />
            <UButton 
              :color="getButtonColorByEstado(coordinador.estado)" 
              variant="ghost" 
              :icon="getButtonIconByEstado(coordinador.estado)" 
              size="lg"
              class="transition-colors"
              :class="{
                'hover:bg-yellow-900/30': coordinador.estado === 'activo',
                'hover:bg-blue-900/30': coordinador.estado === 'inactivo',
                'hover:bg-green-900/30': coordinador.estado === 'pendiente'
              }"
              @click="$emit('toggle-status', coordinador)" 
            />
            <UButton 
              color="indigo" 
              variant="ghost" 
              icon="i-heroicons-envelope" 
              size="lg"
              class="hover:bg-indigo-900/30 transition-colors"
              @click="$emit('invite', coordinador)" 
            />
            <UButton 
              color="error" 
              variant="ghost" 
              icon="i-heroicons-trash" 
              size="lg"
              class="hover:bg-red-900/30 transition-colors"
              @click="$emit('delete', coordinador)" 
            />
          </div>
        </div>
      </UCard>
      
      <!-- Estado vacío mejorado visualmente -->
      <div v-if="coordinadores.length === 0" class="col-span-full p-10 text-center text-gray-400 bg-gray-900/30 rounded-xl border border-gray-800 shadow-inner">
        <UIcon name="i-heroicons-shield-check" class="h-12 w-12 mx-auto mb-3 text-gray-600 opacity-50" />
        <p class="text-lg">No hay coordinadores registrados</p>
        <UButton class="mt-4 shadow-md hover:shadow-lg hover:shadow-blue-900/20 transition-all" @click="$emit('add')">Añadir coordinador</UButton>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { formatDate } from '~/utils/dateUtils';
  import type { Coordinador } from '~/types/coordinadores';
  
  defineProps<{
    coordinadores: Coordinador[];
  }>();
  
  defineEmits<{
    (e: 'view' | 'edit' | 'toggle-status' | 'delete' | 'invite', coordinador: Coordinador): void;
    (e: 'add'): void;
  }>();
  
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
  
  // Formatear última fecha de acceso
  function formatLastAccess(timestamp: string): string {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString('es-ES', { 
        day: '2-digit', 
        month: '2-digit',
        hour: '2-digit', 
        minute: '2-digit'
      });
    } catch(e) {
      return 'Fecha inválida';
    }
  }
  </script>