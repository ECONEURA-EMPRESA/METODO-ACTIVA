import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
    const PHONE_NUMBER = "34643882154";
    const MESSAGE = "Hola Aurora, me gustaría recibir más información sobre el Método Activa.";

    const handleClick = () => {
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
        window.open(url, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-24 left-4 z-40 group flex items-center justify-center p-3 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-[#25D366]/50 md:bottom-8 md:left-8"
            aria-label="Chat en WhatsApp"
        >
            <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-20"></div>
            <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute left-full ml-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                ¿Hablamos?
            </span>
        </button>
    );
}
