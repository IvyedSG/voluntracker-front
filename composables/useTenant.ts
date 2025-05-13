import { ref, computed } from 'vue'
import { fetchMockTenants } from '~/mocks/tenants'

export interface Tenant {
  id: string;
  nombre: string;
  logo: string;
  subdominio: string;
  correo: string;
  fechaCreacion: string;
  plan: string;
  numVoluntarios: number;
  activo: boolean;
  colorPrimario: string;
}

export interface NewTenant {
  nombre: string;
  logo?: string;
  subdominio: string;
  correo: string;
  plan: string;
  colorPrimario?: string;
}

export interface TenantErrors {
  nombre: string;
  subdominio: string;
  correo: string;
}

export interface TenantFilters {
  status: boolean | null;
  plan: string | null;
}

// Interfaces para respuestas de API
export interface SuccessResponse<T = undefined> {
  success: true;
  data?: T;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse<T = undefined> = SuccessResponse<T> | ErrorResponse;

export function useTenant() {
  // ========== CONSTANTES ==========
  
  // Dominio base para todos los tenants
  const TENANT_DOMAIN = '.voluntracker.org'
  
  // Opciones para el selector de planes
  const planOptions = [
    { label: 'Gratuito', value: 'Gratuito' },
    { label: 'Pro', value: 'Pro' },
    { label: 'Premium', value: 'Premium' }
  ]
  
  // Opciones para filtrado por estado
  const statusOptions = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
  ]
  
  // Lista de colores predefinidos
  const predefinedColors = [
    '#0D9488', '#0ea5e9', '#8b5cf6', '#ec4899', '#ef4444',
    '#f97316', '#eab308', '#84cc16', '#14b8a6', '#06b6d4',
    '#3b82f6', '#a855f7', '#d946ef', '#f43f5e', '#10b981'
  ]
  
  // Color por defecto
  const DEFAULT_COLOR = '#0D9488'
  
  // ========== ESTADO GLOBAL ==========
  
  // Estado para la lista de tenants
  const tenants = ref<Tenant[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  // ========== FUNCIONES DE UTILIDAD ==========
  
  // Formatear el subdominio (solo letras minúsculas, números y guiones)
  function formatSubdomain(subdominio: string): string {
    return subdominio
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '') // Eliminar caracteres no permitidos
      .replace(/--+/g, '-'); // Reemplazar múltiples guiones por uno solo
  }
  
