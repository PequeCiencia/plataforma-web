// DataContext.jsx - Contexto de Estado Global con sincronización local
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TALLERES_INICIALES, EXPERIMENTOS_INICIALES, KITS_TIENDA_INICIALES, PERSONAJES } from '../data/initialData';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  TALLERES: 'pc_talleres_v3',
  EXPERIMENTOS: 'pc_experimentos_v2',
  KITS: 'pc_kits_v2',
  CURRENT_USER: 'pc_current_user_v2',
  SOLICITUDES_TALLERES: 'pc_solicitudes_talleres_v1'
};

// Credenciales Oficiales de la Plataforma UPS Pequeños Científicos
export const CREDENCIALES_DEFAULT = {
  DOCENTE: {
    usuario: 'docente@ups.edu.ec',
    alias: 'docente',
    password: 'docente123',
    role: 'docente',
    nombre: 'Docente UPS',
    institucion: 'Universidad Politécnica Salesiana'
  },
  ADMIN: {
    usuario: 'admin@pequenos.ups.edu.ec',
    alias: 'admin',
    password: 'admin123',
    role: 'admin',
    nombre: 'Administrador Pequeños Científicos',
    institucion: 'UPS Sede Cuenca'
  }
};

export function DataProvider({ children }) {
  // Usuario Autenticado: null = Visitante / General (público), 'docente' o 'admin'
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null; // Visitante / General por defecto
  });

  const userRole = currentUser ? currentUser.role : 'general'; // 'general' | 'docente' | 'admin'
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTargetRole, setAuthTargetRole] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  const login = (usuario, password) => {
    const u = (usuario || '').trim().toLowerCase();
    const p = (password || '').trim();

    // Validar Administrador
    if (
      (u === CREDENCIALES_DEFAULT.ADMIN.usuario.toLowerCase() || u === CREDENCIALES_DEFAULT.ADMIN.alias.toLowerCase() || u === 'admin@ups.edu.ec') &&
      (p === CREDENCIALES_DEFAULT.ADMIN.password || p === 'admin2026')
    ) {
      const user = {
        role: 'admin',
        nombre: 'Administrador Pequeños Científicos',
        email: CREDENCIALES_DEFAULT.ADMIN.usuario,
        institucion: CREDENCIALES_DEFAULT.ADMIN.institucion
      };
      setCurrentUser(user);
      setIsAuthModalOpen(false);
      return { success: true, user };
    }

    // Validar Docente
    if (
      (u === CREDENCIALES_DEFAULT.DOCENTE.usuario.toLowerCase() || u === CREDENCIALES_DEFAULT.DOCENTE.alias.toLowerCase() || u === 'profesor@ups.edu.ec') &&
      (p === CREDENCIALES_DEFAULT.DOCENTE.password || p === 'docente2026')
    ) {
      const user = {
        role: 'docente',
        nombre: 'Docente UPS (Ciencias y Robótica)',
        email: CREDENCIALES_DEFAULT.DOCENTE.usuario,
        institucion: CREDENCIALES_DEFAULT.DOCENTE.institucion
      };
      setCurrentUser(user);
      setIsAuthModalOpen(false);
      return { success: true, user };
    }

    return { success: false, error: 'Credenciales inválidas. Comprueba tu usuario y clave.' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const openAuthModal = (targetRole = null) => {
    setAuthTargetRole(targetRole);
    setIsAuthModalOpen(true);
  };

  // Talleres
  const [talleres, setTalleres] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TALLERES);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return parsed.map(t => {
          if (t.id === 'tal-5') {
            const baseTaller = TALLERES_INICIALES.find(bt => bt.id === 'tal-5');
            return {
              ...t,
              categoria: 'Robótica',
              modulo: 'Módulo Robótica',
              nombre: 'Proyecto: Astro Explorer Bot',
              instructor: 'Astro (Líder de Prototipos) & Vector',
              imagen: './assets/images/robotica_astro.jpg',
              temas: baseTaller ? baseTaller.temas : t.temas,
              materialesIncluidos: baseTaller ? baseTaller.materialesIncluidos : t.materialesIncluidos
            };
          }
          return t;
        });
      } catch (e) { console.error(e); }
    }
    return TALLERES_INICIALES;
  });

  // Experimentos
  const [experimentos, setExperimentos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPERIMENTOS);
    if (saved) {
      try {
        const rawParsed = JSON.parse(saved);
        const parsed = rawParsed.map(exp => {
          let cat = exp.categoria;
          if (cat === 'Robótica' || cat === 'Robótica Avanzada') cat = 'Taller de Robótica';
          if (cat === 'Física & Electricidad' || cat === 'Robótica & Electricidad' || cat === 'Electricidad') {
            cat = 'Ciencias Tecnológicas (Mundo Eléctrico)';
          }

          if (exp.id === 'exp-robotica-basebot') {
            const base = EXPERIMENTOS_INICIALES.find(e => e.id === 'exp-robotica-basebot');
            return {
              ...base,
              ...exp,
              esOficial: true,
              creador: 'admin',
              categoria: 'Taller de Robótica',
              tipo: 'robotica_3d',
              visor3dUrl: exp.visor3dUrl || (base ? base.visor3dUrl : ''),
              pdfManualUrl: exp.pdfManualUrl || (base ? base.pdfManualUrl : '')
            };
          }
          if (exp.id === 'exp-papelitos') {
            return {
              ...exp,
              esOficial: true,
              creador: 'admin',
              categoria: 'Ciencias Tecnológicas (Mundo Eléctrico)',
              pasos: exp.pasos ? exp.pasos.map(p => ({
                ...p,
                videoUrl: p.videoUrl ? p.videoUrl.replace('./assets/videos/papelitos/', './instituciones/pequenos_cientificos/experimento_01_papelitos/videos/') : p.videoUrl
              })) : exp.pasos
            };
          }
          return { ...exp, categoria: cat };
        });
        const validExperiments = parsed.filter(e => !['exp-densidades', 'exp-quimica', 'exp-cohete', 'exp-circuito'].includes(e.id));
        const existingIds = new Set(validExperiments.map(e => e.id));
        const missing = EXPERIMENTOS_INICIALES.filter(e => !existingIds.has(e.id));
        return [...missing, ...validExperiments];
      } catch (e) { console.error(e); }
    }
    return EXPERIMENTOS_INICIALES;
  });

  // Solicitudes de Talleres Institucionales
  const [solicitudesTalleres, setSolicitudesTalleres] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOLICITUDES_TALLERES);
    if (saved) {
      try { return JSON.parse(saved); } catch(e) { console.error(e); }
    }
    return [];
  });

  const addSolicitudTaller = (solicitud) => {
    const nueva = {
      ...solicitud,
      id: 'sol-' + Date.now(),
      fecha: new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    setSolicitudesTalleres(prev => [nueva, ...prev]);
    return nueva;
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOLICITUDES_TALLERES, JSON.stringify(solicitudesTalleres));
  }, [solicitudesTalleres]);

  // Kits Tienda
  const [kits, setKits] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.KITS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return KITS_TIENDA_INICIALES;
  });

  // Carrito o Solicitud de Kits
  const [solicitudKits, setSolicitudKits] = useState([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TALLERES, JSON.stringify(talleres));
  }, [talleres]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPERIMENTOS, JSON.stringify(experimentos));
  }, [experimentos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.KITS, JSON.stringify(kits));
  }, [kits]);

  // CRUD Talleres
  const addTaller = (taller) => {
    const newTaller = { ...taller, id: 'tal-' + Date.now() };
    setTalleres(prev => [newTaller, ...prev]);
    return newTaller;
  };

  const updateTaller = (id, updated) => {
    setTalleres(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTaller = (id) => {
    setTalleres(prev => prev.filter(t => t.id !== id));
  };

  // CRUD Experimentos con control de permisos
  const addExperimento = (exp) => {
    const isOfficial = userRole === 'admin';
    const newExp = { 
      ...exp, 
      id: 'exp-' + Date.now(),
      esOficial: isOfficial,
      creador: userRole === 'admin' ? 'admin' : 'docente',
      autorNombre: currentUser?.nombre || (isOfficial ? 'Pequeños Científicos (UPS)' : 'Docente UPS')
    };
    setExperimentos(prev => [newExp, ...prev]);
    return newExp;
  };

  const updateExperimento = (id, updated) => {
    const target = experimentos.find(e => e.id === id);
    if (userRole === 'docente' && target && (target.esOficial || target.id === 'exp-papelitos' || target.id === 'exp-robotica-basebot')) {
      return { success: false, error: 'Los experimentos oficiales de Pequeños Científicos están protegidos y sólo pueden ser modificados por un Administrador.' };
    }
    setExperimentos(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
    return { success: true };
  };

  const deleteExperimento = (id) => {
    const target = experimentos.find(e => e.id === id);
    if (userRole === 'docente' && target && (target.esOficial || target.id === 'exp-papelitos' || target.id === 'exp-robotica-basebot')) {
      return { success: false, error: 'Los experimentos oficiales de Pequeños Científicos están protegidos y no pueden ser eliminados por docentes.' };
    }
    setExperimentos(prev => prev.filter(e => e.id !== id));
    return { success: true };
  };

  // CRUD Kits
  const addKit = (kit) => {
    const newKit = { ...kit, id: 'kit-' + Date.now() };
    setKits(prev => [newKit, ...prev]);
    return newKit;
  };

  const updateKit = (id, updated) => {
    setKits(prev => prev.map(k => k.id === id ? { ...k, ...updated } : k));
  };

  const deleteKit = (id) => {
    setKits(prev => prev.filter(k => k.id !== id));
  };

  // Carrito / Solicitud institucional
  const agregarASolicitud = (kit) => {
    setSolicitudKits(prev => {
      const existe = prev.find(item => item.id === kit.id);
      if (existe) {
        return prev.map(item => item.id === kit.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...kit, cantidad: 1 }];
    });
  };

  const quitarDeSolicitud = (id) => {
    setSolicitudKits(prev => prev.filter(item => item.id !== id));
  };

  const limpiarSolicitud = () => setSolicitudKits([]);

  // Experimento Activo para la Cabina de la Nave
  const [activeExpId, setActiveExpId] = useState(() => {
    return localStorage.getItem('pc_active_exp_id') || 'exp-papelitos';
  });

  useEffect(() => {
    localStorage.setItem('pc_active_exp_id', activeExpId);
  }, [activeExpId]);

  // Actualizar recurso multimedia de un paso específico
  const updatePasoMedia = (expId, pasoId, mediaData) => {
    setExperimentos(prev => prev.map(exp => {
      if (exp.id === expId) {
        const nuevosPasos = (exp.pasos || []).map(p => {
          if (p.id === pasoId || p.numero === pasoId) {
            return { ...p, ...mediaData };
          }
          return p;
        });
        return { ...exp, pasos: nuevosPasos };
      }
      return exp;
    }));
  };

  // Exportar experimento en formato JSON descargable
  const exportExperimentoJSON = (expId) => {
    const exp = experimentos.find(e => e.id === expId);
    if (!exp) return;
    const blob = new Blob([JSON.stringify(exp, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `experimento-${exp.titulo.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Importar experimento desde archivo JSON
  const importExperimentoJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.titulo || !parsed.pasos) {
        throw new Error('Formato de experimento no válido: requiere título y pasos');
      }
      const nuevoExp = {
        ...parsed,
        id: 'exp-imp-' + Date.now()
      };
      setExperimentos(prev => [nuevoExp, ...prev]);
      setActiveExpId(nuevoExp.id);
      return { success: true, exp: nuevoExp };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Restaurar datos de fábrica
  const resetearDatos = () => {
    setTalleres(TALLERES_INICIALES);
    setExperimentos(EXPERIMENTOS_INICIALES);
    setKits(KITS_TIENDA_INICIALES);
    setActiveExpId('exp-densidades');
    localStorage.removeItem(STORAGE_KEYS.TALLERES);
    localStorage.removeItem(STORAGE_KEYS.EXPERIMENTOS);
    localStorage.removeItem(STORAGE_KEYS.KITS);
    localStorage.removeItem('pc_active_exp_id');
  };

  return (
    <DataContext.Provider value={{
      currentUser,
      userRole,
      login,
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authTargetRole,
      openAuthModal,
      activeExpId,
      setActiveExpId,
      personajes: PERSONAJES,
      talleres,
      addTaller,
      updateTaller,
      deleteTaller,
      experimentos,
      addExperimento,
      updateExperimento,
      deleteExperimento,
      updatePasoMedia,
      exportExperimentoJSON,
      importExperimentoJSON,
      kits,
      addKit,
      updateKit,
      deleteKit,
      solicitudKits,
      agregarASolicitud,
      quitarDeSolicitud,
      limpiarSolicitud,
      solicitudesTalleres,
      addSolicitudTaller,
      resetearDatos
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData debe ser usado dentro de un DataProvider');
  return ctx;
}
