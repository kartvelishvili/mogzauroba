'use client';

import { useState, useEffect, useMemo } from 'react';
import { MapPin, Loader2, Hotel, Ticket, Map as MapIcon, Car, Plane, Globe } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Footer from '../components/Footer';
import { useLang } from '@/app/lib/i18n';
import { DESTINATION_PRESETS, getCountryFlag } from '@/app/lib/travel';
import type { ServiceCategory } from '@/app/lib/travel';

// Dynamically import map to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('./MapView'), { ssr: false, loading: () => <div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500" size={40} /></div> });

interface DestService {
  code: string;
  label: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  services: { category: ServiceCategory; count: number; minPrice: number }[];
  totalServices: number;
}

const regionKeys: { id: string; key: string }[] = [
  { id: 'all', key: 'mp.allRegions' },
  { id: 'ევროპა', key: 'mp.europe' },
  { id: 'აზია', key: 'mp.asia' },
  { id: 'ამერიკა', key: 'mp.america' },
  { id: 'აფრიკა', key: 'mp.africa' },
  { id: 'საქართველო', key: 'mp.georgia' },
];

const catIcons: Record<string, typeof Hotel> = {
  hotel: Hotel, tour: MapIcon, ticket: Ticket, transfer: Car, flight: Plane,
};

export default function MapPage() {
  const { t, lang } = useLang();
  const [destinations, setDestinations] = useState<DestService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDest, setSelectedDest] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/services?lang=${lang}`);
        const data = await res.json();
        const services: { destination: string; category: ServiceCategory; price: number }[] = data.data || [];

        const grouped: Record<string, { category: ServiceCategory; price: number }[]> = {};
        for (const s of services) {
          if (!grouped[s.destination]) grouped[s.destination] = [];
          grouped[s.destination].push({ category: s.category, price: s.price });
        }

        const result: DestService[] = DESTINATION_PRESETS.map(d => {
          const items = grouped[d.code] || [];
          const byCat: Record<string, { count: number; minPrice: number }> = {};
          for (const item of items) {
            if (!byCat[item.category]) byCat[item.category] = { count: 0, minPrice: Infinity };
            byCat[item.category].count++;
            byCat[item.category].minPrice = Math.min(byCat[item.category].minPrice, item.price);
          }
          return {
            code: d.code,
            label: d.label,
            region: d.region,
            country: d.country,
            lat: d.lat,
            lng: d.lng,
            services: Object.entries(byCat).map(([category, v]) => ({ category: category as ServiceCategory, count: v.count, minPrice: v.minPrice })),
            totalServices: items.length,
          };
        }).filter(d => d.totalServices > 0);

        setDestinations(result);
      } catch { /* empty */ }
      setLoading(false);
    }
    load();
  }, [lang]);

  const filtered = useMemo(() =>
    selectedRegion === 'all' ? destinations : destinations.filter(d => d.region === selectedRegion),
    [destinations, selectedRegion]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col p-4 md:p-8 max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <MapPin size={28} className="text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">{t('mp.title')}</h1>
              <p className="text-slate-500 text-sm">{t('mp.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Region filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {regionKeys.map(r => (
            <button
              key={r.id}
              onClick={() => { setSelectedRegion(r.id); setSelectedDest(null); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                selectedRegion === r.id
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t(r.key)}
            </button>
          ))}
        </div>

        {/* Map + Sidebar */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-[600px]">
          {/* Map */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-emerald-500" size={40} />
              </div>
            ) : (
              <MapView
                destinations={filtered}
                selectedDest={selectedDest}
                onSelect={setSelectedDest}
                lang={lang}
                t={t}
              />
            )}
          </div>

          {/* Sidebar — destination list */}
          <div className="w-full lg:w-80 shrink-0 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <p className="text-sm font-bold text-slate-700">{filtered.length} {t('mp.services') === 'სერვისი' ? 'მიმართულება' : 'destination(s)'}</p>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[500px] lg:max-h-none divide-y divide-slate-100">
              {filtered.map(d => (
                <button
                  key={d.code}
                  onClick={() => setSelectedDest(d.code)}
                  className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${selectedDest === d.code ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <img src={getCountryFlag(d.code, 'w20')} alt="" width={16} height={12} className="rounded-sm" />
                    <span className="font-bold text-slate-800">{t(`city.${d.code}`)}</span>
                    <span className="ml-auto text-xs text-slate-400">{d.totalServices} {t('mp.services')}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {d.services.slice(0, 4).map(s => (
                      <span key={s.category} className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                        {t(`cat.${s.category}`)} ({s.count})
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
