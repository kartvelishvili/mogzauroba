'use client';

import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { useLang } from '@/app/lib/i18n';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 shadow-xl backdrop-blur-xl">
        <Cookie size={24} className="text-amber-500 shrink-0" />
        <p className="text-sm text-slate-600 flex-1">
          {t('cookie.text')}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={accept} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors">
            {t('cookie.accept')}
          </button>
          <button onClick={() => setVisible(false)} className="p-2 text-slate-400 hover:text-slate-700 transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
