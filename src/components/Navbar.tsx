'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale, locales, getTranslation } from '@/lib/i18n';
import { useTripStore } from '@/lib/store';
import { buildSimpleWhatsAppUrl } from '@/lib/whatsapp';

interface NavbarProps {
  locale: Locale;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = getTranslation(locale);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { items } = useTripStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    localStorage.setItem('paradise-locale', newLocale);
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setLangOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: `/${locale}` },
    { label: t.destinations, href: `/${locale}/destinos` },
    { label: t.tours, href: `/${locale}/passeios` },
    { label: t.packages, href: `/${locale}/pacotes` },
    { label: t.transfers, href: `/${locale}/transfers` },
    { label: t.experiences, href: `/${locale}/experiencias` },
  ];

  const localeLabels: Record<Locale, string> = { pt: 'PT', es: 'ES', en: 'EN' };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container-pad">
          <div className="flex items-center justify-between h-20 md:h-28">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0 group py-2">
              <img
                src="/logo002.png"
                alt="Paradise Trip Viagens"
                className="h-16 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    scrolled
                      ? 'text-[#182525]/70 hover:text-[#182525] hover:bg-[#EEEAE4]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                className={`hidden md:flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                  scrolled ? 'text-[#182525]/70 hover:bg-[#EEEAE4]' : 'text-white/80 hover:bg-white/10'
                }`}
                aria-label={t.search}
              >
                <i className="bi bi-search text-base" />
              </button>

              {/* Language switcher */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
                    scrolled ? 'text-[#182525]/70 hover:bg-[#EEEAE4]' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <i className="bi bi-globe2 text-sm" />
                  {localeLabels[locale]}
                  <i className={`bi bi-chevron-down text-[10px] transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl border border-[#EEEAE4] overflow-hidden"
                    >
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => switchLocale(loc)}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                            loc === locale
                              ? 'bg-[#1FB8B5]/10 text-[#1FB8B5] font-semibold'
                              : 'text-[#182525]/70 hover:bg-[#F8F7F3] hover:text-[#182525]'
                          }`}
                        >
                          <i className="bi bi-globe2 text-xs opacity-60" />
                          {loc === 'pt' ? 'Português' : loc === 'es' ? 'Español' : 'English'}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* My Trip */}
              <Link
                href={`/${locale}/minha-viagem`}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl btn-primary text-sm"
              >
                <i className="bi bi-suitcase2 text-base" />
                <span>{t.myTrip}</span>
                {items.length > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/25 text-white text-xs font-bold">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className={`md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                  scrolled ? 'text-[#182525]' : 'text-white'
                }`}
                aria-label={t.menu}
              >
                <i className="bi bi-list text-xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-white z-[70] md:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-[#EEEAE4]">
                <Link href={`/${locale}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                  <img
                    src="/logo002.png"
                    alt="Paradise Trip Viagens"
                    className="h-14 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#182525]/60 hover:bg-[#F8F7F3]"
                >
                  <i className="bi bi-x-lg" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <nav className="flex flex-col gap-1 mb-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#182525]/70 hover:text-[#182525] hover:bg-[#F8F7F3] transition-colors font-medium"
                    >
                      <i className="bi bi-arrow-right text-[#1FB8B5] text-sm" />
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Idiomas mobile */}
                <div className="mb-6">
                  <p className="text-xs text-[#182525]/40 uppercase tracking-widest font-semibold mb-3 px-4">
                    Idioma
                  </p>
                  <div className="flex gap-2 px-4">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { switchLocale(loc); setMobileOpen(false); }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          loc === locale
                            ? 'bg-[#1FB8B5] text-white'
                            : 'bg-[#F8F7F3] text-[#182525]/60 hover:bg-[#EEEAE4]'
                        }`}
                      >
                        {loc.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-[#EEEAE4] flex flex-col gap-3">
                <Link
                  href={`/${locale}/minha-viagem`}
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary flex items-center justify-center gap-2 py-3 text-sm"
                >
                  <i className="bi bi-suitcase2" />
                  {t.myTrip}
                  {items.length > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/25 text-xs font-bold">
                      {items.length}
                    </span>
                  )}
                </Link>
                <a
                  href={buildSimpleWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex items-center justify-center gap-2 py-3 text-sm"
                >
                  <i className="bi bi-whatsapp" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Click outside lang dropdown */}
      {langOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
      )}
    </>
  );
}
