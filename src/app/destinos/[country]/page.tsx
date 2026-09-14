import DestinationsPageView from '@/components/DestinationsPageView';

interface PageProps {
  params: Promise<{ country: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const c = resolved.country.toLowerCase();
  const countryName = c === 'chile' ? 'Chile' :
                      c === 'peru' ? 'Peru' :
                      c === 'bolivia' ? 'Bolívia' :
                      c === 'argentina' ? 'Argentina' :
                      c === 'colombia' ? 'Colômbia' : 'Chile';
  return <DestinationsPageView locale="pt" activeCountry={countryName} />;
}
