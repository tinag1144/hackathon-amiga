import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { HomeIndicator } from './HomeIndicator';
import { Smartphone, Monitor } from 'lucide-react';
import { Sidebar, NavTab } from './Sidebar';

interface MobileContainerProps {
  children: React.ReactNode;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  decisionAlertCount: number;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children, activeTab, setActiveTab, decisionAlertCount }) => {
  const [isPhoneMockup, setIsPhoneMockup] = useState(false);

  return (
    <div className="min-h-screen bg-[#6e7782]/40 sm:bg-[#6e7782]/50 flex flex-col justify-center items-center py-2 sm:py-4 px-2 sm:px-4 selection:bg-[#10b981] selection:text-white font-sans transition-all duration-300">
      
      {/* Top Bar Switcher (AeuxGlobal Style Container Header) */}
      <div className="mb-2.5 w-full max-w-6xl flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#073b4c]/10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-xs font-extrabold text-[#0d3836]">AMIGA Copiloto Documental</span>
          <span className="text-[10px] text-[#64748b] hidden sm:inline">• FormosaHack 2026</span>
        </div>

        <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 rounded-xl border border-[#073b4c]/10 text-xs font-bold">
          <button
            onClick={() => setIsPhoneMockup(false)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              !isPhoneMockup
                ? 'bg-[#0d3836] text-white shadow-sm'
                : 'text-[#64748b] hover:text-[#0d3836]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Escritorio PC</span>
          </button>
          
          <button
            onClick={() => setIsPhoneMockup(true)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              isPhoneMockup
                ? 'bg-[#10b981] text-[#0d3836] shadow-sm font-extrabold'
                : 'text-[#64748b] hover:text-[#0d3836]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Simulador Celular</span>
          </button>
        </div>
      </div>

      {/* RENDER MODO 1: SIMULADOR DE CELULAR CENTRADO */}
      {isPhoneMockup ? (
        <div className="relative w-full max-w-[360px] h-[710px] max-h-[86vh] bg-[#1a232a] rounded-[46px] p-[8px] shadow-[0_25px_60px_-15px_rgba(7,59,76,0.4)] border-4 border-[#073b4c]/20 flex flex-col overflow-hidden transition-all duration-300">
          
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
        /* RENDER MODO 2: DASHBOARD ESCRITORIO CON SIDEBAR VERDE ESMERALDA (Estilo AeuxGlobal) */
        <div className="w-full max-w-6xl bg-[#f2f5f4] rounded-3xl sm:rounded-4xl shadow-2xl border border-[#073b4c]/10 flex overflow-hidden min-h-[82vh] max-h-[88vh] relative transition-all duration-300">
          
          {/* Sidebar Lateral Verde Esmeralda */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            decisionAlertCount={decisionAlertCount}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative overflow-hidden p-5 bg-[#f2f5f4]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
