'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Star, MapPin, CheckCircle, Wifi, Coffee,
  ShieldCheck, ChevronRight, Hotel, ExternalLink, Plane,
  Calendar, Users, Car, Ticket, Smartphone, Globe
} from 'lucide-react';
import { getCountryFlag } from '@/app/lib/travel';

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

const destinationLabels: Record<string, string> = {
  PAR: 'პარიზი', ROM: 'რომი', BCN: 'ბარსელონა', LON: 'ლონდონი',
  AMS: 'ამსტერდამი', BER: 'ბერლინი', PRG: 'პრაღა', VIE: 'ვენა',
  ATH: 'ათენი', IST: 'სტამბოლი', MAD: 'მადრიდი', MIL: 'მილანი',
  DXB: 'დუბაი', BKK: 'ბანგკოკი', TYO: 'ტოკიო', SIN: 'სინგაპური',
  HKG: 'ჰონგ კონგი', DEL: 'დელი', TLV: 'თელ-ავივი',
  NYC: 'ნიუ-იორკი', MIA: 'მაიამი', CUN: 'კანკუნი',
  CAI: 'კაირო', MRK: 'მარაკეში',
  TBS: 'თბილისი', KUT: 'ქუთაისი', BUS: 'ბათუმი',
};

const categoryLabels: Record<string, { label: string; icon: typeof Hotel }> = {
  hotel: { label: 'სასტუმრო', icon: Hotel },
  flight: { label: 'ფრენა', icon: Plane },
  tour: { label: 'ტური', icon: MapPin },
  transfer: { label: 'ტრანსფერი', icon: Car },
  ticket: { label: 'ბილეთი', icon: Ticket },
  esim: { label: 'eSIM', icon: Smartphone },
  insurance: { label: 'დაზღვევა', icon: ShieldCheck },
};

const hotelAmenities = [
  { icon: Wifi, label: 'უფასო Wi-Fi' },
  { icon: Coffee, label: 'საუზმე ჩართულია' },
  { icon: CheckCircle, label: 'უფასო გაუქმება' },
  { icon: ShieldCheck, label: 'დაცული გადახდა' },
];

