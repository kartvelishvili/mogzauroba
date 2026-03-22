'use client';

import { motion } from 'framer-motion';
import { Plane, Hotel, Car, ShieldCheck, MapPin, Wifi } from 'lucide-react';

const programs = [
  {
    title: 'ავიაბილეთები',
    desc: 'იპოვე იაფი ფრენები (Aviasales)',
    icon: Plane,
    color: 'from-blue-500 to-cyan-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    shadow: 'hover:shadow-blue-500/30',
    link: 'https://search.aviasales.com/?marker=',
  },
  {
    title: 'სასტუმროები',
    desc: 'საუკეთესო ფასები (Klook)',
    icon: Hotel,
    color: 'from-emerald-500 to-teal-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    shadow: 'hover:shadow-emerald-500/30',
    link: 'https://www.klook.com/?aid=',
  },
  {
    title: 'ტრანსფერი',
    desc: 'კომფორტული დახვედრა (Kiwitaxi)',
    icon: Car,
    color: 'from-amber-500 to-yellow-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    shadow: 'hover:shadow-amber-500/30',
    link: 'https://kiwitaxi.com/?pap=',
  },
  {
    title: 'მობილური ინტერნეტი',
    desc: 'eSIM როუმინგის გარეშე (Airalo)',
    icon: Wifi,
    color: 'from-purple-500 to-fuchsia-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    shadow: 'hover:shadow-purple-500/30',
    link: 'https://airalo.com/?custom_id=',
  },
  {
    title: 'მანქანის ქირაობა',
    desc: 'დაჯავშნე იაფად (Localrent)',
    icon: MapPin,
    color: 'from-rose-500 to-red-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    shadow: 'hover:shadow-rose-500/30',
    link: 'https://localrent.com/?r=',
  },
  {
    title: 'დაზღვევა',
    desc: 'მშვიდი მოგზაურობა (EKTA)',
    icon: ShieldCheck,
    color: 'from-indigo-500 to-blue-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    shadow: 'hover:shadow-indigo-500/30',
    link: 'https://ektatraveling.com/?partner=',
  },
];

export default function SmartBookingWidget() {
  const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '680923';

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((prog, i) => (
          <motion.a
            key={i}
            href={`${prog.link}${marker}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`group relative overflow-hidden flex flex-col justify-between rounded-3xl border ${prog.border} ${prog.bg} p-6 backdrop-blur-md transition-all duration-300 hover:shadow-2xl ${prog.shadow} cursor-pointer min-h-[220px]`}
          >
            {/* Soft inner glow */}
            <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${prog.color} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}></div>
            
            <div className="relative z-10">
              <div className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${prog.color} p-4 text-white shadow-xl ring-1 ring-white/20`}>
                <prog.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-slate-800 tracking-tight">{prog.title}</h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">{prog.desc}</p>
            </div>
            
            <div className="relative z-10 flex items-center mt-auto text-sm font-bold text-slate-400 group-hover:text-slate-700 transition-colors duration-300">
              ძიების დაწყება
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
