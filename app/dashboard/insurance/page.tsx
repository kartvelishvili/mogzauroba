import { ShieldAlert, Signal } from 'lucide-react';

export default function InsurancePage() {
  const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '680923';

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight mb-2">eSIM და დაზღვევა 📱</h1>
      <p className="text-slate-500 mb-10">დაზღვევის პოლისები და ონლაინ როუმინგ პაკეტები</p>

      {/* History */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-slate-700">შენი პაკეტები</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
            <Signal className="text-purple-600" />
            <div>
              <h3 className="font-bold text-lg text-slate-800">Airalo - Europe 10GB</h3>
              <p className="text-sm text-slate-500">აქტიურია • რჩება 7 დღე</p>
            </div>
            <div className="ml-auto text-right">
              <span className="text-emerald-600 font-bold block">$20.00</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ShieldAlert className="text-blue-600" />
            <div>
              <h3 className="font-bold text-lg text-slate-800">EKTA Travel Insurance</h3>
              <p className="text-sm text-slate-500">General Medical Cover (Schengen)</p>
            </div>
            <div className="ml-auto text-right">
              <span className="text-emerald-600 font-bold block">€12.50</span>
              <span className="text-xs text-slate-500">აქტიურია</span>
            </div>
          </div>
        </div>
      </div>

      {/* Providers */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-slate-700">ხელმისაწვდომი სერვისები</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href={`https://airalo.com/?custom_id=${marker}`} target="_blank" rel="noopener noreferrer" className="bg-purple-50 border border-purple-200 rounded-2xl p-6 hover:border-purple-400 transition-colors group">
            <h3 className="text-xl font-bold text-purple-600 mb-2">Airalo</h3>
            <p className="text-sm text-slate-500 mb-4">მსოფლიოს პირველი eSIM მაღაზია - იაფი ინტერნეტი 200+ ქვეყანაში.</p>
            <span className="text-purple-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">პაკეტის შეძენა →</span>
          </a>

          <a href={`https://yesim.app/?ref=${marker}`} target="_blank" rel="noopener noreferrer" className="bg-pink-50 border border-pink-200 rounded-2xl p-6 hover:border-pink-400 transition-colors group">
            <h3 className="text-xl font-bold text-pink-600 mb-2">Yesim</h3>
            <p className="text-sm text-slate-500 mb-4">გლობალური და შეუზღუდავი ონლაინ მონაცემები მოგზაურთათვის.</p>
            <span className="text-pink-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">პაკეტის შეძენა →</span>
          </a>

          <a href={`https://ektatraveling.com/?partner=${marker}`} target="_blank" rel="noopener noreferrer" className="bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:border-blue-400 transition-colors group">
            <h3 className="text-xl font-bold text-blue-600 mb-2">EKTA</h3>
            <p className="text-sm text-slate-500 mb-4">სამოგზაურო დაზღვევა მარტივად და სწრაფად საზღვარგარეთ.</p>
            <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">დაზღვევის ყიდვა →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
