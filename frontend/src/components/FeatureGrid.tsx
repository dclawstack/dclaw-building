import { FeatureSection } from './FeatureSection';
const features = [
  { icon: '🏗️', title: 'System Health Monitor', description: 'Real-time status for HVAC, elevators, fire safety, and all building systems.' },
  { icon: '🔧', title: 'Maintenance Tracker', description: 'Log and prioritize maintenance requests. Never miss a critical repair.' },
  { icon: '👥', title: 'Tenant Management', description: 'Track leases, contacts, and unit assignments across all your buildings.' },
  { icon: '📊', title: 'Occupancy Analytics', description: 'Monitor occupancy rates and building performance metrics at a glance.' },
];
export function FeatureGrid() {
  return (
    <section className="bg-[var(--bg)] py-16 px-6">
      <h2 className="text-3xl font-bold text-[var(--text)] text-center mb-10">Everything you need to manage your buildings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map(f => <FeatureSection key={f.title} {...f} />)}
      </div>
    </section>
  );
}
