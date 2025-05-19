export interface Coordinador {
  id: string;
  nombre: string;
  correo: string;
  estado: "activo" | "inactivo" | "pendiente";
  areasAsignadas: { id: string; nombre: string }[]; // Propiedad estandarizada
  nivelAcceso: "basico" | "avanzado"; // Propiedad estandarizada
  rol:
    | "administrador"
    | "lider"
    | "coordinador"
    | "admin_global"
    | "lider_local"
    | "coordinador_local"; // Valores estandarizados
  fechaRegistro: string;
  ultimoAcceso: string | null;
  // Propiedades adicionales usadas en componentes
  ultimaSesion?: string | null;
  verificacion2FA?: boolean;
  dispositivosConectados?: number;
  voluntariosAsignados?: number;
}

export type CoordinadorNuevo = Omit<
  Coordinador,
  "id" | "fechaRegistro" | "ultimoAcceso"
>;
