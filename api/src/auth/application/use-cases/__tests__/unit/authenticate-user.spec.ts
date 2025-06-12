import { JwtService } from '@nestjs/jwt';
import { describe, expect, it } from 'vitest';

import { UserEntity } from '@/users/domain/entities/user.entity';
import { BcryptCrypterAdapter } from '@/users/infrastructure/crypter/adapters/crypter';
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory-repository';
import { Password } from '@/users/value-objects/password.value-object';

import { AuthenticateUserUseCase } from '../../authenticate-user.usecase';

describe('AuthenticateUserUseCase', () => {
  it('should be able to authenticate a user', async () => {
    const userRepository = new UserInMemoryRepository();
    const bcrypt = new BcryptCrypterAdapter();
    const jwtService = new JwtService({
      secret: 'test_secret',
      signOptions: { expiresIn: '1h' },
    });

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepository,
      bcrypt,
      jwtService,
    );

    const user = new UserEntity('Jhon Doe', 'john.doe@example.com');
    user.password.encryptNewPassword(bcrypt, new Password('123456'));
    await userRepository.create(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: '123456',
    });

    expect(result).toHaveProperty('access_token');
    expect(result.user).toBeInstanceOf(UserEntity);
    expect(result.user.id).toBe(user.id);
    expect(result.user.email).toBe(user.email);
    expect(result.user.name).toBe(user.name);
  });
});
