'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { sampleProducts, Product } from '@/lib/data';
import { Locale } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import TripBuilderModal from '@/components/TripBuilderModal';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { buildSimpleWhatsAppUrl } from '@/lib/whatsapp';
import Link from 'next/link';

interface CategoryPageViewProps {
  category: 'tours' | 'packages' | 'transfers' | 'experiences';
  locale: Locale;
}

const categoryConfig = {
  tours: {
    title: 'Passeios e Excursões Guiadas',
    subtitle: 'Roteiros de um dia e meio dia pelos atrativos naturais e arqueológicos mais icônicos da América do Sul.',
    badge: 'Expedições Diárias',
    heroImage: '/images/valle-de-la-luna.jpg',
    stat1: 'Atacama, Cusco & Uyuni',
    stat2: 'Guias Credenciados',
    stat3: 'Transporte Incluso',
    faq: [
      { q: 'Como funciona o transporte nos passeios?', a: 'Buscamos os passageiros em seus hotéis ou em pontos centrais com vans executivas climatizadas ou veículos 4x4 equipados.' },
      { q: 'Preciso me preocupar com a altitude?', a: 'Nossos guias planejam a sequência ideal dos passeios para permitir uma aclimatação suave do corpo nos primeiros dias.' },
      { q: 'O que devo levar nas excursões?', a: 'Recomendamos agasalhos em camadas (sistema cebola), protetor solar, óculos escuros, calçado confortável e água mineral.' },
    ],
  },
  packages: {
    title: 'Pacotes Completos & Roteiros Sob Medida',
    subtitle: 'Viagens planejadas do início ao fim com hospedagens selecionadas, passeios imperdíveis e suporte integral.',
    badge: 'Curadoria Exclusiva',
    heroImage: '/images/hero-principal.jpg',
    stat1: 'Roteiros de 4 a 7 Dias',
    stat2: 'Hotéis Selecionados',
    stat3: 'Suporte 24/7',
    faq: [
      { q: 'Posso personalizar as datas e passeios do pacote?', a: 'Sim! Nossos consultores ajustam qualquer roteiro de acordo com os dias disponíveis e o ritmo da sua viagem.' },
      { q: 'As passagens aéreas estão inclusas?', a: 'Nossos pacotes focam na operação terrestre completa (hospedagem, passeios e transfers). Auxiliamos na recomendação dos melhores voos.' },
      { q: 'Como é feito o pagamento?', a: 'Trabalhamos com condições facilitadas de reserva, com confirmação prévia e saldo ajustado conforme sua preferência.' },
    ],
  },
  transfers: {
    title: 'Transfers Executivos & Privativos',
    subtitle: 'Chegue com total tranquilidade ao seu destino com motoristas pontuais, veículos confortáveis e monitoramento de voos.',
    badge: 'Conforto & Pontualidade',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=85',
    stat1: 'Recepção no Aeroporto',
    stat2: 'Veículos Novos & Revisados',
    stat3: 'Água & Climatização',
    faq: [
      { q: 'O que acontece se meu voo atrasar?', a: 'Nossa equipe monitora o número do seu voo em tempo real. O motorista aguardará seu desembarque sem custos adicionais por atraso da companhia aérea.' },
      { q: 'O transfer é compartilhado ou privativo?', a: 'Oferecemos opções privativas com máxima privacidade e também transfers compartilhados com excelente custo-benefício.' },
      { q: 'Qual a bagagem permitida?', a: 'Geralmente 1 mala grande de porão e 1 mala de mão por passageiro. Caso viaje com bagagens especiais, nos avise com antecedência.' },
    ],
  },
  experiences: {
    title: 'Experiências Únicas & Imersões',
    subtitle: 'Momentos inesquecíveis fora do óbvio: astronomia no deserto mais límpido, gastronomia andina e passeios exclusivos.',
    badge: 'Momentos Inesquecíveis',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=85',
    stat1: 'Astrofotografia & Telescópios',
    stat2: 'Grupos Reduzidos',
    stat3: 'Exclusividade',
    faq: [
      { q: 'Como é o tour astronômico no Atacama?', a: 'Realizado longe da poluição luminosa, com astrônomo profissional, telescópios modernos, explicação das constelações e astrofotografia de presente.' },
      { q: 'As experiências acontecem todos os dias?', a: 'Algumas experiências dependem das fases da lua (no caso da astronomia) ou de condições climáticas para máxima segurança e proveito.' },
    ],
  },
};

