import { NextResponse } from 'next/server';
import { pool } from '@/app/lib/db';

export async function GET() {
  const statements = [
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS origin text",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS airline text",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS departure_at timestamptz",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS return_at timestamptz",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS duration_to integer",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS duration_back integer",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS transfers integer DEFAULT 0",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS return_transfers integer DEFAULT 0",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS gate text",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS flight_number text",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS origin_airport text",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS destination_airport text",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS deep_link text",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS rating numeric",
    "ALTER TABLE travel_services ADD COLUMN IF NOT EXISTS subcategory text",
  ];

  try {
    for (const stmt of statements) {
      await pool.query(stmt);
    }
    return NextResponse.json({ success: true, message: `Executed ${statements.length} migration statements on PostgreSQL.` });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Migration error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
