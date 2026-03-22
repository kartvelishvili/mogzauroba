'use client';

import { Suspense } from 'react';
import ServicePage from '@/app/components/ServicePage';
import { Map } from 'lucide-react';
import { useLang } from '@/app/lib/i18n';

function ToursContent() {
  const { t } = useLang();
  return (
    <ServicePage 
      title={t('tours.pageTitle')}
      description={t('tours.pageDesc')}
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
