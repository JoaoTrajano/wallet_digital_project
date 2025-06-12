import { Bill as PrismaClientBill, Prisma } from '@prisma/client';

import { BillEntity } from '@/bills/domain/entities/bill.entity';
import { TransactionPrismaMapper } from '@/transactions/infrastructure/database/prisma/mappers/transacation.prisma-mapper';
import { UserPrismaMapper } from '@/users/infrastructure/database/prisma/mappers/user.prisma-mapper';

export class BillPrismaMapper {
  static toDomain(schema: PrismaClientBill): BillEntity {
    const userSchema = (
      schema as Prisma.BillGetPayload<{ include: { user: true } }>
    ).user;
    const userEntity = UserPrismaMapper.toDomain(userSchema);

    const billEntity = new BillEntity(userEntity, schema.name, schema.amount);
    billEntity.id = schema.id;

    const transactionsSchema = (
      schema as Prisma.BillGetPayload<{ include: { transactions: true } }>
    ).transactions;

    if (transactionsSchema) {
      billEntity.transactions = transactionsSchema.map(
        TransactionPrismaMapper.toDomain,
      );
    }

    billEntity.createdAt = schema.createdAt;
    billEntity.updatedAt = schema.updatedAt;

    return billEntity;
  }

  static toPersistence(entity: BillEntity): Prisma.BillUncheckedCreateInput {
    return {
      id: entity.id,
      userId: entity.user.id,
      name: entity.name,
      amount: entity.amount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
