import { z } from 'zod';
export declare const CreateCampaignCreatorSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    userId: z.ZodString;
    assetIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"INDIVIDUAL">;
}, z.core.$strip>, z.ZodObject<{
    userId: z.ZodString;
    assetIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    institutionName: z.ZodOptional<z.ZodString>;
    institutionCountry: z.ZodOptional<z.ZodString>;
    institutionType: z.ZodOptional<z.ZodString>;
    institutionDateOfEstablishment: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    institutionLegalStatus: z.ZodOptional<z.ZodString>;
    institutionTaxIdentificationNumber: z.ZodOptional<z.ZodString>;
    institutionRegistrationNumber: z.ZodOptional<z.ZodString>;
    institutionRepresentativeName: z.ZodOptional<z.ZodString>;
    institutionRepresentativePosition: z.ZodOptional<z.ZodString>;
    institutionRepresentativeRegistrationNumber: z.ZodOptional<z.ZodString>;
    institutionWebsite: z.ZodOptional<z.ZodString>;
    institutionRepresentativeSocialMedia: z.ZodOptional<z.ZodString>;
    type: z.ZodLiteral<"INSTITUTION">;
}, z.core.$strip>], "type">;
export type CreateCampaignCreatorDto = z.infer<typeof CreateCampaignCreatorSchema>;
