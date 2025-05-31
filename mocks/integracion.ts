import type { 
  Integracion, 
  LogSincronizacion, 
  IntegracionStats 
} from '~/types/integracion'

export const mockIntegraciones: Integracion[] = [
  {
    id: '1',
    nombre: 'Google Sheets',
    descripcion: 'Exportación automática de datos de voluntarios y operaciones',
    proveedor: 'google_sheets',
    estado: 'conectado',
    configuracion: {
      autoSync: true,
      syncInterval: 30,
      sheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      lastExport: '2025-05-30T10:30:00Z'
    },
    fechaConexion: '2025-05-15T09:00:00Z',
    ultimaSincronizacion: '2025-05-30T10:30:00Z',
    icono: 'i-logos-google-drive',
    color: 'green'
  },
  {
    id: '2',
    nombre: 'Google Calendar',
    descripcion: 'Sincronización de eventos y recordatorios de actividades',
    proveedor: 'google_calendar',
    estado: 'desconectado',
    configuracion: {
      autoSync: false,
      syncInterval: 15,
      calendarId: 'primary',
      reminderMinutes: [10, 60]
    },
    icono: 'i-logos-google-calendar',
    color: 'blue'
  }
]

export const mockLogsIntegraciones: LogSincronizacion[] = [
  {
    id: '1',
    integracionId: '1',
    timestamp: '2025-05-30T10:30:00Z',
    estado: 'exitoso',
    mensaje: 'Datos exportados exitosamente a Google Sheets',
    registrosProcesados: 156
  }
]

export const mockIntegracionStats: IntegracionStats = {
  totalIntegraciones: 2,
  integracinesActivas: 1,
  ultimaSincronizacion: '2025-05-30T10:30:00Z',
  errorCount: 0
}