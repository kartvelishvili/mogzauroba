import { NextResponse } from 'next/server';
import { getServiceById, getCatalog } from '@/app/lib/catalog';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = parseInt(id, 10);

  try {
    const item = getServiceById(numId);

    if (!item) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    const catalog = getCatalog();

    const related = catalog
      .filter(s => s.destination === item.destination && s.category === item.category && s.id !== numId)
      .slice(0, 6);

    const crossSell = catalog
      .filter(s => s.destination === item.destination && s.category !== item.category)
      .slice(0, 12);

    return NextResponse.json({
      success: true,
      data: item,
      related,
      crossSell,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
