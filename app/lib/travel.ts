export type ServiceCategory =
  | 'flight'
  | 'hotel'
  | 'tour'
  | 'transfer'
  | 'car'
  | 'esim'
  | 'insurance'
  | 'ticket'
  | 'transport';

export interface TravelService {
  id?: string;
  provider: string;
  category: ServiceCategory;
  destination: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  external_link: string;
  image_url?: string;
  origin?: string;
  airline?: string;
  departure_at?: string;
}

export interface ExploreResponse {
  success: boolean;
  data: {
    flights: TravelService[];
    hotels: TravelService[];
    transfers: TravelService[];
    tours: TravelService[];
    extras: TravelService[];
  };
  error?: string;
}

export const DESTINATION_PRESETS = [
  // ევროპა
  { code: 'PAR', label: 'პარიზი', region: 'ევროპა', country: 'FR' },
  { code: 'ROM', label: 'რომი', region: 'ევროპა', country: 'IT' },
  { code: 'BCN', label: 'ბარსელონა', region: 'ევროპა', country: 'ES' },
  { code: 'LON', label: 'ლონდონი', region: 'ევროპა', country: 'GB' },
  { code: 'AMS', label: 'ამსტერდამი', region: 'ევროპა', country: 'NL' },
  { code: 'BER', label: 'ბერლინი', region: 'ევროპა', country: 'DE' },
  { code: 'PRG', label: 'პრაღა', region: 'ევროპა', country: 'CZ' },
  { code: 'VIE', label: 'ვენა', region: 'ევროპა', country: 'AT' },
  { code: 'MIL', label: 'მილანი', region: 'ევროპა', country: 'IT' },
  { code: 'MAD', label: 'მადრიდი', region: 'ევროპა', country: 'ES' },
  { code: 'ATH', label: 'ათენი', region: 'ევროპა', country: 'GR' },
  { code: 'IST', label: 'სტამბოლი', region: 'ევროპა', country: 'TR' },
  // აზია & ახლო აღმოსავლეთი
  { code: 'DXB', label: 'დუბაი', region: 'აზია', country: 'AE' },
  { code: 'BKK', label: 'ბანგკოკი', region: 'აზია', country: 'TH' },
  { code: 'TYO', label: 'ტოკიო', region: 'აზია', country: 'JP' },
  { code: 'SIN', label: 'სინგაპური', region: 'აზია', country: 'SG' },
  { code: 'HKG', label: 'ჰონგ კონგი', region: 'აზია', country: 'HK' },
  { code: 'DEL', label: 'დელი', region: 'აზია', country: 'IN' },
  { code: 'TLV', label: 'თელ-ავივი', region: 'აზია', country: 'IL' },
  // ამერიკა
  { code: 'NYC', label: 'ნიუ-იორკი', region: 'ამერიკა', country: 'US' },
  { code: 'MIA', label: 'მაიამი', region: 'ამერიკა', country: 'US' },
  { code: 'CUN', label: 'კანკუნი', region: 'ამერიკა', country: 'MX' },
  // აფრიკა
  { code: 'CAI', label: 'კაირო', region: 'აფრიკა', country: 'EG' },
  { code: 'MRK', label: 'მარაკეში', region: 'აფრიკა', country: 'MA' },
  // საქართველო
  { code: 'TBS', label: 'თბილისი', region: 'საქართველო', country: 'GE' },
  { code: 'KUT', label: 'ქუთაისი', region: 'საქართველო', country: 'GE' },
  { code: 'BUS', label: 'ბათუმი', region: 'საქართველო', country: 'GE' },
] as const;

// Flag CDN: https://flagcdn.com/w40/{country_code}.png
export function getCountryFlag(destCode: string, size: 'w20' | 'w40' | 'w80' = 'w40'): string {
  const preset = DESTINATION_PRESETS.find(d => d.code === destCode);
  const cc = preset?.country?.toLowerCase() || 'ge';
  return `https://flagcdn.com/${size}/${cc}.png`;
}

export function getCountryCode(destCode: string): string {
  return DESTINATION_PRESETS.find(d => d.code === destCode)?.country || 'GE';
}

// Airline logo CDN (via Aviasales/pics.avs.io)
export function getAirlineLogo(iataCode: string, size: number = 100): string {
  return `https://pics.avs.io/${size}/${size}/${iataCode}@2x.png`;
}

export function normalizeDestination(value: string | null | undefined) {
  return value?.trim().toUpperCase() || 'PAR';
}

export function getDestinationLabel(code: string) {
  return DESTINATION_PRESETS.find((item) => item.code === code)?.label || code;
}
