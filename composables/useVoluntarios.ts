import { useVoluntariosStore } from "~/stores/voluntariosStore";
import type { Voluntario } from "~/types/voluntarios";
import { storeToRefs } from "pinia"; // Esta importación ya está incluida

export function useVoluntarios() {
  const store = useVoluntariosStore();

  // Ya está usando storeToRefs para propiedades reactivas del store
  const { voluntarios, isLoading, error } = storeToRefs(store);

  // Las acciones se llaman directamente
  const fetchVoluntarios = () => store.fetchVoluntarios();

  const agregarVoluntario = async (voluntario: Omit<Voluntario, "id">) => {
    return store.agregarVoluntario(voluntario);
  };

  const eliminarVoluntario = async (id: string) => {
    return store.eliminarVoluntario(id);
  };

  return {
    voluntarios,
    isLoading,
    error,
    fetchVoluntarios,
    agregarVoluntario,
    eliminarVoluntario,
  };
}
