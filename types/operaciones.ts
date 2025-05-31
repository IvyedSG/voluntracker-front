export interface Operacion {
  id: string;
  nombreActividad: string;
  descripcion: string;
  tipo: 'tarea' | 'proyecto' | 'seguimiento';
  estado: 'pendiente' | 'en_progreso' | 'completada' | 'cancelada';
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  area: string;
  fechaInicio: string;
  fechaVencimiento: string;
  fechaCompletada?: string;
  horasEstimadas: number;
  horasReales?: number;
  progreso: number;
  voluntarioId: string;
  voluntarioNombre: string;
  coordinadorId?: string;
  coordinadorNombre?: string;
  ubicacion?: string;
  requierePresencial: boolean;
  tags: string[];
  recursos: string[];
  presupuesto?: number;
  comentarios: OperacionComentario[];
  archivos: OperacionArchivo[];
  fechaCreacion: string;
  fechaActualizacion: string;
  creadoPor: string;
  actualizadoPor: string;
}

export interface OperacionComentario {
  id: string;
  operacionId: string;
  autorId: string;
  autorNombre: string;
  contenido: string;
  fecha: string;
  tipo: 'comentario' | 'sistema' | 'actualizacion';
}

export interface OperacionArchivo {
  id: string;
  operacionId: string;
  nombre: string;
  url: string;
  tipo: string;
  tamaño: number;
  fechaSubida: string;
  subidoPor: string;
}

export interface OperacionStats {
  total: number;
  pendientes: number;
  enProgreso: number;
  completadas: number;
  canceladas: number;
  vencidas: number;
  horasTotales: number;
  horasReales: number;
  horasTotalEstimadas: number;
  horasTotalReales: number;
  eficiencia: number;
  promedioCompletion: number;
  promedioProgreso: number;
}

export interface OperacionFiltros {
  busqueda: string;
  tipo: string[];
  estado: string[];
  prioridad: string[];
  area: string[];
  voluntario: string[];
  coordinador: string[];
  fechaInicio?: string;
  fechaVencimiento?: string;
  soloVencidas: boolean;
  soloSinAsignar: boolean;
}

export interface OperacionControlsState {
  viewMode: 'tabla' | 'kanban' | 'calendario';
  busqueda: string;
  filtros: OperacionFiltros;
  ordenamiento: {
    campo: keyof Operacion;
    direccion: 'asc' | 'desc';
  };
  pagination: {
    page: number;
    pageSize: number;
  };
}

// Tipos para formularios
export interface OperacionFormData {
  nombreActividad: string;
  descripcion: string;
  tipo: Operacion['tipo'];
  prioridad: Operacion['prioridad'];
  area: string;
  fechaInicio: string;
  fechaVencimiento: string;
  horasEstimadas: number;
  voluntarioId: string;
  coordinadorId?: string;
  ubicacion?: string;
  requierePresencial: boolean;
  tags: string[];
  recursos: string[];
  presupuesto?: number;
}

export interface OperacionProgressData {
  progreso: number;
  horasReales: number;
  comentario?: string;
  estado?: Operacion['estado'];
}