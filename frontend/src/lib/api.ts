export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export type AccountPlan = 'FREE' | 'PRO';

export interface Account {
  id: string;
  clerkId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  plan: AccountPlan;
  resumeCount: number;
}

export interface ResumeRecord {
  id: string;
  title: string;
  template: string;
  updatedAt: string;
  data: unknown;
  status?: 'ACTIVE' | 'ARCHIVED';
}

export async function getAuthHeaders(getToken: () => Promise<string | null>, clerkUserId?: string | null) {
  const token = await getToken();

  if (!token && !clerkUserId) {
    throw new Error('No session token available');
  }

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(clerkUserId ? { 'x-clerk-user-id': clerkUserId } : {}),
  };
}
