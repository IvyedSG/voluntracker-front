<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Configuraciones</h1>
        <p class="text-gray-400 mt-1">Personaliza tu organización y ajusta las preferencias del sistema</p>
      </div>
      
      <div v-if="cambiosPendientes" class="flex items-center space-x-3">
        <span class="text-sm text-yellow-400 flex items-center">
          <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4 mr-1" />
          Cambios sin guardar
        </span>
      </div>
    </div>

    <!-- Navegación de tabs -->
    <div class="border-b border-gray-700">
      <nav class="flex space-x-8 overflow-x-auto">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="tabActivo = tab.id as typeof tabActivo.value"
          class="py-4 px-1 border-b-2 text-sm font-medium transition-colors flex items-center whitespace-nowrap"
          :class="tabActivo === tab.id 
            ? 'border-purple-500 text-purple-400' 
            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'"
        >
          <UIcon :name="tab.icon" class="h-4 w-4 mr-2" />
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Loading state -->
    <div v-if="cargando" class="flex items-center justify-center h-96">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p class="text-gray-400">Cargando configuraciones...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-900/20 border border-red-800/30 rounded-lg p-6">
      <div class="flex items-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-red-400 mr-3" />
        <div>
          <h3 class="text-red-400 font-medium">Error al cargar configuraciones</h3>
          <p class="text-red-300/70 text-sm mt-1">{{ error }}</p>
          <button 
            @click="recargarConfiguraciones"
            class="mt-3 px-4 py-2 bg-red-800/30 hover:bg-red-700/40 text-red-300 rounded-lg text-sm transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido de configuraciones -->
    <div v-else class="space-y-6">
      <!-- Tab: Organización -->
      <div v-if="tabActivo === 'organizacion'">
        <configuracion-organizacion
          :datos="datosOrganizacion"
          :cargando="guardandoOrganizacion"
          @actualizar="actualizarOrganizacion"
          @cambios="marcarCambios"
        />
      </div>

      <!-- Tab: Branding -->
      <div v-if="tabActivo === 'branding'">
        <configuracion-branding
          :configuracion="configuracionBranding"
          :cargando="guardandoBranding"
          @actualizar="actualizarBranding"
          @cambios="marcarCambios"
        />
      </div>

      <!-- Tab: Seguridad -->
      <div v-if="tabActivo === 'seguridad'">
        <configuracion-seguridad
          :configuracion="configuracionSeguridad"
          :roles="roles || []"
          :cargando="guardandoSeguridad" 
          @actualizar="actualizarSeguridad"
          @crear-rol="crearRol"
          @cambios="marcarCambios"
        />
      </div>

      <!-- Tab: Notificaciones -->
      <div v-if="tabActivo === 'notificaciones'">
        <configuracion-notificaciones
          :configuracion="configuracionNotificaciones"
          :cargando="guardandoNotificaciones"
          @actualizar="actualizarNotificaciones"
          @cambios="marcarCambios"
        />
      </div>

      <!-- Tab: General -->
      <div v-if="tabActivo === 'general'">
        <configuracion-general
          :configuracion="configuracionGeneral"
          :cargando="guardandoGeneral"
          @actualizar="actualizarGeneral"
          @cambios="marcarCambios"
        />
      </div>

      <!-- Tab: Tenant -->
      <div v-if="tabActivo === 'tenant'">
        <configuracion-tenant
          :configuracion="configuracionTenant"
          :cargando="cargando"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useConfiguracionesStore } from '~/stores/configuracionesStore';
import type { 
  DatosOrganizacion, 
  Rol,
  ConfiguracionBranding as ConfiguracionBrandingType,
  ConfiguracionSeguridad as ConfiguracionSeguridadType,
  ConfiguracionNotificaciones as ConfiguracionNotificacionesType,
  ConfiguracionGeneral as ConfiguracionGeneralType
} from '~/types/configuraciones';

// Importación explícita de componentes
import ConfiguracionOrganizacion from '~/components/configuracion/configuracionOrganizacion.vue';
import ConfiguracionBranding from '~/components/configuracion/configuracionBranding.vue';
import ConfiguracionSeguridad from '~/components/configuracion/configuracionSeguridad.vue';
import ConfiguracionNotificaciones from '~/components/configuracion/configuracionNotificaciones.vue';
import ConfiguracionGeneral from '~/components/configuracion/configuracionGeneral.vue';
import ConfiguracionTenant from '~/components/configuracion/configuracionTenant.vue';

definePageMeta({ layout: "tenants" });

// Store
const configuracionesStore = useConfiguracionesStore();
const toast = useToast();

// Estado local
const tabActivo = ref<'organizacion' | 'branding' | 'seguridad' | 'notificaciones' | 'general' | 'tenant'>('organizacion');

