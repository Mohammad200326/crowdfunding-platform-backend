import { z } from 'zod';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  VerifyOtpSchema,
} from '../types/password-reset.schema';

export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
export type VerifyOtpDTO = z.infer<typeof VerifyOtpSchema>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;

//login dto and schema
export const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
