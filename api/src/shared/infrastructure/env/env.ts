import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
});

export type Env = z.infer<typeof envSchema>;
