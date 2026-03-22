'use client';

import { MapPin } from 'lucide-react';
import Footer from '../components/Footer';
import { useLang } from '@/app/lib/i18n';

export default function MapPage() {
  const { t } = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
            <MapPin size={32} className="text-amber-600" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">{t('mp.title')}</h1>
            <p className="text-slate-500 mt-1">{t('mp.subtitle')}</p>
          </div>
        </div>
        <div className="w-full h-px bg-slate-200 my-10" />

        <div className="flex-1 bg-white border border-slate-200 rounded-3xl overflow-hidden relative shadow-lg flex flex-col items-center justify-center p-20 min-h-[500px]">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d40000000!2d30!3d35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sge!4v1710547083049!5m2!1sen!2sge" 
             width="100%" 
             height="100%" 
             className="absolute inset-0 border-0 pointer-events-auto opacity-70 hover:opacity-100 transition-opacity duration-500 blur-[2px] hover:blur-none" 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
           ></iframe>
           <div className="relative z-10 bg-white/90 backdrop-blur-xl border border-slate-200 p-8 rounded-3xl max-w-md text-center pointer-events-none shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-slate-800">{t('mp.worldMap')}</h3>
              <p className="text-slate-500">{t('mp.worldDesc')}</p>
           </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
