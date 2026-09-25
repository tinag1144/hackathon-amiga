import React, { useState } from 'react';
import { MobileContainer } from './components/Layout/MobileContainer';
import { TopHeader } from './components/Layout/TopHeader';
import { BottomNav, NavTab } from './components/Layout/BottomNav';
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
  const [activeTab, setActiveTab] = useState<NavTab>('ingesta');
  const [assets, setAssets] = useState<IngestedAsset[]>(INITIAL_ASSETS);
  const [audits, setAudits] = useState<AuditDiagnostic[]>(INITIAL_AUDITS);
  const [decisions, setDecisions] = useState<PrescriptiveDecision[]>(INITIAL_DECISIONS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  
  // Estado para la animación automática del pipeline de 5 fases al cargar un archivo
  const [processingFileName, setProcessingFileName] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    // 1. Inicia el razonamiento automático de 5 fases en pantalla
    setProcessingFileName(file.name);
    
    // 2. Procesa el archivo en vivo generando Asset, Auditoría y Decisión Prescriptiva
    const result = await ApiService.processFileUpload(file);
    
    setAssets(prev => [result.asset, ...prev]);
    setAudits(prev => [result.audit, ...prev]);
    if (result.decision) {
      setDecisions(prev => [result.decision!, ...prev]);
    }
  };

  const handlePipelineComplete = () => {
    setProcessingFileName(null);
    // Cambia automáticamente a la vista de decisiones prescriptivas al finalizar el razonamiento en vivo
    setActiveTab('decisiones');
  };

  return (
    <MobileContainer>
      <TopHeader />

      <main className="flex-1 px-3 sm:px-4 pt-3 overflow-y-auto">
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

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        decisionAlertCount={decisions.filter(d => d.nivel_alerta === 'RIESGO_CRITICO').length}
      />
    </MobileContainer>
  );
};

export default App;
