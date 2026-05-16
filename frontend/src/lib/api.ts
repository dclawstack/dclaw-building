const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });
  if (!response.ok) {
    const error = await response.text();
    throw new ApiError(`API error ${response.status}: ${error}`, response.status);
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}

// Health
export async function getHealth() {
  return fetchJson<{ status: string }>("/health/");
}

// Dashboard
export interface DashboardData {
  total_buildings: number;
  avg_occupancy: number;
  avg_satisfaction: number;
  open_maintenance: number;
  needs_attention: number;
  recent_buildings: Array<{
    id: string;
    name: string;
    status: string;
    occupancy_rate: number | null;
    created_at: string | null;
  }>;
}

export async function getDashboard(): Promise<DashboardData> {
  return fetchJson<DashboardData>("/api/v1/dashboard/");
}

// Buildings
export interface Building {
  id: string;
  name: string;
  address: string;
  building_type: string;
  total_floors: number;
  year_built: number | null;
  status: string;
  notes: string | null;
  occupancy_rate: number | null;
  hvac_efficiency: string | null;
  tenant_satisfaction: number | null;
  maintenance_backlog_count: number;
  created_at: string;
  updated_at: string;
}

export interface BuildingCreate {
  name: string;
  address: string;
  building_type?: string;
  total_floors?: number;
  year_built?: number | null;
  status?: string;
  notes?: string | null;
  occupancy_rate?: number | null;
  hvac_efficiency?: string | null;
  tenant_satisfaction?: number | null;
  maintenance_backlog_count?: number;
}

export interface BuildingUpdate {
  name?: string;
  address?: string;
  building_type?: string;
  total_floors?: number;
  year_built?: number | null;
  status?: string;
  notes?: string | null;
  occupancy_rate?: number | null;
  hvac_efficiency?: string | null;
  tenant_satisfaction?: number | null;
  maintenance_backlog_count?: number;
}

export async function listBuildings(limit = 20, offset = 0): Promise<Building[]> {
  return fetchJson<Building[]>(`/api/v1/buildings/?limit=${limit}&offset=${offset}`);
}

export async function getBuilding(id: string): Promise<Building> {
  return fetchJson<Building>(`/api/v1/buildings/${id}`);
}

export async function createBuilding(data: BuildingCreate): Promise<Building> {
  return fetchJson<Building>("/api/v1/buildings/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBuilding(id: string, data: BuildingUpdate): Promise<Building> {
  return fetchJson<Building>(`/api/v1/buildings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBuilding(id: string): Promise<void> {
  return fetchJson<void>(`/api/v1/buildings/${id}`, { method: "DELETE" });
}

// Maintenance
export interface MaintenanceRequest {
  id: string;
  building_id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  assigned_to: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceCreate {
  building_id: string;
  title: string;
  description: string;
  priority?: string;
  status?: string;
  assigned_to?: string | null;
}

export interface MaintenanceUpdate {
  building_id?: string;
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  assigned_to?: string | null;
  resolved_at?: string | null;
}

export async function listMaintenance(params?: {
  building_id?: string;
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<MaintenanceRequest[]> {
  const searchParams = new URLSearchParams();
  if (params?.building_id) searchParams.set("building_id", params.building_id);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.offset) searchParams.set("offset", String(params.offset));
  return fetchJson<MaintenanceRequest[]>(`/api/v1/maintenance/?${searchParams.toString()}`);
}

export async function getMaintenance(id: string): Promise<MaintenanceRequest> {
  return fetchJson<MaintenanceRequest>(`/api/v1/maintenance/${id}`);
}

export async function createMaintenance(data: MaintenanceCreate): Promise<MaintenanceRequest> {
  return fetchJson<MaintenanceRequest>("/api/v1/maintenance/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateMaintenance(id: string, data: MaintenanceUpdate): Promise<MaintenanceRequest> {
  return fetchJson<MaintenanceRequest>(`/api/v1/maintenance/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteMaintenance(id: string): Promise<void> {
  return fetchJson<void>(`/api/v1/maintenance/${id}`, { method: "DELETE" });
}

// Systems
export interface BuildingSystem {
  id: string;
  building_id: string;
  system_name: string;
  system_type: string;
  status: string;
  last_inspected: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SystemCreate {
  building_id: string;
  system_name: string;
  system_type?: string;
  status?: string;
  last_inspected?: string | null;
  notes?: string | null;
}

export interface SystemUpdate {
  building_id?: string;
  system_name?: string;
  system_type?: string;
  status?: string;
  last_inspected?: string | null;
  notes?: string | null;
}

export async function listSystems(params?: {
  building_id?: string;
  limit?: number;
  offset?: number;
}): Promise<BuildingSystem[]> {
  const searchParams = new URLSearchParams();
  if (params?.building_id) searchParams.set("building_id", params.building_id);
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.offset) searchParams.set("offset", String(params.offset));
  return fetchJson<BuildingSystem[]>(`/api/v1/systems/?${searchParams.toString()}`);
}

export async function getSystem(id: string): Promise<BuildingSystem> {
  return fetchJson<BuildingSystem>(`/api/v1/systems/${id}`);
}

export async function createSystem(data: SystemCreate): Promise<BuildingSystem> {
  return fetchJson<BuildingSystem>("/api/v1/systems/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateSystem(id: string, data: SystemUpdate): Promise<BuildingSystem> {
  return fetchJson<BuildingSystem>(`/api/v1/systems/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteSystem(id: string): Promise<void> {
  return fetchJson<void>(`/api/v1/systems/${id}`, { method: "DELETE" });
}

// Tenants
export interface Tenant {
  id: string;
  building_id: string;
  name: string;
  contact_email: string | null;
  contact_phone: string | null;
  unit_number: string | null;
  lease_start: string | null;
  lease_end: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface TenantCreate {
  building_id: string;
  name: string;
  contact_email?: string | null;
  contact_phone?: string | null;
  unit_number?: string | null;
  lease_start?: string | null;
  lease_end?: string | null;
  notes?: string | null;
}

export interface TenantUpdate {
  building_id?: string;
  name?: string;
  contact_email?: string | null;
  contact_phone?: string | null;
  unit_number?: string | null;
  lease_start?: string | null;
  lease_end?: string | null;
  notes?: string | null;
}

export async function listTenants(params?: {
  building_id?: string;
  limit?: number;
  offset?: number;
}): Promise<Tenant[]> {
  const searchParams = new URLSearchParams();
  if (params?.building_id) searchParams.set("building_id", params.building_id);
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.offset) searchParams.set("offset", String(params.offset));
  return fetchJson<Tenant[]>(`/api/v1/tenants/?${searchParams.toString()}`);
}

export async function getTenant(id: string): Promise<Tenant> {
  return fetchJson<Tenant>(`/api/v1/tenants/${id}`);
}

export async function createTenant(data: TenantCreate): Promise<Tenant> {
  return fetchJson<Tenant>("/api/v1/tenants/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTenant(id: string, data: TenantUpdate): Promise<Tenant> {
  return fetchJson<Tenant>(`/api/v1/tenants/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteTenant(id: string): Promise<void> {
  return fetchJson<void>(`/api/v1/tenants/${id}`, { method: "DELETE" });
}

export { ApiError };
