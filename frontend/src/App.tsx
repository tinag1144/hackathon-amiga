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
import { IngestedAsset, ChatMessage } from './types';
import { ApiService } from './services/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('ingesta');
  const [assets, setAssets] = useState<IngestedAsset[]>(INITIAL_ASSETS);
  const [audits] = useState(INITIAL_AUDITS);
  const [decisions] = useState(INITIAL_DECISIONS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  
  // Estado para la animación automática del pipeline de 5 fases
  const [processingFileName, setProcessingFileName] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    // 1. Activa la animación en vivo del motor de 5 fases
    setProcessingFileName(file.name);
    
    // 2. Procesa la ingesta
    const newAsset = await ApiService.uploadFile(file);
    setAssets(prev => [newAsset, ...prev]);
  };

  const handlePipelineComplete = () => {
    setProcessingFileName(null);
    // Cambia automáticamente a las decisiones prescriptivas al finalizar el razonamiento
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

      {/* Modal de Razonamiento en Vivo de las 5 Fases (Automático al Subir Archivo) */}
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
