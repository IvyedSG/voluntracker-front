import { defineStore } from "pinia";
import type { Voluntario } from "~/types/voluntarios";
import { fetchMockVoluntarios } from "~/mocks/voluntarios";

export const useVoluntariosStore = defineStore("voluntarios", {
  state: () => ({
    voluntarios: [] as Voluntario[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchVoluntarios() {
        this.isLoading = true;
        this.error = null;
        try {
          // Añadir un tiempo de espera simulado para probar estados de carga
          await new Promise((resolve) => setTimeout(resolve, 300));
          this.voluntarios = await fetchMockVoluntarios();
        } 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (err: any) {
          this.error = err?.message || "Error al cargar los voluntarios";
          console.error("Error al cargar voluntarios:", err);
        } finally {
          this.isLoading = false;
        }
      },

    async agregarVoluntario(voluntario: Omit<Voluntario, "id">) {
      this.isLoading = true;
      this.error = null;
      try {
        // Simulamos una petición a la API
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Generamos un ID único
        const id = Date.now().toString();

        // Añadimos el voluntario al estado
        this.voluntarios.push({
          id,
          ...voluntario,
        });

        return id;
      } catch (err) {
        this.error = "Error al agregar el voluntario";
        console.error("Error al agregar voluntario:", err);
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    async eliminarVoluntario(id: string) {
        this.isLoading = true;
        this.error = null;
        try {
          // Simulamos una petición a la API
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Eliminamos el voluntario del estado
          this.voluntarios = this.voluntarios.filter(v => v.id !== id);
          
          return true;
        } catch (err) {
          if (err instanceof Error) {
            this.error = err.message || "Error al eliminar el voluntario";
          } else {
            this.error = "Error desconocido al eliminar el voluntario";
          }
          console.error("Error al eliminar voluntario:", err);
          return false;
        } finally {
          this.isLoading = false;
        }
      },
  },
});
