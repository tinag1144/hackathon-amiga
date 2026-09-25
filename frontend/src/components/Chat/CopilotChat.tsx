import React, { useState } from 'react';
import { Send, Sparkles, ExternalLink, Bot } from 'lucide-react';
import { ChatMessage } from '../../types';
import { ApiService } from '../../services/api';

interface CopilotChatProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export const CopilotChat: React.FC<CopilotChatProps> = ({ messages, setMessages }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedPrompts = [
    "¿Qué proveedor me aumentó más la mercadería esta semana?",
    "¿Cuánto gané comparado con el mes pasado?",
    "¿Qué productos estoy vendiendo a pérdida?",
    "¿Tengo listas de precios desactualizadas?"
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `USR-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const resp = await ApiService.sendChat(query);
      const layaMsg: ChatMessage = {
        id: `LYA-${Date.now()}`,
        sender: 'laya',
        text: resp.respuesta,
        archivos_citados: resp.archivos_citados,
        nivel_alerta: resp.nivel_alerta_asociado,
        timestamp: resp.fecha_respuesta
      };
      setMessages(prev => [...prev, layaMsg]);
    } catch {
      // Fallback message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] pb-20">
      {/* Editorial Chat Header */}
      <div className="bg-white rounded-3xl p-5 shadow-editorial border border-[#073b4c]/5 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#118ab2]/15 flex items-center justify-center text-[#118ab2]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#073b4c]">Preguntas en Criollo</h2>
            <p className="text-xs text-[#073b4c]/60">Consultale a Laya como si le hablaras a un socio de confianza</p>
          </div>
        </div>
      </div>

      {/* Suggested Prompts Carousel */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none shrink-0">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="text-xs text-[#073b4c] font-semibold bg-white hover:bg-[#ffd166]/20 px-3.5 py-2 rounded-2xl border border-[#073b4c]/8 shadow-sm whitespace-nowrap shrink-0 transition-colors"
          >
            💬 {p}
          </button>
        ))}
      </div>

      {/* Chat Messages List */}
      <div className="flex-1 overflow-y-auto space-y-4 px-1 py-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'laya' && (
              <div className="w-8 h-8 rounded-full bg-[#118ab2] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1 shadow-sm">
                L
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-3xl p-4 shadow-editorial leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#073b4c] text-white rounded-br-none'
                  : 'bg-white text-[#073b4c] rounded-bl-none border border-[#073b4c]/5'
              }`}
            >
              <p className="text-xs font-medium whitespace-pre-line">{msg.text}</p>

              {/* Citaciones si es de Laya */}
              {msg.archivos_citados && msg.archivos_citados.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-[#073b4c]/10 space-y-1">
                  <span className="text-[10px] font-bold text-[#118ab2] uppercase tracking-wider block">
                    Fuentes consultadas por Laya:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.archivos_citados.map((c, i) => (
                      <span key={i} className="text-[10px] bg-[#FAF9F5] text-[#073b4c] px-2 py-0.5 rounded-lg border border-[#073b4c]/10 flex items-center gap-1">
                        <ExternalLink className="w-2.5 h-2.5 text-[#118ab2]" /> {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <span className={`text-[9px] block mt-1.5 text-right ${msg.sender === 'user' ? 'text-white/60' : 'text-[#073b4c]/40'}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-[#ffd166] flex items-center justify-center text-[#073b4c] text-xs font-bold shrink-0 mt-1 shadow-sm">
                M
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#073b4c]/60 bg-white p-3 rounded-2xl w-fit shadow-editorial border border-[#073b4c]/5 animate-pulse">
            <Bot className="w-4 h-4 text-[#118ab2]" /> Laya está consultando tus documentos...
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="mt-2 shrink-0 bg-white p-2 rounded-3xl shadow-editorial border border-[#073b4c]/8 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Hacé tu pregunta en criollo..."
          className="flex-1 bg-transparent px-4 py-2.5 text-xs text-[#073b4c] placeholder-[#073b4c]/40 focus:outline-none font-medium"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="w-10 h-10 rounded-2xl bg-[#118ab2] hover:bg-[#073b4c] disabled:opacity-50 text-white flex items-center justify-center transition-colors shadow-sm shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
