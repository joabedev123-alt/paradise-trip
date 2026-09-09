import CategoryPageView from '@/components/CategoryPageView';
import { Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const loc: Locale = (resolved.locale === 'es' || resolved.locale === 'en') ? resolved.locale : 'pt';
  return <CategoryPageView category="packages" locale={loc} />;
}
