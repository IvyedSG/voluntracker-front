export interface Ong {
  id: string;
  nombre: string;
  logo?: string;
  banner?: string;
  descripcion: string;
  mision: string;
  vision?: string;
  fechaCreacion: string;
  direccion?: DireccionOng;
  contacto: ContactoOng;
  redes: RedesSocialesOng;
  stats: StatsOng;
  areas: AreaOng[];
  documentos?: DocumentoOng[];
  configuracion: ConfiguracionOng;
  estado: EstadoOng;
}

export interface DireccionOng {
  calle: string;
  numero: string;
  ciudad: string;
  region: string;
  pais: string;
  codigoPostal?: string;
  coordenadas?: {
    latitud: number;
    longitud: number;
  };
}

export interface ContactoOng {
  email: string;
  telefono?: string;
  sitioWeb?: string;
  personaContacto?: string;
  emailContacto?: string;
}

export interface RedesSocialesOng {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

export interface StatsOng {
  voluntariosActivos: number;
  actividadesRealizadas: number;
  horasVoluntariado: number;
  beneficiariosAlcanzados?: number;
  proyectosActivos?: number;
}

export interface AreaOng {
  id: string;
  nombre: string;
  descripcion?: string;
  color?: string;
  icono?: string;
}

export interface DocumentoOng {
  id: string;
  tipo: 'estatuto' | 'certificacion' | 'memoria' | 'otro';
  nombre: string;
  url: string;
  fechaSubida: string;
  tamaño?: number;
}

export interface ConfiguracionOng {
  temaPersonalizado?: {
    colorPrimario?: string;
    colorSecundario?: string;
    fuentePrincipal?: string;
  };
  privacidad: {
    perfilPublico: boolean;
    mostrarEstadisticas: boolean;
    mostrarContacto: boolean;
  };
  notificaciones: {
    email: boolean;
    push: boolean;
    frecuencia: 'diaria' | 'semanal' | 'mensual' | 'nunca';
  };
}

export type EstadoOng = 'activa' | 'inactiva' | 'pendiente' | 'suspendida';