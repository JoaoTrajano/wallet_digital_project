import { describe, expect, it } from 'vitest';

import { BillEntity } from '@/bills/domain/entities/bill.entity';
import { UserEntity } from '@/users/domain/entities/user.entity';

import {
  TransactionEntity,
  TransactionType,
} from '../../entities/transaction.entity';

describe('Transaction Entity', () => {
  it('should be able to create a transaction', () => {
    const transaction = new TransactionEntity(
      new BillEntity(
        new UserEntity('User 1', 'user1@example.com'),
        'Bill 1',
        100,
      ),
      50,
      'Payment for services',
    );

    expect(transaction.bill).toBeInstanceOf(BillEntity);
    expect(transaction.value).toBe(50);
    expect(transaction.type).toBe(TransactionType.TRANSFER);
    expect(transaction.description).toBe('Payment for services');
  });
  it('should be able to increment transaction value', () => {
    const transaction = new TransactionEntity(
      new BillEntity(
        new UserEntity('User 1', 'user1@example.com'),
        'Bill 1',
        100,
      ),
      50,
      'Payment for services',
    );

    expect(transaction.bill).toBeInstanceOf(BillEntity);
    expect(transaction.value).toBe(50);
    expect(transaction.type).toBe(TransactionType.TRANSFER);
    expect(transaction.description).toBe('Payment for services');
  });
  it('should return a error if value is negative after increment', () => {
    const transaction = new TransactionEntity(
      new BillEntity(
        new UserEntity('User 1', 'user1@example.com'),
        'Bill 1',
        100,
      ),
      50,
      'Payment for services',
    );

    transaction.initTransaction(TransactionType.DEPOSIT);
    expect(transaction.bill.amount).toBe(150);
  });
  it('should return a error if value is negative after decrement', () => {
    const transaction = new TransactionEntity(
      new BillEntity(
        new UserEntity('User 1', 'user1@example.com'),
        'Bill 1',
        100,
      ),
      50,
      'Payment for services',
    );

    transaction.initTransaction(TransactionType.TRANSFER);

    expect(transaction.bill.amount).toBe(50);
  });
});
