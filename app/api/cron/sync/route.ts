import { NextResponse } from 'next/server';
import { getCatalog } from '@/app/lib/catalog';

export async function GET() {
  const catalog = getCatalog();
  return NextResponse.json({
    success: true,
    message: `Static catalog: ${catalog.length} items. No database sync needed.`,
  });
}
