import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useConfiguraciones } from '~/composables/useConfiguraciones';
import type { ConfiguracionCompleta } from '~/types/configuraciones';

export const useConfiguracionesStore = defineStore('configuraciones', () => {
  const {
    // Estado
    cargando,
    error,
    configuraciones,
    guardandoOrganizacion,
    guardandoBranding,
    guardandoSeguridad,
    guardandoNotificaciones,
    guardandoGeneral,
    
    // Getters
    datosOrganizacion,
    configuracionBranding,
    configuracionSeguridad,
    configuracionNotificaciones,
    configuracionGeneral,
    configuracionTenant,
    roles,
    
    // Acciones
    cargarConfiguraciones,
    actualizarOrganizacion,
    actualizarBranding,
    actualizarSeguridad,
    actualizarNotificaciones,
    actualizarGeneral,
    crearRol,
    eliminarRol,
    
    // Utilidades
    exportarConfiguraciones,
    resetearConfiguraciones
  } = useConfiguraciones();

  // Estado adicional específico del store
  const cambiosPendientes = ref(false);

  const marcarCambiosPendientes = () => {
    cambiosPendientes.value = true;
  };

  const limpiarCambiosPendientes = () => {
    cambiosPendientes.value = false;
  };

  // Inicializar datos al crear el store
  cargarConfiguraciones();

  return {
    // Estado
    cargando,
    error,
    configuraciones,
    cambiosPendientes,
    guardandoOrganizacion,
    guardandoBranding,
    guardandoSeguridad,
    guardandoNotificaciones,
    guardandoGeneral,
    
    // Getters
    datosOrganizacion,
    configuracionBranding,
    configuracionSeguridad,
    configuracionNotificaciones,
    configuracionGeneral,
    configuracionTenant,
    roles,
    
    // Acciones
    cargarConfiguraciones,
    actualizarOrganizacion,
    actualizarBranding,
    actualizarSeguridad,
    actualizarNotificaciones,
    actualizarGeneral,
    crearRol,
    eliminarRol,
    marcarCambiosPendientes,
    limpiarCambiosPendientes,
    
    // Utilidades
    exportarConfiguraciones,
    resetearConfiguraciones
  };
});