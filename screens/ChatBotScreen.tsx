import React, { useState, useRef, useEffect } from 'react';
import { continueChat } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { LeafIcon, UserIcon } from '../components/Icons';

const ChatBotScreen: React.FC<{ language: 'en' | 'ar' }> = ({ language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = language === 'ar' ? {
    title: 'المساعد الزراعي الذكي',
    placeholder: 'اسأل عن أي شيء يخص الزراعة في اليمن...',
    send: 'إرسال',
    initialMessage: 'مرحباً بك! أنا مساعدك الزراعي الذكي. كيف يمكنني خدمتك اليوم؟'
  } : {
    title: 'Smart Agricultural Assistant',
    placeholder: 'Ask anything about agriculture in Yemen...',
    send: 'Send',
    initialMessage: 'Hello! I am your smart agricultural assistant. How can I help you today?'
  };

  useEffect(() => {
    setMessages([{ role: 'model', text: t.initialMessage }]);
  }, [language, t.initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await continueChat(messages, input);
      const modelMessage: ChatMessage = { role: 'model', text: responseText };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', text: 'Sorry, an error occurred.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-8rem)] bg-gray-100 ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
      <header className="bg-white p-4 shadow-sm text-center">
        <h1 className="text-xl font-bold text-dark">{t.title}</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0"><LeafIcon className="w-5 h-5"/></div>}
            <div className={`max-w-xs md:max-w-md lg:max-w-2xl p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-dark rounded-bl-none'}`}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
            </div>
            {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center flex-shrink-0"><UserIcon className="w-5 h-5"/></div>}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0"><LeafIcon className="w-5 h-5"/></div>
                <div className="max-w-xs p-3 rounded-2xl bg-white text-dark rounded-bl-none">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-primary text-white rounded-full p-3 hover:bg-primary-dark disabled:bg-gray-300 transition-colors"
            aria-label={t.send}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${language === 'ar' ? 'transform -scale-x-100' : ''}`} viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotScreen;
