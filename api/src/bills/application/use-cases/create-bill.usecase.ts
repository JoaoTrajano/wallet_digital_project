import { BillEntity } from '@/bills/domain/entities/bill.entity';
import { BillRepository } from '@/bills/domain/entities/repositories/bill.repository';
import { UseCase } from '@/shared/application/use-cases/use-case.interface';
import { UserEntity } from '@/users/domain/entities/user.entity';

type CreateUseCaseBillInput = {
  user: UserEntity;
  name: string;
  amount: number;
};

type CreateUseCaseBillOutput = BillEntity;

export class CreateBillUseCase
  implements UseCase<CreateUseCaseBillInput, CreateUseCaseBillOutput>
{
  constructor(private readonly billRepository: BillRepository) {}

  async execute(
    input: CreateUseCaseBillInput,
  ): Promise<CreateUseCaseBillOutput> {
    const { user, name, amount } = input;

    const bill = new BillEntity(user, name, amount);

    return this.billRepository.create(bill);
  }
}
