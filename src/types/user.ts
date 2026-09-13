export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'ENGINEER' | 'VIEWER';
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
}

export interface TenantContext {
  tenantId: string;
  tenantName: string;
}
