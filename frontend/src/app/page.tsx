import Link from "next/link";
import {
  Building2,
  Wrench,
  Users,
  BarChart3,
  ShieldCheck,
  Gauge,
  ClipboardList,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { SeedControls } from "@/components/SeedControls";

const features = [
  {
    icon: Gauge,
    title: "System Health Monitor",
    description:
      "Real-time operational status for HVAC, elevators, fire safety, electrical, and every system across your portfolio — flagged the moment something needs service.",
    tag: "Operations",
  },
  {
    icon: Wrench,
    title: "Maintenance Tracker",
    description:
      "Log, prioritize, and assign maintenance requests from low to critical. Track them through open, in-progress, and resolved so nothing slips.",
    tag: "Operations",
  },
  {
    icon: Users,
    title: "Tenant Management",
    description:
      "Keep leases, contacts, and unit assignments organized for every tenant in every building, with lease start and end dates at your fingertips.",
    tag: "Portfolio",
  },
  {
    icon: BarChart3,
    title: "Occupancy Analytics",
    description:
      "Monitor occupancy rates, tenant satisfaction, and building performance metrics across the whole portfolio in a single dashboard view.",
    tag: "Analytics",
  },
  {
    icon: Building2,
    title: "Portfolio Registry",
    description:
      "A clean record of every commercial, residential, industrial, and mixed-use property — floors, year built, status, and notes in one place.",
    tag: "Portfolio",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Inspections",
    description:
      "Track last-inspected dates on critical systems so safety and compliance reviews never lapse on your watch.",
    tag: "Operations",
  },
  {
    icon: ClipboardList,
    title: "Backlog Visibility",
    description:
      "Per-building maintenance backlog counts surface where attention is needed most, so you can triage across the portfolio at a glance.",
    tag: "Analytics",
  },
  {
    icon: Sparkles,
    title: "Instant Demo Data",
    description:
      "Spin up a realistic, fully-populated building portfolio in one click to explore every feature — then wipe it just as fast.",
    tag: "Getting started",
  },
];

const tagColor: Record<string, string> = {
  Operations: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Portfolio: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Analytics: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  "Getting started": "bg-violet-500/10 text-violet-400 border border-violet-500/20",
};

const steps = [
  {
    n: "01",
    title: "Register your buildings",
    description:
      "Add each property with its type, floor count, and status. Your whole portfolio lives in one searchable registry.",
  },
  {
    n: "02",
    title: "Track systems & requests",
    description:
      "Attach systems and log maintenance requests per building. Priorities and statuses keep the team aligned.",
  },
  {
    n: "03",
    title: "Monitor the dashboard",
    description:
      "Watch occupancy, satisfaction, and open maintenance roll up live so you always know what needs attention.",
  },
];

const stats = [
  { value: "Portfolio-wide", label: "occupancy & satisfaction" },
  { value: "Per-system", label: "health monitoring" },
  { value: "Priority-aware", label: "maintenance triage" },
  { value: "One-click", label: "demo data" },
];

export default function HomePage() {
  return (
    <div className="space-y-28">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--border-col)] bg-[var(--surface)] px-6 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[var(--accent-col)]/15 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-col)] bg-[var(--bg)] px-4 py-1.5 text-sm font-medium text-[var(--text-muted)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-col)]" />
            The operating system for building portfolios
          </div>
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-[var(--text)] md:text-6xl">
            Building Intelligence.
            <br />
            Delivered.
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[var(--text-muted)]">
            Monitor building health, track maintenance, manage tenants, and optimize system
            performance — all in one platform built for property and facilities teams.
          </p>
          <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-col)] px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
            >
              Open Dashboard <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/buildings"
              className="rounded-xl border border-[var(--border-col)] px-8 py-4 text-lg font-semibold text-[var(--text)] transition-colors hover:bg-[var(--bg)]"
            >
              View Buildings
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-2xl font-bold text-[var(--text)]">{s.value}</div>
            <div className="mt-1 text-sm text-[var(--text-muted)]">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── Features ── */}
      <section id="features">
        <div className="mb-14 space-y-3 text-center">
          <div className="text-sm font-semibold uppercase tracking-widest text-[var(--accent-col)]">
            Everything you need to manage your buildings
          </div>
          <h2 className="text-4xl font-bold text-[var(--text)]">One platform, full visibility</h2>
          <p className="mx-auto max-w-2xl text-lg text-[var(--text-muted)]">
            From day-to-day maintenance to portfolio-wide analytics, every part of building
            operations lives in a single, themed workspace.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-[var(--border-col)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent-col)]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="text-[var(--accent-col)]">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tagColor[f.tag]}`}>
                    {f.tag}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-semibold leading-snug text-[var(--text)]">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works">
        <div className="mb-14 space-y-3 text-center">
          <div className="text-sm font-semibold uppercase tracking-widest text-[var(--accent-col)]">
            Simple by design
          </div>
          <h2 className="text-4xl font-bold text-[var(--text)]">From portfolio to peace of mind</h2>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="space-y-4 text-center">
              <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--border-col)] bg-[var(--surface)]">
                <span className="text-2xl font-bold text-[var(--accent-col)]">{step.n}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text)]">{step.title}</h3>
              <p className="leading-relaxed text-[var(--text-muted)]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dashboard preview ── */}
      <section className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <div className="text-sm font-semibold uppercase tracking-widest text-[var(--accent-col)]">
            Live dashboard
          </div>
          <h2 className="text-4xl font-bold leading-tight text-[var(--text)]">
            Know your portfolio at a glance
          </h2>
          <p className="text-lg leading-relaxed text-[var(--text-muted)]">
            The dashboard rolls up total buildings, average occupancy, tenant satisfaction, and open
            maintenance in real time — so the things that need attention surface first.
          </p>
          <Link
            href="/maintenance"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-col)] transition-opacity hover:opacity-80"
          >
            Browse maintenance requests <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[var(--border-col)] bg-[var(--surface)] shadow-xl">
          <div className="flex items-center gap-2 border-b border-[var(--border-col)] bg-[var(--bg)] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-[var(--text-muted)]">DClaw Building · Dashboard</span>
          </div>
          <div className="space-y-4 p-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Buildings", value: "4" },
                { label: "Avg Occupancy", value: "78%" },
                { label: "Satisfaction", value: "4.0" },
                { label: "Open Maintenance", value: "6", danger: true },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-[var(--border-col)] bg-[var(--bg)] p-3"
                >
                  <div className="mb-1 text-xs text-[var(--text-muted)]">{s.label}</div>
                  <div
                    className={`text-2xl font-bold ${s.danger ? "text-red-500" : "text-[var(--text)]"}`}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 rounded-lg border border-[var(--border-col)] bg-[var(--bg)] p-3">
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                Recent activity
              </div>
              {[
                { t: "Elevator A inspection overdue", s: "high", c: "bg-red-500/15 text-red-400" },
                { t: "Roof membrane replacement", s: "critical", c: "bg-red-500/15 text-red-400" },
                { t: "Parking lot lighting outage", s: "in progress", c: "bg-blue-500/15 text-blue-400" },
                { t: "Carpet deep clean", s: "resolved", c: "bg-emerald-500/15 text-emerald-400" },
              ].map((row) => (
                <div key={row.t} className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text)]">{row.t}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${row.c}`}>
                    {row.s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEED CONTROLS — remove this block (and the SeedControls import) to hide ── */}
      <section>
        <div className="mx-auto max-w-lg">
          <SeedControls />
        </div>
      </section>
      {/* ── END SEED CONTROLS ── */}

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border-col)] pt-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <span className="text-lg font-bold text-[var(--text)]">DClaw Building</span>
          <nav className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
            <Link href="/dashboard" className="transition-colors hover:text-[var(--text)]">
              Dashboard
            </Link>
            <Link href="/buildings" className="transition-colors hover:text-[var(--text)]">
              Buildings
            </Link>
            <Link href="/maintenance" className="transition-colors hover:text-[var(--text)]">
              Maintenance
            </Link>
          </nav>
          <div className="text-sm text-[var(--text-muted)]">Built with FastAPI · Next.js · PostgreSQL</div>
        </div>
      </footer>
    </div>
  );
}
