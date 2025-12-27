import React, { useState } from 'react';
import { Star, Lock, X, Loader2 } from 'lucide-react';
import Button from './Button';

export const AmazonReviewCard = ({ title, author, date, text }) => (
    <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 hover-lift hover:border-brand-blue/20 transition-all group">
        <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#FF9900] fill-[#FF9900]" />)}
            <span className="text-xs font-bold text-brand-pink ml-2">Compra verificada</span>
        </div>
        <h4 className="font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">{title}</h4>
        <p className="text-xs text-gray-400 mb-4">Revisado en España el {date}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-4">"{text}"</p>
        <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-gray-600 font-bold text-sm ring-2 ring-white shadow-sm">{author.charAt(0)}</div>
            <span className="text-sm font-medium text-gray-700">{author}</span>
        </div>
    </div>
);

export const BenefitRow = ({ icon: Icon, title, desc, category = 'mind', onClick, className = '' }) => {
    const gradients = {
        body: "from-brand-yellow-light to-brand-yellow",
        mind: "from-brand-blue-light to-brand-blue",
        heart: "from-brand-pink-light to-brand-pink"
    };
    const textColors = {
        body: "text-brand-yellow-dark",
        mind: "text-brand-blue-dark",
        heart: "text-brand-pink-dark"
    };
    const shadowColors = {
        body: "group-hover:shadow-glow-yellow",
        mind: "group-hover:shadow-glow-blue",
        heart: "group-hover:shadow-glow-pink"
    };

    return (
        <div
            onClick={onClick}
            className={`flex items-start gap-4 p-5 hover:bg-white rounded-2xl transition-all duration-300 group ${onClick ? 'cursor-pointer hover:shadow-md' : 'cursor-default'} hover-lift ${className}`}
        >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[category]} flex items-center justify-center flex-shrink-0 text-white shadow-md ${shadowColors[category]} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <Icon size={26} strokeWidth={2.5} />
            </div>
            <div>
                <h3 className={`font-bold text-lg mb-2 ${textColors[category]} group-hover:translate-x-1 transition-transform`}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
};

export const LeadMagnetModal = ({ isOpen, onClose, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación estricta de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor ingresa un email válido."); // Simple alert for MVP, ideally a toast
            return;
        }

        setLoading(true);
        try {
            // Save lead to Firestore (requires 'allow create: if true' in rules, which is set)
            const { collection, addDoc } = await import('firebase/firestore');
            const { db } = await import('../../firebase');

            await addDoc(collection(db, "leads"), {
                email: email,
                timestamp: new Date(),
                source: "web_modal"
            });

            onSuccess();
        } catch (error) {
            console.error("Error saving lead:", error);
            // Even if it fails, we let them through for UX, but log it
            onSuccess();
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md" onClick={onClose}></div>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 animate-in zoom-in duration-300">
                <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors z-10 p-2 hover:bg-gray-100 rounded-full">
                    <X size={24} />
                </button>
                <div className="bg-gradient-to-br from-brand-blue-light to-brand-blue p-10 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 backdrop-blur-sm shadow-lg">
                            <Lock size={36} className="text-white" />
                        </div>
                        <h3 className="text-3xl font-bold mb-3 font-display">Desbloquear Recursos</h3>
                        <p className="text-blue-50 text-sm leading-relaxed">Ingresa tu email para acceder al Capítulo 1 y las herramientas gratuitas.</p>
                    </div>
                </div>
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">Tu mejor correo electrónico</label>
                            <input
                                type="email"
                                required
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                                placeholder="ejemplo@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button className="w-full justify-center" disabled={loading}>
                            {loading ? <><Loader2 className="animate-spin" /> Procesando...</> : 'Desbloquear Acceso Ahora'}
                        </Button>
                        <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                            🔒 Tus datos están 100% seguros.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
