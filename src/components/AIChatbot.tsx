'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      { id: 'greeting', role: 'assistant', content: t('chatbot.greeting') }
    ]);
  }, [t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated AI response delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString() + '_r',
        role: 'assistant',
        content: t('chatbot.greeting'),
      }]);
    }, 1200);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        id="chatbot-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-gray-800 rotate-0 scale-95'
            : 'bg-gradient-to-br from-[#6b9fd4] to-[#4a7ab5] hover:scale-110'
        }`}
        aria-label="Toggle AI Chatbot"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Panel */}
      <div
        id="chatbot-panel"
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-[#6b9fd4] to-[#4a7ab5] rounded-t-2xl">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">{t('chatbot.title')}</p>
            <p className="text-white/70 text-[11px]">KOKKOK GARDEN</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white/70 text-[11px]">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-[320px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6b9fd4] to-[#4a7ab5] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-[#6b9fd4] to-[#4a7ab5] text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6b9fd4] to-[#4a7ab5] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 focus-within:border-[#6b9fd4] transition-colors">
            <input
              id="chatbot-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t('chatbot.placeholder')}
              className="flex-1 bg-transparent text-sm outline-none text-gray-800 placeholder:text-gray-400"
            />
            <button
              id="chatbot-send-btn"
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6b9fd4] to-[#4a7ab5] flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity disabled:opacity-30"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
