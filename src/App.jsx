// App.jsx - Componente Principal con Escáner de Tripulación (ADN Visual)
import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePortals from './components/HomePortals';
import TalleresView from './components/TalleresView';
import ExperimentosView from './components/ExperimentosView';
import TiendaView from './components/TiendaView';
import PersonajesView from './components/PersonajesView';
import AdminDashboard from './components/AdminDashboard';
import SimulacionesView from './components/SimulacionesView';
import NaveEspacialMision from './components/NaveEspacialMision';
import WarpTransition from './components/WarpTransition';
import AuthModal from './components/AuthModal';

function MainApp() {
  const { userRole, isAuthModalOpen, setIsAuthModalOpen, authTargetRole } = useData();
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'talleres' | 'experimentos' | 'simulaciones' | 'tienda' | 'personajes' | 'admin' | 'nave'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

  // Manejar transición hacia la nave espacial
  const handleNavigate = (tab) => {
    if (tab === 'nave') {
      setIsWarping(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleWarpComplete = () => {
    setIsWarping(false);
    setActiveTab('nave');
  };

  // Auto scroll al cambiar de pantalla
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div style={{ 
      height: activeTab === 'nave' ? '100vh' : 'auto', 
      minHeight: '100vh', 
      overflow: activeTab === 'nave' ? 'hidden' : 'visible',
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      {/* Animación de Salto Hiperespacial */}
      {isWarping && (
        <WarpTransition onComplete={handleWarpComplete} />
      )}

      {/* Si estamos en la Nave Espacial, renderizar la cabina inmersiva completa */}
      {activeTab === 'nave' ? (
        <NaveEspacialMision 
          onExit={() => setActiveTab('home')} 
          onOpenAdmin={() => handleNavigate('admin')} 
        />
      ) : (
        <>
          {/* Barra de Navegación Superior */}
          <Navbar 
            activeTab={activeTab} 
            setActiveTab={handleNavigate} 
            onOpenCart={() => setIsCartOpen(true)} 
          />

          {/* Contenido Principal según la pestaña activa */}
          <main style={{ flexGrow: 1 }}>
            {activeTab === 'home' && (
              <HomePortals onNavigate={handleNavigate} />
            )}

            {activeTab === 'talleres' && (
              <TalleresView onNavigate={handleNavigate} />
            )}

            {activeTab === 'experimentos' && (
              <ExperimentosView onNavigate={handleNavigate} />
            )}

            {activeTab === 'simulaciones' && (
              <SimulacionesView onNavigate={handleNavigate} />
            )}

            {activeTab === 'tienda' && (
              <TiendaView 
                isCartOpen={isCartOpen} 
                setIsCartOpen={setIsCartOpen} 
              />
            )}

            {activeTab === 'personajes' && (
              <PersonajesView 
                onBack={() => setActiveTab('home')} 
                onNavigate={handleNavigate} 
              />
            )}

            {activeTab === 'admin' && (
              <AdminDashboard 
                onPreviewPortal={() => setActiveTab('home')} 
                onLaunchNave={() => handleNavigate('nave')}
              />
            )}
          </main>

          {/* Pie de Página Institucional */}
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {/* Modal Global de Autenticación Sci-Fi */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        targetRole={authTargetRole} 
        onSuccess={(user) => {
          if (user.role === 'admin' || user.role === 'docente') {
            setActiveTab('admin');
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
