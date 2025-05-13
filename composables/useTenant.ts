import { useTenantStore } from '~/stores/tenantStore'
import type { 
  Tenant, 
  NewTenant, 
  TenantErrors, 
  TenantFilters,
  ApiResponse,
  TenantStats
} from '~/types/tenant'

// Re-exportar los tipos para mantener compatibilidad
export type { 
  Tenant, 
  NewTenant, 
  TenantErrors, 
  TenantFilters,
  ApiResponse,
  TenantStats
}

export function useTenant() {
  const tenantStore = useTenantStore()
  
  return {
    // Constantes y opciones
    TENANT_DOMAIN: tenantStore.TENANT_DOMAIN,
    DEFAULT_COLOR: tenantStore.DEFAULT_COLOR,
    planOptions: tenantStore.planOptions,
    statusOptions: tenantStore.statusOptions,
    predefinedColors: tenantStore.predefinedColors,
    
    // Estado
    get tenants() { return tenantStore.tenants },
    get isLoading() { return tenantStore.isLoading },
    get error() { return tenantStore.error },
    get tenantsStats() { return tenantStore.tenantsStats },
    
    // Utilidades
    formatSubdomain: tenantStore.formatSubdomain,
    formatDate: tenantStore.formatDate,
    getPlanColor: tenantStore.getPlanColor,
    getPlanIcon: tenantStore.getPlanIcon,
    getPlanDescription: tenantStore.getPlanDescription,
    getPlanOrganizers: tenantStore.getPlanOrganizers,
    
    // Validación
    validateName: tenantStore.validateName,
    validateSubdomain: tenantStore.validateSubdomain,
    validateEmail: tenantStore.validateEmail,
    validateTenantForm: tenantStore.validateTenantForm,
    isTenantFormValid: tenantStore.isTenantFormValid,
    
    // Operaciones CRUD
    fetchTenants: tenantStore.fetchTenants,
    createTenant: tenantStore.createTenant,
    updateTenant: tenantStore.updateTenant,
    deleteTenant: tenantStore.deleteTenant,
    toggleTenantStatus: tenantStore.toggleTenantStatus,
  }
}