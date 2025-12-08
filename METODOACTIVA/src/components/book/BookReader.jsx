import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingCart, Volume2, VolumeX } from 'lucide-react';
import Button from '../ui/Button';
import { IMAGES } from '../../constants/images';

// Page turn sound (base64 encoded short sound)
const PAGE_TURN_SOUND = "data:audio/mp3;base64,SUQzBAAAAAAJBlRJVDIAAABBBA==";

const BookReader = ({ onClose, onBuy }) => {
    const [page, setPage] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [flipDirection, setFlipDirection] = useState('next');
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const bookRef = useRef(null);
    const touchStartX = useRef(null);
    const audioRef = useRef(null);
    const totalPages = 4;

    // Initialize audio
    useEffect(() => {
        audioRef.current = new Audio(PAGE_TURN_SOUND);
        audioRef.current.volume = 0.3;
    }, []);

    // Play page turn sound
    const playPageSound = () => {
        if (soundEnabled && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => { });
        }
    };

    // 3D Tilt effect on mouse move
    const handleMouseMove = (e) => {
        if (!bookRef.current) return;
        const rect = bookRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * 10, y: -x * 10 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    // Touch swipe gestures
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (!touchStartX.current) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext();
            else handlePrev();
        }
        touchStartX.current = null;
    };

    const handleNext = () => {
        if (page < totalPages - 1 && !isFlipping) {
            setFlipDirection('next');
            setIsFlipping(true);
            playPageSound();
            setTimeout(() => {
                setPage(page + 1);
                setIsFlipping(false);
            }, 600);
        }
    };

    const handlePrev = () => {
        if (page > 0 && !isFlipping) {
            setFlipDirection('prev');
            setIsFlipping(true);
            playPageSound();
            setTimeout(() => {
                setPage(page - 1);
                setIsFlipping(false);
            }, 600);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [page, isFlipping]);

    const PageContent = ({ index }) => {
        switch (index) {
            case 0: // COVER
                return (
                    <div className="w-full h-full flex flex-col items-center justify-center relative shadow-inner rounded-r-sm overflow-hidden group cursor-pointer" onClick={handleNext}>
                        <img
                            src={IMAGES.cover}
                            alt="Portada Método Activa"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Realistic Lighting Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-white/10 pointer-events-none mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none"></div>
                        {/* Spine shadow */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent pointer-events-none mixture-multiply"></div>
                        {/* Click hint */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                            Toca para abrir →
                        </div>
                    </div>
                );
            case 1: // INTRO
                return (
                    <div className="w-full h-full bg-[#fdfbf7] text-gray-800 p-8 md:p-12 font-serif relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-900/5 to-transparent pointer-events-none"></div>
                        {/* Paper Texture Noise */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                        <div className="relative z-10 h-full overflow-y-auto pr-2 custom-scrollbar">
                            <span className="text-xs font-sans font-bold text-brand-pink uppercase tracking-[0.2em] block mb-6">Capítulo 1</span>
                            <h2 className="font-display text-4xl mb-8 text-gray-900 leading-tight">La Verdad Oculta</h2>

                            <div className="prose prose-lg text-gray-700 leading-relaxed">
                                <p className="first-letter:text-6xl first-letter:font-black first-letter:text-gray-900 first-letter:float-left first-letter:mr-4 first-letter:mt-[-10px]">
                                    Te han mentido durante años. Te han dicho que el arte es un adorno, un lujo innecesario para gente con tiempo libre.
                                </p>
                                <p>
                                    Pero la neurociencia moderna confirma lo que los antiguos sabían: <strong className="text-brand-blue">tu cerebro muere de hambre estética.</strong>
                                </p>
                                <div className="my-10 pl-6 border-l-4 border-brand-pink italic text-xl text-gray-600 font-medium bg-brand-pink/5 py-4 pr-4 rounded-r-lg">
                                    "No es un colapso repentino. Es un apagón lento y silencioso de tu sistema nervioso."
                                </div>
                                <p>
                                    Vivimos en la era de la desconexión. Tienes mil mensajes sin leer, notificaciones constantes, pero no recuerdas el ritmo de tu propio pulso.
                                </p>
                            </div>
                            <div className="mt-12 text-center">
                                <span className="text-xs font-serif text-gray-400 italic">- 1 -</span>
                            </div>
                        </div>
                    </div>
                );
            case 2: // SCIENCE
                return (
                    <div className="w-full h-full bg-[#fdfbf7] text-gray-800 p-8 md:p-12 font-serif relative overflow-hidden">
                        {/* Paper Texture */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                        <div className="relative z-10 h-full overflow-y-auto pr-2 custom-scrollbar">
                            <h2 className="font-display text-3xl mb-8 text-brand-blue leading-tight">El Diagnóstico Clínico</h2>
                            <div className="space-y-8">
                                <p className="text-lg leading-relaxed text-gray-700">
                                    Tu cuerpo funciona como una orquesta desafinada. Necesitas sincronizar los tres pisos de tu biología para recuperar la salud:
                                </p>
                                <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm space-y-6">
                                    <div className="flex gap-4 items-start group">
                                        <span className="w-10 h-10 rounded-full bg-brand-yellow/10 text-brand-yellow-dark flex items-center justify-center font-bold text-lg shrink-0 group-hover:scale-110 transition-transform">1</span>
                                        <div>
                                            <strong className="block text-gray-900 text-lg mb-1">Cuerpo</strong>
                                            <span className="text-gray-600">Necesita ritmo constante para regular el cortisol.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start group">
                                        <span className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue-dark flex items-center justify-center font-bold text-lg shrink-0 group-hover:scale-110 transition-transform">2</span>
                                        <div>
                                            <strong className="block text-gray-900 text-lg mb-1">Mente</strong>
                                            <span className="text-gray-600">Necesita estructura estética para claridad cognitiva.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start group">
                                        <span className="w-10 h-10 rounded-full bg-brand-pink/10 text-brand-pink-dark flex items-center justify-center font-bold text-lg shrink-0 group-hover:scale-110 transition-transform">3</span>
                                        <div>
                                            <strong className="block text-gray-900 text-lg mb-1">Corazón</strong>
                                            <span className="text-gray-600">Necesita belleza y vínculo para sanar emociones.</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="font-bold text-gray-900 text-xl border-t border-gray-100 pt-6">
                                    Este libro es tu manual de reparación.
                                </p>
                            </div>
                            <div className="mt-12 text-center">
                                <span className="text-xs font-serif text-gray-400 italic">- 2 -</span>
                            </div>
                        </div>
                    </div>
                );
            case 3: // BACK COVER / CTA
                return (
                    <div className="w-full h-full bg-white flex flex-col items-center justify-center p-10 text-center relative border-l border-gray-100 overflow-hidden">
                        {/* Background blobs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                        <div className="relative z-10 max-w-sm w-full animate-in slide-in-from-bottom duration-700 fade-in">
                            <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl hover:scale-110 transition-transform duration-300">
                                <ShoppingCart size={36} />
                            </div>
                            <h3 className="text-4xl font-display font-black text-gray-900 mb-4 tracking-tight">¿Listo para sanar?</h3>
                            <p className="text-gray-500 mb-10 text-lg leading-relaxed">
                                Has leído el inicio. Accede ahora al protocolo completo de 21 días y transforma tu vida.
                            </p>
                            <Button onClick={onBuy} variant="amazon" className="w-full py-5 text-xl font-bold shadow-2xl hover:shadow-glow-yellow hover:-translate-y-1 transition-all animate-pulse-ring">
                                Comprar en Amazon
                            </Button>
                            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest opacity-70">
                                ✓ Garantía de Satisfacción 100%
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-xl animate-in fade-in duration-500">
            {/* Sound Toggle */}
            <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors z-50 p-3 hover:bg-white/10 rounded-full"
                title={soundEnabled ? "Silenciar" : "Activar sonido"}
            >
                {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>

            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-3 hover:bg-white/10 rounded-full group">
                <X size={32} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Ambient Glow Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#EC008C]/20 via-[#00AEEF]/10 to-[#F7941D]/20 rounded-full blur-[150px] animate-pulse opacity-50"></div>
            </div>

            {/* 3D Scene Container */}
            <div
                ref={bookRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="book-stage relative w-full max-w-md md:max-w-4xl aspect-[3/4.5] md:aspect-[1.6/1] flex items-center justify-center perspective-[2000px] transition-transform duration-200"
                style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d'
                }}
            >

                {/* Book Container with 3D shadow */}
                <div className="relative w-full h-full flex shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),0_0_100px_-30px_rgba(236,0,140,0.3)] rounded-r-lg md:rounded-lg transition-shadow duration-300 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6),0_0_120px_-30px_rgba(0,174,239,0.4)]">
                    {/* Left Page (Desktop only - Ready for double-sided content) */}
                    <div className="hidden md:block relative w-1/2 h-full bg-[#f2f0ea] rounded-l-lg border-r border-gray-300 z-0 transform-style-3d origin-right overflow-hidden">
                        {/* Placeholder for future left-page image */}
                        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-multiply transition-all duration-300" style={{ backgroundImage: `url(${IMAGES.cover})` }}></div>

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/10 to-transparent pointer-events-none mix-blend-multiply"></div>
                    </div>

                    {/* Right Page (Active Page) */}
                    <div className="relative w-full md:w-1/2 h-full bg-white rounded-r-lg overflow-hidden transform-style-3d bg-[#fdfbf7]">
                        {/* Page Content */}
                        <div className={`w-full h-full transition-opacity duration-300 ${isFlipping ? 'opacity-0' : 'opacity-100'}`}>
                            <PageContent index={page} />
                        </div>

                        {/* Turning Page Animation with Curl Effect */}
                        {isFlipping && (
                            <div className="absolute inset-0 z-50 pointer-events-none perspective-origin-left">
                                <div
                                    className={`absolute inset-0 bg-[#fdfbf7] shadow-2xl origin-left transition-transform duration-[600ms] ease-in-out border-l border-gray-200
                                    ${flipDirection === 'next' ? 'animate-[pageTurnNext_0.6s_forwards]' : 'animate-[pageTurnPrev_0.6s_forwards]'}`}
                                    style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                                >
                                    <div className="absolute inset-0 w-full h-full page-sheen opacity-40"></div>
                                    {/* Page curl shadow */}
                                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/20 to-transparent"></div>
                                    {/* Back of the turning page (simple texture) */}
                                    <div className="absolute inset-0 bg-[#f2f0ea] transform rotate-y-180 backface-hidden flex items-center justify-center opacity-10">
                                        <span className="font-serif italic text-gray-300 text-4xl">Método Activa</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Binding Shadow */}
                        <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none mix-blend-multiply rounded-l-sm"></div>
                    </div>
                </div>

                {/* Floating Controls */}
                <div className="absolute -bottom-24 left-0 w-full flex justify-center gap-12 items-center z-50">
                    <button
                        onClick={handlePrev}
                        disabled={page === 0}
                        className="p-5 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-blue backdrop-blur-md transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl hover:scale-110 active:scale-95 group"
                    >
                        <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <div className="flex flex-col items-center gap-1">
                        <div className="text-white font-display text-2xl tracking-widest drop-shadow-md">
                            {page === 0 ? 'PORTADA' : `PÁGINA ${page}`}
                        </div>
                        <div className="flex gap-2">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === page ? 'w-8 bg-brand-blue' : 'w-2 bg-white/20'}`}></div>
                            ))}
                        </div>
                        <div className="text-white/40 text-xs mt-2">← → usa flechas del teclado</div>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={page === 3}
                        className="p-5 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-pink backdrop-blur-md transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl hover:scale-110 active:scale-95 group"
                    >
                        <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookReader;
