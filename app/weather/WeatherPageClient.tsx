'use client';

import { CloudSun, Wind, Droplets, Sun, CloudRain, Cloud, Snowflake, Calendar, MapPin, Plane, Hotel, Ticket, AlertCircle, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import { DESTINATION_PRESETS, getCountryFlag } from '../lib/travel';
import { useLang } from '@/app/lib/i18n';

interface DayForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  windSpeed: number;
  humidity: number;
  condition: string;
  icon: string;
}

interface WeatherData {
  success: boolean;
  city: string;
  destination: string;
  forecastDays: number;
  forecast: DayForecast[];
  error?: string;
}

const WeatherIcon = ({ type, className }: { type: string; className?: string }) => {
  if (type === 'rain') return <CloudRain className={className} />;
  if (type === 'cloud') return <Cloud className={className} />;
  if (type === 'snow') return <Snowflake className={className} />;
  return <Sun className={className} />;
};

function getTempColor(temp: number): string {
  if (temp <= 0) return 'text-blue-600';
  if (temp <= 10) return 'text-cyan-600';
  if (temp <= 20) return 'text-emerald-600';
  if (temp <= 30) return 'text-amber-600';
  return 'text-red-600';
}

function getIconBg(icon: string): string {
  if (icon === 'sun') return 'bg-amber-50 border-amber-200';
  if (icon === 'rain') return 'bg-blue-50 border-blue-200';
  if (icon === 'snow') return 'bg-indigo-50 border-indigo-200';
  return 'bg-slate-50 border-slate-200';
}

function getIconColor(icon: string): string {
  if (icon === 'sun') return 'text-amber-500';
  if (icon === 'rain') return 'text-blue-500';
  if (icon === 'snow') return 'text-indigo-500';
  return 'text-slate-400';
}

// Group destinations by region
const regions = Array.from(new Set(DESTINATION_PRESETS.map(d => d.region)));

