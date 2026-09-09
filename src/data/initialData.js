// initialData.js - Banco de datos oficial de Pequeños Científicos (UPS Sede Cuenca)

export const PERSONAJES = [
  {
    id: 'electra',
    nombre: 'Dra. Electra',
    rol: 'Científica Líder & Mentora Experimental',
    descripcion: 'Especialista en energía, circuitos, electricidad y reacciones químicas. Dirige el laboratorio de la nave y guía a los estudiantes en el método científico.',
    color: '#00e5ff',
    badge: 'Energía & Laboratorio',
    avatarImg: './assets/images/doctora_frontal.png'
  },
  {
    id: 'magno',
    nombre: 'Magno',
    rol: 'Especialista en Magnetismo & Física Mecánica',
    descripcion: 'Robot acorazado con núcleo ferromagnético. Domina las fuerzas invisibles, los motores y el ensamblaje de kits de ingeniería.',
    color: '#ff007f',
    badge: 'Magnetismo & Kits',
    avatarImg: './assets/images/magneto_frontal.png'
  },
  {
    id: 'astro',
    nombre: 'Astro',
    rol: 'Jefe de Prototipos & Curiosidad Práctica',
    descripcion: 'Ágil y creativo con su clásica casaca roja. Fomenta el aprendizaje activo, la experimentación biológica y la resolución práctica de retos.',
    color: '#ff9900',
    badge: 'Prototipos & Ingenio',
    avatarImg: './assets/images/simio_frontal.png'
  },
  {
    id: 'cosmo',
    nombre: 'Cosmo',
    rol: 'Explorador Aeroespacial & Vuelo',
    descripcion: 'Robot alado de reconocimiento atmosférico. Monitorea el clima, la sustentación y la física del vuelo espacial.',
    color: '#00d2ff',
    badge: 'Aeroespacial & Vuelo',
    avatarImg: './assets/images/aerobot_frontal.png'
  },
  {
    id: 'vector',
    nombre: 'Vector',
    rol: 'Arquitecto de Robótica, IA & Algoritmos',
    descripcion: 'Mecha cibernético de alta precisión. Guía a los jóvenes en programación por bloques, automatización y lógica computacional.',
    color: '#00e676',
    badge: 'Robótica & IA',
    avatarImg: './assets/images/cyberex_frontal.png'
  },
  {
    id: 'pixel',
    nombre: 'Pixel',
    rol: 'Rover de Telemetría & Geología',
    descripcion: 'Rover todoterreno con monitor digital interactivo. Recopila muestras en el campo, realiza telemetría y mediciones con sensores ultrasónicos.',
    color: '#10b981',
    badge: 'Sensores & Telemetría',
    avatarImg: './assets/images/spider_frontal.png'
  }
];

