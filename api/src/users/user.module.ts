import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';
import { EnvService } from '@/shared/infrastructure/env/env.service';

import { RegisterUserUseCase } from './application/use-cases';
import { AccountUseCase } from './application/use-cases/account.usecase';
import { ListUsersToTransferUseCase } from './application/use-cases/list-users-to-transfer';
import { UserRepository } from './domain/repositories/user.repository';
import { BcryptCrypterAdapter } from './infrastructure/crypter/adapters/crypter';
import { UserPrismaRepository } from './infrastructure/database/prisma/repositories/user-prisma-repository';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    JwtService,
    EnvService,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'BcryptCrypterAdapter',
      useFactory: () => {
        return new BcryptCrypterAdapter();
      },
    },
    {
      provide: 'RegisterUserUseCase',
      useFactory: (
        userRepository: UserRepository,
        crypter: BcryptCrypterAdapter,
      ) => {
        return new RegisterUserUseCase(crypter, userRepository);
      },
      inject: ['UserRepository', 'BcryptCrypterAdapter'],
    },
    {
      provide: 'AccountUseCase',
      useFactory: (userRepository: UserRepository) => {
        return new AccountUseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: 'ListUsersToTransferUseCase',
      useFactory: (userRepository: UserRepository) => {
        return new ListUsersToTransferUseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UsersModule {}
