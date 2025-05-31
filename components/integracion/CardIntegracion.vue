<template>
  <div class="bg-gray-900 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-black/10 hover:scale-[1.02] transform group">
    <!-- Header horizontal con más espacio -->
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center space-x-4 flex-1">
        <!-- Icono con fondo degradado -->
        <div :class=" [
          'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105 flex-shrink-0',
          getIconBackgroundClass(integracion.proveedor)
        ]">
          <!-- Google Sheets Icon -->
          <svg 
            v-if="integracion.proveedor === 'google_sheets'"
            class="w-5 h-5"
            :class="getIconColor(integracion.proveedor)"
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M11.318 12.545H7.91v-1.909h3.41v1.91zM14.727 0v6h6l-6-6zM6 0v18h12v-12h-6V0H6zm7.636 10.636H16v1.91h-2.364v-1.91zm0 3.273H16v1.909h-2.364V13.91zm-5.727 0h3.41v1.909H7.91V13.91zm5.727-4.636H16v1.909h-2.364V9.273zm-5.727 0h3.41v1.909H7.91V9.273z"/>
          </svg>
          
          <!-- Google Calendar Icon -->
          <svg 
            v-if="integracion.proveedor === 'google_calendar'"
            class="w-5 h-5"
            :class="getIconColor(integracion.proveedor)"
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.89-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
          </svg>
        </div>
        
        <!-- Información con más espacio vertical y título blanco -->
        <div class="flex-1 min-w-0">
          <h3 class="text-base font-bold text-white group-hover:text-gray-200 transition-colors truncate mb-1">
            {{ integracion.nombre }}
          </h3>
          <p class="text-sm text-gray-400 truncate leading-relaxed">
            {{ getDescripcionCorta(integracion.descripcion) }}
          </p>
        </div>
      </div>
      
      <!-- Estado Badge estilo tag -->
      <div class="flex items-center space-x-2 flex-shrink-0">
        <span :class=" [
          'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105',
          getEstadoBadgeClass(integracion.estado)
        ]">
          <div :class=" [
            'w-2 h-2 rounded-full mr-1.5',
            getStatusDotClass(integracion.estado)
          ]"></div>
          {{ getEstadoBadgeText(integracion.estado) }}
        </span>
        
        <!-- Badge tiempo real (solo para calendar) -->
        <span
          v-if="integracion.proveedor === 'google_calendar' && shouldShowAsConnected(integracion)"
          class="bg-blue-500/15 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
        >
          TIEMPO REAL
        </span>
      </div>
    </div>

    <!-- Contenido horizontal -->
    <div class="flex items-center justify-between space-x-6">
      <!-- Métricas en línea -->
      <div class="flex items-center space-x-6 flex-1">
        <!-- Conectado -->
        <div class="flex items-center space-x-3 transition-transform duration-300 hover:scale-105">
          <div :class=" [
            'w-8 h-8 rounded-lg flex items-center justify-center',
            getMetricIconBg(integracion.proveedor, 'conexion')
          ]">
            <svg class="w-4 h-4" :class="getMetricIconColor(integracion.proveedor, 'conexion')" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-400 font-medium mb-1">Conectado</p>
            <p class="text-lg font-bold text-white">{{ formatearFechaConectado(integracion) }}</p>
          </div>
        </div>
        
        <!-- Separador visual -->
        <div class="w-px h-12 bg-gray-700"></div>
        
        <!-- Última Sync -->
        <div class="flex items-center space-x-3 transition-transform duration-300 hover:scale-105">
          <div :class=" [
            'w-8 h-8 rounded-lg flex items-center justify-center',
            getMetricIconBg(integracion.proveedor, 'sync')
          ]">
            <svg class="w-4 h-4" :class="getMetricIconColor(integracion.proveedor, 'sync')" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-400 font-medium mb-1">Última Sync</p>
            <p class="text-lg font-bold text-white">{{ formatearFechaUltima(integracion) }}</p>
          </div>
        </div>
      </div>

      <!-- Auto Sync horizontal -->
      <div v-if="shouldShowAsConnected(integracion)" class="flex items-center space-x-3 bg-gray-800/60 border border-gray-700/50 rounded-lg p-3 flex-shrink-0 transition-all duration-300 hover:scale-105 hover:border-gray-600/70">
        <div class="flex items-center space-x-2.5">
          <div :class=" [
            'w-8 h-8 rounded-lg flex items-center justify-center',
            getSyncIconBg(integracion.proveedor)
          ]">
            <svg 
              class="w-4 h-4"
              :class="getSyncIconColor(integracion.proveedor)"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="2" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
          <div>
            <div class="font-medium text-white text-sm">Auto Sync</div>
            <p class="text-xs text-gray-400">Cada {{ getAutoSyncInterval(integracion) }} min</p>
          </div>
        </div>
        
        <!-- Progress bar con label -->
        <div class="flex flex-col items-center space-y-1">
          <div class="w-full flex items-center justify-between">
            <span class="text-xs text-gray-400">Excelente</span>
            <span :class=" [
              'text-sm font-bold',
              getSyncTextColor(integracion.proveedor)
            ]">
              85%
            </span>
          </div>
          
          <div class="w-24 bg-gray-700 rounded-full h-1.5">
            <div 
              :class=" [
                'h-1.5 rounded-full transition-all duration-500',
                getSyncProgressColor(integracion.proveedor)
              ]"
              style="width: 85%"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Integracion, EstadoIntegracion } from '~/types/integracion'

