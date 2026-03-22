'use client';

import Link from 'next/link';
import { Compass, MapPin, Plane, Hotel, Car, Ticket, Map, Phone, Mail, Clock } from 'lucide-react';
import { useLang } from '@/app/lib/i18n';

const partners = [
  'Aviasales', 'Klook', 'Kiwitaxi', 'Localrent', 'Airalo', 'EKTA',
];

export default function Footer() {
  const { t } = useLang();

  const quickLinks = [
    { key: 'nav.flights', href: '/flights', icon: Plane },
    { key: 'nav.hotels', href: '/hotels', icon: Hotel },
    { key: 'nav.transfer', href: '/taxi', icon: Car },
    { key: 'nav.tickets', href: '/tickets', icon: Ticket },
    { key: 'nav.tours', href: '/tours', icon: Map },
    { key: 'footer.directions', href: '/places', icon: MapPin },
  ];

  const infoLinks = [
    { key: 'footer.aboutUs', href: '/about' },
    { key: 'footer.contact', href: '/about' },
    { key: 'nav.currency', href: '/currency' },
    { key: 'nav.weather', href: '/weather' },
    { key: 'nav.gallery', href: '/gallery' },
    { key: 'nav.map', href: '/map' },
  ];

  return (
    <footer className="mt-auto z-10 w-full border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-black text-slate-800 mb-4">
              <Compass className="text-emerald-500" size={24} />
              <span>Mogzauroba.com</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              {t('footer.brand')}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-500">
                <Phone size={14} className="text-emerald-500 shrink-0" />
                <span>+995 500 00 00 00</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <Mail size={14} className="text-emerald-500 shrink-0" />
                <span>info@mogzauroba.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <Clock size={14} className="text-emerald-500 shrink-0" />
                <span>{t('footer.workHours')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-5">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-emerald-600 text-sm flex items-center gap-2 transition-colors">
                    <link.icon size={14} />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-5">{t('footer.info')}</h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-5">{t('footer.partners')}</h4>
            <div className="flex flex-wrap gap-2">
              {partners.map((p) => (
                <span key={p} className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg">
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-3">{t('footer.payment')}</h4>
              <div className="flex gap-2">
                {['Visa', 'MC', 'BOG', 'TBC'].map((m) => (
                  <span key={m} className="bg-white text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-200">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-medium">
            {t('footer.rights')}
          </p>
          <p className="text-slate-400 text-xs">
            {t('footer.support')}
          </p>
        </div>
      </div>
    </footer>
  );
}
