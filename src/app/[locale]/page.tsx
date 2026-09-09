import MainShowcase from '@/components/MainShowcase';
import { Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale: Locale = (resolvedParams.locale === 'es' || resolvedParams.locale === 'en')
    ? resolvedParams.locale
    : 'pt';

  return <MainShowcase initialLocale={locale} />;
}
