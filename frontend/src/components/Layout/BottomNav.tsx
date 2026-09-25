import React from 'react';
import { UploadCloud, CheckCircle2, AlertTriangle, MessageSquare } from 'lucide-react';

export type NavTab = 'ingesta' | 'auditoria' | 'decisiones' | 'chat';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  decisionAlertCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, decisionAlertCount }) => {
  const tabs = [
    { id: 'ingesta' as NavTab, label: 'Ingesta', icon: UploadCloud },
    { id: 'auditoria' as NavTab, label: 'Auditoría', icon: CheckCircle2 },
    { id: 'decisiones' as NavTab, label: 'Decisiones', icon: AlertTriangle, badge: decisionAlertCount },
    { id: 'chat' as NavTab, label: 'Laya Chat', icon: MessageSquare },
  ];

  return (
    <nav className="absolute bottom-4 left-3 right-3 z-40 bg-white/95 backdrop-blur-lg border border-[#073b4c]/10 px-3 py-1.5 rounded-3xl shadow-editorial">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#118ab2]/10 text-[#118ab2] scale-105 font-bold'
                  : 'text-[#073b4c]/60 hover:text-[#073b4c] font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#118ab2]' : 'text-[#073b4c]/60'}`} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 bg-[#ef476f] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
