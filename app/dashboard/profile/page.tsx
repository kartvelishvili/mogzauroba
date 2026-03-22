'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Loader2 } from 'lucide-react';
import { useLang } from '@/app/lib/i18n';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t, lang } = useLang();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Mock API call (similar to Guruliparisshi /api/profile/update)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{lang === 'ka' ? 'პროფილის მართვა' : 'Profile Management'}</h1>
      <p className="text-slate-500 mb-10">{lang === 'ka' ? 'განაახლე პირადი ინფორმაცია და ანგარიშის დეტალები' : 'Update personal information and account details'}</p>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500 pl-1">{lang === 'ka' ? 'სახელი გვარი' : 'Full Name'}</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  defaultValue="ნიკა შველიძე"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500 pl-1">{lang === 'ka' ? 'ელ-ფოსტა' : 'Email'}</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  defaultValue="test@mogzauroba.com"
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 text-slate-400 rounded-xl py-3 pl-12 pr-4 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500 pl-1">{lang === 'ka' ? 'ტელეფონი' : 'Phone'}</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Phone size={18} />
                </div>
                <input 
                  type="tel" 
                  defaultValue="+995 555 12 34 56"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500 pl-1">{lang === 'ka' ? 'ქალაქი' : 'City'}</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <MapPin size={18} />
                </div>
                <input 
                  type="text" 
                  defaultValue="თბილისი"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <div>
              {success && <span className="text-emerald-600 text-sm font-medium">{lang === 'ka' ? 'პროფილი წარმატებით განახლდა!' : 'Profile updated successfully!'}</span>}
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              <span>{lang === 'ka' ? 'შენახვა' : 'Save'}</span>
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
