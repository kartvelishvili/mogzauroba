'use client';

import NativeSearchUI from './components/NativeSearchUI';
import Footer from './components/Footer';
import DiscoverSection from './components/DiscoverSection';
import { MapPin, Plane, Car, Hotel, Ticket, Shield, Globe, Star, Users, PhoneCall, Map, Wifi } from 'lucide-react';
import Link from 'next/link';
import { getCountryFlag } from './lib/travel';
import { useLang } from './lib/i18n';

const destImages: Record<string, string> = {
  PAR: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
  BCN: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
  ROM: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop',
  IST: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop',
  LON: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
  DXB: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
  NYC: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop',
  TBS: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=800&auto=format&fit=crop',
  BKK: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800&auto=format&fit=crop',
  TYO: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
  AMS: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=800&auto=format&fit=crop',
  CUN: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?q=80&w=800&auto=format&fit=crop',
};

const destTags: Record<string, { key: string; color: string }> = {
  PAR: { key: 'dest.mostPopular', color: 'bg-emerald-500' },
  BCN: { key: 'dest.newAddition', color: 'bg-purple-500' },
  IST: { key: 'dest.noVisa', color: 'bg-blue-500' },
  DXB: { key: 'dest.hotDestination', color: 'bg-orange-500' },
  NYC: { key: 'dest.hotDestination', color: 'bg-orange-500' },
  TBS: { key: 'dest.local', color: 'bg-emerald-500' },
};

const destCodes = ['PAR', 'BCN', 'ROM', 'IST', 'LON', 'DXB', 'NYC', 'TBS', 'BKK', 'TYO', 'AMS', 'CUN'];

interface HomeClientProps {
  totalOffers: number;
  providerCount: number;
  destinationCount: number;
}

