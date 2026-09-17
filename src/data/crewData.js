// crewData.js - Base de Datos Oficial de Tripulación (ADN Visual)

export const CREW_PRESETS = [
  {
    id: 'electra',
    nombre: 'Dra. Electra',
    rol: 'Líder Científica & Mentora Experimental',
    proporciones: 'Semi-chibi / Proporción anatómica 3.5 cabezas',
    estiloTrazo: 'Clean Vector Art (Cel-shaded nítido, bordes entintados negros 2D)',
    morfologia: 'Gafas ciber-ópticas rectangulares sobre la frente, arete turquesa, chaleco utilitario amarillo con insignia de relámpago, guantes largos púrpuras, cinturón de instrumental de campo, botas de exploradora.',
    especialidad: 'Síntesis de reacciones exotérmicas, formulación de reactivos, energía y método científico escolar.',
    origen: 'Laboratorio Central UPS - Sede Cuenca',
    paletaColores: [
      { hex: '#F4A261', label: 'Chaleco de Campo' },
      { hex: '#7B2CBF', label: 'Guantes & Pantalón' },
      { hex: '#00E5FF', label: 'Visor Ciber-Óptico' },
      { hex: '#6F4E37', label: 'Cabello Castaño' },
      { hex: '#F1FAEE', label: 'Base / Cuello' }
    ],
    avatarImg: './assets/images/characters/electra/frontal.png',
    galeria: {
      frontal: './assets/images/characters/electra/frontal.png',
      saludo: './assets/images/characters/electra/saludo.png',
      pensando: './assets/images/characters/electra/pensando.png',
      sorprendido: './assets/images/characters/electra/sorprendido.png',
      cuerpoCompleto: './assets/images/characters/electra/cuerpo_completo.png'
    },
    escalaPoder: 94,
    nivelSeguridad: 'Nivel 5 - Directora'
  },
  {
    id: 'magno',
    nombre: 'Magno',
    rol: 'Especialista en Magnetismo & Física Mecánica',
    proporciones: 'Mecha Compacto / Proporción 3.0 cabezas',
    estiloTrazo: 'Clean Vector Mecha (Bloques de color sólidos con biseles planos)',
    morfologia: 'Emisor dipolar magnético en forma de herradura roja/azul en el casco, visor oscuro con ojos redondos LED, coraza roja con centro azul, piernas blancas con rodilleras amortiguadoras, orugas tractoras.',
    especialidad: 'Manipulación de campos de inducción electromagnética y control de inventario de kits.',
    origen: 'Hangar de Suministros Orbitales',
    paletaColores: [
      { hex: '#E63946', label: 'Coraza Mecha (Norte)' },
      { hex: '#1D3557', label: 'Chasis Azul (Sur)' },
      { hex: '#F1FAEE', label: 'Piernas Titán' },
      { hex: '#E9C46A', label: 'Sensores Oculares' },
      { hex: '#333F48', label: 'Orugas Tractoras' }
    ],
    avatarImg: './assets/images/characters/magno/frontal.png',
    galeria: {
      frontal: './assets/images/characters/magno/frontal.png',
      saludo: './assets/images/characters/magno/saludo.png',
      pensando: './assets/images/characters/magno/pensando.png',
      sorprendido: './assets/images/characters/magno/sorprendido.png',
      cuerpoCompleto: './assets/images/characters/magno/cuerpo_completo.png'
    },
    escalaPoder: 88,
    nivelSeguridad: 'Nivel 4 - Especialista'
  },
  {
    id: 'astro',
    nombre: 'Astro',
    rol: 'Jefe de Prototipos & Curiosidad Práctica',
    proporciones: 'Semi-chibi / Proporción 2.8 cabezas con cola prensil',
    estiloTrazo: 'Clean Vector Art orgánico (Líneas amigables con volumen 2D)',
    morfologia: 'Primate bio-ingeniero con chompa roja de cierre metálico, cola prensil de equilibrio para soldadura, ojos analíticos y manos diestras para micro-ensamblaje de circuitos y servomotores.',
    especialidad: 'Programación por bloques, arquitectura de hardware y ensamblaje de robots autónomos.',
    origen: 'Taller de Mecatrónica UPS',
    paletaColores: [
      { hex: '#E63946', label: 'Chompa con Capucha' },
      { hex: '#8D5B4C', label: 'Pelaje Primario' },
      { hex: '#DDB892`', label: 'Rostro & Manos' },
      { hex: '#2A9D8F', label: 'Herramientas' },
      { hex: '#F1FAEE', label: 'Cremallera & Dientes' }
    ],
    avatarImg: './assets/images/characters/astro/frontal.png',
    galeria: {
      frontal: './assets/images/characters/astro/frontal.png',
      saludo: './assets/images/characters/astro/saludo.png',
      pensando: './assets/images/characters/astro/pensando.png',
      sorprendido: './assets/images/characters/astro/sorprendido.png',
      cuerpoCompleto: './assets/images/characters/astro/cuerpo_completo.png'
    },
    escalaPoder: 92,
    nivelSeguridad: 'Nivel 4 - Ingeniero Jefe'
  },
  {
    id: 'cosmo',
    nombre: 'Cosmo',
    rol: 'Explorador Aeroespacial & Sensores de Vuelo',
    proporciones: 'Mini-Mech Esférico / Proporción 2.5 cabezas',
    estiloTrazo: 'Clean Vector Art aerodinámico y simétrico',
    morfologia: 'Casco esférico azul con visor dorado expresivo, alerones de propulsión dorsal retráctiles, extremidades compactas para vuelo a gravedad cero.',
    especialidad: 'Telemetría atmosférica, navegación estelar y física de propulsión de cohetes.',
    origen: 'Plataforma de Lanzamiento',
    paletaColores: [
      { hex: '#00E5FF', label: 'Cúpula & Alerones' },
      { hex: '#1D3557', label: 'Chasis Principal' },
      { hex: '#E9C46A', label: 'Visor Sonriente' },
      { hex: '#A8DADC', label: 'Carcasa Superior' },
      { hex: '#F1FAEE', label: 'Detalles Lumínicos' }
    ],
    avatarImg: './assets/images/characters/cosmo/frontal.png',
    galeria: {
      frontal: './assets/images/characters/cosmo/frontal.png',
      saludo: './assets/images/characters/cosmo/saludo.png',
      pensando: './assets/images/characters/cosmo/pensando.png',
      sorprendido: './assets/images/characters/cosmo/sorprendido.png',
      cuerpoCompleto: './assets/images/characters/cosmo/cuerpo_completo.png'
    },
    escalaPoder: 82,
    nivelSeguridad: 'Nivel 3 - Explorador'
  },
  {
    id: 'vector',
    nombre: 'Vector',
    rol: 'Arquitecto de Robótica, IA & Algoritmos',
    proporciones: 'Mecha Atlético / Proporción 4.0 cabezas',
    estiloTrazo: 'Vector Angular Futurista con trazos estilizados',
    morfologia: 'Blindaje aerodinámico de polímero turquesa y blanco con estabilizadores de vuelo, visor cibernético táctico con HUD de depuración de código en tiempo real.',
    especialidad: 'Criptografía, redes neuronales y control de misiones lógicas complejas.',
    origen: 'Núcleo Central de Cómputo',
    paletaColores: [
      { hex: '#2A9D8F', label: 'Blindaje Turquesa' },
      { hex: '#F1FAEE', label: 'Carcasa Blanca' },
      { hex: '#1D3557', label: 'Juntas Articulares' },
      { hex: '#E9C46A', label: 'Visor Táctico' },
      { hex: '#52B788', label: 'Líneas de Energía' }
    ],
    avatarImg: './assets/images/characters/vector/frontal.png',
    galeria: {
      frontal: './assets/images/characters/vector/frontal.png',
      saludo: './assets/images/characters/vector/saludo.png',
      pensando: './assets/images/characters/vector/pensando.png',
      sorprendido: './assets/images/characters/vector/sorprendido.png',
      cuerpoCompleto: './assets/images/characters/vector/cuerpo_completo.png'
    },
    escalaPoder: 90,
    nivelSeguridad: 'Nivel 4 - Guardián'
  },
  {
    id: 'pixel',
    nombre: 'Pixel',
    rol: 'Rover de Telemetría & Geología Terrestre',
    proporciones: 'Unidad Cuadrúpeda / Proporción 2.0 cabezas',
    estiloTrazo: 'Vector Mecánico Industrial detallado',
    morfologia: 'Monitor CRT retroiluminado con rostro analógico de pantalla verde/turquesa, 4 patas mecánicas todoterreno con amortiguadores hidráulicos para terreno rocoso.',
    especialidad: 'Exploración de superficies hostiles, recolección de minerales y detección de humedad.',
    origen: 'Bahía de Sondas Planetarias',
    paletaColores: [
      { hex: '#A8DADC', label: 'Chasis Titán' },
      { hex: '#2A9D8F', label: 'Monitor CRT' },
      { hex: '#1D3557', label: 'Amortiguadores' },
      { hex: '#52B788', label: 'Sensores de Suelo' },
      { hex: '#333F48', label: 'Puntas de Agarre' }
    ],
    avatarImg: './assets/images/characters/pixel/frontal.png',
    galeria: {
      frontal: './assets/images/characters/pixel/frontal.png',
      saludo: './assets/images/characters/pixel/saludo.png',
      pensando: './assets/images/characters/pixel/pensando.png',
      sorprendido: './assets/images/characters/pixel/sorprendido.png',
      cuerpoCompleto: './assets/images/characters/pixel/cuerpo_completo.png'
    },
    escalaPoder: 80,
    nivelSeguridad: 'Nivel 3 - Sonda'
  }
];
