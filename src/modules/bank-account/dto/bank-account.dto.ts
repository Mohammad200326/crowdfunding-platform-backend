import { z } from 'zod';
import { BankAccount, Prisma } from '@prisma/client';

// Zod Schemas for validation
export const CreateBankAccountSchema = z.object({
  bankName: z
    .string()
    .min(1, 'Bank name is required')
    .max(255, 'Bank name is too long'),
  iban: z
    .string()
    .min(1, 'IBAN is required')
    .regex(
      /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/,
      'Invalid IBAN format. Must start with 2 letters, 2 digits, followed by alphanumeric characters',
    ),
  notes: z.string().optional().default(''),
});

export const UpdateBankAccountSchema = z.object({
  bankName: z
    .string()
    .min(1, 'Bank name is required')
    .max(255, 'Bank name is too long')
    .optional(),
  iban: z
    .string()
    .min(1, 'IBAN is required')
    .regex(/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/, 'Invalid IBAN format')
    .optional(),
  notes: z.string().optional(),
  isVerified: z.boolean().optional(),
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
