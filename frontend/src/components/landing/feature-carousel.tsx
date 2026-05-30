import { Activity, Wrench, Users, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "System Health Monitor",
    description:
      "Real-time status for HVAC, elevators, fire safety, and all building systems at a glance",
  },
  {
    icon: Wrench,
    title: "Maintenance Tracker",
    description:
      "Log and prioritize maintenance requests with status tracking and assignment workflows",
  },
  {
    icon: Users,
    title: "Tenant Management",
    description:
      "Track leases, contacts, and unit assignments across all your buildings in one place",
  },
  {
    icon: BarChart3,
    title: "Occupancy Analytics",
    description:
      "Monitor occupancy rates, vacancy trends, and building performance metrics over time",
  },
]

const allCards = [...features, ...features]

export default function FeatureCarousel() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-black tracking-tight md:text-4xl">
          Everything you need to manage your buildings
        </h2>
        <p className="mt-4 text-center text-muted-foreground">
          One platform for the full building lifecycle — from system health to tenant satisfaction.
        </p>
      </div>

      <div className="mt-12 overflow-hidden">
        <div className="animate-scroll flex gap-6 w-max">
          {allCards.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="w-72 min-w-[288px] rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-4 inline-flex rounded-xl bg-brand-cyan/10 p-3">
                  <Icon size={20} className="text-brand-cyan" />
                </div>
                <h3 className="font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
