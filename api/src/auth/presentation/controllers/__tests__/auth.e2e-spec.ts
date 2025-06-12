import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { BcryptCrypterAdapter } from '@/users/infrastructure/crypter/adapters/crypter';
import { Password } from '@/users/value-objects/password.value-object';

describe('AuthTaskController e2e test', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    prismaService = moduleRef.get(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /authentication', () => {
    test('should be able to authenticate a user', async () => {
      const user = new UserEntity('John Doe', 'john.doe@example.com');
      user.password = new Password('123456');
      user.password.encryptNewPassword(
        new BcryptCrypterAdapter(),
        user.password,
      );

      await prismaService.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password.value,
        },
      });

      const res = await request(app.getHttpServer())
        .post('/authentication')
        .send({
          email: user.email,
          password: '123456',
        });

      const hasUser = await prismaService.user.findFirst({
        where: {
          email: user.email,
        },
      });

      expect(res.statusCode).toBe(200);
      expect(hasUser).toBeTruthy();
    });
  });
});
