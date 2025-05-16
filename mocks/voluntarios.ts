import type { Voluntario } from '~/types/voluntarios';

export const fetchMockVoluntarios = async (): Promise<Voluntario[]> => {
  return [
    {
      id: '1',
      nombre: 'Lucía Fernández',
      dni: '12345678A',
      correo: 'lucia@example.com',
      telefono: '600123456',
      area: 'Salud',
      estado: 'activo',
      fechaRegistro: '2023-02-15',
      historial: { eventos: 12, horas: 48, certificados: 5 }
    },
    {
      id: '2',
      nombre: 'Carlos López',
      dni: '87654321B',
      correo: 'carlos@example.com',
      telefono: '600987654',
      area: 'TI',
      estado: 'inactivo',
      fechaRegistro: '2022-11-10',
      historial: { eventos: 8, horas: 32, certificados: 3 }
    }
  ];
};
