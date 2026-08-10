import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, Loader2, ChevronRight } from 'lucide-react';
import api from '../services/api';

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: '👋 Hi! I am COETA E-Cell AI Assistant. Ask me anything about startup ideas, incubation, funding grants, pitch decks, or business models!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = { role: 'user' as const, content: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/chat', {
        message: query,
        history: messages,
      });
      if (res.data.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I had trouble processing that request. Please try again!' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    'How do I apply for COETA incubation?',
    'Explain Government Startup Grants (SISFS)',
    'What should go into a seed pitch deck?',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-3 p-4 rounded-full gradient-btn text-white shadow-2xl hover:scale-110 transition-all duration-300 shadow-purple-500/40"
        >
          <div className="relative">
            <Bot className="w-7 h-7 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
          </div>
          <span className="font-bold text-sm hidden sm:inline pr-1">Ask AI Assistant</span>
        </button>
      )}

      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[580px] rounded-2xl glass-panel bg-slate-950/95 border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-900/60 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm flex items-center space-x-1.5">
                  <span>E-Cell AI Copilot</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <p className="text-[11px] text-cyan-300 font-medium">Powered by Gemini AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2.5 ${
                  msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-purple-600 text-white'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[82%] ${
                    msg.role === 'user'
                      ? 'bg-cyan-600/30 text-slate-100 border border-cyan-500/40 rounded-tr-none'
                      : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-cyan-400 text-xs py-2 px-3 bg-slate-900/60 rounded-xl w-fit">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI is formulating response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sample Prompts */}
          {messages.length < 3 && (
            <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/50">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Suggested Questions:</p>
              <div className="space-y-1">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p)}
                    className="w-full text-left text-xs p-2 rounded-lg bg-slate-900 hover:bg-purple-950/60 text-slate-300 hover:text-cyan-300 flex items-center justify-between border border-slate-800 transition-colors"
                  >
                    <span className="truncate">{p}</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask startup or incubation questions..."
              className="flex-1 glass-input text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl gradient-btn text-white disabled:opacity-50 hover:scale-105 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
