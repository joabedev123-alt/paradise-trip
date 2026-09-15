'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { Locale, getTranslation } from '@/lib/i18n';
import { useTripStore } from '@/lib/store';
import { buildSimpleWhatsAppUrl } from '@/lib/whatsapp';
import { useState } from 'react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  locale: Locale;
}

export default function ProductDetailModal({ product, onClose, locale }: ProductDetailModalProps) {
  const t = getTranslation(locale);
  const { addItem, hasItem, removeItem } = useTripStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!product) return null;

  const inTrip = hasItem(product.id);
  const title = locale === 'es' ? (product.nameEs || product.name) : locale === 'en' ? (product.nameEn || product.name) : product.name;
  const desc = locale === 'es' ? (product.descriptionEs || product.description) : locale === 'en' ? (product.descriptionEn || product.description) : product.description;
  const currentImage = selectedImg || product.image;

  const availabilityLabels: Record<string, { text: string; bg: string; textCol: string }> = {
    available: { text: t.available, bg: 'bg-emerald-50 border-emerald-200', textCol: 'text-emerald-700' },
    'few-spots': { text: t.fewSpots, bg: 'bg-amber-50 border-amber-200', textCol: 'text-amber-700' },
    unavailable: { text: t.unavailable, bg: 'bg-rose-50 border-rose-200', textCol: 'text-rose-700' },
    'on-request': { text: t.onRequest, bg: 'bg-slate-50 border-slate-200', textCol: 'text-slate-700' },
  };

  const badgeInfo = availabilityLabels[product.availability] || availabilityLabels.available;

  const handleToggleTrip = () => {
    if (inTrip) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const handleWhatsAppContact = () => {
    const text = `Olá! Gostaria de mais informações e disponibilidade sobre o passeio "${title}" em ${product.destination}.`;
    window.open(buildSimpleWhatsAppUrl(text), '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-[#182525]/75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh] max-h-[90dvh]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header Image & Gallery */}
          <div className="relative h-64 sm:h-80 w-full bg-[#182525] shrink-0">
            <Image
              src={currentImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#182525]/80 via-transparent to-black/30" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 flex items-center justify-center transition-colors"
              aria-label="Fechar"
            >
              <i className="bi bi-x-lg text-lg" />
            </button>

            {/* Destination Pill */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-wide flex items-center gap-1.5">
                <i className="bi bi-geo-alt-fill text-[#1FB8B5]" />
                {product.destination}, {product.country}
              </span>
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${badgeInfo.bg} ${badgeInfo.textCol} backdrop-blur-md`}>
                {badgeInfo.text}
              </span>
            </div>

            {/* Title on image bottom */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs uppercase font-medium tracking-widest text-[#1FB8B5] mb-1">
                {product.category.toUpperCase()}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
                {title}
              </h2>
            </div>
          </div>

          {/* Thumbnails if gallery exists */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-2 p-3 bg-[#F8F7F3] border-b border-[#EEEAE4] overflow-x-auto">
              {[product.image, ...product.gallery.filter(g => g !== product.image)].map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(imgUrl)}
                  className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    currentImage === imgUrl ? 'border-[#1FB8B5] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#182525]">
            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-[#F8F7F3] border border-[#EEEAE4]">
                <p className="text-xs text-[#182525]/60 mb-0.5">{t.duration}</p>
                <p className="font-semibold text-sm flex items-center gap-1.5">
                  <i className="bi bi-clock text-[#1FB8B5]" />
                  {product.duration || 'Consulte'}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8F7F3] border border-[#EEEAE4]">
                <p className="text-xs text-[#182525]/60 mb-0.5">Idiomas</p>
                <p className="font-semibold text-sm flex items-center gap-1.5 truncate">
                  <i className="bi bi-translate text-[#1FB8B5]" />
                  {product.languages?.join(', ') || 'PT / ES'}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8F7F3] border border-[#EEEAE4]">
                <p className="text-xs text-[#182525]/60 mb-0.5">Valores</p>
                <p className="font-semibold text-sm text-[#1FB8B5] flex items-center gap-1.5">
                  <i className="bi bi-tag-fill" />
                  {product.price ? `US$ ${product.price}` : t.consultPrice}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8F7F3] border border-[#EEEAE4]">
                <p className="text-xs text-[#182525]/60 mb-0.5">Atendimento</p>
                <p className="font-semibold text-sm text-emerald-600 flex items-center gap-1.5">
                  <i className="bi bi-chat-dots-fill" />
                  Personalizado
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold mb-2">Sobre esta experiência</h3>
              <p className="text-[#182525]/80 leading-relaxed text-sm sm:text-base font-light">
                {desc}
              </p>
            </div>

            {/* Day-by-day itinerary */}
            {product.itinerary && product.itinerary.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <i className="bi bi-map text-[#1FB8B5]" />
                  Roteiro
                </h3>
                <ol className="space-y-2.5">
                  {product.itinerary.map((item) => (
                    <li
                      key={item.day}
                      className="grid grid-cols-[4.5rem_1fr] gap-3 rounded-2xl border border-[#EEEAE4] bg-[#F8F7F3] p-3.5"
                    >
                      <span className="text-xs font-bold uppercase tracking-wide text-[#1FB8B5]">
                        {item.day}
                      </span>
                      <span className="text-sm font-medium leading-relaxed text-[#182525]/85">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* What's included & Not included */}
            <div className="grid sm:grid-cols-2 gap-4">
              {product.includes && product.includes.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <h4 className="text-sm font-bold text-emerald-900 mb-2 flex items-center gap-2">
                    <i className="bi bi-check-circle-fill text-emerald-600" />
                    O que está incluso:
                  </h4>
                  <ul className="space-y-1.5">
                    {product.includes.map((inc, i) => (
                      <li key={i} className="text-xs sm:text-sm text-emerald-950 flex items-start gap-2">
                        <i className="bi bi-check2 text-emerald-600 font-bold shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.notIncludes && product.notIncludes.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100">
                  <h4 className="text-sm font-bold text-rose-900 mb-2 flex items-center gap-2">
                    <i className="bi bi-x-circle-fill text-rose-500" />
                    Não inclui:
                  </h4>
                  <ul className="space-y-1.5">
                    {product.notIncludes.map((ninc, i) => (
                      <li key={i} className="text-xs sm:text-sm text-rose-950 flex items-start gap-2">
                        <i className="bi bi-x text-rose-500 font-bold shrink-0 mt-0.5" />
                        <span>{ninc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {product.closingTitle && product.closingText && (
              <div className="rounded-2xl border border-[#1FB8B5]/25 bg-[#1FB8B5]/10 p-5">
                <h3 className="text-lg font-bold text-[#182525]">{product.closingTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#182525]/75">
                  {product.closingText}
                </p>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#EEEAE4] text-[#182525]/70 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#EEEAE4] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div>
              <p className="text-xs text-[#182525]/60">Dúvidas ou cotação imediata?</p>
              <p className="text-sm font-semibold text-[#182525]">Fale diretamente no WhatsApp</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleWhatsAppContact}
                className="btn-whatsapp px-5 py-3 text-sm flex-1 sm:flex-initial flex items-center justify-center gap-2 font-medium cursor-pointer"
              >
                <i className="bi bi-whatsapp text-lg" />
                <span>{product.ctaLabel || 'Consultar'}</span>
              </button>

              <button
                onClick={handleToggleTrip}
                className={`px-5 py-3 text-sm rounded-xl font-semibold flex-1 sm:flex-initial flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  inTrip
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
                    : 'btn-primary'
                }`}
              >
                <i className={`bi ${inTrip ? 'bi-trash3' : 'bi-plus-circle'}`} />
                <span>{inTrip ? t.remove : t.addToTrip}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
