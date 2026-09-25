import React, { useState } from 'react';
import { UploadCloud, ShieldCheck, FileCode, Sparkles, CheckCircle2, ArrowRight, Play } from 'lucide-react';
import { IngestedAsset, AuditDiagnostic, PrescriptiveDecision } from '../../types';

interface PipelineFlowProps {
  assets: IngestedAsset[];
  audits: AuditDiagnostic[];
  decisions: PrescriptiveDecision[];
  onRunDemoPipeline?: () => void;
}

export const PipelineFlow: React.FC<PipelineFlowProps> = ({ assets, audits, decisions, onRunDemoPipeline }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: "Fase 1: Ingesta Multitipo",
      subtitle: "Recepción y Autoclasificación",
      icon: UploadCloud,
      color: "text-[#118ab2]",
      bg: "bg-[#118ab2]/10",
      desc: "El motor abre la puerta a cualquier archivo (PDF, CSV, TXT, WhatsApp) y detecta autónomamente su Formato, Fuente y Tipo Económico."
    },
    {
      num: 2,
      title: "Fase 2: Auditoría y Limpieza",
      subtitle: "Imputación & Aislamiento de Errores",
      icon: ShieldCheck,
      color: "text-[#06d6a0]",
      bg: "bg-[#06d6a0]/15",
      desc: "Imputa celdas faltantes con la moda típica, aísla anomalías (números negativos o ventas a pérdida) y evalúa la vigencia (>30 días)."
    },
    {
      num: 3,
      title: "Fase 3: Síntesis JSON",
      subtitle: "Unificación a Formato Estándar",
      icon: FileCode,
      color: "text-[#ffd166]",
      bg: "bg-[#ffd166]/25",
      desc: "Extrae promedios, tendencias, mínimos y máximos creando un payload JSON estándar para consumo del modelo de inteligencia."
    },
    {
      num: 4,
      title: "Fase 4: Razonamiento Laya AI",
      subtitle: "Interpretación Contextual Cross-Source",
      icon: Sparkles,
      color: "text-[#118ab2]",
      bg: "bg-[#118ab2]/15",
      desc: "Laya AI realiza cruces de información entre múltiples fuentes (ej. aumento del proveedor vs cuaderno de ventas congelado) con evidencia estricta."
    },
    {
      num: 5,
      title: "Fase 5: Salida Prescriptiva",
      subtitle: "Alertas, Recomendación & Citas",
      icon: CheckCircle2,
      color: "text-[#ef476f]",
      bg: "bg-[#ef476f]/15",
      desc: "Genera el output final con Nivel de Alerta (NORMAL, ADVERTENCIA, RIESGO CRÍTICO), acción sugerida, responsable y citas trazables."
    }
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Header Visual del Pipeline */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-editorial border border-[#073b4c]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 bg-[#118ab2]/15 text-[#118ab2] text-[10px] font-bold rounded-full mb-1.5">
            Arquitectura del Motor • Pipeline de 5 Fases
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#073b4c] tracking-tight">
            Flujo de Procesamiento del Motor
          </h2>
          <p className="text-[11px] sm:text-xs text-[#073b4c]/70 leading-relaxed">
            Visualizá cómo AMIGA y Laya AI transforman archivos desestructurados en decisiones prescriptivas.
          </p>
        </div>

        {onRunDemoPipeline && (
          <button
            onClick={onRunDemoPipeline}
            className="shrink-0 px-3.5 py-2 bg-[#118ab2] hover:bg-[#073b4c] text-white font-bold text-xs rounded-2xl transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Simular Flujo Completo</span>
          </button>
        )}
      </div>

      {/* Stepper Horizontal Interactivo (Fases 1 a 5) */}
      <div className="bg-white p-2 sm:p-3 rounded-3xl border border-[#073b4c]/5 shadow-editorial overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[500px]">
          {steps.map((st, idx) => {
            const isActive = activeStep === st.num;

            return (
              <React.Fragment key={st.num}>
                <button
                  onClick={() => setActiveStep(st.num)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-[#073b4c] text-white shadow-sm font-bold scale-105'
                      : 'text-[#073b4c]/60 hover:text-[#073b4c] hover:bg-[#073b4c]/5'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-bold ${isActive ? 'bg-white text-[#073b4c]' : st.bg}`}>
                    {st.num}
                  </div>
                  <span className="text-[11px] whitespace-nowrap">Fase {st.num}</span>
                </button>

                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#073b4c]/20 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Detalle de la Fase Seleccionada */}
      {steps.filter(s => s.num === activeStep).map((st) => {
        const StepIcon = st.icon;

        return (
          <div key={st.num} className="bg-white rounded-3xl p-4 sm:p-5 shadow-editorial border border-[#073b4c]/5 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl ${st.bg} ${st.color} flex items-center justify-center shrink-0`}>
                <StepIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#073b4c]/50 uppercase tracking-widest block">
                  {st.subtitle}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#073b4c]">
                  {st.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#073b4c]/80 leading-relaxed bg-[#FAF9F5] p-3 rounded-2xl border border-[#073b4c]/5">
              {st.desc}
            </p>

            {/* Muestra de Datos según la Fase */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#073b4c]/60 block">
                Estado Actual de los Datos en esta Fase:
              </span>

              {st.num === 1 && (
                <div className="space-y-2">
                  {assets.slice(0, 2).map((a) => (
                    <div key={a.id} className="bg-[#FAF9F5] p-2.5 rounded-2xl text-[10px] border border-[#073b4c]/5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#073b4c] block">{a.filename}</span>
                        <span className="text-[#118ab2]">{a.fuente_informacion} • {a.tipo_economico}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#118ab2]/10 text-[#118ab2] font-bold rounded-full">Ingestado</span>
                    </div>
                  ))}
                </div>
              )}

              {st.num === 2 && (
                <div className="space-y-2">
                  {audits.slice(0, 2).map((a) => (
                    <div key={a.asset_id} className="bg-[#FAF9F5] p-2.5 rounded-2xl text-[10px] border border-[#073b4c]/5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#073b4c] block">{a.filename}</span>
                        <span className="text-[#06d6a0] font-semibold">{a.faltantes_imputados} faltantes imputados • {a.valores_anomalos_aislados.length} anomalías</span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#06d6a0]/15 text-[#073b4c] font-bold rounded-full">Auditado</span>
                    </div>
                  ))}
                </div>
              )}

              {st.num === 3 && (
                <div className="bg-[#073b4c] text-white p-3 rounded-2xl font-mono text-[10px] overflow-x-auto space-y-1">
                  <div className="text-[#ffd166]">// Payload JSON Unificado Sintetizado (Fase 3)</div>
                  <div>&#123; "total_items": 34, "promedio_precio": 14200.0, "alerta_obsolescencia": false &#125;</div>
                </div>
              )}

              {st.num === 4 && (
                <div className="bg-[#118ab2]/10 p-3 rounded-2xl text-xs text-[#073b4c] font-medium border border-[#118ab2]/20">
                  🧠 <strong>Laya AI:</strong> Evaluando cruce entre <em>Lista_Precios_Distribuidora_El_Sol.csv</em> y <em>Cuaderno_Ventas_Septiembre.csv</em>... Discrepancia de costo detectada.
                </div>
              )}

              {st.num === 5 && (
                <div className="space-y-2">
                  {decisions.slice(0, 2).map((d) => (
                    <div key={d.id} className="bg-[#ef476f]/10 p-2.5 rounded-2xl text-[10px] border border-[#ef476f]/20 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#073b4c] block">{d.titulo}</span>
                        <span className="text-[#ef476f] font-semibold">Alerta: {d.nivel_alerta}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#ef476f] text-white font-bold rounded-full">Prescripto</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
