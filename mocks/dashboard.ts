import type { DashboardStats } from '~/types/dashboard';

export const fetchMockDashboardData = async (): Promise<{
  stats: DashboardStats;
  alerts: string[];
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          asistencia: 82,
          voluntariosActivos: 120,
          evolucionVoluntarios: 5,
          eventosProgramados: 8,
          proximoEvento: "05/06/2025",
          tareasPendientes: 24,
          cargaHoraria: 45,
          cargaHorariaPorcentaje: 65,
          horasDonadas: 1250,
          retencion: 78,
          volunteerHistory: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
            data: [95, 102, 108, 115, 120],
          },
          areaDistribution: {
            labels: ["Salud", "Educación", "TI", "Medio Ambiente"],
            data: [35, 25, 20, 20],
            colors: ["#34d399", "#60a5fa", "#a78bfa", "#facc15"],
          },
          prediction: {
            growth: 12,
          },
        },
        alerts: [
          "Intento fallido de inicio de sesión detectado",
          "3 voluntarios no han confirmado asistencia al próximo evento",
          "Certificado de capacitación vence en 7 días",
        ],
      });
    }, 1000);
  });
};
