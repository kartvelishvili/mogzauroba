import { NextResponse } from 'next/server';
import { query, queryOne } from '@/app/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const item = await queryOne('SELECT * FROM travel_services WHERE id = $1', [id]);

    if (!item) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    // Related items: same destination + same category
    const related = await query(
      'SELECT * FROM travel_services WHERE destination = $1 AND category = $2 AND id != $3 LIMIT 6',
      [item.destination, item.category, id]
    );

    // Cross-sell: other categories from same destination
    const crossSellCategories = ['hotel', 'flight', 'tour', 'transfer', 'esim', 'ticket', 'insurance']
      .filter(cat => cat !== item.category);
    const placeholders = crossSellCategories.map((_, i) => `$${i + 3}`).join(', ');
    const crossSell = await query(
      `SELECT * FROM travel_services WHERE destination = $1 AND category IN (${placeholders}) LIMIT 12`,
      [item.destination, ...crossSellCategories]
    );

    return NextResponse.json({
      success: true,
      data: item,
      related: related || [],
      crossSell: crossSell || [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
