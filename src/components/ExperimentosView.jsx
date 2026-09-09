// ExperimentosView.jsx - Laboratorio interactivo para docentes y clases escolares
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import confetti from 'canvas-confetti';
import { 
  FlaskConical, 
  Search, 
  Clock, 
  Sparkles, 
  Play, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  HelpCircle, 
  Lightbulb, 
  Award,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export default function ExperimentosView({ onNavigate }) {
  const { experimentos, setActiveExpId } = useData();
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExp, setSelectedExp] = useState(null);
  
  // Estado para el modo de proyección interactiva
  const [pasoActual, setPasoActual] = useState(0);
  const [materialesChequeados, setMaterialesChequeados] = useState({});
  const [timerActivo, setTimerActivo] = useState(false);
  const [segundosRestantes, setSegundosRestantes] = useState(60);
  const [hipotesisSeleccionada, setHipotesisSeleccionada] = useState(null);
  const [experimentoFinalizado, setExperimentoFinalizado] = useState(false);

  const categorias = ['Todas', 'Química', 'Física', 'Electricidad', 'Aeroespacial'];

  const experimentosFiltrados = experimentos.filter(exp => {
    const coincideCat = categoriaFiltro === 'Todas' || exp.categoria.toLowerCase() === categoriaFiltro.toLowerCase();
    const coincideSearch = exp.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           exp.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return coincideCat && coincideSearch;
  });

  // Temporizador para el aula
  useEffect(() => {
    let interval = null;
    if (timerActivo && segundosRestantes > 0) {
      interval = setInterval(() => setSegundosRestantes(s => s - 1), 1000);
    } else if (segundosRestantes === 0) {
      setTimerActivo(false);
    }
    return () => clearInterval(interval);
  }, [timerActivo, segundosRestantes]);

  const abrirModoProyeccion = (exp) => {
    setSelectedExp(exp);
    setPasoActual(0);
    setMaterialesChequeados({});
    setTimerActivo(false);
    setSegundosRestantes(60);
    setHipotesisSeleccionada(null);
    setExperimentoFinalizado(false);
  };

  const toggleMaterial = (index) => {
    setMaterialesChequeados(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const finalizarExperimento = () => {
    setExperimentoFinalizado(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Cabecera Principal */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '14px' }}>
            Laboratorio Interactivo Docente
          </span>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
            color: '#ffffff',
            marginBottom: '14px',
            letterSpacing: '-0.02em'
          }}>
            Experimentos de Aula
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Guías didácticas con la <strong>Dra. Electra</strong> listas para proyectar en el salón de clases. Fomenta el método científico con hipótesis, pasos en vivo y explicaciones accesibles.
          </p>
        </div>

        {/* Barra de Búsqueda y Filtros */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}>
          {/* Categorías */}
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: categoriaFiltro === cat ? 'linear-gradient(135deg, #00e5ff, #0070f3)' : 'rgba(255, 255, 255, 0.05)',
                  color: categoriaFiltro === cat ? '#090d16' : 'var(--text-secondary)',
                  border: '1px solid ' + (categoriaFiltro === cat ? '#00e5ff' : 'rgba(255, 255, 255, 0.08)'),
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Input Buscador */}
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
              placeholder="Buscar experimento..."
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

        {/* Grid de Experimentos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {experimentosFiltrados.map((exp) => (
            <div
              key={exp.id}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00e5ff';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 229, 255, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px'
              }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                  {exp.categoria}
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}>
                  <Clock size={14} />
                  <span>{exp.tiempoMinutos || 25} min</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '10px' }}>
                {exp.titulo}
              </h3>

              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                marginBottom: '20px',
                flexGrow: 1
              }}>
                {exp.descripcion}
              </p>

              {/* Lista breve de materiales */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '12px 14px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00e5ff', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Materiales clave ({exp.materiales?.length || 0})
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {exp.materiales?.slice(0, 3).join(' • ')}...
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <button
                  onClick={() => {
                    setActiveExpId(exp.id);
                    if (onNavigate) onNavigate('nave');
                  }}
                  className="btn btn-primary"
                  style={{ flexGrow: 1, gap: '6px', fontSize: '0.85rem' }}
                >
                  <span>🚀 Cabina Espacial</span>
                </button>

                <button
                  onClick={() => abrirModoProyeccion(exp)}
                  className="btn btn-secondary"
                  style={{ padding: '10px 14px' }}
                  title="Modo Proyección en Aula"
                >
                  <Play size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL MODO PROYECCIÓN EN AULA */}
        {selectedExp && (
          <div className="modal-overlay" onClick={() => setSelectedExp(null)}>
            <div 
              className="modal-content" 
              onClick={(e) => e.stopPropagation()} 
              style={{ maxWidth: '880px', padding: '36px' }}
            >
              {/* Encabezado de la Guía */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '20px',
                marginBottom: '28px'
              }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <span className="badge badge-cyan">{selectedExp.categoria}</span>
                    <span className="badge badge-orange">{selectedExp.nivel}</span>
                  </div>
                  <h2 style={{ fontSize: '1.8rem', color: '#ffffff' }}>
                    {selectedExp.titulo}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedExp(null)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* FASE 1: PREGUNTA DE HIPÓTESIS */}
              <div style={{
                background: 'rgba(0, 229, 255, 0.06)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '28px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#00e5ff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: '8px'
                }}>
                  <HelpCircle size={18} />
                  <span>Pregunta de Hipótesis para la Clase</span>
                </div>
                <p style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '14px', fontStyle: 'italic' }}>
                  "{selectedExp.hipotesis}"
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setHipotesisSeleccionada('si')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      background: hipotesisSeleccionada === 'si' ? '#00e676' : 'rgba(255, 255, 255, 0.08)',
                      color: hipotesisSeleccionada === 'si' ? '#090d16' : '#ffffff'
                    }}
                  >
                    👍 La clase vota: ¡SÍ ocurrirá!
                  </button>
                  <button
                    onClick={() => setHipotesisSeleccionada('no')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      background: hipotesisSeleccionada === 'no' ? '#ff007f' : 'rgba(255, 255, 255, 0.08)',
                      color: hipotesisSeleccionada === 'no' ? '#ffffff' : '#ffffff'
                    }}
                  >
                    👎 La clase vota: ¡NO ocurrirá!
                  </button>
                </div>
              </div>

              {/* FASE 2: LISTA DE MATERIALES CHECKLIST */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '12px' }}>
                  📋 Verificación de Materiales en la Mesa
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '10px'
                }}>
                  {selectedExp.materiales?.map((mat, i) => (
                    <div
                      key={i}
                      onClick={() => toggleMaterial(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: materialesChequeados[i] ? 'rgba(0, 230, 118, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid ' + (materialesChequeados[i] ? 'rgba(0, 230, 118, 0.3)' : 'rgba(255, 255, 255, 0.08)'),
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        border: '1px solid ' + (materialesChequeados[i] ? '#00e676' : 'rgba(255, 255, 255, 0.3)'),
                        background: materialesChequeados[i] ? '#00e676' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {materialesChequeados[i] && <Check size={14} color="#090d16" />}
                      </div>
                      <span style={{ fontSize: '0.88rem', color: materialesChequeados[i] ? '#00e676' : 'var(--text-secondary)' }}>
                        {mat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FASE 3: PROCEDIMIENTO PASO A PASO */}
              {selectedExp.pasos && (
                <div style={{
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '20px',
                  padding: '24px',
                  marginBottom: '28px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#00e5ff', textTransform: 'uppercase' }}>
                      Paso {pasoActual + 1} de {selectedExp.pasos.length}
                    </span>

                    {/* Cronómetro para el aula */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        ⏱️ Cronómetro: {segundosRestantes}s
                      </span>
                      <button
                        onClick={() => setTimerActivo(!timerActivo)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: timerActivo ? '#ff007f' : '#00e5ff',
                          color: '#090d16',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        {timerActivo ? 'Pausar' : 'Iniciar'}
                      </button>
                      <button
                        onClick={() => setSegundosRestantes(60)}
                        style={{ background: 'none', color: 'var(--text-muted)' }}
                      >
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '10px' }}>
                    {selectedExp.pasos[pasoActual].titulo}
                  </h3>

                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {selectedExp.pasos[pasoActual].texto}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      disabled={pasoActual === 0}
                      onClick={() => setPasoActual(p => p - 1)}
                      className="btn btn-outline"
                      style={{ opacity: pasoActual === 0 ? 0.4 : 1 }}
                    >
                      <ChevronLeft size={16} />
                      <span>Anterior</span>
                    </button>

                    {pasoActual < selectedExp.pasos.length - 1 ? (
                      <button
                        onClick={() => setPasoActual(p => p + 1)}
                        className="btn btn-primary"
                      >
                        <span>Siguiente Paso</span>
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={finalizarExperimento}
                        className="btn btn-orange"
                      >
                        <Award size={16} />
                        <span>¡Concluir Experimento! 🎉</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* FASE 4: EXPLICACIÓN CIENTÍFICA */}
              <div style={{
                background: 'rgba(255, 153, 0, 0.06)',
                border: '1px solid rgba(255, 153, 0, 0.2)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ff9900',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: '8px'
                }}>
                  <Lightbulb size={18} />
                  <span>¿Por qué sucede? (Explicación para los Niños)</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                  {selectedExp.explicacionCientifica}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
