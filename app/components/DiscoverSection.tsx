'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Ticket, Hotel, MapPin, Star, ChevronRight, ChevronLeft, 
  Loader2, Globe, Filter 
} from 'lucide-react';

interface ServiceItem {
  id: string;
  provider: string;
  category: string;
  destination: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  external_link: string;
  image_url?: string;
}

const regions = [
  { id: 'ყველა', label: 'ყველა' },
  { id: 'ევროპა', label: 'ევროპა' },
  { id: 'აზია', label: 'აზია' },
  { id: 'ამერიკა', label: 'ამერიკა' },
  { id: 'აფრიკა', label: 'აფრიკა' },
  { id: 'საქართველო', label: 'საქართველო' },
];

const cityData: Record<string, { code: string; label: string; region: string; flag: string }[]> = {
  'ევროპა': [
    { code: 'PAR', label: 'პარიზი', region: 'ევროპა', flag: '🇫🇷' },
    { code: 'ROM', label: 'რომი', region: 'ევროპა', flag: '🇮🇹' },
    { code: 'BCN', label: 'ბარსელონა', region: 'ევროპა', flag: '🇪🇸' },
    { code: 'LON', label: 'ლონდონი', region: 'ევროპა', flag: '🇬🇧' },
    { code: 'AMS', label: 'ამსტერდამი', region: 'ევროპა', flag: '🇳🇱' },
    { code: 'BER', label: 'ბერლინი', region: 'ევროპა', flag: '🇩🇪' },
    { code: 'PRG', label: 'პრაღა', region: 'ევროპა', flag: '🇨🇿' },
    { code: 'VIE', label: 'ვენა', region: 'ევროპა', flag: '🇦🇹' },
    { code: 'ATH', label: 'ათენი', region: 'ევროპა', flag: '🇬🇷' },
    { code: 'IST', label: 'სტამბოლი', region: 'ევროპა', flag: '🇹🇷' },
    { code: 'MAD', label: 'მადრიდი', region: 'ევროპა', flag: '🇪🇸' },
    { code: 'MIL', label: 'მილანი', region: 'ევროპა', flag: '🇮🇹' },
  ],
  'აზია': [
    { code: 'DXB', label: 'დუბაი', region: 'აზია', flag: '🇦🇪' },
    { code: 'BKK', label: 'ბანგკოკი', region: 'აზია', flag: '🇹🇭' },
    { code: 'TYO', label: 'ტოკიო', region: 'აზია', flag: '🇯🇵' },
    { code: 'SIN', label: 'სინგაპური', region: 'აზია', flag: '🇸🇬' },
    { code: 'HKG', label: 'ჰონგ კონგი', region: 'აზია', flag: '🇭🇰' },
    { code: 'DEL', label: 'დელი', region: 'აზია', flag: '🇮🇳' },
    { code: 'TLV', label: 'თელ-ავივი', region: 'აზია', flag: '🇮🇱' },
  ],
  'ამერიკა': [
    { code: 'NYC', label: 'ნიუ-იორკი', region: 'ამერიკა', flag: '🇺🇸' },
    { code: 'MIA', label: 'მაიამი', region: 'ამერიკა', flag: '🇺🇸' },
    { code: 'CUN', label: 'კანკუნი', region: 'ამერიკა', flag: '🇲🇽' },
  ],
  'აფრიკა': [
    { code: 'CAI', label: 'კაირო', region: 'აფრიკა', flag: '🇪🇬' },
    { code: 'MRK', label: 'მარაკეში', region: 'აფრიკა', flag: '🇲🇦' },
  ],
  'საქართველო': [
    { code: 'TBS', label: 'თბილისი', region: 'საქართველო', flag: '🇬🇪' },
    { code: 'KUT', label: 'ქუთაისი', region: 'საქართველო', flag: '🇬🇪' },
    { code: 'BUS', label: 'ბათუმი', region: 'საქართველო', flag: '🇬🇪' },
  ],
};

