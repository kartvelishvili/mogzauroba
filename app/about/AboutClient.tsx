'use client';

import { Shield, Globe, Users, Star, Plane, Hotel, Car, Ticket, Headphones, CreditCard, Clock, MapPin, Compass } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';
import { useLang } from '@/app/lib/i18n';

export default function AboutClient() {
  const { t } = useLang();

  const team = [
    { role: t('ab.founderCEO'), desc: t('ab.founderDesc') },
    { role: t('ab.cto'), desc: t('ab.ctoDesc') },
    { role: t('ab.marketing'), desc: t('ab.marketingDesc') },
    { role: t('ab.supportTeam'), desc: t('ab.supportTeamDesc') },
  ];

  const timeline = [
    { year: '2024', event: t('ab.timeline1') },
    { year: '2025', event: t('ab.timeline2') },
    { year: '2026', event: t('ab.timeline3') },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 md:px-8 pt-24 pb-16 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <Compass size={14} />
              {t('ab.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 whitespace-pre-line">
              {t('ab.heroTitle')}
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {t('ab.heroDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">{t('ab.mission')}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {t('ab.missionP1')}
            </p>
            <p className="text-slate-500 leading-relaxed">
              {t('ab.missionP2')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Plane, label: t('ab.flights'), count: '100+' },
              { icon: Hotel, label: t('ab.hotels'), count: '50+' },
              { icon: Car, label: t('ab.transfers'), count: '30+' },
              { icon: Ticket, label: t('ab.attractions'), count: '45+' },
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
          <h2 className="text-3xl font-black text-slate-800 text-center mb-12">{t('ab.whyUs')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: t('ab.safe'), desc: t('ab.safeDesc') },
              { icon: Globe, title: t('ab.georgian'), desc: t('ab.georgianDesc') },
              { icon: CreditCard, title: t('ab.cheapPrices'), desc: t('ab.cheapDesc') },
              { icon: Headphones, title: t('ab.support'), desc: t('ab.supportDesc') },
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
        <h2 className="text-3xl font-black text-slate-800 text-center mb-12">{t('ab.history')}</h2>
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
        <h2 className="text-3xl font-black text-slate-800 text-center mb-12">{t('ab.team')}</h2>
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
          <h2 className="text-3xl font-black text-slate-800 mb-4">{t('ab.question')}</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">{t('ab.questionDesc')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info@mogzauroba.com" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold transition-colors">
              {t('ab.email')}
            </a>
            <a href="tel:+995500000000" className="border border-slate-300 hover:border-slate-400 text-slate-600 px-8 py-3 rounded-2xl font-bold transition-colors">
              {t('ab.phone')}
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
