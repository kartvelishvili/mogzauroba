'use client';

import { Suspense } from 'react';
import ServicePage from '@/app/components/ServicePage';
import { Hotel } from 'lucide-react';
import { useLang } from '@/app/lib/i18n';

function HotelsContent() {
  const { t } = useLang();
  return (
    <ServicePage 
      title={t('hotels.pageTitle')}
      description={t('hotels.pageDesc')}
      icon={Hotel}
      category="hotel"
    />
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div></div>}>
      <HotelsContent />
    </Suspense>
  );
}
