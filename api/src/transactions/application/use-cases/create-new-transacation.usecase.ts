import { Inject } from '@nestjs/common';
import { ValidationError } from 'zod-validation-error';

import { BillRepository } from '@/bills/domain/entities/repositories/bill.repository';
import { UseCase } from '@/shared/application/use-cases/use-case.interface';
import {
  TransactionEntity,
  TransactionType,
} from '@/transactions/domain/entities/transaction.entity';
import { TransactionRepository } from '@/transactions/domain/repositories/transacation.repository';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

type CreateNewTransactionUseCaseInput = {
  user: UserEntity;
  description: string;
  type: TransactionType;
  value: number;
  billId: string;
  destinationId?: string;
};

type CreateNewTransactionUseCaseOutput = {
  transaction: TransactionEntity;
};

export class CreateNewTransactionUseCase
  implements
    UseCase<CreateNewTransactionUseCaseInput, CreateNewTransactionUseCaseOutput>
{
  constructor(
    @Inject('BillRepository')
    private readonly billRepository: BillRepository,
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    input: CreateNewTransactionUseCaseInput,
  ): Promise<CreateNewTransactionUseCaseOutput> {
    if (!input.description) throw new Error('Description is required');
    if (!input.type) throw new Error('Type is required');
    if (!input.value) throw new Error('Value is required');
    if (!input.billId) throw new Error('Bill ID is required');

    const bill = await this.billRepository.fetchById(input.billId);
    if (!bill) throw new Error('Bill not found');

    if (bill.user.id !== input.user.id)
      throw new Error('User does not own this bill');

    if (input.value < 0) throw new Error('Value must be a positive number');

    const transaction = new TransactionEntity(
      bill,
      input.value,
      input.description,
    );

    let transactionCreated: TransactionEntity;

    if (transaction.type === TransactionType.TRANSFER && input.destinationId) {
      const destinationUser = await this.userRepository.fetchById(
        input.destinationId,
      );
      if (!destinationUser)
        throw new ValidationError('Destination user not found');

      const billUpdated = transaction.transfer();
      await this.billRepository.update(billUpdated);

      destinationUser.incrementBalance(transaction.value);
      await this.userRepository.update(destinationUser);

      transactionCreated = await this.transactionRepository.create(transaction);
    } else {
      const { billUpdated, userUpdated } = transaction.deposit(bill.user);
      await this.billRepository.update(billUpdated);
      await this.userRepository.update(userUpdated);

      transactionCreated = await this.transactionRepository.create(transaction);
    }

    return { transaction: transactionCreated };
  }
}
