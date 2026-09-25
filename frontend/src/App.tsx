import React, { useState } from 'react';
import { MobileContainer } from './components/Layout/MobileContainer';
import { BottomNav, NavTab } from './components/Layout/BottomNav';
import { OverviewDashboard } from './components/Dashboard/OverviewDashboard';
import { FileUploader } from './components/Ingestion/FileUploader';
import { DataAuditView } from './components/Audit/DataAuditView';
import { PipelineFlow } from './components/Pipeline/PipelineFlow';
import { AutomatedPipelineModal } from './components/Pipeline/AutomatedPipelineModal';
import { DecisionFeed } from './components/Decisions/DecisionFeed';
import { CopilotChat } from './components/Chat/CopilotChat';

import { INITIAL_ASSETS, INITIAL_AUDITS, INITIAL_DECISIONS, INITIAL_CHAT } from './mock/mockData';
import { IngestedAsset, AuditDiagnostic, PrescriptiveDecision, ChatMessage } from './types';
import { ApiService } from './services/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('tablero');
  const [assets, setAssets] = useState<IngestedAsset[]>(INITIAL_ASSETS);
  const [audits, setAudits] = useState<AuditDiagnostic[]>(INITIAL_AUDITS);
  const [decisions, setDecisions] = useState<PrescriptiveDecision[]>(INITIAL_DECISIONS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  
  // Estado para la animación automática del pipeline de 5 fases al cargar un archivo
  const [processingFileName, setProcessingFileName] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setProcessingFileName(file.name);
    const result = await ApiService.processFileUpload(file);
    setAssets(prev => [result.asset, ...prev]);
    setAudits(prev => [result.audit, ...prev]);
    if (result.decision) {
      setDecisions(prev => [result.decision!, ...prev]);
    }
  };

  const handlePipelineComplete = () => {
    setProcessingFileName(null);
    setActiveTab('decisiones');
  };

  return (
    <MobileContainer
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      decisionAlertCount={decisions.filter(d => d.nivel_alerta === 'RIESGO_CRITICO').length}
    >
      <main className={`flex-1 ${activeTab === 'chat' ? 'overflow-hidden flex flex-col relative' : 'overflow-y-auto'}`}>
        {activeTab === 'tablero' && (
          <OverviewDashboard
            decisions={decisions}
            assets={assets}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
        {activeTab === 'ingesta' && (
          <FileUploader assets={assets} onUpload={handleUpload} />
        )}
        {activeTab === 'auditoria' && (
          <DataAuditView audits={audits} />
        )}
        {activeTab === 'pipeline' && (
          <PipelineFlow
            assets={assets}
            audits={audits}
            decisions={decisions}
          />
        )}
        {activeTab === 'decisiones' && (
          <DecisionFeed decisions={decisions} />
        )}
        {activeTab === 'chat' && (
          <CopilotChat messages={messages} setMessages={setMessages} />
        )}
      </main>

      {/* Modal de Razonamiento en Vivo de las 5 Fases (Automático al Subir Archivo Externo) */}
      {processingFileName && (
        <AutomatedPipelineModal
          filename={processingFileName}
          onComplete={handlePipelineComplete}
        />
      )}

      {/* BottomNav únicamente activo cuando se visualiza en celular */}
      <div className="block sm:hidden">
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          decisionAlertCount={decisions.filter(d => d.nivel_alerta === 'RIESGO_CRITICO').length}
        />
      </div>
    </MobileContainer>
  );
};

export default App;
