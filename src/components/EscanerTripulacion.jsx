// EscanerTripulacion.jsx - Módulo "Escáner de Tripulación" (ADN Visual)
import React, { useState, useRef, useEffect } from 'react';
import { CREW_PRESETS } from '../data/crewData';
import confetti from 'canvas-confetti';
import { 
  Upload, 
  Scan, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  ShieldAlert, 
  Zap, 
  Cpu, 
  RefreshCw, 
  Download, 
  Printer, 
  Users, 
  Dna,
  Sliders,
  Crosshair,
  Radio,
  FileCode
} from 'lucide-react';

export default function EscanerTripulacion() {
  const [selectedCharacter, setSelectedCharacter] = useState(CREW_PRESETS[0]);
  const [activePose, setActivePose] = useState('frontal');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedHex, setCopiedHex] = useState(null);
  const [soundActive, setSoundActive] = useState(true);
  const [toastMessage, setToastMessage] = useState('Escáner biométrico listo en cabina');
  
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Sonidos sintéticos de cabina mediante Web Audio API
  const playBeep = (freq = 880, duration = 0.08, type = 'sine') => {
    if (!soundActive) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  };

  // Simular escaneo biométrico
  const triggerScan = (characterData, customImgUrl = null) => {
    setIsScanning(true);
    setScanProgress(0);
    playBeep(440, 0.15, 'sawtooth');

    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      setScanProgress(Math.min(current, 100));
      if (current % 20 === 0) {
        playBeep(600 + current * 4, 0.05, 'sine');
      }

      if (current >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        playBeep(1200, 0.2, 'triangle');
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7, x: 0.3 }
        });
        setToastMessage(`¡ADN Visual de ${characterData.nombre} decodificado con éxito!`);
        setTimeout(() => setToastMessage(''), 3500);
      }
    }, 45);

    setSelectedCharacter(characterData);
    if (customImgUrl) {
      setUploadedImage(customImgUrl);
    } else {
      setUploadedImage(null);
    }
  };

  // Cargar preset de personaje
  const handleSelectPreset = (preset) => {
    if (isScanning) return;
    setActivePose('frontal');
    triggerScan(preset);
  };

  // Manejar subida de archivo o drag & drop
  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target.result;
      
      // Extraer paleta de colores usando canvas
      extractPaletteFromImage(imgUrl, file.name);
    };
    reader.readAsDataURL(file);
  };

  const extractPaletteFromImage = (imgUrl, fileName) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(img, 0, 0, 100, 100);

      // Muestrear 5 regiones
      const samplePoints = [
        [30, 30], [50, 40], [50, 60], [30, 75], [70, 75]
      ];
      const extractedPalette = samplePoints.map((pt, i) => {
        const pixel = ctx.getImageData(pt[0], pt[1], 1, 1).data;
        const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
        const labels = ['Color Dominante', 'Tono Secundario', 'Acento Croma', 'Sombra Base', 'Detalle Luz'];
        return { hex, label: labels[i] };
      });

      const customCharacter = {
        id: 'custom-' + Date.now(),
        nombre: fileName.replace(/\.[^/.]+$/, '').toUpperCase(),
        rol: 'Sujeto Analizado en Cabina / Tripulante Externo',
        proporciones: 'Proporción 2D Detectada / Estilo Personalizado',
        estiloTrazo: 'Raster / Vector Importado (Análisis Espectral)',
        morfologia: 'Sujeto escaneado mediante sensor biométrico de cabina. Rasgos vectoriales y mapa de color identificados.',
        especialidad: 'Morfología externa clasificada para operaciones espaciales escolares.',
        origen: 'Cámara de Escaneo de Misión',
        paletaColores: extractedPalette,
        avatarImg: imgUrl,
        escalaPoder: Math.floor(Math.random() * 20) + 80,
        nivelSeguridad: 'Nivel 2 - En Registro'
      };

      triggerScan(customCharacter, imgUrl);
    };
    img.src = imgUrl;
  };

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  };

  // Copiar código HEX al portapapeles
  const handleCopyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    playBeep(980, 0.06, 'sine');
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Copiar ADN Visual completo al portapapeles
  const handleCopyVisualDNA = async () => {
    try {
      const paletteStr = selectedCharacter.paletaColores
        ? selectedCharacter.paletaColores.map(c => `  - ${c.label}: ${c.hex}`).join('\n')
        : '';

      const dnaContent = `=== ADN VISUAL: ${selectedCharacter.nombre.toUpperCase()} ===
Rol / Rango: ${selectedCharacter.rol}
Proporciones Anatómicas: ${selectedCharacter.proporciones}
Estilo de Trazo: ${selectedCharacter.estiloTrazo}
Morfología & Rasgos Distintivos: ${selectedCharacter.morfologia}
Especialidad: ${selectedCharacter.especialidad || 'N/A'}
Paleta Cromática Oficial:
${paletteStr}
Escala Operativa: ${selectedCharacter.escalaPoder}% STEM
Nivel de Seguridad: ${selectedCharacter.nivelSeguridad || 'Perfil Oficial'}`;

      await navigator.clipboard.writeText(dnaContent);
      playBeep(1040, 0.12, 'triangle');
      alert("✅ ¡ADN copiado al portapapeles! Listo para inyectar en Google Flow.");
    } catch (err) {
      console.error("Error al copiar ADN:", err);
      alert("⚠️ Hubo un error al copiar el ADN.");
    }
  };

  // Exportar Ficha en JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedCharacter, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ADN_Visual_${selectedCharacter.nombre.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    playBeep(1100, 0.1, 'triangle');
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-space)',
      color: 'var(--text-white)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* CONTENEDOR PRINCIPAL: ASPECTO 16:9 RESPONSIVO DE CABINA */}
      <div style={{
        width: '100%',
        maxWidth: '1380px',
        background: 'var(--panel-navy-dark)',
        border: '2px solid var(--border-turquoise)',
        borderRadius: '24px',
        boxShadow: '0 0 35px rgba(42, 157, 143, 0.25), 0 20px 50px rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* CABECERA DE LA CABINA (COCKPIT HEADER) */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 28px',
          background: 'rgba(29, 53, 87, 0.95)',
          borderBottom: '1px solid var(--border-turquoise)',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Título & Badge de Misión */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--border-turquoise), #00E5FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(42, 157, 143, 0.5)'
            }}>
              <Dna size={24} color="#02050b" />
            </div>
            <div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: 'var(--color-orange)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}>
                MÓDULO OFICIAL · PEQUEÑOS CIENTÍFICOS UPS
              </div>
              <h1 style={{
                fontSize: '1.35rem',
                fontWeight: 900,
                color: 'var(--text-white)',
                letterSpacing: '-0.02em'
              }}>
                Escáner de Tripulación <span style={{ color: 'var(--border-turquoise)', fontSize: '0.9rem', fontWeight: 600 }}>[ADN Visual v2.0]</span>
              </h1>
            </div>
          </div>

          {/* Telemetría & Acciones Rápidas */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(42, 157, 143, 0.15)',
              border: '1px solid var(--border-turquoise)',
              color: 'var(--border-turquoise)',
              fontSize: '0.78rem',
              fontWeight: 700
            }}>
              <span className="pulse-dot" style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--border-turquoise)'
              }} />
              <span>SENSOR ÓPTICO ACTIVO</span>
            </div>

            <button
              onClick={() => setSoundActive(!soundActive)}
              className="btn-turquoise"
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              title="Activar/Desactivar Audio Sintético"
            >
              <Radio size={14} />
              <span>{soundActive ? 'Audio ON' : 'Audio OFF'}</span>
            </button>
          </div>
        </header>

        {/* CONTENIDO INTERIOR: PANEL IZQUIERDO (ESCÁNER) + PANEL DERECHO (BASE ADN) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          padding: '24px',
          flexGrow: 1
        }}>
          {/* PANEL IZQUIERDO: EL ESCÁNER (THE SCANNER CHAMBER) */}
          <section className="cockpit-panel" style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative'
          }}>
            {/* Encabezado del Escáner */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Scan size={20} color="var(--border-turquoise)" />
                <h2 style={{ fontSize: '1.15rem', color: 'var(--text-white)', fontWeight: 800 }}>
                  Cámara de Escaneo Biométrico
                </h2>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-orange)', fontWeight: 700 }}>
                {isScanning ? `ANALIZANDO: ${scanProgress}%` : 'SISTEMA LISTO'}
              </span>
            </div>

            {/* VIEWPORT DEL ESCÁNER CON BORDE LUMINOSO Y ANIMACIÓN */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              style={{
                position: 'relative',
                height: '380px',
                borderRadius: '16px',
                background: 'rgba(2, 5, 11, 0.9)',
                border: isDragging ? '2px dashed var(--color-orange)' : '1px solid var(--border-turquoise)',
                boxShadow: isScanning ? '0 0 30px rgba(0, 229, 255, 0.4)' : 'inset 0 0 25px rgba(42, 157, 143, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Cuadrícula de Escaneo de Fondo */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(42, 157, 143, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(42, 157, 143, 0.12) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.6
              }} />

              {/* Animación Circular de Radar / Scanner (CSS Keyframes) */}
              <div className="radar-sweep" style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                border: '1px dashed rgba(42, 157, 143, 0.4)',
                borderTop: '2px solid var(--border-turquoise)',
                pointerEvents: 'none',
                opacity: isScanning ? 1 : 0.4
              }} />

              {/* Mira Holográfica Central */}
              <div style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 229, 255, 0.25)',
                pointerEvents: 'none'
              }} />

              {/* Rayo Láser de Escaneo Vertical */}
              {isScanning && (
                <div className="laser-beam" style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, #00E5FF, #ffffff, #00E5FF, transparent)',
                  boxShadow: '0 0 15px #00E5FF, 0 0 25px #00E5FF',
                  zIndex: 20
                }} />
              )}

              {/* Imagen del Personaje en el Centro */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px'
              }}>
                <img 
                  src={uploadedImage || (selectedCharacter.galeria && selectedCharacter.galeria[activePose]) || selectedCharacter.avatarImg} 
                  alt={selectedCharacter.nombre} 
                  style={{
                    maxHeight: '320px',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: isScanning 
                      ? 'drop-shadow(0 0 15px #00E5FF) brightness(1.2)' 
                      : 'drop-shadow(0 0 15px rgba(42, 157, 143, 0.4))',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              {/* Overlay HUD de Telemetría */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '14px',
                right: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                fontFamily: 'monospace',
                background: 'rgba(2, 5, 11, 0.75)',
                padding: '4px 10px',
                borderRadius: '6px',
                zIndex: 15
              }}>
                <span>ID: {selectedCharacter.id.toUpperCase()}</span>
                <span>STATUS: {isScanning ? 'ESCANEANDO...' : 'BLOQUEO ADN: OK'}</span>
              </div>
            </div>

            {/* SELECTOR DE POSES / EXPRESIONES DE FLOW */}
            {selectedCharacter.galeria && (
              <div style={{
                display: 'flex',
                gap: '6px',
                flexWrap: 'wrap',
                background: 'rgba(3, 10, 22, 0.7)',
                padding: '6px 10px',
                borderRadius: '12px',
                border: '1px solid rgba(0, 229, 255, 0.25)'
              }}>
                {[
                  { key: 'frontal', label: '😊 Frontal' },
                  { key: 'saludo', label: '👋 Saludo' },
                  { key: 'pensando', label: '🤔 Pensando' },
                  { key: 'sorprendido', label: '😲 Sorprendido' },
                  { key: 'cuerpoCompleto', label: '🧍 Cuerpo Completo' }
                ].map((pose) => (
                  <button
                    key={pose.key}
                    onClick={() => {
                      setActivePose(pose.key);
                      setUploadedImage(null);
                      playBeep(650, 0.04);
                    }}
                    className="tactile-btn"
                    style={{
                      flex: '1 1 auto',
                      padding: '5px 8px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      background: activePose === pose.key && !uploadedImage
                        ? 'linear-gradient(135deg, rgba(0, 229, 255, 0.3) 0%, rgba(2, 132, 199, 0.4) 100%)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: activePose === pose.key && !uploadedImage
                        ? '1.5px solid #00e5ff'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      color: activePose === pose.key && !uploadedImage ? '#00e5ff' : '#94a3b8'
                    }}
                  >
                    {pose.label}
                  </button>
                ))}
              </div>
            )}

            {/* BOTONES DE ACCIÓN: SUBIDA & CARROUSEL PRESET */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-red"
                  style={{ flexGrow: 1 }}
                >
                  <Upload size={18} />
                  <span>Subir o Arrastrar Personaje 2D</span>
                </button>

                <button
                  onClick={() => triggerScan(selectedCharacter, uploadedImage)}
                  className="btn-orange"
                  disabled={isScanning}
                >
                  <RefreshCw size={18} className={isScanning ? 'radar-sweep' : ''} />
                  <span>Re-Escanear</span>
                </button>
              </div>

              {/* Selector Rápido de la Tripulación Oficial */}
              <div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-orange)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Users size={14} />
                  <span>Tripulación Oficial UPS (Presets):</span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: '8px'
                }}>
                  {CREW_PRESETS.map((preset) => {
                    const isSelected = selectedCharacter.id === preset.id && !uploadedImage;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset)}
                        style={{
                          height: '56px',
                          borderRadius: '10px',
                          background: isSelected ? 'rgba(42, 157, 143, 0.4)' : 'rgba(29, 53, 87, 0.6)',
                          border: isSelected ? '2px solid var(--border-turquoise)' : '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px',
                          transition: 'all 0.2s',
                          cursor: 'pointer'
                        }}
                        title={`${preset.nombre} (${preset.rol})`}
                      >
                        <img 
                          src={preset.avatarImg} 
                          alt={preset.nombre} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* PANEL DERECHO: LA BASE DE DATOS ADN (THE DNA DATABASE) */}
          <section className="cockpit-panel" style={{
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            background: 'rgba(29, 53, 87, 0.88)'
          }}>
            {/* HEADER DEL PERFIL ADN */}
            <div style={{
              borderBottom: '1px solid rgba(42, 157, 143, 0.3)',
              paddingBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  background: 'rgba(244, 162, 97, 0.15)',
                  color: 'var(--color-orange)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  <Sparkles size={12} />
                  <span>{selectedCharacter.nivelSeguridad || 'Perfil Oficial'}</span>
                </span>
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: 'var(--text-white)',
                  letterSpacing: '-0.02em'
                }}>
                  {selectedCharacter.nombre}
                </h2>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'var(--border-turquoise)',
                  fontWeight: 700
                }}>
                  {selectedCharacter.rol}
                </div>
              </div>

              <div style={{
                textAlign: 'right',
                background: 'rgba(2, 5, 11, 0.4)',
                padding: '8px 14px',
                borderRadius: '12px',
                border: '1px solid var(--border-turquoise)'
              }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Escala Operativa</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-orange)' }}>
                  {selectedCharacter.escalaPoder}% <span style={{ fontSize: '0.75rem', color: 'var(--text-white)' }}>STEM</span>
                </div>
              </div>
            </div>

            {/* SECCIÓN ADN VISUAL (VISUAL DNA) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                color: 'var(--color-orange)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Dna size={16} />
                <span>ADN Visual & Morfología:</span>
              </div>

              {/* Bloque 1: Proporciones Anatómicas */}
              <div style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(2, 5, 11, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Proporciones Anatómicas
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--text-white)', fontWeight: 600 }}>
                  {selectedCharacter.proporciones}
                </div>
              </div>

              {/* Bloque 2: Estilo de Trazo */}
              <div style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(2, 5, 11, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Estilo de Trazo
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--text-white)', fontWeight: 600 }}>
                  {selectedCharacter.estiloTrazo}
                </div>
              </div>

              {/* Bloque 3: Morfología & Rasgos Distintivos */}
              <div style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(2, 5, 11, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Morfología & Rasgos Distintivos
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-white)', lineHeight: 1.5 }}>
                  {selectedCharacter.morfologia}
                </div>
              </div>

              {/* BOTÓN DE ACCIÓN: COPIAR ADN AL PORTAPAPELES */}
              <button
                onClick={handleCopyVisualDNA}
                className="btn-red"
                style={{
                  marginTop: '6px',
                  width: '100%',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  boxShadow: '0 4px 18px rgba(230, 57, 70, 0.45)',
                  fontSize: '0.95rem'
                }}
              >
                <span>📋 COPIAR ADN AL PORTAPAPELES</span>
              </button>
            </div>

            {/* SECCIÓN PALETA DE COLORES (COLOR PALETTE BLOCKS) */}
            <div>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                color: 'var(--color-orange)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Paleta Cromática Oficial ({selectedCharacter.paletaColores.length} tonos):</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Haz clic en un código para copiar</span>
              </div>

              {/* Cuadrícula de Bloques de Color */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                gap: '10px'
              }}>
                {selectedCharacter.paletaColores.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCopyHex(col.hex)}
                    style={{
                      background: 'rgba(2, 5, 11, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = col.hex}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  >
                    {/* Cuadro de Color */}
                    <div style={{
                      width: '100%',
                      height: '36px',
                      borderRadius: '6px',
                      backgroundColor: col.hex,
                      boxShadow: `0 0 10px ${col.hex}40`,
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }} />

                    <div style={{
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: copiedHex === col.hex ? 'var(--color-orange)' : 'var(--text-white)'
                    }}>
                      {copiedHex === col.hex ? '¡Copiado!' : col.hex}
                    </div>

                    <div style={{
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      textAlign: 'center',
                      lineHeight: 1.1
                    }}>
                      {col.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* BOTONES DE ACCIÓN INFERIORES */}
            <div style={{
              marginTop: 'auto',
              display: 'flex',
              gap: '12px',
              borderTop: '1px solid rgba(42, 157, 143, 0.25)',
              paddingTop: '16px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={handleExportJSON}
                className="btn-turquoise"
                style={{ flexGrow: 1 }}
              >
                <Download size={16} />
                <span>Exportar Ficha ADN (JSON)</span>
              </button>

              <button
                onClick={() => window.print()}
                className="btn-orange"
              >
                <Printer size={16} />
                <span>Imprimir Ficha</span>
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* TOAST FLOTANTE */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          padding: '10px 20px',
          borderRadius: '10px',
          background: 'var(--color-red)',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '0.88rem',
          boxShadow: '0 8px 25px rgba(230, 57, 70, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
