import { z } from 'zod';
import { BankAccount, Prisma } from '@prisma/client';
export declare const CreateBankAccountSchema: z.ZodObject<{
    bankName: z.ZodString;
    iban: z.ZodString;
    notes: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const UpdateBankAccountSchema: z.ZodObject<{
    bankName: z.ZodOptional<z.ZodString>;
    iban: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    isVerified: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateBankAccountDto = z.infer<typeof CreateBankAccountSchema>;
export type UpdateBankAccountDto = z.infer<typeof UpdateBankAccountSchema>;
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
