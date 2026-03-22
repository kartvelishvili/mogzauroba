export const API_BASE = 'https://api.travelpayouts.com';
export const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER;

// Aviasales v3 API requires Token
export const fetchWithToken = async (endpoint: string) => {
  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  
  if (!token) {
    throw new Error('Travelpayouts API Token is missing.');
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'x-access-token': token,
    },
    next: { revalidate: 3600 } // Cache flights for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch API: ${res.statusText}`);
  }

  return res.json();
};
