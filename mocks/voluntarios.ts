import type { Voluntario } from "~/types/voluntarios";

export const fetchMockVoluntarios = async (): Promise<Voluntario[]> => {
  return [
    {
      id: "1",
      nombre: "Lucía Fernández",
      dni: "12345678A",
      correo: "lucia@example.com",
      telefono: "600123456",
      area: "Salud",
      estado: "activo",
      fechaRegistro: "2023-02-15",
      historial: { eventos: 12, horas: 48, certificados: 5 },
    },
    {
      id: "2",
      nombre: "Carlos López",
      dni: "87654321B",
      correo: "carlos@example.com",
      telefono: "600987654",
      area: "TI",
      estado: "inactivo",
      fechaRegistro: "2022-11-10",
      historial: { eventos: 8, horas: 32, certificados: 3 },
    },
    {
      id: "3",
      nombre: "Ana Martínez",
      dni: "45678912C",
      correo: "ana.martinez@example.com",
      telefono: "612345789",
      area: "Educación",
      estado: "activo",
      fechaRegistro: "2023-04-20",
      historial: { eventos: 15, horas: 62, certificados: 4 },
    },
    {
      id: "4",
      nombre: "Javier Sánchez",
      dni: "56781234D",
      correo: "javier@example.com",
      telefono: "644789123",
      area: "Logística",
      estado: "activo",
      fechaRegistro: "2023-01-05",
      historial: { eventos: 20, horas: 85, certificados: 6 },
    },
    {
      id: "5",
      nombre: "María Rodríguez",
      dni: "34567891E",
      correo: "maria.rodriguez@example.com",
      telefono: "655432198",
      area: "Legal",
      estado: "inactivo",
      fechaRegistro: "2022-09-15",
      historial: { eventos: 5, horas: 18, certificados: 1 },
    },
    // Se pueden agregar más voluntarios de ejemplo aquí
  ];
};