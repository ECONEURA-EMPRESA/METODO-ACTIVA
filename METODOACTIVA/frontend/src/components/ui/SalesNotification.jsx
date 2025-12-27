import React, { useState, useEffect } from 'react';
import { Check, ShoppingBag } from 'lucide-react';

const NAMES = ["María G.", "Carmen L.", "Antonio R.", "Laura P.", "Sofía M.", "Manuel D.", "Ana B.", "Francisco J."];
const CITIES = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga", "Bilbao", "Alicante", "Murcia"];
const TIME_AGO = ["hace 2 min", "hace 5 min", "hace 12 min", "hace 23 min", "hace 1 hora"];

export default function SalesNotification() {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({ name: "", city: "", time: "" });

    useEffect(() => {
        // Initial delay before first popup
        const initialTimeout = setTimeout(() => {
            triggerPopup();
        }, 8000);

        const triggerPopup = () => {
            // Randomize content
            const name = NAMES[Math.floor(Math.random() * NAMES.length)];
            const city = CITIES[Math.floor(Math.random() * CITIES.length)];
            const time = TIME_AGO[Math.floor(Math.random() * TIME_AGO.length)];

            setData({ name, city, time });
            setVisible(true);

            // Hide after 5 seconds
            setTimeout(() => {
                setVisible(false);
            }, 5000);

            // Schedule next popup (random interval between 20-40 seconds)
            const nextInterval = Math.random() * (40000 - 20000) + 20000;
            setTimeout(triggerPopup, nextInterval);
        };

        return () => clearTimeout(initialTimeout);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 animate-slide-up-fade">
            <div className="bg-white/95 backdrop-blur-md border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-2xl p-4 flex items-center gap-4 max-w-xs ring-1 ring-black/5">
                <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#EC008C] to-[#F7941D] rounded-full flex items-center justify-center text-white shadow-lg">
                        <ShoppingBag size={20} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white">
                        <Check size={10} className="text-white" strokeWidth={4} />
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">
                        {data.name} de {data.city}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                        compró el <strong>Método Activa</strong>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">
                        {data.time} · <span className="text-green-600">Verificado</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
