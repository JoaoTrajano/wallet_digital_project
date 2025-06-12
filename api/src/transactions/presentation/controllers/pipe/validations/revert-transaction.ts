import { z } from 'zod';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation';

const revertTransactionBodySchema = z.object({
  transactionId: z.string().min(1),
});

export type RevertTransactionBodyBody = z.infer<
  typeof revertTransactionBodySchema
>;

export const RevertTransactionBodyBodyPipe = new ZodValidationPipe(
  revertTransactionBodySchema,
);
