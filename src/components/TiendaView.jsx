// TiendaView.jsx - Tienda y Suministros de Kits Educativos UPS
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  ShoppingBag, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Minus, 
  Trash2, 
  Send,
  X,
  Package,
  Layers
} from 'lucide-react';

export default function TiendaView({ isCartOpen, setIsCartOpen }) {
  const { kits, solicitudKits, agregarASolicitud, quitarDeSolicitud, limpiarSolicitud } = useData();
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKit, setSelectedKit] = useState(null);
  const [presupuestoEnviado, setPresupuestoEnviado] = useState(false);
  const [datosInstitucion, setDatosInstitucion] = useState({
    colegio: '',
    contacto: '',
    email: '',
    telefono: ''
  });

  const categorias = ['Todos', 'Química', 'Robótica', 'Astronomía', 'Biología'];

  const kitsFiltrados = kits.filter(kit => {
    const coincideCat = categoriaFiltro === 'Todos' || kit.categoria.toLowerCase().includes(categoriaFiltro.toLowerCase());
    const coincideSearch = kit.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kit.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return coincideCat && coincideSearch;
  });

  const featuredKit = kits[0];
  const regularKits = kitsFiltrados.filter(k => k.id !== (categoriaFiltro === 'Todos' && !searchTerm ? featuredKit?.id : null));

  const totalPresupuesto = solicitudKits.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const handleEnviarPresupuesto = (e) => {
    e.preventDefault();
    if (!datosInstitucion.colegio || !datosInstitucion.email) return;
    setPresupuestoEnviado(true);
    setTimeout(() => {
      setPresupuestoEnviado(false);
      limpiarSolicitud();
      setIsCartOpen(false);
      setDatosInstitucion({ colegio: '', contacto: '', email: '', telefono: '' });
    }, 2800);
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Banner Hero: Terminal de Suministros */}
        <div className="glass-panel" style={{
          borderRadius: '28px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 0, 127, 0.3)',
          marginBottom: '48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          padding: '36px',
          background: 'linear-gradient(135deg, rgba(255, 0, 127, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(0, 229, 255, 0.12)',
              color: '#00e5ff',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}>
              <Sparkles size={14} />
              <span>Terminal de Suministros UPS</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Equípate para el <span style={{ color: '#00e5ff' }}>Descubrimiento</span>
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Adquiere kits de experimentación reales, instrumental seguro y materiales aprobados por la <strong>Universidad Politécnica Salesiana</strong> para continuar el entrenamiento científico en el colegio o en casa.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => {
                  const el = document.getElementById('catalogo-kits');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary"
              >
                <Search size={16} />
                <span>Explorar Kits</span>
              </button>
            </div>
          </div>

          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative',
            minHeight: '220px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
          }}>
            <img 
              src="./assets/images/tienda_portal.jpg" 
              alt="Magno - Tienda de Kits" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              insetInline: 0,
              padding: '10px 16px',
              background: 'rgba(9, 13, 22, 0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.75rem',
              color: '#ff007f'
            }}>
              <span>KITS OFICIALES CERTIFICADOS</span>
              <span>MAGNETO-BOT</span>
            </div>
          </div>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div id="catalogo-kits" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}>
          {/* Categorías */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: categoriaFiltro === cat ? 'linear-gradient(135deg, #ff007f, #ff5500)' : 'rgba(255, 255, 255, 0.05)',
                  color: categoriaFiltro === cat ? '#ffffff' : 'var(--text-secondary)',
                  border: '1px solid ' + (categoriaFiltro === cat ? '#ff007f' : 'rgba(255, 255, 255, 0.08)'),
                  transition: 'all 0.2s'
                }}
              >
                {cat === 'Todos' ? 'Todos los Kits' : cat}
              </button>
            ))}
          </div>

          {/* Buscador */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#0f172a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '9999px',
            padding: '6px 16px',
            minWidth: '260px'
          }}>
            <Search size={16} color="#94a3b8" />
            <input 
              type="text"
              placeholder="Buscar suministros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* KIT DESTACADO (Si aplica) */}
        {featuredKit && categoriaFiltro === 'Todos' && !searchTerm && (
          <div 
            className="glass-panel"
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              marginBottom: '36px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
              padding: '28px'
            }}
          >
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: '260px' }}>
              <img 
                src={featuredKit.imagen} 
                alt={featuredKit.nombre} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <span className="badge badge-green">Nuevo Lanzamiento</span>
                  <span className="badge badge-cyan">{featuredKit.categoria}</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '10px' }}>
                  {featuredKit.nombre}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '18px' }}>
                  {featuredKit.descripcion}
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Créditos Terrestres</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff' }}>
                    ${featuredKit.precio.toFixed(2)} <span style={{ fontSize: '0.8rem', color: '#00e5ff' }}>USD</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setSelectedKit(featuredKit)}
                    className="btn btn-outline"
                  >
                    Ver Componentes
                  </button>
                  <button
                    onClick={() => agregarASolicitud(featuredKit)}
                    className="btn btn-primary"
                  >
                    <ShoppingBag size={16} />
                    <span>Adquirir / Solicitar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GRID DE KITS REGULARES */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          {regularKits.map((kit) => (
            <div
              key={kit.id}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ff007f';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 0, 127, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={kit.imagen} 
                  alt={kit.nombre} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  <span className="badge badge-magenta" style={{ fontSize: '0.7rem' }}>
                    {kit.badge || kit.categoria}
                  </span>
                </div>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff007f', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {kit.categoria}
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '8px' }}>
                  {kit.nombre}
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '16px',
                  flexGrow: 1
                }}>
                  {kit.descripcion}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '14px'
                }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                      ${kit.precio.toFixed(2)} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>USD</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setSelectedKit(kit)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}
                    >
                      Detalles
                    </button>
                    <button
                      onClick={() => agregarASolicitud(kit)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: '#ff007f',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Plus size={14} />
                      <span>Pedir</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Tarjeta de Garantía de la Academia */}
          <div className="glass-panel" style={{
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px dashed rgba(255, 0, 127, 0.4)',
            background: 'rgba(255, 0, 127, 0.03)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255, 0, 127, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff007f',
              marginBottom: '16px'
            }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '8px' }}>
              Garantía de la Academia
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
              Todos los equipos e insumos están rigurosamente probados para asegurar el aprendizaje activo y la máxima seguridad infantil.
            </p>
            <span style={{ fontSize: '0.8rem', color: '#ff007f', fontWeight: 700 }}>
              Protocolos de Seguridad UPS
            </span>
          </div>
        </div>

        {/* MODAL DETALLES DEL KIT */}
        {selectedKit && (
          <div className="modal-overlay" onClick={() => setSelectedKit(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <span className="badge badge-magenta" style={{ marginBottom: '8px' }}>{selectedKit.categoria}</span>
                  <h2 style={{ fontSize: '1.6rem', color: '#ffffff' }}>{selectedKit.nombre}</h2>
                </div>
                <button
                  onClick={() => setSelectedKit(null)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ height: '220px', borderRadius: '14px', overflow: 'hidden', marginBottom: '20px' }}>
                <img src={selectedKit.imagen} alt={selectedKit.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px', fontSize: '0.95rem' }}>
                {selectedKit.descripcion}
              </p>

              <h3 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '12px' }}>
                📦 Componentes Incluidos en la Caja:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                {selectedKit.componentes?.map((comp, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#e2e8f0' }}>
                    <CheckCircle2 size={16} color="#00e676" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Precio Sugerido</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>${selectedKit.precio.toFixed(2)} USD</div>
                </div>
                <button
                  onClick={() => {
                    agregarASolicitud(selectedKit);
                    setSelectedKit(null);
                    setIsCartOpen(true);
                  }}
                  className="btn btn-magenta"
                >
                  <ShoppingBag size={16} />
                  <span>Agregar a la Solicitud</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL / DRAWER DE SOLICITUD DE KITS (CARRITO INSTITUCIONAL) */}
        {isCartOpen && (
          <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShoppingBag size={22} color="#ff007f" />
                  <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Solicitud Institucional de Kits</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', color: '#ffffff' }}>
                  <X size={20} />
                </button>
              </div>

              {solicitudKits.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  <Package size={48} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                  <p>Aún no has agregado kits a tu solicitud.</p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', maxHeight: '240px', overflowY: 'auto' }}>
                    {solicitudKits.map((item) => (
                      <div 
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.06)'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{item.nombre}</div>
                          <div style={{ fontSize: '0.8rem', color: '#ff007f' }}>${item.precio.toFixed(2)} USD c/u</div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>Cant: {item.cantidad}</span>
                          <button
                            onClick={() => quitarDeSolicitud(item.id)}
                            style={{ background: 'none', color: '#f43f5e' }}
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(0, 229, 255, 0.08)', borderRadius: '12px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 600 }}>Total Estimado:</span>
                    <span style={{ fontSize: '1.4rem', color: '#00e5ff', fontWeight: 900 }}>${totalPresupuesto.toFixed(2)} USD</span>
                  </div>

                  {presupuestoEnviado ? (
                    <div style={{ padding: '16px', background: 'rgba(0, 230, 118, 0.15)', color: '#00e676', borderRadius: '12px', textAlign: 'center', fontWeight: 700 }}>
                      🎉 ¡Cotización institucional enviada! Nos pondremos en contacto con la institución para coordinar entrega.
                    </div>
                  ) : (
                    <form onSubmit={handleEnviarPresupuesto} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h3 style={{ fontSize: '1rem', color: '#ffffff' }}>Datos de la Institución / Docente:</h3>
                      <input 
                        type="text" 
                        placeholder="Nombre de la Institución Educativa o Escuela"
                        required
                        value={datosInstitucion.colegio}
                        onChange={(e) => setDatosInstitucion({ ...datosInstitucion, colegio: e.target.value })}
                        style={{ padding: '10px 14px', borderRadius: '8px', background: '#090d16', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', outline: 'none' }}
                      />
                      <input 
                        type="email" 
                        placeholder="Correo Electrónico de Contacto Institucional"
                        required
                        value={datosInstitucion.email}
                        onChange={(e) => setDatosInstitucion({ ...datosInstitucion, email: e.target.value })}
                        style={{ padding: '10px 14px', borderRadius: '8px', background: '#090d16', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', outline: 'none' }}
                      />
                      <button type="submit" className="btn btn-magenta" style={{ width: '100%', marginTop: '6px' }}>
                        <Send size={16} />
                        <span>Solicitar Cotización y Despacho UPS</span>
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
