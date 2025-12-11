import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Loader2, X, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';

// Audio notification for chat responses
const NOTIFICATION_SOUND = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWgAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAAEAAAAAEAAABXAAUFBQkJCQ0NDRQUFBoaGiMjIy0tLTExMUJCQkpKSlNTU1paWmJiYmpqanR0dHt7e4SEhIyMjJSUlJycnKWlpa2trbOzs729vcTExM3NzdXV1d/f3+Tk5Ozs7Pb29v///wAAAANMYXZjNTguNTQAAAAAAAAAAAAAAAAAAAAAACQAAAAAAAAAAAFcAnR1AQAAAAAAAAAAA//uQZAAP8AAAZnAAAAAAACAAAAAABQAAAAJgAAAAAAAgAAAAAAUaR6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGZwAAAAAAAgAAAAAAUAAAACYAAAAAAAIAAAAAAFGUf/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQZAAP8AAAZnAAAAAAACAAAAAABQAAAAJgAAAAAAAgAAAAAAUaR/+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGZwAAAAAAAgAAAAAAUAAAACYAAAAAAAIAAAAAAFGUf/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQZAAP8AAAZnAAAAAAACAAAAAABQAAAAJgAAAAAAAgAAAAAAUaR/+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGZwAAAAAAAgAAAAAAUAAAACYAAAAAAAIAAAAAAFGUf/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQZAAP8AAAZnAAAAAAACAAAAAABQAAAAJgAAAAAAAgAAAAAAUaR/+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGZwAAAAAAAgAAAAAAUAAAACYAAAAAAAIAAAAAAFGUf/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

const CustomerSupportChat = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
    // Internal state if needed, though we primarily use external now.
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    // Determine effective open state
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

    const toggleOpen = () => {
        if (externalOnClose && isOpen) {
            externalOnClose();
        } else if (externalIsOpen !== undefined && !isOpen) {
            // Parent controls open, but we don't have an opener prop callback?
            // Usually parent passes isOpen and onOpen/onClose.
            // For now, if externalIsOpen is defined, we assume parent handles it via onClose.
        } else {
            setInternalIsOpen(!internalIsOpen);
        }
    };

    const [messages, setMessages] = useState([
        { role: 'assistant', text: '¡Hola! Soy Aurora 🎵. ¿Tienes dudas sobre el libro o el método? Escríbeme aquí y te ayudo al instante.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio(NOTIFICATION_SOUND);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
                inputRef.current?.focus();
            }, 100);
        }
    }, [messages, isOpen]);

    const playNotification = () => {
        try {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => { });
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userText = input;
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setInput('');
        setLoading(true);

        setTimeout(() => inputRef.current?.focus(), 100);

        try {
            // N8N Webhook Integration
            // Make sure to add VITE_N8N_WEBHOOK_URL to your .env file
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || "YOUR_N8N_WEBHOOK_URL_HERE";

            if (webhookUrl === "YOUR_N8N_WEBHOOK_URL_HERE") {
                console.warn("VITE_N8N_WEBHOOK_URL not set.");
            }

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userText,
                    timestamp: new Date().toISOString(),
                    platform: "web_widget"
                })
            });

            let text = "";
            if (response.ok) {
                const data = await response.json();
                // Expecting n8n to return { output: "response text" } or similar. 
                // Adjust 'output' key based on your n8n workflow response node.
                text = data.output || data.text || data.message || "Gracias por tu mensaje. Un agente lo revisará pronto.";
            } else {
                throw new Error("Webhook Error");
            }

            setMessages(prev => [...prev, { role: 'assistant', text: text }]);
            playNotification();

            // Optional: Log to Firebase still if desired, or let n8n handle logging.
            // Keeping Firebase log for backup:
            addDoc(collection(db, "chat_logs"), {
                query: userText,
                response: text,
                timestamp: serverTimestamp(),
                platform: "web_widget_n8n"
            }).catch(e => console.warn("Log failed", e));

        } catch (error) {
            console.error("n8n Error:", error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: "Hubo un pequeño error de conexión 🎵. Por favor intenta de nuevo o contáctanos por WhatsApp."
            }]);
        } finally {
            setLoading(false);
        }
    };

    // Render Floating Widget
    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            {isOpen && (
                <div className="pointer-events-auto mb-4 w-[90vw] md:w-[400px] h-[60vh] md:h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#2DD6F5] to-[#00AEEF] p-4 text-white flex items-center justify-between shrink-0 shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                <MessageCircle className="text-white" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-base tracking-wide leading-tight">Asistente Método Activa</h3>
                                <p className="text-blue-50 text-[10px] flex items-center gap-1 font-medium">
                                    <span className="w-1.5 h-1.5 bg-[#FFD200] rounded-full animate-pulse shadow-[0_0_8px_#FFD200]"></span>
                                    En línea ahora
                                </p>
                            </div>
                        </div>
                        <button onClick={toggleOpen} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 scroll-smooth">
                        <div className="p-2 bg-yellow-50 border border-yellow-100 rounded-lg text-xs text-yellow-800 text-center mb-4">
                            🔒 Chat seguro. Respondemos tus dudas para ayudarte a decidir.
                        </div>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                                    ${msg.role === 'user'
                                        ? 'bg-[#00AEEF] text-white rounded-tr-none'
                                        : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1 items-center h-10">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-100 shrink-0 flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00AEEF] outline-none text-sm"
                            placeholder="Escribe tu duda..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            disabled={loading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={loading || !input.trim()}
                            className="bg-[#00AEEF] text-white p-3 rounded-xl hover:bg-[#008CCF] disabled:opacity-50 transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Launcher Button (FAB) - Always visible when closed */}
            {!isOpen && (
                <button
                    onClick={toggleOpen}
                    className="pointer-events-auto group flex items-center gap-3 bg-[#00AEEF] hover:bg-[#008CCF] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(0,174,239,0.4)] transition-all hover:scale-110 active:scale-95 animate-bounce-subtle"
                >
                    <span className="hidden md:block font-bold pr-1">¿Dudas? Chatea aquí</span>
                    <MessageCircle size={28} />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                    </span>
                </button>
            )}
        </div>
    );
};

export default CustomerSupportChat;
