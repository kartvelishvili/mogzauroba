'use client';

import { Suspense } from 'react';
import ServicePage from '@/app/components/ServicePage';
import { Ticket } from 'lucide-react';

function TicketsContent() {
  return (
    <ServicePage 
      title="ბილეთები & ატრაქციონები" 
      description="ბილეთები და ტურები ერთ ადგილას — Tiqets, Musement, Klook, GetYourGuide." 
      icon={Ticket} 
      category="ticket,tour"
      categoryFilter={true}
    />
  );
}

export default function TicketsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div></div>}>
      <TicketsContent />
    </Suspense>
  );
}
