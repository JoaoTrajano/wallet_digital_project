import { Entity } from '@/shared/domain/entity';

export interface Repository<E = Entity> {
  create(task: E): Promise<E>;
  update(task: E): Promise<E>;
  delete(id: string): Promise<void>;
  fetchAll(): Promise<E[]>;
  fetchById(id: string): Promise<E | null>;
}
