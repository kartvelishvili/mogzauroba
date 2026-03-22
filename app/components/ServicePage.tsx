'use client';

import { useEffect, useState, type ComponentType } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2, ExternalLink, Star, MapPin, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DESTINATION_PRESETS,
  getDestinationLabel,
  getCountryFlag,
  normalizeDestination,
  type TravelService,
} from '@/app/lib/travel';
import Footer from './Footer';

type IconComponent = ComponentType<{ size?: number; className?: string }>;

type ServicePageProps = {
  title: string;
  description: string;
  icon: IconComponent;
  category?: string;
  categoryFilter?: boolean;
};

const providerColors: Record<string, string> = {
  Aviasales: 'border-b-blue-500 text-blue-600',
  'Kiwi.com': 'border-b-teal-500 text-teal-600',
  'Trip.com': 'border-b-sky-500 text-sky-600',
  Hotellook: 'border-b-indigo-500 text-indigo-600',
  'Booking.com': 'border-b-blue-600 text-blue-600',
  GetYourGuide: 'border-b-red-500 text-red-600',
  Viator: 'border-b-lime-500 text-lime-600',
  Tiqets: 'border-b-violet-500 text-violet-600',
  Musement: 'border-b-fuchsia-500 text-fuchsia-600',
  Klook: 'border-b-orange-500 text-orange-600',
  Kiwitaxi: 'border-b-green-500 text-green-600',
  'Welcome Pickups': 'border-b-yellow-500 text-yellow-600',
  GetTransfer: 'border-b-emerald-500 text-emerald-600',
  EconomyBookings: 'border-b-amber-500 text-amber-600',
  Localrent: 'border-b-cyan-500 text-cyan-600',
  Omio: 'border-b-pink-500 text-pink-600',
  Airalo: 'border-b-purple-500 text-purple-600',
  Yesim: 'border-b-sky-400 text-sky-600',
  EKTA: 'border-b-rose-500 text-rose-600',
  SafetyWing: 'border-b-orange-400 text-orange-600',
};

