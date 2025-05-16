// filepath: d:\Diego\Escritorio\Voluntracker\voluntracker-front\types\voluntarios.ts
export interface Voluntario {
  id: string;
  nombre: string;
  dni: string;
  correo: string;
  telefono: string;
  area: string;
  estado: string;
  fechaRegistro: string;
  historial: {
    eventos: number;
    horas: number;
    certificados: number;
  };
}
