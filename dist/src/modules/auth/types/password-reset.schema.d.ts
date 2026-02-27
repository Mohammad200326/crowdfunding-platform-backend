import { z } from 'zod';
export declare const ForgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export declare const VerifyOtpSchema: z.ZodObject<{
    email: z.ZodString;
    otp: z.ZodString;
}, z.core.$strip>;
export type VerifyForgotOtpInput = z.infer<typeof VerifyOtpSchema>;
export declare const ResetPasswordSchema: z.ZodObject<{
    resetToken: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
