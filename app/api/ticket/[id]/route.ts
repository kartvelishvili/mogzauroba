import { NextResponse } from 'next/server';
import { getServiceById, getCatalog } from '@/app/lib/catalog';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = parseInt(id, 10);

  try {
    const ticket = getServiceById(numId);

    if (!ticket) {
      return NextResponse.json({ success: false, error: 'Ticket not found' }, { status: 404 });
    }

    const catalog = getCatalog();

    const related = catalog
      .filter(s => s.destination === ticket.destination && (s.category === 'ticket' || s.category === 'tour') && s.id !== numId)
      .slice(0, 6);

    const nearbyHotels = catalog
      .filter(s => s.destination === ticket.destination && s.category === 'hotel')
      .slice(0, 4);

    return NextResponse.json({
      success: true,
      data: ticket,
      related,
      nearbyHotels,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
