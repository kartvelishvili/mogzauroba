'use client';

import { Wallet, PlaneTakeoff, BellRing, MapPin } from 'lucide-react';
import { useLang } from '@/app/lib/i18n';

export default function DashboardOverview() {
  const { t, lang } = useLang();

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{lang === 'ka' ? 'მოგესალმები, ნიკა 👋' : 'Welcome, Nika 👋'}</h1>
          <p className="text-slate-400">{lang === 'ka' ? 'შენი სამოგზაურო ისტორია და დაგეგმილი ტურები' : 'Your travel history and planned tours'}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 text-slate-500 transition-colors">
            <BellRing size={20} />
          </button>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl">
            <Wallet size={20} className="text-emerald-600" />
            <span className="font-bold text-emerald-600">{lang === 'ka' ? '₾ 125.00 ბალანსი' : '₾ 125.00 Balance'}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-blue-200">
            <PlaneTakeoff className="text-blue-600" />
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">{lang === 'ka' ? 'დაგეგმილი ფრენები' : 'Planned Flights'}</h3>
          <p className="text-3xl font-black text-slate-800">2 <span className="text-lg font-medium text-slate-400">{lang === 'ka' ? 'ჯავშანი' : 'Booking'}</span></p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-emerald-200">
            <MapPin className="text-emerald-600" />
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">{lang === 'ka' ? 'შენახული სასტუმროები' : 'Saved Hotels'}</h3>
          <p className="text-3xl font-black text-slate-800">5 <span className="text-lg font-medium text-slate-400">{lang === 'ka' ? 'ვარიანტი' : 'Option'}</span></p>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-200/50 blur-2xl rounded-full"></div>
          <h3 className="text-indigo-600 font-bold mb-2">{lang === 'ka' ? 'ახალი ტური პარიზში' : 'New tour in Paris'} <img src="https://flagcdn.com/w20/fr.png" alt="" width={16} height={12} className="inline rounded-sm" /></h3>
          <p className="text-slate-500 text-sm mb-4">{lang === 'ka' ? 'დაასრულე ჯავშანი და მიიღე 10% ქეშბექი ბალანსზე.' : 'Complete booking and get 10% cashback.'}</p>
          <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm w-full">
            {lang === 'ka' ? 'ვიზარდის გაგრძელება →' : 'Continue wizard →'}
          </button>
        </div>
      </div>

      {/* Incoming Bookings (Similar to Guruliparisshi /api/incoming-bookings) */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-slate-700">{lang === 'ka' ? 'მომავალი მოგზაურობები' : 'Upcoming Trips'}</h2>
        
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 hover:border-slate-300 transition-colors shadow-sm">
          <div className="bg-blue-50 text-blue-600 rounded-3xl p-6 flex flex-col items-center justify-center min-w-[140px] text-center shrink-0 border border-blue-200">
            <span className="text-sm font-medium uppercase tracking-wider mb-1">{lang === 'ka' ? 'სექტემბერი' : 'September'}</span>
            <span className="text-5xl font-black mb-1">15</span>
            <span className="text-sm">{lang === 'ka' ? '4 დღე' : '4 Days'}</span>
          </div>
          
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-2">
               <h3 className="text-2xl font-bold text-slate-800">{lang === 'ka' ? 'რომი, იტალია' : 'Rome, Italy'} <img src="https://flagcdn.com/w20/it.png" alt="" width={16} height={12} className="inline rounded-sm" /></h3>
               <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wide">
                 {lang === 'ka' ? 'გადასახდელია' : 'Due'}
               </span>
            </div>
            
            <p className="text-slate-500 mb-6 max-w-xl">
              {lang === 'ka' ? 'კომპლექსური პაკეტი: ეკონომ კლასის ფრენა Aviasales-ით, 3-ვარსკვლავიანი აპარტამენტი Klook-დან და ტრანსფერი' : 'Package: Economy class flight via Aviasales, 3-star apartment from Klook and transfer'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                 <span className="text-sm text-slate-500">{lang === 'ka' ? 'ფრენა ✈️' : 'Flight ✈️'}</span>
                 <span className="text-emerald-600 text-sm font-black">€145</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                 <span className="text-sm text-slate-500">{lang === 'ka' ? 'სასტუმრო 🏨' : 'Hotel 🏨'}</span>
                 <span className="text-emerald-600 text-sm font-black">€320</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                 <span className="text-sm text-slate-500">{lang === 'ka' ? 'ტრანსფერი 🚕' : 'Transfer 🚕'}</span>
                 <span className="text-emerald-600 text-sm font-black">€45</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                 <span className="text-sm text-slate-500">{lang === 'ka' ? 'დაზღვევა 🛡️' : 'Insurance 🛡️'}</span>
                 <span className="text-emerald-600 text-sm font-black">€12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