// Computed del store
const cargando = computed(() => configuracionesStore.cargando);
const error = computed(() => configuracionesStore.error);
const cambiosPendientes = computed(() => configuracionesStore.cambiosPendientes);
const datosOrganizacion = computed(() => configuracionesStore.datosOrganizacion);
const configuracionBranding = computed(() => configuracionesStore.configuracionBranding);
const configuracionSeguridad = computed(() => configuracionesStore.configuracionSeguridad);
const configuracionNotificaciones = computed(() => configuracionesStore.configuracionNotificaciones);
const configuracionGeneral = computed(() => configuracionesStore.configuracionGeneral);
const configuracionTenant = computed(() => configuracionesStore.configuracionTenant);
const roles = computed(() => configuracionesStore.roles);
const guardandoOrganizacion = computed(() => configuracionesStore.guardandoOrganizacion);
const guardandoBranding = computed(() => configuracionesStore.guardandoBranding);
const guardandoSeguridad = computed(() => configuracionesStore.guardandoSeguridad);
const guardandoNotificaciones = computed(() => configuracionesStore.guardandoNotificaciones);
const guardandoGeneral = computed(() => configuracionesStore.guardandoGeneral);

// Tabs de navegación
const tabs = [
  { id: 'organizacion', label: 'Organización', icon: 'i-heroicons-building-office' },
  { id: 'branding', label: 'Branding', icon: 'i-heroicons-paint-brush' },
  { id: 'seguridad', label: 'Seguridad', icon: 'i-heroicons-shield-check' },
  { id: 'notificaciones', label: 'Notificaciones', icon: 'i-heroicons-bell' },
  { id: 'general', label: 'General', icon: 'i-heroicons-cog-6-tooth' },
  { id: 'tenant', label: 'Suscripción', icon: 'i-heroicons-credit-card' }
];

// Métodos
const recargarConfiguraciones = async () => {
  try {
    await configuracionesStore.cargarConfiguraciones();
  } catch (err) {
    console.error('Error al recargar configuraciones:', err);
  }
};

const actualizarOrganizacion = async (datos: Partial<DatosOrganizacion>) => {
  try {
    await configuracionesStore.actualizarOrganizacion(datos);
    configuracionesStore.limpiarCambiosPendientes();
    toast.add({
      title: 'Organización actualizada',
      description: 'Los datos de la organización se han guardado correctamente',
      color: 'success'
    });
  } catch (err: any) {
    toast.add({
      title: 'Error al actualizar',
      description: err.message || 'No se pudieron guardar los cambios',
      color: 'error'
    });
  }
};

const actualizarBranding = async (branding: Partial<ConfiguracionBrandingType>) => {
  try {
    await configuracionesStore.actualizarBranding(branding);
    configuracionesStore.limpiarCambiosPendientes();
    toast.add({
      title: 'Branding actualizado',
      description: 'La configuración de marca se ha guardado correctamente',
      color: 'success'
    });
  } catch (err: any) {
    toast.add({
      title: 'Error al actualizar',
      description: err.message || 'No se pudieron guardar los cambios',
      color: 'error'
    });
  }
};

const actualizarSeguridad = async (seguridad: Partial<ConfiguracionSeguridadType>) => {
  try {
    await configuracionesStore.actualizarSeguridad(seguridad);
    configuracionesStore.limpiarCambiosPendientes();
    toast.add({
      title: 'Seguridad actualizada',
      description: 'La configuración de seguridad se ha guardado correctamente',
      color: 'success'
    });
  } catch (err: any) {
    toast.add({
      title: 'Error al actualizar',
      description: err.message || 'No se pudieron guardar los cambios',
      color: 'error'
    });
  }
};

const actualizarNotificaciones = async (notificaciones: Partial<ConfiguracionNotificacionesType>) => {
  try {
    await configuracionesStore.actualizarNotificaciones(notificaciones);
    configuracionesStore.limpiarCambiosPendientes();
    toast.add({
      title: 'Notificaciones actualizadas',
      description: 'La configuración de notificaciones se ha guardado correctamente',
      color: 'success'
    });
  } catch (err: any) {
    toast.add({
      title: 'Error al actualizar',
      description: err.message || 'No se pudieron guardar los cambios',
      color: 'error'
    });
  }
};

const actualizarGeneral = async (general: Partial<ConfiguracionGeneralType>) => {
  try {
    await configuracionesStore.actualizarGeneral(general);
    configuracionesStore.limpiarCambiosPendientes();
    toast.add({
      title: 'Configuración actualizada',
      description: 'Las configuraciones generales se han guardado correctamente',
      color: 'success'
    });
  } catch (err: any) {
    toast.add({
      title: 'Error al actualizar',
      description: err.message || 'No se pudieron guardar los cambios',
      color: 'error'
    });
  }
};

const crearRol = async (rol: Omit<Rol, 'id' | 'usuariosAsignados'>) => {
  try {
    await configuracionesStore.crearRol(rol);
    toast.add({
      title: 'Rol creado',
      description: 'El nuevo rol se ha creado correctamente',
      color: 'success'
    });
  } catch (err: any) {
    toast.add({
      title: 'Error al crear rol',
      description: err.message || 'No se pudo crear el rol',
      color: 'error'
    });
  }
};

const marcarCambios = () => {
  configuracionesStore.marcarCambiosPendientes();
};

// Forzar una carga inicial al montar el componente
onMounted(() => {
  recargarConfiguraciones();
});

// SEO
useSeoMeta({
  title: 'Configuraciones - Voluntracker',
  description: 'Configura tu organización, personaliza el branding y ajusta las preferencias del sistema',
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>