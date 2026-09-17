// TiendaView.jsx - Tienda Oficial de Kits Educativos UPS (Próximo Lanzamiento)
import React, { useState } from 'react';
import { 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Bell, 
  Send, 
  Package, 
  Check, 
  Flame, 
  HelpCircle,
  Award
} from 'lucide-react';

export default function TiendaView() {
  const [registroEnviado, setRegistroEnviado] = useState(false);
  const [registroForm, setRegistroForm] = useState({
    nombre: '',
    institucion: '',
    email: '',
    telefono: '',
    ciudad: 'Cuenca'
  });

  const handleEnviarRegistro = (e) => {
    e.preventDefault();
    if (!registroForm.email || !registroForm.nombre) return;
    setRegistroEnviado(true);
    setTimeout(() => {
      setRegistroEnviado(false);
      setRegistroForm({
        nombre: '',
        institucion: '',
        email: '',
        telefono: '',
        ciudad: 'Cuenca'
      });
    }, 4500);
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '1280px' }}>

        {/* HERO BANNER PRINCIPAL DE PRÓXIMO LANZAMIENTO */}
        <div className="glass-panel" style={{
          borderRadius: '28px',
          overflow: 'hidden',
          border: '1.5px solid rgba(255, 0, 127, 0.4)',
          marginBottom: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '36px',
          padding: '40px',
          background: 'linear-gradient(135deg, rgba(255, 0, 127, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 0, 127, 0.15)'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(255, 0, 127, 0.2)',
                border: '1px solid #ff007f',
                color: '#ff77c6',
                fontSize: '0.78rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                <Clock size={14} />
                <span>PRÓXIMO LANZAMIENTO OFICIAL</span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(0, 229, 255, 0.12)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                color: '#00e5ff',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                <Sparkles size={14} />
                <span>Kits Certificados UPS</span>
              </div>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '18px',
              letterSpacing: '-0.02em',
              fontWeight: 900
            }}>
              Tienda Oficial de Kits • <span style={{ color: '#ff007f' }}>Próximamente</span>
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '28px' }}>
              Los kits didácticos físicos certificados por la <strong>Universidad Politécnica Salesiana</strong> y <strong>Pequeños Científicos</strong> se encuentran en fase de calibración pedagógica, pruebas de laboratorio y empaquetado seguro.
              <br /><br />
              Muy pronto se abrirá la distribución oficial para escuelas, talleres y familias con instrumental no tóxico y guías curriculares alineadas a la plataforma.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => {
                  const el = document.getElementById('registro-interes');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-magenta"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.95rem' }}
              >
                <Bell size={16} />
                <span>Registrar Interés Institucional</span>
              </button>
            </div>
          </div>

          {/* Imagen de Magno y Tienda */}
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative',
            minHeight: '320px',
            height: '100%',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7)',
            border: '1.5px solid rgba(255, 0, 127, 0.3)'
          }}>
            <img 
              src="./assets/images/tienda_portal.jpg" 
              alt="Magno - Tienda de Kits" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(9, 13, 22, 0.92) 0%, rgba(9, 13, 22, 0.2) 65%, transparent 100%)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              insetInline: 0,
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.82rem',
              color: '#ff77c6',
              fontWeight: 800
            }}>
              <span>🛡️ CALIDAD PEDAGÓGICA UPS</span>
              <span>MAGNO • KITS EN DESARROLLO</span>
            </div>
          </div>
        </div>

        {/* CRONOGRAMA / ESTADO DE CALIBRACIÓN */}
        <div className="glass-panel" style={{
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '40px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(8, 22, 42, 0.7)'
        }}>
          <h2 style={{ fontSize: '1.3rem', color: '#ffffff', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Package size={20} color="#00e5ff" />
            <span>Fases de Preparación para el Lanzamiento</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1.5px solid #10b981',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#34d399', textTransform: 'uppercase' }}>Fase 1</span>
                <span style={{ background: '#10b981', color: '#030812', fontSize: '0.68rem', fontWeight: 900, padding: '2px 8px', borderRadius: '10px' }}>COMPLETADA</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '6px' }}>Validación Curricular UPS</h3>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Alineación temática con los talleres formativos de ciencias y robótica de la Universidad Politécnica Salesiana.
              </p>
            </div>

            <div style={{
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1.5px solid #00e5ff',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#00e5ff', textTransform: 'uppercase' }}>Fase 2</span>
                <span style={{ background: '#00e5ff', color: '#030812', fontSize: '0.68rem', fontWeight: 900, padding: '2px 8px', borderRadius: '10px' }}>EN PROCESO</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '6px' }}>Calibración & Seguridad</h3>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Pruebas de insumos no tóxicos, componentes electromecánicos y manuales paso a paso para uso escolar y doméstico.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 0, 127, 0.08)',
              border: '1.5px solid #ff007f',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#ff77c6', textTransform: 'uppercase' }}>Fase 3</span>
                <span style={{ background: '#ff007f', color: '#ffffff', fontSize: '0.68rem', fontWeight: 900, padding: '2px 8px', borderRadius: '10px' }}>PRÓXIMAMENTE</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '6px' }}>Publicación & Distribución</h3>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Apertura pública del catálogo oficial y despacho institucional de pedidos para colegios y familias.
              </p>
            </div>
          </div>
        </div>

        {/* REGISTRO DE INTERÉS / PREVENTA INSTITUCIONAL */}
        <div id="registro-interes" className="glass-panel" style={{
          borderRadius: '24px',
          padding: '36px',
          marginBottom: '40px',
          border: '1.5px solid rgba(0, 229, 255, 0.3)',
          background: 'linear-gradient(135deg, rgba(8, 22, 42, 0.95) 0%, rgba(4, 11, 23, 0.95) 100%)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(0, 229, 255, 0.15)',
              color: '#00e5ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bell size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#00e5ff', fontWeight: 900, textTransform: 'uppercase' }}>
                Lista de Notificación Prioritaria
              </span>
              <h2 style={{ fontSize: '1.45rem', color: '#ffffff', fontWeight: 900, margin: 0 }}>
                ¿Deseas kits para tu Institución Educativa o Familia?
              </h2>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '26px' }}>
            Déjanos tus datos de contacto para ser el primero en recibir el catálogo definitivo y acceder a condiciones especiales de preventa cuando se abran los despachos oficiales.
          </p>

          {registroEnviado ? (
            <div style={{
              padding: '24px',
              borderRadius: '16px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1.5px solid #10b981',
              color: '#6ee7b7',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontWeight: 800
            }}>
              <CheckCircle2 size={32} color="#10b981" />
              <div>
                <div style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '4px' }}>
                  ¡Registro Recibido con Éxito!
                </div>
                <div style={{ fontSize: '0.9rem' }}>
                  Tu institución ha quedado registrada en la lista de espera prioritaria para el lanzamiento oficial de los kits didácticos.
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEnviarRegistro} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '18px',
              alignItems: 'flex-end'
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700, marginBottom: '6px' }}>
                  Nombre del Contacto / Docente *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ing. Carlos Morales"
                  value={registroForm.nombre}
                  onChange={(e) => setRegistroForm({ ...registroForm, nombre: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: '#071322',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700, marginBottom: '6px' }}>
                  Institución / Colegio o Particular
                </label>
                <input
                  type="text"
                  placeholder="Ej. Unidad Educativa Salesiana"
                  value={registroForm.institucion}
                  onChange={(e) => setRegistroForm({ ...registroForm, institucion: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: '#071322',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700, marginBottom: '6px' }}>
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  placeholder="docente@colegio.edu.ec"
                  value={registroForm.email}
                  onChange={(e) => setRegistroForm({ ...registroForm, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: '#071322',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #ff007f 0%, #b5179e 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '13px 20px',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 0 20px rgba(255, 0, 127, 0.4)'
                  }}
                >
                  <Send size={16} />
                  <span>Notificarme al Lanzamiento</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* GARANTÍA INSTITUCIONAL */}
        <div className="glass-panel" style={{
          borderRadius: '20px',
          padding: '28px 36px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          border: '1.5px dashed rgba(255, 0, 127, 0.35)',
          background: 'rgba(255, 0, 127, 0.04)',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255, 0, 127, 0.15)',
            border: '1px solid #ff007f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ff007f',
            flexShrink: 0
          }}>
            <ShieldCheck size={30} />
          </div>

          <div style={{ flexGrow: 1 }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '6px', fontWeight: 800 }}>
              Garantía Pedagógica & Seguridad Certificada UPS
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Todos los módulos físicos y materiales experimentales son testeados bajo estrictos protocolos de bioseguridad y pedagogía activa por docentes de la Universidad Politécnica Salesiana.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
