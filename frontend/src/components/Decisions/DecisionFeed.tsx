import React, { useState } from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle, UserCheck, ExternalLink, ArrowUpRight, TrendingUp, CheckCircle2, FileText, X } from 'lucide-react';
import { PrescriptiveDecision, NivelAlerta } from '../../types';

interface DecisionFeedProps {
  decisions: PrescriptiveDecision[];
  onSelectCitation?: (filename: string) => void;
}

export const DecisionFeed: React.FC<DecisionFeedProps> = ({ decisions, onSelectCitation }) => {
  const [resolvedIds, setResolvedIds] = useState<Record<string, boolean>>({});
  const [activeEvidenceModal, setActiveEvidenceModal] = useState<PrescriptiveDecision | null>(null);

  const toggleResolve = (id: string) => {
    setResolvedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getBadgeStyle = (nivel: NivelAlerta, isResolved: boolean) => {
    if (isResolved) {
      return {
        bg: 'bg-[#06d6a0]/20',
        text: 'text-[#073b4c]',
        border: 'border-[#06d6a0]/50',
        icon: CheckCircle2,
        label: 'Acción Ejecutada'
      };
    }

    switch (nivel) {
      case 'RIESGO_CRITICO':
        return {
          bg: 'bg-[#ef476f]/15',
          text: 'text-[#ef476f]',
          border: 'border-[#ef476f]/30',
          icon: AlertOctagon,
          label: 'Riesgo Crítico'
        };
      case 'ADVERTENCIA':
        return {
          bg: 'bg-[#ffd166]/30',
          text: 'text-[#073b4c]',
          border: 'border-[#ffd166]/60',
          icon: AlertTriangle,
          label: 'Advertencia'
        };
      default:
        return {
          bg: 'bg-[#06d6a0]/20',
          text: 'text-[#073b4c]',
          border: 'border-[#06d6a0]/40',
          icon: CheckCircle,
          label: 'Normal'
        };
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Editorial Header */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-editorial border border-[#073b4c]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ef476f]/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <span className="inline-block px-2.5 py-0.5 bg-[#ef476f]/15 text-[#ef476f] text-[10px] font-bold rounded-full mb-2">
          Fase 4 & 5 • Motor de Decisión Laya
        </span>
        <h2 className="text-base sm:text-lg font-bold text-[#073b4c] tracking-tight">
          Acciones Prescriptivas
        </h2>
        <p className="text-[11px] sm:text-xs text-[#073b4c]/70 mt-0.5 leading-relaxed max-w-2xl">
          Laya cruza listas de precios, remitos y fiados recomendando decisiones inmediatas fundamentadas en evidencia.
        </p>
      </div>

      {/* Feed de Tarjetas Prescriptivas Grid (Mobile 1 col, Desktop 2 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {decisions.map((dec) => {
          const isResolved = !!resolvedIds[dec.id];
          const badge = getBadgeStyle(dec.nivel_alerta, isResolved);
          const BadgeIcon = badge.icon;

          return (
            <div
              key={dec.id}
              className={`bg-white rounded-3xl p-4 sm:p-5 shadow-editorial border transition-all duration-300 flex flex-col justify-between space-y-3.5 ${
                isResolved ? 'border-[#06d6a0]/40 bg-[#06d6a0]/5' : 'border-[#073b4c]/5 hover:shadow-editorial-hover'
              }`}
            >
              <div className="space-y-3">
                {/* Header de Alerta */}
                <div className="flex items-start justify-between gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
                    <BadgeIcon className="w-3.5 h-3.5" />
                    {badge.label}
                  </span>
                  <span className="text-[10px] font-semibold text-[#073b4c]/40 uppercase tracking-widest">
                    {dec.id}
                  </span>
                </div>

                {/* Título */}
                <h3 className={`text-xs sm:text-sm font-bold text-[#073b4c] leading-snug ${isResolved ? 'line-through opacity-70' : ''}`}>
                  {dec.titulo}
                </h3>

                {/* Panorama Interpretado */}
                <p className="text-[11px] text-[#073b4c]/80 leading-relaxed bg-[#FAF9F5] p-3 rounded-2xl border border-[#073b4c]/5">
                  {dec.descripcion_panorama}
                </p>

                {/* Recomendación Práctica */}
                <div className="bg-[#118ab2]/8 p-3 rounded-2xl border border-[#118ab2]/20">
                  <h4 className="text-[10px] font-bold text-[#118ab2] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#118ab2]" /> Recomendación Sugerida
                  </h4>
                  <p className="text-[11px] font-semibold text-[#073b4c] leading-relaxed">
                    {dec.recomendacion_practica}
                  </p>
                </div>

                {/* Impacto Estimado */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#06d6a0] bg-[#06d6a0]/10 px-3 py-1.5 rounded-xl border border-[#06d6a0]/20">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0 text-[#06d6a0]" />
                    <span className="truncate">Impacto: {dec.impacto_estimado}</span>
                  </div>
                  <button
                    onClick={() => setActiveEvidenceModal(dec)}
                    className="shrink-0 text-[10px] font-bold text-[#118ab2] hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" /> Ver Evidencia
                  </button>
                </div>

                {/* Evidencia y Citas trazables */}
                <div className="pt-2 border-t border-[#073b4c]/5 space-y-1.5">
                  <span className="text-[9px] font-bold text-[#073b4c]/50 uppercase tracking-wider block">
                    Archivos de Origen Citados:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dec.archivos_citados.map((doc, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSelectCitation && onSelectCitation(doc)}
                        className="inline-flex items-center gap-1 text-[9px] font-semibold bg-[#FAF9F5] hover:bg-[#ffd166]/30 text-[#073b4c] px-2 py-0.5 rounded-xl border border-[#073b4c]/10 transition-colors"
                      >
                        <ExternalLink className="w-2.5 h-2.5 text-[#118ab2]" />
                        {doc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón interactivo de resolución */}
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#073b4c]/5">
                <div className="flex items-center gap-1 text-[10px] text-[#073b4c]/60 font-medium truncate">
                  <UserCheck className="w-3.5 h-3.5 text-[#118ab2] shrink-0" /> {dec.responsable_accion}
                </div>

                <button
                  onClick={() => toggleResolve(dec.id)}
                  className={`shrink-0 px-3 py-1 rounded-xl text-[11px] font-bold transition-all shadow-sm flex items-center gap-1 ${
                    isResolved
                      ? 'bg-[#06d6a0] text-white'
                      : 'bg-[#118ab2] hover:bg-[#073b4c] text-white'
                  }`}
                >
                  {isResolved ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resuelto
                    </>
                  ) : (
                    "Ejecutar Acción"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Evidencia Completa */}
      {activeEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-[#073b4c]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-editorial border border-[#073b4c]/10 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#118ab2] bg-[#118ab2]/10 px-2.5 py-1 rounded-full">
                Fundamentación por Evidencia
              </span>
              <button
                onClick={() => setActiveEvidenceModal(null)}
                className="w-7 h-7 rounded-full bg-[#073b4c]/5 text-[#073b4c] flex items-center justify-center hover:bg-[#073b4c]/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xs font-bold text-[#073b4c] mb-2">
              {activeEvidenceModal.titulo}
            </h3>

            <div className="space-y-2 mb-4">
              <span className="text-[10px] font-bold text-[#073b4c]/60 block">Citas de origen examinadas por Laya:</span>
              {activeEvidenceModal.evidencia_fundamentacion.map((ev, idx) => (
                <div key={idx} className="bg-[#FAF9F5] p-2 rounded-xl border border-[#073b4c]/5 text-[10px] text-[#073b4c] font-medium flex items-start gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#118ab2] shrink-0 mt-0.5" />
                  <span>{ev}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveEvidenceModal(null)}
              className="w-full py-2 bg-[#073b4c] text-white rounded-xl text-xs font-bold hover:bg-[#118ab2] transition-colors"
            >
              Cerrar Evidencia
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
