import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';
import { EnvService } from '@/shared/infrastructure/env/env.service';

import { CreateBillUseCase } from './application/use-cases/create-bill.usecase';
import { DeleteBillUseCase } from './application/use-cases/delete-bill.usecase';
import { FetchAllBillsUseCase } from './application/use-cases/fetch-all-bill.usecase';
import { BillRepository } from './domain/entities/repositories/bill.repository';
import { BillPrismaRepository } from './infrastructure/database/prisma/repositories/bill-prisma-repository';
import { BillsController } from './presentation/controllers/bills.controller';

@Module({
  controllers: [BillsController],
  providers: [
    JwtService,
    EnvService,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'BillRepository',
      useFactory: (prismaService: PrismaService) => {
        return new BillPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'CreateBillUseCase',
      useFactory: (billRepository: BillRepository) => {
        return new CreateBillUseCase(billRepository);
      },
      inject: ['BillRepository'],
    },
    {
      provide: 'FetchAllBillsUseCase',
      useFactory: (billRepository: BillRepository) => {
        return new FetchAllBillsUseCase(billRepository);
      },
      inject: ['BillRepository'],
    },
    {
      provide: 'DeleteBillUseCase',
      useFactory: (billRepository: BillRepository) => {
        return new DeleteBillUseCase(billRepository);
      },
      inject: ['BillRepository'],
    },
  ],
})
export class BillsModule {}
