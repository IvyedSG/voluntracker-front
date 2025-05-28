/**
 * Formatea una fecha ISO a formato localizado DD/MM/YYYY
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return "No disponible";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch (error) {
    return "Fecha inválida";
  }
}

export function formatDateTime(dateString: string | null): string {
  if (!dateString) return "No disponible";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "Fecha inválida";
  }
}
