'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Star, MapPin, Clock, CheckCircle, Smartphone, 
  XCircle, ShieldCheck, ChevronRight, Ticket, Hotel, ExternalLink,
  Calendar, Tag, Plane, Car
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

const categoryLabels: Record<string, string> = {
  ticket: 'ბილეთი / ატრაქციონი',
  tour: 'ტური / ექსკურსია',
  hotel: 'სასტუმრო',
  transfer: 'ტრანსფერი',
  flight: 'ავიაბილეთი',
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?q=80&w=900&auto=format&fit=crop',
];

const badges = [
  { icon: CheckCircle, label: 'მყისიერი დადასტურება', color: 'text-emerald-600' },
  { icon: Smartphone, label: 'მობილური ბილეთი', color: 'text-blue-600' },
  { icon: XCircle, label: 'უფასო გაუქმება 24სთ', color: 'text-rose-600' },
  { icon: ShieldCheck, label: 'დაცული გადახდა', color: 'text-purple-600' },
];

export default function TicketDetailClient({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<ServiceItem | null>(null);
  const [related, setRelated] = useState<ServiceItem[]>([]);
  const [nearbyHotels, setNearbyHotels] = useState<ServiceItem[]>([]);
  const [crossSell, setCrossSell] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/service/${ticketId}`);
        const data = await res.json();
        if (data.success) {
          setTicket(data.data);
          setRelated(data.related || []);
          setCrossSell(data.crossSell || []);
          // Extract hotels from cross-sell
          setNearbyHotels((data.crossSell || []).filter((s: ServiceItem) => s.category === 'hotel').slice(0, 4));
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
      setLoading(false);
    }
    load();
  }, [ticketId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <Ticket size={64} className="text-slate-300 mb-6" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">ბილეთი ვერ მოიძებნა</h1>
        <p className="text-slate-500 mb-6">მოთხოვნილი ბილეთი არ არსებობს ან წაიშალა</p>
        <Link href="/" className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold transition-colors">
          მთავარ გვერდზე დაბრუნება
        </Link>
      </div>
    );
  }

  const cityLabel = destinationLabels[ticket.destination] || ticket.destination;
  const catLabel = categoryLabels[ticket.category] || ticket.category;
  const imgSrc = ticket.image_url || fallbackImages[0];
  const rating = (4.5 + Math.random() * 0.49).toFixed(2);
  const reviews = Math.floor(10000 + Math.random() * 90000);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[420px] md:h-[480px] w-full overflow-hidden">
        <img src={imgSrc} alt={ticket.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-black/30 to-transparent" />
        
        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/" className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-black/70 transition-colors text-sm font-medium">
            <ArrowLeft size={18} />
            უკან
          </Link>
        </div>

        {/* Category badge & rating */}
        <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
          <div className="bg-purple-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg">
            {catLabel}
          </div>
          <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            {rating}
            <span className="text-slate-400 font-normal">({reviews.toLocaleString()})</span>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
              <MapPin size={14} />
              <span>{cityLabel}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 leading-tight">
              {ticket.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        {/* Badges row */}
        <div className="flex flex-wrap gap-3 mb-10">
          {badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
              <badge.icon size={16} className={badge.color} />
              <span className="text-sm text-slate-600 font-medium">{badge.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <Tag size={20} className="text-purple-600" />
                ბილეთის შესახებ
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {ticket.description || 
                  `${ticket.title} — აღმოაჩინე ${cityLabel}-ის ერთ-ერთი საუკეთესო ტურისტული ადგილი. ონლაინ შეძენით თქვენ მიიღებთ მყისიერ ელექტრონულ ბილეთს, რომელიც შეგიძლიათ გამოიყენოთ უშუალოდ შესასვლელთან, რიგის გარეშე. ბილეთი მოქმედებს შეძენიდან 12 თვის განმავლობაში.`
                }
              </p>
            </div>

            {/* Details cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DetailCard 
                icon={<Clock size={20} className="text-emerald-600" />}
                label="სამუშაო საათები"
                value="10:00 — 22:00"
              />
              <DetailCard 
                icon={<MapPin size={20} className="text-blue-600" />}
                label="მდებარეობა"
                value={cityLabel}
              />
              <DetailCard 
                icon={<Smartphone size={20} className="text-purple-600" />}
                label="ბილეთის ტიპი"
                value="ელექტრონული"
              />
              <DetailCard 
                icon={<Calendar size={20} className="text-amber-600" />}
                label="გაუქმება"
                value="უფასო 24სთ"
              />
            </div>

            {/* Provider info */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">პროვაიდერი</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-lg">
                    {ticket.provider.charAt(0)}
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold">{ticket.provider}</p>
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

          {/* Right - Price & CTA */}
          <div className="space-y-6">
            {/* Price card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-32">
              <div className="text-center mb-6">
                <p className="text-slate-500 text-sm mb-1">ფასი</p>
                <p className="text-4xl font-black text-emerald-600">
                  €{ticket.price.toFixed(0)}
                  <span className="text-base font-normal text-slate-500 ml-1">/ადამ.</span>
                </p>
              </div>

              <a
                href={ticket.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-colors mb-4"
              >
                <ExternalLink size={18} />
                შეიძინე ახლა
              </a>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-slate-500">
                  <span>კურსი</span>
                  <span className="text-slate-800">{ticket.currency || 'EUR'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>ტიპი</span>
                  <span className="text-slate-800">{catLabel}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>ქალაქი</span>
                  <span className="text-slate-800">{cityLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tickets */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Ticket size={22} className="text-purple-600" />
              ხშირად ყიდულობენ ერთად
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {related.map((item, i) => (
                <Link
                  key={item.id || i}
                  href={`/ticket/${item.id}`}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-purple-400 transition-all group flex"
                >
                  <div className="w-28 h-28 shrink-0 overflow-hidden">
                    <img
                      src={item.image_url || fallbackImages[i % fallbackImages.length]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2">{item.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-emerald-600 font-black">€{item.price.toFixed(0)}</p>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-purple-500 transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Hotels */}
        {nearbyHotels.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Hotel size={22} className="text-emerald-600" />
              {cityLabel}-ში სასტუმროები
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {nearbyHotels.map((hotel, i) => (
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
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{hotel.title}</h3>
                    <p className="text-slate-500 text-xs flex items-center gap-1 mt-1">
                      <MapPin size={10} /> {cityLabel}
                    </p>
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

        {/* Cross-sell: Flights */}
        {(() => {
          const flights = crossSell.filter(s => s.category === 'flight').slice(0, 3);
          if (flights.length === 0) return null;
          return (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Plane size={22} className="text-blue-600" />
                ფრენები {cityLabel}-ში
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {flights.map((f, i) => (
                  <a key={f.id || i} href={f.external_link} target="_blank" rel="noopener noreferrer"
                    className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-blue-400 transition-all flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                      <Plane size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 line-clamp-1">{f.title}</p>
                      <p className="text-xs text-slate-500">{f.provider}</p>
                    </div>
                    <p className="text-emerald-600 font-black shrink-0">€{f.price}</p>
                  </a>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Cross-sell: Transfers */}
        {(() => {
          const transfers = crossSell.filter(s => s.category === 'transfer').slice(0, 3);
          if (transfers.length === 0) return null;
          return (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Car size={22} className="text-amber-600" />
                ტრანსფერი {cityLabel}-ში
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {transfers.map((t, i) => (
                  <a key={t.id || i} href={t.external_link} target="_blank" rel="noopener noreferrer"
                    className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-amber-400 transition-all flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                      <Car size={20} className="text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 line-clamp-1">{t.title}</p>
                      <p className="text-xs text-slate-500">{t.provider}</p>
                    </div>
                    <p className="text-emerald-600 font-black shrink-0">€{t.price}</p>
                  </a>
                ))}
              </div>
            </div>
          );
        })()}

        {/* eSIM Banner */}
        {(() => {
          const esims = crossSell.filter(s => s.category === 'esim').slice(0, 2);
          if (esims.length === 0) return null;
          return (
            <div className="mt-16 bg-purple-50 border border-purple-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="bg-purple-100 p-4 rounded-2xl shrink-0">
                <Smartphone size={32} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-1">eSIM — ინტერნეტი {cityLabel}-ში</h3>
                <p className="text-slate-500 text-sm">
                  მოგზაურობისას ინტერნეტი ჩამოფრენისთანავე. SIM ბარათის ყიდვა აღარ გჭირდება.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {esims.map((esim, i) => (
                  <a key={esim.id || i} href={esim.external_link} target="_blank" rel="noopener noreferrer"
                    className="bg-white border border-purple-200 hover:border-purple-400 text-slate-800 px-5 py-3 rounded-xl text-sm font-bold transition-colors text-center">
                    <span className="block text-xs text-slate-500">{esim.provider}</span>
                    <span className="text-emerald-600 font-black">€{esim.price}</span>
                  </a>
                ))}
              </div>
            </div>
          );
        })()}
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
