// HomePortals.jsx - Portales principales con arte 2D oficial
import React from 'react';
import { 
  Wrench, 
  FlaskConical, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Award, 
  Cpu, 
  CheckCircle,
  Users,
  Bot,
  ExternalLink,
  ShieldCheck,
  Building2,
  Globe
} from 'lucide-react';

export default function HomePortals({ onNavigate }) {

  return (
    <div style={{ padding: '32px 0 60px' }}>
      <div className="container">
        {/* Banner Superior Hero */}
        <div style={{
          textAlign: 'center',
          maxWidth: '860px',
          margin: '0 auto 48px',
          padding: '0 16px'
        }}>
          {/* Emblema Oficial Pequeños Científicos */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0, 229, 255, 0.25)',
              border: '2px solid rgba(0, 229, 255, 0.4)',
              background: '#071322'
            }}>
              <img 
                src="./assets/images/emblema_oficial.jpg" 
                alt="Emblema Oficial Pequeños Científicos" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 229, 255, 0.12)',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            padding: '6px 16px',
            borderRadius: '9999px',
            color: '#00e5ff',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '20px'
          }}>
            <Sparkles size={14} />
            <span>Universidad Politécnica Salesiana • Sede Cuenca</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#ffffff',
            marginBottom: '18px',
            letterSpacing: '-0.03em'
          }}>
            Despierta el genio científico en cada estudiante
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '28px'
          }}>
            Plataforma oficial de <strong>Pequeños Científicos (UPS Cuenca)</strong> para instituciones educativas. Accede a talleres de robótica, guías de experimentos interactivos y kits didácticos diseñados para el aula.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => onNavigate('nave')}
              className="btn btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '1.05rem',
                background: 'linear-gradient(135deg, #00e5ff 0%, #0070f3 100%)',
                boxShadow: '0 0 25px rgba(0, 229, 255, 0.45)'
              }}
            >
              <Sparkles size={18} />
              <span>🚀 Entrar a Cabina de Misión</span>
            </button>
            <button
              onClick={() => onNavigate('talleres')}
              className="btn btn-orange"
              style={{ padding: '14px 28px', fontSize: '1rem' }}
            >
              <Wrench size={18} />
              <span>Ver Talleres Activos</span>
            </button>
            <button
              onClick={() => onNavigate('experimentos')}
              className="btn btn-outline"
              style={{ padding: '14px 28px', fontSize: '1rem' }}
            >
              <FlaskConical size={18} />
              <span>Laboratorio Escolar</span>
            </button>
            <button
              onClick={() => onNavigate('simulaciones')}
              className="btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                fontSize: '1rem',
                borderRadius: '12px',
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1.5px solid #38bdf8',
                color: '#38bdf8',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.25)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Bot size={18} />
              <span>🪐 Rover 3D & Proyectos</span>
            </button>
          </div>
        </div>

        {/* LOS 3 PORTALES GIGANTES (MÁSCARA PRINCIPAL) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          marginBottom: '80px'
        }}>
          {/* PORTAL 1: TALLERES (Simio Tech) */}
          <div 
            onClick={() => onNavigate('talleres')}
            className="glass-panel"
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(255, 153, 0, 0.25)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = '#ff9900';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 153, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 153, 0, 0.25)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'relative',
              height: '420px',
              overflow: 'hidden',
              backgroundColor: '#071322'
            }}>
              <img 
                src="./assets/images/talleres_portal.jpg" 
                alt="Talleres con Astro" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  transition: 'transform 0.5s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7, 19, 34, 0.98) 12%, rgba(7, 19, 34, 0.3) 55%, transparent 100%)'
              }} />
            </div>

            <div style={{
              padding: '24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '0.05em',
                marginBottom: '8px'
              }}>
                TALLERES
              </h2>

              <div style={{
                width: '40px',
                height: '4px',
                backgroundColor: '#ff9900',
                borderRadius: '2px',
                marginBottom: '12px'
              }} />

              <div style={{
                color: '#ff9900',
                marginBottom: '14px'
              }}>
                <Wrench size={22} />
              </div>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.92rem',
                lineHeight: 1.5,
                marginBottom: '20px'
              }}>
                Entrenamiento modular en electrónica, magnetismo, energías limpias y robótica avanzada con <strong>Astro</strong>.
              </p>

              <button 
                className="btn btn-orange" 
                style={{ width: '100%', marginTop: 'auto' }}
              >
                <span>Explorar Talleres</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* PORTAL 2: EXPERIMENTOS (Dra. Electra) */}
          <div 
            onClick={() => onNavigate('experimentos')}
            className="glass-panel"
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(0, 229, 255, 0.25)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = '#00e5ff';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 229, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.25)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'relative',
              height: '420px',
              overflow: 'hidden',
              backgroundColor: '#071322'
            }}>
              <img 
                src="./assets/images/experimentos_portal.jpg" 
                alt="Experimentos con Dra. Electra" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 10%',
                  transition: 'transform 0.5s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7, 19, 34, 0.98) 12%, rgba(7, 19, 34, 0.3) 55%, transparent 100%)'
              }} />
            </div>

            <div style={{
              padding: '24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '0.05em',
                marginBottom: '8px'
              }}>
                EXPERIMENTOS
              </h2>

              <div style={{
                width: '40px',
                height: '4px',
                backgroundColor: '#00e5ff',
                borderRadius: '2px',
                marginBottom: '12px'
              }} />

              <div style={{
                color: '#00e5ff',
                marginBottom: '14px'
              }}>
                <FlaskConical size={22} />
              </div>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.92rem',
                lineHeight: 1.5,
                marginBottom: '20px'
              }}>
                Guías interactivas paso a paso con la <strong>Dra. Electra</strong>. Listas de materiales, hipótesis y conceptos listos para el aula.
              </p>

              <button 
                className="btn btn-primary tactile-btn" 
                style={{
                  width: '100%',
                  marginTop: 'auto',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontWeight: 900,
                  fontSize: '0.95rem'
                }}
              >
                <span>Abrir Laboratorio</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* PORTAL 3: TIENDA (Magno) */}
          <div 
            onClick={() => onNavigate('tienda')}
            className="glass-panel"
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(255, 0, 127, 0.25)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = '#ff007f';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 0, 127, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 0, 127, 0.25)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'relative',
              height: '420px',
              overflow: 'hidden',
              backgroundColor: '#071322'
            }}>
              <img 
                src="./assets/images/tienda_portal.jpg" 
                alt="Tienda con Magno" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 10%',
                  transition: 'transform 0.5s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7, 19, 34, 0.98) 12%, rgba(7, 19, 34, 0.3) 55%, transparent 100%)'
              }} />

              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px'
              }}>
                <span className="badge badge-magenta" style={{ background: 'rgba(255, 0, 127, 0.25)', border: '1.5px solid #ff007f', color: '#ff77c6', fontWeight: 900, letterSpacing: '0.04em' }}>
                  🚀 PRÓXIMO LANZAMIENTO
                </span>
              </div>
            </div>

            <div style={{
              padding: '24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '0.05em',
                marginBottom: '8px'
              }}>
                TIENDA DE KITS
              </h2>

              <div style={{
                width: '40px',
                height: '4px',
                backgroundColor: '#ff007f',
                borderRadius: '2px',
                marginBottom: '12px'
              }} />

              <div style={{
                color: '#ff007f',
                marginBottom: '14px'
              }}>
                <ShoppingBag size={22} />
              </div>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.92rem',
                lineHeight: 1.5,
                marginBottom: '20px'
              }}>
                Kits de experimentación física y robótica certificados por la UPS con <strong>Magno</strong> para colegios y familias. Próximamente disponible para pedidos institucionales.
              </p>

              <button 
                className="btn btn-magenta tactile-btn" 
                style={{
                  width: '100%',
                  marginTop: 'auto',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Ver Próximos Kits (Próximamente)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* SECCIÓN: ALIANZA ACADÉMICA & RESPALDOS INSTITUCIONALES */}
        <div style={{
          marginBottom: '56px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>
              Alianza Académica & Vinculación
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: '#ffffff', fontWeight: 900, marginBottom: '10px' }}>
              Respaldado por la Excelencia Universitaria
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '0.96rem', lineHeight: 1.6 }}>
              Una sinergia educativa entre el proyecto <strong>Pequeños Científicos</strong> y la <strong>Universidad Politécnica Salesiana</strong> para democratizar la ciencia, tecnología e ingeniería en la juventud ecuatoriana.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px'
          }}>
            {/* CARD 1: PEQUEÑOS CIENTÍFICOS */}
            <div className="glass-panel" style={{
              borderRadius: '24px',
              padding: '36px',
              border: '1.5px solid rgba(251, 133, 0, 0.35)',
              background: 'linear-gradient(145deg, rgba(251, 133, 0, 0.08) 0%, rgba(8, 22, 42, 0.95) 100%)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(251, 133, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#fb8500';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(251, 133, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(251, 133, 0, 0.35)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(251, 133, 0, 0.1)';
            }}
            >
              {/* Header con Logo Oficial Pequeños Científicos */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '20px' }}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '8px 16px',
                  border: '2px solid #ff7b00',
                  boxShadow: '0 8px 20px rgba(255, 123, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '66px',
                  flexShrink: 0
                }}>
                  <img 
                    src="./assets/images/logo_pequenos_cientificos.png" 
                    alt="Pequeños Científicos" 
                    style={{ maxHeight: '48px', width: 'auto', objectFit: 'contain' }} 
                  />
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#fb8500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Iniciativa STEAM Oficial
                  </div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                    Pequeños Científicos
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Vinculación con la Sociedad · Sede Cuenca
                  </span>
                </div>
              </div>

              <p style={{
                color: '#cbd5e1',
                fontSize: '0.94rem',
                lineHeight: 1.65,
                marginBottom: '22px',
                flexGrow: 1
              }}>
                Proyecto pedagógico y formativo de la Universidad Politécnica Salesiana dedicado a despertar la curiosidad y el ingenio en niños y jóvenes mediante talleres de ciencias, laboratorios multimedia guiados y robótica tangible orientada a la resolución de retos del mundo real.
              </p>

              {/* Píldoras de Valor */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '22px',
                background: 'rgba(0, 15, 30, 0.5)',
                padding: '14px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#f8fafc' }}>
                  <Sparkles size={16} color="#fb8500" />
                  <span>Método Científico Activo</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#f8fafc' }}>
                  <Cpu size={16} color="#00e5ff" />
                  <span>Robótica Educativa</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#f8fafc' }}>
                  <FlaskConical size={16} color="#ff007f" />
                  <span>Laboratorios Escolares</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#f8fafc' }}>
                  <Award size={16} color="#00e676" />
                  <span>Acompañamiento Docente</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '16px'
              }}>
                <span style={{ fontSize: '0.82rem', color: '#fb8500', fontWeight: 800 }}>
                  Cuenca · Ecuador
                </span>
                <button
                  onClick={() => onNavigate('talleres')}
                  style={{
                    background: 'rgba(251, 133, 0, 0.15)',
                    border: '1.5px solid #fb8500',
                    color: '#ffb703',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(251, 133, 0, 0.3)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(251, 133, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(251, 133, 0, 0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span>Explorar Talleres</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* CARD 2: UNIVERSIDAD POLITÉCNICA SALESIANA (UPS) - ENLACE OFICIAL A www.ups.edu.ec */}
            <a
              href="https://www.ups.edu.ec"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel"
              style={{
                borderRadius: '24px',
                padding: '36px',
                border: '1.5px solid rgba(0, 229, 255, 0.35)',
                background: 'linear-gradient(145deg, rgba(0, 112, 243, 0.12) 0%, rgba(8, 22, 42, 0.95) 100%)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                textDecoration: 'none',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 229, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00e5ff';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 229, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.35)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 229, 255, 0.1)';
              }}
            >
              {/* Header con Logo UPS Oficial */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '20px' }}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '8px 18px',
                  border: '2px solid #00509d',
                  boxShadow: '0 8px 20px rgba(0, 80, 157, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '66px',
                  flexShrink: 0
                }}>
                  <img 
                    src="./assets/images/logo_ups.png" 
                    alt="Universidad Politécnica Salesiana" 
                    style={{ maxHeight: '44px', width: 'auto', objectFit: 'contain' }} 
                  />
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Aval Universitario & Rigor Técnico
                  </div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                    Universidad Politécnica Salesiana
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Acreditación Institucional · Ecuador
                  </span>
                </div>
              </div>

              <p style={{
                color: '#cbd5e1',
                fontSize: '0.94rem',
                lineHeight: 1.65,
                marginBottom: '22px',
                flexGrow: 1
              }}>
                Institución de educación superior líder en carreras de ingeniería, biotecnología e innovación en el Ecuador. Su comunidad académica respalda cada módulo de la plataforma, garantizando pertinencia curricular, seguridad y excelencia formativa.
              </p>

              {/* Píldoras de Acreditación */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '22px',
                background: 'rgba(0, 15, 30, 0.5)',
                padding: '14px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#f8fafc' }}>
                  <GraduationCap size={16} color="#00e5ff" />
                  <span>Carreras de Ingeniería UPS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#f8fafc' }}>
                  <ShieldCheck size={16} color="#00e676" />
                  <span>Seguridad Pedagógica</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#f8fafc' }}>
                  <Building2 size={16} color="#38bdf8" />
                  <span>Cuenca · Quito · Guayaquil</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#f8fafc' }}>
                  <Globe size={16} color="#ffc936" />
                  <span>Red Salesiana Mundial</span>
                </div>
              </div>

              {/* Botón CTA oficial que indica que envía a www.ups.edu.ec */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '16px'
              }}>
                <span style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 800 }}>
                  www.ups.edu.ec
                </span>
                <div style={{
                  background: 'linear-gradient(135deg, #00e5ff 0%, #0070f3 100%)',
                  color: '#030812',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)'
                }}>
                  <span>Visitar Portal UPS</span>
                  <ExternalLink size={15} />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* PILARES METODOLÓGICOS Y BENEFICIOS PARA DOCENTES (REDISEÑO MEJORADO) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          <div className="glass-panel" style={{
            padding: '30px',
            borderRadius: '20px',
            border: '1.5px solid rgba(0, 229, 255, 0.25)',
            background: 'linear-gradient(145deg, rgba(0, 229, 255, 0.05) 0%, rgba(8, 22, 42, 0.85) 100%)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(0, 229, 255, 0.15)',
              border: '1.5px solid #00e5ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00e5ff',
              marginBottom: '18px',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
            }}>
              <GraduationCap size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800, marginBottom: '10px' }}>
              Para Docentes y Escuelas
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Diseñado para proyectarse en aulas y pizarras interactivas. Incluye guías estructuradas, cronómetros en vivo, listas de materiales caseros y preguntas orientadoras.
            </p>
          </div>

          <div className="glass-panel" style={{
            padding: '30px',
            borderRadius: '20px',
            border: '1.5px solid rgba(255, 153, 0, 0.25)',
            background: 'linear-gradient(145deg, rgba(255, 153, 0, 0.05) 0%, rgba(8, 22, 42, 0.85) 100%)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(255, 153, 0, 0.15)',
              border: '1.5px solid #ff9900',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff9900',
              marginBottom: '18px',
              boxShadow: '0 0 20px rgba(255, 153, 0, 0.3)'
            }}>
              <Cpu size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800, marginBottom: '10px' }}>
              Metodología STEAM Activa
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Cada módulo combina teoría científica rigurosa con construcción tangible, prototipado 3D interactivo y programación para resolver retos reales de la ciencia.
            </p>
          </div>

          <div className="glass-panel" style={{
            padding: '30px',
            borderRadius: '20px',
            border: '1.5px solid rgba(0, 230, 118, 0.25)',
            background: 'linear-gradient(145deg, rgba(0, 230, 118, 0.05) 0%, rgba(8, 22, 42, 0.85) 100%)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(0, 230, 118, 0.15)',
              border: '1.5px solid #00e676',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00e676',
              marginBottom: '18px',
              boxShadow: '0 0 20px rgba(0, 230, 118, 0.3)'
            }}>
              <Award size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800, marginBottom: '10px' }}>
              Certificación & Aval UPS
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Respaldado por el cuerpo docente e investigadores de la Universidad Politécnica Salesiana con amplia trayectoria en laboratorios, proyectos de vinculación y pedagogía.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
