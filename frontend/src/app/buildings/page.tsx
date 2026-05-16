"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listBuildings, deleteBuilding, Building } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, Plus, Pencil, Trash2 } from "lucide-react";

export default function BuildingsPage() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBuildings = () => {
    setLoading(true);
    listBuildings(100)
      .then(setBuildings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteBuilding(deleteId);
    setDeleteId(null);
    fetchBuildings();
  };

  if (loading) {
    return <div className="py-20 text-center text-muted-foreground">Loading buildings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buildings</h1>
          <p className="text-muted-foreground mt-1">Manage your building portfolio</p>
        </div>
        <Link href="/buildings/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Building
          </Button>
        </Link>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="py-4 text-destructive">{error}</CardContent>
        </Card>
      )}

      {buildings.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-muted-foreground">
            <Building2 className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No buildings yet</p>
            <p className="text-sm">Add your first building to get started.</p>
            <Link href="/buildings/new" className="mt-4">
              <Button>Add Building</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Buildings ({buildings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Satisfaction</TableHead>
                  <TableHead>Maintenance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buildings.map((building) => (
                  <TableRow key={building.id}>
                    <TableCell>
                      <Link
                        href={`/buildings/${building.id}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {building.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{building.address}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{building.building_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={building.status === "active" ? "default" : "secondary"}>
                        {building.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {building.occupancy_rate != null ? `${building.occupancy_rate}%` : "—"}
                    </TableCell>
                    <TableCell>
                      {building.tenant_satisfaction != null ? `${building.tenant_satisfaction}%` : "—"}
                    </TableCell>
                    <TableCell>{building.maintenance_backlog_count}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/buildings/${building.id}`}>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(building.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Building</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete this building? This will also remove all associated maintenance requests, systems, and tenants.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
