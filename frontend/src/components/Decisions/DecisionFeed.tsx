import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle, UserCheck, ExternalLink, ArrowUpRight, TrendingUp } from 'lucide-react';
import { PrescriptiveDecision, NivelAlerta } from '../../types';

interface DecisionFeedProps {
  decisions: PrescriptiveDecision[];
  onSelectCitation?: (filename: string) => void;
}

export const DecisionFeed: React.FC<DecisionFeedProps> = ({ decisions, onSelectCitation }) => {
  const getBadgeStyle = (nivel: NivelAlerta) => {
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
    <div className="space-y-6 pb-24">
      {/* Banner de bienvenida editorial */}
      <div className="bg-white rounded-3xl p-6 shadow-editorial border border-[#073b4c]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ef476f]/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <span className="inline-block px-3 py-1 bg-[#ef476f]/15 text-[#ef476f] text-xs font-bold rounded-full mb-3">
          Fase 4 & 5 • Motor de Decisión Laya
        </span>
        <h2 className="text-xl font-bold text-[#073b4c] tracking-tight">
          Acciones Prescriptivas
        </h2>
        <p className="text-xs text-[#073b4c]/70 mt-1 leading-relaxed">
          Laya analiza la combinación de tus listas de precios, remitos y ventas para recomendar decisiones económicas concretas basadas 100% en evidencia.
        </p>
      </div>

      {/* Feed de tarjetas prescriptivas */}
      <div className="space-y-5">
        {decisions.map((dec) => {
          const badge = getBadgeStyle(dec.nivel_alerta);
          const BadgeIcon = badge.icon;

          return (
            <div
              key={dec.id}
              className="bg-white rounded-3xl p-6 shadow-editorial border border-[#073b4c]/5 hover:shadow-editorial-hover transition-all duration-300 space-y-4"
            >
              {/* Encabezado con Estado Alerta */}
              <div className="flex items-start justify-between gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
                  <BadgeIcon className="w-3.5 h-3.5" />
                  {badge.label}
                </span>
                <span className="text-[10px] font-semibold text-[#073b4c]/40 uppercase tracking-widest">
                  {dec.id}
                </span>
              </div>

              {/* Título de la decisión */}
              <h3 className="text-base font-bold text-[#073b4c] leading-snug">
                {dec.titulo}
              </h3>

              {/* Panorama Interpretado */}
              <p className="text-xs text-[#073b4c]/80 leading-relaxed bg-[#FAF9F5] p-3.5 rounded-2xl border border-[#073b4c]/5">
                {dec.descripcion_panorama}
              </p>

              {/* Recomendación Práctica */}
              <div className="bg-[#118ab2]/8 p-4 rounded-2xl border border-[#118ab2]/20">
                <h4 className="text-xs font-bold text-[#118ab2] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ArrowUpRight className="w-4 h-4 text-[#118ab2]" /> Recomendación Sugerida
                </h4>
                <p className="text-xs font-semibold text-[#073b4c] leading-relaxed">
                  {dec.recomendacion_practica}
                </p>
              </div>

              {/* Impacto Estimado */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#06d6a0] bg-[#06d6a0]/10 px-3.5 py-2 rounded-xl border border-[#06d6a0]/20">
                <TrendingUp className="w-4 h-4 shrink-0 text-[#06d6a0]" />
                <span>Impacto: {dec.impacto_estimado}</span>
              </div>

              {/* Evidencia y Citas trazables */}
              <div className="pt-2 border-t border-[#073b4c]/5 space-y-2">
                <span className="text-[11px] font-bold text-[#073b4c]/50 uppercase tracking-wider block">
                  Evidencia y Citas Documentales:
                </span>
                <div className="flex flex-wrap gap-2">
                  {dec.archivos_citados.map((doc, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectCitation && onSelectCitation(doc)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#FAF9F5] hover:bg-[#ffd166]/30 text-[#073b4c] px-3 py-1.5 rounded-xl border border-[#073b4c]/10 transition-colors shadow-chip"
                    >
                      <ExternalLink className="w-3 h-3 text-[#118ab2]" />
                      {doc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asignación de Responsable */}
              <div className="flex items-center justify-between text-[11px] text-[#073b4c]/60 pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <UserCheck className="w-3.5 h-3.5 text-[#118ab2]" /> Responsable:
                </span>
                <span className="font-bold text-[#073b4c] px-2.5 py-0.5 bg-[#073b4c]/5 rounded-md">
                  {dec.responsable_accion}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
