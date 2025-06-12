import { NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BillRepository } from '@/bills/domain/entities/repositories/bill.repository';
import { UseCase } from '@/shared/application/use-cases/use-case.interface';

type DeleteBillUseCaseInput = {
  billId: string;
};

export class DeleteBillUseCase
  implements UseCase<DeleteBillUseCaseInput, unknown>
{
  constructor(private readonly billRepository: BillRepository) {}

  async execute(input: DeleteBillUseCaseInput) {
    const bill = await this.billRepository.fetchById(input.billId);
    if (!bill) throw new NotFoundException('Bill not found');

    if (bill.hasTransactions())
      throw new UnauthorizedException(
        'Cannot delete bill because it has associated transactions.',
      );

    await this.billRepository.delete(input.billId);
  }
}
