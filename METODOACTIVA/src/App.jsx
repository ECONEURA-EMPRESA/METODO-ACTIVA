import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  BookOpen, Heart, Brain, Activity, ArrowRight, Menu, X,
  ShoppingCart, Star, Check, ShieldCheck, Truck, Users,
  Loader2, MessageCircle, Send, Download, FileText, Music, Phone, Mail, Lock
} from 'lucide-react';

import Button from './components/ui/Button';
import Section from './components/ui/Section';
import FadeIn from './components/ui/FadeIn';
import { LeadMagnetModal, BenefitRow, AmazonReviewCard } from './components/ui/Cards';
import { IMAGES } from './constants/images';
import { CONTENT } from './constants/content';

// Lazy Load Heavy Components
const BookReader = lazy(() => import('./components/book/BookReader'));
const CustomerSupportChat = lazy(() => import('./components/chat/CustomerSupportChat'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const ArtGallery = lazy(() => import('./components/gallery/ArtGallery'));

// Loading Fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 text-[#EC008C] animate-spin" />
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          // Calculate scroll progress
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (window.scrollY / totalHeight) * 100;
          setScrollProgress(Math.min(progress, 100));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const openAmazon = () => { window.open("https://www.amazon.es", "_blank", "noopener,noreferrer"); };
  const handleAccessRequest = () => { if (hasRegistered) { setShowContentModal(true); } else { setShowLeadModal(true); } };
  const handleLeadSuccess = () => { setHasRegistered(true); setShowLeadModal(false); setShowContentModal(true); };

  return (
    <div className="font-sans text-gray-900 bg-gray-50 overflow-x-hidden selection:bg-[#2DD6F5] selection:text-[#B5006C]">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-gray-200/50">
        <div
          className="h-full bg-gradient-to-r from-[#EC008C] via-[#F7941D] to-[#00AEEF] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-4'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('hero')}>
            <div className="relative isolate">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-[#EC008C] via-[#00AEEF] to-[#F7941D] blur-[3px] opacity-80 animate-pulse"></div>
              <div className="relative">
                <img src="/logo.jpg" alt="Método Activa Logo" className="relative w-10 h-10 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.2)] ring-1 ring-white/80 ring-offset-0 ring-offset-transparent transition-transform duration-500 hover:rotate-6 hover:scale-105" width="40" height="40" />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/40 pointer-events-none"></div>
              </div>
            </div>
            <span className="text-lg font-black tracking-tight text-gray-900 drop-shadow-sm group-hover:bg-gradient-to-r group-hover:from-[#EC008C] group-hover:to-[#00AEEF] group-hover:bg-clip-text group-hover:text-transparent transition-all">
              MÉTODO ACTIVA
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-gray-600 text-sm">
            <button onClick={() => scrollTo('autor')} className="hover:text-[#EC008C] transition-colors">{CONTENT.navbar.links.about}</button>
            <button onClick={() => scrollTo('recursos')} className="hover:text-[#00AEEF] transition-colors flex items-center gap-1"><Brain size={16} /> {CONTENT.navbar.links.resources}</button>
            <button onClick={() => scrollTo('chat')} className="hover:text-[#F7941D] transition-colors flex items-center gap-1 text-gray-600 font-bold"><MessageCircle size={14} /> {CONTENT.navbar.links.support}</button>
            <button onClick={() => scrollTo('reviews')} className="hover:text-[#B5006C] transition-colors">{CONTENT.navbar.links.reviews}</button>
            <button onClick={openAmazon} className="bg-[#FF9900] hover:bg-[#ffad33] text-white px-6 py-2 rounded-md font-bold text-sm flex items-center gap-2 shadow-sm transition-colors"><ShoppingCart size={16} /> {CONTENT.navbar.cta}</button>
          </div>
          <button className="md:hidden text-gray-800 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu /></button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 space-y-4 md:hidden">
          <button onClick={() => scrollTo('autor')} className="block w-full text-left py-3 text-lg border-b border-gray-100">{CONTENT.navbar.links.about}</button>
          <button onClick={() => scrollTo('recursos')} className="block w-full text-left py-3 text-lg border-b border-gray-100">{CONTENT.navbar.links.resources}</button>
          <button onClick={() => scrollTo('chat')} className="block w-full text-left py-3 text-lg border-b border-gray-100">{CONTENT.navbar.links.support}</button>
          <button onClick={openAmazon} className="block w-full text-center bg-[#FF9900] text-white py-3 rounded-lg font-bold mt-4">{CONTENT.navbar.cta}</button>
        </div>
      )}

      <div id="hero" className="relative pt-12 pb-20 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EC008C] rounded-full blur-[180px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2DD6F5] rounded-full blur-[180px] opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left z-10">
              <FadeIn>
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-white border border-gray-100 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] mb-8 transition-transform hover:scale-105 cursor-default ring-1 ring-gray-50 max-w-full">
                  <span className="flex-shrink-0 flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EC008C] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EC008C]"></span>
                  </span>
                  <span className="text-xs md:text-sm font-bold tracking-wide text-gray-600 whitespace-normal text-left">{CONTENT.hero.badge.prefix} <span className="text-[#00AEEF]">{CONTENT.hero.badge.highlight1}</span> {CONTENT.hero.badge.middle} <span className="text-[#B5006C]">{CONTENT.hero.badge.highlight2}</span></span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6 text-gray-900">{CONTENT.hero.title.part1} <br /><span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FFD200] to-[#F7941D]">{CONTENT.hero.title.gradient1}</span>, <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#2DD6F5] to-[#00AEEF]">{CONTENT.hero.title.gradient2}</span> Y <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#EC008C] to-[#B5006C]">{CONTENT.hero.title.gradient3}</span> {CONTENT.hero.title.suffix}</h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0" dangerouslySetInnerHTML={{ __html: CONTENT.hero.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button onClick={openAmazon} className="text-lg px-10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all animate-pulse-ring" variant="amazon">{CONTENT.hero.cta_primary}</Button>
                  <Button variant="secondary" onClick={handleAccessRequest} className="hover:border-[#00AEEF] transition-colors">{hasRegistered ? <BookOpen size={20} /> : <Lock size={20} />} {CONTENT.hero.cta_secondary}</Button>
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
              </FadeIn>
            </div>
            <div className="lg:w-1/2 relative perspective-[2000px]">
              <FadeIn delay={200}>
                <div className="relative mx-auto w-full max-w-xl group animate-float">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-[#F7941D] via-[#EC008C] to-[#00AEEF] rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                  <div className="relative z-10 rounded-2xl shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer" onClick={openAmazon}>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full rounded-2xl shadow-xl"
                      poster={IMAGES.bookMockup}
                    >
                      <source src="/promo.mp4" type="video/mp4" />
                      <img src={IMAGES.bookMockup} alt="Libro Método Activa" className="w-full rounded-lg" />
                    </video>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div >

      <Section id="beneficios" className="bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{CONTENT.benefits.title}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{CONTENT.benefits.subtitle}</p>
          </div>

          {/* Seniors Section */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8 justify-center">
              <div className="h-px bg-gray-200 flex-1 max-w-[100px]"></div>
              <h3 className="text-2xl font-bold text-brand-pink text-center">{CONTENT.benefits.seniors.title}</h3>
              <div className="h-px bg-gray-200 flex-1 max-w-[100px]"></div>
            </div>
            <p className="text-center text-gray-500 mb-8 -mt-6">{CONTENT.benefits.seniors.subtitle}</p>
            <div className="grid md:grid-cols-3 gap-8 perspective-[1000px]">
              {CONTENT.benefits.seniors.cards.map((card, idx) => (
                <div key={idx} className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
                  <BenefitRow category="heart" icon={card.icon} title={card.title} desc={card.desc} />
                </div>
              ))}
            </div>
          </div>

          {/* Kids Section */}
          <div>
            <div className="flex items-center gap-4 mb-8 justify-center">
              <div className="h-px bg-gray-200 flex-1 max-w-[100px]"></div>
              <h3 className="text-2xl font-bold text-brand-blue text-center">{CONTENT.benefits.kids.title}</h3>
              <div className="h-px bg-gray-200 flex-1 max-w-[100px]"></div>
            </div>
            <p className="text-center text-gray-500 mb-8 -mt-6">{CONTENT.benefits.kids.subtitle}</p>
            <div className="grid md:grid-cols-3 gap-8 perspective-[1000px]">
              {CONTENT.benefits.kids.cards.map((card, idx) => (
                <div key={idx} className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
                  <BenefitRow category="mind" icon={card.icon} title={card.title} desc={card.desc} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="recursos" className="bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">{CONTENT.resources.title}</h2><p className="text-gray-500 max-w-2xl mx-auto mb-8">{CONTENT.resources.subtitle}</p><Button onClick={handleAccessRequest} className="mx-auto group" variant="primary"><Download size={20} className="group-hover:animate-bounce" /> {CONTENT.resources.cta_download}</Button></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-8">
              {CONTENT.resources.items.slice(0, 3).map((item, idx) => (
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
                <button onClick={handleAccessRequest} className="mt-4 text-[#00AEEF] text-sm font-bold hover:underline">Descargar Demo</button>
              </div>
            </div>
            <div className="space-y-8">
              {CONTENT.resources.items.slice(3, 6).map((item, idx) => (
                <BenefitRow key={idx + 3} category={item.category} icon={item.icon} title={item.title} desc={item.desc} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Premium Art Gallery */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center bg-gray-50"><Loader2 className="w-8 h-8 text-[#EC008C] animate-spin" /></div>}>
        <ArtGallery />
      </Suspense>

      <Section id="chat" className="bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">ESTAMOS PARA AYUDARTE A CONSEGUIR TU LIBRO</h2>
            <div className="text-gray-500 max-w-2xl mx-auto flex flex-col items-center justify-center gap-4">
              <span>Habla con nuestro agente que responderá tus dudas.</span>
              <div className="flex flex-col gap-3 items-center">
                <span className="flex items-center gap-2">Si quieres podemos hablar al teléfono: <span className="font-bold text-[#00AEEF] flex items-center gap-1 whitespace-nowrap"><Phone size={18} /> 643 882 154</span></span>
                <span className="flex items-center gap-2">o escríbenos a: <span className="font-bold text-[#B5006C] flex items-center gap-1 whitespace-nowrap"><Mail size={18} /> info@metodoactiva.es</span></span>
              </div>
            </div>
          </div>
          <Suspense fallback={<div className="h-[600px] flex items-center justify-center bg-white rounded-2xl shadow-xl border border-gray-100"><Loader2 className="w-8 h-8 text-[#EC008C] animate-spin" /></div>}>
            <CustomerSupportChat />
          </Suspense>
        </div>
      </Section>

      <Section id="reviews" className="bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{CONTENT.reviews.title}</h2>
              <div className="flex items-center gap-2"><div className="flex text-[#FF9900]"><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /></div><span className="text-gray-600 font-medium">{CONTENT.reviews.subtitle}</span></div>
            </div>
            <Button variant="ghost" onClick={openAmazon} className="text-[#00AEEF] hover:text-[#008CCF] mt-4 md:mt-0">{CONTENT.reviews.cta_more} <ArrowRight size={16} /></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6 perspective-[1000px]">
            {CONTENT.reviews.items.map((review, idx) => (
              <div key={idx} className={`depth-card bg-white rounded-2xl h-full ${idx === 1 ? 'md:translate-y-4' : ''}`}>
                <AmazonReviewCard title={review.title} author={review.author} date={review.date} text={review.text} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="autor" className="bg-white">
        <div className="container mx-auto px-6">
          <div className="glass-panel max-w-5xl mx-auto rounded-3xl p-10 md:p-14 text-gray-900 flex flex-col md:flex-row items-center gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#EC008C]/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity"></div>
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-white flex-shrink-0 overflow-hidden border-[6px] border-white shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500">
              <img src="/aurora.jpg" alt="Aurora Del Río" className="w-full h-full object-cover object-center" style={{ objectPosition: 'center 30%' }} />
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

      <Section className="bg-gradient-to-br from-gray-50 to-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900">Descubre el Arte como medicina para tu Salud y Bienestar.</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Más allá de la estética, el arte es una necesidad biológica. Activa los mecanismos naturales de sanación de tu cuerpo y recupera tu equilibrio vital hoy mismo.</p>
          <Button onClick={openAmazon} className="text-xl px-16 py-6 shadow-2xl animate-pulse hover:animate-none" variant="amazon">Ver Oferta en Amazon</Button>
          <div className="mt-8 flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all"><span className="font-bold text-xl text-gray-400">amazon</span><span className="font-bold text-xl text-gray-400">kindle</span><span className="font-bold text-xl text-gray-400">Audible</span></div>
        </div>
      </Section>

      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          {/* Social Media Icons with NEW Animation and Styles */}
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://instagram.com/metodoactiva" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center hover:scale-110 transition-transform shadow-lg group" aria-label="Instagram">
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="https://facebook.com/metodoactiva" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform shadow-lg" aria-label="Facebook">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            {/* WhatsApp with Wiggle Animation */}
            <a href="https://wa.me/34643882154" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform shadow-lg animate-[wiggle_4s_ease-in-out_infinite]" aria-label="WhatsApp">
              <Phone className="text-white" size={24} />
            </a>
            <a href="https://youtube.com/@metodoactiva" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center hover:scale-110 transition-transform shadow-lg" aria-label="YouTube">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
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
              onClick={(e) => e.detail === 3 && setIsAdminOpen(true)}
              className="text-gray-800 text-xs hover:text-gray-700 transition-colors cursor-default"
            >
              Aurora Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Cookie Banner (Simple & Legal) */}
      <div id="cookie-banner" className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 z-50 transform transition-transform duration-500 translate-y-full" style={{ animation: 'slideUp 1s ease-out 2s forwards' }}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 text-center md:text-left">
            Usamos cookies propias y de terceros para mejorar tu experiencia y medir el uso de la web.
            Si continúas navegando, consideramos que aceptas su uso.
          </p>
          <div className="flex gap-4">
            <button onClick={() => document.getElementById('cookie-banner').style.display = 'none'} className="text-xs text-gray-400 hover:underline">Rechazar</button>
            <button onClick={() => document.getElementById('cookie-banner').style.display = 'none'} className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-black transition-colors">Aceptar</button>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 md:hidden z-50 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] flex items-center justify-between pb-safe">
        <div><p className="text-xs text-gray-500 line-through">24.99€</p><p className="font-bold text-gray-900 text-lg flex items-center gap-1">19.95€ <span className="text-xs font-normal text-green-600 bg-green-50 px-1 rounded">-20%</span></p></div>
        <Button variant="amazon" onClick={openAmazon} className="px-6 py-2 text-sm shadow-none">Comprar en Amazon</Button>
      </div>

      <LeadMagnetModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} onSuccess={handleLeadSuccess} />
      <Suspense fallback={<LoadingSpinner />}>
        {showContentModal && <BookReader onClose={() => setShowContentModal(false)} onBuy={openAmazon} />}
        <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </Suspense>

      {/* Scroll to Top Button */}
      {
        scrolled && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            className="fixed bottom-24 right-6 z-40 p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-[#EC008C] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )
      }
    </div >
  );
}

export default App;
