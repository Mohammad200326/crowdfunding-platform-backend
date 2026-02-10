import { z } from 'zod';
export declare const CreateCampaignCreatorSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    userId: z.ZodString;
    assetIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"INDIVIDUAL">;
}, z.core.$strip>, z.ZodObject<{
    userId: z.ZodString;
    assetIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    institutionName: z.ZodString;
    institutionCountry: z.ZodString;
    institutionType: z.ZodString;
    institutionDateOfEstablishment: z.ZodCoercedDate<unknown>;
    institutionLegalStatus: z.ZodString;
    institutionTaxIdentificationNumber: z.ZodString;
    institutionRegistrationNumber: z.ZodString;
    institutionRepresentativeName: z.ZodString;
    institutionRepresentativePosition: z.ZodString;
    institutionRepresentativeRegistrationNumber: z.ZodString;
    institutionWebsite: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    institutionRepresentativeSocialMedia: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    type: z.ZodLiteral<"INSTITUTION">;
}, z.core.$strip>], "type">;
export type CreateCampaignCreatorDto = z.infer<typeof CreateCampaignCreatorSchema>;
