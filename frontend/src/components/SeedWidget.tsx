'use client';
import { useState, useEffect } from 'react';
export function SeedWidget() {
  const [seeded, setSeeded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    fetch('/api/v1/building/demo/status').then(r => r.json()).then(d => setSeeded(d.seeded)).catch(() => {});
  }, []);
  const showMessage = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(null), 3000); };
  const seed = async () => { setLoading(true); await fetch('/api/v1/building/demo/seed', { method: 'POST' }); setSeeded(true); setLoading(false); showMessage('Demo data seeded successfully'); };
  const clear = async () => { setLoading(true); await fetch('/api/v1/building/demo/clear', { method: 'DELETE' }); setSeeded(false); setLoading(false); showMessage('Demo data cleared'); };
  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 z-50">
      {message && (
        <div className="bg-[var(--surface)] text-[var(--text)] border border-[var(--border-col)] px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
          {message}
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={seed} disabled={loading} className="bg-[var(--accent-col)] text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity">
          {seeded ? 'Re-seed Data' : 'Seed Demo Data'}
        </button>
        <button onClick={clear} disabled={loading || !seeded} className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity">
          Clear Data
        </button>
      </div>
    </div>
  );
}
