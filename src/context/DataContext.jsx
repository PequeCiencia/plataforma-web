// DataContext.jsx - Contexto de Estado Global con sincronización local
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TALLERES_INICIALES, EXPERIMENTOS_INICIALES, KITS_TIENDA_INICIALES, PERSONAJES } from '../data/initialData';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  TALLERES: 'pc_talleres_v1',
  EXPERIMENTOS: 'pc_experimentos_v1',
  KITS: 'pc_kits_v1',
  USER_ROLE: 'pc_user_role_v1'
};

export function DataProvider({ children }) {
  // Estado de Modo de Usuario: 'docente' (vista pública institucional) o 'admin' (backoffice)
  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return saved || 'docente';
  });

  // Talleres
  const [talleres, setTalleres] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TALLERES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return TALLERES_INICIALES;
  });

  // Experimentos
  const [experimentos, setExperimentos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPERIMENTOS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return EXPERIMENTOS_INICIALES;
  });

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

  // Guardar en LocalStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, userRole);
  }, [userRole]);

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

  // CRUD Experimentos
  const addExperimento = (exp) => {
    const newExp = { ...exp, id: 'exp-' + Date.now() };
    setExperimentos(prev => [newExp, ...prev]);
    return newExp;
  };

  const updateExperimento = (id, updated) => {
    setExperimentos(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
  };

  const deleteExperimento = (id) => {
    setExperimentos(prev => prev.filter(e => e.id !== id));
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
    return localStorage.getItem('pc_active_exp_id') || 'exp-densidades';
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
      userRole,
      setUserRole,
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
