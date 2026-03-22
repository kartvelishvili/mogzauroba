import { NextResponse } from 'next/server';

// City coordinates for weather lookup
const cityCoordinates: Record<string, { lat: number; lon: number; name: string }> = {
  PAR: { lat: 48.8566, lon: 2.3522, name: 'პარიზი' },
  ROM: { lat: 41.9028, lon: 12.4964, name: 'რომი' },
  BCN: { lat: 41.3874, lon: 2.1686, name: 'ბარსელონა' },
  LON: { lat: 51.5074, lon: -0.1278, name: 'ლონდონი' },
  AMS: { lat: 52.3676, lon: 4.9041, name: 'ამსტერდამი' },
  BER: { lat: 52.5200, lon: 13.4050, name: 'ბერლინი' },
  PRG: { lat: 50.0755, lon: 14.4378, name: 'პრაღა' },
  VIE: { lat: 48.2082, lon: 16.3738, name: 'ვენა' },
  MIL: { lat: 45.4642, lon: 9.1900, name: 'მილანი' },
  MAD: { lat: 40.4168, lon: -3.7038, name: 'მადრიდი' },
  ATH: { lat: 37.9838, lon: 23.7275, name: 'ათენი' },
  IST: { lat: 41.0082, lon: 28.9784, name: 'სტამბოლი' },
  DXB: { lat: 25.2048, lon: 55.2708, name: 'დუბაი' },
  BKK: { lat: 13.7563, lon: 100.5018, name: 'ბანგკოკი' },
  TYO: { lat: 35.6762, lon: 139.6503, name: 'ტოკიო' },
  SIN: { lat: 1.3521, lon: 103.8198, name: 'სინგაპური' },
  HKG: { lat: 22.3193, lon: 114.1694, name: 'ჰონგ კონგი' },
  DEL: { lat: 28.6139, lon: 77.2090, name: 'დელი' },
  TLV: { lat: 32.0853, lon: 34.7818, name: 'თელ-ავივი' },
  NYC: { lat: 40.7128, lon: -74.0060, name: 'ნიუ-იორკი' },
  MIA: { lat: 25.7617, lon: -80.1918, name: 'მაიამი' },
  CUN: { lat: 21.1619, lon: -86.8515, name: 'კანკუნი' },
  CAI: { lat: 30.0444, lon: 31.2357, name: 'კაირო' },
  MRK: { lat: 31.6295, lon: -7.9811, name: 'მარაკეში' },
  TBS: { lat: 41.7151, lon: 44.8271, name: 'თბილისი' },
  KUT: { lat: 42.2679, lon: 42.6946, name: 'ქუთაისი' },
  BUS: { lat: 41.6168, lon: 41.6367, name: 'ბათუმი' },
};

// Open-Meteo weather code to Georgian description
function weatherCodeToDescription(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: 'მოწმენდილი ცა', icon: 'sun' };
  if (code <= 3) return { condition: 'ნაწილობრივ მოღრუბლული', icon: 'cloud' };
  if (code <= 48) return { condition: 'მოღრუბლული / ნისლიანი', icon: 'cloud' };
  if (code <= 67) return { condition: 'წვიმიანი', icon: 'rain' };
  if (code <= 77) return { condition: 'თოვლიანი', icon: 'snow' };
  if (code <= 82) return { condition: 'ძლიერი წვიმა', icon: 'rain' };
  if (code <= 86) return { condition: 'თოვლი', icon: 'snow' };
  return { condition: 'ქარიშხალი', icon: 'rain' };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dest = searchParams.get('destination')?.toUpperCase() || 'TBS';
  
  const city = cityCoordinates[dest];
  if (!city) {
    return NextResponse.json({ success: false, error: 'Unknown destination' }, { status: 400 });
  }

  try {
    // Fetch 16-day forecast from Open-Meteo (free, no API key)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,relative_humidity_2m_mean,weathercode&timezone=auto&forecast_days=16`;
    
    const res = await fetch(url, { next: { revalidate: 1800 } }); // Cache 30 min
    if (!res.ok) throw new Error('Weather API error');
    
    const data = await res.json();
    const daily = data.daily;

    const forecast = daily.time.map((date: string, i: number) => {
      const { condition, icon } = weatherCodeToDescription(daily.weathercode[i]);
      return {
        date,
        tempMax: Math.round(daily.temperature_2m_max[i]),
        tempMin: Math.round(daily.temperature_2m_min[i]),
        precipitation: daily.precipitation_sum[i],
        windSpeed: Math.round(daily.windspeed_10m_max[i]),
        humidity: Math.round(daily.relative_humidity_2m_mean?.[i] || 50),
        condition,
        icon,
      };
    });

    return NextResponse.json({
      success: true,
      city: city.name,
      destination: dest,
      forecastDays: forecast.length,
      forecast,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown weather error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
