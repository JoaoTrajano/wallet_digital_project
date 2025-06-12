import fastifyCors from '@fastify/cors';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { EnvService } from '@/shared/infrastructure/env/env.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();

  await fastifyAdapter.register(fastifyCors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  app.setGlobalPrefix('api');

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  await app.listen(port || 3000, '0.0.0.0');
}

bootstrap();
