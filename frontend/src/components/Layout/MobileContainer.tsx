import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { HomeIndicator } from './HomeIndicator';
import { Smartphone, Monitor } from 'lucide-react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const [isPhoneMockup, setIsPhoneMockup] = useState(false);

  return (
    <div className="min-h-screen bg-[#EFECE6] flex flex-col justify-start items-center py-3 px-3 sm:px-6 selection:bg-[#118ab2] selection:text-white font-sans transition-all duration-300">
      
      {/* Bar superior de selección de vista (PC Fullscreen vs Teléfono) */}
      <div className="mb-3 w-full max-w-5xl flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#073b4c]/10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#06d6a0] animate-pulse" />
          <span className="text-xs font-bold text-[#073b4c]">AMIGA Copiloto</span>
          <span className="text-[10px] text-[#073b4c]/50 hidden sm:inline">• Formosa</span>
        </div>

        <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 rounded-xl border border-[#073b4c]/10 text-xs font-bold">
          <button
            onClick={() => setIsPhoneMockup(false)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              !isPhoneMockup
                ? 'bg-[#073b4c] text-white shadow-sm'
                : 'text-[#073b4c]/60 hover:text-[#073b4c]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Escritorio PC</span>
          </button>
          
          <button
            onClick={() => setIsPhoneMockup(true)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              isPhoneMockup
                ? 'bg-[#118ab2] text-white shadow-sm'
                : 'text-[#073b4c]/60 hover:text-[#073b4c]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Simulador Celular</span>
          </button>
        </div>
      </div>

      {/* RENDER MODO 1: SIMULADOR DE CELULAR CENTRADO */}
      {isPhoneMockup ? (
        <div className="relative w-full max-w-[360px] h-[710px] max-h-[86vh] bg-[#1a232a] rounded-[46px] p-[8px] shadow-[0_20px_50px_-12px_rgba(7,59,76,0.3)] border-4 border-[#073b4c]/20 flex flex-col overflow-hidden transition-all duration-300">
          
          {/* Side hardware buttons */}
          <div className="absolute -left-[14px] top-20 w-[4px] h-8 bg-[#073b4c] rounded-l-md" />
          <div className="absolute -left-[14px] top-32 w-[4px] h-10 bg-[#073b4c] rounded-l-md" />
          <div className="absolute -right-[14px] top-24 w-[4px] h-12 bg-[#073b4c] rounded-r-md" />

          {/* Inner Phone Screen */}
          <div className="w-full h-full bg-[#FAF9F5] rounded-[38px] flex flex-col relative overflow-hidden shadow-inner border border-[#073b4c]/5">
            <StatusBar />
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {children}
            </div>
            <HomeIndicator />
          </div>
        </div>
      ) : (
        /* RENDER MODO 2: PANTALLA COMPLETA RESPONSIVE (DESKTOP & MOBILE AUTO) */
        <div className="w-full max-w-5xl bg-[#FAF9F5] rounded-3xl sm:rounded-4xl shadow-2xl border border-[#073b4c]/10 flex flex-col relative overflow-hidden min-h-[82vh] transition-all duration-300">
          <div className="flex-1 flex flex-col relative overflow-hidden">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