const allCities = Object.values(cityData).flat();

const categoryTags: Record<string, { label: string; color: string }> = {
  tour: { label: 'ტური', color: 'bg-blue-500' },
  ticket: { label: 'ბილეთი', color: 'bg-purple-500' },
  hotel: { label: 'სასტუმრო', color: 'bg-emerald-500' },
  transfer: { label: 'ტრანსფერი', color: 'bg-amber-500' },
  flight: { label: 'ფრენა', color: 'bg-sky-500' },
  car: { label: 'მანქანა', color: 'bg-orange-500' },
  esim: { label: 'eSIM', color: 'bg-cyan-500' },
  insurance: { label: 'დაზღვევა', color: 'bg-rose-500' },
};

function generateRating() {
  return (4.5 + Math.random() * 0.5).toFixed(1);
}

function generateReviews() {
  return Math.floor(10000 + Math.random() * 120000);
}

// Fallback images per category
const fallbackImages: Record<string, string[]> = {
  ticket: [
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=500&auto=format&fit=crop',
  ],
  tour: [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=500&auto=format&fit=crop',
  ],
  hotel: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=500&auto=format&fit=crop',
  ],
};

function getFallbackImage(category: string, index: number) {
  const images = fallbackImages[category] || fallbackImages.tour;
  return images[index % images.length];
}

function getStarRating(price: number): number {
  if (price > 200) return 5;
  if (price > 150) return 4;
  if (price > 80) return 3;
  return 2;
}

