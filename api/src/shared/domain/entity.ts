import { randomUUID } from 'node:crypto';

export abstract class Entity {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
