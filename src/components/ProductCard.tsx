'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { Locale, getTranslation } from '@/lib/i18n';
import { useTripStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  locale: Locale;
  onOpenDetail: (product: Product) => void;
}

export default function ProductCard({ product, locale, onOpenDetail }: ProductCardProps) {
  const t = getTranslation(locale);
  const { addItem, removeItem, hasItem } = useTripStore();
  const inTrip = hasItem(product.id);

  const title = locale === 'es' ? (product.nameEs || product.name) : locale === 'en' ? (product.nameEn || product.name) : product.name;
  const desc = locale === 'es' ? (product.descriptionEs || product.description) : locale === 'en' ? (product.descriptionEn || product.description) : product.description;

  const badgeLabels: Record<string, { label: string; bg: string }> = {
    popular: { label: '🔥 Mais Procurado', bg: 'bg-[#A36642] text-white' },
    recommended: { label: '⭐ Recomendado', bg: 'bg-[#1FB8B5] text-white' },
    new: { label: '✨ Novidade', bg: 'bg-[#182525] text-white' },
    sale: { label: '🏷️ Oferta', bg: 'bg-emerald-600 text-white' },
  };

  const currentBadge = product.badge ? badgeLabels[product.badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className="group bg-white rounded-3xl overflow-hidden border border-[#EEEAE4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full card-hover"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#182525]/5 cursor-pointer" onClick={() => onOpenDetail(product)}>
        <Image
          src={product.image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="img-overlay" />

        {/* Badges top left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {currentBadge && (
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${currentBadge.bg}`}>
              {currentBadge.label}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/85 text-[#182525] backdrop-blur-md shadow-sm">
            {product.destination}
          </span>
        </div>

        {/* Country flag / name top right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 rounded-full text-[11px] font-medium bg-[#182525]/70 text-white backdrop-blur-md">
            {product.country}
          </span>
        </div>

        {/* Duration bottom left */}
        {product.duration && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-white text-xs font-medium bg-[#182525]/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
            <i className="bi bi-clock text-[#1FB8B5]" />
            <span>{product.duration}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Status */}
          <div className="flex items-center justify-between text-xs text-[#182525]/60 mb-2">
            <span className="uppercase tracking-wider font-semibold text-[#1FB8B5]">
              {product.category}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <span className={`w-2 h-2 rounded-full ${product.availability === 'available' ? 'bg-emerald-500' : product.availability === 'few-spots' ? 'bg-amber-500' : 'bg-slate-400'}`} />
              {product.availability === 'available' ? t.available : product.availability === 'few-spots' ? t.fewSpots : t.onRequest}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenDetail(product)}
            className="text-lg font-bold text-[#182525] mb-2 leading-snug group-hover:text-[#1FB8B5] transition-colors cursor-pointer line-clamp-1"
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-[#182525]/70 text-sm font-light leading-relaxed line-clamp-2 mb-4">
            {desc}
          </p>
        </div>

        {/* Actions & Price */}
        <div className="pt-4 border-t border-[#EEEAE4] flex items-center justify-between gap-2">
          <div>
            <span className="block text-[11px] text-[#182525]/50 leading-none mb-1">
              {t.from}
            </span>
            <span className="text-sm font-bold text-[#182525]">
              {product.price ? `US$ ${product.price}` : t.consultPrice}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onOpenDetail(product)}
              className="p-2.5 rounded-xl text-[#182525]/70 hover:text-[#182525] hover:bg-[#EEEAE4] transition-colors"
              title={t.viewDetails}
              aria-label={t.viewDetails}
            >
              <i className="bi bi-eye text-lg" />
            </button>

            <button
              onClick={() => {
                if (inTrip) {
                  removeItem(product.id);
                } else {
                  addItem(product);
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                inTrip
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'btn-primary'
              }`}
            >
              <i className={`bi ${inTrip ? 'bi-check-lg' : 'bi-plus-lg'} text-sm`} />
              <span>{inTrip ? t.addedToTrip : t.addToTrip}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
