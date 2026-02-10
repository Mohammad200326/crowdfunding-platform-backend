import { z } from 'zod';
export declare const UpdateCampaignCreatorSchema: z.ZodObject<{
    institutionName: z.ZodOptional<z.ZodString>;
    institutionCountry: z.ZodOptional<z.ZodString>;
    institutionType: z.ZodOptional<z.ZodString>;
    institutionDateOfEstablishment: z.ZodOptional<z.ZodString>;
    institutionLegalStatus: z.ZodOptional<z.ZodString>;
    institutionTaxIdentificationNumber: z.ZodOptional<z.ZodString>;
    institutionRegistrationNumber: z.ZodOptional<z.ZodString>;
    institutionRepresentativeName: z.ZodOptional<z.ZodString>;
    institutionRepresentativePosition: z.ZodOptional<z.ZodString>;
    institutionRepresentativeRegistrationNumber: z.ZodOptional<z.ZodString>;
    institutionWebsite: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>>;
    institutionRepresentativeSocialMedia: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type UpdateCampaignCreatorDto = z.infer<typeof UpdateCampaignCreatorSchema>;
