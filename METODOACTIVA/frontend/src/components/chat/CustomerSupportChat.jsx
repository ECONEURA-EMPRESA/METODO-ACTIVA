import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Loader2, X } from 'lucide-react';
import { useAuroraAI } from '../../hooks/useAuroraAI';
import { NOTIFICATION_SOUND } from '../../constants/sounds';

// Firestore lo mantenemos para analytics backup, opcional
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';

const CustomerSupportChat = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
    // STATE: Local control synced with parent
    const [isOpen, setIsOpen] = useState(false);

    // CUSTOM HOOK: Lógica separada de la UI
    const { sendMessage, loading, error } = useAuroraAI();

    useEffect(() => {
        if (externalIsOpen !== undefined && externalIsOpen !== isOpen) {
            setIsOpen(externalIsOpen);
        }
    }, [externalIsOpen]);

    const toggleOpen = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (!newState && externalOnClose) externalOnClose();
    };

    const [messages, setMessages] = useState([
        { role: 'assistant', text: '¡Hola! Soy Aurora 🎵. Conecto la musicoterapia con el cuidado diario. ¿En qué puedo orientarte hoy?' }
    ]);
    const [input, setInput] = useState('');

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => { audioRef.current = new Audio(NOTIFICATION_SOUND); }, []);
    useEffect(() => {
        if (isOpen) setTimeout(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); inputRef.current?.focus(); }, 100);
    }, [messages, isOpen]);

    const playNotification = () => { try { audioRef.current?.play().catch(() => { }); } catch (e) { } };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userText = input;
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setInput('');

        // Enfocar input para seguir escribiendo si se desea
        setTimeout(() => inputRef.current?.focus(), 100);

        try {
            // USAMOS EL HOOK SENIOR (FLASH LITE)
            const data = await sendMessage(userText, "general"); // "general" podría ser dinámico si tuviéramos selector de perfil

            if (data && data.response) {
                setMessages(prev => [...prev, { role: 'assistant', text: data.response }]);
                playNotification();

                // Analytics Backup (Opcional)
                try { addDoc(collection(db, "chat_logs"), { query: userText, response: data.response, timestamp: serverTimestamp(), platform: "web_client_ai" }); } catch (e) { }
            }

        } catch (err) {
            // Error handling
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: "⚠️ Mi cerebro está re-conectando con la nube. Por favor, intenta de nuevo en unos segundos."
            }]);
            playNotification();
        }
    };

    // UI RENDER (Premium Glass Architecture)
    return (
        <div className="fixed bottom-6 right-6 z-[9999999] flex flex-col items-end pointer-events-none md:bottom-8 bottom-24">
            {isOpen && (
                <div className="pointer-events-auto mb-6 w-[92vw] md:w-[380px] h-[65vh] md:h-[600px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] border border-white/60 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 ring-1 ring-gray-100">

                    {/* Header Premium */}
                    <div className="bg-gradient-to-r from-[#2DD6F5]/10 to-[#00AEEF]/10 p-5 flex items-center justify-between shrink-0 border-b border-gray-100 backdrop-blur-md">
                        <div className="flex items-center gap-3.5">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#EC008C] to-[#00AEEF] rounded-full blur-md opacity-40 animate-pulse"></div>
                                <div className="relative bg-white p-2.5 rounded-full shadow-sm border border-white">
                                    <MessageCircle className="text-[#00AEEF]" size={22} />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-[2px] border-white"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg leading-tight">Aurora AI</h3>
                                <p className="text-gray-500 text-xs font-medium">Asistente Virtual • <span className="text-green-600">En línea</span></p>
                            </div>
                        </div>
                        <button onClick={toggleOpen} className="p-2 hover:bg-gray-100/50 rounded-full transition-all text-gray-400 hover:text-gray-600 hover:rotate-90 duration-300">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth bg-gradient-to-b from-transparent to-gray-50/50">
                        <div className="flex justify-center">
                            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase bg-gray-50 px-3 py-1 rounded-full border border-gray-100">Hoy</span>
                        </div>

                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                                <div className={`max-w-[85%] p-4 text-[14px] leading-relaxed shadow-sm transition-all hover:shadow-md
                                    ${msg.role === 'user'
                                        ? 'bg-gradient-to-br from-[#00AEEF] to-[#008CCF] text-white rounded-[1.3rem] rounded-tr-sm'
                                        : 'bg-white text-gray-700 border border-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] rounded-[1.3rem] rounded-tl-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start animate-in fade-in duration-300">
                                <div className="bg-white p-3 px-4 rounded-[1.3rem] rounded-tl-sm border border-gray-100 shadow-sm flex items-center gap-3">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-[#EC008C] rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-[#00AEEF] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-[#F7941D] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium animate-pulse">Aurora está razonando...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white/80 border-t border-gray-100 shrink-0 backdrop-blur-md">
                        <div className="relative flex items-center gap-2 bg-gray-50 p-1.5 rounded-[1.5rem] border border-gray-200 focus-within:border-[#00AEEF]/50 focus-within:ring-4 focus-within:ring-[#00AEEF]/10 transition-all shadow-inner">
                            <input
                                ref={inputRef}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                type="text"
                                className="w-full p-3 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 ml-2"
                                placeholder="Escribe un mensaje..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={loading}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={loading || !input.trim()}
                                className="p-3 bg-[#00AEEF] text-white rounded-full hover:bg-[#008CCF] disabled:opacity-50 disabled:hover:bg-[#00AEEF] transition-all hover:scale-105 active:scale-95 shadow-md"
                            >
                                <Send size={18} className={loading ? 'opacity-0' : 'opacity-100'} />
                                {loading && <Loader2 size={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />}
                            </button>
                        </div>
                        <div className="text-center mt-2.5">
                            <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
                                Respuesta instantánea con IA
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {!isOpen && (
                <button
                    onClick={toggleOpen}
                    className="pointer-events-auto group flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00AEEF] to-[#008CCF] text-white rounded-full shadow-[0_8px_30px_rgba(0,174,239,0.3)] transition-all hover:scale-110 hover:shadow-[0_15px_40px_rgba(0,174,239,0.4)] active:scale-95 z-50 animate-bounce-subtle ring-4 ring-white/50"
                >
                    <MessageCircle size={32} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span className="absolute top-0 right-0 flex h-4 w-4">

                    </span>
                </button>
            )}
        </div>
    );
};

export default CustomerSupportChat;
