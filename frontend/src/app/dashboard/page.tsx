"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboard, DashboardData } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Wrench, Users, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-muted-foreground">Loading dashboard...</div>;
  }

  if (error || !data) {
    return <div className="py-20 text-center text-destructive">{error || "Failed to load dashboard"}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Portfolio overview and key metrics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Building2 className="h-4 w-4" />
              <p className="text-sm font-medium">Total Buildings</p>
            </div>
            <p className="text-3xl font-bold">{data.total_buildings}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Users className="h-4 w-4" />
              <p className="text-sm font-medium">Avg Occupancy</p>
            </div>
            <p className="text-3xl font-bold">{data.avg_occupancy}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Users className="h-4 w-4" />
              <p className="text-sm font-medium">Avg Satisfaction</p>
            </div>
            <p className="text-3xl font-bold">{data.avg_satisfaction}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Wrench className="h-4 w-4" />
              <p className="text-sm font-medium">Open Maintenance</p>
            </div>
            <p className="text-3xl font-bold">{data.open_maintenance}</p>
          </CardContent>
        </Card>
      </div>

      {data.needs_attention > 0 && (
        <Card className="border-destructive/50">
          <CardContent className="py-4 flex items-center gap-3 text-destructive">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="font-medium">
              {data.needs_attention} high-priority maintenance request{data.needs_attention !== 1 ? "s" : ""} need attention
            </p>
            <Link href="/maintenance" className="ml-auto text-sm underline">View all</Link>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Recent Buildings</CardTitle></CardHeader>
        <CardContent>
          {data.recent_buildings.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              No buildings yet.{" "}
              <Link href="/buildings/new" className="underline">Add one</Link>.
            </p>
          ) : (
            <div className="space-y-0">
              {data.recent_buildings.map((b) => (
                <div key={b.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <Link href={`/buildings/${b.id}`} className="font-medium hover:text-primary transition-colors">
                    {b.name}
                  </Link>
                  <div className="flex items-center gap-3">
                    {b.occupancy_rate != null && (
                      <span className="text-sm text-muted-foreground">{b.occupancy_rate}% occ.</span>
                    )}
                    <Badge variant={b.status === "active" ? "default" : "secondary"}>{b.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
