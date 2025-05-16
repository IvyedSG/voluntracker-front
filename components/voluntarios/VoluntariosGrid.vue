<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <UCard
        v-for="voluntario in voluntarios"
        :key="voluntario.id"
        class="border border-gray-800 bg-gray-900/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 overflow-hidden"
      >
        <!-- Cabecera con color según estado -->
        <div 
          class="h-2 -mx-4 -mt-4 mb-4"
          :class="voluntario.estado === 'activo' ? 'bg-green-600' : 'bg-yellow-600'"
        ></div>
        
        <div class="flex justify-between">
          <!-- Avatar y nombre -->
          <div class="flex space-x-3">
            <div class="flex-shrink-0 relative">
              <div 
                class="absolute inset-0 rounded-full"
                :class="voluntario.estado === 'activo' ? 'bg-green-600/15' : 'bg-yellow-600/15'"
              ></div>
              <UAvatar 
                :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(voluntario.nombre)}&background=0369a1&color=ffffff`" 
                :alt="voluntario.nombre"
                class="h-10 w-10 border-2"
                :class="voluntario.estado === 'activo' ? 'border-green-600/30' : 'border-yellow-600/30'"
              />
            </div>
            <div>
              <h3 class="text-white font-medium leading-tight">{{ voluntario.nombre }}</h3>
              <div class="flex items-center mt-1 text-xs text-gray-400">
                <span>{{ voluntario.dni }}</span>
              </div>
            </div>
          </div>
          
          <!-- Estado -->
          <UBadge 
            :color="voluntario.estado === 'activo' ? 'success' : 'warning'" 
            variant="subtle"
            :icon="voluntario.estado === 'activo' ? 'i-heroicons-check-circle' : 'i-heroicons-pause-circle'"
            size="xl"
          >
            {{ voluntario.estado }}
          </UBadge>
        </div>
        
        <!-- Información organizativa -->
        <div class="grid grid-cols-3 gap-4 mt-4 py-3 border-t border-b border-gray-800">
          <div class="text-center">
            <div class="text-xs text-gray-400 mb-1">Eventos</div>
            <div class="font-semibold">{{ voluntario.historial.eventos }}</div>
          </div>
          <div class="text-center border-x border-gray-800">
            <div class="text-xs text-gray-400 mb-1">Horas</div>
            <div class="font-semibold">{{ voluntario.historial.horas }}</div>
          </div>
          <div class="text-center">
            <div class="text-xs text-gray-400 mb-1">Área</div>
            <div class="text-md truncate">{{ voluntario.area }}</div>
          </div>
        </div>
        
        <!-- Contacto e info -->
        <div class="mt-3 text-sm text-gray-400">
          <div class="flex items-center">
            <UIcon name="i-heroicons-envelope" class="mr-1" />
            <span class="truncate">{{ voluntario.correo }}</span>
          </div>
          <div class="flex items-center mt-1">
            <UIcon name="i-heroicons-phone" class="mr-1" />
            <span>{{ voluntario.telefono }}</span>
          </div>
          <div class="flex items-center mt-1">
            <UIcon name="i-heroicons-calendar" class="mr-1" />
            <span>Desde {{ formatDate(voluntario.fechaRegistro) }}</span>
          </div>
        </div>
        
        <!-- Acciones -->
        <div class="flex justify-end items-center mt-3">
          <div class="flex gap-1">
            <UButton 
              color="neutral" 
              variant="ghost" 
              icon="i-heroicons-eye" 
              size="xl"
              @click="$emit('view', voluntario)" 
            />
            <UButton 
              color="warning" 
              variant="ghost" 
              icon="i-heroicons-pencil-square" 
              size="xl"
              @click="$emit('edit', voluntario)" 
            />
            <UButton 
              :color="voluntario.estado === 'activo' ? 'warning' : 'success'" 
              variant="ghost" 
              :icon="voluntario.estado === 'activo' ? 'i-heroicons-pause' : 'i-heroicons-play'" 
              size="xl"
              @click="$emit('toggle-status', voluntario)" 
            />
            <UButton 
              color="error" 
              variant="ghost" 
              icon="i-heroicons-trash" 
              size="xl"
              @click="$emit('delete', voluntario)" 
            />
          </div>
        </div>
      </UCard>
      
      <!-- Estado vacío -->
      <div v-if="voluntarios.length === 0" class="col-span-full p-8 text-center text-gray-400">
        No hay voluntarios registrados
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { formatDate } from '~/utils/dateUtils';
  import type { Voluntario } from '~/types/voluntarios';
  
  defineProps<{
    voluntarios: Voluntario[];
  }>();
  
  defineEmits<{
    (e: 'view' | 'edit' | 'toggle-status' | 'delete', voluntario: Voluntario): void;
    (e: 'add'): void;
  }>();
  </script>