<template>
    <UCard class="shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-200">Lista de Voluntarios</h2>
        <div class="text-sm text-gray-400">
          Total: {{ voluntarios.length }} voluntarios
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-300">
          <thead>
            <tr class="text-gray-400 uppercase border-b border-gray-700">
              <th class="px-4 py-2">Nombre</th>
              <th class="px-4 py-2">DNI</th>
              <th class="px-4 py-2">Correo / Teléfono</th>
              <th class="px-4 py-2">Área</th>
              <th class="px-4 py-2">Estado</th>
              <th class="px-4 py-2">Registro</th>
              <th class="px-4 py-2">Historial</th>
              <th class="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="v in voluntarios" :key="v.id" class="border-b border-gray-800 hover:bg-gray-800/20 transition">
              <td class="px-4 py-2">{{ v.nombre }}</td>
              <td class="px-4 py-2">{{ v.dni }}</td>
              <td class="px-4 py-2">
                <div>{{ v.correo }}</div>
                <div class="text-xs text-gray-400">{{ v.telefono }}</div>
              </td>
              <td class="px-4 py-2">{{ v.area }}</td>
              <td class="px-4 py-2">
                <UBadge :color="v.estado === 'activo' ? 'green' : 'yellow'">{{ v.estado }}</UBadge>
              </td>
              <td class="px-4 py-2">{{ formatDate(v.fechaRegistro) }}</td>
              <td class="px-4 py-2 text-xs">
                <div>{{ v.historial.eventos }} eventos</div>
                <div>{{ v.historial.horas }} horas</div>
                <div>{{ v.historial.certificados }} certificados</div>
              </td>
              <td class="px-4 py-2">
                <div class="flex gap-2">
                  <UButton icon="i-heroicons-eye" color="gray" size="xs" variant="ghost" 
                    @click="emit('view', v)" />
                  <UButton icon="i-heroicons-pencil" color="sky" size="xs" variant="ghost" 
                    @click="emit('edit', v)" />
                  <UButton icon="i-heroicons-trash" color="red" size="xs" variant="ghost" 
                    @click="emit('delete', v)" />
                </div>
              </td>
            </tr>
            <tr v-if="voluntarios.length === 0">
              <td colspan="8" class="px-4 py-6 text-center text-gray-400">
                No hay voluntarios registrados
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
  
  const emit = defineEmits(['view', 'edit', 'delete']);
  </script>