import z from 'zod';
import { CreateWithdrawalDto } from '../dto/withdrawal.dto';

export const withdrawalSchema = z.object({
  starsNumber: z.number().int().positive(),
  bankAccountId: z.string().uuid().optional(),
}) satisfies z.ZodType<CreateWithdrawalDto>;
