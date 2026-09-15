'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
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

function DestinationsPageViewInner({ locale, activeCountry }: DestinationsPageViewProps) {
  const searchParams = useSearchParams();
  const t = getTranslation(locale);
  const [selectedCountry, setSelectedCountry] = useState<string>(activeCountry || 'Chile');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sincroniza com o parametro ?categoria=... vindo da busca do Hero (sistema externo: URL)
  useEffect(() => {
    const cat = searchParams.get('categoria');
    if (cat && ['tours', 'packages', 'transfers', 'experiences', 'all'].includes(cat)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza com a URL (sistema externo) e dispara scroll no DOM
      setSelectedCategory(cat);
      setTimeout(() => {
        const el = document.getElementById('catalogo');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [searchParams]);

  const categories = [
    { id: 'all', label: t.filterAll, icon: 'bi-grid-fill' },
    { id: 'tours', label: t.filterTours, icon: 'bi-compass' },
    { id: 'packages', label: t.filterPackages, icon: 'bi-box2-heart' },
    { id: 'transfers', label: t.filterTransfers, icon: 'bi-car-front' },
    { id: 'experiences', label: t.filterExperiences, icon: 'bi-stars' },
  ];

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q) ||
                            (p.nameEs && p.nameEs.toLowerCase().includes(q)) ||
                            (p.nameEn && p.nameEn.toLowerCase().includes(q));
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesDest = p.destination.toLowerCase().includes(q);
        const matchesTag = p.tags?.some((tag) => tag.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesDest && !matchesTag) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

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
    'Colômbia': {
      title: 'Caribe & Cidades Vibrantes — Colômbia',
      subtitle: 'Do centro histórico colonial de Cartagena às águas cristalinas do Caribe e à efervescência cultural de Bogotá e Medellín.',
      bestTime: 'Dezembro a Março (estação seca)',
      highlight: 'Cartagena, San Andrés, Bogotá e Medellín',
      currency: 'Peso Colombiano (COP)',
      climate: 'Tropical no litoral, temperado nas cidades andinas',
    },
  };

  const currentInfo = countryInfo[selectedCountry] || countryInfo.Chile;
  const filtered = sampleProducts.filter((p) => p.country === selectedCountry);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#182525]">
      <Navbar locale={locale} />

      {/* Hero de Destinos */}
      <section className="relative min-h-[50vh] min-h-[50dvh] flex items-center justify-center pt-32 sm:pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-principal.jpg"
            alt="Destinos América do Sul"
            fill
            priority
            sizes="100vw"
            className="object-cover"
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

      {/* Catálogo Completo de Roteiros */}
      <section id="catalogo" className="py-16 bg-white border-t border-[#EEEAE4] scroll-mt-20">
        <div className="container-pad">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1FB8B5]/10 text-[#107C79] text-xs font-semibold uppercase tracking-wider mb-2">
                <i className="bi bi-sparkles" />
                Catálogo de Roteiros
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182525]">
                {selectedCategory === 'tours' ? 'Passeios Imperdíveis' :
                 selectedCategory === 'packages' ? 'Pacotes Completos' :
                 selectedCategory === 'transfers' ? 'Transfers Executivos e Privativos' :
                 selectedCategory === 'experiences' ? 'Experiências Únicas' :
                 t.productsTitle}
              </h2>
              <p className="text-[#182525]/70 text-sm sm:text-base font-light mt-1">
                {t.productsSubtitle}
              </p>
            </div>

            {/* Busca Rápida por Texto */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome ou atrativo..."
                className="w-full bg-white border border-[#EEEAE4] rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#1FB8B5] transition-colors"
              />
              <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#182525]"
                >
                  <i className="bi bi-x-circle-fill text-xs" />
                </button>
              )}
            </div>
          </div>

          {/* Abas de Categorias */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1FB8B5] text-white shadow-lg shadow-[#1FB8B5]/30'
                    : 'bg-white border border-[#EEEAE4] text-[#182525]/70 hover:text-[#182525] hover:border-[#1FB8B5]/40'
                }`}
              >
                <i className={`bi ${cat.icon}`} />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Grid de Experiências */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                  onOpenDetail={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#F8F7F3] rounded-3xl border border-[#EEEAE4] p-8">
              <div className="w-16 h-16 rounded-full bg-[#1FB8B5]/10 text-[#1FB8B5] flex items-center justify-center text-3xl mx-auto mb-4">
                <i className="bi bi-search" />
              </div>
              <h3 className="text-xl font-bold text-[#182525] mb-2">
                Nenhum roteiro encontrado para esses filtros
              </h3>
              <p className="text-sm text-[#182525]/60 mb-6 font-light">
                Tente selecionar outra categoria ou limpar sua busca.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="btn-primary px-6 py-2.5 text-sm cursor-pointer"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
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

export default function DestinationsPageView(props: DestinationsPageViewProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-[#1FB8B5] border-t-transparent animate-spin" /></div>}>
      <DestinationsPageViewInner {...props} />
    </Suspense>
  );
}
