import Link from 'next/link';
export function HeroSection() {
  return (
    <section className="bg-[var(--bg)] py-24 px-6 text-center">
      <h1 className="text-5xl font-bold text-[var(--text)] mb-6">
        Building Intelligence.<br />Delivered.
      </h1>
      <p className="text-xl text-[var(--text-muted)] mb-10 max-w-2xl mx-auto">
        Monitor building health, track maintenance, manage tenants, and optimize system performance — all in one platform.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link href="/buildings" className="bg-[var(--accent-col)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          View Buildings
        </Link>
        <Link href="/maintenance" className="border border-[var(--border-col)] text-[var(--text)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--surface)] transition-colors">
          Maintenance
        </Link>
      </div>
    </section>
  );
}
