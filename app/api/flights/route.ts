import { NextResponse } from 'next/server';
import { fetchWithToken } from '@/app/lib/api';

const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '680923';

// Airline name lookup (top airlines we encounter)
const AIRLINE_NAMES: Record<string, string> = {
  'TK': 'Turkish Airlines', 'PC': 'Pegasus', 'TO': 'Transavia',
  'LH': 'Lufthansa', 'BA': 'British Airways', 'AF': 'Air France',
  'KL': 'KLM', 'AZ': 'ITA Airways', 'VY': 'Vueling',
  'FR': 'Ryanair', 'W6': 'Wizz Air', 'U2': 'easyJet',
  'EK': 'Emirates', 'QR': 'Qatar Airways', 'EY': 'Etihad',
  'A9': 'Georgian Airways', 'FZ': 'flydubai', 'SU': 'Aeroflot',
  'LO': 'LOT Polish', 'OS': 'Austrian', 'LX': 'Swiss',
  'IB': 'Iberia', 'SK': 'SAS', 'AY': 'Finnair',
  'BT': 'airBaltic', 'PS': 'UIA', '5F': 'FlyOne',
  'VF': 'Azimuth', 'DP': 'Pobeda', 'HY': 'Uzbekistan Airways',
  'KC': 'Air Astana', 'J2': 'Azerbaijan Airlines', 'FG': 'Ariana Airways',
  'MS': 'EgyptAir', 'TG': 'Thai Airways', 'SQ': 'Singapore Airlines',
  'CX': 'Cathay Pacific', 'NH': 'ANA', 'JL': 'Japan Airlines',
  'DL': 'Delta', 'AA': 'American Airlines', 'UA': 'United Airlines',
};

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}სთ ${m}წთ`;
}

export interface FlightResult {
  id: string;
  airline: string;
  airlineName: string;
  flightNumber: string;
  origin: string;
  destination: string;
  originAirport: string;
  destinationAirport: string;
  departureAt: string;
  returnAt: string | null;
  price: number;
  currency: string;
  transfers: number;
  returnTransfers: number;
  durationTo: number;
  durationBack: number;
  durationTotal: number;
  durationToFormatted: string;
  durationBackFormatted: string;
  gate: string;
  deepLink: string;
  isRoundTrip: boolean;
  isDirect: boolean;
  logoUrl: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin') || 'TBS';
  const destination = searchParams.get('destination') || 'PAR';
  const currency = searchParams.get('currency') || 'eur';
  const departureAt = searchParams.get('departure_at') || '';
  const returnAt = searchParams.get('return_at') || '';
  const oneWay = searchParams.get('one_way') === 'true';
  const sortBy = searchParams.get('sort') || 'price'; // price, duration, transfers
  const limit = Math.min(parseInt(searchParams.get('limit') || '30'), 50);

  try {
    let endpoint = `/aviasales/v3/prices_for_dates?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&currency=${encodeURIComponent(currency)}&sorting=${sortBy === 'duration' ? 'route' : 'price'}`;

    if (departureAt) endpoint += `&departure_at=${encodeURIComponent(departureAt)}`;
    if (returnAt) endpoint += `&return_at=${encodeURIComponent(returnAt)}`;
    if (oneWay) endpoint += `&one_way=true`;

    const data = await fetchWithToken(endpoint);

    if (!data?.data) {
      return NextResponse.json({ success: true, flights: [], count: 0, currency });
    }

    const rawFlights = Array.isArray(data.data) ? data.data : Object.values(data.data);

    const flights: FlightResult[] = (rawFlights as any[])
      .filter(f => Number(f.price) > 0)
      .map(f => {
        const airlineCode = f.airline || '';
        const deepLink = `https://www.aviasales.com${f.link}&marker=${MARKER}`;

        return {
          id: `${f.flight_number || airlineCode}-${f.departure_at}-${f.price}`,
          airline: airlineCode,
          airlineName: AIRLINE_NAMES[airlineCode] || airlineCode,
          flightNumber: f.flight_number || '',
          origin: f.origin || origin,
          destination: f.destination || destination,
          originAirport: f.origin_airport || f.origin || origin,
          destinationAirport: f.destination_airport || f.destination || destination,
          departureAt: f.departure_at || '',
          returnAt: f.return_at || null,
          price: Number(f.price),
          currency: currency.toUpperCase(),
          transfers: f.transfers ?? 0,
          returnTransfers: f.return_transfers ?? 0,
          durationTo: f.duration_to || 0,
          durationBack: f.duration_back || 0,
          durationTotal: f.duration || 0,
          durationToFormatted: f.duration_to ? formatDuration(f.duration_to) : '',
          durationBackFormatted: f.duration_back ? formatDuration(f.duration_back) : '',
          gate: f.gate || '',
          deepLink,
          isRoundTrip: !!f.return_at,
          isDirect: f.transfers === 0,
          logoUrl: `https://pics.avs.io/100/100/${airlineCode}@2x.png`,
        };
      })
      .slice(0, limit);

    // Sort
    if (sortBy === 'duration') {
      flights.sort((a, b) => a.durationTo - b.durationTo);
    } else if (sortBy === 'transfers') {
      flights.sort((a, b) => a.transfers - b.transfers);
    }

    // Aggregate stats
    const airlines = [...new Set(flights.map(f => f.airline))];
    const directCount = flights.filter(f => f.isDirect).length;
    const minPrice = flights.length > 0 ? Math.min(...flights.map(f => f.price)) : 0;
    const maxPrice = flights.length > 0 ? Math.max(...flights.map(f => f.price)) : 0;

    return NextResponse.json({
      success: true,
      flights,
      count: flights.length,
      currency: currency.toUpperCase(),
      stats: {
        airlines,
        directCount,
        minPrice,
        maxPrice,
        airlineNames: Object.fromEntries(airlines.map(a => [a, AIRLINE_NAMES[a] || a])),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Flight search error';
    return NextResponse.json({ success: false, error: message, flights: [], count: 0 }, { status: 500 });
  }
}
