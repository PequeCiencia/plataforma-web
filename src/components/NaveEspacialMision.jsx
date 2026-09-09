// NaveEspacialMision.jsx - Cabina Espacial con Persistencia de Videos en IndexedDB y Sincronización Real
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { saveMediaFile, getMediaUrl } from '../utils/mediaStorage';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Check, 
  Edit3, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  X, 
  Layers, 
  Upload, 
  Video as VideoIcon, 
  Printer, 
  Grid, 
  Eye, 
  FlaskConical, 
  Power, 
  Square, 
  BookOpen,
  Wrench,
  FileVideo,
  FolderOpen
} from 'lucide-react';

export default function NaveEspacialMision({ onExit, onOpenAdmin }) {
  const { 
    experimentos, 
    activeExpId, 
    setActiveExpId, 
    updatePasoMedia 
  } = useData();

  // Experimento actual
  const experimentoActual = experimentos.find(e => e.id === activeExpId) || experimentos[0] || {
    id: 'exp-densidades',
    titulo: 'Arcoíris de Densidades',
    subtitulo: 'Columna de líquidos, masa, volumen y tensión superficial',
    categoria: 'Física & Química',
    nivel: '10 a 18 años',
    materiales: ['50 ml de Miel', '50 ml de Jabón líquido', '50 ml de Agua', '50 ml de Aceite', '50 ml de Alcohol', 'Probeta 250ml', 'Goteros'],
    pasos: []
  };

  const [pasoIndex, setPasoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [resolvedVideoUrl, setResolvedVideoUrl] = useState(null);
  
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Modales
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isExpListOpen, setIsExpListOpen] = useState(false);
  const [isMaterialsView, setIsMaterialsView] = useState(false);

  // Cronómetro
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Estados de interactividad de cabina
  const [rockerStates, setRockerStates] = useState([true, false, true]);
  const [pasosCompletados, setPasosCompletados] = useState({});
  const [materialesChequeados, setMaterialesChequeados] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  // Drag & Drop y Carga de Video
  const [isDragging, setIsDragging] = useState(false);
  const [inputVideoUrl, setInputVideoUrl] = useState('');
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [isSavingMedia, setIsSavingMedia] = useState(false);
  
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Bitácora del estudiante
  const [bitacora, setBitacora] = useState({
    estudiante: '',
    institucion: 'Universidad Politécnica Salesiana - Pequeños Científicos',
    fecha: new Date().toISOString().split('T')[0],
    observaciones: '',
    mediciones: '',
    conclusiones: ''
  });

  const pasos = experimentoActual.pasos || [];
  const totalPasos = pasos.length || 1;
  const pasoActual = pasos[pasoIndex] || {
    id: 1,
    numero: 1,
    categoria: 'Conceptos',
    categoriaColor: '#2ce4ff',
    titulo: 'Paso de Laboratorio',
    subtitulo: 'Instrucciones del experimento',
    texto: 'Sigue la guía multimedia para realizar la práctica.',
    duracion: '00:28',
    subtitulos: 'Comprende el principio científico de este paso.'
  };

  // Cargar de forma persistente el video desde IndexedDB si tiene mediaKey o URL
  useEffect(() => {
    let isMounted = true;
    async function resolveCurrentVideo() {
      setIsVideoLoaded(false);
      if (pasoActual?.mediaKey) {
        try {
          const freshUrl = await getMediaUrl(pasoActual.mediaKey);
          if (isMounted) {
            setResolvedVideoUrl(freshUrl);
          }
        } catch (e) {
          console.error('Error al resolver video de IndexedDB:', e);
          if (isMounted) setResolvedVideoUrl(null);
        }
      } else if (pasoActual?.videoUrl && !pasoActual.videoUrl.startsWith('blob:')) {
        // Enlace web válido (YouTube o URL externa)
        if (isMounted) setResolvedVideoUrl(pasoActual.videoUrl);
      } else {
        if (isMounted) setResolvedVideoUrl(null);
      }
    }
    resolveCurrentVideo();
    return () => { isMounted = false; };
  }, [pasoActual, pasoIndex, experimentoActual.id]);

  // Duración efectiva (del video real si existe, o 28s si es simulación)
  const effectiveDuration = (resolvedVideoUrl && videoDuration > 0) ? videoDuration : 28;
  const porcentajeAvance = totalPasos > 0 ? Math.round(((pasoIndex + 1) / totalPasos) * 100) : 0;

  // Mostrar toast temporal
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Reproductor de sonido Web Audio API
  const playBeep = (freq = 600, type = 'sine', duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio no disponible', e);
    }
  };

  // Cronómetro de cabina
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      playBeep(880, 'triangle', 0.4);
      showToast('⏰ ¡Tiempo de observación completado!');
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // Simulación de tiempo si NO hay video cargado
  useEffect(() => {
    let interval = null;
    if (!resolvedVideoUrl && isPlaying && currentTime < effectiveDuration) {
      interval = setInterval(() => setCurrentTime(s => s + 1), 1000);
    } else if (!resolvedVideoUrl && currentTime >= effectiveDuration && isPlaying) {
      setIsPlaying(false);
      playBeep(700, 'sine', 0.2);
      setPasosCompletados(prev => ({ ...prev, [`${experimentoActual.id}-${pasoIndex}`]: true }));
      if (pasoIndex === totalPasos - 1) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        showToast('🎉 ¡Experimento completado exitosamente!');
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, effectiveDuration, resolvedVideoUrl, pasoIndex, totalPasos, experimentoActual.id]);

  // Manejo de selección de paso
  const seleccionarPaso = (idx) => {
    playBeep(520, 'sine', 0.06);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setPasoIndex(idx);
    setCurrentTime(0);
    setVideoDuration(0);
    setIsVideoLoaded(false);
    setIsPlaying(false);
  };

  const handleNextStep = () => {
    playBeep(650, 'sine', 0.08);
    setPasosCompletados(prev => ({ ...prev, [`${experimentoActual.id}-${pasoIndex}`]: true }));
    if (pasoIndex < totalPasos - 1) {
      seleccionarPaso(pasoIndex + 1);
    } else {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      showToast('🌟 ¡Has culminado todos los pasos de la misión!');
    }
  };

  const handlePrevStep = () => {
    playBeep(450, 'sine', 0.08);
    if (pasoIndex > 0) {
      seleccionarPaso(pasoIndex - 1);
    }
  };

  // CONTROL REAL DE PLAY / PAUSE VINCULADO AL VIDEO
  const handleTogglePlay = () => {
    if (resolvedVideoUrl && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          playBeep(750, 'sine', 0.08);
        }).catch(err => {
          console.warn('Autoplay bloqueado:', err);
          setIsPlaying(true);
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        playBeep(400, 'sine', 0.08);
      }
    } else {
      setIsPlaying(!isPlaying);
      playBeep(isPlaying ? 400 : 750, 'sine', 0.08);
    }
  };

  // Detener video / paso
  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    playBeep(350, 'sawtooth', 0.1);
  };

  // Reiniciar paso
  const handleResetStep = () => {
    handleStop();
    showToast('Paso reiniciado');
  };

  // Sincronización de eventos de video HTML5
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration || 0);
      setIsVideoLoaded(true);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    playBeep(700, 'sine', 0.2);
    setPasosCompletados(prev => ({ ...prev, [`${experimentoActual.id}-${pasoIndex}`]: true }));
    if (pasoIndex === totalPasos - 1) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      showToast('🎉 ¡Experimento completado exitosamente!');
    }
  };

  // Scrubber click
  const handleSeek = (newTime) => {
    setCurrentTime(newTime);
    if (videoRef.current && resolvedVideoUrl) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Guardar recurso multimedia con persistencia en IndexedDB
  const handleSaveMedia = async () => {
    const pasoId = pasoActual.id || pasoIndex + 1;
    const mediaKey = `media_${experimentoActual.id}_p${pasoId}`;
    setIsSavingMedia(true);

    try {
      if (selectedVideoFile) {
        // Guardar archivo real en IndexedDB
        await saveMediaFile(mediaKey, selectedVideoFile, selectedVideoFile.name);
        const freshUrl = await getMediaUrl(mediaKey);

        updatePasoMedia(experimentoActual.id, pasoId, {
          mediaKey: mediaKey,
          videoType: 'file',
          videoFileName: selectedVideoFile.name,
          videoUrl: '' // Se resuelve dinámicamente mediante mediaKey
        });

        setResolvedVideoUrl(freshUrl);
        playBeep(800, 'sine', 0.15);
        showToast('✅ Video guardado permanentemente en el equipo');
      } else if (inputVideoUrl) {
        // Guardar URL directa o YouTube
        updatePasoMedia(experimentoActual.id, pasoId, {
          mediaKey: null,
          videoType: 'url',
          videoFileName: '',
          videoUrl: inputVideoUrl
        });

        setResolvedVideoUrl(inputVideoUrl);
        playBeep(800, 'sine', 0.15);
        showToast('✅ Enlace de video guardado');
      }

      setIsUploadModalOpen(false);
      setInputVideoUrl('');
      setSelectedVideoFile(null);
    } catch (err) {
      console.error('Error al guardar video:', err);
      showToast('⚠️ No se pudo guardar el archivo local');
    } finally {
      setIsSavingMedia(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideoFile(file);
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedVideoFile(file);
      playBeep(750, 'sine', 0.08);
    }
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatVideoTime = (sec) => {
    if (isNaN(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }
    return mb.toFixed(1) + ' MB';
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: '#030812',
        color: '#f1f5f9',
        fontFamily: "'Space Grotesk', 'Segoe UI', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        userSelect: 'none',
        boxSizing: 'border-box'
      }}
    >
      {/* 🌌 ESPACIO CÓSMICO VISIBLE A TRAVÉS DE LAS VENTANAS LATERALES */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 12% 20%, rgba(0, 229, 255, 0.16) 0%, transparent 40%),
          radial-gradient(circle at 88% 28%, rgba(255, 153, 0, 0.14) 0%, transparent 45%),
          radial-gradient(circle at 50% 80%, rgba(147, 51, 234, 0.12) 0%, transparent 50%),
          radial-gradient(2px 2px at 25px 35px, #ffffff, rgba(0,0,0,0)),
          radial-gradient(2px 2px at 50px 80px, #00e5ff, rgba(0,0,0,0)),
          radial-gradient(1px 1px at 110px 45px, #ffc936, rgba(0,0,0,0)),
          radial-gradient(2px 2px at 180px 130px, #ffffff, rgba(0,0,0,0))
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 250px 250px, 320px 320px, 180px 180px, 400px 400px',
        backgroundColor: '#020610',
        zIndex: 0
      }} />

      {/* 🚀 MONTANTES LATERALES CON BARRAS LED VERTICALES AMARILLAS */}
      <div style={{
        position: 'absolute',
        left: '6px',
        top: '10%',
        bottom: '15%',
        width: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <div style={{ width: '5px', height: '120px', borderRadius: '4px', background: 'linear-gradient(180deg, #ffb703, #fb8500)', boxShadow: '0 0 14px #ffb703' }} />
        <div style={{ width: '5px', height: '120px', borderRadius: '4px', background: 'linear-gradient(180deg, #ffb703, #fb8500)', boxShadow: '0 0 14px #ffb703' }} />
      </div>

      <div style={{
        position: 'absolute',
        right: '6px',
        top: '10%',
        bottom: '15%',
        width: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <div style={{ width: '5px', height: '120px', borderRadius: '4px', background: 'linear-gradient(180deg, #ffb703, #fb8500)', boxShadow: '0 0 14px #ffb703' }} />
        <div style={{ width: '5px', height: '120px', borderRadius: '4px', background: 'linear-gradient(180deg, #ffb703, #fb8500)', boxShadow: '0 0 14px #ffb703' }} />
      </div>

      {/* 🎛️ CONTENEDOR PRINCIPAL FLUIDO */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1600px',
        height: '100%',
        margin: '0 auto',
        padding: '10px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        gap: '8px'
      }}>

        {/* ========================================================
            1. BARRA SUPERIOR INSTITUCIONAL (HUD TOP)
            ======================================================== */}
        <header style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 16px',
          background: 'rgba(8, 20, 38, 0.9)',
          border: '1.5px solid rgba(0, 229, 255, 0.35)',
          borderRadius: '14px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), inset 0 0 12px rgba(0, 229, 255, 0.08)',
          gap: '12px',
          height: '48px'
        }}>
          {/* CÁPSULA IZQUIERDA: LOGO UPS */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '2px 10px',
            borderRadius: '10px',
            border: '2px solid #00509d',
            boxShadow: '0 0 12px rgba(0, 80, 157, 0.4)',
            height: '36px'
          }}>
            <img 
              src="./assets/images/logo_ups.png" 
              alt="Universidad Politécnica Salesiana Ecuador" 
              style={{ maxHeight: '28px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          {/* CENTRO: PLACA HUD 'LABORATORIO DE EXPERIMENTOS' */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(180deg, #091c33 0%, #05101f 100%)',
            padding: '4px 18px',
            borderRadius: '30px',
            border: '1.5px solid #00e5ff',
            boxShadow: '0 0 16px rgba(0, 229, 255, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3)'
          }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 6px #00e5ff' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 6px #00e5ff' }} />
            </div>

            <button
              onClick={() => setIsExpListOpen(!isExpListOpen)}
              style={{
                background: 'rgba(0, 229, 255, 0.12)',
                border: '1px solid rgba(0, 229, 255, 0.5)',
                padding: '3px 14px',
                borderRadius: '20px',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.86rem',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase'
              }}
              title="Haz clic para cambiar de misión"
            >
              <FlaskConical size={14} color="#00e5ff" />
              <span>Laboratorio de Experimentos</span>
              <span style={{ fontSize: '0.72rem', background: '#00e5ff', color: '#030812', padding: '1px 6px', borderRadius: '10px', fontWeight: 900 }}>
                {experimentoActual.titulo}
              </span>
            </button>

            <div style={{ display: 'flex', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 6px #f59e0b' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308', boxShadow: '0 0 6px #eab308' }} />
            </div>
          </div>

          {/* CÁPSULA DERECHA: LOGO PEQUEÑOS CIENTÍFICOS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '2px 10px',
              borderRadius: '10px',
              border: '2px solid #ff7b00',
              boxShadow: '0 0 12px rgba(255, 123, 0, 0.4)',
              height: '36px'
            }}>
              <img 
                src="./assets/images/logo_pequenos_cientificos.png" 
                alt="Pequeños Científicos" 
                style={{ maxHeight: '30px', width: 'auto', objectFit: 'contain' }}
              />
            </div>

            <button
              onClick={() => {
                if (onOpenAdmin) onOpenAdmin();
              }}
              style={{
                background: 'rgba(0, 229, 255, 0.15)',
                border: '1px solid #00e5ff',
                color: '#00e5ff',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '0.74rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer'
              }}
              title="Gestionar Experimentos (Modo Docente)"
            >
              <Wrench size={13} />
              <span>Gestión Docente</span>
            </button>

            <button
              onClick={onExit}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                color: '#f87171',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '0.74rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                cursor: 'pointer'
              }}
              title="Salir al portal principal"
            >
              <X size={13} />
              <span>Salir</span>
            </button>
          </div>
        </header>

        {/* SELECTOR DESPLEGABLE DE EXPERIMENTOS */}
        {isExpListOpen && (
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '20px',
            right: '20px',
            background: 'rgba(7, 19, 36, 0.98)',
            border: '2px solid #00e5ff',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.9)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '10px',
            zIndex: 100
          }}>
            {experimentos.map((exp) => {
              const isSelected = exp.id === experimentoActual.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => {
                    setActiveExpId(exp.id);
                    seleccionarPaso(0);
                    setIsExpListOpen(false);
                    playBeep(600, 'sine', 0.1);
                    showToast(`Misión cargada: ${exp.titulo}`);
                  }}
                  style={{
                    background: isSelected ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '2px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    textAlign: 'left',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: '#00e5ff', fontWeight: 800, textTransform: 'uppercase' }}>
                    {exp.categoria || 'Ingeniería'} · {exp.nivel || '10-18 años'}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, margin: '2px 0 2px 0' }}>
                    {exp.titulo}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.2 }}>
                    {exp.subtitulo || exp.descripcion?.slice(0, 60)}...
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ========================================================
            2. ÁREA CENTRAL: PASOS (IZQ) + HOLOSCREEN (DER)
            ======================================================== */}
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'minmax(270px, 320px) 1fr',
          gap: '14px',
          alignItems: 'stretch'
        }}>

          {/* 📋 PANEL IZQUIERDO: LISTA DE PASOS */}
          <aside style={{
            height: '100%',
            background: 'linear-gradient(180deg, rgba(8, 22, 42, 0.94) 0%, rgba(5, 14, 28, 0.96) 100%)',
            border: '2px solid rgba(0, 229, 255, 0.35)',
            borderRadius: '18px',
            padding: '14px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(0, 229, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            minHeight: 0,
            overflow: 'hidden'
          }}>
            {/* Cabecera del Progreso: 'PASO 1 DE 7' y barra de % */}
            <div style={{
              flexShrink: 0,
              background: 'rgba(0, 15, 30, 0.7)',
              border: '1px solid rgba(0, 229, 255, 0.25)',
              borderRadius: '10px',
              padding: '8px 12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  PASO {pasoIndex + 1} DE {totalPasos}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#00e5ff' }}>
                  {porcentajeAvance}%
                </span>
              </div>

              {/* Barra de Progreso */}
              <div style={{
                height: '7px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 229, 255, 0.3)'
              }}>
                <div style={{
                  height: '100%',
                  width: `${porcentajeAvance}%`,
                  background: 'linear-gradient(90deg, #00e5ff 0%, #38bdf8 60%, #10b981 100%)',
                  boxShadow: '0 0 8px #00e5ff',
                  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
              </div>
            </div>

            {/* Píldoras de los Pasos (Scrollable internamente) */}
            <div style={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              {pasos.map((paso, idx) => {
                const isCurrent = idx === pasoIndex;
                const isDone = pasosCompletados[`${experimentoActual.id}-${idx}`] || idx < pasoIndex;
                const categoriaColor = paso.categoriaColor || (
                  idx === 0 ? '#2ce4ff' :
                  idx === 1 ? '#ffc936' :
                  idx === 2 || idx === 3 ? '#ff8a55' :
                  idx === 4 ? '#af78ff' :
                  idx === 5 ? '#54e4a4' : '#7ce36a'
                );

                return (
                  <button
                    key={paso.id || idx}
                    onClick={() => seleccionarPaso(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '12px',
                      background: isCurrent 
                        ? 'linear-gradient(90deg, rgba(0, 229, 255, 0.25) 0%, rgba(8, 30, 58, 0.85) 100%)' 
                        : isDone 
                        ? 'rgba(16, 185, 129, 0.08)' 
                        : 'rgba(255, 255, 255, 0.02)',
                      border: isCurrent 
                        ? '1.5px solid #00e5ff' 
                        : isDone 
                        ? '1px solid rgba(16, 185, 129, 0.4)' 
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: isCurrent ? '0 0 12px rgba(0, 229, 255, 0.25)' : 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      flexShrink: 0
                    }}
                  >
                    {/* Círculo Neón con Número */}
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isCurrent ? categoriaColor : isDone ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                      color: isCurrent || isDone ? '#030812' : '#ffffff',
                      border: `1.5px solid ${categoriaColor}`,
                      boxShadow: isCurrent ? `0 0 10px ${categoriaColor}` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '0.82rem',
                      flexShrink: 0
                    }}>
                      {isDone ? <Check size={14} strokeWidth={3} /> : (paso.numero || idx + 1)}
                    </div>

                    {/* Texto del Paso */}
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.64rem',
                        fontWeight: 900,
                        color: categoriaColor,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {paso.categoria || 'PASO'}
                      </div>
                      <div style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: isCurrent ? '#ffffff' : '#cbd5e1',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {paso.titulo}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Botón de Materiales */}
            <button
              onClick={() => {
                setIsMaterialsView(!isMaterialsView);
                playBeep(550, 'sine', 0.08);
              }}
              style={{
                flexShrink: 0,
                padding: '8px 12px',
                borderRadius: '10px',
                background: isMaterialsView ? '#ffc936' : 'rgba(255, 201, 54, 0.12)',
                color: isMaterialsView ? '#030812' : '#ffc936',
                border: '1.5px solid #ffc936',
                fontSize: '0.78rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Layers size={14} />
              <span>Ver Materiales ({experimentoActual.materiales?.length || 0})</span>
            </button>
          </aside>

          {/* 📺 PANTALLA CENTRAL HOLOSCREEN */}
          <main style={{
            height: '100%',
            background: 'linear-gradient(180deg, #06152b 0%, #030c1a 100%)',
            border: '2.5px solid #00e5ff',
            borderRadius: '20px',
            boxShadow: '0 0 30px rgba(0, 229, 255, 0.35), inset 0 0 25px rgba(0, 229, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            minHeight: 0
          }}>
            {/* Cuadrícula holográfica de fondo */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              pointerEvents: 'none',
              zIndex: 1
            }} />

            {/* Header interno de la pantalla */}
            <div style={{
              flexShrink: 0,
              position: 'relative',
              zIndex: 5,
              padding: '10px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
              background: 'rgba(4, 16, 32, 0.7)'
            }}>
              <div>
                <div style={{
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  color: '#00e5ff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  {experimentoActual.titulo} · {pasoActual.categoria}
                </div>
                <h2 style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  margin: 0
                }}>
                  {pasoActual.titulo}
                </h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  background: 'rgba(0, 229, 255, 0.15)',
                  border: '1px solid #00e5ff',
                  color: '#00e5ff',
                  padding: '2px 8px',
                  borderRadius: '16px',
                  fontSize: '0.75rem',
                  fontWeight: 900
                }}>
                  {pasoIndex + 1}/{totalPasos}
                </span>

                <button
                  onClick={() => setIsHelpModalOpen(true)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    padding: '3px 10px',
                    borderRadius: '16px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Eye size={12} />
                  <span>VISTA PREVIA</span>
                </button>
              </div>
            </div>

            {/* CENTRO DE LA PANTALLA HOLOSCREEN: VIDEO A PANTALLA COMPLETA */}
            <div style={{
              flex: 1,
              minHeight: 0,
              position: 'relative',
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMaterialsView || !resolvedVideoUrl ? '16px' : '0px',
              textAlign: 'center',
              overflow: 'hidden',
              background: resolvedVideoUrl ? '#000000' : 'transparent'
            }}>
              {/* VISTA DE MATERIALES */}
              {isMaterialsView ? (
                <div style={{
                  width: '100%',
                  maxWidth: '640px',
                  background: 'rgba(7, 20, 38, 0.92)',
                  border: '1.5px solid #ffc936',
                  borderRadius: '14px',
                  padding: '16px',
                  boxShadow: '0 0 20px rgba(255, 201, 54, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FlaskConical color="#ffc936" size={20} />
                      <h3 style={{ margin: 0, color: '#ffc936', fontSize: '1.1rem', fontWeight: 900 }}>
                        Materiales y Reactivos Necesarios
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsMaterialsView(false)}
                      style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '8px',
                    textAlign: 'left',
                    maxHeight: '220px',
                    overflowY: 'auto'
                  }}>
                    {(experimentoActual.materiales || []).map((mat, i) => {
                      const isChecked = materialesChequeados[`${experimentoActual.id}-${i}`];
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            setMaterialesChequeados(prev => ({
                              ...prev,
                              [`${experimentoActual.id}-${i}`]: !isChecked
                            }));
                            playBeep(isChecked ? 400 : 700, 'sine', 0.06);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            background: isChecked ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                            border: isChecked ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '5px',
                            border: isChecked ? '2px solid #10b981' : '2px solid rgba(255, 255, 255, 0.4)',
                            background: isChecked ? '#10b981' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#030812'
                          }}>
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: isChecked ? '#f1f5f9' : '#cbd5e1' }}>
                            {typeof mat === 'string' ? mat : mat.nombre || mat}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : resolvedVideoUrl ? (
                /* REPRODUCTOR DE VIDEO SIN MARCOS Y SIN CONTROLES NATIVOS DUPLICADOS */
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {resolvedVideoUrl.includes('youtube.com') || resolvedVideoUrl.includes('youtu.be') ? (
                    <iframe
                      src={resolvedVideoUrl.replace('watch?v=', 'embed/')}
                      title={pasoActual.titulo}
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        key={resolvedVideoUrl}
                        src={resolvedVideoUrl}
                        controls={false}
                        onTimeUpdate={handleVideoTimeUpdate}
                        onLoadedMetadata={handleVideoLoadedMetadata}
                        onEnded={handleVideoEnded}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onClick={handleTogglePlay}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block',
                          cursor: 'pointer'
                        }}
                      />

                      {/* Botón flotante Play en centro si está pausado */}
                      {!isPlaying && (
                        <div 
                          onClick={handleTogglePlay}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0, 0, 0, 0.25)',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'rgba(0, 229, 255, 0.9)',
                            color: '#030812',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 25px #00e5ff',
                            transition: 'transform 0.15s'
                          }}>
                            <Play size={30} strokeWidth={3} style={{ marginLeft: '4px' }} />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                /* GRÁFICO ORBITAL ATÓMICO SCI-FI (SI NO HAY VIDEO) */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  {/* Círculos orbitales rotatorios */}
                  <div style={{
                    position: 'relative',
                    width: '140px',
                    height: '140px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      position: 'absolute',
                      width: '140px',
                      height: '70px',
                      borderRadius: '50%',
                      border: '1.5px dashed rgba(0, 229, 255, 0.4)',
                      transform: 'rotate(-25deg)',
                      animation: 'spin 18s linear infinite'
                    }} />
                    <div style={{
                      position: 'absolute',
                      width: '140px',
                      height: '70px',
                      borderRadius: '50%',
                      border: '1.5px dashed rgba(0, 229, 255, 0.4)',
                      transform: 'rotate(45deg)',
                      animation: 'spin 22s linear infinite reverse'
                    }} />

                    {/* Diana central neón */}
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      border: '2.5px solid #00e5ff',
                      boxShadow: '0 0 16px #00e5ff, inset 0 0 8px #00e5ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0, 229, 255, 0.15)'
                    }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#00e5ff' }} />
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', marginBottom: '4px' }}>
                      {pasoActual.titulo}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '480px', margin: '0 auto 10px auto', lineHeight: 1.35 }}>
                      {pasoActual.subtitulo || pasoActual.texto}
                    </p>
                  </div>

                  {/* Botón 'Subir video para este bloque' */}
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: '#030812',
                      border: '1.5px solid #fde68a',
                      borderRadius: '20px',
                      padding: '8px 18px',
                      fontSize: '0.82rem',
                      fontWeight: 900,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Upload size={14} />
                    <span>Subir video para este bloque</span>
                  </button>
                </div>
              )}
            </div>

            {/* BARRA INFERIOR DE REPRODUCCIÓN */}
            <div style={{
              flexShrink: 0,
              position: 'relative',
              zIndex: 5,
              padding: '8px 18px',
              background: 'rgba(3, 10, 22, 0.95)',
              borderTop: '1px solid rgba(0, 229, 255, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              {showSubtitles && (
                <div style={{
                  fontSize: '0.78rem',
                  color: '#93c5fd',
                  textAlign: 'center',
                  fontStyle: 'italic',
                  fontWeight: 600
                }}>
                  "{pasoActual.subtitulos || pasoActual.subtitulo || pasoActual.texto}"
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={handleTogglePlay}
                  style={{
                    background: 'rgba(0, 229, 255, 0.2)',
                    border: '1px solid #00e5ff',
                    color: '#00e5ff',
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>

                {/* Scrubber sincronizado con el video */}
                <div 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const fraction = clickX / rect.width;
                    const targetTime = fraction * effectiveDuration;
                    handleSeek(targetTime);
                  }}
                  style={{
                    flexGrow: 1,
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    height: '100%',
                    width: `${effectiveDuration > 0 ? (currentTime / effectiveDuration) * 100 : 0}%`,
                    background: '#00e5ff',
                    borderRadius: '6px',
                    boxShadow: '0 0 8px #00e5ff'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${effectiveDuration > 0 ? (currentTime / effectiveDuration) * 100 : 0}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#fbbf24',
                    border: '2px solid #ffffff',
                    boxShadow: '0 0 6px #fbbf24'
                  }} />
                </div>

                {/* Timestamp en vivo */}
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 700 }}>
                  {formatVideoTime(currentTime)} / {formatVideoTime(effectiveDuration)}
                </span>

                <button
                  onClick={() => {
                    setShowSubtitles(!showSubtitles);
                    playBeep(500, 'sine', 0.05);
                  }}
                  style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    background: showSubtitles ? '#00e5ff' : 'rgba(255, 255, 255, 0.08)',
                    color: showSubtitles ? '#030812' : '#ffffff',
                    border: '1px solid rgba(0, 229, 255, 0.4)',
                    cursor: 'pointer'
                  }}
                >
                  CC
                </button>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: soundEnabled ? '#00e5ff' : '#64748b',
                    cursor: 'pointer'
                  }}
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>

                <button
                  onClick={toggleFullscreen}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* ========================================================
            3. CONSOLA INFERIOR DE MANDO (CONTROL DECK)
            ======================================================== */}
        <footer style={{
          flexShrink: 0,
          display: 'grid',
          gridTemplateColumns: 'minmax(190px, 240px) 140px 1fr 160px minmax(200px, 260px) 30px',
          gap: '12px',
          alignItems: 'center',
          background: 'linear-gradient(180deg, #091a2e 0%, #040d18 100%)',
          border: '2px solid rgba(0, 229, 255, 0.35)',
          borderRadius: '18px',
          padding: '8px 14px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          height: '84px',
          boxSizing: 'border-box'
        }}>

          {/* 🕹️ MÓDULO IZQUIERDO */}
          <div style={{
            background: '#e2d9cc',
            border: '1.5px solid #8c8275',
            borderRadius: '12px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 6px rgba(0,0,0,0.4)',
            height: '66px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffb703', boxShadow: '0 0 4px #ffb703' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffb703', boxShadow: '0 0 4px #ffb703' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffb703', boxShadow: '0 0 4px #ffb703' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', flexGrow: 1 }}>
              <button 
                onClick={() => setIsExpListOpen(!isExpListOpen)}
                style={{ background: '#1e293b', color: '#ffffff', borderRadius: '6px', padding: '5px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="Misiones"
              >
                <Grid size={13} />
              </button>

              <button 
                onClick={handlePrevStep}
                disabled={pasoIndex === 0}
                style={{ 
                  background: pasoIndex === 0 ? '#475569' : '#0f172a', 
                  color: '#ffffff', 
                  borderRadius: '6px', 
                  padding: '5px 0', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: pasoIndex === 0 ? 'not-allowed' : 'pointer'
                }}
                title="Anterior"
              >
                <ChevronLeft size={16} />
              </button>

              <button 
                onClick={handleNextStep}
                style={{ 
                  background: '#0f172a', 
                  color: '#00e5ff', 
                  borderRadius: '6px', 
                  padding: '5px 0', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer',
                  border: '1px solid #00e5ff'
                }}
                title="Siguiente"
              >
                <ChevronRight size={16} />
              </button>

              <button 
                onClick={handleResetStep}
                style={{ background: '#1e293b', color: '#ffffff', borderRadius: '6px', padding: '5px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="Reiniciar"
              >
                <RotateCcw size={13} />
              </button>

              <button 
                onClick={() => setIsDataModalOpen(true)}
                style={{ background: '#1e293b', color: '#ffb703', borderRadius: '6px', padding: '5px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="Bitácora"
              >
                <Edit3 size={13} />
              </button>

              <button 
                onClick={() => setIsMaterialsView(!isMaterialsView)}
                style={{ background: '#1e293b', color: '#ffffff', borderRadius: '6px', padding: '5px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="Materiales"
              >
                <Layers size={13} />
              </button>
            </div>
          </div>

          {/* 📊 MEDIDOR DE AVANCE */}
          <div style={{
            background: 'rgba(5, 16, 32, 0.95)',
            border: '1.5px solid #00e5ff',
            borderRadius: '12px',
            padding: '6px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            height: '66px',
            boxSizing: 'border-box'
          }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 900, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              AVANCE
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#00e5ff', lineHeight: 1 }}>
              {porcentajeAvance}%
            </div>

            <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
              {rockerStates.map((st, i) => (
                <div
                  key={i}
                  onClick={() => {
                    playBeep(450 + i * 100, 'sawtooth', 0.05);
                    setRockerStates(prev => {
                      const next = [...prev];
                      next[i] = !next[i];
                      return next;
                    });
                  }}
                  style={{
                    width: '14px',
                    height: '10px',
                    borderRadius: '2px',
                    background: st ? '#fb8500' : '#475569',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </div>

          {/* 🚀 MANDO MAESTRO CENTRAL (REPRODUCE/PAUSA VIDEO REAL) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px'
          }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', left: '-18px', display: 'flex', gap: '3px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 5px #ef4444' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
              </div>

              <button
                onClick={handleTogglePlay}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #00e5ff 0%, #0284c7 60%, #032d60 100%)',
                  border: '2.5px solid #38bdf8',
                  boxShadow: isPlaying ? '0 0 20px #00e5ff' : '0 0 10px rgba(0, 229, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#030812',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                title={isPlaying ? "Pausar video" : "Reproducir video"}
              >
                {isPlaying ? <Pause size={22} strokeWidth={3} /> : <Play size={22} strokeWidth={3} style={{ marginLeft: '3px' }} />}
              </button>

              <div style={{ position: 'absolute', right: '-18px', display: 'flex', gap: '3px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 5px #ef4444' }} />
              </div>
            </div>

            <div style={{ fontSize: '0.64rem', color: '#38bdf8', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: isPlaying ? '#00e5ff' : '#10b981' }} />
              <span>{isPlaying ? 'Reproduciendo video...' : (resolvedVideoUrl ? 'Video sincronizado (Local DB)' : 'Contenido preparado')}</span>
            </div>
          </div>

          {/* ⏱️ CRONÓMETRO */}
          <div style={{
            background: 'rgba(5, 16, 32, 0.95)',
            border: '1.5px solid #ffb703',
            borderRadius: '12px',
            padding: '6px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            height: '66px',
            boxSizing: 'border-box'
          }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 900, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              CRONÓMETRO
            </div>
            <button
              onClick={() => {
                setTimerRunning(!timerRunning);
                playBeep(timerRunning ? 400 : 800, 'sine', 0.08);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 900,
                color: timerRunning ? '#00e5ff' : '#fbbf24',
                fontFamily: 'monospace',
                lineHeight: 1,
                cursor: 'pointer'
              }}
            >
              {formatTimer(timerSeconds)}
            </button>

            <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
              <button
                onClick={() => { setTimerSeconds(30); setTimerRunning(true); playBeep(500, 'sine', 0.05); }}
                style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#334155', border: '1px solid #ffb703', color: '#ffb703', fontSize: '0.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="30s"
              >
                30
              </button>
              <button
                onClick={() => { setTimerSeconds(60); setTimerRunning(true); playBeep(600, 'sine', 0.05); }}
                style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#334155', border: '1px solid #ffb703', color: '#ffb703', fontSize: '0.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="1m"
              >
                1m
              </button>
              <button
                onClick={() => { setTimerSeconds(120); setTimerRunning(true); playBeep(700, 'sine', 0.05); }}
                style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#334155', border: '1px solid #ffb703', color: '#ffb703', fontSize: '0.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="2m"
              >
                2m
              </button>
            </div>
          </div>

          {/* 🎛️ MÓDULO DERECHO */}
          <div style={{
            background: '#e2d9cc',
            border: '1.5px solid #8c8275',
            borderRadius: '12px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 6px rgba(0,0,0,0.4)',
            height: '66px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', flexGrow: 1 }}>
              <button 
                onClick={() => { if (onOpenAdmin) onOpenAdmin(); }}
                style={{ background: '#1e293b', color: '#38bdf8', borderRadius: '5px', padding: '4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="Gestión"
              >
                <Power size={12} />
              </button>

              <button 
                onClick={handleStop}
                style={{ background: '#1e293b', color: '#ffffff', borderRadius: '5px', padding: '4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="Detener Video"
              >
                <Square size={11} />
              </button>

              <button 
                onClick={() => setIsUploadModalOpen(true)}
                style={{ background: '#1e293b', color: '#ffffff', borderRadius: '5px', padding: '4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="Subir Video"
              >
                <VideoIcon size={12} />
              </button>

              <button 
                onClick={() => setIsDataModalOpen(true)}
                style={{ background: '#1e293b', color: '#ffffff', borderRadius: '5px', padding: '4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="Bitácora"
              >
                <BookOpen size={12} />
              </button>

              {/* Botones de Colores */}
              <button 
                onClick={() => { setTimerSeconds(60); setTimerRunning(true); }}
                style={{ background: '#fb8500', borderRadius: '4px', height: '18px', border: 'none', cursor: 'pointer' }}
                title="1 min"
              />
              <button 
                onClick={() => setIsMaterialsView(!isMaterialsView)}
                style={{ background: '#eab308', borderRadius: '4px', height: '18px', border: 'none', cursor: 'pointer' }}
                title="Materiales"
              />
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                style={{ background: '#00e5ff', borderRadius: '4px', height: '18px', border: 'none', cursor: 'pointer' }}
                title="Subir Video"
              >
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#030812' }}>+</span>
              </button>
              <button 
                onClick={() => setIsHelpModalOpen(true)}
                style={{ background: '#ef4444', borderRadius: '4px', height: '18px', border: 'none', color: '#ffffff', fontSize: '0.65rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="Ayuda"
              >
                ?
              </button>
            </div>
          </div>

          {/* 🚨 BISEL DERECHO CON LEDs ROJOS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444' }} />
          </div>

        </footer>

        {/* NOTIFICACIÓN TOAST FLOTANTE TEMPORAL (AUTO-DISMISS) */}
        {toastMessage && (
          <div style={{
            position: 'fixed',
            top: '68px',
            right: '30px',
            background: 'rgba(5, 18, 38, 0.95)',
            border: '1.5px solid #00e5ff',
            color: '#f8fafc',
            padding: '8px 16px',
            borderRadius: '12px',
            fontSize: '0.82rem',
            fontWeight: 800,
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={15} color="#00e5ff" />
            <span>{toastMessage}</span>
          </div>
        )}

      </div>

      {/* ========================================================
          MODAL 1: SUBIR / VINCULAR VIDEO (CON DRAG & DROP Y PERSISTENCIA)
          ======================================================== */}
      {isUploadModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(2, 6, 16, 0.88)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '560px',
            background: '#07152b',
            border: '2px solid #00e5ff',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 0 45px rgba(0, 229, 255, 0.45)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <VideoIcon color="#00e5ff" size={24} />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>
                  Recurso Multimedia del Paso {pasoIndex + 1}
                </h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px', lineHeight: 1.4 }}>
              Carga una guía multimedia en video o imagen para este paso. <strong>Se guardará de forma permanente en tu navegador:</strong>
            </p>

            {/* 📥 RECUADRO DE ARRASTRAR O EXPLORAR ARCHIVO */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: isDragging ? '2.5px dashed #00e5ff' : '2px dashed rgba(0, 229, 255, 0.45)',
                borderRadius: '16px',
                padding: '24px 20px',
                textAlign: 'center',
                marginBottom: '16px',
                background: isDragging ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0, 229, 255, 0.04)',
                boxShadow: isDragging ? '0 0 25px rgba(0, 229, 255, 0.35)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {selectedVideoFile ? (
                /* Archivo Seleccionado */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.2)',
                    border: '1.5px solid #10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981'
                  }}>
                    <FileVideo size={26} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.95rem' }}>
                      {selectedVideoFile.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, marginTop: '2px' }}>
                      ✓ Archivo listo para guardar ({formatFileSize(selectedVideoFile.size)})
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    style={{
                      marginTop: '4px',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#cbd5e1',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cambiar archivo
                  </button>
                </div>
              ) : (
                /* Estado Inicial / Soltar archivo */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: isDragging ? 'rgba(0, 229, 255, 0.25)' : 'rgba(0, 229, 255, 0.1)',
                    border: '1.5px solid #00e5ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00e5ff'
                  }}>
                    <Upload size={26} />
                  </div>

                  <div>
                    <div style={{ fontWeight: 900, color: '#ffffff', fontSize: '0.95rem' }}>
                      Arrastra y suelta tu archivo de video aquí
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#38bdf8', marginTop: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <FolderOpen size={14} />
                      <span>o haz clic para <strong>Explorar archivos</strong></span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '6px',
                    marginTop: '6px',
                    fontSize: '0.68rem',
                    color: '#64748b',
                    fontWeight: 700
                  }}>
                    <span style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>MP4</span>
                    <span style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>WebM</span>
                    <span style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>MOV</span>
                    <span style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>PNG/JPG</span>
                  </div>
                </div>
              )}
            </div>

            {/* Opción 2: URL de Video / YouTube */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, marginBottom: '5px' }}>
                O pega un enlace de video (YouTube o URL directa):
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={inputVideoUrl}
                onChange={(e) => setInputVideoUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Botones de acción */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isSavingMedia}
                onClick={handleSaveMedia}
                style={{
                  padding: '10px 22px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                  color: '#030812',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: isSavingMedia ? 'wait' : 'pointer',
                  boxShadow: '0 0 16px rgba(0, 229, 255, 0.4)',
                  opacity: isSavingMedia ? 0.7 : 1
                }}
              >
                {isSavingMedia ? 'Guardando en BD...' : 'Guardar Recurso'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: BITÁCORA */}
      {isDataModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(2, 6, 16, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '620px',
            background: '#07152b',
            border: '2px solid #00e5ff',
            borderRadius: '18px',
            padding: '22px',
            boxShadow: '0 0 35px rgba(0, 229, 255, 0.4)',
            maxHeight: '88vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit3 color="#00e5ff" size={22} />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>
                  Bitácora de Investigación Científica
                </h3>
              </div>
              <button
                onClick={() => setIsDataModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              showToast('📝 Datos guardados en la bitácora');
              setIsDataModalOpen(false);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 800, marginBottom: '3px' }}>
                    Estudiante / Equipo:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Valentina y Mateo"
                    value={bitacora.estudiante}
                    onChange={(e) => setBitacora({ ...bitacora, estudiante: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 800, marginBottom: '3px' }}>
                    Institución Educativa:
                  </label>
                  <input
                    type="text"
                    value={bitacora.institucion}
                    onChange={(e) => setBitacora({ ...bitacora, institucion: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 800, marginBottom: '3px' }}>
                  Observaciones:
                </label>
                <textarea
                  rows={2}
                  placeholder="¿Qué observaste en la formación de capas y límites de fluidos?"
                  value={bitacora.observaciones}
                  onChange={(e) => setBitacora({ ...bitacora, observaciones: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 800, marginBottom: '3px' }}>
                  Mediciones / Datos Registrados:
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej. Volumen de 50 ml por reactivo, tiempo de estabilidad..."
                  value={bitacora.mediciones}
                  onChange={(e) => setBitacora({ ...bitacora, mediciones: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 800, marginBottom: '3px' }}>
                  Conclusiones Científicas:
                </label>
                <textarea
                  rows={2}
                  placeholder="¿Cómo validas el principio de densidad en la ingeniería?"
                  value={bitacora.conclusiones}
                  onChange={(e) => setBitacora({ ...bitacora, conclusiones: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#f8fafc',
                    fontWeight: 700,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  <Printer size={14} />
                  <span>Imprimir</span>
                </button>

                <button
                  type="submit"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                    color: '#030812',
                    fontWeight: 900,
                    fontSize: '0.82rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: GUÍA DIDÁCTICA */}
      {isHelpModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(2, 6, 16, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
            background: '#07152b',
            border: '2px solid #00e5ff',
            borderRadius: '18px',
            padding: '22px',
            boxShadow: '0 0 35px rgba(0, 229, 255, 0.4)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen color="#00e5ff" size={22} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: '#ffffff' }}>
                  Guía Didáctica del Paso {pasoIndex + 1}
                </h3>
              </div>
              <button
                onClick={() => setIsHelpModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid #00e5ff',
              borderRadius: '10px',
              padding: '12px',
              marginBottom: '14px'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#00e5ff', fontWeight: 900, textTransform: 'uppercase' }}>
                {pasoActual.categoria}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff', marginTop: '2px' }}>
                {pasoActual.titulo}
              </div>
            </div>

            <div style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.5, marginBottom: '16px' }}>
              {pasoActual.texto}
            </div>

            <button
              onClick={() => setIsHelpModalOpen(false)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                background: '#00e5ff',
                color: '#030812',
                fontWeight: 900,
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Volver a la Cabina
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
