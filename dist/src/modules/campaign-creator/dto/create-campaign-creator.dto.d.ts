import { z } from 'zod';
export declare const CreateCampaignCreatorSchema: z.ZodObject<{
    userId: z.ZodString;
    type: z.ZodEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        INSTITUTION: "INSTITUTION";
    }>;
    institutionName: z.ZodString;
    institutionCountry: z.ZodString;
    institutionType: z.ZodOptional<z.ZodString>;
    institutionDateOfEstablishment: z.ZodOptional<z.ZodString>;
    institutionLegalStatus: z.ZodOptional<z.ZodString>;
    institutionTaxIdentificationNumber: z.ZodOptional<z.ZodString>;
    institutionRegistrationNumber: z.ZodOptional<z.ZodString>;
    institutionRepresentativeName: z.ZodOptional<z.ZodString>;
    institutionRepresentativePosition: z.ZodOptional<z.ZodString>;
    institutionRepresentativeRegistrationNumber: z.ZodOptional<z.ZodString>;
    institutionWebsite: z.ZodOptional<z.ZodString>;
    institutionRepresentativeSocialMedia: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateCampaignCreatorDto = z.infer<typeof CreateCampaignCreatorSchema>;
