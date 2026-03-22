'use client';

import { Suspense } from 'react';
import ServicePage from '@/app/components/ServicePage';
import { Map } from 'lucide-react';

function ToursContent() {
  return (
    <ServicePage 
      title="ჯგუფური და ინდივიდუალური ტურები"
      description="აღმოაჩინე ახალი კულტურა ექსპერტი გიდების დახმარებით."
      icon={Map}
      category="tour"
    />
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div></div>}>
      <ToursContent />
    </Suspense>
  );
}
