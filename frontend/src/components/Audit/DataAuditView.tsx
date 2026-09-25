import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, Clock, FileCheck, X } from 'lucide-react';
import { AuditDiagnostic } from '../../types';

interface DataAuditViewProps {
  audits: AuditDiagnostic[];
}

export const DataAuditView: React.FC<DataAuditViewProps> = ({ audits }) => {
  const [filter, setFilter] = useState<'all' | 'imputed' | 'anomalies'>('all');
  const [selectedAudit, setSelectedAudit] = useState<AuditDiagnostic | null>(null);

  const filteredAudits = audits.filter(a => {
    if (filter === 'imputed') return a.faltantes_imputados > 0;
    if (filter === 'anomalies') return a.valores_anomalos_aislados.length > 0;
    return true;
  });

  return (
    <div className="space-y-5 pb-24">
      {/* Editorial Header */}
      <div className="bg-white rounded-3xl p-5 shadow-editorial border border-[#073b4c]/5">
        <span className="inline-block px-3 py-1 bg-[#06d6a0]/20 text-[#073b4c] text-[11px] font-bold rounded-full mb-2.5">
          Fase 2 & 3 • Auditoría y Limpieza
        </span>
        <h2 className="text-lg font-bold text-[#073b4c] tracking-tight">
          Calidad de Información
        </h2>
        <p className="text-xs text-[#073b4c]/70 mt-0.5 leading-relaxed">
          AMIGA evalúa la frescura, imputa celdas vacías con valores promedio justos y aísla anomalías de precios antes de generar la síntesis.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#073b4c]/5 shadow-sm text-xs font-semibold">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 px-3 rounded-xl transition-all ${
            filter === 'all' ? 'bg-[#073b4c] text-white shadow-sm' : 'text-[#073b4c]/60 hover:text-[#073b4c]'
          }`}
        >
          Todos ({audits.length})
        </button>
        <button
          onClick={() => setFilter('imputed')}
          className={`flex-1 py-1.5 px-3 rounded-xl transition-all ${
            filter === 'imputed' ? 'bg-[#118ab2] text-white shadow-sm' : 'text-[#073b4c]/60 hover:text-[#073b4c]'
          }`}
        >
          Imputados
        </button>
        <button
          onClick={() => setFilter('anomalies')}
          className={`flex-1 py-1.5 px-3 rounded-xl transition-all ${
            filter === 'anomalies' ? 'bg-[#ef476f] text-white shadow-sm' : 'text-[#073b4c]/60 hover:text-[#073b4c]'
          }`}
        >
          Anomalías
        </button>
      </div>

      {/* Tarjetas de Auditoría por Documento */}
      <div className="space-y-4">
        {filteredAudits.map((audit) => (
          <div
            key={audit.asset_id}
            onClick={() => setSelectedAudit(audit)}
            className="bg-white rounded-3xl p-5 shadow-editorial border border-[#073b4c]/5 hover:shadow-editorial-hover transition-all duration-200 cursor-pointer space-y-3.5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#06d6a0]/15 flex items-center justify-center text-[#06d6a0]">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#073b4c] line-clamp-1">{audit.filename}</h3>
                  <p className="text-[10px] text-[#073b4c]/60">
                    {audit.registros_totales} registros examinados
                  </p>
                </div>
              </div>

              {audit.alerta_obsolescencia ? (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#ef476f]/15 text-[#ef476f] rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Obsoleto
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#06d6a0]/15 text-[#073b4c] rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#06d6a0]" /> Vigente
                </span>
              )}
            </div>

            {/* Métricas de Calidad */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-[#FAF9F5] p-2.5 rounded-2xl border border-[#073b4c]/5">
                <span className="text-[10px] text-[#073b4c]/60 block font-medium">Faltantes Imputados</span>
                <span className="text-xs font-bold text-[#118ab2]">{audit.faltantes_imputados} celdas</span>
              </div>
              <div className="bg-[#FAF9F5] p-2.5 rounded-2xl border border-[#073b4c]/5">
                <span className="text-[10px] text-[#073b4c]/60 block font-medium">Anomalías Aisladas</span>
                <span className={`text-xs font-bold ${audit.valores_anomalos_aislados.length > 0 ? 'text-[#ef476f]' : 'text-[#06d6a0]'}`}>
                  {audit.valores_anomalos_aislados.length} registradas
                </span>
              </div>
            </div>

            {/* Detalle de Anomalías */}
            {audit.valores_anomalos_aislados.length > 0 && (
              <div className="bg-[#ef476f]/10 rounded-2xl p-3 border border-[#ef476f]/20">
                <h4 className="text-[10px] font-bold text-[#ef476f] flex items-center gap-1.5 mb-0.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Caso bajo observación:
                </h4>
                {audit.valores_anomalos_aislados.map((item, i) => (
                  <p key={i} className="text-[10px] text-[#073b4c] font-medium leading-tight">
                    • {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Inspector de Auditoría */}
      {selectedAudit && (
        <div className="fixed inset-0 z-50 bg-[#073b4c]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-editorial border border-[#073b4c]/10 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#06d6a0] bg-[#06d6a0]/15 px-2.5 py-1 rounded-full">
                Diagnóstico de Limpieza (Fase 2)
              </span>
              <button
                onClick={() => setSelectedAudit(null)}
                className="w-7 h-7 rounded-full bg-[#073b4c]/5 text-[#073b4c] flex items-center justify-center hover:bg-[#073b4c]/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xs font-bold text-[#073b4c] mb-1">
              {selectedAudit.filename}
            </h3>
            <p className="text-[10px] text-[#073b4c]/70 italic mb-3">
              "{selectedAudit.observaciones}"
            </p>

            <div className="space-y-2 mb-4">
              <div className="bg-[#FAF9F5] p-2.5 rounded-2xl border border-[#073b4c]/5 text-[10px]">
                <span className="font-bold text-[#073b4c] block mb-0.5">Imputación de Faltantes:</span>
                <span>Se aplicó la moda/promedio ponderado del sector sobre {selectedAudit.faltantes_imputados} celdas nulas.</span>
              </div>
              <div className="bg-[#FAF9F5] p-2.5 rounded-2xl border border-[#073b4c]/5 text-[10px]">
                <span className="font-bold text-[#073b4c] block mb-0.5">Filtro de Venta a Pérdida:</span>
                <span>Los ítems con precio de mostrador inferior al remito mayorista fueron aislados para evaluación en la Fase 4.</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedAudit(null)}
              className="w-full py-2 bg-[#073b4c] text-white rounded-xl text-xs font-bold hover:bg-[#118ab2] transition-colors"
            >
              Cerrar Diagnóstico
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
