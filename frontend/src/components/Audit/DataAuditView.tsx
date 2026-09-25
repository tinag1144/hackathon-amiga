import React from 'react';
import { ShieldCheck, AlertCircle, Clock, FileCheck } from 'lucide-react';
import { AuditDiagnostic } from '../../types';

interface DataAuditViewProps {
  audits: AuditDiagnostic[];
}

export const DataAuditView: React.FC<DataAuditViewProps> = ({ audits }) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Editorial Header */}
      <div className="bg-white rounded-3xl p-6 shadow-editorial border border-[#073b4c]/5">
        <span className="inline-block px-3 py-1 bg-[#06d6a0]/20 text-[#073b4c] text-xs font-bold rounded-full mb-3">
          Fase 2 & 3 • Auditoría y Limpieza
        </span>
        <h2 className="text-xl font-bold text-[#073b4c] tracking-tight">
          Calidad de Información
        </h2>
        <p className="text-xs text-[#073b4c]/70 mt-1 leading-relaxed">
          AMIGA evalúa la frescura, imputa celdas vacías con valores promedio justos y aísla anomalías o valores desproporcionados antes de tomar decisiones.
        </p>
      </div>

      {/* Tarjetas de Auditoría por Documento */}
      <div className="space-y-4">
        {audits.map((audit) => (
          <div
            key={audit.asset_id}
            className="bg-white rounded-3xl p-5 shadow-editorial border border-[#073b4c]/5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#06d6a0]/15 flex items-center justify-center text-[#06d6a0]">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#073b4c] line-clamp-1">{audit.filename}</h3>
                  <p className="text-[11px] text-[#073b4c]/60">
                    {audit.registros_totales} registros examinados
                  </p>
                </div>
              </div>

              {audit.alerta_obsolescencia ? (
                <span className="text-[10px] font-bold px-2.5 py-1 bg-[#ef476f]/15 text-[#ef476f] rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" /> &gt;30 días (Obsoleto)
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2.5 py-1 bg-[#06d6a0]/15 text-[#073b4c] rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#06d6a0]" /> Vigente
                </span>
              )}
            </div>

            {/* Métricas de Calidad */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#FAF9F5] p-3 rounded-2xl border border-[#073b4c]/5">
                <span className="text-[10px] text-[#073b4c]/60 block font-medium">Faltantes Imputados</span>
                <span className="text-sm font-bold text-[#118ab2]">{audit.faltantes_imputados} celdas</span>
              </div>
              <div className="bg-[#FAF9F5] p-3 rounded-2xl border border-[#073b4c]/5">
                <span className="text-[10px] text-[#073b4c]/60 block font-medium">Anomalías Aisladas</span>
                <span className={`text-sm font-bold ${audit.valores_anomalos_aislados.length > 0 ? 'text-[#ef476f]' : 'text-[#06d6a0]'}`}>
                  {audit.valores_anomalos_aislados.length} registradas
                </span>
              </div>
            </div>

            {/* Detalle de Anomalías si existen */}
            {audit.valores_anomalos_aislados.length > 0 && (
              <div className="bg-[#ef476f]/10 rounded-2xl p-3.5 border border-[#ef476f]/20">
                <h4 className="text-[11px] font-bold text-[#ef476f] flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Caso bajo observación:
                </h4>
                {audit.valores_anomalos_aislados.map((item, i) => (
                  <p key={i} className="text-[11px] text-[#073b4c] font-medium leading-tight">
                    • {item}
                  </p>
                ))}
              </div>
            )}

            <p className="text-[11px] text-[#073b4c]/70 italic border-t border-[#073b4c]/5 pt-3">
              "{audit.observaciones}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
