import { UseCase } from '@/shared/application/use-cases/use-case.interface';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

type AccountUseCaseInput = {
  user: UserEntity;
};

type AccountUseCaseOutput = {
  user: UserEntity;
};

export class AccountUseCase
  implements UseCase<AccountUseCaseInput, AccountUseCaseOutput>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: AccountUseCaseInput): Promise<AccountUseCaseOutput> {
    const user = await this.userRepository.fetchById(input.user.id);
    return { user };
  }
}
