import { Repository } from '@/shared/infrastructure/database/repository.inteface';

import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository implements Repository<UserEntity> {
  abstract create(user: UserEntity): Promise<UserEntity>;
  abstract update(user: UserEntity): Promise<UserEntity>;
  abstract delete(id: string): Promise<void>;
  abstract fetch(title?: string, description?: string): Promise<UserEntity[]>;
  abstract fetchAll(): Promise<UserEntity[]>;
  abstract fetchById(id: string): Promise<UserEntity | null>;
  abstract fetchByEmail(email: string): Promise<UserEntity | null>;
  abstract listUsersToTransfer(senderUserId: string): Promise<UserEntity[]>;
}
