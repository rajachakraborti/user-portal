import { UserProfile, UpdateUserRequest } from '../types/user';

/**
 * API client interfacing with backend user-service.
 * Enforces ADR-TS-002: Outgoing requests must propagate X-Tenant-ID header.
 */
export class UserApiClient {
  private readonly baseUrl: string;
  private readonly tenantId: string;

  constructor(tenantId: string, baseUrl: string = 'http://localhost:8080/api/v1') {
    if (!tenantId || tenantId.trim() === '') {
      throw new Error('Contract Violation [ADR-TS-002]: tenantId must not be empty.');
    }
    this.tenantId = tenantId.trim();
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'X-Tenant-ID': this.tenantId,
    };
  }

  async getProfile(userId: string): Promise<UserProfile> {
    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

    return response.json();
  }

  async updateProfile(userId: string, payload: UpdateUserRequest): Promise<UserProfile> {
    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    return response.json();
  }
}