export default function ServicePage({
  title,
  description,
  icon: Icon,
  category,
  categoryFilter,
}: ServicePageProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const destination = normalizeDestination(searchParams.get('destination'));
  const [services, setServices] = useState<TravelService[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const regions = Array.from(new Set(DESTINATION_PRESETS.map((d) => d.region)));
  const filteredPresets = activeRegion
    ? DESTINATION_PRESETS.filter((d) => d.region === activeRegion)
    : DESTINATION_PRESETS;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/services?destination=${destination}${category ? `&category=${category}` : ''}`,
        );
        const data = await res.json();
        setServices(data.data || []);
      } catch (error) {
        console.error(error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category, destination]);

  const displayedServices = activeCategory
    ? services.filter(s => s.category === activeCategory)
    : services;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
              <Icon size={32} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">{title}</h1>
              <p className="text-slate-500 mt-1">{description}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">
              რეგიონი
            </span>
            <div className="flex flex-wrap gap-2 mb-2">
              <button
                type="button"
                onClick={() => setActiveRegion(null)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeRegion === null
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white border border-slate-200 text-slate-500 hover:border-emerald-400'
                }`}
              >
                ყველა
              </button>
              {regions.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActiveRegion(region)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    activeRegion === region
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white border border-slate-200 text-slate-500 hover:border-emerald-400'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">
              მიმართულება
            </span>
            <div className="flex flex-wrap gap-2">
              {filteredPresets.map((item) => {
                const active = item.code === destination;
                return (
                  <Link
                    key={item.code}
                    href={`${pathname}?destination=${item.code}`}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors flex items-center gap-2 ${
                      active
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-400'
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

        {/* Category filter (tickets vs tours) */}
        {categoryFilter && category && category.includes(',') && (
          <div className="flex items-center gap-3 mt-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500">ტიპი</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === null ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-400'
                }`}
              >
                ყველა
              </button>
              {category.split(',').map(cat => {
                const catLabels: Record<string, string> = {
                  ticket: 'ბილეთები',
                  tour: 'ტურები',
                  hotel: 'სასტუმროები',
                  transfer: 'ტრანსფერი',
                  car: 'ავტომობილი',
                  esim: 'eSIM',
                  insurance: 'დაზღვევა',
                };
                return (
                  <button
                    key={cat.trim()}
                    type="button"
                    onClick={() => setActiveCategory(activeCategory === cat.trim() ? null : cat.trim())}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      activeCategory === cat.trim() ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-400'
                    }`}
                  >
                    {catLabels[cat.trim()] || cat.trim()}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-slate-500">
            აქტიური კატალოგი: <span className="text-slate-700 font-semibold">{getDestinationLabel(destination)}</span>{' '}
            ({destination})
          </p>
          {!loading && displayedServices.length > 0 && (
            <p className="text-sm text-slate-500">
              ნაპოვნია: <span className="text-emerald-600 font-bold">{displayedServices.length}</span> შეთავაზება
            </p>
          )}
        </div>

        <div className="w-full h-px bg-slate-200 my-10" />

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 text-slate-500 gap-4">
            <Loader2 size={40} className="animate-spin text-emerald-500" />
            <p>მონაცემების ჩატვირთვა კატალოგიდან...</p>
          </div>
        ) : displayedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedServices.map((service, index) => {
              const colorClass = providerColors[service.provider] || 'border-b-slate-500 text-slate-600';
              const fakeRating = (4.3 + (index * 0.17) % 0.7).toFixed(1);
              const fakeReviews = 120 + index * 37;
              // Internal detail pages for hotels and tickets/tours
              const hasDetailPage = service.category === 'hotel' || service.category === 'ticket' || service.category === 'tour';
              const detailHref = service.category === 'hotel' ? `/hotel/${service.id}` : `/ticket/${service.id}`;
              return (
                <motion.div
                  key={service.id || `${service.provider}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col group"
                >
                  {hasDetailPage ? (
                    <Link href={detailHref} className="h-48 relative overflow-hidden block">
                      {service.image_url ? (
                        <img
                          src={service.image_url}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          alt={service.title}
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                          <Icon size={48} className="text-slate-300" />
                        </div>
                      )}
                      <div className={`absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold border border-slate-200 ${colorClass}`}>
                        {service.provider}
                      </div>
                      {service.price > 0 && service.price < 50 && (
                        <div className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <TrendingDown size={10} /> იაფი
                        </div>
                      )}
                    </Link>
                  ) : (
                  <div className="h-48 relative overflow-hidden">
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt={service.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <Icon size={48} className="text-slate-300" />
                      </div>
                    )}
                    <div className={`absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold border border-slate-200 ${colorClass}`}>
                      {service.provider}
                    </div>
                    {service.price > 0 && service.price < 50 && (
                      <div className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <TrendingDown size={10} /> იაფი
                      </div>
                    )}
                  </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star size={13} className="fill-amber-400" />
                        <span className="text-xs font-bold">{fakeRating}</span>
                      </div>
                      <span className="text-slate-600 text-[11px]">({fakeReviews})</span>
                    </div>

                    {hasDetailPage ? (
                      <Link href={detailHref}>
                        <h3 className="font-bold text-lg leading-tight mb-2 text-slate-800 hover:text-emerald-600 transition-colors">{service.title}</h3>
                      </Link>
                    ) : (
                      <h3 className="font-bold text-lg leading-tight mb-2 text-slate-800">{service.title}</h3>
                    )}
                    <p className="text-sm text-slate-500 mb-1 flex items-center gap-1">
                      <MapPin size={12} className="text-emerald-500" />
                      <img src={getCountryFlag(service.destination, 'w20')} alt="" className="w-4 h-3 rounded-sm" />
                      {getDestinationLabel(service.destination)}
                    </p>
                    <p className="text-sm text-slate-500 mb-6 flex-1 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                          საწყისი ფასი
                        </span>
                        <span className="text-xl font-black text-emerald-600">
                          {service.currency || 'EUR'} {service.price}
                        </span>
                      </div>
                      {hasDetailPage ? (
                        <Link
                          href={detailHref}
                          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                        >
                          ვრცლად <ExternalLink size={14} />
                        </Link>
                      ) : (
                        <a
                          href={service.external_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                        >
                          ნახვა <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center text-slate-500 flex flex-col items-center">
            <Icon size={48} className="mb-4 opacity-20" />
            <h3 className="text-xl font-bold text-slate-600 mb-2">მონაცემები ვერ მოიძებნა</h3>
            <p>
              ამ მიმართულებისთვის ჯერ სინქრონიზებული ჩანაწერები არ არის. სცადე სხვა მიმართულება ან გააშვი
              sync route.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
