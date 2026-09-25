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
    <nav className="absolute bottom-3 left-2 right-2 sm:left-4 sm:right-4 z-40 bg-white/95 backdrop-blur-lg border border-[#073b4c]/10 px-2 py-1.5 rounded-3xl shadow-editorial max-w-xl mx-auto">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1 py-1 px-2 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#10b981] text-[#0d3836] font-bold shadow-sm'
                  : 'text-[#073b4c]/70 hover:text-[#073b4c] hover:bg-[#073b4c]/5 font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 shrink-0" />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-[#ef476f] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
