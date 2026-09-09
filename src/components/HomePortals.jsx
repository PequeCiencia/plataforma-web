// HomePortals.jsx - Portales principales con arte 2D oficial
import React from 'react';
import { useData } from '../context/DataContext';
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
  Users
} from 'lucide-react';

export default function HomePortals({ onNavigate }) {
  const { personajes } = useData();

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
                alt="Talleres con Simio Tech" 
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

              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px'
              }}>
                <span className="badge badge-orange">
                  Robótica & Código
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

              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px'
              }}>
                <span className="badge badge-cyan">
                  Química & Física
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
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: 'auto' }}
              >
                <span>Abrir Laboratorio</span>
                <ArrowRight size={16} />
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
                <span className="badge badge-magenta">
                  Kits Oficiales
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
                TIENDA
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
                Kits de experimentación física y robótica certificados por la UPS con <strong>Magno</strong> para colegios y familias.
              </p>

              <button 
                className="btn btn-magenta" 
                style={{ width: '100%', marginTop: 'auto' }}
              >
                <span>Ver Catálogo de Kits</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* SECCIÓN: EL ESCUADRÓN CIENTÍFICO */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '48px 32px',
          marginBottom: '80px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>
              Personajes Originales
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '10px' }}>
              Conoce al Escuadrón Científico
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              Nuestros personajes guían a los estudiantes en cada etapa del aprendizaje, desde el método científico hasta la construcción de robots.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px'
          }}>
            {personajes.map((p) => (
              <div 
                key={p.id}
                style={{
                  background: 'rgba(17, 24, 39, 0.8)',
                  border: `1px solid ${p.color}33`,
                  borderRadius: '18px',
                  padding: '20px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = p.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${p.color}33`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  margin: '0 auto 16px',
                  border: `2px solid ${p.color}`,
                  boxShadow: `0 0 15px ${p.color}35`,
                  background: '#071322',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px'
                }}>
                  <img 
                    src={p.avatarImg} 
                    alt={p.nombre} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '4px' }}>{p.nombre}</h3>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: p.color,
                  marginBottom: '10px',
                  textTransform: 'uppercase'
                }}>
                  {p.badge}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {p.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BENEFICIOS PARA INSTITUCIONES EDUCATIVAS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(0, 229, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00e5ff',
              marginBottom: '20px'
            }}>
              <GraduationCap size={26} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '12px' }}>
              Para Docentes y Escuelas
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Diseñado para ser proyectado directamente en proyectores y pizarras digitales escolares. Incluye cronómetros en vivo, materiales sencillos y preguntas guiadas.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(255, 153, 0, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff9900',
              marginBottom: '20px'
            }}>
              <Cpu size={26} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '12px' }}>
              Metodología STEM Práctica
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Cada módulo combina ciencia teórica con construcción de prototipos tangibles y programación para resolver problemas de la vida real.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(0, 230, 118, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00e676',
              marginBottom: '20px'
            }}>
              <Award size={26} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '12px' }}>
              Aval Universitario UPS
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Respaldado por el cuerpo docente e investigadores de la Universidad Politécnica Salesiana - Sede Cuenca con más de 10 años de experiencia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
