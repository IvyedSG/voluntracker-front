// Definir todas las interfaces relacionadas con tenants aquí

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
  subdominio: string;
  correo: string;
  plan: string;
  logo?: string;
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

export interface TenantStats {
  activos: number;
  nuevosUltimaSemana: number;
  totalVoluntarios: number;
  promedioVoluntarios: number;
  premium: number;
  porcentajePremium: number;
}

export interface SuccessResponse<T = void> {
  success: true;
  data?: T;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse<T = void> = SuccessResponse<T> | ErrorResponse;