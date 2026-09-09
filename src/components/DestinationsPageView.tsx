'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sampleProducts, Product, destinations } from '@/lib/data';
import { Locale, getTranslation } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import TripBuilderModal from '@/components/TripBuilderModal';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { buildSimpleWhatsAppUrl } from '@/lib/whatsapp';

interface DestinationsPageViewProps {
  locale: Locale;
  activeCountry?: string;
}

export default function DestinationsPageView({ locale, activeCountry }: DestinationsPageViewProps) {
  const t = getTranslation(locale);
  const [selectedCountry, setSelectedCountry] = useState<string>(activeCountry || 'Chile');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);

  const countryInfo: Record<string, { title: string; subtitle: string; bestTime: string; highlight: string; currency: string; climate: string }> = {
    Chile: {
      title: 'Deserto do Atacama — Chile',
      subtitle: 'O deserto mais árido e fascinante do mundo, com céu cristalino, lagoas salinas e vulcões imponentes.',
      bestTime: 'Ano todo (dias ensolarados e noites frescas)',
      highlight: 'Valle de la Luna, Geysers del Tatio e Astronomia',
      currency: 'Peso Chileno (CLP)',
      climate: 'Desértico de altitude, variação térmica acentuada',
    },
    Peru: {
      title: 'Cusco & Machu Picchu — Peru',
      subtitle: 'O coração sagrado do Império Inca, misturando arquitetura colonial, sítios arqueológicos e culinária premiada.',
      bestTime: 'Maio a Outubro (estação seca)',
      highlight: 'Cidadela de Machu Picchu e Vale Sagrado dos Incas',
      currency: 'Sol Peruano (PEN)',
      climate: 'Andino de altitude, noites frias e dias agradáveis',
    },
    'Bolívia': {
      title: 'Salar de Uyuni — Bolívia',
      subtitle: 'Mais de 10.000 km² de sal branco que se transformam no maior espelho natural do planeta.',
      bestTime: 'Dezembro a Março (efeito espelho) / Maio a Novembro (geometria seca)',
      highlight: 'Reflexos infinitos, Ilha Incahuasi e Laguna Colorada',
      currency: 'Boliviano (BOB)',
      climate: 'Altiplânico, frio e seco',
    },
    Argentina: {
      title: 'Patagônia & Glaciares — Argentina',
      subtitle: 'Território selvagem de geleiras monumentais, lagos azul-turquesa e montanhas desafiadoras.',
      bestTime: 'Outubro a Abril (primavera e verão patagônico)',
      highlight: 'Glaciar Perito Moreno e El Calafate',
      currency: 'Peso Argentino (ARS)',
      climate: 'Frio temperado / subpolar',
    },
  };

  const currentInfo = countryInfo[selectedCountry] || countryInfo.Chile;
  const filtered = sampleProducts.filter((p) => p.country === selectedCountry);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#182525]">
      <Navbar locale={locale} />

      {/* Hero de Destinos */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-principal.jpg"
            alt="Destinos América do Sul"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#182525]/85 via-[#182525]/65 to-[#F8F7F3]" />
        </div>

        <div className="container-pad relative z-10 w-full text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            América do Sul
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
            Nossos Destinos
          </h1>
          <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Descubra a magia das paisagens mais impactantes do continente com a curadoria especializada da Paradise Trip.
          </p>
        </div>
      </section>

      {/* Seletor de País */}
      <section className="py-12">
        <div className="container-pad">
          {/* Tabs de Países */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12">
            {destinations.map((d) => (
              <button
                key={d.name}
                onClick={() => setSelectedCountry(d.name)}
                className={`p-4 rounded-3xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                  selectedCountry === d.name
                    ? 'bg-white border-[#1FB8B5] shadow-xl ring-2 ring-[#1FB8B5]/20'
                    : 'bg-white/60 border-[#EEEAE4] hover:bg-white hover:border-[#1FB8B5]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1FB8B5]">Destino</span>
                  <span className="w-2 h-2 rounded-full bg-[#1FB8B5]" />
                </div>
                <h3 className="font-extrabold text-lg text-[#182525]" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {d.name}
                </h3>
                <p className="text-xs text-[#182525]/60 mt-1">{d.description}</p>
              </button>
            ))}
          </div>

          {/* Destaque do País Selecionado */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EEEAE4] shadow-sm mb-16">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#107C79] block mb-2">
                Guia Rápido do Destino
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182525] mb-3" style={{ fontFamily: 'var(--font-outfit)' }}>
                {currentInfo.title}
              </h2>
              <p className="text-[#182525]/80 text-sm sm:text-base font-light leading-relaxed">
                {currentInfo.subtitle}
              </p>
            </div>

            {/* Ficha técnica do destino */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F8F7F3] border border-[#EEEAE4] mb-10">
              <div>
                <p className="text-[11px] uppercase font-bold text-[#182525]/50">Melhor Época</p>
                <p className="text-xs sm:text-sm font-semibold text-[#182525] mt-1">{currentInfo.bestTime}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-[#182525]/50">Destaques</p>
                <p className="text-xs sm:text-sm font-semibold text-[#182525] mt-1">{currentInfo.highlight}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-[#182525]/50">Moeda Local</p>
                <p className="text-xs sm:text-sm font-semibold text-[#182525] mt-1">{currentInfo.currency}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-[#182525]/50">Clima Predominante</p>
                <p className="text-xs sm:text-sm font-semibold text-[#182525] mt-1">{currentInfo.climate}</p>
              </div>
            </div>

            {/* Roteiros e Passeios do País */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#182525]">
                  Experiências e Passeios em {selectedCountry} ({filtered.length})
                </h3>
                <a
                  href={buildSimpleWhatsAppUrl(`Olá! Gostaria de falar sobre roteiros para ${selectedCountry}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5"
                >
                  <i className="bi bi-whatsapp" />
                  <span>Personalizar Roteiro</span>
                </a>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      locale={locale}
                      onOpenDetail={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[#F8F7F3] rounded-2xl p-6">
                  <p className="text-sm font-semibold text-[#182525]">Novos roteiros para {selectedCountry} estão sendo adicionados pela nossa equipe.</p>
                  <p className="text-xs text-[#182525]/60 mt-1">Fale conosco no WhatsApp para consultar opções sob medida.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
      <FloatingWhatsApp />

      <ProductDetailModal
        product={selectedProduct}
        locale={locale}
        onClose={() => setSelectedProduct(null)}
      />

      <TripBuilderModal
        isOpen={isTripModalOpen}
        locale={locale}
        onClose={() => setIsTripModalOpen(false)}
      />
    </div>
  );
}
