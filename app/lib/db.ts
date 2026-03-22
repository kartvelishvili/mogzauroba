import { Pool } from 'pg';

let _pool: Pool | null = null;

function getPool(): Pool {
  if (!_pool) {
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL || '',
      max: 10,
    });
  }
  return _pool;
}

export const pool = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: (...args: any[]) => (getPool().query as any)(...args),
  connect: () => getPool().connect(),
};

export async function query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]> {
  if (!process.env.DATABASE_URL) return [] as T[];
  const result = await getPool().query(text, params);
  return result.rows as T[];
}

export async function queryOne<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T | null> {
  if (!process.env.DATABASE_URL) return null;
  const result = await getPool().query(text, params);
  return (result.rows[0] as T) ?? null;
}

export async function queryCount(text: string, params?: unknown[]): Promise<number> {
  if (!process.env.DATABASE_URL) return 0;
  const result = await getPool().query(text, params);
  return parseInt(result.rows[0]?.count ?? '0', 10);
}
