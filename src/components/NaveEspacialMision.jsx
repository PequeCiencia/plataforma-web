// NaveEspacialMision.jsx - Cabina Espacial Versión 2.0 (Botones Táctiles, Gating Secuencial y Avance Continuo)
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useData, CREDENCIALES_DEFAULT } from '../context/DataContext';
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
  Minimize2,
  Maximize,
  Volume2, 
  VolumeX, 
  X, 
  Layers, 
  Upload, 
  Video as VideoIcon, 
  Printer, 
  Grid, 
  Eye, 
  EyeOff,
  FlaskConical, 
  Square, 
  BookOpen, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Zap, 
  FileVideo, 
  FolderOpen,
  Box,
  FileText
} from 'lucide-react';

export default function NaveEspacialMision({ onExit, onOpenAdmin }) {
  const { 
    experimentos, 
    activeExpId, 
    setActiveExpId, 
    updatePasoMedia,
    userRole,
    currentUser,
    login
  } = useData();

  // Experimento actual seleccionado
  const experimentoActual = experimentos.find(e => e.id === activeExpId) || experimentos[0] || {
    id: 'exp-papelitos',
    titulo: 'Papelitos de Colores: Danza Electrostática',
    subtitulo: 'Cargas electrostáticas, transferencia de electrones y polarización',
    categoria: 'Física & Electricidad',
    nivel: '10 a 18 años',
    materiales: [],
    pasos: []
  };

  const pasos = experimentoActual.pasos || [];
  const totalPasos = pasos.length || 1;

  // Estados de navegación y reproducción
  const [pasoIndex, setPasoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [resolvedVideoUrl, setResolvedVideoUrl] = useState(null);

  // Estados de interfaz y sonido
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 🔒 Gating: Control estricto de pasos completados y Modo Docente
  // El progreso siempre inicia en 0% al cargar la página o recargar (según requerimiento)
  const [pasosCompletados, setPasosCompletados] = useState({});

  // Modo Docente: permite desbloquear todos los pasos para revisión rápida del profesor
  const [modoDocenteLibre, setModoDocenteLibre] = useState(false);

  // 🤖 Pestaña activa para visor de Robótica: '3d' | 'pdf' | 'piezas'
  const [roboticaTab, setRoboticaTab] = useState('3d');
  const isRobotica = experimentoActual.tipo === 'robotica_3d' || !!experimentoActual.visor3dUrl;
  const [isVisorExpandido, setIsVisorExpandido] = useState(false);

  // ⚠️ Advertencia antes de recargar la página o salir (para no perder el progreso accidentalmente)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Si el estudiante ya empezó la misión o completó algún paso
      if (currentTime > 1 || pasoIndex > 0 || Object.keys(pasosCompletados).length > 0) {
        e.preventDefault();
        e.returnValue = '¿Seguro que deseas recargar? Tu progreso se reiniciará al 0%.';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentTime, pasoIndex, pasosCompletados]);

  // Modales
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isExpListOpen, setIsExpListOpen] = useState(false);
  const [isMaterialsView, setIsMaterialsView] = useState(false);

  // 🔐 Modal y estado de autenticación docente para control libre de pasos
  const [isDocenteUnlockModalOpen, setIsDocenteUnlockModalOpen] = useState(false);
  const [docenteUnlockUser, setDocenteUnlockUser] = useState('');
  const [docenteUnlockPass, setDocenteUnlockPass] = useState('');
  const [docenteUnlockError, setDocenteUnlockError] = useState('');
  const [showDocenteUnlockPass, setShowDocenteUnlockPass] = useState(false);

  // Notificaciones toast temporales
  const [toastMessage, setToastMessage] = useState(null);
  const [materialesChequeados, setMaterialesChequeados] = useState({});

  // Carga y Drag & Drop
  const [isDragging, setIsDragging] = useState(false);
  const [inputVideoUrl, setInputVideoUrl] = useState('');
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [isSavingMedia, setIsSavingMedia] = useState(false);

  // Referencias DOM
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

  const pasoActual = pasos[pasoIndex] || {
    id: 1,
    numero: 1,
    categoria: 'Conceptos',
    categoriaColor: '#2ce4ff',
    titulo: 'Paso de Laboratorio',
    subtitulo: 'Instrucciones del experimento',
    texto: 'Sigue la guía multimedia para realizar la práctica.',
    duracion: '00:15',
    subtitulos: 'Comprende el principio científico de este paso.'
  };

  // Cargar video de forma persistente desde IndexedDB o ruta relativa
  useEffect(() => {
    let isMounted = true;
    async function resolveCurrentVideo() {
      setIsVideoLoaded(false);
      if (pasoActual?.mediaKey) {
        try {
          const freshUrl = await getMediaUrl(pasoActual.mediaKey);
          if (isMounted) setResolvedVideoUrl(freshUrl);
        } catch (e) {
          console.error('Error al resolver video de IndexedDB:', e);
          if (isMounted) setResolvedVideoUrl(null);
        }
      } else if (pasoActual?.videoUrl) {
        if (isMounted) setResolvedVideoUrl(pasoActual.videoUrl);
      } else {
        if (isMounted) setResolvedVideoUrl(null);
      }
    }
    resolveCurrentVideo();
    return () => { isMounted = false; };
  }, [pasoActual, pasoIndex, experimentoActual.id]);

  // Duración efectiva del video o simulación (15s por defecto)
  const effectiveDuration = (resolvedVideoUrl && videoDuration > 0) ? videoDuration : 15;

  // Estado del paso actual: ¿está completado?
  const pasoActualKey = `${experimentoActual.id}-${pasoIndex}`;
  const isPasoActualCompletado = !!pasosCompletados[pasoActualKey];

  // 🔒 Validación de Desbloqueo de Paso (Gating)
  const isPasoDesbloqueado = (idx) => {
    if (idx === 0) return true; // El primer paso siempre está disponible
    if (modoDocenteLibre) return true; // En modo docente todo está desbloqueado
    const pasoAnteriorKey = `${experimentoActual.id}-${idx - 1}`;
    return !!pasosCompletados[pasoAnteriorKey];
  };

  // ¿Puede el usuario avanzar al paso siguiente?
  const canGoNext = modoDocenteLibre || isPasoActualCompletado;

  // ⚡ CÁLCULO DE PROGRESO FLUIDO CONTINUO (0% a 100%)
  const { porcentajeFluido, fraccionPaso } = useMemo(() => {
    if (totalPasos === 0) return { porcentajeFluido: 0, fraccionPaso: 0 };
    
    // Fracción del paso actual (0.0 a 1.0)
    let frac = 0;
    if (isPasoActualCompletado) {
      frac = 1.0;
    } else if (effectiveDuration > 0 && currentTime > 0) {
      frac = Math.min(0.99, currentTime / effectiveDuration);
    }

    // Progreso continuo proporcional acumulado
    const globalFrac = Math.min(1.0, (pasoIndex + frac) / totalPasos);
    return {
      porcentajeFluido: Math.round(globalFrac * 100),
      fraccionPaso: Math.round(frac * 100)
    };
  }, [pasoIndex, currentTime, effectiveDuration, isPasoActualCompletado, totalPasos]);

  // Toast temporal
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Efectos de sonido con Web Audio API
  const playBeep = (freq = 600, type = 'sine', duration = 0.08) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.09, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio no disponible', e);
    }
  };

  // 🎓 Control Seguro de Modo Docente (Bloqueo / Desbloqueo de pasos)
  const handleToggleDocenteMode = () => {
    if (modoDocenteLibre) {
      // Si está activo, bloquear inmediatamente y regresar a modo estudiante
      setModoDocenteLibre(false);
      playBeep(400, 'sine', 0.08);
      showToast('🔒 Modo Estudiante: Secuencia Bloqueada');
    } else {
      // Para desbloquear, SIEMPRE se solicitan credenciales oficiales de Docente / Administrador
      setDocenteUnlockUser(currentUser?.email || CREDENCIALES_DEFAULT.DOCENTE.usuario);
      setDocenteUnlockPass('');
      setDocenteUnlockError('');
      setShowDocenteUnlockPass(false);
      setIsDocenteUnlockModalOpen(true);
    }
  };

  const handleDocenteUnlockSubmit = (e) => {
    if (e) e.preventDefault();
    setDocenteUnlockError('');
    const res = login(docenteUnlockUser, docenteUnlockPass);
    if (res.success && (res.user.role === 'docente' || res.user.role === 'admin')) {
      setModoDocenteLibre(true);
      setIsDocenteUnlockModalOpen(false);
      playBeep(750, 'sine', 0.08);
      showToast(`🔓 Modo Docente Activado (${res.user.nombre})`);
    } else {
      playBeep(250, 'sawtooth', 0.15);
      setDocenteUnlockError(res.error || 'Credenciales incorrectas. Solo docentes o administradores autorizados pueden desbloquear el control de pasos.');
    }
  };

  // Simulación de reproducción si no hay video real cargado
  useEffect(() => {
    let interval = null;
    if (!resolvedVideoUrl && isPlaying && currentTime < effectiveDuration) {
      interval = setInterval(() => setCurrentTime(s => s + 1), 1000);
    } else if (!resolvedVideoUrl && currentTime >= effectiveDuration && isPlaying) {
      setIsPlaying(false);
      handleCompletarPasoActual();
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, effectiveDuration, resolvedVideoUrl]);

  // Completar el paso actual
  const handleCompletarPasoActual = () => {
    setPasosCompletados(prev => ({
      ...prev,
      [pasoActualKey]: true
    }));
    playBeep(880, 'triangle', 0.25);
    
    if (pasoIndex === totalPasos - 1) {
      confetti({ particleCount: 140, spread: 85, origin: { y: 0.6 } });
      showToast('🎉 ¡Felicidades! Has culminado todos los pasos de la misión');
    } else {
      showToast(`✅ ¡Paso ${pasoIndex + 1} completado! Siguiente paso desbloqueado`);
    }
  };

  // Selección de paso con validación de bloqueo
  const seleccionarPaso = (idx) => {
    if (!isPasoDesbloqueado(idx)) {
      playBeep(260, 'sawtooth', 0.14);
      showToast(`🔒 Completa el Paso ${idx} para desbloquear esta fase`);
      return;
    }

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

  // Avanzar al siguiente paso con validación
  const handleNextStep = () => {
    if (!canGoNext) {
      playBeep(260, 'sawtooth', 0.14);
      showToast(`🔒 Debes ver el video completo del Paso ${pasoIndex + 1} para continuar`);
      return;
    }

    if (pasoIndex < totalPasos - 1) {
      seleccionarPaso(pasoIndex + 1);
    } else {
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } });
      showToast('🌟 ¡Misión científica concluida con éxito total!');
    }
  };

  // Retroceder al paso anterior
  const handlePrevStep = () => {
    if (pasoIndex > 0) {
      seleccionarPaso(pasoIndex - 1);
    }
  };

  // Controles del reproductor de video
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

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    playBeep(350, 'sawtooth', 0.1);
  };

  const handleResetStep = () => {
    handleStop();
    showToast('Paso reiniciado a 00:00');
  };

  // 🔇 Control de MUTE: Silencia tanto el video HTML5 como los efectos de sonido
  const handleToggleMute = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = !next;
      }
      if (next) {
        playBeep(700, 'sine', 0.08);
        showToast('🔊 Audio Activado');
      } else {
        showToast('🔇 Audio Silenciado (MUTE)');
      }
      return next;
    });
  };

  // Sincronizar propiedad muted directamente con el video HTML5 al cambiar estado o video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !soundEnabled;
    }
  }, [soundEnabled, resolvedVideoUrl]);

  // Eventos de video HTML5
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      setCurrentTime(cur);
      // Si llega al final (o a 0.4s del final), marcar como completado
      if (videoDuration > 0 && cur >= videoDuration - 0.4 && !isPasoActualCompletado) {
        handleCompletarPasoActual();
      }
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
    handleCompletarPasoActual();
  };

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
        await saveMediaFile(mediaKey, selectedVideoFile, selectedVideoFile.name);
        const freshUrl = await getMediaUrl(mediaKey);

        updatePasoMedia(experimentoActual.id, pasoId, {
          mediaKey: mediaKey,
          videoType: 'file',
          videoFileName: selectedVideoFile.name,
          videoUrl: ''
        });

        setResolvedVideoUrl(freshUrl);
        playBeep(800, 'sine', 0.15);
        showToast('✅ Video guardado permanentemente en el equipo');
      } else if (inputVideoUrl) {
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

  const formatVideoTime = (sec) => {
    if (isNaN(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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
      {/* 🌌 FONDO ESPACIAL INMERSIVO CON ESTRELLAS Y NEBULOSAS */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(0, 229, 255, 0.16) 0%, transparent 40%),
          radial-gradient(circle at 90% 25%, rgba(255, 153, 0, 0.14) 0%, transparent 45%),
          radial-gradient(circle at 50% 85%, rgba(147, 51, 234, 0.14) 0%, transparent 50%),
          radial-gradient(2px 2px at 30px 40px, #ffffff, rgba(0,0,0,0)),
          radial-gradient(2px 2px at 60px 90px, #00e5ff, rgba(0,0,0,0)),
          radial-gradient(1px 1px at 120px 50px, #ffc936, rgba(0,0,0,0)),
          radial-gradient(2px 2px at 190px 140px, #ffffff, rgba(0,0,0,0))
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 250px 250px, 320px 320px, 180px 180px, 400px 400px',
        backgroundColor: '#020610',
        zIndex: 0
      }} />

      {/* ========================================================
          1. BARRA SUPERIOR INSTITUCIONAL (HUD TOP)
          ======================================================== */}
      {(!isRobotica || !isVisorExpandido) && (
        <header style={{
          flexShrink: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isRobotica ? '4px 14px' : '6px 18px',
          background: 'rgba(7, 18, 36, 0.92)',
          border: '1.5px solid rgba(0, 229, 255, 0.35)',
          borderRadius: '14px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(0, 229, 255, 0.08)',
          margin: isRobotica ? '4px 10px 0 10px' : '8px 14px 0 14px',
          gap: '12px',
          height: isRobotica ? '44px' : '50px'
        }}>
          {/* LOGO UPS */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.96)',
            padding: '2px 10px',
            borderRadius: '10px',
            border: '2px solid #00509d',
            boxShadow: '0 0 12px rgba(0, 80, 157, 0.4)',
            height: '36px'
          }}>
            <img 
              src="./assets/images/logo_ups.png" 
              alt="Universidad Politécnica Salesiana" 
              style={{ maxHeight: '28px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          {/* MISIÓN / TÍTULO DEL EXPERIMENTO (SELECTOR RÁPIDO) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setIsExpListOpen(!isExpListOpen)}
              className="tactile-btn"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(2, 132, 199, 0.3) 100%)',
                border: '1.5px solid #00e5ff',
                borderRadius: '12px',
                padding: '5px 14px',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
              title="Haz clic para explorar otros experimentos"
            >
              <FlaskConical size={15} color="#00e5ff" />
              <span style={{ textTransform: 'uppercase' }}>Misión:</span>
              <span style={{ 
                background: '#00e5ff', 
                color: '#030812', 
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontWeight: 900,
                fontSize: '0.78rem'
              }}>
                {experimentoActual.titulo}
              </span>
              <Grid size={13} color="#94a3b8" />
            </button>
          </div>

          {/* LOGO PEQUEÑOS CIENTÍFICOS & SALIR */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.96)',
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
              onClick={onExit}
              className="tactile-btn"
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                color: '#f87171',
                borderRadius: '10px',
                padding: '6px 12px',
                fontSize: '0.76rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer'
              }}
              title="Volver al Portal"
            >
              <X size={14} />
              <span>Salir</span>
            </button>
          </div>
        </header>
      )}

      {/* SELECTOR DESPLEGABLE DE EXPERIMENTOS */}
      {isExpListOpen && (
        <div style={{
          position: 'absolute',
          top: '64px',
          left: '20px',
          right: '20px',
          background: 'rgba(6, 18, 36, 0.98)',
          border: '2px solid #00e5ff',
          borderRadius: '18px',
          padding: '16px',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.95)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
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
                className="tactile-btn"
                style={{
                  background: isSelected ? 'rgba(0, 229, 255, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected ? '2px solid #00e5ff' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '12px',
                  textAlign: 'left',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: '#00e5ff', fontWeight: 800, textTransform: 'uppercase' }}>
                  {exp.categoria || 'Ingeniería'} · {exp.nivel || '10-18 años'}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 900, margin: '3px 0' }}>
                  {exp.titulo}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.3 }}>
                  {exp.subtitulo || exp.descripcion?.slice(0, 65)}...
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================
          2. ÁREA CENTRAL: PASOS (IZQ) + HOLOSCREEN FLANQUEADO POR FLECHAS
          ======================================================== */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: isRobotica ? '1fr' : 'minmax(280px, 330px) 1fr',
        gap: isRobotica ? '0px' : '14px',
        padding: isRobotica ? (isVisorExpandido ? '0px' : '4px 10px 4px 10px') : '10px 14px',
        alignItems: 'stretch',
        position: 'relative',
        zIndex: 5
      }}>

        {/* 📋 PANEL IZQUIERDO: LISTA DE PASOS CON BATERÍA DE ENERGÍA Y GATING (SOLO EN CIENCIAS / VIDEO) */}
        {!isRobotica && (
          <aside style={{
            height: '100%',
            background: 'linear-gradient(180deg, rgba(8, 22, 42, 0.94) 0%, rgba(4, 12, 24, 0.98) 100%)',
            border: '2px solid rgba(0, 229, 255, 0.35)',
            borderRadius: '18px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(0, 229, 255, 0.05)',
            backdropFilter: 'blur(14px)',
            minHeight: 0,
            overflow: 'hidden'
          }}>

            {/* ⚡ BATERÍA DE PLASMA / AVANCE CONTINUO ESTILO VIDEOJUEGO */}
            <div style={{
              flexShrink: 0,
              background: 'rgba(3, 12, 24, 0.85)',
              border: '1.5px solid #00e5ff',
              borderRadius: '12px',
              padding: '10px 12px',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={15} color="#00e5ff" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '0.05em' }}>
                    ENERGÍA DE MISIÓN
                  </span>
                </div>
                <span style={{ 
                  fontSize: '1rem', 
                  fontWeight: 900, 
                  color: porcentajeFluido === 100 ? '#10b981' : '#00e5ff',
                  fontFamily: 'monospace'
                }}>
                  {porcentajeFluido}%
                </span>
              </div>

              {/* Barra de plasma segmentada con avance continuo en tiempo real */}
              <div style={{
                height: '9px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                position: 'relative'
              }}>
                <div style={{
                  height: '100%',
                  width: `${porcentajeFluido}%`,
                  background: porcentajeFluido === 100 
                    ? 'linear-gradient(90deg, #00e5ff 0%, #10b981 100%)' 
                    : 'linear-gradient(90deg, #00e5ff 0%, #38bdf8 70%, #fbbf24 100%)',
                  boxShadow: '0 0 10px #00e5ff',
                  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.68rem', color: '#94a3b8' }}>
                <span>Paso {pasoIndex + 1} de {totalPasos}</span>
                <span>{modoDocenteLibre ? '🔓 Desbloqueo Docente' : '🔒 Secuencia Guiada'}</span>
              </div>
            </div>

            {/* LISTA DE PASOS CON CANDADO SUTIL / GATING */}
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
                const isDone = !!pasosCompletados[`${experimentoActual.id}-${idx}`];
                const isUnlocked = isPasoDesbloqueado(idx);
                const categoriaColor = paso.categoriaColor || '#2ce4ff';

                return (
                  <button
                    key={paso.id || idx}
                    onClick={() => seleccionarPaso(idx)}
                    className="tactile-btn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '12px',
                      background: isCurrent 
                        ? 'linear-gradient(90deg, rgba(0, 229, 255, 0.26) 0%, rgba(8, 30, 60, 0.9) 100%)' 
                        : isDone 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : isUnlocked 
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(15, 23, 42, 0.4)',
                      border: isCurrent 
                        ? '1.5px solid #00e5ff' 
                        : isDone 
                        ? '1px solid rgba(16, 185, 129, 0.5)' 
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: isCurrent ? '0 0 14px rgba(0, 229, 255, 0.3)' : 'none',
                      opacity: isUnlocked ? 1 : 0.48,
                      cursor: isUnlocked ? 'pointer' : 'not-allowed',
                      textAlign: 'left',
                      flexShrink: 0
                    }}
                    title={isUnlocked ? `Ir a ${paso.titulo}` : `Paso bloqueado. Completa el Paso ${idx} primero.`}
                  >
                    {/* CÍRCULO CON NÚMERO, CHECK O CANDADO */}
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isCurrent 
                        ? categoriaColor 
                        : isDone 
                        ? '#10b981' 
                        : isUnlocked 
                        ? 'rgba(255, 255, 255, 0.08)' 
                        : 'rgba(100, 116, 139, 0.2)',
                      color: isCurrent || isDone ? '#030812' : '#ffffff',
                      border: `1.5px solid ${isDone ? '#10b981' : isUnlocked ? categoriaColor : '#475569'}`,
                      boxShadow: isCurrent ? `0 0 10px ${categoriaColor}` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '0.8rem',
                      flexShrink: 0
                    }}>
                      {isDone ? (
                        <Check size={14} strokeWidth={3} />
                      ) : !isUnlocked ? (
                        <Lock size={12} color="#94a3b8" />
                      ) : (
                        paso.numero || idx + 1
                      )}
                    </div>

                    {/* TEXTO DEL PASO */}
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.64rem',
                        fontWeight: 900,
                        color: isDone ? '#10b981' : categoriaColor,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span>{paso.categoria || 'PASO'}</span>
                        {isDone && <span style={{ fontSize: '0.6rem', color: '#10b981' }}>✓ LISTO</span>}
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
          </aside>
        )}

        {/* 📺 ÁREA CENTRAL: HOLOSCREEN FLANQUEADO POR GRANDES FLECHAS LATERALES */}
        <div style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: isRobotica ? '0px' : '10px',
          minHeight: 0,
          position: 'relative'
        }}>

          {/* ◀️ GRAN BOTÓN LATERAL IZQUIERDO (PASO ANTERIOR - SOLO EN CIENCIAS) */}
          {!isRobotica && (
            <button
              onClick={handlePrevStep}
              disabled={pasoIndex === 0}
              className="floating-nav-btn"
              style={{
                flexShrink: 0,
                width: '46px',
                height: '100px',
                borderRadius: '14px',
                background: pasoIndex === 0 
                  ? 'rgba(15, 23, 42, 0.4)' 
                  : 'linear-gradient(180deg, rgba(8, 25, 48, 0.9) 0%, rgba(3, 12, 24, 0.95) 100%)',
                border: pasoIndex === 0 ? '1px solid rgba(255, 255, 255, 0.08)' : '2px solid #00e5ff',
                boxShadow: pasoIndex === 0 ? 'none' : '0 0 16px rgba(0, 229, 255, 0.35)',
                color: pasoIndex === 0 ? '#475569' : '#00e5ff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: pasoIndex === 0 ? 'not-allowed' : 'pointer',
                gap: '4px'
              }}
              title={pasoIndex === 0 ? 'Primer paso de la misión' : 'Regresar al paso anterior'}
            >
              <ChevronLeft size={28} strokeWidth={3} />
              <span style={{ fontSize: '0.62rem', fontWeight: 900, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                ATRÁS
              </span>
            </button>
          )}

          {/* PANTALLA PRINCIPAL HOLOSCREEN */}
          <main style={{
            flex: 1,
            height: '100%',
            background: 'linear-gradient(180deg, #06152b 0%, #030c1a 100%)',
            border: isVisorExpandido ? 'none' : '2.5px solid #00e5ff',
            borderRadius: isVisorExpandido ? '0px' : '20px',
            boxShadow: isVisorExpandido ? 'none' : '0 0 30px rgba(0, 229, 255, 0.35), inset 0 0 25px rgba(0, 229, 255, 0.08)',
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

            {/* Header del Holoscreen */}
            <div style={{
              flexShrink: 0,
              position: 'relative',
              zIndex: 5,
              padding: '10px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
              background: 'rgba(4, 16, 32, 0.75)'
            }}>
              <div>
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  color: '#00e5ff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  {isRobotica ? 'TALLER DE ROBÓTICA · VEX IQ 2.0' : `${experimentoActual.titulo} · ${pasoActual.categoria}`}
                </div>
                <h2 style={{
                  fontSize: isRobotica ? '1.15rem' : '1.25rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  margin: 0
                }}>
                  {isRobotica ? experimentoActual.titulo : pasoActual.titulo}
                </h2>
              </div>

              {/* Botonera superior: Selector de pestañas 3D / PDF en Robótica, o paso/guía en Ciencias */}
              {isRobotica ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => {
                      setRoboticaTab('3d');
                      playBeep(700, 'sine', 0.05);
                    }}
                    className="tactile-btn"
                    style={{
                      padding: '5px 14px',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      background: roboticaTab === '3d' ? 'rgba(0, 229, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                      border: `1.5px solid ${roboticaTab === '3d' ? '#00e5ff' : 'rgba(255, 255, 255, 0.15)'}`,
                      color: roboticaTab === '3d' ? '#00e5ff' : '#cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: roboticaTab === '3d' ? '0 0 12px rgba(0, 229, 255, 0.3)' : 'none'
                    }}
                  >
                    <span>🪐 Visor 3D Interactivo</span>
                  </button>

                  <button
                    onClick={() => {
                      setRoboticaTab('pdf');
                      playBeep(700, 'sine', 0.05);
                    }}
                    className="tactile-btn"
                    style={{
                      padding: '5px 14px',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      background: roboticaTab === 'pdf' ? 'rgba(255, 0, 127, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                      border: `1.5px solid ${roboticaTab === 'pdf' ? '#ff007f' : 'rgba(255, 255, 255, 0.15)'}`,
                      color: roboticaTab === 'pdf' ? '#ff007f' : '#cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: roboticaTab === 'pdf' ? '0 0 12px rgba(255, 0, 127, 0.3)' : 'none'
                    }}
                  >
                    <span>📄 Manual PDF Oficial</span>
                  </button>

                  {/* 🔭 BOTÓN MODO EXPANDIDO / RESTAURAR: MAXIMIZA LA ALTURA PARA QUE NINGUNA PIEZA SE RECORTE */}
                  <button
                    onClick={() => {
                      setIsVisorExpandido(!isVisorExpandido);
                      playBeep(isVisorExpandido ? 500 : 800, 'sine', 0.06);
                      showToast(isVisorExpandido ? '🎛️ Cabina Espacial Restaurada' : '🔭 Visor Expandido: 100% Espacio para Piezas 3D');
                    }}
                    className="tactile-btn"
                    style={{
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      background: isVisorExpandido ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.6) 100%)' : 'rgba(0, 229, 255, 0.15)',
                      border: `1.5px solid ${isVisorExpandido ? '#34d399' : '#00e5ff'}`,
                      color: isVisorExpandido ? '#ffffff' : '#00e5ff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: isVisorExpandido ? '0 0 14px rgba(16, 185, 129, 0.4)' : 'none'
                    }}
                    title={isVisorExpandido ? "Restaurar cabina espacial completa" : "Modo Expandido: maximiza la altura para ver todas las piezas y neumáticos sin recortes"}
                  >
                    {isVisorExpandido ? <Minimize2 size={13} /> : <Maximize size={13} />}
                    <span>{isVisorExpandido ? 'Restaurar' : 'Modo Expandido'}</span>
                  </button>

                  <a
                    href={roboticaTab === 'pdf' ? (experimentoActual.pdfManualUrl || 'https://content.vexrobotics.com/stem-labs/iq/builds/basebot/iq-2nd-gen-basebot-rev12.pdf') : (experimentoActual.visor3dUrl || 'https://instructions.online/?id=4093-VEX_IQ_Basebot_2.0')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tactile-btn"
                    style={{
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#f8fafc',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Abrir en pestaña completa externa"
                  >
                    <Maximize2 size={13} />
                    <span>Pestaña Completa</span>
                  </a>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    background: isPasoActualCompletado ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 229, 255, 0.15)',
                    border: `1.5px solid ${isPasoActualCompletado ? '#10b981' : '#00e5ff'}`,
                    color: isPasoActualCompletado ? '#10b981' : '#00e5ff',
                    padding: '3px 10px',
                    borderRadius: '16px',
                    fontSize: '0.78rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {isPasoActualCompletado ? <Check size={12} strokeWidth={3} /> : null}
                    <span>PASO {pasoIndex + 1}/{totalPasos}</span>
                  </span>

                  <button
                    onClick={() => setIsHelpModalOpen(true)}
                    className="tactile-btn"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Eye size={12} />
                    <span>GUÍA</span>
                  </button>
                </div>
              )}
            </div>

            {/* CENTRO: DISPLAY MULTIMEDIA 100% */}
            <div style={{
              flex: 1,
              minHeight: 0,
              position: 'relative',
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMaterialsView || (!resolvedVideoUrl && !isRobotica) ? '16px' : '0px',
              textAlign: 'center',
              overflow: 'hidden',
              background: resolvedVideoUrl || isRobotica ? '#000000' : 'transparent'
            }}>
              {/* VISTA DE MATERIALES */}
              {isMaterialsView ? (
                <div style={{
                  width: '100%',
                  maxWidth: '640px',
                  background: 'rgba(7, 20, 38, 0.94)',
                  border: '1.5px solid #ffc936',
                  borderRadius: '16px',
                  padding: '18px',
                  boxShadow: '0 0 25px rgba(255, 201, 54, 0.25)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FlaskConical color="#ffc936" size={22} />
                      <h3 style={{ margin: 0, color: '#ffc936', fontSize: '1.15rem', fontWeight: 900 }}>
                        Materiales y Reactivos del Experimento
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsMaterialsView(false)}
                      style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer' }}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '8px',
                    textAlign: 'left',
                    maxHeight: '230px',
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
                /* REPRODUCTOR DE VIDEO A PANTALLA COMPLETA */
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
                        muted={!soundEnabled}
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
                            background: 'rgba(0, 0, 0, 0.3)',
                            cursor: 'pointer'
                          }}
                        >
                          <div 
                            className="floating-nav-btn"
                            style={{
                              width: '70px',
                              height: '70px',
                              borderRadius: '50%',
                              background: 'rgba(0, 229, 255, 0.92)',
                              color: '#030812',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 0 30px #00e5ff'
                            }}
                          >
                            <Play size={34} strokeWidth={3} style={{ marginLeft: '4px' }} />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : isRobotica ? (
                /* AMBOS IFRAMES MONTADOS SIMULTÁNEAMENTE (PRESERVA PROGRESO Y ROTACIÓN 3D) */
                <div style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#040914'
                }}>
                  {experimentoActual.visor3dUrl ? (
                    <iframe
                      src={experimentoActual.visor3dUrl}
                      title="Visor Robótica 3D"
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: '#ffffff',
                        display: roboticaTab === '3d' ? 'block' : 'none'
                      }}
                      allow="fullscreen; accelerometer; gyroscope"
                      allowFullScreen
                    />
                  ) : roboticaTab === '3d' ? (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, rgba(2, 6, 23, 0.95) 80%)',
                      color: '#94a3b8',
                      padding: '30px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: '20px',
                        background: 'rgba(16, 185, 129, 0.12)',
                        border: '1.5px solid rgba(16, 185, 129, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        boxShadow: '0 0 25px rgba(16, 185, 129, 0.2)'
                      }}>
                        <Box size={36} color="#10b981" />
                      </div>
                      <h4 style={{ color: '#f8fafc', fontSize: '1.25rem', fontWeight: 900, marginBottom: '8px' }}>
                        Sin Visor 3D Configurado
                      </h4>
                      <p style={{ maxWidth: '440px', fontSize: '0.88rem', lineHeight: 1.5, margin: 0, color: '#94a3b8' }}>
                        Este experimento de Robótica no tiene asignado un enlace de visor 3D interactivo. El docente puede configurarlo desde el panel de <strong>Gestión Docente</strong> pegando la URL de VEX o CAD 3D.
                      </p>
                    </div>
                  ) : null}

                  {experimentoActual.pdfManualUrl ? (
                    <iframe
                      src={experimentoActual.pdfManualUrl}
                      title="Manual Técnico PDF"
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: '#333333',
                        display: roboticaTab === 'pdf' ? 'block' : 'none'
                      }}
                    />
                  ) : roboticaTab === 'pdf' ? (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'radial-gradient(circle at center, rgba(255, 0, 127, 0.08) 0%, rgba(2, 6, 23, 0.95) 80%)',
                      color: '#94a3b8',
                      padding: '30px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: '20px',
                        background: 'rgba(255, 0, 127, 0.12)',
                        border: '1.5px solid rgba(255, 0, 127, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        boxShadow: '0 0 25px rgba(255, 0, 127, 0.2)'
                      }}>
                        <FileText size={36} color="#ff007f" />
                      </div>
                      <h4 style={{ color: '#f8fafc', fontSize: '1.25rem', fontWeight: 900, marginBottom: '8px' }}>
                        Sin Manual PDF Configurado
                      </h4>
                      <p style={{ maxWidth: '440px', fontSize: '0.88rem', lineHeight: 1.5, margin: 0, color: '#94a3b8' }}>
                        No se ha vinculado un manual PDF para esta misión. Puedes adjuntar la URL del PDF técnico oficial desde <strong>Gestión Docente</strong>.
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : (
                /* DIANA SCI-FI SI NO HAY VIDEO */
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    position: 'relative',
                    width: '130px',
                    height: '130px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      position: 'absolute',
                      width: '130px',
                      height: '65px',
                      borderRadius: '50%',
                      border: '1.5px dashed rgba(0, 229, 255, 0.4)',
                      transform: 'rotate(-25deg)',
                      animation: 'radarSpin 16s linear infinite'
                    }} />
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
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', marginBottom: '4px' }}>
                      {pasoActual.titulo}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '480px', margin: '0 auto 10px auto', lineHeight: 1.35 }}>
                      {pasoActual.subtitulo || pasoActual.texto}
                    </p>
                  </div>

                  {modoDocenteLibre && (
                    <button
                      onClick={() => setIsUploadModalOpen(true)}
                      className="tactile-btn"
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
                        cursor: 'pointer'
                      }}
                    >
                      <Upload size={14} />
                      <span>Modo Docente: Configurar video de este paso</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* BARRA DE SCRUBBER / TIEMPO (SOLO EXPERIMENTOS DE CIENCIAS / VIDEO) */}
            {!isRobotica && (
              <div style={{
                flexShrink: 0,
                position: 'relative',
                zIndex: 5,
                padding: '8px 18px',
                background: 'rgba(3, 10, 22, 0.95)',
                borderTop: '1px solid rgba(0, 229, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                {/* SCRUBBER SINCRONIZADO */}
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
                    background: isPasoActualCompletado ? '#10b981' : '#00e5ff',
                    borderRadius: '6px',
                    boxShadow: isPasoActualCompletado ? '0 0 8px #10b981' : '0 0 8px #00e5ff'
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

                {/* TIMESTAMP EN VIVO */}
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 700 }}>
                  {formatVideoTime(currentTime)} / {formatVideoTime(effectiveDuration)}
                </span>
              </div>
            )}
          </main>

          {/* ▶️ GRAN BOTÓN LATERAL DERECHO (PASO SIGUIENTE CON GATING - SOLO EN CIENCIAS) */}
          {!isRobotica && (
            <button
              onClick={handleNextStep}
              className="floating-nav-btn"
              style={{
                flexShrink: 0,
                width: '46px',
                height: '100px',
                borderRadius: '14px',
                background: !canGoNext
                  ? 'rgba(15, 23, 42, 0.4)'
                  : isPasoActualCompletado 
                  ? 'linear-gradient(180deg, #10b981 0%, #065f46 100%)' 
                  : 'linear-gradient(180deg, rgba(8, 25, 48, 0.9) 0%, rgba(3, 12, 24, 0.95) 100%)',
                border: !canGoNext 
                  ? '1px solid rgba(255, 255, 255, 0.1)' 
                  : isPasoActualCompletado 
                  ? '2px solid #34d399' 
                  : '2px solid #00e5ff',
                boxShadow: !canGoNext 
                  ? 'none' 
                  : isPasoActualCompletado 
                  ? '0 0 20px #10b981' 
                  : '0 0 16px rgba(0, 229, 255, 0.35)',
                color: !canGoNext ? '#64748b' : '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: !canGoNext ? 'not-allowed' : 'pointer',
                gap: '4px',
                animation: canGoNext && isPasoActualCompletado ? 'neonPulseGreen 2s infinite' : 'none'
              }}
              title={
                !canGoNext 
                  ? '🔒 Debes terminar de ver el video para avanzar' 
                  : pasoIndex === totalPasos - 1 
                  ? 'Finalizar misión científica' 
                  : 'Avanzar al siguiente paso'
              }
            >
              {!canGoNext ? (
                <Lock size={20} color="#64748b" />
              ) : (
                <ChevronRight size={28} strokeWidth={3} />
              )}
              <span style={{ 
                fontSize: '0.62rem', 
                fontWeight: 900, 
                writingMode: 'vertical-rl',
                color: !canGoNext ? '#64748b' : '#ffffff'
              }}>
                {!canGoNext ? 'BLOQ' : 'SIGUIENTE'}
              </span>
            </button>
          )}
        </div>

      </div>

      {/* ========================================================
          3. CONSOLA INFERIOR DE MANDO REDISEÑADA (TÁCTIL, LIMPIA Y SIN REDUNDANCIA)
          ======================================================== */}
      {(!isRobotica || !isVisorExpandido) && (
        <footer style={{
          flexShrink: 0,
          zIndex: 10,
          display: isRobotica ? 'flex' : 'grid',
          gridTemplateColumns: isRobotica ? undefined : 'auto 1fr auto auto',
          justifyContent: isRobotica ? 'space-between' : undefined,
          gap: '16px',
          alignItems: 'center',
          background: 'linear-gradient(180deg, #0a1c32 0%, #040e1b 100%)',
          border: '2px solid rgba(0, 229, 255, 0.35)',
          borderRadius: '16px',
          padding: isRobotica ? '4px 16px' : '8px 18px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          margin: isRobotica ? '0 10px 4px 10px' : '0 14px 10px 14px',
          height: isRobotica ? '42px' : '84px',
          boxSizing: 'border-box'
        }}>

          {isRobotica ? (
          /* MODO ROBÓTICA: BARRA ULTRA LIMPIA, ESPACIO MAXIMIZADO */
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 10px #10b981'
              }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#00e5ff', letterSpacing: '0.05em' }}>
                🤖 MÓDULO ROBÓTICA · VEX IQ BASEBOT
              </span>
              <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                • Control paso a paso y lista de piezas 3D integrados directamente en el visor oficial
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setIsDataModalOpen(true)}
                className="tactile-btn"
                style={{
                  background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                  border: '1.5px solid #38bdf8',
                  borderRadius: '10px',
                  padding: '6px 14px',
                  color: '#f8fafc',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Edit3 size={14} color="#38bdf8" />
                <span>Bitácora Robótica</span>
              </button>

              <button
                onClick={toggleFullscreen}
                className="tactile-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#1e293b',
                  border: '1px solid #475569',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Pantalla Completa"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </>
        ) : (
          /* MODO CIENCIAS: CONSOLA DE REPRODUCCIÓN, MATERIALES Y CONTROL DOCENTE */
          <>
            {/* 🎮 MÓDULO 1: CONTROLES DE REPRODUCCIÓN (ALTAMENTE VISUALES, COLORIDOS Y TÁCTILES) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'linear-gradient(135deg, rgba(6, 22, 46, 0.95) 0%, rgba(2, 10, 22, 0.98) 100%)',
              border: '1.5px solid rgba(0, 229, 255, 0.4)',
              borderRadius: '14px',
              padding: '6px 14px',
              height: '66px',
              boxShadow: '0 0 16px rgba(0, 229, 255, 0.15)'
            }}>
              {/* BOTÓN MAESTRO PLAY / PAUSA: NEÓN VERDE ESMERALDA VIBRANTE */}
              <button
                onClick={handleTogglePlay}
                className="tactile-btn"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: isPlaying 
                    ? 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)' 
                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: isPlaying ? '2.5px solid #ffffff' : '2.5px solid #6ee7b7',
                  boxShadow: isPlaying 
                    ? '0 0 24px #00e5ff, inset 0 0 8px #ffffff' 
                    : '0 0 24px #10b981, inset 0 0 8px #a7f3d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#030812',
                  cursor: 'pointer',
                  flexShrink: 0,
                  animation: !isPlaying ? 'neonPulseGreen 2.5s infinite' : 'none'
                }}
                title={isPlaying ? "Pausar video" : "¡Reproducir video!"}
              >
                {isPlaying ? (
                  <Pause size={24} strokeWidth={3} />
                ) : (
                  <Play size={24} strokeWidth={3} style={{ marginLeft: '3px' }} />
                )}
              </button>

              {/* BOTONERÍA AUXILIAR: CADA UNO CON SU COLOR DISTINTIVO Y LLAMATIVO */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* 🟡 REINICIAR (ÁMBAR DORADO) */}
                <button
                  onClick={handleResetStep}
                  className="tactile-btn"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(180, 83, 9, 0.4) 100%)',
                    border: '1.5px solid #f59e0b',
                    color: '#fbbf24',
                    boxShadow: '0 0 12px rgba(245, 158, 11, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Reiniciar paso al inicio (00:00)"
                >
                  <RotateCcw size={18} strokeWidth={2.5} />
                </button>

                {/* 🔴 DETENER (ROJO RUBÍ VIBRANTE) */}
                <button
                  onClick={handleStop}
                  className="tactile-btn"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(185, 28, 28, 0.4) 100%)',
                    border: '1.5px solid #ef4444',
                    color: '#f87171',
                    boxShadow: '0 0 12px rgba(239, 68, 68, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Detener video"
                >
                  <Square size={16} strokeWidth={2.5} fill="#f87171" />
                </button>

                {/* 🟣 AUDIO & MUTE CONTROL */}
                <button
                  onClick={handleToggleMute}
                  className="tactile-btn"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: !soundEnabled
                      ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(185, 28, 28, 0.5) 100%)'
                      : 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(126, 34, 206, 0.4) 100%)',
                    border: `1.5px solid ${!soundEnabled ? '#ef4444' : '#c084fc'}`,
                    color: !soundEnabled ? '#f87171' : '#e9d5ff',
                    boxShadow: !soundEnabled ? '0 0 12px rgba(239, 68, 68, 0.45)' : '0 0 12px rgba(168, 85, 247, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  title={soundEnabled ? "Silenciar video y efectos (MUTE)" : "Activar sonido del video"}
                >
                  {!soundEnabled ? <VolumeX size={18} strokeWidth={2.5} /> : <Volume2 size={18} strokeWidth={2.5} />}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ 
                  fontSize: '0.72rem', 
                  fontWeight: 900, 
                  color: isPlaying ? '#00e5ff' : '#10b981',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}>
                  {isPlaying ? 'EN TRANSMISIÓN' : 'LISTO / PAUSA'}
                </span>
                <span style={{ fontSize: '0.62rem', color: !soundEnabled ? '#f87171' : '#94a3b8', fontWeight: !soundEnabled ? 800 : 400 }}>
                  {!soundEnabled ? '🔇 MUTE ACTIVO' : 'Audio & Video ON'}
                </span>
              </div>
            </div>

            {/* 🔬 MÓDULO 2: MATERIALES DE LABORATORIO (SOLO VISTA DEL ESTUDIANTE, SIN BOTÓN DE SUBIR) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  setIsMaterialsView(!isMaterialsView);
                  playBeep(550, 'sine', 0.08);
                }}
                className="tactile-btn"
                style={{
                  background: isMaterialsView 
                    ? 'linear-gradient(135deg, #ffc936 0%, #f59e0b 100%)' 
                    : 'linear-gradient(135deg, rgba(255, 201, 54, 0.18) 0%, rgba(217, 119, 6, 0.25) 100%)',
                  border: '2px solid #ffc936',
                  borderRadius: '14px',
                  padding: '10px 22px',
                  color: isMaterialsView ? '#030812' : '#ffc936',
                  fontWeight: 900,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 0 18px rgba(255, 201, 54, 0.35)',
                  cursor: 'pointer'
                }}
              >
                <FlaskConical size={18} color={isMaterialsView ? '#030812' : '#ffc936'} strokeWidth={2.5} />
                <span>Reactivos & Materiales ({experimentoActual.materiales?.length || 0})</span>
              </button>
            </div>

            {/* 📝 MÓDULO 3: INVESTIGACIÓN (BITÁCORA & GUÍA DIDÁCTICA) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <button
                onClick={() => setIsDataModalOpen(true)}
                className="tactile-btn"
                style={{
                  background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                  border: '1.5px solid #38bdf8',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  color: '#f8fafc',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Edit3 size={15} color="#38bdf8" />
                <span>Bitácora Científica</span>
              </button>

              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="tactile-btn"
                style={{
                  background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                  border: '1.5px solid #a855f7',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  color: '#f8fafc',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <BookOpen size={15} color="#c084fc" />
                <span>Guía Didáctica</span>
              </button>
            </div>

            {/* 🎓 MÓDULO 4: INTERRUPTOR MODO DOCENTE (DESBLOQUEO LIBRE) & PANTALLA COMPLETA */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px'
            }}>
              {/* SWITCH PROFESOR CON BLOQUEO POR CREDENCIALES */}
              <button
                onClick={handleToggleDocenteMode}
                className="tactile-btn"
                style={{
                  background: modoDocenteLibre ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                  border: `1.5px solid ${modoDocenteLibre ? '#10b981' : '#64748b'}`,
                  borderRadius: '10px',
                  padding: '6px 10px',
                  color: modoDocenteLibre ? '#10b981' : '#94a3b8',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
                title={modoDocenteLibre ? "Modo Docente activo (clic para bloquear secuencia a estudiantes)" : "Desbloquear modo docente con credenciales UPS"}
              >
                {modoDocenteLibre ? <Unlock size={14} /> : <Lock size={14} />}
                <span>{modoDocenteLibre ? 'Docente ON' : 'Docente OFF'}</span>
              </button>

              <button
                onClick={toggleFullscreen}
                className="tactile-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#1e293b',
                  border: '1px solid #475569',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Pantalla Completa"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </>
        )}

      </footer>
      )}

      {/* TOAST FLOTANTE TEMPORAL */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '72px',
          right: '30px',
          background: 'rgba(5, 18, 38, 0.96)',
          border: '1.5px solid #00e5ff',
          color: '#f8fafc',
          padding: '10px 18px',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: 800,
          boxShadow: '0 0 25px rgba(0, 229, 255, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.2s'
        }}>
          <Sparkles size={16} color="#00e5ff" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          MODAL 1: SUBIR / VINCULAR VIDEO (DRAG & DROP)
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

            {/* ZONA DE ARRASTRE */}
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  setSelectedVideoFile(e.dataTransfer.files[0]);
                  playBeep(750, 'sine', 0.08);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: isDragging ? '2.5px dashed #00e5ff' : '2px dashed rgba(0, 229, 255, 0.45)',
                borderRadius: '16px',
                padding: '24px 20px',
                textAlign: 'center',
                marginBottom: '16px',
                background: isDragging ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0, 229, 255, 0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,image/*"
                onChange={(e) => {
                  if (e.target.files[0]) setSelectedVideoFile(e.target.files[0]);
                }}
                style={{ display: 'none' }}
              />

              {selectedVideoFile ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <FileVideo size={36} color="#10b981" />
                  <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.95rem' }}>
                    {selectedVideoFile.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>
                    ✓ Archivo listo para guardar
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Upload size={32} color="#00e5ff" />
                  <div style={{ fontWeight: 900, color: '#ffffff', fontSize: '0.95rem' }}>
                    Arrastra y suelta tu archivo de video aquí
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#38bdf8' }}>
                    o haz clic para <strong>Explorar archivos</strong>
                  </div>
                </div>
              )}
            </div>

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
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="tactile-btn"
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isSavingMedia}
                onClick={handleSaveMedia}
                className="tactile-btn"
                style={{
                  padding: '10px 22px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                  color: '#030812',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  boxShadow: '0 0 16px rgba(0, 229, 255, 0.4)'
                }}
              >
                {isSavingMedia ? 'Guardando...' : 'Guardar Recurso'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: BITÁCORA DEL INVESTIGADOR */}
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
                    placeholder="Ej. Mateo y Valentina"
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
                  Observaciones Experimentales:
                </label>
                <textarea
                  rows={2}
                  placeholder="¿Qué fenómenos observaste durante el paso a paso?"
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
                  Conclusiones Científicas:
                </label>
                <textarea
                  rows={2}
                  placeholder="¿Cómo se aplica este principio científico en la ingeniería?"
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
                  className="tactile-btn"
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
                    fontSize: '0.82rem'
                  }}
                >
                  <Printer size={14} />
                  <span>Imprimir</span>
                </button>

                <button
                  type="submit"
                  className="tactile-btn"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                    color: '#030812',
                    fontWeight: 900,
                    fontSize: '0.82rem'
                  }}
                >
                  Guardar Bitácora
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
              className="tactile-btn"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                background: '#00e5ff',
                color: '#030812',
                fontWeight: 900,
                fontSize: '0.85rem'
              }}
            >
              Volver a la Cabina
            </button>
          </div>
        </div>
      )}

      {/* MODAL SCI-FI DE AUTORIZACIÓN Y DESBLOQUEO DOCENTE */}
      {isDocenteUnlockModalOpen && (
        <div 
          onClick={() => setIsDocenteUnlockModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(2, 6, 18, 0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '440px',
              background: 'linear-gradient(135deg, rgba(8, 22, 45, 0.98) 0%, rgba(3, 10, 24, 0.99) 100%)',
              border: '2px solid #00e5ff',
              borderRadius: '24px',
              padding: '28px 24px',
              boxShadow: '0 0 40px rgba(0, 229, 255, 0.35)',
              position: 'relative',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <button
              onClick={() => setIsDocenteUnlockModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'rgba(0, 229, 255, 0.15)',
                border: '1.5px solid #00e5ff',
                color: '#00e5ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto'
              }}>
                <Lock size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', marginBottom: '6px' }}>
                Desbloqueo Modo Docente
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                Ingresa las credenciales institucionales de Docente o Administrador UPS para navegar libremente por todos los pasos.
              </p>
            </div>

            {docenteUnlockError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                color: '#fca5a5',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Lock size={14} />
                <span>{docenteUnlockError}</span>
              </div>
            )}

            <form onSubmit={handleDocenteUnlockSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '6px' }}>
                  Usuario o Alias Docente
                </label>
                <input 
                  type="text"
                  value={docenteUnlockUser}
                  onChange={(e) => setDocenteUnlockUser(e.target.value)}
                  placeholder="docente@ups.edu.ec o docente"
                  autoFocus
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1.5px solid rgba(0, 229, 255, 0.3)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '6px' }}>
                  Contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showDocenteUnlockPass ? 'text' : 'password'}
                    value={docenteUnlockPass}
                    onChange={(e) => setDocenteUnlockPass(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 42px 10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1.5px solid rgba(0, 229, 255, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowDocenteUnlockPass(!showDocenteUnlockPass)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    {showDocenteUnlockPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Atajos rápidos de credenciales de prueba */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '4px'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setDocenteUnlockUser(CREDENCIALES_DEFAULT.DOCENTE.usuario);
                    setDocenteUnlockPass(CREDENCIALES_DEFAULT.DOCENTE.password);
                    setDocenteUnlockError('');
                  }}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    borderRadius: '8px',
                    background: 'rgba(0, 229, 255, 0.08)',
                    border: '1px solid rgba(0, 229, 255, 0.25)',
                    color: '#00e5ff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Usar Docente Demo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDocenteUnlockUser(CREDENCIALES_DEFAULT.ADMIN.usuario);
                    setDocenteUnlockPass(CREDENCIALES_DEFAULT.ADMIN.password);
                    setDocenteUnlockError('');
                  }}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    borderRadius: '8px',
                    background: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    color: '#f59e0b',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Usar Admin Demo
                </button>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsDocenteUnlockModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '11px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="tactile-btn"
                  style={{
                    flex: 1.5,
                    padding: '11px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #00e5ff 0%, #0070f3 100%)',
                    border: '1px solid #00e5ff',
                    color: '#030812',
                    fontSize: '0.88rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 0 16px rgba(0, 229, 255, 0.4)'
                  }}
                >
                  Desbloquear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
