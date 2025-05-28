import { defineStore } from "pinia";
import { ref, computed } from "vue"; // Agregar import de ref y computed
import type {
  Operacion,
  OperacionStats,
  OperacionFiltros,
  OperacionFormData,
  OperacionProgressData,
  OperacionComentario,
} from "~/types/operaciones";
import { operacionesMock } from "~/mocks/operaciones";

export const useOperacionesStore = defineStore("operaciones", () => {
  // Estado
  const operaciones = ref<Operacion[]>([]);
  const operacionActual = ref<Operacion | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const stats = computed((): OperacionStats => {
    const total = operaciones.value.length;
    const pendientes = operaciones.value.filter(
      (op) => op.estado === "pendiente"
    ).length;
    const enProgreso = operaciones.value.filter(
      (op) => op.estado === "en_progreso"
    ).length;
    const completadas = operaciones.value.filter(
      (op) => op.estado === "completada"
    ).length;
    const canceladas = operaciones.value.filter(
      (op) => op.estado === "cancelada"
    ).length;

    const hoy = new Date().toISOString().split("T")[0];
    const vencidas = operaciones.value.filter(
      (op) =>
        op.fechaVencimiento < hoy &&
        op.estado !== "completada" &&
        op.estado !== "cancelada"
    ).length;

    const horasTotales = operaciones.value.reduce(
      (acc, op) => acc + op.horasEstimadas,
      0
    );
    const horasReales = operaciones.value.reduce(
      (acc, op) => acc + (op.horasReales || 0),
      0
    );

    const eficiencia =
      horasTotales > 0 ? Math.round((horasReales / horasTotales) * 100) : 0;
    const promedioCompletion =
      total > 0
        ? Math.round(
            operaciones.value.reduce((acc, op) => acc + op.progreso, 0) / total
          )
        : 0;
    const promedioProgreso =
      total > 0
        ? operaciones.value.reduce((acc, op) => acc + op.progreso, 0) / total
        : 0;

    return {
      total,
      pendientes,
      enProgreso,
      completadas,
      canceladas,
      vencidas,
      horasTotales,
      horasReales,
      horasTotalEstimadas: horasTotales,
      horasTotalReales: horasReales,
      eficiencia,
      promedioCompletion,
      promedioProgreso,
    };
  });

  const operacionesVencidas = computed(() => {
    const hoy = new Date().toISOString().split("T")[0];
    return operaciones.value.filter(
      (op) =>
        op.fechaVencimiento < hoy &&
        op.estado !== "completada" &&
        op.estado !== "cancelada"
    );
  });

  const operacionesPorEstado = computed(() => {
    return {
      pendiente: operaciones.value.filter((op) => op.estado === "pendiente"),
      en_progreso: operaciones.value.filter(
        (op) => op.estado === "en_progreso"
      ),
      completada: operaciones.value.filter((op) => op.estado === "completada"),
      cancelada: operaciones.value.filter((op) => op.estado === "cancelada"),
    };
  });

  // Funciones para filtrar
  const aplicarFiltros = (filtros: OperacionFiltros) => {
    return operaciones.value.filter((operacion) => {
      // Búsqueda por texto
      if (filtros.busqueda) {
        const busqueda = filtros.busqueda.toLowerCase();
        const coincide =
          operacion.nombreActividad.toLowerCase().includes(busqueda) ||
          operacion.descripcion.toLowerCase().includes(busqueda) ||
          operacion.voluntarioNombre.toLowerCase().includes(busqueda) ||
          operacion.area.toLowerCase().includes(busqueda) ||
          operacion.tags.some((tag) => tag.toLowerCase().includes(busqueda));

        if (!coincide) return false;
      }

      // Filtros por arrays
      if (filtros.tipo.length && !filtros.tipo.includes(operacion.tipo))
        return false;
      if (filtros.estado.length && !filtros.estado.includes(operacion.estado))
        return false;
      if (
        filtros.prioridad.length &&
        !filtros.prioridad.includes(operacion.prioridad)
      )
        return false;
      if (filtros.area.length && !filtros.area.includes(operacion.area))
        return false;
      if (
        filtros.voluntario.length &&
        !filtros.voluntario.includes(operacion.voluntarioId)
      )
        return false;
      if (
        filtros.coordinador.length &&
        operacion.coordinadorId &&
        !filtros.coordinador.includes(operacion.coordinadorId)
      )
        return false;

      // Filtros por fechas
      if (filtros.fechaInicio && operacion.fechaInicio < filtros.fechaInicio)
        return false;
      if (
        filtros.fechaVencimiento &&
        operacion.fechaVencimiento > filtros.fechaVencimiento
      )
        return false;

      // Filtros especiales
      if (filtros.soloVencidas) {
        const hoy = new Date().toISOString().split("T")[0];
        if (
          !(
            operacion.fechaVencimiento < hoy &&
            operacion.estado !== "completada" &&
            operacion.estado !== "cancelada"
          )
        ) {
          return false;
        }
      }

      if (filtros.soloSinAsignar && operacion.voluntarioId) return false;

      return true;
    });
  };

  // Actions
  const fetchOperaciones = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // En un caso real, esto sería una llamada a la API
      operaciones.value = operacionesMock;
    } catch (err) {
      error.value = "Error al cargar las operaciones";
      console.error("Error fetching operaciones:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const crearOperacion = async (data: OperacionFormData): Promise<boolean> => {
    try {
      isLoading.value = true;
      error.value = null;

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 500));

      const nuevaOperacion: Operacion = {
        id: `op-${Date.now()}`,
        ...data,
        estado: "pendiente",
        progreso: 0,
        comentarios: [],
        archivos: [],
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
        creadoPor: "current-user-id",
        actualizadoPor: "current-user-id",
        voluntarioNombre: getVoluntarioNombre(data.voluntarioId),
        coordinadorNombre: data.coordinadorId
          ? getCoordinadorNombre(data.coordinadorId)
          : undefined,
      };

      operaciones.value.push(nuevaOperacion);
      return true;
    } catch (err) {
      error.value = "Error al crear la operación";
      console.error("Error creating operacion:", err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const actualizarOperacion = async (
    id: string,
    data: Partial<OperacionFormData>
  ): Promise<boolean> => {
    try {
      isLoading.value = true;
      error.value = null;

      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = operaciones.value.findIndex((op) => op.id === id);
      if (index === -1) {
        throw new Error("Operación no encontrada");
      }

      operaciones.value[index] = {
        ...operaciones.value[index],
        ...data,
        fechaActualizacion: new Date().toISOString(),
        actualizadoPor: "current-user-id",
        voluntarioNombre: data.voluntarioId
          ? getVoluntarioNombre(data.voluntarioId)
          : operaciones.value[index].voluntarioNombre,
        coordinadorNombre: data.coordinadorId
          ? getCoordinadorNombre(data.coordinadorId)
          : operaciones.value[index].coordinadorNombre,
      };

      return true;
    } catch (err) {
      error.value = "Error al actualizar la operación";
      console.error("Error updating operacion:", err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const eliminarOperacion = async (id: string): Promise<boolean> => {
    try {
      isLoading.value = true;
      error.value = null;

      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = operaciones.value.findIndex((op) => op.id === id);
      if (index === -1) {
        throw new Error("Operación no encontrada");
      }

      operaciones.value.splice(index, 1);
      return true;
    } catch (err) {
      error.value = "Error al eliminar la operación";
      console.error("Error deleting operacion:", err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const cambiarEstado = async (
    id: string,
    nuevoEstado: Operacion["estado"]
  ): Promise<boolean> => {
    try {
      const operacion = operaciones.value.find((op) => op.id === id);
      if (!operacion) {
        throw new Error("Operación no encontrada");
      }

      operacion.estado = nuevoEstado;
      operacion.fechaActualizacion = new Date().toISOString();

      if (nuevoEstado === "completada") {
        operacion.fechaCompletada = new Date().toISOString();
        operacion.progreso = 100;
      }

      return true;
    } catch (err) {
      error.value = "Error al cambiar el estado";
      console.error("Error changing status:", err);
      return false;
    }
  };

  const actualizarProgreso = async (
    id: string,
    progreso: number,
    horasReales?: number
  ): Promise<boolean> => {
    try {
      const operacion = operaciones.value.find((op) => op.id === id);
      if (!operacion) {
        throw new Error("Operación no encontrada");
      }

      operacion.progreso = progreso;
      if (horasReales !== undefined) {
        operacion.horasReales = horasReales;
      }
      operacion.fechaActualizacion = new Date().toISOString();

      // Cambiar estado automáticamente
      if (progreso === 100) {
        operacion.estado = "completada";
        operacion.fechaCompletada = new Date().toISOString();
      } else if (progreso > 0 && operacion.estado === "pendiente") {
        operacion.estado = "en_progreso";
      }

      return true;
    } catch (err) {
      error.value = "Error al actualizar el progreso";
      console.error("Error updating progress:", err);
      return false;
    }
  };

  const agregarComentario = async (
    id: string,
    contenido: string
  ): Promise<boolean> => {
    try {
      const operacion = operaciones.value.find((op) => op.id === id);
      if (!operacion) {
        throw new Error("Operación no encontrada");
      }

      const nuevoComentario: OperacionComentario = {
        id: `com-${Date.now()}`,
        operacionId: id,
        autorId: "current-user-id",
        autorNombre: "Usuario Actual",
        contenido,
        fecha: new Date().toISOString(),
        tipo: "comentario",
      };

      operacion.comentarios.push(nuevoComentario);
      operacion.fechaActualizacion = new Date().toISOString();

      return true;
    } catch (err) {
      error.value = "Error al agregar el comentario";
      console.error("Error adding comment:", err);
      return false;
    }
  };

  const setOperacionActual = (operacion: Operacion | null) => {
    operacionActual.value = operacion;
  };

  // Funciones auxiliares
  const getVoluntarioNombre = (id: string): string => {
    const voluntarios = {
      "vol-001": "Ana García",
      "vol-002": "Carlos Mendoza",
      "vol-003": "María Rodríguez",
      "vol-004": "Pedro Silva",
      "vol-005": "Laura Jiménez",
    };
    return voluntarios[id] || "Voluntario Desconocido";
  };

  const getCoordinadorNombre = (id: string): string => {
    const coordinadores = {
      "coord-001": "Dr. Juan Pérez",
      "coord-002": "Lic. Ana Martínez",
      "coord-003": "Ing. Carlos López",
    };
    return coordinadores[id] || "Coordinador Desconocido";
  };

  return {
    // Estado - CORREGIDO: Remover readonly()
    operaciones,
    operacionActual,
    isLoading,
    error,

    // Getters
    stats,
    operacionesVencidas,
    operacionesPorEstado,

    // Funciones
    aplicarFiltros,
    fetchOperaciones,
    crearOperacion,
    actualizarOperacion,
    eliminarOperacion,
    cambiarEstado,
    actualizarProgreso,
    agregarComentario,
    setOperacionActual,
  };
});
