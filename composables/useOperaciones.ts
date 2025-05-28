import { ref, computed, watch } from "vue";
import { useOperacionesStore } from "~/stores/operacionesStore";
import { storeToRefs } from "pinia";
import type {
  Operacion,
  OperacionFiltros,
  OperacionControlsState,
} from "~/types/operaciones";

export function useOperaciones() {
  const store = useOperacionesStore();

  // CORREGIDO: Usar storeToRefs para mantener reactividad
  const {
    operaciones,
    operacionActual,
    isLoading,
    error,
    stats,
    operacionesVencidas,
    operacionesPorEstado,
  } = storeToRefs(store);

  // Estado local para controles y modales
  const showAddModal = ref(false);
  const showEditModal = ref(false);
  const showDetailModal = ref(false);
  const showDeleteModal = ref(false);
  const showProgressModal = ref(false);
  const currentOperacion = ref<Operacion | null>(null);

  // Estado de controles
  const controlsState = ref<OperacionControlsState>({
    viewMode: "tabla",
    busqueda: "",
    filtros: {
      busqueda: "",
      tipo: [],
      estado: [],
      prioridad: [],
      area: [],
      voluntario: [],
      coordinador: [],
      soloVencidas: false,
      soloSinAsignar: false,
    },
    ordenamiento: {
      campo: "fechaCreacion",
      direccion: "desc",
    },
    pagination: {
      page: 1,
      pageSize: 20,
    },
  });

  // Operaciones filtradas y ordenadas
  const operacionesFiltradas = computed(() => {
    let resultado = store.aplicarFiltros(controlsState.value.filtros);

    // Aplicar ordenamiento
    const { campo, direccion } = controlsState.value.ordenamiento;
    resultado.sort((a, b) => {
      let aVal = a[campo];
      let bVal = b[campo];

      // Manejar fechas
      if (typeof aVal === "string" && aVal.includes("-")) {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (direccion === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return resultado;
  });

  // Opciones para filtros
  const tipoOptions = [
    { label: "Tarea", value: "tarea" },
    { label: "Proyecto", value: "proyecto" },
    { label: "Seguimiento", value: "seguimiento" },
  ];

  const estadoOptions = [
    { label: "Pendiente", value: "pendiente" },
    { label: "En Progreso", value: "en_progreso" },
    { label: "Completada", value: "completada" },
    { label: "Cancelada", value: "cancelada" },
  ];

  const prioridadOptions = [
    { label: "Baja", value: "baja" },
    { label: "Media", value: "media" },
    { label: "Alta", value: "alta" },
    { label: "Crítica", value: "critica" },
  ];

  const areaOptions = computed(() => {
    const areas = [...new Set(operaciones.value.map((op) => op.area))];
    return areas.map((area) => ({ label: area, value: area }));
  });

  // Funciones para modales
  const openAddModal = () => {
    currentOperacion.value = null;
    showAddModal.value = true;
  };

  const openEditModal = (operacion: Operacion) => {
    currentOperacion.value = operacion;
    showEditModal.value = true;
  };

  const openDetailModal = (operacion: Operacion) => {
    currentOperacion.value = operacion;
    showDetailModal.value = true;
  };

  const openDeleteModal = (operacion: Operacion) => {
    currentOperacion.value = operacion;
    showDeleteModal.value = true;
  };

  const openProgressModal = (operacion: Operacion) => {
    currentOperacion.value = operacion;
    showProgressModal.value = true;
  };

  const closeAddModal = () => {
    showAddModal.value = false;
    currentOperacion.value = null;
  };

  const closeEditModal = () => {
    showEditModal.value = false;
    currentOperacion.value = null;
  };

  const closeDetailModal = () => {
    showDetailModal.value = false;
    currentOperacion.value = null;
  };

  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    currentOperacion.value = null;
  };

  const closeProgressModal = () => {
    showProgressModal.value = false;
    currentOperacion.value = null;
  };

  // Función para refrescar datos
  const refreshData = async () => {
    await store.fetchOperaciones();
    controlsState.value.filtros = {
      busqueda: "",
      tipo: [],
      estado: [],
      prioridad: [],
      area: [],
      voluntario: [],
      coordinador: [],
      soloVencidas: false,
      soloSinAsignar: false,
    };
  };

  return {
    // Estado del store - CORREGIDO: Usar refs reactivos
    operaciones,
    operacionActual,
    isLoading,
    error,
    stats,
    operacionesVencidas,
    operacionesPorEstado,

    // Datos procesados
    operacionesFiltradas,

    // Controles
    controlsState,
    tipoOptions,
    estadoOptions,
    prioridadOptions,
    areaOptions,

    // Modales
    showAddModal,
    showEditModal,
    showDetailModal,
    showDeleteModal,
    showProgressModal,
    currentOperacion,
    openAddModal,
    openEditModal,
    openDetailModal,
    openDeleteModal,
    openProgressModal,
    closeAddModal,
    closeEditModal,
    closeDetailModal,
    closeDeleteModal,
    closeProgressModal,

    // Funciones del store
    fetchOperaciones: store.fetchOperaciones,
    crearOperacion: store.crearOperacion,
    actualizarOperacion: store.actualizarOperacion,
    eliminarOperacion: store.eliminarOperacion,
    cambiarEstado: store.cambiarEstado,
    actualizarProgreso: store.actualizarProgreso,
    agregarComentario: store.agregarComentario,

    // Utilidades
    refreshData,
  };
}
