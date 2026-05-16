"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listMaintenance, deleteMaintenance, MaintenanceRequest } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Wrench, Plus, Trash2, Filter } from "lucide-react";

export default function MaintenanceListPage() {
  const [items, setItems] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchItems = () => {
    setLoading(true);
    const params: { status?: string } = {};
    if (statusFilter) params.status = statusFilter;
    listMaintenance(params)
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, [statusFilter]);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMaintenance(deleteId);
    setDeleteId(null);
    fetchItems();
  };

  const priorityVariant = (p: string) =>
    p === "critical" || p === "high" ? "destructive" : "secondary";

  const statusVariant = (s: string) =>
    s === "open" ? "default" : s === "in_progress" ? "secondary" : "outline";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
          <p className="text-muted-foreground mt-1">Track and manage maintenance requests</p>
        </div>
        <Link href="/maintenance/new">
          <Button><Plus className="mr-2 h-4 w-4" />New Request</Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {["", "open", "in_progress", "resolved", "closed"].map((s) => (
          <Badge
            key={s}
            variant={statusFilter === s ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setStatusFilter(s)}
          >
            {s || "All"}
          </Badge>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-muted-foreground">Loading...</div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-muted-foreground">
            <Wrench className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No maintenance requests</p>
            <Link href="/maintenance/new" className="mt-4"><Button>Create Request</Button></Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader><CardTitle>All Requests ({items.length})</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Building</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{m.building_id.slice(0, 8)}...</TableCell>
                    <TableCell><Badge variant={priorityVariant(m.priority)}>{m.priority}</Badge></TableCell>
                    <TableCell><Badge variant={statusVariant(m.status)}>{m.status}</Badge></TableCell>
                    <TableCell className="text-sm">{m.assigned_to || "—"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setDeleteId(m.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
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
          <DialogHeader><DialogTitle>Delete Maintenance Request</DialogTitle></DialogHeader>
          <p className="text-muted-foreground">Are you sure?</p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
