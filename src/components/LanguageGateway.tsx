'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/lib/i18n';

const LOCALE_STORAGE_KEY = 'paradise-locale';

const languageOptions: { locale: Locale; label: string; sublabel: string; flag: string }[] = [
  { locale: 'pt', label: 'Português', sublabel: 'Continuar em português', flag: 'BR' },
  { locale: 'es', label: 'Español', sublabel: 'Continuar en español', flag: 'ES' },
  { locale: 'en', label: 'English', sublabel: 'Continue in English', flag: 'US' },
];

export default function LanguageGateway() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [selecting, setSelecting] = useState<Locale | null>(null);

  const handleSelect = (locale: Locale) => {
    setSelecting(locale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        router.push(`/${locale}`);
      }, 500);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-principal.jpg"
              alt="Atacama Desert"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#182525]/60 via-[#182525]/50 to-[#182525]/80" />
            <div className="absolute inset-0 bg-[#107C79]/10" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-lg">
            {/* Logo */}
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="flex flex-col items-center gap-3">
                <Image
                  src="/logo002.png"
                  alt="Paradise Trip Viagens"
                  width={160}
                  height={160}
                  className="h-32 md:h-40 w-auto object-contain drop-shadow-2xl mb-2"
                />
                <p className="text-white/80 text-xs tracking-[0.25em] uppercase font-semibold">
                  América do Sul
                </p>
              </div>
            </motion.div>

            {/* Question */}
            <motion.p
              className="text-white/80 text-center text-base md:text-lg mb-8 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Como você deseja explorar a Paradise?
            </motion.p>

            {/* Language Buttons */}
            <motion.div
              className="w-full flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {languageOptions.map((opt, idx) => (
                <motion.button
                  key={opt.locale}
                  onClick={() => handleSelect(opt.locale)}
                  disabled={selecting !== null}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden"
                  style={{
                    background: selecting === opt.locale
                      ? 'rgba(31, 184, 181, 0.3)'
                      : 'rgba(255,255,255,0.08)',
                    border: selecting === opt.locale
                      ? '1.5px solid rgba(31, 184, 181, 0.8)'
                      : '1.5px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <i className="bi bi-globe2 text-[#1FB8B5] text-base" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold text-base" style={{ fontFamily: 'var(--font-outfit)' }}>
                        {opt.label}
                      </p>
                      <p className="text-white/50 text-xs mt-0.5">{opt.sublabel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/30 text-xs font-mono">{opt.flag}</span>
                    <i className="bi bi-arrow-right text-white/40 group-hover:text-[#1FB8B5] group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-[#1FB8B5]/0 group-hover:bg-[#1FB8B5]/8 transition-colors duration-300 pointer-events-none" />
                </motion.button>
              ))}
            </motion.div>

            {/* Bottom tagline */}
            <motion.p
              className="text-white/30 text-xs mt-8 text-center tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              América do Sul • América del Sur • South America
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
