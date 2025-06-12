import { TransactionEntity } from '@/transactions/domain/entities/transaction.entity';
import { TransactionRepository } from '@/transactions/domain/repositories/transacation.repository';

export class TransacationInMemoryRepository extends TransactionRepository {
  public transactions: TransactionEntity[] = [];

  constructor() {
    super();
  }

  async fetch(
    page: number = 1,
    perPage: number = this.transactions.length,
  ): Promise<{ data: TransactionEntity[]; total: number }> {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const data = this.transactions.slice(start, end);
    const total = this.transactions.length;
    return { data, total };
  }

  async create(transacation: TransactionEntity): Promise<TransactionEntity> {
    this.transactions.push(transacation);
    return transacation;
  }

  async update(
    transacation: TransactionEntity,
  ): Promise<TransactionEntity | null> {
    const index = this.transactions.findIndex((u) => u.id === transacation.id);
    if (index === -1) return null;

    this.transactions[index] = transacation;
    return transacation;
  }

  async fetchAll(): Promise<TransactionEntity[]> {
    return this.transactions;
  }

  async fetchById(id: string): Promise<TransactionEntity | null> {
    const transaction = this.transactions.find(
      (transaction) => transaction.id === id,
    );
    return transaction ? transaction : null;
  }
}
