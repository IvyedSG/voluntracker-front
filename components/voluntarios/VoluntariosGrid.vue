<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    <UCard
      v-for="voluntario in voluntarios"
      :key="voluntario.id"
      class="border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 shadow-lg hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <!-- Cabecera con color según estado y efecto visual mejorado -->
      <div 
        class="h-2 -mx-4 -mt-4 mb-4"
        :class="voluntario.estado === 'activo' ? 'bg-gradient-to-r from-green-600 to-emerald-500' : 'bg-gradient-to-r from-yellow-600 to-amber-500'"
      ></div>
      
      <div class="flex justify-between">
        <!-- Avatar y nombre con efectos visuales -->
        <div class="flex space-x-3">
          <div class="flex-shrink-0 relative">
            <div 
              class="absolute inset-0 rounded-full blur-sm"
              :class="voluntario.estado === 'activo' ? 'bg-green-600/20' : 'bg-yellow-600/20'"
            ></div>
            <UAvatar 
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(voluntario.nombre)}&background=0369a1&color=ffffff`" 
              :alt="voluntario.nombre"
              class="h-10 w-10 border-2 shadow-md"
              :class="voluntario.estado === 'activo' ? 'border-green-600/60' : 'border-yellow-600/60'"
            />
          </div>
          <div>
            <h3 class="text-white font-medium leading-tight">{{ voluntario.nombre }}</h3>
            <div class="flex items-center mt-1 text-xs text-gray-400">
              <span>{{ voluntario.dni }}</span>
            </div>
          </div>
        </div>
        
        <!-- Estado con badge mejorado -->
        <UBadge 
          :color="voluntario.estado === 'activo' ? 'success' : 'warning'" 
          :variant="voluntario.estado === 'activo' ? 'solid' : 'subtle'"
          :icon="voluntario.estado === 'activo' ? 'i-heroicons-check-circle' : 'i-heroicons-pause-circle'"
          size="xl"
          class="shadow-sm"
        >
          {{ voluntario.estado }}
        </UBadge>
      </div>
      
      <!-- Información organizativa con diseño mejorado -->
      <div class="grid grid-cols-3 gap-4 mt-5 py-3 border-t border-b border-gray-800/70 bg-gray-800/10">
        <div class="text-center">
          <div class="text-xs text-gray-400 mb-1">Eventos</div>
          <div class="font-semibold text-blue-400">{{ voluntario.historial.eventos }}</div>
        </div>
        <div class="text-center border-x border-gray-800/50">
          <div class="text-xs text-gray-400 mb-1">Horas</div>
          <div class="font-semibold text-blue-400">{{ voluntario.historial.horas }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-gray-400 mb-1">Área</div>
          <div class="text-md truncate">{{ voluntario.area }}</div>
        </div>
      </div>
      
      <!-- Contacto e info con iconos mejorados -->
      <div class="mt-3 text-sm text-gray-400">
        <div class="flex items-center hover:text-blue-400 transition-colors">
          <UIcon name="i-heroicons-envelope" class="mr-1 text-blue-500/70" />
          <span class="truncate">{{ voluntario.correo }}</span>
        </div>
        <div class="flex items-center mt-1 hover:text-blue-400 transition-colors">
          <UIcon name="i-heroicons-phone" class="mr-1 text-blue-500/70" />
          <span>{{ voluntario.telefono }}</span>
        </div>
        <div class="flex items-center mt-1">
          <UIcon name="i-heroicons-calendar" class="mr-1 text-blue-500/70" />
          <span>Desde {{ formatDate(voluntario.fechaRegistro) }}</span>
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
            @click="$emit('view', voluntario)" 
          />
          <UButton 
            color="warning" 
            variant="ghost" 
            icon="i-heroicons-pencil-square" 
            size="lg"
            class="hover:bg-yellow-900/30 transition-colors"
            @click="$emit('edit', voluntario)" 
          />
          <UButton 
            :color="voluntario.estado === 'activo' ? 'warning' : 'success'" 
            variant="ghost" 
            :icon="voluntario.estado === 'activo' ? 'i-heroicons-pause' : 'i-heroicons-play'" 
            size="lg"
            class="transition-colors"
            :class="voluntario.estado === 'activo' ? 'hover:bg-yellow-900/30' : 'hover:bg-green-900/30'"
            @click="$emit('toggle-status', voluntario)" 
          />
          <UButton 
            color="error" 
            variant="ghost" 
            icon="i-heroicons-trash" 
            size="lg"
            class="hover:bg-red-900/30 transition-colors"
            @click="$emit('delete', voluntario)" 
          />
        </div>
      </div>
    </UCard>
    
    <!-- Estado vacío mejorado visualmente -->
    <div v-if="voluntarios.length === 0" class="col-span-full p-10 text-center text-gray-400 bg-gray-900/30 rounded-xl border border-gray-800 shadow-inner">
      <UIcon name="i-heroicons-user-group" class="h-12 w-12 mx-auto mb-3 text-gray-600 opacity-50" />
      <p class="text-lg">No hay voluntarios registrados</p>
      <UButton class="mt-4 shadow-md hover:shadow-lg hover:shadow-blue-900/20 transition-all" @click="$emit('add')">Añadir voluntario</UButton>
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