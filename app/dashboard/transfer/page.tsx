import { Car, CarFront as Taxi } from 'lucide-react';

export default function TransferPage() {
  const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '680923';

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight mb-2">მანქანები და ტრანსფერი 🚕</h1>
      <p className="text-slate-500 mb-10">აეროპორტის ტრანსფერები და მანქანების გაქირავება (Kiwitaxi & Localrent)</p>

      {/* History (Like /api/taxi-orders) */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-slate-700">შეკვეთების ისტორია</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Taxi className="text-amber-600" />
            <div>
              <h3 className="font-bold text-lg text-slate-800">Paris CDG ➝ სასტუმრო</h3>
              <p className="text-sm text-slate-500">Kiwitaxi - Comfort კლასი</p>
            </div>
            <div className="ml-auto text-right">
              <span className="text-emerald-600 font-bold block">€45.00</span>
              <span className="text-xs text-slate-500 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded">დადასტურებულია</span>
            </div>
          </div>
        </div>
      </div>

      {/* Providers */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-slate-700">დაჯავშნე ახალი</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href={`https://kiwitaxi.com/en/?pap=${marker}`} target="_blank" rel="noopener noreferrer" className="bg-amber-50 border border-amber-200 rounded-2xl p-6 hover:border-amber-400 transition-colors group">
            <h3 className="text-xl font-bold text-amber-600 mb-2">Kiwitaxi</h3>
            <p className="text-sm text-slate-500 mb-4">დაჯავშნე ტაქსი აეროპორტში ონლაინ.</p>
            <span className="text-amber-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">ჯავშანი →</span>
          </a>

          <a href={`https://localrent.com/?r=${marker}`} target="_blank" rel="noopener noreferrer" className="bg-rose-50 border border-rose-200 rounded-2xl p-6 hover:border-rose-400 transition-colors group">
            <h3 className="text-xl font-bold text-rose-600 mb-2">Localrent</h3>
            <p className="text-sm text-slate-500 mb-4">იპოვე მანქანა ადგილობრივი გამქირავებლებისგან.</p>
            <span className="text-rose-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">ჯავშანი →</span>
          </a>

          <a href={`https://economybookings.com/?partner=${marker}`} target="_blank" rel="noopener noreferrer" className="bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:border-blue-400 transition-colors group">
            <h3 className="text-xl font-bold text-blue-600 mb-2">EconomyBookings</h3>
            <p className="text-sm text-slate-500 mb-4">გლობალური სააგენტო მანქანების დასაქირავებლად.</p>
            <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">ჯავშანი →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
