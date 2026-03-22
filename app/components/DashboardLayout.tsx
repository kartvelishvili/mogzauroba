'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Map, 
  Ticket, 
  CarFront, 
  Wifi, 
  ShieldCheck, 
  User, 
  LogOut, 
  Briefcase 
} from 'lucide-react';

const menuItems = [
  { name: 'მთავარი', icon: Home, path: '/' },
  { name: 'ჩემი მოგზაურობები', icon: Map, path: '/dashboard' },
  { name: 'ტურები & ავიაბილეთები', icon: Ticket, path: '/dashboard/tours' },
  { name: 'მანქანები & ტრანსფერი', icon: CarFront, path: '/dashboard/transfer' },
  { name: 'eSIM & დაზღვევა', icon: ShieldCheck, path: '/dashboard/insurance' },
  { name: 'პროფილი', icon: User, path: '/dashboard/profile' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-700 flex flex-col md:flex-row">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-50 border-r border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="bg-emerald-500 p-2 rounded-xl">
            <Briefcase size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-800">TravelHub</span>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-200">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
            <LogOut size={20} />
            <span className="font-medium">გასვლა</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-hidden relative">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Briefcase size={20} className="text-emerald-600" />
            <span className="font-bold text-lg text-slate-800">TravelHub</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-100 rounded-lg">
             <User size={20} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[60px] left-0 w-full bg-white border-b border-slate-200 z-50 p-4 flex flex-col gap-2">
             {menuItems.map((item) => (
              <Link key={item.name} href={item.path} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg bg-slate-50 text-slate-700">
                {item.name}
              </Link>
             ))}
          </div>
        )}

        <div className="p-4 md:p-8 lg:p-12 z-10 relative">
          {children}
        </div>
      </main>

    </div>
  );
}
