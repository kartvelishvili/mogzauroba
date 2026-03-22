import { Shield, Globe, Users, Star, Plane, Hotel, Car, Ticket, Headphones, CreditCard, Clock, MapPin, Compass } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'ჩვენს შესახებ',
  description: 'Biujeturi.ge — ქართული სამოგზაურო პლატფორმა. ავიაბილეთები, სასტუმროები, ტურები და ტრანსფერები.',
};

const team = [
  { role: 'დამფუძნებელი & CEO', desc: 'სტრატეგია და ხედვა' },
  { role: 'ტექნიკური დირექტორი', desc: 'პლატფორმის განვითარება' },
  { role: 'მარკეტინგი', desc: 'მომხმარებლის მოზიდვა' },
  { role: 'მხარდაჭერა', desc: '24/7 კლიენტთა სერვისი' },
];

const timeline = [
  { year: '2024', event: 'პლატფორმის დაფუძნება და API ინტეგრაცია' },
  { year: '2025', event: '6 მიმართულება, 225+ აქტიური შეთავაზება' },
  { year: '2026', event: 'გაფართოება ევროპის 20+ ქალაქში' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 md:px-8 pt-24 pb-16 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <Compass size={14} />
              ჩვენს შესახებ
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
              Biujeturi.ge — ქართული<br />სამოგზაურო პლატფორმა
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              ჩვენ ვქმნით ერთიან სივრცეს ქართველი მოგზაურებისთვის, 
              სადაც ერთი ძიებით შეძლებ ავიაბილეთების, სასტუმროების, ტურების და ტრანსფერების შედარებას 12+ პროვაიდერიდან.
            </p>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">ჩვენი მისია</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              მოგზაურობა ყველას უნდა. ჩვენი მიზანია ქართულენოვან მომხმარებლებს შევთავაზოთ 
              მსოფლიო დონის სამოგზაურო პლატფორმა, სადაც ყველა სერვისი ერთ ადგილას მოგეძებნება.
            </p>
            <p className="text-slate-500 leading-relaxed">
              ჩვენ ვთანამშრომლობთ Aviasales, Klook, Kiwitaxi, Localrent, Airalo და EKTA პარტნიორებთან, 
              რომ საუკეთესო ფასები და სერვისები შემოგთავაზოთ.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Plane, label: 'ავიაბილეთები', count: '100+' },
              { icon: Hotel, label: 'სასტუმროები', count: '50+' },
              { icon: Car, label: 'ტრანსფერები', count: '30+' },
              { icon: Ticket, label: 'ატრაქციონები', count: '45+' },
            ].map((s, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                <s.icon size={28} className="text-emerald-600 mx-auto mb-2" />
                <p className="text-2xl font-black text-slate-800">{s.count}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Us */}
      <div className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
          <h2 className="text-3xl font-black text-slate-800 text-center mb-12">რატომ Biujeturi.ge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'უსაფრთხო', desc: 'SSL დაშიფვრა და დაცული ტრანზაქციები' },
              { icon: Globe, title: 'ქართულად', desc: 'სრულად ქართული ინტერფეისი' },
              { icon: CreditCard, title: 'იაფი ფასები', desc: '12+ პროვაიდერის შედარება' },
              { icon: Headphones, title: 'მხარდაჭერა', desc: '24/7 ქართული სერვისი' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={26} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl font-black text-slate-800 text-center mb-12">ჩვენი ისტორია</h2>
        <div className="space-y-6 max-w-xl mx-auto">
          {timeline.map((item, i) => (
            <div key={i} className="flex items-start gap-6">
              <div className="shrink-0 w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center">
                <span className="text-emerald-600 font-black text-lg">{item.year}</span>
              </div>
              <div className="pt-3">
                <p className="text-slate-700 font-medium">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl font-black text-slate-800 text-center mb-12">ჩვენი გუნდი</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users size={24} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">{member.role}</h3>
              <p className="text-xs text-slate-500">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-3xl font-black text-slate-800 mb-4">გაქვს შეკითხვა?</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">დაგვიკავშირდი ნებისმიერ დროს — ჩვენი გუნდი მზად არის შენ დასახმარებლად.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info@biujeturi.ge" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold transition-colors">
              ელ-ფოსტით
            </a>
            <a href="tel:+995500000000" className="border border-slate-300 hover:border-slate-400 text-slate-600 px-8 py-3 rounded-2xl font-bold transition-colors">
              ტელეფონით
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
