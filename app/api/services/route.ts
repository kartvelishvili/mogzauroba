import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';
import type { ServiceCategory, TravelService } from '@/app/lib/travel';

// This API route fetches pre-synced multi-provider data directly from PostgreSQL.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination') || 'PAR';
  const category = searchParams.get('category'); // Optional filter, supports comma separated values

  try {
    let sql = 'SELECT * FROM travel_services WHERE destination = $1';
    const params: unknown[] = [destination];
    let paramIndex = 2;

    if (category) {
      const categories = category
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean) as ServiceCategory[];

      if (categories.length === 1) {
        sql += ` AND category = $${paramIndex}`;
        params.push(categories[0]);
      } else if (categories.length > 1) {
        const placeholders = categories.map((_, i) => `$${paramIndex + i}`).join(', ');
        sql += ` AND category IN (${placeholders})`;
        params.push(...categories);
      }
    }

    sql += ' ORDER BY price ASC';

    const data = await query<TravelService>(sql, params);

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
