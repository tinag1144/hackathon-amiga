import React, { useState, useEffect } from 'react';
import { UploadCloud, ShieldCheck, FileCode, Sparkles, CheckCircle2, Check } from 'lucide-react';

interface AutomatedPipelineModalProps {
  filename: string;
  onComplete: () => void;
}

export const AutomatedPipelineModal: React.FC<AutomatedPipelineModalProps> = ({ filename, onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState<number>(1);

  const phases = [
    {
      num: 1,
      title: "Fase 1: Ingesta & Autoclasificación",
      icon: UploadCloud,
      color: "text-[#118ab2]",
      bg: "bg-[#118ab2]/10",
      statusText: `Leyendo cabeceras de '${filename}'... Formato: Planilla CSV • Fuente: Proveedor Mayorista`
    },
    {
      num: 2,
      title: "Fase 2: Auditoría & Limpieza",
      icon: ShieldCheck,
      color: "text-[#06d6a0]",
      bg: "bg-[#06d6a0]/15",
      statusText: "Auditando registros... Imputadas 2 celdas nulas con moda típica. 1 caso bajo observación."
    },
    {
      num: 3,
      title: "Fase 3: Síntesis JSON Unificada",
      icon: FileCode,
      color: "text-[#ffd166]",
      bg: "bg-[#ffd166]/25",
      statusText: "Generando Payload JSON estándar con promedios, tendencias y valores mínimos/máximos..."
    },
    {
      num: 4,
      title: "Fase 4: Razonamiento Laya AI Engine",
      icon: Sparkles,
      color: "text-[#118ab2]",
      bg: "bg-[#118ab2]/15",
      statusText: "Laya AI evaluando cruce entre lista de precios mayorista y cuaderno de fiados... Discrepancia detectada."
    },
    {
      num: 5,
      title: "Fase 5: Generación Prescriptiva",
      icon: CheckCircle2,
      color: "text-[#ef476f]",
      bg: "bg-[#ef476f]/15",
      statusText: "Emisión de Alerta RIESGO CRÍTICO + Acción prescriptiva y citas trazables listas."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev >= 5) {
          clearInterval(timer);
          setTimeout(onComplete, 1200); // Finaliza automáticamente
          return 5;
        }
        return prev + 1;
      });
    }, 1100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#073b4c]/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl border border-[#073b4c]/10 space-y-4 animate-in fade-in zoom-in duration-300">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-[#073b4c]/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06d6a0] animate-ping" />
            <span className="text-xs font-bold text-[#073b4c] uppercase tracking-wider">
              Motor Laya AI en Vivo
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-[#118ab2]/10 text-[#118ab2] rounded-full">
            Fase {currentPhase} / 5
          </span>
        </div>

        {/* Progreso Visual de las 5 Fases */}
        <div className="space-y-2.5">
          {phases.map((p) => {
            const Icon = p.icon;
            const isDone = currentPhase > p.num;
            const isCurrent = currentPhase === p.num;

            return (
              <div
                key={p.num}
                className={`p-3 rounded-2xl border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#073b4c] text-white border-[#073b4c] shadow-md scale-[1.02]'
                    : isDone
                    ? 'bg-[#06d6a0]/10 text-[#073b4c] border-[#06d6a0]/30'
                    : 'bg-[#FAF9F5] text-[#073b4c]/40 border-[#073b4c]/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${isCurrent ? 'bg-white text-[#073b4c]' : isDone ? 'bg-[#06d6a0] text-white' : p.bg}`}>
                      {isDone ? <Check className="w-3.5 h-3.5 text-white" /> : <Icon className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-bold">{p.title}</span>
                  </div>

                  {isCurrent && (
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full animate-pulse font-mono">
                      Procesando...
                    </span>
                  )}
                </div>

                {isCurrent && (
                  <p className="text-[10px] mt-2 pt-2 border-t border-white/10 text-white/90 leading-tight animate-in fade-in">
                    {p.statusText}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[10px] text-center text-[#073b4c]/60 font-semibold italic">
          AMIGA está analizando y fundamentando la evidencia automáticamente...
        </p>
      </div>
    </div>
  );
};
