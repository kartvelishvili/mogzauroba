'use client';

import { Image as ImageIcon } from 'lucide-react';
import Footer from '../components/Footer';
import { useLang } from '@/app/lib/i18n';

const photos = [
  { url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a', city: 'პარიზი, საფრანგეთი', cityEn: 'Paris, France' },
  { url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', city: 'რომი, იტალია', cityEn: 'Rome, Italy' },
  { url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077', city: 'ბარსელონა, ესპანეთი', cityEn: 'Barcelona, Spain' },
  { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c', city: 'დუბაი, საამიროები', cityEn: 'Dubai, UAE' },
  { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad', city: 'ლონდონი, ინგლისი', cityEn: 'London, England' },
  { url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200', city: 'სტამბოლი, თურქეთი', cityEn: 'Istanbul, Turkey' },
  { url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf', city: 'ტოკიო, იაპონია', cityEn: 'Tokyo, Japan' },
  { url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9', city: 'ნიუ-იორკი, აშშ', cityEn: 'New York, USA' },
  { url: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed', city: 'ბანგკოკი, ტაილანდი', cityEn: 'Bangkok, Thailand' },
  { url: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750', city: 'კაირო, ეგვიპტე', cityEn: 'Cairo, Egypt' },
  { url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856', city: 'ათენი, საბერძნეთი', cityEn: 'Athens, Greece' },
  { url: 'https://images.unsplash.com/photo-1560969184-10fe8719e047', city: 'ბერლინი, გერმანია', cityEn: 'Berlin, Germany' },
  { url: 'https://images.unsplash.com/photo-1541417904950-b855846fe074', city: 'ამსტერდამი, ნიდერლანდები', cityEn: 'Amsterdam, Netherlands' },
  { url: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439', city: 'პრაღა, ჩეხეთი', cityEn: 'Prague, Czech Republic' },
  { url: 'https://images.unsplash.com/photo-1565008576549-57569a49371d', city: 'ქუთაისი, საქართველო', cityEn: 'Kutaisi, Georgia' },
  { url: 'https://images.unsplash.com/photo-1565006072498-c03e2db55f6f', city: 'ბათუმი, საქართველო', cityEn: 'Batumi, Georgia' },
  { url: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5', city: 'ბურჯ ხალიფა, დუბაი', cityEn: 'Burj Khalifa, Dubai' },
  { url: 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b', city: 'საგრადა ფამილია, ბარსელონა', cityEn: 'Sagrada Familia, Barcelona' },
  { url: 'https://images.unsplash.com/photo-1555217851-6141535f9cc5', city: 'კანკუნი, მექსიკა', cityEn: 'Cancun, Mexico' },
  { url: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05', city: 'თბილისი, საქართველო', cityEn: 'Tbilisi, Georgia' },
];

export default function GalleryPage() {
  const { t, lang } = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-pink-50 p-3 rounded-2xl border border-pink-200">
            <ImageIcon size={32} className="text-pink-600" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">{t('gal.title')}</h1>
            <p className="text-slate-500 mt-1">{t('gal.subtitle')} — {photos.length} {t('gal.photos')}.</p>
          </div>
        </div>
        <div className="w-full h-px bg-slate-200 my-10" />

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, i) => (
            <div key={i} className="rounded-3xl overflow-hidden border border-slate-200 break-inside-avoid relative group shadow-sm">
              <img src={`${photo.url}?auto=format&fit=crop&w=600&q=80`} alt={photo.city} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-bold text-lg">{lang === 'en' ? photo.cityEn : photo.city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
