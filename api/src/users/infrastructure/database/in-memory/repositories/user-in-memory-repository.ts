import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

export class UserInMemoryRepository extends UserRepository {
  public users: UserEntity[] = [];

  constructor() {
    super();
  }

  async listUsersToTransfer(senderUserId: string): Promise<UserEntity[]> {
    return this.users.filter((user) => user.id !== senderUserId);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    this.users.push(user);
    return user;
  }

  async update(user: UserEntity): Promise<UserEntity | null> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index === -1) return null;

    this.users[index] = user;
    return user;
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  async fetch(name?: string, email?: string): Promise<UserEntity[]> {
    const users = this.users.filter((user) => {
      if (name && !user.name.includes(name)) return false;
      if (email && !user.email.includes(email)) return false;
      return true;
    });

    return users;
  }

  async fetchAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async fetchById(id: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.id === id);
    return user ? user : null;
  }

  async fetchByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.email === email);
    return user ? user : null;
  }
}
