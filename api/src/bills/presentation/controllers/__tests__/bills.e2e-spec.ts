import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { BcryptCrypterAdapter } from '@/users/infrastructure/crypter/adapters/crypter';
import { Password } from '@/users/value-objects/password.value-object';

describe('Bills E2E Tests', () => {
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

  describe('POST /bills', () => {
    let responseAuth: request.Response;
    let userEntity: UserEntity;

    beforeAll(async () => {
      userEntity = new UserEntity('John Doe', 'john.doe@example.com');
      userEntity.password = new Password('123456');
      userEntity.password.encryptNewPassword(
        new BcryptCrypterAdapter(),
        userEntity.password,
      );

      await prismaService.user.create({
        data: {
          name: userEntity.name,
          email: userEntity.email,
          password: userEntity.password.value,
        },
      });

      responseAuth = await request(app.getHttpServer())
        .post('/authentication')
        .send({
          email: userEntity.email,
          password: '123456',
        });
    });

    test('should be able return a entity bill created', async () => {
      const res = await request(app.getHttpServer())
        .post('/bills')
        .set('Authorization', `Bearer ${responseAuth.body.access_token}`)
        .send({
          name: 'New bill',
          amount: 100,
        });

      const hasBill = await prismaService.bill.findFirst({
        where: {
          name: 'New bill',
        },
      });

      expect(res.statusCode).toBe(201);
      expect(hasBill).toBeTruthy();
    });
  });
});
