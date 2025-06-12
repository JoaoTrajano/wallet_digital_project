import { z } from 'zod';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation';

const registerUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type RegisterUserBody = z.infer<typeof registerUserSchema>;

export const RegisterUserBodyPipe = new ZodValidationPipe(registerUserSchema);
