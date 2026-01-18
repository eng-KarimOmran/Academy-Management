import type { UserRole } from "./enum";

export interface Course {
  id: string;
  academyId: string;
  name: string;
  description: string;
  sessionsCount: number;
  basePrice: number;
  sessionDuration: number;
  discount: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Academy {
  id: string;
  name: string;
  owner: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  username: string;
}
