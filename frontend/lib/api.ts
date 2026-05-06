const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function getBuildingHealth(building_id: string) {
  const res = await fetch(`${API_BASE}/healths`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ building_id }),
  });
  if (!res.ok) throw new Error('Failed to get building health');
  return res.json();
}

export async function getSystems(healthId: string) {
  const res = await fetch(`${API_BASE}/healths/${healthId}/systems`);
  if (!res.ok) throw new Error('Failed to fetch systems');
  return res.json();
}
