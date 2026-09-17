// initialData.js - Banco de datos oficial de Pequeños Científicos (UPS Sede Cuenca)

export const PERSONAJES = [
  {
    id: 'electra',
    nombre: 'Dra. Electra',
    rol: 'Científica Líder & Mentora Experimental',
    descripcion: 'Especialista en energía, circuitos, electricidad y reacciones químicas. Dirige el laboratorio de la nave y guía a los estudiantes en el método científico.',
    color: '#00e5ff',
    badge: 'Energía & Laboratorio',
    avatarImg: './assets/images/characters/electra/frontal.png'
  },
  {
    id: 'magno',
    nombre: 'Magno',
    rol: 'Especialista en Magnetismo & Física Mecánica',
    descripcion: 'Robot acorazado con núcleo ferromagnético. Domina las fuerzas invisibles, los motores y el ensamblaje de kits de ingeniería.',
    color: '#ff007f',
    badge: 'Magnetismo & Kits',
    avatarImg: './assets/images/characters/magno/frontal.png'
  },
  {
    id: 'astro',
    nombre: 'Astro',
    rol: 'Jefe de Prototipos & Curiosidad Práctica',
    descripcion: 'Ágil y creativo con su clásica casaca roja. Fomenta el aprendizaje activo, la experimentación biológica y la resolución práctica de retos.',
    color: '#ff9900',
    badge: 'Prototipos & Ingenio',
    avatarImg: './assets/images/characters/astro/frontal.png'
  },
  {
    id: 'cosmo',
    nombre: 'Cosmo',
    rol: 'Explorador Aeroespacial & Vuelo',
    descripcion: 'Robot alado de reconocimiento atmosférico. Monitorea el clima, la sustentación y la física del vuelo espacial.',
    color: '#00d2ff',
    badge: 'Aeroespacial & Vuelo',
    avatarImg: './assets/images/characters/cosmo/frontal.png'
  },
  {
    id: 'vector',
    nombre: 'Vector',
    rol: 'Arquitecto de Robótica, IA & Algoritmos',
    descripcion: 'Mecha cibernético de alta precisión. Guía a los jóvenes en programación por bloques, automatización y lógica computacional.',
    color: '#00e676',
    badge: 'Robótica & IA',
    avatarImg: './assets/images/characters/vector/frontal.png'
  },
  {
    id: 'pixel',
    nombre: 'Pixel',
    rol: 'Rover de Telemetría & Geología',
    descripcion: 'Rover todoterreno con monitor digital interactivo. Recopila muestras en el campo, realiza telemetría y mediciones con sensores ultrasónicos.',
    color: '#10b981',
    badge: 'Sensores & Telemetría',
    avatarImg: './assets/images/characters/pixel/frontal.png'
  }
];

