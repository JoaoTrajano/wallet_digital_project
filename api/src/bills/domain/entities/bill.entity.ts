import { Entity } from '@/shared/domain/entity';
import { TransactionEntity } from '@/transactions/domain/entities/transaction.entity';
import { UserEntity } from '@/users/domain/entities/user.entity';

export class BillEntity extends Entity {
  public user: UserEntity;
  public transactions: TransactionEntity[];
  public name: string;
  public amount: number;

  constructor(user: UserEntity, name: string, amount: number) {
    super();
    this.name = name;
    this.amount = amount;
    this.user = user;
    this.transactions = [];
  }

  public hasTransactions(): boolean {
    return this.transactions.length > 0;
  }
}
