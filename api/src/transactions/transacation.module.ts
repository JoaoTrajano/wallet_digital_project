import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BillRepository } from '@/bills/domain/entities/repositories/bill.repository';
import { BillPrismaRepository } from '@/bills/infrastructure/database/prisma/repositories/bill-prisma-repository';
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';
import { EnvService } from '@/shared/infrastructure/env/env.service';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserPrismaRepository } from '@/users/infrastructure/database/prisma/repositories/user-prisma-repository';

import { CreateNewTransactionUseCase } from './application/use-cases/create-new-transacation.usecase';
import { FetchAllTransactionsUseCase } from './application/use-cases/fetch-all-transacations.usecase';
import { RevertTransactionUseCase } from './application/use-cases/revert-transacation.usecase';
import { TransactionRepository } from './domain/repositories/transacation.repository';
import { TransactionPrismaRepository } from './infrastructure/database/prisma/repositories/transacation-prisma-repository';
import { TransactionsController } from './presentation/controllers/transacation.controller';

@Module({
  controllers: [TransactionsController],
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
      provide: 'BillRepository',
      useFactory: (prismaService: PrismaService) => {
        return new BillPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'TransactionRepository',
      useFactory: (prismaService: PrismaService) => {
        return new TransactionPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'CreateTransactionUseCase',
      useFactory: (
        billRepository: BillRepository,
        transactionRepository: TransactionRepository,
        userRepository: UserRepository,
      ) => {
        return new CreateNewTransactionUseCase(
          billRepository,
          transactionRepository,
          userRepository,
        );
      },
      inject: ['BillRepository', 'TransactionRepository', 'UserRepository'],
    },
    {
      provide: 'FetchAllTransactionsUseCase',
      useFactory: (transactionRepository: TransactionRepository) => {
        return new FetchAllTransactionsUseCase(transactionRepository);
      },
      inject: ['TransactionRepository'],
    },
    {
      provide: 'RevertTransactionUseCase',
      useFactory: (
        billRepository: BillRepository,
        transactionRepository: TransactionRepository,
        userRepository: UserRepository,
      ) => {
        return new RevertTransactionUseCase(
          billRepository,
          transactionRepository,
          userRepository,
        );
      },
      inject: ['BillRepository', 'TransactionRepository', 'UserRepository'],
    },
  ],
})
export class TransactionsModule {}
