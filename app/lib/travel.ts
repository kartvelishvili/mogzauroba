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
  { code: 'PAR', label: 'პარიზი', region: 'ევროპა', country: 'FR', lat: 48.8566, lng: 2.3522 },
  { code: 'ROM', label: 'რომი', region: 'ევროპა', country: 'IT', lat: 41.9028, lng: 12.4964 },
  { code: 'BCN', label: 'ბარსელონა', region: 'ევროპა', country: 'ES', lat: 41.3874, lng: 2.1686 },
  { code: 'LON', label: 'ლონდონი', region: 'ევროპა', country: 'GB', lat: 51.5074, lng: -0.1278 },
  { code: 'AMS', label: 'ამსტერდამი', region: 'ევროპა', country: 'NL', lat: 52.3676, lng: 4.9041 },
  { code: 'BER', label: 'ბერლინი', region: 'ევროპა', country: 'DE', lat: 52.5200, lng: 13.4050 },
  { code: 'PRG', label: 'პრაღა', region: 'ევროპა', country: 'CZ', lat: 50.0755, lng: 14.4378 },
  { code: 'VIE', label: 'ვენა', region: 'ევროპა', country: 'AT', lat: 48.2082, lng: 16.3738 },
  { code: 'MIL', label: 'მილანი', region: 'ევროპა', country: 'IT', lat: 45.4642, lng: 9.1900 },
  { code: 'MAD', label: 'მადრიდი', region: 'ევროპა', country: 'ES', lat: 40.4168, lng: -3.7038 },
  { code: 'ATH', label: 'ათენი', region: 'ევროპა', country: 'GR', lat: 37.9838, lng: 23.7275 },
  { code: 'IST', label: 'სტამბოლი', region: 'ევროპა', country: 'TR', lat: 41.0082, lng: 28.9784 },
  // აზია & ახლო აღმოსავლეთი
  { code: 'DXB', label: 'დუბაი', region: 'აზია', country: 'AE', lat: 25.2048, lng: 55.2708 },
  { code: 'BKK', label: 'ბანგკოკი', region: 'აზია', country: 'TH', lat: 13.7563, lng: 100.5018 },
  { code: 'TYO', label: 'ტოკიო', region: 'აზია', country: 'JP', lat: 35.6762, lng: 139.6503 },
  { code: 'SIN', label: 'სინგაპური', region: 'აზია', country: 'SG', lat: 1.3521, lng: 103.8198 },
  { code: 'HKG', label: 'ჰონგ კონგი', region: 'აზია', country: 'HK', lat: 22.3193, lng: 114.1694 },
  { code: 'DEL', label: 'დელი', region: 'აზია', country: 'IN', lat: 28.6139, lng: 77.2090 },
  { code: 'TLV', label: 'თელ-ავივი', region: 'აზია', country: 'IL', lat: 32.0853, lng: 34.7818 },
  // ამერიკა
  { code: 'NYC', label: 'ნიუ-იორკი', region: 'ამერიკა', country: 'US', lat: 40.7128, lng: -74.0060 },
  { code: 'MIA', label: 'მაიამი', region: 'ამერიკა', country: 'US', lat: 25.7617, lng: -80.1918 },
  { code: 'CUN', label: 'კანკუნი', region: 'ამერიკა', country: 'MX', lat: 21.1619, lng: -86.8515 },
  // აფრიკა
  { code: 'CAI', label: 'კაირო', region: 'აფრიკა', country: 'EG', lat: 30.0444, lng: 31.2357 },
  { code: 'MRK', label: 'მარაკეში', region: 'აფრიკა', country: 'MA', lat: 31.6295, lng: -7.9811 },
  // საქართველო
  { code: 'TBS', label: 'თბილისი', region: 'საქართველო', country: 'GE', lat: 41.7151, lng: 44.8271 },
  { code: 'KUT', label: 'ქუთაისი', region: 'საქართველო', country: 'GE', lat: 42.2679, lng: 42.6946 },
  { code: 'BUS', label: 'ბათუმი', region: 'საქართველო', country: 'GE', lat: 41.6168, lng: 41.6367 },
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
