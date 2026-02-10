import { z } from 'zod';
export declare const RegisterCampaignCreatorSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    type: z.ZodLiteral<"INDIVIDUAL">;
    creatorProfile: z.ZodOptional<z.ZodNull>;
}, z.core.$strip>, z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    type: z.ZodLiteral<"INSTITUTION">;
    creatorProfile: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        institutionName: z.ZodString;
        institutionType: z.ZodString;
        institutionCountry: z.ZodString;
        institutionDateOfEstablishment: z.ZodCoercedDate<unknown>;
        institutionLegalStatus: z.ZodString;
        institutionTaxIdentificationNumber: z.ZodString;
        institutionRegistrationNumber: z.ZodString;
        institutionRepresentativeName: z.ZodString;
        institutionRepresentativePosition: z.ZodString;
        institutionRepresentativeRegistrationNumber: z.ZodString;
        institutionWebsite: z.ZodString;
        institutionRepresentativeSocialMedia: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>], "type">;
export type RegisterCampaignCreatorDTO = z.infer<typeof RegisterCampaignCreatorSchema>;
