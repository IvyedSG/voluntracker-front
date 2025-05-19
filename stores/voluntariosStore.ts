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
        return true;
      } 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (err: any) {
        this.error = err?.message || "Error al cargar los voluntarios";
        console.error("Error al cargar voluntarios:", err);
        return false;
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
        const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();

        // Añadimos el voluntario al estado con historial por defecto
        this.voluntarios.push({
          id,
          ...voluntario,
          fechaRegistro: new Date().toISOString().split('T')[0],
          historial: voluntario.historial || {
            eventos: 0,
            horas: 0,
            certificados: 0
          }
        });

        return true;
      } catch (err) {
        this.error = "Error al agregar el voluntario";
        console.error("Error al agregar voluntario:", err);
        return false;
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
    
    async actualizarVoluntario(voluntario: Voluntario) {
      this.isLoading = true;
      this.error = null;
      try {
        // Simulamos una petición a la API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Encontramos y actualizamos el voluntario
        const index = this.voluntarios.findIndex(v => v.id === voluntario.id);
        if (index !== -1) {
          this.voluntarios[index] = {
            ...this.voluntarios[index],
            ...voluntario,
            // Asegurarnos de mantener el historial si no se proporciona explícitamente
            historial: voluntario.historial || this.voluntarios[index].historial
          };
          return true;
        }
        
        return false;
      } catch (err) {
        console.error("Error al actualizar voluntario:", err);
        this.error = "Error al actualizar el voluntario";
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async cambiarEstadoVoluntario(id: string, estado: 'activo' | 'inactivo') {
      this.isLoading = true;
      this.error = null;
      try {
        // Simulamos una petición a la API
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Encontramos y actualizamos el estado del voluntario
        const voluntario = this.voluntarios.find(v => v.id === id);
        if (voluntario) {
          voluntario.estado = estado;
          return true;
        }
        
        return false;
      } catch (err) {
        console.error("Error al cambiar estado:", err);
        this.error = "Error al cambiar el estado del voluntario";
        return false;
      } finally {
        this.isLoading = false;
      }
    }
  },
});
