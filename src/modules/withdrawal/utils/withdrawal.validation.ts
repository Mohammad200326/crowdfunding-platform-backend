import z from 'zod';
import { CreateWithdrawalDto } from '../dto/withdrawal.dto';

export const withdrawalSchema = z.object({
  starsNumber: z.number().int().positive(),
  bankAccountId: z.string().uuid().optional(),
}) satisfies z.ZodType<CreateWithdrawalDto>;

export const PlatformProfitQuerySchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

export type PlatformProfitQueryDto = z.infer<typeof PlatformProfitQuerySchema>;

export type PlatformNetProfitResponseDto = {
  from?: string;
  to?: string;
  currency: string;
  paidWithdrawalsCount: number;
  platformNetProfitStars: number;
  platformNetProfitAmountInMinor: number;
};
