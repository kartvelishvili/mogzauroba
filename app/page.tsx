import { getCatalog, getProviderCount } from './lib/catalog';
import { DESTINATION_PRESETS } from './lib/travel';
import HomeClient from './HomeClient';

export default async function Home() {
  const totalOffers = getCatalog().length;
  const providerCount = getProviderCount();
  const destinationCount = DESTINATION_PRESETS.length;

  return (
    <HomeClient
      totalOffers={totalOffers}
      providerCount={providerCount}
      destinationCount={destinationCount}
    />
  );
}
