import { z } from 'zod';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation';
import { TransactionType } from '@/transactions/domain/entities/transaction.entity';

const createNewTransactionSchema = z.object({
  type: z.nativeEnum(TransactionType),
  value: z.number().min(0, 'Value must be a positive number'),
  description: z.string().min(1, 'Description is required'),
  billId: z.string().min(1, 'Bill ID is required'),
  destinationId: z.string().optional(),
});

export type CreateNewTransactionBody = z.infer<
  typeof createNewTransactionSchema
>;

export const CreateNewTransactionBodyPipe = new ZodValidationPipe(
  createNewTransactionSchema,
);