export default function HomeClient({ totalOffers, providerCount, destinationCount }: HomeClientProps) {
  const { t } = useLang();
  const offersLabel = `${totalOffers.toLocaleString()}+`;

  const services = [
    { icon: Plane, titleKey: 'svc.flights', descKey: 'svc.flightsDesc', color: 'text-blue-600 bg-blue-50', href: '/flights' },
    { icon: Map, titleKey: 'svc.tours', descKey: 'svc.toursDesc', color: 'text-rose-600 bg-rose-50', href: '/tours' },
    { icon: Ticket, titleKey: 'svc.tickets', descKey: 'svc.ticketsDesc', color: 'text-purple-600 bg-purple-50', href: '/tickets' },
    { icon: Car, titleKey: 'svc.transfer', descKey: 'svc.transferDesc', color: 'text-amber-600 bg-amber-50', href: '/taxi' },
    { icon: Hotel, titleKey: 'svc.hotels', descKey: 'svc.hotelsDesc', color: 'text-emerald-600 bg-emerald-50', href: '/hotels' },
    { icon: Wifi, titleKey: 'svc.esim', descKey: 'svc.esimDesc', color: 'text-cyan-600 bg-cyan-50', href: '/places' },
    { icon: MapPin, titleKey: 'svc.routes', descKey: 'svc.routesDesc', color: 'text-indigo-600 bg-indigo-50', href: '/places' },
    { icon: Shield, titleKey: 'svc.payment', descKey: 'svc.paymentDesc', color: 'text-emerald-600 bg-emerald-50', href: '/about' },
    { icon: Globe, titleKey: 'svc.georgian', descKey: 'svc.georgianDesc', color: 'text-blue-600 bg-blue-50', href: '/about' },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-800 flex flex-col items-center overflow-x-hidden relative -mt-16 xl:-mt-28">
      
      {/* HERO BACKGROUND — Video */}
      <div className="absolute top-0 left-0 w-full h-[85vh] min-h-[600px] max-h-[900px] z-0 overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover scale-[1.02]"
        >
          <source src="https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-white" style={{ maskImage: 'linear-gradient(to top, black 20%, transparent)', WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent)' }}></div>
      </div>
      
      {/* Hero Content */}
      <div className="w-full px-4 md:px-8 max-w-7xl pt-28 xl:pt-44 mb-16 z-10 relative">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-14">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/80 border border-white/50 text-xs font-bold text-slate-700 backdrop-blur-md uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t('hero.trustedBy')} — {destinationCount} {t('stats.destinations')}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight mb-6 leading-[1.05] text-white drop-shadow-md">
              {t('hero.title1')} {t('hero.title2')} <br/>
              <span className="text-emerald-300">
                {t('hero.title3')}
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-white/90 max-w-2xl font-medium leading-relaxed mb-8 drop-shadow-sm">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Feature Badges */}
          <div className="hidden lg:flex flex-col gap-3 shrink-0 w-[280px] pt-8">
            {[
              { icon: Plane, text: t('svc.flights'), desc: t('svc.flightsDesc').split('—')[0], iconColor: 'text-blue-500 bg-blue-50' },
              { icon: Ticket, text: t('svc.tickets'), desc: `${offersLabel} ${t('stats.offers')}`, iconColor: 'text-purple-500 bg-purple-50' },
              { icon: PhoneCall, text: '24/7', desc: t('hero.trustedBy'), iconColor: 'text-emerald-500 bg-emerald-50' },
              { icon: Globe, text: t('svc.georgian'), desc: t('svc.georgianDesc').split('—')[0], iconColor: 'text-amber-500 bg-amber-50' },
            ].map((badge, i) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={i} className="bg-white/90 backdrop-blur-md border border-white/60 rounded-2xl px-5 py-3.5 flex items-center gap-3.5 hover:bg-white transition-all cursor-default shadow-sm">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${badge.iconColor}`}>
                    <BadgeIcon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{badge.text}</p>
                    <p className="text-[11px] text-slate-500">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SEARCH UI */}
      <div className="z-20 w-full px-4 md:px-8">
        <NativeSearchUI />
      </div>

      {/* PLATFORM STATS BAR */}
      <div className="z-10 w-full max-w-7xl px-4 md:px-8 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, value: '25,000+', label: t('stats.users') },
            { icon: Globe, value: String(destinationCount), label: t('stats.destinations') },
            { icon: Ticket, value: offersLabel, label: t('stats.offers') },
            { icon: Star, value: `${providerCount || 18}`, label: t('stats.providers') },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <stat.icon size={22} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESTINATIONS */}
      <div className="z-10 w-full max-w-7xl px-4 md:px-8 mt-24">
        <div className="flex items-start gap-5 mb-10">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 mt-1">
            <Globe size={28} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">
              {t('dest.title')}
            </h2>
            <p className="text-slate-500 mt-2 max-w-2xl">
              {t('dest.subtitle')}
            </p>
          </div>
        </div>

        {/* Featured row: 1 big + 3 regular */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Featured destination */}
          {(() => {
            const code = destCodes[0];
            const tag = destTags[code];
            return (
              <Link href={`/places?destination=${code}`} className="lg:flex-[1.4] group rounded-2xl overflow-hidden relative h-[300px] lg:h-[340px] border border-slate-200 shadow-sm">
                <img src={destImages[code]} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={t(`city.${code}`)} />
                <div className="absolute inset-0 bg-black/25"></div>
                {tag && <div className={`absolute top-4 left-4 ${tag.color} text-white text-[11px] font-bold px-3 py-1.5 rounded-lg`}>{t(tag.key)}</div>}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={getCountryFlag(code, 'w40')} alt={t(`country.${code}`)} className="w-6 h-4 rounded-sm object-cover" />
                    <h3 className="text-2xl font-black text-white drop-shadow-md">{t(`city.${code}`)}</h3>
                  </div>
                  <p className="text-white/80 text-sm mb-3 drop-shadow-sm">{t(`country.${code}`)}</p>
                  <div className="flex items-center gap-1.5">
                    {[{ i: Plane, c: 'text-blue-300' }, { i: Hotel, c: 'text-emerald-300' }, { i: Car, c: 'text-amber-300' }, { i: Ticket, c: 'text-purple-300' }, { i: Map, c: 'text-rose-300' }].map((s, j) => {
                      const SIcon = s.i;
                      return <div key={j} className={`w-7 h-7 bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center ${s.c}`}><SIcon size={14} /></div>;
                    })}
                  </div>
                </div>
              </Link>
            );
          })()}

          {/* 3 other destinations */}
          {destCodes.slice(1, 4).map((code) => {
            const tag = destTags[code];
            return (
              <Link key={code} href={`/places?destination=${code}`} className="flex-1 group rounded-2xl overflow-hidden relative h-[240px] lg:h-[340px] border border-slate-200 shadow-sm">
                <img src={destImages[code]} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={t(`city.${code}`)} />
                <div className="absolute inset-0 bg-black/20"></div>
                {tag && <div className={`absolute top-4 left-4 ${tag.color} text-white text-[11px] font-bold px-3 py-1.5 rounded-lg`}>{t(tag.key)}</div>}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-white text-lg font-black mb-0.5 drop-shadow-md">{t(`city.${code}`)}</h3>
                  <p className="text-white/80 text-sm drop-shadow-sm flex items-center gap-1.5"><img src={getCountryFlag(code, 'w20')} alt={t(`country.${code}`)} className="w-5 h-3.5 rounded-sm object-cover" /> {t(`country.${code}`)}</p>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 text-slate-800 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md">{t('discover.details')} →</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Second row: 4 worldwide destinations */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {destCodes.slice(4, 8).map((code) => {
            const tag = destTags[code];
            return (
              <Link key={code} href={`/places?destination=${code}`} className="group rounded-2xl overflow-hidden relative h-[200px] border border-slate-200 shadow-sm">
                <img src={destImages[code]} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={t(`city.${code}`)} />
                <div className="absolute inset-0 bg-black/20"></div>
                {tag && <div className={`absolute top-3 left-3 ${tag.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-lg`}>{t(tag.key)}</div>}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-base font-black mb-0.5 drop-shadow-md">{t(`city.${code}`)}</h3>
                  <p className="text-white/80 text-xs drop-shadow-sm flex items-center gap-1.5"><img src={getCountryFlag(code, 'w20')} alt={t(`country.${code}`)} className="w-4 h-3 rounded-sm object-cover" /> {t(`country.${code}`)}</p>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 text-slate-800 px-4 py-2 rounded-xl text-sm font-bold shadow-md">{t('discover.details')} →</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* All destinations link */}
        <div className="flex justify-center mt-6">
          <Link href="/places" className="text-emerald-600 hover:text-emerald-700 text-sm font-bold transition-colors flex items-center gap-2">
            {t('dest.title')} ({destinationCount}) →
          </Link>
        </div>
      </div>

      {/* SERVICES — 3×3 grid */}
      <div className="z-10 w-full max-w-7xl px-4 md:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <Link key={i} href={svc.href} className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md p-6 rounded-2xl transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${svc.color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{t(svc.titleKey)}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t(svc.descKey)}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE DISCOVER: TICKETS + HOTELS with filters */}
      <DiscoverSection />
      
      <Footer />
    </main>
  );
}
