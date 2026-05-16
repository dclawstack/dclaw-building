"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBuilding, BuildingCreate } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

export default function NewBuildingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<BuildingCreate>({
    name: "",
    address: "",
    building_type: "commercial",
    total_floors: 1,
    status: "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const building = await createBuilding(form);
      router.push(`/buildings/${building.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create building");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/buildings">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Building</h1>
          <p className="text-muted-foreground">Register a new building in the portfolio</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Building Details</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Empire State Building"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="building_type">Type</Label>
                <Select
                  id="building_type"
                  value={form.building_type}
                  onChange={(e) => setForm({ ...form, building_type: e.target.value })}
                >
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="industrial">Industrial</option>
                  <option value="mixed_use">Mixed Use</option>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="350 5th Ave, New York, NY 10118"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="total_floors">Floors</Label>
                <Input
                  id="total_floors"
                  type="number"
                  min={1}
                  value={form.total_floors}
                  onChange={(e) => setForm({ ...form, total_floors: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year_built">Year Built</Label>
                <Input
                  id="year_built"
                  type="number"
                  value={form.year_built ?? ""}
                  onChange={(e) => setForm({ ...form, year_built: e.target.value ? parseInt(e.target.value) : null })}
                  placeholder="2010"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="under_maintenance">Under Maintenance</option>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="occupancy_rate">Occupancy Rate (%)</Label>
                <Input
                  id="occupancy_rate"
                  type="number"
                  min={0}
                  max={100}
                  value={form.occupancy_rate ?? ""}
                  onChange={(e) => setForm({ ...form, occupancy_rate: e.target.value ? parseFloat(e.target.value) : null })}
                  placeholder="85"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenant_satisfaction">Tenant Satisfaction (%)</Label>
                <Input
                  id="tenant_satisfaction"
                  type="number"
                  min={0}
                  max={100}
                  value={form.tenant_satisfaction ?? ""}
                  onChange={(e) => setForm({ ...form, tenant_satisfaction: e.target.value ? parseFloat(e.target.value) : null })}
                  placeholder="90"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>
                <Building2 className="mr-2 h-4 w-4" />
                {loading ? "Creating..." : "Create Building"}
              </Button>
              <Link href="/buildings">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
