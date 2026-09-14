'use client';

import { motion } from 'framer-motion';
import { Locale, getTranslation } from '@/lib/i18n';
import { buildSimpleWhatsAppUrl } from '@/lib/whatsapp';

interface AboutSectionProps {
  locale: Locale;
}

export default function AboutSection({ locale }: AboutSectionProps) {
  const t = getTranslation(locale);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-pad">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Images collage */}
          <div className="lg:col-span-6 relative mx-auto max-w-sm lg:max-w-none lg:mx-0">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] max-h-[560px]">
              <img
                src="/images/sobre-paradise-trip.jpg"
                alt="Equipe Paradise Trip Viagens no Peru"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Small floating badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 z-20 glass p-4 sm:p-5 rounded-2xl shadow-xl border border-white/60 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg shrink-0">
                  <i className="bi bi-shield-check" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#182525]">Suporte e Segurança</p>
                  <p className="text-[11px] text-[#182525]/60">Acompanhamento humanizado em todas as etapas da viagem.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1FB8B5]/10 text-[#107C79] text-xs font-bold uppercase tracking-wider">
              <i className="bi bi-stars" />
              {t.aboutTag}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#182525] leading-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              Você escolhe o que quer viver.{' '}
              <span className="text-[#1FB8B5]">Nós fazemos acontecer.</span>
            </h2>

            <div className="text-[#182525]/80 text-base sm:text-lg font-light leading-relaxed space-y-3">
              {t.aboutText.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#182525]">
                <i className="bi bi-check-circle-fill text-[#1FB8B5]" />
                <span>Guias bilíngues credenciados</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#182525]">
                <i className="bi bi-check-circle-fill text-[#1FB8B5]" />
                <span>Transfers pontuais e privativos</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#182525]">
                <i className="bi bi-check-circle-fill text-[#1FB8B5]" />
                <span>Roteiros testados e aprovados</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#182525]">
                <i className="bi bi-check-circle-fill text-[#1FB8B5]" />
                <span>Atendimento ágil via WhatsApp</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a
                href={buildSimpleWhatsAppUrl('Olá! Gostaria de planejar uma viagem com a equipe da Paradise Trip.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-6 py-3.5 text-sm inline-flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <i className="bi bi-whatsapp text-lg" />
                <span>Falar com um Especialista</span>
              </a>

              <a
                href="#experiencias"
                className="btn-secondary px-6 py-3.5 text-sm inline-flex items-center gap-2"
              >
                <span>Ver Roteiros Disponíveis</span>
                <i className="bi bi-arrow-down-short text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
