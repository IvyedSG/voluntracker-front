import { defineStore } from 'pinia';
import type { Ong } from '~/types/ong';
import { mockOngs } from '~/mocks/ong';

export const useOngStore = defineStore('ong', () => {
  // Estado
  const ong = ref<Ong | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters

  // Acciones
  function setLoading(value: boolean) {
    loading.value = value;
  }

  function setError(errorMsg: string | null) {
    error.value = errorMsg;
  }

  async function cargarOng(id: string) {
    loading.value = true;
    error.value = null;
    
    try {
      // En producción, esto sería una llamada API
      // Por ahora, buscamos en los mocks
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
      
      const ongEncontrada = mockOngs.find(o => o.id === id);
      
      if (!ongEncontrada) {
        throw new Error('ONG no encontrada');
      }
      
      ong.value = { ...ongEncontrada };
      
    } catch (e) {
      console.error('Error al cargar ONG:', e);
      if (e instanceof Error) {
        error.value = e.message;
      } else {
        error.value = 'Error desconocido al cargar la ONG';
      }
      
    } finally {
      loading.value = false;
    }
  }

  async function actualizarOng(datosActualizados: Partial<Ong>) {
    if (!ong.value || !ong.value.id) {
      error.value = 'No hay ONG seleccionada para actualizar';
      return;
    }
    
    loading.value = true;
    error.value = null;
    
    try {
      // En producción, esto sería una llamada API
      await new Promise(resolve => setTimeout(resolve, 800)); // Simular delay
      
      // Actualizar localmente
      ong.value = {
        ...ong.value,
        ...datosActualizados
      };
      
    } catch (e) {
      console.error('Error al actualizar ONG:', e);
      if (e instanceof Error) {
        error.value = e.message;
      } else {
        error.value = 'Error desconocido al actualizar la ONG';
      }
      
    } finally {
      loading.value = false;
    }
  }

  return {
    // Estado
    ong,
    loading,
    error,
    
    // Acciones
    setLoading,
    setError,
    cargarOng,
    actualizarOng
  };
});