import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';
import { TransactionEntity } from '@/transactions/domain/entities/transaction.entity';
import { TransactionRepository } from '@/transactions/domain/repositories/transacation.repository';

import { TransactionPrismaMapper } from '../mappers/transacation.prisma-mapper';

export class TransactionPrismaRepository implements TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async fetch(
    page?: number,
    perPage?: number,
  ): Promise<{ data: TransactionEntity[]; total: number }> {
    const skip = page && perPage ? (page - 1) * perPage : undefined;
    const take = perPage;

    const transactions = await this.prismaService.transaction.findMany({
      skip,
      take,
      include: {
        bill: {
          include: {
            user: true,
          },
        },
      },
    });

    const total = await this.prismaService.transaction.count();
    return {
      data: transactions.map(TransactionPrismaMapper.toDomain),
      total,
    };
  }
  async create(transaction: TransactionEntity): Promise<TransactionEntity> {
    const transactionCreated = await this.prismaService.transaction.create({
      data: TransactionPrismaMapper.toPersistence(transaction),
      include: {
        bill: {
          include: {
            user: true,
          },
        },
      },
    });

    return TransactionPrismaMapper.toDomain(transactionCreated);
  }

  async update(transaction: TransactionEntity): Promise<TransactionEntity> {
    const transactionUpdated = await this.prismaService.transaction.update({
      where: { id: transaction.id },
      data: TransactionPrismaMapper.toPersistence(transaction),
      include: {
        bill: {
          include: {
            user: true,
          },
        },
      },
    });

    return TransactionPrismaMapper.toDomain(transactionUpdated);
  }

  async fetchAll(): Promise<TransactionEntity[]> {
    const transactions = await this.prismaService.transaction.findMany({
      include: {
        bill: {
          include: {
            user: true,
          },
        },
      },
    });
    return transactions.map(TransactionPrismaMapper.toDomain);
  }

  async fetchById(id: string): Promise<TransactionEntity | null> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id },
      include: {
        bill: {
          include: {
            user: true,
          },
        },
      },
    });
    return transaction ? TransactionPrismaMapper.toDomain(transaction) : null;
  }
}
