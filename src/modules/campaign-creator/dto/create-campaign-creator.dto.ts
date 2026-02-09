import { z } from 'zod';

const BaseSchema = z.object({
  userId: z.string().uuid({ message: 'Invalid User ID' }),
  // Allow linking assets (ID photos, licenses, certificates) during creation
  assetIds: z.array(z.string().uuid()).optional(),
});

// Institution-specific fields
const InstitutionProfileSchema = z.object({
  institutionName: z.string().min(2, 'Institution name is required'),
  institutionCountry: z.string().min(2, 'Country is required'),
  institutionType: z.string().min(2, 'Institution type is required'),
  institutionDateOfEstablishment: z.coerce.date(), // Auto-converts string to Date
  institutionLegalStatus: z.string().min(1, 'Legal status is required'),
  institutionTaxIdentificationNumber: z
    .string()
    .min(1, 'Tax identification number is required'),
  institutionRegistrationNumber: z
    .string()
    .min(1, 'Registration number is required'),
  institutionRepresentativeName: z
    .string()
    .min(1, 'Representative name is required'),
  institutionRepresentativePosition: z
    .string()
    .min(1, 'Representative position is required'),
  institutionRepresentativeRegistrationNumber: z
    .string()
    .min(1, 'Representative registration number is required'),
  institutionWebsite: z.string().url().optional().or(z.literal('')),
  institutionRepresentativeSocialMedia: z.string().optional().or(z.literal('')),
});

export const CreateCampaignCreatorSchema = z.discriminatedUnion('type', [
  // INDIVIDUAL type - no institution fields allowed
  BaseSchema.extend({
    type: z.literal('INDIVIDUAL'),
  }),

  // INSTITUTION type - all institution fields required
  BaseSchema.extend({
    type: z.literal('INSTITUTION'),
    ...InstitutionProfileSchema.shape,
  }),
]);

export type CreateCampaignCreatorDto = z.infer<
  typeof CreateCampaignCreatorSchema
>;
