import DestinationsPageView from '@/components/DestinationsPageView';
import { Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string; country: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const loc: Locale = (resolved.locale === 'es' || resolved.locale === 'en') ? resolved.locale : 'pt';
  const c = resolved.country.toLowerCase();
  const countryName = c === 'chile' ? 'Chile' :
                      c === 'peru' ? 'Peru' :
                      c === 'bolivia' ? 'Bolívia' :
                      c === 'argentina' ? 'Argentina' :
                      c === 'colombia' ? 'Colômbia' : 'Chile';
  return <DestinationsPageView locale={loc} activeCountry={countryName} />;
}
