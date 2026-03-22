import { NextResponse } from 'next/server';
import { query, queryOne } from '@/app/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Fetch the ticket by ID
    const ticket = await queryOne('SELECT * FROM travel_services WHERE id = $1', [id]);

    if (!ticket) {
      return NextResponse.json({ success: false, error: 'Ticket not found' }, { status: 404 });
    }

    // Fetch related items from same destination + category
    const related = await query(
      "SELECT * FROM travel_services WHERE destination = $1 AND category IN ('ticket', 'tour') AND id != $2 LIMIT 6",
      [ticket.destination, id]
    );

    // Fetch nearby hotels
    const nearbyHotels = await query(
      "SELECT * FROM travel_services WHERE destination = $1 AND category = 'hotel' LIMIT 4",
      [ticket.destination]
    );

    return NextResponse.json({
      success: true,
      data: ticket,
      related: related || [],
      nearbyHotels: nearbyHotels || [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
