import { Repository } from '@/shared/infrastructure/database/repository.inteface';

import { TransactionEntity } from '../entities/transaction.entity';

export abstract class TransactionRepository
  implements Omit<Repository<TransactionEntity>, 'delete'>
{
  abstract create(transaction: TransactionEntity): Promise<TransactionEntity>;
  abstract update(
    transaction: TransactionEntity,
  ): Promise<TransactionEntity | null>;
  abstract fetchAll(): Promise<TransactionEntity[]>;
  abstract fetchById(id: string): Promise<TransactionEntity | null>;
  abstract fetch(
    page?: number,
    perPage?: number,
  ): Promise<{ data: TransactionEntity[]; total: number }>;
}
