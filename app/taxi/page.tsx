'use client';

import { Suspense } from 'react';
import ServicePage from '@/app/components/ServicePage';
import { Car } from 'lucide-react';
import { useLang } from '@/app/lib/i18n';

function TaxiContent() {
  const { t } = useLang();
  return (
    <ServicePage
      title={t('taxi.pageTitle')}
      description={t('taxi.pageDesc')}
      icon={Car}
      category="transfer,car"
    />
  );
}

export default function TaxiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div></div>}>
      <TaxiContent />
    </Suspense>
  );
}
