'use client';

import { motion } from 'framer-motion';
import { Locale, getTranslation } from '@/lib/i18n';

interface HowItWorksProps {
  locale: Locale;
}

export default function HowItWorks({ locale }: HowItWorksProps) {
  const t = getTranslation(locale);

  const steps = [
    {
      number: '01',
      title: t.step1,
      desc: 'Explore o Atacama, Cusco, Uyuni e outros cenários deslumbrantes da América do Sul.',
      icon: 'bi-compass',
    },
    {
      number: '02',
      title: t.step2,
      desc: 'Navegue pelos passeios, transfers e pacotes com fotos e detalhes transparentes.',
      icon: 'bi-card-checklist',
    },
    {
      number: '03',
      title: t.step3,
      desc: 'Adicione suas experiências favoritas ao carrinho e personalize o roteiro dos seus sonhos.',
      icon: 'bi-suitcase2',
    },
    {
      number: '04',
      title: t.step4,
      desc: 'Envie sua seleção para nossos consultores no WhatsApp e receba a confirmação com suporte total.',
      icon: 'bi-whatsapp',
    },
  ];

  return (
    <section className="py-20 bg-[#EEEAE4]/40 border-y border-[#EEEAE4]">
      <div className="container-pad">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#107C79] block mb-2">
            Simples, Ágil e Confiável
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182525]">
            {t.howItWorksTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative p-7 rounded-3xl bg-white border border-[#EEEAE4] shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#1FB8B5]/10 flex items-center justify-center text-[#1FB8B5] text-2xl">
                  <i className={`bi ${step.icon}`} />
                </div>
                <span className="text-3xl font-extrabold text-[#182525]/10 font-mono">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#182525] mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>
                {step.title}
              </h3>
              <p className="text-[#182525]/70 text-sm font-light leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
