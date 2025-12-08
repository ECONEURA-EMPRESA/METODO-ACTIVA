import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Loader2, X, AlertCircle } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, GEMINI_API_KEY } from '../../firebase';

// Audio notification for chat responses

const NOTIFICATION_SOUND = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWgAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYaW5nAAAAEAAAAAEAAABXAAUFBQkJCQ0NDRQUFBoaGiMjIy0tLTExMUJCQkpKSlNTU1paWmJiYmpqanR0dHt7e4SEhIyMjJSUlJycnKWlpa2trbOzs729vcTExM3NzdXV1d/f3+Tk5Ozs7Pb29v///wAAAANMYXZjNTguNTQAAAAAAAAAAAAAAAAAAAAAACQAAAAAAAAAAAFcAnR1AQAAAAAAAAAAA//uQZAAP8AAAZnAAAAAAACAAAAAABQAAAAJgAAAAAAAgAAAAAAUaR6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGZwAAAAAAAgAAAAAAUAAAACYAAAAAAAIAAAAAAFGUf/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQZAAP8AAAZnAAAAAAACAAAAAABQAAAAJgAAAAAAAgAAAAAAUaR/+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGZwAAAAAAAgAAAAAAUAAAACYAAAAAAAIAAAAAAFGUf/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQZAAP8AAAZnAAAAAAACAAAAAABQAAAAJgAAAAAAAgAAAAAAUaR/+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGZwAAAAAAAgAAAAAAUAAAACYAAAAAAAIAAAAAAFGUf/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQZAAP8AAAZnAAAAAAACAAAAAABQAAAAJgAAAAAAAgAAAAAAUaR/+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGZwAAAAAAAgAAAAAAUAAAACYAAAAAAAIAAAAAAFGUf/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

const CustomerSupportChat = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: '¡Hola! Soy Aurora 🎵. ¿Buscas aliviar la ansiedad o el estrés? Pregúntame sobre el "Método Activa" y te diré cómo conseguirlo hoy mismo.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const audioRef = useRef(new Audio(NOTIFICATION_SOUND));

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        // Auto-focus on mount
        inputRef.current?.focus();
    }, [messages]);

    const playNotification = () => {
        try {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => console.log("Audio play failed (user interaction needed)", e));
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

        // Keep focus
        setTimeout(() => inputRef.current?.focus(), 100);

        try {
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            // Prompt enfocado 100% a la conversión en Amazon
            const systemInstruction = `
                Actúa como Aurora Del Río, autora experta del "Método Activa".
                
                TUS REGLAS DE ORO:
                1. TU OBJETIVO PRINCIPAL ES QUE COMPREN EL LIBRO EN AMAZON.
                2. Responde a la duda brevemente (1 frase) y luego dirige a la compra.
                3. Menciona siempre que la solución completa está en el libro.
                4. Usa un tono cálido y empático, pero persuasivo.
                5. Si preguntan precio, di: "Está en oferta lanzamiento en Amazon".
                6. Termina tus respuestas invitando a hacer clic en los botones naranjas de arriba.
                
                Ejemplo:
                Usuario: "¿Sirve para la ansiedad?"
                Aurora: "¡Sí, totalmente! El capítulo 3 ofrece la técnica de 'Melodía Cinética' que baja el cortisol en minutos. Tienes todo el protocolo detallado en el libro, ¡puedes conseguirlo en Amazon ahora mismo! 🎵"
                
                No seas tímida, ¡vende salud!
                Límite: Máximo 3 frases cortas.
            `;
            const fullPrompt = `${systemInstruction}\n\nUsuario: ${userText}\nAurora:`;

            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();

            setMessages(prev => [...prev, { role: 'assistant', text: text }]);
            playNotification();

            addDoc(collection(db, "chat_logs"), {
                query: userText,
                response: text,
                timestamp: serverTimestamp(),
                platform: "web_client_sales_mode"
            }).catch(e => console.warn("Log failed", e));

        } catch (error) {
            console.error("Gemini Error:", error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: "Lo siento, hubo un pequeño corte musical. Pero no te preocupes, ¡toda la info la tienes en el libro en Amazon! �"
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        // CSS FIX: max-w-full y h-auto on mobile, fixed height on desktop
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px] md:h-[550px] transform transition-all hover:scale-[1.01] relative z-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2DD6F5] to-[#00AEEF] p-4 text-white flex items-center justify-between shrink-0 shadow-md relative z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                        <MessageCircle className="text-white" size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg tracking-wide leading-tight">Soporte Método Activa</h3>
                        <p className="text-blue-50 text-xs flex items-center gap-1 font-medium">
                            <span className="w-2 h-2 bg-[#FFD200] rounded-full animate-pulse shadow-[0_0_8px_#FFD200]"></span>
                            Aurora (IA) en línea
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 space-y-5 scroll-smooth relative">
                {/* Amazon Promo Badge inside chat content */}
                <div className="absolute top-0 left-0 w-full p-2 bg-yellow-50 border-b border-yellow-100 text-[10px] text-yellow-700 text-center font-bold uppercase tracking-widest z-0">
                    🔥 Oferta disponible en Amazon Prime
                </div>
                <div className="h-4"></div> {/* Spacer for badge */}

                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                        <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-[14px] md:text-[15px] leading-relaxed shadow-sm transition-all duration-300
                            ${msg.role === 'user'
                                ? 'bg-gradient-to-br from-[#00AEEF] to-[#008CCF] text-white rounded-tr-none'
                                : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {loading && (
                    <div className="flex justify-start animate-fadeIn">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1 items-center h-12">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-white border-t border-gray-100 shrink-0 flex gap-2 md:gap-3 relative shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-30">
                <input
                    ref={inputRef}
                    type="text"
                    className="w-full p-3 md:p-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00AEEF]/50 focus:border-[#00AEEF] outline-none transition-all placeholder-gray-400 text-gray-700 text-sm md:text-base"
                    placeholder="Pregunta sobre el libro..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={loading}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={loading || !input.trim()}
                    className="absolute right-5 md:right-6 top-5 md:top-6 bottom-5 md:bottom-6 text-[#00AEEF] hover:text-[#008CCF] disabled:opacity-30 disabled:hover:text-[#00AEEF] transition-all hover:scale-110 flex items-center justify-center p-1"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} md:size={24} /> : <Send size={20} md:size={24} />}
                </button>
            </div>
        </div>
    );
};

export default CustomerSupportChat;
