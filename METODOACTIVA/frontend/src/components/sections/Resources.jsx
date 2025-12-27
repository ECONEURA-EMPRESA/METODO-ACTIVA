import React from 'react';
import { Download } from 'lucide-react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { BenefitRow } from '../ui/Cards';
import { CONTENT } from '../../constants/content';

const Resources = ({ onAccessRequest }) => {
    return (
        <Section id="recursos" className="bg-white rounded-[3rem] my-8 mx-4 md:mx-8 shadow-xl border border-white/50 relative z-20 optimize-visibility">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">{CONTENT.resources.title}</h2><p className="text-gray-500 max-w-2xl mx-auto mb-8">{CONTENT.resources.subtitle}</p><Button onClick={onAccessRequest} className="mx-auto group" variant="primary"><Download size={20} className="group-hover:animate-bounce" /> {CONTENT.resources.cta_download}</Button></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-8">
                        {CONTENT.resources.items.slice(0, 2).map((item, idx) => (
                            <BenefitRow key={idx} category={item.category} icon={item.icon} title={item.title} desc={item.desc} />
                        ))}
                    </div>
                    <div className="hidden lg:flex items-center justify-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="text-center">
                            <div className="flex justify-center -space-x-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD200] to-[#F7941D] opacity-80 ring-4 ring-white"></div>
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2DD6F5] to-[#00AEEF] opacity-80 ring-4 ring-white"></div>
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EC008C] to-[#B5006C] opacity-80 ring-4 ring-white"></div>
                            </div>
                            <p className="font-bold text-gray-900 text-lg">Kit de Herramientas<br />Tríada Maestra</p>
                            <button onClick={onAccessRequest} className="mt-4 text-[#00AEEF] text-sm font-bold hover:underline">Descargar Demo</button>
                        </div>
                    </div>
                    <div className="space-y-8">
                        {CONTENT.resources.items.slice(2, 4).map((item, idx) => (
                            <BenefitRow key={idx + 2} category={item.category} icon={item.icon} title={item.title} desc={item.desc} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Resources;
