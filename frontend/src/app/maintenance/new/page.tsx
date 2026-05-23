"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createMaintenance, listBuildings, Building, MaintenanceCreate } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

export default function NewMaintenancePage() {
  const router = useRouter();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<MaintenanceCreate>({
    building_id: "",
    title: "",
    description: "",
    priority: "medium",
    status: "open",
    assigned_to: "",
  });

  useEffect(() => {
    listBuildings(100).then(setBuildings);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const created = await createMaintenance(form);
      router.push(`/buildings/${created.building_id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create maintenance request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/maintenance">
          <Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Maintenance Request</h1>
          <p className="text-muted-foreground">Log a new maintenance issue</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Request Details</CardTitle></CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="building_id">Building *</Label>
              <Select
                id="building_id"
                required
                value={form.building_id}
                onChange={(e) => setForm({ ...form, building_id: e.target.value })}
              >
                <option value="">Select a building...</option>
                {buildings.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" required value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Fix elevator on floor 3" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Input id="description" required value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detailed description of the issue..." />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status ?? "open"} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Assigned To</Label>
                <Input value={form.assigned_to ?? ""}
                  onChange={(e) => setForm({ ...form, assigned_to: e.target.value || null })} placeholder="Technician name" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Request"}</Button>
              <Link href="/maintenance"><Button variant="outline" type="button">Cancel</Button></Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
