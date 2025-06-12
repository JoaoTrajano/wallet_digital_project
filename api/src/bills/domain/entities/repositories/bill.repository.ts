import { Repository } from '@/shared/infrastructure/database/repository.inteface';

import { BillEntity } from '../bill.entity';

export abstract class BillRepository implements Repository<BillEntity> {
  abstract create(bill: BillEntity): Promise<BillEntity>;
  abstract update(bill: BillEntity): Promise<BillEntity | null>;
  abstract delete(id: string): Promise<void>;
  abstract fetchAll(): Promise<BillEntity[]>;
  abstract fetchById(id: string): Promise<BillEntity | null>;
  abstract fetchByUserId(userId: string): Promise<BillEntity[]>;
}
