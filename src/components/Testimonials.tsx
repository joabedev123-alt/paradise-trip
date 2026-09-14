'use client';

import { motion } from 'framer-motion';
import { Locale, getTranslation } from '@/lib/i18n';

interface TestimonialsProps {
  locale: Locale;
}

interface Testimonial {
  initials: string;
  name: string;
  location: string;
  trip: { pt: string; es: string; en: string };
  quote: { pt: string; es: string; en: string };
}

const testimonials: Testimonial[] = [
  {
    initials: 'MC',
    name: 'Mariana Costa',
    location: 'São Paulo, Brasil',
    trip: { pt: 'Pacote Cores do Peru', es: 'Paquete Colores del Perú', en: 'Colors of Peru Package' },
    quote: {
      pt: 'A Paradise Trip cuidou de cada detalhe da nossa viagem a Cusco e Machu Picchu. O guia era incrível e nos sentimos seguros o tempo todo.',
      es: 'Paradise Trip cuidó cada detalle de nuestro viaje a Cusco y Machu Picchu. El guía fue increíble y nos sentimos seguros en todo momento.',
      en: 'Paradise Trip took care of every detail of our trip to Cusco and Machu Picchu. Our guide was amazing and we felt safe the whole time.',
    },
  },
  {
    initials: 'RA',
    name: 'Rafael Andrade',
    location: 'Rio de Janeiro, Brasil',
    trip: { pt: 'Atacama Essencial', es: 'Atacama Esencial', en: 'Essential Atacama' },
    quote: {
      pt: 'O Deserto do Atacama superou todas as expectativas. O tour de astronomia foi mágico e a equipe respondeu rapidinho no WhatsApp.',
      es: 'El Desierto de Atacama superó todas las expectativas. El tour de astronomía fue mágico y el equipo respondió muy rápido por WhatsApp.',
      en: 'The Atacama Desert exceeded every expectation. The stargazing tour was magical and the team replied on WhatsApp almost instantly.',
    },
  },
  {
    initials: 'CB',
    name: 'Camila & Bruno Ferreira',
    location: 'Belo Horizonte, Brasil',
    trip: { pt: 'Expedição Salar de Uyuni', es: 'Expedición Salar de Uyuni', en: 'Salar de Uyuni Expedition' },
    quote: {
      pt: 'Ver o Salar de Uyuni virar um espelho infinito foi um sonho realizado. Roteiro muito bem organizado do início ao fim.',
      es: 'Ver el Salar de Uyuni convertirse en un espejo infinito fue un sueño hecho realidad. Itinerario muy bien organizado de principio a fin.',
      en: 'Watching the Salar de Uyuni turn into an endless mirror was a dream come true. The itinerary was extremely well organized from start to finish.',
    },
  },
  {
    initials: 'JM',
    name: 'Juliana Martins',
    location: 'Curitiba, Brasil',
    trip: { pt: 'Patagônia dos Glaciares', es: 'Patagonia de los Glaciares', en: 'Patagonia Glaciers' },
    quote: {
      pt: 'Contratamos o pacote para a Patagônia e foi impecável. O Glaciar Perito Moreno de perto é indescritível, recomendo demais a Paradise Trip.',
      es: 'Contratamos el paquete a la Patagonia y fue impecable. El Glaciar Perito Moreno de cerca es indescriptible, recomiendo muchísimo a Paradise Trip.',
      en: 'We booked the Patagonia package and it was flawless. Seeing the Perito Moreno Glacier up close is indescribable — I highly recommend Paradise Trip.',
    },
  },
];

export default function Testimonials({ locale }: TestimonialsProps) {
  const t = getTranslation(locale);

  return (
    <section className="py-20 bg-[#EEEAE4]/40 border-y border-[#EEEAE4]">
      <div className="container-pad">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#107C79] block mb-2">
            {t.testimonialsKicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182525]">
            {t.testimonialsTitle}
          </h2>
          <p className="text-[#182525]/70 text-sm sm:text-base font-light mt-3 max-w-xl mx-auto">
            {t.testimonialsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative p-7 rounded-3xl bg-white border border-[#EEEAE4] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <i className="bi bi-quote text-3xl text-[#1FB8B5]/15 absolute top-5 right-6" />

              <div className="flex items-center gap-0.5 mb-4 text-[#1FB8B5]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-sm" />
                ))}
              </div>

              <p className="text-[#182525]/80 text-sm font-light leading-relaxed flex-1">
                “{item.quote[locale]}”
              </p>

              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[#EEEAE4]">
                <div className="w-11 h-11 rounded-full bg-[#1FB8B5]/10 text-[#107C79] flex items-center justify-center font-bold text-sm shrink-0">
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#182525] truncate">{item.name}</p>
                  <p className="text-xs text-[#182525]/60 truncate">
                    {item.location} • {item.trip[locale]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
