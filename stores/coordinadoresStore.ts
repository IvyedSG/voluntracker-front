import { defineStore } from "pinia";
import type { Coordinador } from "~/types/coordinadores";
import { fetchMockCoordinadores, fetchMockAreas } from "~/mocks/coordinadores";

export const useCoordinadoresStore = defineStore("coordinadores", {
  state: () => ({
    coordinadores: [] as Coordinador[],
    areas: [] as { id: string; nombre: string }[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCoordinadores() {
      this.isLoading = true;
      this.error = null;
      try {
        // Añadir un tiempo de espera simulado para probar estados de carga
        await new Promise((resolve) => setTimeout(resolve, 300));
        this.coordinadores = await fetchMockCoordinadores();
        return true;
      } catch (err: unknown) {
        if (err instanceof Error) {
          this.error = err.message || "Error al cargar los coordinadores";
        } else {
          this.error = "Error al cargar los coordinadores";
        }
        console.error("Error al cargar coordinadores:", err);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchAreas() {
      try {
        this.areas = await fetchMockAreas();
        return true;
      } catch (err: unknown) {
        console.error("Error al cargar áreas:", err);
        return false;
      }
    },

    async agregarCoordinador(
      coordinador: Omit<Coordinador, "id" | "fechaRegistro">
    ) {
      this.isLoading = true;
      this.error = null;
      try {
        console.log("Store: Recibiendo coordinador para agregar:", coordinador); // ✅ Debug

        // Simulamos una petición a la API
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Generamos un ID único
        const id = crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString();

        // ✅ FORMATO CORRECTO PARA AGREGAR AL ESTADO
        const nuevoCoordinador = {
          id,
          ...coordinador,
          fechaRegistro: new Date().toISOString().split("T")[0],
          ultimoAcceso: null,
        };

        console.log("Store: Agregando coordinador:", nuevoCoordinador); // ✅ Debug

        // Añadimos el coordinador al estado
        this.coordinadores.push(nuevoCoordinador);

        console.log("Store: Coordinadores actualizados:", this.coordinadores); // ✅ Debug

        return true;
      } catch (err) {
        this.error = "Error al agregar el coordinador";
        console.error("Error al agregar coordinador:", err);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async enviarInvitacion(id: string, mensajePersonalizado?: string) {
      this.isLoading = true;
      this.error = null;
      try {
        // Simulamos una petición a la API
        await new Promise((resolve) => setTimeout(resolve, 700));

        // Verificamos que el coordinador existe
        const coordinador = this.coordinadores.find((c) => c.id === id);
        if (coordinador) {
          // Si el coordinador está inactivo, lo cambiamos a pendiente
          if (coordinador.estado === "inactivo") {
            coordinador.estado = "pendiente";
          }

          // En un caso real, aquí enviaríamos el email con el mensaje personalizado
          console.log(
            `Invitación enviada a ${coordinador.correo} con mensaje: ${
              mensajePersonalizado || "Sin mensaje personalizado"
            }`
          );

          return true;
        }

        return false;
      } catch (err) {
        console.error("Error al enviar invitación:", err);
        this.error = "Error al enviar la invitación al coordinador";
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async reenviarInvitacion(id: string, mensajePersonalizado?: string) {
      // Reutilizar la lógica de enviarInvitacion
      return this.enviarInvitacion(id, mensajePersonalizado);
    },

    async cambiarEstadoCoordinador(
      id: string,
      estado: "activo" | "inactivo" | "pendiente"
    ) {
      this.isLoading = true;
      this.error = null;
      try {
        // Simulamos una petición a la API
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Encontramos y actualizamos el estado del coordinador
        const coordinador = this.coordinadores.find((c) => c.id === id);
        if (coordinador) {
          coordinador.estado = estado;
          return true;
        }

        return false;
      } catch (err) {
        console.error("Error al cambiar estado:", err);
        this.error = "Error al cambiar el estado del coordinador";
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async eliminarCoordinador(id: string) {
      this.isLoading = true;
      this.error = null;
      try {
        // Simulamos una petición a la API
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Eliminamos el coordinador del estado
        this.coordinadores = this.coordinadores.filter((c) => c.id !== id);

        return true;
      } catch (err) {
        if (err instanceof Error) {
          this.error = err.message || "Error al eliminar el coordinador";
        } else {
          this.error = "Error desconocido al eliminar el coordinador";
        }
        console.error("Error al eliminar coordinador:", err);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async actualizarCoordinador(coordinador: Coordinador) {
      this.isLoading = true;
      this.error = null;
      try {
        // Simulamos una petición a la API
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Encontramos y actualizamos el coordinador
        const index = this.coordinadores.findIndex(
          (c) => c.id === coordinador.id
        );
        if (index !== -1) {
          this.coordinadores[index] = {
            ...coordinador,
          };
          return true;
        }

        return false;
      } catch (err) {
        console.error("Error al actualizar coordinador:", err);
        this.error = "Error al actualizar el coordinador";
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async activarCoordinador(id: string) {
      return this.cambiarEstadoCoordinador(id, "activo");
    },

    async desactivarCoordinador(id: string) {
      return this.cambiarEstadoCoordinador(id, "inactivo");
    },

    // Método útil para obtener un solo coordinador por ID
    getCoordinadorById(id: string): Coordinador | undefined {
      return this.coordinadores.find((c) => c.id === id);
    },
  },
});
