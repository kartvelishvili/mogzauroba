'use client';

import { Suspense } from 'react';
import ServicePage from '@/app/components/ServicePage';
import { MapPin } from 'lucide-react';

function PlacesContent() {
  return (
    <ServicePage 
      title="ადგილები & ტურები" 
      description="პოპულარული ღირსშესანიშნაობები, ტურები და ბილეთები — GetYourGuide, Viator, Tiqets." 
      icon={MapPin} 
      category="tour,ticket"
    />
  );
}

export default function PlacesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div></div>}>
      <PlacesContent />
    </Suspense>
  );
}
