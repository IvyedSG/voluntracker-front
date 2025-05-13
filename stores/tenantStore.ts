import { defineStore } from 'pinia'
import { fetchMockTenants } from '~/mocks/tenants'

// Importar tipos desde el archivo centralizado
import type { 
  Tenant, 
  NewTenant, 
  TenantErrors, 
  ApiResponse 
} from '~/types/tenant'

export const useTenantStore = defineStore('tenant', {
  state: () => ({
    // Estado
    tenants: [] as Tenant[],
    isLoading: false,
    error: null as string | null,
    
    // Constantes
    TENANT_DOMAIN: '.voluntracker.org',
    DEFAULT_COLOR: '#0D9488',
    
    // Opciones para selectores
    planOptions: [
      { label: 'Gratuito', value: 'Gratuito' },
      { label: 'Pro', value: 'Pro' },
      { label: 'Premium', value: 'Premium' }
    ],
    statusOptions: [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false }
    ],
    predefinedColors: [
      '#0D9488', '#0ea5e9', '#8b5cf6', '#ec4899', '#ef4444',
      '#f97316', '#eab308', '#84cc16', '#14b8a6', '#06b6d4',
      '#3b82f6', '#a855f7', '#d946ef', '#f43f5e', '#10b981'
    ]
  }),
  
  getters: {
    // Calcular estadísticas de los tenants
    tenantsStats: (state) => {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const activos = state.tenants.filter(t => t.activo).length;
      const nuevosUltimaSemana = state.tenants.filter(t => 
        new Date(t.fechaCreacion) >= oneWeekAgo
      ).length;
      
      const totalVoluntarios = state.tenants.reduce((sum, t) => sum + t.numVoluntarios, 0);
      const promedioVoluntarios = Math.round(totalVoluntarios / (state.tenants.length || 1));
      
      const premium = state.tenants.filter(t => t.plan === 'Premium').length;
      const porcentajePremium = Math.round((premium / state.tenants.length) * 100) || 0;
      
      return {
        activos,
        nuevosUltimaSemana,
        totalVoluntarios,
        promedioVoluntarios,
        premium,
        porcentajePremium
      };
    }
  },
  
  actions: {
    // ========== UTILIDADES ==========
    
    // Formatear el subdominio (solo letras minúsculas, números y guiones)
    formatSubdomain(subdominio: string): string {
      return subdominio
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '') // Eliminar caracteres no permitidos
        .replace(/--+/g, '-'); // Reemplazar múltiples guiones por uno solo
    },
    
    // Formatear fecha
    formatDate(dateString: string, format: 'long' | 'short' = 'long'): string {
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
    },
    
    // Obtener color según el plan
    getPlanColor(plan: string): "success" | "warning" | "primary" | "secondary" | "info" | "error" | "neutral" | undefined {
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
    },
    
    // Obtener icono según el plan
    getPlanIcon(plan: string): string {
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
    },
    
    // Obtener descripción según el plan
    getPlanDescription(plan: string): string {
      switch (plan) {
        case 'Premium':
          return '20 usuarios organizadores.';
        case 'Pro':
          return '7 usuarios organizadores.';
        case 'Gratuito':
          return '1 usuario organizador.';
        default:
          return '';
      }
    },
    
    // Obtener número de usuarios organizadores por plan
    getPlanOrganizers(plan: string): number {
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
    },
    
    // Obtener clase de estilo para el texto según el plan
    getPlanTextClass(plan: string): string {
      switch (plan) {
        case 'Premium':
          return 'text-amber-300';
        case 'Pro':
          return 'text-blue-400';
        case 'Gratuito':
        default:
          return 'text-gray-500';
      }
    },
    
    // ========== VALIDACIÓN ==========
    
    // Validar nombre
    validateName(nombre: string): string {
      if (!nombre.trim()) {
        return 'El nombre es obligatorio';
      } else if (nombre.length < 3) {
        return 'El nombre debe tener al menos 3 caracteres';
      }
      return '';
    },
    
    // Validar subdominio
    validateSubdomain(subdominio: string, originalSubdomain?: string): string {
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
    },
    
    // Validar correo
    validateEmail(correo: string): string {
      if (!correo.trim()) {
        return 'El correo es obligatorio';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        return 'Introduce un correo electrónico válido';
      }
      return '';
    },
    
    // Validar formulario completo
    validateTenantForm(tenant: { nombre: string, subdominio: string, correo: string }, originalSubdomain?: string): TenantErrors {
      const errors: TenantErrors = {
        nombre: this.validateName(tenant.nombre),
        subdominio: this.validateSubdomain(tenant.subdominio, originalSubdomain),
        correo: this.validateEmail(tenant.correo)
      };
      
      return errors;
    },
    
    // Comprobar si el formulario es válido
    isTenantFormValid(tenant: { nombre: string, subdominio: string, correo: string }, errors: TenantErrors): boolean {
      return (
        tenant.nombre.trim() !== '' &&
        tenant.subdominio.trim() !== '' &&
        tenant.correo.trim() !== '' &&
        !errors.nombre &&
        !errors.subdominio &&
        !errors.correo
      );
    },
    
    // ========== OPERACIONES CRUD ==========
    
    // Cargar datos de tenants
    async fetchTenants(): Promise<ApiResponse<Tenant[]>> {
      this.isLoading = true;
      this.error = null;
      
      try {
        // Usar la función de mocks para cargar datos
        this.tenants = await fetchMockTenants();
        return {
          success: true,
          data: this.tenants
        };
      } catch (err) {
        console.error('Error al cargar tenants:', err);
        this.error = 'No se pudieron cargar las organizaciones. Intenta de nuevo.';
        return {
          success: false,
          error: 'No se pudieron cargar las organizaciones'
        };
      } finally {
        this.isLoading = false;
      }
    },
    
    // Crear un nuevo tenant
    async createTenant(newTenant: NewTenant): Promise<ApiResponse<Tenant>> {
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
          colorPrimario: newTenant.colorPrimario || this.DEFAULT_COLOR
        };
        
        // Añadir a la lista de tenants
        this.tenants.unshift(newTenantData);
        
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
    },
    
    // Actualizar un tenant existente
    async updateTenant(updatedTenant: Tenant): Promise<ApiResponse<Tenant>> {
      try {
        // Aquí iría la llamada real a la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Actualizar en el estado local
        const index = this.tenants.findIndex(t => t.id === updatedTenant.id);
        if (index !== -1) {
          this.tenants[index] = { ...updatedTenant };
        }
        
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
    },
    
    // Eliminar un tenant
    async deleteTenant(tenantId: string): Promise<ApiResponse> {
      try {
        // Aquí iría la llamada real a la API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Eliminar del estado local
        this.tenants = this.tenants.filter(t => t.id !== tenantId);
        
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
    },
    
    // Cambiar estado de un tenant (activar/desactivar)
    async toggleTenantStatus(tenant: Tenant): Promise<ApiResponse<Tenant>> {
      try {
        // Aquí iría la llamada real a la API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Actualizar en el estado local
        const index = this.tenants.findIndex(t => t.id === tenant.id);
        if (index !== -1) {
          this.tenants[index].activo = !tenant.activo;
        }
        
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
  }
})