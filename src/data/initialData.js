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
    id: 'exp-densidades',
    titulo: 'Arcoíris de Densidades',
    subtitulo: 'Columna de líquidos, masa, volumen y tensión superficial',
    categoria: 'Física & Química',
    personajeId: 'electra',
    nivel: '10 a 18 años',
    tiempoMinutos: 30,
    descripcion: 'Aprende la relación fundamental entre masa, volumen y densidad creando una fascinante columna de líquidos en capas multicolores que no se mezclan.',
    hipotesis: '¿Por qué líquidos con diferente masa y volumen no se mezclan y se ordenan en capas estables sin juntarse?',
    explicacionCientifica: 'La densidad es la relación entre la masa de un cuerpo y el volumen que ocupa (D = m/V). Los líquidos más densos (como la miel) tienen mayor masa por unidad de volumen y se van al fondo, mientras que los menos densos (como el alcohol) flotan en la superficie.',
    materiales: [
      '50 ml de Miel de abeja pura o jarabe de maíz',
      '50 ml de Jabón líquido concentrado para platos (verde o azul)',
      '50 ml de Agua destilada o potable con colorante vegetal',
      '50 ml de Aceite vegetal de cocina',
      '50 ml de Alcohol etílico o isopropílico teñido',
      '1 Probeta graduada de 250 ml o vaso cilíndrico de vidrio alto',
      '2 Goteros o jeringas dosificadoras sin aguja',
      '1 Par de gafas de protección y guantes de látex'
    ],
    pasos: [
      {
        id: 1,
        numero: 1,
        categoria: 'Conceptos',
        categoriaColor: '#2ce4ff',
        titulo: '¿Por qué se forman capas?',
        subtitulo: 'Comprende la relación entre masa, volumen y densidad.',
        texto: 'La densidad es una propiedad intrínseca de la materia. Si dos líquidos tienen el mismo volumen pero diferente masa, el más pesado descenderá por efecto de la gravedad hacia el fondo.',
        duracion: '00:28',
        videoUrl: '',
        subtitulos: 'Comprende la relación entre masa, volumen y densidad.'
      },
      {
        id: 2,
        numero: 2,
        categoria: 'Materiales',
        categoriaColor: '#ffc936',
        titulo: 'Materiales y cantidades',
        subtitulo: 'Verificación del equipo y reactivos en mesa.',
        texto: 'Revisa en tu estación de trabajo que cuentes con: miel (50ml), jabón líquido (50ml), agua con colorante (50ml), aceite vegetal (50ml), alcohol (50ml), probeta y goteros.',
        duracion: '00:35',
        videoUrl: '',
        subtitulos: 'Comprueba cada material en tu estación de laboratorio antes de iniciar el montaje.'
      },
      {
        id: 3,
        numero: 3,
        categoria: 'Montaje',
        categoriaColor: '#ff8a55',
        titulo: 'Preparar las soluciones',
        subtitulo: 'Medición precisa y dosificación de 50 ml por reactivo.',
        texto: 'Mide en vasos separados exactamente 50 ml de cada sustancia. Añade 2 gotas de colorante azul al agua y 2 gotas de colorante rojo al alcohol para contrastar visualmente.',
        duracion: '00:40',
        videoUrl: '',
        subtitulos: 'Mide 50 ml de cada líquido y tiñe las fases con colorantes diferentes.'
      },
      {
        id: 4,
        numero: 4,
        categoria: 'Montaje',
        categoriaColor: '#ff8a55',
        titulo: 'Construir las capas',
        subtitulo: 'Vierte suavemente cada sustancia por la pared interior.',
        texto: 'Vierte primero la miel en el centro del fondo. Luego añade el jabón despacio. Con el gotero pegado a la pared del vaso inclinado, vierte el agua, luego el aceite y por último el alcohol.',
        duracion: '00:45',
        videoUrl: '',
        subtitulos: 'Inclina la probeta y vierte muy despacio por la pared interior.'
      },
      {
        id: 5,
        numero: 5,
        categoria: 'Observación',
        categoriaColor: '#af78ff',
        titulo: 'Observar los límites',
        subtitulo: 'Inspecciona la interfase y menisco entre las distintas fases.',
        texto: 'Ilumina la probeta con una linterna. Observa cómo las líneas de separación (meniscos e interfases) se mantienen estables y nítidas gracias a la tensión superficial y densidad.',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: 'Observa las interfaces de separación nítidas entre los 5 líquidos.'
      },
      {
        id: 6,
        numero: 6,
        categoria: 'Medición',
        categoriaColor: '#54e4a4',
        titulo: 'Comparar las concentraciones',
        subtitulo: 'Prueba de densidad y flotabilidad con sólidos patrón.',
        texto: 'Deja caer con cuidado una tuerca metálica, una uva fresca, una tapa de plástico y un trozo de corcho. Registra en tu bitácora en qué capa se detiene cada objeto según su densidad.',
        duracion: '00:35',
        videoUrl: '',
        subtitulos: 'Introduce objetos sólidos y descubre en qué capa de densidad flotan.'
      },
      {
        id: 7,
        numero: 7,
        categoria: 'Resultados',
        categoriaColor: '#7ce36a',
        titulo: 'Ordenar por densidad',
        subtitulo: 'Conclusiones finales: escala de densidad volumétrica (g/cm³).',
        texto: 'Orden de mayor a menor densidad: Miel (1.42 g/cm³) > Jabón (1.06 g/cm³) > Agua (1.00 g/cm³) > Aceite (0.92 g/cm³) > Alcohol (0.79 g/cm³). ¡Misión de ingeniería completada!',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: '¡Excelente! Has dominado el principio de densidad aplicado a la ingeniería.'
      }
    ]
  },
  {
    id: 'exp-circuito',
    titulo: 'Circuito Luminoso con Masa Conductora',
    subtitulo: 'Flujo de electrones, ánodos, cátodos y fuentes de energía',
    categoria: 'Robótica & Electricidad',
    personajeId: 'astro',
    nivel: '10 a 16 años',
    tiempoMinutos: 35,
    descripcion: 'Modela pistas de masa con electrolitos salinos y enciende diodos LED de colores comprendiendo circuitos cerrados y polaridad.',
    hipotesis: '¿Puede una masa con electrolitos salinos conducir corriente eléctrica continua suficiente para encender luces LED?',
    explicacionCientifica: 'La sal disuelta (NaCl) libera iones Na+ y Cl- que actúan como portadores de carga eléctrica en el agua de la masa, permitiendo cerrar el circuito eléctrico.',
    materiales: [
      '2 Barras de masa conductora con sal (electrolito)',
      '1 Barra de masa aislante con azúcar (dieléctrico)',
      '4 Diodos LED ultrabrillantes de 5mm (rojo, verde, azul)',
      '1 Portapilas 3V (2 pilas AA de 1.5V) con cables caimán',
      '1 Interruptor de palanca para prototipo'
    ],
    pasos: [
      {
        id: 1,
        numero: 1,
        categoria: 'Conceptos',
        categoriaColor: '#2ce4ff',
        titulo: '¿Cómo viaja la electricidad?',
        subtitulo: 'Flujo continuo de electrones y circuitos cerrados.',
        texto: 'Los electrones requieren un trayecto conductor ininterrumpido desde el polo negativo hacia el positivo de la fuente.',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: 'Los electrones necesitan un camino continuo para fluir y encender los componentes.'
      },
      {
        id: 2,
        numero: 2,
        categoria: 'Materiales',
        categoriaColor: '#ffc936',
        titulo: 'Componentes y seguridad',
        subtitulo: 'Verificación de fuentes de 3V y polaridades LED.',
        texto: 'Revisa las dos masas, los diodos LED y el portapilas de 3V asegurando que no haya cables pelados que generen cortocircuito.',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: 'Verifica los componentes eléctricos en tu mesa de trabajo.'
      },
      {
        id: 3,
        numero: 3,
        categoria: 'Montaje',
        categoriaColor: '#ff8a55',
        titulo: 'Modelado de pistas conductoras',
        subtitulo: 'Creación de dos pistas paralelas separadas por aislante.',
        texto: 'Modela dos cilindros de masa conductora paralelos separados por 2 cm. Coloca una barrera de masa aislante dulce en medio.',
        duracion: '00:40',
        videoUrl: '',
        subtitulos: 'Forma dos pistas conductoras separadas por una barrera aislante.'
      },
      {
        id: 4,
        numero: 4,
        categoria: 'Montaje',
        categoriaColor: '#ff8a55',
        titulo: 'Conexión de terminales',
        subtitulo: 'Inserción de cables positivo (rojo) y negativo (negro).',
        texto: 'Inserta el caimán rojo en la pista izquierda (ánodo) y el caimán negro en la pista derecha (cátodo).',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: 'Conecta el cable rojo en la pista positiva y el negro en la negativa.'
      },
      {
        id: 5,
        numero: 5,
        categoria: 'Observación',
        categoriaColor: '#af78ff',
        titulo: 'Polaridad del LED',
        subtitulo: 'Inserción del diodo con pata larga (+) y pata corta (-).',
        texto: 'Inserta la pata larga del LED en la pista positiva y la pata corta en la negativa. ¡Observa el brillo!',
        duracion: '00:35',
        videoUrl: '',
        subtitulos: 'Coloca el LED respetando la polaridad: pata larga al positivo.'
      },
      {
        id: 6,
        numero: 6,
        categoria: 'Medición',
        categoriaColor: '#54e4a4',
        titulo: 'Circuitos en Serie vs Paralelo',
        subtitulo: 'Comportamiento del voltaje y corriente con varios LEDs.',
        texto: 'Añade 2 LEDs más en paralelo y luego prueba conectarlos en serie. Mide cómo varía la intensidad lumínica.',
        duracion: '00:40',
        videoUrl: '',
        subtitulos: 'Comprueba la diferencia de brillo en conexiones serie y paralelo.'
      },
      {
        id: 7,
        numero: 7,
        categoria: 'Resultados',
        categoriaColor: '#7ce36a',
        titulo: 'Conclusiones electrónicas',
        subtitulo: 'Validación del método de prototipado rápido con plastilina.',
        texto: 'Los iones salinos permitieron conducir la corriente demostrando principios básicos de circuitos impresos y robótica.',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: '¡Excelente trabajo! Has construido tu primer circuito con tecnología modular.'
      }
    ]
  },
  {
    id: 'exp-cohete',
    titulo: 'Cohete de Propulsión Química',
    subtitulo: 'Leyes de Newton, generación de CO2 y empuje aerodinámico',
    categoria: 'Aeroespacial & Física',
    personajeId: 'cosmo',
    nivel: '10 a 18 años',
    tiempoMinutos: 30,
    descripcion: 'Diseña un cohete a reacción con cámara de presión efervescente aplicando la Tercera Ley de Newton para lograr un despegue vertical.',
    hipotesis: '¿La acumulación rápida de gas CO2 presurizado dentro de una cámara cerrada generará empuje suficiente para vencer la gravedad?',
    explicacionCientifica: 'El bicarbonato y el ácido acético reaccionan liberando gas que comprime el aire interior. Al liberarse súbitamente la tapa, el gas empuja hacia abajo con igual fuerza propulsando el cohete hacia arriba (Acción y Reacción).',
    materiales: [
      '1 Cámara de lanzamiento sellada (recipiente hermético)',
      '1 Pastilla efervescente o 20g de bicarbonato + 30ml vinagre',
      'Agua tibia (20 ml)',
      'Plantilla de aletas estabilizadoras de cartulina plastificada',
      'Gafas de seguridad obligatorias'
    ],
    pasos: [
      {
        id: 1,
        numero: 1,
        categoria: 'Conceptos',
        categoriaColor: '#2ce4ff',
        titulo: 'Tercera Ley de Newton',
        subtitulo: 'Principio de acción y reacción en vehículos espaciales.',
        texto: 'Toda acción genera una reacción de igual magnitud pero en sentido opuesto. El gas expulsado genera el vector de empuje vertical.',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: 'Comprende el principio de acción y reacción en el vuelo de cohetes.'
      },
      {
        id: 2,
        numero: 2,
        categoria: 'Materiales',
        categoriaColor: '#ffc936',
        titulo: 'Materiales de lanzamiento',
        subtitulo: 'Revisión de la cámara y combustible químico seguro.',
        texto: 'Comprueba el tubo hermético, las aletas, el combustible reactivo y el equipo de protección para el equipo de vuelo.',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: 'Revisa la cámara de presión y los elementos de seguridad.'
      },
      {
        id: 3,
        numero: 3,
        categoria: 'Montaje',
        categoriaColor: '#ff8a55',
        titulo: 'Ensamblaje aerodinámico',
        subtitulo: 'Fijación de aletas simétricas a 120 grados.',
        texto: 'Pega 3 aletas simétricas en la base del cilindro para garantizar un centro de gravedad estable durante el ascenso.',
        duracion: '00:40',
        videoUrl: '',
        subtitulos: 'Coloca las aletas a 120 grados para dar estabilidad al vuelo.'
      },
      {
        id: 4,
        numero: 4,
        categoria: 'Montaje',
        categoriaColor: '#ff8a55',
        titulo: 'Carga de combustible reactivo',
        subtitulo: 'Dosificación exacta de agua y reactivo efervescente.',
        texto: 'Vierte 15 ml de agua tibia en el interior del tubo manteniendo la zona de sellado seca.',
        duracion: '00:25',
        videoUrl: '',
        subtitulos: 'Añade el líquido sin mojar el reborde de sellado superior.'
      },
      {
        id: 5,
        numero: 5,
        categoria: 'Observación',
        categoriaColor: '#af78ff',
        titulo: 'Activación y sellado rápido',
        subtitulo: 'Inserción del reactivo y colocación en plataforma.',
        texto: 'Introduce la pastilla, cierra firmemente con un clic, invierte el cohete en la plataforma y retrocede 3 metros.',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: 'Cierra con un clic firme, coloca sobre la base y da 3 pasos atrás.'
      },
      {
        id: 6,
        numero: 6,
        categoria: 'Medición',
        categoriaColor: '#54e4a4',
        titulo: 'Telemetría de vuelo y altitud',
        subtitulo: 'Cálculo del tiempo de vuelo y apogeo alcanzado.',
        texto: 'Cronometra los segundos desde el despegue hasta el apogeo máximo para estimar la altura alcanzada mediante ecuaciones cinemáticas.',
        duracion: '00:35',
        videoUrl: '',
        subtitulos: 'Mide con el cronómetro de la nave los segundos exactos de vuelo.'
      },
      {
        id: 7,
        numero: 7,
        categoria: 'Resultados',
        categoriaColor: '#7ce36a',
        titulo: 'Análisis de empuje y presión',
        subtitulo: 'Relación entre presión de gas y altura alcanzada.',
        texto: 'La presión generada venció la resistencia del tapón a 1.8 atmósferas, logrando un despegue aerodinámico perfecto.',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: '¡Misión espacial completada con éxito rotundo!'
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
