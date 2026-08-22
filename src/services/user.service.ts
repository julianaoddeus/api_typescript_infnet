import type { User } from "../models/users.model.js";
import type { UserRepository } from "../repository/user.repository.js";

export class UserService {
  constructor(private repository: UserRepository) {}

  async create(user: User) {
    return await this.repository.create(user);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(userId: string) {
    return await this.repository.findOne(userId);
  }

  async update(userId: string, data: Partial<User>) {
    return await this.repository.update(userId, data);
  }

  async delete(userId: string) {
    return await this.repository.delete(userId);
  }
}
