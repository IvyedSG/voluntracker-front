import type { MetricaReporte, PrediccionAlerta } from '~/types/reportes';

export const reportesMetricas: MetricaReporte[] = [
  {
    id: "total-voluntarios",
    titulo: "Total Voluntarios",
    valor: 127,
    variacion: 12.5,
    tendencia: "arriba",
    color: "blue",
    icono: "i-heroicons-user-group",
    descripcion: "Voluntarios activos actualmente",
  },
  {
    id: "horas-registradas",
    titulo: "Horas Registradas",
    valor: 2456,
    variacion: 8.2,
    tendencia: "arriba",
    color: "green",
    icono: "i-heroicons-clock",
    descripcion: "Horas totales registradas",
    formatoValor: "horas",
  },
  {
    id: "tasa-retencion",
    titulo: "Tasa de Retención",
    valor: 78.5,
    variacion: -2.3,
    tendencia: "abajo",
    color: "yellow",
    icono: "i-heroicons-chart-bar",
    descripcion: "Porcentaje de retención de voluntarios",
    formatoValor: "porcentaje",
  },
  {
    id: "tareas-completadas",
    titulo: "Tareas Completadas",
    valor: 345,
    variacion: 15.7,
    tendencia: "arriba",
    color: "purple",
    icono: "i-heroicons-check-circle",
    descripcion: "Tareas finalizadas en el período",
  },
];

export const datosVoluntariosMock = {
  activos: 127,
  inactivos: 23,
  nuevos: 15,
  desercion: 8.5,
  porGenero: {
    labels: ['Femenino', 'Masculino', 'No binario', 'Prefiero no decir'],
    data: [68, 52, 4, 3]
  },
  porEdad: {
    labels: ['18-25', '26-35', '36-45', '46-55', '56+'],
    data: [32, 45, 28, 15, 7]
  }
};

export const datosAreasMock = {
  areas: [
    { id: 'educacion', nombre: 'Educación', voluntarios: 25, horasRegistradas: 450, actividadesCompletadas: 18, eficiencia: 85.2, tendencia: 'arriba', color: '#3B82F6' },
    { id: 'salud', nombre: 'Salud', voluntarios: 32, horasRegistradas: 620, actividadesCompletadas: 22, eficiencia: 91.5, tendencia: 'arriba', color: '#10B981' },
    { id: 'medio-ambiente', nombre: 'Medio Ambiente', voluntarios: 18, horasRegistradas: 310, actividadesCompletadas: 12, eficiencia: 76.8, tendencia: 'abajo', color: '#F59E0B' },
    { id: 'derechos-humanos', nombre: 'Derechos Humanos', voluntarios: 12, horasRegistradas: 180, actividadesCompletadas: 8, eficiencia: 88.9, tendencia: 'arriba', color: '#8B5CF6' },
    { id: 'asistencia-social', nombre: 'Asistencia Social', voluntarios: 40, horasRegistradas: 896, actividadesCompletadas: 35, eficiencia: 82.1, tendencia: 'estable', color: '#EC4899' }
  ]
};

export const datosTareasMock = {
  completadas: 125,
  pendientes: 43,
  enProgreso: 28,
  vencidas: 7,
  tendencia: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    creadas: [45, 38, 52, 68, 72, 58],
    completadas: [32, 28, 45, 56, 65, 48]
  },
  porPrioridad: {
    labels: ['Alta', 'Media', 'Baja', 'Sin prioridad'],
    data: [18, 45, 32, 8]
  },
  porTipo: {
    labels: ['Eventos', 'Proyectos', 'Tareas rutinarias', 'Emergencias'],
    data: [25, 38, 35, 5]
  },
  tiempoPromedio: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    data: [4.5, 4.2, 3.8, 4.1, 3.9, 4.2]
  }
};

export const alertasPrediccionMock: PrediccionAlerta[] = [
  {
    id: '1',
    tipo: 'desercion',
    mensaje: 'Posible aumento en la deserción de voluntarios',
    recomendacion: 'Implementar programa de retención y seguimiento personalizado',
    nivelSeveridad: 'advertencia',
    areaProbable: 'Educación',
    probabilidad: 0.75
  },
  {
    id: '2',
    tipo: 'participacion',
    mensaje: 'Baja participación en actividades del área de Medio Ambiente',
    recomendacion: 'Revisar estrategias de motivación y comunicación',
    nivelSeveridad: 'info',
    areaProbable: 'Medio Ambiente',
    probabilidad: 0.65
  },
  {
    id: '3',
    tipo: 'completitud',
    mensaje: 'Tareas críticas con riesgo de vencimiento',
    recomendacion: 'Reasignar recursos y establecer prioridades claras',
    nivelSeveridad: 'critica',
    probabilidad: 0.90
  }
];

export const reportesGraficos = {
  participacionArea: {
    labels: ['Educación', 'Salud', 'Medio Ambiente', 'Derechos Humanos', 'Asistencia Social'],
    data: [25, 32, 18, 12, 40]
  },
  desercionVoluntarios: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    data: [5, 8, 12, 7, 9, 6]
  },
  evolucionTareas: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        name: 'Creadas',
        data: [45, 38, 52, 68, 72, 58]
      },
      {
        name: 'Completadas',
        data: [32, 28, 45, 56, 65, 48]
      }
    ]
  }
};
