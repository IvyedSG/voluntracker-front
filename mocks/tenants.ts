import type { Tenant } from '~/composables/useTenant'

export const mockTenants: Tenant[] = [
  {
    id: '1',
    nombre: 'Cruz Roja Argentina',
    logo: 'https://i.pravatar.cc/150?u=tenant1',
    subdominio: 'cruzroja',
    correo: 'admin@cruzroja.org',
    fechaCreacion: '2023-06-12T10:30:00Z',
    plan: 'Premium',
    numVoluntarios: 156,
    activo: true,
    colorPrimario: '#e34850'
  },
  {
    id: '2',
    nombre: 'Fundación Esperanza',
    logo: 'https://i.pravatar.cc/150?u=tenant2',
    subdominio: 'esperanza',
    correo: 'contacto@esperanza.org',
    fechaCreacion: '2023-08-15T14:15:00Z',
    plan: 'Pro',
    numVoluntarios: 78,
    activo: true,
    colorPrimario: '#3b82f6'
  },
  {
    id: '3',
    nombre: 'Voluntarios Unidos',
    logo: 'https://i.pravatar.cc/150?u=tenant3',
    subdominio: 'vol-unidos',
    correo: 'info@vol-unidos.org',
    fechaCreacion: '2023-10-21T09:45:00Z',
    plan: 'Gratuito',
    numVoluntarios: 24,
    activo: false,
    colorPrimario: '#16a34a'
  },
  {
    id: '4',
    nombre: 'Greenpeace Local',
    logo: 'https://i.pravatar.cc/150?u=tenant4',
    subdominio: 'greenpeace-local',
    correo: 'contacto@greenpeace-local.org',
    fechaCreacion: '2024-01-08T11:30:00Z',
    plan: 'Premium',
    numVoluntarios: 98,
    activo: true,
    colorPrimario: '#15803d'
  },
  {
    id: '5',
    nombre: 'Cáritas Diocesana',
    logo: 'https://i.pravatar.cc/150?u=tenant5',
    subdominio: 'caritas',
    correo: 'admin@caritas.org',
    fechaCreacion: '2024-03-17T16:20:00Z',
    plan: 'Pro',
    numVoluntarios: 112,
    activo: true,
    colorPrimario: '#dc2626'
  },
  {
    id: '6',
    nombre: 'Médicos Sin Fronteras',
    logo: 'https://i.pravatar.cc/150?u=tenant6',
    subdominio: 'msf',
    correo: 'info@msf.org',
    fechaCreacion: '2023-09-03T08:20:00Z',
    plan: 'Premium',
    numVoluntarios: 203,
    activo: true,
    colorPrimario: '#0284c7'
  },
  {
    id: '7',
    nombre: 'Protectora de Animales',
    logo: 'https://i.pravatar.cc/150?u=tenant7',
    subdominio: 'protectora',
    correo: 'contacto@protectora.org',
    fechaCreacion: '2023-11-11T15:40:00Z',
    plan: 'Gratuito',
    numVoluntarios: 45,
    activo: true,
    colorPrimario: '#854d0e'
  }
]

// Función para obtener datos mock con un delay simulado
export async function fetchMockTenants(): Promise<Tenant[]> {
  // Simular una llamada a API
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [...mockTenants]
}