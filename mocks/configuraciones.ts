import type { 
  ConfiguracionCompleta, 
  DatosOrganizacion, 
  ConfiguracionBranding,
  ConfiguracionSeguridad,
  ConfiguracionNotificaciones,
  ConfiguracionGeneral,
  ConfiguracionTenant,
  Rol 
} from '~/types/configuraciones';

export const configuracionesCompletas: ConfiguracionCompleta = {
  organizacion: {
    id: 'org-001',
    nombre: 'Fundación Solidaria',
    descripcion: 'Organización dedicada a ayudar a las comunidades más necesitadas a través de programas de asistencia social, educación y desarrollo comunitario.',
    email: 'contacto@fundacionsolidaria.org',
    telefono: '+34 123 456 789',
    direccion: 'Calle Principal 123, 28001 Madrid, España',
    sitioWeb: 'https://fundacionsolidaria.org',
    redesSociales: {
      facebook: 'https://facebook.com/fundacionsolidaria',
      twitter: 'https://twitter.com/fundacionsolidaria',
      instagram: 'https://instagram.com/fundacionsolidaria',
      linkedin: 'https://linkedin.com/company/fundacionsolidaria'
    }
  },
  branding: {
    colorPrimario: '#7C3AED',
    colorSecundario: '#3B82F6',
    colorAccento: '#10B981',
    colorFondo: '#1F2937',
    tema: 'oscuro',
    tipografia: 'Inter',
    logoPersonalizado: undefined,
    faviconPersonalizado: undefined
  },
  seguridad: {
    mfaHabilitado: true,
    tiempoSesion: 480,
    politicaContrasena: {
      longitudMinima: 8,
      requiereMayusculas: true,
      requiereMinusculas: true,
      requiereNumeros: true,
      requiereSimbolos: false
    },
    intentosMaximos: 3,
    bloqueoTemporal: true,
    duracionBloqueo: 15
  },
  notificaciones: {
    email: {
      nuevosVoluntarios: true,
      tareasPendientes: true,
      eventos: true,
      reportes: false
    },
    push: {
      tareasPendientes: true,
      recordatorios: true,
      alertas: true
    },
    frecuenciaReportes: 'semanal'
  },
  general: {
    idioma: 'es',
    zonaHoraria: 'Europe/Madrid',
    formatoFecha: 'dd/mm/yyyy',
    formatoHora: '24h',
    moneda: 'EUR'
  },
  tenant: {
    planActual: 'Premium',
    limiteUsuarios: 100,
    limiteProjetos: 50,
    almacenamientoUsado: 2048,
    almacenamientoLimite: 10240,
    fechaExpiracion: '2024-12-31',
    estadoSuscripcion: 'activa'
  },
  roles: [
    {
      id: 'admin',
      nombre: 'Administrador',
      descripcion: 'Acceso completo a todas las funcionalidades del sistema',
      permisos: ['*'],
      esPersonalizado: false,
      usuariosAsignados: 2
    },
    {
      id: 'coordinator',
      nombre: 'Coordinador',
      descripcion: 'Gestión de voluntarios, actividades y reportes básicos',
      permisos: [
        'voluntarios.crear',
        'voluntarios.editar',
        'voluntarios.ver',
        'actividades.crear',
        'actividades.gestionar',
        'actividades.ver',
        'reportes.ver',
        'eventos.crear',
        'eventos.gestionar'
      ],
      esPersonalizado: false,
      usuariosAsignados: 5
    },
    {
      id: 'volunteer',
      nombre: 'Voluntario',
      descripcion: 'Acceso básico para participar en actividades',
      permisos: [
        'perfil.ver',
        'perfil.editar',
        'actividades.participar',
        'actividades.ver',
        'eventos.ver',
        'eventos.participar'
      ],
      esPersonalizado: false,
      usuariosAsignados: 127
    },
    {
      id: 'supervisor',
      nombre: 'Supervisor',
      descripcion: 'Supervisión de áreas específicas y equipos',
      permisos: [
        'voluntarios.ver',
        'actividades.ver',
        'actividades.supervisar',
        'reportes.ver',
        'equipos.gestionar'
      ],
      esPersonalizado: true,
      usuariosAsignados: 8
    },
    {
      id: 'financiero',
      nombre: 'Financiero',
      descripcion: 'Gestión de aspectos financieros y donaciones',
      permisos: [
        'finanzas.ver',
        'finanzas.gestionar',
        'donaciones.ver',
        'donaciones.gestionar',
        'reportes.financieros'
      ],
      esPersonalizado: true,
      usuariosAsignados: 3
    }
  ]
};

// Datos de ejemplo para diferentes planes
export const planesDisponiblesMock = [
  {
    id: 'basic',
    nombre: 'Básico',
    precio: 19.99,
    descripcion: 'Ideal para organizaciones pequeñas que están comenzando',
    limiteUsuarios: 25,
    limiteProjetos: 10,
    almacenamiento: 5120, // 5GB en MB
    caracteristicas: [
      'Hasta 25 usuarios',
      'Hasta 10 proyectos activos',
      '5GB de almacenamiento',
      'Reportes básicos',
      'Soporte por email'
    ]
  },
  {
    id: 'premium',
    nombre: 'Premium',
    precio: 49.99,
    descripcion: 'Para organizaciones en crecimiento con necesidades avanzadas',
    limiteUsuarios: 100,
    limiteProjetos: 50,
    almacenamiento: 10240, // 10GB en MB
    caracteristicas: [
      'Hasta 100 usuarios',
      'Hasta 50 proyectos activos',
      '10GB de almacenamiento',
      'Reportes avanzados',
      'Soporte prioritario',
      'Integraciones API',
      'Personalización de branding'
    ]
  },
  {
    id: 'enterprise',
    nombre: 'Enterprise',
    precio: 99.99,
    descripcion: 'Solución completa para grandes organizaciones',
    limiteUsuarios: 500,
    limiteProjetos: 200,
    almacenamiento: 51200, // 50GB en MB
    caracteristicas: [
      'Hasta 500 usuarios',
      'Proyectos ilimitados',
      '50GB de almacenamiento',
      'Análisis predictivo',
      'Soporte 24/7',
      'API completa',
      'Personalización total',
      'SSO y seguridad avanzada'
    ]
  }
];

