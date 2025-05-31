export interface Integracion {
  id: string
  nombre: string
  descripcion: string
  proveedor: ProveedorIntegracion
  estado: EstadoIntegracion
  configuracion: ConfiguracionIntegracion
  fechaConexion?: string
  ultimaSincronizacion?: string
  icono: string
  color: string
}

export type ProveedorIntegracion = 
  | 'google_sheets' 
  | 'google_calendar' 
  | 'api_externa' 
  | 'slack' 
  | 'whatsapp' 
  | 'email'

export type EstadoIntegracion = 
  | 'desconectado' 
  | 'conectado' 
  | 'sincronizando' 
  | 'error' 
  | 'configurando'

export interface ConfiguracionIntegracion {
  [key: string]: any
  autoSync?: boolean
  syncInterval?: number // minutos
  webhookUrl?: string
  apiKey?: string
  scopes?: string[]
}

export interface IntegracionStats {
  totalIntegraciones: number
  integracinesActivas: number
  ultimaSincronizacion: string
  errorCount: number
}

export interface LogSincronizacion {
  id: string
  integracionId: string
  timestamp: string
  estado: 'exitoso' | 'error' | 'parcial'
  mensaje: string
  registrosProcesados?: number
}