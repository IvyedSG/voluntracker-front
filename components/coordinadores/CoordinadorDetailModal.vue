<!-- filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\components\coordinadores\CoordinadorDetailModal.vue -->
<template>
    <UModal 
      v-model="isOpen" 
      :ui="{ 
        container: 'bg-gray-900 border border-gray-800 max-w-2xl',
        overlay: 'backdrop-blur-sm'
      }"
    >
      <div class="p-5">
        <!-- Encabezado con información básica -->
        <div class="flex items-start mb-6">
          <UAvatar
            :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(coordinador.nombre)}&background=0369a1&color=ffffff`"
            :alt="coordinador.nombre"
            size="xl"
            class="mr-4 border-2 border-blue-600/40"
          />
          <div class="flex-grow">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-xl font-semibold text-white">{{ coordinador.nombre }}</h2>
                <p class="text-blue-400 flex items-center">
                  <UIcon name="i-heroicons-envelope" class="w-4 h-4 mr-1" />
                  {{ coordinador.correo }}
                </p>
              </div>
              <UBadge 
                :color="getEstadoColor(coordinador.estado)" 
                :variant="coordinador.estado === 'activo' ? 'solid' : 'subtle'"
                size="md"
                :icon="getEstadoIcon(coordinador.estado)"
              >
                {{ formatEstado(coordinador.estado) }}
              </UBadge>
            </div>
            
            <!-- Rol y nivel de acceso -->
            <div class="mt-3 flex flex-wrap gap-2">
              <UBadge
                color="indigo"
                :icon="getRolIcon(coordinador.rol)"
              >
                {{ formatRol(coordinador.rol) }}
              </UBadge>
              <UBadge
                :color="coordinador.nivelAcceso === 'avanzado' ? 'purple' : 'blue'"
                :icon="coordinador.nivelAcceso === 'avanzado' ? 'i-heroicons-star' : 'i-heroicons-academic-cap'"
              >
                Acceso {{ coordinador.nivelAcceso }}
              </UBadge>
            </div>
          </div>
        </div>
  
        <!-- Contenido principal -->
        <div class="space-y-6">
          <!-- Áreas asignadas -->
          <div class="rounded-lg border border-gray-700 overflow-hidden">
            <div class="bg-gray-800 p-3 flex items-center justify-between">
              <h3 class="text-white font-medium flex items-center">
                <UIcon name="i-heroicons-square-3-stack-3d" class="w-5 h-5 mr-2 text-blue-400" />
                Áreas asignadas
              </h3>
              <UBadge 
                color="blue" 
                variant="subtle" 
                size="sm"
              >
                {{ coordinador.areasAsignadas.length }} áreas
              </UBadge>
            </div>
            
            <div class="p-4 bg-gray-850">
              <div v-if="coordinador.areasAsignadas.length === 0" class="text-gray-400 text-sm flex items-center justify-center py-3">
                <UIcon name="i-heroicons-information-circle" class="w-5 h-5 mr-2" />
                Este coordinador no tiene áreas asignadas
              </div>
              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div 
                  v-for="area in coordinador.areasAsignadas" 
                  :key="area.id" 
                  class="flex items-center p-2.5 bg-gray-800/70 rounded border border-gray-700/70"
                >
                  <div class="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3">
                    <UIcon name="i-heroicons-rectangle-stack" class="w-4 h-4 text-blue-400" />
                  </div>
                  <span class="text-gray-200">{{ area.nombre }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Información adicional -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Actividad del coordinador -->
            <div class="rounded-lg border border-gray-700 overflow-hidden">
              <div class="bg-gray-800 p-3">
                <h3 class="text-white font-medium flex items-center">
                  <UIcon name="i-heroicons-chart-bar" class="w-5 h-5 mr-2 text-green-400" />
                  Actividad
                </h3>
              </div>
              <div class="p-4 bg-gray-850 space-y-3">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-400">Fecha de registro:</span>
                  <span class="text-white">{{ formatDate(coordinador.fechaRegistro) }}</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-400">Última actividad:</span>
                  <span class="text-white">{{ coordinador.ultimaActividad ? formatDate(coordinador.ultimaActividad) : 'Nunca' }}</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-400">Voluntarios asignados:</span>
                  <span class="text-white">{{ coordinador.voluntariosAsignados || 0 }}</span>
                </div>
              </div>
            </div>
            
            <!-- Seguridad y acceso -->
            <div class="rounded-lg border border-gray-700 overflow-hidden">
              <div class="bg-gray-800 p-3">
                <h3 class="text-white font-medium flex items-center">
                  <UIcon name="i-heroicons-shield-check" class="w-5 h-5 mr-2 text-purple-400" />
                  Seguridad y acceso
                </h3>
              </div>
              <div class="p-4 bg-gray-850 space-y-3">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-400">Última sesión:</span>
                  <span class="text-white">{{ coordinador.ultimaSesion ? formatDate(coordinador.ultimaSesion) : 'Nunca' }}</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-400">Verificación 2FA:</span>
                  <span v-if="coordinador.verificacion2FA" class="text-green-400 flex items-center">
                    <UIcon name="i-heroicons-check-circle" class="w-4 h-4 mr-1" /> Activada
                  </span>
                  <span v-else class="text-amber-400 flex items-center">
                    <UIcon name="i-heroicons-x-circle" class="w-4 h-4 mr-1" /> No activada
                  </span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-400">Dispositivos conectados:</span>
                  <span class="text-white">{{ coordinador.dispositivosConectados || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Botones de acción -->
        <div class="flex flex-wrap justify-end gap-3 mt-6 pt-4 border-t border-gray-800">
          <UButton 
            color="gray" 
            variant="ghost" 
            @click="$emit('cancel')"
          >
            Cerrar
          </UButton>
          
          <UButton 
            v-if="coordinador.estado === 'pendiente'"
            color="blue" 
            @click="$emit('invite', coordinador)"
          >
            <UIcon name="i-heroicons-envelope" class="mr-1" />
            Enviar invitación
          </UButton>
          
          <UButton 
            color="amber"
            variant="soft"
            @click="$emit('edit', coordinador)"
          >
            <UIcon name="i-heroicons-pencil-square" class="mr-1" />
            Editar
          </UButton>
          
          <UButton 
            v-if="coordinador.estado !== 'inactivo'"
            color="red" 
            variant="ghost"
            @click="$emit('deactivate', coordinador)"
          >
            <UIcon name="i-heroicons-x-circle" class="mr-1" />
            Desactivar
          </UButton>
          
          <UButton 
            v-else
            color="green" 
            variant="ghost"
            @click="$emit('activate', coordinador)"
          >
            <UIcon name="i-heroicons-check-circle" class="mr-1" />
            Activar
          </UButton>
        </div>
      </div>
    </UModal>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { formatDate } from '~/utils/dateUtils';
  
  // Props
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    coordinador: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        nombre: '',
        correo: '',
        areasAsignadas: [],
        rol: '',
        nivelAcceso: '',
        estado: '',
        fechaRegistro: '',
        ultimaActividad: null,
        ultimaSesion: null,
        verificacion2FA: false,
        dispositivosConectados: 0,
        voluntariosAsignados: 0
      })
    }
  });
  
  // Emits
  const emit = defineEmits([
    'update:modelValue', 
    'edit', 
    'invite', 
    'deactivate', 
    'activate', 
    'cancel'
  ]);
  
  // Sincronizar el estado del modal con v-model
  const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });
  
  // Función para formatear el rol
  function formatRol(rol) {
    switch (rol) {
      case 'administrador': return 'Administrador';
      case 'lider': return 'Líder';
      case 'coordinador': return 'Coordinador';
      default: return rol;
    }
  }
  
  // Función para formatear el estado
  function formatEstado(estado) {
    switch (estado) {
      case 'activo': return 'Activo';
      case 'inactivo': return 'Inactivo';
      case 'pendiente': return 'Pendiente';
      default: return estado;
    }
  }
  
  // Función para obtener el color según el estado
  function getEstadoColor(estado) {
    switch (estado) {
      case 'activo': return 'success';
      case 'inactivo': return 'warning';
      case 'pendiente': return 'blue';
      default: return 'gray';
    }
  }
  
  // Función para obtener el icono según el estado
  function getEstadoIcon(estado) {
    switch (estado) {
      case 'activo': return 'i-heroicons-check-circle';
      case 'inactivo': return 'i-heroicons-pause-circle';
      case 'pendiente': return 'i-heroicons-clock';
      default: return 'i-heroicons-question-mark-circle';
    }
  }
  
  // Función para obtener el icono según el rol
  function getRolIcon(rol) {
    switch (rol) {
      case 'administrador': return 'i-heroicons-shield-exclamation';
      case 'lider': return 'i-heroicons-identification';
      case 'coordinador': return 'i-heroicons-user-group';
      default: return 'i-heroicons-user';
    }
  }
  </script>