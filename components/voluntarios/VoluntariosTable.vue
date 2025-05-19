<template>
  <UCard class="shadow-lg border border-gray-700/50 overflow-hidden">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <div class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900/40 mr-3">
          <UIcon name="i-heroicons-users" class="text-blue-400" />
        </div>
        <h2 class="text-lg font-semibold text-gray-200">Lista de Voluntarios</h2>
      </div>
      <div class="flex items-center bg-blue-900/20 px-3 py-1.5 rounded-full text-sm text-blue-300 font-medium">
        <UIcon name="i-heroicons-users" class="mr-2 text-blue-400" />
        Total: {{ voluntarios.length }} voluntarios
      </div>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-300">
        <thead>
          <tr class="text-gray-400 uppercase bg-gray-800/40 border-b border-gray-700">
            <th class="px-4 py-3">Nombre</th>
            <th class="px-4 py-3">DNI</th>
            <th class="px-4 py-3">Contacto</th>
            <th class="px-4 py-3">Área</th>
            <th class="px-4 py-3">Estado</th>
            <th class="px-4 py-3">Registro</th>
            <th class="px-4 py-3">Historial</th>
            <th class="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="v in voluntarios" 
            :key="v.id" 
            class="border-b border-gray-800/70 hover:bg-gray-800/30 transition-colors"
          >
            <!-- Nombre con Avatar -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <UAvatar
                  :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(v.nombre)}&background=0369a1&color=ffffff`"
                  :alt="v.nombre"
                  size="sm"
                  class="border-2 border-blue-600/40 shadow-lg shadow-blue-500/10"
                />
                <span class="font-medium">{{ v.nombre }}</span>
              </div>
            </td>
            
            <!-- DNI -->
            <td class="px-4 py-3">
              <div class="flex items-center">
                <div class="w-6 h-6 rounded-full bg-gray-700/40 flex items-center justify-center mr-2">
                  <UIcon name="i-heroicons-identification" class="text-gray-400" />
                </div>
                <span>{{ v.dni }}</span>
              </div>
            </td>
            
            <!-- Contacto -->
            <td class="px-4 py-3">
              <div class="space-y-1.5">
                <div class="flex items-center">
                  <div class="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mr-1.5">
                    <UIcon name="i-heroicons-envelope" class="text-blue-400 text-xs" />
                  </div>
                  <span class="text-blue-300">{{ v.correo }}</span>
                </div>
                <div class="flex items-center">
                  <div class="w-5 h-5 rounded-full bg-green-900/30 flex items-center justify-center mr-1.5">
                    <UIcon name="i-heroicons-phone" class="text-green-400 text-xs" />
                  </div>
                  <span class="text-gray-400">{{ v.telefono }}</span>
                </div>
              </div>
            </td>
            
            <!-- Área -->
            <td class="px-4 py-3">
              <UBadge
                color="info"
                variant="subtle"
                size="md"
                class="py-1 px-2.5"
                icon="i-heroicons-briefcase"
              >
                {{ v.area }}
              </UBadge>
            </td>
            
            <!-- Estado -->
            <td class="px-4 py-3">
              <UBadge 
                :color="v.estado === 'activo' ? 'success' : 'warning'"
                variant="subtle"
                size="md"
                :icon="v.estado === 'activo' ? 'i-heroicons-check-circle' : 'i-heroicons-pause-circle'"
                class="py-1 px-2.5"
              >
                {{ v.estado }}
              </UBadge>
            </td>
            
            <!-- Fecha de Registro -->
            <td class="px-4 py-3">
              <div class="flex items-center">
                <div class="w-6 h-6 rounded-full bg-amber-900/30 flex items-center justify-center mr-2">
                  <UIcon name="i-heroicons-calendar" class="text-amber-400" />
                </div>
                <span>{{ formatDate(v.fechaRegistro) }}</span>
              </div>
            </td>
            
            <!-- Historial -->
            <td class="px-4 py-3">
              <div class="flex flex-col space-y-1">
                <div class="flex items-center">
                  <div class="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mr-1.5">
                    <UIcon name="i-heroicons-ticket" class="text-blue-400 text-xs" />
                  </div>
                  <span class="text-blue-300">{{ v.historial.eventos }} eventos</span>
                </div>
                <div class="flex items-center">
                  <div class="w-5 h-5 rounded-full bg-green-900/30 flex items-center justify-center mr-1.5">
                    <UIcon name="i-heroicons-clock" class="text-green-400 text-xs" />
                  </div>
                  <span class="text-green-300">{{ v.historial.horas }} horas</span>
                </div>
                <div class="flex items-center">
                  <div class="w-5 h-5 rounded-full bg-purple-900/30 flex items-center justify-center mr-1.5">
                    <UIcon name="i-heroicons-document-check-mark" class="text-purple-400 text-xs" />
                  </div>
                  <span class="text-purple-300">{{ v.historial.certificados }} certificados</span>
                </div>
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
                    @click="emit('view', v)" 
                  />
                </UTooltip>
                
                <UTooltip text="Editar">
                  <UButton 
                    icon="i-heroicons-pencil-square" 
                    color="yellow" 
                    size="sm" 
                    variant="ghost" 
                    class="hover:bg-yellow-900/30"
                    @click="emit('edit', v)" 
                  />
                </UTooltip>
                
                <UTooltip text="Pausar/Reactivar">
                  <UButton 
                    :icon="v.estado === 'activo' ? 'i-heroicons-pause' : 'i-heroicons-play'" 
                    :color="v.estado === 'activo' ? 'warning' : 'success'" 
                    size="sm" 
                    variant="ghost" 
                    class="hover:bg-gray-700/50"
                    @click="emit('toggle-status', v)" 
                  />
                </UTooltip>
                
                <UTooltip text="Eliminar">
                  <UButton 
                    icon="i-heroicons-trash" 
                    color="red" 
                    size="sm" 
                    variant="ghost" 
                    class="hover:bg-red-900/30"
                    @click="emit('delete', v)" 
                  />
                </UTooltip>
              </div>
            </td>
          </tr>
          
          <!-- Estado vacío -->
          <tr v-if="voluntarios.length === 0">
            <td colspan="8" class="px-4 py-10 text-center">
              <div class="flex flex-col items-center justify-center">
                <div class="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-3">
                  <UIcon name="i-heroicons-user-group" class="text-gray-400 h-8 w-8" />
                </div>
                <p class="text-lg text-gray-300">No hay voluntarios registrados</p>
                <p class="text-gray-400 mt-1">Agrega voluntarios para verlos listados aquí</p>
                <UButton class="mt-4" color="success" icon="i-heroicons-user-plus" @click="emit('add')">
                  Agregar voluntario
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
import type { Voluntario } from '~/types/voluntarios';

defineProps<{ voluntarios: Array<Voluntario> }>();

const emit = defineEmits(['view', 'edit', 'delete', 'toggle-status', 'add']);
</script>