import React from 'react';
import {
    BookOpen, Lock, ShieldCheck, Check, Truck, Star, Users, Music, Heart, Activity
} from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import Button from '../ui/Button';
import { CONTENT } from '../../constants/content';

const Hero = ({ onOpenAmazon, onAccessRequest, hasRegistered }) => {

    return (
        <div id="hero" className="relative pt-12 pb-24 bg-mesh-premium overflow-hidden rounded-b-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EC008C] rounded-full blur-[180px] opacity-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2DD6F5] rounded-full blur-[180px] opacity-10 pointer-events-none"></div>

            {/* Floating Particles (Removed for Speed) */}
            {/* <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"></div> */}

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-white border border-gray-100 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] mb-8 transition-transform hover:scale-105 cursor-default ring-1 ring-gray-50 max-w-full">
                            <span className="flex-shrink-0 flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EC008C] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EC008C]"></span>
                            </span>
                            <span className="text-xs md:text-sm font-bold tracking-wide text-gray-600 whitespace-normal text-left">{CONTENT.hero.badge.prefix} <span className="text-[#00AEEF]">{CONTENT.hero.badge.highlight1}</span> {CONTENT.hero.badge.middle} <span className="text-[#B5006C]">{CONTENT.hero.badge.highlight2}</span></span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6 text-gray-900">{CONTENT.hero.title.part1} <br /><span className="shimmer-yellow">{CONTENT.hero.title.gradient1}</span>, <span className="shimmer-blue">{CONTENT.hero.title.gradient2}</span> Y <span className="shimmer-pink">{CONTENT.hero.title.gradient3}</span> {CONTENT.hero.title.suffix}</h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0" dangerouslySetInnerHTML={{ __html: CONTENT.hero.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button onClick={onOpenAmazon} className="text-lg px-10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all animate-heartbeat bg-gradient-to-r from-[#F7941D] to-[#EC008C] bg-[length:200%_auto] hover:bg-[position:right_center] transition-[background-position] duration-500" variant="amazon">{CONTENT.hero.cta_primary}</Button>
                            <Button variant="secondary" onClick={onAccessRequest} className="hover:border-[#00AEEF] transition-colors">{hasRegistered ? <BookOpen size={20} /> : <Lock size={20} />} {CONTENT.hero.cta_secondary}</Button>
                        </div>

                        {/* Enhanced Social Proof */}
                        <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm">
                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                                <Star size={18} className="text-[#FF9900] fill-[#FF9900]" />
                                <span className="font-bold text-gray-900">4.9/5</span>
                                <span className="text-gray-400">(+500 valoraciones)</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                                <Users size={18} className="text-[#00AEEF]" />
                                <span className="text-gray-600"><strong className="text-gray-900">2,847</strong> lectores este mes</span>
                            </div>
                            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                                <Truck size={18} className="text-green-600" />
                                <span className="text-green-700 font-medium">Envío GRATIS con Prime</span>
                            </div>
                        </div>

                        {/* Urgency Banner */}
                        <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-sm">
                            <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full font-bold text-xs animate-pulse">
                                🔥 OFERTA LIMITADA: -20% solo hoy
                            </span>
                        </div>
                        <div className="mt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-400">
                            <div className="flex items-center gap-1"><ShieldCheck size={14} /> Pago Seguro</div>
                            <div className="flex items-center gap-1"><Check size={14} /> Devolución Garantizada</div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative perspective-[2000px]">
                        <div className="relative mx-auto w-full max-w-xl group">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-[#F7941D] via-[#EC008C] to-[#00AEEF] rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                            <div className="relative z-10 rounded-2xl shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer" onClick={onOpenAmazon}>
                                <div className="relative z-10 rounded-3xl shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer border-[6px] border-white/40 transition-all duration-500" onClick={onOpenAmazon} style={{ opacity: 1, visibility: 'visible' }}>
                                    <img
                                        src="/hero_real.jpg?v=999"
                                        alt="Método Activa - Experiencia Visual"
                                        className="w-full h-auto object-cover"
                                        width="600"
                                        height="800"
                                        style={{ opacity: 1, visibility: 'visible' }}
                                    />
                                    {/* Premium Searchlight Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
