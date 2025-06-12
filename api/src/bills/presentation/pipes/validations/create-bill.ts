import { z } from 'zod';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation';

const createBillSchema = z.object({
  name: z.string().min(2).max(100),
  amount: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z.number().min(0),
  ),
});

export type CreateBillBody = z.infer<typeof createBillSchema>;

export const CreateBillBodyPipe = new ZodValidationPipe(createBillSchema);
