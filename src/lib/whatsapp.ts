import { TripItem } from '@/lib/store';
import { Locale, getTranslation } from '@/lib/i18n';

const WHATSAPP_NUMBER = '51964308714';

export function buildWhatsAppUrl(items: TripItem[], locale: Locale): string {
  const t = getTranslation(locale);
  
  const lines: string[] = [];
  lines.push(t.waGreeting);
  lines.push('');

  if (items.length > 0) {
    const destinations = [...new Set(items.map((i) => i.destination))].join(', ');
    lines.push(`*${t.waDestination}:* ${destinations}`);
    
    const adultsCount = items.reduce((max, i) => Math.max(max, i.adults), 0);
    const childrenCount = items.reduce((max, i) => Math.max(max, i.children), 0);
    let travelersStr = `${adultsCount} ${t.adults}`;
    if (childrenCount > 0) travelersStr += `, ${childrenCount} ${t.children}`;
    lines.push(`*${t.waTravelers}:* ${travelersStr}`);
    lines.push('');
    lines.push(`*${t.waExperiences}:*`);
    
    items.forEach((item, idx) => {
      const name = locale === 'es' ? (item.nameEs || item.name) : locale === 'en' ? (item.nameEn || item.name) : item.name;
      lines.push(`${idx + 1}. ${name}`);
      if (item.date) lines.push(`   ${t.waDate}: ${item.date}`);
      if (item.time) lines.push(`   ${t.waTime}: ${item.time}`);
    });
    
    lines.push('');
    lines.push(t.waRequest);
  }

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function buildSimpleWhatsAppUrl(message?: string): string {
  const encoded = encodeURIComponent(message || '');
  return `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encoded}` : ''}`;
}
