import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';

import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import AuroraCursor from './components/ui/AuroraCursor';
import SalesNotification from './components/ui/SalesNotification';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import { triggerConfetti } from './utils/confetti';
import { LeadMagnetModal } from './components/ui/Cards';

// Hooks (Refactored)
import { useCookieConsent } from './hooks/useCookieConsent';
import { useLeadMagnet } from './hooks/useLeadMagnet';

// Extracted Sections (Lazy Loaded for Performance)
import Hero from './components/sections/Hero'; // Hero is critical, keep synchronous
const Benefits = lazy(() => import('./components/sections/Benefits'));
const Resources = lazy(() => import('./components/sections/Resources'));
const Reviews = lazy(() => import('./components/sections/Reviews'));
const Author = lazy(() => import('./components/sections/Author'));
const Footer = lazy(() => import('./components/sections/Footer')); // Even footer can be lazy

// Lazy Load Heavy Components
const BookReader = lazy(() => import('./components/book/BookReader'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const ArtGallery = lazy(() => import('./components/gallery/ArtGallery'));
import CustomerSupportChat from './components/chat/CustomerSupportChat';

// Loading Fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 text-[#EC008C] animate-spin" />
  </div>
);

import ScrollProgressBar from './components/ui/ScrollProgressBar';
import PremiumLoader from './components/ui/PremiumLoader';
import ScrollToTop from './components/ui/ScrollToTop';

function App() {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // scrolled state removed for performance
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);

  // 🪝 Custom Hooks (Clean Code)
  const { showCookieBanner, acceptCookies, declineCookies } = useCookieConsent();
  const {
    showLeadModal,
    setShowLeadModal,
    showContentModal,
    setShowContentModal,
    hasRegistered,
    handleAccessRequest,
    handleLeadSuccess
  } = useLeadMagnet();

  useEffect(() => {
    // ⏳ Premium Loading Delay (3 Seconds)
    // "Ganar segundos" design pattern as requested
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll listener removed from main App tree for performance

  if (loading) {
    return <PremiumLoader />;
  }

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openAmazon = () => {
    triggerConfetti();
    window.open("https://www.amazon.es", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#EC008C] selection:text-white pb-20 md:pb-0">

      {/* Floating Sales Assistant */}
      <CustomerSupportChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* 1. Influence UI (Social Proof) */}
      <SalesNotification />

      {/* 6. WhatsApp VIP */}
      <FloatingWhatsApp />

      {/* Scroll Progress Bar (Optimized) */}
      <ScrollProgressBar />

      <AuroraCursor />
      <Navbar
        scrollTo={scrollTo}
        openChat={openChat}
        openAmazon={openAmazon}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        scrollTo={scrollTo}
        openChat={openChat}
        openAmazon={openAmazon}
      />

      <Hero
        onOpenAmazon={openAmazon}
        onAccessRequest={handleAccessRequest}
        hasRegistered={hasRegistered}
      />

      <Benefits />

      <Resources onAccessRequest={handleAccessRequest} />

      {/* Premium Art Gallery */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center bg-gray-50"><Loader2 className="w-8 h-8 text-[#EC008C] animate-spin" /></div>}>
        <ArtGallery />
      </Suspense>

      <Reviews onOpenAmazon={openAmazon} />

      <Author />

      {/* Upsell Banner (Before Footer) */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-200 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900">Descubre el Arte como medicina para tu Salud y Bienestar.</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Más allá de la estética, el arte es una necesidad biológica. Activa los mecanismos naturales de sanación de tu cuerpo y recupera tu equilibrio vital hoy mismo.</p>
          <button onClick={openAmazon} className="text-xl px-16 py-6 shadow-2xl animate-pulse hover:animate-none bg-gradient-to-r from-[#F7941D] to-[#EC008C] text-white font-bold rounded-full transition-all transform hover:-translate-y-1">Ver Oferta en Amazon</button>
          <div className="mt-8 flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all"><span className="font-bold text-xl text-gray-400">amazon</span><span className="font-bold text-xl text-gray-400">kindle</span><span className="font-bold text-xl text-gray-400">Audible</span></div>
        </div>
      </div>

      <Footer onOpenAdmin={setIsAdminOpen} />

      {/* Cookie Banner (Polished & Trust) - Managed by Hook */}
      {
        showCookieBanner && (
          <div id="cookie-banner" className="fixed bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-96 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-2xl p-6 z-50 animate-slide-up-fade">
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full"><ShieldCheck size={20} className="text-gray-600" /></div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Tu privacidad importa</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Utilizamos cookies para mejorar tu experiencia y medir el rendimiento. Al seguir navegando, aceptas su uso.
                </p>
                <div className="flex gap-2">
                  <button onClick={declineCookies} className="flex-1 py-2 text-xs font-semibold text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">Rechazar</button>
                  <button onClick={acceptCookies} className="flex-1 py-2 text-xs font-bold text-white bg-gray-900 rounded-lg hover:bg-black transition-colors shadow-md">Aceptar Todo</button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Sticky Mobile Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 md:hidden z-50 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] flex items-center justify-between pb-safe">
        <div><p className="text-xs text-gray-500 line-through">24.99€</p><p className="font-bold text-gray-900 text-lg flex items-center gap-1">19.95€ <span className="text-xs font-normal text-green-600 bg-green-50 px-1 rounded">-20%</span></p></div>
        <button onClick={openAmazon} className="px-6 py-2 text-sm shadow-none bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors">Comprar en Amazon</button>
      </div>

      <LeadMagnetModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} onSuccess={handleLeadSuccess} />
      <Suspense fallback={<LoadingSpinner />}>
        {showContentModal && <BookReader onClose={() => setShowContentModal(false)} onBuy={openAmazon} />}
        <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </Suspense>

      {/* New Optimized ScrollToTop */}
      <ScrollToTop />
    </div >
  );
}

export default App;
