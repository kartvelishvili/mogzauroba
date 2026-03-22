'use client';

import { useEffect, useState, type ComponentType, type FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Plane,
  MapPin,
  Search,
  Loader2,
  Hotel,
  Car,
  Ticket,
  CheckCircle2,
  ShieldCheck,
  Wifi,
  Calendar,
  ArrowRight,
  Clock,
  ArrowLeftRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExploreResponse, TravelService } from '@/app/lib/travel';
import { getDestinationLabel } from '@/app/lib/travel';
import Footer from '../components/Footer';

type IconComponent = ComponentType<{ size?: number; className?: string }>;

export default function ExplorePageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [origin, setOrigin] = useState(searchParams.get('origin') || 'TBS');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [date, setDate] = useState(searchParams.get('date') || '');
  const [loading, setLoading] = useState(false);

  const [flights, setFlights] = useState<TravelService[]>([]);
  const [hotels, setHotels] = useState<TravelService[]>([]);
  const [tours, setTours] = useState<TravelService[]>([]);
  const [transfers, setTransfers] = useState<TravelService[]>([]);
  const [extras, setExtras] = useState<TravelService[]>([]);

  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedFlight, setSelectedFlight] = useState<TravelService | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<TravelService | null>(null);
  const [selectedTour, setSelectedTour] = useState<TravelService | null>(null);
  const [selectedTransfer, setSelectedTransfer] = useState<TravelService | null>(null);
  const [selectedExtra, setSelectedExtra] = useState<TravelService | null>(null);

  const doSearch = async (o: string, d: string, dt: string) => {
    if (!d) return;
    setLoading(true);
    setHasSearched(true);
    setErrorMessage('');
    setSelectedFlight(null);
    setSelectedHotel(null);
    setSelectedTour(null);
    setSelectedTransfer(null);
    setSelectedExtra(null);

    try {
      const params = new URLSearchParams({
        origin: o.trim().toUpperCase(),
        destination: d.trim().toUpperCase(),
      });
      if (dt) params.set('date', dt);

      const res = await fetch(`/api/explore?${params.toString()}`);
      const apiResp = (await res.json()) as ExploreResponse;

      if (!apiResp.success) {
        setErrorMessage(apiResp.error || 'ძებნა დროებით ვერ შესრულდა.');
        return;
      }

      setFlights(apiResp.data.flights || []);
      setHotels(apiResp.data.hotels || []);
      setTransfers(apiResp.data.transfers || []);
      setTours(apiResp.data.tours || []);
      setExtras(apiResp.data.extras || []);
    } catch {
      setErrorMessage('კავშირის შეცდომა. სცადე თავიდან.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-search on page load if destination is in URL params
  useEffect(() => {
    const destParam = searchParams.get('destination');
    const originParam = searchParams.get('origin') || 'TBS';
    const dateParam = searchParams.get('date') || '';
    if (destParam) {
      setOrigin(originParam);
      setDestination(destParam);
      setDate(dateParam);
      doSearch(originParam, destParam, dateParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!destination) {
      setErrorMessage('გთხოვ, მიუთითე მიმართულება.');
      return;
    }
    // Update URL
    const params = new URLSearchParams();
    params.set('origin', origin.trim().toUpperCase());
    params.set('destination', destination.trim().toUpperCase());
    if (date) params.set('date', date);
    router.replace(`/explore?${params.toString()}`);

    doSearch(origin, destination, date);
  };

  const total = [
    selectedFlight?.price,
    selectedHotel?.price,
    selectedTour?.price,
    selectedTransfer?.price,
    selectedExtra?.price,
  ].reduce<number>((sum, current) => sum + Number(current || 0), 0);

  const destinationCode = destination.trim().toUpperCase();
  const destinationLabel = destinationCode ? getDestinationLabel(destinationCode) : 'არჩეული არ არის';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
            <Search size={28} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">ჭკვიანი პაკეტის ძიება</h1>
            <p className="text-slate-500 mt-1">აირჩიე ფრენა, სასტუმრო, ტრანსფერი და ტური ერთიან პაკეტში</p>
          </div>
        </div>

        {/* Search Form */}
        <div className="w-full bg-white border border-slate-200 p-4 md:p-6 rounded-3xl shadow-lg mb-10">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 items-center">
            <div className="flex-1 w-full bg-slate-50 rounded-2xl flex items-center px-4 py-2 border border-slate-200 hover:border-slate-300 transition-colors focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
              <MapPin size={22} className="text-slate-400" />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                placeholder="საიდან (მაგ: TBS)"
                className="w-full bg-transparent text-slate-800 uppercase font-bold py-3 px-3 focus:outline-none placeholder-slate-400"
              />
            </div>

            <ArrowRight className="hidden md:block text-slate-400" />

            <div className="flex-1 w-full bg-slate-50 rounded-2xl flex items-center px-4 py-2 border border-slate-200 hover:border-slate-300 transition-colors focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
              <MapPin size={22} className="text-slate-400" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
                placeholder="სად (მაგ: PAR, ROM, DXB)"
                className="w-full bg-transparent text-slate-800 uppercase font-bold py-3 px-3 focus:outline-none placeholder-slate-400"
              />
            </div>

            <div className="flex-1 w-full bg-slate-50 rounded-2xl flex items-center px-4 py-2 border border-slate-200 hover:border-slate-300 transition-colors focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
              <Calendar size={22} className="text-slate-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-slate-800 font-bold py-3 px-3 focus:outline-none text-sm"
                style={{ colorScheme: 'light' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-black py-5 px-10 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 text-lg shadow-md shadow-emerald-500/20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
              ძიება
            </button>
          </form>

          {errorMessage && <p className="mt-3 text-sm font-medium text-rose-500">{errorMessage}</p>}
        </div>

        {/* Results */}
        <AnimatePresence>
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8"
            >
              <div className="xl:col-span-8 space-y-12">
                {/* Flights */}
                <section>
                  <SectionHeader
                    icon={Plane}
                    iconClassName="bg-blue-50 text-blue-600 border-blue-200"
                    title={`ფრენები: ${destinationCode || '-'}`}
                    subtitle={date ? `გამგზავრება ${date}` : 'უახლოესი ხელმისაწვდომი ვარიანტები'}
                  />

                  {loading ? (
                    <div className="h-32 bg-slate-100 animate-pulse rounded-2xl" />
                  ) : flights.length ? (
                    <div className="flex flex-col gap-4">
                      {flights.map((flight) => {
                        const f = flight as any;
                        const airlineName = f.airlineName || flight.airline || 'ავიაკომპანია';
                        const logoUrl = f.logoUrl;
                        const durationStr = f.durationToFormatted || '';
                        const isDirect = f.isDirect ?? (flight.description?.includes('პირდაპირი'));
                        const isRoundTrip = f.isRoundTrip || false;
                        const transfers = f.transfers ?? 0;
                        const originAirport = f.originAirport || flight.origin || origin;
                        const destAirport = f.destinationAirport || destinationCode;

                        return (
                          <div
                            key={flight.id}
                            className={`p-5 rounded-2xl border transition-all relative overflow-hidden group ${
                              selectedFlight?.id === flight.id
                                ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500/50'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                              {/* Airline logo + name */}
                              <div className="flex items-center gap-3 shrink-0">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden">
                                  {logoUrl ? (
                                    <img
                                      src={logoUrl}
                                      alt={airlineName}
                                      className="w-9 h-9 object-contain"
                                      onError={(e) => {
                                        const el = e.target as HTMLImageElement;
                                        el.onerror = null;
                                        el.style.display = 'none';
                                        el.parentElement!.innerHTML = `<span class="text-slate-400 font-bold text-xs">${flight.airline || '?'}</span>`;
                                      }}
                                    />
                                  ) : (
                                    <Plane size={20} className="text-slate-400" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-bold text-sm text-slate-800">{airlineName}</p>
                                  <p className="text-[11px] text-slate-400">{f.flightNumber || flight.airline || ''}</p>
                                </div>
                              </div>

                              {/* Route with duration */}
                              <div className="flex items-center gap-3 flex-1">
                                <div className="text-center">
                                  <p className="font-black text-slate-700">{originAirport}</p>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-0.5">
                                  {durationStr && (
                                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                      <Clock size={9} />
                                      {durationStr}
                                    </span>
                                  )}
                                  <div className="w-full flex items-center gap-1">
                                    <div className="h-px flex-1 bg-slate-200" />
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                      isDirect
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                                    }`}>
                                      {isDirect ? 'პირდაპირი' : `${transfers} გადაჯდ.`}
                                    </span>
                                    <div className="h-px flex-1 bg-slate-200" />
                                    <ArrowRight size={12} className="text-slate-300" />
                                  </div>
                                  {isRoundTrip && (
                                    <span className="text-[10px] text-blue-400 flex items-center gap-1">
                                      <ArrowLeftRight size={9} />
                                      ორმხრივი
                                    </span>
                                  )}
                                </div>
                                <div className="text-center">
                                  <p className="font-black text-blue-600">{destAirport}</p>
                                </div>
                              </div>

                              {/* Price + select */}
                              <div className="flex items-center gap-4 shrink-0">
                                <div className="text-right">
                                  <span className="text-xs text-slate-400 font-semibold">
                                    {isRoundTrip ? 'ორივე მიმართ.' : 'ერთი მიმართ.'}
                                  </span>
                                  <p className="text-2xl font-black text-slate-800">€{flight.price}</p>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedFlight(flight);
                                  }}
                                  className={`px-6 py-3 rounded-xl font-bold transition-colors ${
                                    selectedFlight?.id === flight.id
                                      ? 'bg-blue-600 text-white shadow-md'
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                                  }`}
                                >
                                  {selectedFlight?.id === flight.id ? 'დამატებულია' : 'არჩევა'}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <EmptyState text="ამ პირობებზე ფრენები ვერ მოიძებნა. სცადე სხვა თარიღი ან სხვა მიმართულება." />
                  )}
                </section>

                {/* Hotels */}
                <section>
                  <SectionHeader
                    icon={Hotel}
                    iconClassName="bg-emerald-50 text-emerald-600 border-emerald-200"
                    title={`განთავსება ${destinationLabel}-ში`}
                  />

                  {loading ? (
                    <div className="h-32 bg-slate-100 animate-pulse rounded-2xl" />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {hotels.map((hotel) => (
                        <div
                          key={hotel.id}
                          className={`rounded-3xl border transition-all overflow-hidden flex flex-col group relative ${
                            selectedHotel?.id === hotel.id
                              ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500/50'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <div className="h-44 w-full overflow-hidden relative">
                            {hotel.image_url && (
                              <img
                                src={hotel.image_url}
                                alt={hotel.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute bottom-3 left-3 flex flex-col">
                              <span className="bg-emerald-500 text-slate-950 text-xs px-2 py-0.5 rounded font-black uppercase tracking-wider w-fit mb-1">
                                {hotel.provider}
                              </span>
                              <span className="font-bold text-white text-lg leading-tight w-11/12">
                                {hotel.title}
                              </span>
                            </div>
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <p className="text-sm text-slate-500 mb-4">{hotel.description}</p>
                            <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-200">
                              <div>
                                <span className="text-xs text-slate-400 block mb-1">ორიენტირი ფასი</span>
                                <span className="text-2xl font-black text-emerald-600">EUR {hotel.price}</span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedHotel(hotel);
                                }}
                                className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
                                  selectedHotel?.id === hotel.id
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                                }`}
                              >
                                არჩევა
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* Transfers & Tours */}
                {!loading && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t border-slate-200 pt-10">
                    <section>
                      <SectionHeader
                        icon={Car}
                        iconClassName="bg-amber-50 text-amber-600 border-amber-200"
                        title="ტრანსფერი და მანქანა"
                      />
                      <div className="flex flex-col gap-4">
                        {transfers.map((transfer) => (
                          <SelectableRow
                            key={transfer.id}
                            item={transfer}
                            active={selectedTransfer?.id === transfer.id}
                            accentClassName="bg-amber-50 border-amber-500"
                            defaultClassName="bg-white border-slate-200 hover:bg-slate-50"
                            textClassName="text-amber-600"
                            onSelect={() => setSelectedTransfer(transfer)}
                          />
                        ))}
                      </div>
                    </section>

                    <section>
                      <SectionHeader
                        icon={Ticket}
                        iconClassName="bg-purple-50 text-purple-600 border-purple-200"
                        title="ტურები"
                      />
                      <div className="flex flex-col gap-4">
                        {tours.map((tour) => (
                          <SelectableRow
                            key={tour.id}
                            item={tour}
                            active={selectedTour?.id === tour.id}
                            accentClassName="bg-purple-50 border-purple-500"
                            defaultClassName="bg-white border-slate-200 hover:bg-slate-50"
                            textClassName="text-purple-600"
                            onSelect={() => setSelectedTour(tour)}
                          />
                        ))}
                      </div>
                    </section>
                  </div>
                )}
              </div>

              {/* Cart Sidebar */}
              <div className="xl:col-span-4 relative">
                <div className="sticky top-24 bg-white backdrop-blur-xl border border-slate-200 rounded-3xl p-6 md:p-8 shadow-lg flex flex-col h-fit">
                  <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">შენი პაკეტი</h3>
                  <p className="text-sm text-slate-500 mb-8 border-b border-slate-200 pb-4">
                    მიმართულება: <strong className="text-slate-800">{destinationLabel}</strong>
                  </p>

                  <div className="flex flex-col gap-5 mb-8 flex-1">
                    {selectedFlight ? (
                      <CartItem
                        icon={Plane}
                        color="blue"
                        title={selectedFlight.title}
                        desc={selectedFlight.provider}
                        price={selectedFlight.price}
                        link={selectedFlight.external_link}
                      />
                    ) : (
                      <EmptyCartItem icon={Plane} title="აირჩიე ავიაბილეთი" />
                    )}

                    {selectedHotel ? (
                      <CartItem
                        icon={Hotel}
                        color="emerald"
                        title={selectedHotel.title}
                        desc={selectedHotel.provider}
                        price={selectedHotel.price}
                        link={selectedHotel.external_link}
                      />
                    ) : (
                      <EmptyCartItem icon={Hotel} title="აირჩიე სასტუმრო" />
                    )}

                    {selectedTransfer ? (
                      <CartItem
                        icon={Car}
                        color="amber"
                        title={selectedTransfer.title}
                        desc={selectedTransfer.provider}
                        price={selectedTransfer.price}
                        link={selectedTransfer.external_link}
                      />
                    ) : (
                      <EmptyCartItem icon={Car} title="დაამატე ტრანსფერი ან მანქანა" />
                    )}

                    {selectedTour ? (
                      <CartItem
                        icon={Ticket}
                        color="purple"
                        title={selectedTour.title}
                        desc={selectedTour.provider}
                        price={selectedTour.price}
                        link={selectedTour.external_link}
                      />
                    ) : (
                      <EmptyCartItem icon={Ticket} title="დაამატე ტური" />
                    )}

                    {extras.length > 0 && selectedExtra ? (
                      <CartItem
                        icon={Wifi}
                        color="sky"
                        title={selectedExtra.title}
                        desc={selectedExtra.provider}
                        price={selectedExtra.price}
                        link={selectedExtra.external_link}
                      />
                    ) : extras.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setSelectedExtra(extras[0])}
                        className="text-xs text-sky-600 cursor-pointer hover:underline text-center mt-2 font-medium"
                      >
                        + დაამატე eSIM ან დაზღვევა
                      </button>
                    ) : null}
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5 flex justify-between items-center mb-6 border border-slate-200">
                    <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">სულ ჯამი:</span>
                    <span className="text-4xl font-black text-emerald-600">
                      EUR {total}
                    </span>
                  </div>

                  {selectedFlight || selectedHotel || selectedTransfer || selectedTour || selectedExtra ? (
                    <a
                      href={
                        selectedFlight?.external_link ||
                        selectedHotel?.external_link ||
                        selectedTransfer?.external_link ||
                        selectedTour?.external_link ||
                        selectedExtra?.external_link ||
                        '#'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-6 rounded-2xl transition-all flex justify-center items-center gap-2 shadow-md"
                    >
                      <ShieldCheck size={20} />
                      პარტნიორ ლინკზე გადასვლა
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-slate-100 text-slate-400 font-black py-4 px-6 rounded-2xl flex justify-center items-center gap-2"
                    >
                      <ShieldCheck size={20} />
                      აირჩიე სერვისები
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

/* ─── Sub-components ─── */

function SectionHeader({
  icon: Icon,
  iconClassName,
  title,
  subtitle,
}: {
  icon: IconComponent;
  iconClassName: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-xl border ${iconClassName}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-2xl font-black text-slate-800">{title}</h3>
        {subtitle ? <p className="text-sm text-slate-500 mt-1">{subtitle}</p> : null}
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-slate-400 text-center font-medium">
      {text}
    </div>
  );
}

function SelectableRow({
  item,
  active,
  accentClassName,
  defaultClassName,
  textClassName,
  onSelect,
}: {
  item: TravelService;
  active: boolean;
  accentClassName: string;
  defaultClassName: string;
  textClassName: string;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer min-h-[90px] p-3 rounded-2xl border flex items-center gap-4 transition-colors ${
        active ? accentClassName : defaultClassName
      }`}
    >
      {item.image_url ? (
        <img src={item.image_url} className="w-16 h-16 rounded-xl object-cover shrink-0" alt="" />
      ) : null}
      <div className="flex flex-col flex-1">
        <span className={`text-xs font-bold mb-0.5 ${textClassName}`}>{item.provider}</span>
        <span className="text-sm font-bold text-slate-800 leading-tight">{item.title}</span>
      </div>
      <div className="text-right pr-2">
        <div className={`font-black text-lg ${textClassName}`}>EUR {item.price}</div>
        {active ? <CheckCircle2 size={16} className={`${textClassName} ml-auto mt-1`} /> : null}
      </div>
    </div>
  );
}

function CartItem({
  icon: Icon,
  color,
  title,
  desc,
  price,
  link,
}: {
  icon: IconComponent;
  color: 'blue' | 'emerald' | 'amber' | 'purple' | 'sky';
  title: string;
  desc: string;
  price: number;
  link: string;
}) {
  const colorMap = {
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    amber: 'text-amber-600 bg-amber-50 border-amber-200',
    purple: 'text-purple-600 bg-purple-50 border-purple-200',
    sky: 'text-sky-600 bg-sky-50 border-sky-200',
  } as const;

  return (
    <div className="flex justify-between items-center group">
      <div className="flex gap-3 items-center overflow-hidden pr-3">
        <div className={`p-2.5 rounded-xl border ${colorMap[color]} shrink-0`}>
          <Icon size={18} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
            {desc}
          </span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-slate-700 truncate hover:text-slate-900 transition-colors"
            title={title}
          >
            {title}
          </a>
        </div>
      </div>
      <span className="font-black text-slate-800 shrink-0 text-lg">EUR {price}</span>
    </div>
  );
}

function EmptyCartItem({ icon: Icon, title }: { icon: IconComponent; title: string }) {
  return (
    <div className="flex items-center gap-3 opacity-40 grayscale">
      <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-100 shrink-0">
        <Icon size={18} className="text-slate-400" />
      </div>
      <span className="text-sm font-medium text-slate-400 border-b border-dashed border-slate-300 pb-0.5">
        {title}
      </span>
    </div>
  );
}
