/**
 * Formatea una fecha ISO a formato localizado DD/MM/YYYY
 */
export function formatDate(isoDate: string): string {
    if (!isoDate) return '';
    
    try {
      const date = new Date(isoDate);
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return isoDate;
    }
}