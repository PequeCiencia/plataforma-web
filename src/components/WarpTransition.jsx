// WarpTransition.jsx - Animación de Salto Hiperespacial hacia la Nave Espacial
import React, { useEffect, useState } from 'react';

export default function WarpTransition({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Secuencia de animación
    const t1 = setTimeout(() => setStage(1), 300); // Aceleración de estrellas
    const t2 = setTimeout(() => setStage(2), 1200); // Salto warp / flash
    const t3 = setTimeout(() => {
      setStage(3);
      if (onComplete) onComplete();
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: '#030712',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Efecto de líneas de velocidad / Estrellas Warp */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: stage >= 1 
          ? 'radial-gradient(circle at center, transparent 0%, rgba(0, 229, 255, 0.4) 60%, rgba(3, 7, 18, 0.95) 100%)' 
          : 'transparent',
        transition: 'all 0.6s ease'
      }} />

      {/* Líneas de hiperespacio radiales */}
      <svg 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: stage >= 1 ? (stage === 2 ? 1 : 0.8) : 0.2,
          transform: stage >= 1 ? 'scale(1.4)' : 'scale(0.8)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        viewBox="0 0 1000 1000"
      >
        <circle cx="500" cy="500" r="100" stroke="#00e5ff" strokeWidth="2" fill="none" opacity="0.4" />
        <circle cx="500" cy="500" r="250" stroke="#00e5ff" strokeWidth="3" fill="none" opacity="0.3" strokeDasharray="10 15" />
        <circle cx="500" cy="500" r="420" stroke="#ff007f" strokeWidth="2" fill="none" opacity="0.2" />
        
        {/* Rayos de velocidad */}
        {[...Array(24)].map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const x1 = 500 + Math.cos(rad) * 60;
          const y1 = 500 + Math.sin(rad) * 60;
          const x2 = 500 + Math.cos(rad) * 500;
          const y2 = 500 + Math.sin(rad) * 500;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 2 === 0 ? '#00e5ff' : '#ff9900'}
              strokeWidth={stage === 2 ? 4 : 2}
              strokeOpacity={stage >= 1 ? 0.75 : 0.1}
            />
          );
        })}
      </svg>

      {/* Flash Central de Salto */}
      {stage === 2 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.95) 0%, rgba(0, 229, 255, 0.6) 40%, transparent 80%)',
          animation: 'fadeIn 0.2s ease-out'
        }} />
      )}

      {/* Indicador HUD de Cabina */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        background: 'rgba(7, 19, 34, 0.85)',
        border: '1px solid rgba(0, 229, 255, 0.5)',
        padding: '24px 40px',
        borderRadius: '20px',
        boxShadow: '0 0 40px rgba(0, 229, 255, 0.4)',
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#00e5ff',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}>
          SISTEMA DE NAVEGACIÓN · UPS CUENCA
        </div>
        <div style={{
          fontSize: '1.6rem',
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          marginBottom: '12px'
        }}>
          {stage < 2 ? 'Iniciando Salto a la Cabina...' : '¡Acoplamiento en Órbita Exitoso!'}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.85rem',
          color: '#00e676',
          fontWeight: 700
        }}>
          <span className="pulse-dot" style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#00e676'
          }} />
          <span>CABINA DE MISIONES ACTIVA</span>
        </div>
      </div>
    </div>
  );
}
