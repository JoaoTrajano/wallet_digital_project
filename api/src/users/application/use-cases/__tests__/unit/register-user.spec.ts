import { beforeAll, describe, expect, it } from 'vitest';

import { BcryptCrypterAdapter } from '@/users/infrastructure/crypter/adapters/crypter';
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory-repository';

import { RegisterUserUseCase } from '../../register-user.usecase';

let sut: RegisterUserUseCase;
let repo: UserInMemoryRepository;
let crypter: BcryptCrypterAdapter;

beforeAll(() => {
  repo = new UserInMemoryRepository();
  crypter = new BcryptCrypterAdapter();
  sut = new RegisterUserUseCase(crypter, repo);
});

describe('RegisterUserUseCase unit test', () => {
  it('should be able register a user', async () => {
    const { user } = await sut.execute({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
  });

  it('should throw an error if the name is empty', async () => {
    await expect(
      sut.execute({
        name: '',
        email: 'test@example.com',
        password: '123456',
      }),
    ).rejects.toThrowError('Name is required');
  });
  it('should throw an error if the email is empty', async () => {
    await expect(
      sut.execute({
        name: 'Test User',
        email: '',
        password: '123456',
      }),
    ).rejects.toThrowError('Email is required');
  });
  it('should throw an error if the password is empty', async () => {
    await expect(
      sut.execute({
        name: 'Test User',
        email: 'test@example.com',
        password: '',
      }),
    ).rejects.toThrowError('Password is required');
  });
});
