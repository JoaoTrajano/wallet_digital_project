import { Inject } from '@nestjs/common';

import { UseCase } from '@/shared/application/use-cases/use-case.interface';
import { TransactionEntity } from '@/transactions/domain/entities/transaction.entity';
import { TransactionRepository } from '@/transactions/domain/repositories/transacation.repository';

type FetchAllTransactionsUseCaseInput = {
  page?: number;
  perPage?: number;
};

type FetchAllTransactionsUseCaseOutput = {
  data: TransactionEntity[];
  total: number;
};

export class FetchAllTransactionsUseCase
  implements
    UseCase<FetchAllTransactionsUseCaseInput, FetchAllTransactionsUseCaseOutput>
{
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(
    input: FetchAllTransactionsUseCaseInput,
  ): Promise<FetchAllTransactionsUseCaseOutput> {
    const output = await this.transactionRepository.fetch(
      input.page,
      input.perPage,
    );

    return output;
  }
}
