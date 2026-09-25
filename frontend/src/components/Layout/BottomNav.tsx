import React from 'react';
import { LayoutDashboard, UploadCloud, CheckCircle2, Cpu, AlertTriangle, MessageSquare } from 'lucide-react';

export type NavTab = 'tablero' | 'ingesta' | 'auditoria' | 'pipeline' | 'decisiones' | 'chat';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  decisionAlertCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, decisionAlertCount }) => {
  const tabs = [
    { id: 'tablero' as NavTab, label: 'Inicio', icon: LayoutDashboard },
    { id: 'ingesta' as NavTab, label: 'Ingesta', icon: UploadCloud },
    { id: 'auditoria' as NavTab, label: 'Auditoría', icon: CheckCircle2 },
    { id: 'pipeline' as NavTab, label: 'Motor', icon: Cpu },
    { id: 'decisiones' as NavTab, label: 'Alertas', icon: AlertTriangle, badge: decisionAlertCount },
    { id: 'chat' as NavTab, label: 'Chat', icon: MessageSquare },
  ];

  return (
    <nav className="absolute bottom-2 left-2 right-2 z-40 bg-[#0d3836]/95 backdrop-blur-md border border-[#10b981]/25 px-1 py-1 rounded-2xl shadow-xl">
      <div className="grid grid-cols-6 gap-0.5 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#10b981] text-[#0d3836] font-extrabold shadow-sm scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 shrink-0" />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-[#ef476f] text-white text-[8px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#0d3836]">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[8.5px] tracking-tight mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
