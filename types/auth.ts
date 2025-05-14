/**
 * Tipos de usuario disponibles en el sistema
 */
export type UserType = 'admin_plataforma' | 'coordinador' | 'tenant_admin' | 'volunteer';

/**
 * Permisos disponibles en el sistema
 */
export type Permission =
  | 'manage_tenants'
  | 'view_tenants'
  | 'manage_subscriptions'
  | 'view_api_usage'
  | 'view_global_reports'
  | 'manage_coordinators'
  | 'manage_volunteers'
  | 'view_volunteers'
  | 'manage_events'
  | 'view_events'
  | 'manage_reports'
  | 'view_reports';

/**
 * Información del usuario autenticado
 */
export interface User {
  id: string;
  nombre: string;
  correo: string;
  userType: string;
  permisos: string[];
  creado_en?: string;
  actualizado_en?: string;
  tenantId?: string;
  tenantNombre?: string;
  rol?: string;
}

/**
 * Credenciales para iniciar sesión
 */
export interface LoginCredentials {
  correo: string;
  contrasena: string;
}

/**
 * Respuesta de la API al iniciar sesión
 */
export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

/**
 * Respuesta del perfil de usuario
 */
export interface ProfileResponse {
  status: string;
  data: User;
}

/**
 * Datos para el token refresh
 */
export interface RefreshTokenData {
  id: string;
  type: 'refresh';
  iat: number;
  exp: number;
}

/**
 * Estado de autenticación
 */
export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}