export default function HotelDetailClient({ hotelId }: { hotelId: string }) {
  const [hotel, setHotel] = useState<ServiceItem | null>(null);
  const [related, setRelated] = useState<ServiceItem[]>([]);
  const [crossSell, setCrossSell] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/service/${hotelId}`);
        const data = await res.json();
        if (data.success) {
          setHotel(data.data);
          setRelated(data.related || []);
          setCrossSell(data.crossSell || []);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
      setLoading(false);
    }
    load();
  }, [hotelId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <Hotel size={64} className="text-slate-300 mb-6" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">სასტუმრო ვერ მოიძებნა</h1>
        <p className="text-slate-500 mb-6">მოთხოვნილი სასტუმრო არ არსებობს ან წაიშალა</p>
        <Link href="/hotels" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-colors">
          სასტუმროებზე დაბრუნება
        </Link>
      </div>
    );
  }

  const cityLabel = destinationLabels[hotel.destination] || hotel.destination;
  const imgSrc = hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=900&auto=format&fit=crop';
  const rating = (4.2 + Math.random() * 0.7).toFixed(1);
  const reviews = Math.floor(500 + Math.random() * 4500);
  const stars = Math.min(5, Math.max(3, Math.floor(hotel.price / 50) + 2));
  const flagUrl = getCountryFlag(hotel.destination, 'w40');

  // Group cross-sell by category
  const flights = crossSell.filter(s => s.category === 'flight').slice(0, 3);
  const tours = crossSell.filter(s => s.category === 'tour').slice(0, 3);
  const transfers = crossSell.filter(s => s.category === 'transfer').slice(0, 2);
  const esims = crossSell.filter(s => s.category === 'esim').slice(0, 2);
  const tickets = crossSell.filter(s => s.category === 'ticket').slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[420px] md:h-[500px] w-full overflow-hidden">
        <img src={imgSrc} alt={hotel.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-black/20 to-transparent" />

        <div className="absolute top-6 left-6 z-10">
          <Link href="/hotels" className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-black/70 transition-colors text-sm font-medium">
            <ArrowLeft size={18} />
            სასტუმროები
          </Link>
        </div>

        <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
          <div className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
            <img src={flagUrl} alt="" className="w-5 h-3.5 rounded-sm object-cover" />
            {cityLabel}
          </div>
          <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            {rating}
            <span className="text-white/70 font-normal">({reviews.toLocaleString()})</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
              <MapPin size={14} />
              <span>{cityLabel}</span>
              <span className="mx-1">•</span>
              <div className="flex gap-0.5">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 leading-tight">
              {hotel.title}
            </h1>
            <p className="text-slate-600 mt-2 text-sm flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-xs font-bold">{hotel.provider}</span>
              ოფიციალური პარტნიორი
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        {/* Amenities */}
        <div className="flex flex-wrap gap-3 mb-10">
          {hotelAmenities.map((a, i) => (
            <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
              <a.icon size={16} className="text-emerald-600" />
              <span className="text-sm text-slate-600 font-medium">{a.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <Hotel size={20} className="text-emerald-600" />
                სასტუმროს შესახებ
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {hotel.description ||
                  `${hotel.title} — ${cityLabel}-ის ერთ-ერთი საუკეთესო სასტუმრო. მდებარეობს ქალაქის ცენტრში, ტურისტული ადგილებისა და ტრანსპორტის ახლოს. ყველა ნომერში ხელმისაწვდომია უფასო Wi-Fi, კონდიციონერი და 24 საათიანი მიმღები. სასტუმროს რეიტინგი სტუმრების შეფასებით: ${rating}/5 (${reviews} შეფასება).`
                }
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DetailCard
                icon={<Calendar size={20} className="text-emerald-600" />}
                label="ჩეკ-ინი"
                value="14:00"
              />
              <DetailCard
                icon={<Calendar size={20} className="text-rose-600" />}
                label="ჩეკ-აუტი"
                value="12:00"
              />
              <DetailCard
                icon={<Users size={20} className="text-blue-600" />}
                label="სტუმრები"
                value="2 ადამიანი"
              />
              <DetailCard
                icon={<Globe size={20} className="text-purple-600" />}
                label="ენები"
                value="EN, KA"
              />
            </div>

            {/* Provider info */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">პროვაიდერი</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-lg">
                    {hotel.provider.charAt(0)}
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold">{hotel.provider}</p>
                    <p className="text-slate-500 text-sm">ოფიციალური პარტნიორი</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <ShieldCheck size={16} />
                  <span className="text-sm font-medium">ვერიფიცირებული</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Price */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-32">
              <div className="text-center mb-6">
                <p className="text-slate-500 text-sm mb-1">ფასი / ღამეში</p>
                <p className="text-4xl font-black text-emerald-600">
                  €{Number(hotel.price).toFixed(0)}
                  <span className="text-base font-normal text-slate-500 ml-1">/ღამე</span>
                </p>
              </div>

              <a
                href={hotel.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-colors mb-4"
              >
                <ExternalLink size={18} />
                დაჯავშნე ახლა
              </a>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-slate-500">
                  <span>ქალაქი</span>
                  <span className="text-slate-800 flex items-center gap-1.5">
                    <img src={flagUrl} alt="" className="w-4 h-3 rounded-sm" />
                    {cityLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>ვალუტა</span>
                  <span className="text-slate-800">{hotel.currency || 'EUR'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>რეიტინგი</span>
                  <span className="text-amber-600 flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {rating}
                  </span>
                </div>
              </div>

              {/* eSIM suggestion */}
              {esims.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    <Smartphone size={12} className="inline mr-1" />
                    eSIM — ინტერნეტი ჩამოფრენისთანავე
                  </p>
                  {esims.map((esim, i) => (
                    <a
                      key={esim.id || i}
                      href={esim.external_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2 text-sm hover:bg-slate-50 px-2 rounded-lg transition-colors"
                    >
                      <span className="text-slate-700">{esim.provider}</span>
                      <span className="text-emerald-600 font-bold">€{esim.price}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cross-sell: Flights */}
        {flights.length > 0 && (
          <CrossSellSection
            title={`ფრენები ${cityLabel}-ში`}
            icon={<Plane size={22} className="text-blue-600" />}
            items={flights}
            linkPrefix="/flights"
            priceLabel="/ადამ."
          />
        )}

        {/* Cross-sell: Tours */}
        {tours.length > 0 && (
          <CrossSellSection
            title={`ტურები ${cityLabel}-ში`}
            icon={<MapPin size={22} className="text-purple-600" />}
            items={tours}
            linkPrefix="/ticket"
            priceLabel="/ადამ."
          />
        )}

        {/* Cross-sell: Tickets */}
        {tickets.length > 0 && (
          <CrossSellSection
            title={`ბილეთები & ატრაქციონები`}
            icon={<Ticket size={22} className="text-orange-600" />}
            items={tickets}
            linkPrefix="/ticket"
            priceLabel=""
          />
        )}

        {/* Cross-sell: Transfers */}
        {transfers.length > 0 && (
          <CrossSellSection
            title="ტრანსფერი აეროპორტიდან"
            icon={<Car size={22} className="text-amber-600" />}
            items={transfers}
            priceLabel=""
          />
        )}

        {/* Related Hotels */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Hotel size={22} className="text-emerald-600" />
              სხვა სასტუმროები {cityLabel}-ში
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {related.map((item, i) => (
                <Link
                  key={item.id || i}
                  href={`/hotel/${item.id}`}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-400 transition-all group"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={item.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold text-emerald-600 mb-1 block">{item.provider}</span>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{item.title}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-emerald-600 font-black">
                        €{Number(item.price).toFixed(0)}
                        <span className="text-slate-500 text-xs font-normal ml-1">/ღამე</span>
                      </p>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-slate-500 text-xs mb-1">{label}</p>
      <p className="text-slate-800 text-sm font-bold">{value}</p>
    </div>
  );
}

function CrossSellSection({
  title, icon, items, linkPrefix, priceLabel = ''
}: {
  title: string; icon: React.ReactNode; items: ServiceItem[];
  linkPrefix?: string; priceLabel?: string;
}) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        {icon}
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, i) => {
          const isBookable = item.category === 'ticket' || item.category === 'tour';
          const href = isBookable && linkPrefix ? `${linkPrefix}/${item.id}` : item.external_link;
          const isExternal = !isBookable || !linkPrefix;
          const Tag = isExternal ? 'a' : Link;
          const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

          return (
            <Tag
              key={item.id || i}
              href={href}
              {...extraProps as any}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-400 transition-all group flex"
            >
              <div className="w-28 h-28 shrink-0 overflow-hidden">
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format&fit=crop'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.provider}</span>
                  <h3 className="text-sm font-bold text-slate-800 line-clamp-2">{item.title}</h3>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-emerald-600 font-black">€{Number(item.price).toFixed(0)}{priceLabel && <span className="text-slate-500 text-xs font-normal">{priceLabel}</span>}</p>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                </div>
              </div>
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
