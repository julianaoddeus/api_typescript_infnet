import type { UserRole } from "../enums/user.enum.js";

export class User {
  id?: string;
  username!: string;
  email!: string;
  password!: string;
  role!: UserRole;
}

export type CreateUserInput = Omit<User, "id" | "role">;
