import fs from "node:fs/promises";
import path from "node:path";
import type { User } from "../models/users.model.js";
import { databasePath } from "../config/database.js";

const filePath = path.join(databasePath, "users.json");

export class UserRepository {
  async findAll(): Promise<User[]> {
    const users = await fs.readFile(filePath, "utf-8");

    return JSON.parse(users);
  }

  async findOne(userId: string): Promise<User> {
    const users = await this.findAll();

    const user = users.find((user: User) => user.id === userId);
    if (!user) throw { status: 404, message: "Usuário não encontrado." };

    return user;
  }

  async findByEmailOrUsername(identifier: string) {
    const users = await this.findAll();

    return users.find(
      (user: User) =>
        user.email === identifier ||
        user.username?.trim().toLowerCase() ===
          identifier?.trim().toLowerCase(),
    );
  }

  async create(user: User): Promise<User> {
    const users = await this.findAll();

    users.push(user);

    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");

    return user;
  }

  async update(userId: string, data: Partial<User>): Promise<User> {
    const users = await this.findAll();

    const index = users.findIndex((user: any) => user.id === userId);

    const user = users[index];
    if (!user) throw { status: 404, message: "Usuário não encontrado." };

    users[index] = {
      ...user,
      ...data,
    };

    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");

    return users[index];
  }

  async delete(userId: string) {
    const users = await this.findAll();

    const filteredUsers = users.filter((user: any) => user.id !== userId);

    await fs.writeFile(
      filePath,
      JSON.stringify(filteredUsers, null, 2),
      "utf-8",
    );
  }
}
