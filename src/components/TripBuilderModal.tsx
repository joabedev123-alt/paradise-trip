'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Locale, getTranslation } from '@/lib/i18n';
import { useTripStore } from '@/lib/store';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useState } from 'react';

interface TripBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export default function TripBuilderModal({ isOpen, onClose, locale }: TripBuilderModalProps) {
  const t = getTranslation(locale);
  const { items, removeItem, clearTrip, updateItem } = useTripStore();
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    // Atualiza número de adultos/crianças nos itens se necessário
    const enrichedItems = items.map((i) => ({
      ...i,
      adults: adultsCount,
      children: childrenCount,
    }));
    const url = buildWhatsAppUrl(enrichedItems, locale);
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex justify-end">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Drawer panel */}
        <motion.div
          className="relative w-full max-w-md bg-white h-full z-10 shadow-2xl flex flex-col"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        >
          {/* Header */}
          <div className="p-5 border-b border-[#EEEAE4] flex items-center justify-between shrink-0 bg-[#F8F7F3]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1FB8B5] text-white flex items-center justify-center">
                <i className="bi bi-suitcase2 text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#182525]" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {t.myTrip}
                </h3>
                <p className="text-xs text-[#182525]/60">
                  {items.length} {t.experiences_count}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-black/5 flex items-center justify-center text-[#182525]/60 hover:text-[#182525] transition-colors"
              aria-label="Fechar"
            >
              <i className="bi bi-x-lg text-lg" />
            </button>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#1FB8B5]/10 text-[#1FB8B5] flex items-center justify-center text-3xl mx-auto mb-4">
                  <i className="bi bi-compass" />
                </div>
                <h4 className="font-bold text-lg text-[#182525] mb-2">{t.myTripEmpty}</h4>
                <p className="text-sm text-[#182525]/60 mb-6 font-light max-w-xs mx-auto">
                  {t.myTripSubtitle}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    document.getElementById('experiencias')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary px-5 py-2.5 text-sm cursor-pointer"
                >
                  {t.myTripEmptyCta}
                </button>
              </div>
            ) : (
              <>
                {/* Travelers Settings */}
                <div className="p-4 rounded-2xl bg-[#F8F7F3] border border-[#EEEAE4]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#182525]/60 mb-3">
                    {t.travelers}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#EEEAE4]">
                      <div>
                        <span className="block text-xs font-medium text-[#182525]">Adultos</span>
                        <span className="text-[10px] text-[#182525]/50">+12 anos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                          className="w-7 h-7 rounded-lg bg-[#EEEAE4] text-xs font-bold hover:bg-[#1FB8B5] hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{adultsCount}</span>
                        <button
                          type="button"
                          onClick={() => setAdultsCount(adultsCount + 1)}
                          className="w-7 h-7 rounded-lg bg-[#EEEAE4] text-xs font-bold hover:bg-[#1FB8B5] hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#EEEAE4]">
                      <div>
                        <span className="block text-xs font-medium text-[#182525]">Crianças</span>
                        <span className="text-[10px] text-[#182525]/50">0 a 11 anos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-7 h-7 rounded-lg bg-[#EEEAE4] text-xs font-bold hover:bg-[#1FB8B5] hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{childrenCount}</span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(childrenCount + 1)}
                          className="w-7 h-7 rounded-lg bg-[#EEEAE4] text-xs font-bold hover:bg-[#1FB8B5] hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {items.map((item, idx) => {
                    const itemName = locale === 'es' ? (item.nameEs || item.name) : locale === 'en' ? (item.nameEn || item.name) : item.name;
                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-white border border-[#EEEAE4] shadow-sm flex items-center gap-3 relative group"
                      >
                        <img
                          src={item.image}
                          alt={itemName}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0 pr-6">
                          <span className="text-[10px] uppercase font-bold text-[#1FB8B5] block truncate">
                            {item.destination}
                          </span>
                          <h5 className="text-xs sm:text-sm font-bold text-[#182525] truncate">
                            {itemName}
                          </h5>
                          <span className="text-[11px] text-[#182525]/60 flex items-center gap-1 mt-0.5">
                            <i className="bi bi-clock text-[10px]" />
                            {item.duration || 'Duração flexível'}
                          </span>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title={t.remove}
                          aria-label={t.remove}
                        >
                          <i className="bi bi-trash text-sm" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Clear all */}
                <div className="text-right">
                  <button
                    onClick={clearTrip}
                    className="text-xs text-rose-500 hover:text-rose-700 font-medium underline cursor-pointer"
                  >
                    Limpar todas as seleções
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer Action with WhatsApp */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EEEAE4] bg-[#F8F7F3] space-y-3 shrink-0">
              <div className="flex items-center justify-between text-xs text-[#182525]/70">
                <span>{t.estimatedSubtotal}:</span>
                <span className="font-semibold text-emerald-700">{t.pricesOnRequest}</span>
              </div>

              <button
                onClick={handleSendWhatsApp}
                className="btn-whatsapp w-full py-3.5 px-4 flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <i className="bi bi-whatsapp text-lg" />
                <span>{t.requestTrip}</span>
              </button>

              <p className="text-[11px] text-center text-[#182525]/50 leading-tight">
                Você será direcionado diretamente ao WhatsApp de nossa equipe com todas as experiências organizadas.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
