import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { saveMediaFile } from '../utils/mediaStorage';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  FlaskConical, 
  Wrench, 
  ShoppingBag, 
  Database, 
  RotateCcw, 
  Save, 
  X, 
  Check, 
  Layers,
  Sparkles,
  Eye,
  Rocket,
  Download,
  Upload,
  Video,
  ChevronDown,
  ChevronUp,
  FileCode,
  FolderOpen,
  FileVideo
} from 'lucide-react';

export default function AdminDashboard({ onPreviewPortal, onLaunchNave }) {
  const { 
    talleres, addTaller, updateTaller, deleteTaller,
    experimentos, addExperimento, updateExperimento, deleteExperimento,
    setActiveExpId, exportExperimentoJSON, importExperimentoJSON,
    kits, addKit, updateKit, deleteKit,
    resetearDatos 
  } = useData();

  const [activeTab, setActiveTab] = useState('experimentos'); // 'experimentos' | 'talleres' | 'kits'
  const [modalType, setModalType] = useState(null); // 'exp' | 'taller' | 'kit'
  const [editingItem, setEditingItem] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');
  const jsonInputRef = useRef(null);

  // Formulario Completo de Experimento con Pasos Dinámicos
  const [formExp, setFormExp] = useState({
    titulo: '',
    subtitulo: '',
    categoria: 'Física & Química',
    nivel: '10 a 18 años',
    tiempoMinutos: 30,
    descripcion: '',
    hipotesis: '',
    explicacionCientifica: '',
    materiales: [''],
    pasos: [
      {
        id: 1,
        numero: 1,
        categoria: 'Conceptos',
        categoriaColor: '#2ce4ff',
        titulo: 'Concepto Científico',
        subtitulo: 'Introducción teórica para los estudiantes',
        texto: '',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: ''
      },
      {
        id: 2,
        numero: 2,
        categoria: 'Materiales',
        categoriaColor: '#ffc936',
        titulo: 'Materiales y cantidades',
        subtitulo: 'Verificación del equipo en mesa',
        texto: '',
        duracion: '00:30',
        videoUrl: '',
        subtitulos: ''
      }
    ]
  });

  // Formulario Taller
  const [formTaller, setFormTaller] = useState({
    nombre: '',
    categoria: 'Ciencias Tecnológicas',
    modulo: 'Módulo 1',
    descripcion: '',
    duracion: '4 Semanas',
    edadRecomendada: '10 a 18 años',
    estado: 'En Órbita',
    instructor: 'Docente UPS',
    imagen: './assets/images/modulo_electrico.jpg',
    temasTexto: ''
  });

  // Formulario Kit
  const [formKit, setFormKit] = useState({
    nombre: '',
    categoria: 'Química',
    precio: 25.00,
    badge: 'Disponible',
    descripcion: '',
    stock: 20,
    imagen: './assets/images/kit_quimica.jpg',
    componentesTexto: ''
  });

  const notificar = (msg) => {
    setMensajeExito(msg);
    setTimeout(() => setMensajeExito(''), 3500);
  };

  // ==========================================
  // GESTIÓN DE EXPERIMENTOS
  // ==========================================
  const handleOpenExpModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormExp({
        titulo: item.titulo || '',
        subtitulo: item.subtitulo || '',
        categoria: item.categoria || 'Física & Química',
        nivel: item.nivel || '10 a 18 años',
        tiempoMinutos: item.tiempoMinutos || 30,
        descripcion: item.descripcion || '',
        hipotesis: item.hipotesis || '',
        explicacionCientifica: item.explicacionCientifica || '',
        materiales: item.materiales && item.materiales.length > 0 ? item.materiales : [''],
        pasos: item.pasos && item.pasos.length > 0 ? item.pasos.map((p, idx) => ({
          id: p.id || idx + 1,
          numero: idx + 1,
          categoria: p.categoria || (idx === 0 ? 'Conceptos' : idx === 1 ? 'Materiales' : 'Montaje'),
          categoriaColor: p.categoriaColor || '#00e5ff',
          titulo: p.titulo || `Paso ${idx + 1}`,
          subtitulo: p.subtitulo || '',
          texto: p.texto || '',
          duracion: p.duracion || '00:30',
          videoUrl: p.videoUrl || '',
          subtitulos: p.subtitulos || ''
        })) : [
          {
            id: 1,
            numero: 1,
            categoria: 'Conceptos',
            categoriaColor: '#2ce4ff',
            titulo: 'Concepto Inicial',
            subtitulo: 'Introducción teórica',
            texto: '',
            duracion: '00:30',
            videoUrl: '',
            subtitulos: ''
          }
        ]
      });
    } else {
      setFormExp({
        titulo: '',
        subtitulo: '',
        categoria: 'Física & Química',
        nivel: '10 a 18 años',
        tiempoMinutos: 30,
        descripcion: '',
        hipotesis: '',
        explicacionCientifica: '',
        materiales: ['50 ml de Miel o jarabe concentrado', '50 ml de Jabón líquido', 'Probeta graduada de 250ml'],
        pasos: [
          {
            id: 1,
            numero: 1,
            categoria: 'Conceptos',
            categoriaColor: '#2ce4ff',
            titulo: '¿Por qué ocurre este fenómeno?',
            subtitulo: 'Comprende los fundamentos científicos del experimento.',
            texto: 'Explica a los estudiantes la teoría y conceptos clave de ingeniería que se demostrarán.',
            duracion: '00:30',
            videoUrl: '',
            subtitulos: 'Comprende el principio científico de este paso.'
          },
          {
            id: 2,
            numero: 2,
            categoria: 'Materiales',
            categoriaColor: '#ffc936',
            titulo: 'Materiales y cantidades',
            subtitulo: 'Verificación de equipo de laboratorio y reactivos en mesa.',
            texto: 'Comprueba que cada estudiante cuente con sus implementos antes de iniciar el montaje.',
            duracion: '00:30',
            videoUrl: '',
            subtitulos: 'Verifica los materiales y equipo de protección en tu mesa de trabajo.'
          },
          {
            id: 3,
            numero: 3,
            categoria: 'Montaje',
            categoriaColor: '#ff8a55',
            titulo: 'Montaje del Experimento',
            subtitulo: 'Instrucciones paso a paso para la construcción de la práctica.',
            texto: 'Guía el proceso de mezclado, ensamble o armado de los componentes.',
            duracion: '00:40',
            videoUrl: '',
            subtitulos: 'Sigue cuidadosamente las instrucciones de montaje.'
          },
          {
            id: 4,
            numero: 4,
            categoria: 'Resultados',
            categoriaColor: '#7ce36a',
            titulo: 'Resultados y Conclusiones',
            subtitulo: 'Análisis de datos y validación de la hipótesis.',
            texto: 'Compara lo observado con la teoría y anota los resultados en la bitácora.',
            duracion: '00:30',
            videoUrl: '',
            subtitulos: '¡Felicitaciones! Has completado la práctica experimental.'
          }
        ]
      });
    }
    setModalType('exp');
  };

  // Manejo de Materiales en el Formulario
  const handleAddMaterial = () => {
    setFormExp(prev => ({ ...prev, materiales: [...prev.materiales, ''] }));
  };

  const handleUpdateMaterial = (idx, value) => {
    setFormExp(prev => {
      const next = [...prev.materiales];
      next[idx] = value;
      return { ...prev, materiales: next };
    });
  };

  const handleRemoveMaterial = (idx) => {
    setFormExp(prev => ({
      ...prev,
      materiales: prev.materiales.filter((_, i) => i !== idx)
    }));
  };

  // Manejo de Pasos en el Formulario
  const handleAddPaso = () => {
    const nextNum = formExp.pasos.length + 1;
    setFormExp(prev => ({
      ...prev,
      pasos: [
        ...prev.pasos,
        {
          id: Date.now(),
          numero: nextNum,
          categoria: 'Montaje',
          categoriaColor: '#ff8a55',
          titulo: `Paso ${nextNum}`,
          subtitulo: 'Descripción del procedimiento',
          texto: '',
          duracion: '00:30',
          videoUrl: '',
          subtitulos: ''
        }
      ]
    }));
  };

  const handleUpdatePaso = (idx, field, value) => {
    setFormExp(prev => {
      const next = [...prev.pasos];
      next[idx] = { ...next[idx], [field]: value };
      // Actualizar color si cambia la categoría
      if (field === 'categoria') {
        const colores = {
          'Conceptos': '#2ce4ff',
          'Materiales': '#ffc936',
          'Montaje': '#ff8a55',
          'Observación': '#af78ff',
          'Medición': '#54e4a4',
          'Resultados': '#7ce36a',
          'Conclusiones': '#10b981'
        };
        next[idx].categoriaColor = colores[value] || '#00e5ff';
      }
      return { ...prev, pasos: next };
    });
  };

  const handleRemovePaso = (idx) => {
    if (formExp.pasos.length <= 1) return;
    setFormExp(prev => {
      const filtered = prev.pasos.filter((_, i) => i !== idx);
      return {
        ...prev,
        pasos: filtered.map((p, i) => ({ ...p, numero: i + 1 }))
      };
    });
  };

  const handleMovePaso = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= formExp.pasos.length) return;
    setFormExp(prev => {
      const next = [...prev.pasos];
      const temp = next[idx];
      next[idx] = next[targetIdx];
      next[targetIdx] = temp;
      return {
        ...prev,
        pasos: next.map((p, i) => ({ ...p, numero: i + 1 }))
      };
    });
  };

  const handleSaveExp = async (e) => {
    e.preventDefault();
    const materialesFiltrados = formExp.materiales.filter(m => m && m.trim().length > 0);
    const expId = editingItem ? editingItem.id : ('exp-' + Date.now());

    const pasosValidados = await Promise.all(formExp.pasos.map(async (p, i) => {
      const pasoId = p.id || i + 1;
      let mediaKey = p.mediaKey;

      if (p.pendingFile) {
        mediaKey = `media_${expId}_p${pasoId}`;
        try {
          await saveMediaFile(mediaKey, p.pendingFile, p.pendingFile.name);
        } catch (err) {
          console.error('Error al guardar archivo en IndexedDB:', err);
        }
      }

      return {
        ...p,
        id: pasoId,
        numero: i + 1,
        mediaKey: mediaKey || null,
        videoType: mediaKey ? 'file' : (p.videoUrl ? 'url' : 'none'),
        videoFileName: p.videoFileName || (p.pendingFile ? p.pendingFile.name : ''),
        videoUrl: p.videoUrl || '',
        pendingFile: undefined,
        titulo: p.titulo.trim() || `Paso ${i + 1}`,
        texto: p.texto.trim() || p.subtitulo || 'Instrucciones del paso.'
      };
    }));

    const expData = {
      titulo: formExp.titulo,
      subtitulo: formExp.subtitulo || formExp.descripcion.slice(0, 70),
      categoria: formExp.categoria,
      nivel: formExp.nivel,
      tiempoMinutos: Number(formExp.tiempoMinutos) || 30,
      descripcion: formExp.descripcion,
      hipotesis: formExp.hipotesis,
      explicacionCientifica: formExp.explicacionCientifica,
      materiales: materialesFiltrados.length > 0 ? materialesFiltrados : ['Materiales generales de laboratorio'],
      pasos: pasosValidados
    };

    if (editingItem) {
      updateExperimento(editingItem.id, expData);
      notificar('¡Experimento actualizado correctamente con videos guardados!');
    } else {
      const nuevo = addExperimento({ ...expData, id: expId });
      setActiveExpId(nuevo.id);
      notificar('¡Nuevo experimento agregado y listo para la cabina!');
    }
    setModalType(null);
  };

  // Importar JSON
  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importExperimentoJSON(event.target.result);
      if (res.success) {
        notificar(`¡Experimento "${res.exp.titulo}" importado exitosamente!`);
      } else {
        alert('Error al importar: ' + res.error);
      }
    };
    reader.readAsText(file);
  };

  // Lanzar en cabina
  const handleProbarEnCabina = (expId) => {
    setActiveExpId(expId);
    if (onLaunchNave) {
      onLaunchNave();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#040b17',
      color: '#f8fafc',
      padding: '30px 24px 60px 24px',
      fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif"
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

        {/* CABECERA INSTITUCIONAL */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          background: 'rgba(8, 22, 42, 0.9)',
          border: '1.5px solid rgba(0, 229, 255, 0.3)',
          borderRadius: '20px',
          padding: '16px 24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Logos */}
            <div style={{
              background: '#ffffff',
              padding: '4px 12px',
              borderRadius: '10px',
              border: '2px solid #00509d',
              height: '42px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <img src="./assets/images/logo_ups.png" alt="UPS" style={{ maxHeight: '32px', width: 'auto' }} />
            </div>

            <div style={{
              background: '#ffffff',
              padding: '2px 10px',
              borderRadius: '10px',
              border: '2px solid #ff7b00',
              height: '42px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <img src="./assets/images/logo_pequenos_cientificos.png" alt="PC" style={{ maxHeight: '36px', width: 'auto' }} />
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#00e5ff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Plataforma de Docentes & Gestores
              </div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                Centro de Gestión de Experimentos & Talleres
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => onLaunchNave ? onLaunchNave() : onPreviewPortal()}
              style={{
                background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                color: '#030812',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '0.88rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)'
              }}
            >
              <Rocket size={18} />
              <span>Ir a la Cabina Espacial</span>
            </button>
          </div>
        </header>

        {/* NOTIFICACIÓN FLOTANTE */}
        {mensajeExito && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1.5px solid #10b981',
            color: '#6ee7b7',
            padding: '12px 20px',
            borderRadius: '12px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 800
          }}>
            <Sparkles size={18} />
            <span>{mensajeExito}</span>
          </div>
        )}

        {/* PESTAÑAS PRINCIPALES */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '16px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('experimentos')}
              style={{
                background: activeTab === 'experimentos' ? '#00e5ff' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === 'experimentos' ? '#030812' : '#cbd5e1',
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: 900,
                fontSize: '0.92rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <FlaskConical size={18} />
              <span>Experimentos Didácticos ({experimentos.length})</span>
            </button>
          </div>

          {/* ACCIONES: NUEVO EXPERIMENTO, IMPORTAR, EXPORTAR */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              ref={jsonInputRef}
              type="file"
              accept=".json"
              onChange={handleImportFile}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => jsonInputRef.current?.click()}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '10px 16px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Upload size={16} />
              <span>Importar JSON</span>
            </button>

            <button
              onClick={() => handleOpenExpModal()}
              style={{
                background: 'linear-gradient(135deg, #ffb703 0%, #fb8500 100%)',
                color: '#030812',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: 900,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(251, 133, 0, 0.4)'
              }}
            >
              <Plus size={18} />
              <span>Nuevo Experimento</span>
            </button>
          </div>
        </div>

        {/* LISTADO DE EXPERIMENTOS ACTIVOS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px'
        }}>
          {experimentos.map((exp) => (
            <div
              key={exp.id}
              style={{
                background: 'rgba(8, 22, 42, 0.85)',
                border: '1.5px solid rgba(0, 229, 255, 0.25)',
                borderRadius: '18px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                position: 'relative'
              }}
            >
              {/* Categoría y Nivel */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  background: 'rgba(0, 229, 255, 0.15)',
                  border: '1px solid #00e5ff',
                  color: '#00e5ff',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  textTransform: 'uppercase'
                }}>
                  {exp.categoria || 'Química'}
                </span>

                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700 }}>
                  ⏱️ {exp.tiempoMinutos || 30} min · {exp.nivel || '10-18 años'}
                </span>
              </div>

              {/* Título y Resumen */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', marginBottom: '6px' }}>
                  {exp.titulo}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4, margin: 0 }}>
                  {exp.subtitulo || exp.descripcion?.slice(0, 100)}...
                </p>
              </div>

              {/* Indicadores de Materiales y Pasos */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                background: 'rgba(0, 15, 30, 0.6)',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={16} color="#ffc936" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc' }}>
                    {exp.materiales?.length || 0} Materiales
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FlaskConical size={16} color="#00e5ff" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc' }}>
                    {exp.pasos?.length || 0} Pasos
                  </span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '10px' }}>
                <button
                  onClick={() => handleProbarEnCabina(exp.id)}
                  style={{
                    flexGrow: 1,
                    background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                    color: '#030812',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Rocket size={15} />
                  <span>Probar en Cabina</span>
                </button>

                <button
                  onClick={() => handleOpenExpModal(exp)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                  title="Editar Experimento"
                >
                  <Edit3 size={15} />
                </button>

                <button
                  onClick={() => exportExperimentoJSON(exp.id)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                  title="Exportar JSON"
                >
                  <Download size={15} />
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`¿Seguro que deseas eliminar "${exp.titulo}"?`)) {
                      deleteExperimento(exp.id);
                      notificar('Experimento eliminado');
                    }
                  }}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                  title="Eliminar"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================
          MODAL AVANZADO DE CREACIÓN / EDICIÓN DE EXPERIMENTO
          ======================================================== */}
      {modalType === 'exp' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(2, 6, 16, 0.88)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '860px',
            maxHeight: '92vh',
            background: '#07152b',
            border: '2px solid #00e5ff',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 0 50px rgba(0, 229, 255, 0.4)',
            overflowY: 'auto'
          }}>
            {/* Header del Modal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FlaskConical size={26} color="#00e5ff" />
                <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#ffffff' }}>
                  {editingItem ? 'Editar Experimento' : 'Nuevo Experimento para Pequeños Científicos'}
                </h2>
              </div>
              <button
                onClick={() => setModalType(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveExp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* 1. INFORMACIÓN GENERAL */}
              <div style={{
                background: 'rgba(0, 15, 30, 0.6)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#00e5ff', margin: 0 }}>
                  1. Información Principal del Experimento
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, marginBottom: '4px' }}>
                      Título del Experimento: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Arcoíris de Densidades"
                      value={formExp.titulo}
                      onChange={(e) => setFormExp({ ...formExp, titulo: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(0, 229, 255, 0.3)',
                        color: '#ffffff',
                        fontWeight: 700
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, marginBottom: '4px' }}>
                      Categoría:
                    </label>
                    <select
                      value={formExp.categoria}
                      onChange={(e) => setFormExp({ ...formExp, categoria: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: '#0a1a30',
                        border: '1px solid rgba(0, 229, 255, 0.3)',
                        color: '#ffffff',
                        fontWeight: 700
                      }}
                    >
                      <option value="Física & Química">Física & Química</option>
                      <option value="Robótica & Electricidad">Robótica & Electricidad</option>
                      <option value="Aeroespacial & Física">Aeroespacial & Física</option>
                      <option value="Biología & Ecología">Biología & Ecología</option>
                      <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, marginBottom: '4px' }}>
                      Subtítulo / Resumen Corto:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Columna de líquidos, masa, volumen y tensión superficial"
                      value={formExp.subtitulo}
                      onChange={(e) => setFormExp({ ...formExp, subtitulo: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(0, 229, 255, 0.3)',
                        color: '#ffffff'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, marginBottom: '4px' }}>
                        Público Objetivo:
                      </label>
                      <input
                        type="text"
                        value={formExp.nivel}
                        onChange={(e) => setFormExp({ ...formExp, nivel: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(0, 229, 255, 0.3)',
                          color: '#ffffff'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, marginBottom: '4px' }}>
                        Duración (Minutos):
                      </label>
                      <input
                        type="number"
                        value={formExp.tiempoMinutos}
                        onChange={(e) => setFormExp({ ...formExp, tiempoMinutos: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(0, 229, 255, 0.3)',
                          color: '#ffffff'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, marginBottom: '4px' }}>
                    Descripción Didáctica:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Explica el objetivo de la práctica y qué aprenderán los estudiantes..."
                    value={formExp.descripcion}
                    onChange={(e) => setFormExp({ ...formExp, descripcion: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      color: '#ffffff',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>

              {/* 2. APARTADO OBLIGATORIO DE MATERIALES NECESARIOS */}
              <div style={{
                background: 'rgba(0, 15, 30, 0.6)',
                border: '1.5px solid rgba(255, 201, 54, 0.4)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers color="#ffc936" size={20} />
                    <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#ffc936', margin: 0 }}>
                      2. Apartado de Materiales Requeridos (Inicio Obligatorio)
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddMaterial}
                    style={{
                      background: 'rgba(255, 201, 54, 0.15)',
                      color: '#ffc936',
                      border: '1px solid #ffc936',
                      borderRadius: '8px',
                      padding: '4px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Plus size={14} />
                    <span>Añadir Material</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {formExp.materiales.map((mat, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        placeholder={`Material ${idx + 1} (ej. 50 ml de Miel, Probeta)`}
                        value={mat}
                        onChange={(e) => handleUpdateMaterial(idx, e.target.value)}
                        style={{
                          flexGrow: 1,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 201, 54, 0.3)',
                          color: '#ffffff',
                          fontSize: '0.85rem'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMaterial(idx)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#f87171',
                          borderRadius: '8px',
                          padding: '0 10px',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. GESTOR DE PASOS DINÁMICOS Y MULTIMEDIA */}
              <div style={{
                background: 'rgba(0, 15, 30, 0.6)',
                border: '1.5px solid rgba(0, 229, 255, 0.3)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#00e5ff', margin: 0 }}>
                      3. Guía Multimedia de Pasos ({formExp.pasos.length} Pasos Variables)
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                      Configura cada paso con su categoría, explicación y enlace/video demostrativo.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddPaso}
                    style={{
                      background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                      color: '#030812',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontSize: '0.82rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Plus size={16} />
                    <span>Agregar Paso</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {formExp.pasos.map((paso, idx) => (
                    <div
                      key={paso.id || idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(0, 229, 255, 0.25)',
                        borderRadius: '14px',
                        padding: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            background: paso.categoriaColor || '#00e5ff',
                            color: '#030812',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 900,
                            fontSize: '0.82rem'
                          }}>
                            {idx + 1}
                          </span>

                          {/* Selector de Categoría */}
                          <select
                            value={paso.categoria}
                            onChange={(e) => handleUpdatePaso(idx, 'categoria', e.target.value)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '8px',
                              background: '#0a1a30',
                              border: '1px solid #00e5ff',
                              color: paso.categoriaColor || '#00e5ff',
                              fontWeight: 900,
                              fontSize: '0.78rem'
                            }}
                          >
                            <option value="Conceptos">Conceptos</option>
                            <option value="Materiales">Materiales</option>
                            <option value="Montaje">Montaje</option>
                            <option value="Observación">Observación</option>
                            <option value="Medición">Medición</option>
                            <option value="Resultados">Resultados</option>
                            <option value="Conclusiones">Conclusiones</option>
                          </select>
                        </div>

                        {/* Botones de orden y eliminación */}
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => handleMovePaso(idx, -1)}
                            disabled={idx === 0}
                            style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#cbd5e1', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMovePaso(idx, 1)}
                            disabled={idx === formExp.pasos.length - 1}
                            style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#cbd5e1', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemovePaso(idx)}
                            style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#f87171', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Título y Subtítulo del Paso */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <input
                          type="text"
                          placeholder="Título del Paso (ej. ¿Por qué se forman capas?)"
                          value={paso.titulo}
                          onChange={(e) => handleUpdatePaso(idx, 'titulo', e.target.value)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '0.85rem'
                          }}
                        />

                        <input
                          type="text"
                          placeholder="Subtítulo / Resumen breve para subtítulo"
                          value={paso.subtitulos || paso.subtitulo || ''}
                          onChange={(e) => handleUpdatePaso(idx, 'subtitulos', e.target.value)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#ffffff',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>

                      {/* Explicación Detallada */}
                      <textarea
                        rows={2}
                        placeholder="Guía paso a paso detallada que leerán los estudiantes en este paso..."
                        value={paso.texto}
                        onChange={(e) => handleUpdatePaso(idx, 'texto', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          resize: 'vertical'
                        }}
                      />

                      {/* Recuadro de Arrastrar o Explorar Archivo de Video */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div
                          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#00e5ff'; e.currentTarget.style.background = 'rgba(0, 229, 255, 0.12)'; }}
                          onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.3)'; e.currentTarget.style.background = 'rgba(0, 229, 255, 0.03)'; }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.3)';
                            e.currentTarget.style.background = 'rgba(0, 229, 255, 0.03)';
                            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                              const file = e.dataTransfer.files[0];
                              handleUpdatePaso(idx, 'pendingFile', file);
                              handleUpdatePaso(idx, 'videoFileName', file.name);
                            }
                          }}
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'video/*,image/*';
                            input.onchange = (ev) => {
                              const file = ev.target.files[0];
                              if (file) {
                                handleUpdatePaso(idx, 'pendingFile', file);
                                handleUpdatePaso(idx, 'videoFileName', file.name);
                              }
                            };
                            input.click();
                          }}
                          style={{
                            border: '1.5px dashed rgba(0, 229, 255, 0.35)',
                            borderRadius: '10px',
                            padding: '12px 14px',
                            background: 'rgba(0, 229, 255, 0.03)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              background: 'rgba(0, 229, 255, 0.15)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#00e5ff'
                            }}>
                              <Upload size={16} />
                            </div>
                            <div>
                              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>
                                {paso.videoFileName ? `✓ ${paso.videoFileName}` : 'Arrastra un archivo de video aquí o haz clic para explorar'}
                              </div>
                              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                                Formatos admitidos: MP4, WebM, MOV, JPG, PNG
                              </div>
                            </div>
                          </div>

                          <div style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: 'rgba(0, 229, 255, 0.2)',
                            color: '#00e5ff',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <FolderOpen size={13} />
                            <span>{paso.videoFileName ? 'Cambiar' : 'Explorar'}</span>
                          </div>
                        </div>

                        {/* O ingresar URL directa / YouTube */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Video size={14} color="#00e5ff" />
                          <input
                            type="text"
                            placeholder="O pega una URL de video (YouTube / MP4 directo)"
                            value={paso.videoUrl || ''}
                            onChange={(e) => handleUpdatePaso(idx, 'videoUrl', e.target.value)}
                            style={{
                              flexGrow: 1,
                              padding: '6px 10px',
                              borderRadius: '6px',
                              background: 'rgba(0, 229, 255, 0.05)',
                              border: '1px solid rgba(0, 229, 255, 0.25)',
                              color: '#00e5ff',
                              fontSize: '0.78rem'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de Envío */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#cbd5e1',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  style={{
                    padding: '10px 26px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                    color: '#030812',
                    fontWeight: 900,
                    fontSize: '0.92rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 25px rgba(0, 229, 255, 0.4)'
                  }}
                >
                  {editingItem ? 'Guardar Cambios' : 'Publicar Experimento en Cabina'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
