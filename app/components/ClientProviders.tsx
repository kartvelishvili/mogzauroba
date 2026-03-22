'use client';

import { LangProvider } from '@/app/lib/i18n';
import type { ReactNode } from 'react';

export function ClientProviders({ children }: { children: ReactNode }) {
  return <LangProvider>{children}</LangProvider>;
}
