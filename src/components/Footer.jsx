// Footer.jsx - Pie de página institucional UPS
import React from 'react';
import { Phone, Mail, Globe, MapPin, Sparkles, BookOpen } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{
      backgroundColor: '#070a12',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      marginTop: '80px',
      padding: '48px 0 24px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '36px',
          marginBottom: '40px'
        }}>
          {/* Columna 1: Info Institucional */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '14px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00e5ff, #0070f3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} color="#ffffff" />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>Pequeños Científicos</h3>
            </div>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              marginBottom: '16px'
            }}>
              Iniciativa educativa y de vinculación con la sociedad de la <strong>Universidad Politécnica Salesiana (Sede Cuenca)</strong> para inspirar a niños y jóvenes en ciencia, tecnología, ingeniería y robótica.
            </p>
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '6px',
              background: 'rgba(0, 229, 255, 0.08)',
              color: '#00e5ff',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              Sede Cuenca • Ecuador
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              color: '#ffffff',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Portales Educativos
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button 
                  onClick={() => onNavigate('talleres')}
                  style={{ background: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ff9900'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  🚀 Talleres Activos & Robótica
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('experimentos')}
                  style={{ background: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#00e5ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  🧪 Laboratorio & Experimentos de Aula
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tienda')}
                  style={{ background: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ff007f'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  🛍️ Tienda de Kits de Ciencia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('personajes')}
                  style={{ background: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#00e676'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  🤖 El Escuadrón Científico
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto y Enlaces Oficiales */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              color: '#ffffff',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Contacto Institucional
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#00e5ff" />
                <span>(+593) 74133250 Ext. 1261</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#00e5ff" />
                <span>pequeciencia@ups.edu.ec</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Globe size={16} color="#00e5ff" />
                <span>www.ups.edu.ec</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="#00e5ff" />
                <span>Calle Vieja 12-30 y Elia Liut, Cuenca</span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea Divisoria y Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2015 - 2026 <strong>Universidad Politécnica Salesiana</strong> - Pequeños Científicos. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Términos de Servicio</span>
            <span>Privacidad y Protección Escolar</span>
            <span>Soporte Técnico</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
