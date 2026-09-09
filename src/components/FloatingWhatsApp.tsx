'use client';

import { buildSimpleWhatsAppUrl } from '@/lib/whatsapp';

export default function FloatingWhatsApp() {
  return (
    <a
      href={buildSimpleWhatsAppUrl('Olá! Estou navegando no site da Paradise Trip e gostaria de tirar dúvidas.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
      aria-label="Atendimento via WhatsApp"
    >
      <i className="bi bi-whatsapp text-2xl" />
      <span className="hidden sm:inline font-semibold text-sm">Falar no WhatsApp</span>
    </a>
  );
}
