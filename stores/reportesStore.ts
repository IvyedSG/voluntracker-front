import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  FiltrosReporte,
  DataReporte,
  MetricaReporte,
  ReporteParticipacionArea,
  ReporteDesercionVoluntarios,
  ReporteTareas,
  PrediccionAlerta,
  GeneracionReporte,
  PeriodoTiempo,
} from "~/types/reportes";

import {
  reportesMetricas,
  reportesGraficos,
  reportesPrediccion,
} from "~/mocks/reportes";

export const useReportesStore = defineStore("reportes", () => {
  // Estado
  const filtrosActuales = ref<FiltrosReporte>({
    fechaInicio: new Date(new Date().setMonth(new Date().getMonth() - 3))
      .toISOString()
      .split("T")[0],
    fechaFin: new Date().toISOString().split("T")[0],
    areas: [],
    voluntarios: [],
    proyectos: [],
    periodo: "mes",
  });

  const periodoSeleccionado = ref<PeriodoTiempo>("mes");
  const cargando = ref<boolean>(false);
  const error = ref<string | null>(null);
  const metricas = ref<MetricaReporte[]>([]);
  const graficos = ref<Record<string, DataReporte>>({});
  const reportesGuardados = ref<GeneracionReporte[]>([]);
  const alertasPrediccion = ref<PrediccionAlerta[]>([]);

  // Getters
  const metricasActuales = computed(() => metricas.value);

  const graficoParticipacionArea = computed(
    () => graficos.value.participacionArea || null
  );

  const graficoDesercionVoluntarios = computed(
    () => graficos.value.desercionVoluntarios || null
  );

  const graficoEvolucionTareas = computed(
    () => graficos.value.evolucionTareas || null
  );

  const alertasCriticas = computed(() =>
    alertasPrediccion.value.filter((a) => a.nivelSeveridad === "critica")
  );

  // Acciones
  const cambiarPeriodo = (periodo: PeriodoTiempo) => {
    periodoSeleccionado.value = periodo;
    filtrosActuales.value.periodo = periodo;
    cargarDatosReportes();
  };

  const actualizarFiltros = (filtros: Partial<FiltrosReporte>) => {
    filtrosActuales.value = {
      ...filtrosActuales.value,
      ...filtros,
    };
    cargarDatosReportes();
  };

  const cargarDatosReportes = async () => {
    cargando.value = true;
    error.value = null;

    try {
      // En producción, aquí harías llamadas a API
      // Para desarrollo, usamos datos mock
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simular delay

      metricas.value = reportesMetricas;
      graficos.value = reportesGraficos;
      alertasPrediccion.value = reportesPrediccion;
    } catch (err: any) {
      error.value = err.message || "Error al cargar los reportes";
    } finally {
      cargando.value = false;
    }
  };

  const generarReporte = async (datosReporte: any) => {
    cargando.value = true;
    try {
      // Simular tiempo de generación basado en el formato
      const tiempoGeneracion: Record<string, number> = {
        pdf: 2000,
        excel: 1500,
        csv: 800,
        sheets: 2500,
        "google-sheets": 2500,
      };

      await new Promise((resolve) =>
        setTimeout(resolve, tiempoGeneracion[datosReporte.formato] || 1500)
      );

      // Simular descarga del archivo
      const formatosPretty: Record<string, string> = {
        pdf: "PDF",
        excel: "Excel",
        csv: "CSV",
        sheets: "Google Sheets",
        "google-sheets": "Google Sheets",
      };

      // Crear objeto para guardar en reportes guardados
      const reporteParaGuardar: GeneracionReporte = {
        id: datosReporte.id || `reporte-${Date.now()}`,
        nombre:
          datosReporte.nombreArchivo ||
          `Reporte ${formatosPretty[datosReporte.formato]}`,
        descripcion: `Reporte generado desde ${datosReporte.tabOrigen}`,
        tipoReporte: datosReporte.tabOrigen,
        formato: datosReporte.formato,
        periodo: "mes",
        filtros: datosReporte.datos?.filtros || filtrosActuales.value,
        fechaCreacion: new Date().toISOString(),
        ultimaGeneracion: new Date().toISOString(),
        programado: false,
      };

      // Agregar a reportes guardados
      if (
        !reportesGuardados.value.find((r) => r.id === reporteParaGuardar.id)
      ) {
        reportesGuardados.value.push(reporteParaGuardar);
      }

      return {
        success: true,
        message: `Reporte generado exitosamente en formato ${formatosPretty[datosReporte.formato]}`,
        url: `#`,
        tamaño: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      };
    } catch (err: any) {
      error.value = err.message || "Error generando el reporte";
      return {
        success: false,
        message: error.value,
      };
    } finally {
      cargando.value = false;
    }
  };

  // Inicializar
  cargarDatosReportes();

  return {
    // Estado
    filtrosActuales,
    periodoSeleccionado,
    cargando,
    error,
    metricas,
    graficos,
    reportesGuardados,
    alertasPrediccion,

    // Getters
    metricasActuales,
    graficoParticipacionArea,
    graficoDesercionVoluntarios,
    graficoEvolucionTareas,
    alertasCriticas,

    // Acciones
    cambiarPeriodo,
    actualizarFiltros,
    cargarDatosReportes,
    generarReporte,
  };
});
