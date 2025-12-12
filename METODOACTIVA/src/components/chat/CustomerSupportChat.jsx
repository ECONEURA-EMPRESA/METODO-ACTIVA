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

    // UI RENDER (Limpia, sin lógica compleja)
    return (
        <div className="fixed bottom-6 right-6 z-[9999999] flex flex-col items-end pointer-events-none md:bottom-6 bottom-20">
            {isOpen && (
                <div className="pointer-events-auto mb-4 w-[90vw] md:w-[400px] h-[60vh] md:h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <div className="bg-gradient-to-r from-[#2DD6F5] to-[#00AEEF] p-4 text-white flex items-center justify-between shrink-0 shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm"><MessageCircle className="text-white" size={20} /></div>
                            <div>
                                <h3 className="font-bold text-base tracking-wide leading-tight">Aurora - Método Activa</h3>
                                <p className="text-blue-50 text-[10px] flex items-center gap-1 font-medium"><span className="w-1.5 h-1.5 bg-[#FFD200] rounded-full animate-pulse shadow-[0_0_8px_#FFD200]"></span>En línea (Real AI)</p>
                            </div>
                        </div>
                        <button onClick={toggleOpen} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X size={20} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 scroll-smooth">
                        <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-800 text-center mb-4">✨ Conectada a Gemini 2.0 Flash Lite.</div>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#00AEEF] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'}`}>{msg.text}</div>
                            </div>
                        ))}
                        {loading && <div className="flex justify-start"><div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1 items-center h-10"><Loader2 className="animate-spin text-gray-400" size={16} /></div></div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-3 bg-white border-t border-gray-100 shrink-0 flex gap-2">
                        <input ref={inputRef} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00AEEF] outline-none text-sm" placeholder="Escribe..." value={input} onChange={(e) => setInput(e.target.value)} disabled={loading} />
                        <button onClick={handleSendMessage} disabled={loading || !input.trim()} className="bg-[#00AEEF] text-white p-3 rounded-xl hover:bg-[#008CCF] disabled:opacity-50 transition-colors"><Send size={18} /></button>
                    </div>
                </div>
            )}
            {!isOpen && (
                <button onClick={toggleOpen} className="pointer-events-auto group flex items-center gap-3 bg-[#00AEEF] hover:bg-[#008CCF] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(0,174,239,0.4)] transition-all hover:scale-110 active:scale-95 animate-bounce-subtle">
                    <span className="hidden md:block font-bold pr-1">¿Hablamos?</span>
                    <MessageCircle size={28} />
                </button>
            )}
        </div>
    );
};

export default CustomerSupportChat;
