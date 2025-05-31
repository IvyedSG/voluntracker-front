import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  FiltrosReporte,
  MetricaReporte,
  DataReporte,
  GeneracionReporte,
  PrediccionAlerta,
  PeriodoTiempo,
} from "~/types/reportes";

// Importar mocks como datos serializables
import {
  reportesMetricas,
  reportesGraficos,
  alertasPrediccionMock,
  datosVoluntariosMock,
  datosAreasMock,
  datosTareasMock,
  metricasRendimiento,
  metricasParticipacion,
  metricasImpacto,
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

  // Estados para datos específicos - inicializados con datos serializables
  const datosVoluntarios = ref<any>(datosVoluntariosMock);
  const datosAreas = ref<any>(datosAreasMock);
  const datosTareas = ref<any>(datosTareasMock);

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

  // Computed properties para métricas adicionales - usando valores serializables
  const metricasKpi = computed(() => metricasRendimiento);
  const datosParticipacion = computed(() => metricasParticipacion);
  const datosImpacto = computed(() => metricasImpacto);

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
      // Simular carga de API
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Cargar datos desde mocks sin funciones
      metricas.value = [...reportesMetricas];
      graficos.value = { ...reportesGraficos };
      alertasPrediccion.value = [...alertasPrediccionMock];
      datosVoluntarios.value = { ...datosVoluntariosMock };
      datosAreas.value = { ...datosAreasMock };
      datosTareas.value = { ...datosTareasMock };
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
      const tiempoGeneracion = datosReporte.formato === "pdf" ? 2000 : 1500;
      await new Promise((resolve) => setTimeout(resolve, tiempoGeneracion));

      return {
        success: true,
        message: `Reporte ${datosReporte.formato.toUpperCase()} generado exitosamente`,
        url: `/downloads/reporte-${Date.now()}.${datosReporte.formato}`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "Error al generar el reporte",
      };
    } finally {
      cargando.value = false;
    }
  };

  // Inicializar con datos por defecto para evitar estados undefined
  metricas.value = [...reportesMetricas];
  alertasPrediccion.value = [...alertasPrediccionMock];

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
    datosVoluntarios,
    datosAreas,
    datosTareas,

    // Computed properties para métricas adicionales
    metricasKpi,
    datosParticipacion,
    datosImpacto,

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
