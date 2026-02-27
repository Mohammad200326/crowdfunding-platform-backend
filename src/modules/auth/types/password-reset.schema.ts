import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export const VerifyOtpSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  otp: z
    .string()
    .trim()
    .regex(/^\d{5}$/, 'OTP must be 5 digits'),
});

export type VerifyForgotOtpInput = z.infer<typeof VerifyOtpSchema>;

export const ResetPasswordSchema = z.object({
  resetToken: z.string().uuid(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
