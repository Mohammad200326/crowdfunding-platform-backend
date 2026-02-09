import { z } from 'zod';

export const UpdateCampaignCreatorSchema = z
  .object({
    institutionName: z
      .string()
      .min(2, 'Institution name must be at least 2 characters')
      .optional(),
    institutionCountry: z
      .string()
      .min(2, 'Country must be at least 2 characters')
      .optional(),
    institutionType: z
      .string()
      .min(2, 'Institution type must be at least 2 characters')
      .optional(),
    institutionDateOfEstablishment: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
      })
      .optional(),
    institutionLegalStatus: z
      .string()
      .min(1, 'Legal status cannot be empty')
      .optional(),
    institutionTaxIdentificationNumber: z
      .string()
      .min(1, 'Tax identification number cannot be empty')
      .optional(),
    institutionRegistrationNumber: z
      .string()
      .min(1, 'Registration number cannot be empty')
      .optional(),
    institutionRepresentativeName: z
      .string()
      .min(2, 'Representative name must be at least 2 characters')
      .optional(),
    institutionRepresentativePosition: z
      .string()
      .min(2, 'Representative position must be at least 2 characters')
      .optional(),
    institutionRepresentativeRegistrationNumber: z
      .string()
      .min(1, 'Representative registration number cannot be empty')
      .optional(),
    institutionWebsite: z
      .string()
      .url('Must be a valid URL')
      .or(z.literal(''))
      .optional(),
    institutionRepresentativeSocialMedia: z
      .string()
      .min(1, 'Social media handle cannot be empty')
      .optional(),
  })
  .strict();

export type UpdateCampaignCreatorDto = z.infer<
  typeof UpdateCampaignCreatorSchema
>;
