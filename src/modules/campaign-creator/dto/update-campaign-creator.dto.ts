import { z } from 'zod';

export const UpdateCampaignCreatorSchema = z
  .object({
    institutionName: z.string().min(2).optional(),
    institutionCountry: z.string().min(2).optional(),
    institutionType: z.string().min(2).optional(),
    institutionDateOfEstablishment: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
      })
      .optional(),
    institutionLegalStatus: z.string().min(1).optional(),
    institutionTaxIdentificationNumber: z.string().min(1).optional(),
    institutionRegistrationNumber: z.string().min(1).optional(),
    institutionRepresentativeName: z.string().min(1).optional(),
    institutionRepresentativePosition: z.string().min(1).optional(),
    institutionRepresentativeRegistrationNumber: z.string().min(1).optional(),

    institutionWebsite: z
      .string()
      .refine(
        (val) => {
          if (!val || val.trim() === '') return true;
          try {
            new URL(val);
            return true;
          } catch {
            return false;
          }
        },
        { message: 'Must be a valid URL or leave empty' },
      )
      .optional(),
    institutionRepresentativeSocialMedia: z.string().optional(),
  })
  .strict();

export type UpdateCampaignCreatorDto = z.infer<
  typeof UpdateCampaignCreatorSchema
>;