export const TALLERES_INICIALES = [
  {
    id: 'tal-1',
    categoria: 'Ciencias Tecnológicas',
    nombre: 'Mundo Eléctrico',
    modulo: 'Módulo 1',
    descripcion: 'Kits de conexiones electrónicas fundamentales. Domina el flujo de energía, interruptores y LEDs.',
    duracion: '4 Semanas (8 Sesiones)',
    edadRecomendada: '6 a 12 años',
    estado: 'En Órbita',
    colorTheme: 'cyan',
    imagen: './assets/images/modulo_electrico.jpg',
    instructor: 'Dra. Electra & Prof. Carlos Gómez',
    temas: [
      'Concepto de electrones y corriente continua',
      'Circuitos abiertos, cerrados y cortocircuitos',
      'Construcción de linterna de bolsillo propia',
      'Lógica de interruptores y señalización LED'
    ],
    materialesIncluidos: [
      'Placa prototipo para niños',
      'LEDs ultrabrillantes con resistencias seguras',
      'Portapilas 3V con interruptor',
      'Cables de conexión con caimanes suaves'
    ]
  },
  {
    id: 'tal-2',
    categoria: 'Ciencias Tecnológicas',
    nombre: 'Mundo Magnético',
    modulo: 'Módulo 2',
    descripcion: 'Magnetismo y motores eléctricos. Construye propulsores magnéticos básicos y brújulas espaciales.',
    duracion: '4 Semanas (8 Sesiones)',
    edadRecomendada: '7 a 13 años',
    estado: 'En Órbita',
    colorTheme: 'cyan',
    imagen: './assets/images/modulo_magnetico.jpg',
    instructor: 'Magno & Lic. Elena Morales',
    temas: [
      'Polos Norte y Sur: Fuerzas invisibles de atracción y repulsión',
      'La Tierra como un imán gigante: Navegación y brújulas',
      'Electromagnetismo: Creando un imán con electricidad',
      'Ensamblaje del primer motor homopolar giratorio'
    ],
    materialesIncluidos: [
      'Imanes de neodimio protegidos y ferrita',
      'Bobina de alambre de cobre esmaltado',
      'Brújula de exploración astronómica',
      'Limaduras de hierro en cápsula sellada anti-derrame'
    ]
  },
  {
    id: 'tal-3',
    categoria: 'Ciencias Tecnológicas',
    nombre: 'Mundo Verde & Energías Limpias',
    modulo: 'Módulo 3',
    descripcion: 'Energías renovables: Solar, eólica e hidráulica para estaciones científicas sostenibles.',
    duracion: '4 Semanas (8 Sesiones)',
    edadRecomendada: '7 a 14 años',
    estado: 'En Órbita',
    colorTheme: 'green',
    imagen: './assets/images/modulo_verde.jpg',
    instructor: 'Dra. Electra & Astro',
    temas: [
      'El poder del Sol: Células fotovoltaicas y fotones',
      'Generación de energía por viento con micro-turbinas',
      'Riego automatizado por capilaridad hidropónica',
      'Diseño de una mini-ciudad ecológica autosustentable'
    ],
    materialesIncluidos: [
      'Mini panel solar de 5V 100mA',
      'Micro motor generador eólico con hélice',
      'Kit de semillas de germinación rápida',
      'Cúpula transparente para mini invernadero'
    ]
  },
  {
    id: 'tal-4',
    categoria: 'Ciencias Tecnológicas',
    nombre: 'Mundo Digital & Algoritmos',
    modulo: 'Módulo 4',
    descripcion: 'Programación por bloques interactiva. Desarrolla la inteligencia y secuencias del robot explorador.',
    duracion: '5 Semanas (10 Sesiones)',
    edadRecomendada: '8 a 15 años',
    estado: 'Nuevo Lanzamiento',
    colorTheme: 'cyan',
    imagen: './assets/images/modulo_digital.jpg',
    instructor: 'Vector & Pixel',
    temas: [
      'Pensamiento computacional y algoritmos de la vida diaria',
      'Estructuras secuenciales, bucles y condiciones lógicas',
      'Control de laberintos y recolección de estrellas en tablero',
      'Creación de un videojuego de misiones espaciales'
    ],
    materialesIncluidos: [
      'Licencia a la plataforma de bloques interactiva',
      'Tablero físico cuadriculado de misiones espaciales',
      'Tarjetas de comandos secuenciales tangibles',
      'Guía didáctica de retos lógicos por niveles'
    ]
  },
  {
    id: 'tal-5',
    categoria: 'Robótica Avanzada',
    nombre: 'Proyecto: Astro Explorer Bot',
    modulo: 'Nivel Avanzado',
    descripcion: 'Integra programación por bloques con ingeniería y sensores. Construye robots autónomos con agarre modular.',
    duracion: '6 Semanas (12 Sesiones)',
    edadRecomendada: '9 a 16 años',
    estado: 'Inscripciones Abiertas',
    colorTheme: 'orange',
    imagen: './assets/images/robotica_simio.jpg',
    instructor: 'Astro (Líder de Prototipos) & Vector',
    temas: [
      'Ensamblaje mecánico de chasis y orugas tractoras',
      'Conexión de servomotores y pinzas robóticas de agarre',
      'Sensores ultrasónicos para detección y evasión de obstáculos',
      'Reto final: Misión de rescate en cráter simulado'
    ],
    materialesIncluidos: [
      'Chasis modular Astro-Bot con tornillería segura',
      'Microcontrolador programable con Bluetooth',
      '2 Servomotores de alto torque + Sensor de distancia',
      'Batería recargable Li-Ion con protección térmica'
    ]
  }
];

