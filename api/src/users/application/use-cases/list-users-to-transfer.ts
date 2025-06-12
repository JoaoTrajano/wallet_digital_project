import { UseCase } from '@/shared/application/use-cases/use-case.interface';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

export type ListUsersToTransferInput = {
  user: UserEntity;
};

export type ListUsersToTransferOutput = {
  users: UserEntity[];
};

export class ListUsersToTransferUseCase
  implements UseCase<ListUsersToTransferInput, ListUsersToTransferOutput>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    input: ListUsersToTransferInput,
  ): Promise<ListUsersToTransferOutput> {
    const users = await this.userRepository.listUsersToTransfer(input.user.id);
    return { users };
  }
}
