import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { afterAll, beforeAll } from 'vitest';

import { envSchema } from '@/shared/infrastructure/env/env';

config({ path: '.env', override: true });
config({ path: '.env.test', override: true });

const env = envSchema.parse(process.env);
const prisma = new PrismaClient();
const schemaId = randomUUID();

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL)
    throw new Error('Please provider a DATABASE_URL environment variable');

  const url = new URL(env.DATABASE_URL);
  url.searchParams.set('schema', schemaId);

  return url.toString();
}

beforeAll(async () => {
  process.env.DATABASE_URL = generateUniqueDatabaseURL(schemaId);
  execSync(
    'pnpm prisma migrate deploy --schema=./src/shared/infrastructure/database/postgres/adapters/prisma/schema.prisma',
  );
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
