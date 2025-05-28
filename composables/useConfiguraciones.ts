import { ref, computed } from 'vue';
import type { 
  ConfiguracionCompleta, 
  DatosOrganizacion, 
  ConfiguracionBranding,
  ConfiguracionSeguridad,
  ConfiguracionNotificaciones,
  ConfiguracionGeneral,
  ConfiguracionTenant,
  Rol 
} from '~/types/configuraciones';
import { configuracionesCompletas } from '~/mocks/configuraciones';

export const useConfiguraciones = () => {
  const cargando = ref(false);
  const error = ref<string | null>(null);
  const configuraciones = ref<ConfiguracionCompleta | null>(null);

  // Estados específicos
  const guardandoOrganizacion = ref(false);
  const guardandoBranding = ref(false);
  const guardandoSeguridad = ref(false);
  const guardandoNotificaciones = ref(false);
  const guardandoGeneral = ref(false);

  // Getters computados
  const datosOrganizacion = computed(() => configuraciones.value?.organizacion);
  const configuracionBranding = computed(() => configuraciones.value?.branding);
  const configuracionSeguridad = computed(() => configuraciones.value?.seguridad);
  const configuracionNotificaciones = computed(() => configuraciones.value?.notificaciones);
  const configuracionGeneral = computed(() => configuraciones.value?.general);
  const configuracionTenant = computed(() => configuraciones.value?.tenant);
  const roles = computed(() => configuraciones.value?.roles || []);

  // Validaciones
  const validarDatosOrganizacion = (datos: Partial<DatosOrganizacion>): string[] => {
    const errores: string[] = [];
    
    if (!datos.nombre?.trim()) {
      errores.push('El nombre de la organización es requerido');
    }
    
    if (!datos.email?.trim()) {
      errores.push('El email de contacto es requerido');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
      errores.push('El email no tiene un formato válido');
    }
    
    if (datos.sitioWeb && !/^https?:\/\/.+/.test(datos.sitioWeb)) {
      errores.push('La URL del sitio web debe comenzar con http:// o https://');
    }
    
    return errores;
  };

  const validarConfiguracionSeguridad = (config: Partial<ConfiguracionSeguridad>): string[] => {
    const errores: string[] = [];
    
    if (config.tiempoSesion && (config.tiempoSesion < 30 || config.tiempoSesion > 1440)) {
      errores.push('El tiempo de sesión debe estar entre 30 y 1440 minutos');
    }
    
    if (config.politicaContrasena?.longitudMinima && 
        (config.politicaContrasena.longitudMinima < 6 || config.politicaContrasena.longitudMinima > 32)) {
      errores.push('La longitud mínima de contraseña debe estar entre 6 y 32 caracteres');
    }
    
    if (config.intentosMaximos && (config.intentosMaximos < 1 || config.intentosMaximos > 10)) {
      errores.push('Los intentos máximos deben estar entre 1 y 10');
    }
    
    return errores;
  };

  // Acciones principales
  const cargarConfiguraciones = async (): Promise<void> => {
    cargando.value = true;
    error.value = null;

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 800));
      configuraciones.value = { ...configuracionesCompletas };
    } catch (err: any) {
      error.value = err.message || 'Error al cargar las configuraciones';
      throw err;
    } finally {
      cargando.value = false;
    }
  };

  const actualizarOrganizacion = async (datos: Partial<DatosOrganizacion>): Promise<void> => {
    if (!configuraciones.value) throw new Error('No hay configuraciones cargadas');
    
    // Validar datos
    const errores = validarDatosOrganizacion(datos);
    if (errores.length > 0) {
      throw new Error(errores.join(', '));
    }

    guardandoOrganizacion.value = true;
    error.value = null;

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      configuraciones.value.organizacion = {
        ...configuraciones.value.organizacion,
        ...datos
      };
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar datos de organización';
      throw err;
    } finally {
      guardandoOrganizacion.value = false;
    }
  };

  const actualizarBranding = async (branding: Partial<ConfiguracionBranding>): Promise<void> => {
    if (!configuraciones.value) throw new Error('No hay configuraciones cargadas');

    guardandoBranding.value = true;
    error.value = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      configuraciones.value.branding = {
        ...configuraciones.value.branding,
        ...branding
      };
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar branding';
      throw err;
    } finally {
      guardandoBranding.value = false;
    }
  };

  const actualizarSeguridad = async (seguridad: Partial<ConfiguracionSeguridad>): Promise<void> => {
    if (!configuraciones.value) throw new Error('No hay configuraciones cargadas');
    
    // Validar configuración de seguridad
    const errores = validarConfiguracionSeguridad(seguridad);
    if (errores.length > 0) {
      throw new Error(errores.join(', '));
    }

    guardandoSeguridad.value = true;
    error.value = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      configuraciones.value.seguridad = {
        ...configuraciones.value.seguridad,
        ...seguridad
      };
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar seguridad';
      throw err;
    } finally {
      guardandoSeguridad.value = false;
    }
  };

  const actualizarNotificaciones = async (notificaciones: Partial<ConfiguracionNotificaciones>): Promise<void> => {
    if (!configuraciones.value) throw new Error('No hay configuraciones cargadas');

    guardandoNotificaciones.value = true;
    error.value = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      configuraciones.value.notificaciones = {
        ...configuraciones.value.notificaciones,
        ...notificaciones
      };
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar notificaciones';
      throw err;
    } finally {
      guardandoNotificaciones.value = false;
    }
  };

  const actualizarGeneral = async (general: Partial<ConfiguracionGeneral>): Promise<void> => {
    if (!configuraciones.value) throw new Error('No hay configuraciones cargadas');

    guardandoGeneral.value = true;
    error.value = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      configuraciones.value.general = {
        ...configuraciones.value.general,
        ...general
      };
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar configuración general';
      throw err;
    } finally {
      guardandoGeneral.value = false;
    }
  };

  const crearRol = async (nuevoRol: Omit<Rol, 'id' | 'usuariosAsignados'>): Promise<void> => {
    if (!configuraciones.value) throw new Error('No hay configuraciones cargadas');

    cargando.value = true;
    error.value = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const rol: Rol = {
        ...nuevoRol,
        id: `rol-${Date.now()}`,
        usuariosAsignados: 0
      };
      
      configuraciones.value.roles.push(rol);
    } catch (err: any) {
      error.value = err.message || 'Error al crear rol';
      throw err;
    } finally {
      cargando.value = false;
    }
  };

  const eliminarRol = async (rolId: string): Promise<void> => {
    if (!configuraciones.value) throw new Error('No hay configuraciones cargadas');

    const rol = configuraciones.value.roles.find(r => r.id === rolId);
    if (!rol) throw new Error('Rol no encontrado');
    if (!rol.esPersonalizado) throw new Error('No se pueden eliminar roles del sistema');
    if (rol.usuariosAsignados > 0) throw new Error('No se puede eliminar un rol con usuarios asignados');

    cargando.value = true;
    error.value = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      configuraciones.value.roles = configuraciones.value.roles.filter(r => r.id !== rolId);
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar rol';
      throw err;
    } finally {
      cargando.value = false;
    }
  };

  // Utilidades
  const exportarConfiguraciones = async (): Promise<Blob> => {
    if (!configuraciones.value) throw new Error('No hay configuraciones para exportar');

    const configuracionesExport = {
      ...configuraciones.value,
      exportadoEn: new Date().toISOString(),
      version: '1.0'
    };

    const jsonString = JSON.stringify(configuracionesExport, null, 2);
    return new Blob([jsonString], { type: 'application/json' });
  };

  const resetearConfiguraciones = async (): Promise<void> => {
    cargando.value = true;
    error.value = null;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      configuraciones.value = { ...configuracionesCompletas };
    } catch (err: any) {
      error.value = err.message || 'Error al resetear configuraciones';
      throw err;
    } finally {
      cargando.value = false;
    }
  };

  return {
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
    resetearConfiguraciones,
    validarDatosOrganizacion,
    validarConfiguracionSeguridad
  };
};