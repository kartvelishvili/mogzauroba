import { NextResponse } from 'next/server';
import { fetchWithToken } from '@/app/lib/api';
import { getServicesByDestination } from '@/app/lib/catalog';
import type { TravelService } from '@/app/lib/travel';

const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '680923';

type FlightApiItem = {
  airline?: string;
  departure_at?: string;
  return_at?: string;
  destination?: string;
  flight_number?: string;
  origin?: string;
  origin_airport?: string;
  destination_airport?: string;
  price?: number | string;
  transfers?: number;
  return_transfers?: number;
  duration_to?: number;
  duration_back?: number;
  duration?: number;
  gate?: string;
  link?: string;
};

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}სთ ${m}წთ`;
}

const AIRLINE_NAMES: Record<string, string> = {
  'TK': 'Turkish Airlines', 'PC': 'Pegasus', 'LH': 'Lufthansa',
  'BA': 'British Airways', 'AF': 'Air France', 'KL': 'KLM',
  'FR': 'Ryanair', 'W6': 'Wizz Air', 'U2': 'easyJet',
  'EK': 'Emirates', 'QR': 'Qatar Airways', 'EY': 'Etihad',
  'A9': 'Georgian Airways', 'FZ': 'flydubai', 'SU': 'Aeroflot',
  'LO': 'LOT Polish', 'OS': 'Austrian', 'BT': 'airBaltic',
  'PS': 'UIA', '5F': 'FlyOne', 'VY': 'Vueling', 'AZ': 'ITA Airways',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin') || 'TBS';
  const destination = searchParams.get('destination') || 'PAR';
  const date = searchParams.get('date');

  try {
    let flights: TravelService[] = [];

    try {
      const endpoint =
        `/aviasales/v3/prices_for_dates?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&currency=eur` +
        (date ? `&departure_at=${encodeURIComponent(date)}` : '');
      const flightData = await fetchWithToken(endpoint);

      if (flightData?.data) {
        const items = (Array.isArray(flightData.data)
          ? flightData.data
          : Object.values(flightData.data)) as FlightApiItem[];

        flights = items
          .filter((item) => Number(item.price) > 0)
          .sort((a, b) => Number(a.price) - Number(b.price))
          .slice(0, 5)
          .map((item) => {
            const airlineCode = item.airline || '';
            const deepLink = item.link
              ? `https://www.aviasales.com${item.link}&marker=${MARKER}`
              : `https://search.aviasales.com/${item.origin || origin}${item.destination || destination}?marker=${MARKER}`;
            return {
              id: `fl-${item.flight_number || airlineCode}-${item.departure_at || 'na'}`,
              provider: 'Aviasales',
              category: 'flight',
              destination,
              origin: item.origin || origin,
              airline: airlineCode,
              departure_at: item.departure_at,
              title: `${item.origin || origin} → ${item.destination || destination} (${AIRLINE_NAMES[airlineCode] || airlineCode})`,
              description:
                item.transfers === 0 ? 'პირდაპირი რეისი' : `${item.transfers || 0} გადაჯდომა`,
              price: Number(item.price),
              external_link: deepLink,
              image_url:
                'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
              airlineName: AIRLINE_NAMES[airlineCode] || airlineCode,
              flightNumber: item.flight_number || '',
              originAirport: item.origin_airport || item.origin || origin,
              destinationAirport: item.destination_airport || item.destination || destination,
              returnAt: item.return_at || null,
              transfers: item.transfers ?? 0,
              returnTransfers: item.return_transfers ?? 0,
              durationTo: item.duration_to || 0,
              durationBack: item.duration_back || 0,
              durationToFormatted: item.duration_to ? formatDuration(item.duration_to) : '',
              durationBackFormatted: item.duration_back ? formatDuration(item.duration_back) : '',
              gate: item.gate || '',
              deepLink,
              isRoundTrip: !!item.return_at,
              isDirect: item.transfers === 0,
              logoUrl: `https://pics.avs.io/100/100/${airlineCode}@2x.png`,
            };
          });
      }
    } catch (error) {
      console.error('Flights fetch error API:', error);
    }

    const services = getServicesByDestination(destination);
    const hotels = services.filter((item) => item.category === 'hotel').slice(0, 4);
    const transfers = services
      .filter((item) => item.category === 'transfer' || item.category === 'car' || item.category === 'transport')
      .slice(0, 4);
    const tours = services.filter((item) => item.category === 'tour' || item.category === 'ticket').slice(0, 4);
    const extras = services
      .filter((item) => item.category === 'esim' || item.category === 'insurance')
      .slice(0, 4);

    return NextResponse.json({
      success: true,
      data: {
        flights,
        hotels,
        transfers,
        tours,
        extras,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown explore error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
