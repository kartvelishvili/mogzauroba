import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
});

export { pool };

// Helper: run a query and return rows
export async function query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows as T[];
}

// Helper: run a query and return the first row or null
export async function queryOne<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T | null> {
  const result = await pool.query(text, params);
  return (result.rows[0] as T) ?? null;
}

// Helper: run a query and return the count
export async function queryCount(text: string, params?: unknown[]): Promise<number> {
  const result = await pool.query(text, params);
  return parseInt(result.rows[0]?.count ?? '0', 10);
}
