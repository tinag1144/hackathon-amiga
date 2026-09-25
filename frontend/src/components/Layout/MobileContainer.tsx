import React from 'react';
import { StatusBar } from './StatusBar';
import { HomeIndicator } from './HomeIndicator';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#EFECE6] flex flex-col justify-center items-center py-4 px-3 selection:bg-[#118ab2] selection:text-white font-sans">
      
      {/* Label superior de mockup */}
      <div className="mb-2 text-center hidden sm:block">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#073b4c]/60 bg-white/70 px-3.5 py-1 rounded-full border border-[#073b4c]/10 shadow-sm">
          📱 AMIGA Copiloto • Formosa
        </span>
      </div>

      {/* Smartphone Outer Hardware Frame (Proporcion Equilibrada) */}
      <div className="relative w-full max-w-[360px] h-[710px] max-h-[86vh] bg-[#1a232a] rounded-[46px] p-[8px] shadow-[0_20px_50px_-12px_rgba(7,59,76,0.3)] border-4 border-[#073b4c]/20 flex flex-col overflow-hidden transition-all duration-300">
        
        {/* Hardware side buttons simulation */}
        <div className="absolute -left-[14px] top-20 w-[4px] h-8 bg-[#073b4c] rounded-l-md" />
        <div className="absolute -left-[14px] top-32 w-[4px] h-10 bg-[#073b4c] rounded-l-md" />
        <div className="absolute -right-[14px] top-24 w-[4px] h-12 bg-[#073b4c] rounded-r-md" />

        {/* Inner Phone Screen */}
        <div className="w-full h-full bg-[#FAF9F5] rounded-[38px] flex flex-col relative overflow-hidden shadow-inner border border-[#073b4c]/5">
          <StatusBar />

          {/* Decorative subtle background blobs */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#ffd166]/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          <div className="absolute bottom-16 left-0 w-60 h-60 bg-[#118ab2]/8 rounded-full blur-3xl pointer-events-none -ml-20" />

          {/* Screen Content */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {children}
          </div>

          <HomeIndicator />
        </div>
      </div>
    </div>
  );
};