// Historial de facturación de ejemplo
export const historicoFacturacionMock = [
  {
    id: 'fact-001',
    fecha: '2024-11-01',
    descripcion: 'Plan Premium - Noviembre 2024', // CORREGIR: era "descripción"
    estado: 'Pagado',
    monto: 49.99,
    metodoPago: 'Visa ****4242',
    facturaUrl: '/downloads/factura-noviembre-2024.pdf'
  },
  {
    id: 'fact-002',
    fecha: '2024-10-01',
    descripcion: 'Plan Premium - Octubre 2024', // CORREGIR: era "descripción"
    estado: 'Pagado',
    monto: 49.99,
    metodoPago: 'Visa ****4242',
    facturaUrl: '/downloads/factura-octubre-2024.pdf'
  },
  {
    id: 'fact-003',
    fecha: '2024-09-01',
    descripcion: 'Plan Premium - Septiembre 2024', // CORREGIR: era "descripción"
    estado: 'Pagado',
    monto: 49.99,
    metodoPago: 'Visa ****4242',
    facturaUrl: '/downloads/factura-septiembre-2024.pdf'
  },
  {
    id: 'fact-004',
    fecha: '2024-08-01',
    descripcion: 'Plan Premium - Agosto 2024', // CORREGIR: era "descripción"
    estado: 'Pagado',
    monto: 49.99,
    metodoPago: 'Visa ****4242',
    facturaUrl: '/downloads/factura-agosto-2024.pdf'
  }
];

// Permisos disponibles del sistema
export const permisosDisponiblesMock = [
  { 
    id: 'voluntarios.crear', 
    nombre: 'Crear voluntarios',
    categoria: 'Voluntarios',
    descripcion: 'Permite registrar nuevos voluntarios en el sistema'
  },
  { 
    id: 'voluntarios.editar', 
    nombre: 'Editar voluntarios',
    categoria: 'Voluntarios',
    descripcion: 'Permite modificar información de voluntarios existentes'
  },
  { 
    id: 'voluntarios.eliminar', 
    nombre: 'Eliminar voluntarios',
    categoria: 'Voluntarios',
    descripcion: 'Permite eliminar voluntarios del sistema'
  },
  { 
    id: 'voluntarios.ver', 
    nombre: 'Ver voluntarios',
    categoria: 'Voluntarios',
    descripcion: 'Permite ver la lista y detalles de voluntarios'
  },
  { 
    id: 'actividades.crear', 
    nombre: 'Crear actividades',
    categoria: 'Actividades',
    descripcion: 'Permite crear nuevas actividades y proyectos'
  },
  { 
    id: 'actividades.gestionar', 
    nombre: 'Gestionar actividades',
    categoria: 'Actividades',
    descripcion: 'Permite administrar actividades existentes'
  },
  { 
    id: 'actividades.ver', 
    nombre: 'Ver actividades',
    categoria: 'Actividades',
    descripcion: 'Permite ver la lista de actividades'
  },
  { 
    id: 'actividades.participar', 
    nombre: 'Participar en actividades',
    categoria: 'Actividades',
    descripcion: 'Permite inscribirse y participar en actividades'
  },
  { 
    id: 'reportes.ver', 
    nombre: 'Ver reportes',
    categoria: 'Reportes',
    descripcion: 'Permite acceder a reportes y estadísticas básicas'
  },
  { 
    id: 'reportes.crear', 
    nombre: 'Crear reportes',
    categoria: 'Reportes',
    descripcion: 'Permite generar reportes personalizados'
  },
  { 
    id: 'reportes.financieros', 
    nombre: 'Reportes financieros',
    categoria: 'Reportes',
    descripcion: 'Permite acceder a reportes financieros'
  },
  { 
    id: 'configuracion.ver', 
    nombre: 'Ver configuración',
    categoria: 'Configuración',
    descripcion: 'Permite ver la configuración del sistema'
  },
  { 
    id: 'configuracion.editar', 
    nombre: 'Editar configuración',
    categoria: 'Configuración',
    descripcion: 'Permite modificar la configuración del sistema'
  },
  { 
    id: 'usuarios.gestionar', 
    nombre: 'Gestionar usuarios',
    categoria: 'Usuarios',
    descripcion: 'Permite administrar cuentas de usuario'
  },
  { 
    id: 'finanzas.ver', 
    nombre: 'Ver finanzas',
    categoria: 'Finanzas',
    descripcion: 'Permite ver información financiera'
  },
  { 
    id: 'finanzas.gestionar', 
    nombre: 'Gestionar finanzas',
    categoria: 'Finanzas',
    descripcion: 'Permite administrar aspectos financieros'
  },
  { 
    id: 'donaciones.ver', 
    nombre: 'Ver donaciones',
    categoria: 'Donaciones',
    descripcion: 'Permite ver registro de donaciones'
  },
  { 
    id: 'donaciones.gestionar', 
    nombre: 'Gestionar donaciones',
    categoria: 'Donaciones',
    descripcion: 'Permite administrar donaciones'
  }
];