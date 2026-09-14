'use client';

import { motion } from 'framer-motion';
import { destinations } from '@/lib/data';
import { Locale, getTranslation } from '@/lib/i18n';

interface DestinationsSectionProps {
  locale: Locale;
  onSelectCountry: (countryName: string) => void;
}

export default function DestinationsSection({ locale, onSelectCountry }: DestinationsSectionProps) {
  const t = getTranslation(locale);

  return (
    <section id="destinos" className="py-20 bg-white">
      <div className="container-pad">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1FB8B5]/10 text-[#107C79] text-xs font-semibold uppercase tracking-wider mb-3">
            <i className="bi bi-geo-alt" />
            América do Sul
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182525] mb-4">
            {t.destinationsTitle}
          </h2>
          <p className="text-[#182525]/70 text-base font-light">
            {t.destinationsSubtitle}
          </p>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => {
                onSelectCountry(dest.name);
                document.getElementById('experiencias')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#182525]/90 via-[#182525]/30 to-transparent" />

              {/* Tag com contagem */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                  {dest.productCount} experiências
                </span>
              </div>

              {/* Informações na base */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-[#1FB8B5] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {dest.name}
                </h3>
                <p className="text-xs text-white/80 font-light mb-3">
                  {dest.description}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1FB8B5] group-hover:translate-x-1 transition-transform">
                  <span>Explorar roteiros</span>
                  <i className="bi bi-arrow-right" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
