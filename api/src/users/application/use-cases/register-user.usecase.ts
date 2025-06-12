import { UseCase } from '@/shared/application/use-cases/use-case.interface';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { BcryptCrypterAdapter } from '@/users/infrastructure/crypter/adapters/crypter';

type RegisterUserUseCaseInput = {
  name: string;
  email: string;
  password: string;
};

type RegisterUserUseCaseOutput = {
  user: UserEntity;
};

export class RegisterUserUseCase
  implements UseCase<RegisterUserUseCaseInput, RegisterUserUseCaseOutput>
{
  constructor(
    private readonly crypter: BcryptCrypterAdapter,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    input: RegisterUserUseCaseInput,
  ): Promise<RegisterUserUseCaseOutput> {
    if (!input.name) throw new Error('Name is required');
    if (!input.email) throw new Error('Email is required');
    if (!input.password) throw new Error('Password is required');

    const user = new UserEntity(input.name, input.email);
    user.password.encryptNewPassword(this.crypter, user.password);

    const userCreated = await this.userRepository.create(user);
    return { user: userCreated };
  }
}