export const EXPERIMENTOS_INICIALES = [
  {
    id: 'exp-papelitos',
    titulo: 'Papelitos de Colores: Danza Electrostática',
    subtitulo: 'Cargas electrostáticas, transferencia de electrones y polarización',
    categoria: 'Física & Electricidad',
    personajeId: 'electra',
    nivel: '10 a 18 años',
    tiempoMinutos: 30,
    descripcion: 'Descubre las fuerzas invisibles de la electrostática haciendo que papelitos de colores dancen sin tocarlos mediante transferencia de electrones por fricción.',
    hipotesis: '¿Puede un objeto cargado eléctricamente mediante fricción vencer la fuerza de gravedad y atraer cuerpos ligeros neutros?',
    explicacionCientifica: 'Al frotar un material aislante (como plástico o globo) contra lana o tela, este gana electrones adquiriendo carga negativa neta. Al acercarlo a los papelitos neutros, induce una polarización temporal en sus moléculas, atrayéndolos con fuerza electrostática superior a su peso gravitacional.',
    materiales: [
      'Papel de seda o bond de diferentes colores cortado en trocitos pequeños (1x1 cm)',
      '1 Regla plástica, tubo de PVC o globo de látex',
      '1 Paño de lana, franela o paño de microfibra',
      '1 Superficie de trabajo seca y aislante (madera o acrílico)',
      '1 Par de gafas de explorador científico'
    ],
    pasos: [
      {
        id: 1,
        numero: 1,
        categoria: 'Conceptos',
        categoriaColor: '#2ce4ff',
        titulo: 'Fuerzas Invisibles de la Naturaleza',
        subtitulo: 'Introducción al átomo, protones y electrones en movimiento.',
        texto: 'La materia está compuesta por átomos con cargas positivas y negativas. Cuando los electrones se transfieren de un cuerpo a otro, se genera un desequilibrio eléctrico conocido como electricidad estática.',
        duracion: '00:15',
        videoUrl: './instituciones/pequenos_cientificos/experimento_01_papelitos/videos/escena_1.mp4',
        subtitulos: 'Descubre cómo los electrones se transfieren creando fuerzas de atracción electrostática.'
      },
      {
        id: 2,
        numero: 2,
        categoria: 'Alistamiento',
        categoriaColor: '#38bdf8',
        titulo: 'Verificación de Reactivos y Equipos',
        subtitulo: 'Revisión de elementos en la estación de laboratorio.',
        texto: 'Asegúrate de contar con papel de colores cortado finamente, la barra o tubo de fricción y el paño activador sobre la mesa de trabajo.',
        duracion: '00:15',
        videoUrl: './instituciones/pequenos_cientificos/experimento_01_papelitos/videos/escena_2.mp4',
        subtitulos: 'Comprueba cada material en tu estación de trabajo antes de iniciar la práctica.'
      },
      {
        id: 3,
        numero: 3,
        categoria: 'Montaje',
        categoriaColor: '#ff8a55',
        titulo: 'Preparación de la Zona de Carga',
        subtitulo: 'Dispersión uniforme de confeti de papel en mesa plana.',
        texto: 'Esparce los papelitos de colores en una capa fina sobre la mesa sin apilarlos para facilitar su interacción con el campo electrostático.',
        duracion: '00:15',
        videoUrl: './instituciones/pequenos_cientificos/experimento_01_papelitos/videos/escena_3.mp4',
        subtitulos: 'Distribuye los trocitos de papel para que reaccionen libremente al campo de fuerza.'
      },
      {
        id: 4,
        numero: 4,
        categoria: 'Montaje',
        categoriaColor: '#ff8a55',
        titulo: 'Fricción y Transferencia de Electrones',
        subtitulo: 'Frotamiento enérgico y unidireccional del material aislante.',
        texto: 'Frota la regla o tubo con el paño de lana de forma constante durante 15 a 20 segundos para arrancar electrones y cargar negativamente la superficie.',
        duracion: '00:15',
        videoUrl: './instituciones/pequenos_cientificos/experimento_01_papelitos/videos/escena_4.mp4',
        subtitulos: 'Frota con energía para cargar de electrones la barra plástica.'
      },
      {
        id: 5,
        numero: 5,
        categoria: 'Observación',
        categoriaColor: '#af78ff',
        titulo: 'Atracción Electrostática en Vivo',
        subtitulo: 'Aproximación lenta a 2 centímetros de los papelitos.',
        texto: 'Acerca suavemente el extremo cargado a los papelitos sin tocarlos. Observa cómo saltan y se adhieren desafiando la gravedad terrestre.',
        duracion: '00:15',
        videoUrl: './instituciones/pequenos_cientificos/experimento_01_papelitos/videos/escena_5.mp4',
        subtitulos: '¡Observa la danza de los papelitos saltando hacia la barra cargada!'
      },
      {
        id: 6,
        numero: 6,
        categoria: 'Medición',
        categoriaColor: '#54e4a4',
        titulo: 'Descarga y Polarización Inducida',
        subtitulo: 'Intercambio de carga por contacto y repulsión posterior.',
        texto: 'Nota cómo algunos papelitos se repelen tras hacer contacto. Al tocar la barra, reciben la misma carga y son expulsados.',
        duracion: '00:15',
        videoUrl: './instituciones/pequenos_cientificos/experimento_01_papelitos/videos/escena_6.mp4',
        subtitulos: 'Al tocar la barra, los papelitos adquieren igual carga y se repelen.'
      },
      {
        id: 7,
        numero: 7,
        categoria: 'Resultados',
        categoriaColor: '#7ce36a',
        titulo: 'Conclusiones y Principio de Ingeniería',
        subtitulo: 'Aplicación en filtros de aire industriales y fotocopiadoras.',
        texto: 'La fuerza electrostática descubierta es el principio con el que funcionan las impresoras láser, los filtros precipitadores de humo en fábricas y los paneles solares autolimpiables.',
        duracion: '00:15',
        videoUrl: './instituciones/pequenos_cientificos/experimento_01_papelitos/videos/escena_7.mp4',
        subtitulos: '¡Misión cumplida! Has dominado el principio electrostático fundamental.'
      }
    ]
  }
];

