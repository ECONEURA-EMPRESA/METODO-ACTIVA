import React from 'react';
import { Instagram, Facebook, Youtube, Phone } from 'lucide-react';
import { CONTENT } from '../../constants/content';

const Footer = ({ onOpenAdmin }) => {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-6">
                {/* Social Media Icons with NEW Animation and Styles */}
                <div className="flex justify-center gap-6 mb-8">
                    <a href="https://instagram.com/metodoactiva" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center hover:scale-110 transition-transform shadow-lg group" aria-label="Instagram">
                        <Instagram className="text-white group-hover:scale-110 transition-transform" size={24} />
                    </a>
                    <a href="https://facebook.com/metodoactiva" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform shadow-lg" aria-label="Facebook">
                        <Facebook className="text-white" size={24} />
                    </a>
                    {/* WhatsApp with Wiggle Animation */}
                    <a href="https://wa.me/34643882154" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform shadow-lg animate-[wiggle_4s_ease-in-out_infinite]" aria-label="WhatsApp">
                        <Phone className="text-white" size={24} />
                    </a>
                    <a href="https://youtube.com/@metodoactiva" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center hover:scale-110 transition-transform shadow-lg" aria-label="YouTube">
                        <Youtube className="text-white" size={24} />
                    </a>
                </div>

                <div className="text-center text-gray-400 text-sm mb-6">
                    <p className="mb-4 font-bold text-white tracking-widest">{CONTENT.footer.copyright}</p>
                    <div className="flex justify-center gap-6 flex-wrap">
                        <a href="/legal" className="hover:text-[#00AEEF] transition-colors">{CONTENT.footer.links.privacy}</a>
                        <a href="/privacidad" className="hover:text-[#00AEEF] transition-colors">{CONTENT.footer.links.terms}</a>
                        <a href="mailto:info@metodoactiva.es" className="hover:text-[#00AEEF] transition-colors">{CONTENT.footer.links.contact || "Contacto"}</a>
                    </div>
                </div>
                <div className="text-center">
                    <button
                        onClick={(e) => e.detail === 3 && onOpenAdmin(true)}
                        className="text-gray-800 text-xs hover:text-gray-700 transition-colors cursor-default"
                        aria-label="Acceso Administración"
                    >
                        Aurora Admin
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);