export const TALLERES_INICIALES = [
  {
    id: 'tal-1',
    categoria: 'Ciencias Tecnológicas',
    nombre: 'Mundo Eléctrico',
    modulo: 'Módulo 1',
    descripcion: 'Conexiones electrónicas fundamentales, flujo de energía, interruptores, conductores y circuitos de señalización.',
    duracion: '2 Semanas (10 Días)',
    edadRecomendada: '10 a 14 años',
    estado: 'En Órbita',
    colorTheme: 'cyan',
    imagen: './assets/images/modulo_electrico_mundo.jpg',
    instructor: 'Dra. Electra & Equipo UPS',
    temas: [
      'Concepto de electrones, polaridad y corriente continua',
      'Circuitos abiertos, cerrados, serie y paralelo',
      'Construcción y diseño de circuitos interactivos',
      'Lógica de interruptores y señalización LED'
    ],
    materialesIncluidos: [
      'Placa de conexiones seguras para experimentos',
      'Diodos emisores de luz (LEDs) y resistores calibrados',
      'Portapilas 3V con interruptor de seguridad',
      'Cables conductores con terminales suaves'
    ]
  },
  {
    id: 'tal-2',
    categoria: 'Ciencias Tecnológicas',
    nombre: 'Mundo Magnético',
    modulo: 'Módulo 2',
    descripcion: 'Magnetismo y electromagnetismo interactivo. Descubre fuerzas invisibles, inducción magnética y motores homopolares.',
    duracion: '2 Semanas (10 Días)',
    edadRecomendada: '10 a 14 años',
    estado: 'En Órbita',
    colorTheme: 'amber',
    imagen: './assets/images/modulo_magnetico_mundo.jpg',
    instructor: 'Magno & Equipo UPS',
    temas: [
      'Polos Norte y Sur: Fuerzas de atracción, repulsión y campos magnéticos',
      'La Tierra como imán cósmico y navegación por brújula',
      'Electromagnetismo: Creando campos magnéticos con electricidad',
      'Principios del motor eléctrico y rotación continua'
    ],
    materialesIncluidos: [
      'Imanes de neodimio protegidos y cerámicos',
      'Bobinas de alambre esmaltado para inducción',
      'Brújula de orientación científica',
      'Cápsula de visualización de líneas de campo magnético'
    ]
  },
  {
    id: 'tal-3',
    categoria: 'Ciencias Tecnológicas',
    nombre: 'Mundo Verde',
    modulo: 'Módulo 3',
    descripcion: 'Ciencias ecológicas, biotecnología vegetal y energías renovables. Descubre el ciclo de la vida, fotosíntesis, cultivo hidropónico y sostenibilidad ambiental en estaciones espaciales y terrestres.',
    duracion: '2 Semanas (10 Días)',
    edadRecomendada: '10 a 14 años',
    estado: 'En Órbita',
    colorTheme: 'green',
    imagen: './assets/images/modulo_verde_mundo.jpg',
    instructor: 'Dra. Electra & Equipo UPS',
    temas: [
      'Fotosíntesis y biosferas cerradas: La vida en microcosmos',
      'Energía solar y microgeneración limpia autosustentable',
      'Hidroponía y germinación controlada con sensores de humedad',
      'Equilibrio ecológico y reciclaje de recursos en bases científicas'
    ],
    materialesIncluidos: [
      'Cúpula de germinación biosférica transparente',
      'Mini panel fotovoltaico con diodo indicador',
      'Sustratos orgánicos y semillas de brote rápido',
      'Cápsula hidropónica con indicador de pH y humedad'
    ]
  },
  {
    id: 'tal-4',
    categoria: 'Ciencias Tecnológicas',
    nombre: 'Mundo Digital',
    modulo: 'Módulo 4',
    descripcion: 'Lógica binaria, microcontroladores y programación estructurada. Transforma ideas en secuencias y algoritmos.',
    duracion: '2 Semanas (10 Días)',
    edadRecomendada: '10 a 14 años',
    estado: 'En Órbita',
    colorTheme: 'cyan',
    imagen: './assets/images/modulo_digital_mundo.jpg',
    instructor: 'Vector & Equipo UPS',
    temas: [
      'Pensamiento computacional y lógica digital',
      'Estructuras de decisión, bucles y condiciones',
      'Entradas analógicas y salidas digitales',
      'Desarrollo de secuencias interactivas y retos lógicos'
    ],
    materialesIncluidos: [
      'Plataforma de simulación de algoritmos',
      'Módulo interactivo de señales binarias',
      'Retos y guías de programación estructurada',
      'Kit de sensores digitales de prueba'
    ]
  },
  {
    id: 'tal-5',
    categoria: 'Robótica',
    nombre: 'Taller de Robótica Educativa',
    modulo: 'Módulo Robótica',
    descripcion: 'Taller integral de ingeniería y robótica con el respaldo de kits VEX Robotics (VEX IQ) como herramientas de apoyo para el desarrollo del pensamiento computacional, diseño estructural y resolución de retos.',
    duracion: '2 Semanas (10 Días)',
    edadRecomendada: '12 a 18 años',
    estado: 'En Órbita',
    colorTheme: 'orange',
    imagen: './assets/images/robotica_astro.jpg',
    instructor: 'Astro & Docentes de Ingeniería UPS',
    temas: [
      'Fundamentos mecánicos y ensamblaje con piezas modulares VEX IQ',
      'Transmisión de movimiento: trenes de engranajes y poleas',
      'Programación autónoma y control asistido de motores inteligentes',
      'Resolución de misiones y retos dinámicos en pista'
    ],
    materialesIncluidos: [
      'Kits oficiales VEX Robotics (VEX IQ) para experimentación en aula',
      'Cerebro (Brain) VEX IQ y control remoto inteligente',
      'Motores inteligentes con encoders de alta precisión',
      'Sensores de contacto, color y distancia VEX'
    ]
  }
];

