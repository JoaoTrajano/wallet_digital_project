import { beforeEach, describe, expect, it } from 'vitest';

import { BillInMemoryRepository } from '@/bills/infrastructure/database/in-memory/repositories/bill-in-memory-repository';
import { UserEntity } from '@/users/domain/entities/user.entity';

import { CreateBillUseCase } from '../../create-bill.usecase';

describe('CreateBillUseCase', () => {
  let user: UserEntity;
  let sut: CreateBillUseCase;
  let repo: BillInMemoryRepository;

  beforeEach(() => {
    user = new UserEntity('Jhon Doe', 'example@gmail.com');
    repo = new BillInMemoryRepository();
    sut = new CreateBillUseCase(repo);
  });
  it('should create a bill', async () => {
    const bill = await sut.execute({ user, name: 'Test Bill', amount: 100 });
    expect(bill).toBeDefined();
    expect(bill.user).toEqual(user);
    expect(bill.name).toBe('Test Bill');
    expect(bill.amount).toBe(100);
  });
});
