import z from 'zod';
export declare const withdrawalSchema: z.ZodObject<{
    starsNumber: z.ZodNumber;
    bankAccountId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