export const EXPERIMENTOS_INICIALES = [
  {
    id: 'exp-papelitos',
    esOficial: true,
    creador: 'admin',
    autorNombre: 'Pequeños Científicos (UPS)',
    titulo: 'Papelitos de Colores: Danza Electrostática',
    subtitulo: 'Cargas electrostáticas, transferencia de electrones y polarización',
    categoria: 'Ciencias Tecnológicas (Mundo Eléctrico)',
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
  },
  {
    id: 'exp-robotica-basebot',
    esOficial: true,
    creador: 'admin',
    autorNombre: 'Pequeños Científicos (UPS)',
    titulo: 'Basebot VEX IQ 2.0: Ensamblaje de Chasis',
    subtitulo: 'Guía 3D interactiva de montaje mecánico, transmisión diferencial y cerebro VEX IQ',
    categoria: 'Taller de Robótica',
    tipo: 'robotica_3d',
    personajeId: 'vector',
    tallerId: 'tal-5',
    nivel: '8 a 16 años',
    tiempoMinutos: 45,
    visor3dUrl: 'https://instructions.online/?id=4093-VEX_IQ_Basebot_2.0',
    pdfManualUrl: 'https://content.vexrobotics.com/stem-labs/iq/builds/basebot/iq-2nd-gen-basebot-rev12.pdf',
    descripcion: 'Aprende ingeniería y robótica construyendo la base móvil VEX IQ de 2da generación. Utiliza el visor 3D interactivo para manipular las piezas en 360° o consulta el manual técnico oficial.',
    hipotesis: '¿Cómo influye la rigidez del chasis y la tracción diferencial en la estabilidad y maniobrabilidad de un robot explorador autónomo?',
    explicacionCientifica: 'El Basebot VEX IQ 2.0 utiliza un sistema de tracción diferencial con dos motores inteligentes independientes. La simetría del chasis y la rueda loca (caster) reducen la fricción al girar sobre su propio eje (spin turn), permitiendo que los algoritmos de navegación odométrica y control giroscópico operen con máxima precisión.',
    materiales: [
      '1x Cerebro VEX IQ Brain (2da Generación)',
      '1x Batería recargable Li-Ion VEX IQ 2.0',
      '2x Motores Inteligentes VEX IQ (Smart Motors)',
      '2x Ruedas motrices de tracción (200mm)',
      '1x Rueda loca omnidireccional (Caster Wheel)',
      'Vigas estructurales 2x12 y 1x8 VEX IQ',
      'Pines conectores de fricción (azules y negros)',
      '2x Ejes motrices de acero templado y espaciadores',
      '2x Smart Cables de comunicación y control'
    ],
    pasos: [
      {
        id: 1,
        numero: 1,
        categoria: 'Alistamiento',
        categoriaColor: '#38bdf8',
        titulo: 'Alistamiento y Clasificación de Piezas',
        subtitulo: 'Revisión de componentes mecánicos, bandeja y regla de escala 1:1.',
        texto: 'Antes de ensamblar, clasifica las vigas, ejes y pines en tu estación de trabajo. Usa la regla 1:1 para confirmar las longitudes de los ejes y vigas estructurales.',
        duracion: '00:30',
        piezasRequeridas: [
          { nombre: 'Viga estructural 2x12', cantidad: 2, color: 'Gris' },
          { nombre: 'Pines de fricción conectores', cantidad: 8, color: 'Azul' },
          { nombre: 'Bandeja organizadora VEX IQ', cantidad: 1, color: 'Transparente' }
        ],
        subtitulos: 'Clasifica tus componentes en la bandeja y verifica las medidas 1:1.'
      },
      {
        id: 2,
        numero: 2,
        categoria: 'Montaje',
        categoriaColor: '#ff8a55',
        titulo: 'Subchasis Izquierdo',
        subtitulo: 'Ensamble de vigas longitudinales y bujes de soporte para eje.',
        texto: 'Une las vigas 2x12 formando el larguero izquierdo del chasis. Inserta los pines de fricción en los agujeros indicados para garantizar rigidez torsional.',
        duracion: '00:30',
        piezasRequeridas: [
          { nombre: 'Viga 2x12', cantidad: 1, color: 'Gris' },
          { nombre: 'Conectores en ángulo', cantidad: 2, color: 'Negro' },
          { nombre: 'Pines de fricción 1x1', cantidad: 4, color: 'Azul' }
        ],
        subtitulos: 'Construye el larguero izquierdo asegurando los pines con firmeza.'
      },
      {
        id: 3,
        numero: 3,
        categoria: 'Montaje',
        categoriaColor: '#ff8a55',
        titulo: 'Subchasis Derecho y Travesaño Central',
        subtitulo: 'Unión simétrica de ambos largueros con vigas transversales.',
        texto: 'Construye el lado derecho como espejo del izquierdo y acóplalos con la viga transversal. El marco debe quedar perfectamente escuadrado para evitar desvíos al rodar.',
        duracion: '00:30',
        piezasRequeridas: [
          { nombre: 'Viga 2x12', cantidad: 1, color: 'Gris' },
          { nombre: 'Viga transversal 2x8', cantidad: 1, color: 'Gris' },
          { nombre: 'Pines conectores 2x2', cantidad: 6, color: 'Negro' }
        ],
        subtitulos: 'Acopla ambos subchasis para formar la plataforma rectangular.'
      },
      {
        id: 4,
        numero: 4,
        categoria: 'Mecánica',
        categoriaColor: '#2ce4ff',
        titulo: 'Instalación de Motores Inteligentes',
        subtitulo: 'Acoplamiento de Smart Motors y ejes motrices directos.',
        texto: 'Fija los dos motores inteligentes VEX IQ en la parte posterior del chasis con pines de retención. Inserta los ejes de acero en los orificios cuadrados de salida del motor.',
        duracion: '00:30',
        piezasRequeridas: [
          { nombre: 'Smart Motor VEX IQ', cantidad: 2, color: 'Gris/Azul' },
          { nombre: 'Eje de acero templado 2x', cantidad: 2, color: 'Metálico' },
          { nombre: 'Bujes espaciadores', cantidad: 4, color: 'Blanco' }
        ],
        subtitulos: 'Instala los motores inteligentes y comprueba que los ejes giren suaves.'
      },
      {
        id: 5,
        numero: 5,
        categoria: 'Tracción',
        categoriaColor: '#54e4a4',
        titulo: 'Montaje de Ruedas y Rueda Caster',
        subtitulo: 'Instalación de neumáticos de tracción y rueda de apoyo omnidireccional.',
        texto: 'Coloca las dos ruedas principales en los ejes motrices y asegura con collares de fijación. En el frente, monta la rueda loca (caster) para permitir rotación de radio cero.',
        duracion: '00:30',
        piezasRequeridas: [
          { nombre: 'Rueda motriz 200mm con neumático', cantidad: 2, color: 'Gris/Caucho' },
          { nombre: 'Rueda Caster de soporte', cantidad: 1, color: 'Negro' },
          { nombre: 'Collares de eje con seguro', cantidad: 2, color: 'Verde/Gris' }
        ],
        subtitulos: 'Coloca las ruedas y la rueda de apoyo frontal.'
      },
      {
        id: 6,
        numero: 6,
        categoria: 'Electrónica',
        categoriaColor: '#af78ff',
        titulo: 'Fijación del Cerebro VEX IQ y Batería',
        subtitulo: 'Montaje de la unidad de control central y batería de litio.',
        texto: 'Posiciona el Brain VEX IQ en el centro de gravedad del chasis con la pantalla LCD orientada hacia arriba. Desliza la batería Li-Ion en la bahía inferior hasta oír el clic.',
        duracion: '00:30',
        piezasRequeridas: [
          { nombre: 'Cerebro VEX IQ Brain 2da Gen', cantidad: 1, color: 'Negro con LCD' },
          { nombre: 'Batería recargable Li-Ion', cantidad: 1, color: 'Negro' },
          { nombre: 'Pines de soporte largo', cantidad: 4, color: 'Azul' }
        ],
        subtitulos: 'Asegura el cerebro VEX IQ y conecta la batería en su bahía central.'
      },
      {
        id: 7,
        numero: 7,
        categoria: 'Pruebas',
        categoriaColor: '#7ce36a',
        titulo: 'Cableado Smart Cables y Test de Encendido',
        subtitulo: 'Conexión a puertos inteligentes y validación de firmware.',
        texto: 'Conecta los Smart Cables desde los motores izquierdo y derecho hacia los puertos 1 y 6 del Brain. Enciende la unidad con el botón central y valida la telemetría en pantalla.',
        duracion: '00:30',
        piezasRequeridas: [
          { nombre: 'Smart Cable 200mm', cantidad: 2, color: 'Negro con RJ11' }
        ],
        subtitulos: '¡Conecta los cables y enciende el cerebro! Tu Basebot está listo para la misión.'
      }
    ]
  }
];

export const KITS_TIENDA_INICIALES = [];

