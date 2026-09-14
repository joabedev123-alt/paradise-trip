'use client';

import { motion } from 'framer-motion';
import { Locale, getTranslation } from '@/lib/i18n';
import { useState } from 'react';

interface HeroProps {
  locale: Locale;
  onSearch: (filters: { destination: string; category: string }) => void;
  selectedCategory: string;
  selectedDestination: string;
}

export default function Hero({ locale, onSearch, selectedCategory, selectedDestination }: HeroProps) {
  const t = getTranslation(locale);
  const [dest, setDest] = useState(selectedDestination);
  const [cat, setCat] = useState(selectedCategory);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination: dest, category: cat });
    const target = document.getElementById('experiencias');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] min-h-[92dvh] flex items-center justify-center pt-28 sm:pt-32 pb-16 overflow-hidden">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-principal.jpg"
          alt="Paisagens da América do Sul"
          className="w-full h-full object-cover scale-105"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#182525]/80 via-[#182525]/50 to-[#F8F7F3]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#182525]/90 via-transparent to-[#182525]/70" />
      </div>

      <div className="container-pad relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#1FB8B5] animate-ping" />
            <span>Paradise Trip Viagens • Especialistas na América do Sul</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Escolha o que você <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FB8B5] via-[#45dedb] to-white">
              quer viver.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/80 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* Search Bar / Filter Panel */}
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass rounded-3xl p-3 sm:p-4 shadow-2xl max-w-3xl mx-auto border border-white/40 text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center">
              {/* Destination selector */}
              <div className="sm:col-span-4 p-2 sm:p-3 rounded-2xl bg-white/80 border border-[#EEEAE4] flex items-center gap-3">
                <i className="bi bi-geo-alt text-[#1FB8B5] text-xl shrink-0" />
                <div className="w-full">
                  <label className="block text-[10px] uppercase font-bold text-[#182525]/50 tracking-wider">
                    {t.searchDestination}
                  </label>
                  <select
                    value={dest}
                    onChange={(e) => setDest(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-[#182525] focus:outline-none cursor-pointer"
                  >
                    <option value="">Todos os Destinos</option>
                    <option value="San Pedro de Atacama">Atacama (Chile)</option>
                    <option value="Cusco">Cusco & Machu Picchu (Peru)</option>
                    <option value="Uyuni">Salar de Uyuni (Bolívia)</option>
                  </select>
                </div>
              </div>

              {/* Category selector */}
              <div className="sm:col-span-4 p-2 sm:p-3 rounded-2xl bg-white/80 border border-[#EEEAE4] flex items-center gap-3">
                <i className="bi bi-compass text-[#1FB8B5] text-xl shrink-0" />
                <div className="w-full">
                  <label className="block text-[10px] uppercase font-bold text-[#182525]/50 tracking-wider">
                    {t.searchCategory}
                  </label>
                  <select
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-[#182525] focus:outline-none cursor-pointer"
                  >
                    <option value="all">{t.filterAll}</option>
                    <option value="tours">{t.filterTours}</option>
                    <option value="packages">{t.filterPackages}</option>
                    <option value="transfers">{t.filterTransfers}</option>
                    <option value="experiences">{t.filterExperiences}</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <div className="sm:col-span-4 flex items-center">
                <button
                  type="submit"
                  className="btn-primary w-full h-[52px] px-6 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-[#1FB8B5]/30 cursor-pointer"
                >
                  <i className="bi bi-search text-base" />
                  <span>{t.searchButton}</span>
                </button>
              </div>
            </div>
          </motion.form>

          {/* Quick pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-6 text-xs text-white/70"
          >
            <span>Destaques rápidos:</span>
            <button
              onClick={() => {
                setDest('San Pedro de Atacama');
                onSearch({ destination: 'San Pedro de Atacama', category: 'all' });
                document.getElementById('experiencias')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              🏔️ Deserto do Atacama
            </button>
            <button
              onClick={() => {
                setDest('Cusco');
                onSearch({ destination: 'Cusco', category: 'all' });
                document.getElementById('experiencias')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              🏛️ Machu Picchu
            </button>
            <button
              onClick={() => {
                setDest('Uyuni');
                onSearch({ destination: 'Uyuni', category: 'all' });
                document.getElementById('experiencias')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              ✨ Salar de Uyuni
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
