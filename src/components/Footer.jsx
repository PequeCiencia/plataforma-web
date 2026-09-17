// Footer.jsx - Pie de página institucional UPS
import React from 'react';
import { Phone, Mail, Globe, MapPin, Sparkles, BookOpen, ExternalLink } from 'lucide-react';

const FacebookIcon = ({ size = 16, color = '#1877f2' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 16, color = '#e1306c' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

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
          {/* Columna 1: Logos e Identidad Institucional */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
              flexWrap: 'wrap'
            }}>
              <a
                href="https://www.ups.edu.ec"
                target="_blank"
                rel="noopener noreferrer"
                title="Visitar Portal de la Universidad Politécnica Salesiana"
                style={{
                  background: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '10px',
                  border: '1.5px solid #00509d',
                  height: '40px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 80, 157, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img src="./assets/images/logo_ups.png" alt="UPS" style={{ maxHeight: '28px', width: 'auto' }} />
              </a>

              <div style={{
                background: '#ffffff',
                padding: '2px 8px',
                borderRadius: '10px',
                border: '1.5px solid #ff7b00',
                height: '40px',
                display: 'inline-flex',
                alignItems: 'center'
              }}>
                <img src="./assets/images/logo_pequenos_cientificos.png" alt="Pequeños Científicos" style={{ maxHeight: '32px', width: 'auto' }} />
              </div>
            </div>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.88rem',
              lineHeight: 1.6,
              marginBottom: '16px'
            }}>
              Plataforma digital interactiva de ciencias y robótica avalada por la <strong>Universidad Politécnica Salesiana</strong> para inspirar y formar a niños y jóvenes en áreas STEAM en el Ecuador.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <a
                href="https://www.ups.edu.ec"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'rgba(0, 229, 255, 0.08)',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  color: '#00e5ff',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 229, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 229, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 229, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>www.ups.edu.ec</span>
                <ExternalLink size={13} />
              </a>

              <span style={{
                padding: '5px 10px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#94a3b8',
                fontSize: '0.78rem',
                fontWeight: 600
              }}>
                Cuenca · Ecuador
              </span>
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
                  onClick={() => onNavigate('simulaciones')}
                  style={{ background: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  🪐 Rover 3D & Simulaciones STEAM
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tienda')}
                  style={{ background: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ff007f'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  🛍️ Tienda de Kits de Ciencia (Próximamente)
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
                <span>(+593) 7 4135250 Ext: 1261</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#00e5ff" />
                <a 
                  href="mailto:pequeciencia@ups.edu.ec" 
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#00e5ff'; e.currentTarget.style.textShadow = '0 0 8px rgba(0,229,255,0.6)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.textShadow = 'none'; }}
                >
                  pequeciencia@ups.edu.ec
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FacebookIcon size={16} color="#1877f2" />
                <a
                  href="https://www.facebook.com/PequeCienciaUPS"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s', fontWeight: 600 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#1877f2'; e.currentTarget.style.textShadow = '0 0 10px rgba(24,119,242,0.8)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.textShadow = 'none'; }}
                >
                  Pequeciencia UPS
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <InstagramIcon size={16} color="#e1306c" />
                <a
                  href="https://www.instagram.com/pequecienciaups/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s', fontWeight: 600 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#e1306c'; e.currentTarget.style.textShadow = '0 0 10px rgba(225,48,108,0.8)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.textShadow = 'none'; }}
                >
                  @pequecienciaups
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="#00e5ff" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>Edificio de la Parroquia Maria Auxiliadora, Vega Muñoz 10-08 y Padre Aguirre, Segundo piso. Cuenca, Ecuador</span>
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
