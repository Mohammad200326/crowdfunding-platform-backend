import { z } from 'zod';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
  VerifyOtpSchema,
} from '../types/password-reset.schema';
import { User, CreatorType } from '@prisma/client';

export type registerUserDTO = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'password' | 'dateOfBirth'
  // | 'phoneNumber'
  // | 'country'
  // | 'notes'
> & {
  phoneNumber?: string;
  country?: string;
  notes?: string;
};

export type registerDonorDTO = registerUserDTO & {
  donorProfile?: {
    areasOfInterest?: string;
    preferredCampaignTypes?: string;
    geographicScope?: 'local' | 'global';
    targetAudience?: string;
    preferredCampaignSize?: number;
    preferredCampaignVisibility?: string;
  };
};

export type registerCampaignCreatorDTO = registerUserDTO & {
  creatorProfile?: {
    type: CreatorType;
    institutionCountry: string;
    institutionType: string;
    institutionDateOfEstablishment: Date;
    institutionLegalStatus: string;
    institutionTaxIdentificationNumber: string;
    institutionRegistrationNumber: string;
    institutionRepresentativeName: string;
    institutionRepresentativePosition: string;
    institutionRepresentativeRegistrationNumber: string;
    institutionWebsite: string;
    institutionRepresentativeSocialMedia: string;
  };
};

export type UserResponseDTO = {
  token: string;
  userData: Omit<User, 'password'>;
};

export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
export type VerifyOtpDTO = z.infer<typeof VerifyOtpSchema>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;

//login dto and schema
export const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
