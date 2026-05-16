"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getBuilding, updateBuilding, deleteBuilding, Building, BuildingUpdate } from "@/lib/api";
import {
  listMaintenance,
  createMaintenance,
  deleteMaintenance,
  MaintenanceRequest,
  MaintenanceCreate,
} from "@/lib/api";
import { listSystems, createSystem, deleteSystem, BuildingSystem, SystemCreate } from "@/lib/api";
import { listTenants, createTenant, deleteTenant, Tenant, TenantCreate } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft, Pencil, Trash2, Wrench, Cpu, Users, Plus,
} from "lucide-react";

export default function BuildingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [building, setBuilding] = useState<Building | null>(null);
  const [maintenance, setMaintenance] = useState<MaintenanceRequest[]>([]);
  const [systems, setSystems] = useState<BuildingSystem[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<BuildingUpdate>({});
  const [error, setError] = useState<string | null>(null);

  // Dialog states
  const [maintForm, setMaintForm] = useState<MaintenanceCreate>({
    building_id: id,
    title: "",
    description: "",
    priority: "medium",
  });
  const [showMaintForm, setShowMaintForm] = useState(false);
  const [systemForm, setSystemForm] = useState<SystemCreate>({
    building_id: id,
    system_name: "",
    system_type: "other",
    status: "operational",
  });
  const [showSystemForm, setShowSystemForm] = useState(false);
  const [tenantForm, setTenantForm] = useState<TenantCreate>({
    building_id: id,
    name: "",
    contact_email: "",
    contact_phone: "",
    unit_number: "",
  });
  const [showTenantForm, setShowTenantForm] = useState(false);

  const fetchAll = async () => {
    try {
      const [b, m, s, t] = await Promise.all([
        getBuilding(id),
        listMaintenance({ building_id: id }),
        listSystems({ building_id: id }),
        listTenants({ building_id: id }),
      ]);
      setBuilding(b);
      setMaintenance(m);
      setSystems(s);
      setTenants(t);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load building");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const updated = await updateBuilding(id, editForm);
      setBuilding(updated);
      setEditMode(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
  };

  const handleDelete = async () => {
    await deleteBuilding(id);
    router.push("/buildings");
  };

  const handleAddMaint = async () => {
    await createMaintenance(maintForm);
    setShowMaintForm(false);
    setMaintForm({ building_id: id, title: "", description: "", priority: "medium" });
    fetchAll();
  };

  const handleAddSystem = async () => {
    await createSystem(systemForm);
    setShowSystemForm(false);
    setSystemForm({ building_id: id, system_name: "", system_type: "other", status: "operational" });
    fetchAll();
  };

  const handleAddTenant = async () => {
    await createTenant(tenantForm);
    setShowTenantForm(false);
    setTenantForm({ building_id: id, name: "", contact_email: "", contact_phone: "", unit_number: "" });
    fetchAll();
  };

  if (loading) {
    return <div className="py-20 text-center text-muted-foreground">Loading building...</div>;
  }

  if (error || !building) {
    return (
      <div className="space-y-4">
        <Link href="/buildings">
          <Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        </Link>
        <Card>
          <CardContent className="py-12 text-center text-destructive">
            {error || "Building not found"}
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusVariant =
    building.status === "active" ? "default" :
    building.status === "under_maintenance" ? "destructive" : "secondary";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/buildings">
            <Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{building.name}</h1>
            <p className="text-muted-foreground">{building.address}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { setEditForm(building); setEditMode(true); }}>
            <Pencil className="mr-2 h-4 w-4" />Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />Delete
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <Badge variant={statusVariant} className="mt-1 text-sm">{building.status}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Occupancy</p>
            <p className="text-2xl font-bold">{building.occupancy_rate ?? "—"}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Tenant Satisfaction</p>
            <p className="text-2xl font-bold">{building.tenant_satisfaction ?? "—"}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Maintenance Backlog</p>
            <p className="text-2xl font-bold">{building.maintenance_backlog_count}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs: Maintenance, Systems, Tenants */}
      <Tabs defaultValue="maintenance">
        <TabsList>
          <TabsTrigger value="maintenance">
            <Wrench className="mr-2 h-4 w-4" />Maintenance ({maintenance.length})
          </TabsTrigger>
          <TabsTrigger value="systems">
            <Cpu className="mr-2 h-4 w-4" />Systems ({systems.length})
          </TabsTrigger>
          <TabsTrigger value="tenants">
            <Users className="mr-2 h-4 w-4" />Tenants ({tenants.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowMaintForm(true)}>
              <Plus className="mr-2 h-4 w-4" />Add Request
            </Button>
          </div>
          {maintenance.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground">No maintenance requests yet</CardContent></Card>
          ) : (
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenance.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="font-medium">{m.title}</TableCell>
                        <TableCell>
                          <Badge variant={
                            m.priority === "critical" ? "destructive" :
                            m.priority === "high" ? "destructive" : "secondary"
                          }>{m.priority}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={m.status === "open" ? "default" : "outline"}>{m.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={async () => {
                            await deleteMaintenance(m.id);
                            fetchAll();
                          }}>
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
        </TabsContent>

        <TabsContent value="systems" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowSystemForm(true)}>
              <Plus className="mr-2 h-4 w-4" />Add System
            </Button>
          </div>
          {systems.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground">No systems registered</CardContent></Card>
          ) : (
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>System</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {systems.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.system_name}</TableCell>
                        <TableCell><Badge variant="outline">{s.system_type}</Badge></TableCell>
                        <TableCell>
                          <Badge variant={
                            s.status === "operational" ? "default" :
                            s.status === "needs_service" ? "secondary" : "destructive"
                          }>{s.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={async () => {
                            await deleteSystem(s.id);
                            fetchAll();
                          }}>
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
        </TabsContent>

        <TabsContent value="tenants" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowTenantForm(true)}>
              <Plus className="mr-2 h-4 w-4" />Add Tenant
            </Button>
          </div>
          {tenants.length === 0 ? (
            <Card><CardContent className="py-8 text-center text-muted-foreground">No tenants registered</CardContent></Card>
          ) : (
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Lease</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tenants.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.name}</TableCell>
                        <TableCell>{t.unit_number || "—"}</TableCell>
                        <TableCell className="text-sm">{t.contact_email || "—"}</TableCell>
                        <TableCell className="text-sm">
                          {t.lease_start && t.lease_end
                            ? `${t.lease_start} → ${t.lease_end}`
                            : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={async () => {
                            await deleteTenant(t.id);
                            fetchAll();
                          }}>
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
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={editMode} onOpenChange={setEditMode}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit Building</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={editForm.name ?? building.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input value={editForm.address ?? building.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Occupancy (%)</Label>
                <Input type="number" value={editForm.occupancy_rate ?? building.occupancy_rate ?? ""}
                  onChange={(e) => setEditForm({ ...editForm, occupancy_rate: parseFloat(e.target.value) || null })} />
              </div>
              <div className="space-y-2">
                <Label>Satisfaction (%)</Label>
                <Input type="number" value={editForm.tenant_satisfaction ?? building.tenant_satisfaction ?? ""}
                  onChange={(e) => setEditForm({ ...editForm, tenant_satisfaction: parseFloat(e.target.value) || null })} />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Maintenance Dialog */}
      <Dialog open={showMaintForm} onOpenChange={setShowMaintForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>Log Maintenance Request</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={maintForm.title} onChange={(e) => setMaintForm({ ...maintForm, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description *</Label>
              <Input value={maintForm.description} onChange={(e) => setMaintForm({ ...maintForm, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={maintForm.priority} onChange={(e) => setMaintForm({ ...maintForm, priority: e.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowMaintForm(false)}>Cancel</Button>
            <Button onClick={handleAddMaint}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add System Dialog */}
      <Dialog open={showSystemForm} onOpenChange={setShowSystemForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Building System</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>System Name *</Label>
              <Input value={systemForm.system_name} onChange={(e) => setSystemForm({ ...systemForm, system_name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={systemForm.system_type} onChange={(e) => setSystemForm({ ...systemForm, system_type: e.target.value })}>
                <option value="hvac">HVAC</option>
                <option value="elevator">Elevator</option>
                <option value="fire_safety">Fire Safety</option>
                <option value="lighting">Lighting</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="security">Security</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={systemForm.status} onChange={(e) => setSystemForm({ ...systemForm, status: e.target.value })}>
                <option value="operational">Operational</option>
                <option value="needs_service">Needs Service</option>
                <option value="offline">Offline</option>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowSystemForm(false)}>Cancel</Button>
            <Button onClick={handleAddSystem}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Tenant Dialog */}
      <Dialog open={showTenantForm} onOpenChange={setShowTenantForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Tenant</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={tenantForm.name} onChange={(e) => setTenantForm({ ...tenantForm, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={tenantForm.contact_email ?? ""} onChange={(e) => setTenantForm({ ...tenantForm, contact_email: e.target.value || null })} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={tenantForm.contact_phone ?? ""} onChange={(e) => setTenantForm({ ...tenantForm, contact_phone: e.target.value || null })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Unit Number</Label>
              <Input value={tenantForm.unit_number ?? ""} onChange={(e) => setTenantForm({ ...tenantForm, unit_number: e.target.value || null })} />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowTenantForm(false)}>Cancel</Button>
            <Button onClick={handleAddTenant}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
