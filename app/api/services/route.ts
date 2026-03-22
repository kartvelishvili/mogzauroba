import { NextResponse } from 'next/server';
import { getServicesByDestination } from '@/app/lib/catalog';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination') || 'PAR';
  const category = searchParams.get('category');

  try {
    const categories = category
      ? category.split(',').map(c => c.trim()).filter(Boolean)
      : undefined;

    const data = getServicesByDestination(destination, categories);

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown services error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
