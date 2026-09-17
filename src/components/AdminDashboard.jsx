import React, { useState, useRef, useEffect } from 'react';
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
  FileVideo,
  Lock,
  Key,
  ShieldAlert,
  LogOut,
  UserCheck,
  Users,
  Phone,
  Mail,
  School
} from 'lucide-react';

export default function AdminDashboard({ onPreviewPortal, onLaunchNave }) {
  const { 
    talleres, addTaller, updateTaller, deleteTaller,
    experimentos, addExperimento, updateExperimento, deleteExperimento,
    setActiveExpId, exportExperimentoJSON, importExperimentoJSON,
    kits, addKit, updateKit, deleteKit,
    solicitudesTalleres, addSolicitudTaller,
    resetearDatos,
    currentUser,
    userRole,
    openAuthModal,
    logout
  } = useData();

  const [activeTab, setActiveTab] = useState('experimentos'); // 'experimentos' | 'talleres' | 'kits'
  const [modalType, setModalType] = useState(null); // 'exp' | 'taller' | 'kit'
  const [editingItem, setEditingItem] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');
  const jsonInputRef = useRef(null);

  // 📝 Estado para Solicitud de Convenio Institucional (Público General)
  const [isConvenioModalOpen, setIsConvenioModalOpen] = useState(false);
  const [convenioEnviado, setConvenioEnviado] = useState(false);
  const [formConvenio, setFormConvenio] = useState({
    nombre: '',
    institucion: '',
    cargo: 'Docente',
    email: '',
    telefono: '',
    ciudad: 'Cuenca',
    mensaje: 'Estimado equipo de Pequeños Científicos UPS, nos comunicamos en representación de nuestra institución con el interés de conocer los requisitos y el procedimiento para establecer un convenio institucional. Deseamos que nuestros docentes y estudiantes puedan acceder a la plataforma educativa, talleres y recursos didácticos de ciencias y robótica. Agradecemos su respuesta e información.'
  });

  const handleEnviarConvenioEmail = (e) => {
    if (e) e.preventDefault();
    if (!formConvenio.nombre || !formConvenio.institucion || !formConvenio.email) {
      alert('Por favor completa al menos tu nombre, institución y correo de contacto.');
      return;
    }

    // Registrar en solicitudes locales para visualización administrativa
    if (addSolicitudTaller) {
      addSolicitudTaller({
        institucion: formConvenio.institucion,
        contacto: `${formConvenio.nombre} (${formConvenio.cargo || 'Docente'})`,
        email: formConvenio.email,
        telefono: formConvenio.telefono || 'Sin teléfono',
        taller: 'Solicitud de Convenio Institucional (Gestión Docente)',
        mensaje: `Ciudad: ${formConvenio.ciudad}. Requerimiento: ${formConvenio.mensaje}`
      });
    }

    // Generar enlace mailto hacia pequeciencia@ups.edu.ec
    const subject = encodeURIComponent(`Solicitud de Convenio Institucional - ${formConvenio.institucion}`);
    const body = encodeURIComponent(
`SOLICITUD DE INFORMACIÓN PARA CONVENIO INSTITUCIONAL
UNIVERSIDAD POLITÉCNICA SALESIANA - PEQUEÑOS CIENTÍFICOS

• Persona Interesada: ${formConvenio.nombre}
• Cargo / Función: ${formConvenio.cargo}
• Unidad Educativa / Institución: ${formConvenio.institucion}
• Ciudad / Ubicación: ${formConvenio.ciudad}
• Correo de Contacto: ${formConvenio.email}
• Teléfono / WhatsApp: ${formConvenio.telefono}

• Requerimiento / Mensaje:
${formConvenio.mensaje}

---
Mensaje generado desde la Plataforma Pequeños Científicos (UPS Sede Cuenca)`
    );

    window.open(`mailto:pequeciencia@ups.edu.ec?subject=${subject}&body=${body}`, '_blank');
    setConvenioEnviado(true);
  };

  // Formulario Completo de Experimento con Pasos Dinámicos
  const [formExp, setFormExp] = useState({
    titulo: '',
    subtitulo: '',
    categoria: 'Ciencias Tecnológicas (Mundo Eléctrico)',
    tipo: 'video', // 'video' | 'robotica_3d'
    visor3dUrl: '',
    pdfManualUrl: '',
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
    if (item && userRole === 'docente') {
      const isOficial = item.esOficial || item.id === 'exp-papelitos' || item.id === 'exp-robotica-basebot';
      if (isOficial) {
        alert('Este experimento es oficial de Pequeños Científicos (UPS) y está protegido. Los docentes tienen permisos de sólo lectura sobre los experimentos institucionales.');
        return;
      }
    }
    setEditingItem(item);
    if (item) {
      const isBasebot = item.id === 'exp-robotica-basebot';
      setFormExp({
        titulo: item.titulo || '',
        subtitulo: item.subtitulo || '',
        categoria: item.categoria || (isBasebot ? 'Robótica' : 'Física & Química'),
        tipo: item.tipo || (item.visor3dUrl || isBasebot ? 'robotica_3d' : 'video'),
        visor3dUrl: item.visor3dUrl || (isBasebot ? 'https://instructions.online/?id=4093-VEX_IQ_Basebot_2.0' : ''),
        pdfManualUrl: item.pdfManualUrl || (isBasebot ? 'https://content.vexrobotics.com/stem-labs/iq/builds/basebot/iq-2nd-gen-basebot-rev12.pdf' : ''),
        nivel: item.nivel || '10 a 18 años',
        tiempoMinutos: item.tiempoMinutos || 30,
        descripcion: item.descripcion || '',
        hipotesis: item.hipotesis || '',
        explicacionCientifica: item.explicacionCientifica || '',
        materiales: item.materiales && item.materiales.length > 0 ? item.materiales : [],
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
        })) : []
      });
    } else {
      setFormExp({
        titulo: '',
        subtitulo: '',
        categoria: 'Robótica',
        tipo: 'robotica_3d',
        visor3dUrl: '',
        pdfManualUrl: '',
        nivel: '8 a 16 años',
        tiempoMinutos: 45,
        descripcion: '',
        hipotesis: '',
        explicacionCientifica: '',
        materiales: [],
        pasos: []
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
          'Alistamiento': '#38bdf8',
          'Montaje': '#ff8a55',
          'Observación': '#af78ff',
          'Medición': '#54e4a4',
          'Resultados': '#7ce36a',
          'Conclusiones': '#10b981',
          'Seguridad': '#f43f5e',
          'Hipótesis': '#a855f7'
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
      tipo: formExp.tipo || (formExp.visor3dUrl ? 'robotica_3d' : 'video'),
      visor3dUrl: formExp.visor3dUrl ? formExp.visor3dUrl.trim() : '',
      pdfManualUrl: formExp.pdfManualUrl ? formExp.pdfManualUrl.trim() : '',
      nivel: formExp.nivel,
      tiempoMinutos: Number(formExp.tiempoMinutos) || 30,
      descripcion: formExp.descripcion,
      hipotesis: formExp.hipotesis,
      explicacionCientifica: formExp.explicacionCientifica,
      materiales: formExp.tipo === 'robotica_3d' ? [] : materialesFiltrados,
      pasos: formExp.tipo === 'robotica_3d' ? [] : pasosValidados
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

  const isLocked = userRole !== 'docente' && userRole !== 'admin';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#040b17',
      color: '#f8fafc',
      padding: '30px 24px 60px 24px',
      fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
      position: 'relative'
    }}>
      {/* 🔒 VENTANA FLOTANTE DE BLOQUEO INSTITUCIONAL (FONDO CON BLUR) */}
      {isLocked && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: 'rgba(3, 8, 18, 0.72)',
          backdropFilter: 'blur(8px)',
          overflowY: 'auto'
        }}>
          <div style={{
            maxWidth: '620px',
            width: '100%',
            background: 'linear-gradient(135deg, rgba(12, 26, 48, 0.98) 0%, rgba(3, 10, 24, 0.99) 100%)',
            border: '2px solid rgba(245, 158, 11, 0.6)',
            borderRadius: '28px',
            padding: '36px 32px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(245, 158, 11, 0.25)',
            textAlign: 'center',
            position: 'relative',
            animation: 'fadeIn 0.25s ease-out'
          }}>
            {/* Logos Superiores UPS y Pequeños Científicos */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '22px' }}>
              <div style={{
                background: '#ffffff',
                padding: '4px 12px',
                borderRadius: '10px',
                border: '2px solid #00509d',
                height: '42px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <img src="./assets/images/logo_ups.png" alt="UPS" style={{ maxHeight: '30px', width: 'auto' }} />
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
                <img src="./assets/images/logo_pequenos_cientificos.png" alt="PC" style={{ maxHeight: '34px', width: 'auto' }} />
              </div>
            </div>

            {/* Icono Candado */}
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '20px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '2px solid #f59e0b',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 0 25px rgba(245, 158, 11, 0.3)'
            }}>
              <Lock size={34} />
            </div>

            {/* Badge de Restricción */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid #f59e0b',
              borderRadius: '9999px',
              padding: '5px 16px',
              color: '#fbbf24',
              fontSize: '0.74rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '14px'
            }}>
              <ShieldAlert size={14} />
              <span>Apartado Inhabilitado para Público General</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 1.9rem)',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '14px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              Área de Gestión Docente Reservada
            </h2>

            <p style={{
              fontSize: '0.94rem',
              color: '#cbd5e1',
              lineHeight: 1.6,
              marginBottom: '26px',
              maxWidth: '520px',
              marginInline: 'auto'
            }}>
              El panel de planificación didáctica, creación y calibración de experimentos está restringido exclusivamente a <strong>docentes y directivos de instituciones educativas con convenio vigente</strong> con la <strong>Universidad Politécnica Salesiana</strong> o miembros acreditados de <strong>Pequeños Científicos</strong>.
            </p>

            {/* Botones de Acción */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxWidth: '480px',
              margin: '0 auto 18px auto'
            }}>
              <button
                onClick={() => openAuthModal('docente')}
                className="tactile-btn"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                  border: 'none',
                  color: '#030812',
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 0 25px rgba(0, 229, 255, 0.4)'
                }}
              >
                <Key size={18} />
                <span>Iniciar Sesión con Credenciales</span>
              </button>

              <button
                onClick={() => {
                  setConvenioEnviado(false);
                  setIsConvenioModalOpen(true);
                }}
                className="tactile-btn"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1.5px solid #f59e0b',
                  color: '#fbbf24',
                  fontSize: '0.92rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)'
                }}
              >
                <Mail size={18} />
                <span>Solicitar Información para Convenio Institucional</span>
              </button>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', marginTop: '14px' }}>
              <button
                onClick={onPreviewPortal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>← Volver a la Página Principal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENEDOR DEL DASHBOARD (CON FILTRO BLUR CUANDO NO ESTÁ AUTENTICADO) */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        filter: isLocked ? 'blur(12px)' : 'none',
        pointerEvents: isLocked ? 'none' : 'auto',
        userSelect: isLocked ? 'none' : 'auto',
        opacity: isLocked ? 0.35 : 1,
        transition: 'all 0.3s ease'
      }}>

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
          marginBottom: '24px'
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Indicador de Rol Activo */}
            {userRole === 'admin' ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 0, 127, 0.15)',
                border: '1.5px solid #ff007f',
                padding: '6px 14px',
                borderRadius: '12px',
                color: '#ff77c6'
              }}>
                <ShieldCheck size={18} color="#ff007f" />
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase', color: '#ff77c6' }}>Rol de Acceso</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>🛡️ Administrador Global</div>
                </div>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0, 229, 255, 0.15)',
                border: '1.5px solid #00e5ff',
                padding: '6px 14px',
                borderRadius: '12px',
                color: '#00e5ff'
              }}>
                <UserCheck size={18} color="#00e5ff" />
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase', color: '#00e5ff' }}>Rol de Acceso</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>👨‍🏫 Docente UPS ({currentUser?.nombre || 'Docente'})</div>
                </div>
              </div>
            )}

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

            <button
              onClick={logout}
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#fca5a5',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Cerrar sesión institucional"
            >
              <LogOut size={16} />
              <span>Salir</span>
            </button>
          </div>
        </header>

        {/* BANNER INFORMATIVO PARA DOCENTES */}
        {userRole === 'docente' && (
          <div style={{
            background: 'rgba(0, 229, 255, 0.08)',
            border: '1.5px solid rgba(0, 229, 255, 0.3)',
            borderRadius: '16px',
            padding: '14px 20px',
            marginBottom: '22px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: '#cbd5e1',
            fontSize: '0.88rem',
            lineHeight: 1.5
          }}>
            <ShieldAlert size={22} color="#00e5ff" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#00e5ff' }}>Modo Docente de Aula:</strong> Tienes permisos para crear nuevos experimentos didácticos y personalizar tus propias guías de clase. Las prácticas maestras certificadas por <em>Pequeños Científicos (UPS)</em> están protegidas en modo de sólo lectura para garantizar la estabilidad curricular.
            </div>
          </div>
        )}

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
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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

            <button
              onClick={() => setActiveTab('solicitudes')}
              style={{
                background: activeTab === 'solicitudes' ? '#00e5ff' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === 'solicitudes' ? '#030812' : '#cbd5e1',
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
              <Users size={18} />
              <span>Solicitudes de Talleres ({(solicitudesTalleres || []).length})</span>
            </button>
          </div>

          {/* ACCIONES: NUEVO EXPERIMENTO, IMPORTAR, EXPORTAR */}
          {activeTab === 'experimentos' && (
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
          )}
        </div>

        {/* LISTADO DE EXPERIMENTOS ACTIVOS */}
        {activeTab === 'experimentos' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px'
        }}>
          {experimentos.map((exp) => {
            const isOficial = exp.esOficial || exp.id === 'exp-papelitos' || exp.id === 'exp-robotica-basebot';
            const puedeEditar = userRole === 'admin' || (!isOficial && (exp.creador === 'docente' || !exp.esOficial));
            const puedeEliminar = userRole === 'admin' || (!isOficial && (exp.creador === 'docente' || !exp.esOficial));

            return (
              <div
                key={exp.id}
                style={{
                  background: 'rgba(8, 22, 42, 0.85)',
                  border: isOficial ? '1.5px solid rgba(251, 133, 0, 0.35)' : '1.5px solid rgba(0, 229, 255, 0.25)',
                  borderRadius: '18px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                  position: 'relative'
                }}
              >
                {/* Categoría, Indicadores Oficial / 3D / PDF y Nivel */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
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

                    {isOficial ? (
                      <span style={{
                        background: 'rgba(251, 133, 0, 0.18)',
                        border: '1px solid #fb8500',
                        color: '#fb8500',
                        padding: '2px 8px',
                        borderRadius: '16px',
                        fontSize: '0.68rem',
                        fontWeight: 900,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <ShieldCheck size={11} />
                        OFICIAL PEQUEÑOS CIENTÍFICOS
                      </span>
                    ) : (
                      <span style={{
                        background: 'rgba(56, 189, 248, 0.15)',
                        border: '1px solid #38bdf8',
                        color: '#7dd3fc',
                        padding: '2px 8px',
                        borderRadius: '16px',
                        fontSize: '0.68rem',
                        fontWeight: 800
                      }}>
                        👨‍🏫 PRÁCTICA DE AULA
                      </span>
                    )}

                    {(exp.visor3dUrl || exp.tipo === 'robotica_3d') && (
                      <span style={{
                        background: 'rgba(16, 185, 129, 0.18)',
                        border: '1px solid #10b981',
                        color: '#34d399',
                        padding: '2px 8px',
                        borderRadius: '16px',
                        fontSize: '0.68rem',
                        fontWeight: 900
                      }}>
                        🪐 3D INTERACTIVO
                      </span>
                    )}

                    {exp.pdfManualUrl && (
                      <span style={{
                        background: 'rgba(255, 0, 127, 0.18)',
                        border: '1px solid #ff007f',
                        color: '#ff007f',
                        padding: '2px 8px',
                        borderRadius: '16px',
                        fontSize: '0.68rem',
                        fontWeight: 900
                      }}>
                        📄 MANUAL PDF
                      </span>
                    )}
                  </div>

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

                  {puedeEditar ? (
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
                  ) : (
                    <button
                      disabled
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: '#64748b',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        cursor: 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Experimento oficial institucional protegido (Sólo lectura para docentes)"
                    >
                      <Lock size={15} />
                    </button>
                  )}

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

                  {puedeEliminar ? (
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
                  ) : (
                    <button
                      disabled
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        color: '#475569',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        cursor: 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Experimento oficial institucional protegido (No eliminable)"
                    >
                      <Lock size={15} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* ========================================================
            LISTADO DE SOLICITUDES DE TALLERES INSTITUCIONALES
            ======================================================== */}
        {activeTab === 'solicitudes' && (
          <div>
            {(!solicitudesTalleres || solicitudesTalleres.length === 0) ? (
              <div style={{
                textAlign: 'center',
                padding: '48px 24px',
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: '18px',
                border: '1px dashed rgba(0, 229, 255, 0.3)',
                color: '#94a3b8'
              }}>
                <School size={44} color="#00e5ff" style={{ margin: '0 auto 16px', display: 'block' }} />
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '8px', fontWeight: 800 }}>
                  Aún no hay solicitudes de talleres registradas
                </h3>
                <p style={{ fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
                  Cuando las instituciones educativas o docentes envíen el formulario en la pestaña de <strong>Talleres</strong>, sus solicitudes aparecerán listadas aquí con todos sus datos de contacto y taller requerido.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                    Mostrando <strong>{solicitudesTalleres.length}</strong> solicitud(es) recibida(s):
                  </span>
                </div>
                {solicitudesTalleres.map((sol) => (
                  <div key={sol.id} style={{
                    padding: '20px 24px',
                    borderRadius: '16px',
                    background: 'rgba(8, 22, 42, 0.85)',
                    border: '1px solid rgba(0, 229, 255, 0.25)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
                  }}>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <School size={20} color="#00e5ff" />
                        <h4 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 900, margin: 0 }}>
                          {sol.institucion}
                        </h4>
                        <span style={{
                          fontSize: '0.72rem',
                          color: '#38bdf8',
                          background: 'rgba(0, 229, 255, 0.12)',
                          border: '1px solid rgba(0, 229, 255, 0.25)',
                          padding: '3px 10px',
                          borderRadius: '8px',
                          fontWeight: 700
                        }}>
                          📅 {sol.fecha}
                        </span>
                      </div>

                      <div style={{
                        display: 'inline-block',
                        fontSize: '0.85rem',
                        color: '#ffb703',
                        fontWeight: 800,
                        marginBottom: '10px',
                        background: 'rgba(251, 133, 0, 0.1)',
                        padding: '4px 12px',
                        borderRadius: '6px'
                      }}>
                        🎯 Taller Solicitado: {sol.tallerInteres}
                      </div>

                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '0.84rem', color: '#cbd5e1' }}>
                        {sol.contacto && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <UserCheck size={14} color="#00e5ff" />
                            Contacto: <strong>{sol.contacto}</strong>
                          </span>
                        )}
                        {sol.email && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Mail size={14} color="#00e5ff" />
                            Email: <a href={`mailto:${sol.email}`} style={{ color: '#00e5ff', textDecoration: 'none' }}>{sol.email}</a>
                          </span>
                        )}
                        {sol.telefono && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Phone size={14} color="#00e5ff" />
                            Tel: <strong>{sol.telefono}</strong>
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="badge badge-cyan" style={{ fontSize: '0.78rem', padding: '6px 14px' }}>
                      ● Solicitud Registrada
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
                      <option value="Taller de Robótica">Taller de Robótica</option>
                      <option value="Ciencias Tecnológicas (Mundo Eléctrico)">Ciencias Tecnológicas (Mundo Eléctrico)</option>
                      <option value="Ciencias Tecnológicas (Mundo Magnético)">Ciencias Tecnológicas (Mundo Magnético)</option>
                      <option value="Ciencias Tecnológicas (Mundo Verde)">Ciencias Tecnológicas (Mundo Verde)</option>
                      <option value="Ciencias Tecnológicas (Mundo Digital)">Ciencias Tecnológicas (Mundo Digital)</option>
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

              {/* 2. MODALIDAD & RECURSOS DIGITALES (VISOR 3D VEX / MANUAL PDF) */}
              <div style={{
                background: 'rgba(0, 229, 255, 0.04)',
                border: '1.5px solid rgba(0, 229, 255, 0.35)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Rocket color="#00e5ff" size={20} />
                    <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#00e5ff', margin: 0 }}>
                      2. Modalidad & Recursos Digitales (Visor 3D / VEX & Manual PDF)
                    </h3>
                  </div>

                  {/* Selector de tipo */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setFormExp({ ...formExp, tipo: 'video' })}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        background: formExp.tipo !== 'robotica_3d' ? 'rgba(0, 229, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1.5px solid ${formExp.tipo !== 'robotica_3d' ? '#00e5ff' : 'rgba(255, 255, 255, 0.15)'}`,
                        color: formExp.tipo !== 'robotica_3d' ? '#00e5ff' : '#94a3b8'
                      }}
                    >
                      🎥 Video Guiado (Ciencias)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormExp({ ...formExp, tipo: 'robotica_3d', categoria: 'Robótica' })}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        background: formExp.tipo === 'robotica_3d' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1.5px solid ${formExp.tipo === 'robotica_3d' ? '#10b981' : 'rgba(255, 255, 255, 0.15)'}`,
                        color: formExp.tipo === 'robotica_3d' ? '#10b981' : '#94a3b8'
                      }}
                    >
                      🤖 Robótica 3D / VEX
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {/* ENLACE AL VISOR 3D */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800, marginBottom: '4px' }}>
                      🪐 Enlace al Visor 3D Interactivo (URL):
                    </label>
                    <input
                      type="url"
                      placeholder="Ej. https://instructions.online/?id=4093-VEX_IQ_Basebot_2.0"
                      value={formExp.visor3dUrl || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormExp({ 
                          ...formExp, 
                          visor3dUrl: val,
                          tipo: val.trim().length > 0 ? 'robotica_3d' : formExp.tipo 
                        });
                      }}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(0, 229, 255, 0.35)',
                        color: '#ffffff',
                        fontSize: '0.84rem'
                      }}
                    />
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                      Pega aquí el enlace de <strong>VEX IQ (instructions.online)</strong>, Sketchfab o tu visor CAD 3D.
                    </span>
                  </div>

                  {/* ENLACE AL MANUAL PDF */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#ff007f', fontWeight: 800, marginBottom: '4px' }}>
                      📄 Enlace al Manual PDF Oficial (URL):
                    </label>
                    <input
                      type="url"
                      placeholder="Ej. https://content.vexrobotics.com/stem-labs/iq/builds/basebot/...pdf"
                      value={formExp.pdfManualUrl || ''}
                      onChange={(e) => setFormExp({ ...formExp, pdfManualUrl: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 0, 127, 0.35)',
                        color: '#ffffff',
                        fontSize: '0.84rem'
                      }}
                    />
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                      Pega aquí el enlace al <strong>manual oficial descargable en PDF</strong> para proyectar o consultar planos.
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. APARTADO DE MATERIALES & GUÍA DE PASOS (SÓLO PARA MODO VIDEO / CIENCIAS) */}
              {formExp.tipo === 'robotica_3d' ? (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1.5px dashed rgba(16, 185, 129, 0.45)',
                  borderRadius: '16px',
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px'
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1.5px solid #10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.25)'
                  }}>
                    <Rocket color="#10b981" size={26} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 6px 0', color: '#34d399', fontSize: '1.05rem', fontWeight: 900 }}>
                      Modo Robótica 3D Autónomo Activo
                    </h4>
                    <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.86rem', lineHeight: 1.55 }}>
                      En este modo de <strong>Robótica</strong>, los pasos de armado y la lista interactiva de componentes son gestionados directamente por el visor CAD 3D interactivo y el manual técnico en PDF. Las secciones de pasos manuales y materiales quedan desactivadas para mantener la interfaz despejada y optimizar el visor.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* APARTADO DE MATERIALES REQUERIDOS */}
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
                          3. Apartado de Materiales Requeridos ({formExp.materiales.length})
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
                      {formExp.materiales.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '0.84rem' }}>
                          No hay materiales registrados. Haz clic en "+ Añadir Material" para agregar piezas o reactivos.
                        </div>
                      ) : (
                        formExp.materiales.map((mat, idx) => (
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
                  )))}
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
                  {formExp.pasos.length === 0 ? (
                    <div style={{
                      padding: '24px',
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '12px',
                      border: '1px dashed rgba(0, 229, 255, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                        No hay pasos configurados aún para este experimento.
                      </span>
                      <button
                        type="button"
                        onClick={handleAddPaso}
                        style={{
                          background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                          color: '#030812',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 18px',
                          fontSize: '0.84rem',
                          fontWeight: 900,
                          cursor: 'pointer'
                        }}
                      >
                        + Agregar Primer Paso
                      </button>
                    </div>
                  ) : (
                    formExp.pasos.map((paso, idx) => (
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

                          {/* Selector de Categoría / Personalizado */}
                          {!paso._isCustom && ['Conceptos', 'Materiales', 'Alistamiento', 'Montaje', 'Observación', 'Medición', 'Resultados', 'Conclusiones', 'Seguridad', 'Hipótesis'].includes(paso.categoria) ? (
                            <select
                              value={paso.categoria}
                              onChange={(e) => {
                                if (e.target.value === '__custom__') {
                                  handleUpdatePaso(idx, '_isCustom', true);
                                  handleUpdatePaso(idx, 'categoria', '');
                                } else {
                                  handleUpdatePaso(idx, 'categoria', e.target.value);
                                }
                              }}
                              style={{
                                padding: '4px 8px',
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
                              <option value="Alistamiento">Alistamiento</option>
                              <option value="Montaje">Montaje</option>
                              <option value="Observación">Observación</option>
                              <option value="Medición">Medición</option>
                              <option value="Resultados">Resultados</option>
                              <option value="Conclusiones">Conclusiones</option>
                              <option value="Seguridad">Seguridad</option>
                              <option value="Hipótesis">Hipótesis</option>
                              <option value="__custom__">✏️ + Personalizado...</option>
                            </select>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <input
                                type="text"
                                value={paso.categoria}
                                placeholder="Escribe categoría..."
                                onChange={(e) => handleUpdatePaso(idx, 'categoria', e.target.value)}
                                style={{
                                  padding: '4px 8px',
                                  borderRadius: '8px',
                                  background: 'rgba(0, 229, 255, 0.12)',
                                  border: '1.5px solid #00e5ff',
                                  color: '#ffffff',
                                  fontWeight: 800,
                                  fontSize: '0.78rem',
                                  width: '135px'
                                }}
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  handleUpdatePaso(idx, '_isCustom', false);
                                  handleUpdatePaso(idx, 'categoria', 'Conceptos');
                                }}
                                title="Volver a lista predefinida"
                                style={{
                                  background: 'rgba(255,255,255,0.08)',
                                  border: '1px solid rgba(255,255,255,0.2)',
                                  color: '#94a3b8',
                                  borderRadius: '6px',
                                  padding: '3px 6px',
                                  fontSize: '0.7rem',
                                  cursor: 'pointer'
                                }}
                              >
                                ✕ Lista
                              </button>
                            </div>
                          )}
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
                  )))}
                </div>
              </div>
            </>
          )}

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

      {/* 📩 MODAL DE SOLICITUD DE INFORMACIÓN PARA CONVENIO INSTITUCIONAL */}
      {isConvenioModalOpen && (
        <div 
          onClick={() => setIsConvenioModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(2, 6, 18, 0.88)',
            backdropFilter: 'blur(14px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '560px',
              background: 'linear-gradient(135deg, rgba(8, 22, 45, 0.98) 0%, rgba(3, 10, 24, 0.99) 100%)',
              border: '2px solid #00e5ff',
              borderRadius: '24px',
              padding: '30px 28px',
              boxShadow: '0 0 50px rgba(0, 229, 255, 0.35)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button
              onClick={() => setIsConvenioModalOpen(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>

            {convenioEnviado ? (
              <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '2px solid #10b981',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', marginBottom: '10px' }}>
                  ¡Solicitud de Convenio Registrada!
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
                  Se ha preparado tu mensaje oficial dirigido a <strong>pequeciencia@ups.edu.ec</strong> y se ha almacenado en nuestra base institucional para su debido seguimiento.
                  <br /><br />
                  La coordinación de <strong>Pequeños Científicos (Universidad Politécnica Salesiana - Sede Cuenca)</strong> revisará los datos de tu institución y se pondrá en contacto a la brevedad para dar respuesta con los términos del convenio y la habilitación de credenciales.
                </p>
                <button
                  onClick={() => setIsConvenioModalOpen(false)}
                  className="tactile-btn"
                  style={{
                    padding: '12px 28px',
                    borderRadius: '12px',
                    background: '#10b981',
                    border: 'none',
                    color: '#030812',
                    fontSize: '0.95rem',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  Entendido y Finalizar
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: 'rgba(0, 229, 255, 0.15)',
                    border: '1.5px solid #00e5ff',
                    color: '#00e5ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                      Solicitud de Convenio Institucional
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: '#00e5ff', fontWeight: 800 }}>
                      Destino Oficial: pequeciencia@ups.edu.ec
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '18px' }}>
                  Ingresa los datos de contacto de tu Unidad Educativa. Podrás enviar un correo preformateado y guardar el requerimiento para que el equipo UPS te dé respuesta con la información del convenio.
                </p>

                <form onSubmit={handleEnviarConvenioEmail} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '4px' }}>
                        Nombre del Solicitante *
                      </label>
                      <input
                        type="text"
                        value={formConvenio.nombre}
                        onChange={(e) => setFormConvenio({ ...formConvenio, nombre: e.target.value })}
                        placeholder="Ej: Lcda. Mónica Vintimilla"
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1.5px solid rgba(0, 229, 255, 0.3)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '4px' }}>
                        Cargo Institucional
                      </label>
                      <input
                        type="text"
                        value={formConvenio.cargo}
                        onChange={(e) => setFormConvenio({ ...formConvenio, cargo: e.target.value })}
                        placeholder="Rector/a, Coordinador/a, Docente"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1.5px solid rgba(0, 229, 255, 0.3)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '4px' }}>
                      Institución / Unidad Educativa *
                    </label>
                    <input
                      type="text"
                      value={formConvenio.institucion}
                      onChange={(e) => setFormConvenio({ ...formConvenio, institucion: e.target.value })}
                      placeholder="Ej: Unidad Educativa Técnico Salesiano"
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1.5px solid rgba(0, 229, 255, 0.3)',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '4px' }}>
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        value={formConvenio.email}
                        onChange={(e) => setFormConvenio({ ...formConvenio, email: e.target.value })}
                        placeholder="contacto@institucion.edu.ec"
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1.5px solid rgba(0, 229, 255, 0.3)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '4px' }}>
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formConvenio.telefono}
                        onChange={(e) => setFormConvenio({ ...formConvenio, telefono: e.target.value })}
                        placeholder="0991234567"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1.5px solid rgba(0, 229, 255, 0.3)',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '4px' }}>
                      Mensaje / Requerimiento Específico
                    </label>
                    <textarea
                      rows={4}
                      value={formConvenio.mensaje}
                      onChange={(e) => setFormConvenio({ ...formConvenio, mensaje: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1.5px solid rgba(0, 229, 255, 0.3)',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        lineHeight: 1.4,
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setIsConvenioModalOpen(false)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#94a3b8',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      className="tactile-btn"
                      style={{
                        flex: 2,
                        padding: '12px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                        border: 'none',
                        color: '#030812',
                        fontSize: '0.92rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)'
                      }}
                    >
                      <Mail size={16} />
                      <span>Redactar Correo (pequeciencia@ups.edu.ec)</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
