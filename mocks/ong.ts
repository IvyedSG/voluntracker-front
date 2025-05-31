import type { Ong, EstadoOng, AreaOng } from '~/types/ong';

// Datos mock para áreas de ONGs
export const mockAreasOng: AreaOng[] = [
  {
    id: '1',
    nombre: 'Educación',
    descripcion: 'Programas educativos para niños y jóvenes',
    color: '#4F46E5',
    icono: 'i-heroicons-academic-cap'
  },
  {
    id: '2',
    nombre: 'Medio Ambiente',
    descripcion: 'Conservación y protección del medio ambiente',
    color: '#059669',
    icono: 'i-heroicons-globe-americas'
  },
  {
    id: '3',
    nombre: 'Salud',
    descripcion: 'Apoyo a programas de salud comunitaria',
    color: '#DC2626',
    icono: 'i-heroicons-heart'
  },
  {
    id: '4',
    nombre: 'Desarrollo Comunitario',
    descripcion: 'Fortalecimiento de comunidades vulnerables',
    color: '#D97706',
    icono: 'i-heroicons-home'
  }
];

// Datos mock para ONGs
export const mockOngs: Ong[] = [
  {
    id: '1',
    nombre: 'Fundación Esperanza Viva',
    logo: '/img/ongs/logo-esperanza-viva.png',
    banner: '/img/ongs/banner-esperanza-viva.jpg',
    descripcion: 'Organización dedicada a mejorar la calidad de vida de niños y jóvenes en situación de vulnerabilidad social mediante programas educativos y recreativos.',
    mision: 'Brindar oportunidades de desarrollo integral a niños y jóvenes en situación de vulnerabilidad social a través de programas educativos, culturales y deportivos.',
    vision: 'Ser referentes en el desarrollo de programas educativos innovadores que transformen la vida de niños y jóvenes.',
    fechaCreacion: '2010-03-15',
    direccion: {
      calle: 'Av. Los Robles',
      numero: '1250',
      ciudad: 'Santiago',
      region: 'Metropolitana',
      pais: 'Chile',
      codigoPostal: '7500000',
      coordenadas: {
        latitud: -33.4569,
        longitud: -70.6483
      }
    },
    contacto: {
      email: 'contacto@esperanzaviva.org',
      telefono: '+56 2 2123 4567',
      sitioWeb: 'www.esperanzaviva.org',
      personaContacto: 'María González',
      emailContacto: 'maria.gonzalez@esperanzaviva.org'
    },
    redes: {
      facebook: 'https://facebook.com/fundacionesperanzaviva',
      instagram: 'https://instagram.com/esperanzaviva',
      twitter: 'https://twitter.com/esperanzaviva',
      linkedin: 'https://linkedin.com/company/esperanzaviva',
      youtube: 'https://youtube.com/esperanzaviva'
    },
    stats: {
      voluntariosActivos: 120,
      actividadesRealizadas: 450,
      horasVoluntariado: 5200,
      beneficiariosAlcanzados: 2300,
      proyectosActivos: 8
    },
    areas: [
      mockAreasOng[0],
      mockAreasOng[3],
    ],
    documentos: [
      {
        id: 'doc1',
        tipo: 'estatuto',
        nombre: 'Estatutos Fundación',
        url: '/documentos/estatutos-fundacion.pdf',
        fechaSubida: '2021-05-12',
        tamaño: 2540000
      },
      {
        id: 'doc2',
        tipo: 'certificacion',
        nombre: 'Certificado de Donaciones',
        url: '/documentos/certificado-donaciones.pdf',
        fechaSubida: '2023-01-20',
        tamaño: 1250000
      }
    ],
    configuracion: {
      temaPersonalizado: {
        colorPrimario: '#4F46E5',
        colorSecundario: '#818CF8',
        fuentePrincipal: 'Poppins'
      },
      privacidad: {
        perfilPublico: true,
        mostrarEstadisticas: true,
        mostrarContacto: true
      },
      notificaciones: {
        email: true,
        push: true,
        frecuencia: 'semanal'
      }
    },
    estado: 'activa'
  },
  {
    id: '2',
    nombre: 'ONG Pastelitos',
    logo: '/img/ongs/logo-pastelitos.png',
    banner: '/img/ongs/banner-pastelitos.jpg',
    descripcion: 'Organización que trabaja por el bienestar y la protección del medio ambiente mediante actividades de educación ambiental y reforestación.',
    mision: 'Contribuir a la conservación del medio ambiente a través de acciones concretas y educación ambiental.',
    vision: 'Un mundo donde las comunidades vivan en armonía con el medio ambiente.',
    fechaCreacion: '2015-09-22',
    direccion: {
      calle: 'Calle Verde',
      numero: '456',
      ciudad: 'Valdivia',
      region: 'Los Ríos',
      pais: 'Chile',
      codigoPostal: '5090000'
    },
    contacto: {
      email: 'contacto@pastelitos.org',
      telefono: '+56 9 8765 4321',
      sitioWeb: 'www.pastelitos.org',
      personaContacto: 'Juan Pérez',
      emailContacto: 'juan.perez@pastelitos.org'
    },
    redes: {
      facebook: 'https://facebook.com/ongpastelitos',
      instagram: 'https://instagram.com/pastelitos',
      twitter: 'https://twitter.com/ongpastelitos'
    },
    stats: {
      voluntariosActivos: 85,
      actividadesRealizadas: 230,
      horasVoluntariado: 3800,
      beneficiariosAlcanzados: 1500,
      proyectosActivos: 5
    },
    areas: [
      mockAreasOng[1],
      mockAreasOng[3],
    ],
    configuracion: {
      temaPersonalizado: {
        colorPrimario: '#059669',
        colorSecundario: '#34D399',
        fuentePrincipal: 'Montserrat'
      },
      privacidad: {
        perfilPublico: true,
        mostrarEstadisticas: true,
        mostrarContacto: false
      },
      notificaciones: {
        email: true,
        push: false,
        frecuencia: 'diaria'
      }
    },
    estado: 'activa'
  }
];