// Navbar.jsx - Barra de navegación con identidad UPS y selector de roles
import React from 'react';
import { useData } from '../context/DataContext';
import { 
  Atom, 
  Home,
  Wrench, 
  FlaskConical, 
  ShoppingBag, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  Layers,
  GraduationCap,
  Bot,
  Lock,
  LogOut,
  User
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenCart }) {
  const { userRole, currentUser, logout, openAuthModal, solicitudKits } = useData();

  const totalItemsSolicitud = solicitudKits.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(9, 13, 22, 0.94)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      width: '100%'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 32px',
        gap: '16px',
        flexWrap: 'wrap',
        boxSizing: 'border-box'
      }}>
        {/* Logo Institucional y Nombre */}
        <div 
          onClick={() => setActiveTab('home')}
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

        {/* Links de Navegación de Contenido */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '4px 6px',
          borderRadius: '9999px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <button
            onClick={() => setActiveTab('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '9999px',
              fontSize: '0.84rem',
              fontWeight: 600,
              background: activeTab === 'home' ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
              color: activeTab === 'home' ? '#00e5ff' : '#94a3b8',
              border: activeTab === 'home' ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            <Home size={15} />
            <span>Página Principal</span>
          </button>

          <button
            onClick={() => setActiveTab('talleres')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '9999px',
              fontSize: '0.84rem',
              fontWeight: 600,
              background: activeTab === 'talleres' ? 'rgba(255, 153, 0, 0.15)' : 'transparent',
              color: activeTab === 'talleres' ? '#ff9900' : '#94a3b8',
              border: activeTab === 'talleres' ? '1px solid rgba(255, 153, 0, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            <Wrench size={15} />
            <span>Talleres</span>
          </button>

          <button
            onClick={() => setActiveTab('experimentos')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '9999px',
              fontSize: '0.84rem',
              fontWeight: 600,
              background: activeTab === 'experimentos' ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
              color: activeTab === 'experimentos' ? '#00e5ff' : '#94a3b8',
              border: activeTab === 'experimentos' ? '1px solid rgba(0, 229, 255, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            <FlaskConical size={15} />
            <span>Experimentos</span>
          </button>

          <button
            onClick={() => setActiveTab('simulaciones')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '9999px',
              fontSize: '0.84rem',
              fontWeight: 600,
              background: activeTab === 'simulaciones' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: activeTab === 'simulaciones' ? '#38bdf8' : '#94a3b8',
              border: activeTab === 'simulaciones' ? '1px solid #38bdf8' : '1px solid transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            <Bot size={15} />
            <span>Simulaciones</span>
          </button>

          {/* Gestión Docente */}
          <button
            onClick={() => setActiveTab('admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '9999px',
              fontSize: '0.84rem',
              fontWeight: 700,
              background: activeTab === 'admin' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
              color: activeTab === 'admin' ? '#f59e0b' : '#94a3b8',
              border: activeTab === 'admin' ? '1px solid #f59e0b' : '1px solid transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            title={userRole === 'general' ? 'Requiere inicio de sesión docente' : 'Panel de Gestión Docente'}
          >
            <ShieldCheck size={15} />
            <span>Gestión Docente</span>
            {userRole === 'general' && <Lock size={12} color="#f59e0b" style={{ opacity: 0.7 }} />}
          </button>

          {/* Tienda de Kits con Badge Próximamente */}
          <button
            onClick={() => setActiveTab('tienda')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '7px 14px',
              borderRadius: '9999px',
              fontSize: '0.84rem',
              fontWeight: 600,
              background: activeTab === 'tienda' ? 'rgba(255, 0, 127, 0.15)' : 'transparent',
              color: activeTab === 'tienda' ? '#ff007f' : '#94a3b8',
              border: activeTab === 'tienda' ? '1px solid rgba(255, 0, 127, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            <ShoppingBag size={15} />
            <span>Tienda de Kits</span>
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 900,
              padding: '2px 7px',
              borderRadius: '8px',
              background: 'rgba(255, 0, 127, 0.2)',
              border: '1px solid rgba(255, 0, 127, 0.6)',
              color: '#ff007f',
              letterSpacing: '0.04em'
            }}>
              PRÓXIMAMENTE
            </span>
          </button>
        </nav>

        {/* Controles de Acción Principal y Estado */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {/* BOTÓN OFICIAL Y ÚNICO: CABINA DE MISIÓN */}
          <button
            onClick={() => setActiveTab('nave')}
            className="tactile-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #00e5ff 0%, #0070f3 100%)',
              color: '#030812',
              border: '1px solid #00e5ff',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.45)',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={16} />
            <span>🚀 Cabina de Misión</span>
          </button>

          {/* Badge En Órbita */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.74rem',
            fontWeight: 800,
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

          {/* Estado de Sesión y Acceso Institucional */}
          {userRole === 'general' ? (
            <button
              onClick={() => openAuthModal('docente')}
              className="tactile-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#f8fafc',
                fontSize: '0.8rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
              title="Iniciar Sesión como Docente o Administrador"
            >
              <Lock size={14} color="#00e5ff" />
              <span>Acceso Institucional</span>
            </button>
          ) : userRole === 'docente' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '9999px',
                background: 'rgba(0, 229, 255, 0.18)',
                border: '1px solid #00e5ff',
                color: '#00e5ff',
                fontSize: '0.78rem',
                fontWeight: 800
              }}>
                <GraduationCap size={15} />
                <span>Docente UPS</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  if (activeTab === 'admin') setActiveTab('home');
                }}
                className="tactile-btn"
                title="Cerrar sesión institucional"
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                  borderRadius: '9999px',
                  padding: '6px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Salir
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '9999px',
                background: 'rgba(245, 158, 11, 0.2)',
                border: '1px solid #f59e0b',
                color: '#f59e0b',
                fontSize: '0.78rem',
                fontWeight: 800
              }}>
                <ShieldCheck size={15} />
                <span>Admin</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  if (activeTab === 'admin') setActiveTab('home');
                }}
                className="tactile-btn"
                title="Cerrar sesión de administrador"
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                  borderRadius: '9999px',
                  padding: '6px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
