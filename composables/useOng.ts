import type { Ong, EstadoOng, AreaOng, DocumentoOng } from '~/types/ong';

export const useOng = () => {
  // Store
  const ongStore = useOngStore();
  
  // Router para navegación
  const router = useRouter();

  // Cargar datos de la ONG actual
  const cargarOngActual = async () => {
    // En una implementación real, esto cargaría los datos desde una API
    // Por ahora, usamos un timeout para simular una carga asíncrona
    ongStore.setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // En producción, esto vendría de una API
      const route = useRoute();
      const ongId = route.params.ongId?.toString() || '2'; // Default a 'ONG Pastelitos'
      
      // Usar el store para cargar la ONG
      await ongStore.cargarOng(ongId);
      
    } catch (error) {
      console.error('Error al cargar la ONG:', error);
      ongStore.setError('No se pudo cargar la información de la ONG');
    } finally {
      ongStore.setLoading(false);
    }
  };

  // Formatear fecha
  const formatearFecha = (fecha: string): string => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtener color de estado
  const getEstadoColor = (estado: EstadoOng): string => {
    const colores = {
      activa: 'green',
      inactiva: 'gray',
      pendiente: 'yellow',
      suspendida: 'red'
    };
    
    return colores[estado] || 'gray';
  };

  // Obtener nombre de estado para mostrar
  const getEstadoNombre = (estado: EstadoOng): string => {
    const nombres = {
      activa: 'Activa',
      inactiva: 'Inactiva',
      pendiente: 'Pendiente',
      suspendida: 'Suspendida'
    };
    
    return nombres[estado] || 'Desconocido';
  };

  // Formatear tamaño de archivo
  const formatearTamaño = (bytes?: number): string => {
    if (!bytes) return 'Desconocido';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  // Obtener icono para tipo de documento
  const getDocumentoIcon = (tipo: DocumentoOng['tipo']): string => {
    const iconos = {
      estatuto: 'i-heroicons-document-text',
      certificacion: 'i-heroicons-check-badge',
      memoria: 'i-heroicons-book-open',
      otro: 'i-heroicons-document'
    };
    
    return iconos[tipo] || 'i-heroicons-document';
  };

  // Retornar utilidades
  return {
    // Propiedades reactivas
    ong: computed(() => ongStore.ong),
    loading: computed(() => ongStore.loading),
    error: computed(() => ongStore.error),
    
    // Métodos
    cargarOngActual,
    formatearFecha,
    getEstadoColor,
    getEstadoNombre,
    formatearTamaño,
    getDocumentoIcon
  };
};