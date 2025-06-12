import { BillEntity } from '@/bills/domain/entities/bill.entity';
import { Entity } from '@/shared/domain/entity';
import { UserEntity } from '@/users/domain/entities/user.entity';

export enum TransactionType {
  TRANSFER = 'TRANSFER',
  DEPOSIT = 'DEPOSIT',
}
export class TransactionEntity extends Entity {
  public bill: BillEntity;
  public value: number;
  public description: string;
  public type: TransactionType;
  public reversed: boolean;

  constructor(bill: BillEntity, value: number, description: string) {
    super();
    this.bill = bill;
    this.value = value;
    this.description = description;
    this.type = TransactionType.TRANSFER;
    this.reversed = false;
  }

  private incrementValue(value: number): void {
    if (value < 0) throw new Error('Value must be a positive number');
    this.bill.amount += value;
  }

  private decrementValue(value: number): void {
    if (value < 0) throw new Error('Value must be a positive number');
    this.bill.amount -= value;
  }

  public transfer(): BillEntity {
    if (this.bill.amount < this.value) throw new Error('Saldo insuficiente!');
    this.decrementValue(this.value);

    return this.bill;
  }

  public deposit(user: UserEntity): {
    userUpdated: UserEntity;
    billUpdated: BillEntity;
  } {
    if (user.balance < this.value)
      throw new Error('Saldo insuficiente para depositar na carteira!');

    user.decrementBalance(this.value);
    this.incrementValue(this.value);

    this.type = TransactionType.DEPOSIT;

    return {
      billUpdated: this.bill,
      userUpdated: user,
    };
  }

  public rollbackTransfer(): BillEntity {
    this.incrementValue(this.value);
    this.reversed = true;
    return this.bill;
  }

  public rollbackDeposit(user: UserEntity): {
    userUpdated: UserEntity;
    billUpdated: BillEntity;
  } {
    this.decrementValue(this.value);
    user.incrementBalance(this.value);
    this.reversed = true;

    return {
      billUpdated: this.bill,
      userUpdated: user,
    };
  }
}
