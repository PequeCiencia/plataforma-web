// Navbar.jsx - Barra de navegación con identidad UPS y selector de roles
import React from 'react';
import { useData } from '../context/DataContext';
import { 
  Atom, 
  Wrench, 
  FlaskConical, 
  ShoppingBag, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenCart }) {
  const { userRole, setUserRole, solicitudKits } = useData();

  const totalItemsSolicitud = solicitudKits.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(9, 13, 22, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Logo Institucional y Nombre */}
        <div 
          onClick={() => setActiveTab('nave')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            background: '#ffffff',
            padding: '2px 8px',
            borderRadius: '10px',
            border: '2px solid #00509d',
            height: '38px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <img src="./assets/images/logo_ups.png" alt="UPS" style={{ maxHeight: '28px', width: 'auto' }} />
          </div>

          <div style={{
            background: '#ffffff',
            padding: '2px 8px',
            borderRadius: '10px',
            border: '2px solid #ff7b00',
            height: '38px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <img src="./assets/images/logo_pequenos_cientificos.png" alt="PC" style={{ maxHeight: '30px', width: 'auto' }} />
          </div>

          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-display)'
              }}>
                Pequeños Científicos
              </span>
            </div>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              color: '#00e5ff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Universidad Politécnica Salesiana • Ecuador
            </div>
          </div>
        </div>

        {/* Links de Navegación */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '4px 6px',
          borderRadius: '9999px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <button
            onClick={() => setActiveTab('nave')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 800,
              background: activeTab === 'nave' ? 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)' : 'rgba(0, 229, 255, 0.1)',
              color: activeTab === 'nave' ? '#030812' : '#00e5ff',
              border: '1px solid #00e5ff',
              boxShadow: activeTab === 'nave' ? '0 0 15px rgba(0, 229, 255, 0.4)' : 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            <span>🚀 Cabina Espacial</span>
          </button>

          <button
            onClick={() => setActiveTab('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              background: activeTab === 'home' ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
              color: activeTab === 'home' ? '#00e5ff' : '#94a3b8',
              border: activeTab === 'home' ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={16} />
            <span>Portales</span>
          </button>

          <button
            onClick={() => setActiveTab('talleres')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              background: activeTab === 'talleres' ? 'rgba(255, 153, 0, 0.15)' : 'transparent',
              color: activeTab === 'talleres' ? '#ff9900' : '#94a3b8',
              border: activeTab === 'talleres' ? '1px solid rgba(255, 153, 0, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <Wrench size={16} />
            <span>Talleres</span>
          </button>

          <button
            onClick={() => setActiveTab('experimentos')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              background: activeTab === 'experimentos' ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
              color: activeTab === 'experimentos' ? '#00e5ff' : '#94a3b8',
              border: activeTab === 'experimentos' ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <FlaskConical size={16} />
            <span>Experimentos</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 700,
              background: activeTab === 'admin' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
              color: activeTab === 'admin' ? '#f59e0b' : '#94a3b8',
              border: activeTab === 'admin' ? '1px solid #f59e0b' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldCheck size={16} />
            <span>Gestión Docente</span>
          </button>

          <button
            onClick={() => setActiveTab('tienda')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 600,
              background: activeTab === 'tienda' ? 'rgba(255, 0, 127, 0.15)' : 'transparent',
              color: activeTab === 'tienda' ? '#ff007f' : '#94a3b8',
              border: activeTab === 'tienda' ? '1px solid rgba(255, 0, 127, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <ShoppingBag size={16} />
            <span>Tienda de Kits</span>
          </button>

          {/* Botón Escáner de Tripulación (ADN Visual) */}
          <button
            onClick={() => setActiveTab('escaner')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 800,
              background: activeTab === 'escaner' 
                ? 'var(--color-red)' 
                : 'rgba(230, 57, 70, 0.15)',
              color: activeTab === 'escaner' ? '#ffffff' : 'var(--color-red)',
              border: '1px solid var(--color-red)',
              boxShadow: activeTab === 'escaner' ? '0 0 15px rgba(230, 57, 70, 0.5)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>🧬 Escáner ADN</span>
          </button>

          {/* Botón Cabina Espacial Interactiva */}
          <button
            onClick={() => setActiveTab('nave')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 800,
              background: activeTab === 'nave' 
                ? 'linear-gradient(135deg, #00e5ff, #0070f3)' 
                : 'linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(255, 0, 127, 0.15))',
              color: activeTab === 'nave' ? '#040b16' : '#00e5ff',
              border: '1px solid rgba(0, 229, 255, 0.4)',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={16} />
            <span>🚀 Cabina de Misión</span>
          </button>

          {userRole === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: 700,
                background: activeTab === 'admin' ? 'linear-gradient(135deg, #00e5ff, #0070f3)' : 'rgba(0, 229, 255, 0.1)',
                color: activeTab === 'admin' ? '#090d16' : '#00e5ff',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <ShieldCheck size={16} />
              <span>Backoffice</span>
            </button>
          )}
        </nav>

        {/* Controles de Estado / Modo / Solicitud */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* Badge En Órbita */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#00e676',
            background: 'rgba(0, 230, 118, 0.08)',
            padding: '6px 12px',
            borderRadius: '9999px',
            border: '1px solid rgba(0, 230, 118, 0.25)'
          }}>
            <span className="pulse-dot" style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00e676',
              boxShadow: '0 0 8px #00e676'
            }} />
            <span>EN ÓRBITA</span>
          </div>

          {/* Selector de Rol Docente / Administrador */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#111827',
            padding: '3px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            <button
              onClick={() => {
                setUserRole('docente');
                if (activeTab === 'admin') setActiveTab('home');
              }}
              title="Modo Docente: Consulta y Laboratorio Escolar"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                background: userRole === 'docente' ? '#00e5ff' : 'transparent',
                color: userRole === 'docente' ? '#090d16' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              <UserCheck size={14} />
              <span>Docente</span>
            </button>

            <button
              onClick={() => {
                setUserRole('admin');
                setActiveTab('admin');
              }}
              title="Modo Admin: Editar y Publicar Contenidos"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                background: userRole === 'admin' ? '#ff9900' : 'transparent',
                color: userRole === 'admin' ? '#090d16' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              <ShieldCheck size={14} />
              <span>Admin</span>
            </button>
          </div>

          {/* Botón Carrito / Solicitud */}
          {totalItemsSolicitud > 0 && (
            <button
              onClick={onOpenCart}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'rgba(255, 0, 127, 0.15)',
                border: '1px solid rgba(255, 0, 127, 0.35)',
                color: '#ff007f',
                cursor: 'pointer'
              }}
            >
              <ShoppingBag size={18} />
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#ff007f',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 800,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px rgba(255, 0, 127, 0.6)'
              }}>
                {totalItemsSolicitud}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
