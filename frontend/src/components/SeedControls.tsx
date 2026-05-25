// ─── SEED CONTROLS ────────────────────────────────────────────────────────────
// Demo utility — remove this file and the <SeedControls /> block in
// src/app/page.tsx (and the seed router in the backend) when no longer needed.
// ──────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";

interface SeedResult {
  buildings: number;
  tenants: number;
  systems: number;
  maintenance_requests: number;
}

export function SeedControls() {
  const [fillStatus, setFillStatus] = useState<Status>("idle");
  const [clearStatus, setClearStatus] = useState<Status>("idle");
  const [result, setResult] = useState<SeedResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  async function handleFill() {
    setFillStatus("loading");
    setMessage(null);
    setIsError(false);
    try {
      const res = await fetch("/api/v1/seed", { method: "POST" });
      if (!res.ok) throw new Error(`Seed failed (${res.status})`);
      const data: SeedResult = await res.json();
      setResult(data);
      setMessage(
        `Seeded ${data.buildings} buildings · ${data.tenants} tenants · ${data.systems} systems · ${data.maintenance_requests} maintenance requests.`
      );
      setFillStatus("success");
    } catch (e) {
      setIsError(true);
      setMessage(e instanceof Error ? e.message : "Seed failed");
      setFillStatus("error");
    }
  }

  async function handleClear() {
    setClearStatus("loading");
    setMessage(null);
    setIsError(false);
    try {
      const res = await fetch("/api/v1/seed", { method: "DELETE" });
      if (!res.ok) throw new Error(`Clear failed (${res.status})`);
      setResult(null);
      setMessage("All data cleared. App is back to a fresh, empty state.");
      setClearStatus("success");
      setFillStatus("idle");
    } catch (e) {
      setIsError(true);
      setMessage(e instanceof Error ? e.message : "Clear failed");
      setClearStatus("error");
    }
  }

  const busy = fillStatus === "loading" || clearStatus === "loading";
  const fillLabel =
    fillStatus === "loading" ? "Seeding…" : fillStatus === "success" ? "Seeded ✓" : "Seed Demo Data";
  const clearLabel =
    clearStatus === "loading" ? "Clearing…" : clearStatus === "success" ? "Cleared ✓" : "Clear Data";

  return (
    <div className="rounded-2xl border border-dashed border-[var(--accent-col)] bg-[var(--surface)] p-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent-col)]">Demo Controls</p>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Populate the platform with a realistic building portfolio, or wipe it to start fresh.
      </p>

      <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          onClick={handleFill}
          disabled={busy}
          className="rounded-lg bg-[var(--accent-col)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {fillLabel}
        </button>
        <button
          onClick={handleClear}
          disabled={busy}
          className="rounded-lg border border-[var(--border-col)] px-6 py-2.5 text-sm font-semibold text-[var(--text)] transition-colors hover:bg-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {clearLabel}
        </button>
      </div>

      {message && (
        <p className={`mt-4 text-xs ${isError ? "text-red-500" : "text-emerald-500"}`}>{message}</p>
      )}

      {result && fillStatus === "success" && (
        <div className="mt-4">
          <Link
            href="/dashboard"
            className="inline-block rounded-lg bg-[var(--text)] px-6 py-2.5 text-sm font-semibold text-[var(--bg)] transition-opacity hover:opacity-90"
          >
            Open the demo dashboard →
          </Link>
        </div>
      )}
    </div>
  );
}
