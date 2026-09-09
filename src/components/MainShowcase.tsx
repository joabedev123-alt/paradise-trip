'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { sampleProducts, Product } from '@/lib/data';
import { Locale, defaultLocale, getTranslation } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DestinationsSection from '@/components/DestinationsSection';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import TripBuilderModal from '@/components/TripBuilderModal';
import HowItWorks from '@/components/HowItWorks';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import LanguageGateway from '@/components/LanguageGateway';

interface MainShowcaseProps {
  initialLocale?: Locale;
  showGatewayInitially?: boolean;
}

function MainShowcaseInner({ initialLocale = 'pt', showGatewayInitially = false }: MainShowcaseProps) {
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [showGateway, setShowGateway] = useState(showGatewayInitially);

  // Escuta alteração de query param ?categoria=... na URL
  useEffect(() => {
    const cat = searchParams.get('categoria');
    if (cat && ['tours', 'packages', 'transfers', 'experiences', 'all'].includes(cat)) {
      setSelectedCategory(cat);
      setTimeout(() => {
        const el = document.getElementById('experiencias');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [searchParams]);

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
        setLocale(saved);
        setShowGateway(false);
      }
    }
  }, []);

  const t = getTranslation(locale);

  // Filtros de produtos
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((p) => {
      // Categoria
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Destino / País
      if (selectedDestination) {
        const destMatch = p.destination.toLowerCase().includes(selectedDestination.toLowerCase()) ||
                          p.country.toLowerCase().includes(selectedDestination.toLowerCase());
        if (!destMatch) return false;
      }
      // Busca textual
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
  }, [selectedCategory, selectedDestination, searchQuery]);

  const handleHeroSearch = (filters: { destination: string; category: string }) => {
    setSelectedDestination(filters.destination);
    setSelectedCategory(filters.category);
  };

  const categories = [
    { id: 'all', label: t.filterAll, icon: 'bi-grid-fill' },
    { id: 'tours', label: t.filterTours, icon: 'bi-compass' },
    { id: 'packages', label: t.filterPackages, icon: 'bi-box2-heart' },
    { id: 'transfers', label: t.filterTransfers, icon: 'bi-car-front' },
    { id: 'experiences', label: t.filterExperiences, icon: 'bi-stars' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#182525]">
      {/* Splash inicial opcional de idiomas */}
      {showGateway && <LanguageGateway />}

      {/* Barra de Navegação */}
      <Navbar locale={locale} />

      {/* Hero Cinematográfico com Busca */}
      <Hero
        locale={locale}
        onSearch={handleHeroSearch}
        selectedCategory={selectedCategory}
        selectedDestination={selectedDestination}
      />

      {/* Seção de Destinos Principais */}
      <DestinationsSection
        locale={locale}
        onSelectCountry={(country) => {
          setSelectedDestination(country);
          setSelectedCategory('all');
        }}
      />

      {/* Vitrine de Experiências e Passeios */}
      <section id="experiencias" className="py-20 bg-[#F8F7F3] scroll-mt-20">
        <div className="container-pad">
          {/* Cabeçalho da Vitrine */}
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

            {/* Filtro ativo de destino com opção de remover */}
            {selectedDestination && (
              <span className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#EEEAE4] text-xs font-semibold text-[#182525] shrink-0">
                <i className="bi bi-geo-alt-fill text-[#1FB8B5]" />
                Destino: {selectedDestination}
                <button
                  onClick={() => setSelectedDestination('')}
                  className="hover:text-rose-500 ml-1 p-0.5"
                >
                  <i className="bi bi-x-lg text-[10px]" />
                </button>
              </span>
            )}
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
            <div className="text-center py-20 bg-white rounded-3xl border border-[#EEEAE4] p-8">
              <div className="w-16 h-16 rounded-full bg-[#1FB8B5]/10 text-[#1FB8B5] flex items-center justify-center text-3xl mx-auto mb-4">
                <i className="bi bi-search" />
              </div>
              <h3 className="text-xl font-bold text-[#182525] mb-2">
                Nenhum roteiro encontrado para esses filtros
              </h3>
              <p className="text-sm text-[#182525]/60 mb-6 font-light">
                Tente selecionar outra categoria ou limpar sua busca de destino.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDestination('');
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

      {/* Seção Como Funciona */}
      <HowItWorks locale={locale} />

      {/* Seção Sobre Nós & Credenciais */}
      <AboutSection locale={locale} />

      {/* Rodapé Rico */}
      <Footer locale={locale} />

      {/* Botão Flutuante do WhatsApp */}
      <FloatingWhatsApp />

      {/* Modal de Detalhes do Produto */}
      <ProductDetailModal
        product={selectedProduct}
        locale={locale}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Drawer do Construtor de Viagem */}
      <TripBuilderModal
        isOpen={isTripModalOpen}
        locale={locale}
        onClose={() => setIsTripModalOpen(false)}
      />
    </div>
  );
}

export default function MainShowcase(props: MainShowcaseProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-[#1FB8B5] border-t-transparent animate-spin" /></div>}>
      <MainShowcaseInner {...props} />
    </Suspense>
  );
}
