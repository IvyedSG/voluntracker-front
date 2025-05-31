export interface DatosOrganizacion {
  id: string;
  nombre: string;
  descripcion: string;
  logo?: string;
  email: string;
  telefono: string;
  direccion: string;
  sitioWeb?: string;
  redesSociales: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface ConfiguracionBranding {
  colorPrimario: string;
  colorSecundario: string;
  colorAccento: string;
  colorFondo: string;
  tema: 'claro' | 'oscuro' | 'auto';
  tipografia: string;
  logoPersonalizado?: string;
  faviconPersonalizado?: string;
}

export interface ConfiguracionSeguridad {
  mfaHabilitado: boolean;
  tiempoSesion: number; // en minutos
  politicaContrasena: {
    longitudMinima: number;
    requiereMayusculas: boolean;
    requiereMinusculas: boolean;
    requiereNumeros: boolean;
    requiereSimbolos: boolean;
  };
  intentosMaximos: number;
  bloqueoTemporal: boolean;
  duracionBloqueo: number; // en minutos
}

export interface ConfiguracionNotificaciones {
  email: {
    nuevosVoluntarios: boolean;
    tareasPendientes: boolean;
    eventos: boolean;
    reportes: boolean;
  };
  push: {
    tareasPendientes: boolean;
    recordatorios: boolean;
    alertas: boolean;
  };
  frecuenciaReportes: 'diario' | 'semanal' | 'mensual';
}

export interface ConfiguracionGeneral {
  idioma: 'es' | 'en' | 'pt';
  zonaHoraria: string;
  formatoFecha: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy-mm-dd';
  formatoHora: '12h' | '24h';
  moneda: string;
}

export interface ConfiguracionTenant {
  planActual: string;
  limiteUsuarios: number;
  limiteProjetos: number;
  almacenamientoUsado: number; // en MB
  almacenamientoLimite: number; // en MB
  fechaExpiracion?: string;
  estadoSuscripcion: 'activa' | 'vencida' | 'suspendida';
}

export interface Rol {
  id: string;
  nombre: string;
  descripcion: string;
  permisos: string[];
  esPersonalizado: boolean;
  usuariosAsignados: number;
}

export interface ConfiguracionCompleta {
  organizacion: DatosOrganizacion;
  branding: ConfiguracionBranding;
  seguridad: ConfiguracionSeguridad;
  notificaciones: ConfiguracionNotificaciones;
  general: ConfiguracionGeneral;
  tenant: ConfiguracionTenant;
  roles: Rol[];
}