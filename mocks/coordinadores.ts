import type { Coordinador } from '~/types/coordinadores';

export const fetchMockCoordinadores = async (): Promise<Coordinador[]> => {
  // Simulamos una pequeña demora para simular una petición API
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: "1",
      nombre: "Ana García Martínez",
      correo: "ana.garcia@voluntracker.org",
      estado: "activo",
      areasAsignadas: [
        { id: "a1", nombre: "Salud" },
        { id: "a2", nombre: "Educación" }
      ],
      nivelAcceso: "avanzado",
      rol: "administrador",
      fechaRegistro: "2023-01-15",
      ultimoAcceso: "2023-05-18T14:30:00",
      ultimaSesion: "2023-05-18T14:30:00",
      verificacion2FA: true,
      dispositivosConectados: 2,
      voluntariosAsignados: 15
    },
    {
      id: "2",
      nombre: "Carlos López Hernández",
      correo: "carlos.lopez@voluntracker.org",
      estado: "activo",
      areasAsignadas: [
        { id: "a3", nombre: "Logística" }
      ],
      nivelAcceso: "basico",
      rol: "lider",
      fechaRegistro: "2023-02-20",
      ultimoAcceso: "2023-05-17T09:45:00",
      ultimaSesion: "2023-05-17T09:45:00",
      verificacion2FA: false,
      dispositivosConectados: 1,
      voluntariosAsignados: 8
    },
    {
      id: "3",
      nombre: "Marta Rodríguez Pérez",
      correo: "marta.rodriguez@voluntracker.org",
      estado: "pendiente",
      areasAsignadas: [
        { id: "a5", nombre: "Comunicación" },
        { id: "a4", nombre: "TI" }
      ],
      nivelAcceso: "avanzado",
      rol: "coordinador",
      fechaRegistro: "2023-04-10",
      ultimoAcceso: null,
      ultimaSesion: null,
      verificacion2FA: false,
      dispositivosConectados: 0,
      voluntariosAsignados: 0
    },
    {
      id: "4",
      nombre: "David Sánchez Gómez",
      correo: "david.sanchez@voluntracker.org",
      estado: "inactivo",
      areasAsignadas: [
        { id: "a6", nombre: "Administración" }
      ],
      nivelAcceso: "basico",
      rol: "coordinador",
      fechaRegistro: "2022-11-05",
      ultimoAcceso: "2023-03-22T16:15:00",
      ultimaSesion: "2023-03-22T16:15:00",
      verificacion2FA: false,
      dispositivosConectados: 0,
      voluntariosAsignados: 5
    },
    {
      id: "5",
      nombre: "Laura Fernández Torres",
      correo: "laura.fernandez@voluntracker.org",
      estado: "activo",
      areasAsignadas: [
        { id: "a2", nombre: "Educación" },
        { id: "a7", nombre: "Medio Ambiente" },
        { id: "a5", nombre: "Comunicación" }
      ],
      nivelAcceso: "avanzado",
      rol: "lider",
      fechaRegistro: "2023-03-12",
      ultimoAcceso: "2023-05-19T11:20:00",
      ultimaSesion: "2023-05-19T11:20:00",
      verificacion2FA: true,
      dispositivosConectados: 3,
      voluntariosAsignados: 12
    }
  ];
};

export const fetchMockAreas = async (): Promise<{ id: string; nombre: string }[]> => {
  return [
    { id: "a1", nombre: "Salud" },
    { id: "a2", nombre: "Educación" },
    { id: "a3", nombre: "Logística" },
    { id: "a4", nombre: "TI" },
    { id: "a5", nombre: "Comunicación" },
    { id: "a6", nombre: "Administración" },
    { id: "a7", nombre: "Medio Ambiente" },
    { id: "a8", nombre: "Desarrollo Comunitario" }
  ];
};