  // Formatear fecha
  function formatDate(dateString: string, format: 'long' | 'short' = 'long'): string {
    const date = new Date(dateString);
    
    if (format === 'long') {
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } else {
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).format(date);
    }
  }
  
  // Obtener color según el plan
  function getPlanColor(plan: string): "success" | "warning" | "primary" | "secondary" | "info" | "error" | "neutral" | undefined {
    switch (plan) {
      case 'Premium':
        return 'primary';
      case 'Pro':
        return 'info';
      case 'Gratuito':
        return 'neutral';
      default:
        return 'neutral';
    }
  }
  
  // Obtener icono según el plan
  function getPlanIcon(plan: string): string {
    switch (plan) {
      case 'Premium':
        return 'i-heroicons-star';
      case 'Pro':
        return 'i-heroicons-rocket-launch';
      case 'Gratuito':
        return 'i-heroicons-gift';
      default:
        return 'i-heroicons-gift';
    }
  }
  
  // Obtener descripción según el plan
  function getPlanDescription(plan: string): string {
    switch (plan) {
      case 'Premium':
        return 'Voluntarios ilimitados. Todas las funciones disponibles.';
      case 'Pro':
        return 'Hasta 200 voluntarios. Incluye reportes y API.';
      case 'Gratuito':
        return 'Límite de 50 voluntarios. Sin funciones avanzadas.';
      default:
        return '';
    }
  }
  
  // Obtener número de usuarios organizadores por plan
  function getPlanOrganizers(plan: string): number {
    switch (plan) {
      case 'Premium':
        return 20;
      case 'Pro':
        return 7;
      case 'Gratuito':
        return 1;
      default:
        return 1;
    }
  }
  
  // ========== VALIDACIÓN ==========
  
  // Validar nombre
  function validateName(nombre: string): string {
    if (!nombre.trim()) {
      return 'El nombre es obligatorio';
    } else if (nombre.length < 3) {
      return 'El nombre debe tener al menos 3 caracteres';
    }
    return '';
  }
  
  // Validar subdominio
  function validateSubdomain(subdominio: string, originalSubdomain?: string): string {
    if (!subdominio.trim()) {
      return 'El subdominio es obligatorio';
    } else if (subdominio.length < 3) {
      return 'El subdominio debe tener al menos 3 caracteres';
    } else if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(subdominio)) {
      return 'El subdominio solo puede contener letras minúsculas, números y guiones internos';
    } else if (originalSubdomain && subdominio !== originalSubdomain) {
      // Aquí se podría añadir verificación de disponibilidad del subdominio
    }
    return '';
  }
  
  // Validar correo
  function validateEmail(correo: string): string {
    if (!correo.trim()) {
      return 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return 'Introduce un correo electrónico válido';
    }
    return '';
  }
  
  // Validar formulario completo
  function validateTenantForm(tenant: { nombre: string, subdominio: string, correo: string }, originalSubdomain?: string): TenantErrors {
    const errors: TenantErrors = {
      nombre: validateName(tenant.nombre),
      subdominio: validateSubdomain(tenant.subdominio, originalSubdomain),
      correo: validateEmail(tenant.correo)
    };
    
    return errors;
  }
  
  // Comprobar si el formulario es válido
  function isTenantFormValid(tenant: { nombre: string, subdominio: string, correo: string }, errors: TenantErrors): boolean {
    return (
      tenant.nombre.trim() !== '' &&
      tenant.subdominio.trim() !== '' &&
      tenant.correo.trim() !== '' &&
      !errors.nombre &&
      !errors.subdominio &&
      !errors.correo
    );
  }
  
  // ========== OPERACIONES CRUD ==========
  
  // Cargar datos de tenants
  async function fetchTenants(): Promise<ApiResponse<Tenant[]>> {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Usar la función de mocks para cargar datos
      tenants.value = await fetchMockTenants();
      return {
        success: true,
        data: tenants.value
      };
    } catch (err) {
      console.error('Error al cargar tenants:', err);
      error.value = 'No se pudieron cargar las organizaciones. Intenta de nuevo.';
      return {
        success: false,
        error: 'No se pudieron cargar las organizaciones'
      };
    } finally {
      isLoading.value = false;
    }
  }
  
  // Crear un nuevo tenant
  async function createTenant(newTenant: NewTenant): Promise<ApiResponse<Tenant>> {
    try {
      // Aquí iría la llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Crear nuevo tenant con datos del formulario
      const newTenantData: Tenant = {
        id: Date.now().toString(),
        nombre: newTenant.nombre,
        logo: newTenant.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(newTenant.nombre)}&background=0D9488&color=ffffff`,
        subdominio: newTenant.subdominio,
        correo: newTenant.correo,
        fechaCreacion: new Date().toISOString(),
        plan: newTenant.plan,
        numVoluntarios: 0,
        activo: true,
        colorPrimario: newTenant.colorPrimario || DEFAULT_COLOR
      };
      
      return {
        success: true,
        data: newTenantData
      };
    } catch (err) {
      console.error('Error al crear tenant:', err);
      return {
        success: false,
        error: 'No se pudo crear la organización'
      };
    }
  }
  
  // Actualizar un tenant existente
  async function updateTenant(updatedTenant: Tenant): Promise<ApiResponse<Tenant>> {
    try {
      // Aquí iría la llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        data: updatedTenant
      };
    } catch (err) {
      console.error('Error al actualizar tenant:', err);
      return {
        success: false,
        error: 'No se pudo actualizar la organización'
      };
    }
  }
  
  // Eliminar un tenant
  async function deleteTenant(tenantId: string): Promise<ApiResponse> {
    try {
      // Aquí iría la llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // En una implementación real, usaríamos tenantId para la solicitud
      console.log(`Eliminando tenant con ID: ${tenantId}`);
      
      return {
        success: true
      };
    } catch (err) {
      console.error('Error al eliminar tenant:', err);
      return {
        success: false,
        error: 'No se pudo eliminar la organización'
      };
    }
  }
  
  // Cambiar estado de un tenant (activar/desactivar)
  async function toggleTenantStatus(tenant: Tenant): Promise<ApiResponse<Tenant>> {
    try {
      // Aquí iría la llamada real a la API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        success: true,
        data: { ...tenant, activo: !tenant.activo }
      };
    } catch (err) {
      console.error('Error al cambiar estado del tenant:', err);
      return {
        success: false,
        error: 'No se pudo cambiar el estado de la organización'
      };
    }
  }
  
  // Calcular estadísticas de los tenants
  const tenantsStats = computed(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const activos = tenants.value.filter(t => t.activo).length;
    const nuevosUltimaSemana = tenants.value.filter(t => 
      new Date(t.fechaCreacion) >= oneWeekAgo
    ).length;
    
    const totalVoluntarios = tenants.value.reduce((sum, t) => sum + t.numVoluntarios, 0);
    const promedioVoluntarios = Math.round(totalVoluntarios / (tenants.value.length || 1));
    
    const premium = tenants.value.filter(t => t.plan === 'Premium').length;
    const porcentajePremium = Math.round((premium / tenants.value.length) * 100) || 0;
    
    return {
      activos,
      nuevosUltimaSemana,
      totalVoluntarios,
      promedioVoluntarios,
      premium,
      porcentajePremium
    };
  });
  
  return {
    // Constantes y opciones
    TENANT_DOMAIN,
    DEFAULT_COLOR,
    planOptions,
    statusOptions,
    predefinedColors,
    
    // Estado
    tenants,
    isLoading,
    error,
    tenantsStats,
    
    // Utilidades
    formatSubdomain,
    formatDate,
    getPlanColor,
    getPlanIcon,
    getPlanDescription,
    getPlanOrganizers,
    
    // Validación
    validateName,
    validateSubdomain,
    validateEmail,
    validateTenantForm,
    isTenantFormValid,
    
    // Operaciones CRUD
    fetchTenants,
    createTenant,
    updateTenant,
    deleteTenant,
    toggleTenantStatus,
  };
}