import z from 'zod';
export declare const withdrawalSchema: z.ZodObject<{
    starsNumber: z.ZodNumber;
    bankAccountId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const PlatformProfitQuerySchema: z.ZodObject<{
    from: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    to: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type PlatformProfitQueryDto = z.infer<typeof PlatformProfitQuerySchema>;
export type PlatformNetProfitResponseDto = {
    from?: string;
    to?: string;
    currency: string;
    paidWithdrawalsCount: number;
    platformNetProfitStars: number;
    platformNetProfitAmountInMinor: number;
};
