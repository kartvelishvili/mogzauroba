'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Plane, Loader2, ExternalLink, ArrowRight, ArrowLeftRight,
  Filter, Hotel, Car, Ticket, Smartphone, ChevronDown,
  Clock, ArrowDownUp, Calendar, Repeat, ChevronsRight, SlidersHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DESTINATION_PRESETS,
  getDestinationLabel,
  getCountryFlag,
  normalizeDestination,
  type TravelService,
} from '@/app/lib/travel';
import Footer from '../components/Footer';

interface FlightResult {
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

interface FlightStats {
  airlines: string[];
  directCount: number;
  minPrice: number;
  maxPrice: number;
  airlineNames: Record<string, string>;
}

type SortOption = 'price' | 'duration' | 'transfers';

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const months = ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'];
  const days = ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'];
  return `${d.getDate()} ${months[d.getMonth()]}, ${days[d.getDay()]}`;
}

function formatTime(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function FlightsPageClient() {
  const searchParams = useSearchParams();
  const destination = normalizeDestination(searchParams.get('destination'));
  const [flights, setFlights] = useState<FlightResult[]>([]);
  const [stats, setStats] = useState<FlightStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [selectedAirline, setSelectedAirline] = useState<string | null>(null);
  const [showAllAirlines, setShowAllAirlines] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [showDirectOnly, setShowDirectOnly] = useState(false);
  // Cross-sell data
  const [crossSell, setCrossSell] = useState<TravelService[]>([]);

  const regions = Array.from(new Set(DESTINATION_PRESETS.map(d => d.region)));
  const filteredPresets = activeRegion
    ? DESTINATION_PRESETS.filter(d => d.region === activeRegion)
    : DESTINATION_PRESETS;

  const fetchFlights = useCallback(async () => {
    setLoading(true);
    try {
      const [flightsRes, servicesRes] = await Promise.all([
        fetch(`/api/flights?destination=${destination}&sort=${sortBy}&limit=40`),
        fetch(`/api/services?destination=${destination}&category=hotel,transfer,esim,ticket,tour`),
      ]);
      const flightsData = await flightsRes.json();
      const servicesData = await servicesRes.json();
      setFlights(flightsData.flights || []);
      setStats(flightsData.stats || null);
      setCrossSell(servicesData.data || []);
    } catch {
      setFlights([]);
      setStats(null);
      setCrossSell([]);
    } finally {
      setLoading(false);
    }
  }, [destination, sortBy]);

  useEffect(() => {
    fetchFlights();
    setSelectedAirline(null);
    setShowDirectOnly(false);
  }, [fetchFlights]);

  // Client-side filtering
  let filteredFlights = flights;
  if (selectedAirline) {
    filteredFlights = filteredFlights.filter(f => f.airline === selectedAirline);
  }
  if (showDirectOnly) {
    filteredFlights = filteredFlights.filter(f => f.isDirect);
  }

  const airlines = stats?.airlines || [];
  const airlineNames = stats?.airlineNames || {};

  const cityLabel = getDestinationLabel(destination);
  const flagUrl = getCountryFlag(destination, 'w40');

  // Cross-sell groups
  const hotels = crossSell.filter(s => s.category === 'hotel').slice(0, 4);
  const transfers = crossSell.filter(s => s.category === 'transfer').slice(0, 3);
  const esims = crossSell.filter(s => s.category === 'esim').slice(0, 2);
  const tickets = crossSell.filter(s => s.category === 'ticket' || s.category === 'tour').slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200">
              <Plane size={32} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">ავიაბილეთები</h1>
              <p className="text-slate-500 mt-1">მოძებნე ყველაზე იაფი ფრენები ნებისმიერი მიმართულებით</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">რეგიონი</span>
            <div className="flex flex-wrap gap-2 mb-2">
              <button
                type="button"
                onClick={() => setActiveRegion(null)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeRegion === null ? 'bg-blue-500 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-400'
                }`}
              >
                ყველა
              </button>
              {regions.map(region => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActiveRegion(region)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    activeRegion === region ? 'bg-blue-500 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-400'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">მიმართულება</span>
            <div className="flex flex-wrap gap-2">
              {filteredPresets.map(item => {
                const active = item.code === destination;
                return (
                  <Link
                    key={item.code}
                    href={`/flights?destination=${item.code}`}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors flex items-center gap-2 ${
                      active ? 'bg-blue-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400'
                    }`}
                  >
                    <img src={getCountryFlag(item.code, 'w20')} alt="" className="w-5 h-3.5 rounded-sm object-cover" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <img src={flagUrl} alt="" className="w-5 h-4 rounded-sm" />
            <span className="text-sm text-slate-500">
              ფრენები: <span className="text-slate-700 font-semibold">თბილისი → {cityLabel}</span>
            </span>
            {!loading && stats && (
              <span className="text-xs text-slate-400 ml-2">
                ({filteredFlights.length} ფრენა{stats.directCount > 0 && `, ${stats.directCount} პირდაპირი`})
              </span>
            )}
          </div>
          {!loading && stats && stats.minPrice > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">
                ფასი: <span className="text-emerald-600 font-bold">€{stats.minPrice}</span>
                {stats.minPrice !== stats.maxPrice && (
                  <> – <span className="text-slate-600 font-semibold">€{stats.maxPrice}</span></>
                )}
              </span>
            </div>
          )}
        </div>

        <div className="w-full h-px bg-slate-200 my-4" />

        {/* Sort + Filter controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-slate-500" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">სორტირება</span>
          </div>
          {([
            { key: 'price' as SortOption, label: 'ფასი', icon: ArrowDownUp },
            { key: 'duration' as SortOption, label: 'ხანგრძლივობა', icon: Clock },
            { key: 'transfers' as SortOption, label: 'გადაჯდომა', icon: ChevronsRight },
          ]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSortBy(key)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                sortBy === key ? 'bg-blue-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400'
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
          <div className="w-px h-6 bg-slate-200 mx-1" />
          <button
            type="button"
            onClick={() => setShowDirectOnly(!showDirectOnly)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              showDirectOnly ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-400'
            }`}
          >
            <Plane size={13} />
            პირდაპირი ფრენა
            {stats && stats.directCount > 0 && (
              <span className="opacity-70">({stats.directCount})</span>
            )}
          </button>
        </div>

        {/* Airline Filter */}
        {airlines.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={14} className="text-slate-500" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">ავიაკომპანია</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedAirline(null)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors flex items-center gap-2 ${
                  selectedAirline === null ? 'bg-blue-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400'
                }`}
              >
                ყველა ({flights.length})
              </button>
              {(showAllAirlines ? airlines : airlines.slice(0, 8)).map(code => {
                const count = flights.filter(f => f.airline === code).length;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setSelectedAirline(code === selectedAirline ? null : code)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors flex items-center gap-2 ${
                      selectedAirline === code ? 'bg-blue-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400'
                    }`}
                  >
                    <img
                      src={`https://pics.avs.io/40/40/${code}@2x.png`}
                      alt={code}
                      className="w-5 h-5 rounded-sm object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {airlineNames[code] || code}
                    <span className="text-xs opacity-70">({count})</span>
                  </button>
                );
              })}
              {airlines.length > 8 && (
                <button
                  type="button"
                  onClick={() => setShowAllAirlines(!showAllAirlines)}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1"
                >
                  {showAllAirlines ? 'ნაკლები' : `+${airlines.length - 8} სხვა`}
                  <ChevronDown size={14} className={`transition-transform ${showAllAirlines ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Flight List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 text-slate-500 gap-4">
            <Loader2 size={40} className="animate-spin text-blue-500" />
            <p>ფრენების ძებნა...</p>
          </div>
        ) : filteredFlights.length > 0 ? (
          <div className="space-y-4">
            {filteredFlights.map((flight, index) => (
              <motion.div
                key={flight.id || `flight-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-5 flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Airline logo + info */}
                  <div className="flex items-center gap-3 lg:w-48 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={flight.logoUrl}
                        alt={flight.airlineName}
                        className="w-9 h-9 object-contain"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement;
                          el.onerror = null;
                          el.style.display = 'none';
                          el.parentElement!.innerHTML = `<span class="text-slate-400 font-bold text-sm">${flight.airline}</span>`;
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{flight.airlineName}</p>
                      <p className="text-xs text-slate-400">
                        {flight.flightNumber || flight.airline}
                        {flight.gate && <span className="ml-1.5 text-slate-300">· {flight.gate}</span>}
                      </p>
                    </div>
                  </div>

                  {/* Outbound leg */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      {/* Origin */}
                      <div className="text-center shrink-0">
                        {flight.departureAt && (
                          <p className="text-lg font-black text-slate-800">{formatTime(flight.departureAt)}</p>
                        )}
                        <p className="text-sm font-bold text-slate-700">{flight.originAirport}</p>
                        <p className="text-[11px] text-slate-400">{getDestinationLabel(flight.origin) || flight.origin}</p>
                      </div>

                      {/* Duration + transfers line */}
                      <div className="flex-1 flex flex-col items-center gap-0.5 px-1">
                        {flight.durationToFormatted && (
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock size={10} />
                            {flight.durationToFormatted}
                          </span>
                        )}
                        <div className="w-full flex items-center gap-1">
                          <div className="h-px flex-1 bg-slate-200" />
                          <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            flight.isDirect
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              : 'bg-amber-50 text-amber-600 border border-amber-200'
                          }`}>
                            {flight.isDirect ? 'პირდაპირი' : `${flight.transfers} გადაჯდ.`}
                          </div>
                          <div className="h-px flex-1 bg-slate-200" />
                          <ArrowRight size={12} className="text-slate-300 shrink-0" />
                        </div>
                        {flight.departureAt && (
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Calendar size={9} />
                            {formatDate(flight.departureAt)}
                          </span>
                        )}
                      </div>

                      {/* Destination */}
                      <div className="text-center shrink-0">
                        <p className="text-sm font-bold text-slate-700">{flight.destinationAirport}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 justify-center">
                          <img src={getCountryFlag(flight.destination, 'w20')} alt="" className="w-3.5 h-2.5 rounded-sm" />
                          {getDestinationLabel(flight.destination) || flight.destination}
                        </p>
                      </div>
                    </div>

                    {/* Return leg */}
                    {flight.isRoundTrip && flight.returnAt && (
                      <div className="mt-3 pt-3 border-t border-dashed border-slate-100 flex items-center gap-3">
                        <div className="text-center shrink-0">
                          <p className="text-xs font-semibold text-slate-500">{flight.destinationAirport}</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-0.5 px-1">
                          {flight.durationBackFormatted && (
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock size={9} />
                              {flight.durationBackFormatted}
                            </span>
                          )}
                          <div className="w-full flex items-center gap-1">
                            <div className="h-px flex-1 bg-blue-100" />
                            <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              flight.returnTransfers === 0
                                ? 'bg-emerald-50 text-emerald-500 border border-emerald-100'
                                : 'bg-amber-50 text-amber-500 border border-amber-100'
                            }`}>
                              <Repeat size={8} className="inline mr-0.5" />
                              {flight.returnTransfers === 0 ? 'პირდაპირი' : `${flight.returnTransfers} გადაჯდ.`}
                            </div>
                            <div className="h-px flex-1 bg-blue-100" />
                            <ArrowRight size={10} className="text-blue-300 shrink-0" />
                          </div>
                          <span className="text-[10px] text-blue-400 flex items-center gap-1">
                            <Calendar size={9} />
                            {formatDate(flight.returnAt)}
                          </span>
                        </div>
                        <div className="text-center shrink-0">
                          <p className="text-xs font-semibold text-slate-500">{flight.originAirport}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center gap-4 lg:ml-auto lg:w-56 shrink-0 justify-between lg:justify-end">
                    <div className="text-right">
                      {flight.isRoundTrip && (
                        <p className="text-[10px] text-blue-500 font-semibold flex items-center gap-1 justify-end mb-0.5">
                          <ArrowLeftRight size={10} />
                          ორმხრივი
                        </p>
                      )}
                      <p className="text-2xl font-black text-emerald-600">
                        €{flight.price}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {flight.isRoundTrip ? 'ორივე მიმართ.' : 'ერთი მიმართ.'}
                      </p>
                    </div>
                    <a
                      href={flight.deepLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl text-sm font-bold transition-colors shrink-0"
                    >
                      შეძენა <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center text-slate-500 flex flex-col items-center">
            <Plane size={48} className="mb-4 opacity-20" />
            <h3 className="text-xl font-bold text-slate-600 mb-2">ფრენები ვერ მოიძებნა</h3>
            <p>ამ მიმართულებისთვის ფრენები ჯერ არ არის. სცადე სხვა მიმართულება.</p>
          </div>
        )}

        {/* Cross-sell: Trip builder suggestions */}
        {!loading && filteredFlights.length > 0 && (
          <div className="mt-16 space-y-12">
            {/* Trip builder banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                <ChevronsRight size={20} className="text-blue-600" />
                სრული მოგზაურობა {cityLabel}-ში
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                ფრენასთან ერთად დაგეგმე სასტუმრო, ტრანსფერი, eSIM და გასართობი აქტივობები
              </p>
              <div className="flex flex-wrap gap-3">
                {hotels.length > 0 && (
                  <a href="#hotels-section" className="flex items-center gap-2 bg-white border border-slate-200 hover:border-emerald-400 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors">
                    <Hotel size={16} className="text-emerald-600" />
                    {hotels.length} სასტუმრო
                  </a>
                )}
                {transfers.length > 0 && (
                  <a href="#transfers-section" className="flex items-center gap-2 bg-white border border-slate-200 hover:border-amber-400 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors">
                    <Car size={16} className="text-amber-600" />
                    {transfers.length} ტრანსფერი
                  </a>
                )}
                {esims.length > 0 && (
                  <a href="#esim-section" className="flex items-center gap-2 bg-white border border-slate-200 hover:border-purple-400 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors">
                    <Smartphone size={16} className="text-purple-600" />
                    eSIM პაკეტი
                  </a>
                )}
                {tickets.length > 0 && (
                  <a href="#tickets-section" className="flex items-center gap-2 bg-white border border-slate-200 hover:border-orange-400 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors">
                    <Ticket size={16} className="text-orange-600" />
                    {tickets.length} აქტივობა
                  </a>
                )}
              </div>
            </div>

            {/* eSIM suggestion banner */}
            {esims.length > 0 && (
              <div id="esim-section" className="bg-purple-50 border border-purple-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="bg-purple-100 p-4 rounded-2xl shrink-0">
                  <Smartphone size={32} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    eSIM — ინტერნეტი {cityLabel}-ში ჩამოფრენისთანავე
                  </h3>
                  <p className="text-slate-500 text-sm">
                    აღარ გჭირდება ადგილობრივი SIM ბარათის ყიდვა. აქტივირდება მყისიერად.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {esims.map((esim, i) => (
                    <a
                      key={esim.id || i}
                      href={esim.external_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-purple-200 hover:border-purple-400 text-slate-800 px-5 py-3 rounded-xl text-sm font-bold transition-colors text-center"
                    >
                      <span className="block text-xs text-slate-500">{esim.provider}</span>
                      <span className="text-emerald-600 font-black">€{esim.price}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Hotels */}
            {hotels.length > 0 && (
              <div id="hotels-section">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <Hotel size={22} className="text-emerald-600" />
                  სასტუმროები {cityLabel}-ში
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {hotels.map((hotel, i) => (
                    <Link
                      key={hotel.id || i}
                      href={`/hotel/${hotel.id}`}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-400 transition-all group"
                    >
                      <div className="h-36 overflow-hidden">
                        <img
                          src={hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop'}
                          alt={hotel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] font-bold text-emerald-600">{hotel.provider}</span>
                        <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{hotel.title}</h3>
                        <p className="text-emerald-600 font-black mt-2">
                          €{hotel.price.toFixed(0)}
                          <span className="text-slate-500 text-xs font-normal ml-1">/ღამე</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tickets & Tours */}
            {tickets.length > 0 && (
              <div id="tickets-section">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <Ticket size={22} className="text-orange-600" />
                  ბილეთები & ტურები {cityLabel}-ში
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {tickets.map((item, i) => (
                    <Link
                      key={item.id || i}
                      href={`/ticket/${item.id}`}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-orange-400 transition-all group"
                    >
                      <div className="h-32 overflow-hidden">
                        <img
                          src={item.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format&fit=crop'}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] font-bold text-orange-600">{item.provider}</span>
                        <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{item.title}</h3>
                        <p className="text-emerald-600 font-black mt-1">€{item.price.toFixed(0)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Transfers */}
            {transfers.length > 0 && (
              <div id="transfers-section">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <Car size={22} className="text-amber-600" />
                  ტრანსფერი {cityLabel}-ში
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {transfers.map((item, i) => (
                    <a
                      key={item.id || i}
                      href={item.external_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-amber-400 transition-all flex items-center gap-4"
                    >
                      <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                        <Car size={20} className="text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 line-clamp-1">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.provider}</p>
                      </div>
                      <p className="text-emerald-600 font-black shrink-0">€{item.price}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
