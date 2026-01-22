import { z } from 'zod';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  VerifyOtpSchema,
} from '../types/password-reset.schema';

export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
export type VerifyOtpDTO = z.infer<typeof VerifyOtpSchema>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;
