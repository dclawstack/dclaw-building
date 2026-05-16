"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboard, DashboardData } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Wrench, AlertTriangle, TrendingUp, Users, Plus } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-destructive mb-3" />
            <p className="text-destructive font-medium">Failed to load dashboard</p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Buildings",
      value: data?.total_buildings ?? 0,
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Avg Occupancy",
      value: `${data?.avg_occupancy ?? 0}%`,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Avg Satisfaction",
      value: `${data?.avg_satisfaction ?? 0}%`,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Open Maintenance",
      value: data?.open_maintenance ?? 0,
      icon: Wrench,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Building health and management overview
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/buildings/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Building
            </Button>
          </Link>
          <Link href="/maintenance/new">
            <Button variant="outline">
              <Wrench className="mr-2 h-4 w-4" />
              Log Maintenance
            </Button>
          </Link>
        </div>
      </div>

      {/* Needs attention alert */}
      {(data?.needs_attention ?? 0) > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="flex items-center gap-3 py-4">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
            <p className="text-sm font-medium">
              {data?.needs_attention} maintenance request{data?.needs_attention !== 1 ? "s" : ""} need{data?.needs_attention === 1 ? "s" : ""} immediate attention
            </p>
            <Link href="/maintenance?priority=high&priority=critical" className="ml-auto">
              <Button variant="destructive" size="sm">View</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent buildings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Buildings</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.recent_buildings && data.recent_buildings.length > 0 ? (
            <div className="divide-y">
              {data.recent_buildings.map((building) => (
                <div key={building.id} className="flex items-center justify-between py-3">
                  <div>
                    <Link
                      href={`/buildings/${building.id}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {building.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Occupancy: {building.occupancy_rate ?? "N/A"}%
                    </p>
                  </div>
                  <Badge variant={building.status === "active" ? "default" : "secondary"}>
                    {building.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="mx-auto h-10 w-10 mb-3 opacity-50" />
              <p>No buildings yet</p>
              <Link href="/buildings/new">
                <Button variant="outline" className="mt-3">Add your first building</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
