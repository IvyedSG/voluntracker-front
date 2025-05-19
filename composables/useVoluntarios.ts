import { ref, computed, watch } from 'vue';
import { useVoluntariosStore } from '~/stores/voluntariosStore';
import { storeToRefs } from 'pinia';
import type { Voluntario } from '~/types/voluntarios';

export function useVoluntarios() {
  const store = useVoluntariosStore();
  
  // Extraer datos reactivos del store
  const { voluntarios, isLoading, error } = storeToRefs(store);

  // Métodos del store
  const fetchVoluntarios = () => store.fetchVoluntarios();
  const agregarVoluntario = (voluntario: Omit<Voluntario, "id">) => store.agregarVoluntario(voluntario);
  const eliminarVoluntario = (id: string) => store.eliminarVoluntario(id);
  const actualizarVoluntario = (voluntario: Voluntario) => store.actualizarVoluntario(voluntario);
  const cambiarEstadoVoluntario = (id: string, estado: 'activo' | 'inactivo') => 
    store.cambiarEstadoVoluntario(id, estado);

  // Vista actual (tabla o grid)
  const viewMode = ref('table');

  // Variables para controles
  const controlsState = ref({
    search: '',
    estado: null as string | null,
    area: null as string | null,
    viewMode: 'table'
  });

  // Opciones para los selectores
  const estadoOptions = computed(() => 
    ['todos', 'activo', 'inactivo'].map(estado => ({
      label: estado === 'todos' ? 'Todos los estados' : 
            (estado === 'activo' ? 'Activo' : 'Inactivo'),
      value: estado
    }))
  );

  const areaOptions = computed(() => {
    if (!voluntarios.value || voluntarios.value.length === 0) 
      return [{ label: 'Todas las áreas', value: 'todas' }];
    
    const areas = new Set<string>();
    voluntarios.value.forEach(v => areas.add(v.area));
    
    return [
      { label: 'Todas las áreas', value: 'todas' },
      ...Array.from(areas).map(area => ({ label: area, value: area }))
    ];
  });

  // Lista filtrada de voluntarios
  const filteredVoluntarios = computed(() => {
    if (!voluntarios.value) return [];
    
    return voluntarios.value.filter(v => {
      // Filtrar por término de búsqueda
      const searchMatch = !controlsState.value.search || 
        v.nombre.toLowerCase().includes(controlsState.value.search.toLowerCase()) ||
        v.correo.toLowerCase().includes(controlsState.value.search.toLowerCase()) ||
        v.dni.toLowerCase().includes(controlsState.value.search.toLowerCase());
      
      // Filtrar por estado
      const estadoMatch = controlsState.value.estado === null || 
                        controlsState.value.estado === 'todos' || 
                        v.estado === controlsState.value.estado;
      
      // Filtrar por área
      const areaMatch = controlsState.value.area === null || 
                       controlsState.value.area === 'todas' || 
                       v.area === controlsState.value.area;
      
      return searchMatch && estadoMatch && areaMatch;
    });
  });

  // Modales
  const showAddModal = ref(false);
  const showEditModal = ref(false);
  const showDetailModal = ref(false);
  const showDeleteModal = ref(false);
  const currentVoluntario = ref<Voluntario | null>(null);

  // Funciones para gestionar modales
  const openAddModal = () => {
    showAddModal.value = true;
  };

  const openEditModal = (voluntario: Voluntario) => {
    currentVoluntario.value = { ...voluntario }; // Copia para evitar modificaciones directas
    showEditModal.value = true;
  };

  const openDetailModal = (voluntario: Voluntario) => {
    currentVoluntario.value = voluntario;
    showDetailModal.value = true;
  };

  const openDeleteModal = (voluntario: Voluntario) => {
    currentVoluntario.value = voluntario;
    showDeleteModal.value = true;
  };

  const closeAddModal = () => {
    showAddModal.value = false;
  };

  const closeEditModal = () => {
    showEditModal.value = false;
    setTimeout(() => { currentVoluntario.value = null; }, 300);
  };

  const closeDetailModal = () => {
    showDetailModal.value = false;
    setTimeout(() => { currentVoluntario.value = null; }, 300);
  };

  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    setTimeout(() => { currentVoluntario.value = null; }, 300);
  };

  // Reset filters
  const resetFilters = () => {
    controlsState.value = {
      search: '',
      estado: null,
      area: null,
      viewMode: viewMode.value
    };
  };

  // Refresh data
  const refreshData = () => {
    fetchVoluntarios();
    resetFilters();
  };

  // Watch viewMode changes
  watch(() => controlsState.value.viewMode, (newMode) => {
    viewMode.value = newMode;
  });

  return {
    // Datos y acciones del store
    voluntarios,
    isLoading,
    error,
    fetchVoluntarios,
    agregarVoluntario,
    eliminarVoluntario,
    actualizarVoluntario,
    cambiarEstadoVoluntario,
    
    // Controles y filtros
    viewMode,
    controlsState,
    estadoOptions,
    areaOptions,
    filteredVoluntarios,
    resetFilters,
    
    // Modales
    showAddModal,
    showEditModal,
    showDetailModal,
    showDeleteModal,
    currentVoluntario,
    openAddModal,
    openEditModal,
    openDetailModal,
    openDeleteModal,
    closeAddModal,
    closeEditModal,
    closeDetailModal,
    closeDeleteModal,
    
    // Utilidades
    refreshData
  };
}