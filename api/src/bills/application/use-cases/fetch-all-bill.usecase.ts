import { BillEntity } from '@/bills/domain/entities/bill.entity';
import { BillRepository } from '@/bills/domain/entities/repositories/bill.repository';
import { UseCase } from '@/shared/application/use-cases/use-case.interface';

type FetchAllBillsOutput = { walletsDigital: BillEntity[] };

export class FetchAllBillsUseCase
  implements UseCase<unknown, FetchAllBillsOutput>
{
  constructor(private readonly billRepository: BillRepository) {}

  async execute(): Promise<FetchAllBillsOutput> {
    const biils = await this.billRepository.fetchAll();

    return { walletsDigital: biils };
  }
}
