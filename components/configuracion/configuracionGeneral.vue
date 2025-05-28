<template>
  <div class="space-y-8">
    <!-- Configuración de idioma y región -->
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
                <UIcon name="i-heroicons-globe-alt" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Idioma y Región</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Configura el idioma y formatos regionales</p>
          </div>
        </div>

        <form @submit.prevent="guardarCambios" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Idioma -->
            <div class="bg-gray-750/50 p-5 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
              <label class="flex items-center text-sm font-medium text-gray-300 mb-3">
                <UIcon name="i-heroicons-language" class="mr-2 h-4 w-4 text-green-400" />
                Idioma de la aplicación
              </label>
              <USelect
                v-model="formulario.idioma"
                :options="opcionesIdioma"
                placeholder="Selecciona un idioma"
                class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all"
                @change="$emit('cambios')"
              />
              <p class="text-xs text-gray-500 mt-2 flex items-center">
                <UIcon name="i-heroicons-information-circle" class="h-3 w-3 mr-1" />
                Idioma de la interfaz y notificaciones
              </p>
            </div>

            <!-- Zona horaria -->
            <div class="bg-gray-750/50 p-5 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
              <label class="flex items-center text-sm font-medium text-gray-300 mb-3">
                <UIcon name="i-heroicons-clock" class="mr-2 h-4 w-4 text-green-400" />
                Zona horaria
              </label>
              <USelect
                v-model="formulario.zonaHoraria"
                :options="opcionesZonaHoraria"
                searchable
                placeholder="Buscar zona horaria..."
                class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all"
                @change="$emit('cambios')"
              />
              <p class="text-xs text-gray-500 mt-2 flex items-center">
                <UIcon name="i-heroicons-information-circle" class="h-3 w-3 mr-1" />
                Zona horaria para fechas y eventos
              </p>
            </div>

            <!-- Formato de fecha -->
            <div class="bg-gray-750/50 p-5 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
              <label class="flex items-center text-sm font-medium text-gray-300 mb-3">
                <UIcon name="i-heroicons-calendar" class="mr-2 h-4 w-4 text-green-400" />
                Formato de fecha
              </label>
              <USelect
                v-model="formulario.formatoFecha"
                :options="opcionesFormatoFecha"
                class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all"
                @change="$emit('cambios')"
              />
              <div class="mt-2 bg-green-900/20 border border-green-800/30 rounded-lg p-2">
                <p class="text-xs text-green-300 flex items-center">
                  <UIcon name="i-heroicons-eye" class="h-3 w-3 mr-1" />
                  Ejemplo: {{ formatearFechaEjemplo() }}
                </p>
              </div>
            </div>

            <!-- Formato de hora -->
            <div class="bg-gray-750/50 p-5 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
              <label class="flex items-center text-sm font-medium text-gray-300 mb-3">
                <UIcon name="i-heroicons-clock" class="mr-2 h-4 w-4 text-green-400" />
                Formato de hora
              </label>
              <USelect
                v-model="formulario.formatoHora"
                :options="opcionesFormatoHora"
                class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all"
                @change="$emit('cambios')"
              />
              <div class="mt-2 bg-green-900/20 border border-green-800/30 rounded-lg p-2">
                <p class="text-xs text-green-300 flex items-center">
                  <UIcon name="i-heroicons-eye" class="h-3 w-3 mr-1" />
                  Ejemplo: {{ formatearHoraEjemplo() }}
                </p>
              </div>
            </div>

            <!-- Moneda -->
            <div class="md:col-span-2 bg-gray-750/50 p-5 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
              <label class="flex items-center text-sm font-medium text-gray-300 mb-3">
                <UIcon name="i-heroicons-currency-dollar" class="mr-2 h-4 w-4 text-green-400" />
                Moneda
              </label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <USelect
                  v-model="formulario.moneda"
                  :options="opcionesMoneda"
                  searchable
                  placeholder="Buscar moneda..."
                  class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all"
                  @change="$emit('cambios')"
                />
                <div class="bg-green-900/20 border border-green-800/30 rounded-lg p-3">
                  <p class="text-xs text-green-300 flex items-center">
                    <UIcon name="i-heroicons-eye" class="h-3 w-3 mr-1" />
                    Ejemplo: {{ formatearMonedaEjemplo() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Configuración de privacidad -->
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
                <UIcon name="i-heroicons-shield-check" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Privacidad y Datos</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Controla cómo se manejan los datos de la organización</p>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Configuración de privacidad -->
          <div class="space-y-4">
            <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-eye-slash" class="h-5 w-5 text-green-400" />
                <div>
                  <span class="text-white font-medium">Perfiles privados por defecto</span>
                  <p class="text-sm text-gray-400">Los nuevos voluntarios tendrán perfiles privados</p>
                </div>
              </div>
              <UToggle
                v-model="configuracionPrivacidad.perfilesPrivados"
                @change="$emit('cambios')"
                activeColor="emerald"
                class="scale-110"
              />
            </label>

            <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-chart-bar" class="h-5 w-5 text-green-400" />
                <div>
                  <span class="text-white font-medium">Análisis de uso</span>
                  <p class="text-sm text-gray-400">Permitir recopilar datos para mejorar la aplicación</p>
                </div>
              </div>
              <UToggle
                v-model="configuracionPrivacidad.analisisUso"
                @change="$emit('cambios')"
                activeColor="emerald"
                class="scale-110"
              />
            </label>

            <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-share" class="h-5 w-5 text-green-400" />
                <div>
                  <span class="text-white font-medium">Compartir estadísticas públicas</span>
                  <p class="text-sm text-gray-400">Mostrar estadísticas generales en perfil público</p>
                </div>
              </div>
              <UToggle
                v-model="configuracionPrivacidad.estadisticasPublicas"
                @change="$emit('cambios')"
                activeColor="emerald"
                class="scale-110"
              />
            </label>
          </div>

          <!-- Retención de datos -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <h3 class="text-lg font-medium text-white mb-4 flex items-center">
              <UIcon name="i-heroicons-archive-box" class="h-5 w-5 text-green-400 mr-2" />
              Retención de Datos
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-3">
                  Logs de actividad (meses)
                </label>
                <UInput
                  v-model.number="configuracionPrivacidad.retencionLogs"
                  type="number"
                  min="1"
                  max="36"
                  class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                  @input="$emit('cambios')"
                />
                <p class="text-xs text-gray-500 mt-2">Tiempo que se conservan los logs del sistema</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-3">
                  Datos de voluntarios inactivos (meses)
                </label>
                <UInput
                  v-model.number="configuracionPrivacidad.retencionVoluntarios"
                  type="number"
                  min="6"
                  max="120"
                  class="bg-gray-700/70 border-gray-600/70 text-gray-200 ring-green-400 focus:border-green-400 transition-all h-12 px-4"
                  @input="$emit('cambios')"
                />
                <p class="text-xs text-gray-500 mt-2">Tiempo que se conservan datos de voluntarios inactivos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Configuración de accesibilidad -->
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
                <UIcon name="i-heroicons-hand-raised" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Accesibilidad</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Opciones para mejorar la accesibilidad</p>
          </div>
        </div>

        <div class="space-y-6">
          <div class="space-y-4">
            <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-magnifying-glass-plus" class="h-5 w-5 text-green-400" />
                <div>
                  <span class="text-white font-medium">Alto contraste</span>
                  <p class="text-sm text-gray-400">Aumenta el contraste para mejor visibilidad</p>
                </div>
              </div>
              <UToggle
                v-model="configuracionAccesibilidad.altoContraste"
                @change="$emit('cambios')"
                activeColor="emerald"
                class="scale-110"
              />
            </label>

            <label class="flex items-center justify-between cursor-pointer p-4 bg-gray-750/50 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-all transform hover:scale-[1.01] duration-200">
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-speaker-wave" class="h-5 w-5 text-green-400" />
                <div>
                  <span class="text-white font-medium">Lectores de pantalla</span>
                  <p class="text-sm text-gray-400">Optimizado para lectores de pantalla</p>
                </div>
              </div>
              <UToggle
                v-model="configuracionAccesibilidad.lectorPantalla"
                @change="$emit('cambios')"
                activeColor="emerald"
                class="scale-110"
              />
            </label>
          </div>

          <!-- Tamaño de fuente -->
          <div class="bg-gray-750/50 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <label class="flex items-center text-sm font-medium text-gray-300 mb-4">
              <UIcon name="i-heroicons-adjustments-horizontal" class="mr-2 h-4 w-4 text-green-400" />
              Tamaño de fuente
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label 
                v-for="tamano in opcionesTamanoFuente" 
                :key="tamano.value"
                class="relative flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all transform hover:scale-105 duration-200"
                :class="configuracionAccesibilidad.tamanoFuente === tamano.value 
                  ? 'border-green-500 bg-green-900/20 text-green-300' 
                  : 'border-gray-600 hover:border-gray-500 text-gray-300'"
              >
                <input
                  type="radio"
                  :value="tamano.value"
                  v-model="configuracionAccesibilidad.tamanoFuente"
                  class="sr-only"
                  @change="$emit('cambios')"
                />
                <span class="font-medium mb-1" :style="{ fontSize: tamano.ejemplo }">Aa</span>
                <span class="text-xs">{{ tamano.label }}</span>
                <UIcon 
                  v-if="configuracionAccesibilidad.tamanoFuente === tamano.value"
                  name="i-heroicons-check-circle" 
                  class="h-4 w-4 text-green-400 absolute top-1 right-1" 
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista previa en tiempo real -->
    <div class="bg-gray-800/80 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm relative overflow-hidden">
      <!-- Decoración de fondo con tonos verdes -->
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 rounded-full blur-2xl"></div>
      <div class="absolute -bottom-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div class="relative z-10">
        <!-- Header con gradiente verde -->
        <div class="flex items-center mb-6">
          <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-3">
            <UIcon name="i-heroicons-eye" class="h-5 w-5 text-white" />
          </div>
          <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Vista Previa</h2>
        </div>
        
        <div class="bg-gray-750/50 rounded-xl p-6 border border-gray-700/50">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Formato de fecha y hora -->
            <div>
              <h3 class="text-white font-medium mb-4 flex items-center">
                <UIcon name="i-heroicons-cog-6-tooth" class="h-4 w-4 mr-2 text-green-400" />
                Formatos
              </h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between bg-gray-800/40 p-2.5 rounded-lg">
                  <span class="text-gray-300">Fecha:</span>
                  <span class="text-white font-mono">{{ formatearFechaEjemplo() }}</span>
                </div>
                <div class="flex justify-between bg-gray-800/40 p-2.5 rounded-lg">
                  <span class="text-gray-300">Hora:</span>
                  <span class="text-white font-mono">{{ formatearHoraEjemplo() }}</span>
                </div>
                <div class="flex justify-between bg-gray-800/40 p-2.5 rounded-lg">
                  <span class="text-gray-300">Moneda:</span>
                  <span class="text-white font-mono">{{ formatearMonedaEjemplo() }}</span>
                </div>
                <div class="flex justify-between bg-gray-800/40 p-2.5 rounded-lg">
                  <span class="text-gray-300">Zona horaria:</span>
                  <span class="text-white">{{ formulario.zonaHoraria }}</span>
                </div>
              </div>
            </div>

            <!-- Configuración aplicada -->
            <div>
              <h3 class="text-white font-medium mb-4 flex items-center">
                <UIcon name="i-heroicons-check-badge" class="h-4 w-4 mr-2 text-green-400" />
                Configuración Activa
              </h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between bg-gray-800/40 p-2.5 rounded-lg">
                  <span class="text-gray-300">Idioma:</span>
                  <span class="text-white">{{ getIdiomaLabel() }}</span>
                </div>
                <div class="flex justify-between bg-gray-800/40 p-2.5 rounded-lg">
                  <span class="text-gray-300">Alto contraste:</span>
                  <span class="flex items-center space-x-1" :class="configuracionAccesibilidad.altoContraste ? 'text-green-400' : 'text-red-400'">
                    <UIcon :name="configuracionAccesibilidad.altoContraste ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="h-4 w-4" />
                    <span>{{ configuracionAccesibilidad.altoContraste ? 'Activado' : 'Desactivado' }}</span>
                  </span>
                </div>
                <div class="flex justify-between bg-gray-800/40 p-2.5 rounded-lg">
                  <span class="text-gray-300">Tamaño fuente:</span>
                  <span class="text-white capitalize">{{ configuracionAccesibilidad.tamanoFuente }}</span>
                </div>
                <div class="flex justify-between bg-gray-800/40 p-2.5 rounded-lg">
                  <span class="text-gray-300">Análisis de uso:</span>
                  <span class="flex items-center space-x-1" :class="configuracionPrivacidad.analisisUso ? 'text-green-400' : 'text-red-400'">
                    <UIcon :name="configuracionPrivacidad.analisisUso ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="h-4 w-4" />
                    <span>{{ configuracionPrivacidad.analisisUso ? 'Permitido' : 'Bloqueado' }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botones de acción con gradientes verdes -->
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
import type { ConfiguracionGeneral } from '~/types/configuraciones';

const props = defineProps<{
  configuracion?: ConfiguracionGeneral | null;
  cargando: boolean;
}>();

const emit = defineEmits<{
  actualizar: [general: Partial<ConfiguracionGeneral>];
  cambios: [];
}>();

// Estado del formulario
const formulario = ref<Partial<ConfiguracionGeneral>>({
  idioma: 'es',
  zonaHoraria: 'Europe/Madrid',
  formatoFecha: 'dd/mm/yyyy',
  formatoHora: '24h',
  moneda: 'EUR'
});

// Configuraciones adicionales
const configuracionPrivacidad = ref({
  perfilesPrivados: false,
  analisisUso: true,
  estadisticasPublicas: true,
  retencionLogs: 12,
  retencionVoluntarios: 24
});

const configuracionAccesibilidad = ref({
  altoContraste: false,
  lectorPantalla: false,
  tamanoFuente: 'normal'
});

// Opciones
const opcionesIdioma = [
  { label: 'Español', value: 'es' },
  { label: 'English', value: 'en' },
  { label: 'Português', value: 'pt' }
];

const opcionesZonaHoraria = [
  { label: 'Europa/Madrid', value: 'Europe/Madrid' },
  { label: 'Europa/Londres', value: 'Europe/London' },
  { label: 'América/Nueva_York', value: 'America/New_York' },
  { label: 'América/Los_Ángeles', value: 'America/Los_Angeles' },
  { label: 'América/Buenos_Aires', value: 'America/Buenos_Aires' },
  { label: 'América/México', value: 'America/Mexico_City' },
  { label: 'América/São_Paulo', value: 'America/Sao_Paulo' }
];

const opcionesFormatoFecha = [
  { label: 'DD/MM/YYYY', value: 'dd/mm/yyyy' },
  { label: 'MM/DD/YYYY', value: 'mm/dd/yyyy' },
  { label: 'YYYY-MM-DD', value: 'yyyy-mm-dd' }
];

const opcionesFormatoHora = [
  { label: '24 horas (14:30)', value: '24h' },
  { label: '12 horas (2:30 PM)', value: '12h' }
];

const opcionesMoneda = [
  { label: 'Euro (EUR)', value: 'EUR' },
  { label: 'Dólar estadounidense (USD)', value: 'USD' },
  { label: 'Peso argentino (ARS)', value: 'ARS' },
  { label: 'Peso mexicano (MXN)', value: 'MXN' },
  { label: 'Real brasileño (BRL)', value: 'BRL' },
  { label: 'Libra esterlina (GBP)', value: 'GBP' }
];

const opcionesTamanoFuente = [
  { label: 'Pequeño', value: 'pequeno', ejemplo: '12px' },
  { label: 'Normal', value: 'normal', ejemplo: '14px' },
  { label: 'Grande', value: 'grande', ejemplo: '16px' },
  { label: 'Extra', value: 'extra', ejemplo: '18px' }
];

// Métodos para formato
const formatearFechaEjemplo = () => {
  const fecha = new Date();
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const ano = fecha.getFullYear();

  switch (formulario.value.formatoFecha) {
    case 'dd/mm/yyyy':
      return `${dia}/${mes}/${ano}`;
    case 'mm/dd/yyyy':
      return `${mes}/${dia}/${ano}`;
    case 'yyyy-mm-dd':
      return `${ano}-${mes}-${dia}`;
    default:
      return `${dia}/${mes}/${ano}`;
  }
};

const formatearHoraEjemplo = () => {
  const fecha = new Date();
  return formulario.value.formatoHora === '12h' 
    ? fecha.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const formatearMonedaEjemplo = () => {
  const cantidad = 1234.56;
  const formatoMoneda = {
    EUR: '€1.234,56',
    USD: '$1,234.56',
    ARS: '$1.234,56',
    MXN: '$1,234.56',
    BRL: 'R$1.234,56',
    GBP: '£1,234.56'
  };
  return formatoMoneda[formulario.value.moneda as keyof typeof formatoMoneda] || '€1.234,56';
};

const getIdiomaLabel = () => {
  const idioma = opcionesIdioma.find(opt => opt.value === formulario.value.idioma);
  return idioma?.label || 'Español';
};

// Watchers
watch(() => props.configuracion, (nueva) => {
  if (nueva) {
    formulario.value = { ...nueva };
  }
}, { immediate: true });

// Métodos
const guardarCambios = async () => {
  const configuracionCompleta = {
    ...formulario.value,
    privacidad: configuracionPrivacidad.value,
    accesibilidad: configuracionAccesibilidad.value
  };
  
  emit('actualizar', configuracionCompleta);
};

const resetearFormulario = () => {
  if (props.configuracion) {
    formulario.value = { ...props.configuracion };
  }
  // Restablecer configuraciones adicionales
  configuracionPrivacidad.value = {
    perfilesPrivados: false,
    analisisUso: true,
    estadisticasPublicas: true,
    retencionLogs: 12,
    retencionVoluntarios: 24
  };
  configuracionAccesibilidad.value = {
    altoContraste: false,
    lectorPantalla: false,
    tamanoFuente: 'normal'
  };
};

onMounted(() => {
  if (props.configuracion) {
    formulario.value = { ...props.configuracion };
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

:deep(.u-select) {
  border-radius: 0.5rem;
  background-color: rgba(55, 65, 81, 0.7);
  backdrop-filter: blur(4px);
  border-color: rgba(75, 85, 99, 0.7);
  color: #E5E7EB;
  transition: all 0.3s ease;
}

:deep(.u-select:focus) {
  border-color: #10B981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
  background-color: rgba(55, 65, 81, 0.9);
}

/* Personalización de toggle */
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