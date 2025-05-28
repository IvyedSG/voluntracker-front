<template>
  <div class="space-y-8">
    <!-- Configuración de notificaciones por email -->
    <div class="bg-gray-800/80 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm relative overflow-hidden">
      <!-- Decoración de fondo con tonos verdes -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-2xl"></div>
      <div class="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div class="relative z-10">
        <!-- Header con gradiente verde -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center">
              <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-3">
                <UIcon name="i-heroicons-envelope" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Notificaciones por Email</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Configura qué eventos enviarán notificaciones por email</p>
          </div>
        </div>

        <form @submit.prevent="guardarCambios" class="space-y-8">
          <!-- Notificaciones de email -->
          <div class="space-y-4">
            <div class="space-y-3">
              <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
                <div class="flex items-center space-x-3">
                  <UIcon name="i-heroicons-user-plus" class="h-5 w-5 text-green-400" />
                  <div>
                    <span class="text-white font-medium">Nuevos voluntarios</span>
                    <p class="text-sm text-gray-400">Cuando se registra un nuevo voluntario</p>
                  </div>
                </div>
                <UToggle
                  v-model="formulario.email.nuevosVoluntarios"
                  @change="$emit('cambios')"
                  activeColor="emerald"
                  class="scale-110"
                />
              </label>

              <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
                <div class="flex items-center space-x-3">
                  <UIcon name="i-heroicons-clipboard-document-check" class="h-5 w-5 text-green-400" />
                  <div>
                    <span class="text-white font-medium">Tareas pendientes</span>
                    <p class="text-sm text-gray-400">Recordatorios de tareas sin completar</p>
                  </div>
                </div>
                <UToggle
                  v-model="formulario.email.tareasPendientes"
                  @change="$emit('cambios')"
                  activeColor="emerald"
                  class="scale-110"
                />
              </label>

              <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
                <div class="flex items-center space-x-3">
                  <UIcon name="i-heroicons-calendar-days" class="h-5 w-5 text-green-400" />
                  <div>
                    <span class="text-white font-medium">Eventos y actividades</span>
                    <p class="text-sm text-gray-400">Próximos eventos y cambios en actividades</p>
                  </div>
                </div>
                <UToggle
                  v-model="formulario.email.eventos"
                  @change="$emit('cambios')"
                  activeColor="emerald"
                  class="scale-110"
                />
              </label>

              <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
                <div class="flex items-center space-x-3">
                  <UIcon name="i-heroicons-chart-bar" class="h-5 w-5 text-green-400" />
                  <div>
                    <span class="text-white font-medium">Reportes automáticos</span>
                    <p class="text-sm text-gray-400">Reportes programados de actividad</p>
                  </div>
                </div>
                <UToggle
                  v-model="formulario.email.reportes"
                  @change="$emit('cambios')"
                  activeColor="emerald"
                  class="scale-110"
                />
              </label>
            </div>
          </div>

          <!-- Frecuencia de reportes -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <label class="flex items-center text-sm font-medium mb-4">
              <UIcon name="i-heroicons-clock-circle" class="mr-2 h-4 w-4 text-green-400" />
              <span class="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text font-semibold">Frecuencia de reportes automáticos</span>
            </label>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label 
                v-for="frecuencia in opcionesFrecuencia" 
                :key="frecuencia.value"
                class="relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors"
                :class="formulario.frecuenciaReportes === frecuencia.value 
                  ? 'border-green-500 bg-green-900/20' 
                  : 'border-gray-600 hover:border-gray-500'"
              >
                <input
                  type="radio"
                  :value="frecuencia.value"
                  v-model="formulario.frecuenciaReportes"
                  class="sr-only"
                  @change="$emit('cambios')"
                />
                <div class="flex items-center space-x-3">
                  <UIcon :name="frecuencia.icono" class="h-5 w-5" :class="formulario.frecuenciaReportes === frecuencia.value ? 'text-green-400' : 'text-gray-400'" />
                  <div>
                    <div class="text-sm font-medium text-white">{{ frecuencia.label }}</div>
                    <div class="text-xs text-gray-400">{{ frecuencia.descripcion }}</div>
                  </div>
                </div>
                <UIcon 
                  v-if="formulario.frecuenciaReportes === frecuencia.value"
                  name="i-heroicons-check-circle" 
                  class="h-5 w-5 text-green-400 absolute top-2 right-2" 
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Configuración de notificaciones push -->
    <div class="bg-gray-800/80 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm relative overflow-hidden">
      <!-- Decoración de fondo con tonos verdes -->
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 rounded-full blur-2xl"></div>
      <div class="absolute -bottom-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div class="relative z-10">
        <!-- Header con gradiente verde -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center">
              <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-3">
                <UIcon name="i-heroicons-bell-alert" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Notificaciones Push</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Notificaciones en tiempo real en la aplicación</p>
          </div>
        </div>

        <div class="space-y-4">
          <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-clipboard-document-list" class="h-5 w-5 text-green-400" />
              <div>
                <span class="text-white font-medium">Tareas pendientes</span>
                <p class="text-sm text-gray-400">Notificaciones de tareas asignadas</p>
              </div>
            </div>
            <UToggle
              v-model="formulario.push.tareasPendientes"
              @change="$emit('cambios')"
              activeColor="emerald"
              class="scale-110"
            />
          </label>

          <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-bell" class="h-5 w-5 text-green-400" />
              <div>
                <span class="text-white font-medium">Recordatorios</span>
                <p class="text-sm text-gray-400">Recordatorios de eventos y fechas importantes</p>
              </div>
            </div>
            <UToggle
              v-model="formulario.push.recordatorios"
              @change="$emit('cambios')"
              activeColor="emerald"
              class="scale-110"
            />
          </label>

          <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-green-400" />
              <div>
                <span class="text-white font-medium">Alertas importantes</span>
                <p class="text-sm text-gray-400">Alertas críticas del sistema</p>
              </div>
            </div>
            <UToggle
              v-model="formulario.push.alertas"
              @change="$emit('cambios')"
              activeColor="emerald"
              class="scale-110"
            />
          </label>
        </div>
      </div>
    </div>

    <!-- Configuración de horarios -->
    <div class="bg-gray-800/80 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm relative overflow-hidden">
      <!-- Decoración de fondo con tonos verdes -->
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 rounded-full blur-2xl"></div>
      <div class="absolute -bottom-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div class="relative z-10">
        <!-- Header con gradiente verde -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center">
              <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-3">
                <UIcon name="i-heroicons-clock" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Horarios de Notificación</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Define cuándo recibir notificaciones</p>
          </div>
        </div>

        <div class="space-y-8">
          <!-- Horario de notificaciones -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <label class="flex items-center text-sm font-medium mb-4">
              <UIcon name="i-heroicons-clock" class="mr-2 h-4 w-4 text-green-400" />
              <span class="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text font-semibold">Horario activo</span>
            </label>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Hora de inicio</label>
                <UInput
                  v-model="horarioInicio"
                  type="time"
                  class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                  @input="$emit('cambios')"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Hora de fin</label>
                <UInput
                  v-model="horarioFin"
                  type="time"
                  class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                  @input="$emit('cambios')"
                />
              </div>
            </div>
          </div>

          <!-- Días de la semana -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <label class="flex items-center text-sm font-medium mb-4">
              <UIcon name="i-heroicons-calendar" class="mr-2 h-4 w-4 text-green-400" />
              <span class="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text font-semibold">Días activos</span>
            </label>
            
            <div class="grid grid-cols-7 gap-2">
              <label 
                v-for="dia in diasSemana" 
                :key="dia.value"
                class="flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all transform hover:scale-110 duration-200"
                :class="diasActivos.includes(dia.value) 
                  ? 'border-green-500 bg-green-900/20 text-green-300' 
                  : 'border-gray-600 hover:border-gray-500 text-gray-400'"
              >
                <input
                  type="checkbox"
                  :value="dia.value"
                  v-model="diasActivos"
                  class="sr-only"
                  @change="$emit('cambios')"
                />
                <span class="text-sm font-medium">{{ dia.label }}</span>
              </label>
            </div>
          </div>

          <!-- No molestar -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <UIcon name="i-heroicons-moon" class="mr-2 h-4 w-4 text-green-400" />
                <h3 class="text-lg font-medium text-white">Modo "No molestar"</h3>
              </div>
              <UToggle
                v-model="modoNoMolestar"
                @change="$emit('cambios')"
                activeColor="emerald"
                class="scale-110"
              />
            </div>
            <p class="text-sm text-gray-400 mb-4">Suspende todas las notificaciones temporalmente</p>
            
            <div v-if="modoNoMolestar" class="space-y-4 mt-4 bg-gray-800/70 p-4 rounded-lg border border-gray-700/50">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Hasta la fecha</label>
                  <UInput
                    v-model="fechaFinNoMolestar"
                    type="date"
                    class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                    @input="$emit('cambios')"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Hasta la hora</label>
                  <UInput
                    v-model="horaFinNoMolestar"
                    type="time"
                    class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                    @input="$emit('cambios')"
                  />
                </div>
              </div>
              
              <div class="flex items-start space-x-3 bg-green-900/20 border border-green-800/30 rounded-lg p-3 mt-2">
                <UIcon name="i-heroicons-information-circle" class="h-5 w-5 text-green-400 mt-0.5" />
                <div class="text-sm text-green-300">
                  <p>Las notificaciones se reanudarán automáticamente después de la fecha y hora seleccionadas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista previa de configuración -->
    <div class="bg-gray-800/80 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm relative overflow-hidden">
      <!-- Decoración de fondo con tonos verdes -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-2xl"></div>
      <div class="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div class="relative z-10">
        <!-- Header con gradiente verde -->
        <div class="flex items-center mb-6">
          <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-3">
            <UIcon name="i-heroicons-eye" class="h-5 w-5 text-white" />
          </div>
          <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Resumen de Configuración</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Email -->
          <div class="bg-gray-750/50 rounded-lg p-5 border border-gray-700/50 hover:border-green-500/30 transition-all">
            <h3 class="text-white font-medium mb-3 flex items-center">
              <UIcon name="i-heroicons-envelope" class="h-4 w-4 mr-2 text-green-400" />
              Notificaciones por Email
            </h3>
            <div class="space-y-3 text-sm">
              <div class="flex items-center justify-between bg-gray-800/40 p-2.5 rounded-lg">
                <span class="text-gray-300">Nuevos voluntarios:</span>
                <span class="flex items-center space-x-1"
                  :class="formulario.email?.nuevosVoluntarios ? 'text-green-400' : 'text-red-400'">
                  <UIcon :name="formulario.email?.nuevosVoluntarios ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="h-4 w-4" />
                  <span>{{ formulario.email?.nuevosVoluntarios ? 'Activado' : 'Desactivado' }}</span>
                </span>
              </div>
              <div class="flex items-center justify-between bg-gray-800/40 p-2.5 rounded-lg">
                <span class="text-gray-300">Tareas pendientes:</span>
                <span class="flex items-center space-x-1"
                  :class="formulario.email?.tareasPendientes ? 'text-green-400' : 'text-red-400'">
                  <UIcon :name="formulario.email?.tareasPendientes ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="h-4 w-4" />
                  <span>{{ formulario.email?.tareasPendientes ? 'Activado' : 'Desactivado' }}</span>
                </span>
              </div>
              <div class="flex items-center justify-between bg-gray-800/40 p-2.5 rounded-lg">
                <span class="text-gray-300">Eventos:</span>
                <span class="flex items-center space-x-1"
                  :class="formulario.email?.eventos ? 'text-green-400' : 'text-red-400'">
                  <UIcon :name="formulario.email?.eventos ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="h-4 w-4" />
                  <span>{{ formulario.email?.eventos ? 'Activado' : 'Desactivado' }}</span>
                </span>
              </div>
              <div class="flex items-center justify-between bg-gray-800/40 p-2.5 rounded-lg">
                <span class="text-gray-300">Reportes:</span>
                <span class="flex items-center space-x-1"
                  :class="formulario.email?.reportes ? 'text-green-400' : 'text-red-400'">
                  <UIcon :name="formulario.email?.reportes ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="h-4 w-4" />
                  <span>{{ formulario.email?.reportes ? 'Activado' : 'Desactivado' }}</span>
                </span>
              </div>
              <div class="flex items-center justify-between bg-green-900/20 border border-green-800/30 p-2.5 rounded-lg mt-4">
                <span class="text-green-300">Frecuencia reportes:</span>
                <span class="text-green-400 capitalize bg-green-900/30 px-3 py-1 rounded-full text-xs">{{ formulario.frecuenciaReportes }}</span>
              </div>
            </div>
          </div>

          <!-- Push -->
          <div class="bg-gray-750/50 rounded-lg p-5 border border-gray-700/50 hover:border-green-500/30 transition-all">
            <h3 class="text-white font-medium mb-3 flex items-center">
              <UIcon name="i-heroicons-device-phone-mobile" class="h-4 w-4 mr-2 text-green-400" />
              Notificaciones Push
            </h3>
            <div class="space-y-3 text-sm">
              <div class="flex items-center justify-between bg-gray-800/40 p-2.5 rounded-lg">
                <span class="text-gray-300">Tareas pendientes:</span>
                <span class="flex items-center space-x-1"
                  :class="formulario.push?.tareasPendientes ? 'text-green-400' : 'text-red-400'">
                  <UIcon :name="formulario.push?.tareasPendientes ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="h-4 w-4" />
                  <span>{{ formulario.push?.tareasPendientes ? 'Activado' : 'Desactivado' }}</span>
                </span>
              </div>
              <div class="flex items-center justify-between bg-gray-800/40 p-2.5 rounded-lg">
                <span class="text-gray-300">Recordatorios:</span>
                <span class="flex items-center space-x-1"
                  :class="formulario.push?.recordatorios ? 'text-green-400' : 'text-red-400'">
                  <UIcon :name="formulario.push?.recordatorios ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="h-4 w-4" />
                  <span>{{ formulario.push?.recordatorios ? 'Activado' : 'Desactivado' }}</span>
                </span>
              </div>
              <div class="flex items-center justify-between bg-gray-800/40 p-2.5 rounded-lg">
                <span class="text-gray-300">Alertas:</span>
                <span class="flex items-center space-x-1"
                  :class="formulario.push?.alertas ? 'text-green-400' : 'text-red-400'">
                  <UIcon :name="formulario.push?.alertas ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="h-4 w-4" />
                  <span>{{ formulario.push?.alertas ? 'Activado' : 'Desactivado' }}</span>
                </span>
              </div>
              <div class="flex items-center justify-between bg-gray-800/40 p-2.5 rounded-lg mt-4">
                <span class="text-gray-300">Horario activo:</span>
                <span class="text-green-400 bg-green-900/30 px-3 py-1 rounded-full text-xs">{{ horarioInicio }} - {{ horarioFin }}</span>
              </div>
              <div class="flex items-center justify-between bg-gray-800/40 p-2.5 rounded-lg">
                <span class="text-gray-300">No molestar:</span>
                <span class="flex items-center space-x-1"
                  :class="modoNoMolestar ? 'text-yellow-400' : 'text-green-400'">
                  <UIcon :name="modoNoMolestar ? 'i-heroicons-moon' : 'i-heroicons-check-circle'" class="h-4 w-4" />
                  <span>{{ modoNoMolestar ? 'Activado' : 'Desactivado' }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="flex items-center justify-end space-x-4 pt-7 mt-2 border-t border-gray-700/40 relative">
      <div class="absolute left-0 bottom-0 w-1/3 h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
      
      <UButton 
        type="button" 
        variant="ghost"
        class="text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all border border-gray-700/50 h-11"
        @click="resetearFormulario"
        :disabled="cargando"
      >
        <UIcon name="i-heroicons-arrow-path" class="h-4 w-4 mr-1" />
        Cancelar
      </UButton>
      <UButton 
        type="button" 
        class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-md hover:shadow-xl transition-all h-11"
        :loading="cargando"
        @click="guardarCambios"
      >
        <UIcon name="i-heroicons-check-circle" class="h-4 w-4 mr-1" v-if="!cargando" />
        Guardar configuración
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { ConfiguracionNotificaciones } from '~/types/configuraciones';

const props = defineProps<{
  configuracion?: ConfiguracionNotificaciones | null;
  cargando: boolean;
}>();

const emit = defineEmits<{
  actualizar: [notificaciones: Partial<ConfiguracionNotificaciones>];
  cambios: [];
}>();

// Estado del formulario con objetos anidados completamente inicializados
const formulario = ref<Partial<ConfiguracionNotificaciones>>({
  email: {
    nuevosVoluntarios: true,
    tareasPendientes: true,
    eventos: true,
    reportes: false
  },
  push: {
    tareasPendientes: true,
    recordatorios: true,
    alertas: true
  },
  frecuenciaReportes: 'semanal'
});

// Estado adicional para horarios
const horarioInicio = ref('09:00');
const horarioFin = ref('18:00');
const diasActivos = ref(['lun', 'mar', 'mie', 'jue', 'vie']);
const modoNoMolestar = ref(false);
const fechaFinNoMolestar = ref('');
const horaFinNoMolestar = ref('');

// Opciones
const opcionesFrecuencia = [
  {
    value: 'diario',
    label: 'Diario',
    descripcion: 'Cada día',
    icono: 'i-heroicons-calendar'
  },
  {
    value: 'semanal',
    label: 'Semanal',
    descripcion: 'Cada semana',
    icono: 'i-heroicons-calendar-days'
  },
  {
    value: 'mensual',
    label: 'Mensual',
    descripcion: 'Cada mes',
    icono: 'i-heroicons-calendar-date-range'
  }
];

const diasSemana = [
  { value: 'lun', label: 'L' },
  { value: 'mar', label: 'M' },
  { value: 'mie', label: 'X' },
  { value: 'jue', label: 'J' },
  { value: 'vie', label: 'V' },
  { value: 'sab', label: 'S' },
  { value: 'dom', label: 'D' }
];

// Watchers - Asegurar que los objetos anidados siempre existan
watch(() => props.configuracion, (nueva) => {
  if (nueva) {
    formulario.value = {
      ...nueva,
      email: {
        nuevosVoluntarios: true,
        tareasPendientes: true,
        eventos: true,
        reportes: false,
        ...nueva.email // Mantiene los valores si existen
      },
      push: {
        tareasPendientes: true,
        recordatorios: true,
        alertas: true,
        ...nueva.push // Mantiene los valores si existen
      }
    };
  }
}, { immediate: true });

// Métodos
const guardarCambios = async () => {
  const configuracionCompleta = {
    ...formulario.value,
    horarios: {
      inicio: horarioInicio.value,
      fin: horarioFin.value,
      diasActivos: diasActivos.value,
      noMolestar: {
        activo: modoNoMolestar.value,
        hasta: modoNoMolestar.value ? `${fechaFinNoMolestar.value} ${horaFinNoMolestar.value}` : null
      }
    }
  };
  
  emit('actualizar', configuracionCompleta);
};

const resetearFormulario = () => {
  if (props.configuracion) {
    formulario.value = {
      ...props.configuracion,
      email: {
        nuevosVoluntarios: true,
        tareasPendientes: true,
        eventos: true,
        reportes: false,
        ...props.configuracion.email
      },
      push: {
        tareasPendientes: true,
        recordatorios: true,
        alertas: true,
        ...props.configuracion.push
      }
    };
  }
  // Restablecer valores adicionales
  horarioInicio.value = '09:00';
  horarioFin.value = '18:00';
  diasActivos.value = ['lun', 'mar', 'mie', 'jue', 'vie'];
  modoNoMolestar.value = false;
  fechaFinNoMolestar.value = '';
  horaFinNoMolestar.value = '';
};

onMounted(() => {
  if (props.configuracion) {
    formulario.value = {
      ...props.configuracion,
      email: {
        nuevosVoluntarios: true,
        tareasPendientes: true,
        eventos: true,
        reportes: false,
        ...props.configuracion.email
      },
      push: {
        tareasPendientes: true,
        recordatorios: true,
        alertas: true,
        ...props.configuracion.push
      }
    };
  }
});
</script>

<style scoped>
/* Fondos y colores dinámicos */
.bg-gray-750\/50 {
  background-color: rgba(31, 41, 55, 0.5);
}

/* Efectos de animación */
@keyframes pulse-glow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.1); }
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

