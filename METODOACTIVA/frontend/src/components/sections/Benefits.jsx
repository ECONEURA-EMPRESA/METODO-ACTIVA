import React from 'react';
import Section from '../ui/Section';
import { BenefitRow } from '../ui/Cards';
import { CONTENT } from '../../constants/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Benefits = () => {
    const { ref, isVisible } = useScrollReveal(0.1);

    return (
        <Section id="beneficios" className="bg-white rounded-[3rem] my-8 mx-4 md:mx-8 shadow-xl border border-white/50 relative z-20">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <p className="text-gray-600 max-w-2xl mx-auto">{CONTENT.benefits.subtitle}</p>
                </div>


                {/* 3-Column Layout: Seniors - Image - Kids */}
                <div ref={ref} className={`grid lg:grid-cols-3 gap-8 items-start transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Seniors Column (Left) */}
                    <div className="space-y-8">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-brand-pink">Para Mayores</h3>
                            <p className="text-gray-500 text-sm">Recupera la conexión y la memoria</p>
                        </div>
                        <div className="space-y-6">
                            {CONTENT.benefits.cards.slice(0, 2).map((card, idx) => (
                                <div key={idx} className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
                                    <BenefitRow category="heart" icon={card.icon} title={card.title} desc={card.desc} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Central Image Column */}
                    <div className="order-first lg:order-none mb-12 lg:mb-0 flex flex-col justify-center h-full">
                        <div className="relative w-full aspect-[3/4] max-w-sm mx-auto animate-breathe">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#EC008C] to-[#00AEEF] rounded-full blur-[80px] opacity-30 animate-pulse"></div>
                            <img
                                src="/connection-art.webp"
                                alt="Arte de Conexión"
                                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Kids Column (Right) */}
                    <div className="space-y-8">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-brand-blue">Para Niños</h3>
                            <p className="text-gray-500 text-sm">Calma y Vínculo Emocional</p>
                        </div>
                        <div className="space-y-6">
                            {CONTENT.benefits.cards.slice(2, 4).map((card, idx) => (
                                <div key={idx} className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
                                    <BenefitRow category="mind" icon={card.icon} title={card.title} desc={card.desc} />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    );
};

export default Benefits;
