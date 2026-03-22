import { NextResponse } from 'next/server';

// Cache airline data in memory (loaded once from Travelpayouts data API)
let airlinesCache: Record<string, { name: string; isLowcost: boolean }> | null = null;
let airportCache: Record<string, { name: string; cityCode: string; country: string }> | null = null;

async function loadAirlines(): Promise<typeof airlinesCache> {
  if (airlinesCache) return airlinesCache;

  try {
    const res = await fetch('https://api.travelpayouts.com/data/en/airlines.json', {
      headers: { 'x-access-token': process.env.TRAVELPAYOUTS_API_TOKEN || '' },
      next: { revalidate: 86400 }, // Cache 24h
    });
    if (!res.ok) return null;
    const data: { code: string; name: string; is_lowcost: boolean }[] = await res.json();
    airlinesCache = {};
    data.forEach(a => {
      if (a.code && a.name) {
        airlinesCache![a.code] = { name: a.name, isLowcost: a.is_lowcost || false };
      }
    });
    return airlinesCache;
  } catch {
    return null;
  }
}

async function loadAirports(): Promise<typeof airportCache> {
  if (airportCache) return airportCache;

  try {
    const res = await fetch('https://api.travelpayouts.com/data/en/airports.json', {
      headers: { 'x-access-token': process.env.TRAVELPAYOUTS_API_TOKEN || '' },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data: { code: string; name: string; city_code: string; country_code: string }[] = await res.json();
    airportCache = {};
    data.forEach(a => {
      if (a.code && a.name) {
        airportCache![a.code] = { name: a.name, cityCode: a.city_code || '', country: a.country_code || '' };
      }
    });
    return airportCache;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'airlines'; // airlines or airports
  const code = searchParams.get('code'); // Optional: lookup specific code

  if (type === 'airports') {
    const airports = await loadAirports();
    if (!airports) return NextResponse.json({ error: 'Failed to load airports' }, { status: 500 });
    if (code) {
      return NextResponse.json({ data: airports[code.toUpperCase()] || null });
    }
    return NextResponse.json({ count: Object.keys(airports).length, data: airports });
  }

  const airlines = await loadAirlines();
  if (!airlines) return NextResponse.json({ error: 'Failed to load airlines' }, { status: 500 });
  if (code) {
    return NextResponse.json({ data: airlines[code.toUpperCase()] || null });
  }
  return NextResponse.json({ count: Object.keys(airlines).length, data: airlines });
}
