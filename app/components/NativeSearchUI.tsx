'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Search,
  Calendar,
  ArrowRight,
} from 'lucide-react';

export default function NativeSearchUI() {
  const router = useRouter();
  const [origin, setOrigin] = useState('TBS');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!destination) {
      setErrorMessage('გთხოვ, მიუთითე მიმართულება.');
      return;
    }

    setErrorMessage('');

    const params = new URLSearchParams({
      origin: origin.trim().toUpperCase(),
      destination: destination.trim().toUpperCase(),
    });

    if (date) {
      params.set('date', date);
    }

    router.push(`/explore?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center relative">
      <div className="absolute top-[-40px] left-0 text-emerald-600 font-bold bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 text-sm flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        ჭკვიანი პაკეტის ძიება
      </div>

      <div className="w-full bg-white backdrop-blur-2xl border border-slate-200 p-4 md:p-6 rounded-3xl shadow-lg relative z-20">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1 w-full bg-slate-50 rounded-2xl flex items-center px-4 py-2 border border-slate-200 hover:border-slate-300 transition-colors focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
            <MapPin size={22} className="text-slate-400" />
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              placeholder="საიდან (მაგ: TBS)"
              className="w-full bg-transparent text-slate-800 uppercase font-bold py-3 px-3 focus:outline-none placeholder-slate-400"
            />
          </div>

          <ArrowRight className="hidden md:block text-slate-400" />

          <div className="flex-1 w-full bg-slate-50 rounded-2xl flex items-center px-4 py-2 border border-slate-200 hover:border-slate-300 transition-colors focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
            <MapPin size={22} className="text-slate-400" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
              placeholder="სად (მაგ: PAR, ROM, DXB)"
              className="w-full bg-transparent text-slate-800 uppercase font-bold py-3 px-3 focus:outline-none placeholder-slate-400"
            />
          </div>

          <div className="flex-1 w-full bg-slate-50 rounded-2xl flex items-center px-4 py-2 border border-slate-200 hover:border-slate-300 transition-colors focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 hidden lg:flex">
            <Calendar size={22} className="text-slate-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-slate-800 font-bold py-3 px-3 focus:outline-none text-sm"
              style={{ colorScheme: 'light' }}
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-black py-5 px-10 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 text-lg shadow-md shadow-emerald-500/20"
          >
            <Search size={24} />
            ძიება
          </button>
        </form>

        <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>
            Live flights + local catalog: ფრენები მოდის API-დან, დანარჩენი სერვისები ჩვენი კატალოგიდან.
          </span>
          {date ? <span className="text-emerald-600">თარიღი: {date}</span> : null}
        </div>

        {errorMessage ? <p className="mt-3 text-sm font-medium text-rose-400">{errorMessage}</p> : null}
      </div>
    </div>
  );
}
