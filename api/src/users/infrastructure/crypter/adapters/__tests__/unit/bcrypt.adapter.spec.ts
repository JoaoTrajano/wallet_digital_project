import { beforeAll, describe, expect, it } from 'vitest';

import { BcryptCrypterAdapter } from '../../crypter';

describe('BcryptCrypterAdapter', () => {
  let bcryptCrypter: BcryptCrypterAdapter;

  beforeAll(() => {
    bcryptCrypter = new BcryptCrypterAdapter();
  });

  describe('encrypt', () => {
    it('should create non empty hash string', async () => {
      const value = 'Plain text';
      const result = bcryptCrypter.encrypt(value);
      expect(result).toBeTruthy();
    });
  });

  describe('compare', () => {
    it('should return true for matching plaintext and hash', async () => {
      const value = 'Plain text';
      const hash = bcryptCrypter.encrypt(value);
      const match = bcryptCrypter.compare(value, hash);
      expect(match).toBe(true);
    });

    it('should return false for non-matching plaintext and hash', async () => {
      const value1 = 'Plain text';
      const value2 = 'Another text';
      const hash = bcryptCrypter.encrypt(value1);
      const match = bcryptCrypter.compare(value2, hash);
      expect(match).toBe(false);
    });
  });
});
