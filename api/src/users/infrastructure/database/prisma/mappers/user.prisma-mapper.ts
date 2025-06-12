import { Prisma, User as PrismaClientUser } from '@prisma/client';

import { UserEntity } from '@/users/domain/entities/user.entity';
import { Password } from '@/users/value-objects/password.value-object';

export class UserPrismaMapper {
  static toDomain(entity: PrismaClientUser): UserEntity {
    const userEntity = new UserEntity(entity.name, entity.email);

    userEntity.id = entity.id;
    userEntity.balance = entity.balance;
    userEntity.password = new Password(entity.password);
    userEntity.createdAt = entity.createdAt;
    userEntity.updatedAt = entity.updatedAt;

    return userEntity;
  }

  static toPersistence(entity: UserEntity): Prisma.UserUncheckedCreateInput {
    return {
      name: entity.name,
      balance: entity.balance,
      email: entity.email,
      password: entity.password.value,
    };
  }
}
