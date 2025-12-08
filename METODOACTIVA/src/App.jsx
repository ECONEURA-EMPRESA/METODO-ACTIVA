import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Check, ShieldCheck, Truck, BookOpen, Menu, X, Play, Brain, Heart, Users, Calendar, ArrowRight, Lock, MessageCircle, Activity, Music, FileText, Download, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Toaster, toast } from 'sonner';

import CustomerSupportChat from './components/chat/CustomerSupportChat';
import BookReader from './components/book/BookReader';
import AdminDashboard from './components/AdminDashboard';
import { AmazonReviewCard, BenefitRow, LeadMagnetModal } from './components/ui/Cards';
import Button from './components/ui/Button';
import Section from './components/ui/Section';
import FadeIn from './components/ui/FadeIn';

import { IMAGES } from './constants/images';
import { CONTENT } from './constants/content';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBookReader, setShowBookReader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Cookie Banner State
  const [cookieConsent, setCookieConsent] = useState(localStorage.getItem('cookieConsent'));

  // Scroll Progress State
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAmazon = () => { window.open("https://www.amazon.es/dp/B0DJQV7K5F", "_blank", "noopener,noreferrer"); };
  const openYouTube = () => { window.open("https://youtube.com/@metodoactiva", "_blank", "noopener,noreferrer"); };

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAccessRequest = () => { if (hasRegistered) { setShowContentModal(true); } else { setShowLeadModal(true); } };

  const handleLeadSuccess = () => {
    setHasRegistered(true);
    setShowLeadModal(false);
    setShowContentModal(true);
    toast.success('¡Registro exitoso! Accediendo al contenido exclusivo...');
  };

  const handleFooterClick = (e) => {
    if (e.detail === 3) {
      setClickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 1) {
          setIsAdminOpen(true);
          return 0;
        }
        return newCount;
      });
    }
  };

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setCookieConsent('true');
    toast.success('Cookies aceptadas');
  };

  // Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-gray-900 bg-gray-50 overflow-x-hidden selection:bg-[#2DD6F5] selection:text-[#B5006C] relative">
      <Toaster position="top-center" richColors />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#EC008C] to-[#00AEEF] z-[60]" style={{ width: `${scrollProgress * 100}%` }}></div>

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
              {CONTENT.navbar.brand}
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
                <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6 text-gray-900">{CONTENT.hero.title.part1} <br /><span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FFD200] to-[#F7941D]">{CONTENT.hero.title.gradient1}</span>, <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#2DD6F5] to-[#00AEEF]">{CONTENT.hero.title.gradient2}</span> Y <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#EC008C] to-[#B5006C]">{CONTENT.hero.title.gradient3}</span></h1>

                {/* Render complex content with simple markdown-like processing */}
                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0" dangerouslySetInnerHTML={{ __html: CONTENT.hero.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button onClick={openAmazon} className="text-lg px-10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all" variant="amazon">{CONTENT.hero.cta_primary}</Button>
                  <Button variant="secondary" onClick={handleAccessRequest} className="hover:border-[#00AEEF] transition-colors">{hasRegistered ? <BookOpen size={20} /> : <Lock size={20} />} {CONTENT.hero.cta_secondary}</Button>
                </div>
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1"><Star size={18} className="text-[#FF9900] fill-[#FF9900]" /><span className="font-bold text-gray-900">{CONTENT.hero.rating}</span><span className="text-gray-400">{CONTENT.hero.reviews_count}</span></div>
                  <div className="flex items-center gap-1"><Truck size={18} className="text-gray-400" /><span className="text-gray-600" dangerouslySetInnerHTML={{ __html: CONTENT.hero.shipping.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></span></div>
                </div>
                <div className="mt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1"><ShieldCheck size={14} /> {CONTENT.hero.badges[0]}</div>
                  <div className="flex items-center gap-1"><Check size={14} /> {CONTENT.hero.badges[1]}</div>
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
                    <div><p className="text-[10px] text-gray-500 font-bold uppercase">{CONTENT.hero.book_badge.category}</p><p className="font-bold text-gray-900 text-sm">{CONTENT.hero.book_badge.rank}</p></div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      <Section id="beneficios" className="bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">{CONTENT.benefits.title}</h2><p className="text-gray-500 max-w-2xl mx-auto">{CONTENT.benefits.subtitle}</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-8 perspective-[1000px]">
              {CONTENT.benefits.cards.slice(0, 3).map((card, i) => (
                <div key={i} className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
                  <BenefitRow category={card.category} icon={card.icon} title={card.title} desc={card.desc} />
                </div>
              ))}
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
              {CONTENT.benefits.cards.slice(3, 6).map((card, i) => (
                <div key={i} className="depth-card bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
                  <BenefitRow category={card.category} icon={card.icon} title={card.title} desc={card.desc} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="recursos" className="bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">{CONTENT.resources.title}</h2><p className="text-gray-500 max-w-2xl mx-auto mb-8">{CONTENT.resources.subtitle}</p><Button onClick={openYouTube} className="mx-auto group" variant="primary"><Download size={20} className="group-hover:animate-bounce" /> {CONTENT.resources.cta_download}</Button></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-8">
              {CONTENT.resources.items.slice(0, 3).map((item, i) => (
                <BenefitRow key={i} onClick={openYouTube} category={item.category} icon={item.icon} title={item.title} desc={item.desc} />
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
                <button onClick={openYouTube} className="mt-4 text-[#00AEEF] text-sm font-bold hover:underline">Descargar Demo</button>
              </div>
            </div>
            <div className="space-y-8">
              {CONTENT.resources.items.slice(3, 6).map((item, i) => (
                <BenefitRow key={i} onClick={openYouTube} category={item.category} icon={item.icon} title={item.title} desc={item.desc} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="chat" className="bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">¿Tienes dudas? <span className="text-[#00AEEF]">Aurora te responde.</span></h2>
              <p className="text-gray-600 mb-8 text-lg">Nuestra IA entrenada con el método puede explicarte cómo funciona la neuroestética, recomendarte ejercicios o simplemente escucharte.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100"><h3 className="font-bold mb-2 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Disponible 24/7</h3><p className="text-sm text-gray-500">Respuestas inmediatas sin esperas.</p></div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100"><h3 className="font-bold mb-2 flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Experta en el Método</h3><p className="text-sm text-gray-500">Conoce cada página del libro.</p></div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full"><CustomerSupportChat /></div>
          </div>
        </div>
      </Section>

      <Section id="autor" className="bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EC008C] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
            <div className="md:w-1/3 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#EC008C] to-[#F7941D] rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
              <img src={IMAGES.aurora} alt="Aurora Del Río" className="relative rounded-2xl w-full shadow-lg object-cover transform -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <div className="md:w-2/3 relative z-10">
              <h3 className="text-[#EC008C] font-bold uppercase tracking-wider mb-2">Sobre la Autora</h3>
              <h2 className="text-3xl font-bold mb-6">Aurora Del Río</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">Musicoterapeuta certificada y especialista en Neuroestética. Tras años de investigación clínica, desarrolló el Método Activa para ayudar a sus pacientes a reconectar con su vitalidad a través del arte y el sonido.</p>
              <p className="text-gray-600 mb-8 leading-relaxed">"La belleza no es solo algo que ves, es algo que tu cerebro consume. Al igual que cuidas tu dieta alimenticia, debes cuidar tu dieta estética."</p>
              <img src="/firma.png" alt="Firma Aurora" className="h-16 opacity-70" />
            </div>
          </div>
        </div>
      </Section>

      <Section id="reviews" className="bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900 mb-4">{CONTENT.reviews.title}</h2><p className="text-gray-500">{CONTENT.reviews.subtitle}</p></div>
          <div className="grid md:grid-cols-3 gap-6">
            {CONTENT.reviews.items.map((review, i) => (
              <AmazonReviewCard key={i} {...review} />
            ))}
          </div>
          <div className="mt-12 text-center"><Button onClick={openAmazon} variant="outline" className="group">{CONTENT.reviews.cta_more} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Button></div>
        </div>
      </Section>

      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="relative"><div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#EC008C] to-[#00AEEF] blur opacity-70"></div><img src="/logo.jpg" alt="Logo Footer" className="relative w-8 h-8 rounded-full border border-gray-700" /></div>
              <span className="font-bold text-xl tracking-tight">{CONTENT.navbar.brand}</span>
            </div>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm text-gray-500">
            <p onClick={(e) => handleFooterClick(e)} className="cursor-default select-none transition-colors hover:text-gray-700 active:text-gray-600 mb-4 md:mb-0">&copy; {CONTENT.footer.copyright}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">{CONTENT.footer.links.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{CONTENT.footer.links.terms}</a>
              <a href="#" className="hover:text-white transition-colors">{CONTENT.footer.links.cookies}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 bg-white border border-gray-200 p-3 rounded-full shadow-lg z-40 transition-all duration-500 hover:scale-110 hover:shadow-xl ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <ArrowRight className="text-gray-600 -rotate-90" size={20} />
      </button>

      {/* WhatsApp Button with Wiggle Animation */}
      <a
        href="https://wa.me/34600000000?text=Hola,%20quisiera%20más%20información%20sobre%20el%20Método%20Activa"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group no-underline"
      >
        <div className="bg-[#25D366] p-4 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center animate-wiggle">
          <MessageCircle size={28} className="text-white fill-white" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-md text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          ¡Escríbenos por WhatsApp!
        </span>
      </a>

      {/* Cookie Banner */}
      {!cookieConsent && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-[60] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] animate-slideUp">
          <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              Usamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico.
              Al continuar navegando, aceptas nuestra <a href="#" className="text-[#00AEEF] underline hover:text-[#008CCF]">Política de Cookies</a>.
            </p>
            <Button onClick={acceptCookies} size="sm" className="whitespace-nowrap">
              Aceptar todas
            </Button>
          </div>
        </div>
      )}

      <LeadMagnetModal isOpen={showLeadModal} onClose={() => setShowLeadModal(false)} onSuccess={handleLeadSuccess} />
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default App;
