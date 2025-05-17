export interface DashboardStats {
  asistencia: number;
  voluntariosActivos: number;
  evolucionVoluntarios: number;
  eventosProgramados: number;
  proximoEvento: string;
  tareasPendientes: number;
  cargaHoraria: number;
  cargaHorariaPorcentaje: number;
  horasDonadas: number;
  retencion: number;
  volunteerHistory: {
    labels: string[];
    data: number[];
  };
  areaDistribution: {
    labels: string[];
    data: number[];
    colors: string[];
  };
  prediction: {
    growth: number;
  };
}
