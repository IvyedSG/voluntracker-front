export type PeriodoTiempo = "dia" | "semana" | "mes" | "trimestre" | "anual";

export type FormatoExportacion = "pdf" | "excel" | "csv" | "sheets" | "google-sheets";

export type TipoGrafico = "linea" | "barra" | "pastel" | "area";

export interface FiltrosReporte {
  fechaInicio: string;
  fechaFin: string;
  areas?: string[];
  voluntarios?: string[];
  proyectos?: string[];
  tipoReporte?: string;
  periodo?: PeriodoTiempo;
}

export interface DatoPunto {
  fecha: string;
  valor: number;
  etiqueta?: string;
  color?: string;
}

export interface SerieGrafico {
  nombre: string;
  datos: DatoPunto[];
  color?: string;
}

export interface DataReporte {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: TipoGrafico;
  series: SerieGrafico[];
  etiquetasX?: string[];
  unidad?: string;
  formatoValor?: string;
}

export interface MetricaReporte {
  id: string;
  titulo: string;
  valor: number;
  variacion?: number; // Porcentaje de cambio respecto al período anterior
  tendencia?: "arriba" | "abajo" | "estable";
  color?: string;
  icono?: string;
  descripcion?: string;
  formatoValor?: string;
}

export interface ReporteParticipacionArea {
  areaId: string;
  areaNombre: string;
  totalVoluntarios: number;
  horasRegistradas: number;
  actividadesCompletadas: number;
  color: string;
}

export interface ReporteDesercionVoluntarios {
  mesAño: string;
  nuevosVoluntarios: number;
  voluntariosActivos: number;
  voluntariosInactivos: number;
  tasaRetencion: number;
}

export interface ReporteTareas {
  mesAño: string;
  tareasCreadas: number;
  tareasCompletadas: number;
  tareasCanceladas: number;
  eficienciaComplecion: number;
}

export interface PrediccionAlerta {
  id: string;
  tipo: "desercion" | "retencion" | "participacion" | "completitud";
  mensaje: string;
  recomendacion: string;
  nivelSeveridad: "info" | "advertencia" | "critica";
  areaProbable?: string;
  probabilidad: number; // De 0 a 1
}

export interface GeneracionReporte {
  id?: string;
  nombre: string;
  descripcion?: string;
  tipoReporte: string;
  formato: FormatoExportacion;
  periodo: PeriodoTiempo;
  filtros: FiltrosReporte;
  fechaCreacion?: string;
  programado?: boolean;
  frecuencia?: "diaria" | "semanal" | "mensual";
  ultimaGeneracion?: string;
}
