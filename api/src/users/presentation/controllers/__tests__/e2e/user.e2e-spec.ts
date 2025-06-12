import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';

describe('RegisterUserController e2e test', () => {
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

  describe('POST /users', () => {
    test('should be able return a entity user created', async () => {
      const res = await request(app.getHttpServer()).post('/users').send({
        name: 'New user',
        email: 'newuser@example.com',
        password: '123456',
      });

      const hasUser = await prismaService.user.findFirst({
        where: {
          name: 'New user',
          email: 'newuser@example.com',
        },
      });

      expect(res.statusCode).toBe(201);
      expect(hasUser).toBeTruthy();
    });
  });
});
