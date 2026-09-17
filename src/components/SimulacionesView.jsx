// SimulacionesView.jsx - Proyectos y Simulaciones 3D de Pequeños Científicos
import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  ExternalLink, 
  ArrowLeft, 
  Play, 
  Cpu, 
  Gauge, 
  Compass, 
  Activity, 
  Wrench
} from 'lucide-react';

export default function SimulacionesView({ onNavigate }) {
  const [simulacionActiva, setSimulacionActiva] = useState(null); // null | 'rover'

  // Si está activa la simulación del Rover, renderizar el visor interactivo
  if (simulacionActiva === 'rover') {
    return (
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        background: '#040711',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Barra superior de control del simulador */}
        <header style={{
          background: 'rgba(8, 14, 28, 0.95)',
          borderBottom: '1px solid rgba(0, 229, 255, 0.25)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Botón Volver y Título */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSimulacionActiva(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '8px 16px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 229, 255, 0.15)';
                e.currentTarget.style.borderColor = '#00e5ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <ArrowLeft size={16} />
              <span>Volver a Proyectos</span>
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981'
                }} />
                <h2 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  Rover Dynamics Lab · Simulación 3D
                </h2>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Física WebGL en Tiempo Real · Pequeños Científicos UPS
              </span>
            </div>
          </div>

          {/* Atajos de Control & Acciones Externas */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.25)',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              color: '#00e5ff',
              fontWeight: 600
            }}>
              <span>🎮 Controles: <strong>W / A / S / D</strong> o <strong>Flechas</strong> para conducir</span>
            </div>

            <a
              href="https://davidfarfan16t.github.io/rover-3d-web/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                color: '#030812',
                padding: '8px 16px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.35)',
                cursor: 'pointer'
              }}
            >
              <ExternalLink size={15} />
              <span>Abrir en Pestaña Completa</span>
            </a>
          </div>
        </header>

        {/* Marco Interactivo del Simulador WebGL */}
        <div style={{
          flexGrow: 1,
          width: '100%',
          height: 'calc(100vh - 145px)',
          position: 'relative',
          background: '#000000'
        }}>
          <iframe
            src="https://davidfarfan16t.github.io/rover-3d-web/"
            title="Simulación 3D Rover Dynamics Lab"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block'
            }}
            allow="accelerometer; autoplay; camera; gyroscope; payment; microphone"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Vista principal: Catálogo de Proyectos y Simulaciones
  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">

        {/* Encabezado Hero */}
        <div style={{
          textAlign: 'center',
          maxWidth: '860px',
          margin: '0 auto 48px',
          padding: '0 16px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 229, 255, 0.12)',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            padding: '6px 18px',
            borderRadius: '9999px',
            color: '#00e5ff',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '18px'
          }}>
            <Bot size={15} />
            <span>Innovación STEAM & Desarrollo Tecnológico</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: '14px',
            lineHeight: 1.15
          }}>
            Proyectos & Simulaciones{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00e5ff 0%, #38bdf8 50%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              3D Interactivas
            </span>
          </h1>

          <p style={{
            color: '#94a3b8',
            fontSize: '1.05rem',
            lineHeight: 1.6,
            margin: 0
          }}>
            Explora los prototipos de ingeniería, robótica espacial y simulaciones físicas diseñados y desarrollados por el equipo de investigadores, docentes y estudiantes de <strong>Pequeños Científicos (UPS Sede Cuenca)</strong>.
          </p>
        </div>

        {/* PROYECTO DESTACADO: ROVER PLANETARIO 3D */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(8, 24, 48, 0.95) 0%, rgba(4, 12, 26, 0.98) 100%)',
          border: '2px solid rgba(0, 229, 255, 0.4)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '50px'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Información del Proyecto */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  ★ Proyecto Insignia
                </span>

                <span style={{
                  background: 'rgba(0, 229, 255, 0.15)',
                  border: '1px solid #00e5ff',
                  color: '#00e5ff',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 800
                }}>
                  WebGL · Física 3D en Vivo
                </span>
              </div>

              <h2 style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: '12px',
                lineHeight: 1.2
              }}>
                Rover de Exploración Planetaria 3D
              </h2>

              <p style={{
                color: '#cbd5e1',
                fontSize: '0.98rem',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                Diseño, modelado y laboratorio de dinámica física de un <strong>rover espacial todoterreno</strong> desarrollado íntegramente por nuestro equipo. Incorpora suspensión de articulación libre, tracción independiente, telemetría digital de velocidad y dirección, y un planificador de navegación autónoma.
              </p>

              {/* Ficha Técnica Rápida */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px',
                marginBottom: '28px'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '10px 14px'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Activity size={13} color="#00e5ff" />
                    <span>Física Aplicada</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                    Dinámica en Tiempo Real
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '10px 14px'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Gauge size={13} color="#ff9900" />
                    <span>Telemetría</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                    Velocidad, Giro & Suspensión
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '10px 14px'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Compass size={13} color="#10b981" />
                    <span>Cámara</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                    Seguimiento Orbital 360°
                  </div>
                </div>
              </div>

              {/* Botón Principal para Entrar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSimulacionActiva('rover')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                    color: '#030812',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '14px',
                    fontSize: '1rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 0 25px rgba(0, 229, 255, 0.4)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 229, 255, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 229, 255, 0.4)';
                  }}
                >
                  <Play size={20} fill="#030812" />
                  <span>¡Iniciar Simulación del Rover!</span>
                </button>

                <a
                  href="https://davidfarfan16t.github.io/rover-3d-web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#cbd5e1',
                    padding: '14px 20px',
                    borderRadius: '14px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#cbd5e1';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <ExternalLink size={16} />
                  <span>Abrir enlace externo</span>
                </a>
              </div>
            </div>

            {/* Tarjeta Visual / Vista Previa Cinematográfica del Simulador */}
            <div 
              onClick={() => setSimulacionActiva('rover')}
              style={{
                borderRadius: '20px',
                border: '2px solid rgba(0, 229, 255, 0.4)',
                overflow: 'hidden',
                position: 'relative',
                minHeight: '360px',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 229, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00e5ff';
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 229, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.4)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 229, 255, 0.2)';
              }}
            >
              <img 
                src="./assets/images/rover_sim_cover.jpg"
                alt="Rover Dynamics Lab 3D"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(3, 8, 18, 0.95) 0%, rgba(3, 8, 18, 0.35) 50%, rgba(3, 8, 18, 0.1) 100%)'
              }} />

              {/* Botón flotante central de Play */}
              <div style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 35px rgba(0, 229, 255, 0.7)',
                zIndex: 2
              }}>
                <Play size={32} fill="#030812" color="#030812" style={{ marginLeft: '4px' }} />
              </div>

              {/* HUD Inferior de la Tarjeta */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                padding: '24px',
                backdropFilter: 'blur(8px)',
                background: 'rgba(5, 12, 24, 0.78)',
                borderTop: '1px solid rgba(0, 229, 255, 0.25)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                    Rover Dynamics Lab
                  </h3>
                  <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                    Física Activa
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                  Haz clic para cargar y conducir el modelo 3D en tiempo real sobre dunas marcianas con suspensión rocker-bogie.
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#00e5ff',
                  fontSize: '0.88rem',
                  fontWeight: 800
                }}>
                  <span>🎮 Conducir Vehículo 3D</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