export const KITS_TIENDA_INICIALES = [
  {
    id: 'kit-1',
    nombre: 'Kit Avanzado de Química Espacial',
    categoria: 'Química & Reacciones',
    precio: 35.00,
    moneda: 'USD',
    badge: 'Nuevo Lanzamiento',
    imagen: './assets/images/kit_quimica.jpg',
    descripcion: 'Sintetiza compuestos seguros, descubre reacciones efervescentes luminiscentes y mide el pH de diferentes sustancias en un laboratorio portátil para el aula.',
    stock: 24,
    componentes: [
      'Gafas de protección científica infantil certificadas',
      '4 Tubos de ensayo de acrílico irrompible con gradilla',
      'Probeta graduada de 100ml y matraz Erlenmeyer',
      '12 Reactivos químicos grado alimenticio 100% seguros',
      'Microscopio óptico de aumento 100x-400x con muestras preparadas',
      'Manual ilustrado con 30 experimentos guiados'
    ]
  },
  {
    id: 'kit-2',
    nombre: 'Rover Explorador Marciano Solar',
    categoria: 'Ingeniería & Robótica',
    precio: 22.00,
    moneda: 'USD',
    badge: 'Más Solicitado',
    imagen: './assets/images/kit_rover.jpg',
    descripcion: 'Construye tu propio vehículo de exploración planetaria con tracción en orugas mecánicas impulsado por panel solar o batería.',
    stock: 18,
    componentes: [
      'Chasis modular de montaje rápido sin soldaduras',
      'Panel fotovoltaico solar de alta eficiencia',
      'Motor con caja reductora de engranajes metálicos',
      'Orugas todoterreno para superar obstáculos',
      'Control remoto por infrarrojos para pilotaje',
      'Guía de misiones astronómicas de la UPS'
    ]
  },
  {
    id: 'kit-3',
    nombre: 'Telescopio Óptico V2 Astro-Explorador',
    categoria: 'Astronomía',
    precio: 52.00,
    moneda: 'USD',
    badge: 'Edición Observatorio',
    imagen: './assets/images/kit_telescopio.jpg',
    descripcion: 'Lentes ópticas de cristal multicapa para observación nítida de cráteres lunares, satélites de Júpiter y constelaciones visibles desde Cuenca.',
    stock: 12,
    componentes: [
      'Tubo óptico refractor de 70mm de apertura',
      'Trípode de aluminio regulable en altura con cabezal panorámico',
      '2 Oculares de precisión (10mm y 25mm) + Lente de Barlow 3x',
      'Buscador óptico de estrellas tipo mira telescópica',
      'Planisferio celeste y mapa lunar de bolsillo'
    ]
  },
  {
    id: 'kit-4',
    nombre: 'Biosfera Alienígena & Terrario Luminiscente',
    categoria: 'Biología & Ecología',
    precio: 16.00,
    moneda: 'USD',
    badge: 'Eco-Ciencia',
    imagen: './assets/images/kit_biosfera.jpg',
    descripcion: 'Cultiva cristales brillantes y ecosistemas vegetales cerrados en un domo sellado con control de humedad y cuaderno de observación biológica.',
    stock: 30,
    componentes: [
      'Domo de cristal acrílico con base hermética',
      'Sales minerales para cristalización rápida en 48 horas',
      'Sustrato nutritivo para microvegetales',
      'Higrómetro análogo con carátula infantil',
      'Piedras luminiscentes fluorescentes en la oscuridad',
      'Bitácora del explorador biológico'
    ]
  }
];
