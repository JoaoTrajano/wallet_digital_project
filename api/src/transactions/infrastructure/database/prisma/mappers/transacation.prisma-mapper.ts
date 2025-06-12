import { Prisma, Transaction as PrismaClientTransaction } from '@prisma/client';

import { BillPrismaMapper } from '@/bills/infrastructure/database/prisma/mappers/bill.prisma-mapper';
import {
  TransactionEntity,
  TransactionType,
} from '@/transactions/domain/entities/transaction.entity';

export class TransactionPrismaMapper {
  static toDomain(schema: PrismaClientTransaction): TransactionEntity {
    const billSchema = (
      schema as Prisma.TransactionGetPayload<{ include: { bill: true } }>
    ).bill;
    const billEntity = BillPrismaMapper.toDomain(billSchema);

    const transactionEntity = new TransactionEntity(
      billEntity,
      schema.value,
      schema.description,
    );

    transactionEntity.id = schema.id;
    transactionEntity.reversed = schema.reversed;
    transactionEntity.type = schema.type as TransactionType;
    transactionEntity.createdAt = schema.createdAt;
    transactionEntity.updatedAt = schema.updatedAt;

    return transactionEntity;
  }

  static toPersistence(
    entity: TransactionEntity,
  ): Prisma.TransactionUncheckedCreateInput {
    return {
      id: entity.id,
      billId: entity.bill.id,
      value: entity.value,
      type: entity.type as TransactionType,
      reversed: entity.reversed,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
