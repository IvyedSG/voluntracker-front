import { ref, computed, watch } from 'vue';
import { useCoordinadoresStore } from '~/stores/coordinadoresStore';
import { storeToRefs } from 'pinia';
import type { Coordinador } from '~/types/coordinadores';

export function useCoordinadores() {
  const store = useCoordinadoresStore();
  
  // Extraer datos reactivos del store
  const { coordinadores, isLoading, error } = storeToRefs(store);

  // Métodos del store
  const fetchCoordinadores = () => store.fetchCoordinadores();
  const agregarCoordinador = (data: any) => store.agregarCoordinador(data);
  const eliminarCoordinador = (id: string) => store.eliminarCoordinador(id);
  const actualizarCoordinador = (data: Coordinador) => store.actualizarCoordinador(data);
  const cambiarEstadoCoordinador = (id: string, estado: 'activo' | 'inactivo' | 'pendiente') => 
    store.cambiarEstadoCoordinador(id, estado);
  const reenviarInvitacion = (id: string) => store.reenviarInvitacion(id);

  // Vista actual (tabla o grid)
  const viewMode = ref('table');

  // Variables para controles
  const controlsState = ref({
    search: '',
    estado: null as string | null,
    rol: null as string | null,
    viewMode: 'table'
  });

  // Opciones para los selectores
  const estadoOptions = computed(() => 
    ['todos', 'activo', 'inactivo', 'pendiente'].map(estado => ({
      label: estado === 'todos' 
        ? 'Todos los estados' 
        : (estado === 'activo' 
          ? 'Activo' 
          : (estado === 'pendiente' ? 'Pendiente' : 'Inactivo')),
      value: estado
    }))
  );

  const rolOptions = computed(() => [
    { label: 'Todos los roles', value: 'todos' },
    { label: 'Administrador Global', value: 'admin_global' },
    { label: 'Líder Local', value: 'lider_local' },
    { label: 'Coordinador Local', value: 'coordinador_local' },
    { label: 'Voluntario', value: 'voluntario' }
  ]);

  // Lista filtrada de coordinadores
  const filteredCoordinadores = computed(() => {
    if (!coordinadores.value) return [];
    
    return coordinadores.value.filter(c => {
      // Filtrar por término de búsqueda
      const searchMatch =
        !controlsState.value.search ||
        c.nombre
          .toLowerCase()
          .includes(controlsState.value.search.toLowerCase()) ||
        c.correo
          .toLowerCase()
          .includes(controlsState.value.search.toLowerCase()) ||
        c.areasAsignadas.some((area) =>
          area.nombre
            .toLowerCase()
            .includes(controlsState.value.search.toLowerCase())
        );
      
      // Filtrar por estado
      const estadoMatch = controlsState.value.estado === null || 
                        controlsState.value.estado === 'todos' || 
                        c.estado === controlsState.value.estado;
      
      // Filtrar por rol
      const rolMatch = controlsState.value.rol === null || 
                       controlsState.value.rol === 'todos' || 
                       c.rol === controlsState.value.rol;
      
      return searchMatch && estadoMatch && rolMatch;
    });
  });

  // Modales
  const showAddModal = ref(false);
  const showEditModal = ref(false);
  const showDetailModal = ref(false);
  const showDeleteModal = ref(false);
  const showInviteModal = ref(false);
  const currentCoordinador = ref<Coordinador | null>(null);

  // Funciones para gestionar modales
  const openAddModal = () => {
    showAddModal.value = true;
  };

  const openEditModal = (coordinador: Coordinador) => {
    currentCoordinador.value = { ...coordinador }; // Copia para evitar modificaciones directas
    showEditModal.value = true;
  };

  const openDetailModal = (coordinador: Coordinador) => {
    currentCoordinador.value = coordinador;
    showDetailModal.value = true;
  };

  const openDeleteModal = (coordinador: Coordinador) => {
    currentCoordinador.value = coordinador;
    showDeleteModal.value = true;
  };

  const openInviteModal = (coordinador: Coordinador) => {
    currentCoordinador.value = coordinador;
    showInviteModal.value = true;
  };

  const closeAddModal = () => {
    showAddModal.value = false;
  };

  const closeEditModal = () => {
    showEditModal.value = false;
    setTimeout(() => { currentCoordinador.value = null; }, 300);
  };

  const closeDetailModal = () => {
    showDetailModal.value = false;
    setTimeout(() => { currentCoordinador.value = null; }, 300);
  };

  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    setTimeout(() => { currentCoordinador.value = null; }, 300);
  };

  const closeInviteModal = () => {
    showInviteModal.value = false;
    setTimeout(() => { currentCoordinador.value = null; }, 300);
  };

  // Reset filters
  const resetFilters = () => {
    controlsState.value = {
      search: '',
      estado: null,
      rol: null,
      viewMode: viewMode.value
    };
  };

  // Refresh data
  const refreshData = () => {
    fetchCoordinadores();
    resetFilters();
  };

  // Watch viewMode changes
  watch(() => controlsState.value.viewMode, (newMode) => {
    viewMode.value = newMode;
  });

  return {
    // Datos y acciones del store
    coordinadores,
    isLoading,
    error,
    fetchCoordinadores,
    agregarCoordinador,
    eliminarCoordinador,
    actualizarCoordinador,
    cambiarEstadoCoordinador,
    reenviarInvitacion,
    
    // Controles y filtros
    viewMode,
    controlsState,
    estadoOptions,
    rolOptions,
    filteredCoordinadores,
    resetFilters,
    
    // Modales
    showAddModal,
    showEditModal,
    showDetailModal,
    showDeleteModal,
    showInviteModal,
    currentCoordinador,
    openAddModal,
    openEditModal,
    openDetailModal,
    openDeleteModal,
    openInviteModal,
    closeAddModal,
    closeEditModal,
    closeDetailModal,
    closeDeleteModal,
    closeInviteModal,
    
    // Utilidades
    refreshData
  };
}