export default function DiscoverSection() {
  const [selectedRegion, setSelectedRegion] = useState('ყველა');
  const [selectedCity, setSelectedCity] = useState('PAR');
  const [hotelCity, setHotelCity] = useState('PAR');
  const [hotelRegion, setHotelRegion] = useState('ყველა');
  const [independentHotelFilter, setIndependentHotelFilter] = useState(false);
  
  const [tickets, setTickets] = useState<ServiceItem[]>([]);
  const [hotels, setHotels] = useState<ServiceItem[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingHotels, setLoadingHotels] = useState(true);
  
  const [ticketPage, setTicketPage] = useState(0);
  const [hotelScroll, setHotelScroll] = useState(0);
  
  const TICKETS_PER_PAGE = 10;

  const availableCities = selectedRegion === 'ყველა' 
    ? allCities 
    : (cityData[selectedRegion] || []);

  const hotelCities = hotelRegion === 'ყველა'
    ? allCities
    : (cityData[hotelRegion] || []);

  const currentCityLabel = allCities.find(c => c.code === selectedCity)?.label || selectedCity;
  const currentHotelCityLabel = allCities.find(c => c.code === hotelCity)?.label || hotelCity;

  const fetchTickets = useCallback(async (city: string) => {
    setLoadingTickets(true);
    try {
      const res = await fetch(`/api/services?destination=${city}&category=ticket,tour`);
      const data = await res.json();
      setTickets(data.data || []);
    } catch {
      setTickets([]);
    }
    setLoadingTickets(false);
  }, []);

  const fetchHotels = useCallback(async (city: string) => {
    setLoadingHotels(true);
    try {
      const res = await fetch(`/api/services?destination=${city}&category=hotel`);
      const data = await res.json();
      setHotels(data.data || []);
    } catch {
      setHotels([]);
    }
    setLoadingHotels(false);
  }, []);

  useEffect(() => {
    fetchTickets(selectedCity);
    if (!independentHotelFilter) {
      setHotelCity(selectedCity);
      fetchHotels(selectedCity);
    }
  }, [selectedCity, independentHotelFilter, fetchTickets, fetchHotels]);

  useEffect(() => {
    if (independentHotelFilter) {
      fetchHotels(hotelCity);
    }
  }, [hotelCity, independentHotelFilter, fetchHotels]);

  // Reset city when region changes
  useEffect(() => {
    const cities = selectedRegion === 'ყველა' ? allCities : (cityData[selectedRegion] || []);
    if (cities.length > 0 && !cities.find(c => c.code === selectedCity)) {
      setSelectedCity(cities[0].code);
    }
  }, [selectedRegion, selectedCity]);

  useEffect(() => {
    if (independentHotelFilter) {
      const cities = hotelRegion === 'ყველა' ? allCities : (cityData[hotelRegion] || []);
      if (cities.length > 0 && !cities.find(c => c.code === hotelCity)) {
        setHotelCity(cities[0].code);
      }
    }
  }, [hotelRegion, hotelCity, independentHotelFilter]);

  const ticketPages = Math.ceil(tickets.length / TICKETS_PER_PAGE);
  const visibleTickets = tickets.slice(ticketPage * TICKETS_PER_PAGE, (ticketPage + 1) * TICKETS_PER_PAGE);

  return (
    <div className="z-10 w-full max-w-7xl px-4 md:px-8 mb-20">
      
      {/* ========== TICKETS & ATTRACTIONS ========== */}
      <div className="mt-28">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <Ticket size={24} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">
                ბილეთები & ატრაქციონები — {currentCityLabel}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                მუზეუმები, ტურები და ატრაქციონები — შეიძინე წინასწარ ონლაინ
              </p>
            </div>
          </div>
          <Link 
            href={`/tickets?destination=${selectedCity}`}
            className="shrink-0 border border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
          >
            ყველა ბილეთი <ChevronRight size={16} />
          </Link>
        </div>

        {/* Region + City Filters */}
        <div className="mb-6 space-y-3">
          {/* Region tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-slate-500" />
            {regions.map(r => (
              <button
                key={r.id}
                onClick={() => { setSelectedRegion(r.id); setTicketPage(0); }}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedRegion === r.id
                    ? 'bg-purple-50 text-purple-600 border border-purple-200'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          
          {/* City pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {availableCities.map(city => (
              <button
                key={city.code}
                onClick={() => { setSelectedCity(city.code); setTicketPage(0); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  selectedCity === city.code
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{city.flag}</span>
                {city.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets Grid */}
        {loadingTickets ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-purple-500" size={32} />
            <span className="ml-3 text-slate-500">იტვირთება...</span>
          </div>
        ) : visibleTickets.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Ticket size={40} className="mx-auto mb-3 opacity-30" />
            <p>ამ ქალაქში ბილეთები ჯერ არ არის დამატებული</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {visibleTickets.map((item, i) => {
                const rating = generateRating();
                const reviews = generateReviews();
                const tag = categoryTags[item.category] || categoryTags.ticket;
                const hasDiscount = Math.random() > 0.5;
                const discountPct = Math.floor(Math.random() * 40 + 10);
                const imgSrc = item.image_url || getFallbackImage(item.category, i);
                
                return (
                  <Link
                    key={item.id || i}
                    href={`/ticket/${item.id}`}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all group flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-[180px] overflow-hidden">
                      <img 
                        src={imgSrc} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category tag */}
                      <div className={`absolute top-3 left-3 ${tag.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-md`}>
                        {tag.label}
                      </div>
                      {/* Discount badge */}
                      {hasDiscount && (
                        <div className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                          -{discountPct}%
                        </div>
                      )}
                      {/* Rating overlay */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span className="text-white text-xs font-bold">{rating}</span>
                          <span className="text-slate-400 text-[10px]">({reviews.toLocaleString()})</span>
                        </div>
                        {item.provider && (
                          <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] text-emerald-300 font-bold">
                            TOP
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-sm font-bold text-slate-800 mb-1 line-clamp-2">{item.title}</h3>
                      <p className="text-slate-400 text-xs flex items-center gap-1 mb-3">
                        <MapPin size={10} /> {currentCityLabel}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-400">ფასი</span>
                          <p className="text-lg font-black text-emerald-600">
                            €{item.price.toFixed(0)}
                            {hasDiscount && (
                              <span className="text-slate-400 line-through text-xs ml-1.5">
                                €{Math.round(item.price * (1 + discountPct / 100))}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-emerald-500 group-hover:text-emerald-600 transition-colors text-slate-500">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {ticketPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setTicketPage(p => Math.max(0, p - 1))}
                  disabled={ticketPage === 0}
                  className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: ticketPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setTicketPage(i)}
                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                      ticketPage === i
                        ? 'bg-purple-50 text-purple-600 border border-purple-200'
                        : 'border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setTicketPage(p => Math.min(ticketPages - 1, p + 1))}
                  disabled={ticketPage === ticketPages - 1}
                  className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ========== HOTELS ========== */}
      <div className="mt-24">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <Hotel size={24} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tight">
                სასტუმროები — {currentHotelCityLabel}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                საუკეთესო ლოკაციები, ექსკლუზიური ფასები
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Independent filter toggle */}
            <button
              onClick={() => setIndependentHotelFilter(!independentHotelFilter)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all border ${
                independentHotelFilter
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : 'text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
            >
              <Filter size={12} className="inline mr-1" />
              {independentHotelFilter ? 'ცალკე ფილტრი ✓' : 'ცალკე ფილტრი'}
            </button>
            <Link 
              href={`/hotels?destination=${hotelCity}`}
              className="shrink-0 border border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
            >
              ყველა სასტუმრო <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Hotel filters — only when independent */}
        {independentHotelFilter && (
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Globe size={16} className="text-slate-500" />
              {regions.map(r => (
                <button
                  key={r.id}
                  onClick={() => setHotelRegion(r.id)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    hotelRegion === r.id
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {hotelCities.map(city => (
                <button
                  key={city.code}
                  onClick={() => setHotelCity(city.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    hotelCity === city.code
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{city.flag}</span>
                  {city.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hotels Carousel */}
        {loadingHotels ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-emerald-600" size={32} />
            <span className="ml-3 text-slate-400">იტვირთება...</span>
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Hotel size={40} className="mx-auto mb-3 opacity-30" />
            <p>ამ ქალაქში სასტუმროები ჯერ არ არის დამატებული</p>
          </div>
        ) : (
          <div className="relative">
            {/* Scroll buttons */}
            {hotelScroll > 0 && (
              <button
                onClick={() => setHotelScroll(s => Math.max(0, s - 1))}
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 shadow-md transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {hotelScroll < Math.max(0, hotels.length - 5) && (
              <button
                onClick={() => setHotelScroll(s => Math.min(hotels.length - 5, s + 1))}
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 shadow-md transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            )}

            <div className="overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${hotelScroll * (100 / 5 + 1.2)}%)` }}
              >
                {hotels.map((hotel, i) => {
                  const stars = getStarRating(hotel.price);
                  const score = (7.5 + Math.random() * 2.5).toFixed(1);
                  const imgSrc = hotel.image_url || getFallbackImage('hotel', i);

                  return (
                    <a
                      key={hotel.id || i}
                      href={hotel.external_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-none w-[calc(20%-13px)] min-w-[220px] bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all group"
                    >
                      {/* Image */}
                      <div className="relative h-[200px] overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={hotel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Stars */}
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-0.5">
                          {Array.from({ length: stars }, (_, j) => (
                            <Star key={j} size={11} className="text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        {/* Rating score */}
                        <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                          <Star size={10} className="fill-white" />
                          {score}
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-slate-800 mb-1 line-clamp-2">{hotel.title}</h3>
                        <p className="text-slate-400 text-xs flex items-center gap-1 mb-3 line-clamp-1">
                          <MapPin size={10} /> {currentHotelCityLabel}, {hotel.description?.split(',')[0] || ''}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-emerald-600 text-lg font-black">
                              €{hotel.price.toFixed(0)}
                              <span className="text-slate-400 text-[11px] font-normal ml-1">/ღამე</span>
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors text-slate-400">
                            <ChevronRight size={16} />
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
