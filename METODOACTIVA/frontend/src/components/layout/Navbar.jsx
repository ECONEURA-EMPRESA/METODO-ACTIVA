import React, { useState, useEffect } from 'react';
import { Brain, MessageCircle, ShoppingCart, Menu } from 'lucide-react';
import { CONTENT } from '../../constants/content';

const Navbar = ({ scrollTo, openChat, openAmazon, toggleMenu }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-ultra py-3' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Brand Logo */}
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('hero')} aria-label="Ir al inicio">
                    <div className="relative isolate">
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-[#EC008C] via-[#00AEEF] to-[#F7941D] blur-[3px] opacity-80 animate-pulse"></div>
                        <div className="relative">
                            <img src="/logo.jpg" alt="Método Activa Logo" className="relative w-10 h-10 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.2)] ring-1 ring-white/80 ring-offset-0 ring-offset-transparent transition-transform duration-500 hover:rotate-6 hover:scale-105" width="40" height="40" />
                            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/40 pointer-events-none"></div>
                        </div>
                    </div>
                    <span className="text-lg font-black tracking-tight text-gray-900 drop-shadow-sm group-hover:bg-gradient-to-r group-hover:from-[#EC008C] group-hover:to-[#00AEEF] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {CONTENT.navbar.brand}
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 font-medium text-gray-600 text-sm">
                    <button onClick={() => scrollTo('autor')} className="hover:text-[#EC008C] transition-colors" aria-label="Conocer al autor">{CONTENT.navbar.links.about}</button>
                    <button onClick={() => scrollTo('recursos')} className="hover:text-[#00AEEF] transition-colors flex items-center gap-1" aria-label="Ver recursos"><Brain size={16} /> {CONTENT.navbar.links.resources}</button>
                    <button onClick={openChat} className="hover:text-[#F7941D] transition-colors flex items-center gap-1 text-gray-600 font-bold" aria-label="Abrir chat de soporte"><MessageCircle size={14} /> {CONTENT.navbar.links.support}</button>
                    <button onClick={() => scrollTo('reviews')} className="hover:text-[#B5006C] transition-colors" aria-label="Ver reseñas">{CONTENT.navbar.links.reviews}</button>
                    <button onClick={openAmazon} className="bg-[#FF9900] hover:bg-[#ffad33] text-white px-6 py-2 rounded-md font-bold text-sm flex items-center gap-2 shadow-sm transition-colors" aria-label="Comprar en Amazon"><ShoppingCart size={16} /> {CONTENT.navbar.cta}</button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-gray-800 p-2" onClick={toggleMenu} aria-label="Abrir menú de navegación">
                    <Menu />
                </button>
            </div>
        </nav>
    );
};

export default React.memo(Navbar);
