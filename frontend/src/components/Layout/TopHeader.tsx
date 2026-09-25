import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const TopHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF9F5]/90 backdrop-blur-md px-5 pt-4 pb-3 border-b border-[#073b4c]/5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06d6a0] animate-pulse" />
            <h1 className="text-xl font-bold tracking-tight text-[#073b4c]">AMIGA</h1>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#ffd166]/30 text-[#073b4c] rounded-full border border-[#ffd166]/50">
              Laya AI v2.5
            </span>
          </div>
          <p className="text-xs text-[#073b4c]/60 font-medium mt-0.5">
            Análisis y Manejo de Información para la Gestión Autónoma
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full shadow-sm border border-[#073b4c]/5">
          <ShieldCheck className="w-4 h-4 text-[#06d6a0]" />
          <span className="text-xs font-semibold text-[#073b4c]">Formosa</span>
        </div>
      </div>
    </header>
  );
};
