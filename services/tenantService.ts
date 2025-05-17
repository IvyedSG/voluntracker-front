import type { ApiResponse } from '~/types/tenant'

export interface TenantResponse {
  id: string;
  nombre: string;
  nombre_esquema: string;
  creado_en: string;
  actualizado_en: string;
  subdominio: string;
  marca: {
    logo_url: string;
    color_primario: string;
  };
  plan: string;
  estado: string; // This is subscription status: 'activo', 'suspendido', 'cancelado'
  fecha_proximo_pago: string;
  total_voluntarios: number;
  full_domain: string;
}

export interface TenantsListResponse {
  status: string;
  data: TenantResponse[];
}

export async function fetchTenants(): Promise<ApiResponse<TenantResponse[]>> {
  const config = useRuntimeConfig();
  const auth = useAuth();
  
  try {
    // Verificar si hay token disponible
    if (!auth.isAuthenticated.value) {
      throw new Error('No estás autenticado');
    }
    
    // Obtener el token de cookies
    const authToken = useCookie('auth_token').value;
    
    if (!authToken) {
      throw new Error('Token no disponible');
    }
    
    // Hacer la petición a la API con el token
    const response = await $fetch<TenantsListResponse>(`${config.public.apiBase}/admin/tenants`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Validar respuesta
    if (response.status === 'success' && Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data
      };
    } else {
      throw new Error('Formato de respuesta inválido');
    }
  } catch (error: unknown) {
    console.error('Error al obtener tenants:', error);
    
    // Manejar errores de autenticación
    if ((error as unknown)?.response?.status === 401) {
      // Intentar refrescar el token
      const refreshed = await auth.refreshAuthToken().catch(() => false);
      
      if (refreshed) {
        // Reintentar la petición con el token renovado
        return fetchTenants();
      } else {
        // Redirigir a login si no se pudo refrescar
        auth.logout();
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener las organizaciones'
    };
  }
}