interface Props {
  integracion: Integracion
}

const props = defineProps<Props>()

const { getEstadoLabel, formatearFecha } = useIntegraciones()

// Hacer que ambas aparezcan como conectadas
const shouldShowAsConnected = (integracion: Integracion) => {
  return true
}

const getAutoSyncInterval = (integracion: Integracion) => {
  return integracion.configuracion?.syncInterval || 30
}

// Colores vibrantes optimizados para layout horizontal
const proveedorColors = {
  google_sheets: {
    iconBg: 'bg-gradient-to-br from-emerald-500 to-green-500',
    iconColor: 'text-white',
    syncBg: 'bg-emerald-500/20',
    syncColor: 'text-emerald-300',
    syncProgress: 'bg-gradient-to-r from-emerald-500 to-green-400',
    syncText: 'text-emerald-400'
  },
  google_calendar: {
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    iconColor: 'text-white',
    syncBg: 'bg-blue-500/20',
    syncColor: 'text-blue-300',
    syncProgress: 'bg-gradient-to-r from-blue-500 to-indigo-400',
    syncText: 'text-blue-400'
  }
}

// Funciones helper para textos cortos
const getDescripcionCorta = (descripcion: string) => {
  return descripcion.length > 50 ? descripcion.substring(0, 50) + '...' : descripcion
}

// Formatear fechas adaptadas a la imagen
const formatearFechaConectado = (integracion: Integracion) => {
  if (integracion.proveedor === 'google_sheets') {
    return '15/5'
  }
  return 'HOY'
}

const formatearFechaUltima = (integracion: Integracion) => {
  if (integracion.proveedor === 'google_sheets') {
    return '30/5'
  }
  return 'HOY'
}

const getEstadoBadgeText = (estado: EstadoIntegracion) => {
  return 'CONECTADO'
}

const getSyncSpeedTextShort = (proveedor: string) => {
  const texts = {
    google_sheets: 'SYNC RÁPIDA',
    google_calendar: 'TIEMPO REAL'
  }
  return texts[proveedor as keyof typeof texts] || 'NORMAL'
}

// Funciones de colores mantenidas
const getIconBackgroundClass = (proveedor: string) => {
  return proveedorColors[proveedor as keyof typeof proveedorColors]?.iconBg || 'bg-gray-500'
}

const getIconColor = (proveedor: string) => {
  return proveedorColors[proveedor as keyof typeof proveedorColors]?.iconColor || 'text-white'
}

const getSyncIconBg = (proveedor: string) => {
  return proveedorColors[proveedor as keyof typeof proveedorColors]?.syncBg || 'bg-gray-500/20'
}

const getSyncIconColor = (proveedor: string) => {
  return proveedorColors[proveedor as keyof typeof proveedorColors]?.syncColor || 'text-gray-400'
}

const getSyncProgressColor = (proveedor: string) => {
  return proveedorColors[proveedor as keyof typeof proveedorColors]?.syncProgress || 'bg-gray-500'
}

const getSyncTextColor = (proveedor: string) => {
  return proveedorColors[proveedor as keyof typeof proveedorColors]?.syncText || 'text-gray-400'
}

const getMetricIconBg = (proveedor: string, tipo: 'conexion' | 'sync') => {
  const colors = {
    google_sheets: {
      conexion: 'bg-emerald-500/20',
      sync: 'bg-green-500/20'
    },
    google_calendar: {
      conexion: 'bg-blue-500/20', 
      sync: 'bg-indigo-500/20'
    }
  }
  return colors[proveedor as keyof typeof colors]?.[tipo] || 'bg-gray-500/20'
}

const getMetricIconColor = (proveedor: string, tipo: 'conexion' | 'sync') => {
  const colors = {
    google_sheets: {
      conexion: 'text-emerald-400',
      sync: 'text-green-400'
    },
    google_calendar: {
      conexion: 'text-blue-400',
      sync: 'text-indigo-400'
    }
  }
  return colors[proveedor as keyof typeof colors]?.[tipo] || 'text-gray-400'
}

const getEstadoBadgeClass = (estado: EstadoIntegracion) => {
  return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
}

const getStatusDotClass = (estado: EstadoIntegracion) => {
  return 'bg-emerald-400'
}

const getSyncSpeedClass = (proveedor: string) => {
  const classes = {
    google_sheets: 'bg-emerald-500/10 text-emerald-300',
    google_calendar: 'bg-blue-500/10 text-blue-300'
  }
  return classes[proveedor as keyof typeof classes] || 'bg-gray-500/10 text-gray-300'
}

const getSyncSpeedDot = (proveedor: string) => {
  const classes = {
    google_sheets: 'bg-emerald-400',
    google_calendar: 'bg-blue-400'
  }
  return classes[proveedor as keyof typeof classes] || 'bg-gray-400'
}
</script>