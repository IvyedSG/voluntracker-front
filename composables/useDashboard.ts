import { useDashboardStore } from "~/stores/dashboardStore";
import { storeToRefs } from "pinia";

export function useDashboard() {
  const dashboardStore = useDashboardStore();

  // Usar storeToRefs para mantener la reactividad
  const { stats, alerts, isLoading, error } = storeToRefs(dashboardStore);

  // Las acciones no necesitan ser envueltas en storeToRefs
  const { fetchDashboardData } = dashboardStore;

  return {
    stats,
    alerts,
    isLoading,
    error,
    fetchDashboardData,
  };
}
