'use client';

import Link from 'next/link';
import { Locale, getTranslation } from '@/lib/i18n';
import { buildSimpleWhatsAppUrl } from '@/lib/whatsapp';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = getTranslation(locale);

  return (
    <footer className="bg-[#A36642] text-white pt-16 pb-12 border-t border-white/10">
      <div className="container-pad">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/logo002.png"
                alt="Paradise Trip Viagens"
                className="h-24 md:h-32 w-auto object-contain brightness-105 drop-shadow-md"
              />
            </div>
            <p className="text-white/70 text-sm font-light leading-relaxed max-w-sm">
              Vitrine digital especializada em experiências turísticas inesquecíveis pela América do Sul. Passeios, transfers, pacotes e roteiros sob medida.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={buildSimpleWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1FB8B5] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <i className="bi bi-whatsapp" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1FB8B5] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram" />
              </a>
              <a
                href="mailto:contato@paradisetripviagens.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1FB8B5] text-white flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <i className="bi bi-envelope" />
              </a>
            </div>
          </div>

          {/* Col 2: Destinos */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#1FB8B5] mb-4">
              {t.destinations}
            </h4>
            <ul className="space-y-2 text-sm text-white/70 font-light">
              <li><Link href={`/${locale}/destinos/chile`} className="hover:text-white transition-colors">Deserto do Atacama</Link></li>
              <li><Link href={`/${locale}/destinos/peru`} className="hover:text-white transition-colors">Cusco & Machu Picchu</Link></li>
              <li><Link href={`/${locale}/destinos/bolivia`} className="hover:text-white transition-colors">Salar de Uyuni</Link></li>
              <li><Link href={`/${locale}/destinos/argentina`} className="hover:text-white transition-colors">Patagônia</Link></li>
            </ul>
          </div>

          {/* Col 3: Categorias */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#1FB8B5] mb-4">
              {t.categories}
            </h4>
            <ul className="space-y-2 text-sm text-white/70 font-light">
              <li><Link href={`/${locale}/passeios`} className="hover:text-white transition-colors">{t.filterTours}</Link></li>
              <li><Link href={`/${locale}/pacotes`} className="hover:text-white transition-colors">{t.filterPackages}</Link></li>
              <li><Link href={`/${locale}/transfers`} className="hover:text-white transition-colors">{t.filterTransfers}</Link></li>
              <li><Link href={`/${locale}/experiencias`} className="hover:text-white transition-colors">{t.filterExperiences}</Link></li>
            </ul>
          </div>

          {/* Col 4: Contato & Suporte */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#1FB8B5] mb-4">
              {t.contact}
            </h4>
            <p className="text-xs text-white/70 font-light leading-relaxed mb-3">
              Atendimento personalizado para montagem de roteiros e suporte aos viajantes.
            </p>
            <a
              href={buildSimpleWhatsAppUrl('Olá equipe Paradise Trip!')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              <i className="bi bi-chat-dots-fill" />
              <span>Fale pelo WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Paradise Trip Viagens. {t.rights}</p>
          
          {/* Produzida com amor por CAMALY */}
          <a
            href="https://camaly.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/70 hover:text-white transition-colors inline-flex items-center gap-1 group py-1"
          >
            <span>Produzida com💚por</span>
            <span className="font-bold text-emerald-400 group-hover:text-emerald-300 group-hover:underline transition-colors">CAMALY</span>
          </a>

          <div className="flex gap-6">
            <span className="hover:text-white/80 cursor-pointer">{t.privacy}</span>
            <span className="hover:text-white/80 cursor-pointer">{t.terms}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