/* Mejora de elementos de UI */
:deep(.u-input) {
  border-radius: 0.5rem;
  background-color: rgba(55, 65, 81, 0.7);
  backdrop-filter: blur(4px);
  border-color: rgba(75, 85, 99, 0.7);
  color: #E5E7EB;
  transition: all 0.3s ease;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

:deep(.u-input:focus) {
  border-color: #10B981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
  background-color: rgba(55, 65, 81, 0.9);
}

:deep(.u-textarea) {
  border-radius: 0.5rem;
  background-color: rgba(55, 65, 81, 0.7);
  backdrop-filter: blur(4px);
  border-color: rgba(75, 85, 99, 0.7);
  color: #E5E7EB;
  transition: all 0.3s ease;
  padding: 1rem;
  line-height: 1.5;
}

:deep(.u-textarea:focus) {
  border-color: #10B981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
  background-color: rgba(55, 65, 81, 0.9);
}

/* Personalización de checkbox y toggle */
:deep(.u-checkbox__input:checked) {
  background-color: #10B981;
  border-color: #10B981;
}

:deep(.u-toggle--checked) {
  background-color: #10B981;
}

/* Efectos hover en secciones */
:deep(.hover\:shadow-xl) {
  transition: all 0.3s ease;
}

/* Gradientes y glassmorphism */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>