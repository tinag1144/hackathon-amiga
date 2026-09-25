import React, { useState, useRef, useEffect } from 'react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "¿Qué mayorista aumentó más esta semana?",
    "¿Cuánto gané comparado al mes pasado?",
    "¿Qué productos vendo a pérdida?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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
    <div className="flex-1 flex flex-col overflow-hidden pb-16 min-h-0 relative">
      
      {/* Editorial Chat Header */}
      <div className="bg-white rounded-2xl p-3 shadow-editorial border border-[#073b4c]/5 mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#118ab2]/15 flex items-center justify-center text-[#118ab2] shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#073b4c]">Preguntas en Criollo</h2>
            <p className="text-[9px] text-[#073b4c]/60">Consultale a Laya AI como a un socio de confianza</p>
          </div>
        </div>
      </div>

      {/* Suggested Prompts Carousel */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-1.5 scrollbar-none shrink-0">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="text-[9px] text-[#073b4c] font-semibold bg-white hover:bg-[#ffd166]/20 px-2.5 py-1 rounded-xl border border-[#073b4c]/10 shadow-sm whitespace-nowrap shrink-0 transition-colors"
          >
            💬 {p}
          </button>
        ))}
      </div>

      {/* Chat Messages List (STRICTLY SCROLLABLE AREA) */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-2 px-1 py-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-1.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'laya' && (
              <div className="w-6 h-6 rounded-full bg-[#118ab2] flex items-center justify-center text-white text-[9px] font-bold shrink-0 mt-0.5 shadow-sm">
                L
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-2.5 shadow-editorial leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#073b4c] text-white rounded-br-none'
                  : 'bg-white text-[#073b4c] rounded-bl-none border border-[#073b4c]/5'
              }`}
            >
              <p className="text-[10px] font-medium whitespace-pre-line">{msg.text}</p>

              {/* Citaciones si es de Laya */}
              {msg.archivos_citados && msg.archivos_citados.length > 0 && (
                <div className="mt-1.5 pt-1 border-t border-[#073b4c]/10 space-y-0.5">
                  <span className="text-[8px] font-bold text-[#118ab2] uppercase tracking-wider block">
                    Fuentes consultadas por Laya:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {msg.archivos_citados.map((c, i) => (
                      <span key={i} className="text-[8px] bg-[#FAF9F5] text-[#073b4c] px-1.5 py-0.5 rounded-md border border-[#073b4c]/10 flex items-center gap-1">
                        <ExternalLink className="w-2 h-2 text-[#118ab2]" /> {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <span className={`text-[7px] block mt-0.5 text-right ${msg.sender === 'user' ? 'text-white/60' : 'text-[#073b4c]/40'}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-full bg-[#ffd166] flex items-center justify-center text-[#073b4c] text-[9px] font-bold shrink-0 mt-0.5 shadow-sm">
                M
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-[9px] text-[#073b4c]/60 bg-white p-2 rounded-xl w-fit shadow-editorial border border-[#073b4c]/5 animate-pulse">
            <Bot className="w-3 h-3 text-[#118ab2]" /> Laya está consultando tus documentos...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar (STRICTLY SHRUNK AND POSITIONED ABOVE BOTTOMNAV) */}
      <div className="mt-1 shrink-0 bg-white p-1.5 rounded-2xl shadow-editorial border border-[#073b4c]/10 flex items-center gap-1.5 z-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Hacé tu pregunta en criollo..."
          className="flex-1 bg-transparent px-2.5 py-1 text-[10px] text-[#073b4c] placeholder-[#073b4c]/40 focus:outline-none font-medium"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="w-7 h-7 rounded-xl bg-[#118ab2] hover:bg-[#073b4c] disabled:opacity-50 text-white flex items-center justify-center transition-colors shadow-sm shrink-0"
        >
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
