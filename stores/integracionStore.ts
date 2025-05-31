import type { 
  Integracion, 
  ConfiguracionIntegracion, 
  LogSincronizacion, 
  IntegracionStats 
} from '~/types/integracion'

export const useIntegracionesStore = defineStore('integraciones', () => {
  const integraciones = ref<Integracion[]>([])
  const logs = ref<LogSincronizacion[]>([])
  const stats = ref<IntegracionStats>({
    totalIntegraciones: 0,
    integracinesActivas: 0,
    ultimaSincronizacion: '',
    errorCount: 0
  })
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Cargar datos iniciales
  const cargarIntegraciones = async () => {
    loading.value = true
    error.value = null
    
    try {
      // Simular API call - reemplazar con servicio real
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Importar mocks dinámicamente para evitar errores de SSR
      const { 
        mockIntegraciones, 
        mockLogsIntegraciones, 
        mockIntegracionStats 
      } = await import('~/mocks/integracion')
      
      integraciones.value = mockIntegraciones
      logs.value = mockLogsIntegraciones
      stats.value = mockIntegracionStats
      
    } catch (err) {
      error.value = 'Error al cargar integraciones'
      console.error('Error:', err)
    } finally {
      loading.value = false
    }
  }

  // Conectar integración
  const conectarIntegracion = async (id: string, configuracion: ConfiguracionIntegracion) => {
    const integracion = integraciones.value.find(i => i.id === id)
    if (!integracion) return
    
    try {
      integracion.estado = 'configurando'
      
      // Simular proceso de conexión
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      integracion.estado = 'conectado'
      integracion.configuracion = { ...integracion.configuracion, ...configuracion }
      integracion.fechaConexion = new Date().toISOString()
      
      // Actualizar stats
      stats.value.integracinesActivas++
      
    } catch (err) {
      integracion.estado = 'error'
      throw err
    }
  }

  // Desconectar integración
  const desconectarIntegracion = async (id: string) => {
    const integracion = integraciones.value.find(i => i.id === id)
    if (!integracion) return
    
    integracion.estado = 'desconectado'
    integracion.fechaConexion = undefined
    integracion.ultimaSincronizacion = undefined
    
    // Actualizar stats
    stats.value.integracinesActivas--
  }

  // Sincronizar integración
  const sincronizarIntegracion = async (id: string) => {
    const integracion = integraciones.value.find(i => i.id === id)
    if (!integracion || integracion.estado !== 'conectado') return
    
    try {
      integracion.estado = 'sincronizando'
      
      // Simular sincronización
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      integracion.estado = 'conectado'
      integracion.ultimaSincronizacion = new Date().toISOString()
      
      // Agregar log exitoso
      const nuevoLog: LogSincronizacion = {
        id: Date.now().toString(),
        integracionId: id,
        timestamp: new Date().toISOString(),
        estado: 'exitoso',
        mensaje: `Sincronización exitosa de ${integracion.nombre}`,
        registrosProcesados: Math.floor(Math.random() * 200) + 50
      }
      logs.value.unshift(nuevoLog)
      
    } catch (err) {
      integracion.estado = 'error'
      
      // Agregar log de error
      const nuevoLog: LogSincronizacion = {
        id: Date.now().toString(),
        integracionId: id,
        timestamp: new Date().toISOString(),
        estado: 'error',
        mensaje: `Error en sincronización de ${integracion.nombre}`,
        registrosProcesados: 0
      }
      logs.value.unshift(nuevoLog)
      stats.value.errorCount++
    }
  }

  // Getters computados
  const integracinesActivas = computed(() => 
    integraciones.value.filter(i => i.estado === 'conectado')
  )
  
  const integracinesConError = computed(() => 
    integraciones.value.filter(i => i.estado === 'error')
  )

  const ultimosLogs = computed(() => 
    logs.value.slice(0, 10)
  )

  return {
    // Estado
    integraciones,
    logs,
    stats,
    loading,
    error,
    
    // Acciones
    cargarIntegraciones,
    conectarIntegracion,
    desconectarIntegracion,
    sincronizarIntegracion,
    
    // Getters
    integracinesActivas,
    integracinesConError,
    ultimosLogs
  }
})