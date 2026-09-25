import React from 'react';
import { StatusBar } from './StatusBar';
import { HomeIndicator } from './HomeIndicator';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#EFECE6] flex flex-col justify-center items-center py-6 px-3 sm:px-6 selection:bg-[#118ab2] selection:text-white font-sans">
      
      {/* Label superior de mockup */}
      <div className="mb-3 text-center hidden sm:block">
        <span className="text-xs font-bold uppercase tracking-widest text-[#073b4c]/60 bg-white/60 px-4 py-1.5 rounded-full border border-[#073b4c]/10 shadow-sm">
          📱 Vista Previa Dispositivo Mobile • AMIGA Copiloto
        </span>
      </div>

      {/* Smartphone Outer Hardware Frame */}
      <div className="relative w-full max-w-[395px] h-[850px] bg-[#1a232a] rounded-[52px] p-[10px] shadow-[0_25px_70px_-15px_rgba(7,59,76,0.3)] border-4 border-[#073b4c]/20 flex flex-col overflow-hidden transition-all duration-300">
        
        {/* Hardware side buttons simulation */}
        <div className="absolute -left-[14px] top-24 w-[4px] h-10 bg-[#073b4c] rounded-l-md" />
        <div className="absolute -left-[14px] top-38 w-[4px] h-12 bg-[#073b4c] rounded-l-md" />
        <div className="absolute -right-[14px] top-28 w-[4px] h-16 bg-[#073b4c] rounded-r-md" />

        {/* Inner Phone Screen */}
        <div className="w-full h-full bg-[#FAF9F5] rounded-[42px] flex flex-col relative overflow-hidden shadow-inner border border-[#073b4c]/5">
          <StatusBar />

          {/* Decorative subtle background blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffd166]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#118ab2]/8 rounded-full blur-3xl pointer-events-none -ml-24" />

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
