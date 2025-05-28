import { ref, computed } from "vue";
import type {
  FiltrosReporte,
  FormatoExportacion,
  PeriodoTiempo,
} from "~/types/reportes";

export const useReportes = () => {
  // Estado local
  const exportFormat = ref<FormatoExportacion>("pdf");
  const showExportModal = ref(false);

  // Preparar fechas para los selectores
  const hoy = new Date();
  const unMesAtras = new Date();
  unMesAtras.setMonth(hoy.getMonth() - 1);

  const tresMesesAtras = new Date();
  tresMesesAtras.setMonth(hoy.getMonth() - 3);

  const unAnoAtras = new Date();
  unAnoAtras.setFullYear(hoy.getFullYear() - 1);

  // Rangos predefinidos
  const rangosPredefinidos = [
    {
      label: "Últimos 7 días",
      value: "last7days",
      fechaInicio: new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      fechaFin: hoy.toISOString().split("T")[0],
    },
    {
      label: "Último mes",
      value: "lastMonth",
      fechaInicio: unMesAtras.toISOString().split("T")[0],
      fechaFin: hoy.toISOString().split("T")[0],
    },
    {
      label: "Últimos 3 meses",
      value: "last3months",
      fechaInicio: tresMesesAtras.toISOString().split("T")[0],
      fechaFin: hoy.toISOString().split("T")[0],
    },
    {
      label: "Último año",
      value: "lastYear",
      fechaInicio: unAnoAtras.toISOString().split("T")[0],
      fechaFin: hoy.toISOString().split("T")[0],
    },
  ];

  // Opciones para períodos
  const opcionesPeriodo = [
    { label: "Diario", value: "dia" },
    { label: "Semanal", value: "semana" },
    { label: "Mensual", value: "mes" },
    { label: "Trimestral", value: "trimestre" },
    { label: "Anual", value: "anual" },
  ];

  // Opciones para formatos de exportación
  const opcionesFormato = [
    { label: "PDF", value: "pdf", icon: "i-heroicons-document" },
    { label: "Excel", value: "excel", icon: "i-heroicons-table-cells" },
    {
      label: "Google Sheets",
      value: "google-sheets",
      icon: "i-heroicons-cloud",
    },
  ];

  // Formatear valores según el tipo
  const formatValue = (valor: number, formato?: string): string => {
    if (formato === "porcentaje") {
      return `${valor.toFixed(1)}%`;
    }

    if (formato === "horas") {
      return `${valor.toFixed(1)}h`;
    }

    if (formato === "dinero") {
      return `$${valor.toLocaleString("es-ES")}`;
    }

    if (valor > 1000) {
      return valor.toLocaleString("es-ES");
    }

    return valor.toString();
  };

  // Obtener clase de color según tendencia
  const getTrendClass = (
    tendencia?: "arriba" | "abajo" | "estable"
  ): string => {
    if (tendencia === "arriba") return "text-green-400";
    if (tendencia === "abajo") return "text-red-400";
    return "text-gray-400";
  };

  // Obtener icono según tendencia
  const getTrendIcon = (tendencia?: "arriba" | "abajo" | "estable"): string => {
    if (tendencia === "arriba") return "i-heroicons-arrow-trending-up";
    if (tendencia === "abajo") return "i-heroicons-arrow-trending-down";
    return "i-heroicons-minus";
  };

  return {
    // Estado
    exportFormat,
    showExportModal,

    // Opciones
    rangosPredefinidos,
    opcionesPeriodo,
    opcionesFormato,

    // Métodos
    formatValue,
    getTrendClass,
    getTrendIcon,
  };
};
