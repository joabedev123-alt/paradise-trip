'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DestinationsSection from '@/components/DestinationsSection';
import Testimonials from '@/components/Testimonials';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import LanguageGateway from '@/components/LanguageGateway';

interface MainShowcaseProps {
  initialLocale?: Locale;
  showGatewayInitially?: boolean;
}

export default function MainShowcase({ initialLocale = 'pt', showGatewayInitially = false }: MainShowcaseProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [showGateway, setShowGateway] = useState(showGatewayInitially);

  // Escuta hash #destinos na URL
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#destinos') {
      setTimeout(() => {
        const el = document.getElementById('destinos');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  }, []);

  // Sincroniza idioma salvo no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('paradise-locale') as Locale | null;
      if (saved && (saved === 'pt' || saved === 'es' || saved === 'en')) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura de localStorage so e possivel apos montagem (sistema externo)
        setLocale(saved);
        setShowGateway(false);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#182525]">
      {/* Splash inicial opcional de idiomas */}
      {showGateway && <LanguageGateway />}

      {/* Barra de Navegação */}
      <Navbar locale={locale} />

      {/* Hero Cinematográfico com Busca */}
      <Hero locale={locale} />

      {/* Seção de Destinos Principais */}
      <DestinationsSection locale={locale} />

      {/* Seção Depoimentos de Clientes */}
      <Testimonials locale={locale} />

      {/* Seção Sobre Nós & Credenciais */}
      <AboutSection locale={locale} />

      {/* Rodapé Rico */}
      <Footer locale={locale} />

      {/* Botão Flutuante do WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
