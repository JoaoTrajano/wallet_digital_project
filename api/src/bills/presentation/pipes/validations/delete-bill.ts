import { z } from 'zod';

import { ZodValidationPipe } from '@/shared/pipes/zod-validation';

const deleteBillSchema = z.object({
  billId: z.string().min(1),
});

export type DeleteBillBody = z.infer<typeof deleteBillSchema>;

export const DeleteBillBodyPipe = new ZodValidationPipe(deleteBillSchema);
