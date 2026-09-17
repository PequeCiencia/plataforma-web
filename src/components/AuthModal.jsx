// AuthModal.jsx - Terminal de Acceso Institucional y Control de Roles (UPS)
import React, { useState, useEffect } from 'react';
import { useData, CREDENCIALES_DEFAULT } from '../context/DataContext';
import { 
  ShieldCheck, 
  GraduationCap, 
  Lock, 
  Mail, 
  Key, 
  Eye, 
  EyeOff, 
  X, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, targetRole = null, onSuccess }) {
  const { login, addSolicitudTaller } = useData();
  const [selectedRole, setSelectedRole] = useState(targetRole || 'docente');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modo de vista: 'login' | 'convenio'
  const [viewMode, setViewMode] = useState('login');
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

  useEffect(() => {
    if (targetRole) {
      setSelectedRole(targetRole);
    }
    if (isOpen) {
      setViewMode('login');
      setConvenioEnviado(false);
      setErrorMsg('');
    }
  }, [targetRole, isOpen]);

  const handleEnviarConvenioEmail = (e) => {
    if (e) e.preventDefault();
    if (!formConvenio.nombre || !formConvenio.institucion || !formConvenio.email) {
      alert('Por favor completa tu nombre, institución y correo de contacto.');
      return;
    }

    if (addSolicitudTaller) {
      addSolicitudTaller({
        institucion: formConvenio.institucion,
        contacto: `${formConvenio.nombre} (${formConvenio.cargo || 'Docente'})`,
        email: formConvenio.email,
        telefono: formConvenio.telefono || 'Sin teléfono',
        taller: 'Solicitud de Convenio Institucional (Acceso Docente)',
        mensaje: `Ciudad: ${formConvenio.ciudad}. Requerimiento: ${formConvenio.mensaje}`
      });
    }

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

  const cargarCredencialesSugeridas = (role) => {
    setSelectedRole(role);
    setErrorMsg('');
    if (role === 'admin') {
      setUsuario(CREDENCIALES_DEFAULT.ADMIN.usuario);
      setPassword(CREDENCIALES_DEFAULT.ADMIN.password);
    } else {
      setUsuario(CREDENCIALES_DEFAULT.DOCENTE.usuario);
      setPassword(CREDENCIALES_DEFAULT.DOCENTE.password);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(usuario, password);
    if (res.success) {
      setSuccessMsg(`¡Bienvenido, ${res.user.nombre}!`);
      setTimeout(() => {
        setSuccessMsg('');
        if (onSuccess) onSuccess(res.user);
        onClose();
      }, 700);
    } else {
      setErrorMsg(res.error);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(2, 6, 18, 0.85)',
      backdropFilter: 'blur(14px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'linear-gradient(135deg, rgba(8, 22, 45, 0.98) 0%, rgba(3, 10, 24, 0.99) 100%)',
          border: selectedRole === 'admin' ? '2px solid #f59e0b' : '2px solid #00e5ff',
          borderRadius: '24px',
          padding: '30px 26px',
          boxShadow: selectedRole === 'admin' 
            ? '0 0 40px rgba(245, 158, 11, 0.35)' 
            : '0 0 40px rgba(0, 229, 255, 0.35)',
          position: 'relative',
          animation: 'fadeIn 0.25s ease-out'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#94a3b8',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          title="Cerrar ventana"
        >
          <X size={18} />
        </button>

        {viewMode === 'convenio' ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                margin: '0 auto 12px auto',
                background: 'rgba(0, 229, 255, 0.15)',
                border: '1.5px solid #00e5ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
              }}>
                <Mail size={28} color="#00e5ff" />
              </div>

              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.35rem', fontWeight: 900, color: '#ffffff' }}>
                Solicitud de Convenio Institucional
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#00e5ff', fontWeight: 700 }}>
                Destino: pequeciencia@ups.edu.ec • UPS Sede Cuenca
              </p>
            </div>

            {convenioEnviado ? (
              <div style={{ textAlign: 'center', padding: '16px 8px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '2px solid #10b981',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px auto'
                }}>
                  <CheckCircle2 size={30} />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', marginBottom: '8px' }}>
                  ¡Solicitud Registrada y Preparada!
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '20px' }}>
                  Se ha generado la consulta oficial dirigida a <strong>pequeciencia@ups.edu.ec</strong>.
                  <br /><br />
                  La coordinación de la <strong>Universidad Politécnica Salesiana</strong> revisará la información de tu institución para responderte con los términos del convenio y la habilitación de credenciales.
                </p>
                <button
                  type="button"
                  onClick={() => setViewMode('login')}
                  className="tactile-btn"
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    background: '#00e5ff',
                    border: 'none',
                    color: '#030812',
                    fontSize: '0.9rem',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  Volver al Inicio de Sesión
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnviarConvenioEmail} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4, margin: '0 0 4px 0' }}>
                  Ingresa los datos de contacto de tu Unidad Educativa para recibir la propuesta de convenio y credenciales docentes.
                </p>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '4px' }}>
                    Nombre del Solicitante *
                  </label>
                  <input
                    type="text"
                    value={formConvenio.nombre}
                    onChange={(e) => setFormConvenio({ ...formConvenio, nombre: e.target.value })}
                    placeholder="Ej: Lcdo. Juan Pérez"
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1.5px solid rgba(0, 229, 255, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.84rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '4px' }}>
                    Institución / Unidad Educativa *
                  </label>
                  <input
                    type="text"
                    value={formConvenio.institucion}
                    onChange={(e) => setFormConvenio({ ...formConvenio, institucion: e.target.value })}
                    placeholder="Ej: Unidad Educativa Salesiana"
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1.5px solid rgba(0, 229, 255, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.84rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '4px' }}>
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      value={formConvenio.email}
                      onChange={(e) => setFormConvenio({ ...formConvenio, email: e.target.value })}
                      placeholder="contacto@colegio.edu.ec"
                      required
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1.5px solid rgba(0, 229, 255, 0.3)',
                        color: '#ffffff',
                        fontSize: '0.84rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '4px' }}>
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formConvenio.telefono}
                      onChange={(e) => setFormConvenio({ ...formConvenio, telefono: e.target.value })}
                      placeholder="0991234567"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1.5px solid rgba(0, 229, 255, 0.3)',
                        color: '#ffffff',
                        fontSize: '0.84rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '4px' }}>
                    Mensaje / Consulta
                  </label>
                  <textarea
                    rows={3}
                    value={formConvenio.mensaje}
                    onChange={(e) => setFormConvenio({ ...formConvenio, mensaje: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1.5px solid rgba(0, 229, 255, 0.3)',
                      color: '#ffffff',
                      fontSize: '0.8rem',
                      lineHeight: 1.35,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setViewMode('login')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#94a3b8',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Volver
                  </button>

                  <button
                    type="submit"
                    className="tactile-btn"
                    style={{
                      flex: 1.8,
                      padding: '10px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                      border: 'none',
                      color: '#030812',
                      fontSize: '0.86rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 0 16px rgba(0, 229, 255, 0.4)'
                    }}
                  >
                    <Mail size={15} />
                    <span>Redactar Correo (pequeciencia@ups.edu.ec)</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                margin: '0 auto 12px auto',
                background: selectedRole === 'admin' 
                  ? 'rgba(245, 158, 11, 0.15)' 
                  : 'rgba(0, 229, 255, 0.15)',
                border: selectedRole === 'admin' ? '1.5px solid #f59e0b' : '1.5px solid #00e5ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: selectedRole === 'admin' ? '0 0 20px rgba(245, 158, 11, 0.3)' : '0 0 20px rgba(0, 229, 255, 0.3)'
              }}>
                {selectedRole === 'admin' ? (
                  <ShieldCheck size={28} color="#f59e0b" />
                ) : (
                  <GraduationCap size={28} color="#00e5ff" />
                )}
              </div>

              <h3 style={{
                margin: '0 0 4px 0',
                fontSize: '1.4rem',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.02em'
              }}>
                Terminal de Acceso Institucional
              </h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8' }}>
                Universidad Politécnica Salesiana • Pequeños Científicos
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '4px',
              borderRadius: '14px',
              marginBottom: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('docente');
                  setErrorMsg('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  background: selectedRole === 'docente' 
                    ? 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)' 
                    : 'transparent',
                  color: selectedRole === 'docente' ? '#030812' : '#94a3b8',
                  boxShadow: selectedRole === 'docente' ? '0 0 16px rgba(0, 229, 255, 0.4)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <GraduationCap size={16} />
                <span>Docente UPS</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('admin');
                  setErrorMsg('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  background: selectedRole === 'admin' 
                    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
                    : 'transparent',
                  color: selectedRole === 'admin' ? '#030812' : '#94a3b8',
                  boxShadow: selectedRole === 'admin' ? '0 0 16px rgba(245, 158, 11, 0.4)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <ShieldCheck size={16} />
                <span>Administrador</span>
              </button>
            </div>

            {errorMsg && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#fca5a5',
                fontSize: '0.82rem'
              }}>
                <AlertCircle size={16} color="#ef4444" flexShrink={0} />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#6ee7b7',
                fontSize: '0.84rem',
                fontWeight: 700
              }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#94a3b8',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  Usuario o Correo Institucional
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  gap: '10px'
                }}>
                  <Mail size={16} color="#64748b" />
                  <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder={selectedRole === 'admin' ? 'admin@pequenos.ups.edu.ec o admin' : 'docente@ups.edu.ec o docente'}
                    required
                    autoFocus
                    style={{
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      width: '100%'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#94a3b8',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  Contraseña de Acceso
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  gap: '10px'
                }}>
                  <Key size={16} color="#64748b" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      width: '100%'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{
                background: 'rgba(0, 229, 255, 0.04)',
                border: '1px solid rgba(0, 229, 255, 0.18)',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '20px',
                fontSize: '0.78rem',
                lineHeight: 1.5,
                color: '#cbd5e1'
              }}>
                <div style={{ fontWeight: 800, color: selectedRole === 'admin' ? '#f59e0b' : '#00e5ff', marginBottom: '3px' }}>
                  {selectedRole === 'admin' ? '🛡️ Nivel: Control Total (Administrador)' : '👨‍🏫 Nivel: Docente de Aula'}
                </div>
                {selectedRole === 'admin' ? (
                  <span>Acceso total para editar, agregar y borrar tanto experimentos oficiales como creados por docentes.</span>
                ) : (
                  <span>Puedes crear nuevos experimentos para tus clases y editarlos. Los experimentos oficiales de Pequeños Científicos están protegidos en modo solo lectura.</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => cargarCredencialesSugeridas(selectedRole)}
                style={{
                  width: '100%',
                  marginBottom: '14px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px dashed rgba(255, 255, 255, 0.2)',
                  color: '#38bdf8',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={14} />
                <span>Usar credenciales de prueba ({selectedRole === 'admin' ? 'admin / admin123' : 'docente / docente123'})</span>
              </button>

              <button
                type="submit"
                className="tactile-btn"
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: 'none',
                  background: selectedRole === 'admin'
                    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                    : 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
                  color: '#030812',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: selectedRole === 'admin'
                    ? '0 0 20px rgba(245, 158, 11, 0.4)'
                    : '0 0 20px rgba(0, 229, 255, 0.4)'
                }}
              >
                <span>Ingresar al Sistema</span>
                <ArrowRight size={18} />
              </button>

              {/* Botón para solicitar convenio institucional */}
              <div style={{
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginBottom: '8px' }}>
                  ¿Tu institución educativa aún no cuenta con convenio?
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setConvenioEnviado(false);
                    setViewMode('convenio');
                  }}
                  style={{
                    width: '100%',
                    background: 'rgba(245, 158, 11, 0.12)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    color: '#fbbf24',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Mail size={14} />
                  <span>Solicitar Información para Convenio (pequeciencia@ups.edu.ec)</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
