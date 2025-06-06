import type { Operacion } from '~/types/operaciones';

export const operacionesMock: Operacion[] = [
  {
    id: "op-001",
    nombreActividad: "Distribución de Alimentos",
    descripcion: "Organizar y distribuir alimentos a familias vulnerables en el centro comunitario. Incluye verificación de beneficiarios y control de inventario.",
    tipo: "tarea",
    estado: "en_progreso",
    prioridad: "alta",
    area: "Asistencia Social",
    fechaInicio: "2025-05-25",
    fechaVencimiento: "2025-05-30",
    horasEstimadas: 8,
    horasReales: 5.5,
    progreso: 65,
    voluntarioId: "vol-001",
    voluntarioNombre: "Ana García",
    coordinadorId: "coord-001",
    coordinadorNombre: "Dr. Juan Pérez",
    ubicacion: "Centro Comunitario Norte",
    requierePresencial: true,
    tags: ["alimentación", "distribución", "familias"],
    recursos: ["Lista de beneficiarios", "Cajas de alimentos", "Planillas de control"],
    presupuesto: 500,
    comentarios: [
      {
        id: "com-001",
        operacionId: "op-001",
        autorId: "vol-001",
        autorNombre: "Ana García",
        contenido: "Ya tenemos preparadas 45 cajas para la distribución de mañana.",
        fecha: "2025-05-26T10:30:00Z",
        tipo: "comentario",
      },
    ],
    archivos: [
      {
        id: "arch-001",
        operacionId: "op-001",
        nombre: "lista_beneficiarios.pdf",
        url: "/files/lista_beneficiarios.pdf",
        tipo: "application/pdf",
        tamaño: 245760,
        fechaSubida: "2025-05-25T08:00:00Z",
        subidoPor: "coord-001",
      },
    ],
    fechaCreacion: "2025-05-24T15:30:00Z",
    fechaActualizacion: "2025-05-26T10:30:00Z",
    creadoPor: "coord-001",
    actualizadoPor: "vol-001",
  },
  {
    id: "op-002",
    nombreActividad: "Campaña de Vacunación Infantil",
    descripcion: "Apoyo en jornada de vacunación para niños de 0-5 años. Incluye registro, orientación a padres y organización de filas.",
    tipo: "proyecto",
    estado: "pendiente",
    prioridad: "critica",
    area: "Salud Pública",
    fechaInicio: "2025-05-28",
    fechaVencimiento: "2025-05-28",
    horasEstimadas: 12,
    progreso: 0,
    voluntarioId: "vol-002",
    voluntarioNombre: "Carlos Mendoza",
    coordinadorId: "coord-002",
    coordinadorNombre: "Lic. Ana Martínez",
    ubicacion: "Centro de Salud Municipal",
    requierePresencial: true,
    tags: ["vacunación", "niños", "salud"],
    recursos: ["Formularios de registro", "Material informativo", "Sistema de turnos"],
    presupuesto: 200,
    comentarios: [],
    archivos: [],
    fechaCreacion: "2025-05-20T09:00:00Z",
    fechaActualizacion: "2025-05-20T09:00:00Z",
    creadoPor: "coord-002",
    actualizadoPor: "coord-002",
  },
  {
    id: "op-003",
    nombreActividad: "Taller de Capacitación Digital",
    descripcion: "Enseñar uso básico de computadoras y internet a adultos mayores. Sesiones de 2 horas durante una semana.",
    tipo: "proyecto",
    estado: "completada",
    prioridad: "media",
    area: "Educación",
    fechaInicio: "2025-05-15",
    fechaVencimiento: "2025-05-22",
    fechaCompletada: "2025-05-22T17:00:00Z",
    horasEstimadas: 14,
    horasReales: 16,
    progreso: 100,
    voluntarioId: "vol-003",
    voluntarioNombre: "María Rodríguez",
    coordinadorId: "coord-003",
    coordinadorNombre: "Ing. Carlos López",
    ubicacion: "Biblioteca Municipal",
    requierePresencial: true,
    tags: ["educación", "tecnología", "adultos mayores"],
    recursos: ["Computadoras", "Material didáctico", "Proyector"],
    presupuesto: 300,
    comentarios: [
      {
        id: "com-002",
        operacionId: "op-003",
        autorId: "vol-003",
        autorNombre: "María Rodríguez",
        contenido: "Excelente participación. Los adultos mayores mostraron mucho interés y aprendieron rápidamente.",
        fecha: "2025-05-22T17:30:00Z",
        tipo: "comentario",
      },
      {
        id: "com-003",
        operacionId: "op-003",
        autorId: "coord-003",
        autorNombre: "Ing. Carlos López",
        contenido: "Operación completada exitosamente. Se capacitaron 25 personas.",
        fecha: "2025-05-22T18:00:00Z",
        tipo: "sistema",
      },
    ],
    archivos: [
      {
        id: "arch-002",
        operacionId: "op-003",
        nombre: "certificados_participacion.zip",
        url: "/files/certificados_participacion.zip",
        tipo: "application/zip",
        tamaño: 1048576,
        fechaSubida: "2025-05-22T19:00:00Z",
        subidoPor: "coord-003",
      },
    ],
    fechaCreacion: "2025-05-10T14:00:00Z",
    fechaActualizacion: "2025-05-22T18:00:00Z",
    creadoPor: "coord-003",
    actualizadoPor: "coord-003",
  },
  {
    id: "op-004",
    nombreActividad: "Limpieza de Parque Central",
    descripcion: "Jornada de limpieza y mantenimiento del parque central. Incluye recolección de basura, poda menor y pintura de bancas.",
    tipo: "tarea",
    estado: "pendiente",
    prioridad: "baja",
    area: "Medio Ambiente",
    fechaInicio: "2025-06-01",
    fechaVencimiento: "2025-06-01",
    horasEstimadas: 6,
    progreso: 0,
    voluntarioId: "vol-004",
    voluntarioNombre: "Pedro Silva",
    ubicacion: "Parque Central",
    requierePresencial: true,
    tags: ["limpieza", "parque", "medio ambiente"],
    recursos: ["Bolsas de basura", "Herramientas de jardín", "Pintura"],
    comentarios: [],
    archivos: [],
    fechaCreacion: "2025-05-26T11:00:00Z",
    fechaActualizacion: "2025-05-26T11:00:00Z",
    creadoPor: "vol-004",
    actualizadoPor: "vol-004",
  },
  {
    id: "op-005",
    nombreActividad: "Seguimiento Post-Adopción",
    descripcion: "Visitas de seguimiento a familias que adoptaron mascotas en el último mes. Verificar bienestar animal y brindar apoyo.",
    tipo: "seguimiento",
    estado: "en_progreso",
    prioridad: "media",
    area: "Protección Animal",
    fechaInicio: "2025-05-20",
    fechaVencimiento: "2025-06-05",
    horasEstimadas: 20,
    horasReales: 8,
    progreso: 40,
    voluntarioId: "vol-005",
    voluntarioNombre: "Laura Jiménez",
    coordinadorId: "coord-001",
    coordinadorNombre: "Dr. Juan Pérez",
    ubicacion: "Varios domicilios",
    requierePresencial: true,
    tags: ["mascotas", "adopción", "seguimiento"],
    recursos: ["Lista de adoptantes", "Formularios de evaluación", "Vehículo"],
    presupuesto: 150,
    comentarios: [
      {
        id: "com-004",
        operacionId: "op-005",
        autorId: "vol-005",
        autorNombre: "Laura Jiménez",
        contenido: "He visitado 6 familias hasta ahora. Todas las mascotas están bien cuidadas.",
        fecha: "2025-05-26T16:00:00Z",
        tipo: "comentario",
      },
    ],
    archivos: [],
    fechaCreacion: "2025-05-18T10:00:00Z",
    fechaActualizacion: "2025-05-26T16:00:00Z",
    creadoPor: "coord-001",
    actualizadoPor: "vol-005",
  },
  {
    id: "op-006",
    nombreActividad: "Recolección de Ropa de Invierno",
    descripcion: "Campaña de recolección de ropa abrigada para personas en situación de calle. Clasificación y empaque.",
    tipo: "tarea",
    estado: "cancelada",
    prioridad: "media",
    area: "Asistencia Social",
    fechaInicio: "2025-05-10",
    fechaVencimiento: "2025-05-15",
    horasEstimadas: 10,
    progreso: 20,
    voluntarioId: "vol-001",
    voluntarioNombre: "Ana García",
    ubicacion: "Almacén Central",
    requierePresencial: true,
    tags: ["ropa", "invierno", "personas en calle"],
    recursos: ["Cajas de almacenamiento", "Etiquetas", "Espacio de clasificación"],
    comentarios: [
      {
        id: "com-005",
        operacionId: "op-006",
        autorId: "coord-001",
        autorNombre: "Dr. Juan Pérez",
        contenido: "Operación cancelada por falta de donaciones suficientes.",
        fecha: "2025-05-12T14:00:00Z",
        tipo: "sistema",
      },
    ],
    archivos: [],
    fechaCreacion: "2025-05-08T12:00:00Z",
    fechaActualizacion: "2025-05-12T14:00:00Z",
    creadoPor: "coord-001",
    actualizadoPor: "coord-001",
  },
  {
    id: "op-007",
    nombreActividad: "Apoyo Escolar Virtual",
    descripcion: "Tutorías online de matemáticas y ciencias para estudiantes de secundaria con dificultades académicas.",
    tipo: "proyecto",
    estado: "en_progreso",
    prioridad: "alta",
    area: "Educación",
    fechaInicio: "2025-05-01",
    fechaVencimiento: "2025-06-30",
    horasEstimadas: 40,
    horasReales: 15,
    progreso: 35,
    voluntarioId: "vol-003",
    voluntarioNombre: "María Rodríguez",
    coordinadorId: "coord-003",
    coordinadorNombre: "Ing. Carlos López",
    requierePresencial: false,
    tags: ["educación", "tutorías", "virtual", "matemáticas"],
    recursos: ["Plataforma de videollamadas", "Material didáctico digital", "Lista de estudiantes"],
    comentarios: [
      {
        id: "com-006",
        operacionId: "op-007",
        autorId: "vol-003",
        autorNombre: "María Rodríguez",
        contenido: "Los estudiantes están progresando bien. He notado mejora en sus calificaciones.",
        fecha: "2025-05-25T20:00:00Z",
        tipo: "comentario",
      },
    ],
    archivos: [
      {
        id: "arch-003",
        operacionId: "op-007",
        nombre: "ejercicios_matematicas.pdf",
        url: "/files/ejercicios_matematicas.pdf",
        tipo: "application/pdf",
        tamaño: 512000,
        fechaSubida: "2025-05-15T10:00:00Z",
        subidoPor: "vol-003",
      },
    ],
    fechaCreacion: "2025-04-28T09:00:00Z",
    fechaActualizacion: "2025-05-25T20:00:00Z",
    creadoPor: "coord-003",
    actualizadoPor: "vol-003",
  },
  {
    id: "op-008",
    nombreActividad: "Evaluación de Impacto Programa de Becas",
    descripcion: "Evaluación del impacto del programa de becas estudiantiles. Entrevistas y análisis de datos académicos.",
    tipo: "seguimiento",
    estado: "pendiente",
    prioridad: "alta",
    area: "Educación",
    fechaInicio: "2025-06-03",
    fechaVencimiento: "2025-06-15",
    horasEstimadas: 25,
    progreso: 0,
    voluntarioId: "vol-002",
    voluntarioNombre: "Carlos Mendoza",
    coordinadorId: "coord-003",
    coordinadorNombre: "Ing. Carlos López",
    ubicacion: "Oficina Central",
    requierePresencial: true,
    tags: ["evaluación", "becas", "impacto", "análisis"],
    recursos: ["Base de datos de becarios", "Formularios de entrevista", "Software de análisis"],
    presupuesto: 400,
    comentarios: [],
    archivos: [],
    fechaCreacion: "2025-05-26T14:00:00Z",
    fechaActualizacion: "2025-05-26T14:00:00Z",
    creadoPor: "coord-003",
    actualizadoPor: "coord-003",
  }
];

export const voluntariosMock = [
  { id: "vol-001", nombre: "Ana García", email: "ana.garcia@email.com", activo: true },
  { id: "vol-002", nombre: "Carlos Mendoza", email: "carlos.mendoza@email.com", activo: true },
  { id: "vol-003", nombre: "María Rodríguez", email: "maria.rodriguez@email.com", activo: true },
  { id: "vol-004", nombre: "Pedro Silva", email: "pedro.silva@email.com", activo: true },
  { id: "vol-005", nombre: "Laura Jiménez", email: "laura.jimenez@email.com", activo: true },
];

export const coordinadoresMock = [
  { id: "coord-001", nombre: "Dr. Juan Pérez", email: "juan.perez@ong.com", activo: true },
  { id: "coord-002", nombre: "Lic. Ana Martínez", email: "ana.martinez@ong.com", activo: true },
  { id: "coord-003", nombre: "Ing. Carlos López", email: "carlos.lopez@ong.com", activo: true },
];

export const areasMock = [
  "Asistencia Social",
  "Salud Pública",
  "Educación",
  "Medio Ambiente",
  "Protección Animal",
  "Desarrollo Comunitario",
  "Derechos Humanos",
  "Cultura y Arte",
];
