import type { 
  Integracion, 
  ConfiguracionIntegracion, 
  EstadoIntegracion, 
  ProveedorIntegracion 
} from '~/types/integracion'

export const useIntegraciones = () => {
  const integraciones = ref<Integracion[]>([])
  const loading = ref(false)

  // Cargar datos iniciales
  const cargarIntegraciones = async () => {
    loading.value = true
    
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Importar mocks dinámicamente
      const { mockIntegraciones } = await import('~/mocks/integracion')
      integraciones.value = mockIntegraciones
      
    } catch (error) {
      console.error('Error al cargar integraciones:', error)
    } finally {
      loading.value = false
    }
  }

  // Inicializar al montar
  onMounted(() => {
    if (integraciones.value.length === 0) {
      cargarIntegraciones()
    }
  })

  // Utilidades para UI
  const getEstadoColor = (estado: EstadoIntegracion) => {
    const colores = {
      conectado: 'green',
      desconectado: 'gray',
      sincronizando: 'blue',
      error: 'red',
      configurando: 'yellow'
    }
    return colores[estado] || 'gray'
  }

  const getEstadoLabel = (estado: EstadoIntegracion) => {
    const labels = {
      conectado: 'Conectado',
      desconectado: 'Desconectado',
      sincronizando: 'Sincronizando...',
      error: 'Error',
      configurando: 'Configurando...'
    }
    return labels[estado] || estado
  }

  // Formateo de fechas
  const formatearFecha = (fecha?: string) => {
    if (!fecha) return 'Nunca'
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(fecha))
  }

  return {
    // Estado
    integraciones: readonly(integraciones),
    loading: readonly(loading),
    
    // Utilidades
    getEstadoColor,
    getEstadoLabel,
    formatearFecha,
    
    // Acciones
    cargarIntegraciones
  }
}