import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

import { UserPrismaMapper } from '../mappers/user.prisma-mapper';

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const userCreated = await this.prismaService.user.create({
      data: UserPrismaMapper.toPersistence(user),
    });

    return UserPrismaMapper.toDomain(userCreated);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const userUpdated = await this.prismaService.user.update({
      where: { id: user.id },
      data: UserPrismaMapper.toPersistence(user),
      include: {
        bills: true,
      },
    });

    return UserPrismaMapper.toDomain(userUpdated);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }

  async fetch(title?: string, description?: string): Promise<UserEntity[]> {
    const where = {};

    if (title)
      Object.assign(where, { title: { contains: title, mode: 'insensitive' } });

    if (description) Object.assign(where, { description });

    const users = await this.prismaService.user.findMany({
      where,
    });

    return users.map(UserPrismaMapper.toDomain);
  }

  async fetchAll(): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany({});
    return users.map(UserPrismaMapper.toDomain);
  }

  async fetchById(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user ? UserPrismaMapper.toDomain(user) : null;
  }

  async fetchByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    return user ? UserPrismaMapper.toDomain(user) : null;
  }

  async listUsersToTransfer(senderUserId: string): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany({
      where: {
        id: { not: senderUserId },
      },
    });
    return users.map(UserPrismaMapper.toDomain);
  }
}
