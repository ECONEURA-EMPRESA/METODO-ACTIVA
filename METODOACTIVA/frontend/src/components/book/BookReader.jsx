import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import Button from '../ui/Button';
import { IMAGES } from '../../constants/images';

const BookReader = ({ onClose, onBuy }) => {
    const [page, setPage] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [flipDirection, setFlipDirection] = useState('next');
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const bookRef = useRef(null);
    const touchStartX = useRef(null);
    const totalPages = 4;

    // 3D Tilt effect on mouse move - OPTIMIZED with requestAnimationFrame
    const handleMouseMove = (e) => {
        if (!bookRef.current) return;

        // Simple throttling using rAF
        requestAnimationFrame(() => {
            const rect = bookRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            // Reduced tilt intensity for more "heavy/solid" feel
            setTilt({ x: y * 5, y: -x * 5 });
        });
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
                    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-r-sm group cursor-pointer perspective-[1000px]" onClick={handleNext}>
                        {/* 3D Hardcover Thickness (Right Edge) */}
                        <div className="absolute top-1 bottom-1 -right-2 w-2 bg-[#ddd] transform rotate-y-90 origin-left border-l border-gray-300">
                            <div className="w-full h-full bg-gradient-to-b from-gray-200 via-white to-gray-200 opacity-50"></div>
                        </div>

                        {/* Cover Image */}
                        <img
                            src={IMAGES.cover}
                            alt="Portada Método Activa"
                            className="w-full h-full object-cover rounded-r-md shadow-2xl relative z-10"
                        />

                        {/* Gold Foil / Premium Sheen Effect */}
                        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-soft-light animate-shimmer"></div>

                        {/* Texture Overlay */}
                        <div className="absolute inset-0 z-20 opacity-[0.15] mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>

                        {/* Spine Depth Shadow (Left) */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent pointer-events-none mix-blend-multiply z-30"></div>

                        {/* Click hint */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-8 py-3 rounded-full text-brand-dark/80 font-bold uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_10px_20px_rgba(0,0,0,0.2)] translate-y-4 group-hover:translate-y-0 z-40 border border-white/50">
                            Abrir Manual
                        </div>
                    </div>
                );
            case 1: // INTRO
                return (
                    <div className="w-full h-full bg-[#fcfbf9] text-gray-800 p-8 md:p-12 font-serif relative overflow-hidden">
                        {/* Texture */}
                        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                        <div className="relative z-10 h-full overflow-y-auto pr-2 custom-scrollbar">
                            <div className="border-b-2 border-brand-pink/20 pb-4 mb-6">
                                <span className="text-xs font-sans font-bold text-brand-pink uppercase tracking-[0.2em]">Capítulo 1</span>
                            </div>
                            <h2 className="font-display text-4xl mb-8 text-gray-900 leading-tight">La Verdad Oculta</h2>

                            <div className="prose prose-lg text-gray-700 leading-relaxed font-serif">
                                <p className="first-letter:text-6xl first-letter:font-black first-letter:text-gray-900 first-letter:float-left first-letter:mr-4 first-letter:mt-[-6px]">
                                    Te han mentido durante años. Te han dicho que el arte es un adorno...
                                </p>
                                <p>
                                    Pero la neurociencia moderna confirma lo que los antiguos sabían: <strong className="text-brand-blue bg-brand-blue/5 px-1">tu cerebro muere de hambre estética.</strong>
                                </p>
                                <div className="my-10 pl-6 border-l-4 border-brand-pink italic text-xl text-gray-600 font-medium bg-gradient-to-r from-brand-pink/5 to-transparent py-6 pr-4 rounded-r-lg">
                                    "No es un colapso repentino. Es un apagón lento y silencioso de tu sistema nervioso."
                                </div>
                                <p>
                                    Vivimos en la era de la desconexión. Tienes mil mensajes sin leer, notificaciones constantes, pero no recuerdas el ritmo de tu propio pulso.
                                </p>
                            </div>
                            <div className="mt-12 text-center pb-8">
                                <span className="text-xs font-serif text-gray-400 italic">- 1 -</span>
                            </div>
                        </div>
                    </div>
                );
            case 2: // SCIENCE
                return (
                    <div className="w-full h-full bg-[#fcfbf9] text-gray-800 p-8 md:p-12 font-serif relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                        <div className="relative z-10 h-full overflow-y-auto pr-2 custom-scrollbar">
                            <h2 className="font-display text-3xl mb-8 text-brand-blue leading-tight border-b border-brand-blue/10 pb-4">El Diagnóstico Clínico</h2>
                            <div className="space-y-8">
                                <p className="text-lg leading-relaxed text-gray-700">
                                    Tu cuerpo funciona como una orquesta desafinada. Necesitas sincronizar los tres pisos de tu biología:
                                </p>
                                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-8 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] space-y-6">
                                    <div className="flex gap-5 items-center group">
                                        <span className="w-12 h-12 rounded-full bg-brand-yellow text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-brand-yellow/30 shrink-0 group-hover:scale-110 transition-transform">1</span>
                                        <div>
                                            <strong className="block text-gray-900 text-lg mb-1 tracking-tight">Cuerpo</strong>
                                            <span className="text-gray-600 font-sans text-sm">Necesita ritmo constante para regular el cortisol.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 items-center group">
                                        <span className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-brand-blue/30 shrink-0 group-hover:scale-110 transition-transform">2</span>
                                        <div>
                                            <strong className="block text-gray-900 text-lg mb-1 tracking-tight">Mente</strong>
                                            <span className="text-gray-600 font-sans text-sm">Necesita estructura estética para claridad.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-5 items-center group">
                                        <span className="w-12 h-12 rounded-full bg-brand-pink text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-brand-pink/30 shrink-0 group-hover:scale-110 transition-transform">3</span>
                                        <div>
                                            <strong className="block text-gray-900 text-lg mb-1 tracking-tight">Corazón</strong>
                                            <span className="text-gray-600 font-sans text-sm">Necesita belleza para sanar emociones.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 text-center pb-8">
                                <span className="text-xs font-serif text-gray-400 italic">- 2 -</span>
                            </div>
                        </div>
                    </div>
                );
            case 3: // BACK COVER / CTA
                return (
                    <div className="w-full h-full bg-white flex flex-col items-center justify-center p-10 text-center relative border-l border-gray-100 overflow-hidden">
                        {/* Background Luxury Gradients */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none"></div>

                        <div className="relative z-10 max-w-sm w-full animate-in slide-in-from-bottom duration-1000 fade-in">
                            <div className="w-24 h-24 bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-blue/30 transform hover:rotate-6 transition-transform duration-500">
                                <ShoppingCart size={40} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-4xl font-display font-black text-gray-900 mb-4 tracking-tight leading-tight">¿Listo para<br />sanar?</h3>
                            <p className="text-gray-500 mb-10 text-lg leading-relaxed font-medium">
                                Has leído solo el 1%.<br />Accede al protocolo clínico completo.
                            </p>
                            <Button onClick={onBuy} variant="amazon" className="w-full py-6 text-xl font-bold shadow-[0_20px_40px_-10px_rgba(255,153,0,0.5)] hover:shadow-[0_25px_50px_-10px_rgba(255,153,0,0.6)] hover:-translate-y-1 transition-all">
                                Comprar en Amazon
                            </Button>
                            <div className="mt-8 flex flex-col gap-2 items-center justify-center text-xs text-gray-400 font-bold uppercase tracking-widest opacity-80">
                                <span>✓ Envío Rápido</span>
                                <span>✓ Garantía Total</span>
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/95 backdrop-blur-xl animate-in fade-in duration-500">
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-4 hover:bg-white/10 rounded-full group">
                <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>

            {/* Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-brand-pink/20 via-brand-blue/10 to-transparent rounded-full blur-[120px] opacity-40"></div>
            </div>

            {/* 3D Scene Container */}
            <div
                ref={bookRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="book-stage relative w-full md:max-w-5xl md:aspect-[1.6/1] max-w-sm aspect-[3/4.5] flex items-center justify-center perspective-[2500px] transition-transform duration-300 ease-out"
                style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Book Shadow Base */}
                <div className="absolute top-[10%] left-[5%] right-[5%] bottom-[5%] bg-black/40 blur-[50px] transform translate-y-12 rotate-x-60 scale-90 pointer-events-none"></div>

                {/* Book Container */}
                <div className="relative w-full h-full flex rounded-lg shadow-2xl transition-all duration-300">

                    {/* Left Page (Desktop only - Static Backing) */}
                    <div className="hidden md:block relative w-1/2 h-full bg-[#f4f1ea] rounded-l-md border-r border-[#e0dad0] overflow-hidden shadow-[inset_-10px_0_20px_rgba(0,0,0,0.1)]">
                        {/* Realistic Gutter Shadow */}
                        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none mix-blend-multiply"></div>
                        {/* Paper Texture */}
                        <div className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23554433' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>
                        {/* Stacked Pages Effect (Left Edge) */}
                        <div className="absolute left-0 top-1 bottom-1 w-1 bg-gradient-to-r from-[#ddd] to-[#fff] border-r border-gray-300"></div>
                    </div>

                    {/* Right Page (Active) */}
                    <div className="relative w-full md:w-1/2 h-full bg-white rounded-r-lg md:rounded-l-none rounded-l-lg overflow-hidden transform-style-3d origin-left">
                        {/* Page Content */}
                        <div className={`w-full h-full transition-opacity duration-300 ${isFlipping ? 'opacity-0' : 'opacity-100'}`}>
                            <PageContent index={page} />
                        </div>

                        {/* Middle Spine Shadow Overlay - Realistic Depth */}
                        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none mix-blend-multiply z-20"></div>

                        {/* Stacked Pages Effect (Right Edge) */}
                        <div className="absolute right-0 top-1 bottom-1 w-1.5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiLz48L3N2Zz4=')] opacity-50 z-20 border-l border-gray-200"></div>

                        {/* Turning Page Animation */}
                        {isFlipping && (
                            <div className="absolute inset-0 z-50 pointer-events-none perspective-origin-left">
                                <div
                                    className={`absolute inset-0 bg-[#fdfbf7] shadow-2xl origin-left transition-transform duration-[600ms] ease-in-out border-l border-gray-200
                                    ${flipDirection === 'next' ? 'animate-[pageTurnNext_0.6s_forwards]' : 'animate-[pageTurnPrev_0.6s_forwards]'}`}
                                    style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                                >
                                    <div className="absolute inset-0 w-full h-full page-sheen opacity-10"></div>
                                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent"></div>

                                    {/* Back of page */}
                                    <div className="absolute inset-0 bg-[#eee] transform rotate-y-180 backface-hidden flex items-center justify-center">
                                        <div className="w-full h-full bg-gradient-to-r from-transparent to-black/5"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating Controls */}
                <div className="absolute -bottom-24 md:-bottom-24 -bottom-20 left-0 w-full flex justify-center gap-8 md:gap-12 items-center z-50 pointer-events-none">
                    <button
                        onClick={handlePrev}
                        disabled={page === 0}
                        className="pointer-events-auto p-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-blue backdrop-blur-md transition-all disabled:opacity-0 disabled:cursor-not-allowed shadow-2xl hover:scale-110 active:scale-95 group"
                    >
                        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <div className="flex flex-col items-center gap-2 pointer-events-auto">
                        <div className="flex gap-3">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i} className={`h-1 rounded-full transition-all duration-500 shadow-sm ${i === page ? 'w-10 bg-white shadow-glow' : 'w-2 bg-white/20'}`}></div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={page === 3}
                        className="pointer-events-auto p-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-pink backdrop-blur-md transition-all disabled:opacity-0 disabled:cursor-not-allowed shadow-2xl hover:scale-110 active:scale-95 group"
                    >
                        <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookReader;
