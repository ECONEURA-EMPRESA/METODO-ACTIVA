import React from 'react';
import Section from '../ui/Section';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Author = () => {
    const { ref, isVisible } = useScrollReveal(0.2);

    return (
        <Section id="autor" className="bg-white rounded-[3rem] my-8 mx-4 md:mx-8 shadow-xl border border-white/50 relative z-20">
            <div className="container mx-auto px-6 py-12">
                <div ref={ref} className={`glass-panel max-w-5xl mx-auto rounded-3xl p-10 md:p-14 text-gray-900 flex flex-col md:flex-row items-center gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 relative overflow-hidden group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#EC008C]/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity"></div>
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-white flex-shrink-0 overflow-hidden border-[6px] border-white shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500">
                        <img src="/aurora.webp" alt="Aurora Del Río" className="w-full h-full object-cover object-center" style={{ objectPosition: 'center 30%' }} />
                    </div>
                    <div className="text-center md:text-left relative z-10">
                        <h3 className="text-4xl md:text-5xl font-black mb-2 text-gray-900 tracking-tight drop-shadow-sm">Aurora Del Río</h3>
                        <p className="text-[#EC008C] text-xl font-bold uppercase tracking-widest mb-2">Creadora del Método Activa</p>
                        <p className="text-[#00AEEF] text-sm font-black tracking-[0.3em] mb-8 bg-white/50 inline-block px-4 py-1 rounded-full backdrop-blur-sm shadow-sm">SALUD Y BIENESTAR</p>
                        <p className="text-gray-600 leading-loose mb-0 text-lg font-medium max-w-2xl">
                            Aurora Del Río cuenta con más de 20 años de dedicación a la música y un Máster Europeo de Musicoterapia con calificación de sobresaliente. Junto a su equipo, aplica este conocimiento científico para transformar la salud a través del Método Activa.
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Author;
