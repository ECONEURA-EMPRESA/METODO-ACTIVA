import React, { useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CONTENT } from '../../constants/content';

const MobileMenu = ({ isOpen, onClose, scrollTo, openChat, openAmazon }) => {
    // PWA Install Logic
    useEffect(() => {
        if (!isOpen) return;

        let deferredPrompt;
        const handleInstallPrompt = (e) => {
            e.preventDefault();
            deferredPrompt = e;
            const installContainer = document.getElementById('pwa-install-container');
            const installBtn = document.getElementById('pwa-install-btn');

            if (installContainer && installBtn) {
                installContainer.classList.remove('hidden');
                installBtn.addEventListener('click', () => {
                    installContainer.classList.add('hidden');
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult) => {
                        // Choice logged
                        deferredPrompt = null;
                    });
                });
            }
        };

        window.addEventListener('beforeinstallprompt', handleInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 space-y-6 md:hidden animate-in slide-in-from-right duration-300">
            <button onClick={() => scrollTo('autor')} className="block w-full text-left py-4 text-xl font-bold border-b border-gray-100 text-gray-800 hover:text-[#EC008C] transition-colors">{CONTENT.navbar.links.about}</button>
            <button onClick={() => scrollTo('recursos')} className="block w-full text-left py-4 text-xl font-bold border-b border-gray-100 text-gray-800 hover:text-[#00AEEF] transition-colors">{CONTENT.navbar.links.resources}</button>
            <button onClick={() => { onClose(); openChat(); }} className="block w-full text-left py-4 text-xl font-bold border-b border-gray-100 text-gray-800 hover:text-[#F7941D] transition-colors">{CONTENT.navbar.links.support}</button>

            {/* Install App Button (PWA) */}
            <div id="pwa-install-container" className="hidden">
                <button id="pwa-install-btn" className="block w-full text-center bg-gray-100 text-gray-600 py-3 rounded-xl font-bold text-sm mb-2 hover:bg-gray-200 transition-colors">
                    📲 Instalar App
                </button>
            </div>

            <button onClick={openAmazon} className="block w-full text-center bg-gradient-to-r from-[#FF9900] to-[#FFB800] text-white py-4 rounded-xl font-black text-lg shadow-lg mt-4 active:scale-95 transition-transform">
                <ShoppingCart className="inline-block mr-2" size={20} />
                {CONTENT.navbar.cta}
            </button>
        </div>
    );
};

export default MobileMenu;
