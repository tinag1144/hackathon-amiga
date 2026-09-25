import React from 'react';
import { LayoutDashboard, UploadCloud, CheckCircle2, Cpu, AlertTriangle, MessageSquare, User } from 'lucide-react';

export type NavTab = 'tablero' | 'ingesta' | 'auditoria' | 'pipeline' | 'decisiones' | 'chat';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  decisionAlertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, decisionAlertCount }) => {
  const navItems = [
    { id: 'tablero' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ingesta' as NavTab, label: 'Ingesta Fuentes', icon: UploadCloud },
    { id: 'auditoria' as NavTab, label: 'Auditoría & Limpieza', icon: CheckCircle2 },
    { id: 'pipeline' as NavTab, label: 'Motor 5 Fases', icon: Cpu },
    { id: 'decisiones' as NavTab, label: 'Decisiones Alertas', icon: AlertTriangle, badge: decisionAlertCount },
    { id: 'chat' as NavTab, label: 'Laya Chat Criollo', icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-[#0d3836] text-white flex flex-col justify-between p-5 select-none shrink-0 h-full">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-9 h-9 rounded-xl bg-[#10b981] flex items-center justify-center text-[#0d3836] font-extrabold text-lg shadow-sm">
            A
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white leading-none">AMIGA</h1>
            <span className="text-[10px] text-[#10b981] font-semibold tracking-wider uppercase">Copiloto Formosa</span>
          </div>
        </div>

        {/* Section Label */}
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#10b981]/70 block mb-3 px-3">
          Navegación
        </span>

        {/* Nav Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#184e4c] text-white shadow-sm font-bold border-l-4 border-[#10b981]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#10b981]' : 'text-white/60'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && item.badge > 0 ? (
                  <span className="bg-[#ef476f] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Account Card (Estilo AeuxGlobal) */}
      <div className="bg-[#184e4c]/70 p-3 rounded-2xl border border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center text-[#10b981] shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-white truncate">Marcelo Kioskero</h4>
          <p className="text-[10px] text-white/60 truncate">#formosa-barrio-san-pedro</p>
        </div>
      </div>
    </aside>
  );
};
