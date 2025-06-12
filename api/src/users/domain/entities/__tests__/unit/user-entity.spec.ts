import { describe, expect, it } from 'vitest';

import { UserEntity } from '../../user.entity';

describe('UserEntity', () => {
  it('should be able to create a user entity', () => {
    const user = new UserEntity('Jhon Doe', 'jhondoe@example.com');
    expect(user).toBeInstanceOf(UserEntity);
  });
});
