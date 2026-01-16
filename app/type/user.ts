import { UserRole } from "./enum";

export interface User {
  id: string;
  name: string;
  role: UserRole | string;
  username: string;
}
