import { z } from 'zod';
import { BankAccount, Prisma } from '@prisma/client';

// Zod Schemas for validation
export const CreateBankAccountSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  iban: z.string().min(1, 'IBAN is required'),
  notes: z.string().optional().default(''),
});

export const UpdateBankAccountSchema = z.object({
  bankName: z
    .string()
    .min(1, 'Bank name is required')
    .max(255, 'Bank name is too long')
    .optional(),
  iban: z.string().min(1, 'IBAN is required'),
  notes: z.string().optional(),
  isVerified: z
    .union([z.boolean(), z.string()])
    .transform((val) => {
      if (typeof val === 'boolean') return val;
      if (val === 'true') return true;
      if (val === 'false') return false;
      return undefined;
    })
    .optional(),
});

// TypeScript types inferred from Zod schemas
export type CreateBankAccountDto = z.infer<typeof CreateBankAccountSchema>;
export type UpdateBankAccountDto = z.infer<typeof UpdateBankAccountSchema>;

// Response types using Prisma's type-safe approach
export type BankAccountResponseDto = BankAccount;

export type BankAccountWithAssetsDto = Prisma.BankAccountGetPayload<{
  include: {
    assets: true;
  };
}>;

export type BankAccountWithRelationsDto = Prisma.BankAccountGetPayload<{
  include: {
    assets: true;
    withdrawals: true;
    creator: {
      select: {
        id: true;
        firstName: true;
        lastName: true;
        email: true;
      };
    };
  };
}>;