export default function CategoryPageView({ category, locale }: CategoryPageViewProps) {
  const cfg = categoryConfig[category];
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);

  // Filtra produtos dessa categoria
  const categoryProducts = useMemo(() => {
    return sampleProducts.filter((p) => {
      if (p.category !== category) return false;
      if (selectedDestination && !p.destination.toLowerCase().includes(selectedDestination.toLowerCase()) && !p.country.toLowerCase().includes(selectedDestination.toLowerCase())) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const mName = p.name.toLowerCase().includes(q);
        const mDesc = p.description.toLowerCase().includes(q);
        if (!mName && !mDesc) return false;
      }
      return true;
    });
  }, [category, selectedDestination, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#182525]">
      <Navbar locale={locale} />

      {/* Hero da Categoria */}
      <section className="relative min-h-[55vh] min-h-[55dvh] flex items-center justify-center pt-32 sm:pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={cfg.heroImage}
            alt={cfg.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#182525]/85 via-[#182525]/60 to-[#F8F7F3]" />
        </div>

        <div className="container-pad relative z-10 w-full text-center max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-white/70 mb-4">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">Início</Link>
            <span>/</span>
            <span className="text-[#1FB8B5] font-semibold">{cfg.badge}</span>
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            {cfg.badge}
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
            {cfg.title}
          </h1>

          <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            {cfg.subtitle}
          </p>

          {/* Destaques da categoria */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto">
            <div className="glass p-3 rounded-2xl border border-white/20 text-white">
              <i className="bi bi-geo-alt-fill text-[#1FB8B5] text-lg mb-1 block" />
              <p className="text-[11px] sm:text-xs font-bold leading-tight">{cfg.stat1}</p>
            </div>
            <div className="glass p-3 rounded-2xl border border-white/20 text-white">
              <i className="bi bi-shield-check text-[#1FB8B5] text-lg mb-1 block" />
              <p className="text-[11px] sm:text-xs font-bold leading-tight">{cfg.stat2}</p>
            </div>
            <div className="glass p-3 rounded-2xl border border-white/20 text-white">
              <i className="bi bi-stars text-[#1FB8B5] text-lg mb-1 block" />
              <p className="text-[11px] sm:text-xs font-bold leading-tight">{cfg.stat3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Itens */}
      <section className="py-16">
        <div className="container-pad">
          {/* Barra de Filtros */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            {/* Destinos */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedDestination('')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  !selectedDestination ? 'bg-[#1FB8B5] text-white shadow-md' : 'bg-white border border-[#EEEAE4] text-[#182525]/70 hover:text-[#182525]'
                }`}
              >
                Todos os Destinos
              </button>
              <button
                onClick={() => setSelectedDestination('Chile')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedDestination === 'Chile' ? 'bg-[#1FB8B5] text-white shadow-md' : 'bg-white border border-[#EEEAE4] text-[#182525]/70 hover:text-[#182525]'
                }`}
              >
                Chile
              </button>
              <button
                onClick={() => setSelectedDestination('Peru')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedDestination === 'Peru' ? 'bg-[#1FB8B5] text-white shadow-md' : 'bg-white border border-[#EEEAE4] text-[#182525]/70 hover:text-[#182525]'
                }`}
              >
                Peru
              </button>
              <button
                onClick={() => setSelectedDestination('Bolívia')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedDestination === 'Bolívia' ? 'bg-[#1FB8B5] text-white shadow-md' : 'bg-white border border-[#EEEAE4] text-[#182525]/70 hover:text-[#182525]'
                }`}
              >
                Bolívia
              </button>
              <button
                onClick={() => setSelectedDestination('Argentina')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedDestination === 'Argentina' ? 'bg-[#1FB8B5] text-white shadow-md' : 'bg-white border border-[#EEEAE4] text-[#182525]/70 hover:text-[#182525]'
                }`}
              >
                Argentina
              </button>
              <button
                onClick={() => setSelectedDestination('Colômbia')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedDestination === 'Colômbia' ? 'bg-[#1FB8B5] text-white shadow-md' : 'bg-white border border-[#EEEAE4] text-[#182525]/70 hover:text-[#182525]'
                }`}
              >
                Colômbia
              </button>
            </div>

            {/* Busca */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por nome..."
                className="w-full bg-white border border-[#EEEAE4] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#1FB8B5]"
              />
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            </div>
          </div>

          {/* Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
              {categoryProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  locale={locale}
                  onOpenDetail={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#EEEAE4] p-6 mb-16">
              <p className="text-base font-bold text-[#182525] mb-2">Nenhuma opção encontrada com este filtro.</p>
              <button onClick={() => { setSelectedDestination(''); setSearchQuery(''); }} className="btn-primary px-4 py-2 text-xs">
                Limpar filtros
              </button>
            </div>
          )}

          {/* FAQ da Categoria */}
          <div className="bg-white rounded-3xl p-8 border border-[#EEEAE4] shadow-sm max-w-3xl mx-auto my-12">
            <h3 className="text-xl font-bold text-[#182525] mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-outfit)' }}>
              <i className="bi bi-question-circle-fill text-[#1FB8B5]" />
              Dúvidas Frequentes sobre {cfg.badge}
            </h3>
            <div className="space-y-4">
              {cfg.faq.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F8F7F3] border border-[#EEEAE4]">
                  <h4 className="font-bold text-sm text-[#182525] mb-1">{item.q}</h4>
                  <p className="text-xs sm:text-sm text-[#182525]/75 font-light leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>

            {/* CTA WhatsApp */}
            <div className="mt-8 text-center pt-6 border-t border-[#EEEAE4]">
              <p className="text-xs text-[#182525]/60 mb-3">Precisa de um roteiro personalizado ou condições para grupos?</p>
              <a
                href={buildSimpleWhatsAppUrl(`Olá! Gostaria de tirar dúvidas sobre ${cfg.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
              >
                <i className="bi bi-whatsapp text-lg" />
                <span>Falar com Consultor no WhatsApp</span>
              </a>
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
