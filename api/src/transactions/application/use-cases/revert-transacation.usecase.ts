import { Inject } from '@nestjs/common';

import { BillRepository } from '@/bills/domain/entities/repositories/bill.repository';
import { UseCase } from '@/shared/application/use-cases/use-case.interface';
import {
  TransactionEntity,
  TransactionType,
} from '@/transactions/domain/entities/transaction.entity';
import { TransactionRepository } from '@/transactions/domain/repositories/transacation.repository';
import { UserRepository } from '@/users/domain/repositories/user.repository';

type RevertTransactionUseCaseInput = {
  transactionId: string;
};

type RevertTransactionUseCaseOutput = {
  transaction: TransactionEntity;
};

export class RevertTransactionUseCase
  implements
    UseCase<RevertTransactionUseCaseInput, RevertTransactionUseCaseOutput>
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
    input: RevertTransactionUseCaseInput,
  ): Promise<RevertTransactionUseCaseOutput> {
    const transaction = await this.transactionRepository.fetchById(
      input.transactionId,
    );
    if (!transaction) throw new Error('Transação not found');
    if (transaction.reversed) throw new Error('Transação já foi revertida');

    if (transaction.type === TransactionType.TRANSFER) {
      const billUpdated = transaction.rollbackTransfer();
      await this.billRepository.update(billUpdated);
    } else {
      const { billUpdated, userUpdated } = transaction.rollbackDeposit(
        transaction.bill.user,
      );
      await this.billRepository.update(billUpdated);
      await this.userRepository.update(userUpdated);
    }

    const transactioUpdated =
      await this.transactionRepository.update(transaction);

    return { transaction: transactioUpdated };
  }
}
