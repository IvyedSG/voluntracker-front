import type { DashboardStats } from "~/types/dashboard";
import { defineStore } from "pinia";
import { fetchMockDashboardData } from "~/mocks/dashboard";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    stats: {
      asistencia: 0,
      voluntariosActivos: 0,
      evolucionVoluntarios: 0,
      eventosProgramados: 0,
      proximoEvento: "",
      tareasPendientes: 0,
      cargaHoraria: 0,
      cargaHorariaPorcentaje: 0,
      horasDonadas: 0,
      retencion: 0,
      volunteerHistory: { labels: [], data: [] },
      areaDistribution: { labels: [], data: [], colors: [] },
      prediction: { growth: 0 },
    } as DashboardStats,
    alerts: [] as string[],
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchDashboardData() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await fetchMockDashboardData();
        this.stats = data.stats;
        this.alerts = data.alerts;
      } catch (error) {
        this.error = "Error al cargar los datos del Dashboard";
        console.error("Error fetching dashboard data:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
