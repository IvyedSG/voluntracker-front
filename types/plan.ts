export interface Plan {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  periodoFacturacion: 'mensual' | 'anual';
  moneda: string;
  activo: boolean;
  color: string;
  icono: string;
  fechaCreacion: string;
  caracteristicas: Caracteristica[];
  maxOrganizadores: number;
  maxVoluntarios: number;
  maxEventos: number;
  almacenamiento: number;
  soportePrioritario: boolean;
  reportesAvanzados: boolean;
  personalizacion: boolean;
  apiAccess: boolean;
  numOrganizaciones: number;
}

export interface NewPlan {
  nombre: string;
  descripcion: string;
  precio: number;
  periodoFacturacion: 'mensual' | 'anual';
  moneda: string;
  color: string;
  icono: string;
  caracteristicas: Caracteristica[];
  maxOrganizadores: number;
  maxVoluntarios: number;
  maxEventos: number;
  almacenamiento: number;
  soportePrioritario: boolean;
  reportesAvanzados: boolean;
  personalizacion: boolean;
  apiAccess: boolean;
}

export interface Caracteristica {
  texto: string;
  incluido: boolean;
}

export interface PlanStats {
  total: number;
  activos: number;
  nuevosUltimaSemana: number;
  planMasPopular: string;
  ingresosTotal: number;
  ingresosIncremento: number;
  organizacionesPromedio: number;
}