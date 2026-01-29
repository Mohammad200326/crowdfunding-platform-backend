import { z } from 'zod';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  VerifyOtpSchema,
} from '../types/password-reset.schema';
import { User } from '@prisma/client';

export type registerUserDTO = Pick<
  User,
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'phoneNumber'
  | 'country'
  | 'notes'
>;

export type registerDonorDTO = registerUserDTO & {
  donorProfile?: {
    dateOfBirth: Date;
    areasOfInterest: string;
    preferredCampaignTypes: string;
    geographicScope: 'local' | 'global';
    targetAudience: string;
    preferredCampaignSize: number;
    preferredCampaignVisibility: string;
  };
};

export type UserResponseDTO = {
  token: string;
  userData: Omit<User, 'password'>;
};

// {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   phoneNumber: string;
//   country: string;
//   avatar: string;
//   notes: string;
//   donorProfile?: {
//     dateOfBirth: Date;
//     areasOfInterest: string;
//     preferredCampaignTypes: string;
//     geographicScope: 'local' | 'global';
//     targetAudience: string;
//     preferredCampaignSize: number;
//     preferredCampaignVisibility: string;
//   };
// };

export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
export type VerifyOtpDTO = z.infer<typeof VerifyOtpSchema>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;

//login dto and schema
export const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
