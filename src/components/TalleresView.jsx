// TalleresView.jsx - Vista informativa de Talleres y Robótica Educativa UPS
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Zap,
  Cpu,
  Clock, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Send,
  School,
  Mail,
  Phone,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function TalleresView() {
  const { talleres, addSolicitudTaller } = useData();
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [formData, setFormData] = useState({
    institucion: '',
    contacto: '',
    email: '',
    telefono: '',
    tallerInteres: 'Ambos Programas (Ciencias Tecnológicas & Robótica)',
    mensaje: ''
  });

  // Agrupar por categoría
  const cienciasTecnologicas = talleres.filter(t => t.categoria === 'Ciencias Tecnológicas');
  const robotica = talleres.filter(t => t.categoria === 'Robótica' || t.categoria === 'Robótica Avanzada');

  const handleSubmitSolicitud = (e) => {
    e.preventDefault();
    if (!formData.institucion.trim() || !formData.email.trim()) return;
    if (addSolicitudTaller) {
      addSolicitudTaller(formData);
    }
    setSolicitudEnviada(true);
    setTimeout(() => {
      setSolicitudEnviada(false);
      setFormData({
        institucion: '',
        contacto: '',
        email: '',
        telefono: '',
        tallerInteres: 'Ambos Programas (Ciencias Tecnológicas & Robótica)',
        mensaje: ''
      });
    }, 4000);
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Cabecera Principal */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <span className="badge badge-orange" style={{ marginBottom: '14px', letterSpacing: '0.05em' }}>
            MÓDULOS EDUCATIVOS STEAM · UPS CUENCA
          </span>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
            color: '#ffffff',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
            fontWeight: 800
          }}>
            Talleres de Formación Científica & Robótica
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Programas formativos interactivos avalados por la <strong>Universidad Politécnica Salesiana</strong> para despertar la vocación científica, el pensamiento computacional y la inventiva tecnológica en niños y jóvenes del Ecuador.
          </p>
        </div>

        {/* SECCIÓN 1: CIENCIAS TECNOLÓGICAS (4 MUNDOS) */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px',
            borderBottom: '1px solid rgba(0, 229, 255, 0.25)',
            paddingBottom: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(0, 229, 255, 0.12)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Zap size={22} color="#00e5ff" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontWeight: 800 }}>
                  Ciencias Tecnológicas
                </h2>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Ruta de 4 mundos formativos de aprendizaje experimental
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                👥 Edad: 10 a 14 años
              </span>
              <span style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#e2e8f0',
                fontSize: '0.78rem',
                fontWeight: 600
              }}>
                4 Módulos
              </span>
            </div>
          </div>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '28px',
            maxWidth: '900px'
          }}>
            El programa de <strong>Ciencias Tecnológicas</strong> está diseñado para que los estudiantes adquieran competencias científicas mediante la práctica directa. A través de 4 mundos progresivos, los participantes exploran desde los fundamentos de la corriente eléctrica y el electromagnetismo hasta el pensamiento algorítmico y la cinemática robótica.
          </p>

          {/* Cuadrícula de 4 Mundos (2x2 en tablets, 4x1 en desktops) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {cienciasTecnologicas.map((taller) => (
              <div
                key={taller.id}
                className="glass-panel"
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(0, 229, 255, 0.18)',
                  borderRadius: '18px',
                  background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(7, 10, 18, 0.95) 100%)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#00e5ff';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 229, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.18)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Banner 16:9 con emblema oficial del mundo */}
                <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                  <img 
                    src={taller.imagen} 
                    alt={taller.nombre} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    gap: '6px'
                  }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.72rem', fontWeight: 800 }}>
                      {taller.modulo}
                    </span>
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px'
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: 'rgba(0, 0, 0, 0.75)',
                      backdropFilter: 'blur(6px)',
                      color: '#00e5ff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      border: '1px solid rgba(0, 229, 255, 0.3)'
                    }}>
                      10 a 14 años
                    </span>
                  </div>
                </div>

                {/* Contenido Informativo */}
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '8px', fontWeight: 800 }}>
                    {taller.nombre}
                  </h3>

                  <p style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '16px',
                    flexGrow: 1
                  }}>
                    {taller.descripcion}
                  </p>

                  {/* Temas Clave del Mundo */}
                  {taller.temas && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      marginBottom: '16px',
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      {taller.temas.slice(0, 3).map((tema, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                          <CheckCircle2 size={13} color="#00e5ff" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span>{tema}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Barra de metadatos inferior */}
                  <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={13} color="#00e5ff" />
                      {taller.duracion || '2 Semanas (10 Días)'}
                    </span>
                    <span style={{ color: '#00e676', fontWeight: 700, fontSize: '0.75rem' }}>
                      ● Avalado UPS
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: TALLER DE ROBÓTICA CON VEX ROBOTICS */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px',
            borderBottom: '1px solid rgba(255, 0, 127, 0.25)',
            paddingBottom: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(255, 0, 127, 0.12)',
                border: '1px solid rgba(255, 0, 127, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cpu size={22} color="#ff007f" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', color: '#ff007f', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontWeight: 800 }}>
                  Taller de Robótica
                </h2>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Ingeniería, Mecatrónica y Programación de Sistemas Autónomos
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="badge badge-orange" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                SOPORTE: VEX ROBOTICS (VEX IQ)
              </span>
              <span className="badge badge-magenta" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                👥 Edad: 12 a 18 años
              </span>
            </div>
          </div>

          {robotica.map((taller) => (
            <div
              key={taller.id}
              className="glass-panel"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 0, 127, 0.25)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px',
                padding: '36px',
                background: 'linear-gradient(135deg, rgba(255, 0, 127, 0.05) 0%, rgba(15, 23, 42, 0.95) 100%)'
              }}
            >
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 0, 127, 0.15)',
                  color: '#ff007f',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255, 0, 127, 0.3)'
                }}>
                  <Sparkles size={14} />
                  <span>Módulo de Especialidad Robótica</span>
                </div>

                <h3 style={{ fontSize: '2.1rem', color: '#ffffff', marginBottom: '14px', fontWeight: 800 }}>
                  {taller.nombre}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  El <strong>Taller de Robótica de Pequeños Científicos</strong> está enfocado en el desarrollo de habilidades de ingeniería aplicada, análisis cinemático y razonamiento lógico. Como <strong>herramienta oficial de apoyo y experimentación</strong>, se implementa el ecosistema de <strong>VEX Robotics (específicamente la línea VEX IQ)</strong>, permitiendo a los estudiantes interactuar con componentes mecánicos y electrónicos estandarizados a nivel mundial.
                </p>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  Los estudiantes no solo ensamblan piezas, sino que analizan la relación de transmisión en trenes de engranajes, configuran microcontroladores con telemetría en tiempo real y programan rutinas autónomas utilizando sensores ópticos, giroscópicos y de proximidad.
                </p>

                {/* Pilares pedagógicos con VEX */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  marginBottom: '28px'
                }}>
                  <div style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ff007f', marginBottom: '4px' }}>
                      ⚙️ Chasis & Mecánica
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Estructuras modulares VEX IQ, diferenciales y trenes de engranajes.
                    </div>
                  </div>

                  <div style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#00e5ff', marginBottom: '4px' }}>
                      🧠 Cerebro VEX IQ Brain
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Microcontrolador con puertos inteligentes y pantalla de estado.
                    </div>
                  </div>

                  <div style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ff9900', marginBottom: '4px' }}>
                      📡 Sensores Inteligentes
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Detección de color, distancia ultrasónica y bumpers de contacto.
                    </div>
                  </div>

                  <div style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#00e676', marginBottom: '4px' }}>
                      🏁 Retos en Pista
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Resolución de misiones autónomas y teleoperadas en equipo.
                    </div>
                  </div>
                </div>

                {/* Metadatos */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  flexWrap: 'wrap',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} color="#ff007f" />
                    <span><strong>Duración:</strong> {taller.duracion || '2 Semanas (10 Días)'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} color="#ff007f" />
                    <span><strong>Edad Sugerida:</strong> {taller.edadRecomendada || '12 a 18 años'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} color="#00e676" />
                    <span><strong>Aval:</strong> Universidad Politécnica Salesiana</span>
                  </div>
                </div>
              </div>

              {/* Imagen lateral informativa */}
              <div style={{
                borderRadius: '18px',
                overflow: 'hidden',
                position: 'relative',
                minHeight: '320px',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 0, 127, 0.2)'
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
                  padding: '16px 20px',
                  background: 'rgba(9, 13, 22, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.82rem'
                }}>
                  <span style={{ color: '#00e5ff', fontWeight: 800 }}>
                    HERRAMIENTA: VEX IQ 2.0
                  </span>
                  <span style={{ color: '#ff007f', fontWeight: 700 }}>
                    UPS SEDE CUENCA
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* SECCIÓN 3: FORMULARIO DE SOLICITUD INSTITUCIONAL */}
        <section style={{
          borderRadius: '24px',
          padding: '36px 32px',
          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'rgba(0, 229, 255, 0.15)',
                border: '1px solid rgba(0, 229, 255, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <School size={24} color="#00e5ff" />
              </div>
              <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '10px', fontWeight: 800 }}>
                ¿Deseas solicitar este taller para tu Unidad Educativa?
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto' }}>
                Coordina con el equipo docente de <strong>Pequeños Científicos</strong> y la <strong>Universidad Politécnica Salesiana</strong> la apertura de talleres presenciales o virtuales en tu institución o colegio.
              </p>
            </div>

            {solicitudEnviada ? (
              <div style={{
                padding: '24px',
                borderRadius: '16px',
                background: 'rgba(0, 230, 118, 0.12)',
                border: '1px solid rgba(0, 230, 118, 0.3)',
                color: '#00e676',
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: 700
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
                <div style={{ fontSize: '1.2rem', marginBottom: '6px' }}>¡Solicitud Institucional Recibida!</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 400 }}>
                  Nos pondremos en contacto con los datos proporcionados para coordinar fechas, requisitos y detalles pedagógicos con la UPS.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitSolicitud} style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                    Institución o Unidad Educativa *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      placeholder="Ej: Unidad Educativa Salesiana..."
                      value={formData.institucion}
                      onChange={(e) => setFormData({ ...formData, institucion: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#090d16',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                    Nombre del Docente o Representante
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ej: Lic. Carlos Gómez"
                    value={formData.contacto}
                    onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: '#090d16',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                    Correo Electrónico Institucional *
                  </label>
                  <input 
                    type="email" 
                    placeholder="contacto@colegio.edu.ec"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: '#090d16',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                    Teléfono / WhatsApp de Contacto
                  </label>
                  <input 
                    type="tel" 
                    placeholder="Ej: 0991234567"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: '#090d16',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                    Taller o Módulo de Interés
                  </label>
                  <select
                    value={formData.tallerInteres}
                    onChange={(e) => setFormData({ ...formData, tallerInteres: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: '#090d16',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Ambos Programas (Ciencias Tecnológicas & Robótica)">Ambos Programas (Ciencias Tecnológicas & Robótica VEX IQ)</option>
                    <option value="Ciencias Tecnológicas (4 Mundos: Eléctrico, Magnético, Digital, Robótico)">Ciencias Tecnológicas (4 Mundos: Eléctrico, Magnético, Digital, Robótico)</option>
                    <option value="Taller de Robótica con VEX IQ">Taller de Robótica con VEX IQ</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '12px' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary tactile-btn"
                    style={{
                      padding: '14px 32px',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
                    }}
                  >
                    <Send size={18} />
                    <span>Enviar Solicitud Institucional</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
