import fs from "node:fs/promises";
import path from "node:path";
import type { User } from "../models/users.model.js";

const filePath = path.resolve("src/database/users.json");

export class UserRepository {
  async findAll() {
    const data = await fs.readFile(filePath, "utf-8");

    return JSON.parse(data);
  }

  async findOne(userId: string) {
    const users = await this.findAll();

    return users.find((user: User) => user.id === userId);
  }

  async create(user: object) {
    const users = await this.findAll();

    users.push(user);

    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");

    return user;
  }

  async update(userId: string, data: Partial<User>) {
    const users = await this.findAll();

    const index = users.findIndex((user: any) => user.id === userId);

    users[index] = {
      ...users[index],
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
