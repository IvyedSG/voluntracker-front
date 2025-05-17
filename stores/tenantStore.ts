import { defineStore } from 'pinia'
// importar el nuevo servicio
import { fetchTenants as fetchTenantsFromAPI, createTenant as createTenantAPI } from '~/services/tenantService'
import type { TenantResponse, CreateTenantRequest } from '~/services/tenantService'

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
      { label: 'Básico', value: 'Básico' },
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
    ],
    subscriptionStatusOptions: [
      { label: 'Activo', value: 'activo', color: 'success' },
      { label: 'Suspendido', value: 'suspendido', color: 'warning' },
      { label: 'Cancelado', value: 'cancelado', color: 'error' }
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
        case 'Básico':
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
        case 'Básico':
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
        case 'Básico':
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
        case 'Básico':
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
        case 'Básico':
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
        // Use the real API service instead of mock data
        const response = await fetchTenantsFromAPI();
        
        if (response.success && response.data) {
          // Transform API response to our Tenant model
          this.tenants = response.data.map(apiTenant => this.mapApiTenantToModel(apiTenant));
          return {
            success: true,
            data: this.tenants
          };
        } else {
          throw new Error(response.error || 'Error fetching tenants');
        }
      } catch (err: any) {
        console.error('Error al cargar tenants:', err);
        this.error = err.message || 'No se pudieron cargar las organizaciones. Intenta de nuevo.';
        return {
          success: false,
          error: this.error
        };
      } finally {
        this.isLoading = false;
      }
    },
    
    // Helper method to map API response to our model
    mapApiTenantToModel(apiTenant: TenantResponse): Tenant {
      return {
        id: apiTenant.id,
        nombre: apiTenant.nombre,
        logo: apiTenant.marca.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(apiTenant.nombre)}&background=0D9488&color=ffffff`,
        subdominio: apiTenant.subdominio,
        correo: '', // API doesn't provide this, we'll need to handle it
        fechaCreacion: apiTenant.creado_en,
        plan: this.mapPlanName(apiTenant.plan),
        numVoluntarios: apiTenant.total_voluntarios,
        activo: this.mapSubscriptionStatus(apiTenant.estado),
        estadoSuscripcion: apiTenant.estado, // Store the original subscription status
        colorPrimario: apiTenant.marca.color_primario || this.DEFAULT_COLOR,
        fechaProximoPago: apiTenant.fecha_proximo_pago
      };
    },

    // New helper to map subscription status to active state
    mapSubscriptionStatus(estado: string): boolean {
      // Only 'activo' is considered as active, other states like 'suspendido' or 'cancelado' are inactive
      return estado === 'activo';
    },
    
    // Helper to map API plan names to our UI-friendly names
    mapPlanName(planName: string): string {
      switch (planName.toLowerCase()) {
        case 'premium':
          return 'Premium';
        case 'pro':
          return 'Pro';
        case 'basico':
          return 'Básico';
        default:
          return planName.charAt(0).toUpperCase() + planName.slice(1);
      }
    },
    
    // Crear un nuevo tenant
    async createTenant(newTenant: NewTenant): Promise<ApiResponse<Tenant>> {
      try {
        // Preparar los datos para la API según el formato requerido
        const createRequest: CreateTenantRequest = {
          nombre: newTenant.nombre,
          subdominio: newTenant.subdominio,
          marca: {
            color_primario: newTenant.colorPrimario || this.DEFAULT_COLOR,
            logo_url: newTenant.logo || undefined
          },
          suscripcion: {
            plan: this.mapPlanToAPI(newTenant.plan),
            estado: 'activo'
          }
        };
        
        // Llamar a la API para crear el tenant
        const result = await createTenantAPI(createRequest);
        
        if (result.success && result.data) {
          // Después de crear exitosamente, recargar la lista de tenants
          // para obtener la información actualizada del servidor
          await this.fetchTenants();
          
          // Buscar el tenant recién creado en la lista
          const createdTenant = this.tenants.find(t => t.id === result.data.id);
          
          if (createdTenant) {
            return {
              success: true,
              data: createdTenant
            };
          } else {
            // Crear un objeto temporal con la información disponible
            const tmpTenant: Tenant = {
              id: result.data.id,
              nombre: newTenant.nombre,
              logo: newTenant.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(newTenant.nombre)}&background=0D9488&color=ffffff`,
              subdominio: newTenant.subdominio,
              correo: newTenant.correo || '',
              fechaCreacion: new Date().toISOString(),
              plan: newTenant.plan,
              numVoluntarios: 0,
              activo: true,
              estadoSuscripcion: 'activo',
              colorPrimario: newTenant.colorPrimario || this.DEFAULT_COLOR
            };
            
            return {
              success: true,
              data: tmpTenant
            };
          }
        } else {
          throw new Error(result.error || 'Error al crear la organización');
        }
      } catch (err) {
        console.error('Error al crear tenant:', err);
        return {
          success: false,
          error: err instanceof Error ? err.message : 'No se pudo crear la organización'
        };
      }
    },
    
    // Agregar este método helper para mapear los nombres de planes 
    // desde nuestra UI al formato esperado por la API
    mapPlanToAPI(planUI: string): 'basico' | 'pro' | 'premium' {
      switch(planUI) {
        case 'Premium':
          return 'premium';
        case 'Pro':
          return 'pro';
        case 'Básico':
        default:
          return 'basico';
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
    },

    getSubscriptionStatusLabel(status: string): string {
      switch (status.toLowerCase()) {
        case 'activo':
          return 'Activo';
        case 'suspendido':
          return 'Suspendido';
        case 'cancelado':
          return 'Cancelado';
        default:
          return status.charAt(0).toUpperCase() + status.slice(1);
      }
    },

    getSubscriptionStatusColor(status: string): "success" | "warning" | "error" | "neutral" {
      switch (status.toLowerCase()) {
        case 'activo':
          return 'success';
        case 'suspendido':
          return 'warning';
        case 'cancelado':
          return 'error';
        default:
          return 'neutral';
      }
    }
  }
})