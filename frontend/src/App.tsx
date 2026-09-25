import React, { useState } from 'react';
import { MobileContainer } from './components/Layout/MobileContainer';
import { TopHeader } from './components/Layout/TopHeader';
import { BottomNav, NavTab } from './components/Layout/BottomNav';
import { FileUploader } from './components/Ingestion/FileUploader';
import { DataAuditView } from './components/Audit/DataAuditView';
import { PipelineFlow } from './components/Pipeline/PipelineFlow';
import { DecisionFeed } from './components/Decisions/DecisionFeed';
import { CopilotChat } from './components/Chat/CopilotChat';

import { INITIAL_ASSETS, INITIAL_AUDITS, INITIAL_DECISIONS, INITIAL_CHAT } from './mock/mockData';
import { IngestedAsset, ChatMessage } from './types';
import { ApiService } from './services/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('pipeline');
  const [assets, setAssets] = useState<IngestedAsset[]>(INITIAL_ASSETS);
  const [audits] = useState(INITIAL_AUDITS);
  const [decisions] = useState(INITIAL_DECISIONS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);

  const handleUpload = async (file: File) => {
    const newAsset = await ApiService.uploadFile(file);
    setAssets(prev => [newAsset, ...prev]);
  };

  const handleRunDemoPipeline = () => {
    setActiveTab('pipeline');
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
            onRunDemoPipeline={handleRunDemoPipeline}
          />
        )}
        {activeTab === 'decisiones' && (
          <DecisionFeed decisions={decisions} />
        )}
        {activeTab === 'chat' && (
          <CopilotChat messages={messages} setMessages={setMessages} />
        )}
      </main>

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        decisionAlertCount={decisions.filter(d => d.nivel_alerta === 'RIESGO_CRITICO').length}
      />
    </MobileContainer>
  );
};

export default App;
