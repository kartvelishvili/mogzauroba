'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Ticket, MapPin, Map, Hotel, Car, Plane, 
  CircleDollarSign, CloudSun, Image as ImageIcon, Compass, Menu, X, Search, Info, Globe
} from 'lucide-react';
import { useState } from 'react';

const allNavItems = [
  { name: 'მთავარი', path: '/', icon: Compass },
  { name: 'ავიაბილეთები', path: '/flights', icon: Plane },
  { name: 'სასტუმროები', path: '/hotels', icon: Hotel },
  { name: 'ბილეთები', path: '/tickets', icon: Ticket },
  { name: 'ტურები', path: '/tours', icon: Map },
  { name: 'ტრანსფერი', path: '/taxi', icon: Car },
  { name: 'ადგილები', path: '/places', icon: MapPin },
  { name: 'ვალუტა', path: '/currency', icon: CircleDollarSign },
  { name: 'ამინდი', path: '/weather', icon: CloudSun },
  { name: 'გალერეა', path: '/gallery', icon: ImageIcon },
  { name: 'რუკა', path: '/map', icon: MapPin },
  { name: 'შესახებ', path: '/about', icon: Info },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname.startsWith('/dashboard')) return null;

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Top accent line */}
      <div className="h-[2px] bg-emerald-500"></div>
      
      {/* Top Bar */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-xl font-black text-slate-800 hover:text-emerald-600 transition-colors tracking-tight shrink-0">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
              <Compass className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight">Biujeturi</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase leading-tight">Travel Platform</span>
            </div>
          </Link>

          {/* Right — Desktop */}
          <div className="hidden xl:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
              <Globe size={13} />
              <span>GE 🇬🇪</span>
            </div>
            <Link href="/flights" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-md shadow-emerald-500/20">
              <Search size={14} />
              დაჯავშნე
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="xl:hidden p-2 text-slate-500 hover:text-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation Bar — Desktop */}
      <div className="hidden xl:block bg-slate-50/90 backdrop-blur-lg border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center h-12 gap-0.5">
            {allNavItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={15} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-b border-slate-200 max-h-[calc(100vh-4.25rem)] overflow-y-auto shadow-xl">
          <nav className="flex flex-col p-4 gap-1">
            {allNavItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-md font-medium transition-colors ${
                    isActive ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
            <Link href="/flights" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 mt-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl font-bold transition-colors shadow-md shadow-emerald-500/20">
              <Search size={18} />
              დაჯავშნე ახლავე
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
