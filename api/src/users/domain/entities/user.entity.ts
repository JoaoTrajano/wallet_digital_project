import { Entity } from '@/shared/domain/entity';
import {
  DEFAULT_PASSWORD,
  Password,
} from '@/users/value-objects/password.value-object';

export class UserEntity extends Entity {
  public email: string;
  public name: string;
  public password: Password;
  public balance: number;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = new Password(DEFAULT_PASSWORD);
    this.balance = 0;
  }

  public incrementBalance(value: number): void {
    if (value < 0) throw new Error("Value can't has a negative number");
    this.balance += value;
  }

  public decrementBalance(value: number): void {
    if (value < 0) throw new Error("Value can't has a negative number");
    this.balance -= value;
  }
}
