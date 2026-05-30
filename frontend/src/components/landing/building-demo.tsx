import Link from "next/link"

const checks = [
  "Real-time system health across all buildings",
  "Automated maintenance request prioritization",
  "Tenant lease tracking with renewal alerts",
  "Occupancy analytics and trend reporting",
]

export default function BuildingDemo() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            See your portfolio at a glance
          </h2>
          <p className="mt-4 text-muted-foreground">
            The dashboard surfaces critical information from every building — system alerts,
            pending maintenance, and occupancy metrics — so you can act before problems escalate.
          </p>

          <div className="mt-8 rounded-xl bg-muted p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Building — Tower A
            </p>
            <div className="space-y-2 text-sm text-foreground">
              <div className="flex justify-between">
                <span>HVAC</span>
                <span className="font-medium text-brand-emerald">Operational</span>
              </div>
              <div className="flex justify-between">
                <span>Elevator #2</span>
                <span className="font-medium text-amber-500">Maintenance Due</span>
              </div>
              <div className="flex justify-between">
                <span>Fire Safety</span>
                <span className="font-medium text-brand-emerald">Passed</span>
              </div>
            </div>
          </div>

          <div className="my-3 flex items-center justify-center gap-2 text-brand-cyan">
            <div className="h-px flex-1 bg-brand-cyan/20" />
            <span className="text-xs font-medium">Live Monitoring</span>
            <div className="h-px flex-1 bg-brand-cyan/20" />
          </div>

          <div className="rounded-xl border border-brand-cyan/20 bg-brand-cyan/5 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-cyan">
              Maintenance Queue
            </p>
            <div className="space-y-2 text-sm text-foreground">
              <div className="flex justify-between">
                <span>WO-042: Lobby lighting replacement</span>
                <span className="font-medium text-brand-cyan">In Progress</span>
              </div>
              <div className="flex justify-between">
                <span>WO-043: Parking gate sensor</span>
                <span className="font-medium text-muted-foreground">Open</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ul className="space-y-4">
            {checks.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 text-lg font-bold text-brand-cyan">&#10003;</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/buildings"
            className="mt-10 inline-block rounded-xl bg-brand-cyan px-8 py-3 font-semibold text-white shadow-lg shadow-brand-cyan/30 transition-opacity hover:opacity-90"
          >
            Explore Buildings
          </Link>
        </div>
      </div>
    </section>
  )
}
