import React, { useState, useEffect } from 'react';
import {
  BookOpen, Heart, Brain, Activity, ArrowRight, Menu, X,
  ShoppingCart, Star, Check, ShieldCheck, Truck, Users,
  Loader2, MessageCircle, Send, Download, FileText, Music, Phone, Mail, Lock
} from 'lucide-react';

import Button from './components/ui/Button';
import Section from './components/ui/Section';
import FadeIn from './components/ui/FadeIn';
import { LeadMagnetModal, BenefitRow, AmazonReviewCard } from './components/ui/Cards';
import BookReader from './components/book/BookReader';
import CustomerSupportChat from './components/chat/CustomerSupportChat';
import AdminDashboard from './components/AdminDashboard';
import { IMAGES } from './constants/images';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

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
            <button onClick={() => scrollTo('autor')} className="hover:text-[#EC008C] transition-colors">Quiénes Somos</button>
            <button onClick={() => scrollTo('recursos')} className="hover:text-[#00AEEF] transition-colors flex items-center gap-1"><Brain size={16} /> Recursos</button>
            <button onClick={() => scrollTo('chat')} className="hover:text-[#F7941D] transition-colors flex items-center gap-1 text-gray-600 font-bold"><MessageCircle size={14} /> Soporte</button>
            <button onClick={() => scrollTo('reviews')} className="hover:text-[#B5006C] transition-colors">Opiniones</button>
            <button onClick={openAmazon} className="bg-[#FF9900] hover:bg-[#ffad33] text-white px-6 py-2 rounded-md font-bold text-sm flex items-center gap-2 shadow-sm transition-colors"><ShoppingCart size={16} /> Comprar en Amazon</button>
          </div>
          <button className="md:hidden text-gray-800 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu /></button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 space-y-4 md:hidden">
          <button onClick={() => scrollTo('autor')} className="block w-full text-left py-3 text-lg border-b border-gray-100">Quiénes Somos</button>
          <button onClick={() => scrollTo('recursos')} className="block w-full text-left py-3 text-lg border-b border-gray-100">Recursos</button>
          <button onClick={() => scrollTo('chat')} className="block w-full text-left py-3 text-lg border-b border-gray-100">Soporte</button>
          <button onClick={openAmazon} className="block w-full text-center bg-[#FF9900] text-white py-3 rounded-lg font-bold mt-4">Comprar en Amazon</button>
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
                  <span className="text-xs md:text-sm font-bold tracking-wide text-gray-600 whitespace-normal text-left">CON EL <span className="text-[#00AEEF]">MÉTODO ACTIVA</span> PUEDES TENER <span className="text-[#B5006C]">SALUD Y BIENESTAR</span></span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6 text-gray-900">ACTIVA TU <br /><span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FFD200] to-[#F7941D]">CUERPO</span>, <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#2DD6F5] to-[#00AEEF]">MENTE</span> Y <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#EC008C] to-[#B5006C]">CORAZÓN</span></h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">La <strong>musicoterapia es una herramienta que sana, clínicamente comprobado</strong>. Descubre cómo el Método Activa reduce el estrés, sana la ansiedad y recupera tu vitalidad en solo 21 días.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button onClick={openAmazon} className="text-lg px-10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all" variant="amazon">Comprar en Amazon</Button>
                  <Button variant="secondary" onClick={handleAccessRequest} className="hover:border-[#00AEEF] transition-colors">{hasRegistered ? <BookOpen size={20} /> : <Lock size={20} />} Leer primer capítulo</Button>
                </div>
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1"><Star size={18} className="text-[#FF9900] fill-[#FF9900]" /><span className="font-bold text-gray-900">4.9/5</span><span className="text-gray-400">(+500 valoraciones)</span></div>
                  <div className="flex items-center gap-1"><Truck size={18} className="text-gray-400" /><span className="text-gray-600">Envío <strong>RÁPIDO</strong> y <strong>GRATIS</strong> con Prime</span></div>
                </div>
                <div className="mt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1"><ShieldCheck size={14} /> Pago Seguro</div>
                  <div className="flex items-center gap-1"><Check size={14} /> Devolución Garantizada</div>
                </div>
              </FadeIn>
            </div>
            <div className="lg:w-1/2 relative perspective-[2000px]">
              <FadeIn delay={200}>
                <div className="relative mx-auto w-3/4 max-w-md group animate-float">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-[#F7941D] via-[#EC008C] to-[#00AEEF] rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                  <div className="relative z-10 rounded-r-lg shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.3)] transform rotate-y-12 hover:rotate-0 transition-transform duration-700 ease-out cursor-pointer" onClick={openAmazon}>
                    <img src={IMAGES.bookMockup} alt="Libro Método Activa Tapa Blanda" className="w-full rounded-lg shadow-xl" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-3 animate-bounce duration-[3000ms]">
                    <div className="bg-[#FF9900]/10 p-2 rounded-full text-[#FF9900]"><Star size={20} fill="currentColor" /></div>
                    <div><p className="text-[10px] text-gray-500 font-bold uppercase">Categoría</p><p className="font-bold text-gray-900 text-sm">Best Seller</p></div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      <Section id="beneficios" className="bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué este libro está cambiando vidas?</h2><p className="text-gray-500 max-w-2xl mx-auto">Más que un libro, es una prescripción médica natural. Basado en estudios clínicos de neuroestética.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-8 perspective-[1000px]">
              <div className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm"><BenefitRow category="body" icon={Activity} title="Reduce el Cortisol" desc="Aprende técnicas de 'arrastre rítmico' para calmar tu sistema nervioso y bajar la hormona del estrés en minutos." /></div>
              <div className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm"><BenefitRow category="mind" icon={Brain} title="Claridad Mental" desc="Elimina la 'niebla mental' activando nuevas rutas neuronales a través de la estimulación estética y visual." /></div>
              <div className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm"><BenefitRow category="heart" icon={Heart} title="Sanación Emocional" desc="Desbloquea traumas que las palabras no pueden alcanzar mediante el bypass del sistema límbico." /></div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-brand-pink/20 to-brand-yellow/20 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative transform transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2">
                  <img src={IMAGES.chart} alt="Visualización Artística de Cuerpo, Mente y Corazón" className="rounded-3xl shadow-2xl w-full max-w-sm object-cover border-4 border-white/50 backdrop-blur-sm h-96 group-hover:shadow-glow-blue transition-all duration-500" style={{ filter: 'contrast(1.05) saturate(1.1)', transform: 'perspective(1000px) rotateY(-5deg)', }} />
                  <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-gray-100 transform group-hover:scale-110 transition-transform">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tríada Maestra</p>
                    <p className="text-sm font-bold bg-gradient-to-r from-brand-yellow via-brand-blue to-brand-pink bg-clip-text text-transparent">Cuerpo · Mente · Corazón</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8 perspective-[1000px]">
              <div className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm"><BenefitRow category="body" icon={ShieldCheck} title="Refuerza Inmunidad" desc="La reducción del estrés crónico fortalece tu sistema inmunológico de forma natural." /></div>
              <div className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm"><BenefitRow category="heart" icon={Users} title="Mejora Relaciones" desc="La regulación emocional te permite conectar con los demás desde la calma, no desde la reacción." /></div>
              <div className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm"><BenefitRow category="mind" icon={Check} title="Plan de 21 Días" desc="Incluye una guía práctica paso a paso para integrar estos hábitos en tu rutina diaria sin esfuerzo." /></div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="recursos" className="bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">Recursos Gratuitos para Lectores</h2><p className="text-gray-500 max-w-2xl mx-auto mb-8">Este libro no solo es teoría. Incluye un kit de herramientas y recursos prácticos validados por estudios clínicos. Regístrate para acceder al área de miembros.</p><Button onClick={handleAccessRequest} className="mx-auto group" variant="primary"><Download size={20} className="group-hover:animate-bounce" /> Acceder al Kit de Herramientas</Button></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-8">
              <BenefitRow category="body" icon={Music} title="Playlists Terapéuticas" desc="Acceso a listas de música con 'arrastre rítmico' diseñadas para bajar el cortisol en minutos." />
              <BenefitRow category="mind" icon={Brain} title="Ejercicios Cognitivos" desc="Técnicas de dibujo y visualización para eliminar la 'niebla mental' y activar nuevas rutas neuronales." />
              <BenefitRow category="heart" icon={Heart} title="Diario Emocional" desc="Plantillas para desbloquear traumas que las palabras no pueden alcanzar mediante el bypass límbico." />
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
              <BenefitRow category="body" icon={ShieldCheck} title="Guía Inmunológica" desc="Protocolos para fortalecer tu sistema inmunológico reduciendo el estrés crónico de forma natural." />
              <BenefitRow category="heart" icon={Users} title="Dinámicas Grupales" desc="Ejercicios para mejorar relaciones conectando desde la calma y la regulación emocional." />
              <BenefitRow category="mind" icon={FileText} title="Plan de 21 Días" desc="Tu hoja de ruta paso a paso para integrar estos hábitos en tu rutina diaria sin esfuerzo." />
            </div>
          </div>
        </div>
      </Section>

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
          <CustomerSupportChat />
        </div>
      </Section>

      <Section id="reviews" className="bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Resultados Clínicos Reales</h2>
              <div className="flex items-center gap-2"><div className="flex text-[#FF9900]"><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /></div><span className="text-gray-600 font-medium">Recomendado por Profesionales de la Salud</span></div>
            </div>
            <Button variant="ghost" onClick={openAmazon} className="text-[#00AEEF] hover:text-[#008CCF] mt-4 md:mt-0">Ver las 500+ reseñas <ArrowRight size={16} /></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6 perspective-[1000px]">
            <div className="depth-card bg-white rounded-2xl h-full"><AmazonReviewCard title="Resultados visibles en Parkinson" author="Dra. Elena M." date="15 de noviembre de 2024" text="Como neuróloga, he empezado a recomendar los ejercicios de 'Melodía Cinética' de este libro a mis pacientes. He observado una mejora del 40% en la fluidez de la marcha en solo un mes. Es un complemento clínico invaluable." /></div>
            <div className="depth-card bg-white rounded-2xl h-full translate-y-4"><AmazonReviewCard title="Vital para la rehabilitación de Ictus" author="Javier L." date="3 de diciembre de 2024" text="Después de sufrir un Ictus, mi fisioterapia estaba estancada. El capítulo sobre 'Estimulación Rítmica Auditiva' me ayudó a recuperar la movilidad de mi brazo derecho cuando nada más funcionaba. Mi terapeuta está asombrado." /></div>
            <div className="depth-card bg-white rounded-2xl h-full"><AmazonReviewCard title="Eficaz en TDAH y ansiedad clínica" author="Roberto F., Psicólogo" date="22 de enero de 2025" text="Integro el protocolo de 21 días con mis pacientes jóvenes con TDAH. La reducción en la agitación motora y los niveles de cortisol es medible y consistente. Por fin una herramienta no farmacológica que funciona." /></div>
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
            <p className="mb-4 font-bold text-white tracking-widest">MÉTODO ACTIVA &copy; {new Date().getFullYear()}</p>
            <div className="flex justify-center gap-6 flex-wrap">
              <a href="/legal" className="hover:text-[#00AEEF] transition-colors">Aviso Legal</a>
              <a href="/privacidad" className="hover:text-[#00AEEF] transition-colors">Política de Privacidad</a>
              <a href="mailto:info@metodoactiva.es" className="hover:text-[#00AEEF] transition-colors">Contacto</a>
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
      {showContentModal && <BookReader onClose={() => setShowContentModal(false)} onBuy={openAmazon} />}
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default App;
