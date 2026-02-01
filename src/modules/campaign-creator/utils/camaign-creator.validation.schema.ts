import { z, type ZodType } from 'zod';
import { CreatorType } from '@prisma/client';
import { registerCampaignCreatorDTO } from 'src/modules/auth/dto/auth.dto';

export const campaignCreatorValidationSchema = z.object({
  // ✅ لازم يطابق enum
  type: z.nativeEnum(CreatorType),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.string().email().toLowerCase(),
  password: z.string().min(6).max(100),
  dateOfBirth: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    })
    .transform((date) => new Date(date)),
  phoneNumber: z.string().min(7).max(15),
  country: z.string().min(2).max(100),

  // لو بدك نفس donor: خليها مش optional
  notes: z.string().max(500),

  creatorProfile: z
    .object({
      institutionCountry: z.string().min(2).max(100),
      institutionType: z.string().min(2).max(200),

      institutionDateOfEstablishment: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: 'Invalid date format',
        })
        .transform((date) => new Date(date)),

      institutionLegalStatus: z.string().min(2).max(200),
      institutionTaxIdentificationNumber: z.string().min(2).max(200),
      institutionRegistrationNumber: z.string().min(2).max(200),

      institutionRepresentativeName: z.string().min(2).max(200),
      institutionRepresentativePosition: z.string().min(2).max(200),
      institutionRepresentativeRegistrationNumber: z.string().min(2).max(200),

      institutionWebsite: z.string().url(),
      institutionRepresentativeSocialMedia: z.string().min(2).max(500),
    })
    .optional(),
}) satisfies ZodType<registerCampaignCreatorDTO>;