export default function WeatherPageClient() {
  const { t, lang } = useLang();

  const dayNames = [t('day.sun'), t('day.mon'), t('day.tue'), t('day.wed'), t('day.thu'), t('day.fri'), t('day.sat')];
  const monthNames = [t('mon.jan'), t('mon.feb'), t('mon.mar'), t('mon.apr'), t('mon.may'), t('mon.jun'), t('mon.jul'), t('mon.aug'), t('mon.sep'), t('mon.oct'), t('mon.nov'), t('mon.dec')];

  function formatDate(dateStr: string): { dayName: string; dayNum: string; month: string } {
    const d = new Date(dateStr + 'T12:00:00');
    return {
      dayName: dayNames[d.getDay()],
      dayNum: d.getDate().toString(),
      month: monthNames[d.getMonth()],
    };
  }

  const [selectedDest, setSelectedDest] = useState('TBS');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const fetchWeather = async (dest: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?destination=${dest}`);
      const data = await res.json();
      setWeather(data);
    } catch {
      setWeather({ success: false, city: '', destination: dest, forecastDays: 0, forecast: [], error: t('w.connectionError') });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedDest);
  }, [selectedDest]);

  const today = weather?.forecast?.[0];
  const upcoming = weather?.forecast?.slice(1) || [];

  const filteredDestinations = activeRegion
    ? DESTINATION_PRESETS.filter(d => d.region === activeRegion)
    : DESTINATION_PRESETS;

  const selectedPreset = DESTINATION_PRESETS.find(d => d.code === selectedDest);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-sky-50 p-3 rounded-2xl border border-sky-200">
            <CloudSun size={32} className="text-sky-600" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">{t('w.title')}</h1>
            <p className="text-slate-500 mt-1">{t('w.subtitle')}</p>
          </div>
        </div>
        <div className="w-full h-px bg-slate-200 my-8" />

        {/* Region Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveRegion(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              !activeRegion ? 'bg-sky-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-sky-400'
            }`}
          >
            {t('w.all')}
          </button>
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setActiveRegion(r === activeRegion ? null : r)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeRegion === r ? 'bg-sky-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-sky-400'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* City Buttons */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filteredDestinations.map(d => (
            <button
              key={d.code}
              onClick={() => setSelectedDest(d.code)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedDest === d.code
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 scale-105'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-sky-400 hover:shadow-sm'
              }`}
            >
              <img src={getCountryFlag(d.code, 'w20')} alt="" className="w-5 h-4 rounded-sm object-cover" />
              {d.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-200 border-t-sky-500" />
          </div>
        )}

        {/* Error State */}
        {!loading && weather && !weather.success && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-600 font-semibold text-lg">{t('w.unavailable')}</p>
            <p className="text-red-400 mt-2">{weather.error}</p>
          </div>
        )}

        {/* Weather Content */}
        {!loading && weather?.success && today && (
          <div className="space-y-8">
            {/* Today's Weather - Hero Card */}
            <div className={`rounded-3xl p-8 md:p-10 border relative overflow-hidden ${getIconBg(today.icon)}`}>
              <div className="absolute right-[-60px] top-[-60px] opacity-10">
                <WeatherIcon type={today.icon} className="w-[250px] h-[250px]" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-sky-600 w-5 h-5" />
                  <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    {selectedPreset && (
                      <img src={getCountryFlag(selectedDest, 'w40')} alt="" className="w-8 h-6 rounded object-cover" />
                    )}
                    {weather.city}
                  </h2>
                  <span className="text-slate-400 text-sm">— {t('w.today')}, {formatDate(today.date).dayNum} {formatDate(today.date).month}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end gap-8">
                  <div className="flex items-center gap-6">
                    <WeatherIcon type={today.icon} className={`w-20 h-20 ${getIconColor(today.icon)}`} />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-7xl font-black ${getTempColor(today.tempMax)}`}>{today.tempMax}°</span>
                        <span className="text-3xl text-slate-400 font-light">/ {today.tempMin}°</span>
                      </div>
                      <p className="text-xl text-slate-600 mt-1">{today.condition}</p>
                    </div>
                  </div>

                  <div className="flex gap-8 md:ml-auto">
                    <div className="text-center">
                      <Wind className="w-6 h-6 text-sky-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-slate-800">{today.windSpeed} <span className="text-sm font-normal text-slate-400">{t('w.kmh')}</span></p>
                      <p className="text-xs text-slate-400">{t('w.wind')}</p>
                    </div>
                    <div className="text-center">
                      <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-slate-800">{today.humidity}<span className="text-sm font-normal text-slate-400">%</span></p>
                      <p className="text-xs text-slate-400">{t('w.humidity')}</p>
                    </div>
                    <div className="text-center">
                      <CloudRain className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
                      <p className="text-lg font-bold text-slate-800">{today.precipitation}<span className="text-sm font-normal text-slate-400">{t('w.mm')}</span></p>
                      <p className="text-xs text-slate-400">{t('w.precipitation')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Day-by-Day Forecast */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-sky-600" />
                <h3 className="text-xl font-bold text-slate-800">{weather.forecastDays}{t('w.dayForecast')}</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3">
                {upcoming.map((day, i) => {
                  const { dayName, dayNum, month } = formatDate(day.date);
                  return (
                    <div
                      key={day.date}
                      className={`bg-white border border-slate-200 rounded-2xl p-4 text-center hover:shadow-md hover:border-sky-300 transition-all ${i === 0 ? 'ring-2 ring-sky-200' : ''}`}
                    >
                      <p className="text-xs font-bold text-slate-400 uppercase mb-1">{dayName}</p>
                      <p className="text-sm text-slate-600 mb-3">{dayNum} {month}</p>
                      <WeatherIcon type={day.icon} className={`w-8 h-8 mx-auto mb-2 ${getIconColor(day.icon)}`} />
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className={`text-lg font-black ${getTempColor(day.tempMax)}`}>{day.tempMax}°</span>
                        <span className="text-sm text-slate-400">/ {day.tempMin}°</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">{day.condition}</p>
                      {day.precipitation > 0 && (
                        <p className="text-[10px] text-blue-400 mt-1 flex items-center justify-center gap-1">
                          <Droplets className="w-3 h-3" /> {day.precipitation}{t('w.mm')}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {weather.forecastDays < 16 && (
                <p className="text-sm text-amber-600 mt-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {t('w.longForecast')}
                </p>
              )}
            </div>

            {/* Quick Travel Links */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                {t('w.planTrip')} — {weather.city}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href={`/flights?destination=${selectedDest}`}
                  className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-sky-400 hover:shadow-sm transition-all group"
                >
                  <Plane className="w-5 h-5 text-sky-500" />
                  <span className="text-slate-700 font-medium">{t('w.flights')}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-sky-500 transition-colors" />
                </Link>
                <Link
                  href={`/hotels?destination=${selectedDest}`}
                  className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-emerald-400 hover:shadow-sm transition-all group"
                >
                  <Hotel className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-700 font-medium">{t('w.hotels')}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-emerald-500 transition-colors" />
                </Link>
                <Link
                  href={`/tickets?destination=${selectedDest}`}
                  className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-purple-400 hover:shadow-sm transition-all group"
                >
                  <Ticket className="w-5 h-5 text-purple-500" />
                  <span className="text-slate-700 font-medium">{t('w.tickets')}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-purple-500 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
