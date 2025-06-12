import { z } from 'zod';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation';

const authBodySchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type AuthBody = z.infer<typeof authBodySchema>;

export const AuthBodyPipe = new ZodValidationPipe(authBodySchema);
