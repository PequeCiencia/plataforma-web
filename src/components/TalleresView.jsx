// TalleresView.jsx - Vista interactiva de Talleres y Robótica
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Wrench, 
  Clock, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  Send,
  X,
  Layers,
  Cpu,
  Zap
} from 'lucide-react';

export default function TalleresView() {
  const { talleres } = useData();
  const [selectedTaller, setSelectedTaller] = useState(null);
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [institucionInput, setInstitucionInput] = useState('');

  // Agrupar por categoría
  const cienciasTecnologicas = talleres.filter(t => t.categoria === 'Ciencias Tecnológicas');
  const roboticaAvanzada = talleres.filter(t => t.categoria === 'Robótica Avanzada' || t.categoria === 'Robótica');
  const otrosTalleres = talleres.filter(t => t.categoria !== 'Ciencias Tecnológicas' && t.categoria !== 'Robótica Avanzada' && t.categoria !== 'Robótica');

  const handleSolicitar = (e) => {
    e.preventDefault();
    if (!institucionInput.trim()) return;
    setSolicitudEnviada(true);
    setTimeout(() => {
      setSolicitudEnviada(false);
      setSelectedTaller(null);
      setInstitucionInput('');
    }, 2500);
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Cabecera Principal */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
          <span className="badge badge-orange" style={{ marginBottom: '14px' }}>
            Módulos Formativos UPS
          </span>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
            color: '#ffffff',
            marginBottom: '14px',
            letterSpacing: '-0.02em'
          }}>
            Talleres Activos
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Módulos de entrenamiento avanzado para futuros exploradores. Selecciona un mundo para comenzar la simulación e implementarlo en tu institución educativa.
          </p>
        </div>

        {/* SECCIÓN 1: CIENCIAS TECNOLÓGICAS */}
        {cienciasTecnologicas.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '28px',
              borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
              paddingBottom: '12px'
            }}>
              <Zap size={22} color="#00e5ff" />
              <h2 style={{ fontSize: '1.5rem', color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Ciencias Tecnológicas
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {cienciasTecnologicas.map((taller) => (
                <div
                  key={taller.id}
                  onClick={() => setSelectedTaller(taller)}
                  className="glass-panel"
                  style={{
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = '#00e5ff';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 229, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img 
                      src={taller.imagen} 
                      alt={taller.nombre} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px'
                    }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                        {taller.estado || 'Activo'}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00e5ff', marginBottom: '6px', textTransform: 'uppercase' }}>
                      {taller.modulo}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '8px' }}>
                      {taller.nombre}
                    </h3>

                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                      flexGrow: 1
                    }}>
                      {taller.descripcion}
                    </p>

                    <div style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      paddingTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}>
                      <span>{taller.edadRecomendada}</span>
                      <span style={{ color: '#00e5ff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Ver detalles <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECCIÓN 2: ROBÓTICA AVANZADA (DESTACADO) */}
        {roboticaAvanzada.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '28px',
              borderBottom: '1px solid rgba(255, 0, 127, 0.25)',
              paddingBottom: '12px'
            }}>
              <Cpu size={22} color="#ff007f" />
              <h2 style={{ fontSize: '1.5rem', color: '#ff007f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Robótica Avanzada
              </h2>
            </div>

            {roboticaAvanzada.map((taller) => (
              <div
                key={taller.id}
                className="glass-panel"
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 0, 127, 0.3)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '32px',
                  padding: '32px',
                  background: 'linear-gradient(135deg, rgba(255, 0, 127, 0.05) 0%, rgba(15, 23, 42, 0.9) 100%)'
                }}
              >
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 0, 127, 0.15)',
                    color: '#ff007f',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '16px',
                    textTransform: 'uppercase'
                  }}>
                    <Sparkles size={14} />
                    <span>{taller.modulo}</span>
                  </div>

                  <h3 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '14px' }}>
                    {taller.nombre}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {taller.descripcion}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                    {taller.temas && taller.temas.slice(0, 3).map((tema, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e2e8f0' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff007f' }} />
                        <span>{tema}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setSelectedTaller(taller)}
                      className="btn btn-magenta"
                    >
                      <Wrench size={16} />
                      <span>Ver Temario & Iniciar Secuencia</span>
                    </button>
                  </div>
                </div>

                <div style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  minHeight: '260px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                }}>
                  <img 
                    src={taller.imagen} 
                    alt={taller.nombre} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    insetInline: 0,
                    padding: '12px 16px',
                    background: 'rgba(9, 13, 22, 0.85)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: '#00e5ff'
                  }}>
                    <span>SYS_STAT: ONLINE</span>
                    <span>DIR: SIMIO TECH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL DE DETALLES DEL TALLER */}
        {selectedTaller && (
          <div className="modal-overlay" onClick={() => setSelectedTaller(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
              <div style={{ position: 'relative', height: '240px' }}>
                <img 
                  src={selectedTaller.imagen} 
                  alt={selectedTaller.nombre} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, #0f172a 10%, transparent 80%)'
                }} />
                <button
                  onClick={() => setSelectedTaller(null)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={18} />
                </button>
                <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
                  <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
                    {selectedTaller.modulo}
                  </span>
                  <h2 style={{ fontSize: '1.8rem', color: '#ffffff' }}>{selectedTaller.nombre}</h2>
                </div>
              </div>

              <div style={{ padding: '24px 32px' }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px', fontSize: '0.98rem' }}>
                  {selectedTaller.descripcion}
                </p>

                {/* Métricas del taller */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '16px',
                  marginBottom: '28px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Duración</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{selectedTaller.duracion || '4 Semanas'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Edad Sugerida</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{selectedTaller.edadRecomendada || '6 a 12 años'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Instructor Responsable</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#00e5ff' }}>{selectedTaller.instructor || 'UPS Cuenca'}</div>
                  </div>
                </div>

                {/* Temario del taller */}
                {selectedTaller.temas && (
                  <div style={{ marginBottom: '28px' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BookOpen size={18} color="#00e5ff" />
                      <span>Temario Curricular</span>
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {selectedTaller.temas.map((tema, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          padding: '10px 14px',
                          background: 'rgba(15, 23, 42, 0.6)',
                          borderRadius: '10px',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          fontSize: '0.88rem',
                          color: '#e2e8f0'
                        }}>
                          <CheckCircle2 size={16} color="#00e676" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span>{tema}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formulario de Solicitud Institucional */}
                <div style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'rgba(0, 229, 255, 0.05)',
                  border: '1px solid rgba(0, 229, 255, 0.2)'
                }}>
                  <h3 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '8px' }}>
                    ¿Deseas este taller para tu Unidad Educativa?
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    Registra el nombre de tu institución o colegio para coordinar una fecha de capacitación con instructores de la UPS.
                  </p>

                  {solicitudEnviada ? (
                    <div style={{
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'rgba(0, 230, 118, 0.15)',
                      color: '#00e676',
                      fontWeight: 700,
                      textAlign: 'center',
                      fontSize: '0.9rem'
                    }}>
                      ✅ ¡Solicitud registrada con éxito! El equipo de Pequeños Científicos se contactará pronto.
                    </div>
                  ) : (
                    <form onSubmit={handleSolicitar} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <input 
                        type="text" 
                        placeholder="Nombre de la Institución / Colegio / Docente"
                        value={institucionInput}
                        onChange={(e) => setInstitucionInput(e.target.value)}
                        required
                        style={{
                          flexGrow: 1,
                          padding: '10px 16px',
                          borderRadius: '10px',
                          background: '#090d16',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#ffffff',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                      <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>
                        <Send size={16} />
                        <span>Solicitar Taller</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
