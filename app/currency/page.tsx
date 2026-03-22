'use client';

import { CircleDollarSign, ArrowRightLeft, ArrowDownUp } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';
import { useLang } from '@/app/lib/i18n';

const rates = [
  { code: 'EUR', name: 'ევრო', en: 'Euro', country: 'eu', rateToGel: 2.85 },
  { code: 'USD', name: 'დოლარი', en: 'Dollar', country: 'us', rateToGel: 2.65 },
  { code: 'GBP', name: 'გირვანქა სტერლინგი', en: 'British Pound', country: 'gb', rateToGel: 3.35 },
  { code: 'TRY', name: 'თურქული ლირა', en: 'Turkish Lira', country: 'tr', rateToGel: 0.082 },
  { code: 'AED', name: 'დირჰამი', en: 'Dirham', country: 'ae', rateToGel: 0.72 },
  { code: 'JPY', name: 'იაპონური იენი', en: 'Japanese Yen', country: 'jp', rateToGel: 0.018 },
  { code: 'THB', name: 'ტაილანდური ბატი', en: 'Thai Baht', country: 'th', rateToGel: 0.076 },
  { code: 'EGP', name: 'ეგვიპტური ფუნტი', en: 'Egyptian Pound', country: 'eg', rateToGel: 0.054 },
  { code: 'CZK', name: 'ჩეხური კრონა', en: 'Czech Koruna', country: 'cz', rateToGel: 0.12 },
  { code: 'INR', name: 'ინდური რუპია', en: 'Indian Rupee', country: 'in', rateToGel: 0.032 },
];

export default function CurrencyPage() {
  const { t, lang } = useLang();
  const [amount, setAmount] = useState(100);
  const [isGelToForeign, setIsGelToForeign] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
    <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200">
          <CircleDollarSign size={32} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">{t('cur.title')}</h1>
          <p className="text-slate-500 mt-1">{t('cur.subtitle')}</p>
        </div>
      </div>
      <div className="w-full h-px bg-slate-200 my-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <h3 className="text-xl font-bold mb-6 text-slate-800 text-center">{t('cur.converter')}</h3>
           <div className="flex flex-col gap-6 items-center">
             <div className="w-full text-center">
               <span className="text-sm text-slate-500 font-medium">{isGelToForeign ? t('cur.gel') : t('cur.foreign')}</span>
             </div>
             <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 p-4 text-center rounded-2xl text-3xl font-black select-all outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" min="0" />
             
             <button 
               type="button"
               onClick={() => setIsGelToForeign(!isGelToForeign)}
               className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors"
             >
               <ArrowDownUp className="text-blue-600" size={20} />
             </button>
             
             <div className="w-full">
               {rates.map(r => (
                 <div key={r.code} className="flex justify-between items-center py-4 border-b border-slate-200 last:border-0">
                    <div className="flex items-center gap-3">
                      <img src={`https://flagcdn.com/w40/${r.country}.png`} alt="" width={24} height={18} className="rounded-sm" />
                      <span className="bg-slate-100 px-3 py-1 rounded font-bold text-slate-700">{r.code}</span>
                      <span className="text-sm text-slate-500">{lang === 'en' ? r.en : r.name}</span>
                    </div>
                    <span className="text-xl font-bold text-emerald-600">
                      {isGelToForeign 
                        ? (amount / r.rateToGel).toFixed(2)
                        : (amount * r.rateToGel).toFixed(2)
                      }
                      <span className="text-sm text-slate-500 ml-1">{isGelToForeign ? r.code : 'GEL'}</span>
                    </span>
                 </div>
               ))}
             </div>
           </div>
           <p className="mt-6 text-xs text-slate-400 text-center">{t('cur.demo')}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-slate-800 text-center">{t('cur.currentRates')}</h3>
          <div className="space-y-4">
            {rates.map(r => (
              <div key={r.code} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <img src={`https://flagcdn.com/w40/${r.country}.png`} alt="" width={28} height={21} className="rounded-sm" />
                  <div>
                    <span className="font-bold text-slate-800">{r.code}</span>
                    <span className="text-sm text-slate-500 ml-2">{lang === 'en' ? r.en : r.name}</span>
                  </div>
                </div>
                <span className="text-lg font-black text-blue-600">₾ {r.rateToGel.toFixed(3)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
