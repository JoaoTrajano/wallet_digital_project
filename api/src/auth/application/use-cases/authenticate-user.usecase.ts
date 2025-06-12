import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UseCase } from '@/shared/application/use-cases/use-case.interface';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { BcryptCrypterAdapter } from '@/users/infrastructure/crypter/adapters/crypter';

type AuthenticateUserInput = {
  email: string;
  password: string;
};

type AuthenticateUserOutput = {
  user: UserEntity;
  access_token: string;
};

export class AuthenticateUserUseCase
  implements UseCase<AuthenticateUserInput, AuthenticateUserOutput>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypter: BcryptCrypterAdapter,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const user = await this.userRepository.fetchByEmail(input.email);
    if (!user) throw new UnauthorizedException('E-mail or password is invalid');

    const isPasswordValid = this.crypter.compare(
      input.password,
      user.password.value,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('E-mail or password is invalid');

    const access_token = await this.jwtService.signAsync({ user });
    return { user, access_token };
  }
}
