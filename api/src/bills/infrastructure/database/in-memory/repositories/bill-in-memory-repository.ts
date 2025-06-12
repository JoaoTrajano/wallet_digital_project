import { BillEntity } from '@/bills/domain/entities/bill.entity';
import { BillRepository } from '@/bills/domain/entities/repositories/bill.repository';

export class BillInMemoryRepository extends BillRepository {
  public bills: BillEntity[] = [];

  constructor() {
    super();
  }

  async create(bill: BillEntity): Promise<BillEntity> {
    this.bills.push(bill);
    return bill;
  }

  async update(bill: BillEntity): Promise<BillEntity | null> {
    const index = this.bills.findIndex((u) => u.id === bill.id);
    if (index === -1) return null;

    this.bills[index] = bill;
    return bill;
  }

  async delete(id: string): Promise<void> {
    const index = this.bills.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.bills.splice(index, 1);
    }
  }

  async fetchAll(): Promise<BillEntity[]> {
    return this.bills;
  }

  async fetchById(id: string): Promise<BillEntity | null> {
    const bill = this.bills.find((bill) => bill.id === id);
    return bill ? bill : null;
  }

  fetchByUserId(userId: string): Promise<BillEntity[]> {
    const bills = this.bills.filter((bill) => bill.user.id === userId);
    return Promise.resolve(bills);
  }
}
