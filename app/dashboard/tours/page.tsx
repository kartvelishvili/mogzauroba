import { Ticket, Plane } from 'lucide-react';

export default function ToursPage() {
  const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER || '680923';

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight mb-2">ტურები და ავიაბილეთები</h1>
      <p className="text-slate-500 mb-10">მართე შენი შენახული ბილეთები და აღმოაჩინე ახალი ტურები</p>

      {/* History (Like /api/ticket-orders) */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-slate-700">შენახული ჯავშნები</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
            <Ticket className="text-purple-600" />
            <div>
              <h3 className="font-bold text-lg text-slate-800">ლუვრის მუზეუმი (პარიზი)</h3>
              <p className="text-sm text-slate-500">Tiqets - გამოტოვე რიგი</p>
            </div>
            <div className="ml-auto text-right">
              <span className="text-emerald-600 font-bold block">€22.00</span>
              <span className="text-xs text-slate-500">გადახდილია</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Plane className="text-blue-600" />
            <div>
              <h3 className="font-bold text-lg text-slate-800">Wizz Air (KUT - CDG)</h3>
              <p className="text-sm text-slate-500">Aviasales</p>
            </div>
            <div className="ml-auto text-right">
              <span className="text-emerald-600 font-bold block">€89.00</span>
              <span className="text-xs text-slate-500 px-2 py-0.5 bg-amber-50 text-amber-600 rounded">პროცესშია</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Providers */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-slate-700">ახალი ბილეთის დამატება</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href={`https://tiqets.com/en/?partner=${marker}`} target="_blank" rel="noopener noreferrer" className="bg-purple-50 border border-purple-200 rounded-2xl p-6 hover:border-purple-400 transition-colors group">
            <h3 className="text-xl font-bold text-purple-600 mb-2">Tiqets</h3>
            <p className="text-sm text-slate-500 mb-4">მუზეუმები, ატრაქციონები და ტურები რიგის გარეშე.</p>
            <span className="text-purple-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">ძიების დაწყება →</span>
          </a>

          <a href={`https://search.aviasales.com/?marker=${marker}`} target="_blank" rel="noopener noreferrer" className="bg-blue-50 border border-blue-200 rounded-2xl p-6 hover:border-blue-400 transition-colors group">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Aviasales</h3>
            <p className="text-sm text-slate-500 mb-4">ყველა ავიაკომპანიის ფრენა ერთ სივრცეში.</p>
            <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">ძიების დაწყება →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
