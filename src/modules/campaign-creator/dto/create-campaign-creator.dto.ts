import { z } from 'zod';
import { CreatorType } from '@prisma/client';

export const CreateCampaignCreatorSchema = z.object({
  userId: z.string().uuid({ message: 'Invalid User ID' }),
  type: z
    .nativeEnum(CreatorType)
    .refine((val) => Object.values(CreatorType).includes(val), {
      message: 'Type must be INDIVIDUAL or INSTITUTION',
    }),
  institutionCountry: z.string().min(1, 'Country is required'),

  // optional fields
  institutionType: z.string().optional(),
  institutionDateOfEstablishment: z.string().optional(), // expecting ISO date string
  institutionLegalStatus: z.string().optional(),
  institutionTaxIdentificationNumber: z.string().optional(),
  institutionRegistrationNumber: z.string().optional(),
  institutionRepresentativeName: z.string().optional(),
  institutionRepresentativePosition: z.string().optional(),
  institutionRepresentativeRegistrationNumber: z.string().optional(),
  institutionWebsite: z.string().optional(),
  institutionRepresentativeSocialMedia: z.string().optional(),
});

export type CreateCampaignCreatorDto = z.infer<
  typeof CreateCampaignCreatorSchema
>;
