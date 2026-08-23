import bcrypt from "bcrypt";
import type { CreateUserInput, User } from "../models/users.model.js";
import type { UserRepository } from "../repository/user.repository.js";
import { UserRole } from "../enums/user.enum.js";

export class UserService {
  constructor(private repository: UserRepository) {}

  async create(user: CreateUserInput) {
    const existing = await this.repository.findByEmailOrUsername(user.email);
    
    if (existing)
      throw { status: 409, message: "Email ou nome já cadastrado." };

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = {
      id: crypto.randomUUID(),
      ...user,
      password: hashedPassword,
      role: UserRole.READER,
    };

    return await this.repository.create(newUser);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(userId: string) {
    return await this.repository.findOne(userId);
  }

  async findByEmailOrUsername(identifier: string) {
    return await this.repository.findByEmailOrUsername(identifier);
  }

  async update(userId: string, data: Partial<User>) {
    const { role, id, ...safeData } = data;
    if (safeData.password) {
      safeData.password = await bcrypt.hash(safeData.password, 10);
    }
    const exists = await this.repository.findOne(userId);
    if (!exists) throw { status: 404, message: "Usuário não encontrado." };
    return await this.repository.update(userId, safeData);
  }

  async delete(userId: string) {
    const exists = await this.repository.findOne(userId);
    if (!exists) throw { status: 404, message: "Usuário não encontrado." };
    return await this.repository.delete(userId);
  }
}
