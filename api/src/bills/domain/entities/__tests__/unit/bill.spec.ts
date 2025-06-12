import { beforeEach, describe, expect, it } from 'vitest';

import { UserEntity } from '@/users/domain/entities/user.entity';

import { BillEntity } from '../../bill.entity';

describe('Bill Entity', () => {
  let sut: UserEntity;

  beforeEach(() => {
    sut = new UserEntity('John Doe', 'jhondoe@example.com');
  });

  it('should create a bill with user and amount', () => {
    const amount = 100;

    const bill = new BillEntity(sut, 'Test Bill', amount);

    expect(bill.user).toEqual(sut);
    expect(bill.amount).toBe(amount);
  });
});
