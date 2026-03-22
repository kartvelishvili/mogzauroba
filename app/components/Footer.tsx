import Link from 'next/link';
import { Compass, MapPin, Plane, Hotel, Car, Ticket, Map, Phone, Mail, Clock } from 'lucide-react';

const quickLinks = [
  { name: 'ავიაბილეთები', href: '/flights', icon: Plane },
  { name: 'სასტუმროები', href: '/hotels', icon: Hotel },
  { name: 'ტრანსფერი', href: '/taxi', icon: Car },
  { name: 'ბილეთები', href: '/tickets', icon: Ticket },
  { name: 'ტურები', href: '/tours', icon: Map },
  { name: 'მიმართულებები', href: '/places', icon: MapPin },
];

const infoLinks = [
  { name: 'ჩვენს შესახებ', href: '/about' },
  { name: 'კონტაქტი', href: '/about' },
  { name: 'ვალუტა', href: '/currency' },
  { name: 'ამინდი', href: '/weather' },
  { name: 'გალერეა', href: '/gallery' },
  { name: 'რუკა', href: '/map' },
];

const partners = [
  'Aviasales', 'Klook', 'Kiwitaxi', 'Localrent', 'Airalo', 'EKTA',
];

export default function Footer() {
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
              ქართული სამოგზაურო პლატფორმა — ავიაბილეთები, სასტუმროები, ტურები და ტრანსფერები ერთიან ჭკვიან ძიებაში.
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
                <span>ყოველდღე 09:00 – 21:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-5">სერვისები</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-emerald-600 text-sm flex items-center gap-2 transition-colors">
                    <link.icon size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-5">ინფორმაცია</h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-5">პარტნიორები</h4>
            <div className="flex flex-wrap gap-2">
              {partners.map((p) => (
                <span key={p} className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg">
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-3">გადახდის მეთოდები</h4>
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

        {/* Travelpayouts White Label Search */}
        <div className="mb-12">
          <div id="tpwl-search"></div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-medium">
            © 2024–2026 Mogzauroba.com — ყველა უფლება დაცულია
          </p>
          <p className="text-slate-400 text-xs">
            Powered by Travelpayouts API & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
