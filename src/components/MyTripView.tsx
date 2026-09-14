'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale, getTranslation } from '@/lib/i18n';
import { useTripStore } from '@/lib/store';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

interface MyTripViewProps {
  locale: Locale;
}

export default function MyTripView({ locale }: MyTripViewProps) {
  const t = getTranslation(locale);
  const { items, removeItem, clearTrip, updateItem } = useTripStore();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleSendWhatsApp = () => {
    const enrichedItems = items.map((i) => ({
      ...i,
      adults,
      children,
    }));
    const url = buildWhatsAppUrl(enrichedItems, locale);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#182525]">
      <Navbar locale={locale} />

      <main className="flex-1 pt-36 pb-20">
        <div className="container-pad max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#107C79] hover:text-[#1FB8B5] transition-colors mb-3"
            >
              <i className="bi bi-arrow-left" />
              <span>{t.continueExploring}</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#182525]" style={{ fontFamily: 'var(--font-outfit)' }}>
              {t.myTripTitle}
            </h1>
            <p className="text-[#182525]/70 text-sm sm:text-base font-light mt-1">
              {t.myTripSubtitle}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#EEEAE4] shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[#1FB8B5]/10 text-[#1FB8B5] flex items-center justify-center text-4xl mx-auto mb-4">
                <i className="bi bi-suitcase2" />
              </div>
              <h2 className="text-2xl font-bold text-[#182525] mb-2">{t.myTripEmpty}</h2>
              <p className="text-sm text-[#182525]/60 mb-6 max-w-md mx-auto font-light">
                Explore nosso catálogo de experiências incríveis pelo Atacama, Machu Picchu, Uyuni e monte o roteiro dos seus sonhos.
              </p>
              <Link href={`/${locale}#experiencias`} className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm">
                <i className="bi bi-compass" />
                <span>{t.myTripEmptyCta}</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Items */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#182525]/60">
                    {t.yourSelection} ({items.length} {t.experiences_count})
                  </h3>
                  <button
                    onClick={clearTrip}
                    className="text-xs text-rose-500 hover:text-rose-700 font-medium underline"
                  >
                    Limpar tudo
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item, idx) => {
                    const itemName = locale === 'es' ? (item.nameEs || item.name) : locale === 'en' ? (item.nameEn || item.name) : item.name;
                    return (
                      <div
                        key={item.id}
                        className="bg-white p-4 sm:p-5 rounded-3xl border border-[#EEEAE4] shadow-sm flex flex-col sm:flex-row gap-4 relative group"
                      >
                        <img
                          src={item.image}
                          alt={itemName}
                          className="w-full sm:w-28 h-28 rounded-2xl object-cover shrink-0"
                        />

                        <div className="flex-1 min-w-0 pr-8">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1FB8B5]">
                            {item.destination}, {item.country}
                          </span>
                          <h4 className="text-base font-bold text-[#182525] leading-snug mt-0.5">
                            {itemName}
                          </h4>
                          <p className="text-xs text-[#182525]/60 mt-1 flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <i className="bi bi-clock text-[#1FB8B5]" />
                              {item.duration || 'Flexível'}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="bi bi-tag-fill text-[#1FB8B5]" />
                              {item.price ? `US$ ${item.price}` : 'Consulte valores'}
                            </span>
                          </p>

                          {/* Data ou observação customizada */}
                          <div className="mt-3 flex items-center gap-2">
                            <input
                              type="date"
                              value={item.date || ''}
                              onChange={(e) => updateItem(item.id, { date: e.target.value })}
                              className="text-xs px-2.5 py-1.5 rounded-lg border border-[#EEEAE4] bg-[#F8F7F3] text-[#182525]"
                            />
                            <span className="text-[11px] text-[#182525]/50">Data pretendida</span>
                          </div>
                        </div>

                        {/* Botão de excluir */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 transition-colors p-2 -m-1"
                          title={t.remove}
                        >
                          <i className="bi bi-trash3 text-base" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Resumo & WhatsApp */}
              <div className="lg:col-span-4">
                <div className="bg-white p-6 rounded-3xl border border-[#EEEAE4] shadow-sm space-y-6 lg:sticky lg:top-28">
                  <h4 className="text-base font-bold text-[#182525] border-b border-[#EEEAE4] pb-3" style={{ fontFamily: 'var(--font-outfit)' }}>
                    Resumo da Viagem
                  </h4>

                  {/* Viajantes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#182525]/60 mb-2">
                      {t.travelers}
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8F7F3] border border-[#EEEAE4]">
                        <span className="text-xs font-medium">Adultos (+12 anos)</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-9 h-9 rounded-lg bg-white border border-[#EEEAE4] text-sm font-bold active:scale-95 transition-transform"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{adults}</span>
                          <button
                            onClick={() => setAdults(adults + 1)}
                            className="w-9 h-9 rounded-lg bg-white border border-[#EEEAE4] text-sm font-bold active:scale-95 transition-transform"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8F7F3] border border-[#EEEAE4]">
                        <span className="text-xs font-medium">Crianças (0-11 anos)</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-9 h-9 rounded-lg bg-white border border-[#EEEAE4] text-sm font-bold active:scale-95 transition-transform"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{children}</span>
                          <button
                            onClick={() => setChildren(children + 1)}
                            className="w-9 h-9 rounded-lg bg-white border border-[#EEEAE4] text-sm font-bold active:scale-95 transition-transform"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detalhes de preço */}
                  <div className="p-3 rounded-2xl bg-[#EEEAE4]/40 text-xs text-[#182525]/70 space-y-1">
                    <div className="flex justify-between font-semibold text-[#182525]">
                      <span>{t.estimatedSubtotal}:</span>
                      <span className="text-emerald-700">Sob consulta</span>
                    </div>
                    <p className="text-[11px] text-[#182525]/60 pt-1">
                      {t.pricesOnRequest}
                    </p>
                  </div>

                  {/* Enviar WhatsApp */}
                  <button
                    onClick={handleSendWhatsApp}
                    className="btn-whatsapp w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 text-sm font-bold shadow-lg shadow-emerald-500/25 cursor-pointer"
                  >
                    <i className="bi bi-whatsapp text-lg" />
                    <span>{t.requestTrip}</span>
                  </button>

                  <Link
                    href={`/${locale}#experiencias`}
                    className="btn-secondary w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold"
                  >
                    <span>{t.continueExploring}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer locale={locale} />
      <FloatingWhatsApp />
    </div>
  );
}
