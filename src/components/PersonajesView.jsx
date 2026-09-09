// PersonajesView.jsx - Galería oficial de Personajes 2D del Escuadrón Pequeños Científicos
import React from 'react';
import { useData } from '../context/DataContext';
import { Sparkles, ArrowLeft, Award, Shield, Zap, Compass } from 'lucide-react';

export default function PersonajesView({ onBack, onNavigate }) {
  const { personajes } = useData();

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Encabezado */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
          <button 
            onClick={onBack}
            className="btn btn-outline"
            style={{ marginBottom: '20px', padding: '6px 16px', fontSize: '0.82rem' }}
          >
            <ArrowLeft size={14} />
            <span>Volver a Inicio</span>
          </button>
          
          <div style={{ display: 'block' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '14px' }}>
              Identidad 2D Oficial UPS
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
            color: '#ffffff',
            marginBottom: '14px',
            letterSpacing: '-0.02em'
          }}>
            El Escuadrón Científico
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Conoce a los mentores espaciales que acompañan a cada estudiante e institución en su viaje de descubrimiento.
          </p>
        </div>

        {/* Grid Detallado de Personajes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '28px'
        }}>
          {personajes.map((p) => (
            <div
              key={p.id}
              className="glass-panel"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                border: `1px solid ${p.color}40`,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = p.color;
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 15px 35px ${p.color}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${p.color}40`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ height: '240px', position: 'relative', overflow: 'hidden', background: '#071322', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                <img 
                  src={p.avatarImg} 
                  alt={p.nombre} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 5%, transparent 60%)'
                }} />
                <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(9, 13, 22, 0.85)',
                    border: `1px solid ${p.color}`,
                    color: p.color,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}>
                    {p.badge}
                  </span>
                </div>
              </div>

              <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '6px' }}>
                  {p.nombre}
                </h3>
                <div style={{ fontSize: '0.85rem', color: p.color, fontWeight: 700, marginBottom: '14px' }}>
                  {p.rol}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>
                  {p.descripcion}
                </p>

                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Avalado por UPS Cuenca
                  </span>
                  <button
                    onClick={() => {
                      if (p.id === 'astro') onNavigate('talleres');
                      else if (p.id === 'electra') onNavigate('experimentos');
                      else if (p.id === 'magno') onNavigate('tienda');
                      else if (p.id === 'cosmo') onNavigate('experimentos');
                      else onNavigate('talleres');
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: `${p.color}20`,
                      border: `1px solid ${p.color}50`,
                      color: p.color,
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    Ver Actividades
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
