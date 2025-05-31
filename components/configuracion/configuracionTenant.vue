<template>
  <div class="space-y-8">
    <!-- Información del plan actual -->
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
                <UIcon name="i-heroicons-star" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Plan de Suscripción</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Gestiona tu plan y revisa el uso de recursos</p>
          </div>
        </div>

        <!-- Estado de la suscripción -->
        <div class="bg-gray-750/50 border border-gray-700/50 rounded-xl p-6 mb-6 hover:border-green-500/30 transition-all">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <UIcon name="i-heroicons-star" class="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white">Plan {{ configuracion?.planActual }}</h3>
                <div class="flex items-center space-x-3 mt-2">
                  <span 
                    class="px-3 py-1 text-sm rounded-full font-medium"
                    :class="estadoSuscripcionClasses"
                  >
                    {{ estadoSuscripcionTexto }}
                  </span>
                  <span v-if="configuracion?.fechaExpiracion" class="text-sm text-gray-400 flex items-center">
                    <UIcon name="i-heroicons-calendar-days" class="h-4 w-4 mr-1" />
                    Vence el {{ formatearFecha(configuracion.fechaExpiracion) }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="text-right">
              <UButton 
                class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-md hover:shadow-xl transition-all h-11"
                @click="abrirModalActualizarPlan"
              >
                <UIcon name="i-heroicons-arrow-trending-up" class="h-4 w-4 mr-2" />
                Actualizar plan
              </UButton>
            </div>
          </div>

          <!-- Advertencia si el plan está por vencer -->
          <div 
            v-if="diasParaVencimiento && diasParaVencimiento <= 30" 
            class="bg-amber-900/20 border border-amber-800/30 rounded-xl p-4 mb-6"
          >
            <div class="flex items-start space-x-3">
              <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-amber-400 mt-0.5" />
              <div>
                <p class="font-semibold text-amber-400 text-lg">Tu plan vence pronto</p>
                <p class="text-sm text-amber-300/80 mt-2">
                  Tu suscripción vence en {{ diasParaVencimiento }} días. 
                  <button 
                    @click="abrirModalActualizarPlan"
                    class="underline hover:no-underline text-amber-300 font-medium"
                  >
                    Renueva ahora
                  </button> 
                  para evitar interrupciones en el servicio.
                </p>
              </div>
            </div>
          </div>

          <!-- Límites y uso actual -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Usuarios -->
            <div class="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-green-500/30 transition-all">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <UIcon name="i-heroicons-users" class="h-5 w-5 text-green-400 mr-2" />
                  <span class="text-sm font-medium text-gray-300">Usuarios</span>
                </div>
                <span class="text-xs text-gray-500">{{ porcentajeUsuarios.toFixed(1) }}%</span>
              </div>
              <div class="text-center mb-4">
                <span class="text-3xl font-bold text-white">{{ usuariosActuales }}</span>
                <span class="text-gray-400 text-lg">/ {{ configuracion?.limiteUsuarios }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-3 mb-2">
                <div 
                  class="h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                  :class="porcentajeUsuarios > 80 ? 'bg-red-500' : porcentajeUsuarios > 60 ? 'bg-amber-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'"
                  :style="{ width: `${Math.min(porcentajeUsuarios, 100)}%` }"
                >
                  <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Proyectos -->
            <div class="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-green-500/30 transition-all">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <UIcon name="i-heroicons-folder" class="h-5 w-5 text-green-400 mr-2" />
                  <span class="text-sm font-medium text-gray-300">Proyectos</span>
                </div>
                <span class="text-xs text-gray-500">{{ porcentajeProyectos.toFixed(1) }}%</span>
              </div>
              <div class="text-center mb-4">
                <span class="text-3xl font-bold text-white">{{ proyectosActuales }}</span>
                <span class="text-gray-400 text-lg">/ {{ configuracion?.limiteProjetos }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-3 mb-2">
                <div 
                  class="h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                  :class="porcentajeProyectos > 80 ? 'bg-red-500' : porcentajeProyectos > 60 ? 'bg-amber-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'"
                  :style="{ width: `${Math.min(porcentajeProyectos, 100)}%` }"
                >
                  <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Almacenamiento -->
            <div class="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-green-500/30 transition-all">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <UIcon name="i-heroicons-cloud" class="h-5 w-5 text-green-400 mr-2" />
                  <span class="text-sm font-medium text-gray-300">Almacenamiento</span>
                </div>
                <span class="text-xs text-gray-500">{{ porcentajeAlmacenamiento.toFixed(1) }}%</span>
              </div>
              <div class="text-center mb-4">
                <span class="text-3xl font-bold text-white">{{ formatearAlmacenamiento(configuracion?.almacenamientoUsado || 0) }}</span>
                <span class="text-gray-400 text-lg">/ {{ formatearAlmacenamiento(configuracion?.almacenamientoLimite || 0) }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-3 mb-2">
                <div 
                  class="h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                  :class="porcentajeAlmacenamiento > 80 ? 'bg-red-500' : porcentajeAlmacenamiento > 60 ? 'bg-amber-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'"
                  :style="{ width: `${Math.min(porcentajeAlmacenamiento, 100)}%` }"
                >
                  <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Funcionalidades del plan -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-750/50 rounded-xl p-6 border border-gray-700/50 hover:border-green-500/30 transition-all">
            <h4 class="text-lg font-semibold text-white mb-4 flex items-center">
              <UIcon name="i-heroicons-check-badge" class="h-5 w-5 text-green-400 mr-2" />
              Funcionalidades incluidas
            </h4>
            <div class="space-y-3">
              <div 
                v-for="funcionalidad in funcionalidadesIncluidas" 
                :key="funcionalidad.nombre"
                class="flex items-center space-x-3 p-3 bg-green-900/10 rounded-lg border border-green-800/20"
              >
                <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-green-400" />
                <span class="text-sm text-gray-200">{{ funcionalidad.nombre }}</span>
              </div>
            </div>
          </div>

          <div class="bg-gray-750/50 rounded-xl p-6 border border-gray-700/50 hover:border-amber-500/30 transition-all">
            <h4 class="text-lg font-semibold text-white mb-4 flex items-center">
              <UIcon name="i-heroicons-star" class="h-5 w-5 text-amber-400 mr-2" />
              Próximas funcionalidades
            </h4>
            <div class="space-y-3 mb-4">
              <div 
                v-for="funcionalidad in funcionalidadesProximas" 
                :key="funcionalidad.nombre"
                class="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30"
              >
                <UIcon name="i-heroicons-lock-closed" class="h-5 w-5 text-gray-500" />
                <span class="text-sm text-gray-400">{{ funcionalidad.nombre }}</span>
              </div>
            </div>
            <UButton 
              class="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border-0 shadow-md hover:shadow-xl transition-all"
              @click="abrirModalActualizarPlan"
            >
              <UIcon name="i-heroicons-sparkles" class="h-4 w-4 mr-2" />
              Desbloquear funcionalidades
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Historial de facturación -->
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
                <UIcon name="i-heroicons-document-text" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Historial de Facturación</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Revisa tus facturas y pagos anteriores</p>
          </div>
          <UButton 
            class="text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all border border-gray-700/50"
            variant="outline"
          >
            <UIcon name="i-heroicons-arrow-down-tray" class="h-4 w-4 mr-2" />
            Descargar todas
          </UButton>
        </div>

        <div class="bg-gray-750/50 rounded-xl border border-gray-700/50 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-800/50">
                <tr>
                  <th class="text-left text-sm font-semibold text-gray-300 p-4">Fecha</th>
                  <th class="text-left text-sm font-semibold text-gray-300 p-4">Descripción</th>
                  <th class="text-left text-sm font-semibold text-gray-300 p-4">Estado</th>
                  <th class="text-right text-sm font-semibold text-gray-300 p-4">Monto</th>
                  <th class="text-right text-sm font-semibold text-gray-300 p-4">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700/50">
                <tr 
                  v-for="factura in historicoFacturacion" 
                  :key="factura.id" 
                  class="hover:bg-gray-800/30 transition-colors"
                >
                  <td class="p-4 text-sm text-gray-300">{{ formatearFecha(factura.fecha) }}</td>
                  <td class="p-4 text-sm text-gray-300">{{ factura.descripcion }}</td>
                  <td class="p-4">
                    <span 
                      class="px-3 py-1 text-xs rounded-full font-medium"
                      :class="getEstadoFacturaClasses(factura.estado)"
                    >
                      {{ factura.estado }}
                    </span>
                  </td>
                  <td class="p-4 text-sm text-white text-right font-semibold">€{{ factura.monto.toFixed(2) }}</td>
                  <td class="p-4 text-right">
                    <div class="flex items-center justify-end space-x-2">
                      <UButton size="sm" color="gray" variant="ghost" class="hover:bg-gray-700/50">
                        <UIcon name="i-heroicons-eye" class="h-4 w-4" />
                      </UButton>
                      <UButton size="sm" color="gray" variant="ghost" class="hover:bg-gray-700/50">
                        <UIcon name="i-heroicons-arrow-down-tray" class="h-4 w-4" />
                      </UButton>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Configuración de facturación -->
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
                <UIcon name="i-heroicons-credit-card" class="h-5 w-5 text-white" />
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Configuración de Facturación</h2>
            </div>
            <p class="text-gray-400 text-sm mt-2">Administra tu información de pago y facturación</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Método de pago -->
          <div class="bg-gray-750/50 rounded-xl p-6 border border-gray-700/50 hover:border-green-500/30 transition-all">
            <h4 class="text-lg font-semibold text-white mb-4 flex items-center">
              <UIcon name="i-heroicons-credit-card" class="h-5 w-5 text-green-400 mr-2" />
              Método de pago
            </h4>
            <div class="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center shadow-lg">
                  <span class="text-white text-xs font-bold">VISA</span>
                </div>
                <div class="flex-1">
                  <p class="text-white text-sm font-semibold">•••• •••• •••• 4242</p>
                  <p class="text-gray-400 text-xs">Expira 12/2025</p>
                </div>
                <UButton 
                  size="sm" 
                  class="text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all border border-gray-700/50"
                  variant="outline"
                >
                  Cambiar
                </UButton>
              </div>
            </div>
          </div>

          <!-- Información de facturación -->
          <div class="bg-gray-750/50 rounded-xl p-6 border border-gray-700/50 hover:border-green-500/30 transition-all">
            <h4 class="text-lg font-semibold text-white mb-4 flex items-center">
              <UIcon name="i-heroicons-building-office" class="h-5 w-5 text-green-400 mr-2" />
              Dirección de facturación
            </h4>
            <div class="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
              <div class="space-y-2 text-sm mb-4">
                <p class="text-white font-semibold">Fundación Solidaria</p>
                <p class="text-gray-300">Calle Principal 123</p>
                <p class="text-gray-300">28001 Madrid, España</p>
                <p class="text-gray-300">NIF: B12345678</p>
              </div>
              <UButton 
                size="sm" 
                class="text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all border border-gray-700/50"
                variant="outline"
              >
                Editar
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para actualizar plan mejorado -->
    <UModal v-model="mostrarModalActualizarPlan" :ui="{ width: 'sm:max-w-4xl' }">
      <div class="p-6 bg-gray-800 relative overflow-hidden">
        <!-- Decoración de fondo -->
        <div class="absolute -top-12 -right-12 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
        <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
        
        <div class="relative z-10">
          <h3 class="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text mb-2">
            Actualizar Plan de Suscripción
          </h3>
          <p class="text-gray-400 text-sm mb-6">Elige el plan que mejor se adapte a las necesidades de tu organización</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div 
              v-for="plan in planesDisponibles" 
              :key="plan.id"
              class="border rounded-xl p-6 cursor-pointer transition-all transform hover:scale-105 duration-200"
              :class="planSeleccionado === plan.id 
                ? 'border-green-500 bg-green-900/20 shadow-lg shadow-green-500/20' 
                : 'border-gray-600 hover:border-gray-500 hover:bg-gray-750/50'"
              @click="planSeleccionado = plan.id"
            >
              <div class="text-center mb-4">
                <h4 class="font-semibold text-white text-lg mb-2">{{ plan.nombre }}</h4>
                <div class="mb-2">
                  <span class="text-3xl font-bold text-white">€{{ plan.precio }}</span>
                  <span class="text-gray-400">/mes</span>
                </div>
                <p class="text-sm text-gray-400">{{ plan.descripcion }}</p>
              </div>
              
              <div class="space-y-3">
                <div class="flex items-center text-sm text-gray-300">
                  <UIcon name="i-heroicons-users" class="h-4 w-4 mr-2 text-green-400" />
                  Hasta {{ plan.limiteUsuarios }} usuarios
                </div>
                <div class="flex items-center text-sm text-gray-300">
                  <UIcon name="i-heroicons-folder" class="h-4 w-4 mr-2 text-green-400" />
                  Hasta {{ plan.limiteProjetos }} proyectos
                </div>
                <div class="flex items-center text-sm text-gray-300">
                  <UIcon name="i-heroicons-cloud" class="h-4 w-4 mr-2 text-green-400" />
                  {{ formatearAlmacenamiento(plan.almacenamiento) }} de almacenamiento
                </div>
              </div>
              
              <!-- Indicador de selección -->
              <div 
                v-if="planSeleccionado === plan.id"
                class="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
              >
                <UIcon name="i-heroicons-check" class="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700/50">
            <UButton 
              color="gray" 
              variant="ghost" 
              @click="cerrarModalActualizarPlan"
              class="text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
            >
              Cancelar
            </UButton>
            <UButton 
              class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 shadow-md hover:shadow-xl transition-all"
              @click="actualizarPlan"
            >
              <UIcon name="i-heroicons-arrow-trending-up" class="h-4 w-4 mr-2" />
              Actualizar Plan
            </UButton>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { ConfiguracionTenant } from '~/types/configuraciones';

const props = defineProps<{
  configuracion?: ConfiguracionTenant | null;
  cargando: boolean;
}>();

// Estado local
const mostrarModalActualizarPlan = ref(false);
const planSeleccionado = ref('premium');

// Datos simulados
const usuariosActuales = ref(85);
const proyectosActuales = ref(32);

const historicoFacturacion = ref([
  {
    id: '1',
    fecha: '2024-11-01',
    descripcion: 'Plan Premium - Noviembre 2024',
    estado: 'Pagado',
    monto: 49.99
  },
  {
    id: '2',
    fecha: '2024-10-01',
    descripcion: 'Plan Premium - Octubre 2024',
    estado: 'Pagado',
    monto: 49.99
  },
  {
    id: '3',
    fecha: '2024-09-01',
    descripcion: 'Plan Premium - Septiembre 2024',
    estado: 'Pagado',
    monto: 49.99
  }
]);

const planesDisponibles = ref([
  {
    id: 'basic',
    nombre: 'Básico',
    precio: 19.99,
    descripcion: 'Ideal para organizaciones pequeñas',
    limiteUsuarios: 25,
    limiteProjetos: 10,
    almacenamiento: 5120 // 5GB en MB
  },
  {
    id: 'premium',
    nombre: 'Premium',
    precio: 49.99,
    descripcion: 'Para organizaciones en crecimiento',
    limiteUsuarios: 100,
    limiteProjetos: 50,
    almacenamiento: 10240 // 10GB en MB
  },
  {
    id: 'enterprise',
    nombre: 'Enterprise',
    precio: 99.99,
    descripcion: 'Solución completa para grandes organizaciones',
    limiteUsuarios: 500,
    limiteProjetos: 200,
    almacenamiento: 51200 // 50GB en MB
  }
]);

const funcionalidadesIncluidas = ref([
  { nombre: 'Gestión de voluntarios ilimitados' },
  { nombre: 'Reportes y análisis avanzados' },
  { nombre: 'Notificaciones automáticas' },
  { nombre: 'Integración con calendarios' },
  { nombre: 'Soporte técnico prioritario' }
]);

const funcionalidadesProximas = ref([
  { nombre: 'API avanzada para integraciones' },
  { nombre: 'Análisis predictivo con IA' },
  { nombre: 'Personalización completa de branding' },
  { nombre: 'Módulos de capacitación' }
]);

// Computed properties
const estadoSuscripcionClasses = computed(() => {
  switch (props.configuracion?.estadoSuscripcion) {
    case 'activa':
      return 'bg-green-900/30 text-green-400 border border-green-800/30';
    case 'vencida':
      return 'bg-red-900/30 text-red-400 border border-red-800/30';
    case 'suspendida':
      return 'bg-amber-900/30 text-amber-400 border border-amber-800/30';
    default:
      return 'bg-gray-700 text-gray-300';
  }
});

const estadoSuscripcionTexto = computed(() => {
  switch (props.configuracion?.estadoSuscripcion) {
    case 'activa':
      return 'Activa';
    case 'vencida':
      return 'Vencida';
    case 'suspendida':
      return 'Suspendida';
    default:
      return 'Desconocido';
  }
});

const diasParaVencimiento = computed(() => {
  if (!props.configuracion?.fechaExpiracion) return null;
  
  const fechaExpiracion = new Date(props.configuracion.fechaExpiracion);
  const fechaActual = new Date();
  const diferencia = fechaExpiracion.getTime() - fechaActual.getTime();
  const dias = Math.ceil(diferencia / (1000 * 3600 * 24));
  
  return dias > 0 ? dias : null;
});

const porcentajeUsuarios = computed(() => {
  if (!props.configuracion?.limiteUsuarios) return 0;
  return (usuariosActuales.value / props.configuracion.limiteUsuarios) * 100;
});

const porcentajeProyectos = computed(() => {
  if (!props.configuracion?.limiteProjetos) return 0;
  return (proyectosActuales.value / props.configuracion.limiteProjetos) * 100;
});

const porcentajeAlmacenamiento = computed(() => {
  if (!props.configuracion?.almacenamientoLimite) return 0;
  return ((props.configuracion.almacenamientoUsado || 0) / props.configuracion.almacenamientoLimite) * 100;
});

// Métodos
const formatearFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatearAlmacenamiento = (mb: number) => {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)} GB`;
  }
  return `${mb} MB`;
};

const getEstadoFacturaClasses = (estado: string) => {
  switch (estado.toLowerCase()) {
    case 'pagado':
      return 'bg-green-900/30 text-green-400 border border-green-800/30';
    case 'pendiente':
      return 'bg-amber-900/30 text-amber-400 border border-amber-800/30';
    case 'vencido':
      return 'bg-red-900/30 text-red-400 border border-red-800/30';
    default:
      return 'bg-gray-700 text-gray-300';
  }
};

const abrirModalActualizarPlan = () => {
  mostrarModalActualizarPlan.value = true;
  planSeleccionado.value = props.configuracion?.planActual.toLowerCase() || 'premium';
};

const cerrarModalActualizarPlan = () => {
  mostrarModalActualizarPlan.value = false;
};

const actualizarPlan = () => {
  console.log('Actualizando a plan:', planSeleccionado.value);
  cerrarModalActualizarPlan();
};

onMounted(() => {
  // Inicialización si es necesaria
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

/* Mejora de barras de progreso */
.progress-bar {
  position: relative;
  overflow: hidden;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
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

/* Efectos para modal */
.modal-card {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.98));
  backdrop-filter: blur(20px);
}
</style>