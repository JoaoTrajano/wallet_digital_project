import * as bcrypt from 'bcrypt';

import { StringCrypter } from '..';

export class BcryptCrypterAdapter implements StringCrypter {
  private readonly DEFAULT_SALT = 10;

  public encrypt(value: string): string {
    return bcrypt.hashSync(value, this.DEFAULT_SALT);
  }

  public compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash);
  }
}
